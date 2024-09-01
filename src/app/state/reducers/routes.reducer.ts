import { createReducer, on } from '@ngrx/store';
import { Route } from '../../routes/models/route/route.model';
import { ApiError } from '../../shared/models/api-error.model';
import { RoutesActions } from '../actions/routes.action';

export interface RoutesState {
  error?: ApiError;
  loading: boolean;
  routes: Route[];
}

export const initialState: RoutesState = {
  loading: false,
  routes: [],
};

export const routesReducer = createReducer(
  initialState,
  on(RoutesActions.getRoutes, state => ({
    ...state,
    loading: true,
  })),
  on(
    RoutesActions.getRoutesSuccess,
    (state, { routes }) => ({
      ...state,
      routes,
      loading: false,
    }),
  ),
  on(RoutesActions.failure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);
