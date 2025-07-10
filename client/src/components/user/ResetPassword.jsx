import React from "react";
import { useForm } from "@tanstack/react-form";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { resetPassword } from "../../store/Users/user-action";
import { useTheme } from "../../context/ThemeContext";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const { token } = useParams();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  const form = useForm({
    defaultValues: {
      password: "",
      passwordConfirm: "",
    },
    onSubmit: ({ value }) => {
      dispatch(resetPassword(value, token));
      toast.success("Password changed successfully");
      navigate("/login");
    },
  });

  const bgClasses = isDarkMode
    ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white"
    : "bg-gradient-to-br from-orange-50 via-white to-pink-50 text-gray-900";

  const cardClasses = isDarkMode
    ? "bg-white/10 backdrop-blur-sm border border-gray-700/50"
    : "bg-white/70 backdrop-blur-sm border border-gray-200/50";

  const inputClasses = isDarkMode
    ? "bg-gray-800/50 border-gray-700/50 text-white placeholder-gray-400"
    : "bg-white/80 border-gray-300/50 text-gray-900 placeholder-gray-500";

  return (
    <div
      className={`min-h-screen ${bgClasses} flex items-center justify-center px-4 transition-all duration-500`}
    >
      <div
        className={`${cardClasses} p-8 rounded-3xl shadow-xl max-w-md w-full`}
      >
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent text-center">
          Reset Your Password
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="space-y-6"
        >
          <form.Field
            name="password"
            validators={{
              onChange: ({ value }) =>
                value.length < 6
                  ? "Password must be at least 6 characters"
                  : undefined,
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  New Password
                </label>
                <input
                  type="password"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Enter new password"
                  className={`w-full px-4 py-3 rounded-xl ${inputClasses} focus:ring-2 focus:ring-orange-500 outline-none transition-all duration-300`}
                />
                <div className="text-xs text-red-400">
                  {field.state.meta.errors}
                </div>
              </div>
            )}
          </form.Field>

          <form.Field
            name="passwordConfirm"
            validators={{
              onChangeListenTo: ["password"],
              onChange: ({ value, fieldApi }) =>
                value !== fieldApi.form.getFieldValue("password")
                  ? "Passwords do not match"
                  : undefined,
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Confirm new password"
                  className={`w-full px-4 py-3 rounded-xl ${inputClasses} focus:ring-2 focus:ring-orange-500 outline-none transition-all duration-300`}
                />
                <div className="text-xs text-red-400">
                  {field.state.meta.errors}
                </div>
              </div>
            )}
          </form.Field>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 transition-all duration-300 font-semibold shadow-lg hover:scale-105"
          >
            Set New Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
