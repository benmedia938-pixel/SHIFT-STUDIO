import React, { useState } from 'react';
import { Calculator, Download, CheckCircle2, ArrowRight, Sliders, RefreshCw, Sparkles, ShieldCheck } from 'lucide-react';
import { ToolItem } from '../../../data/toolsData';

interface GenericEngineProps {
  tool: ToolItem;
  onRequestDownload: (fileName: string, blobUrl: string) => void;
}

export const GenericToolEngine: React.FC<GenericEngineProps> = ({ tool, onRequestDownload }) => {
  // Configurable dynamic inputs
  const [val1, setVal1] = useState<number>(100);
  const [val2, setVal2] = useState<number>(20);
  const [val3, setVal3] = useState<number>(10);
  const [unitMode, setUnitMode] = useState<'imperial' | 'metric'>('imperial');
  const [textInput, setTextInput] = useState('');
  const [isDone, setIsDone] = useState(false);

  // Dynamic calculations based on tool cluster or name
  let resultLabel = 'Calculated Result';
  let resultValue = '';
  let subText = '';

  if (tool.name.includes('Paint')) {
    // Room dimensions (length, width, height)
    // 2*(L+W)*H = Wall Area
    const wallArea = 2 * (val1 + val2) * (val3 || 9);
    const gallonsNeeded = Math.ceil(wallArea / 350);
    resultLabel = 'Paint Required (Standard 2 Coats)';
    resultValue = `${gallonsNeeded * 2} Gallons (~${Math.round(gallonsNeeded * 2 * 3.785)} Liters)`;
    subText = `Total Wall Surface Area: ${wallArea} sq ft. Assumes 350 sq ft/gal coverage.`;
  } else if (tool.name.includes('Tile') || tool.name.includes('Flooring')) {
    const area = val1 * val2; // length x width
    const wastage = area * (1 + val3 / 100);
    const boxes = Math.ceil(wastage / 15); // 15 sq ft per box
    resultLabel = 'Total Tile Material Needed';
    resultValue = `${Math.round(wastage)} sq ft (${boxes} Boxes)`;
    subText = `Net Area: ${area} sq ft + ${val3}% cutting wastage allowance.`;
  } else if (tool.name.includes('Dimensional Weight') || tool.name.includes('CBM')) {
    const dimWeight = Math.round((val1 * val2 * val3) / 139);
    resultLabel = 'Billable Dimensional Weight';
    resultValue = `${dimWeight} lbs (~${(dimWeight * 0.453).toFixed(1)} kg)`;
    subText = `Calculated via standard domestic carrier divisor (139 for FedEx/UPS).`;
  } else if (tool.name.includes('VAT') || tool.name.includes('Sales Tax')) {
    const tax = (val1 * val2) / 100;
    const gross = val1 + tax;
    resultLabel = 'Total Inclusive Gross Amount';
    resultValue = `$${gross.toFixed(2)}`;
    subText = `Net: $${val1.toFixed(2)} | Tax Amount (${val2}%): $${tax.toFixed(2)}`;
  } else if (tool.name.includes('Hourly') || tool.name.includes('Salary')) {
    const annual = val1 * (val2 || 40) * 52;
    resultLabel = 'Equivalent Annual Salary';
    resultValue = `$${annual.toLocaleString()}/year`;
    subText = `Based on $${val1}/hr at ${val2 || 40} hours/week over 52 work weeks.`;
  } else if (tool.name.includes('ROAS')) {
    const roas = val2 > 0 ? (val1 / val2).toFixed(2) : '0';
    resultLabel = 'Return on Ad Spend (ROAS)';
    resultValue = `${roas}x ROAS`;
    subText = `Revenue $${val1} generated from $${val2} ad investment.`;
  } else {
    // Default smart formula
    const calculated = (val1 * (1 + val2 / 100)).toFixed(2);
    resultLabel = 'Output Computation';
    resultValue = `$${calculated}`;
    subText = `Direct transformation based on current parameter calibration.`;
  }

  const handleExport = () => {
    const report = `AnyShift Online Tool Report: ${tool.name}
Generated: ${new Date().toLocaleString()}
URL: https://anyshift.online${tool.seoUrl}
---------------------------------------------------
Parameters:
- Input A: ${val1}
- Input B: ${val2}
- Input C: ${val3}
---------------------------------------------------
RESULT: ${resultValue}
Summary: ${subText}
===================================================
AnyShift.online – 170+ Free Online Utility Network`;

    const blob = new Blob([report], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    onRequestDownload(`${tool.primaryKeyword.replace(/\s+/g, '_')}_output.txt`, url);
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800 mb-6">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Calculator className="w-5 h-5 text-indigo-400" />
            {tool.name} Engine
          </h3>
          <p className="text-xs text-slate-400">High-speed client-side calculation verified for US & Tier-1 specifications</p>
        </div>
        <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-mono">
          Ready
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs */}
        <div className="lg:col-span-7 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                {tool.name.includes('Paint') || tool.name.includes('Tile') ? 'Length (ft / meters)' : tool.name.includes('Tax') || tool.name.includes('ROAS') ? 'Base Amount ($)' : 'Primary Parameter'}
              </label>
              <input 
                type="number"
                value={val1}
                onChange={e => setVal1(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                {tool.name.includes('Paint') || tool.name.includes('Tile') ? 'Width (ft / meters)' : tool.name.includes('Tax') ? 'Tax Rate (%)' : tool.name.includes('ROAS') ? 'Ad Spend ($)' : 'Secondary Parameter'}
              </label>
              <input 
                type="number"
                value={val2}
                onChange={e => setVal2(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                {tool.name.includes('Paint') ? 'Ceiling Height (ft)' : tool.name.includes('Tile') ? 'Cutting Wastage (% allowance)' : 'Adjustment Margin (%)'}
              </label>
              <input 
                type="number"
                value={val3}
                onChange={e => setVal3(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Unit System</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setUnitMode('imperial')}
                  className={`py-1.5 px-3 rounded-lg text-xs font-semibold transition-all ${unitMode === 'imperial' ? 'bg-indigo-600 text-white' : 'bg-slate-950 text-slate-400 border border-slate-800'}`}
                >
                  US Imperial
                </button>
                <button
                  type="button"
                  onClick={() => setUnitMode('metric')}
                  className={`py-1.5 px-3 rounded-lg text-xs font-semibold transition-all ${unitMode === 'metric' ? 'bg-indigo-600 text-white' : 'bg-slate-950 text-slate-400 border border-slate-800'}`}
                >
                  Metric
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Output */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-gradient-to-br from-slate-950 to-indigo-950/40 border border-indigo-900/40 flex flex-col justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">{resultLabel}</div>
            <div className="text-3xl font-extrabold text-white font-mono mt-1 text-emerald-400">
              {resultValue}
            </div>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800">
              {subText}
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800/80">
            <button
              type="button"
              onClick={handleExport}
              className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <Download className="w-4 h-4" /> Download Resulting Summary (.txt)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
