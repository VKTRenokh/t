import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '../app.state';
import {
  selectAllCarriages,
  selectCarriagesError,
} from '../selectors/carriages.selector';
import { CarriagesActions } from '../actions/carriages.action';
import { Carriage } from '../../carriages/interfaces/carriages.interface';
import { filter, map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { isNotNullable } from '../../shared/utils/is-not-nullables';

@Injectable({
  providedIn: 'root',
})
export class CarriagesFacade {
  private store = inject(Store<AppState>);

  public carriages = this.store.select(selectAllCarriages);

  public getCarriages() {
    this.store.dispatch(CarriagesActions.getCarriages());
  }

  public createCarriage(carriage: Carriage) {
    this.store.dispatch(
      CarriagesActions.createCarriage({ carriage }),
    );
  }

  public updateCarriage(carriage: Carriage) {
    this.store.dispatch(
      CarriagesActions.updateCarriage({ carriage }),
    );
  }

  public error = toSignal(
    this.store.select(selectCarriagesError).pipe(
      filter(isNotNullable),
      map(error => error.message),
    ),
  );
}
