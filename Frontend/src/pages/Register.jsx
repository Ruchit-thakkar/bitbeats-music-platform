import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { User, Mail, Phone, Lock, Loader2, AlertCircle } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleChange = (e) => {
    if (error) setError("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const payload = {
      fullName: {
        firstName: formData.firstName,
        lastName: formData.lastName,
      },
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
    };

    try {
      const response = await register(payload);

      if (response && response.success) {
        navigate("/login");
      } else {
        setError(response?.message || "Registration failed. Please try again.");
        setIsLoading(false);
      }
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
      setIsLoading(false);
    }
  };

  return (
    // Uses your custom --color-background
    <div className="min-h-screen flex items-center justify-center bg-background px-4 font-sans text-white">
      {/* Uses your custom --color-surface */}
      <div className="w-full max-w-md bg-surface p-8 sm:p-10 rounded-3xl shadow-2xl border border-surface-hover">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black tracking-tight">
            Sign up to start
          </h2>
          <p className="text-gray-400 font-medium mt-2">
            Join Dealora to discover more.
          </p>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="mb-6 flex items-center gap-3 p-4 text-red-400 bg-red-950/30 border border-red-900 rounded-xl">
            <AlertCircle size={20} className="shrink-0" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Row */}
          <div className="flex gap-4">
            <div className="relative w-1/2 group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User
                  size={18}
                  className="text-gray-500 group-focus-within:text-white transition-colors"
                />
              </div>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                required
                value={formData.firstName}
                onChange={handleChange}
                // Using a slightly lighter surface for inputs, matching the hover state
                className="w-full pl-11 pr-4 py-3.5 bg-surface-hover border-2 border-transparent rounded-xl focus:outline-none focus:border-lime transition-all font-medium text-white placeholder:text-gray-500"
              />
            </div>
            <div className="relative w-1/2 group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User
                  size={18}
                  className="text-gray-500 group-focus-within:text-white transition-colors"
                />
              </div>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                required
                value={formData.lastName}
                onChange={handleChange}
                className="w-full pl-11 pr-4 py-3.5 bg-surface-hover border-2 border-transparent rounded-xl focus:outline-none focus:border-lime transition-all font-medium text-white placeholder:text-gray-500"
              />
            </div>
          </div>

          {/* Email */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail
                size={18}
                className="text-gray-500 group-focus-within:text-white transition-colors"
              />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email address"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-11 pr-4 py-3.5 bg-surface-hover border-2 border-transparent rounded-xl focus:outline-none focus:border-lime transition-all font-medium text-white placeholder:text-gray-500"
            />
          </div>

          {/* Phone */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Phone
                size={18}
                className="text-gray-500 group-focus-within:text-white transition-colors"
              />
            </div>
            <input
              type="text"
              name="phone"
              placeholder="Phone number"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full pl-11 pr-4 py-3.5 bg-surface-hover border-2 border-transparent rounded-xl focus:outline-none focus:border-lime transition-all font-medium text-white placeholder:text-gray-500"
            />
          </div>

          {/* Password */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock
                size={18}
                className="text-gray-500 group-focus-within:text-white transition-colors"
              />
            </div>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-11 pr-4 py-3.5 bg-surface-hover border-2 border-transparent rounded-xl focus:outline-none focus:border-lime transition-all font-medium text-white placeholder:text-gray-500"
            />
          </div>

          {/* Submit Button (Uses your custom --color-lime) */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 mt-6 bg-lime text-black py-4 rounded-full font-bold text-lg hover:bg-lime-dark hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 size={24} className="animate-spin text-black" />
            ) : (
              "Sign up"
            )}
          </button>

          {/* Login Link */}
          <p className="text-center text-gray-400 mt-6 font-medium">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-white font-bold hover:text-lime hover:underline underline-offset-4 transition-colors"
            >
              Log in here.
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
