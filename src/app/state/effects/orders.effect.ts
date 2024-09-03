import { inject, Injectable } from '@angular/core';
import {
  Actions,
  createEffect,
  ofType,
} from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';

import { OrdersService } from '../../orders/services/orders.service';
import { OrdersActions } from '../actions/orders.action';

@Injectable()
export class OrdersEffects {
  private actions = inject(Actions);
  private ordersService = inject(OrdersService);

  public getOrdersEffect = createEffect(() =>
    this.actions.pipe(
      ofType(OrdersActions.getOrders),
      exhaustMap(() =>
        this.ordersService.getOrders().pipe(
          map(orders =>
            OrdersActions.getOrdersSuccess({ orders }),
          ),
          catchError(error =>
            of(
              OrdersActions.failure({ error: error.error }),
            ),
          ),
        ),
      ),
    ),
  );

  public deleteRideEffect = createEffect(() =>
    this.actions.pipe(
      ofType(OrdersActions.deleteOrder),
      exhaustMap(data =>
        this.ordersService.deleteOrder(data.orderId).pipe(
          map(() => {
            return OrdersActions.deleteRideSuccess();
          }),
          exhaustMap(() =>
            this.ordersService.getOrders().pipe(
              map(orders =>
                OrdersActions.getOrdersSuccess({ orders }),
              ),
              catchError(error =>
                of(OrdersActions.failure({ error })),
              ),
            ),
          ),
          catchError(error =>
            of(OrdersActions.failure({ error })),
          ),
        ),
      ),
    ),
  );
}
