import {
  createActionGroup,
  emptyProps,
  props,
} from '@ngrx/store';
import { Route } from '../../routes/models/route/route.model';
import { ApiError } from '../../shared/models/api-error.model';
import { CreateRoute } from '../../routes/models/create-route/create-route.model';

export const RoutesActions = createActionGroup({
  source: 'Routes',
  events: {
    getRoutes: emptyProps(),
    getRoutesSuccess: props<{ routes: Route[] }>(),
    updateRoute: props<{ id: number; route: Route }>(),
    deleteRoute: props<{ id: number }>(),
    deleteRouteSuccess: props<{ id: number }>(),
    createRoute: props<{ route: CreateRoute }>(),
    createRouteSuccess: emptyProps(),
    changePage: props<{ pageNumber: number }>(),
    failure: props<{ error: ApiError }>(),
  },
});
