import {
  createActionGroup,
  emptyProps,
  props,
} from '@ngrx/store';
import { ApiError } from '../../shared/models/api-error.model';
import { Order } from '../../orders/models/orders';

export const OrdersActions = createActionGroup({
  source: 'Orders',
  events: {
    getOrders: emptyProps(),
    getOrdersSuccess: props<{ orders: Order[] }>(),
    deleteOrder: props<{
      orderId: number;
    }>(),
    deleteRideSuccess: emptyProps(),
    failure: props<{ error: ApiError }>(),
  },
});
