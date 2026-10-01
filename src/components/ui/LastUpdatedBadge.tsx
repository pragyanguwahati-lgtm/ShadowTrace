'use client';

import React, { useState, useEffect } from 'react';

interface LastUpdatedBadgeProps {
  timestamp?: string | number | Date;
  prefix?: string;
  className?: string;
}

export default function LastUpdatedBadge({
  timestamp,
  prefix = 'FEED TELEMETRY',
  className = '',
}: LastUpdatedBadgeProps) {
  const [relativeTime, setRelativeTime] = useState<string>('JUST NOW');

  useEffect(() => {
    const targetDate = timestamp ? new Date(timestamp) : new Date();

    const updateRelative = () => {
      const diffMs = Date.now() - targetDate.getTime();
      const diffSec = Math.floor(diffMs / 1000);
      const diffMin = Math.floor(diffSec / 60);
      const diffHours = Math.floor(diffMin / 60);

      if (diffSec < 60) {
        setRelativeTime('SYNCED');
      } else if (diffMin < 60) {
        setRelativeTime(`${diffMin}M AGO`);
      } else if (diffHours < 24) {
        setRelativeTime(`${diffHours}H AGO`);
      } else {
        setRelativeTime(targetDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }));
      }
    };

    updateRelative();
    const interval = setInterval(updateRelative, 30000);
    return () => clearInterval(interval);
  }, [timestamp]);

  const targetDate = timestamp ? new Date(timestamp) : new Date();

  return (
    <div
      className={`inline-flex items-center gap-2 px-2.5 py-1 bg-white/[0.03] border border-white/10 font-mono text-[10px] tracking-wider text-slate-400 select-none ${className}`}
      title={`Telemetry sync: ${targetDate.toISOString()}`}
    >
      <span className="relative flex h-1.5 w-1.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff88] opacity-75" />
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#00ff88]" />
      </span>
      <span className="text-slate-500 uppercase">{prefix}:</span>
      <span className="text-slate-300 font-semibold">{relativeTime}</span>
    </div>
  );
}
