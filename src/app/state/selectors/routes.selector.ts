import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export const selectFeature = (state: AppState) =>
  state.routes;

export const selectRoutes = createSelector(
  selectFeature,
  state => state.routes,
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
  selectRoutes,
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
