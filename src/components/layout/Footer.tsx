import React from 'react';
import { Layers, ShieldCheck, Globe, Heart, ArrowUpRight } from 'lucide-react';
import { CLUSTERS, RAW_TOOLS_DATA } from '../../data/toolsData';

interface FooterProps {
  onSelectCluster: (clusterSlug: string) => void;
  onSelectToolByUrl: (seoUrl: string) => void;
  onOpenSitemap: () => void;
  onOpenAdSettings: () => void;
  onOpenSeoAudit: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCluster,
  onSelectToolByUrl,
  onOpenSitemap,
  onOpenAdSettings,
  onOpenSeoAudit
}) => {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400 text-xs mt-20">
      {/* Top topical cluster silo grid (Programmatic SEO mesh) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                <Layers className="w-4 h-4" />
              </div>
              <span className="text-xl font-extrabold text-white">
                Any<span className="text-indigo-400">Shift</span>.online
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed max-w-sm">
              AnyShift is a modern, high-speed programmatic utility network featuring over 170+ free online tools, converters, and calculators. Built with Generative Engine Optimization (GEO) standards and 100% private client-side browser execution.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] text-emerald-400 font-mono">
                Zero Server Storage
              </span>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] text-indigo-400 font-mono">
                Tier-1 US/UK Focus
              </span>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] text-amber-400 font-mono">
                100% Free Utility
              </span>
            </div>
          </div>

          {/* Popular Pilot Tools */}
          <div>
            <h4 className="font-bold text-white text-sm mb-3 uppercase tracking-wider">Top Pilot Tools</h4>
            <ul className="space-y-2">
              {[
                { name: 'PDF to Word Converter', url: '/pdf-documents/pdf-to-word-converter/' },
                { name: 'Etsy Fee Calculator', url: '/ecommerce-sellers/etsy-fee-calculator/' },
                { name: 'Mortgage Calculator', url: '/finance-property-loans/mortgage-calculator/' },
                { name: 'Image Compressor', url: '/image-convert-edit/image-compressor/' },
                { name: 'JSON Formatter & Validator', url: '/developer-data/json-formatter-validator/' },
                { name: 'QR Code Generator', url: '/design-creative/qr-code-generator/' },
                { name: 'Invoice Generator', url: '/business-freelance/invoice-generator/' }
              ].map(item => (
                <li key={item.url}>
                  <a
                    href={item.url}
                    onClick={e => { e.preventDefault(); onSelectToolByUrl(item.url); }}
                    className="hover:text-indigo-400 transition-colors flex items-center justify-between group"
                  >
                    <span>{item.name}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Topical Clusters */}
          <div>
            <h4 className="font-bold text-white text-sm mb-3 uppercase tracking-wider">Utility Clusters</h4>
            <ul className="space-y-2">
              {CLUSTERS.slice(0, 7).map(c => (
                <li key={c.id}>
                  <button
                    type="button"
                    onClick={() => onSelectCluster(c.id)}
                    className="hover:text-indigo-400 transition-colors text-left"
                  >
                    {c.name} ({c.count})
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources & Legal */}
          <div>
            <h4 className="font-bold text-white text-sm mb-3 uppercase tracking-wider">Resources & Legal</h4>
            <ul className="space-y-2">
              <li>
                <button
                  type="button"
                  onClick={onOpenSitemap}
                  className="hover:text-indigo-400 transition-colors flex items-center gap-1.5"
                >
                  <Globe className="w-3.5 h-3.5" /> XML Sitemap
                </button>
              </li>
              <li>
                <a href="#privacy" className="hover:text-indigo-400">Zero-Log Privacy Policy</a>
              </li>
              <li>
                <a href="#terms" className="hover:text-indigo-400">Terms of Service</a>
              </li>
              <li>
                <a href="#dmca" className="hover:text-indigo-400">DMCA & Fair Use Notice</a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenAdSettings}
                  className="hover:text-slate-300 text-slate-500 text-[11px] pt-1"
                >
                  Ad Configuration
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Semantic Cluster Keywords Matrix (Crucial for Search Engine Relevance Crawling) */}
        <div className="pt-8 border-t border-slate-900">
          <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-2">
            Topical Search Terms & Indexing Directory
          </div>
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-slate-400">
            {RAW_TOOLS_DATA.slice(0, 25).map(t => (
              <a
                key={t.id}
                href={t.seoUrl}
                onClick={e => { e.preventDefault(); onSelectToolByUrl(t.seoUrl); }}
                className="hover:text-indigo-400 hover:underline"
              >
                {t.name}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom copyright & attribution */}
        <div className="mt-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400">
          <p>© 2026 AnyShift.online. All rights reserved. Made for high-performance web utilities.</p>
          <p className="flex items-center gap-1">
            Engineered for <span className="text-indigo-400 font-semibold">Google Search & AI Overviews</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
