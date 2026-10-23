import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  preload: false,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  preload: false,
});

const description =
  "Portfolio de Yacouba Barro, élève ingénieur statisticien-économiste à l’ISSP (Université Joseph Ki-Zerbo) : économétrie appliquée, macroéconomie quantitative, science des données, développement web et design, à Ouagadougou.";

export const metadata: Metadata = {
  metadataBase: new URL("https://bdigistat.com"),
  title: "Yacouba Barro | Statisticien-économiste, data et développement",
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: "Yacouba Barro",
    title: "Yacouba Barro | Statisticien-économiste, data et développement",
    description,
    locale: "fr_FR",
    images: [{ url: "/yacouba-barro.webp", width: 420, height: 420, alt: "Portrait de Yacouba Barro" }],
  },
  verification: {
    google: "M56qV9j2VneXOwMiI1MLoJ2upGPe35gs5eAsm7lXLMQ",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
