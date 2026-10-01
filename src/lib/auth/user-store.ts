"use client";

import { sanitizeUsername, sanitizePassword, hashPasswordWithSalt } from "../security/sanitize";

export interface OperativeAccount {
  id: string;
  username: string;
  passwordHash: string;
  salt: string;
  createdAt: number;
  clearanceLevel: string;
  operativeRank: string;
}

const USERS_INDEX_KEY = "shadowtrace_users_registry";
const ACTIVE_SESSION_KEY = "shadowtrace_active_session_user";

function isClient(): boolean {
  return typeof window !== "undefined";
}

/**
 * Retrieves all registered users from secure local registry.
 */
function getAllUsers(): OperativeAccount[] {
  if (!isClient()) return [];
  try {
    const raw = localStorage.getItem(USERS_INDEX_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error("Failed to read user registry:", err);
    return [];
  }
}

/**
 * Saves all users to registry.
 */
function saveAllUsers(users: OperativeAccount[]): void {
  if (!isClient()) return;
  localStorage.setItem(USERS_INDEX_KEY, JSON.stringify(users));
}

/**
 * Returns the currently authenticated operative or null.
 */
export function getActiveUser(): OperativeAccount | null {
  if (!isClient()) return null;
  try {
    const raw = localStorage.getItem(ACTIVE_SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/**
 * Generates an isolated storage key scoped exclusively to the currently logged in user.
 * Prevents user-to-user data tampering or leaks.
 */
export function getScopedStorageKey(keySuffix: string): string {
  const active = getActiveUser();
  const userId = active ? active.id : "guest_operative";
  return `shadowtrace_user_${userId}_${keySuffix}`;
}

/**
 * Registers a new operative with a unique username and password.
 */
export async function registerOperative(
  rawUsername: string,
  rawPassword: string
): Promise<{ success: boolean; user?: OperativeAccount; error?: string }> {
  const userSan = sanitizeUsername(rawUsername);
  if (!userSan.valid) return { success: false, error: userSan.error };

  const passSan = sanitizePassword(rawPassword);
  if (!passSan.valid) return { success: false, error: passSan.error };

  const users = getAllUsers();
  const exists = users.find(u => u.username.toLowerCase() === userSan.sanitized.toLowerCase());
  if (exists) {
    return { success: false, error: "An operative with this username is already registered." };
  }

  // Generate cryptographically random salt
  const saltArray = new Uint8Array(16);
  crypto.getRandomValues(saltArray);
  const salt = Array.from(saltArray).map(b => b.toString(16).padStart(2, "0")).join("");

  const passwordHash = await hashPasswordWithSalt(passSan.sanitized, salt);
  const userId = `op_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

  const newAccount: OperativeAccount = {
    id: userId,
    username: userSan.sanitized,
    passwordHash,
    salt,
    createdAt: Date.now(),
    clearanceLevel: "4",
    operativeRank: "Cyber Investigator"
  };

  users.push(newAccount);
  saveAllUsers(users);

  // Set as active session
  localStorage.setItem(ACTIVE_SESSION_KEY, JSON.stringify(newAccount));
  window.dispatchEvent(new Event("shadowtrace-auth-updated"));
  window.dispatchEvent(new Event("shadowtrace-progression-updated"));

  return { success: true, user: newAccount };
}

/**
 * Authenticates an existing operative.
 */
export async function loginOperative(
  rawUsername: string,
  rawPassword: string
): Promise<{ success: boolean; user?: OperativeAccount; error?: string }> {
  const userSan = sanitizeUsername(rawUsername);
  if (!userSan.valid) return { success: false, error: "Invalid username format." };

  const users = getAllUsers();
  const user = users.find(u => u.username.toLowerCase() === userSan.sanitized.toLowerCase());
  if (!user) {
    return { success: false, error: "Operative record not found. Check username or create a new ID." };
  }

  const computedHash = await hashPasswordWithSalt(rawPassword, user.salt);
  if (computedHash !== user.passwordHash) {
    return { success: false, error: "Authentication failed. Invalid cryptographic credentials." };
  }

  // Set active session
  localStorage.setItem(ACTIVE_SESSION_KEY, JSON.stringify(user));
  window.dispatchEvent(new Event("shadowtrace-auth-updated"));
  window.dispatchEvent(new Event("shadowtrace-progression-updated"));

  return { success: true, user };
}

/**
 * Logs out the active operative.
 */
export function logoutOperative(): void {
  if (!isClient()) return;
  localStorage.removeItem(ACTIVE_SESSION_KEY);
  window.dispatchEvent(new Event("shadowtrace-auth-updated"));
  window.dispatchEvent(new Event("shadowtrace-progression-updated"));
}

/**
 * Updates operative clearance level safely for the current user.
 */
export function updateActiveOperativeLevel(newLevel: string, newRank: string): void {
  if (!isClient()) return;
  const user = getActiveUser();
  if (user) {
    user.clearanceLevel = newLevel;
    user.operativeRank = newRank;
    localStorage.setItem(ACTIVE_SESSION_KEY, JSON.stringify(user));

    const users = getAllUsers();
    const idx = users.findIndex(u => u.id === user.id);
    if (idx !== -1) {
      users[idx] = user;
      saveAllUsers(users);
    }
  }

  // Also update user-scoped store
  localStorage.setItem(getScopedStorageKey("level"), newLevel);
  localStorage.setItem(getScopedStorageKey("rank"), newRank);
  window.dispatchEvent(new Event("shadowtrace-progression-updated"));
}
