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
    createRoute: props<{ data: CreateRoute }>(),
    createRouteSuccess: emptyProps(),
    failure: props<{ error: ApiError }>(),
  },
});
