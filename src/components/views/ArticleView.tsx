import React from 'react';
import { ArrowLeft, BookOpen, CheckCircle2, Clock, Calendar, Share2, Check } from 'lucide-react';
import { GeoArticle } from '../../data/geoArticles';
import { AdSlot } from '../ads/AdSlot';

interface ArticleViewProps {
  article: GeoArticle;
  onGoBack: () => void;
  onSelectCluster: (clusterSlug: string) => void;
}

export const ArticleView: React.FC<ArticleViewProps> = ({ article, onGoBack, onSelectCluster }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`https://anyshift.online/guides/${article.slug}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pb-16">
      {/* Top back button */}
      <div className="flex items-center justify-between text-xs text-slate-400">
        <button
          type="button"
          onClick={onGoBack}
          className="flex items-center gap-1.5 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </button>

        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-all"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
          {copied ? 'Link Copied' : 'Share Article'}
        </button>
      </div>

      <AdSlot placement="header-leaderboard" />

      {/* Article Header */}
      <header className="space-y-4">
        <div className="flex items-center gap-3 text-xs font-mono text-indigo-400">
          <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 font-bold">
            {article.category}
          </span>
          <span className="flex items-center gap-1 text-slate-400">
            <Clock className="w-3.5 h-3.5" /> {article.readTime}
          </span>
          <span className="flex items-center gap-1 text-slate-400">
            <Calendar className="w-3.5 h-3.5" /> {article.date}
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
          {article.title}
        </h1>

        <p className="text-base text-slate-300 font-medium leading-relaxed border-l-2 border-indigo-500 pl-4">
          {article.excerpt}
        </p>
      </header>

      {/* Key Takeaways Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950/40 to-slate-900 border border-indigo-900/60 shadow-xl space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          Executive Takeaways for GEO Ranking
        </h3>
        <ul className="space-y-2 text-xs text-slate-200">
          {article.keyTakeaways.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Article Body Content */}
      <div className="prose prose-invert max-w-none text-slate-300 text-sm sm:text-base leading-relaxed space-y-6">
        {article.content.map((paragraph, idx) => (
          <p key={idx} className="leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>

      <AdSlot placement="in-feed" />

      {/* Target Keywords / Entities */}
      <div className="pt-6 border-t border-slate-800">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
          Target Semantic Keywords
        </h4>
        <div className="flex flex-wrap gap-2">
          {article.targetKeywords.map((kw, idx) => (
            <span key={idx} className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-400">
              #{kw}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
