// import { bookingActions } from "./booking-slice";
// import { axiosInstance } from "../../components/utils/axios";

// export const getUserBookings = () => async (dispatch) => {
//   try {
//     dispatch(bookingActions.setLoading(true));

//     const response = await axiosInstance.get("/api/v1/rent/booking");

//     dispatch(bookingActions.setUserBookings(response.data.data.bookings));
//   } catch (error) {
//     const message = error.response?.data?.message || error.message;
//     dispatch(bookingActions.setError(message));
//   } finally {
//     dispatch(bookingActions.setLoading(false));
//   }
// };

// export const getBookingDetails = (bookingId) => async (dispatch) => {
//   try {
//     dispatch(bookingActions.setLoading(true));

//     const response = await axiosInstance.get(
//       `/api/v1/rent/booking/${bookingId}`
//     );

//     console.log(response.data);
//     dispatch(bookingActions.setBookingDetails(response.data.data.bookings));
//   } catch (error) {
//     const message = error.response?.data?.message || error.message;
//     dispatch(bookingActions.setError(message));
//   } finally {
//     dispatch(bookingActions.setLoading(false));
//   }
// };

// //=========================

import {
  setBookings,
  addBooking,
  setBookingDetails,
  sendBookingRequest,
} from "./booking-slice";
import { axiosInstance } from "../../components/utils/axios";

export const fetchBookingDetails = (bookingId) => async (dispatch) => {
  try {
    const response = await axiosInstance.get(
      `/api/v1/rent/booking${bookingId}`
    );
    dispatch(setBookingDetails(response.data.data));
  } catch (error) {
    console.error("Errir Fetching booking Details", error.message);
  }
};

export const fetchUserBookings = () => async (dispatch) => {
  try {
    dispatch(sendBookingRequest());
    const response = await axiosInstance.get("/api/v1/rent/booking");
    dispatch(setBookings(response.data.data.bookings));
  } catch (error) {
    console.error("Failed to fetch the user bookings", error.message);
  }
};
