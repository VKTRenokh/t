import {
  createActionGroup,
  emptyProps,
  props,
} from '@ngrx/store';
import { Station } from '../../stations/models/station/station.model';
import { ApiError } from '../../shared/models/api-error.model';
import { PostStation } from '../../stations/models/post-station/post-station.model';

export const StationsActions = createActionGroup({
  source: 'Stations',
  events: {
    getStations: emptyProps(),
    getStationsSuccess: props<{ stations: Station[] }>(),
    deleteStation: props<{ id: number }>(),
    deleteStationSuccess: props<{ id: number }>(),
    createStation: props<{ station: PostStation }>(),
    changePage: props<{ pageNumber: number }>(),
    failure: props<{ error: ApiError }>(),
  },
});
