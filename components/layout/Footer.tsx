import Link from "next/link";
import { FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white py-16 mt-auto relative">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent"></div>
      <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
        <div className="flex flex-col items-center md:items-start gap-4 md:col-span-1">
          <Link href="/" className="text-2xl font-black tracking-tighter text-white">
            <img src="/black_logo_crp.png" alt="Logo" className="h-12 md:h-16 w-auto" />
          </Link>
          <p className="text-zinc-400 text-sm leading-relaxed text-center md:text-left">
            We engineer high-performance marketing systems that turn cold traffic into compounding revenue through data-driven growth strategies.
          </p>
        </div>
        
        <div className="flex flex-col items-center md:items-start gap-4">
          <h3 className="font-semibold text-lg">Services</h3>
          <Link href="/#services" className="text-zinc-400 hover:text-white transition-colors text-sm">Performance Marketing</Link>
          <Link href="/#services" className="text-zinc-400 hover:text-white transition-colors text-sm">SEO & Organic Growth</Link>
          <Link href="/#services" className="text-zinc-400 hover:text-white transition-colors text-sm">Funnel Optimization</Link>
          <Link href="/#services" className="text-zinc-400 hover:text-white transition-colors text-sm">Data-Driven Analytics</Link>
        </div>

        <div className="flex flex-col items-center md:items-start gap-4">
          <h3 className="font-semibold text-lg">Company</h3>
          <Link href="/about" className="text-zinc-400 hover:text-white transition-colors text-sm">About Us</Link>
          <Link href="/#process" className="text-zinc-400 hover:text-white transition-colors text-sm">Our Process</Link>
          <Link href="/#case-studies" className="text-zinc-400 hover:text-white transition-colors text-sm">Case Studies</Link>
          <Link href="/#contact" className="text-zinc-400 hover:text-white transition-colors text-sm">Contact Us</Link>
        </div>

        <div className="flex flex-col items-center md:items-start gap-4">
          <h3 className="font-semibold text-lg">Get in Touch</h3>
          <p className="text-zinc-400 text-sm text-center md:text-left">Ready to scale your business? Let&apos;s engineer your next growth phase.</p>
          <button className="bg-white text-black px-6 py-2.5 rounded-full font-bold hover:scale-105 hover:shadow-[0_20px_40px_-12px_rgba(255,255,255,0.2)] transition-all w-fit mt-2">
            <a href="/#contact"> Free Consultation </a>
          </button>
        </div>
      </div>
      
      <div className="mx-auto max-w-7xl px-6 mt-16 pt-8 border-t border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-zinc-500">
        <p>&copy; {new Date().getFullYear()} Evander Digital Marketing. All rights reserved.</p>
        
        <div className="flex items-center gap-8">
          <div className="flex gap-6 items-center">
            <a href="https://www.instagram.com/evanderdigital?igsh=MXR0andzNjd5MHIyOQ==" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors">
              <FaInstagram className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/company/evander-digital-marketing/" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors">
              <FaLinkedin className="w-5 h-5" />
            </a>
          </div>
          <div className="h-4 w-[1px] bg-zinc-800 hidden md:block"></div>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
