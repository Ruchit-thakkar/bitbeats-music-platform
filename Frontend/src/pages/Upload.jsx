import React, { useState, useRef } from "react";
import {
  UploadCloud,
  Music2,
  User,
  AlignLeft,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  FileAudio,
  X,
} from "lucide-react";
import api from "../utils/api";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    description: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // 🟢 NEW: Drag and Drop State
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    if (error) setError("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileSelect = (e) => {
    if (error) setError("");
    const selectedFile = e.target.files[0];
    validateAndSetFile(selectedFile);
  };

  // 🟢 NEW: Drag and Drop Handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const validateAndSetFile = (selectedFile) => {
    if (selectedFile) {
      if (selectedFile.type.startsWith("audio/")) {
        setFile(selectedFile);
        setError("");

        // Auto-fill title if empty (removes the .mp3 extension)
        if (!formData.title) {
          const fileNameWithoutExt = selectedFile.name.replace(/\.[^/.]+$/, "");
          setFormData((prev) => ({ ...prev, title: fileNameWithoutExt }));
        }
      } else {
        setError("Invalid file type. Please upload an audio file.");
      }
    }
  };

  const removeFile = (e) => {
    e.stopPropagation(); // Prevent opening the file browser again
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!file) {
      setError("Please drop or select an audio file to upload.");
      return;
    }

    setIsLoading(true);

    try {
      const payload = new FormData();
      payload.append("audioFile", file);
      payload.append("title", formData.title);
      if (formData.artist) payload.append("artist", formData.artist);
      if (formData.description)
        payload.append("description", formData.description);

      const response = await api.post("/api/songs/upload", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        setSuccess("Track published to your library successfully!");
        setFile(null);
        setFormData({ title: "", artist: "", description: "" });
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Upload failed. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f13] text-white pb-32 font-sans relative selection:bg-[#d4ff3a] selection:text-black overflow-hidden">
      {/* 🟢 AMBIENT BACKGROUND GLOW */}
      <div className="fixed top-0 right-[10%] w-[50%] h-[50%] bg-[#d4ff3a]/5 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="fixed bottom-0 left-[10%] w-[40%] h-[40%] bg-blue-500/5 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-3xl mx-auto px-4 pt-12 md:pt-20 relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-500">
        {/* PREMIUM HEADER */}
        <div className="text-center mb-10 md:mb-12">
          <div className="flex items-center justify-center gap-2 text-[#d4ff3a] mb-4">
            <Sparkles className="w-5 h-5 md:w-6 md:h-6" />
            <span className="text-xs md:text-sm font-bold uppercase tracking-[0.2em]">
              Studio
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400">
            Upload Audio
          </h1>
          <p className="text-gray-400 font-medium md:text-lg">
            Drop your master track here to add it to your library.
          </p>
        </div>

        <div className="bg-[#1c1c22]/80 backdrop-blur-3xl p-6 md:p-10 rounded-[2.5rem] border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
          {/* ALERTS */}
          {error && (
            <div className="mb-8 flex items-center gap-3 p-4 text-red-400 bg-red-500/10 border border-red-500/20 rounded-2xl animate-in zoom-in-95">
              <AlertCircle size={20} className="shrink-0" />
              <p className="text-sm font-bold">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-8 flex items-center gap-3 p-4 text-[#d4ff3a] bg-[#d4ff3a]/10 border border-[#d4ff3a]/20 rounded-2xl animate-in zoom-in-95">
              <CheckCircle2 size={20} className="shrink-0" />
              <p className="text-sm font-bold">{success}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
            {/* 🟢 DRAG AND DROP ZONE */}
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => !file && fileInputRef.current?.click()}
              className={`relative border-2 border-dashed rounded-[2rem] p-8 md:p-12 text-center transition-all duration-300 flex flex-col items-center justify-center gap-4 min-h-[200px]
                ${
                  isDragging
                    ? "border-[#d4ff3a] bg-[#d4ff3a]/10 scale-[1.02] shadow-[0_0_40px_rgba(212,255,58,0.2)]"
                    : file
                      ? "border-white/20 bg-white/5 cursor-default"
                      : "border-white/10 bg-black/20 hover:border-[#d4ff3a]/50 hover:bg-white/5 cursor-pointer"
                }`}
            >
              {file ? (
                // File Selected State
                <div className="flex items-center w-full max-w-sm bg-[#0f0f13] border border-white/10 p-4 rounded-2xl shadow-xl animate-in zoom-in-95 relative group">
                  <div className="w-12 h-12 bg-[#d4ff3a]/20 text-[#d4ff3a] rounded-xl flex items-center justify-center shrink-0">
                    <FileAudio className="w-6 h-6" />
                  </div>
                  <div className="ml-4 truncate text-left flex-1">
                    <p className="text-white font-bold truncate pr-4">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mt-1">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                  {/* Remove File Button */}
                  <button
                    type="button"
                    onClick={removeFile}
                    className="absolute -top-3 -right-3 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 hover:bg-red-400 transition-all"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                // Empty State
                <>
                  <div
                    className={`w-20 h-20 rounded-full flex items-center justify-center transition-colors duration-300 ${isDragging ? "bg-[#d4ff3a] text-black shadow-[0_0_30px_rgba(212,255,58,0.5)]" : "bg-white/5 text-gray-400"}`}
                  >
                    <UploadCloud className="w-10 h-10" />
                  </div>
                  <div>
                    <h3
                      className={`text-xl font-black mb-2 transition-colors ${isDragging ? "text-[#d4ff3a]" : "text-white"}`}
                    >
                      {isDragging
                        ? "Drop it like it's hot!"
                        : "Drag & Drop Audio"}
                    </h3>
                    <p className="text-sm text-gray-500 font-medium">
                      or click to browse. Supports MP3, WAV, AAC (Max 15MB)
                    </p>
                  </div>
                </>
              )}

              <input
                type="file"
                accept="audio/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileSelect}
              />
            </div>

            {/* 🟢 GLASSMORPHISM FORM FIELDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title (Required) */}
              <div className="relative group md:col-span-2">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <Music2 className="h-5 w-5 text-gray-500 group-focus-within:text-[#d4ff3a] transition-colors" />
                </div>
                <input
                  type="text"
                  name="title"
                  placeholder="Song Title *"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full pl-14 pr-5 py-4 bg-black/20 border border-white/10 rounded-2xl focus:outline-none focus:border-[#d4ff3a] focus:bg-white/5 transition-all font-bold text-white placeholder:text-gray-600 text-lg shadow-inner"
                />
              </div>

              {/* Artist (Optional) */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-500 group-focus-within:text-[#d4ff3a] transition-colors" />
                </div>
                <input
                  type="text"
                  name="artist"
                  placeholder="Artist (Optional)"
                  value={formData.artist}
                  onChange={handleChange}
                  className="w-full pl-14 pr-5 py-4 bg-black/20 border border-white/10 rounded-2xl focus:outline-none focus:border-[#d4ff3a] focus:bg-white/5 transition-all font-bold text-white placeholder:text-gray-600 shadow-inner"
                />
              </div>

              {/* Description (Optional) */}
              <div className="relative group md:col-span-2">
                <div className="absolute top-4 left-0 pl-5 pointer-events-none">
                  <AlignLeft className="h-5 w-5 text-gray-500 group-focus-within:text-[#d4ff3a] transition-colors" />
                </div>
                <textarea
                  name="description"
                  placeholder="Description or notes (Optional)"
                  rows="3"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full pl-14 pr-5 py-4 bg-black/20 border border-white/10 rounded-2xl focus:outline-none focus:border-[#d4ff3a] focus:bg-white/5 transition-all font-medium text-white placeholder:text-gray-600 resize-none shadow-inner"
                ></textarea>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !file || !formData.title}
              className="w-full flex items-center justify-center gap-3 bg-[#d4ff3a] text-black py-4 md:py-5 rounded-2xl font-black uppercase tracking-widest text-sm md:text-base hover:bg-[#bfee2d] shadow-[0_0_30px_rgba(212,255,58,0.3)] hover:shadow-[0_0_40px_rgba(212,255,58,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:shadow-none disabled:hover:scale-100 disabled:cursor-not-allowed mt-4"
            >
              {isLoading ? (
                <>
                  <Loader2 size={24} className="animate-spin text-black" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <UploadCloud size={24} />
                  <span>Publish Track</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Upload;
