import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show: false,
  message: null,
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    showAlert(state, action) {
      state.show = true;
      state.message = action.payload;
    },
    hideAlert(state, action) {
      state.show = false;
      state.message = null;
    },
  },
});

export const alertActions = alertSlice.actions;
export default alertSlice.reducer;
