import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import LenisProvider from "@/components/LenisProvider";
import Navigation from "@/components/Navigation";
import "./globals.css";

const displayFont = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const bodyFont = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "ShadowTrace · Dynamic OSINT Investigations",
  description: "Cinematic, open-source intelligence simulator. Correlate telemetry, inspect cryptographic leaks, and reconstruct classified security breaches.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body text-text selection:bg-accent/30 selection:text-white">
        <LenisProvider>
          <Navigation />
          <main className="flex-1 flex flex-col pt-16 sm:pt-20">
            {children}
          </main>
        </LenisProvider>
      </body>
    </html>
  );
}

