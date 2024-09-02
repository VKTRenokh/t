import { createReducer } from '@ngrx/store';
import { ApiError } from '../../shared/models/api-error.model';

export interface SearchState {
  loading: boolean;
  error?: ApiError;
  data?: unknown[];
}

export const initialState: SearchState = {
  loading: false,
};

export const searchReducer = createReducer(initialState);
