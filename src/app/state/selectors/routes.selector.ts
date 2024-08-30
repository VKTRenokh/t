import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export const selectFeature = (state: AppState) =>
  state.routes;

export const selectAllRoutes = createSelector(
  selectFeature,
  routes => routes.routesList,
);

export const selectRoutesError = createSelector(
  selectFeature,
  routes => routes.error,
);

export const selectPaginationPageNumber = createSelector(
  selectFeature,
  routes => routes.paginationPage,
);

export const selectItemsPerPage = createSelector(
  selectFeature,
  routes => routes.itemsPerPage,
);

export const selectPaginatedRoutes = createSelector(
  selectAllRoutes,
  selectPaginationPageNumber,
  selectItemsPerPage,
  (routes, pageNumber, itemsPerPage) => {
    const startIndex = pageNumber * itemsPerPage;

    return routes.slice(
      startIndex,
      startIndex + itemsPerPage,
    );
  },
);

export const selectTotalPages = createSelector(
  selectFeature,
  routes => routes.totalPages,
);
