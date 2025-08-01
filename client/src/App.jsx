import React, { useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CurrentUser } from "./store/Users/user-action";
import { ThemeProvider } from "./context/ThemeContext";
import { CartProvider } from "./components/home/Checkout";
import Nav from "./components/home/Nav";
import Checkout from "./components/home/Checkout";
import Home from "./components/home/Home";
import Login from "./components/user/Login";
import Signup from "./components/user/Signup";
import ForgetPassword from "./components/user/ForgetPassword";
import Profile from "./components/user/Profile";
import EditProfile from "./components/user/EditProfile";
import FoodHome from "./components/home/FoodHome";
import UpdatePassword from "./components/user/UpdatePassword";
import ResetPassword from "./components/user/ResetPassword";
import AllFoods from "./components/home/AllFoods";
import AllRestaurants from "./components/home/AllRestaurants";
import Restaurant from "./components/home/Restaurant";
import Foods from "./components/home/Foods";
import MyOrders from "./components/order/MyOrders";
import OrderDetails from "./components/order/OrderDetails";

const Layout = ({ children }) => {
  const location = useLocation();

  const hideNavRoutes = ["/login", "/signup", "/user/forgotPassword"];

  const shouldHideNav =
    hideNavRoutes.includes(location.pathname) ||
    location.pathname.startsWith("/user/resetPassword");

  return (
    <>
      {!shouldHideNav && <Nav />}
      <Checkout />
      {children}
    </>
  );
};

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(CurrentUser());
  }, [dispatch]);

  return (
    <ThemeProvider>
      <CartProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/user/forgotPassword" element={<ForgetPassword />} />
            <Route
              path="/user/resetPassword/:token"
              element={<ResetPassword />}
            />
            <Route
              path="/profile"
              element={user ? <Profile /> : <Navigate to="/login" />}
            />
            <Route
              path="/editprofile"
              element={user ? <EditProfile /> : <Navigate to="/login" />}
            />
            <Route
              path="/user/updatepassword"
              element={user ? <UpdatePassword /> : <Navigate to="/login" />}
            />
            <Route path="/foodhome" element={<FoodHome />} />
            <Route path="/dishes" element={<AllFoods />} />
            <Route path="/restaurants" element={<AllRestaurants />} />
            <Route path="/restaurant/:id" element={<Restaurant />} />
            <Route path="/foods/:foodName" element={<Foods />} />
            <Route
              path="/myorders"
              element={user ? <MyOrders /> : <Navigate to="/login" />}
            />
            <Route
              path="/orders/:orderId"
              element={user ? <OrderDetails /> : <Navigate to="/login" />}
            />
          </Routes>
        </Layout>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
