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

  public updateRideEffect = createEffect(() =>
    this.actions.pipe(
      ofType(RideActions.updateRide),
      exhaustMap(({ data }) =>
        this.rideService
          .updateRide(
            data.routeId,
            data.rideId,
            data.singleRide,
          )
          .pipe(
            map(() => {
              return RideActions.updateRideSuccess();
            }),
            exhaustMap(() =>
              this.rideService.getRide(data.routeId).pipe(
                map(ride =>
                  RideActions.getRideSuccess({ ride }),
                ),
                catchError(error =>
                  of(RideActions.failure({ error })),
                ),
              ),
            ),
            catchError(error =>
              of(RideActions.failure({ error })),
            ),
          ),
      ),
    ),
  );

  public deleteRideEffect = createEffect(() =>
    this.actions.pipe(
      ofType(RideActions.deleteRide),
      exhaustMap(data =>
        this.rideService
          .deleteRide(data.routeId, data.rideId)
          .pipe(
            map(() => {
              return RideActions.deleteRideSuccess();
            }),
            exhaustMap(() =>
              this.rideService.getRide(data.routeId).pipe(
                map(ride =>
                  RideActions.getRideSuccess({ ride }),
                ),
                catchError(error =>
                  of(RideActions.failure({ error })),
                ),
              ),
            ),
            catchError(error =>
              of(RideActions.failure({ error })),
            ),
          ),
      ),
    ),
  );

  public createRideEffect = createEffect(() =>
    this.actions.pipe(
      ofType(RideActions.createRide),
      exhaustMap(action =>
        this.rideService
          .createRide(action.id, action.segments)
          .pipe(
            map(() => RideActions.createRideSuccess()),
            catchError(error =>
              of(
                RideActions.failure({ error: error.error }),
              ),
            ),
          ),
      ),
    ),
  );
}
