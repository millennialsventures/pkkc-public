import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NavBar } from "@/src/components/layout/NavBar";
import { Footer } from "@/src/components/layout/Footer";
import { orgInfo } from "@/src/data/orgInfo";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(orgInfo.domain),
  title: {
    default: "PKKC - Persatuan Komuniti Kita Cybersouth",
    template: "%s | PKKC",
  },
  description:
    "Laman rasmi Persatuan Komuniti Kita Cybersouth (PKKC) — jawatankuasa, aktiviti komuniti, dan aplikasi mudah alih.",
  openGraph: {
    url: orgInfo.domain,
    siteName: "PKKC",
    locale: "ms_MY",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ms"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-pkkc-bg text-pkkc-ink">
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
