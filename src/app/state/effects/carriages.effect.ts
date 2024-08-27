import { Injectable, inject } from '@angular/core';
import {
  Actions,
  createEffect,
  ofType,
} from '@ngrx/effects';
import { exhaustMap, map, catchError, of } from 'rxjs';
import { CarriagesService } from '../../carriages/services/carriages.service';
import { CarriagesActions } from '../actions/carriages.action';

@Injectable()
export class CarriagesEffects {
  private actions = inject(Actions);
  private carriagesService = inject(CarriagesService);

  public getStationsEffect = createEffect(() =>
    this.actions.pipe(
      ofType(CarriagesActions.getCarriages),
      exhaustMap(() =>
        this.carriagesService.getCarriages().pipe(
          map(
            carriages =>
              CarriagesActions.getCarriagesSuccess({
                carriages,
              }),
            catchError(response =>
              of(
                CarriagesActions.failure({
                  error: response.error,
                }),
              ),
            ),
          ),
        ),
      ),
    ),
  );
}
