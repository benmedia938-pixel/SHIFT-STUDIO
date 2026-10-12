import React, { useState } from 'react';
import { DollarSign, Percent, Calendar, PieChart, Download, Building, ArrowUpRight } from 'lucide-react';
import { ToolItem } from '../../../data/toolsData';

interface FinancialEngineProps {
  tool: ToolItem;
  onRequestDownload: (fileName: string, blobUrl: string) => void;
}

export const FinancialCalculatorEngine: React.FC<FinancialEngineProps> = ({ tool, onRequestDownload }) => {
  // Common Financial Inputs
  const [homePrice, setHomePrice] = useState<number>(380000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [loanTermYears, setLoanTermYears] = useState<number>(30);
  const [interestRate, setInterestRate] = useState<number>(6.85);
  const [annualPropertyTax, setAnnualPropertyTax] = useState<number>(4200);
  const [annualInsurance, setAnnualInsurance] = useState<number>(1400);
  const [monthlyHoa, setMonthlyHoa] = useState<number>(0);

  // Compound interest inputs
  const [initialInvestment, setInitialInvestment] = useState<number>(10000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(500);
  const [investmentYears, setInvestmentYears] = useState<number>(20);
  const [annualReturnRate, setAnnualReturnRate] = useState<number>(8.5);

  const isCompound = tool.id === 'T149' || tool.name.includes('Compound') || tool.name.includes('Savings') || tool.name.includes('Retirement');

  // Mortgage calculations
  const downPaymentAmount = (homePrice * downPaymentPercent) / 100;
  const principalLoan = homePrice - downPaymentAmount;
  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = loanTermYears * 12;

  const monthlyPrincipalAndInterest =
    monthlyRate > 0
      ? (principalLoan * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1)
      : principalLoan / totalMonths;

  const monthlyTax = annualPropertyTax / 12;
  const monthlyInsurance = annualInsurance / 12;
  const monthlyPmi = downPaymentPercent < 20 ? (principalLoan * 0.007) / 12 : 0;
  const totalMonthlyPayment = monthlyPrincipalAndInterest + monthlyTax + monthlyInsurance + monthlyPmi + monthlyHoa;
  const totalLoanRepayment = monthlyPrincipalAndInterest * totalMonths;
  const totalInterestPaid = totalLoanRepayment - principalLoan;

  // Compound calculations
  const calcCompound = () => {
    let balance = initialInvestment;
    let totalInvested = initialInvestment;
    const monthlyRateComp = annualReturnRate / 100 / 12;

    for (let m = 0; m < investmentYears * 12; m++) {
      balance = balance * (1 + monthlyRateComp) + monthlyContribution;
      totalInvested += monthlyContribution;
    }
    const interestGained = balance - totalInvested;
    return { balance, totalInvested, interestGained };
  };

  const compoundResult = calcCompound();

  const handleExport = () => {
    const text = isCompound
      ? `AnyShift Compound Growth Projection: ${tool.name}
Generated: ${new Date().toLocaleDateString()}
Initial Balance: $${initialInvestment.toLocaleString()}
Monthly Addition: $${monthlyContribution.toLocaleString()}
Investment Horizon: ${investmentYears} Years
Annual Return: ${annualReturnRate}%
-------------------------------------------------
TOTAL CONTRIBUTED: $${Math.round(compoundResult.totalInvested).toLocaleString()}
TOTAL INTEREST EARNED: $${Math.round(compoundResult.interestGained).toLocaleString()}
FINAL PROJECTED VALUE: $${Math.round(compoundResult.balance).toLocaleString()}
=================================================
Calculated with AnyShift.online`
      : `AnyShift Mortgage Payment Breakdown: ${tool.name}
Home Purchase Price: $${homePrice.toLocaleString()}
Down Payment (${downPaymentPercent}%): $${downPaymentAmount.toLocaleString()}
Loan Amount: $${principalLoan.toLocaleString()}
Interest Rate: ${interestRate}% (${loanTermYears} Years Fixed)
-------------------------------------------------
ESTIMATED MONTHLY PAYMENT: $${Math.round(totalMonthlyPayment).toLocaleString()}/month
- Principal & Interest: $${Math.round(monthlyPrincipalAndInterest).toLocaleString()}
- Property Taxes: $${Math.round(monthlyTax).toLocaleString()}
- Homeowners Insurance: $${Math.round(monthlyInsurance).toLocaleString()}
${monthlyPmi > 0 ? `- PMI: $${Math.round(monthlyPmi).toLocaleString()}\n` : ''}
Total Interest Paid Over ${loanTermYears} Years: $${Math.round(totalInterestPaid).toLocaleString()}
Total Lifetime Cost: $${Math.round(totalLoanRepayment).toLocaleString()}
=================================================
Calculated with AnyShift.online`;

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    onRequestDownload(`${tool.primaryKeyword.replace(/\s+/g, '_')}_summary.txt`, url);
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800 mb-6">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Building className="w-5 h-5 text-indigo-400" />
            {tool.name} Calculator Engine
          </h3>
          <p className="text-xs text-slate-400">Standard verified formulas with real amortization metrics</p>
        </div>
        <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-mono">
          Financial Grade
        </span>
      </div>

      {!isCompound ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Inputs Column */}
          <div className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Home Price ($)</label>
                <input 
                  type="number"
                  step="5000"
                  value={homePrice}
                  onChange={e => setHomePrice(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Down Payment (%)</label>
                <div className="flex items-center gap-2">
                  <input 
                    type="number"
                    step="1"
                    min="0"
                    max="100"
                    value={downPaymentPercent}
                    onChange={e => setDownPaymentPercent(parseFloat(e.target.value) || 0)}
                    className="w-24 px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-sm focus:outline-none focus:border-indigo-500"
                  />
                  <span className="text-xs text-slate-400 font-mono">
                    = ${downPaymentAmount.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Loan Term</label>
                <select
                  value={loanTermYears}
                  onChange={e => setLoanTermYears(parseInt(e.target.value))}
                  aria-label="Select loan term"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-indigo-500"
                >
                  <option value={30}>30 Years Fixed</option>
                  <option value={20}>20 Years Fixed</option>
                  <option value={15}>15 Years Fixed</option>
                  <option value={10}>10 Years Fixed</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Interest Rate (%)</label>
                <input 
                  type="number"
                  step="0.05"
                  value={interestRate}
                  onChange={e => setInterestRate(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Annual Property Tax ($)</label>
                <input 
                  type="number"
                  value={annualPropertyTax}
                  onChange={e => setAnnualPropertyTax(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Annual Home Insurance ($)</label>
                <input 
                  type="number"
                  value={annualInsurance}
                  onChange={e => setAnnualInsurance(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Results Column */}
          <div className="lg:col-span-5 p-5 rounded-2xl bg-gradient-to-br from-slate-950 to-indigo-950/40 border border-indigo-900/40 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Monthly Payment</div>
              <div className="text-3xl font-extrabold text-white font-mono mt-1">
                ${Math.round(totalMonthlyPayment).toLocaleString()}<span className="text-sm text-slate-400 font-normal">/mo</span>
              </div>

              <div className="mt-5 space-y-2 text-xs border-t border-slate-800/80 pt-4">
                <div className="flex justify-between text-slate-300">
                  <span>Principal & Interest:</span>
                  <span className="font-mono font-semibold">${Math.round(monthlyPrincipalAndInterest).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Property Taxes:</span>
                  <span className="font-mono">${Math.round(monthlyTax).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Homeowners Insurance:</span>
                  <span className="font-mono">${Math.round(monthlyInsurance).toLocaleString()}</span>
                </div>
                {monthlyPmi > 0 && (
                  <div className="flex justify-between text-amber-400">
                    <span>Private Mortgage Insurance (PMI):</span>
                    <span className="font-mono">${Math.round(monthlyPmi).toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-300 pt-2 border-t border-slate-800">
                  <span>Total Interest Over {loanTermYears} Years:</span>
                  <span className="font-mono text-indigo-400">${Math.round(totalInterestPaid).toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80">
              <button
                type="button"
                onClick={handleExport}
                className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <Download className="w-4 h-4" /> Download Complete Loan Breakdown (.txt)
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Compound Interest View */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Initial Deposit ($)</label>
                <input 
                  type="number"
                  step="1000"
                  value={initialInvestment}
                  onChange={e => setInitialInvestment(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Monthly Contribution ($)</label>
                <input 
                  type="number"
                  step="50"
                  value={monthlyContribution}
                  onChange={e => setMonthlyContribution(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Horizon (Years)</label>
                <input 
                  type="number"
                  min="1"
                  max="60"
                  value={investmentYears}
                  onChange={e => setInvestmentYears(parseInt(e.target.value) || 1)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Estimated Annual Return (%)</label>
                <input 
                  type="number"
                  step="0.5"
                  value={annualReturnRate}
                  onChange={e => setAnnualReturnRate(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 p-5 rounded-2xl bg-gradient-to-br from-slate-950 to-emerald-950/40 border border-emerald-900/40 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Future Balance in {investmentYears} Years</div>
              <div className="text-3xl font-extrabold text-emerald-400 font-mono mt-1">
                ${Math.round(compoundResult.balance).toLocaleString()}
              </div>

              <div className="mt-5 space-y-2 text-xs border-t border-slate-800/80 pt-4">
                <div className="flex justify-between text-slate-300">
                  <span>Your Total Contributions:</span>
                  <span className="font-mono">${Math.round(compoundResult.totalInvested).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-emerald-400 font-semibold">
                  <span>Compound Interest Growth:</span>
                  <span className="font-mono">+${Math.round(compoundResult.interestGained).toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80">
              <button
                type="button"
                onClick={handleExport}
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all"
              >
                <Download className="w-4 h-4" /> Export Compound Schedule (.txt)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
