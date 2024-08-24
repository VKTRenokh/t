import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export const stationsFeatureSelector = (state: AppState) =>
  state.stations;

export const selectAllStations = createSelector(
  stationsFeatureSelector,
  stations => stations.stationsList,
);

export const selectStationsError = createSelector(
  stationsFeatureSelector,
  stations => stations.error,
);

export const selectPaginationPageNumber = createSelector(
  stationsFeatureSelector,
  stations => stations.paginationPage,
);

export const selectItemsPerPage = createSelector(
  stationsFeatureSelector,
  stations => stations.itemsPerPage,
);

export const selectPaginatedStations = createSelector(
  selectAllStations,
  selectPaginationPageNumber,
  selectItemsPerPage,
  (stations, pageNumber, itemsPerPage) => {
    const startIndex = pageNumber * itemsPerPage;
    return stations.slice(
      startIndex,
      startIndex + itemsPerPage,
    );
  },
);

export const selectTotalPages = createSelector(
  stationsFeatureSelector,
  stations => stations.totalPages,
);
