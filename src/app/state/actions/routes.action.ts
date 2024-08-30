import { createActionGroup, emptyProps } from '@ngrx/store';

export const RoutesActions = createActionGroup({
  source: 'Routes',
  events: {
    getRoutes: emptyProps(),
  },
});
