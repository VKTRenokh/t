import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export const selectFeature = (state: AppState) =>
  state.user;

export const selectRole = createSelector(
  selectFeature,
  state => state.user?.role,
);

export const selectError = createSelector(
  selectFeature,
  state => state.error,
);

export const selectRoleAndError = createSelector(
  selectRole,
  selectError,
  (role, error) => ({ role, error }),
);
