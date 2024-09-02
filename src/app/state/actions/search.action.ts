import { createActionGroup, props } from '@ngrx/store';
import { LatLngStringTuple } from '../../search/services/search/search.service';
import { ApiError } from '../../shared/models/api-error.model';

export const SearchActions = createActionGroup({
  source: 'Search',
  events: {
    search: props<{
      from: LatLngStringTuple;
      to: LatLngStringTuple;
      time: number;
    }>(),
    searchSuccess: props<{ data: unknown }>(),
    failure: props<{ error: ApiError }>(),
  },
});
