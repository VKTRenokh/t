import { createActionGroup, props } from '@ngrx/store';
import { ApiError } from '../../shared/models/api-error.model';
import { Ride } from '../../routes/models/ride/ride.model';

export const RideActions = createActionGroup({
  source: 'Ride',
  events: {
    getRide: props<{ id: number }>(),
    getRideSuccess: props<{ ride: Ride }>(),
    failure: props<{ error: ApiError }>(),
  },
});
