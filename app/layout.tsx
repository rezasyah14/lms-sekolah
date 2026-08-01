import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "LMS Easynomics",
    template: "%s | LMS Easynomics",
  },
  description:
    "Platform pembelajaran digital untuk sekolah — mudah, modern, dan efektif.",
  keywords: ["LMS", "e-learning", "sekolah", "pendidikan", "Easynomics"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={inter.variable}>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
