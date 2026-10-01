"use client";

import { DynamicCase, generateSyndicateOperation } from "./procedural-generator";
import { getScopedStorageKey, updateActiveOperativeLevel, getActiveUser } from "../auth/user-store";
import { thePhantomProtocolCase, phantomProtocolClues, theOperationMidnightCase, operationMidnightClues } from "../data/seed-case";
import { Clue } from "../firebase/schema";

function isClient(): boolean {
  return typeof window !== "undefined";
}

/**
 * Returns currently active 3 cases for the authenticated operative.
 * If none exist, generates a fresh interlinked 3-case operation.
 */
export function getOrGenerateActiveCases(): DynamicCase[] {
  if (!isClient()) {
    return generateSyndicateOperation(12345);
  }

  const activeUser = getActiveUser();
  // Guest mode uses volatile session storage (not permanently saved)
  if (!activeUser) {
    try {
      const guestStored = sessionStorage.getItem("shadowtrace_guest_cases");
      if (guestStored) {
        const parsed: DynamicCase[] = JSON.parse(guestStored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return syncLockStates(parsed);
        }
      }
    } catch {}
    const freshGuestCases = generateSyndicateOperation(Date.now());
    saveActiveCases(freshGuestCases);
    return freshGuestCases;
  }

  const key = getScopedStorageKey("active_cases");
  try {
    const stored = localStorage.getItem(key);
    if (stored) {
      const parsed: DynamicCase[] = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return syncLockStates(parsed);
      }
    }
  } catch (err) {
    console.warn("Failed to load active cases:", err);
  }

  // Generate fresh operation
  const freshCases = generateSyndicateOperation(Date.now());
  saveActiveCases(freshCases);
  return freshCases;
}

/**
 * Saves active cases to user-scoped storage.
 * In Guest mode, uses volatile sessionStorage so progress is not permanently stored.
 */
export function saveActiveCases(cases: DynamicCase[]): void {
  if (!isClient()) return;
  const activeUser = getActiveUser();
  if (!activeUser) {
    sessionStorage.setItem("shadowtrace_guest_cases", JSON.stringify(cases));
    return;
  }
  const key = getScopedStorageKey("active_cases");
  localStorage.setItem(key, JSON.stringify(cases));
}

/**
 * Generates a brand-new 3-case syndicate operation for the active operative.
 * Automatically preserves any solved cases in the historical dossier archive.
 */
export function generateNewOperation(): DynamicCase[] {
  if (isClient()) {
    const active = getOrGenerateActiveCases();
    const history = getCaseHistory();
    for (const c of active) {
      if (c.isSolved && !history.some(h => h.id === c.id)) {
        history.push(c);
      }
    }
    const historyKey = getScopedStorageKey("history_cases");
    localStorage.setItem(historyKey, JSON.stringify(history));
  }

  const freshCases = generateSyndicateOperation(Date.now());
  saveActiveCases(freshCases);
  if (isClient()) {
    window.dispatchEvent(new Event("shadowtrace-cases-updated"));
  }
  return freshCases;
}

/**
 * Retrieves the list of completed case IDs for the active operative.
 */
