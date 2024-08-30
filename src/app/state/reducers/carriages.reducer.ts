import { createReducer, on } from '@ngrx/store';

import { StationsActions } from '../actions/stations.action';
import { ApiError } from '../../shared/models/api-error.model';
import { CarriagesActions } from '../actions/carriages.action';
import { Carriage } from '../../carriages/interfaces/carriages.interface';

export interface CarriagesState {
  carriagesList: Carriage[];
  error?: ApiError;
}

export const initialState: CarriagesState = {
  carriagesList: [],
};

export const carriagesReducer = createReducer(
  initialState,
  on(
    CarriagesActions.getCarriagesSuccess,
    (state, { carriages }) => ({
      ...state,
      carriagesList: carriages,
    }),
  ),
  on(
    CarriagesActions.createCarriageSuccess,
    (state, { carriage }) => ({
      ...state,
      carriagesList: [...state.carriagesList, carriage],
    }),
  ),
  on(
    CarriagesActions.updateCarriageSuccess,
    (state, { carriage }) => ({
      ...state,
      carriagesList: state.carriagesList.map(oldCarriage =>
        carriage.code === oldCarriage.code
          ? { ...oldCarriage, ...carriage }
          : oldCarriage,
      ),
    }),
  ),
  on(StationsActions.failure, (state, { error }) => ({
    ...state,
    error: error,
  })),
);
