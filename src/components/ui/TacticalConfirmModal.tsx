'use client';

import React, { useEffect, useRef } from 'react';

interface TacticalConfirmModalProps {
  isOpen: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDestructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function TacticalConfirmModal({
  isOpen,
  title,
  description,
  confirmLabel = 'CONFIRM ACTION',
  cancelLabel = 'ABORT',
  isDestructive = false,
  onConfirm,
  onCancel,
  isLoading = false,
}: TacticalConfirmModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-modal-title"
      aria-describedby="confirm-modal-desc"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
    >
      <div
        ref={modalRef}
        className={`relative w-full max-w-md bg-[#0a0c10]/95 border ${
          isDestructive ? 'border-[#ff3366]/50 shadow-[0_0_30px_rgba(255,51,102,0.2)]' : 'border-[#22e0ff]/50 shadow-[0_0_30px_rgba(34,224,255,0.2)]'
        } p-6 font-mono`}
      >
        {/* Corner Decors */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-current text-[#22e0ff]" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-current text-[#22e0ff]" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-current text-[#22e0ff]" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-current text-[#22e0ff]" />

        {/* Header Badge */}
        <div className="flex items-center gap-2 mb-3">
          <span className={`inline-block w-2 h-2 rounded-full animate-ping ${isDestructive ? 'bg-[#ff3366]' : 'bg-[#ffb020]'}`} />
          <span className="text-[10px] tracking-widest uppercase text-slate-400">
            {isDestructive ? 'DESTRUCTIVE DIRECTIVE / OVERRIDE' : 'TACTICAL VERIFICATION REQUIRED'}
          </span>
        </div>

        <h3 id="confirm-modal-title" className="text-base font-bold text-white tracking-wide mb-2 uppercase">
          {title}
        </h3>

        <p id="confirm-modal-desc" className="text-xs text-slate-300 font-sans leading-relaxed mb-6">
          {description}
        </p>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="px-4 py-2 text-xs font-mono uppercase tracking-wider text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer disabled:opacity-50"
          >
            {cancelLabel}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className={`px-4 py-2 text-xs font-mono uppercase tracking-wider font-semibold border transition-all cursor-pointer disabled:opacity-50 flex items-center gap-2 ${
              isDestructive
                ? 'bg-[#ff3366]/20 border-[#ff3366] text-[#ff3366] hover:bg-[#ff3366] hover:text-black shadow-[0_0_15px_rgba(255,51,102,0.3)]'
                : 'bg-[#22e0ff]/20 border-[#22e0ff] text-[#22e0ff] hover:bg-[#22e0ff] hover:text-black shadow-[0_0_15px_rgba(34,224,255,0.3)]'
            }`}
          >
            {isLoading && (
              <span className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
            )}
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
