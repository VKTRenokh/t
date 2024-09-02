import { createReducer, on } from '@ngrx/store';
import { ApiError } from '../../shared/models/api-error.model';
import { SearchActions } from '../actions/search.action';
import { Search } from '../../search/models/search/search.model';

export interface SearchState {
  loading: boolean;
  error?: ApiError;
  data?: Search;
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
    data,
    loading: false,
  })),
  on(SearchActions.failure, (state, { error }) => {
    console.log(error);
    return { ...state, loading: false, error };
  }),
);
