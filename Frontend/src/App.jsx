import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { AuthProvider } from "./context/AuthContext";
// 🟢 The Audio Engine!
import { AudioProvider } from "./context/AudioContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navigation from "./components/Navigation";
import MiniPlayer from "./components/MiniPlayer"; // 🟢 Global Player Imported
import Footer from "./components/Footer";

// Lazy Loading for better performance
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));

// Protected Music Pages
const Songs = lazy(() => import("./pages/Songs"));
const Playlists = lazy(() => import("./pages/Playlists"));
const Upload = lazy(() => import("./pages/Upload"));
const PlaylistDetail = lazy(() => import("./pages/PlaylistDetail")); // 🟢 Now Lazy Loaded!

function App() {
  return (
    <div className="font-sans text-white bg-background min-h-screen flex flex-col">
      <AuthProvider>
        {/* 🟢 AudioProvider wraps everything inside AuthProvider! */}
        <AudioProvider>
          <Toaster position="top-center" />

          <Navigation />

          <main className="flex-1 w-full pb-20">
            <Suspense
              fallback={
                <div className="min-h-[60vh] flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#d4ff3a] border-r-transparent border-l-transparent"></div>
                </div>
              }
            >
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Protected Routes */}
                <Route
                  path="/songs"
                  element={
                    <ProtectedRoute>
                      <Songs />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/playlists"
                  element={
                    <ProtectedRoute>
                      <Playlists />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/upload"
                  element={
                    <ProtectedRoute>
                      <Upload />
                    </ProtectedRoute>
                  }
                />

                {/* 🟢 Moved inside Routes and Protected! */}
                <Route
                  path="/playlist/:id"
                  element={
                    <ProtectedRoute>
                      <PlaylistDetail />
                    </ProtectedRoute>
                  }
                />

                {/* Catch-all */}
                <Route path="*" element={<Home />} />
              </Routes>
            </Suspense>
          </main>

          {/* 🟢 GLOBAL MINI PLAYER INJECTED HERE! 
              Because it's outside <main> and <Routes>, it will float securely
              across every single page without the music stopping! */}
          <MiniPlayer />
          <Footer />
        </AudioProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
