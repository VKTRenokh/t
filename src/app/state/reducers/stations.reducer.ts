import { createReducer, on } from '@ngrx/store';

import { Station } from '../../stations/interfaces/stations.interface';
import { StationsActions } from '../actions/stations.action';
import { ApiError } from '../../shared/models/api-error.model';

export interface StationsState {
  stationsList: Station[];
  error?: ApiError;
}

export const initialState: StationsState = {
  stationsList: [],
};

export const stationsReducer = createReducer(
  initialState,
  on(
    StationsActions.getStationsSuccess,
    (state, { stations }) => ({
      ...state,
      stationsList: stations,
    }),
  ),
  on(
    StationsActions.deleteStationSuccess,
    (state, { id }) => ({
      ...state,
      stationsList: state.stationsList.filter(
        station => station.id !== id,
      ),
    }),
  ),
  on(StationsActions.failure, (state, { error }) => ({
    ...state,
    error: error,
  })),
);
