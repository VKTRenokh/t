import { inject, Injectable } from '@angular/core';
import {
  Actions,
  createEffect,
  ofType,
} from '@ngrx/effects';

import { exhaustMap, map } from 'rxjs';

import { StationsService } from '../../features/services/stations.service';
import { StationsActions } from '../actions/stations.action';

@Injectable()
export class StationsEffect {
  private actions = inject(Actions);
  private stationsService = inject(StationsService);

  public getStationsEffect = createEffect(() =>
    this.actions.pipe(
      ofType(StationsActions.getStations),
      exhaustMap(() =>
        this.stationsService.getStations().pipe(
          map(stations =>
            StationsActions.getStationsSuccess({
              stations,
            }),
          ),
        ),
      ),
    ),
  );
}
