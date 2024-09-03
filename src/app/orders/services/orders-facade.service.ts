import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { OrdersActions } from '../../state/actions/orders.action';
import { selectOrders } from '../../state/selectors/orders.selector';

@Injectable({
  providedIn: 'root',
})
export class RideFacadeService {
  private store = inject(Store);

  public orders = toSignal(this.store.select(selectOrders));

  public getOrders() {
    this.store.dispatch(OrdersActions.getOrders());
  }

  public deleteOrder(orderId: number) {
    this.store.dispatch(
      OrdersActions.deleteOrder({ orderId }),
    );
  }
}
