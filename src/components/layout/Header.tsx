import React from 'react';
import { Layers, Search, Settings } from 'lucide-react';
import { CLUSTERS } from '../../data/toolsData';

interface HeaderProps {
  activeCluster: string;
  onSelectCluster: (clusterSlug: string) => void;
  onGoHome: () => void;
  onOpenSitemap: () => void;
  onOpenAdSettings: () => void;
  onOpenSeoAudit: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeCluster,
  onSelectCluster,
  onGoHome,
  onOpenAdSettings
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Clean Consumer Brand Logo */}
        <div 
          onClick={onGoHome}
          className="flex items-center gap-3 cursor-pointer group shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-0.5 shadow-lg shadow-indigo-600/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Layers className="w-5 h-5 text-indigo-400 group-hover:rotate-12 transition-transform duration-300" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-indigo-300 transition-colors">
                Any<span className="text-indigo-400">Shift</span>
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-mono font-semibold">
                .online
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
              Free Online Converters & Calculators
            </p>
          </div>
        </div>

        {/* Clean Cluster Navigation Pills */}
        <nav aria-label="Tool Categories" className="hidden md:flex items-center gap-1.5 overflow-x-auto py-1 text-xs">
          <button
            type="button"
            onClick={() => onSelectCluster('all')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeCluster === 'all'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-900'
            }`}
          >
            All Tools
          </button>
          {CLUSTERS.slice(0, 5).map(c => (
            <button
              key={c.id}
              type="button"
              onClick={() => onSelectCluster(c.id)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all whitespace-nowrap ${
                activeCluster === c.id
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              {c.name}
            </button>
          ))}
        </nav>

        {/* Clean Owner Settings Icon (Discrete so normal users see a clean website) */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onOpenAdSettings}
            title="Ad & Monetization Settings"
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
