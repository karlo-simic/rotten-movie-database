import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show: false,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    showSidebar(state) {
      state.show = true;
    },
    hideSidebar(state) {
      state.show = false;
    },
  },
});

export const sidebarActions = sidebarSlice.actions;
export default sidebarSlice.reducer;
