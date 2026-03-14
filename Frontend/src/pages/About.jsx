import React from "react";
import { Code, Rocket, Target, ShieldCheck } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen mt-10 bg-[#0f0f13] text-white font-sans relative selection:bg-[#d4ff3a] selection:text-black pt-24 pb-32 px-6">
      <div className="fixed top-20 right-0 w-96 h-96 bg-[#d4ff3a]/5 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-16 text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-600">
          About This Project
        </h1>

        <div className="space-y-6">
          {/* OVERVIEW */}
          <div className="bg-[#1c1c22]/80 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-[2.5rem] shadow-xl">
            <h2 className="text-2xl font-black mb-4 text-[#d4ff3a]">
              Project Overview
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6 font-medium">
              This platform is a full-stack music streaming application designed
              to help users perfectly manage and enjoy their personal music
              collections. Users can seamlessly upload songs, organize
              playlists, instantly search music, and stream audio directly from
              their browser.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mt-8">
              {[
                "Modern UI Design",
                "Scalable Backend Architecture",
                "Efficient Media Streaming",
                "User Authentication & Security",
              ].map((point, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 bg-black/30 p-4 rounded-2xl border border-white/5"
                >
                  <ShieldCheck className="w-5 h-5 text-[#d4ff3a] shrink-0" />
                  <span className="font-bold text-sm text-gray-300">
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* DEVELOPER */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-[2.5rem] shadow-xl">
            <h2 className="text-2xl font-black mb-4 text-white">Developer</h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6 font-medium">
              This project was developed by{" "}
              <strong className="text-[#d4ff3a]">Ruchit</strong>, a web
              developer passionate about building modern full-stack applications
              and exploring new technologies.
            </p>
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-4">
              The Goal Behind This Project:
            </h3>
            <ul className="space-y-4">
              {[
                { icon: Code, text: "Improve MERN stack development skills." },
                {
                  icon: Target,
                  text: "Build a real-world scalable application.",
                },
                {
                  icon: Rocket,
                  text: "Experiment with audio streaming technologies.",
                },
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-4 text-gray-300 font-bold"
                >
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 shrink-0">
                    <item.icon className="w-4 h-4 text-[#d4ff3a]" />
                  </div>
                  {item.text}
                </li>
              ))}
            </ul>
          </div>

          {/* VISION */}
          <div className="bg-gradient-to-br from-[#1c1c22] to-black border border-white/10 p-8 md:p-12 rounded-[2.5rem] shadow-xl relative overflow-hidden">
            <div className="absolute right-0 bottom-0 w-64 h-64 bg-[#d4ff3a]/10 blur-[80px] rounded-full pointer-events-none"></div>
            <h2 className="text-2xl font-black mb-6 text-white relative z-10">
              Future Vision
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 relative z-10">
              {[
                "AI Music Recommendations",
                "Collaborative Playlists",
                "Mobile App Version",
                "Advanced Analytics for Listening Habits",
              ].map((vision, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl border border-white/10 bg-white/5 font-bold text-sm text-gray-300"
                >
                  {vision}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
