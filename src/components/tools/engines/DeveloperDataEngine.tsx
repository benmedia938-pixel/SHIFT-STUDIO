import React, { useState } from 'react';
import { Code, Check, Copy, AlertCircle, RefreshCw, Key, FileCode, CheckCircle2, Sliders } from 'lucide-react';
import { ToolItem } from '../../../data/toolsData';

interface DevEngineProps {
  tool: ToolItem;
  onRequestDownload: (fileName: string, blobUrl: string) => void;
}

export const DeveloperDataEngine: React.FC<DevEngineProps> = ({ tool, onRequestDownload }) => {
  // JSON state
  const [jsonInput, setJsonInput] = useState('{\n  "status": "success",\n  "service": "AnyShift",\n  "tools_count": 170,\n  "tier1_markets": ["US", "UK", "CA", "AU"],\n  "features": {\n    "client_side_encryption": true,\n    "zero_server_logs": true\n  }\n}');
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Base64 state
  const [base64Input, setBase64Input] = useState('Welcome to AnyShift. High performance utilities.');
  const [base64Output, setBase64Output] = useState('');

  // JWT state
  const [jwtInput, setJwtInput] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE5MjQ5MDUwMjIsInJvbGUiOiJhZG1pbiJ9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ');
  const [jwtDecodedHeader, setJwtDecodedHeader] = useState<any>(null);
  const [jwtDecodedPayload, setJwtDecodedPayload] = useState<any>(null);

  // UUID state
  const [uuidCount, setUuidCount] = useState<number>(5);
  const [uuidList, setUuidList] = useState<string[]>([]);
  const [uuidUppercase, setUuidUppercase] = useState(false);

  // Regex state
  const [regexPattern, setRegexPattern] = useState('[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}');
  const [regexText, setRegexText] = useState('Contact support@anyshift.online or sales@example.com for assistance.');
  const [regexMatches, setRegexMatches] = useState<string[]>([]);

  // Init JWT on mount
  React.useEffect(() => {
    if (tool.id === 'T216' || tool.name.includes('JWT')) {
      handleDecodeJwt(jwtInput);
    } else if (tool.id === 'T226' || tool.name.includes('UUID')) {
      generateUuids();
    } else if (tool.id === 'T213' || tool.name.includes('Base64')) {
      handleEncodeBase64();
    } else if (tool.name.includes('Regex')) {
      handleTestRegex();
    }
  }, [tool]);

  // JSON actions
  const formatJson = (spaces = 2) => {
    try {
      const parsed = JSON.parse(jsonInput);
      setJsonInput(JSON.stringify(parsed, null, spaces));
      setJsonError(null);
    } catch (err: any) {
      setJsonError(err.message);
    }
  };

  const minifyJson = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setJsonInput(JSON.stringify(parsed));
      setJsonError(null);
    } catch (err: any) {
      setJsonError(err.message);
    }
  };

  // Base64 actions
  const handleEncodeBase64 = () => {
    try {
      setBase64Output(btoa(unescape(encodeURIComponent(base64Input))));
    } catch (e: any) {
      setBase64Output('Error encoding UTF-8');
    }
  };

  const handleDecodeBase64 = () => {
    try {
      setBase64Output(decodeURIComponent(escape(atob(base64Input))));
    } catch (e: any) {
      setBase64Output('Invalid Base64 sequence');
    }
  };

  // JWT actions
  const handleDecodeJwt = (token: string) => {
    try {
      const parts = token.split('.');
      if (parts.length >= 2) {
        const header = JSON.parse(atob(parts[0].replace(/-/g, '+').replace(/_/g, '/')));
        const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
        setJwtDecodedHeader(header);
        setJwtDecodedPayload(payload);
      }
    } catch {
      setJwtDecodedHeader(null);
      setJwtDecodedPayload(null);
    }
  };

  // UUID actions
  const generateUuids = () => {
    const list: string[] = [];
    for (let i = 0; i < uuidCount; i++) {
      let id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
      if (uuidUppercase) id = id.toUpperCase();
      list.push(id);
    }
    setUuidList(list);
  };

  // Regex actions
  const handleTestRegex = () => {
    try {
      const re = new RegExp(regexPattern, 'g');
      const matches = regexText.match(re) || [];
      setRegexMatches(matches);
    } catch {
      setRegexMatches([]);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800 mb-6">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Code className="w-5 h-5 text-cyan-400" />
            {tool.name} Developer Workspace
          </h3>
          <p className="text-xs text-slate-400">Pure ECMAScript execution in client memory • Zero server calls</p>
        </div>
        <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-mono">
          Native Engine
        </span>
      </div>

      {/* JSON Formatter / Validator View */}
      {(tool.id === 'T206' || tool.name.includes('JSON')) && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => formatJson(2)}
                className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow transition-all"
              >
                Beautify (2 Spaces)
              </button>
              <button
                type="button"
                onClick={() => formatJson(4)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold border border-slate-700 transition-all"
              >
                Beautify (4 Spaces)
              </button>
              <button
                type="button"
                onClick={minifyJson}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold border border-slate-700 transition-all"
              >
                Minify Compact
              </button>
            </div>

            <button
              type="button"
              onClick={() => copyToClipboard(jsonInput)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy JSON'}
            </button>
          </div>

          <div className="relative">
            <textarea
              rows={14}
              value={jsonInput}
              onChange={e => { setJsonInput(e.target.value); setJsonError(null); }}
              className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-200 focus:outline-none focus:border-cyan-500 leading-relaxed shadow-inner"
              spellCheck={false}
            />
          </div>

          {jsonError ? (
            <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>Syntax Error: {jsonError}</span>
            </div>
          ) : (
            <div className="p-2.5 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2 font-mono">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Valid RFC 8259 JSON structure
            </div>
          )}
        </div>
      )}

      {/* Base64 Tool View */}
      {(tool.id === 'T213' || tool.id === 'T214' || tool.name.includes('Base64')) && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Input Text or Base64 Payload</label>
            <textarea
              rows={4}
              value={base64Input}
              onChange={e => setBase64Input(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleEncodeBase64}
              className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-md transition-all"
            >
              Base64 Encode
            </button>
            <button
              type="button"
              onClick={handleDecodeBase64}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-all"
            >
              Base64 Decode
            </button>
          </div>

          <div>
            <div className="flex justify-between items-center text-xs text-slate-400 mb-1">
              <span>Result Output:</span>
              <button
                type="button"
                onClick={() => copyToClipboard(base64Output)}
                className="text-cyan-400 hover:underline flex items-center gap-1"
              >
                <Copy className="w-3 h-3" /> Copy Result
              </button>
            </div>
            <textarea
              rows={4}
              readOnly
              value={base64Output}
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300 focus:outline-none"
            />
          </div>
        </div>
      )}

      {/* JWT Decoder View */}
      {(tool.id === 'T216' || tool.name.includes('JWT')) && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Paste JWT Token String</label>
            <textarea
              rows={3}
              value={jwtInput}
              onChange={e => {
                setJwtInput(e.target.value);
                handleDecodeJwt(e.target.value);
              }}
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
              <div className="text-xs font-bold text-rose-400 uppercase font-mono mb-2">HEADER: Algorithm & Token Type</div>
              <pre className="text-xs font-mono text-slate-300 overflow-x-auto">
                {jwtDecodedHeader ? JSON.stringify(jwtDecodedHeader, null, 2) : 'Invalid Token Header'}
              </pre>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
              <div className="text-xs font-bold text-purple-400 uppercase font-mono mb-2">PAYLOAD: Claims & Data</div>
              <pre className="text-xs font-mono text-slate-300 overflow-x-auto">
                {jwtDecodedPayload ? JSON.stringify(jwtDecodedPayload, null, 2) : 'Invalid Token Payload'}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* UUID Generator View */}
      {(tool.id === 'T226' || tool.name.includes('UUID')) && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-slate-300">Quantity:</span>
              {[1, 5, 10, 25].map(q => (
                <button
                  key={q}
                  type="button"
                  onClick={() => { setUuidCount(q); }}
                  className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold ${uuidCount === q ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400 hover:bg-slate-800'}`}
                >
                  {q}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <label className="text-xs text-slate-300 flex items-center gap-1.5 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={uuidUppercase} 
                  onChange={e => setUuidUppercase(e.target.checked)} 
                  className="w-3.5 h-3.5 accent-indigo-600 rounded" 
                />
                Uppercase
              </label>

              <button
                type="button"
                onClick={generateUuids}
                className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Re-generate
              </button>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-2">
            {uuidList.map((id, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 hover:bg-slate-900 transition-colors">
                <span className="text-cyan-300">{id}</span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(id)}
                  aria-label={`Copy UUID ${id}`}
                  className="text-slate-500 hover:text-white p-1"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Regex Tester View */}
      {(tool.id === 'T217' || tool.name.includes('Regex')) && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Regular Expression Pattern</label>
            <input 
              type="text"
              value={regexPattern}
              onChange={e => { setRegexPattern(e.target.value); handleTestRegex(); }}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-cyan-300 font-mono text-xs focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Test String</label>
            <textarea
              rows={3}
              value={regexText}
              onChange={e => { setRegexText(e.target.value); handleTestRegex(); }}
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <div className="text-xs font-semibold text-slate-400 mb-2">Matches Found ({regexMatches.length}):</div>
            <div className="flex flex-wrap gap-2">
              {regexMatches.length > 0 ? (
                regexMatches.map((m, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-md bg-cyan-950 text-cyan-300 border border-cyan-800 font-mono text-xs">
                    {m}
                  </span>
                ))
              ) : (
                <span className="text-xs text-slate-500">No matches found for current pattern.</span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
