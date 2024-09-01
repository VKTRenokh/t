import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export const selectFeature = (state: AppState) =>
  state.routes;

export const selectRoutes = createSelector(
  selectFeature,
  state => state.routes,
);
