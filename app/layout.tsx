import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Evander Digital | Data-Driven Growth Agency",
    template: "%s | Evander Digital"
  },
  description: "Evander is a premium digital marketing agency specializing in algorithmic SEO, full-funnel paid media, and high-performance marketing systems designed to scale revenue.",
  keywords: ["digital marketing agency", "performance marketing", "SEO services", "PPC management", "growth agency", "Evander Digital", "conversion rate optimization"],
  authors: [{ name: "Evander Digital" }],
  creator: "Evander Digital",
  publisher: "Evander Digital",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://evanderdigital.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Evander Digital | Data-Driven Growth Agency',
    description: 'Engineering high-performance marketing systems that turn cold traffic into loyal customers.',
    url: 'https://evanderdigital.com',
    siteName: 'Evander Digital',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Evander Digital | Data-Driven Growth Agency',
    description: 'Engineering high-performance marketing systems that turn cold traffic into loyal customers.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <Toaster position="bottom-right" toastOptions={{
          style: {
            background: '#000',
            color: '#fff',
            borderRadius: '1rem',
            padding: '16px 24px',
            fontSize: '14px',
            fontWeight: '600',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
          },
        }} />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
