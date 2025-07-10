import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CurrentUser } from "./store/Users/user-action";

import { ThemeProvider } from "./context/ThemeContext";

import Home from "./components/home/Home";
import Login from "./components/user/Login";
import Signup from "./components/user/Signup";
import ForgetPassword from "./components/user/ForgetPassword";
import Profile from "./components/user/Profile";
import EditProfile from "./components/user/EditProfile";
import FoodList from "./components/home/FoodList";
import UpdatePassword from "./components/user/UpdatePassword";
import ResetPassword from "./components/user/ResetPassword";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(CurrentUser());
  }, [dispatch]);

  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/user/forgotPassword" element={<ForgetPassword />} />
        <Route path="/user/resetPassword/:token" element={<ResetPassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/user/updatepassword" element={<UpdatePassword />} />
        <Route path="/foodlist" element={<FoodList />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
