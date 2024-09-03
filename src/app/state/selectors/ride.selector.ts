import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export const selectRideState = (state: AppState) =>
  state.ride;

export const selectRide = createSelector(
  selectRideState,
  state => state.ride,
);
