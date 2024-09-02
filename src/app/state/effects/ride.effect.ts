import { inject, Injectable } from '@angular/core';
import {
  Actions,
  createEffect,
  ofType,
} from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { RideActions } from '../actions/ride.action';
import { RideService } from '../../routes/services/ride/ride.service';

@Injectable()
export class RideEffects {
  private actions = inject(Actions);
  private rideService = inject(RideService);

  public getRideEffect = createEffect(() =>
    this.actions.pipe(
      ofType(RideActions.getRide),
      exhaustMap(action =>
        this.rideService.getRide(action.id).pipe(
          map(ride => RideActions.getRideSuccess({ ride })),
          catchError(error =>
            of(RideActions.failure({ error: error.error })),
          ),
        ),
      ),
    ),
  );
}
