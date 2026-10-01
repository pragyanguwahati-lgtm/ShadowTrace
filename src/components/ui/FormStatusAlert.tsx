'use client';

import React from 'react';

export type AlertType = 'success' | 'error' | 'warning' | 'info';

interface FormStatusAlertProps {
  type: AlertType;
  title?: string;
  message: string;
  code?: string;
  onDismiss?: () => void;
  className?: string;
}

export default function FormStatusAlert({
  type,
  title,
  message,
  code,
  onDismiss,
  className = '',
}: FormStatusAlertProps) {
  const config = {
    success: {
      border: 'border-[#00ff88]/40',
      bg: 'bg-[#00ff88]/5',
      text: 'text-[#00ff88]',
      icon: (
        <svg className="w-5 h-5 text-[#00ff88] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      defaultTitle: 'TRANSMISSION VERIFIED',
      glow: 'shadow-[0_0_15px_rgba(0,255,136,0.15)]',
    },
    error: {
      border: 'border-[#ff3366]/40',
      bg: 'bg-[#ff3366]/5',
      text: 'text-[#ff3366]',
      icon: (
        <svg className="w-5 h-5 text-[#ff3366] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      defaultTitle: 'OPERATION REJECTED',
      glow: 'shadow-[0_0_15px_rgba(255,51,102,0.15)]',
    },
    warning: {
      border: 'border-[#ffb020]/40',
      bg: 'bg-[#ffb020]/5',
      text: 'text-[#ffb020]',
      icon: (
        <svg className="w-5 h-5 text-[#ffb020] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      defaultTitle: 'TELEMETRY WARNING',
      glow: 'shadow-[0_0_15px_rgba(255,176,32,0.15)]',
    },
    info: {
      border: 'border-[#22e0ff]/40',
      bg: 'bg-[#22e0ff]/5',
      text: 'text-[#22e0ff]',
      icon: (
        <svg className="w-5 h-5 text-[#22e0ff] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      defaultTitle: 'SIGNAL NOTIFICATION',
      glow: 'shadow-[0_0_15px_rgba(34,224,255,0.15)]',
    },
  }[type];

  return (
    <div
      role="alert"
      aria-live="polite"
      className={`relative p-3.5 border rounded-none font-mono text-xs backdrop-blur-md transition-all ${config.border} ${config.bg} ${config.glow} ${className}`}
    >
      {/* Top right corner tick */}
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-current opacity-60" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-current opacity-60" />

      <div className="flex items-start gap-3">
        {config.icon}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-0.5">
            <h4 className={`font-bold tracking-wider uppercase text-[11px] ${config.text}`}>
              {title || config.defaultTitle}
            </h4>
            {code && (
              <span className="text-[10px] text-slate-500 tracking-wider">
                ERR_CODE: [{code}]
              </span>
            )}
          </div>
          <p className="text-slate-300 leading-relaxed font-sans text-xs">
            {message}
          </p>
        </div>

        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            aria-label="Dismiss alert"
            className="text-slate-500 hover:text-slate-300 transition-colors p-0.5 ml-1"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
