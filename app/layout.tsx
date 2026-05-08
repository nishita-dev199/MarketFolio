import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const GTM_ID = "GTM-W244STHT";

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

import ConditionalHeader from "@/components/layout/ConditionalHeader";
import ConditionalFooter from "@/components/layout/ConditionalFooter";

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
      <head>
        <Script id="google-tag-manager" strategy="beforeInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          async
          defer
        />
      </head>
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height={0}
            width={0}
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
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
        <ConditionalHeader />
        <main className="flex-1">{children}</main>
        <ConditionalFooter />
      </body>
    </html>
  );
}
