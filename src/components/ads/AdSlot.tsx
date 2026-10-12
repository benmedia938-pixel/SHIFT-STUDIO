import React, { useState, useEffect } from 'react';
import { ExternalLink, ShieldCheck, Sparkles } from 'lucide-react';
import { getAdConfig, triggerSmartlink, AdConfiguration, ADSTERRA_KEYS } from './adConfig';
import { AdsterraBanner } from './AdsterraBanner';

interface AdSlotProps {
  placement: 'header-leaderboard' | 'sidebar-skyscraper' | 'in-feed' | 'in-tool' | 'sticky-footer' | 'content-rectangle' | 'native-bar' | 'dual-rectangle';
  className?: string;
  onAdClick?: () => void;
}

export const AdSlot: React.FC<AdSlotProps> = ({ placement, className = '', onAdClick }) => {
  const [config, setConfig] = useState<AdConfiguration>(getAdConfig());

  useEffect(() => {
    const handleUpdate = (e: any) => {
      if (e.detail) setConfig(e.detail);
    };
    window.addEventListener('anyshift_ads_updated', handleUpdate);
    return () => window.removeEventListener('anyshift_ads_updated', handleUpdate);
  }, [placement]);

  if (!config.enabled) return null;

  const handleSmartlinkClick = () => {
    if (onAdClick) onAdClick();
    triggerSmartlink(Math.floor(Math.random() * 3));
  };

  // Header 728x90 (Desktop), 468x60 (Tablet), 320x50 (Mobile) with reserved stable height
  if (placement === 'header-leaderboard') {
    return (
      <aside 
        aria-label="Advertisement" 
        className={`w-full max-w-5xl mx-auto my-3 overflow-hidden rounded-xl border border-slate-800/80 bg-slate-900/40 p-2 shadow-sm text-center min-h-[110px] flex flex-col justify-center ${className}`}
      >
        <div className="flex items-center justify-between px-2 pb-1 text-[10px] uppercase tracking-wider text-slate-500 font-medium select-none">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-400" /> Sponsored Partner
          </span>
          <button 
            type="button" 
            onClick={handleSmartlinkClick}
            className="text-indigo-400 hover:underline font-mono text-[10px] cursor-pointer"
          >
            Direct Offer &rarr;
          </button>
        </div>

        {/* Desktop 728x90 */}
        <div className="hidden md:flex justify-center items-center min-h-[90px] overflow-hidden">
          <AdsterraBanner type="728x90" />
        </div>

        {/* Tablet 468x60 */}
        <div className="hidden sm:flex md:hidden justify-center items-center min-h-[60px] overflow-hidden">
          <AdsterraBanner type="468x60" />
        </div>

        {/* Mobile 320x50 */}
        <div className="flex sm:hidden justify-center items-center min-h-[50px] overflow-hidden">
          <AdsterraBanner type="320x50" />
        </div>
      </aside>
    );
  }

  // Sidebar Skyscraper 160x600 & 300x250 with stable width/height
  if (placement === 'sidebar-skyscraper') {
    return (
      <aside 
        aria-label="Sponsored Content" 
        className={`w-full max-w-[320px] rounded-2xl border border-slate-800 bg-slate-900/90 p-4 shadow-xl sticky top-20 text-center space-y-4 min-h-[550px] ${className}`}
      >
        <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-[10px] uppercase tracking-wider text-slate-400 font-semibold select-none">
          <span className="flex items-center gap-1"><Sparkles className="w-3 h-3 text-amber-400" /> Featured Sponsor</span>
          <span className="text-indigo-400 font-mono">Adsterra Verified</span>
        </div>

        {/* 300x250 Medium Rectangle */}
        <div className="flex justify-center items-center overflow-hidden rounded-xl bg-slate-950 p-1 border border-slate-800/80 min-h-[250px]">
          <AdsterraBanner type="300x250" />
        </div>

        {/* Direct Link High-converting action */}
        <button
          type="button"
          onClick={handleSmartlinkClick}
          className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <span>Claim Verified Sponsor Offer</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>

        {/* 160x300 / 160x600 Skyscraper */}
        <div className="hidden lg:flex justify-center items-center overflow-hidden rounded-xl bg-slate-950 p-1 border border-slate-800/80 min-h-[300px]">
          <AdsterraBanner type="160x300" />
        </div>

        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500">
          <span>Adsterra Network</span>
          <button
            type="button"
            onClick={handleSmartlinkClick}
            className="text-indigo-400 hover:underline cursor-pointer"
          >
            Visit Partner
          </button>
        </div>
      </aside>
    );
  }

  // Dual Rectangle Banners (Two 300x250 side-by-side or stacked on mobile)
  if (placement === 'dual-rectangle') {
    return (
      <div className={`w-full my-4 rounded-2xl border border-slate-800/80 bg-slate-900/50 p-3 shadow-md ${className}`}>
        <div className="flex items-center justify-between text-[10px] text-slate-500 uppercase font-mono mb-2 px-2">
          <span className="flex items-center gap-1 text-emerald-400"><ShieldCheck className="w-3 h-3" /> Recommended Partner Deals</span>
          <button type="button" onClick={handleSmartlinkClick} className="text-indigo-400 hover:underline">
            Adsterra Direct Offers &rarr;
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center justify-center">
          <div className="flex justify-center items-center min-h-[250px] bg-slate-950/60 rounded-xl p-2 border border-slate-800/60">
            <AdsterraBanner type="300x250" />
          </div>
          <div className="flex justify-center items-center min-h-[250px] bg-slate-950/60 rounded-xl p-2 border border-slate-800/60">
            <AdsterraBanner type="300x250" />
          </div>
        </div>
      </div>
    );
  }

  // Native Banner & In-Feed with stable height
  if (placement === 'in-feed' || placement === 'native-bar') {
    return (
      <div className={`col-span-full rounded-2xl border border-indigo-900/40 bg-indigo-950/15 p-4 my-4 min-h-[180px] flex flex-col justify-center ${className}`}>
        <div className="flex items-center justify-between text-[10px] text-indigo-400 font-mono uppercase mb-2">
          <span>Sponsored Recommendations</span>
          <button 
            type="button" 
            onClick={handleSmartlinkClick} 
            className="text-indigo-300 hover:underline flex items-center gap-1 font-semibold cursor-pointer"
          >
            Explore Deals <ExternalLink className="w-3 h-3" />
          </button>
        </div>

        {/* Native Banner */}
        <div className="w-full flex justify-center items-center overflow-hidden min-h-[100px]">
          <AdsterraBanner type="native" />
        </div>

        {/* Responsive standard banner fallback below native */}
        <div className="mt-2 flex justify-center items-center">
          <div className="hidden md:block min-h-[90px]">
            <AdsterraBanner type="728x90" />
          </div>
          <div className="hidden sm:block md:hidden min-h-[60px]">
            <AdsterraBanner type="468x60" />
          </div>
          <div className="block sm:hidden min-h-[50px]">
            <AdsterraBanner type="320x50" />
          </div>
        </div>
      </div>
    );
  }

  // In-Tool (inside or below tool workspace)
  if (placement === 'in-tool' || placement === 'content-rectangle') {
    return (
      <div className={`w-full rounded-xl border border-slate-800 bg-slate-900/70 p-3 my-4 text-center min-h-[290px] flex flex-col justify-center ${className}`}>
        <div className="flex items-center justify-between text-[10px] text-slate-400 uppercase font-mono mb-2 px-1">
          <span className="text-emerald-400 flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> Verified Secure Sponsor</span>
          <button type="button" onClick={handleSmartlinkClick} className="text-indigo-400 hover:underline cursor-pointer">
            Direct Offer &rarr;
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="min-h-[250px] flex items-center justify-center">
            <AdsterraBanner type="300x250" />
          </div>
          <div className="hidden xl:flex min-h-[250px] items-center justify-center">
            <AdsterraBanner type="160x300" />
          </div>
        </div>
      </div>
    );
  }

  // Sticky footer anchor banner with fixed height
  return (
    <div className={`w-full flex justify-center items-center p-1 bg-slate-950/95 border-t border-slate-800/80 min-h-[60px] ${className}`}>
      <div className="hidden sm:flex justify-center items-center min-h-[50px] sm:min-h-[90px]">
        <AdsterraBanner type="728x90" />
      </div>
      <div className="flex sm:hidden justify-center items-center min-h-[50px]">
        <AdsterraBanner type="320x50" />
      </div>
    </div>
  );
};
