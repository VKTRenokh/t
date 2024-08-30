import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { AppState } from '../app.state';
import { selectAllCarriages } from '../selectors/carriages.selector';
import { CarriagesActions } from '../actions/carriages.action';
import {
  Carriage,
  CarriageObject,
} from '../../carriages/interfaces/carriages.interface';

@Injectable({
  providedIn: 'root',
})
export class CarriagesFacade {
  private store = inject(Store<AppState>);

  public carriages = toSignal(
    this.store.select(selectAllCarriages),
  );

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
