import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  // Determine where to send the user after login
  // Falls back to "/songs" if they navigated directly to the login page
  const destination = location.state?.from?.pathname || "/songs";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await login(formData);

    setLoading(false);

    if (result && result.success) {
      // Navigate to their intended destination, replacing the history stack
      navigate(destination, { replace: true });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden bg-background">
      {/* Ambient Background Glow (Mimicking the "Now Playing" blur) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[500px] bg-gradient-to-b from-[#8c6b5d]/40 via-[#8c6b5d]/10 to-transparent blur-[100px] rounded-full pointer-events-none"></div>

      {/* Form Container */}
      <div className="relative z-10 w-full max-w-md sm:p-10 sm:bg-surface sm:rounded-[32px] sm:shadow-2xl sm:border sm:border-surface-hover">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
            Welcome Back
          </h2>
          <p className="text-gray-400 text-sm">Log in to sync your music</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Email address"
              className="w-full px-6 py-4 bg-surface-hover text-white placeholder-gray-500 rounded-2xl outline-none focus:ring-2 focus:ring-lime transition-all"
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Password"
              className="w-full px-6 py-4 bg-surface-hover text-white placeholder-gray-500 rounded-2xl outline-none focus:ring-2 focus:ring-lime transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-lime text-black py-4 rounded-full font-bold text-lg hover:bg-lime-dark hover:scale-[1.02] active:scale-95 transition-all mt-6 flex justify-center items-center"
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Log In"
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-white font-semibold hover:text-lime transition-colors"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
