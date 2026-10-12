import React, { useState, useEffect } from 'react';
import { Download, Sparkles, ShieldCheck, CheckCircle2, ExternalLink, X, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { getAdConfig, triggerSmartlink, ADSTERRA_KEYS } from './adConfig';
import { AdsterraBanner } from './AdsterraBanner';

interface DownloadAdModalProps {
  isOpen: boolean;
  fileName: string;
  fileBlobUrl?: string;
  onClose: () => void;
  onExecuteDownload: () => void;
}

export const DownloadAdModal: React.FC<DownloadAdModalProps> = ({
  isOpen,
  fileName,
  fileBlobUrl,
  onClose,
  onExecuteDownload
}) => {
  const [config] = useState(getAdConfig());
  const [countdown, setCountdown] = useState(4);
  const [step, setStep] = useState<1 | 2>(1);
  const [hasClickedAd, setHasClickedAd] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setCountdown(config.interstitialDelaySeconds || 4);
      setStep(config.twoClickUnlockEnabled ? 1 : 2);
      setHasClickedAd(false);
      return;
    }

    setCountdown(config.interstitialDelaySeconds || 4);
    setStep(config.twoClickUnlockEnabled ? 1 : 2);

    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, config]);

  if (!isOpen) return null;

  const handleStep1Click = () => {
    setHasClickedAd(true);
    // Trigger real Adsterra Smartlink 1 or 2 in new tab
    triggerSmartlink(Math.floor(Math.random() * 3));
    // Transition to unlock download step
    setStep(2);
  };

  const handleFinalDownload = () => {
    // Optionally trigger second Smartlink if desired
    triggerSmartlink(1);

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // Ignore if confetti error
    }

    onExecuteDownload();
    onClose();
  };

  const progressPercent = Math.max(0, Math.min(100, ((config.interstitialDelaySeconds - countdown) / config.interstitialDelaySeconds) * 100));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl p-6 text-slate-100 overflow-hidden">
        {/* Top gradient accent */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

        <button 
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Download className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Your File Is Ready!</h3>
            <p className="text-xs text-slate-400 font-mono truncate max-w-xs">{fileName}</p>
          </div>
        </div>

        {/* Step progress pills */}
        <div className="flex items-center gap-2 mb-4">
          <div className={`flex-1 py-1 px-2 rounded-lg text-[11px] font-semibold flex items-center justify-center gap-1.5 ${step === 1 ? 'bg-indigo-600 text-white' : 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/30'}`}>
            <span className="w-4 h-4 rounded-full bg-black/30 flex items-center justify-center text-[10px]">1</span>
            {step === 1 ? 'Verification & Sponsor' : 'Verified'}
          </div>
          <div className={`flex-1 py-1 px-2 rounded-lg text-[11px] font-semibold flex items-center justify-center gap-1.5 ${step === 2 ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
            <span className="w-4 h-4 rounded-full bg-black/30 flex items-center justify-center text-[10px]">2</span>
            Download File
          </div>
        </div>

        {/* Real Adsterra 300x250 Banner inside modal */}
        <div className="rounded-xl border border-slate-700 bg-slate-950/80 p-3 mb-4 text-center">
          <div className="flex items-center justify-between text-[10px] uppercase font-mono text-slate-400 mb-2">
            <span className="flex items-center gap-1 text-emerald-400"><ShieldCheck className="w-3.5 h-3.5" /> Adsterra High-CPM Sponsor</span>
            <span className="text-indigo-400">Sponsored</span>
          </div>

          <div className="flex justify-center items-center overflow-hidden">
            <AdsterraBanner type="300x250" />
          </div>

          <button
            onClick={handleStep1Click}
            type="button"
            className="w-full mt-3 py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-750 text-indigo-300 text-xs font-semibold flex items-center justify-center gap-1.5 border border-slate-700 hover:border-indigo-500/40 transition-all cursor-pointer"
          >
            Visit Sponsor Offer (Adsterra Direct Link)
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>

        {/* Countdown / Download Action */}
        {step === 1 ? (
          <div>
            <div className="mb-3">
              <div className="flex justify-between text-xs text-slate-400 mb-1">
                <span>Generating secure direct download token...</span>
                <span className="font-mono text-indigo-400">{countdown > 0 ? `${countdown}s` : 'Ready'}</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-indigo-500 to-blue-500 transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            <button
              disabled={countdown > 0}
              onClick={handleStep1Click}
              type="button"
              className={`w-full py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                countdown > 0
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-600/30 scale-[1.01] cursor-pointer'
              }`}
            >
              {countdown > 0 ? (
                <>Please wait {countdown} seconds...</>
              ) : (
                <>
                  Click Here to Continue &rarr; (Step 1 of 2)
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>Security scan passed! Download authorization unlocked.</span>
            </div>

            <button
              onClick={handleFinalDownload}
              type="button"
              className="w-full py-3.5 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 active:scale-95 transition-all animate-pulse cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Download Your File Now (Free)
            </button>
          </div>
        )}

        <div className="mt-4 text-center text-[11px] text-slate-400">
          Zero data stored on servers • 100% private client-side processing
        </div>
      </div>
    </div>
  );
};
