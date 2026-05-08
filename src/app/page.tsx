"use client";

import Link from "next/link";
import { ParticleBackground } from "@/components/ParticleBackground";
import { GeometricPattern } from "@/components/GeometricPattern";
import { ArrowRight, ShieldCheck, Coins, Activity, Globe } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-linear-to-b from-brand-bg via-brand-surface/20 to-brand-bg z-0" />
      <ParticleBackground />
      <GeometricPattern />

      {/* Hero Content */}
      <main className="relative z-10 max-w-5xl w-full px-6 flex flex-col items-center text-center space-y-12 py-20">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-gold/30 bg-brand-gold/10 text-brand-gold text-sm font-mono animate-pulse-glow">
          <ShieldCheck className="w-4 h-4" />
          <span>100% Shariah-Compliant Remittance</span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white drop-shadow-2xl">
          Digital Gold Meets <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-primary to-emerald-300">
            Global Remittance.
          </span>
        </h1>

        {/* Sub-headline */}
        <p className="text-xl text-brand-muted max-w-2xl leading-relaxed">
          Zakflow empowers the global Muslim community with seamless, low-cost remittances backed by physical gold, featuring automated 2.5% Zakat routing.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Link href="/dashboard">
            <button className="group relative px-8 py-4 bg-brand-primary text-white rounded-lg font-bold text-lg hover:bg-emerald-400 transition-all shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_35px_rgba(16,185,129,0.6)] flex items-center gap-3 overflow-hidden">
              <span className="relative z-10">Launch App</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 w-full h-full animate-shimmer opacity-20 pointer-events-none" />
            </button>
          </Link>
          
          <a href="#features" className="px-8 py-4 glass-panel text-white rounded-lg font-bold text-lg hover:bg-brand-surface/80 transition-colors flex items-center justify-center">
            View Features
          </a>
        </div>

        {/* Feature Cards Grid */}
        <div id="features" className="grid md:grid-cols-3 gap-6 w-full pt-24">
          
          {/* Card 1 */}
          <div className="glass-panel p-8 rounded-2xl text-left hover:border-brand-primary/50 transition-colors group animate-float" style={{ animationDelay: '0s' }}>
            <div className="w-14 h-14 bg-brand-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Coins className="w-7 h-7 text-brand-primary" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Auto Zakat Routing</h3>
            <p className="text-brand-muted leading-relaxed">
              Every remittance automatically calculates and routes the 2.5% Nisab requirement directly to verified charitable organizations.
            </p>
          </div>

          {/* Card 2 */}
          <div className="glass-panel p-8 rounded-2xl text-left hover:border-brand-gold/50 transition-colors group animate-float" style={{ animationDelay: '1s' }}>
            <div className="w-14 h-14 bg-brand-gold/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Activity className="w-7 h-7 text-brand-gold" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Gold-Backed PUSD</h3>
            <p className="text-brand-muted leading-relaxed">
              Transfer value using Palm USD, fully collateralized by physical, allocated gold stored in secure global vaults.
            </p>
          </div>

          {/* Card 3 */}
          <div className="glass-panel p-8 rounded-2xl text-left hover:border-blue-400/50 transition-colors group animate-float" style={{ animationDelay: '2s' }}>
            <div className="w-14 h-14 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Globe className="w-7 h-7 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Instant Settlement</h3>
            <p className="text-brand-muted leading-relaxed">
              Powered by the Solana network, enabling sub-second finality and near-zero fees for cross-border transactions globally.
            </p>
          </div>

        </div>
      </main>
    </div>
  );
}
