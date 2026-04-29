"use client";
import { useEffect, useState, useRef } from "react";

function CountUp({ end, suffix = "", duration = 2000 }: { end: number, suffix?: string, duration?: number }) {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [hasStarted, end, duration]);

  return <span ref={countRef}>{count}{suffix}</span>;
}

export default function MetricsSection() {
  return (
    <section id="about" className="w-full px-6 flex flex-col items-center">
      <div className="max-w-7xl w-full flex flex-col items-center mb-16">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-zinc-200 bg-white text-xs font-bold uppercase tracking-widest text-zinc-500 mb-6">
          Our Impact
        </div>
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-black mb-4 text-center">
          The Proof is in the Performance.
        </h2>
        <p className="text-lg text-zinc-500 max-w-2xl text-center font-medium">
          We don&apos;t just promise growth — we engineer it. Here is the scale we operate at.
        </p>
      </div>

      <div className="max-w-7xl w-full float-md rounded-[3rem] bg-white px-8 py-16 flex flex-col md:flex-row justify-between items-center gap-10 teardrop-border shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)]">
        <div className="text-center flex-1">
          <h4 className="text-6xl font-black text-black mb-2 tracking-tighter">
            <CountUp end={300} suffix="%" />
          </h4>
          <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Avg. Client ROI</p>
          <p className="text-xs text-zinc-400 font-medium mt-1 px-4">measured across 12-month engagements</p>
        </div>
        <div className="hidden md:block w-px h-24 bg-zinc-200"></div>
        <div className="text-center flex-1">
          <h4 className="text-6xl font-black text-black mb-2 tracking-tighter">
            ₹<CountUp end={2} suffix=" Cr+" />
          </h4>
          <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Revenue Generated</p>
          <p className="text-xs text-zinc-400 font-medium mt-1 px-4">tracked via closed-loop analytics</p>
        </div>
        <div className="hidden md:block w-px h-24 bg-zinc-200"></div>
        <div className="text-center flex-1">
          <h4 className="text-6xl font-black text-black mb-2 tracking-tighter">
            <CountUp end={15} suffix="+" />
          </h4>
          <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Growth Clients Served</p>
          <p className="text-xs text-zinc-400 font-medium mt-1 px-4">across SaaS, e-com, and services</p>
        </div>
      </div>
    </section>
  );
}
