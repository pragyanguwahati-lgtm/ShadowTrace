/**
 * ShadowTrace Procedural Case Generation Engine
 * Generates interlinked, airtight, and solvable OSINT cases with
 * procedural variation, contextual hints, and terminal telemetry.
 */

import { Case, Clue } from "../firebase/schema";

export interface ContextualHint {
  id: string;
  level: number; // 1 = starter, 2 = correlation, 3 = forensic breakdown
  title: string;
  instruction: string;
  triggerClueId?: string;
}

export interface TerminalIntelligence {
  targetIp: string;
  internalIp: string;
  domain: string;
  syndicateName: string;
  suspectHandle: string;
  coordinates: string;
  locationName: string;
  customTraces: Record<string, string[]>;
}

export interface DynamicCase extends Case {
  hints: ContextualHint[];
  terminalIntel: TerminalIntelligence;
  isLocked?: boolean;
  isSolved?: boolean;
  unlockTag?: string;
  operationName: string;
  operationId: string;
}

// Procedural Pool of Tactical Parameters
const SYNDICATES = [
  { name: "The Silent Hand", focus: "Defense Keyrings & Protocol Exfiltration", tag: "SH-OPS" },
  { name: "Apex Transit Collective", focus: "Orbital Signal Interception & Downlinks", tag: "APX-NET" },
  { name: "Chimera Syndicate", focus: "Maritime Supply Chain & Illicit Hardware", tag: "CHM-09" },
  { name: "Vanguard Crypt", focus: "Financial Wire Laundering & Darknet Transit", tag: "VNG-CRY" },
  { name: "Black Lotus Cell", focus: "Critical Infrastructure Zero-Day Brokering", tag: "BL-CELL" },
];

const LOCATIONS = [
  { name: "Pier 42 Abandoned Cargo Facility", city: "San Francisco, USA", coords: "37°48'14.2\"N 122°16'44.8\"W", hexLat: "37.8039", hexLon: "-122.2791" },
  { name: "Rotterdam Offshore Container Dock", city: "Rotterdam, Netherlands", coords: "51°57'12.4\"N 4°06'35.8\"E", hexLat: "51.9534", hexLon: "4.1099" },
  { name: "Jurong Deepwater Terminal Berth 9", city: "Singapore", coords: "1°18'22.1\"N 103°42'51.6\"E", hexLat: "1.3061", hexLon: "103.7143" },
  { name: "Lisbon Harbor Drydock 4", city: "Lisbon, Portugal", coords: "38°42'19.5\"N 9°08'43.2\"W", hexLat: "38.7054", hexLon: "-9.1453" },
];

const DOMAINS = [
  "darktransit.io",
  "relay-09.silenthand.net",
  "orbital-downlink.ch",
  "vanguard-c2.is",
  "panama-secure-hop.net",
  "as9498-gateway.org",
];

const HANDLES = [
  "@n0va",
  "@v01d",
  "@cipher_x",
  "@ghost_zero",
  "@k3rnel_panic",
  "@shadow_reaper",
];

const FLIGHTS = [
  { icao: "4CA7B2", tail: "N409SX", fl: "FL370", squawk: "7700" },
  { icao: "A9B14F", tail: "G-FXLR", fl: "FL410", squawk: "7600" },
  { icao: "3C64D1", tail: "XA-VTR", fl: "FL350", squawk: "7700" },
  { icao: "89620E", tail: "C-FSTZ", fl: "FL390", squawk: "7700" },
];

/**
 * Deterministically permutes a list based on an integer seed.
 */
function seededPick<T>(array: T[], seed: number, index: number): T {
  const chosenIndex = Math.abs((seed * 37 + index * 17) % array.length);
  return array[chosenIndex];
}

/**
 * Generates an interconnected 3-case Syndicate Operation with airtight deductive clues.
 */
