import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Play,
  UploadCloud,
  ListMusic,
  ListOrdered,
  Heart,
  Clock,
  Search,
  MonitorSmartphone,
  AudioLines,
  Sparkles,
  Code2,
} from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: UploadCloud,
      title: "Music Upload",
      desc: "Upload and store your music securely in the cloud and stream it anytime.",
    },
    {
      icon: ListMusic,
      title: "Playlists",
      desc: "Create and manage custom playlists for different moods, genres, or occasions.",
    },
    {
      icon: ListOrdered,
      title: "Music Queue",
      desc: "Add songs to a queue and control playback order seamlessly.",
    },
    {
      icon: Heart,
      title: "Like Songs",
      desc: "Save your favorite songs for quick and easy access.",
    },
    {
      icon: Clock,
      title: "Recently Played",
      desc: "Easily revisit the songs you listened to recently.",
    },
    {
      icon: Search,
      title: "Search",
      desc: "Find songs instantly with a powerful, lightning-fast search system.",
    },
    {
      icon: MonitorSmartphone,
      title: "Responsive Player",
      desc: "Enjoy smooth music playback on both desktop and mobile devices.",
    },
    {
      icon: AudioLines,
      title: "Audio Waveform",
      desc: "Visualize music playback with an interactive waveform player.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0f0f13] text-white font-sans relative selection:bg-[#d4ff3a] selection:text-black overflow-hidden pb-20">
      {/* 🟢 AMBIENT BACKGROUND GLOWS */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[500px] bg-[#d4ff3a]/10 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 pt-24 md:pt-32 relative z-10">
        {/* ================= HERO SECTION ================= */}
        <div className="text-center max-w-4xl mx-auto mb-32 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-[#d4ff3a]" />
            <span className="text-xs font-bold uppercase tracking-widest text-gray-300">
              The Future of Streaming
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-500 leading-tight pb-2">
            Your Personal <br /> Music Platform.
          </h1>
          <p className="text-lg md:text-xl text-gray-400 font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
            Stream, organize, and enjoy your personal music collection in one
            modern web app. Upload your songs, create playlists, manage
            favorites, and experience smooth playback — all in one place.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate("/songs")}
              className="w-full sm:w-auto px-8 py-4 bg-[#d4ff3a] text-black rounded-full font-black uppercase tracking-widest hover:scale-105 shadow-[0_0_30px_rgba(212,255,58,0.3)] transition-all flex items-center justify-center gap-2"
            >
              <Play className="w-5 h-5 fill-current" /> Start Listening
            </button>
            <button
              onClick={() => navigate("/upload")}
              className="w-full sm:w-auto px-8 py-4 bg-white/5 backdrop-blur-md text-white border border-white/10 rounded-full font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2"
            >
              <UploadCloud className="w-5 h-5" /> Upload Music
            </button>
          </div>
        </div>

        {/* ================= WHAT IS IT? ================= */}
        <div className="mb-32 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-[#d4ff3a] font-black uppercase tracking-widest text-sm">
              What Is This Platform?
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight">
              Full control over your music library.
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              This project is a modern music streaming web application built
              using the MERN stack (MongoDB, Express, React, Node.js). It allows
              users to upload their own music, organize it into playlists, and
              stream it instantly from the cloud.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed">
              Unlike traditional music apps, this platform focuses on personal
              music management, giving users full control over their audio
              without ads or interruptions.
            </p>
          </div>
          <div className="relative aspect-square md:aspect-video rounded-[3rem] border border-white/10 bg-[#1c1c22]/50 backdrop-blur-xl flex items-center justify-center shadow-2xl overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#d4ff3a]/10 to-transparent opacity-50"></div>
            <AudioLines className="w-32 h-32 text-gray-700 group-hover:text-[#d4ff3a] transition-colors duration-500" />
          </div>
        </div>

        {/* ================= FEATURES ================= */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <span className="text-[#d4ff3a] font-black uppercase tracking-widest text-sm mb-2 block">
              Features
            </span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">
              Everything you need.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat, i) => (
              <div
                key={i}
                className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-[2rem] hover:bg-white/10 hover:-translate-y-2 transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-black/40 rounded-2xl flex items-center justify-center mb-6 group-hover:text-[#d4ff3a] group-hover:scale-110 transition-all border border-white/5">
                  <feat.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black mb-3 text-white">
                  {feat.title}
                </h3>
                <p className="text-gray-400 font-medium text-sm leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ================= TECH STACK & PURPOSE ================= */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-[#1c1c22]/80 backdrop-blur-xl border border-white/10 p-10 md:p-12 rounded-[3rem]">
            <Code2 className="w-10 h-10 text-[#d4ff3a] mb-6" />
            <h2 className="text-3xl font-black mb-4">
              Built With Modern Technology
            </h2>
            <p className="text-gray-400 mb-8 font-medium">
              Developed using cutting-edge web technologies to ensure
              lightning-fast performance and scalability.
            </p>

            <div className="space-y-6">
              {[
                { title: "Frontend", tags: ["React", "TailwindCSS", "Vite"] },
                { title: "Backend", tags: ["Node.js", "Express.js"] },
                {
                  title: "Database & Auth",
                  tags: ["MongoDB", "JWT Authentication"],
                },
              ].map((stack, i) => (
                <div key={i}>
                  <h4 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-3">
                    {stack.title}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {stack.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-4 py-2 bg-black/40 border border-white/5 rounded-xl text-sm font-bold text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#d4ff3a] to-[#9ebf24] p-10 md:p-12 rounded-[3rem] text-black flex flex-col justify-center">
            <h2 className="text-4xl font-black tracking-tight mb-6">
              Purpose of This Project
            </h2>
            <p className="text-black/80 font-bold text-lg leading-relaxed mb-4">
              This project was created to demonstrate full-stack development
              skills using the MERN stack while building a real-world
              application similar to a premium music streaming platform.
            </p>
            <p className="text-black/80 font-bold text-lg leading-relaxed">
              It places a heavy focus on secure authentication, cloud media
              storage, complex playlist management, and ultra-responsive
              interactive UI design.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
