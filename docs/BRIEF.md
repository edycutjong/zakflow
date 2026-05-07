# Zakflow — Full Project Brief

## PRD
> **Hook**: A Malaysian worker in Dubai couldn't send Zakat-compliant remittances home because no crypto app understands Islamic finance.

**Problem**: 1.8B Muslims globally need Shariah-compliant financial tools. Gold-backed PUSD is a natural fit but nobody has built the remittance layer.

**Solution**: Zakat-enabled remittance platform. Send PUSD with automatic 2.5% Zakat calculation, Shariah compliance display, gold price visualization.

**Core Features**:
1. PUSD remittance send flow (sender → recipient)
2. Automatic 2.5% Zakat calculation and badge
3. Real-time gold price display (PUSD is gold-backed)
4. Shariah compliance certificate (visual, not legal)
5. Remittance receipt with gold backing proof

**Out of Scope**: Actual Shariah certification, fiat on/off ramp, multi-currency

---

## ARCHITECTURE
| Layer | Technology |
|---|---|
| Frontend | Next.js 16, React 19, Tailwind v4 |
| Token | PUSD SDK (transfers) |
| Data | Gold Price API (XAU/USD) |
| Database | Supabase (remittance history) |

**PUSD depth**: Token transfers, balance queries, gold backing verification — 3+ features.

---

## BUILD PLAN (3 Days)
- **Day 1**: PUSD SDK integration, remittance send flow, gold price API
- **Day 2**: Zakat calculator, compliance badge, receipt generator
- **Day 3**: Polish UI (Islamic geometric patterns), demo video, deploy

---

## SUBMISSION
**Demo**: Send 100 PUSD to family → auto-calculates 2.5 PUSD Zakat → gold price shown ($2,400/oz) → receipt: "Your remittance is backed by 0.042 oz gold."

---

## SEED DATA
5 sample remittances, gold price history (30 days), Zakat calculation examples.

---

## UI
Warm gold/emerald color scheme, Islamic geometric pattern borders, gold price ticker, Zakat badge (green checkmark), remittance receipt card.
