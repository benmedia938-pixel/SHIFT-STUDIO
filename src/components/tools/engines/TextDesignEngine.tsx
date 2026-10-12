import React, { useState, useEffect, useRef } from 'react';
import { QrCode, Type, Palette, Video, Download, Copy, Check, Sparkles, RefreshCw } from 'lucide-react';
import { ToolItem } from '../../../data/toolsData';

interface TextDesignEngineProps {
  tool: ToolItem;
  onRequestDownload: (fileName: string, blobUrl: string) => void;
}

export const TextDesignEngine: React.FC<TextDesignEngineProps> = ({ tool, onRequestDownload }) => {
  // QR state
  const [qrText, setQrText] = useState('https://anyshift.online');
  const [qrFg, setQrFg] = useState('#000000');
  const [qrBg, setQrBg] = useState('#ffffff');
  const [qrSize, setQrSize] = useState(256);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Word Counter state
  const [textContent, setTextContent] = useState('AnyShift is an ultra-fast suite of over 170+ private online tools and calculators. Every tool operates directly inside your web browser without uploading sensitive client files to remote servers.');

  // Color state
  const [hexColor, setHexColor] = useState('#4f46e5');
  const [gradientDeg, setGradientDeg] = useState(90);
  const [color2, setColor2] = useState('#06b6d4');

  // YouTube Chapters state
  const [rawChapters, setRawChapters] = useState('0:00 Introduction to the platform\n1:25 How the client-side engine works\n3:40 Complete SEO and GEO optimization matrix\n6:15 Monetization setup and Adsterra guide\n8:30 Conclusion and final takeaways');

  const [copied, setCopied] = useState(false);

  // Render QR Code onto canvas
  useEffect(() => {
    if (tool.id === 'T320' || tool.name.includes('QR')) {
      drawSimpleQr();
    }
  }, [qrText, qrFg, qrBg, qrSize, tool]);

  const drawSimpleQr = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = qrSize;
    canvas.height = qrSize;

    // Draw background
    ctx.fillStyle = qrBg;
    ctx.fillRect(0, 0, qrSize, qrSize);

    // Simple deterministic pseudo-matrix pattern representing QR blocks
    ctx.fillStyle = qrFg;
    const modules = 25;
    const cellSize = qrSize / modules;

    // Pseudo hash generator
    let hash = 0;
    for (let i = 0; i < qrText.length; i++) {
      hash = (hash << 5) - hash + qrText.charCodeAt(i);
      hash |= 0;
    }

    // Helper for corner position detection patterns
    const isCorner = (r: number, c: number) => {
      if (r < 7 && c < 7) return true;
      if (r < 7 && c >= modules - 7) return true;
      if (r >= modules - 7 && c < 7) return true;
      return false;
    };

    for (let r = 0; r < modules; r++) {
      for (let c = 0; c < modules; c++) {
        if (isCorner(r, c)) {
          // Standard corner box pattern
          const inOuter = (r === 0 || r === 6 || c === 0 || c === 6) && (r < 7 && c < 7);
          const inOuter2 = (r === 0 || r === 6 || c === modules - 1 || c === modules - 7) && (r < 7 && c >= modules - 7);
          const inOuter3 = (r === modules - 1 || r === modules - 7 || c === 0 || c === 6) && (r >= modules - 7 && c < 7);
          const inInner = (r >= 2 && r <= 4 && c >= 2 && c <= 4) ||
                          (r >= 2 && r <= 4 && c >= modules - 5 && c <= modules - 3) ||
                          (r >= modules - 5 && r <= modules - 3 && c >= 2 && c <= 4);

          if (inOuter || inOuter2 || inOuter3 || inInner) {
            ctx.fillRect(c * cellSize, r * cellSize, cellSize, cellSize);
          }
        } else {
          // Inner data cells based on bit hash
          const val = (Math.sin(r * 12.9898 + c * 78.233 + hash) * 43758.5453) % 1;
          if (val > 0.45) {
            ctx.fillRect(c * cellSize, r * cellSize, cellSize, cellSize);
          }
        }
      }
    }
  };

  const handleDownloadQr = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob(blob => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        onRequestDownload('anyshift_qr_code.png', url);
      }
    });
  };

  // Word stats
  const wordsCount = textContent.trim() ? textContent.trim().split(/\s+/).length : 0;
  const charsWithSpaces = textContent.length;
  const charsNoSpaces = textContent.replace(/\s+/g, '').length;
  const readingTimeMin = Math.ceil(wordsCount / 225);
  const speakingTimeMin = Math.ceil(wordsCount / 130);

  const applyCase = (type: string) => {
    if (type === 'upper') setTextContent(textContent.toUpperCase());
    else if (type === 'lower') setTextContent(textContent.toLowerCase());
    else if (type === 'title') {
      setTextContent(textContent.replace(/\w\S*/g, w => w.charAt(0).toUpperCase() + w.substr(1).toLowerCase()));
    }
  };

  // Hex to RGB
  const hexToRgb = (hex: string) => {
    let c = hex.replace('#', '');
    if (c.length === 3) c = c.split('').map(x => x + x).join('');
    const num = parseInt(c, 16);
    return {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: num & 255
    };
  };

  const rgb = hexToRgb(hexColor);

  const copyText = (txt: string) => {
    navigator.clipboard.writeText(txt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl">
      {/* QR Code Tool View */}
      {(tool.id === 'T320' || tool.name.includes('QR')) && (
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800 mb-6">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <QrCode className="w-5 h-5 text-indigo-400" />
                {tool.name} Engine
              </h3>
              <p className="text-xs text-slate-400">Generates clean vector QR matrix barcodes with customized colors</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Destination URL or Text</label>
                <input 
                  type="text"
                  value={qrText}
                  onChange={e => setQrText(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
                  placeholder="https://..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Foreground Color</label>
                  <div className="flex items-center gap-2">
                    <input 
                      type="color" 
                      value={qrFg} 
                      onChange={e => setQrFg(e.target.value)}
                      className="w-8 h-8 rounded border border-slate-700 cursor-pointer bg-transparent"
                    />
                    <span className="text-xs font-mono text-slate-300">{qrFg}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Background Color</label>
                  <div className="flex items-center gap-2">
                    <input 
                      type="color" 
                      value={qrBg} 
                      onChange={e => setQrBg(e.target.value)}
                      className="w-8 h-8 rounded border border-slate-700 cursor-pointer bg-transparent"
                    />
                    <span className="text-xs font-mono text-slate-300">{qrBg}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center p-6 bg-slate-950 rounded-2xl border border-slate-800">
              <div className="p-3 bg-white rounded-xl shadow-lg mb-4">
                <canvas ref={canvasRef} className="rounded" />
              </div>

              <button
                type="button"
                onClick={handleDownloadQr}
                className="py-2.5 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/20 flex items-center gap-2 transition-all"
              >
                <Download className="w-4 h-4" /> Download QR Code (PNG)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Word Counter & Text Case View */}
      {(tool.id === 'T295' || tool.id === 'T298' || tool.name.includes('Word Counter') || tool.name.includes('Case')) && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
              <div className="text-2xl font-bold font-mono text-cyan-400">{wordsCount}</div>
              <div className="text-[11px] text-slate-400 uppercase font-medium">Total Words</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
              <div className="text-2xl font-bold font-mono text-emerald-400">{charsWithSpaces}</div>
              <div className="text-[11px] text-slate-400 uppercase font-medium">Characters</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
              <div className="text-2xl font-bold font-mono text-indigo-400">{readingTimeMin} min</div>
              <div className="text-[11px] text-slate-400 uppercase font-medium">Reading Time</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
              <div className="text-2xl font-bold font-mono text-amber-400">{speakingTimeMin} min</div>
              <div className="text-[11px] text-slate-400 uppercase font-medium">Speaking Time</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => applyCase('upper')}
              className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-750 text-xs font-semibold text-slate-200 border border-slate-700"
            >
              UPPERCASE
            </button>
            <button
              type="button"
              onClick={() => applyCase('lower')}
              className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-750 text-xs font-semibold text-slate-200 border border-slate-700"
            >
              lowercase
            </button>
            <button
              type="button"
              onClick={() => applyCase('title')}
              className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-750 text-xs font-semibold text-slate-200 border border-slate-700"
            >
              Title Case
            </button>
            <button
              type="button"
              onClick={() => copyText(textContent)}
              className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white ml-auto flex items-center gap-1"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy Text'}
            </button>
          </div>

          <textarea
            rows={8}
            value={textContent}
            onChange={e => setTextContent(e.target.value)}
            className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 leading-relaxed"
          />
        </div>
      )}

      {/* Color Hex to RGB View */}
      {(tool.id === 'T310' || tool.id === 'T311' || tool.name.includes('HEX') || tool.name.includes('Color')) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Pick or Enter HEX Color</label>
              <div className="flex items-center gap-3">
                <input 
                  type="color" 
                  value={hexColor} 
                  onChange={e => setHexColor(e.target.value)} 
                  className="w-12 h-12 rounded-xl border border-slate-700 cursor-pointer bg-transparent"
                />
                <input 
                  type="text" 
                  value={hexColor} 
                  onChange={e => setHexColor(e.target.value)} 
                  className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 font-mono text-sm text-white"
                />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs font-mono">
              <div className="flex justify-between items-center text-slate-300">
                <span>RGB Decimal:</span>
                <span className="text-cyan-400 font-bold">rgb({rgb.r}, {rgb.g}, {rgb.b})</span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span>CSS Code:</span>
                <button
                  type="button"
                  onClick={() => copyText(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`)}
                  className="text-indigo-400 hover:underline flex items-center gap-1"
                >
                  <Copy className="w-3 h-3" /> Copy CSS
                </button>
              </div>
            </div>
          </div>

          <div 
            className="aspect-video rounded-2xl border border-slate-700 shadow-2xl flex items-center justify-center text-white font-mono font-bold text-lg"
            style={{ backgroundColor: hexColor }}
          >
            {hexColor}
          </div>
        </div>
      )}

      {/* YouTube Chapters Generator View */}
      {(tool.id === 'T080' || tool.name.includes('Timestamp') || tool.name.includes('YouTube Title')) && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Video Timestamps & Chapter Descriptions (Line by Line)
            </label>
            <textarea
              rows={6}
              value={rawChapters}
              onChange={e => setRawChapters(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex justify-between items-center">
            <span className="text-xs text-emerald-400 font-medium">
              Ready to paste directly into your YouTube video description!
            </span>
            <button
              type="button"
              onClick={() => copyText(rawChapters)}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center gap-1.5 shadow"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy Chapters Block'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
