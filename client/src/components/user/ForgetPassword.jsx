import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Field, useForm } from "@tanstack/react-form";
import { useDispatch, useSelector } from "react-redux";
import { forgetPassword } from "../../store/Users/user-action";
import { toast } from "react-toastify";
import { Mail, Send, ArrowLeft, Shield, CheckCircle2 } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const ForgetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { errors } = useSelector((state) => state.user);
  const { isDarkMode } = useTheme();

  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm({
    defaultValues: {
      email: "",
    },
    onSubmit: ({ value }) => {
      dispatch(forgetPassword(value.email));
      setIsSubmitted(true);
      toast.success("Email sent! Check your inbox");
    },
  });

  useEffect(() => {
    if (errors) {
      toast.error(errors);
    }
  }, [errors]);

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
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-lg">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded-full animate-pulse flex items-center justify-center">
                <Mail className="w-3 h-3 text-white" />
              </div>
            </div>
          </div>

          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent mb-2">
            {isSubmitted ? "Check Your Email" : "Forgot Password?"}
          </h1>
          <p
            className={`${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            } text-lg`}
          >
            {isSubmitted
              ? "We've sent you a password reset link"
              : "Enter your email to reset your password"}
          </p>
        </div>

        <div
          className={`p-8 rounded-3xl border ${cardClasses} backdrop-blur-sm shadow-2xl`}
        >
          {isSubmitted ? (
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <CheckCircle2 className="w-16 h-16 text-green-500" />
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">
                  Email Sent Successfully!
                </h3>
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  We've sent a password reset link to your email. Please check
                  your inbox.
                </p>
                <p
                  className={`text-xs ${
                    isDarkMode ? "text-gray-500" : "text-gray-400"
                  }`}
                >
                  Didn’t get it? Check spam or try again.
                </p>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => setIsSubmitted(false)}
                  className={`flex-1 py-3 px-4 rounded-xl border ${cardClasses} hover:scale-105 transition-all duration-300`}
                >
                  Try Again
                </button>
                <button
                  onClick={() => navigate("/login")}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-xl hover:from-orange-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Back to Login
                </button>
              </div>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
              }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium">
                  Email Address
                </label>
                <Field name="email" form={form}>
                  {(field) => (
                    <div className="relative">
                      <Mail
                        className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                          isDarkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      />
                      <input
                        type="email"
                        id="email"
                        className={`w-full pl-12 pr-4 py-4 rounded-2xl border ${inputClasses} focus:outline-none focus:ring-2 focus:ring-orange-500/50 backdrop-blur-sm transition-all duration-300`}
                        placeholder="Enter your email address"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        required
                      />
                    </div>
                  )}
                </Field>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center space-x-2 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-2xl hover:from-orange-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <Send className="w-5 h-5" />
                <span>Send Reset Link</span>
              </button>

              <div className="text-center pt-4">
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Remember your password?{" "}
                  <button
                    onClick={() => navigate("/login")}
                    className="text-orange-500 hover:text-orange-600 transition-colors duration-300 hover:underline font-medium"
                  >
                    Sign in here
                  </button>
                </p>
              </div>
            </form>
          )}
        </div>

        <div className="text-center mt-8">
          <p
            className={`text-xs ${
              isDarkMode ? "text-gray-500" : "text-gray-400"
            }`}
          >
            Having trouble? Contact our support team.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
