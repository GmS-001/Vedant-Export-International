import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vedant Exports International | Agricultural Sourcing & Global Export",
  description:
    "Leading B2B exporter of premium agricultural commodities from North India. Specialized in potatoes, onions, fresh vegetables, and agro commodities with cold-storage infrastructure in Agra.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-white font-sans text-[#111111] antialiased">
        {children}
      </body>
    </html>
  );
}
