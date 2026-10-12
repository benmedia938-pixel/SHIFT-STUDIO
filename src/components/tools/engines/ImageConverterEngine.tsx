import React, { useState, useRef } from 'react';
import { Upload, Download, RefreshCw, Sliders, Image as ImageIcon, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { ToolItem } from '../../../data/toolsData';

interface ImageConverterEngineProps {
  tool: ToolItem;
  onRequestDownload: (fileName: string, blobUrl: string) => void;
}

export const ImageConverterEngine: React.FC<ImageConverterEngineProps> = ({ tool, onRequestDownload }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [targetFormat, setTargetFormat] = useState<'image/jpeg' | 'image/png' | 'image/webp'>('image/jpeg');
  const [quality, setQuality] = useState(0.85);
  const [watermarkText, setWatermarkText] = useState('');
  const [resizeWidth, setResizeWidth] = useState<number | ''>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedUrl, setProcessedUrl] = useState<string | null>(null);
  const [processedSize, setProcessedSize] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Set initial default format based on tool
  React.useEffect(() => {
    if (tool.id === 'T008' || tool.id === 'T033' || tool.id === 'T038' || tool.name.includes('to PNG')) {
      setTargetFormat('image/png');
    } else if (tool.name.includes('to WEBP')) {
      setTargetFormat('image/webp');
    } else {
      setTargetFormat('image/jpeg');
    }
  }, [tool]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setOriginalFile(file);
      const url = URL.createObjectURL(file);
      setSelectedImage(url);
      setProcessedUrl(null);
      setProcessedSize(null);
    }
  };

  const handleProcess = () => {
    if (!selectedImage) return;
    setIsProcessing(true);

    const img = new Image();
    img.src = selectedImage;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        setIsProcessing(false);
        return;
      }

      let targetW = img.naturalWidth;
      let targetH = img.naturalHeight;

      if (resizeWidth && typeof resizeWidth === 'number' && resizeWidth > 0) {
        const ratio = resizeWidth / targetW;
        targetW = resizeWidth;
        targetH = Math.round(img.naturalHeight * ratio);
      }

      canvas.width = targetW;
      canvas.height = targetH;

      // Background fill for JPEG if transparent
      if (targetFormat === 'image/jpeg') {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, targetW, targetH);
      }

      ctx.drawImage(img, 0, 0, targetW, targetH);

      // Watermark if requested
      if (watermarkText) {
        ctx.font = `bold ${Math.max(18, Math.round(targetW / 25))}px sans-serif`;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.lineWidth = 3;
        const textX = targetW - ctx.measureText(watermarkText).width - 24;
        const textY = targetH - 24;
        ctx.strokeText(watermarkText, textX, textY);
        ctx.fillText(watermarkText, textX, textY);
      }

      canvas.toBlob((blob) => {
        setIsProcessing(false);
        if (blob) {
          const outUrl = URL.createObjectURL(blob);
          setProcessedUrl(outUrl);
          setProcessedSize(blob.size);
        }
      }, targetFormat, quality);
    };
  };

  const triggerDownloadGate = () => {
    if (!processedUrl) return;
    const ext = targetFormat === 'image/png' ? 'png' : targetFormat === 'image/webp' ? 'webp' : 'jpg';
    const base = originalFile?.name.replace(/\.[^/.]+$/, '') || 'anyshift_output';
    const outName = `${base}_anyshift.${ext}`;
    onRequestDownload(outName, processedUrl);
  };

  const formatBytes = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(2)} MB`;
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800 mb-6">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-amber-400" />
            {tool.name} Engine
          </h3>
          <p className="text-xs text-slate-400">100% Private Browser Canvas Transcoding • No Server Storage</p>
        </div>
        <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono">
          Ready
        </span>
      </div>

      {/* Upload Zone */}
      {!selectedImage ? (
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-slate-700 hover:border-indigo-500 rounded-2xl p-10 text-center cursor-pointer transition-all bg-slate-950/50 hover:bg-slate-950/80 group"
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*,.heic,.avif" 
            className="hidden" 
          />
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
            <Upload className="w-8 h-8" />
          </div>
          <h4 className="text-sm font-bold text-white">Click to Select or Drop Your Image File</h4>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            Supports JPG, PNG, WEBP, HEIC, AVIF, BMP, GIF, SVG up to 50MB. Instant client-side processing.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Input Preview */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Original Image:</span>
                <span className="font-mono">{originalFile && formatBytes(originalFile.size)}</span>
              </div>
              <div className="relative aspect-video rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center overflow-hidden">
                <img src={selectedImage} alt="Original input" className="max-h-full max-w-full object-contain" />
              </div>
              <button 
                type="button" 
                onClick={() => { setSelectedImage(null); setOriginalFile(null); setProcessedUrl(null); }}
                className="text-xs text-slate-400 hover:text-rose-400 flex items-center gap-1 transition-colors"
              >
                Choose different file
              </button>
            </div>

            {/* Output / Settings */}
            <div className="space-y-4 bg-slate-950/60 p-5 rounded-xl border border-slate-800/80">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-indigo-400" /> Output Settings
              </h4>

              {/* Format selection */}
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">Target Output Format</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: 'JPG / JPEG', val: 'image/jpeg' },
                    { label: 'PNG Lossless', val: 'image/png' },
                    { label: 'WebP Modern', val: 'image/webp' }
                  ].map(f => (
                    <button
                      key={f.val}
                      type="button"
                      onClick={() => setTargetFormat(f.val as any)}
                      className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-all ${
                        targetFormat === f.val 
                          ? 'bg-indigo-600 text-white border-indigo-500 shadow-md' 
                          : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-850'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quality slider */}
              {targetFormat !== 'image/png' && (
                <div>
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>Compression Quality:</span>
                    <span className="font-mono text-indigo-400 font-bold">{Math.round(quality * 100)}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="0.1" 
                    max="1.0" 
                    step="0.05" 
                    value={quality}
                    onChange={e => setQuality(parseFloat(e.target.value))}
                    className="w-full accent-indigo-500 cursor-pointer" 
                  />
                </div>
              )}

              {/* Resize Width */}
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Custom Width in Pixels (Optional)</label>
                <input 
                  type="number"
                  placeholder="e.g. 1920 or leave blank for original"
                  value={resizeWidth}
                  onChange={e => setResizeWidth(e.target.value ? parseInt(e.target.value) : '')}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Watermark */}
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Watermark Text (Optional)</label>
                <input 
                  type="text"
                  placeholder="e.g. Confidential or @AnyShift"
                  value={watermarkText}
                  onChange={e => setWatermarkText(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Process Trigger */}
              <button
                type="button"
                onClick={handleProcess}
                disabled={isProcessing}
                className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" /> Transcoding in Browser...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" /> Run Conversion Now
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Processed Result Banner */}
          {processedUrl && (
            <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-emerald-950/40 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-sm font-bold text-white">Conversion Complete!</h5>
                  <div className="flex items-center gap-2 text-xs text-slate-300 font-mono mt-0.5">
                    <span>New Size: {processedSize && formatBytes(processedSize)}</span>
                    {originalFile && processedSize && (
                      <span className="text-emerald-400 font-bold">
                        ({Math.round(((originalFile.size - processedSize) / originalFile.size) * 100)}% saved)
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={triggerDownloadGate}
                className="w-full sm:w-auto py-2.5 px-6 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all"
              >
                <Download className="w-4 h-4" /> Download Result
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
