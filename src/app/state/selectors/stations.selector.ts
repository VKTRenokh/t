import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export const selectFeature = (state: AppState) =>
  state.stations;

export const selectAllStations = createSelector(
  selectFeature,
  stations => stations.userStations,
);
