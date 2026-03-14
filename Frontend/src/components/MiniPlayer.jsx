import React, { useState } from "react";
import { Play, Pause, SkipForward, Music } from "lucide-react";
import { useAudio } from "../context/AudioContext";
import BigCard from "./BigCard";

const MiniPlayer = () => {
  // 🟢 We now pull currentTime and duration to build the mini-progress bar!
  const {
    currentSong,
    isPlaying,
    togglePlay,
    playNext,
    currentTime,
    duration,
  } = useAudio();
  const [isPlayerExpanded, setIsPlayerExpanded] = useState(false);

  if (!currentSong) return null;

  // Calculate progress for the bottom bar
  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  return (
    <>
      {/* 🟢 THE REDESIGNED MINI PLAYER */}
      {!isPlayerExpanded && (
        <div
          onClick={() => setIsPlayerExpanded(true)}
          className="fixed bottom-24 left-4 right-4 md:left-auto md:right-8 md:bottom-10 md:w-[400px] z-[999] group animate-in slide-in-from-bottom-10 fade-in duration-500"
        >
          {/* Outer Glass Container */}
          <div className="relative overflow-hidden bg-[#16161d]/80 backdrop-blur-3xl p-3 pl-4 rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.6)] border border-white/10 hover:border-white/20 transition-all hover:-translate-y-1 cursor-pointer flex items-center justify-between">
            {/* 🟢 MINI PROGRESS BAR (Injected at the very bottom edge) */}
            <div className="absolute bottom-0 left-0 h-1 bg-white/5 w-full">
              <div
                className="h-full bg-[#d4ff3a] transition-all duration-300 ease-linear shadow-[0_0_10px_rgba(212,255,58,0.8)]"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>

            {/* Left Side: Art & Info */}
            <div className="flex items-center gap-4 overflow-hidden w-2/3">
              {/* Spinning Album Art */}
              <div className="relative w-12 h-12 shrink-0">
                <div
                  className={`absolute inset-0 rounded-full border border-white/10 shadow-lg overflow-hidden transition-transform duration-700 ${isPlaying ? "animate-[spin_4s_linear_infinite]" : ""}`}
                >
                  {currentSong.coverImageURL ? (
                    <img
                      src={currentSong.coverImageURL}
                      className="w-full h-full object-cover"
                      alt="Cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-800 to-black flex items-center justify-center">
                      <Music className="w-5 h-5 text-gray-500" />
                    </div>
                  )}
                  {/* Inner vinyl hole dot */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#1c1c22] rounded-full border border-black/50"></div>
                </div>
              </div>

              {/* Track Info */}
              <div className="flex flex-col truncate pr-2">
                <span className="text-sm font-black truncate text-white mb-0.5 drop-shadow-md">
                  {currentSong.title}
                </span>
                <span className="text-[#d4ff3a] text-[10px] font-bold uppercase tracking-[0.15em] truncate">
                  {currentSong.artist || "Unknown"}
                </span>
              </div>
            </div>

            {/* Right Side: Controls */}
            <div className="flex items-center gap-3 shrink-0 pr-1 z-10">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  playNext();
                }}
                className="p-2 text-gray-400 hover:text-white transition-colors hidden sm:block hover:scale-110"
              >
                <SkipForward className="w-5 h-5 fill-current" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  togglePlay();
                }}
                className="w-12 h-12 bg-[#d4ff3a] text-black rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(212,255,58,0.4)] active:scale-90 hover:scale-105 transition-all"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 fill-current" />
                ) : (
                  <Play className="w-5 h-5 fill-current ml-1" />
                )}
              </button>
            </div>

            {/* Ambient inner glow when playing */}
            {isPlaying && (
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-24 h-24 bg-[#d4ff3a]/10 blur-[30px] rounded-full pointer-events-none"></div>
            )}
          </div>
        </div>
      )}

      {/* 🟢 THE EXPANDED BIG CARD */}
      {isPlayerExpanded && (
        <BigCard onClose={() => setIsPlayerExpanded(false)} />
      )}
    </>
  );
};

export default MiniPlayer;
