import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export const selectFeature = (state: AppState) =>
  state.stations;

export const selectAllStations = createSelector(
  selectFeature,
  stations => stations.stationsList,
);

export const selectStationsById = (id: number) =>
  createSelector(selectFeature, stations =>
    stations.stationsList.forEach(station =>
      station.connectedTo.find(city => city.id === id),
    ),
  );
