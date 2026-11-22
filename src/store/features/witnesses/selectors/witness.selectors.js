import { createSelector } from "@reduxjs/toolkit";

const selectWitnessState = (state) => state.witness;

export const selectWitnessData = createSelector(
  [selectWitnessState],
  (slice) => slice.data,
);

export const selectWitnessLoading = createSelector(
  [selectWitnessState],
  (slice) => slice.loading,
);
