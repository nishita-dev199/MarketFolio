"use client";
import { useState } from "react";
import toast from "react-hot-toast";

export default function CtaSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    website: "",
    message: "",
    honeypot: "" // Added honeypot field
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (!/^[^0-9]+$/.test(formData.name)) {
      newErrors.name = "Name cannot contain numbers";
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the errors in the form.");
      return;
    }

    setStatus("loading");
    const loadingToast = toast.loading("Sending your inquiry...");

    try {
      const turnstileToken = (document.getElementsByName('cf-turnstile-response')[0] as HTMLInputElement)?.value;

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, turnstileToken }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      toast.success("Inquiry sent successfully!", { id: loadingToast });
      setStatus("success");
      setFormData({ name: "", email: "", website: "", message: "", honeypot: "" });
      setErrors({});
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Failed to send inquiry.";
      toast.error(errorMessage, { id: loadingToast });
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="w-full py-32 px-6 flex flex-col items-center mb-10">
      <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-zinc-200 bg-white text-xs font-bold uppercase tracking-widest text-zinc-500 mb-12">
        Contact Us
      </div>
      <div className="max-w-7xl w-full float-dark rounded-[3rem] p-8 md:p-16 bg-black teardrop-border flex flex-col md:flex-row gap-16">
        
        {/* Left Side: Form */}
        <div className="flex-1">
          <h2 className="text-5xl font-black tracking-tighter text-white mb-8 leading-tight">
            Let&apos;s Scale Your Revenue.
          </h2>
          
          {status === "success" ? (
            <div className="bg-zinc-900/50 border border-white/10 rounded-[2.5rem] p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
              <div className="w-20 h-20 rounded-full bg-white text-black flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-3xl font-black text-white mb-4">Inquiry Sent!</h3>
              <p className="text-zinc-400 mb-10 max-w-sm mx-auto leading-relaxed">
                Thank you for reaching out. Our team will analyze your details and get back to you within 24 hours.
              </p>
              <button 
                onClick={() => setStatus("idle")}
                className="text-white border border-white/20 px-10 py-4 rounded-full hover:bg-white hover:text-black transition-all font-bold text-sm uppercase tracking-widest"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-center ml-4">
                    <label className="text-xs font-bold uppercase text-zinc-500">Full Name</label>
                    {errors.name && <span className="text-[10px] text-red-500 font-bold uppercase tracking-wider">{errors.name}</span>}
                  </div>
                  <input 
                    type="text" 
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full bg-zinc-900/50 border ${errors.name ? 'border-red-500/50' : 'border-zinc-800'} rounded-full px-6 py-4 text-white focus:outline-none focus:border-white transition-colors`}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center ml-4">
                    <label className="text-xs font-bold uppercase text-zinc-500">Email Address</label>
                    {errors.email && <span className="text-[10px] text-red-500 font-bold uppercase tracking-wider">{errors.email}</span>}
                  </div>
                  <input 
                    type="email" 
                    placeholder="john@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full bg-zinc-900/50 border ${errors.email ? 'border-red-500/50' : 'border-zinc-800'} rounded-full px-6 py-4 text-white focus:outline-none focus:border-white transition-colors`}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-zinc-500 ml-4">Company Website</label>
                <input 
                  type="url" 
                  placeholder="https://company.com"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="w-full bg-zinc-900/50 border border-zinc-800 rounded-full px-6 py-4 text-white focus:outline-none focus:border-white transition-colors"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center ml-4">
                  <label className="text-xs font-bold uppercase text-zinc-500">How can we help?</label>
                  {errors.message && <span className="text-[10px] text-red-500 font-bold uppercase tracking-wider">{errors.message}</span>}
                </div>
                <textarea 
                  rows={4}
                  placeholder="Tell us about your growth goals..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={`w-full bg-zinc-900/50 border ${errors.message ? 'border-red-500/50' : 'border-zinc-800'} rounded-[2rem] px-6 py-4 text-white focus:outline-none focus:border-white transition-colors resize-none`}
                ></textarea>
              </div>

              {/* Honeypot Field - Hidden from humans, but bots will fill it */}
              <div className="hidden" aria-hidden="true">
                <input 
                  type="text" 
                  name="honeypot" 
                  tabIndex={-1} 
                  autoComplete="off"
                  value={formData.honeypot}
                  onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                />
              </div>

              {/* Cloudflare Turnstile Widget Placeholder */}
              <div 
                className="cf-turnstile" 
                data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "your-site-key"}
                data-theme="dark"
              ></div>

              <button 
                type="submit" 
                disabled={status === "loading"}
                className="float-sm w-full bg-white text-black py-5 rounded-full font-black text-lg hover:scale-[1.02] active:scale-95 transition-transform tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "loading" ? (
                   <span className="flex items-center justify-center gap-2">
                     <svg className="animate-spin h-5 w-5 text-black" viewBox="0 0 24 24">
                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                     </svg>
                     Sending Inquiry...
                   </span>
                ) : "Submit Inquiry →"}
              </button>
            </form>
          )}
        </div>

        {/* Right Side: Details */}
        <div className="md:w-1/3 flex flex-col justify-center gap-12 pt-8 md:pt-0 border-t md:border-t-0 md:border-l border-zinc-800 md:pl-16">
          <div>
            <h4 className="text-xs font-bold uppercase text-zinc-500 mb-4 tracking-widest">Direct Contact</h4>
            <div className="space-y-4">
              <p className="text-lg text-white font-medium hover:text-zinc-300 transition-colors">
                <a href="mailto:[EMAIL_ADDRESS]">contact@evanderdigital.com</a>
              </p>
              <p className="text-lg text-white font-medium hover:text-zinc-300 transition-colors">
                <a href="tel:+918438463105">+91 84384 63105</a>
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase text-zinc-500 mb-4 tracking-widest">Headquarters</h4>
            <p className="text-lg text-white font-medium leading-relaxed">
              Bangalore<br />
              Karnataka, India
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase text-zinc-500 mb-4 tracking-widest">What happens next?</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-zinc-400 text-sm">
                <span className="text-white">✓</span> 
                Analysis of your current channels
              </li>
              <li className="flex items-start gap-3 text-zinc-400 text-sm">
                <span className="text-white">✓</span> 
                Custom roadmap presentation
              </li>
              <li className="flex items-start gap-3 text-zinc-400 text-sm">
                <span className="text-white">✓</span> 
                No obligation, no sales pitch
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
