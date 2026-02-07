import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Quantum Photonics Lab | HIT Shenzhen",
  description: "哈尔滨工业大学（深圳）量子光子学课题组 - 专注于碳化硅色心、金刚石色心、固态量子缺陷等量子光学研究",
  keywords: "quantum photonics, SiC color center, diamond NV center, quantum optics, HIT Shenzhen",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased bg-gray-50`}>
        <Header />
        <main className="min-h-screen pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
