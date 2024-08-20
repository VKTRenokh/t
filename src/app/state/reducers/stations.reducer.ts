import { createReducer, on } from '@ngrx/store';

import { Station } from '../../features/interfaces/stations.interface';
import { StationsActions } from '../actions/stations.action';

export interface StationsState {
  userStations: Station[];
}

export const initialState: StationsState = {
  userStations: [],
};

export const stationsReducer = createReducer(
  initialState,
  on(
    StationsActions.getStationsSuccess,
    (state, { stations }) => ({
      ...state,
      userStations: stations,
    }),
  ),
);
