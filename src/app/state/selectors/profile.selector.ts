import {
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import { ProfileState } from '../reducers/profile.reducer';

export const selectProfileFeature =
  createFeatureSelector<ProfileState>('profile');

export const selectProfile = createSelector(
  selectProfileFeature,
  state => state.profile,
);

export const selectProfileLoading = createSelector(
  selectProfileFeature,
  state => state.loading,
);

export const selectProfileError = createSelector(
  selectProfileFeature,
  state => state.error,
);
