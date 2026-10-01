/**
 * ShadowTrace Security & Input Sanitization Utility
 * Hardens all operative and user inputs against XSS, HTML injection,
 * command injection, and script evaluation.
 */

/**
 * Escapes HTML special characters to prevent XSS injection.
 */
export function sanitizeHtml(raw: string): string {
  if (typeof raw !== "string") return "";
  return raw
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
}

/**
 * Sanitizes operative username input.
 * Allows only alphanumeric characters, underscores, and dashes (3-24 characters).
 */
export function sanitizeUsername(username: string): { valid: boolean; sanitized: string; error?: string } {
  if (typeof username !== "string") {
    return { valid: false, sanitized: "", error: "Username must be a valid text string." };
  }
  const trimmed = username.trim();
  if (trimmed.length < 3) {
    return { valid: false, sanitized: "", error: "Username must be at least 3 characters." };
  }
  if (trimmed.length > 24) {
    return { valid: false, sanitized: "", error: "Username cannot exceed 24 characters." };
  }
  const clean = trimmed.replace(/[^a-zA-Z0-9_-]/g, "");
  if (clean !== trimmed) {
    return { valid: false, sanitized: clean, error: "Username can only contain letters, numbers, hyphens, and underscores." };
  }
  return { valid: true, sanitized: clean };
}

/**
 * Sanitizes password input.
 * Enforces minimum length and strips null bytes or control characters.
 */
export function sanitizePassword(password: string): { valid: boolean; sanitized: string; error?: string } {
  if (typeof password !== "string") {
    return { valid: false, sanitized: "", error: "Password must be a valid text string." };
  }
  if (password.length < 6) {
    return { valid: false, sanitized: "", error: "Password must be at least 6 characters." };
  }
  if (password.length > 128) {
    return { valid: false, sanitized: "", error: "Password cannot exceed 128 characters." };
  }
  // Remove dangerous control characters and null bytes
  const sanitized = password.replace(/[\x00-\x1F\x7F]/g, "");
  return { valid: true, sanitized };
}

/**
 * Sanitizes terminal query input to prevent shell injection and malicious payloads.
 */
export function sanitizeTerminalInput(command: string): string {
  if (typeof command !== "string") return "";
  // Strip control characters, HTML tags, and common command chaining characters (;, &, |, `)
  return command
    .replace(/[\x00-\x1F\x7F]/g, "")
    .replace(/<[^>]*>?/gm, "")
    .replace(/[;&|`$]/g, "")
    .trim()
    .slice(0, 160);
}

/**
 * Cryptographic SHA-256 hash using Web Crypto API.
 * Used for client-side password hashing with salt before storage.
 */
export async function hashPasswordWithSalt(password: string, salt: string): Promise<string> {
  const enc = new TextEncoder();
  const data = enc.encode(`${salt}::${password}::shadowtrace_v2`);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}
