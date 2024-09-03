import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { selectRide } from '../../../state/selectors/ride.selector';
import { RideActions } from '../../../state/actions/ride.action';
import { SingleRide } from '../../models/ride/ride.model';

@Injectable({
  providedIn: 'root',
})
export class RideFacadeService {
  private store = inject(Store);

  public ride = toSignal(this.store.select(selectRide));

  public getRide(id: string) {
    this.store.dispatch(RideActions.getRide({ id }));
  }

  public updateRide(
    routeId: string,
    rideId: number,
    singleRide: SingleRide,
  ) {
    const data = {
      routeId: routeId,
      rideId: rideId,
      singleRide: singleRide,
    };

    this.store.dispatch(RideActions.updateRide({ data }));
  }

  public deleteRide(routeId: string, rideId: number) {
    console.log('del fasade called');
    this.store.dispatch(
      RideActions.deleteRide({ routeId, rideId }),
    );
  }
}
