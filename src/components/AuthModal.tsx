"use client";

import { useState, useEffect } from "react";
import { 
  Shield, 
  X, 
  Lock, 
  User as UserIcon, 
  CheckCircle2, 
  AlertCircle, 
  LogOut, 
  KeyRound,
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  getActiveUser, 
  registerOperative, 
  loginOperative, 
  logoutOperative, 
  enableGuestSession,
  OperativeAccount 
} from "@/lib/auth/user-store";
import PasswordInput from "./ui/PasswordInput";
import FormStatusAlert from "./ui/FormStatusAlert";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  initialMode?: "login" | "register";
  promptTitle?: string;
  promptDescription?: string;
}

export default function AuthModal({ 
  isOpen, 
  onClose, 
  onSuccess,
  initialMode = "register",
  promptTitle,
  promptDescription
}: AuthModalProps) {
  const [currentUser, setCurrentUser] = useState<OperativeAccount | null>(null);
  const [mode, setMode] = useState<"login" | "register">(initialMode);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setErrorMsg(null);
      setSuccessMsg(null);
    }
  }, [isOpen, initialMode]);

  useEffect(() => {
    const syncUser = () => {
      setCurrentUser(getActiveUser());
    };
    syncUser();
    window.addEventListener("shadowtrace-auth-updated", syncUser);
    return () => window.removeEventListener("shadowtrace-auth-updated", syncUser);
  }, []);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setIsSubmitting(true);

    try {
      if (mode === "register") {
        const res = await registerOperative(username, password);
        if (!res.success) {
          setErrorMsg(res.error || "Failed to create operative credentials.");
        } else {
          setSuccessMsg(`Operative profile created! Welcome, ${res.user?.username}.`);
          setTimeout(() => {
            onClose();
            onSuccess?.();
          }, 800);
        }
      } else {
        const res = await loginOperative(username, password);
        if (!res.success) {
          setErrorMsg(res.error || "Authentication failed.");
        } else {
          setSuccessMsg(`Authenticated. Welcome back, ${res.user?.username}.`);
          setTimeout(() => {
            onClose();
            onSuccess?.();
          }, 700);
        }
      }
    } catch (err: any) {
      setErrorMsg("An unexpected cryptographic verification error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    logoutOperative();
    setUsername("");
    setPassword("");
    setSuccessMsg("Operative signed out. Local session terminated.");
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        
        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-md bg-[#0a0c11] border border-cyan-400/30 rounded-2xl shadow-[0_25px_80px_rgba(34,224,255,0.18),0_10px_40px_rgba(0,0,0,0.9)] overflow-hidden text-left font-mono"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-cyan-400/20 bg-black/60 text-xs">
            <div className="flex items-center gap-2 text-cyan-300 font-bold uppercase tracking-wider">
              <Shield className="w-4 h-4 text-cyan-400" />
              <span>ShadowTrace Operative Authentication</span>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-md text-muted hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-6">
            
            {/* If currently logged in, show profile card */}
            {currentUser ? (
              <div className="space-y-5">
                <div className="p-4 rounded-xl border border-cyan-400/30 bg-cyan-950/20 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted">Active Profile</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                      AUTHENTICATED
                    </span>
                  </div>
                  <div className="text-lg font-bold text-white tracking-wide">
                    {currentUser.username}
                  </div>
                  <div className="text-xs text-cyan-300">
                    Clearance: <span className="text-amber font-bold">LEVEL {currentUser.clearanceLevel}</span> • {currentUser.operativeRank}
                  </div>
                  <div className="text-[10px] text-muted/60 pt-1">
                    Operative ID: {currentUser.id} (Data Isolated)
                  </div>
                </div>

                <div className="text-xs text-muted leading-relaxed font-sans">
                  Your case files, history archives, and clearances are securely partitioned to this identity. Other users cannot access or tamper with your dossiers.
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex-1 py-2.5 rounded-lg border border-red-500/40 bg-red-950/20 text-red-400 hover:bg-red-950/40 text-xs font-bold transition-all flex items-center justify-center gap-2"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 py-2.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-black text-xs font-bold transition-all shadow-[0_0_15px_rgba(34,224,255,0.3)]"
                  >
                    Resume Investigation
                  </button>
                </div>
              </div>
            ) : (
              // Login / Register Form
              <div className="space-y-4">
                
                {/* Save Progress Prompt Callout */}
                <div className="p-3.5 rounded-xl border border-cyan-400/40 bg-gradient-to-r from-cyan-950/40 via-cyan-900/20 to-black/40 space-y-1">
                  <div className="flex items-center gap-2 text-cyan-300 text-xs font-bold uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    <span>{promptTitle || "Save Your Progress Before Starting"}</span>
                  </div>
                  <p className="text-[11px] text-muted leading-relaxed font-sans">
                    {promptDescription || "Create an account to retain your solved cases, deductions, and clearance level. If you decline, you can continue in Guest Mode where no progress is stored."}
                  </p>
                </div>

                {/* Mode Switcher */}
                <div className="flex rounded-lg border border-cyan-400/20 bg-black/40 p-1 text-xs">
                  <button
                    type="button"
                    onClick={() => { setMode("register"); setErrorMsg(null); }}
                    className={`flex-1 py-1.5 rounded-md transition-all font-bold ${
                      mode === "register"
                        ? "bg-cyan-400 text-black shadow-sm"
                        : "text-muted hover:text-white"
                    }`}
                  >
                    Create Operative ID
                  </button>
                  <button
                    type="button"
                    onClick={() => { setMode("login"); setErrorMsg(null); }}
                    className={`flex-1 py-1.5 rounded-md transition-all font-bold ${
                      mode === "login"
                        ? "bg-cyan-400 text-black shadow-sm"
                        : "text-muted hover:text-white"
                    }`}
                  >
                    Sign In
                  </button>
                </div>

                {errorMsg && (
                  <FormStatusAlert
                    type="error"
                    title="AUTHENTICATION REJECTED"
                    message={errorMsg}
                    onDismiss={() => setErrorMsg(null)}
                  />
                )}

                {successMsg && (
                  <FormStatusAlert
                    type="success"
                    title="AUTHORIZATION GRANTED"
                    message={successMsg}
                  />
                )}

                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-muted block mb-1">
                      Operative Username:
                    </label>
                    <div className="relative">
                      <UserIcon className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="e.g. operative_ghost"
                        className="w-full bg-[#06080a] border border-cyan-400/30 rounded-lg py-2.5 pl-9 pr-3 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-muted block mb-1">
                      Cipher Password:
                    </label>
                    <PasswordInput
                      required
                      value={password}
                      onChange={setPassword}
                      placeholder="••••••••••••"
                      helperText={
                        mode === "register"
                          ? "Minimum 6 characters. Passwords are salted and hashed via SHA-256 before storage."
                          : undefined
                      }
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !username.trim() || !password.trim()}
                    className="w-full mt-2 py-3 rounded-lg bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 text-black font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(34,224,255,0.4)] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{isSubmitting ? "Authenticating..." : mode === "register" ? "Create Operative ID & Save Progress" : "Authenticate & Proceed"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>

                {/* Continue as Guest option */}
                <div className="pt-3 border-t border-cyan-400/15 text-center space-y-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      enableGuestSession();
                      onClose();
                      onSuccess?.();
                    }}
                    className="w-full py-2.5 px-4 rounded-lg border border-border/80 bg-surface/50 hover:bg-surface/80 hover:border-amber/50 text-xs font-mono text-text/80 hover:text-amber transition-all flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    <span>Continue in Guest Mode (No Progress Saved)</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform text-amber" />
                  </button>
                  <p className="text-[10px] text-muted/60 leading-normal">
                    Guest mode enables full access to all investigations, but deductions, clearance XP, and history will not be preserved after this session.
                  </p>
                </div>

              </div>
            )}

          </div>

          {/* Footer Security Note */}
          <div className="px-5 py-2.5 bg-black/80 border-t border-cyan-400/10 text-[10px] text-muted flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Lock className="w-3 h-3 text-cyan-400" />
              <span>Zero User-to-User Cross-Pollution</span>
            </span>
            <span className="text-cyan-300/80">AES/SHA-256 Partitioned</span>
          </div>

        </motion.div>

      </div>
    </AnimatePresence>
  );
}
