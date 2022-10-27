import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isShow: false,
  sidebarBackdrop: false,
};

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    showSidebar: (state) => {
      state.isShow = true;
    },
    hideSidebar: (state) => {
      state.isShow = false;
    },
    showSidebarBackdrop: (state) => {
      state.sidebarBackdrop = true;
    },
    hideSidebarBackdrop: (state) => {
      state.sidebarBackdrop = false;
    },
  },
});

export const {
  showSidebar,
  hideSidebar,
  showSidebarBackdrop,
  hideSidebarBackdrop,
} = sidebarSlice.actions;
export const sidebarStatus = (state) => state.sidebar.isShow;
export const sidebarBackdropStatus = (state) => state.sidebar.sidebarBackdrop;
export default sidebarSlice.reducer;
