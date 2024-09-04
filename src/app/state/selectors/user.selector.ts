import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export const selectFeature = (state: AppState) =>
  state.user;

export const selectProfile = createSelector(
  selectFeature,
  state => state.user,
);

export const selectProfileLoading = createSelector(
  selectFeature,
  state => state.loading,
);

export const selectRole = createSelector(
  selectProfile,
  state => state?.role,
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
