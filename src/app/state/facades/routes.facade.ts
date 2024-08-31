import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { AppState } from '../app.state';

import {
  selectAllRoutes,
  selectPaginatedRoutes,
  selectPaginationPageNumber,
  selectTotalPages,
} from '../selectors/routes.selector';
import { RoutesActions } from '../actions/routes.actoin';
import {
  PostRoute,
  Route,
} from '../../routes/models/routes.model';

@Injectable({
  providedIn: 'root',
})
export class RoutesFacade {
  private store = inject(Store<AppState>);

  public routes = toSignal(
    this.store.select(selectAllRoutes),
  );

  public paginatedRoutes = toSignal(
    this.store.select(selectPaginatedRoutes),
  );

  public currentPage = toSignal(
    this.store.select(selectPaginationPageNumber),
  );

  public totalPages = toSignal(
    this.store.select(selectTotalPages),
  );

  public changePage(pageNumber: number) {
    this.store.dispatch(
      RoutesActions.changePage({ pageNumber }),
    );
  }

  public getRoutes() {
    this.store.dispatch(RoutesActions.getRoutes());
  }

  public deleteRoute(id: number) {
    this.store.dispatch(RoutesActions.deleteRoute({ id }));
  }

  public updateRoute(id: number, route: Route) {
    this.store.dispatch(
      RoutesActions.updateRoute({ id, route }),
    );
  }

  public createRoute(route: PostRoute) {
    this.store.dispatch(
      RoutesActions.createRoute({ route }),
    );
  }
}
