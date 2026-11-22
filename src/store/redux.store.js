import { configureStore } from "@reduxjs/toolkit";
import authSlice from "@/store/features/auth/reducers/authSlice.reducer.js";

const store = configureStore({
  reducer: {
    authentication: authSlice,
  },
});

export default store;
