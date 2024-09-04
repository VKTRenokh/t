import { createReducer, on } from '@ngrx/store';
import { ApiError } from '../../shared/models/api-error.model';
import { Order } from '../../orders/models/orders';
import { OrdersActions } from '../actions/orders.action';

export interface OrdersState {
  error?: ApiError;
  loading: boolean;
  orders: Order[];
}

export const initialState: OrdersState = {
  loading: false,
  orders: [],
};

export const ordersReducer = createReducer(
  initialState,
  on(OrdersActions.getOrders, state => ({
    ...state,
    loading: true,
  })),
  on(
    OrdersActions.getOrdersSuccess,
    (state, { orders }) => ({
      ...state,
      orders,
      loading: false,
    }),
  ),
  on(OrdersActions.deleteRideSuccess, state => ({
    ...state,
    loading: true,
  })),
  on(OrdersActions.failure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);
