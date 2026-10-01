"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Terminal, 
  Search, 
  Binary, 
  MapPin, 
  CheckCircle2, 
  ChevronRight, 
  RotateCcw, 
  ShieldAlert, 
  Cpu, 
  Globe, 
  Lock,
  ArrowRight,
  Eye,
  FileCode
} from "lucide-react";

type DrillType = "exif" | "whois" | "crypto";

export default function OSINTPracticeSandbox() {
  const [activeDrill, setActiveDrill] = useState<DrillType>("exif");
  const [completedDrills, setCompletedDrills] = useState<string[]>([]);
  
  // Drill 1 State
  const [exifRunning, setExifRunning] = useState(false);
  const [exifExtracted, setExifExtracted] = useState(false);
  const [drill1Solved, setDrill1Solved] = useState(false);

  // Drill 2 State
  const [whoisQuery, setWhoisQuery] = useState("darktransit.io");
  const [whoisResult, setWhoisResult] = useState<boolean>(false);
  const [selectedAns2, setSelectedAns2] = useState<string | null>(null);

  // Drill 3 State
  const [cipherInput, setCipherInput] = useState("U0hBRE9XX0FDQ0VTU19LRVk=");
  const [decodedOutput, setDecodedOutput] = useState<string | null>(null);

  const markComplete = (drillId: string) => {
    if (!completedDrills.includes(drillId)) {
      setCompletedDrills([...completedDrills, drillId]);
    }
  };

  const handleExifRun = () => {
    setExifRunning(true);
    setTimeout(() => {
      setExifRunning(false);
      setExifExtracted(true);
    }, 700);
  };

  const handleDrill1Deduction = () => {
    setDrill1Solved(true);
    markComplete("exif");
  };

  const handleWhoisRun = () => {
    setWhoisResult(true);
  };

  const handleDrill2Answer = (ans: string) => {
    setSelectedAns2(ans);
    if (ans === "bulletproof") {
      markComplete("whois");
    }
  };

  const handleDecode = () => {
    try {
      const decoded = atob(cipherInput);
      setDecodedOutput(decoded);
      markComplete("crypto");
    } catch {
      setDecodedOutput("ERROR: Invalid Base64 stream format");
    }
  };

  const handleReset = () => {
    setExifRunning(false);
    setExifExtracted(false);
    setDrill1Solved(false);
    setWhoisResult(false);
    setSelectedAns2(null);
    setDecodedOutput(null);
    setCompletedDrills([]);
  };

  return (
    <div id="practice-sandbox" className="w-full bg-[#0a0c11]/85 border border-cyan-400/25 rounded-2xl shadow-[0_20px_70px_rgba(34,224,255,0.12),0_10px_35px_rgba(0,0,0,0.85)] backdrop-blur-2xl overflow-hidden text-left">
      
      {/* Top Banner Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 sm:px-6 py-4 bg-black/60 border-b border-cyan-400/20 font-mono text-xs">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-cyan-300 font-bold uppercase tracking-wider">
            OSINT Proving Grounds // Tactical Sandbox
          </span>
          <span className="text-muted/40 hidden sm:inline">•</span>
          <span className="text-muted hidden sm:inline">Clearance: Training Drill</span>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <span className="text-muted">
            Completed: <span className="text-cyan-300 font-bold">{completedDrills.length} / 3</span>
          </span>
          {completedDrills.length > 0 && (
            <button
              type="button"
              onClick={handleReset}
              className="text-muted hover:text-text flex items-center gap-1 transition-colors text-[11px]"
              title="Reset Sandbox Progress"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Sandbox Layout */}
      <div className="p-6 sm:p-8">
        
        {/* Header Intro */}
        <div className="max-w-2xl mb-7">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber/35 bg-amber/10 text-amber font-mono text-xs uppercase tracking-wider mb-2.5">
            <Cpu className="w-3.5 h-3.5" />
            <span>Interactive Hands-On Practice</span>
          </div>
          <h3 className="font-mono text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
            Practice the Core Tradecraft
          </h3>
          <p className="text-muted text-sm sm:text-base leading-relaxed">
            Execute real reconnaissance operations directly in this simulated sandbox. Extract hidden metadata, trace rogue DNS domains, and decode intercepted keys before handling full-scale live cases.
          </p>
        </div>

        {/* Drill Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 font-mono text-xs">
          
          <button
            type="button"
            onClick={() => setActiveDrill("exif")}
            className={`p-3.5 rounded-xl border text-left transition-all flex items-center justify-between ${
              activeDrill === "exif"
                ? "border-cyan-400 bg-cyan-400/10 text-white shadow-[0_0_18px_rgba(34,224,255,0.18)]"
                : "border-cyan-400/20 bg-black/40 text-muted hover:text-text hover:bg-white/5"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Eye className="w-4 h-4 text-cyan-300" />
              <div>
                <div className="font-bold">01. EXIF Forensics</div>
                <div className="text-[10px] text-muted font-normal">Extract Hidden GPS Data</div>
              </div>
            </div>
            {completedDrills.includes("exif") && (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveDrill("whois")}
            className={`p-3.5 rounded-xl border text-left transition-all flex items-center justify-between ${
              activeDrill === "whois"
                ? "border-cyan-400 bg-cyan-400/10 text-white shadow-[0_0_18px_rgba(34,224,255,0.18)]"
                : "border-cyan-400/20 bg-black/40 text-muted hover:text-text hover:bg-white/5"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Globe className="w-4 h-4 text-amber" />
              <div>
                <div className="font-bold">02. WHOIS / ASN Recon</div>
                <div className="text-[10px] text-muted font-normal">Trace C2 Proxy Origin</div>
              </div>
            </div>
            {completedDrills.includes("whois") && (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveDrill("crypto")}
            className={`p-3.5 rounded-xl border text-left transition-all flex items-center justify-between ${
              activeDrill === "crypto"
                ? "border-cyan-400 bg-cyan-400/10 text-white shadow-[0_0_18px_rgba(34,224,255,0.18)]"
                : "border-cyan-400/20 bg-black/40 text-muted hover:text-text hover:bg-white/5"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Binary className="w-4 h-4 text-cyan-400" />
              <div>
                <div className="font-bold">03. Payload Decrypt</div>
                <div className="text-[10px] text-muted font-normal">Unmask Base64 Ciphers</div>
              </div>
            </div>
            {completedDrills.includes("crypto") && (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            )}
          </button>

        </div>

        {/* ========================================================= */}
        {/* ACTIVE DRILL WORKSPACE                                    */}
        {/* ========================================================= */}
        <div className="rounded-xl border border-cyan-400/20 bg-black/50 p-5 sm:p-6 backdrop-blur-xl">
          
          {/* DRILL 1: EXIF METADATA FORENSICS */}
          {activeDrill === "exif" && (
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-cyan-400/15 pb-4">
                <div>
                  <h4 className="font-mono text-base font-bold text-white flex items-center gap-2">
                    <span>Target Artifact:</span>
                    <span className="text-cyan-300 font-mono text-sm px-2 py-0.5 rounded bg-cyan-400/10 border border-cyan-400/20">
                      surveillance_drop_09.jpg
                    </span>
                  </h4>
                  <p className="text-muted text-xs mt-1">
                    An undercover operative photographed an exchange point. The visual image is scrubbed, but camera sensor metadata was overlooked.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleExifRun}
                  disabled={exifRunning || exifExtracted}
                  className="px-4 py-2 rounded-lg bg-cyan-400 hover:bg-cyan-300 disabled:opacity-60 text-[#0a0c11] font-mono text-xs font-bold transition-all shadow-[0_0_15px_rgba(34,224,255,0.3)] shrink-0"
                >
                  {exifRunning ? "Extracting Tags..." : exifExtracted ? "Metadata Extracted ✓" : "Run Exiftool"}
                </button>
              </div>

              {/* Terminal Output Area */}
              {exifExtracted ? (
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-[#07090c] border border-cyan-400/25 font-mono text-xs leading-relaxed">
                    <div className="text-muted/60 pb-2 mb-2 border-b border-white/5 flex items-center justify-between">
                      <span>STDOUT: exiftool -AllTags surveillance_drop_09.jpg</span>
                      <span className="text-emerald-400 font-bold">PARSED [200 OK]</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-muted">
                      <div>Camera Make: <span className="text-text">Sony Alpha A7R IV</span></div>
                      <div>Capture Date: <span className="text-text">2026-10-01 22:14:09 UTC</span></div>
                      <div className="text-cyan-300 font-semibold bg-cyan-950/40 p-1 rounded">
                        GPS Latitude: 37° 48&apos; 14.2&quot; N
                      </div>
                      <div className="text-cyan-300 font-semibold bg-cyan-950/40 p-1 rounded">
                        GPS Longitude: 122° 16&apos; 44.8&quot; W
                      </div>
                      <div>Author Handle: <span className="text-amber">Operative-9 @ Silent Hand</span></div>
                      <div>Color Profile: <span className="text-text">Uncalibrated RGB</span></div>
                    </div>
                  </div>

                  {/* Deduction Question */}
                  <div className="p-4 rounded-lg bg-cyan-950/20 border border-cyan-400/30 font-mono text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="text-cyan-300 font-bold text-sm mb-1">
                        Deduction: Where is the physical delivery point?
                      </div>
                      <div className="text-muted text-xs">
                        Correlating 37°48&apos;14.2&quot;N 122°16&apos;44.8&quot;W against San Francisco maritime maps:
                      </div>
                    </div>

                    {!drill1Solved ? (
                      <button
                        type="button"
                        onClick={handleDrill1Deduction}
                        className="px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-bold transition-all shrink-0"
                      >
                        Verify: Pier 42 Warehouse
                      </button>
                    ) : (
                      <div className="flex items-center gap-2 text-emerald-400 font-bold bg-emerald-950/40 px-3 py-1.5 rounded border border-emerald-500/40">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Identified: Pier 42 Warehouse (San Francisco)</span>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center font-mono text-xs text-muted/60 border border-dashed border-cyan-400/20 rounded-lg">
                  Click &quot;Run Exiftool&quot; above to parse binary EXIF headers from the staged file.
                </div>
              )}
            </div>
          )}

          {/* DRILL 2: WHOIS & ASN NETWORK RECON */}
          {activeDrill === "whois" && (
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-cyan-400/15 pb-4">
                <div>
                  <h4 className="font-mono text-base font-bold text-white flex items-center gap-2">
                    <span>Target Domain:</span>
                    <span className="text-amber font-mono text-sm px-2 py-0.5 rounded bg-amber/10 border border-amber/25">
                      darktransit.io
                    </span>
                  </h4>
                  <p className="text-muted text-xs mt-1">
                    An outbound relay link was spotted in server logs. Query registry records to identify the Autonomous System hosting the C2 proxy.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleWhoisRun}
                  className="px-4 py-2 rounded-lg bg-amber hover:bg-amber-300 text-[#0a0c11] font-mono text-xs font-bold transition-all shadow-[0_0_15px_rgba(255,176,32,0.3)] shrink-0"
                >
                  Query WHOIS: darktransit.io
                </button>
              </div>

              {whoisResult ? (
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-[#07090c] border border-amber/25 font-mono text-xs leading-relaxed text-muted">
                    <div className="text-muted/60 pb-2 mb-2 border-b border-white/5 flex items-center justify-between">
                      <span>WHOIS // ASN RESOLUTION</span>
                      <span className="text-amber font-bold">ROUTE IDENTIFIED</span>
                    </div>
                    <p className="text-text">Domain Name: <span className="text-white font-bold">darktransit.io</span></p>
                    <p>Registrar: <span className="text-cyan-300">Njalla Offshore Privacy Proxy</span></p>
                    <p>IP Address: <span className="text-amber font-bold">10.5.22.1</span> (Panama Transit Gateway)</p>
                    <p>Origin AS: <span className="text-text font-bold">AS9498</span> (Offshore Bulletproof Hosting)</p>
                    <p>TXT Record: <span className="text-muted/80">v=spf1 include:silenthand-c2.net ~all</span></p>
                  </div>

                  {/* Deduction Multiple Choice */}
                  <div className="p-4 rounded-lg bg-amber/10 border border-amber/30 font-mono text-xs">
                    <div className="text-amber font-bold text-sm mb-2">
                      Tactical Assessment: What infrastructure profile does this domain use?
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => handleDrill2Answer("bulletproof")}
                        className={`p-3 rounded-lg border text-left transition-all ${
                          selectedAns2 === "bulletproof"
                            ? "border-emerald-400 bg-emerald-500/20 text-emerald-300 font-bold"
                            : "border-white/10 hover:border-amber bg-black/40 text-muted"
                        }`}
                      >
                        A) Offshore Bulletproof Proxy / Bulletproof Hosting
                        {selectedAns2 === "bulletproof" && " ✓ (Verified)"}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDrill2Answer("cloudflare")}
                        className={`p-3 rounded-lg border text-left transition-all ${
                          selectedAns2 === "cloudflare"
                            ? "border-red-400 bg-red-500/20 text-red-300"
                            : "border-white/10 hover:border-amber bg-black/40 text-muted"
                        }`}
                      >
                        B) Legitimate Domestic Cloud CDN
                        {selectedAns2 === "cloudflare" && " ✗ (Incorrect)"}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center font-mono text-xs text-muted/60 border border-dashed border-amber/25 rounded-lg">
                  Click &quot;Query WHOIS: darktransit.io&quot; above to inspect domain registrar and autonomous routing data.
                </div>
              )}
            </div>
          )}

          {/* DRILL 3: CRYPTOGRAPHIC DECRYPT */}
          {activeDrill === "crypto" && (
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-cyan-400/15 pb-4">
                <div>
                  <h4 className="font-mono text-base font-bold text-white flex items-center gap-2">
                    <span>Intercepted Stream:</span>
                    <span className="text-cyan-300 font-mono text-sm px-2 py-0.5 rounded bg-cyan-400/10 border border-cyan-400/20">
                      base64_packet_payload
                    </span>
                  </h4>
                  <p className="text-muted text-xs mt-1">
                    An encoded parameter was intercepted in an HTTP header. Decode the string to inspect the plain-text security token.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleDecode}
                  className="px-4 py-2 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-[#0a0c11] font-mono text-xs font-bold transition-all shadow-[0_0_15px_rgba(34,224,255,0.3)] shrink-0"
                >
                  Decode Base64
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex flex-col gap-1 font-mono text-xs">
                  <label className="text-muted">Encoded Intercepted Buffer:</label>
                  <input
                    type="text"
                    value={cipherInput}
                    onChange={(e) => setCipherInput(e.target.value)}
                    className="p-3 rounded-lg bg-[#07090c] border border-cyan-400/25 text-cyan-300 font-mono text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>

                {decodedOutput && (
                  <div className="p-4 rounded-lg bg-[#07090c] border border-emerald-500/30 font-mono text-xs">
                    <div className="text-muted/60 pb-2 mb-2 border-b border-white/5 flex items-center justify-between">
                      <span>DECODED STREAM RESULT</span>
                      <span className="text-emerald-400 font-bold">CIPHER DISASSEMBLED</span>
                    </div>
                    <div className="text-emerald-400 font-bold text-sm tracking-wide break-all">
                      &gt; {decodedOutput}
                    </div>
                    <p className="text-muted text-xs mt-2">
                      Authentication key reveals: Token is configured for Operative-9 on the Panama gateway.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>

        {/* ========================================================= */}
        {/* BOTTOM READINESS VERDICT & NEXT STEP                      */}
        {/* ========================================================= */}
        <div className="mt-7 pt-6 border-t border-cyan-400/15 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs font-mono ${
              completedDrills.length === 3 
                ? "bg-emerald-400/20 text-emerald-400 border border-emerald-400/40" 
                : "bg-cyan-400/10 text-cyan-300 border border-cyan-400/30"
            }`}>
              {completedDrills.length}/3
            </div>
            <div>
              <div className="text-white font-mono text-xs font-bold">
                {completedDrills.length === 3 
                  ? "Training Drills Completed · Ready for Active Clearance" 
                  : "Complete all 3 reconnaissance drills to verify readiness"}
              </div>
              <div className="text-muted text-[11px] font-mono">
                {completedDrills.length === 3 
                  ? "You have demonstrated mastery in EXIF parsing, WHOIS correlation, and cipher disassembly."
                  : "Click each tab above and execute the practice commands."}
              </div>
            </div>
          </div>

          <Link
            href="/cases"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-mono text-xs font-bold px-6 py-3 rounded-full bg-cyan-400 hover:bg-cyan-300 text-[#0a0c11] transition-all shadow-[0_0_20px_rgba(34,224,255,0.35)] shrink-0"
          >
            <span>Launch Active Investigation</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </div>
  );
}
