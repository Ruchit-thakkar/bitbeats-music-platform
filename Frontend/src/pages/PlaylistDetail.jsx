import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Play,
  Pause,
  ArrowLeft,
  MoreHorizontal,
  Trash2,
  Download,
  Minus,
  Music2,
  Clock,
} from "lucide-react";
import api from "../utils/api";
import { useAudio } from "../context/AudioContext";

const PlaylistDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [playlist, setPlaylist] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { currentSong, isPlaying, playSong } = useAudio();

  useEffect(() => {
    fetchPlaylist();
  }, [id]);

  const fetchPlaylist = async () => {
    try {
      const { data } = await api.get("/api/playlists/my-playlists");
      if (data.success) {
        setPlaylist(data.data.find((p) => p._id === id));
      }
    } catch (error) {
      console.error("Failed to fetch", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlayAll = () => {
    if (!playlist?.songs || playlist.songs.length === 0) return;
    playSong(playlist.songs[0], playlist.songs);
  };

  const handleRemoveSong = async (e, songId) => {
    e.stopPropagation();
    try {
      const { data } = await api.post("/api/playlists/remove-song", {
        playlistId: playlist._id,
        songId,
      });
      if (data.success)
        setPlaylist((prev) => ({
          ...prev,
          songs: prev.songs.filter((song) => song._id !== songId),
        }));
    } catch (error) {
      console.error("Remove failed", error);
    }
  };

  const handleDeletePlaylist = async () => {
    if (!window.confirm(`Delete "${playlist.title}"?`)) return;
    try {
      const { data } = await api.delete(`/api/playlists/${playlist._id}`);
      if (data.success) navigate("/playlists");
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  const handleDownloadPlaylist = () => {
    if (!playlist?.songs || playlist.songs.length === 0) return;
    const confirmDownload = window.confirm(
      `Download all ${playlist.songs.length} songs?`,
    );
    if (!confirmDownload) return;
    playlist.songs.forEach((song, index) => {
      setTimeout(() => window.open(song.audioURL, "_blank"), index * 1000);
    });
  };

  if (isLoading)
    return (
      <div className="min-h-[100dvh] bg-black flex justify-center items-center">
        <div className="animate-spin w-10 h-10 border-4 border-[#d4ff3a] border-t-transparent rounded-full"></div>
      </div>
    );
  if (!playlist)
    return (
      <div className="min-h-[100dvh] bg-black text-white flex justify-center items-center">
        Not Found
      </div>
    );

  const coverImage =
    playlist.coverImage ||
    playlist.songs[0]?.coverImageURL ||
    `https://picsum.photos/seed/${playlist._id}/500/500`;
  const isPlaylistPlaying =
    currentSong && playlist.songs?.some((s) => s._id === currentSong._id);

  return (
    <div className="min-h-[100dvh] bg-black text-white pb-40 font-sans relative selection:bg-[#d4ff3a] selection:text-black">
      {/* 🟢 DYNAMIC AMBIENT BACKGROUND */}
      <div
        className="fixed inset-0 bg-cover bg-center opacity-30 blur-[120px] scale-110 pointer-events-none transition-all duration-1000"
        style={{ backgroundImage: `url(${coverImage})` }}
      />
      <div className="fixed inset-0 bg-gradient-to-b from-black/40 via-black/80 to-black pointer-events-none"></div>

      {/* CONTENT CONTAINER */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 pt-6">
        {/* TOP NAV */}
        <div className="flex items-center justify-between mb-8 md:mb-12">
          <button
            onClick={() => navigate(-1)}
            className="p-3 rounded-full bg-white/5 backdrop-blur-md hover:bg-white/10 transition border border-white/10"
          >
            <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </button>
        </div>

        {/* 🟢 HERO HEADER */}
        <div className="flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-10 mb-12">
          {/* Cover Art */}
          <div className="w-56 h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 shrink-0 rounded-2xl md:rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 bg-white/5">
            {playlist.songs.length > 0 || playlist.coverImage ? (
              <img
                src={coverImage}
                alt="Cover"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Music2 className="w-16 h-16 text-gray-600" />
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left w-full">
            <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-[#d4ff3a] mb-2 drop-shadow-md">
              Playlist
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-4 text-white drop-shadow-xl line-clamp-2 leading-tight">
              {playlist.title}
            </h1>
            <p className="text-xs md:text-sm font-bold text-gray-400 uppercase tracking-widest mb-6 md:mb-8 flex items-center gap-2">
              {playlist.songs.length} Tracks
            </p>

            {/* Actions */}
            <div className="flex items-center gap-3 md:gap-4 w-full justify-center md:justify-start">
              <button
                onClick={handlePlayAll}
                disabled={playlist.songs.length === 0}
                className="w-14 h-14 md:w-16 md:h-16 bg-[#d4ff3a] text-black rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(212,255,58,0.3)] hover:scale-105 disabled:opacity-50 transition-all"
              >
                {isPlaylistPlaying && isPlaying ? (
                  <Pause className="w-6 h-6 md:w-8 md:h-8 fill-current" />
                ) : (
                  <Play className="w-6 h-6 md:w-8 md:h-8 fill-current ml-1" />
                )}
              </button>
              <button
                onClick={handleDownloadPlaylist}
                disabled={playlist.songs.length === 0}
                className="w-12 h-12 md:w-14 md:h-14 bg-white/5 backdrop-blur-md text-white rounded-full flex items-center justify-center hover:bg-white/10 disabled:opacity-50 border border-white/10 transition-all"
              >
                <Download className="w-5 h-5 md:w-6 md:h-6" />
              </button>
              <button
                onClick={handleDeletePlaylist}
                className="w-12 h-12 md:w-14 md:h-14 bg-white/5 backdrop-blur-md text-white rounded-full flex items-center justify-center hover:bg-red-500/20 hover:text-red-400 border border-white/10 hover:border-red-500/30 transition-all md:ml-4"
              >
                <Trash2 className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* 🟢 SPOTIFY-STYLE TRACKLIST */}
        <div className="mt-8 bg-black/20 backdrop-blur-sm rounded-[2rem] p-2 md:p-6 border border-white/5">
          {/* Table Header */}
          <div className="hidden md:flex items-center text-xs font-bold text-gray-500 uppercase tracking-widest px-4 pb-3 border-b border-white/5 mb-4">
            <div className="w-12 text-center">#</div>
            <div className="flex-1">Title</div>
            <div className="w-24 text-right">
              <Clock className="w-4 h-4 ml-auto" />
            </div>
          </div>

          {playlist.songs.length === 0 ? (
            <div className="text-center py-16 flex flex-col items-center">
              <Music2 className="w-12 h-12 text-gray-600 mb-4" />
              <p className="text-lg text-white font-black mb-1">
                It's quiet in here.
              </p>
              <button
                onClick={() => navigate("/songs")}
                className="mt-6 bg-[#d4ff3a] text-black px-8 py-3 rounded-full font-bold text-sm tracking-wide hover:scale-105 transition-all"
              >
                Find Music
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              {playlist.songs.map((song, index) => {
                const isActive = currentSong?._id === song._id;
                return (
                  <div
                    key={song._id}
                    onClick={() => playSong(song, playlist.songs)}
                    className="group flex items-center p-2 md:p-3 rounded-xl md:rounded-2xl transition-all cursor-pointer hover:bg-white/10"
                  >
                    {/* Number / Play Button Swap */}
                    <div className="w-8 md:w-12 shrink-0 flex justify-center">
                      {isActive && isPlaying ? (
                        <Music2 className="w-4 h-4 md:w-5 md:h-5 text-[#d4ff3a] animate-pulse" />
                      ) : (
                        <>
                          <span
                            className={`text-xs md:text-sm font-bold block group-hover:hidden ${isActive ? "text-[#d4ff3a]" : "text-gray-500"}`}
                          >
                            {index + 1}
                          </span>
                          <Play
                            className={`w-4 h-4 md:w-5 md:h-5 hidden group-hover:block fill-current ${isActive ? "text-[#d4ff3a]" : "text-white"}`}
                          />
                        </>
                      )}
                    </div>

                    {/* Image & Title */}
                    <div className="flex-1 flex items-center gap-3 md:gap-4 overflow-hidden pr-4">
                      <img
                        src={
                          song.coverImageURL ||
                          `https://picsum.photos/seed/${song._id}/150/150`
                        }
                        alt="Art"
                        className="w-10 h-10 md:w-12 md:h-12 rounded-lg object-cover shadow-md"
                      />
                      <div className="truncate">
                        <h3
                          className={`font-bold truncate text-sm md:text-base ${isActive ? "text-[#d4ff3a]" : "text-white"}`}
                        >
                          {song.title}
                        </h3>
                        <p className="text-[10px] md:text-xs text-gray-400 font-medium truncate">
                          {song.artist || "Unknown Artist"}
                        </p>
                      </div>
                    </div>

                    {/* Actions (Hidden until hover on desktop) */}
                    <div className="flex items-center gap-2 md:gap-4 shrink-0 px-2 md:px-4">
                      <button
                        onClick={(e) => handleRemoveSong(e, song._id)}
                        className="p-2 text-gray-500 hover:text-red-400 transition-colors opacity-100 md:opacity-0 group-hover:opacity-100"
                        title="Remove"
                      >
                        <Minus className="w-4 h-4 md:w-5 md:h-5" />
                      </button>
                      <button className="text-gray-500 hover:text-white transition-colors opacity-100 md:opacity-0 group-hover:opacity-100">
                        <MoreHorizontal className="w-4 h-4 md:w-5 md:h-5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaylistDetail;
