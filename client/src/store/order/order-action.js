import { axiosInstance } from "../../components/utils/axios";
import { setOrders, setOrderDetails, sendOrderRequest } from "./order-slice";

export const fetchOrderDetails = (orderId) => async (dispatch) => {
  try {
    const response = await axiosInstance.get(`/api/v1/app/order/${orderId}`);
    dispatch(setOrderDetails(response.data.data));
  } catch (error) {
    console.error("Error fetching order details", error.message);
  }
};

export const fetchUserOrders = () => async (dispatch) => {
  try {
    dispatch(sendOrderRequest());
    const response = await axiosInstance.get("/api/v1/app/order");
    dispatch(setOrders(response.data.data.orders));
  } catch (error) {
    console.error("Failed to fetch user orders", error.message);
  }
};
