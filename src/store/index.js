import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "store/sidebar-slice";
import alertReducer from "store/alert-slice";

const store = configureStore({
  reducer: { sidebar: sidebarReducer, alert: alertReducer },
});

export default store;
