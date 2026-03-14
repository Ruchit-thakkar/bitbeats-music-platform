import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from "react";

const AudioContext = createContext();
export const useAudio = () => useContext(AudioContext);

export const AudioProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1); // 1 = 100%

  // Queue System States
  const [queue, setQueue] = useState([]);
  const [queueMode, setQueueMode] = useState("ascending"); // 'ascending' or 'descending'

  const audioRef = useRef(new Audio());
  const currentSongRef = useRef(null); // Prevents stale closures

  useEffect(() => {
    const audio = audioRef.current;

    const setPlay = () => setIsPlaying(true);
    const setPause = () => setIsPlaying(false);
    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    // Auto-play next song when current song ends!
    const handleEnded = () => {
      setIsPlaying(false);
      playNext();
    };

    audio.addEventListener("play", setPlay);
    audio.addEventListener("pause", setPause);
    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("play", setPlay);
      audio.removeEventListener("pause", setPause);
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [queue, queueMode, currentSong]); // Re-bind when queue changes

  // 🟢 Play a specific song and load the current view's list into the Queue
  const playSong = async (song, currentList = []) => {
    const audio = audioRef.current;

    try {
      if (currentSongRef.current?._id !== song._id) {
        audio.src = song.audioURL;
        audio.volume = volume;
        setCurrentSong(song);
        currentSongRef.current = song;

        // Update Queue if a new list was provided
        if (currentList.length > 0) setQueue(currentList);

        audio.load();
        await audio.play();
      } else {
        audio.paused ? await audio.play() : audio.pause();
      }
    } catch (error) {
      console.error("Playback Error:", error);
    }
  };

  const togglePlay = () => {
    if (audioRef.current.paused) audioRef.current.play();
    else audioRef.current.pause();
  };

  // 🟢 Queue Navigation Logic
  const playNext = () => {
    if (!currentSong || queue.length === 0) return;
    const currentIndex = queue.findIndex((s) => s._id === currentSong._id);
    if (currentIndex === -1) return;

    let nextIndex;
    if (queueMode === "ascending") {
      nextIndex = currentIndex + 1 < queue.length ? currentIndex + 1 : 0; // Loop to start
    } else {
      nextIndex = currentIndex - 1 >= 0 ? currentIndex - 1 : queue.length - 1; // Loop to end
    }
    playSong(queue[nextIndex]);
  };

  const playPrevious = () => {
    if (!currentSong || queue.length === 0) return;
    const currentIndex = queue.findIndex((s) => s._id === currentSong._id);
    if (currentIndex === -1) return;

    let prevIndex;
    if (queueMode === "ascending") {
      prevIndex = currentIndex - 1 >= 0 ? currentIndex - 1 : queue.length - 1;
    } else {
      prevIndex = currentIndex + 1 < queue.length ? currentIndex + 1 : 0;
    }
    playSong(queue[prevIndex]);
  };

  // 🟢 Scrubbing and Volume Controls
  const seek = (timeInSeconds) => {
    if (audioRef.current) {
      audioRef.current.currentTime = timeInSeconds;
      setCurrentTime(timeInSeconds);
    }
  };

  const changeVolume = (newVolume) => {
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      setVolume(newVolume);
    }
  };

  return (
    <AudioContext.Provider
      value={{
        currentSong,
        isPlaying,
        currentTime,
        duration,
        volume,
        queueMode,
        playSong,
        togglePlay,
        seek,
        changeVolume,
        playNext,
        playPrevious,
        setQueueMode,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};
