import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { AppState } from '../app.state';

import { StationsActions } from '../actions/stations.action';
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

  constructor() {
    this.store
      .select(selectAllRoutes)
      .subscribe(item => console.log(item));

    this.store
      .select(selectPaginatedRoutes)
      .subscribe(item => console.log(item));
  }

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

  public changePage(page: number) {
    this.store.dispatch(
      StationsActions.changePage({ pageNumber: page }),
    );
  }

  public getRoutes() {
    this.store.dispatch(RoutesActions.getRoutes());
  }

  public deleteRoutes(id: number) {
    this.store.dispatch(RoutesActions.deleteRoutes({ id }));
  }

  public updateRoutes(id: number, route: Route) {
    this.store.dispatch(
      RoutesActions.updateRoutes({ id, route }),
    );
  }

  public createRoutes(route: PostRoute) {
    this.store.dispatch(
      RoutesActions.createRoutes({ route }),
    );
  }
}
