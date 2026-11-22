import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  item: null,
  loading: false,
  error: null,
};

const sellerSlice = createSlice({
  name: "seller",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    setItem: (state, action) => {
      state.item = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    reset: () => initialState,
  },
});

export const { setData, setItem, setLoading, setError, reset } = sellerSlice.actions;
export default sellerSlice.reducer;
