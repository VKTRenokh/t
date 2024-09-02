import { createActionGroup, props } from '@ngrx/store';
import { LatLngStringTuple } from '../../search/services/search/search.service';
import { ApiError } from '../../shared/models/api-error.model';
import { Search } from '../../search/models/search/search.model';

export const SearchActions = createActionGroup({
  source: 'Search',
  events: {
    search: props<{
      from: LatLngStringTuple;
      to: LatLngStringTuple;
      time: number;
    }>(),
    searchSuccess: props<{ data: Search }>(),
    failure: props<{ error: ApiError }>(),
  },
});
