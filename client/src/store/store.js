import { configureStore } from "@reduxjs/toolkit";
import restaurantReducer from "./Restaurant/restaurant-slice";
import userSlice from "./Users/user-slice";
import paymentSlice from "./payment/payment-slice";
import orderSlice from "./order/order-slice";

const store = configureStore({
  reducer: {
    restaurant: restaurantReducer,
    user: userSlice.reducer,
    payment: paymentSlice.reducer,
    order: orderSlice.reducer,
  },
});

export default store;
