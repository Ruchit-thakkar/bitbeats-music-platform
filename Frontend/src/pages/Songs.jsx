import React, { useState, useEffect, useMemo } from "react";
import {
  Play,
  Pause,
  Search,
  ListFilter,
  Heart,
  Music2,
  X,
  Plus,
  CheckCircle2,
  Sparkles,
  MoreVertical,
  Loader2,
} from "lucide-react";
import api from "../utils/api";
import { useAudio } from "../context/AudioContext";
import { useAuth } from "../context/AuthContext";

const Songs = () => {
  const { user } = useAuth();
  const [songs, setSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [activeFilter, setActiveFilter] = useState("All");

  // Playlist Modal States
  const [isPlaylistModalOpen, setIsPlaylistModalOpen] = useState(false);
  const [isFetchingPlaylists, setIsFetchingPlaylists] = useState(false);
  const [songToAdd, setSongToAdd] = useState(null);
  const [userPlaylists, setUserPlaylists] = useState([]);
  const [addingStatus, setAddingStatus] = useState({ id: null, status: "" });

  const { currentSong, isPlaying, playSong } = useAudio();

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    try {
      const { data } = await api.get("/api/songs/my-songs", {
        withCredentials: true,
      });
      if (data.success) setSongs(data.data);
    } catch (error) {
      console.error("Failed to fetch songs", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleLike = async (e, id) => {
    e.stopPropagation();
    try {
      // 🟢 ADDED: withCredentials safeguard
      const { data } = await api.post(
        `/api/songs/toggle-like/${id}`,
        {},
        {
          withCredentials: true,
        },
      );

      if (data.success) {
        setSongs((prev) =>
          prev.map((s) =>
            s._id === id
              ? {
                  ...s,
                  likes: data.isLiked
                    ? [...(s.likes || []), user._id]
                    : (s.likes || []).filter((uid) => uid !== user._id),
                }
              : s,
          ),
        );
      }
    } catch (error) {
      console.error("Error toggling like", error);
    }
  };

  const openPlaylistModal = async (e, song) => {
    e.stopPropagation();
    setSongToAdd(song);
    setIsPlaylistModalOpen(true);
    setIsFetchingPlaylists(true);
    try {
      // 🟢 ADDED: withCredentials safeguard
      const { data } = await api.get("/api/playlists/my-playlists", {
        withCredentials: true,
      });
      if (data.success) setUserPlaylists(data.data);
    } catch (error) {
      console.error("Failed to fetch playlists", error);
    } finally {
      setIsFetchingPlaylists(false);
    }
  };

  const handleAddToPlaylist = async (playlistId) => {
    setAddingStatus({ id: playlistId, status: "loading" });
    try {
      // 🟢 ADDED: withCredentials safeguard
      const { data } = await api.post(
        "/api/playlists/add-song",
        {
          playlistId,
          songId: songToAdd._id,
        },
        {
          withCredentials: true,
        },
      );

      if (data.success) {
        setAddingStatus({ id: playlistId, status: "success" });
        setTimeout(() => {
          handleCloseModal();
        }, 800);
      }
    } catch (error) {
      if (error.response?.status === 400) {
        setAddingStatus({ id: playlistId, status: "exists" });
      } else {
        setAddingStatus({ id: playlistId, status: "error" });
      }
    }
  };

  const handleCloseModal = () => {
    setIsPlaylistModalOpen(false);
    setTimeout(() => {
      setAddingStatus({ id: null, status: "" });
      setSongToAdd(null);
    }, 300);
  };

  const filteredAndSortedSongs = useMemo(() => {
    return songs
      .filter((song) => {
        const matchesSearch =
          song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          song.artist?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter =
          activeFilter === "Liked Songs"
            ? song.likes?.includes(user?._id)
            : true;
        return matchesSearch && matchesFilter;
      })
      .sort((a, b) => {
        if (sortOrder === "newest")
          return new Date(b.createdAt) - new Date(a.createdAt);
        if (sortOrder === "oldest")
          return new Date(a.createdAt) - new Date(b.createdAt);
        if (sortOrder === "az") return a.title.localeCompare(b.title);
        if (sortOrder === "za") return b.title.localeCompare(a.title);
        return 0;
      });
  }, [songs, searchQuery, activeFilter, sortOrder, user]);

  return (
    <div className="min-h-screen bg-[#0f0f13] text-white pb-40 font-sans relative selection:bg-[#d4ff3a] selection:text-black overflow-hidden">
      {/* AMBIENT BACKGROUND GLOW */}
      <div className="fixed top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#d4ff3a]/5 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 pt-10 md:px-8 relative z-10">
        {/* PREMIUM HEADER */}
        <header className="flex flex-col gap-2 mb-8">
          <div className="flex items-center gap-2 text-[#d4ff3a]">
            <Sparkles className="w-5 h-5" />
            <span className="text-sm font-black uppercase tracking-[0.2em]">
              Master Collection
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter drop-shadow-2xl text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500">
            Library
          </h1>
        </header>

        {/* FLOATING CONTROL BAR */}
        <div className="bg-[#1c1c22]/80 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-2 md:p-3 flex flex-col lg:flex-row items-center gap-3 mb-10 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
          <div className="relative group w-full lg:flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 group-focus-within:text-[#d4ff3a] transition-colors" />
            <input
              type="text"
              placeholder="Search tracks or artists..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-3.5 bg-transparent focus:outline-none transition-all text-white placeholder-gray-500 font-bold"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-3 h-3 text-white" />
              </button>
            )}
          </div>

          <div className="hidden lg:block w-px h-8 bg-white/10"></div>

          <div className="flex w-full lg:w-auto items-center gap-2 overflow-x-auto pb-1 lg:pb-0 scrollbar-hide px-2">
            {["All", "Liked Songs"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`shrink-0 px-6 py-2.5 rounded-full font-black text-xs uppercase tracking-widest transition-all duration-300
                  ${activeFilter === filter ? "bg-[#d4ff3a] text-black shadow-[0_0_20px_rgba(212,255,58,0.2)]" : "bg-transparent text-gray-400 hover:text-white hover:bg-white/5"}`}
              >
                {filter}
              </button>
            ))}

            <div className="w-px h-6 bg-white/10 mx-1"></div>

            <div className="relative group shrink-0">
              <ListFilter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="bg-white/5 pl-9 pr-8 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest appearance-none focus:outline-none hover:bg-white/10 transition-all cursor-pointer text-white border border-white/5"
              >
                <option value="newest" className="bg-[#1c1c22]">
                  Newest
                </option>
                <option value="oldest" className="bg-[#1c1c22]">
                  Oldest
                </option>
                <option value="az" className="bg-[#1c1c22]">
                  A - Z
                </option>
                <option value="za" className="bg-[#1c1c22]">
                  Z - A
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* SONGS LIST */}
        {isLoading ? (
          <div className="flex justify-center py-32">
            <div className="animate-spin w-12 h-12 border-4 border-[#d4ff3a] border-t-transparent rounded-full drop-shadow-[0_0_15px_rgba(212,255,58,0.5)]"></div>
          </div>
        ) : filteredAndSortedSongs.length === 0 ? (
          <div className="text-center py-24 bg-[#1c1c22]/50 backdrop-blur-md rounded-[3rem] border border-white/5">
            <Music2 className="w-16 h-16 mx-auto mb-4 text-gray-600 opacity-50" />
            <p className="text-2xl font-black text-white mb-2">
              No tracks found
            </p>
            <p className="text-gray-500 font-medium">
              Try adjusting your search or switching filters.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {filteredAndSortedSongs.map((song, index) => {
              const isActive = currentSong?._id === song._id;
              const isLiked = song.likes?.includes(user?._id);

              return (
                <div
                  key={song._id}
                  onClick={() => playSong(song, filteredAndSortedSongs)}
                  className={`group flex items-center justify-between p-2 md:p-3 rounded-2xl md:rounded-[1.5rem] transition-all duration-300 cursor-pointer border ${isActive ? "bg-white/10 border-white/20 shadow-xl backdrop-blur-md translate-x-2" : "bg-transparent border-transparent hover:bg-white/5"}`}
                >
                  <div className="flex items-center gap-4 md:gap-6 truncate w-full">
                    <div className="w-6 text-center shrink-0 hidden md:block">
                      {isActive && isPlaying ? (
                        <div className="flex items-end justify-center gap-[2px] h-4">
                          <div className="w-1 bg-[#d4ff3a] h-full animate-[bounce_1s_infinite]"></div>
                          <div className="w-1 bg-[#d4ff3a] h-2/3 animate-[bounce_1.2s_infinite]"></div>
                          <div className="w-1 bg-[#d4ff3a] h-1/2 animate-[bounce_0.8s_infinite]"></div>
                        </div>
                      ) : (
                        <>
                          <span
                            className={`text-xs font-bold ${isActive ? "text-[#d4ff3a]" : "text-gray-500 group-hover:hidden"}`}
                          >
                            {index + 1}
                          </span>
                          <Play
                            className={`w-4 h-4 hidden group-hover:block fill-current ${isActive ? "text-[#d4ff3a]" : "text-white"}`}
                          />
                        </>
                      )}
                    </div>

                    <div className="relative w-12 h-12 md:w-14 md:h-14 shrink-0 rounded-xl overflow-hidden shadow-lg">
                      <img
                        src={
                          song.coverImageURL ||
                          `https://picsum.photos/seed/${song._id}/150/150`
                        }
                        alt="Art"
                        className={`w-full h-full object-cover transition-transform duration-500 ${isActive ? "scale-110" : "group-hover:scale-110"}`}
                      />
                    </div>

                    <div className="truncate pr-2 flex-1">
                      <h3
                        className={`font-black truncate text-sm md:text-lg transition-colors ${isActive ? "text-[#d4ff3a]" : "text-white group-hover:text-[#d4ff3a]"}`}
                      >
                        {song.title}
                      </h3>
                      <p className="text-[10px] md:text-xs text-gray-400 font-bold mt-0.5 truncate uppercase tracking-[0.1em]">
                        {song.artist || "Unknown Artist"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pr-2 shrink-0">
                    <button
                      onClick={(e) => openPlaylistModal(e, song)}
                      className="p-2.5 transition-all text-gray-500 hover:text-white hover:bg-white/10 rounded-full opacity-100 md:opacity-0 group-hover:opacity-100"
                      title="Add to Playlist"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                    <button
                      onClick={(e) => toggleLike(e, song._id)}
                      className="p-2.5 transition-all hover:bg-white/10 rounded-full opacity-100 md:opacity-0 group-hover:opacity-100"
                    >
                      <Heart
                        className={`w-5 h-5 ${isLiked ? "fill-[#d4ff3a] text-[#d4ff3a]" : "text-gray-500 hover:text-white"}`}
                      />
                    </button>
                    <button className="p-2.5 text-gray-500 hover:text-white hover:bg-white/10 rounded-full opacity-100 md:opacity-0 group-hover:opacity-100">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ========================================== */}
      {/* 🟢 OPTIMIZED ADD TO PLAYLIST MODAL */}
      {/* ========================================== */}
      {isPlaylistModalOpen && songToAdd && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-2xl z-[110] flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={handleCloseModal} // Clicking backdrop closes modal
        >
          <div
            className="bg-[#0f0f13] w-full max-w-md rounded-[2.5rem] border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.9)] relative flex flex-col max-h-[85vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            {/* Modal Ambient Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4ff3a]/10 blur-[80px] rounded-full pointer-events-none"></div>

            {/* Modal Header */}
            <div className="p-6 md:p-8 pb-4 relative z-10 shrink-0">
              <button
                onClick={handleCloseModal}
                className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-2xl md:text-3xl font-black mb-1 text-white pr-10">
                Add to Playlist
              </h2>
              <p className="text-xs md:text-sm text-[#d4ff3a] font-bold truncate uppercase tracking-widest">
                {songToAdd.title}
              </p>
            </div>

            {/* Scrollable Playlist List */}
            <div className="overflow-y-auto px-6 md:px-8 pb-4 flex-1 scrollbar-hide flex flex-col gap-2 relative z-10">
              {/* 🟢 NEW: Smooth Loading State */}
              {isFetchingPlaylists ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <Loader2 className="w-10 h-10 text-[#d4ff3a] animate-spin mb-4" />
                  <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                    Loading Playlists...
                  </span>
                </div>
              ) : userPlaylists.length === 0 ? (
                <div className="text-center py-12 bg-white/5 rounded-3xl border border-white/5">
                  <Music2 className="w-8 h-8 mx-auto text-gray-600 mb-3" />
                  <p className="text-gray-300 text-sm font-bold mb-1">
                    No playlists yet.
                  </p>
                  <p className="text-xs text-gray-500">
                    Head to Playlists to create one!
                  </p>
                </div>
              ) : (
                userPlaylists.map((playlist) => (
                  <button
                    key={playlist._id}
                    onClick={() => handleAddToPlaylist(playlist._id)}
                    className="flex items-center justify-between w-full text-left p-3 rounded-2xl bg-[#1c1c22]/50 hover:bg-white/10 transition-all group border border-white/5 hover:border-white/20"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center overflow-hidden shadow-md">
                        {playlist.coverImage || playlist.songs?.length > 0 ? (
                          <img
                            src={
                              playlist.coverImage ||
                              `https://picsum.photos/seed/${playlist._id}/100/100`
                            }
                            alt="Cover"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        ) : (
                          <ListFilter className="w-5 h-5 text-gray-600" />
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-white text-sm group-hover:text-[#d4ff3a] transition-colors line-clamp-1">
                          {playlist.title}
                        </span>
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-0.5">
                          {playlist.songs?.length || 0} Tracks
                        </span>
                      </div>
                    </div>

                    {/* Status Icons */}
                    <div className="shrink-0 px-2">
                      {addingStatus.id === playlist._id &&
                        addingStatus.status === "loading" && (
                          <div className="w-5 h-5 border-2 border-[#d4ff3a] border-t-transparent rounded-full animate-spin"></div>
                        )}
                      {addingStatus.id === playlist._id &&
                        addingStatus.status === "success" && (
                          <CheckCircle2 className="w-6 h-6 text-[#d4ff3a] animate-in zoom-in" />
                        )}
                      {addingStatus.id === playlist._id &&
                        addingStatus.status === "exists" && (
                          <span className="text-[9px] font-black uppercase text-white bg-red-500/80 px-2 py-1 rounded-md">
                            Added
                          </span>
                        )}
                    </div>
                  </button>
                ))
              )}
            </div>

            {/* 🟢 NEW: EXPLICIT CANCEL BUTTON */}
            <div className="p-6 md:p-8 pt-4 border-t border-white/10 shrink-0 bg-[#0f0f13]">
              <button
                onClick={handleCloseModal}
                className="w-full py-4 rounded-2xl bg-white/5 hover:bg-red-500/10 text-gray-400 hover:text-red-400 font-black uppercase tracking-widest text-sm transition-all border border-transparent hover:border-red-500/20"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Songs;
