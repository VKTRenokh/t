import { inject, Injectable } from '@angular/core';
import {
  Actions,
  createEffect,
  ofType,
} from '@ngrx/effects';
import { RoutesService } from '../../routes/services/routes.service';
import { RoutesActions } from '../actions/routes.action';
import { catchError, exhaustMap, map, of } from 'rxjs';

@Injectable()
export class RoutesEffects {
  private actions = inject(Actions);
  private routesService = inject(RoutesService);

  public getRoutesEffect = createEffect(() =>
    this.actions.pipe(
      ofType(RoutesActions.getRoutes),
      exhaustMap(() =>
        this.routesService.get().pipe(
          map(routes =>
            RoutesActions.getRoutesSuccess({
              routes,
            }),
          ),
          catchError(response =>
            of(
              RoutesActions.failure({
                error: response.error,
              }),
            ),
          ),
        ),
      ),
    ),
  );

  public updateRouteEffect = createEffect(() =>
    this.actions.pipe(
      ofType(RoutesActions.updateRoute),
      exhaustMap(({ id, route }) =>
        this.routesService
          .update(id, route)
          .pipe(map(() => RoutesActions.getRoutes())),
      ),
    ),
  );

  public deleteRouteEffect = createEffect(() =>
    this.actions.pipe(
      ofType(RoutesActions.deleteRoute),
      exhaustMap(data =>
        this.routesService.delete(data.id).pipe(
          map(() =>
            RoutesActions.deleteRouteSuccess({
              id: data.id,
            }),
          ),
        ),
      ),
    ),
  );

  public createRouteEffect = createEffect(() =>
    this.actions.pipe(
      ofType(RoutesActions.createRoute),
      exhaustMap(({ route }) =>
        this.routesService
          .create(route)
          .pipe(map(() => RoutesActions.getRoutes())),
      ),
    ),
  );
}
