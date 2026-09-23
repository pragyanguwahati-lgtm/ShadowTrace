"use client";

import { useState, useRef, useEffect } from "react";
import { Terminal, Send, ArrowRight, CornerDownLeft, Sparkles, Trash2 } from "lucide-react";

interface TerminalLine {
  type: "system" | "user" | "success" | "error" | "warning" | "intel";
  text: string;
}

interface OSINTTerminalProps {
  onTraceComplete?: (intelKey: string) => void;
}

export default function OSINTTerminal({ onTraceComplete }: OSINTTerminalProps) {
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

  const executeCommand = async (rawQuery: string) => {
    const query = rawQuery.trim();
    if (!query || isProcessing) return;

    setInput("");
    setIsProcessing(true);

    // Append user command to history
    setHistory(prev => [...prev, { type: "user", text: `> ${query}` }]);

    const lower = query.toLowerCase();

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
          { type: "intel", text: "COMMAND DIRECTORY:" },
          { type: "system", text: "  trace <ip>       - Trace network route, ASN & geolocation (e.g. trace 10.5.22.1)" },
          { type: "system", text: "  scan <ip>        - Run port vulnerability audit (e.g. scan 192.168.1.104)" },
          { type: "system", text: "  whois <target>   - Retrieve registry & owner intelligence (e.g. whois 10.5.22.1)" },
          { type: "system", text: "  intel <keyword>  - Query classified threat database (e.g. intel Silent Hand)" },
          { type: "system", text: "  clear            - Wipe current terminal screen" }
        ]);
        setIsProcessing(false);
        return;
      }

      if (lower === "trace") {
        setHistory(prev => [
          ...prev,
          { type: "warning", text: "Syntax Error: Target IP address required." },
          { type: "system", text: "Example: trace 10.5.22.1" }
        ]);
        setIsProcessing(false);
        return;
      }

      if (lower === "scan") {
        setHistory(prev => [
          ...prev,
          { type: "warning", text: "Syntax Error: Target IP address required." },
          { type: "system", text: "Example: scan 192.168.1.104" }
        ]);
        setIsProcessing(false);
        return;
      }

      if (lower === "whois") {
        setHistory(prev => [
          ...prev,
          { type: "warning", text: "Syntax Error: Hostname or IP required." },
          { type: "system", text: "Example: whois 10.5.22.1" }
        ]);
        setIsProcessing(false);
        return;
      }

      if (lower === "intel") {
        setHistory(prev => [
          ...prev,
          { type: "warning", text: "Syntax Error: Keyword required." },
          { type: "system", text: "Example: intel Silent Hand" }
        ]);
        setIsProcessing(false);
        return;
      }

      if (lower.includes("10.5.22.1")) {
        setHistory(prev => [
          ...prev,
          { type: "system", text: "[*] Initiating deep packet trace to 10.5.22.1..." },
          { type: "system", text: "    Hop 1: 192.168.1.1 [Internal Gateway] (0.4ms)" },
          { type: "system", text: "    Hop 2: 172.16.4.254 [Defense Perimeter Firewall] (1.1ms)" },
          { type: "system", text: "    Hop 3: 185.220.101.4 [Anonymizing Relay / Tor Node] (24.8ms)" },
          { type: "warning", text: "    Hop 4: 10.5.22.1 [DESTINATION - OFFSHORE HOSTING]" },
          { type: "intel", text: "=== WHOIS INTELLIGENCE REPORT ===" },
          { type: "system", text: "  Host Name: relay-04.silent-hand.net" },
          { type: "system", text: "  ASN: AS9498 (DarkNet Transit Group)" },
          { type: "system", text: "  Country: Panama [Offshore Bulletproof Hosting]" },
          { type: "system", text: "  Open Ports: 22 (SSH), 443 (HTTPS), 8080 (Encrypted Proxy)" },
          { type: "error", text: "  THREAT LEVEL: CRITICAL" },
          { type: "success", text: "  DEDUCTION: Confirmed primary command-and-control server operated by 'The Silent Hand'." }
        ]);
        onTraceComplete?.("10.5.22.1");
        setIsProcessing(false);
        return;
      }

      if (lower.includes("192.168.1.104")) {
        setHistory(prev => [
          ...prev,
          { type: "system", text: "[*] Scanning internal subnet address 192.168.1.104..." },
          { type: "system", text: "  Device: SEC4-WORKSTATION-09" },
          { type: "system", text: "  Subnet: Section 4 Government Internal Intranet" },
          { type: "system", text: "  Active Session: Operative-9 (Stolen Token)" },
          { type: "warning", text: "  Audit Event: 14:02:11 POST /api/v1/auth HTTP/1.1 (200 OK)" },
          { type: "success", text: "  DEDUCTION: Internal terminal compromised via stolen admin authentication token." }
        ]);
        onTraceComplete?.("192.168.1.104");
        setIsProcessing(false);
        return;
      }

      if (lower.includes("silent hand") || lower.includes("syndicate")) {
        setHistory(prev => [
          ...prev,
          { type: "intel", text: "=== DOSSIER: THE SILENT HAND ===" },
          { type: "system", text: "  Classification: Transnational Cyber-Espionage Collective" },
          { type: "system", text: "  Target: Defense Protocols & Cryptographic Keyrings" },
          { type: "system", text: "  Intercepted Comms: 'Meet at extraction point at 22:00. Bring crypto drive.'" },
          { type: "warning", text: "  Physical Rendezvous: Abandoned Industrial Warehouse, Harbor Basin." },
          { type: "success", text: "  STATUS: Ready to finalize dossier for Case Report." }
        ]);
        onTraceComplete?.("silent-hand");
        setIsProcessing(false);
        return;
      }

      if (lower.includes("warehouse") || lower.includes("extraction") || lower.includes("location") || lower.includes("rendezvous")) {
        setHistory(prev => [
          ...prev,
          { type: "intel", text: "=== SATELLITE & SURVEILLANCE MATCH ===" },
          { type: "system", text: "  Coordinates: 37°48'14.2\"N 122°16'44.8\"W" },
          { type: "system", text: "  Location: Pier 42 Abandoned Industrial Cargo Facility" },
          { type: "system", text: "  Scheduled Time: 22:00 UTC (Today)" },
          { type: "success", text: "  Target Operative-9 confirmed en route with encrypted hardware drive." }
        ]);
        onTraceComplete?.("warehouse");
        setIsProcessing(false);
        return;
      }

      // Default contextual query responder
      setHistory(prev => [
        ...prev,
        { type: "system", text: `[*] Querying global intelligence relays for '${query}'...` },
        { type: "warning", text: "No direct match. Type 'help' for command syntax." }
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
