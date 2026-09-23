import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
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

export const metadata: Metadata = {
  title: "ShadowTrace",
  description: "Every clue tells a story.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body">
        <LenisProvider>
          <Navigation />
          <main className="flex-1 flex flex-col pt-24 pb-12 px-6 lg:px-24">
            {children}
          </main>
        </LenisProvider>
      </body>
    </html>
  );
}
