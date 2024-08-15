import { createReducer, on } from '@ngrx/store';
import { AuthActions } from '../actions/auth.action';
import { ApiError } from '../../shared/models/api-error.model';

export interface AuthState {
  error?: ApiError;
  loading: boolean;
}

export const initialState: AuthState = { loading: false };

export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, state => ({
    ...state,
    loading: true,
  })),
  on(AuthActions.loginSuccess, state => ({
    ...state,
    loading: false,
  })),
  on(AuthActions.loginFailure, (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
  })),
);
