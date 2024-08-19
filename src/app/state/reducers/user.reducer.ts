import { createReducer, on } from '@ngrx/store';
import { UserActions } from '../actions/user.action';
import { ApiError } from '../../shared/models/api-error.model';
import { Profile } from '../../core/models/profile/profile.model';

interface UserState {
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
    loading: false,
    user,
  })),
  on(
    UserActions.loadProfileFailure,
    (state, { error }) => ({
      ...state,
      error,
      loading: false,
    }),
  ),
);
