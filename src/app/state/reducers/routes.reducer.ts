import { createReducer } from '@ngrx/store';
import { Route } from '../../routes/models/route/route.model';
import { ApiError } from '../../shared/models/api-error.model';

export interface RoutesState {
  error?: ApiError;
  loading: boolean;
  routes: Route[];
}

export const initialState: RoutesState = {
  loading: false,
  routes: [],
};

export const routesReducer = createReducer(initialState);
