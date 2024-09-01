import { inject, Injectable } from '@angular/core';
import {
  Actions,
  createEffect,
  ofType,
} from '@ngrx/effects';
import { RoutesService } from '../../routes/services/routes/routes.service';
import { RoutesActions } from '../actions/routes.action';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';

@Injectable()
export class RoutesEffects {
  private actions = inject(Actions);
  private routesService = inject(RoutesService);

  public getEffect = createEffect(() =>
    this.actions.pipe(
      ofType(RoutesActions.getRoutes),
      exhaustMap(() =>
        this.routesService.get().pipe(
          map(routes =>
            RoutesActions.getRoutesSuccess({ routes }),
          ),
          catchError(error =>
            of(
              RoutesActions.failure({ error: error.error }),
            ),
          ),
        ),
      ),
    ),
  );

  public createRouteEffect = createEffect(() =>
    this.actions.pipe(
      ofType(RoutesActions.createRoute),
      exhaustMap(({ data }) =>
        this.routesService.create(data).pipe(
          tap(() => console.log('create sucess')),
          map(() => RoutesActions.createRouteSuccess()),
        ),
      ),
    ),
  );
}
