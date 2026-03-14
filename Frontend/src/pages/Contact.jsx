import React, { useState } from "react";
import { Mail, Github, Linkedin, Send, Loader2 } from "lucide-react";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Message sent successfully! (Simulation)");
      e.target.reset();
    }, 1500);
  };

  return (
    <div className="min-h-screen mt-10 bg-[#0f0f13] text-white font-sans relative selection:bg-[#d4ff3a] selection:text-black pt-24 pb-32 px-6">
      <div className="fixed top-1/4 left-0 w-96 h-96 bg-[#d4ff3a]/5 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-16">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-600">
            Contact
          </h1>
          <p className="text-gray-400 text-lg md:text-xl font-medium max-w-2xl">
            Have questions, suggestions, or feedback about the platform? Feel
            free to reach out. We welcome collaboration ideas and feature
            suggestions!
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Left: Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            <a
              href="mailto:devnex.contact@gmail.com"
              className="flex items-center gap-6 p-6 bg-white/5 hover:bg-white/10 border border-white/10 rounded-[2rem] transition-all group"
            >
              <div className="w-14 h-14 bg-[#1c1c22] rounded-2xl flex items-center justify-center group-hover:text-[#d4ff3a] transition-colors border border-white/5 shadow-inner">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-gray-500 mb-1">
                  Email
                </p>
                <p className="font-bold text-white">
                  ruchitthakkar12@gmail.com
                </p>
              </div>
            </a>

            <a
              href="https://github.com/Ruchit-thakkar"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-6 p-6 bg-white/5 hover:bg-white/10 border border-white/10 rounded-[2rem] transition-all group"
            >
              <div className="w-14 h-14 bg-[#1c1c22] rounded-2xl flex items-center justify-center group-hover:text-[#d4ff3a] transition-colors border border-white/5 shadow-inner">
                <Github className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-gray-500 mb-1">
                  GitHub
                </p>
                <p className="font-bold text-white">
                  github.com/Ruchit-thakkar
                </p>
              </div>
            </a>

            <a
              href="https://linkedin.com/in/ruchit-thakkar"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-6 p-6 bg-white/5 hover:bg-white/10 border border-white/10 rounded-[2rem] transition-all group"
            >
              <div className="w-14 h-14 bg-[#1c1c22] rounded-2xl flex items-center justify-center group-hover:text-[#d4ff3a] transition-colors border border-white/5 shadow-inner">
                <Linkedin className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-gray-500 mb-1">
                  LinkedIn
                </p>
                <p className="font-bold text-white">
                  linkedin.com/in/ruchit-thakkar
                </p>
              </div>
            </a>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-3 bg-[#1c1c22]/80 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-[3rem] shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2 pl-2">
                    Name
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-6 py-4 bg-black/30 border border-white/10 rounded-2xl focus:outline-none focus:border-[#d4ff3a] transition-all font-bold text-white placeholder:text-gray-600 shadow-inner"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2 pl-2">
                    Email
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="john@example.com"
                    className="w-full px-6 py-4 bg-black/30 border border-white/10 rounded-2xl focus:outline-none focus:border-[#d4ff3a] transition-all font-bold text-white placeholder:text-gray-600 shadow-inner"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2 pl-2">
                  Message
                </label>
                <textarea
                  required
                  rows="5"
                  placeholder="How can we help?"
                  className="w-full px-6 py-4 bg-black/30 border border-white/10 rounded-2xl focus:outline-none focus:border-[#d4ff3a] transition-all font-medium text-white placeholder:text-gray-600 resize-none shadow-inner"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-3 bg-[#d4ff3a] text-black py-4 md:py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:scale-[1.02] shadow-[0_0_30px_rgba(212,255,58,0.2)] hover:shadow-[0_0_40px_rgba(212,255,58,0.4)] disabled:opacity-50 disabled:hover:scale-100 transition-all duration-300 mt-4"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" /> Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
