import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { selectRide } from '../../../state/selectors/ride.selector';
import { RideActions } from '../../../state/actions/ride.action';

@Injectable({
  providedIn: 'root',
})
export class RideFacadeService {
  private store = inject(Store);

  public ride = toSignal(this.store.select(selectRide));

  public getRide(id: number) {
    this.store.dispatch(RideActions.getRide({ id }));
  }
}
