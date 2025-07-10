import { axiosInstance } from "../../components/utils/axios";
import { userActions } from "./user-slice";

export const getSignup = (user) => async (dispatch) => {
  try {
    dispatch(userActions.getSignupRequest());
    const { data } = await axiosInstance.post("/api/v1/app/user/signup", user);
    dispatch(userActions.getSignupDetails(data.user));
  } catch (error) {
    dispatch(
      userActions.getError(error.response?.data?.message || "Unknown error")
    );
  }
};

export const getLogin = (user) => async (dispatch) => {
  try {
    console.log("Sending login request with data:", user);
    dispatch(userActions.getLoginRequest());
    const { data } = await axiosInstance.post("/api/v1/app/user/login", user);
    console.log("Received response:", data);
    dispatch(userActions.getLoginDetails(data.user));
  } catch (error) {
    console.log("Login error:", error);
    dispatch(
      userActions.getError(error.response?.data?.message || "Unknown error")
    );
  }
};

export const CurrentUser = () => async (dispatch) => {
  try {
    dispatch(userActions.getCurrentUserRequest());
    const { data } = await axiosInstance.get("/api/v1/app/user/me");
    console.log("Current user loaded:", data);
    dispatch(userActions.getCurrentUser(data.user));
  } catch (error) {
    console.log("Load user failed:", error);
    dispatch(
      userActions.getError(
        error.response?.data?.message || "Failed to load user"
      )
    );
  }
};

export const updateUser = (updateUser) => async (dispatch) => {
  try {
    dispatch(userActions.getUpdateUserRequest());
    await axiosInstance.patch("/api/v1/app/user/updateMe", updateUser);
    const { data } = await axiosInstance.get("/api/v1/app/user/me");
    dispatch(userActions.getCurrentUser(data.user));
  } catch (error) {
    dispatch(
      userActions.getError(error.response?.data?.message || "Unknown error")
    );
  }
};

export const forgetPassword = (email) => async (dispatch) => {
  try {
    await axiosInstance.post("/api/v1/app/user/forgotPassword", { email });
  } catch (error) {
    dispatch(
      userActions.getError(error.response?.data?.message || "Unknown error")
    );
  }
};

export const resetPassword = (rePasswords, token) => async (dispatch) => {
  try {
    await axiosInstance.patch(
      `/api/v1/app/user/resetPassword/${token}`,
      rePasswords
    );
  } catch (error) {
    dispatch(
      userActions.getError(error.response?.data?.message || "Unknown error")
    );
  }
};

export const updatePassword = (passwords) => async (dispatch) => {
  try {
    dispatch(userActions.getPasswordRequest());
    await axiosInstance.patch("/api/v1/app/user/updateMyPassword", passwords);
    dispatch(userActions.getPasswordSuccess(true));
  } catch (error) {
    dispatch(
      userActions.getError(error.response?.data?.message || "Unknown error")
    );
  }
};

export const logout = () => async (dispatch) => {
  try {
    await axiosInstance.get("/api/v1/app/user/logout");
    dispatch(userActions.getLogout(null));
  } catch (error) {
    dispatch(
      userActions.getError(error.response?.data?.message || "Unknown error")
    );
  }
};
