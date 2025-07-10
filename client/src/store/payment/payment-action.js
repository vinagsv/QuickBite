// 1.checkout session Creator

import { axiosInstance } from "../../components/utils/axios";
import { paymentActions } from "./payment-slice";

export const initialCheckoutSession = (paymentData) => async (dispatch) => {
  try {
    dispatch(paymentActions.getCheckedoutRequest());
    const response = await axiosInstance.post(
      "/api/v1/rent/booking/checkout-session",
      paymentData
    );

    if (!response) throw new Error("Failed to initiate checkout session");
    dispatch(paymentActions.getCheckOutSuccess(response.data));
  } catch (error) {
    dispatch(
      paymentActions.getError(error.response?.data?.message || error.message)
    );
  }
};

// 2.Payment Verifier

export const verifyPayment = (verifyData) => async (dispatch) => {
  try {
    dispatch(paymentActions.getVerifyRequest());
    const response = await axiosInstance.post(
      "/api/v1/rent/booking/verify-payment",
      verifyData
    );

    if (!response) throw new Error("Failed to verify payment");
    dispatch(paymentActions.getVerifySuccess(response.data));
  } catch (error) {
    dispatch(
      paymentActions.getError(error.response?.data?.message || error.message)
    );
  }
};
