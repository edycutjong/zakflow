<div align="center">
  <h1>Zakflow 🚀</h1>
  <p><em>Zakat-enabled PUSD remittance. Gold-backed. Shariah-compliant.</em></p>
  <img src="docs/assets/readme-hero.png" alt="Zakflow Hero" width="100%">
  
  <br/>
  
  [![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen.svg)](https://zakflow.edycu.dev)
  [![Pitch Deck](https://img.shields.io/badge/Pitch-Deck-f59e0b.svg)](https://zakflow.edycu.dev/pitch)
  [![Pitch Video](https://img.shields.io/badge/Pitch-Video-red.svg)](https://youtube.com/your-video)
  [![GitHub](https://img.shields.io/badge/GitHub-Repository-black.svg)](https://superteam.fun/earn/listing/palm-usd-x-superteam-uae-solana-builders-1)

  <br/>

  ![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white)
  ![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
  ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
  ![Palm USD](https://img.shields.io/badge/Palm_USD-000000?style=flat&logo=solana&logoColor=white)
  ![Vitest](https://img.shields.io/badge/Vitest-FCC72B?style=flat&logo=vitest&logoColor=white)
</div>

---

## 📸 See it in Action
*(Demo GIF and UI screenshots can be found in the `docs/assets` directory)*

[**▶️ Watch the Demo Video**](https://youtube.com/your-video)

<div align="center">
  <img src="docs/assets/og-image.png" alt="App Demo" width="100%">
</div>

## 💡 The Problem & Solution
Zakat-enabled PUSD remittance. Gold-backed. Shariah-compliant.

**Zakflow** solves this by providing: 
Zakat-enabled PUSD remittance. Gold-backed. Shariah-compliant.

**Key Features:**
- ⚡ **High Performance:** Seamless integration and optimized workflows.
- 🔒 **Secure by Design:** Verifiable on-chain actions and robust data protection.
- 🎨 **Intuitive UX:** Beautiful, user-centric interface built for scale.

## 🏗️ Architecture & Tech Stack

### Tech Stack
| Component | Technology | Description |
|-----------|------------|-------------|
| **Frontend** | Next.js 16, React 19 | App Router, SSR, Server Components |
| **Styling** | Tailwind CSS v4 | High-performance responsive UI |
| **Language** | TypeScript | Strict type safety across the stack |
| **Integration**| Palm USD | Gold-backed token routing |
| **Testing** | Vitest | Comprehensive unit and component testing |

For a detailed breakdown of our system architecture and data flow, please refer to the [Architecture Document](docs/ARCHITECTURE.md).

## 🧩 How We Use Palm USD

**Zakflow** fundamentally relies on Palm USD to function:

1. **Palm USD SDK:** We use Palm USD to process secure remittances and autonomously route exact Zakat portions to verified charity pools, utilizing its gold-backed stability.

## 🏆 Sponsor Tracks Targeted
* **Sponsor Integration**: Palm USD (Check `docs/SPONSOR_DEFENSE.md` for our full sponsor integration strategy)

## 🚀 Run it Locally (For Judges)

1. **Clone the repo:** `git clone https://github.com/edycutjong/frontier-palm-usd.git`
2. **Install dependencies:** `npm install`
3. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   *Note: Set your `NEXT_PUBLIC_RPC_URL` and `GOLD_API_KEY` in the `.env.local` file.*
4. **Run the app:** `npm run dev`

> **Note for Judges:** 
> Detailed demo scripts and sponsor defenses are located in the `docs/` directory.
> Read `docs/SPONSOR_DEFENSE.md` for technical implementation details.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
