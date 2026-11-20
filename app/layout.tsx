import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";

import { Providers } from "@/components/providers";
import { SiteHeader } from "@/components/site-header";

import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
});

export const viewport = {
  themeColor: "#eef1f4",
};

export const metadata: Metadata = {
  title: {
    default: "Marquee",
    template: "%s · Marquee",
  },
  description: "A daily board of films people are watching right now.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${fraunces.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:bg-card focus:px-3 focus:py-2"
        >
          Skip to content
        </a>
        <Providers>
          <SiteHeader />
          <main id="main">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
