import { createReducer, on } from '@ngrx/store';
import { ApiError } from '../../shared/models/api-error.model';
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
  on(RideActions.updateRideSuccess, state => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(RideActions.failure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);
