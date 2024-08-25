import { createReducer, on } from '@ngrx/store';
import { Profile } from '../../profile/models/profile.model';
import { ApiError } from '../../shared/models/api-error.model';
import { ProfileActions } from '../actions/profile.action';

export interface ProfileState {
  profile: Profile | null;
  loading: boolean;
  error: ApiError | null;
}

export const initialState: ProfileState = {
  profile: null,
  loading: false,
  error: null,
};

export const profileReducer = createReducer(
  initialState,
  on(
    ProfileActions.fetchProfile,
    ProfileActions.updateProfile,
    ProfileActions.updatePassword,
    state => ({
      ...state,
      loading: true,
      error: null,
    }),
  ),
  on(
    ProfileActions.fetchProfileSuccess,
    ProfileActions.updateProfileSuccess,
    (state, { profile }) => ({
      ...state,
      profile,
      loading: false,
      error: null,
    }),
  ),
  on(ProfileActions.updatePasswordSuccess, state => ({
    ...state,
    loading: false,
    error: null,
  })),
  on(
    ProfileActions.fetchProfileFailure,
    ProfileActions.updateProfileFailure,
    ProfileActions.updatePasswordFailure,
    (state, { error }) => ({
      ...state,
      error,
      loading: false,
    }),
  ),
  on(ProfileActions.resetError, state => ({
    ...state,
    error: null,
  })),
);
