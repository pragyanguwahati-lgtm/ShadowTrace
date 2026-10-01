import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import LenisProvider from "@/components/LenisProvider";
import Navigation from "@/components/Navigation";
import SkipToContent from "@/components/ui/SkipToContent";
import ScrollProgressBar from "@/components/ui/ScrollProgressBar";
import BackToTopButton from "@/components/ui/BackToTopButton";
import TacticalCookieConsent from "@/components/ui/TacticalCookieConsent";
import UTMTracker from "@/components/ui/UTMTracker";
import TacticalDispatchBeacon from "@/components/ui/TacticalDispatchBeacon";
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
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/icon.svg",
    apple: "/apple-icon.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body text-text selection:bg-accent/30 selection:text-white">
        {/* Feature 12: Skip To Content */}
        <SkipToContent />

        {/* Feature 8: Scroll Progress Bar */}
        <ScrollProgressBar />

        {/* Feature 14: UTM Parameter Capture */}
        <UTMTracker />

        <LenisProvider>
          <Navigation />
          <main id="main-content" className="flex-1 flex flex-col pt-16 sm:pt-20">
            {children}
          </main>
          {/* Feature 4: Back To Top Button */}
          <BackToTopButton />

          {/* Feature 20: Tactical Dispatch Beacon (Floating Contact) */}
          <TacticalDispatchBeacon />

          {/* Feature 2: Privacy / Cookie Banner */}
          <TacticalCookieConsent />
        </LenisProvider>
      </body>
    </html>
  );
}


