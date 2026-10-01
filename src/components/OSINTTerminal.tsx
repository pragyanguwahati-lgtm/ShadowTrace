"use client";

import { useState, useRef, useEffect } from "react";
import { Terminal, Send, ArrowRight, CornerDownLeft, Sparkles, Trash2, ShieldCheck } from "lucide-react";
import { sanitizeTerminalInput } from "@/lib/security/sanitize";
import { TerminalIntelligence } from "@/lib/engine/procedural-generator";

interface TerminalLine {
  type: "system" | "user" | "success" | "error" | "warning" | "intel";
  text: string;
}

interface OSINTTerminalProps {
  onTraceComplete?: (intelKey: string) => void;
  terminalIntel?: TerminalIntelligence;
  externalQuery?: string;
}

export default function OSINTTerminal({ 
  onTraceComplete, 
  terminalIntel, 
  externalQuery 
}: OSINTTerminalProps) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<TerminalLine[]>([
    { type: "system", text: "ShadowTrace Tactical OSINT v3.4 [Relay: SECURE_TUNNEL_09]" },
    { type: "system", text: "Type 'help' for command syntax, or enter an IP / domain to analyze." },
    { type: "intel", text: "OPERATIVE DIRECTIVE: Use raw server logs to identify and trace target IPs." }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const terminalBottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    terminalBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, isProcessing]);

  useEffect(() => {
    if (externalQuery) {
      executeCommand(externalQuery);
    }
  }, [externalQuery]);

  const executeCommand = async (rawQuery: string) => {
    const sanitized = sanitizeTerminalInput(rawQuery);
    const query = sanitized.trim();
    if (!query || isProcessing) return;

    setInput("");
    setIsProcessing(true);

    // Append user command to history
    setHistory(prev => [...prev, { type: "user", text: `> ${query}` }]);

    const lower = query.toLowerCase();

    // Contextual target parameters from active case
    const targetIp = terminalIntel?.targetIp || "10.5.22.1";
    const internalIp = terminalIntel?.internalIp || "192.168.1.104";
    const domain = terminalIntel?.domain || "silent-hand.net";
    const syndicate = terminalIntel?.syndicateName || "The Silent Hand";
    const suspectHandle = terminalIntel?.suspectHandle || "Operative-9";
    const coords = terminalIntel?.coordinates || "37°48'14.2\"N 122°16'44.8\"W";
    const locationName = terminalIntel?.locationName || "Pier 42 Abandoned Industrial Cargo Facility";

    // Simulate cyber terminal processing latency
    setTimeout(() => {
      if (lower === "clear" || lower === "cls") {
        setHistory([
          { type: "system", text: "ShadowTrace Tactical OSINT v3.4 [Console Cleared]" }
        ]);
        setIsProcessing(false);
        return;
      }

      if (lower === "help") {
        setHistory(prev => [
          ...prev,
          { type: "intel", text: "COMMAND DIRECTORY (OPERATIVE PROTOCOL):" },
          { type: "system", text: `  trace <ip>       - Trace network route, ASN & geolocation (e.g. trace ${targetIp})` },
          { type: "system", text: `  scan <ip>        - Run port & session vulnerability audit (e.g. scan ${internalIp})` },
          { type: "system", text: `  whois <target>   - Retrieve registry & owner intelligence (e.g. whois ${domain})` },
          { type: "system", text: `  intel <keyword>  - Query threat dossier (e.g. intel ${syndicate.split(" ")[0]})` },
          { type: "system", text: "  clear            - Wipe current terminal screen" }
        ]);
        setIsProcessing(false);
        return;
      }

      if (lower === "trace") {
        setHistory(prev => [
          ...prev,
          { type: "warning", text: "Syntax Error: Target IP address required." },
          { type: "system", text: `Example: trace ${targetIp}` }
        ]);
        setIsProcessing(false);
        return;
      }

      if (lower === "scan") {
        setHistory(prev => [
          ...prev,
          { type: "warning", text: "Syntax Error: Target IP address required." },
          { type: "system", text: `Example: scan ${internalIp}` }
        ]);
        setIsProcessing(false);
        return;
      }

      if (lower === "whois") {
        setHistory(prev => [
          ...prev,
          { type: "warning", text: "Syntax Error: Hostname or IP required." },
          { type: "system", text: `Example: whois ${domain}` }
        ]);
        setIsProcessing(false);
        return;
      }

      if (lower === "intel") {
        setHistory(prev => [
          ...prev,
          { type: "warning", text: "Syntax Error: Threat keyword required." },
          { type: "system", text: `Example: intel ${syndicate}` }
        ]);
        setIsProcessing(false);
        return;
      }

      // Check for target IP trace (supports dynamic generated case targetIp and fallback 10.5.22.1)
      if (lower.includes(targetIp.toLowerCase()) || lower.includes("10.5.22.1")) {
        const customLines = terminalIntel?.customTraces?.[targetIp] || [
          `[*] Initiating deep packet trace to ${targetIp}...`,
          "    Hop 1: 192.168.1.1 [Internal Gateway] (0.4ms)",
          "    Hop 2: 172.16.4.254 [Defense Perimeter Firewall] (1.1ms)",
          "    Hop 3: 185.220.101.4 [Anonymizing Relay / Tor Node] (24.8ms)",
          `    Hop 4: ${targetIp} [DESTINATION: ${domain}] (48.7ms)`,
          "=== WHOIS & ASN INTELLIGENCE REPORT ===",
          `  Host Name: relay-c2.${domain}`,
          `  Autonomous System: AS9498 (${syndicate} DarkNet Transit)`,
          `  Geo Location: Offshore bulletproof datacenter [Active Relay]`,
          "  Open Ports: 22 (SSH), 443 (HTTPS), 8080 (Encrypted C2 Proxy)",
          "  THREAT ATTRIBUTION: CRITICAL",
          `  DEDUCTION: Confirmed primary command-and-control server operated by '${syndicate}'.`
        ];

        setHistory(prev => [
          ...prev,
          ...customLines.map((line: string, idx: number) => ({
            type: idx === customLines.length - 1 ? ("success" as const) : line.includes("===") ? ("intel" as const) : line.includes("CRITICAL") ? ("error" as const) : line.includes("Hop 4") ? ("warning" as const) : ("system" as const),
            text: line
          }))
        ]);
        onTraceComplete?.(targetIp);
        setIsProcessing(false);
        return;
      }

      // Check for internal IP scan (supports dynamic generated case internalIp and fallback 192.168.1.104)
      if (lower.includes(internalIp.toLowerCase()) || lower.includes("192.168.1.104")) {
        setHistory(prev => [
          ...prev,
          { type: "system", text: `[*] Scanning internal subnet address ${internalIp}...` },
          { type: "system", text: `  Device: SEC4-WORKSTATION-09 [Subnet: Intranet Gateway]` },
          { type: "system", text: `  Active Compromise Vector: Token hijacked by suspect handle '${suspectHandle}'` },
          { type: "warning", text: `  Audit Event: 14:02:11 POST /api/v1/auth (Unauthorized administrative token bypass)` },
          { type: "success", text: `  DEDUCTION: Internal terminal compromised. Payloads routed to external C2 proxy ${targetIp}.` }
        ]);
        onTraceComplete?.(internalIp);
        setIsProcessing(false);
        return;
      }

      // Check for domain whois query
      if (lower.includes(domain.toLowerCase()) || lower.includes("silent-hand.net")) {
        setHistory(prev => [
          ...prev,
          { type: "intel", text: `=== WHOIS REGISTRY: ${domain} ===` },
          { type: "system", text: `  Primary Nameserver: ns1.${domain}` },
          { type: "system", text: `  Origin C2 Gateway: ${targetIp}` },
          { type: "system", text: `  Registrar: Off-shore Privacy Guardian Inc.` },
          { type: "warning", text: `  Attribution: ${syndicate}` },
          { type: "success", text: `  STATUS: Verified hostile command-and-control domain for ${syndicate}.` }
        ]);
        onTraceComplete?.(domain);
        setIsProcessing(false);
        return;
      }

      // Check for syndicate dossier
      if (lower.includes(syndicate.toLowerCase()) || lower.includes("silent hand") || lower.includes("syndicate")) {
        setHistory(prev => [
          ...prev,
          { type: "intel", text: `=== CLASSIFIED DOSSIER: ${syndicate.toUpperCase()} ===` },
          { type: "system", text: `  Classification: Transnational Cyber-Espionage Collective` },
          { type: "system", text: `  Primary Proxy: ${targetIp} (${domain})` },
          { type: "system", text: `  Suspect Infiltrator: ${suspectHandle}` },
          { type: "warning", text: `  Intercepted Comms: 'Meet at extraction point at 22:00. Bring crypto drive.'` },
          { type: "system", text: `  Physical Rendezvous: ${locationName} [Coords: ${coords}]` },
          { type: "success", text: `  STATUS: Ready to finalize intelligence dossier for Case Report.` }
        ]);
        onTraceComplete?.(syndicate);
        setIsProcessing(false);
        return;
      }

      // Check for location or rendezvous match
      if (
        lower.includes("warehouse") || 
        lower.includes("extraction") || 
        lower.includes("location") || 
        lower.includes("rendezvous") ||
        lower.includes("pier") ||
        lower.includes(locationName.toLowerCase().split(" ")[0])
      ) {
        setHistory(prev => [
          ...prev,
          { type: "intel", text: "=== SATELLITE & SURVEILLANCE MATCH ===" },
          { type: "system", text: `  Coordinates: ${coords}` },
          { type: "system", text: `  Facility: ${locationName}` },
          { type: "system", text: `  Scheduled Handover: 22:00 UTC (Today)` },
          { type: "success", text: `  Target Operative '${suspectHandle}' confirmed en route with encrypted hardware payload.` }
        ]);
        onTraceComplete?.("rendezvous");
        setIsProcessing(false);
        return;
      }

      // Default contextual query responder
      setHistory(prev => [
        ...prev,
        { type: "system", text: `[*] Querying global intelligence relays for '${query}'...` },
        { type: "warning", text: `No direct match. Type 'help' or try 'trace ${targetIp}', 'whois ${domain}', 'scan ${internalIp}'.` }
      ]);
      setIsProcessing(false);
    }, 400);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(input);
  };

  return (
    <div className="flex flex-col h-full bg-[#0a0f0a] font-mono text-xs md:text-sm text-green-400 select-text overflow-hidden">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-green-900/40 bg-black/50 shrink-0">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-green-400" />
          <span className="text-xs uppercase tracking-widest text-green-500 font-bold">
            OSINT Intelligence Console
          </span>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="hidden md:flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-950/40 border border-emerald-500/30 text-[10px] text-emerald-400 font-mono">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            <span>INPUT SANITIZED</span>
          </div>
          <span className="text-[10px] text-green-500/60 uppercase hidden sm:inline">
            STATUS: <span className="text-green-400 font-bold animate-pulse">CONNECTED</span>
          </span>
          <button
            onClick={() => executeCommand("help")}
            className="px-2.5 py-1 rounded border border-green-900/80 bg-green-950/40 text-green-400 hover:bg-green-500 hover:text-black text-[11px] font-mono transition-colors"
          >
            help
          </button>
          <button
            onClick={() => executeCommand("clear")}
            className="p-1 text-green-500/40 hover:text-green-400 transition-colors"
            title="Clear terminal"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Output Console Logs */}
      <div className="flex-1 p-4 overflow-y-auto space-y-1.5 leading-relaxed">
        {history.map((line, idx) => {
          let colorClass = "text-green-400/90";
          if (line.type === "user") colorClass = "text-accent font-bold";
          else if (line.type === "error") colorClass = "text-red-400 font-bold";
          else if (line.type === "warning") colorClass = "text-amber-400";
          else if (line.type === "intel") colorClass = "text-cyan-300 font-bold";
          else if (line.type === "success") colorClass = "text-emerald-300 font-bold";

          return (
            <div key={idx} className={`${colorClass} whitespace-pre-wrap break-all`}>
              {line.text}
            </div>
          );
        })}

        {isProcessing && (
          <div className="text-green-400 flex items-center gap-2 animate-pulse">
            <span>&gt; Processing OSINT packet...</span>
          </div>
        )}

        <div ref={terminalBottomRef} />
      </div>

      {/* Input Row */}
      <form onSubmit={handleSubmit} className="p-3 border-t border-green-900/40 bg-black/60 shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-accent font-bold text-sm shrink-0">&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isProcessing}
            placeholder="Enter command (e.g. trace 10.5.22.1, scan 192.168.1.104, whois)..."
            className="bg-transparent border-none outline-none flex-1 text-green-400 placeholder:text-green-900/60 font-mono text-xs md:text-sm"
          />
          <button
            type="submit"
            disabled={isProcessing || !input.trim()}
            className="px-3.5 py-1.5 rounded bg-green-500 text-black font-bold text-xs flex items-center gap-1 hover:bg-green-400 transition-colors disabled:opacity-30 shrink-0"
          >
            <span>SEND</span>
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </div>
      </form>
    </div>
  );
}
