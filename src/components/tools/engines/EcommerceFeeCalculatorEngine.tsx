import React, { useState } from 'react';
import { DollarSign, Percent, TrendingUp, AlertCircle, ShoppingBag, Download, ArrowRight, ShieldCheck } from 'lucide-react';
import { ToolItem } from '../../../data/toolsData';

interface EcommerceEngineProps {
  tool: ToolItem;
  onRequestDownload: (fileName: string, blobUrl: string) => void;
}

export const EcommerceFeeCalculatorEngine: React.FC<EcommerceEngineProps> = ({ tool, onRequestDownload }) => {
  // Inputs
  const [salePrice, setSalePrice] = useState<number>(45.00);
  const [shippingCharged, setShippingCharged] = useState<number>(5.00);
  const [itemCost, setItemCost] = useState<number>(12.00);
  const [actualShippingCost, setActualShippingCost] = useState<number>(4.50);
  const [packagingCost, setPackagingCost] = useState<number>(1.50);
  const [offsiteAds, setOffsiteAds] = useState<boolean>(false);
  const [offsiteAdRate, setOffsiteAdRate] = useState<number>(15); // 12% or 15%
  const [customAdCpa, setCustomAdCpa] = useState<number>(0);

  // Calculations
  const totalRevenue = salePrice + shippingCharged;
  const totalCogs = itemCost + actualShippingCost + packagingCost + customAdCpa;

  let platformFee = 0;
  let paymentFee = 0;
  let listingFee = 0;
  let adsFee = 0;

  if (tool.id === 'T095' || tool.id === 'T096' || tool.name.includes('Etsy')) {
    // Etsy Model
    listingFee = 0.20;
    platformFee = totalRevenue * 0.065; // 6.5% transaction fee
    paymentFee = (totalRevenue * 0.03) + 0.25; // 3% + $0.25 payment processing
    if (offsiteAds) {
      adsFee = totalRevenue * (offsiteAdRate / 100);
    }
  } else if (tool.name.includes('Amazon')) {
    // Amazon Model
    listingFee = 0;
    platformFee = totalRevenue * 0.15; // 15% referral fee average
    paymentFee = 3.50; // standard FBA pick and pack estimate
  } else if (tool.name.includes('Stripe')) {
    // Stripe Model
    listingFee = 0;
    platformFee = 0;
    paymentFee = (totalRevenue * 0.029) + 0.30;
  } else if (tool.name.includes('PayPal')) {
    // PayPal Model
    listingFee = 0;
    platformFee = 0;
    paymentFee = (totalRevenue * 0.0349) + 0.49;
  } else {
    // Shopify / Generic Ecommerce
    listingFee = 0;
    platformFee = totalRevenue * 0.02; // transaction or app fees
    paymentFee = (totalRevenue * 0.029) + 0.30; // 2.9% + 30¢ Shopify Payments
  }

  const totalFees = platformFee + paymentFee + listingFee + adsFee;
  const netProfit = totalRevenue - totalCogs - totalFees;
  const netMarginPercent = totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0;
  const breakEvenPrice = (totalCogs + listingFee + 0.25) / (1 - 0.065 - 0.03 - (offsiteAds ? offsiteAdRate / 100 : 0));

  const handleExportReport = () => {
    const reportText = `AnyShift Financial Calculation Report: ${tool.name}
Generated: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}
===================================================
Sale Price: $${salePrice.toFixed(2)}
Shipping Charged: $${shippingCharged.toFixed(2)}
Total Revenue: $${totalRevenue.toFixed(2)}

Cost Breakdown:
- Item Cost (COGS): $${itemCost.toFixed(2)}
- Actual Shipping: $${actualShippingCost.toFixed(2)}
- Packaging: $${packagingCost.toFixed(2)}
- Ad Spend: $${customAdCpa.toFixed(2)}

Platform & Transaction Fees:
- Listing Fee: $${listingFee.toFixed(2)}
- Transaction Fee: $${platformFee.toFixed(2)}
- Payment Processing Fee: $${paymentFee.toFixed(2)}
- Offsite Ads Fee: $${adsFee.toFixed(2)}
Total Deductions: $${totalFees.toFixed(2)}
---------------------------------------------------
NET PROFIT: $${netProfit.toFixed(2)}
PROFIT MARGIN: ${netMarginPercent.toFixed(1)}%
Break-Even Retail Price: $${Math.max(0, breakEvenPrice).toFixed(2)}
===================================================
Calculated with AnyShift.online – Free Online Tools Network`;

    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    onRequestDownload(`${tool.primaryKeyword.replace(/\s+/g, '_')}_profit_report.txt`, url);
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800 mb-6">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-emerald-400" />
            {tool.name} Interactive Simulator
          </h3>
          <p className="text-xs text-slate-400">Accurate 2026 fee schedules with instant net margin breakdown</p>
        </div>
        <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono">
          Live Real-Time
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left column: Inputs */}
        <div className="lg:col-span-7 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Item Sale Price ($)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-500 font-bold">$</span>
                <input 
                  type="number"
                  step="0.5"
                  value={salePrice}
                  onChange={e => setSalePrice(parseFloat(e.target.value) || 0)}
                  className="w-full pl-8 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Shipping Charged to Buyer ($)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-500 font-bold">$</span>
                <input 
                  type="number"
                  step="0.5"
                  value={shippingCharged}
                  onChange={e => setShippingCharged(parseFloat(e.target.value) || 0)}
                  className="w-full pl-8 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-800/60">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                Item Cost (COGS) ($)
              </label>
              <input 
                type="number"
                step="0.5"
                value={itemCost}
                onChange={e => setItemCost(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                Actual Shipping Cost ($)
              </label>
              <input 
                type="number"
                step="0.5"
                value={actualShippingCost}
                onChange={e => setActualShippingCost(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                Packaging & Prep ($)
              </label>
              <input 
                type="number"
                step="0.5"
                value={packagingCost}
                onChange={e => setPackagingCost(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Offsite Ads toggle for Etsy / Ad spend for others */}
          {tool.name.includes('Etsy') ? (
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-white">Etsy Offsite Ads Fee</div>
                <div className="text-[11px] text-slate-400">12% (&gt;$10k/yr sales) or 15% (&lt;$10k/yr sales)</div>
              </div>
              <div className="flex items-center gap-3">
                {offsiteAds && (
                  <select 
                    value={offsiteAdRate} 
                    onChange={e => setOffsiteAdRate(parseInt(e.target.value))}
                    aria-label="Select offsite ad rate"
                    className="bg-slate-900 border border-slate-700 text-xs text-white rounded-lg px-2 py-1"
                  >
                    <option value={15}>15% Rate</option>
                    <option value={12}>12% Rate</option>
                  </select>
                )}
                <input 
                  type="checkbox"
                  checked={offsiteAds}
                  onChange={e => setOffsiteAds(e.target.checked)}
                  aria-label="Toggle Etsy offsite ads"
                  className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
                />
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                Paid Ad CPA / Marketing Cost per Sale ($)
              </label>
              <input 
                type="number"
                step="1"
                value={customAdCpa}
                onChange={e => setCustomAdCpa(parseFloat(e.target.value) || 0)}
                placeholder="0"
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-indigo-500"
              />
            </div>
          )}
        </div>

        {/* Right column: Net results card */}
        <div className="lg:col-span-5 flex flex-col justify-between p-5 rounded-2xl bg-gradient-to-br from-slate-950 to-indigo-950/40 border border-indigo-900/40">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
              Estimated Net Take-Home
            </div>
            <div className={`text-3xl font-extrabold font-mono tracking-tight ${netProfit >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              ${netProfit.toFixed(2)}
            </div>
            <div className="flex items-center gap-2 mt-1 text-xs">
              <span className={`font-semibold ${netMarginPercent >= 20 ? 'text-emerald-400' : netMarginPercent >= 0 ? 'text-amber-400' : 'text-rose-400'}`}>
                {netMarginPercent.toFixed(1)}% Margin
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-400">Total Rev: ${totalRevenue.toFixed(2)}</span>
            </div>

            {/* Breakdown item list */}
            <div className="mt-5 space-y-2 text-xs border-t border-slate-800/80 pt-4">
              <div className="flex justify-between text-slate-400">
                <span>Product & Shipping COGS:</span>
                <span className="font-mono text-slate-300">-${totalCogs.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Platform Commission:</span>
                <span className="font-mono text-slate-300">-${platformFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Payment Processing:</span>
                <span className="font-mono text-slate-300">-${paymentFee.toFixed(2)}</span>
              </div>
              {listingFee > 0 && (
                <div className="flex justify-between text-slate-400">
                  <span>Listing Renewal:</span>
                  <span className="font-mono text-slate-300">-${listingFee.toFixed(2)}</span>
                </div>
              )}
              {adsFee > 0 && (
                <div className="flex justify-between text-amber-400">
                  <span>Offsite Ads Deduction:</span>
                  <span className="font-mono">-${adsFee.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-200 font-semibold pt-2 border-t border-slate-800">
                <span>Total Fees Taken:</span>
                <span className="font-mono text-rose-400">-${totalFees.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800/80">
            <button
              onClick={handleExportReport}
              type="button"
              className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <Download className="w-4 h-4" /> Export Financial Breakdown (.txt)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
