import React, { useState, useEffect } from "react";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  RotateCcw,
  RotateCw,
  MoreHorizontal,
  Heart,
  Volume2,
  ArrowDownUp,
  ChevronDown,
} from "lucide-react";
import api from "../utils/api";
import { useAudio } from "../context/AudioContext";
import { useAuth } from "../context/AuthContext";

const BigCard = ({ onClose }) => {
  const { user } = useAuth();
  const {
    currentSong,
    isPlaying,
    currentTime,
    duration,
    volume,
    queueMode,
    togglePlay,
    seek,
    changeVolume,
    playNext,
    playPrevious,
    setQueueMode,
    skip,
  } = useAudio();

  const [customSkipTime, setCustomSkipTime] = useState(15);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (currentSong && user) setIsLiked(currentSong.likes?.includes(user._id));
  }, [currentSong, user]);

  const handleToggleLike = async () => {
    if (!currentSong) return;
    try {
      const { data } = await api.post(
        `/api/songs/toggle-like/${currentSong._id}`,
      );
      if (data.success) setIsLiked(!isLiked);
    } catch (error) {
      console.error("Error toggling like", error);
    }
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  if (!currentSong) return null;

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;
  const volumePercent = volume * 100;
  const coverImage =
    currentSong.coverImageURL ||
    `https://picsum.photos/seed/${currentSong._id}/600/600`;

  return (
    // 🟢 USING 100dvh: Fixes mobile browser address bar cut-offs
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black text-white h-[100dvh] w-full overflow-hidden animate-in fade-in zoom-in-95 duration-300">
      {/* AMBIENT BACKGROUND */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40 blur-[80px] scale-110 pointer-events-none transition-all duration-700"
        style={{ backgroundImage: `url(${coverImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-[#0f0f13]/80 to-[#0f0f13] pointer-events-none"></div>

      {/* 🟢 MAIN RESPONSIVE CONTAINER */}
      <div className="relative z-10 w-full h-full md:w-11/12 md:max-w-5xl lg:max-w-6xl md:h-[85vh] flex flex-col md:flex-row md:bg-white/5 md:backdrop-blur-3xl md:border md:border-white/10 md:rounded-[3rem] overflow-hidden md:shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
        {/* MOBILE HEADER */}
        <div className="flex md:hidden items-center justify-between p-6 shrink-0 w-full">
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <ChevronDown className="w-8 h-8 text-white" />
          </button>
          <span className="text-[10px] font-black tracking-[0.2em] uppercase text-gray-300">
            Now Playing
          </span>
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <MoreHorizontal className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* 🟢 LEFT/TOP: ALBUM ART (Fills available space safely) */}
        <div className="flex-1 min-h-0 flex items-center justify-center p-6 md:p-12 relative group w-full">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-2/3 bg-[#d4ff3a]/20 blur-[80px] rounded-full opacity-0 md:group-hover:opacity-50 transition-opacity duration-700 pointer-events-none"></div>

          <div className="w-full max-w-[280px] sm:max-w-[350px] md:max-w-[450px] aspect-square rounded-3xl md:rounded-[3rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.4)] md:group-hover:scale-[1.02] transition-transform duration-500 border border-white/10 relative z-10">
            <img
              src={coverImage}
              alt="Cover"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* 🟢 RIGHT/BOTTOM: CONTROLS */}
        <div className="w-full md:w-1/2 lg:w-[45%] flex flex-col justify-end md:justify-center px-6 pb-8 md:p-12 shrink-0">
          {/* DESKTOP HEADER */}
          <div className="hidden md:flex justify-between items-center w-full mb-10">
            <button
              onClick={onClose}
              className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-white/5 group-hover:bg-white/10 flex items-center justify-center transition-colors">
                <ChevronDown className="w-5 h-5" />
              </div>
            </button>
            <button className="text-gray-400 hover:text-white transition-colors">
              <MoreHorizontal className="w-6 h-6" />
            </button>
          </div>

          {/* INFO & LIKE */}
          <div className="flex items-end justify-between mb-6 md:mb-8">
            <div className="truncate pr-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight truncate text-white mb-1">
                {currentSong.title}
              </h2>
              <p className="text-[#d4ff3a] font-bold text-sm sm:text-base md:text-lg opacity-90 truncate">
                {currentSong.artist || "Unknown Artist"}
              </p>
            </div>
            <button
              onClick={handleToggleLike}
              className="mb-1 hover:scale-110 transition-transform shrink-0 p-2 md:p-0"
            >
              <Heart
                className={`w-7 h-7 md:w-8 md:h-8 ${isLiked ? "fill-[#d4ff3a] text-[#d4ff3a]" : "text-gray-400 hover:text-white"}`}
              />
            </button>
          </div>

          {/* SCRUB BAR */}
          <div className="w-full mb-6 md:mb-8 group cursor-pointer">
            <input
              type="range"
              min={0}
              max={duration || 100}
              value={currentTime}
              onChange={(e) => seek(Number(e.target.value))}
              className="w-full h-1.5 md:h-2 rounded-full appearance-none outline-none transition-all group-hover:h-2 md:group-hover:h-3"
              style={{
                background: `linear-gradient(to right, #d4ff3a ${progressPercent}%, rgba(255,255,255,0.1) ${progressPercent}%)`,
              }}
            />
            <style jsx="true">{`
              input[type="range"]::-webkit-slider-thumb {
                -webkit-appearance: none;
                height: 0px;
                width: 0px;
                border-radius: 50%;
                background: #ffffff;
                transition: all 0.2s;
                box-shadow: 0 0 10px rgba(212, 255, 58, 0.8);
              }
              input[type="range"]:hover::-webkit-slider-thumb {
                height: 16px;
                width: 16px;
                background: #d4ff3a;
              }
            `}</style>
            <div className="flex justify-between text-[10px] md:text-xs text-gray-400 mt-2 font-mono font-medium">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* MAIN PLAYBACK CONTROLS */}
          <div className="flex items-center justify-between mb-8 md:mb-10">
            <button
              onClick={() =>
                setQueueMode(
                  queueMode === "ascending" ? "descending" : "ascending",
                )
              }
              className={`p-2 transition-colors ${queueMode === "descending" ? "text-[#d4ff3a]" : "text-gray-500 hover:text-white"}`}
            >
              <ArrowDownUp className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <div className="flex items-center gap-6 md:gap-8">
              <button
                onClick={playPrevious}
                className="text-white hover:text-[#d4ff3a] hover:scale-110 transition-all"
              >
                <SkipBack className="w-8 h-8 md:w-9 md:h-9 fill-current" />
              </button>

              <button
                onClick={togglePlay}
                className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#d4ff3a] text-black flex items-center justify-center shadow-[0_0_30px_rgba(212,255,58,0.4)] hover:scale-105 active:scale-95 transition-all"
              >
                {isPlaying ? (
                  <Pause className="w-10 h-10 md:w-11 md:h-11 fill-current" />
                ) : (
                  <Play className="w-10 h-10 md:w-11 md:h-11 fill-current ml-2" />
                )}
              </button>

              <button
                onClick={playNext}
                className="text-white hover:text-[#d4ff3a] hover:scale-110 transition-all"
              >
                <SkipForward className="w-8 h-8 md:w-9 md:h-9 fill-current" />
              </button>
            </div>
            <div className="w-9" /> {/* Spacer */}
          </div>

          {/* SECONDARY CONTROLS (Responsive Grid) */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Volume */}
            <div className="flex-1 bg-white/5 p-3 md:p-4 rounded-2xl flex items-center gap-3 border border-white/5 hover:bg-white/10 transition-colors">
              <Volume2 className="w-4 h-4 md:w-5 md:h-5 text-gray-400 shrink-0" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => changeVolume(Number(e.target.value))}
                className="flex-1 h-1 rounded-full appearance-none cursor-pointer outline-none"
                style={{
                  background: `linear-gradient(to right, #ffffff ${volumePercent}%, rgba(255,255,255,0.1) ${volumePercent}%)`,
                }}
              />
            </div>

            {/* Jump Controls */}
            <div className="flex-[1.5] bg-white/5 p-2 md:p-3 rounded-2xl flex items-center justify-between gap-2 border border-white/5 hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-1 bg-black/40 rounded-lg px-2 py-1 shrink-0">
                <input
                  type="number"
                  value={customSkipTime}
                  onChange={(e) =>
                    setCustomSkipTime(Math.max(1, Number(e.target.value)))
                  }
                  className="w-7 bg-transparent text-center font-mono text-[#d4ff3a] font-bold text-sm focus:outline-none"
                />
                <span className="text-[8px] font-bold text-gray-400">SEC</span>
              </div>
              <div className="flex gap-1 w-full">
                <button
                  onClick={() => skip(-customSkipTime)}
                  className="flex-1 py-2 bg-white/5 rounded-xl text-[10px] md:text-xs font-black uppercase tracking-wider text-gray-400 hover:text-white transition-all flex items-center justify-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
                <button
                  onClick={() => skip(customSkipTime)}
                  className="flex-1 py-2 bg-white/5 rounded-xl text-[10px] md:text-xs font-black uppercase tracking-wider text-gray-400 hover:text-[#d4ff3a] transition-all flex items-center justify-center gap-1"
                >
                  <RotateCw className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BigCard;