export function generateSyndicateOperation(seed: number = Date.now()): DynamicCase[] {
  const opIndex = Math.abs(seed % SYNDICATES.length);
  const syndicate = SYNDICATES[opIndex];
  const location = seededPick(LOCATIONS, seed, 1);
  const domain = seededPick(DOMAINS, seed, 2);
  const handle = seededPick(HANDLES, seed, 3);
  const flight = seededPick(FLIGHTS, seed, 4);

  const operationId = `op-${Math.abs(seed % 9000) + 1000}`;
  const operationName = `Operation ${syndicate.name.replace("The ", "")}`;

  // Generated Tactical IP addresses
  const internalIp = `192.168.1.${Math.abs((seed % 150) + 50)}`;
  const c2ProxyIp = `10.5.22.${Math.abs((seed % 80) + 10)}`;

  // =========================================================================
  // CASE 1: FLIGHT PATH TELEMETRY (CLEARANCE LEVEL 4) - ENTRY
  // =========================================================================
  const case1Id = `${operationId}-case-01`;
  const case1Clues: Clue[] = [
    {
      id: `${case1Id}-clue-1`,
      caseId: case1Id,
      title: "Server Authentication & Access Logs",
      type: "log",
      content: `${internalIp} - - [10/Oct/2026:13:55:36 -0700] "GET /admin/secure/phantom HTTP/1.1" 401 128\n${internalIp} - - [10/Oct/2026:14:02:11 -0700] "POST /api/v1/auth HTTP/1.1 (Token: Operative-9)" 200 45\n${c2ProxyIp} - - [10/Oct/2026:14:05:01 -0700] "GET /admin/secure/export HTTP/1.1" 200 5633`,
      unlockedBy: [],
      isKeyDiscovery: false,
    },
    {
      id: `${case1Id}-clue-2`,
      caseId: case1Id,
      title: "ADS-B Transponder Flight Telemetry",
      type: "log",
      content: `AIRCRAFT ICAO: ${flight.icao} | TAIL: ${flight.tail}\nSQUAWK: ${flight.squawk} (EMERGENCY DECLARED)\nLAST CONTACT ALT: ${flight.fl} | LAT/LON: 38°12'N 123°45'W\nTRANSPONDER SIGNAL STATUS: OFF AT 03:42Z OVER MARITIME APPROACH`,
      unlockedBy: [`${case1Id}-clue-1`],
      isKeyDiscovery: true,
    },
    {
      id: `${case1Id}-clue-3`,
      caseId: case1Id,
      title: "Rogue Gateway Network Trace",
      type: "document",
      content: `Tactical packet route confirms IP ${c2ProxyIp} originates through autonomous system AS9498 routed through domain '${domain}'. Proxy gateway confirmed active for ${syndicate.name}.`,
      unlockedBy: [`${case1Id}-clue-2`],
      isKeyDiscovery: false,
    },
    {
      id: `${case1Id}-clue-4`,
      caseId: case1Id,
      title: "Intercepted Courier Rendezvous Point",
      type: "image",
      content: "https://images.unsplash.com/photo-1542282088-fe8426682b8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      unlockedBy: [`${case1Id}-clue-3`],
      isKeyDiscovery: true,
    },
  ];

  const case1Hints: ContextualHint[] = [
    {
      id: "c1-h1",
      level: 1,
      title: "Inspect Internal vs Outbound IPs",
      instruction: `Review the Server Access Logs carefully. Notice the unauthorized POST request using stolen token 'Operative-9' and the subsequent outbound transfer to IP ${c2ProxyIp}.`,
    },
    {
      id: "c1-h2",
      level: 2,
      title: "Run Terminal Network Trace",
      instruction: `Use your OSINT Intelligence Console to execute 'trace ${c2ProxyIp}' or 'whois ${domain}' to determine the hosting ASN and proxy operator.`,
      triggerClueId: `${case1Id}-clue-1`,
    },
    {
      id: "c1-h3",
      level: 3,
      title: "Correlate Flight ADS-B Radar",
      instruction: `The aircraft ${flight.tail} shut off its transponder at 03:42Z near maritime waters. Cross-reference the rendezvous coordinates at ${location.coords} to locate the drop point.`,
      triggerClueId: `${case1Id}-clue-2`,
    },
  ];

  const case1Intel: TerminalIntelligence = {
    targetIp: c2ProxyIp,
    internalIp,
    domain,
    syndicateName: syndicate.name,
    suspectHandle: handle,
    coordinates: location.coords,
    locationName: location.name,
    customTraces: {
      [c2ProxyIp]: [
        `[*] Routing packet trace to ${c2ProxyIp}...`,
        `  Hop 1: 192.168.1.1 [Internal Gateway] (0.5ms)`,
        `  Hop 2: 172.16.4.254 [Perimeter Firewall] (1.2ms)`,
        `  Hop 3: 185.220.101.4 [Tor Onion Transit] (32.1ms)`,
        `  Hop 4: ${c2ProxyIp} [DESTINATION: ${domain}] (48.7ms)`,
        `=== WHOIS INTELLIGENCE ===`,
        `  Registrar: Offshore Privacy Proxy LLC`,
        `  AS Number: AS9498 (${syndicate.name} Transit)`,
        `  Jurisdiction: Panama / Neutral Waters`,
        `  THREAT ATTRIBUTION: Confirmed C2 relay for ${syndicate.name}.`,
      ],
      [internalIp]: [
        `[*] Scanning internal device ${internalIp}...`,
        `  Device Name: SEC4-STATION-09`,
        `  Subnet: Internal Defense Intranet`,
        `  Compromise Vector: Admin token hijacked by ${handle}`,
      ],
      [domain]: [
        `WHOIS QUERY: ${domain}`,
        `Registrar: Offshore Privacy Guard`,
        `Primary Nameserver: ns1.${domain}`,
        `Origin C2 Gateway: ${c2ProxyIp}`,
        `Attribution: ${syndicate.name}`,
      ],
    },
  };

  const case1: DynamicCase = {
    id: case1Id,
    title: `${operationName} · Flight Path Telemetry`,
    description: `A private aircraft linked to ${syndicate.name} went dark over open water after an unauthorized access event from ${internalIp}. Correlate the flight telemetry and trace the destination.`,
    difficulty: "Easy",
    estimatedTime: 35,
    coverImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    briefingText: `Operative, Section 4 reported an emergency anomaly. Server ${internalIp} transferred classified payloads to an offshore proxy (${c2ProxyIp}). Simultaneously, aircraft ${flight.tail} squawked emergency ${flight.squawk} and disabled ADS-B tracking. Analyze the logs, trace the proxy, and identify where the payload was delivered.`,
    hints: case1Hints,
    terminalIntel: case1Intel,
    isLocked: false,
    isSolved: false,
    unlockTag: "Clearance Level 4 Active",
    operationName,
    operationId,
  };

  // =========================================================================
  // CASE 2: METADATA LEAK & ORBITAL TELEMETRY (CLEARANCE LEVEL 5) - INTERLINKED
  // =========================================================================
  const case2Id = `${operationId}-case-02`;
  const case2Clues: Clue[] = [
    {
      id: `${case2Id}-clue-1`,
      caseId: case2Id,
      title: "Orbital Satellite Telemetry Intercept",
      type: "log",
      content: `SAT-COM-9 [FREQ: 14.245 GHz] - - [11/Oct/2026:02:14:19 UTC]\nCARRIER_LOCK: POSITIVE | CARRIER_POWER: 48 dBm\nFRAME_SYNC: 0xDEADBEEF\nPACKET_IN: [AUTH_OVERRIDE_FLAG=1, ORIGIN_PROXY=${c2ProxyIp}]\nCMD: DOWNLINK_TRANSMIT_KEYRING_ARCHIVE`,
      unlockedBy: [],
      isKeyDiscovery: false,
    },
    {
      id: `${case2Id}-clue-2`,
      caseId: case2Id,
      title: "Binary Hex Forensics Inspection",
      type: "document",
      content: `0000A0  45 78 69 66 00 00  Exif..\n0000B0  4D 4D 00 2A 00 00  MM.*..\n0000C0  47 50 53 4C 61 74  GPSLat: ${location.hexLat}\n0000D0  47 50 53 4C 6F 6E  GPSLon: ${location.hexLon}\n0000E0  41 75 74 68 6F 72  Author: ${handle}\n0000F0  53 79 6E 64 69 63  Group: ${syndicate.tag}`,
      unlockedBy: [`${case2Id}-clue-1`],
      isKeyDiscovery: true,
    },
    {
      id: `${case2Id}-clue-3`,
      caseId: case2Id,
      title: "Encrypted Radio Transmission Decrypt",
      type: "email",
      content: `FROM: GHOST-RELAY-0\nTO: UNKNOWN [PGP-ENCRYPTED]\n\n"Downlink payload verified against proxy ${c2ProxyIp}. Physical drive delivery confirmed at ${location.name}. Awaiting ${handle} confirmation."`,
      unlockedBy: [`${case2Id}-clue-2`],
      isKeyDiscovery: false,
    },
    {
      id: `${case2Id}-clue-4`,
      caseId: case2Id,
      title: "Satellite Ground Uplink Reconnaissance",
      type: "image",
      content: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      unlockedBy: [`${case2Id}-clue-3`],
      isKeyDiscovery: true,
    },
  ];

  const case2Hints: ContextualHint[] = [
    {
      id: "c2-h1",
      level: 1,
      title: "Cross-Reference Case 1 Proxy IP",
      instruction: `Notice the satellite telemetry packet: ORIGIN_PROXY=${c2ProxyIp}. This matches the exact C2 proxy server discovered during your flight path investigation!`,
    },
    {
      id: "c2-h2",
      level: 2,
      title: "Analyze EXIF Binary Hex Fields",
      instruction: `Inspect the hex dump headers at 0x0000C0 through 0x0000E0. The scrubbed file leaked GPS latitude (${location.hexLat}) and the operative alias '${handle}'.`,
      triggerClueId: `${case2Id}-clue-1`,
    },
    {
      id: "c2-h3",
      level: 3,
      title: "Unmask Ground Terminal",
      instruction: `Correlate coordinates ${location.coords} with ${location.city}. The satellite uplink received its override signal directly from ${location.name}.`,
      triggerClueId: `${case2Id}-clue-2`,
    },
  ];

  const case2: DynamicCase = {
    id: case2Id,
    title: `${operationName} · Orbital Metadata Leak`,
    description: `A classified military satellite transponder intercepted an unauthorized burst transmission. The command packets originated from the proxy IP uncovered in Case 1. Inspect the binary hex dump and identify the uplink station.`,
    difficulty: "Medium",
    estimatedTime: 50,
    coverImage: "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    briefingText: `Senior Operative, military satellite transponders detected an emergency orbital command override. The packets carried authentication headers routing directly back through ${c2ProxyIp}. Inspect the hex dump, trace the author ${handle}, and secure the ground uplink.`,
    hints: case2Hints,
    terminalIntel: case1Intel,
    isLocked: false,
    isSolved: false,
    unlockTag: "Clearance Level 5 Ready",
    operationName,
    operationId,
  };

  // =========================================================================
  // CASE 3: ALIAS FOOTPRINT & NETWORK HUNT (CLEARANCE LEVEL 6) - MASTER DOSSIER
  // =========================================================================
  const case3Id = `${operationId}-case-03`;
  const case3Clues: Clue[] = [
    {
      id: `${case3Id}-clue-1`,
      caseId: case3Id,
      title: "Darknet Forum Pseudonym Intercept",
      type: "document",
      content: `Target Handle: ${handle}\nKnown Associated Identifiers:\n- GitHub Gist PGP Key ID: 0x99F1_${handle.replace("@", "")}\n- Keybase Proof: ${handle.replace("@", "")}_defense_core\n- Onion Marketplace Wallet: bc1q9_${Math.random().toString(36).substring(2, 10)}\n- Associated Operation: ${syndicate.name} [Flag: ${syndicate.tag}]`,
      unlockedBy: [],
      isKeyDiscovery: false,
    },
    {
      id: `${case3Id}-clue-2`,
      caseId: case3Id,
      title: "Cross-Platform Social & Infrastructure Graph",
      type: "log",
      content: `CORRELATED NETWORK TOPOLOGY:\nNode 1 (${handle}) -> linked to C2 Proxy (${c2ProxyIp})\nNode 2 (PGP Keyring) -> signed Flight Protocol (${flight.tail})\nNode 3 (Offshore Shell) -> Panama Logistics Terminal (${location.name})\nDIRECTOR VERDICT: Single operator coordinates both cyber and physical extraction vectors.`,
      unlockedBy: [`${case3Id}-clue-1`],
      isKeyDiscovery: true,
    },
    {
      id: `${case3Id}-clue-3`,
      caseId: case3Id,
      title: "Intercepted Syndicate Mastermind Debrief",
      type: "email",
      content: `FROM: ${handle}@proton.me\nTO: EXECUTIVE_BOARD\n\n"Telemetry neutralized. Aircraft ${flight.tail} is scrubbed and satellite telemetry downlinks confirmed at ${location.name}. Our cryptographic payload is ready for deployment."`,
      unlockedBy: [`${case3Id}-clue-2`],
      isKeyDiscovery: false,
    },
    {
      id: `${case3Id}-clue-4`,
      caseId: case3Id,
      title: "Mastermind Safehouse Satellite Confirmation",
      type: "image",
      content: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      unlockedBy: [`${case3Id}-clue-3`],
      isKeyDiscovery: true,
    },
  ];

  const case3Hints: ContextualHint[] = [
    {
      id: "c3-h1",
      level: 1,
      title: "Trace Handle Across Platforms",
      instruction: `Target '${handle}' was uncovered in the hex metadata of Case 2. Run 'intel ${handle}' or 'intel ${syndicate.name}' to cross-reference known PGP keys and Bitcoin wallets.`,
    },
    {
      id: "c3-h2",
      level: 2,
      title: "Connect the Entire Syndicate Graph",
      instruction: `Tie together all three operations: The flight ${flight.tail}, the proxy ${c2ProxyIp}, and the rendezvous at ${location.name}.`,
      triggerClueId: `${case3Id}-clue-1`,
    },
    {
      id: "c3-h3",
      level: 3,
      title: "Assemble Final Dossier",
      instruction: `The evidence confirms ${handle} is the operational architect for ${syndicate.name}. Finalize your findings and file the verified Master Dossier report.`,
      triggerClueId: `${case3Id}-clue-2`,
    },
  ];

  const case3: DynamicCase = {
    id: case3Id,
    title: `${operationName} · Alias Footprint & Syndicate Web`,
    description: `One pseudonym (${handle}), five darknet nodes, and zero legal names. Connect the accounts, correlate the cryptographic keys with ${syndicate.name}, and unmask the operational architect.`,
    difficulty: "Hard",
    estimatedTime: 90,
    coverImage: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    briefingText: `Master Operative, welcome to Level 6 clearance. We have connected the breach from Case 1 and the satellite leak from Case 2 to an elusive pseudonym: ${handle}. Unmask their digital identity, reconstruct their communication topology, and secure the master syndicate dossier.`,
    hints: case3Hints,
    terminalIntel: case1Intel,
    isLocked: true,
    isSolved: false,
    unlockTag: "Requires Level 5 Clearance",
    operationName,
    operationId,
  };

  return [case1, case2, case3];
}
