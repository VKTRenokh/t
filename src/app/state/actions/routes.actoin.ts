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
    updateRoutes: props<{ id: number; route: Route }>(),
    deleteRoutes: props<{ id: number }>(),
    deleteRoutesSuccess: props<{ id: number }>(),
    createRoutes: props<{ route: PostRoute }>(),
    changePage: props<{ pageNumber: number }>(),
    failure: props<{ error: ApiError }>(),
  },
});
