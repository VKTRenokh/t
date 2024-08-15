import { createReducer, on } from '@ngrx/store';
import { AuthActions } from '../actions/auth.action';

export interface AuthState {
  token?: string;
  // FIX: fix this
  error?: unknown;
  loading: boolean;
}

export const initialState: AuthState = { loading: false };

export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, state => ({
    ...state,
    loading: true,
  })),
  on(AuthActions.loginSuccess, (state, action) => ({
    ...state,
    loading: false,
    token: action.token,
  })),
);
