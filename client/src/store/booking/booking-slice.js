// import { createSlice } from "@reduxjs/toolkit";

// const bookingSlice = createSlice({
//   name: "booking",
//   initialState: {
//     bookings: [],
//     bookingDetails: null,
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     // Action to set loading state
//     setLoading(state, action) {
//       state.loading = action.payload;
//     },
//     // Action to set error state
//     setError(state, action) {
//       state.error = action.payload;
//     },
//     // Action to clear errors
//     clearError(state) {
//       state.error = null;
//     },
//     // Action to set user bookings
//     setUserBookings(state, action) {
//       state.bookings = action.payload;
//       state.loading = false;
//       state.error = null;
//     },
//     // Action to set single booking details
//     setBookingDetails(state, action) {
//       state.bookingDetails = action.payload;
//       state.loading = false;
//       state.error = null;
//     },
//   },
// });

// export const bookingActions = bookingSlice.actions;

// export default bookingSlice;

import { createSlice } from "@reduxjs/toolkit";

const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    bookings: [],
    bookingDetails: null,
    loading: false,
    error: null,
  },
  reducers: {
    sendBookingRequest(state) {
      state.loading = true;
    },

    setBookings(state, action) {
      state.bookings = action.payload;
      state.loading = false;
    },
    addBooking: (state, action) => {
      state.bookings.push(action.payload);
    },
    setBookingDetails: (state, action) => {
      state.bookingDetails = action.payload.bookings;
    },
  },
});

export const {
  setBookings,
  addBooking,
  setBookingDetails,
  sendBookingRequest,
} = bookingSlice.actions;

export default bookingSlice;
