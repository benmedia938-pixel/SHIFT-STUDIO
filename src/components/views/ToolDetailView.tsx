import React from 'react';
import { ChevronRight, ArrowLeft, Share2, Check, Layers } from 'lucide-react';
import { ToolItem } from '../../data/toolsData';
import { getToolsByCluster } from '../../data/toolsData';
import { ToolRunner } from '../tools/ToolRunner';
import { GeoDirectAnswer } from '../seo/GeoDirectAnswer';
import { AdSlot } from '../ads/AdSlot';

interface ToolDetailViewProps {
  tool: ToolItem;
  onGoBack: () => void;
  onSelectCluster: (clusterSlug: string) => void;
  onSelectTool: (tool: ToolItem) => void;
  onRequestDownload: (fileName: string, blobUrl: string) => void;
}

export const ToolDetailView: React.FC<ToolDetailViewProps> = ({
  tool,
  onGoBack,
  onSelectCluster,
  onSelectTool,
  onRequestDownload
}) => {
  const [copiedShare, setCopiedShare] = React.useState(false);
  const siblingTools = getToolsByCluster(tool.clusterSlug).filter(t => t.id !== tool.id).slice(0, 6);

  const handleShare = () => {
    const url = `https://anyshift.online${tool.seoUrl}`;
    navigator.clipboard.writeText(url);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pb-16">
      {/* Top Banner right at top of tool */}
      <AdSlot placement="header-leaderboard" />

      {/* Clean Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
        <div className="flex items-center gap-1.5">
          <button 
            type="button" 
            onClick={onGoBack} 
            className="hover:text-white flex items-center gap-1 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> All Tools
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <button 
            type="button" 
            onClick={() => onSelectCluster(tool.clusterSlug)}
            className="hover:text-indigo-400 text-slate-300 font-medium transition-colors"
          >
            {tool.cluster}
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-white font-semibold truncate max-w-xs">{tool.name}</span>
        </div>

        <button
          type="button"
          onClick={handleShare}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs transition-all"
        >
          {copiedShare ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
          {copiedShare ? 'URL Copied!' : 'Share Tool'}
        </button>
      </nav>

      {/* Tool Header Summary */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 font-mono text-xs font-semibold border border-indigo-500/20">
            {tool.cluster}
          </span>
          <span className="text-xs text-emerald-400 font-mono">100% Free • Private</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          {tool.name}
        </h1>

        <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
          {tool.shortDesc}
        </p>
      </div>

      {/* Two-Column Layout (Interactive Workspace on Left, Sticky Adsterra Skyscraper on Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Working Workspace */}
        <div className="lg:col-span-8 space-y-6">
          <ToolRunner tool={tool} onRequestDownload={onRequestDownload} />

          {/* In-tool contextual banner */}
          <AdSlot placement="in-tool" />

          {/* Clean SEO & GEO answer and FAQs */}
          <GeoDirectAnswer tool={tool} />

          {/* Bottom Banner */}
          <AdSlot placement="in-feed" />
        </div>

        {/* Right: Sticky Adsterra Skyscraper & Related Tools */}
        <div className="lg:col-span-4 space-y-6">
          <AdSlot placement="sidebar-skyscraper" />

          {siblingTools.length > 0 && (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-xl">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-800 mb-4 text-xs font-bold uppercase tracking-wider text-white">
                <Layers className="w-4 h-4 text-indigo-400" />
                More {tool.cluster} Tools
              </div>

              <div className="space-y-2">
                {siblingTools.map(st => (
                  <div
                    key={st.id}
                    onClick={() => onSelectTool(st)}
                    className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 hover:border-indigo-500/40 hover:bg-slate-900 cursor-pointer transition-all group"
                  >
                    <div className="text-xs font-semibold text-white group-hover:text-indigo-300 transition-colors line-clamp-1">
                      {st.name}
                    </div>
                    <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                      {st.shortDesc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
