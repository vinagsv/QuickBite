import { axiosInstance } from "../../components/utils/axios";
import { paymentActions } from "./payment-slice";

export const initialCheckoutSession = (paymentData) => async (dispatch) => {
  try {
    dispatch(paymentActions.getCheckedoutRequest());
    const response = await axiosInstance.post(
      "/api/v1/app/order/checkout-session",
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

export const verifyPayment = (verifyData) => async (dispatch) => {
  try {
    dispatch(paymentActions.getVerifyRequest());
    const response = await axiosInstance.post(
      "/api/v1/app/order/verify-payment",
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
