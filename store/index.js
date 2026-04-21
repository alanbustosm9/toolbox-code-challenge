import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/store/authSlice";
import carouselReducer from "../features/carousel/store/videosSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    carousel: carouselReducer,
  },
});
