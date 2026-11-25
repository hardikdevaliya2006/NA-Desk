import { configureStore } from "@reduxjs/toolkit";
import authSlice from "@/store/features/auth/reducers/authSlice.reducer.js";
import customerSlice from "@/store/features/customers/reducers/customerSlice.reducer.js";

const store = configureStore({
  reducer: {
    authentication: authSlice,
    customers: customerSlice,
  },
});

export default store;
