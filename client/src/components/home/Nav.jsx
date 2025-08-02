import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/Users/user-action";
import {
  Search as SearchIcon,
  User,
  LogOut,
  Sun,
  Moon,
  ShoppingCart,
  Menu,
  X,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useCart } from "./Checkout"; // Import useCart from Checkout.jsx
import Search from "../home/Search";

const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { showCheckout, setShowCheckout, getTotalItems } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
    setIsMobileMenuOpen(false);
  };

  const themeClasses = isDarkMode
    ? "bg-gray-900/95 text-white border-gray-700/50"
    : "bg-white/95 text-gray-900 border-gray-200/50";

  const buttonClasses = isDarkMode
    ? "bg-gray-800/80 hover:bg-gray-700/80 border-gray-600/50 text-gray-200 hover:text-white"
    : "bg-white/80 hover:bg-gray-50/80 border-gray-300/50 text-gray-700 hover:text-gray-900";

  const mobileMenuClasses = isDarkMode
    ? "bg-gray-900/98 border-gray-700/50"
    : "bg-white/98 border-gray-200/50";

  return (
    <>
      <nav
        className={`${themeClasses} backdrop-blur-xl border-b transition-all duration-500 relative z-50`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div
              className="flex items-center space-x-2 sm:space-x-4 cursor-pointer group"
              onClick={() => navigate("/")}
            >
              <div className="relative">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <img
                    src="/assets/logo.png"
                    alt="Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <div className="hidden xs:block sm:block">
                <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent group-hover:from-orange-600 group-hover:to-pink-600 transition-all duration-300">
                  QuickBite
                </h1>
                <p
                  className={`text-xs ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Delicious food, delivered fast
                </p>
              </div>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-3">
              {/* Search - Give it proper space and z-index */}
              <div className="relative" style={{ zIndex: 10000 }}>
                <Search isDarkMode={isDarkMode} />
              </div>

              {/* Cart */}
              <div className="relative">
                <button
                  onClick={() => setShowCheckout(!showCheckout)}
                  className={`p-3 rounded-xl border ${buttonClasses} hover:scale-105 transition-all duration-300 backdrop-blur-sm relative shadow-sm`}
                  title="View Cart"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {getTotalItems() > 0 && (
                    <div className="absolute -top-2 -right-2 min-w-[24px] h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white text-xs font-bold animate-pulse shadow-lg">
                      {getTotalItems()}
                    </div>
                  )}
                </button>
              </div>

              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className={`p-3 rounded-xl border ${buttonClasses} hover:scale-105 transition-all duration-300 backdrop-blur-sm shadow-sm`}
                title={
                  isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"
                }
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>

              {/* Profile */}
              {isAuthenticated && (
                <button
                  onClick={() => navigate("/profile")}
                  className={`p-3 rounded-xl border ${buttonClasses} hover:scale-105 transition-all duration-300 backdrop-blur-sm shadow-sm`}
                  title="View Profile"
                >
                  <User className="w-5 h-5" />
                </button>
              )}

              {/* Login/Logout */}
              {isAuthenticated ? (
                <button
                  onClick={logoutHandler}
                  className="flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg font-medium"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-xl hover:from-orange-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg font-medium"
                  title="Login"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">Login</span>
                </button>
              )}
            </div>

            {/* Mobile Actions */}
            <div className="flex md:hidden items-center space-x-2">
              {/* Mobile Search Toggle */}
              <button
                onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
                className={`p-2.5 rounded-lg border ${buttonClasses} transition-all duration-300 backdrop-blur-sm shadow-sm`}
                title="Search"
              >
                <SearchIcon className="w-4 h-4" />
              </button>

              {/* Mobile Cart */}
              <div className="relative">
                <button
                  onClick={() => setShowCheckout(!showCheckout)}
                  className={`p-2.5 rounded-lg border ${buttonClasses} transition-all duration-300 backdrop-blur-sm relative shadow-sm`}
                  title="View Cart"
                >
                  <ShoppingCart className="w-4 h-4" />
                  {getTotalItems() > 0 && (
                    <div className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white text-xs font-bold animate-pulse shadow-lg">
                      {getTotalItems()}
                    </div>
                  )}
                </button>
              </div>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-2.5 rounded-lg border ${buttonClasses} transition-all duration-300 backdrop-blur-sm shadow-sm`}
                title="Menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-4 h-4" />
                ) : (
                  <Menu className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isMobileSearchOpen && (
          <div
            className={`md:hidden border-t ${themeClasses} backdrop-blur-xl`}
          >
            <div className="max-w-7xl mx-auto px-4 py-3">
              <Search isDarkMode={isDarkMode} />
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-0 right-0 h-full w-80 max-w-[85vw] ${mobileMenuClasses} backdrop-blur-xl border-l shadow-2xl transform transition-transform duration-300 z-50 ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-semibold">Menu</h2>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className={`p-2 rounded-lg ${buttonClasses} transition-all duration-300`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Menu Items */}
          <div className="space-y-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={() => {
                toggleDarkMode();
                setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center space-x-3 p-4 rounded-xl border ${buttonClasses} transition-all duration-300`}
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
              <span>
                {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              </span>
            </button>

            {/* Profile */}
            {isAuthenticated && (
              <button
                onClick={() => {
                  navigate("/profile");
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-3 p-4 rounded-xl border ${buttonClasses} transition-all duration-300`}
              >
                <User className="w-5 h-5" />
                <span>Profile</span>
              </button>
            )}

            {/* Login/Logout */}
            {isAuthenticated ? (
              <button
                onClick={logoutHandler}
                className="w-full flex items-center space-x-3 p-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 font-medium"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  navigate("/login");
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center space-x-3 p-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-xl hover:from-orange-600 hover:to-pink-600 transition-all duration-300 font-medium"
              >
                <User className="w-5 h-5" />
                <span>Login</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
