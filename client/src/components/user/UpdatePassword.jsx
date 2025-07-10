import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updatePassword } from "../../store/Users/user-action";
import { userActions } from "../../store/Users/user-slice";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const { errors, success } = useSelector((state) => state.user);

  const [passwordCurrent, setPasswordCurrent] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      toast.error("Passwords do not match");
      return;
    }
    dispatch(updatePassword({ passwordCurrent, password, passwordConfirm }));
  };

  useEffect(() => {
    if (errors) {
      dispatch(userActions.clearError());
    } else if (success) {
      toast.success("Password updated successfully");
      navigate("/profile");
      dispatch(userActions.getPasswordSuccess(false));
    }
  }, [errors, dispatch, navigate, success]);

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
        className={`${cardClasses} p-8 rounded-3xl shadow-xl max-w-md w-full relative`}
      >
        <button
          onClick={() => navigate("/profile")}
          className={`absolute top-4 right-4 p-2 rounded-full ${
            isDarkMode
              ? "hover:bg-gray-700 text-gray-400 hover:text-white"
              : "hover:bg-gray-200 text-gray-600 hover:text-gray-900"
          } transition-all duration-300`}
        >
          <X className="w-5 h-5" />
        </button>

        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent text-center">
          Update Password
        </h1>

        <form onSubmit={submitHandler}>
          <div className="mb-6">
            <label htmlFor="old_password_field" className="block mb-2 text-sm">
              Old Password
            </label>
            <input
              type="password"
              id="old_password_field"
              className={`w-full px-4 py-3 rounded-xl ${inputClasses} focus:ring-2 focus:ring-orange-500 outline-none transition-all duration-300`}
              value={passwordCurrent}
              onChange={(e) => setPasswordCurrent(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="new_password_field" className="block mb-2 text-sm">
              New Password
            </label>
            <input
              type="password"
              id="new_password_field"
              className={`w-full px-4 py-3 rounded-xl ${inputClasses} focus:ring-2 focus:ring-orange-500 outline-none transition-all duration-300`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-8">
            <label
              htmlFor="new_password_confirm_field"
              className="block mb-2 text-sm"
            >
              Confirm New Password
            </label>
            <input
              type="password"
              id="new_password_confirm_field"
              className={`w-full px-4 py-3 rounded-xl ${inputClasses} focus:ring-2 focus:ring-orange-500 outline-none transition-all duration-300`}
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 transition-all duration-300 font-semibold shadow-lg hover:scale-105"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
