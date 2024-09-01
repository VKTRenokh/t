import { createReducer, on } from '@ngrx/store';
import { Route } from '../../routes/models/route/route.model';
import { ApiError } from '../../shared/models/api-error.model';
import { RoutesActions } from '../actions/routes.action';

export interface RoutesState {
  routes: Route[];
  paginationPage: number;
  loading: boolean;
  itemsPerPage: number;
  totalPages: number;
  error?: ApiError;
}

export const initialState: RoutesState = {
  routes: [],
  loading: false,
  paginationPage: 0,
  itemsPerPage: 5,
  totalPages: 0,
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
  on(RoutesActions.deleteRouteSuccess, (state, { id }) => ({
    ...state,
    routes: state.routes.filter(routes => routes.id !== id),
  })),
  on(RoutesActions.updateRoute, (state, { id, route }) => ({
    ...state,
    routes: state.routes.map(item =>
      item.id === id ? route : item,
    ),
  })),
  on(RoutesActions.changePage, (state, { pageNumber }) => ({
    ...state,
    paginationPage: pageNumber,
  })),
  on(RoutesActions.failure, (state, { error }) => ({
    ...state,
    error: error,
    loading: false,
  })),
);
