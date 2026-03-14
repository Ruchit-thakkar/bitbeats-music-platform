import React, { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import api from "../utils/api";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check auth on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await api.get("/api/auth/me");
        if (data.success) {
          setUser(data.user);
        }
      } catch (error) {
        setUser(null); // Not logged in or token expired
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (credentials) => {
    try {
      const { data } = await api.post("/api/auth/login", credentials);
      if (data.success) {
        setUser(data.data);
        toast.success("Welcome back!");
        return { success: true };
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Login failed";
      toast.error(errorMsg);
      return { success: false, message: errorMsg };
    }
  };

  const register = async (userData) => {
    try {
      // Note: check the URL here. Make sure it matches your backend routes!
      const { data } = await api.post("/api/auth/register", userData);
      if (data.success) {
        toast.success("Account created! You can now log in.");
        return { success: true }; // 🟢 Return object
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Registration failed";
      toast.error(errorMsg);
      return { success: false, message: errorMsg }; // 🟢 Return object with message
    }
  };

  const logout = async () => {
    try {
      await api.post("/api/auth/logout");
      setUser(null);
      toast.success("Logged out successfully");
    } catch (error) {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {!loading ? (
        children
      ) : (
        // 🟢 Updated to match your dark theme with the neon lime spinner!
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-lime border-r-transparent border-l-transparent"></div>
        </div>
      )}
    </AuthContext.Provider>
  );
};
