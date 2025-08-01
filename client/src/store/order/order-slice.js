import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    orderDetails: null,
    loading: false,
    error: null,
  },
  reducers: {
    sendOrderRequest(state) {
      state.loading = true;
    },
    setOrders(state, action) {
      state.orders = action.payload;
      state.loading = false;
    },
    addOrder(state, action) {
      state.orders.push(action.payload);
    },
    setOrderDetails(state, action) {
      state.orderDetails = action.payload.order; // Adjusted to match backend response
    },
  },
});

export const { sendOrderRequest, setOrders, addOrder, setOrderDetails } =
  orderSlice.actions;

export default orderSlice;
