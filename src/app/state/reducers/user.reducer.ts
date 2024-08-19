import { createReducer, on } from '@ngrx/store';
import { UserActions } from '../actions/user.action';
import { ApiError } from '../../shared/models/api-error.model';

interface UserState {
  error?: ApiError;
  user: null;
  loading: boolean;
}

export const initialState: UserState = {
  user: null,
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
