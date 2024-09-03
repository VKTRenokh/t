import { createReducer, on } from '@ngrx/store';
import { UserActions } from '../actions/user.action';
import { ApiError } from '../../shared/models/api-error.model';
import { Profile } from '../../core/models/profile/profile.model';
import { AuthActions } from '../actions/auth.action';

export interface UserState {
  error?: ApiError;
  user?: Profile;
  loading: boolean;
}

export const initialState: UserState = {
  loading: false,
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.loadProfileSuccess, (state, { user }) => ({
    ...state,
    error: undefined,
    user,
    loading: false,
  })),
  on(
    UserActions.updateProfileSuccess,
    (state, { user }) => ({
      ...state,
      error: undefined,
      user,
      loading: false,
    }),
  ),
  on(UserActions.updatePasswordSuccess, state => ({
    ...state,
    loading: false,
  })),
  on(UserActions.failure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(UserActions.resetError, state => ({
    ...state,
    error: undefined,
  })),
  on(AuthActions.logoutSuccess, () => initialState),
);
