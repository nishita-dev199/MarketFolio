"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { SERVICES } from "@/lib/content/services";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  return (
    <header className="w-full sticky top-0 z-50 pt-6 px-4 pb-2 bg-transparent">
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-4 flex items-center justify-between float-md rounded-full bg-white teardrop-border relative">
        <Link href="/" className="text-2xl font-black tracking-tighter text-black z-50">
          MarketFolio
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-2 font-medium">
          <Link href="/" className="px-6 py-2 rounded-full text-zinc-500 hover:text-black hover:float-pressed transition-all">Home</Link>
          
          <div className="relative group">
            <Link href="/#services" className="px-6 py-2 rounded-full text-zinc-500 hover:text-black hover:float-pressed transition-all inline-block">Services</Link>
            <div className="absolute top-full pt-4 left-1/2 -translate-x-1/2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
              <div className="w-56 bg-white border border-zinc-200 rounded-2xl shadow-xl flex flex-col p-2">
                {SERVICES.map((service) => (
                  <Link key={service.slug} href={`/services/${service.slug}`} className="px-4 py-3 text-sm text-zinc-500 hover:text-black hover:bg-zinc-50 rounded-xl transition-colors font-medium">
                    {service.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link href="/blog" className="px-6 py-2 rounded-full text-zinc-500 hover:text-black hover:float-pressed transition-all">Blog</Link>
          <Link href="/about" className="px-6 py-2 rounded-full text-zinc-500 hover:text-black hover:float-pressed transition-all">About Us</Link>
          <Link href="/#contact" className="px-6 py-2 rounded-full text-zinc-500 hover:text-black hover:float-pressed transition-all">Contact</Link>
        </nav>

        {/* Desktop CTA */}
        <button className="hidden md:block float-dark px-8 py-3 rounded-full font-bold hover:-translate-y-1 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] transition-all text-sm tracking-wide">
          <Link href="/#contact">Free Consultation</Link>
        </button>

        {/* Hamburger Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden z-50 p-2 text-black focus:outline-none"
          aria-label="Toggle menu"
        >
          <div className="w-6 h-5 relative flex flex-col justify-between">
            <span className={`w-full h-0.5 bg-black rounded-full transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-full h-0.5 bg-black rounded-full transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
            <span className={`w-full h-0.5 bg-black rounded-full transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 bg-white z-40 flex flex-col items-center justify-center gap-8 transition-all duration-500 md:hidden ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
          <nav className="flex flex-col items-center gap-6">
             <Link 
              href="/" 
              onClick={() => setIsOpen(false)}
              className="text-3xl font-black text-zinc-400 hover:text-black transition-colors"
            >
              Home
            </Link>
            <div className="flex flex-col items-center w-full">
              <button 
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className="flex items-center gap-2 text-3xl font-black text-zinc-400 hover:text-black transition-colors"
              >
                Services
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className={`w-6 h-6 transition-transform duration-300 ${isServicesOpen ? "rotate-180" : ""}`}><path d="m6 9 6 6 6-6"/></svg>
              </button>
              
              <div className={`flex flex-col items-center overflow-hidden transition-all duration-300 w-full ${isServicesOpen ? "max-h-96 opacity-100 mt-6 gap-5" : "max-h-0 opacity-0"}`}>
                {SERVICES.map((service) => (
                  <Link 
                    key={service.slug} 
                    href={`/services/${service.slug}`} 
                    onClick={() => { setIsOpen(false); setIsServicesOpen(false); }}
                    className="text-xl font-black text-zinc-400 hover:text-black transition-colors"
                  >
                    {service.title}
                  </Link>
                ))}
              </div>
            </div>
            <Link 
              href="/blog" 
              onClick={() => setIsOpen(false)}
              className="text-3xl font-black text-zinc-400 hover:text-black transition-colors"
            >
              Blog
            </Link>
            <Link 
              href="/about" 
              onClick={() => setIsOpen(false)}
              className="text-3xl font-black text-zinc-400 hover:text-black transition-colors"
            >
              About Us
            </Link>
            <Link 
              href="/#case-studies" 
              onClick={() => setIsOpen(false)}
              className="text-3xl font-black text-zinc-400 hover:text-black transition-colors"
            >
              Case Studies
            </Link>
            <Link 
              href="/#contact" 
              onClick={() => setIsOpen(false)}
              className="text-3xl font-black text-zinc-400 hover:text-black transition-colors"
            >
              Contact
            </Link>
          </nav>
          <button 
            onClick={() => setIsOpen(false)}
            className="float-dark px-10 py-4 rounded-full font-bold text-lg mt-4"
          >
            <Link href="/#contact">Free Consultation</Link>
          </button>
        </div>
      </div>
    </header>
  );
}
