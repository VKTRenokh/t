import { Injectable, inject } from '@angular/core';
import {
  Actions,
  createEffect,
  ofType,
} from '@ngrx/effects';
import {
  exhaustMap,
  map,
  catchError,
  of,
  switchMap,
} from 'rxjs';
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
          map(carriages =>
            CarriagesActions.getCarriagesSuccess({
              carriages,
            }),
          ),
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
  );

  public createCarriage = createEffect(() =>
    this.actions.pipe(
      ofType(CarriagesActions.createCarriage),
      exhaustMap(action =>
        this.carriagesService
          .createCarriage(action.carriage)
          .pipe(
            map(response =>
              CarriagesActions.createCarriageSuccess({
                carriage: {
                  ...action.carriage,
                  code: response,
                },
              }),
            ),
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
  );

  public updateCarriage = createEffect(() =>
    this.actions.pipe(
      ofType(CarriagesActions.updateCarriage),
      exhaustMap(action =>
        this.carriagesService
          .updateCarriage(action.carriage)
          .pipe(
            switchMap(() =>
              of(
                CarriagesActions.updateCarriageSuccess(),
                CarriagesActions.getCarriages(),
              ),
            ),
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
  );
}
