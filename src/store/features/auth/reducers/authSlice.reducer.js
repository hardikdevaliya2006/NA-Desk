import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  role: null,
  isAuthenticated: false,
  initialized: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = Boolean(action.payload);
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setInitialized: (state, action) => {
      state.initialized = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.role = null;
      state.isAuthenticated = false;
    },
    reset: () => initialState,
  },
});

export const {
  setUser,
  setRole,
  setAuthenticated,
  setInitialized,
  setLoading,
  setError,
  logout,
  reset,
} = authSlice.actions;
export default authSlice.reducer;
