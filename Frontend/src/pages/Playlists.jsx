import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Play,
  Search,
  Plus,
  ListMusic,
  X,
  Music,
  Sparkles,
  MoreVertical,
} from "lucide-react";
import api from "../utils/api";
import { useAudio } from "../context/AudioContext";

const Playlists = () => {
  const navigate = useNavigate();
  const [playlists, setPlaylists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newPlaylistTitle, setNewPlaylistTitle] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const { playSong } = useAudio();

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const fetchPlaylists = async () => {
    try {
      const { data } = await api.get("/api/playlists/my-playlists");
      if (data.success) setPlaylists(data.data);
    } catch (error) {
      console.error("Failed to fetch", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreatePlaylist = async (e) => {
    e.preventDefault();
    if (!newPlaylistTitle.trim()) return;
    setIsCreating(true);
    try {
      const { data } = await api.post("/api/playlists/create", {
        title: newPlaylistTitle,
      });
      if (data.success) {
        setPlaylists([data.data, ...playlists]);
        setNewPlaylistTitle("");
        setIsCreateModalOpen(false);
      }
    } catch (error) {
      console.error("Failed to create", error);
    } finally {
      setIsCreating(false);
    }
  };

  const handlePlayPlaylist = (e, playlist) => {
    e.stopPropagation();
    if (!playlist.songs || playlist.songs.length === 0) {
      alert("This playlist is empty! Add some songs first.");
      return;
    }
    playSong(playlist.songs[0], playlist.songs);
  };

  const filteredPlaylists = useMemo(() => {
    return playlists.filter((p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [playlists, searchQuery]);

  return (
    <div className="min-h-screen bg-[#0f0f13] text-white pb-40 font-sans px-4 pt-8 md:px-8 relative selection:bg-[#d4ff3a] selection:text-black overflow-hidden">
      {/* AMBIENT BACKGROUND GLOW */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#d4ff3a]/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* PREMIUM HEADER */}
        <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 md:mb-16">
          <div>
            <div className="flex items-center gap-2 mb-2 text-[#d4ff3a]">
              <Sparkles className="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-xs md:text-sm font-bold uppercase tracking-[0.2em]">
                Your Collection
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter drop-shadow-lg">
              Playlists
            </h1>
          </div>

          {/* SEARCH BAR */}
          <div className="relative group w-full lg:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 group-focus-within:text-[#d4ff3a] transition-colors" />
            <input
              type="text"
              placeholder="Find a playlist..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/5 focus:border-[#d4ff3a]/50 focus:bg-white/10 transition-all text-white placeholder-gray-500 font-bold shadow-2xl"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-4 h-4 text-gray-400 hover:text-white" />
              </button>
            )}
          </div>
        </header>

        {/* GRID LAYOUT */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 lg:gap-8">
          {/* CREATE TILE */}
          <div
            onClick={() => setIsCreateModalOpen(true)}
            className="group aspect-square rounded-[1.5rem] md:rounded-[2rem] border-2 border-dashed border-white/10 hover:border-[#d4ff3a]/50 bg-white/5 hover:bg-[#d4ff3a]/5 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:scale-[1.02] shadow-lg"
          >
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/5 group-hover:bg-[#d4ff3a] flex items-center justify-center transition-colors duration-300 mb-3 md:mb-4 shadow-lg">
              <Plus className="w-6 h-6 md:w-8 md:h-8 text-gray-400 group-hover:text-black" />
            </div>
            <span className="font-bold text-xs md:text-sm text-gray-400 group-hover:text-[#d4ff3a] transition-colors">
              New Playlist
            </span>
          </div>

          {/* LOADERS */}
          {isLoading
            ? [...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-[1.5rem] md:rounded-[2rem] bg-white/5 animate-pulse p-4 flex flex-col border border-white/5"
                ></div>
              ))
            : filteredPlaylists.map((playlist) => (
                <div
                  key={playlist._id}
                  onClick={() => navigate(`/playlist/${playlist._id}`)}
                  className="group flex flex-col cursor-pointer"
                >
                  {/* Cover Container */}
                  <div className="relative aspect-square w-full rounded-[1.5rem] md:rounded-[2rem] overflow-hidden bg-[#1c1c22] mb-3 md:mb-4 shadow-xl border border-white/5 group-hover:border-white/20 transition-all">
                    {playlist.coverImage ||
                    (playlist.songs && playlist.songs.length > 0) ? (
                      <img
                        src={
                          playlist.coverImage ||
                          `https://picsum.photos/seed/${playlist._id}/400/400`
                        }
                        alt={playlist.title}
                        className="w-full h-full object-cover group-hover:scale-110 group-hover:blur-sm transition-all duration-500 ease-out"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#1c1c22] to-black">
                        <Music className="w-8 h-8 md:w-12 md:h-12 text-gray-700" />
                      </div>
                    )}

                    {/* Play Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <button
                        onClick={(e) => handlePlayPlaylist(e, playlist)}
                        className="w-14 h-14 md:w-16 md:h-16 bg-[#d4ff3a] text-black rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(212,255,58,0.4)] hover:scale-110 active:scale-95 transition-all duration-300"
                      >
                        <Play className="w-6 h-6 md:w-8 md:h-8 fill-current ml-1" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-start justify-between px-1 md:px-2">
                    <div className="flex flex-col truncate pr-2">
                      <h3 className="font-bold text-white truncate text-sm md:text-base group-hover:text-[#d4ff3a] transition-colors">
                        {playlist.title}
                      </h3>
                      <p className="text-[10px] md:text-xs text-gray-500 font-bold uppercase tracking-widest mt-0.5">
                        {playlist.songs?.length || 0} Tracks
                      </p>
                    </div>
                    <button
                      className="text-gray-500 hover:text-white transition-colors p-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreVertical className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                  </div>
                </div>
              ))}
        </div>

        {/* EMPTY STATES */}
        {!isLoading &&
          playlists.length > 0 &&
          filteredPlaylists.length === 0 && (
            <div className="text-center py-20 mt-10 bg-white/5 backdrop-blur-md rounded-[2rem] border border-white/10">
              <Search className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-4 text-gray-500" />
              <p className="text-lg font-black text-white mb-1">
                No matches found
              </p>
              <p className="text-xs md:text-sm text-gray-400">
                We couldn't find any playlists matching "{searchQuery}"
              </p>
            </div>
          )}
      </div>

      {/* CREATE MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xl z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#0f0f13] w-full max-w-md rounded-[2rem] p-6 md:p-8 border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.8)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4ff3a]/10 blur-[80px] rounded-full pointer-events-none"></div>

            <button
              onClick={() => setIsCreateModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-2xl md:text-3xl font-black mb-1 text-white relative z-10">
              New Playlist
            </h2>
            <p className="text-xs md:text-sm text-[#d4ff3a] mb-8 font-bold tracking-widest uppercase relative z-10">
              Curate your vibe
            </p>

            <form onSubmit={handleCreatePlaylist} className="relative z-10">
              <input
                type="text"
                autoFocus
                placeholder="e.g. Midnight Drive"
                value={newPlaylistTitle}
                onChange={(e) => setNewPlaylistTitle(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl focus:border-[#d4ff3a] focus:bg-white/10 py-4 px-5 text-lg text-white outline-none transition-all placeholder-gray-600 font-bold mb-6 md:mb-8"
              />
              <div className="flex gap-3 md:gap-4">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="flex-1 py-3.5 md:py-4 rounded-xl md:rounded-2xl bg-white/5 hover:bg-white/10 text-white font-bold text-sm md:text-base transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!newPlaylistTitle.trim() || isCreating}
                  className="flex-1 py-3.5 md:py-4 rounded-xl md:rounded-2xl bg-[#d4ff3a] text-black font-black uppercase tracking-widest text-sm hover:scale-[1.02] disabled:opacity-50 transition-all shadow-lg shadow-[#d4ff3a]/20"
                >
                  {isCreating ? "Saving..." : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Playlists;
