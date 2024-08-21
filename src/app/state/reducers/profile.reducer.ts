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
  on(ProfileActions.fetchProfile, state => ({
    ...state,
    loading: true,
  })),
  on(
    ProfileActions.fetchProfileSuccess,
    (state, { profile }) => ({
      ...state,
      profile,
      loading: false,
    }),
  ),
  on(
    ProfileActions.fetchProfileFailure,
    (state, { error }) => ({
      ...state,
      error,
      loading: false,
    }),
  ),

  on(ProfileActions.updateProfile, state => ({
    ...state,
    loading: true,
  })),
  on(
    ProfileActions.updateProfileSuccess,
    (state, { profile }) => ({
      ...state,
      profile,
      loading: false,
    }),
  ),
  on(
    ProfileActions.updateProfileFailure,
    (state, { error }) => ({
      ...state,
      error,
      loading: false,
    }),
  ),

  on(ProfileActions.updatePassword, state => ({
    ...state,
    loading: true,
  })),
  on(ProfileActions.updatePasswordSuccess, state => ({
    ...state,
    loading: false,
  })),
  on(
    ProfileActions.updatePasswordFailure,
    (state, { error }) => ({
      ...state,
      error,
      loading: false,
    }),
  ),
);
