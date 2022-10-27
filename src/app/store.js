import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducers/authSlice";
import sidebarReducer from "../reducers/sidebarSlice";

export const store = configureStore({
  reducer: { auth: authReducer, sidebar: sidebarReducer },
});
