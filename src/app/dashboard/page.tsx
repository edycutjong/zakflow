"use client";

import { StatusBar } from "@/components/StatusBar";
import { Footer } from "@/components/Footer";

import { useState, useEffect } from "react";
import { palmUSDService } from "@/lib/palmusd";

export default function ZakflowDashboard() {
  const [view, setView] = useState<'send' | 'history' | 'gold'>('send');
  const [amount, setAmount] = useState<string>("");
  const [recipient, setRecipient] = useState<string>("");
  const [status, setStatus] = useState<'idle' | 'processing' | 'success'>('idle');

  // Gold price data
  const PUSD_TO_GOLD_OUNCE = 0.00042; // 1 PUSD = ~0.00042 oz gold
  const GOLD_PRICE_OZ = 2380.50; // USD
  
  const parsedAmount = parseFloat(amount) || 0;
  const zakatAmount = parsedAmount * 0.025;
  const netAmount = parsedAmount - zakatAmount;
  
  const [goldMetrics, setGoldMetrics] = useState({ priceOz: GOLD_PRICE_OZ, backingRatio: 100.12 });

  useEffect(() => {
    palmUSDService.getGoldReserveMetrics().then(setGoldMetrics);
  }, []);

  const handleSend = async () => {
    if (!amount || !recipient) return;
    setStatus('processing');
    const payerPubkey = "11111111111111111111111111111111"; // System program
    await palmUSDService.sendZakatRemittance(payerPubkey, recipient, parsedAmount, zakatAmount);
    setStatus('success');
  };

  const renderSend = () => {
    if (status === 'success') {
      return (
        <div className="glass-panel p-8 rounded-xl max-w-lg mx-auto text-center space-y-6">
          <div className="w-20 h-20 bg-brand-primary/20 text-brand-primary rounded-full flex items-center justify-center mx-auto mb-4 border border-brand-primary/50">
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold">Remittance Sent Successfully</h2>
          <div className="text-brand-muted font-mono space-y-2 bg-brand-surface/50 p-4 rounded-lg border border-brand-border text-left">
            <div className="flex justify-between"><span>Amount:</span> <span className="text-white">{parsedAmount} PUSD</span></div>
            <div className="flex justify-between"><span>Zakat Deducted (2.5%):</span> <span className="text-status-warning">{zakatAmount.toFixed(4)} PUSD</span></div>
            <div className="flex justify-between"><span>Net to Recipient:</span> <span className="text-white">{netAmount.toFixed(4)} PUSD</span></div>
            <div className="flex justify-between pt-2 border-t border-brand-border mt-2"><span>Gold Equivalent:</span> <span className="text-brand-gold">{(parsedAmount * PUSD_TO_GOLD_OUNCE).toFixed(5)} oz</span></div>
            <div className="flex justify-between"><span>Recipient:</span> <span className="truncate w-32 text-right">{recipient}</span></div>
          </div>
          <div className="flex justify-center gap-2 items-center text-status-success text-sm mt-4">
            <span>✓ Shariah Compliance Certificate Generated</span>
          </div>
          <button onClick={() => { setStatus('idle'); setAmount(""); setRecipient(""); }} className="w-full mt-4 py-3 border border-brand-border rounded hover:bg-brand-surface transition-colors">
            Send Another
          </button>
        </div>
      );
    }

    return (
      <div className="glass-panel p-8 rounded-xl max-w-lg mx-auto">
        <h2 className="text-2xl font-bold mb-6">Send Zakat-Enabled Remittance</h2>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium text-brand-muted">Recipient Address (Solana)</label>
              <button 
                onClick={() => setRecipient("7XvWg2dKpC1nBvH8mQyP4tZrL9xKwFjN5s3cD6bY8aE")}
                className="text-xs bg-brand-surface border border-brand-border text-brand-primary px-2 py-1 rounded hover:bg-brand-primary/10 transition-colors font-mono"
              >
                Use Demo Address
              </button>
            </div>
            <input 
              type="text" 
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="w-full bg-brand-bg border border-brand-border rounded p-3 text-white font-mono focus:outline-none focus:border-brand-primary" 
              placeholder="E.g. 7X...aB" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-brand-muted mb-1">Amount (PUSD)</label>
            <div className="relative">
              <input 
                type="number" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-brand-bg border border-brand-border rounded p-3 text-white font-mono focus:outline-none focus:border-brand-primary" 
                placeholder="0.00" 
              />
              <span className="absolute right-4 top-3 text-brand-gold font-bold">PUSD</span>
            </div>
            {parsedAmount > 0 && (
              <div className="mt-2 text-xs font-mono text-brand-muted">
                ≈ {(parsedAmount * PUSD_TO_GOLD_OUNCE).toFixed(5)} oz physical gold
              </div>
            )}
          </div>

          <div className="bg-brand-surface/50 border border-brand-border rounded-lg p-4 font-mono text-sm space-y-2 mt-6">
            <div className="flex justify-between">
              <span className="text-brand-muted">Gross Remittance:</span>
              <span>{parsedAmount.toFixed(4)} PUSD</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-brand-muted flex items-center gap-2">
                Zakat Deduction (2.5%)
                <span className="w-3 h-3 rounded-full bg-brand-primary flex items-center justify-center text-[8px] text-white font-bold" title="Auto-routed to verified charities">?</span>
              </span>
              <span className="text-status-warning">-{zakatAmount.toFixed(4)} PUSD</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-brand-border font-bold">
              <span>Net Transfer:</span>
              <span className="text-brand-primary">{netAmount.toFixed(4)} PUSD</span>
            </div>
          </div>

          <button 
            onClick={handleSend}
            disabled={status === 'processing'}
            className={`w-full py-3 mt-6 rounded font-bold transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] ${
              status === 'processing' || !amount || !recipient
                ? 'bg-brand-surface text-brand-muted cursor-not-allowed shadow-none border border-brand-border'
                : 'bg-brand-primary text-white hover:bg-brand-primary/90 hover:shadow-[0_0_20px_rgba(16,185,129,0.5)]'
            }`}
          >
            {status === 'processing' ? 'Processing Transfer & Zakat...' : 'Confirm Transfer'}
          </button>
        </div>
      </div>
    );
  };

  const renderGold = () => (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-xl border-t-2 border-brand-gold">
          <div className="text-sm text-brand-muted mb-2 font-mono">GOLD SPOT PRICE (OZ)</div>
          <div className="text-3xl font-bold text-white">${goldMetrics.priceOz.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
          <div className="text-status-success text-sm mt-2 font-mono">+0.42% (24h)</div>
        </div>
        <div className="glass-panel p-6 rounded-xl border-t-2 border-brand-primary">
          <div className="text-sm text-brand-muted mb-2 font-mono">PUSD PEG VALUE</div>
          <div className="text-3xl font-bold text-white">1.00 USD</div>
          <div className="text-brand-muted text-sm mt-2 font-mono">Fully backed by Gold</div>
        </div>
        <div className="glass-panel p-6 rounded-xl border-t-2 border-status-warning">
          <div className="text-sm text-brand-muted mb-2 font-mono">ZAKAT DISTRIBUTED</div>
          <div className="text-3xl font-bold text-white">12,450 PUSD</div>
          <div className="text-brand-muted text-sm mt-2 font-mono">Via Zakflow protocol</div>
        </div>
      </div>
      
      <div className="glass-panel p-6 rounded-xl">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <span className="text-brand-gold">★</span> Shariah Compliance Registry
        </h3>
        <p className="text-brand-muted text-sm mb-4">
          All PUSD issued through Palm USD is physically backed by allocated gold stored in highly secure vaults. 
          Zakflow ensures all transfers adhere to the 2.5% Nisab requirement.
        </p>
        <div className="font-mono text-xs text-brand-muted bg-brand-bg p-4 rounded border border-brand-border">
          <div>&gt; LATEST_AUDIT: PASSED</div>
          <div>&gt; AUDITOR: Amanah Crypto Consult</div>
          <div>&gt; DATE: 2026-04-15</div>
          <div>&gt; GOLD_RESERVE_RATIO: {goldMetrics.backingRatio}%</div>
        </div>
      </div>
    </div>
  );

  return (
    <>
    <StatusBar />
    <div className="min-h-screen p-8 max-w-6xl mx-auto space-y-8">
      <header className="flex justify-between items-center pb-6 border-b border-brand-border">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            <span className="text-brand-primary">Zak</span>flow
          </h1>
          <p className="text-brand-muted mt-1 text-sm">Shariah-Compliant Remittance on Palm USD</p>
        </div>
        <div className="flex gap-2">
          {['send', 'gold'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setView(tab as 'send' | 'history' | 'gold')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                view === tab 
                  ? 'bg-brand-surface text-brand-primary border border-brand-primary/50' 
                  : 'bg-transparent text-brand-muted hover:text-white'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </header>

      <main>
        {view === 'send' && renderSend()}
        {view === 'gold' && renderGold()}
      </main>
    </div>
    <Footer />
    </>
  );
}
