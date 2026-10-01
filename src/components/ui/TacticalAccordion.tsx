'use client';

import React, { useState } from 'react';

export interface AccordionItem {
  id: string;
  question: string;
  answer: string | React.ReactNode;
  category?: string;
}

interface TacticalAccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  className?: string;
}

export default function TacticalAccordion({
  items,
  allowMultiple = false,
  className = '',
}: TacticalAccordionProps) {
  const [openIds, setOpenIds] = useState<string[]>([items[0]?.id || '']);

  const toggle = (id: string) => {
    if (allowMultiple) {
      setOpenIds(prev => (prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]));
    } else {
      setOpenIds(prev => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={`space-y-2 font-mono ${className}`}>
      {items.map((item, idx) => {
        const isOpen = openIds.includes(item.id);
        const sectionNum = String(idx + 1).padStart(2, '0');

        return (
          <div
            key={item.id}
            className={`border transition-all duration-200 ${
              isOpen
                ? 'border-[#22e0ff]/40 bg-[#22e0ff]/[0.02] shadow-[0_0_15px_rgba(34,224,255,0.06)]'
                : 'border-white/10 bg-black/40 hover:border-white/20'
            }`}
          >
            <button
              type="button"
              onClick={() => toggle(item.id)}
              aria-expanded={isOpen}
              aria-controls={`accordion-content-${item.id}`}
              className="w-full flex items-center justify-between p-3.5 text-left text-xs font-mono uppercase tracking-wider text-slate-200 hover:text-white cursor-pointer select-none transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-[#22e0ff]/70 font-mono">
                  [{sectionNum}]
                </span>
                <span className="font-semibold text-slate-200">
                  {item.question}
                </span>
                {item.category && (
                  <span className="hidden sm:inline-block text-[9px] px-1.5 py-0.5 border border-white/10 text-slate-400 bg-white/5 uppercase">
                    {item.category}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 shrink-0 ml-3">
                <span className={`text-[10px] text-[#22e0ff] transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`}>
                  ▶
                </span>
              </div>
            </button>

            {isOpen && (
              <div
                id={`accordion-content-${item.id}`}
                className="px-4 pb-4 pt-1 text-xs text-slate-300 font-sans leading-relaxed border-t border-white/5 animate-fade-in"
              >
                {typeof item.answer === 'string' ? (
                  <p>{item.answer}</p>
                ) : (
                  item.answer
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
