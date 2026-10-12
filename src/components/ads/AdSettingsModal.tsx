import React, { useState, useEffect } from 'react';
import { X, Settings, DollarSign, Check, Link2, Code, Shield } from 'lucide-react';
import { getAdConfig, saveAdConfig, AdConfiguration, ADSTERRA_KEYS } from './adConfig';

interface AdSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdSettingsModal: React.FC<AdSettingsModalProps> = ({ isOpen, onClose }) => {
  const [config, setConfig] = useState<AdConfiguration>(getAdConfig());
  const [savedToast, setSavedToast] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setConfig(getAdConfig());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    saveAdConfig(config);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-xl rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl p-6 text-slate-100">
        <button 
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Adsterra Active Configuration</h3>
            <p className="text-xs text-slate-400">All Adsterra Smartlinks, Popunders, Social Bars & Banners Active</p>
          </div>
        </div>

        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
          {/* Status badge */}
          <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs flex items-center justify-between">
            <span className="flex items-center gap-1.5 font-semibold">
              <Shield className="w-4 h-4 text-emerald-400" />
              Adsterra Tags Injected & Live (728x90, 300x250, 160x600, 468x60, 320x50, Native, Popunder, SocialBar)
            </span>
            <span className="font-mono text-emerald-400 text-[11px]">ACTIVE</span>
          </div>

          {/* Master Enable Toggle */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800">
            <div>
              <div className="text-sm font-semibold text-white">Monetization Ad Slots</div>
              <div className="text-xs text-slate-400">Enable/disable display banners across AnyShift</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={config.enabled}
                onChange={e => setConfig({ ...config, enabled: e.target.checked })}
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>

          {/* Adsterra Smartlink 1 */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Link2 className="w-3.5 h-3.5 text-indigo-400" />
              Active Adsterra Smartlink 1
            </label>
            <input 
              type="text"
              value={config.adsterraDirectLink}
              onChange={e => setConfig({ ...config, adsterraDirectLink: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-indigo-300 focus:outline-none focus:border-indigo-500 font-mono"
            />
          </div>

          {/* Adsterra Smartlink 2 */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Link2 className="w-3.5 h-3.5 text-indigo-400" />
              Active Adsterra Smartlink 2
            </label>
            <input 
              type="text"
              value={config.adsterraDirectLink2}
              onChange={e => setConfig({ ...config, adsterraDirectLink2: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-indigo-300 focus:outline-none focus:border-indigo-500 font-mono"
            />
          </div>

          {/* Adsterra Smartlink 3 */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Link2 className="w-3.5 h-3.5 text-indigo-400" />
              Active Adsterra Smartlink 3 (araplhn.org)
            </label>
            <input 
              type="text"
              value={config.adsterraDirectLink3}
              onChange={e => setConfig({ ...config, adsterraDirectLink3: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-indigo-300 focus:outline-none focus:border-indigo-500 font-mono"
            />
          </div>

          {/* 2-Click Interstitial */}
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-white">2-Click Download Unlock Gate</div>
                <div className="text-[11px] text-slate-400">Forces user to view sponsor and click unlock before file delivers</div>
              </div>
              <input 
                type="checkbox" 
                checked={config.twoClickUnlockEnabled}
                onChange={e => setConfig({ ...config, twoClickUnlockEnabled: e.target.checked })}
                className="w-4 h-4 accent-indigo-600 rounded" 
              />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
              <span className="text-xs text-slate-300">Countdown Delay:</span>
              <div className="flex items-center gap-2">
                {[3, 4, 5, 8].map(sec => (
                  <button
                    key={sec}
                    type="button"
                    onClick={() => setConfig({ ...config, interstitialDelaySeconds: sec })}
                    className={`px-2.5 py-1 rounded text-xs font-mono font-semibold transition-all ${
                      config.interstitialDelaySeconds === sec
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    {sec}s
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            {savedToast ? (
              <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                <Check className="w-4 h-4" /> Settings updated!
              </span>
            ) : (
              'Changes take effect live across all pages'
            )}
          </span>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              type="button"
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
            >
              Close
            </button>
            <button
              onClick={handleSave}
              type="button"
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30"
            >
              Save Configuration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
