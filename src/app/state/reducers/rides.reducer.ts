/* eslint-disable @typescript-eslint/no-unused-vars */
import { createReducer, on } from '@ngrx/store';
import { Route } from '../../routes/models/route/route.model';
import { ApiError } from '../../shared/models/api-error.model';
import { RoutesActions } from '../actions/routes.action';
import { Ride } from '../../routes/models/ride/ride.model';
import { RideActions } from '../actions/ride.action';

export interface RideState {
  error?: ApiError;
  loading: boolean;
  ride: Ride;
}

export const initialState: RideState = {
  loading: false,
  ride: {
    id: 0,
    path: [],
    carriages: [],
    schedule: [],
  },
};

export const rideReducer = createReducer(
  initialState,
  on(RideActions.getRide, state => ({
    ...state,
    loading: true,
  })),
  on(RideActions.getRideSuccess, (state, { ride }) => ({
    ...state,
    ride,
    loading: false,
  })),
  on(RideActions.failure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);
