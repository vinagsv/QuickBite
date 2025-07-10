import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingSpinner from "../Loadingspinner";
import moment from "moment";
import { Edit, Lock as LockIcon } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const Profile = () => {
  const { user, loading } = useSelector((state) => state.user);
  const { isDarkMode } = useTheme();

  const themeClasses = isDarkMode
    ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white"
    : "bg-gradient-to-br from-orange-50 via-white to-pink-50 text-gray-900";

  const cardClasses = isDarkMode
    ? "bg-gray-800/50 border-gray-700/50"
    : "bg-white/70 border-gray-200/50";

  return (
    <>
      <div
        className={`min-h-screen ${themeClasses} transition-all duration-500 flex flex-col items-center justify-center py-12 px-4 relative`}
      >
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-orange-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-yellow-400/20 to-red-400/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        {loading && <LoadingSpinner />}

        {user && !loading && (
          <div
            className={`relative z-10 w-full max-w-2xl p-8 rounded-3xl border ${cardClasses} backdrop-blur-sm shadow-2xl transition-all duration-500`}
          >
            <div className="flex flex-col items-center space-y-4 mb-8">
              <div className="w-28 h-28 rounded-full overflow-hidden shadow-lg ring-4 ring-orange-500/50">
                <img
                  src={user.avatar.url}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                Welcome {user.name}
              </h3>
            </div>

            <div className="space-y-6 text-center">
              <div>
                <h4 className="text-lg font-semibold">Full Name</h4>
                <p className="text-sm opacity-80">{user.name}</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold">Email Address</h4>
                <p className="text-sm opacity-80">{user.email}</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold">Joined On</h4>
                <p className="text-sm opacity-80">
                  {moment(user.createdAt).format("Do MMMM YYYY")}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center mt-8 gap-4">
              <Link
                to="/editprofile"
                className="flex items-center justify-center w-full sm:w-auto space-x-2 py-3 px-6 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-2xl hover:from-orange-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <Edit className="w-5 h-5" />
                <span>Edit Profile</span>
              </Link>
              <Link
                to="/user/updatePassword"
                className="flex items-center justify-center w-full sm:w-auto space-x-2 py-3 px-6 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-2xl hover:from-purple-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <LockIcon className="w-5 h-5" />
                <span>Change Password</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
