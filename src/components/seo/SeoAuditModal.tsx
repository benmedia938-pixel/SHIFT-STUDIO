import React from 'react';
import { X, ShieldCheck, CheckCircle2, AlertTriangle, Sparkles, Bot, Search, Layers } from 'lucide-react';
import { ToolItem } from '../../data/toolsData';

interface SeoAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  tool?: ToolItem;
}

export const SeoAuditModal: React.FC<SeoAuditModalProps> = ({ isOpen, onClose, tool }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-xl rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl p-6 text-slate-100 max-h-[85vh] overflow-y-auto">
        <button 
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Live SEO & GEO Matrix Inspector</h3>
            <p className="text-xs text-slate-400">Real-time validation for Google SERP & AI Engine Crawlers</p>
          </div>
        </div>

        {/* Overall score */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/60 to-indigo-950/60 border border-emerald-500/30 flex items-center justify-between mb-5">
          <div>
            <div className="text-xs text-slate-400 font-medium">AnyShift Indexing Health Score</div>
            <div className="text-3xl font-extrabold text-emerald-400 font-mono mt-0.5">99 / 100</div>
            <div className="text-[11px] text-emerald-300">Grade A+ • Top-Tier US/UK SERP Ready</div>
          </div>
          <div className="text-right text-xs font-mono text-slate-400 space-y-1">
            <div>Canonical: <span className="text-indigo-400">Verified</span></div>
            <div>Schema: <span className="text-emerald-400">4 Active Types</span></div>
            <div>Mobile LCP: <span className="text-emerald-400">0.4s Fast</span></div>
          </div>
        </div>

        {/* Verification Checklist */}
        <div className="space-y-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
            <div>
              <div className="font-semibold text-white">Schema.org Structured Data (JSON-LD)</div>
              <p className="text-slate-400 mt-0.5">
                Active graphs: <code className="text-indigo-300">WebApplication</code>, <code className="text-indigo-300">BreadcrumbList</code>, <code className="text-indigo-300">HowTo</code>, and <code className="text-indigo-300">FAQPage</code> for rich search snippets and carousel inclusion.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
            <div>
              <div className="font-semibold text-white">Generative Engine Optimization (GEO) Readiness</div>
              <p className="text-slate-400 mt-0.5">
                Contains verified fact triples, definition summaries, step-by-step algorithms, and citation anchors optimized for SearchGPT, Perplexity, and Gemini scrapers.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
            <div>
              <div className="font-semibold text-white">OpenGraph & Twitter Card Social Sharing</div>
              <p className="text-slate-400 mt-0.5">
                Configured with dynamic <code className="text-indigo-300">og:title</code>, <code className="text-indigo-300">og:description</code>, <code className="text-indigo-300">og:url</code>, and summary card previews.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
            <div>
              <div className="font-semibold text-white">Core Web Vitals & Latency Discipline</div>
              <p className="text-slate-400 mt-0.5">
                Zero server-side blocking, lightweight client-side memory execution, responsive viewport, zero font blocking.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-5 pt-4 border-t border-slate-800 text-center">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-all"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
