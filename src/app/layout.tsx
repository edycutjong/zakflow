import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zakflow | Shariah-compliant PUSD Remittance",
  description: "Zakat-enabled cross-border remittance powered by Palm USD (PUSD) on Solana. Features automated Zakat routing and real-time gold-backing transparency.",
  keywords: ["Solana", "Palm USD", "PUSD", "Remittance", "Zakat", "Islamic Finance", "Shariah-compliant", "Crypto"],
  authors: [{ name: "Zakflow Team" }],
  metadataBase: new URL("https://zakflow.vercel.app"),
  icons: {
    icon: "/icon.svg",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "Zakflow | Shariah-compliant PUSD Remittance",
    description: "Zakat-enabled cross-border remittance powered by Palm USD (PUSD) on Solana. Features automated Zakat routing and real-time gold-backing transparency.",
    url: "https://zakflow.edycu.dev",
    siteName: "Zakflow",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Zakflow - PUSD Remittance",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zakflow | Shariah-compliant PUSD Remittance",
    description: "Zakat-enabled cross-border remittance powered by Palm USD (PUSD) on Solana.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased min-h-screen bg-brand-bg text-white`}
      >
        {children}
      </body>
    </html>
  );
}
