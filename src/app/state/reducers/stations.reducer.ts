import { createReducer, on } from '@ngrx/store';

import { Station } from '../../stations/models/station/station.model';
import { StationsActions } from '../actions/stations.action';
import { ApiError } from '../../shared/models/api-error.model';

export interface StationsState {
  stationsList: Station[];
  paginationPage: number;
  itemsPerPage: number;
  totalPages: number;
  error?: ApiError;
}

export const initialState: StationsState = {
  stationsList: [],
  paginationPage: 0,
  itemsPerPage: 5,
  totalPages: 0,
};

export const stationsReducer = createReducer(
  initialState,
  on(
    StationsActions.getStationsSuccess,
    (state, { stations }) => ({
      ...state,
      stationsList: stations,
      totalPages: Math.ceil(
        stations.length / state.itemsPerPage,
      ),
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
  on(
    StationsActions.changePage,
    (state, { pageNumber }) => ({
      ...state,
      paginationPage: pageNumber,
    }),
  ),
  on(StationsActions.failure, (state, { error }) => ({
    ...state,
    error: error,
  })),
);
