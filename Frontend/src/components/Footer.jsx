import React from "react";
import { AudioLines, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#0f0f13] text-white pt-20 pb-10 overflow-hidden relative border-t border-white/10 mt-auto mb-28">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Top Section: Newsletter & Brand Info */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-16 mb-20">
          {/* Left: Brand & Newsletter CTA */}
          <div className="max-w-xl w-full">
            <div className="flex items-center gap-3 text-[#d4ff3a] mb-6">
              <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
                <AudioLines className="w-8 h-8" />
              </div>
              <span className="text-3xl font-black tracking-tighter text-white">
                BitBeats
              </span>
            </div>

            <h3 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              Stay in the loop.
            </h3>
            <p className="text-gray-400 text-lg mb-8 max-w-md leading-relaxed">
              A modern personal music streaming platform. Stay updated with new
              features and platform improvements.
            </p>

            {/* Modern Pill-Shaped Newsletter Input */}
            <form
              className="relative flex items-center w-full max-w-md"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-6 pr-36 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#d4ff3a] transition-all"
              />
              <button
                type="submit"
                className="absolute right-2 top-2 bottom-2 bg-[#d4ff3a] hover:bg-[#b8e02b] text-[#0f0f13] font-bold px-6 rounded-full transition-colors flex items-center gap-2"
              >
                Subscribe <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Right: Navigation Links */}
          <div className="flex gap-16 md:gap-24 pt-4">
            <div className="flex flex-col gap-5">
              <h4 className="text-white font-semibold mb-2 text-lg tracking-wide">
                Platform
              </h4>
              <Link
                to="/"
                className="text-gray-400 hover:text-[#d4ff3a] transition-colors font-medium"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-gray-400 hover:text-[#d4ff3a] transition-colors font-medium"
              >
                About Us
              </Link>
              <Link
                to="/contact"
                className="text-gray-400 hover:text-[#d4ff3a] transition-colors font-medium"
              >
                Contact
              </Link>
            </div>
            {/* Added a dummy Legal column to balance the UI */}
            <div className="flex flex-col gap-5">
              <h4 className="text-white font-semibold mb-2 text-lg tracking-wide">
                Legal
              </h4>
              <Link
                to="/"
                className="text-gray-400 hover:text-[#d4ff3a] transition-colors font-medium"
              >
                Privacy Policy
              </Link>
              <Link
                to="/"
                className="text-gray-400 hover:text-[#d4ff3a] transition-colors font-medium"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section: Massive Text & Copyright */}
        <div className="flex flex-col items-center justify-center pt-8 border-t border-white/10">
          {/* Decorative Big Text Effect */}
          <h1 className="text-[14vw] leading-none font-black text-white/[0.03] tracking-tighter select-none text-center w-full mb-8">
            BITBEATS
          </h1>

          {/* Copyright and Credit */}
          <div className="flex flex-col md:flex-row justify-between w-full items-center gap-4 text-sm text-gray-500 font-medium">
            <p>
              © {new Date().getFullYear()} DevNex Music Platform. All rights
              reserved.
            </p>
            <p className="flex items-center gap-1">
              Made with <span className="text-[#d4ff3a]">♥</span> by
              <span className="text-gray-300 hover:text-[#d4ff3a] transition-colors cursor-pointer ml-1 font-bold">
                Ruchit (DevNex)
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
