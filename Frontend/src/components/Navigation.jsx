import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Home,
  Music2,
  ListMusic,
  UploadCloud,
  LogOut,
  Menu,
  X,
  Info,
  Mail,
  User,
  AudioLines,
} from "lucide-react";

const Navigation = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 🟢 1. Add state for the Logout Modal
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  // 🟢 2. New function to actually execute the logout when confirmed
  const handleConfirmLogout = async () => {
    setIsLogoutModalOpen(false);
    await logout();
    navigate("/login");
  };

  // ==========================================
  // 🔴 LOGGED OUT NAVIGATION
  // ==========================================
  if (!user) {
    return (
      <>
        <div className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-50">
          <nav className="bg-[#1c1c22]/80 backdrop-blur-2xl border border-white/10 rounded-[2rem] px-6 py-3 flex justify-between items-center shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            {/* Logo */}
            <div className="flex items-center gap-2 text-[#d4ff3a]">
              <AudioLines className="w-8 h-8" />
              <span className="text-xl font-black tracking-tighter text-white">
                BitBeats
              </span>
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center p-1 bg-black/40 rounded-full border border-white/5">
              {[
                { to: "/", label: "Home", icon: Home },
                { to: "/about", label: "About", icon: Info },
                { to: "/contact", label: "Contact", icon: Mail },
              ].map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-5 py-2 rounded-full transition-all duration-300 text-sm font-bold ${
                      isActive
                        ? "bg-white/10 text-white shadow-lg"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`
                  }
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </NavLink>
              ))}
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <NavLink
                to="/login"
                className="px-6 py-2.5 text-sm font-bold text-white hover:text-[#d4ff3a] transition-colors"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="bg-[#d4ff3a] text-black px-6 py-2.5 rounded-full text-sm font-black uppercase tracking-widest hover:scale-105 shadow-[0_0_20px_rgba(212,255,58,0.2)] transition-all"
              >
                Sign Up
              </NavLink>
            </div>

            {/* Mobile Toggle */}
            <button
              className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </nav>
        </div>

        {/* Mobile Full-Screen Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-[#0f0f13]/95 backdrop-blur-3xl z-[100] flex flex-col p-6 animate-in slide-in-from-top-full duration-300">
            <div className="flex justify-between items-center mb-12">
              <div className="flex items-center gap-2 text-[#d4ff3a]">
                <AudioLines className="w-8 h-8" />
                <span className="text-xl font-black text-white">AudioApp</span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 bg-white/10 rounded-full text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex flex-col gap-4 text-2xl font-black">
              {[
                { to: "/", label: "Home" },
                { to: "/about", label: "About" },
                { to: "/contact", label: "Contact" },
              ].map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `p-4 rounded-2xl transition-colors ${isActive ? "bg-[#d4ff3a] text-black" : "text-gray-400 hover:text-white"}`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <div className="h-px bg-white/10 my-4 w-full"></div>
              <NavLink
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-4 rounded-2xl text-white flex items-center gap-4 bg-white/5"
              >
                <User className="w-6 h-6" /> Login
              </NavLink>
              <NavLink
                to="/register"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-4 rounded-2xl text-black bg-[#d4ff3a] flex items-center gap-4 shadow-xl"
              >
                <User className="w-6 h-6" /> Create Account
              </NavLink>
            </div>
          </div>
        )}
      </>
    );
  }

  // ==========================================
  // 🟢 LOGGED IN NAVIGATION
  // ==========================================
  return (
    <>
      {/* 🟢 DESKTOP FLOATING PILL */}
      <div className="hidden md:block fixed bottom-4 left-1/2 -translate-x-1/2 w-auto min-w-[600px] z-50">
        <nav className="bg-[#1c1c22]/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] px-4 py-3 flex justify-between items-center shadow-[0_30px_60px_rgba(0,0,0,0.6)]">
          <div className="flex items-center gap-2 text-[#d4ff3a] pl-2 pr-6 border-r border-white/10">
            <AudioLines className="w-6 h-6" />
            <span className="text-lg font-black tracking-tighter text-white">
              BitBeats
            </span>
          </div>

          <div className="flex items-center gap-2 px-4">
            {[
              { to: "/songs", label: "Library", icon: Music2 },
              { to: "/playlists", label: "Playlists", icon: ListMusic },
              { to: "/upload", label: "Upload", icon: UploadCloud },
            ].map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-5 py-2.5 rounded-[1.5rem] transition-all duration-300 font-bold text-sm ${
                    isActive
                      ? "bg-[#d4ff3a] text-black shadow-[0_0_20px_rgba(212,255,58,0.3)]"
                      : "text-gray-400 hover:text-white hover:bg-white/10"
                  }`
                }
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </NavLink>
            ))}
          </div>

          <div className="pl-4 border-l border-white/10">
            <button
              onClick={() => setIsLogoutModalOpen(true)} // 🟢 3. Trigger Modal instead of logging out
              className="flex items-center justify-center p-3 rounded-full text-gray-400 hover:text-red-400 hover:bg-red-400/10 transition-all"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </nav>
      </div>

      {/* 🟢 MOBILE FLOATING DOCK */}
      <nav className="md:hidden fixed bottom-4 left-4 right-4 bg-[#1c1c22]/95 backdrop-blur-3xl border border-white/10 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-[100] pb-safe">
        <div className="flex justify-around items-center p-2">
          {[
            { to: "/songs", label: "Library", icon: Music2 },
            { to: "/playlists", label: "Playlists", icon: ListMusic },
            { to: "/upload", label: "Upload", icon: UploadCloud },
          ].map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `relative flex flex-col items-center justify-center w-16 h-14 rounded-2xl transition-all duration-300 ${
                  isActive
                    ? "text-[#d4ff3a]"
                    : "text-gray-500 hover:text-gray-300"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon
                    className={`w-6 h-6 mb-1 transition-transform duration-300 ${isActive ? "scale-110" : ""}`}
                  />
                  <span className="text-[10px] font-bold tracking-wider">
                    {item.label}
                  </span>
                  {/* Subtle active dot indicator */}
                  {isActive && (
                    <div className="absolute -bottom-1 w-1 h-1 rounded-full bg-[#d4ff3a] shadow-[0_0_10px_rgba(212,255,58,1)]"></div>
                  )}
                </>
              )}
            </NavLink>
          ))}

          <button
            onClick={() => setIsLogoutModalOpen(true)} // 🟢 4. Trigger Modal instead of logging out
            className="flex flex-col items-center justify-center w-16 h-14 text-gray-500 hover:text-red-400 transition-colors"
          >
            <LogOut className="w-6 h-6 mb-1" />
            <span className="text-[10px] font-bold tracking-wider">Logout</span>
          </button>
        </div>
      </nav>

      {/* ========================================== */}
      {/* 🟢 5. LOGOUT CONFIRMATION MODAL            */}
      {/* ========================================== */}
      {isLogoutModalOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-2xl z-[150] flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setIsLogoutModalOpen(false)} // Clicking outside closes it
        >
          <div
            className="bg-[#0f0f13] w-full max-w-sm rounded-[2.5rem] p-8 border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.9)] relative flex flex-col items-center text-center overflow-hidden"
            onClick={(e) => e.stopPropagation()} // Prevents clicks inside modal from closing it
          >
            {/* Subtle Red Warning Glow */}
            <div className="absolute top-0 w-64 h-64 bg-red-500/10 blur-[80px] rounded-full pointer-events-none"></div>

            {/* Icon */}
            <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mb-6 border border-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.2)] relative z-10">
              <LogOut className="w-8 h-8 ml-1" />
            </div>

            {/* Text */}
            <h2 className="text-2xl font-black text-white mb-2 relative z-10">
              Leaving so soon?
            </h2>
            <p className="text-sm text-gray-400 mb-8 relative z-10">
              Are you sure you want to log out? Any music currently playing will
              stop.
            </p>

            {/* Actions */}
            <div className="flex w-full gap-3 relative z-10">
              <button
                onClick={() => setIsLogoutModalOpen(false)}
                className="flex-1 py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-bold text-sm transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmLogout}
                className="flex-1 py-4 rounded-2xl bg-red-500/90 text-white font-black uppercase tracking-widest text-sm hover:bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:scale-[1.02] transition-all"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
