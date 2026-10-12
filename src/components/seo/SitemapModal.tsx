import React, { useState } from 'react';
import { X, Globe, Download, Copy, Check, FileCode, CheckCircle2 } from 'lucide-react';
import { ALL_TOOLS_DATA } from '../../data/allToolsRegistry';

interface SitemapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SitemapModal: React.FC<SitemapModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const dateStr = new Date().toISOString().split('T')[0];
  const baseUrl = 'https://anyshift.online';

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Root Hub -->
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${dateStr}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <!-- Programmatic SEO Tool URLs (${ALL_TOOLS_DATA.length} Tools) -->
${ALL_TOOLS_DATA.map(t => `  <url>
    <loc>${baseUrl}${t.seoUrl}</loc>
    <lastmod>${dateStr}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${t.searchVolume > 100000 ? '0.9' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(xmlContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([xmlContent], { type: 'application/xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap.xml';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-2xl rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl p-6 text-slate-100 flex flex-col max-h-[85vh]">
        <button 
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Full Programmatic XML Sitemap</h3>
            <p className="text-xs text-slate-400">
              Valid sitemaps.org schema indexing all {ALL_TOOLS_DATA.length} AnyShift tool URLs
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between py-2 px-3 rounded-xl bg-slate-950 border border-slate-800 text-xs mb-3">
          <span className="text-emerald-400 font-mono flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" /> Ready for Google Search Console & Bing Webmaster
          </span>
          <span className="font-mono text-slate-400">{ALL_TOOLS_DATA.length + 1} Total URLs</span>
        </div>

        <div className="flex-1 overflow-hidden relative rounded-xl border border-slate-800 bg-slate-950">
          <pre className="p-4 text-[11px] font-mono text-indigo-300/90 overflow-y-auto h-full leading-relaxed select-all">
            {xmlContent}
          </pre>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleCopy}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition-all"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied XML!' : 'Copy XML to Clipboard'}
          </button>

          <button
            type="button"
            onClick={handleDownload}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-indigo-600/20 transition-all"
          >
            <Download className="w-4 h-4" /> Download sitemap.xml File
          </button>
        </div>
      </div>
    </div>
  );
};
