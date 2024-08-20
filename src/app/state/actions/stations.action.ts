import {
  createActionGroup,
  emptyProps,
  props,
} from '@ngrx/store';
import { Station } from '../../features/interfaces/stations.interface';

export const StationsActions = createActionGroup({
  source: 'Stations',
  events: {
    getStations: emptyProps(),
    getStationsSuccess: props<{ stations: Station[] }>(),
    deleteStation: props<{ id: number }>(),
    deleteStationSuccess: props<{ id: number }>(),
  },
});
