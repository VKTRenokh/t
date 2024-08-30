import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '../app.state';
import { selectAllCarriages } from '../selectors/carriages.selector';
import { CarriagesActions } from '../actions/carriages.action';
import {
  Carriage,
  CarriageObject,
} from '../../carriages/interfaces/carriages.interface';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarriagesFacade {
  private store = inject(Store<AppState>);

  public carriages = this.store
    .select(selectAllCarriages)
    .pipe(tap(console.log));

  public getCarriages() {
    this.store.dispatch(CarriagesActions.getCarriages());
  }

  public createCarriage(carriage: CarriageObject) {
    this.store.dispatch(
      CarriagesActions.createCarriage({ carriage }),
    );
  }

  public updateCarriage(carriage: Carriage) {
    this.store.dispatch(
      CarriagesActions.updateCarriage({ carriage }),
    );
  }
}
