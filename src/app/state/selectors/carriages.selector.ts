import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export const carriagesFeatureSelector = (state: AppState) =>
  state.carriages;

export const selectAllCarriages = createSelector(
  carriagesFeatureSelector,
  carriages => carriages.carriagesList,
);

export const selectCarriagesError = createSelector(
  carriagesFeatureSelector,
  carriages => carriages.error,
);
