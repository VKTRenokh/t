import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export const selectRideState = (state: AppState) =>
  state.orders;

export const selectOrders = createSelector(
  selectRideState,
  state => state.orders,
);
