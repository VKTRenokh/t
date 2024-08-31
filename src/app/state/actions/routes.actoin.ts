import {
  createActionGroup,
  emptyProps,
  props,
} from '@ngrx/store';
import { ApiError } from '../../shared/models/api-error.model';
import {
  PostRoute,
  Route,
} from '../../routes/models/routes.model';

export const RoutesActions = createActionGroup({
  source: 'Routes',
  events: {
    getRoutes: emptyProps(),
    getRoutesSuccess: props<{ routes: Route[] }>(),
    updateRoute: props<{ id: number; route: Route }>(),
    deleteRoute: props<{ id: number }>(),
    deleteRouteSuccess: props<{ id: number }>(),
    createRoute: props<{ route: PostRoute }>(),
    changePage: props<{ pageNumber: number }>(),
    failure: props<{ error: ApiError }>(),
  },
});
