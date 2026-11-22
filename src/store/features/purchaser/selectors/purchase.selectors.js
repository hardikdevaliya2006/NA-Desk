import { createSelector } from "@reduxjs/toolkit";

const selectPurchaseState = (state) => state.purchase;

export const selectPurchaseData = createSelector(
  [selectPurchaseState],
  (slice) => slice.data,
);

export const selectPurchaseLoading = createSelector(
  [selectPurchaseState],
  (slice) => slice.loading,
);
