"use client";

import { useEffect, useState, useRef } from "react";

export default function ParallaxSection({ imageUrl }: { imageUrl: string }) {
  const [offset, setOffset] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollPosition = window.innerHeight - rect.top;
      
      // Only update if the section is in view
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        setOffset(scrollPosition * 0.15); // Adjust speed factor here
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="w-full aspect-[3/4] md:aspect-[2.4/1] relative overflow-hidden flex items-center justify-center bg-black"
    >
      <div
        className="absolute inset-0 bg-center bg-cover scale-110"
        style={{
          backgroundImage: `url("${imageUrl}")`,
          transform: `translateY(${offset - 70}px)`, 
          transition: "transform 0.1s ease-out",
        }}
      />

      {/* Top Shadow (Dark) */}
      <div className="absolute top-0 left-0 w-full h-[30%] bg-gradient-to-b from-black/90 to-transparent z-10" />

      {/* Bottom Shadow (Dark) */}
      <div className="absolute bottom-0 left-0 w-full h-[30%] bg-gradient-to-t from-black/90 to-transparent z-10" />

      {/* Subtle dark overlay */}
      <div className="absolute inset-0 bg-black/10 z-0" />
    </section>
  );
}
