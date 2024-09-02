import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { SearchState } from '../reducers/search.reducer';

const selectFeature = (state: AppState) => state.search;

export const selectError = createSelector(
  selectFeature,
  (state: SearchState) => state.error,
);

export const selectData = createSelector(
  selectFeature,
  (state: SearchState) => state.data,
);
