import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export const selectFeature = (state: AppState) =>
  state.auth;

export const selectIsLoading = createSelector(
  selectFeature,
  auth => auth.loading,
);

export const selectError = createSelector(
  selectFeature,
  auth => auth.error,
);

export const selectIsAuthorized = createSelector(
  selectFeature,
  auth => auth.isAuthorized,
);
