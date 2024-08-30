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
        this.routesService.getRoutes().pipe(
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

  public createRouteEffect = createEffect(() =>
    this.actions.pipe(
      ofType(RoutesActions.createRoute),
      exhaustMap(({ data }) =>
        this.routesService
          .createRoute(data)
          .pipe(
            map(() => RoutesActions.createRouteSuccess()),
          ),
      ),
    ),
  );

  public updateRouteEffect = createEffect(() =>
    this.actions.pipe(
      ofType(RoutesActions.updateRoutes),
      exhaustMap(({ id, route }) =>
        this.routesService
          .updateRoute(id, route)
          .pipe(map(() => RoutesActions.getRoutes())),
      ),
    ),
  );

  public deleteRouteEffect = createEffect(() =>
    this.actions.pipe(
      ofType(RoutesActions.deleteRoutes),
      exhaustMap(data =>
        this.routesService.deleteRoute(data.id).pipe(
          map(() =>
            RoutesActions.deleteRoutesSuccess({
              id: data.id,
            }),
          ),
        ),
      ),
    ),
  );
}
