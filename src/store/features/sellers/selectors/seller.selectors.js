import { createSelector } from "@reduxjs/toolkit";

const selectSellerState = (state) => state.seller;

export const selectSellerData = createSelector(
  [selectSellerState],
  (slice) => slice.data,
);

export const selectSellerLoading = createSelector(
  [selectSellerState],
  (slice) => slice.loading,
);
