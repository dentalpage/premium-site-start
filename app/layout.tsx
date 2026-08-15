import type { Metadata } from "next";
import { Fraunces, Inter, Geist_Mono } from "next/font/google";
import CursorGlow from "@/components/cursor-glow";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "RUNOUT — Motion & Interactive Design",
  description:
    "RUNOUT is the one-person studio of Mara Voss, an independent motion and interactive designer building brand films, launch sites, and interactive specimens.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${geistMono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-bg font-body text-ink antialiased selection:bg-accent selection:text-bg">
        <CursorGlow />
        {children}
      </body>
    </html>
  );
}
