import React, { useState, useRef, useEffect } from 'react';
import { Search, Sparkles, ArrowRight, X } from 'lucide-react';
import { ToolItem, CLUSTERS } from '../../data/toolsData';
import { searchTools } from '../../data/allToolsRegistry';
import { AdSlot } from '../ads/AdSlot';

interface SearchHeroProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCluster: string;
  onClusterChange: (c: string) => void;
  onSelectTool: (tool: ToolItem) => void;
  totalToolsCount: number;
}

export const SearchHero: React.FC<SearchHeroProps> = ({
  searchQuery,
  onSearchChange,
  selectedCluster,
  onClusterChange,
  onSelectTool,
  totalToolsCount
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = searchTools(searchQuery, selectedCluster).slice(0, 8);

  const quickPills = [
    { label: 'PDF to Word', q: 'pdf to word' },
    { label: 'Image Compressor', q: 'image compressor' },
    { label: 'Etsy Fee Calculator', q: 'etsy fee' },
    { label: 'Mortgage Calculator', q: 'mortgage' },
    { label: 'JSON Formatter', q: 'json formatter' },
    { label: 'QR Code Generator', q: 'qr code' }
  ];

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + results.length) % results.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results[selectedIndex]) {
        onSelectTool(results[selectedIndex]);
        setIsFocused(false);
      }
    } else if (e.key === 'Escape') {
      setIsFocused(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node) && inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <section className="relative pt-6 pb-6 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
      {/* Top Banner at the very top (as requested by user) */}
      <div className="max-w-5xl mx-auto mb-6">
        <AdSlot placement="header-leaderboard" />
      </div>

      {/* Subtle backdrop glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[250px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-3xl mx-auto space-y-4">
        {/* Clean Hero Title */}
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Free Online Tools & File Utilities
        </h1>

        <p className="max-w-xl mx-auto text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
          Convert documents, compress images, calculate seller fees, and format data instantly. 100% free and private directly in your browser.
        </p>

        {/* Big Central Search Bar */}
        <div className="relative max-w-2xl mx-auto pt-2">
          <div className={`relative flex items-center rounded-2xl bg-slate-900/90 border transition-all duration-200 shadow-xl ${
            isFocused 
              ? 'border-indigo-500 ring-4 ring-indigo-500/20' 
              : 'border-slate-800 hover:border-slate-700'
          }`}>
            <div className="pl-4 sm:pl-5 text-indigo-400 pointer-events-none">
              <Search className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>

            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={e => {
                onSearchChange(e.target.value);
                setSelectedIndex(0);
                setIsFocused(true);
              }}
              onFocus={() => setIsFocused(true)}
              onKeyDown={handleKeyDown}
              placeholder="Search for your tool (e.g. pdf to word, image compressor, etsy fee)..."
              className="w-full py-3.5 sm:py-4 pl-3.5 pr-10 text-sm sm:text-base text-white placeholder-slate-400 bg-transparent focus:outline-none"
            />

            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  onSearchChange('');
                  inputRef.current?.focus();
                }}
                className="pr-4 text-slate-400 hover:text-white transition-colors"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Autocomplete suggestions dropdown */}
          {isFocused && searchQuery.trim().length > 0 && results.length > 0 && (
            <div 
              ref={dropdownRef}
              className="absolute left-0 right-0 top-full mt-2 z-50 rounded-2xl border border-slate-700 bg-slate-900/95 backdrop-blur-xl shadow-2xl overflow-hidden text-left divide-y divide-slate-800/80 animate-in fade-in zoom-in-95 duration-150"
            >
              <div className="max-h-72 overflow-y-auto">
                {results.map((tool, idx) => (
                  <div
                    key={tool.id}
                    onClick={() => {
                      onSelectTool(tool);
                      setIsFocused(false);
                    }}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`p-3.5 cursor-pointer flex items-center justify-between gap-3 transition-colors ${
                      selectedIndex === idx ? 'bg-indigo-600/25 text-white' : 'hover:bg-slate-800/60 text-slate-200'
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="text-sm font-semibold truncate text-white">
                        {tool.name}
                      </div>
                      <div className="text-xs text-slate-400 truncate">
                        {tool.cluster} • {tool.shortDesc}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Quick Trending Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
          <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-indigo-400" /> Popular:
          </span>
          {quickPills.map(p => (
            <button
              key={p.label}
              type="button"
              onClick={() => {
                onSearchChange(p.q);
                inputRef.current?.focus();
              }}
              className="px-3 py-1 rounded-full text-xs bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-all shadow-sm"
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Cluster Filter Pills */}
        <div className="pt-3 flex items-center justify-center gap-2 overflow-x-auto pb-1 scrollbar-none max-w-full">
          <button
            type="button"
            onClick={() => onClusterChange('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all ${
              selectedCluster === 'all'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-850 border border-slate-800'
            }`}
          >
            All Categories ({totalToolsCount})
          </button>
          {CLUSTERS.map(c => (
            <button
              key={c.id}
              type="button"
              onClick={() => onClusterChange(c.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                selectedCluster === c.id
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-850 border border-slate-800'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