export function getCompletedCaseIds(): string[] {
  if (!isClient()) return [];
  // Guest mode: progress is not stored permanently
  if (!getActiveUser()) return [];
  const key = getScopedStorageKey("completed_ids");
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Returns archived/historical cases for the operative.
 */
export function getCaseHistory(): DynamicCase[] {
  if (!isClient()) return [];
  // Guest mode: historical cases are not stored
  if (!getActiveUser()) return [];
  const key = getScopedStorageKey("history_cases");
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Marks a case as solved, awards clearance XP, and archives to history.
 * In Guest mode, progress is NOT stored.
 */
export function markCaseSolved(caseId: string): void {
  if (!isClient()) return;

  // In Guest Mode: Progress is NOT stored permanently!
  if (!getActiveUser()) {
    const active = getOrGenerateActiveCases();
    const target = active.find(c => c.id === caseId);
    if (target) {
      target.isSolved = true;
      saveActiveCases(active);
    }
    window.dispatchEvent(new Event("shadowtrace-progression-updated"));
    window.dispatchEvent(new Event("shadowtrace-cases-updated"));
    return;
  }

  const completed = getCompletedCaseIds();
  if (!completed.includes(caseId)) {
    completed.push(caseId);
    localStorage.setItem(getScopedStorageKey("completed_ids"), JSON.stringify(completed));
  }

  // Sync active cases
  const active = getOrGenerateActiveCases();
  const target = active.find(c => c.id === caseId);
  if (target) {
    target.isSolved = true;
    saveActiveCases(active);

    // Save to history archive
    const history = getCaseHistory();
    if (!history.some(h => h.id === target.id)) {
      history.push(target);
      localStorage.setItem(getScopedStorageKey("history_cases"), JSON.stringify(history));
    }
  }

  // Calculate and update progression
  const solvedCount = completed.length;
  let newLevel = "4";
  let newRank = "Cyber Investigator";

  if (solvedCount >= 2) {
    newLevel = "6";
    newRank = "Director of Cyber Intelligence";
  } else if (solvedCount >= 1) {
    newLevel = "5";
    newRank = "Senior Cyber Investigator";
  }

  updateActiveOperativeLevel(newLevel, newRank);
  window.dispatchEvent(new Event("shadowtrace-progression-updated"));
  window.dispatchEvent(new Event("shadowtrace-cases-updated"));
}

/**
 * Resolves a case by ID from active cases, history, or legacy seed files.
 */
export function getCaseById(caseId: string): DynamicCase {
  const active = getOrGenerateActiveCases();
  const match = active.find(c => c.id === caseId);
  if (match) return match;

  const history = getCaseHistory();
  const histMatch = history.find(c => c.id === caseId);
  if (histMatch) return histMatch;

  // Fallback seed case compatibility
  if (caseId === "operation-midnight") {
    return {
      ...theOperationMidnightCase,
      hints: [
        {
          id: "m-1",
          level: 1,
          title: "Inspect SAT-LINK Telemetry",
          instruction: "Review the orbital burst frequency (14.245 GHz) and carrier lock flags."
        },
        {
          id: "m-2",
          level: 2,
          title: "Analyze Ground Downlink",
          instruction: "Run 'trace STATION_AZORES_9' in your terminal to isolate the uplink station."
        }
      ],
      terminalIntel: {
        targetIp: "STATION_AZORES_9",
        internalIp: "SAT-LINK-9",
        domain: "orbital-midnight.mil",
        syndicateName: "Unknown State Collective",
        suspectHandle: "@ghost_relay",
        coordinates: "38°42'N 27°13'W",
        locationName: "Azores Ground Facility",
        customTraces: {}
      },
      operationName: "Operation Midnight",
      operationId: "legacy-om"
    };
  }

  // Default flagship fallback
  return {
    ...thePhantomProtocolCase,
    hints: [
      {
        id: "p-1",
        level: 1,
        title: "Analyze Access Logs",
        instruction: "Notice the unauthorized POST request using stolen token 'Operative-9' and transfer to IP 10.5.22.1."
      },
      {
        id: "p-2",
        level: 2,
        title: "Trace Target Proxy",
        instruction: "Run 'trace 10.5.22.1' or 'whois 10.5.22.1' in the terminal to find the offshore hosting location."
      },
      {
        id: "p-3",
        level: 3,
        title: "Locate Physical Rendezvous",
        instruction: "The intercepted courier communications indicate a drop at Pier 42 Warehouse at 22:00 UTC."
      }
    ],
    terminalIntel: {
      targetIp: "10.5.22.1",
      internalIp: "192.168.1.104",
      domain: "silent-hand.net",
      syndicateName: "The Silent Hand",
      suspectHandle: "Operative-9",
      coordinates: "37°48'14.2\"N 122°16'44.8\"W",
      locationName: "Pier 42 Industrial Cargo Facility",
      customTraces: {}
    },
    operationName: "The Phantom Protocol",
    operationId: "legacy-phantom"
  };
}

/**
 * Returns the clues associated with a case.
 */
export function getCluesForCase(caseId: string): Clue[] {
  // If generated case, reconstruct clues matching case pattern
  const c = getCaseById(caseId);
  if (caseId === "operation-midnight") return operationMidnightClues;
  if (caseId === "phantom-protocol") return phantomProtocolClues;

  // For dynamically generated cases, generate the matched clues
  const seedOp = generateSyndicateOperation(extractSeedFromCaseId(caseId));
  const matched = seedOp.find(sc => sc.id === caseId);
  if (matched) {
    // Generate corresponding clues
    return generateCluesForDynamicCase(matched);
  }

  return phantomProtocolClues;
}

function extractSeedFromCaseId(caseId: string): number {
  const parts = caseId.split("-");
  const num = parseInt(parts[1], 10);
  return isNaN(num) ? 9999 : num;
}

function generateCluesForDynamicCase(c: DynamicCase): Clue[] {
  return [
    {
      id: `${c.id}-clue-1`,
      caseId: c.id,
      title: "Tactical Telemetry & Access Log",
      type: "log",
      content: `${c.terminalIntel.internalIp} - - [10/Oct/2026:13:55:36 UTC] "GET /admin/secure/data HTTP/1.1" 401 128\n${c.terminalIntel.internalIp} - - [10/Oct/2026:14:02:11 UTC] "POST /api/v1/auth" 200 45\n${c.terminalIntel.targetIp} - - [10/Oct/2026:14:05:01 UTC] "GET /admin/secure/payload" 200 5633`,
      unlockedBy: [],
      isKeyDiscovery: false,
    },
    {
      id: `${c.id}-clue-2`,
      caseId: c.id,
      title: "Network Route & Proxy Attributed",
      type: "document",
      content: `Target IP ${c.terminalIntel.targetIp} routes back through ${c.terminalIntel.domain} on AS9498. Attributed to cyber collective: '${c.terminalIntel.syndicateName}'.`,
      unlockedBy: [`${c.id}-clue-1`],
      isKeyDiscovery: true,
    },
    {
      id: `${c.id}-clue-3`,
      caseId: c.id,
      title: "Intercepted Comms Transmission",
      type: "email",
      content: `FROM: ${c.terminalIntel.suspectHandle}\nTO: COURIER_UNIT\n\n"Downlink payload verified against proxy ${c.terminalIntel.targetIp}. Meet at physical extraction coordinates at 22:00 UTC."`,
      unlockedBy: [`${c.id}-clue-2`],
      isKeyDiscovery: false,
    },
    {
      id: `${c.id}-clue-4`,
      caseId: c.id,
      title: "Physical Delivery Point Confirmed",
      type: "image",
      content: "https://images.unsplash.com/photo-1542282088-fe8426682b8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      unlockedBy: [`${c.id}-clue-3`],
      isKeyDiscovery: true,
    },
  ];
}

function syncLockStates(cases: DynamicCase[]): DynamicCase[] {
  const completed = getCompletedCaseIds();
  const case1Solved = completed.includes(cases[0]?.id || "");
  const case2Solved = completed.includes(cases[1]?.id || "");

  if (cases[0]) {
    cases[0].isSolved = completed.includes(cases[0].id);
    cases[0].isLocked = false;
    cases[0].unlockTag = cases[0].isSolved ? "Case Solved // Archived" : "Clearance L4 Active";
  }

  if (cases[1]) {
    cases[1].isSolved = completed.includes(cases[1].id);
    cases[1].isLocked = !case1Solved;
    cases[1].unlockTag = cases[1].isSolved 
      ? "Case Solved // Archived" 
      : case1Solved 
        ? "Level 5 Unlocked // Ready" 
        : "Requires Level 4 Clearance";
  }

  if (cases[2]) {
    cases[2].isSolved = completed.includes(cases[2].id);
    cases[2].isLocked = !case2Solved;
    cases[2].unlockTag = cases[2].isSolved 
      ? "Master Dossier Solved" 
      : case2Solved 
        ? "Level 6 Unlocked // Master Ready" 
        : "Requires Level 5 Clearance";
  }

  return cases;
}
