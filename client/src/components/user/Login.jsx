import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLogin } from "../../store/Users/user-action";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  ArrowLeft,
  Utensils,
  Star,
  Heart,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, errors, loading } = useSelector(
    (state) => state.user
  );
  const { isDarkMode } = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (errors) {
      toast.error(errors);
    } else if (isAuthenticated) {
      toast.success("User logged in Successfully");
      navigate("/");
    }
  }, [isAuthenticated, errors, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getLogin({ email, password }));
  };

  const themeClasses = isDarkMode
    ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white"
    : "bg-gradient-to-br from-orange-50 via-white to-pink-50 text-gray-900";

  const cardClasses = isDarkMode
    ? "bg-gray-800/50 border-gray-700/50"
    : "bg-white/70 border-gray-200/50";

  const inputClasses = isDarkMode
    ? "bg-gray-800/50 border-gray-700/50 text-white placeholder-gray-400"
    : "bg-white/70 border-gray-300/50 text-gray-900 placeholder-gray-500";

  return (
    <Fragment>
      <div
        className={`min-h-screen ${themeClasses} transition-all duration-500 flex items-center justify-center py-12 px-4`}
      >
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-orange-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-yellow-400/20 to-red-400/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        <div className="relative z-10 w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-between items-center mb-6">
              <Link
                to="/"
                className={`p-3 rounded-xl border ${cardClasses} hover:scale-105 transition-all duration-300 backdrop-blur-sm`}
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </div>

            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-20 h-20 rounded-3xl overflow-hidden shadow-lg">
                  <img
                    src="/assets/logo.png"
                    alt="Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full animate-pulse flex items-center justify-center">
                  <Heart className="w-3 h-3 text-white" />
                </div>
              </div>
            </div>

            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent mb-2">
              Welcome Back!
            </h1>
            <p
              className={`${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              } text-lg`}
            >
              Sign in to continue your culinary journey
            </p>
          </div>

          {/* Login Form */}
          <div
            className={`p-8 rounded-3xl border ${cardClasses} backdrop-blur-sm shadow-2xl relative`}
          >
            {loading && (
              <div className="absolute inset-0 bg-black/20 backdrop-blur-sm rounded-3xl flex items-center justify-center z-10">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
              </div>
            )}

            <form onSubmit={submitHandler} className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="email_field"
                  className="block text-sm font-medium"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail
                    className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  />
                  <input
                    type="email"
                    id="email_field"
                    className={`w-full pl-12 pr-4 py-4 rounded-2xl border ${inputClasses} focus:outline-none focus:ring-2 focus:ring-orange-500/50 backdrop-blur-sm transition-all duration-300`}
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password_field"
                  className="block text-sm font-medium"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock
                    className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password_field"
                    className={`w-full pl-12 pr-12 py-4 rounded-2xl border ${inputClasses} focus:outline-none focus:ring-2 focus:ring-orange-500/50 backdrop-blur-sm transition-all duration-300`}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${
                      isDarkMode
                        ? "text-gray-400 hover:text-white"
                        : "text-gray-500 hover:text-gray-700"
                    } transition-colors duration-300`}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="text-right">
                <Link
                  to="/user/forgotPassword"
                  className="text-sm text-orange-500 hover:text-orange-600 transition-colors duration-300 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center space-x-2 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-2xl hover:from-orange-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />
                    <span>Sign In</span>
                  </>
                )}
              </button>

              <div className="text-center pt-4">
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-orange-500 hover:text-orange-600 transition-colors duration-300 hover:underline font-medium"
                  >
                    Sign up now
                  </Link>
                </p>
              </div>
            </form>
          </div>

          <div className="text-center mt-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Join thousands of food lovers
              </span>
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
            </div>
            <p
              className={`text-xs ${
                isDarkMode ? "text-gray-500" : "text-gray-400"
              }`}
            >
              By signing in, you agree to our Terms of Service and Privacy
              Policy
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
