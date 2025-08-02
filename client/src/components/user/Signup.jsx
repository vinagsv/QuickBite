import React, { Fragment, useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getSignup } from "../../store/Users/user-action";
import { userActions } from "../../store/Users/user-slice";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Phone,
  UserPlus,
  ArrowLeft,
  Shield,
  CheckCircle,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, errors } = useSelector((state) => state.user);
  const { isDarkMode } = useTheme();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    phoneNumber: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Add refs to track if we've already handled the navigation
  const hasNavigated = useRef(false);
  const prevAuthenticated = useRef(isAuthenticated);

  const { name, email, password, passwordConfirm, phoneNumber } = user;

  const submitHandler = (e) => {
    e.preventDefault();

    // Reset navigation flag before new signup attempt
    hasNavigated.current = false;

    if (password !== passwordConfirm) {
      toast.error("Passwords do not match");
      return;
    }

    dispatch(getSignup(user));
  };

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    // Handle errors
    if (errors && errors.length > 0) {
      toast.error(errors);
      dispatch(userActions.clearError());
    }

    // Handle successful authentication with better logic
    if (
      isAuthenticated &&
      !prevAuthenticated.current &&
      !hasNavigated.current
    ) {
      hasNavigated.current = true;
      toast.success("User signup successfully");

      // Use setTimeout to ensure state updates are complete
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 100);
    }

    // Update the previous authenticated state
    prevAuthenticated.current = isAuthenticated;
  }, [isAuthenticated, errors, dispatch, navigate]);

  // Reset navigation flag when component unmounts
  useEffect(() => {
    return () => {
      hasNavigated.current = false;
    };
  }, []);

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
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-orange-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-yellow-400/20 to-red-400/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        <div className="relative z-10 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={() => navigate("/login")}
                className={`p-3 rounded-xl border ${cardClasses} hover:scale-105 transition-all duration-300 backdrop-blur-sm`}
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
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
                  <CheckCircle className="w-3 h-3 text-white" />
                </div>
              </div>
            </div>

            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent mb-2">
              Join QuickBite
            </h1>
            <p
              className={`${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              } text-lg`}
            >
              Create your account and start your food journey
            </p>
          </div>

          <div
            className={`p-8 rounded-3xl border ${cardClasses} backdrop-blur-sm shadow-2xl`}
          >
            <form onSubmit={submitHandler} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium">
                  Full Name
                </label>
                <div className="relative">
                  <User
                    className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className={`w-full pl-12 pr-4 py-4 rounded-2xl border ${inputClasses} focus:outline-none focus:ring-2 focus:ring-orange-500/50 backdrop-blur-sm transition-all duration-300`}
                    placeholder="Enter your full name"
                    value={name}
                    onChange={onChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium">
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
                    id="email"
                    name="email"
                    className={`w-full pl-12 pr-4 py-4 rounded-2xl border ${inputClasses} focus:outline-none focus:ring-2 focus:ring-orange-500/50 backdrop-blur-sm transition-all duration-300`}
                    placeholder="Enter your email"
                    value={email}
                    onChange={onChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium"
                >
                  Phone Number
                </label>
                <div className="relative">
                  <Phone
                    className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  />
                  <input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    className={`w-full pl-12 pr-4 py-4 rounded-2xl border ${inputClasses} focus:outline-none focus:ring-2 focus:ring-orange-500/50 backdrop-blur-sm transition-all duration-300`}
                    placeholder="Enter your phone number"
                    value={phoneNumber}
                    onChange={onChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium">
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
                    id="password"
                    name="password"
                    className={`w-full pl-12 pr-12 py-4 rounded-2xl border ${inputClasses} focus:outline-none focus:ring-2 focus:ring-orange-500/50 backdrop-blur-sm transition-all duration-300`}
                    placeholder="Create a password"
                    value={password}
                    onChange={onChange}
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

              <div className="space-y-2">
                <label
                  htmlFor="passwordConfirm"
                  className="block text-sm font-medium"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <Shield
                    className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="passwordConfirm"
                    name="passwordConfirm"
                    className={`w-full pl-12 pr-12 py-4 rounded-2xl border ${inputClasses} focus:outline-none focus:ring-2 focus:ring-orange-500/50 backdrop-blur-sm transition-all duration-300`}
                    placeholder="Confirm your password"
                    value={passwordConfirm}
                    onChange={onChange}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${
                      isDarkMode
                        ? "text-gray-400 hover:text-white"
                        : "text-gray-500 hover:text-gray-700"
                    } transition-colors duration-300`}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center space-x-2 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-2xl hover:from-orange-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <UserPlus className="w-5 h-5" />
                <span>Create Account</span>
              </button>

              <div className="text-center pt-4">
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => navigate("/login")}
                    className="text-orange-500 hover:text-orange-600 transition-colors duration-300 hover:underline font-medium"
                  >
                    Sign in here
                  </button>
                </p>
              </div>
            </form>
          </div>

          <div className="text-center mt-8">
            <p
              className={`text-xs ${
                isDarkMode ? "text-gray-500" : "text-gray-400"
              }`}
            >
              By creating an account, you agree to our Terms of Service and
              Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Signup;
