import { createReducer, on } from '@ngrx/store';

import { Station } from '../../features/interfaces/stations.interface';
import { StationsActions } from '../actions/stations.action';

export interface StationsState {
  stationsList: Station[];
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
);
