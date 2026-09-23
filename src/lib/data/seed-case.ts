import { Case, Clue } from "../firebase/schema";

export const thePhantomProtocolCase: Case = {
  id: "phantom-protocol",
  title: "The Phantom Protocol",
  description: "A highly confidential file has leaked from a secure government server. Can you trace the digital footprints before the perpetrator covers their tracks completely?",
  difficulty: "Medium",
  estimatedTime: 45,
  coverImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  briefingText: "Agent, we have a code red. An unidentified entity breached the primary defense layer of Section 4 last night. They downloaded the 'Phantom Protocol' files. Your job is to analyze the logs, identify the breach point, and uncover the identity of the attacker.",
};

export const phantomProtocolClues: Clue[] = [
  {
    id: "clue-1",
    caseId: "phantom-protocol",
    title: "Server Access Logs",
    type: "log",
    content: "192.168.1.104 - - [10/Oct/2026:13:55:36 -0700] \"GET /admin/secure/phantom HTTP/1.1\" 401 128\n10.5.22.1 - - [10/Oct/2026:14:02:11 -0700] \"POST /api/v1/auth HTTP/1.1\" 200 45\n10.5.22.1 - - [10/Oct/2026:14:05:01 -0700] \"GET /admin/secure/phantom HTTP/1.1\" 200 5633",
    unlockedBy: [],
    isKeyDiscovery: false,
  },
  {
    id: "clue-2",
    caseId: "phantom-protocol",
    title: "Suspicious IP Traced",
    type: "document",
    content: "The IP address 10.5.22.1 routes back to an offshore proxy server commonly used by a collective known as 'The Silent Hand'.",
    unlockedBy: ["clue-1"],
    isKeyDiscovery: true,
  },
  {
    id: "clue-3",
    caseId: "phantom-protocol",
    title: "Intercepted Email",
    type: "email",
    content: "From: X\nTo: Operative-9\n\nThe package is secured. Meet at the extraction point at 22:00. Bring the crypto drive.",
    unlockedBy: ["clue-2"],
    isKeyDiscovery: false,
  },
  {
    id: "clue-4",
    caseId: "phantom-protocol",
    title: "Extraction Point Identified",
    type: "image",
    content: "https://images.unsplash.com/photo-1542282088-fe8426682b8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Abandoned warehouse
    unlockedBy: ["clue-3"],
    isKeyDiscovery: true,
  }
];

export const theOperationMidnightCase: Case = {
  id: "operation-midnight",
  title: "Operation Midnight",
  description: "A classified operation investigating rogue orbital transmissions intercepted over the Atlantic. Track the burst frequency, isolate rogue command keys, and locate the ground terminal.",
  difficulty: "Hard",
  estimatedTime: 120,
  coverImage: "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  briefingText: "Senior Operative, welcome to Level 5. High-frequency telemetry packets were intercepted on military satellite transponders. A covert entity is attempting to override orbital trajectory controls. Decrypt the telemetry logs, identify the rogue ground transmitter, and secure the orbital constellation.",
};

export const operationMidnightClues: Clue[] = [
  {
    id: "om-clue-1",
    caseId: "operation-midnight",
    title: "Orbital Burst Telemetry",
    type: "log",
    content: "SAT-LINK-9 [FREQ: 14.245 GHz] - - [12/Oct/2026:02:14:19 UTC]\nCARRIER_LOCK: POSITIVE\nFRAME_SYNC: 0xDEADBEEF\nPACKET_IN: [AUTH_OVERRIDE_FLAG=1, GROUND_ID=STATION_AZORES_9]\nSTATUS: EMERGENCY PROTOCOL ENGAGED",
    unlockedBy: [],
    isKeyDiscovery: false,
  },
  {
    id: "om-clue-2",
    caseId: "operation-midnight",
    title: "Signal Intercept Record",
    type: "document",
    content: "Intelligence report confirms anomalous burst transmission originating from coordinates in the North Atlantic. Transmission source matches unregistered satellite uplink relay.",
    unlockedBy: ["om-clue-1"],
    isKeyDiscovery: true,
  },
  {
    id: "om-clue-3",
    caseId: "operation-midnight",
    title: "Intercepted Transmission Audio/Text",
    type: "email",
    content: "From: GHOST-RELAY-0\nTo: UNKNOWN\n\nPhase 2 payload queued. Satellite orbital thrusters will burn at 04:00 UTC unless downlink authentication is revoked.",
    unlockedBy: ["om-clue-2"],
    isKeyDiscovery: false,
  },
  {
    id: "om-clue-4",
    caseId: "operation-midnight",
    title: "Ground Station Satellite Image",
    type: "image",
    content: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    unlockedBy: ["om-clue-3"],
    isKeyDiscovery: true,
  }
];
