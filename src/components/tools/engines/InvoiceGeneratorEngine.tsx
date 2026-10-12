import React, { useState } from 'react';
import { FileText, Plus, Trash2, Printer, Download, Sparkles, Building2, User } from 'lucide-react';
import { ToolItem } from '../../../data/toolsData';

interface InvoiceEngineProps {
  tool: ToolItem;
  onRequestDownload: (fileName: string, blobUrl: string) => void;
}

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
}

export const InvoiceGeneratorEngine: React.FC<InvoiceEngineProps> = ({ tool, onRequestDownload }) => {
  const [businessName, setBusinessName] = useState('Acme Global Services');
  const [businessEmail, setBusinessEmail] = useState('billing@acmeglobal.com');
  const [clientName, setClientName] = useState('Client Corporation LLC');
  const [clientEmail, setClientEmail] = useState('accounts@clientcorp.com');
  const [invoiceNumber, setInvoiceNumber] = useState('INV-2026-0042');
  const [currency, setCurrency] = useState('$');
  const [taxRate, setTaxRate] = useState<number>(10);
  const [items, setItems] = useState<InvoiceItem[]>([
    { id: '1', description: 'Enterprise UI/UX Design & Architecture', quantity: 40, rate: 125 },
    { id: '2', description: 'Programmatic SEO & GEO Optimization Matrix', quantity: 20, rate: 150 },
    { id: '3', description: 'Server-Side Cloud Setup & SSL Hardening', quantity: 1, rate: 850 }
  ]);

  const addItem = () => {
    setItems([...items, { id: Date.now().toString(), description: 'New Consulting Service', quantity: 1, rate: 100 }]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateItem = (id: string, field: keyof InvoiceItem, val: any) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: val } : item));
  };

  const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.rate), 0);
  const taxAmount = (subtotal * taxRate) / 100;
  const grandTotal = subtotal + taxAmount;

  const handlePrint = () => {
    window.print();
  };

  const handleExportText = () => {
    const text = `=====================================================
INVOICE: ${invoiceNumber}
Date: ${new Date().toLocaleDateString()}
Currency: ${currency}
=====================================================
FROM:
${businessName} (${businessEmail})

BILL TO:
${clientName} (${clientEmail})

ITEMS:
${items.map((it, i) => `${i + 1}. ${it.description} | Qty: ${it.quantity} x ${currency}${it.rate} = ${currency}${(it.quantity * it.rate).toFixed(2)}`).join('\n')}

-----------------------------------------------------
SUBTOTAL:   ${currency}${subtotal.toFixed(2)}
TAX (${taxRate}%):    ${currency}${taxAmount.toFixed(2)}
TOTAL DUE:  ${currency}${grandTotal.toFixed(2)}
=====================================================
Generated with AnyShift.online`;

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    onRequestDownload(`${invoiceNumber.toLowerCase()}_invoice.txt`, url);
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800 mb-6">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-400" />
            {tool.name} Engine
          </h3>
          <p className="text-xs text-slate-400">Professional client invoices with instant printable export and zero watermarks</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrint}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-slate-700"
          >
            <Printer className="w-3.5 h-3.5" /> Print / Save PDF
          </button>
          <button
            type="button"
            onClick={handleExportText}
            className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow"
          >
            <Download className="w-3.5 h-3.5" /> Download (.txt)
          </button>
        </div>
      </div>

      {/* Invoice Form Canvas */}
      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-6">
        {/* Top Header details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-slate-800">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Your Business Info</label>
            <input 
              type="text" 
              value={businessName} 
              onChange={e => setBusinessName(e.target.value)} 
              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-sm font-bold text-white mb-2"
              placeholder="Business Name"
            />
            <input 
              type="email" 
              value={businessEmail} 
              onChange={e => setBusinessEmail(e.target.value)} 
              className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300"
              placeholder="Email address"
            />
          </div>

          <div className="md:text-right">
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Invoice Meta</label>
            <input 
              type="text" 
              value={invoiceNumber} 
              onChange={e => setInvoiceNumber(e.target.value)} 
              className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-sm font-mono font-bold text-blue-400 mb-2 md:text-right"
              placeholder="INV-001"
            />
            <div className="flex items-center md:justify-end gap-2 text-xs text-slate-400">
              <span>Currency:</span>
              <select 
                value={currency} 
                onChange={e => setCurrency(e.target.value)}
                aria-label="Select currency"
                className="bg-slate-900 border border-slate-700 text-white rounded px-2 py-1"
              >
                <option value="$">USD ($)</option>
                <option value="€">EUR (€)</option>
                <option value="£">GBP (£)</option>
                <option value="CAD$">CAD ($)</option>
                <option value="DH">MAD (DH)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Client details */}
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Billed To (Client)</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input 
              type="text" 
              value={clientName} 
              onChange={e => setClientName(e.target.value)} 
              className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
              placeholder="Client Name or Company"
            />
            <input 
              type="email" 
              value={clientEmail} 
              onChange={e => setClientEmail(e.target.value)} 
              className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300"
              placeholder="client@company.com"
            />
          </div>
        </div>

        {/* Line Items Table */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Line Items</label>
            <button
              type="button"
              onClick={addItem}
              className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Add Line Item
            </button>
          </div>

          <div className="space-y-2">
            {items.map((item) => (
              <div key={item.id} className="grid grid-cols-12 gap-2 items-center bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/80">
                <input 
                  type="text" 
                  value={item.description} 
                  onChange={e => updateItem(item.id, 'description', e.target.value)}
                  className="col-span-6 px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white"
                  placeholder="Service / Item description"
                />
                <input 
                  type="number" 
                  value={item.quantity} 
                  onChange={e => updateItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                  className="col-span-2 px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-white text-center"
                  placeholder="Qty"
                />
                <input 
                  type="number" 
                  value={item.rate} 
                  onChange={e => updateItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                  className="col-span-2 px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-white text-right"
                  placeholder="Rate"
                />
                <div className="col-span-1 text-xs font-mono text-slate-300 text-right">
                  {currency}{(item.quantity * item.rate).toFixed(0)}
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  aria-label="Delete item"
                  className="col-span-1 text-slate-500 hover:text-rose-400 flex justify-center"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Totals */}
        <div className="flex flex-col items-end pt-4 border-t border-slate-800 space-y-2 text-xs">
          <div className="flex justify-between w-64 text-slate-400">
            <span>Subtotal:</span>
            <span className="font-mono">{currency}{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center w-64 text-slate-400">
            <span className="flex items-center gap-1">
              Tax Rate (%):
              <input 
                type="number" 
                value={taxRate} 
                onChange={e => setTaxRate(parseFloat(e.target.value) || 0)}
                className="w-12 px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-white font-mono text-right" 
              />
            </span>
            <span className="font-mono">{currency}{taxAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between w-64 text-base font-bold text-white pt-2 border-t border-slate-800">
            <span>Total Due:</span>
            <span className="font-mono text-emerald-400">{currency}{grandTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
