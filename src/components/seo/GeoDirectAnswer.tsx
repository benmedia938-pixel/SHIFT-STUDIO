import React from 'react';
import { CheckCircle2, ShieldCheck, Zap, HelpCircle, FileText, Info } from 'lucide-react';
import { ToolItem } from '../../data/toolsData';

interface GeoDirectAnswerProps {
  tool: ToolItem;
}

export const GeoDirectAnswer: React.FC<GeoDirectAnswerProps> = ({ tool }) => {
  return (
    <section aria-labelledby="geo-quick-summary-title" className="my-8 rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
            <Info className="w-4 h-4" />
          </div>
          <div>
            <h3 id="geo-quick-summary-title" className="text-base font-bold text-white">
              About {tool.name}
            </h3>
            <p className="text-xs text-slate-400">Everything you need to know about this tool</p>
          </div>
        </div>

        <span className="text-xs text-emerald-400 font-mono bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-500/20">
          Client-Side Verified
        </span>
      </div>

      {/* Main Definitive Summary (Optimal for both humans and AI answer engines) */}
      <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 text-sm text-slate-200 leading-relaxed">
        <p>
          <strong className="text-white font-semibold">What is {tool.name}?</strong> {tool.geoSummary}
        </p>
      </div>

      {/* Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
        <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
          <div className="flex items-center gap-1.5 text-indigo-400 font-semibold mb-1">
            <Zap className="w-3.5 h-3.5" />
            Fast & Browser-Based
          </div>
          <p className="text-slate-400">
            Executes directly inside your browser with instant processing speeds and zero queue waiting.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
          <div className="flex items-center gap-1.5 text-emerald-400 font-semibold mb-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            100% Private
          </div>
          <p className="text-slate-400">
            Your files and calculations never leave your computer or get saved onto external servers.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
          <div className="flex items-center gap-1.5 text-amber-400 font-semibold mb-1">
            <FileText className="w-3.5 h-3.5" />
            Accurate Standards
          </div>
          <p className="text-slate-400">
            Verified to match current industry formulas, file encoding rules, and official 2026 rates.
          </p>
        </div>
      </div>

      {/* How-To Steps */}
      {tool.howToSteps && tool.howToSteps.length > 0 && (
        <div className="pt-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-indigo-400" />
            How to Use {tool.name}
          </h4>
          <ol className="space-y-2">
            {tool.howToSteps.map((step, idx) => (
              <li key={idx} className="flex items-start gap-3 text-xs text-slate-300 bg-slate-950/40 p-2.5 rounded-xl border border-slate-800/60">
                <span className="w-5 h-5 rounded-full bg-indigo-600/20 text-indigo-400 font-mono font-bold flex items-center justify-center shrink-0 text-[11px]">
                  {idx + 1}
                </span>
                <span className="pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* FAQs */}
      {tool.faqs && tool.faqs.length > 0 && (
        <div className="pt-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-amber-400" />
            Frequently Asked Questions
          </h4>
          <div className="space-y-2">
            {tool.faqs.map((faq, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/70">
                <h5 className="text-xs font-semibold text-white mb-1">{faq.question}</h5>
                <p className="text-xs text-slate-400 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
