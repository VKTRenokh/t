import { inject, Injectable } from '@angular/core';
import {
  Actions,
  createEffect,
  ofType,
} from '@ngrx/effects';
import { tap } from 'rxjs';
import { UserActions } from '../actions/user.action';
import { TuiAlertService } from '@taiga-ui/core';
import { OrdersActions } from '../actions/orders.action';
import { RideActions } from '../actions/ride.action';
import { AuthActions } from '../actions/auth.action';
import { CarriagesActions } from '../actions/carriages.action';
import { RoutesActions } from '../actions/routes.action';
import { StationsActions } from '../actions/stations.action';

@Injectable()
export class ToastsEffects {
  private actions = inject(Actions);
  private alertService = inject(TuiAlertService);

  public showSuccessToast = createEffect(
    () =>
      this.actions.pipe(
        ofType(
          UserActions.updateProfileSuccess,
          UserActions.updatePasswordSuccess,
          OrdersActions.deleteRideSuccess,
          RideActions.deleteRideSuccess,
          RideActions.createRideSuccess,
          RideActions.updateRideSuccess,
        ),
        tap(() =>
          this.showToast(
            'Success',
            'Operation completed successfully',
            'success',
          ),
        ),
      ),
    { dispatch: false },
  );

  public showErrorToast = createEffect(
    () =>
      this.actions.pipe(
        ofType(
          AuthActions.failure,
          CarriagesActions.failure,
          OrdersActions.failure,
          RideActions.failure,
          RoutesActions.failure,
          StationsActions.failure,
          UserActions.failure,
        ),
        tap(({ error }) =>
          this.showToast('Error', error.message, 'error'),
        ),
      ),
    { dispatch: false },
  );

  private showToast(
    label: string,
    message: string,
    appearance: 'success' | 'error',
  ): void {
    this.alertService
      .open(message, { label, appearance })
      .subscribe();
  }
}
