import { createSelector } from "@reduxjs/toolkit";

const selectPropertyState = (state) => state.property;

export const selectPropertyData = createSelector(
  [selectPropertyState],
  (slice) => slice.data,
);

export const selectPropertyLoading = createSelector(
  [selectPropertyState],
  (slice) => slice.loading,
);
