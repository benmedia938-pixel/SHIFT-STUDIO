import React from 'react';
import { ArrowRight, Sparkles, FileText, Image as ImageIcon, ShoppingBag, Calculator, Code, Hammer, Layers, ShieldCheck } from 'lucide-react';
import { ToolItem, CLUSTERS } from '../../data/toolsData';
import { GEO_ARTICLES, GeoArticle } from '../../data/geoArticles';
import { AdSlot } from '../ads/AdSlot';

interface HomeDashboardProps {
  tools: ToolItem[];
  selectedCluster: string;
  onSelectCluster: (clusterSlug: string) => void;
  onSelectTool: (tool: ToolItem) => void;
  onSelectArticle: (article: GeoArticle) => void;
}

// Helper to choose a clean category icon
function getToolIcon(clusterSlug: string) {
  if (clusterSlug === 'pdf-documents') return <FileText className="w-5 h-5 text-rose-400" />;
  if (clusterSlug === 'image-convert-edit') return <ImageIcon className="w-5 h-5 text-amber-400" />;
  if (clusterSlug === 'ecommerce-sellers') return <ShoppingBag className="w-5 h-5 text-emerald-400" />;
  if (clusterSlug === 'finance-property-loans') return <Calculator className="w-5 h-5 text-blue-400" />;
  if (clusterSlug === 'developer-data') return <Code className="w-5 h-5 text-cyan-400" />;
  if (clusterSlug === 'home-renovation') return <Hammer className="w-5 h-5 text-yellow-400" />;
  return <Layers className="w-5 h-5 text-indigo-400" />;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  tools,
  selectedCluster,
  onSelectCluster,
  onSelectTool,
  onSelectArticle
}) => {
  const activeClusterObj = CLUSTERS.find(c => c.id === selectedCluster);

  // Chunk tools into rows of 3 tools as requested by user
  const chunkSize = 3;
  const toolChunks: ToolItem[][] = [];
  for (let i = 0; i < tools.length; i += chunkSize) {
    toolChunks.push(tools.slice(i, i + chunkSize));
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pb-16">
      {/* Category Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <span>{activeClusterObj ? activeClusterObj.name : 'Popular Online Tools'}</span>
            <span className="text-xs font-mono font-medium px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              {tools.length} Tools
            </span>
          </h2>
        </div>

        {selectedCluster !== 'all' && (
          <button
            type="button"
            onClick={() => onSelectCluster('all')}
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            &larr; View all tools
          </button>
        )}
      </div>

      {/* 3 Tools Per Row -> Banner -> 3 Tools Per Row -> Banner Pattern */}
      <div className="space-y-6">
        {toolChunks.map((chunk, chunkIdx) => (
          <React.Fragment key={chunkIdx}>
            {/* 3 Tools Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {chunk.map((tool) => (
                <div
                  key={tool.id}
                  onClick={() => onSelectTool(tool)}
                  className="group relative rounded-2xl border border-slate-800 hover:border-indigo-500/70 bg-slate-900/80 hover:bg-slate-850 p-5 shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between hover:-translate-y-0.5"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        {getToolIcon(tool.clusterSlug)}
                      </div>
                      <span className="text-[11px] font-medium text-slate-400 bg-slate-950 px-2.5 py-1 rounded-full border border-slate-800">
                        {tool.cluster}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                      {tool.shortDesc}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <span className="text-emerald-400 font-mono text-[11px]">Free • Instant</span>
                    <span className="font-semibold text-indigo-400 group-hover:text-indigo-300 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      Open Tool &rarr;
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Adsterra Banner placed after each row of 3 tools */}
            <div className="my-4">
              {chunkIdx % 2 === 0 ? (
                <AdSlot placement="header-leaderboard" />
              ) : (
                <AdSlot placement="in-feed" />
              )}
            </div>
          </React.Fragment>
        ))}
      </div>

      {/* Clean Category Navigation Grid */}
      <section aria-labelledby="all-categories-title" className="p-6 sm:p-8 rounded-3xl bg-slate-900/50 border border-slate-800 mt-12">
        <div className="max-w-xl mb-6">
          <h2 id="all-categories-title" className="text-lg sm:text-xl font-bold text-white">Browse by Category</h2>
          <p className="text-xs text-slate-400 mt-1">
            Explore our complete collection of fast, private online utility suites.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {CLUSTERS.map(c => (
            <button
              key={c.id}
              type="button"
              onClick={() => onSelectCluster(c.id)}
              className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 hover:border-indigo-500/50 hover:bg-slate-900 text-left transition-all group flex items-center justify-between"
            >
              <div>
                <h4 className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors">
                  {c.name}
                </h4>
                <span className="text-[11px] text-slate-500 font-mono">{c.count} Tools</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all" />
            </button>
          ))}
        </div>
      </section>

      {/* Banner between Category and Guides */}
      <div className="my-6">
        <AdSlot placement="header-leaderboard" />
      </div>

      {/* Helpful Guides & Articles (Clean & Readable) */}
      <section aria-labelledby="guides-title" className="space-y-4 pt-6 border-t border-slate-800">
        <div>
          <h2 id="guides-title" className="text-lg sm:text-xl font-bold text-white">Helpful Technical Guides</h2>
          <p className="text-xs text-slate-400 mt-1">Learn how our in-browser tools work and how to maximize your productivity.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {GEO_ARTICLES.map((article) => (
            <article
              key={article.slug}
              onClick={() => onSelectArticle(article)}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 hover:bg-slate-900 p-5 shadow-lg transition-all cursor-pointer flex flex-col justify-between group hover:border-indigo-500/50"
            >
              <div>
                <span className="text-[11px] font-semibold text-indigo-400 font-mono">{article.category}</span>
                <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors mt-1.5 leading-snug">
                  {article.title}
                </h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed line-clamp-2">
                  {article.excerpt}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-500 text-[11px]">{article.readTime}</span>
                <span className="font-semibold text-indigo-400 group-hover:text-indigo-300 flex items-center gap-1">
                  Read Guide &rarr;
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
