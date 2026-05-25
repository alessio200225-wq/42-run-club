import type { Metadata } from "next";
import { Bebas_Neue, JetBrains_Mono, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import CustomCursor from "./components/CustomCursor";

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  weight: ["700", "800"],
  variable: "--font-barlow",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "42 Run Club — Entraînement sur mesure. Progression garantie.",
  description:
    "Coaching running 100% personnalisé, entièrement à distance. Chaque plan est construit pour un seul coureur, jamais dupliqué.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${bebasNeue.variable} ${jetbrainsMono.variable} ${barlowCondensed.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col cursor-none">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
