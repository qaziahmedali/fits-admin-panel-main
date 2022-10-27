import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  loading: false,
  isAuth: false,
  error: "",
  success: "",
  user: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginPending: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, { payload }) => {
      state.loading = false;
      state.isAuth = true;
      state.error = "";
      state.token = payload?.data?.token;
      state.user = payload.response.data;
      localStorage.setItem("access_token", payload?.response?.access_token);
      localStorage.setItem("_id", payload?.response?.data?._id);
    },
    loginFail: (state, { payload }) => {
      state.loading = false;
      state.error = payload.error;
    },
    isMeAuth: (state, { payload }) => {
      state.isAuth = true;
      state.token = localStorage.getItem("access_token");
      state.user = payload?.user;
    },
    logout: (state, _action) => {
      state.token = null;
      state.isAuth = false;
      state.user = [];
      localStorage.removeItem("access_token");
      localStorage.removeItem("_id");
    },
  },
});

export const { loginPending, loginSuccess, loginFail, isMeAuth, logout } =
  authSlice.actions;
export const isAuthStatus = (state) => state.auth.isAuth;
export const userDetail = (state) => state.auth.user;
export default authSlice.reducer;
