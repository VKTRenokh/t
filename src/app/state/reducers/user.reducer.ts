import { createReducer } from '@ngrx/store';

interface UserState {
  error?: Error;
  user: null;
  loading: boolean;
}

export const initialState: UserState = {
  user: null,
  loading: false,
};

export const userReducer = createReducer(initialState);
