import { createReducer, on } from '@ngrx/store';
import { ApiError } from '../../shared/models/api-error.model';
import { SearchActions } from '../actions/search.action';

export interface SearchState {
  loading: boolean;
  error?: ApiError;
  data?: unknown[];
}

export const initialState: SearchState = {
  loading: false,
};

export const searchReducer = createReducer(
  initialState,
  on(SearchActions.search, state => ({
    ...state,
    loading: true,
  })),
  on(SearchActions.searchSuccess, (state, { data }) => ({
    ...state,
    // TODO: Add search response models
    // @ts-expect-error Add search response models
    data,
    loading: false,
  })),
  on(SearchActions.failure, state => ({
    ...state,
    loading: false,
  })),
);
