import {
  createActionGroup,
  emptyProps,
  props,
} from '@ngrx/store';
import { ApiError } from '../../shared/models/api-error.model';
import {
  Ride,
  UpdateRide,
} from '../../routes/models/ride/ride.model';

export const RideActions = createActionGroup({
  source: 'Ride',
  events: {
    getRide: props<{ id: string }>(),
    getRideSuccess: props<{ ride: Ride }>(),
    updateRide: props<{ data: UpdateRide }>(),
    updateRideSuccess: emptyProps(),
    deleteRide: props<{
      routeId: string;
      rideId: number;
    }>(),
    deleteRideSuccess: emptyProps(),
    failure: props<{ error: ApiError }>(),
  },
});
