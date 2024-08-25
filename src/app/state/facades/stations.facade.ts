import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { AppState } from '../app.state';

import {
  selectAllStations,
  selectPaginatedStations,
  selectPaginationPageNumber,
  selectTotalPages,
} from '../selectors/stations.selector';
import { StationsActions } from '../actions/stations.action';

@Injectable({
  providedIn: 'root',
})
export class StationsFacade {
  private store = inject(Store<AppState>);

  public stations = toSignal(
    this.store.select(selectAllStations),
  );

  public paginatedStations = toSignal(
    this.store.select(selectPaginatedStations),
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

  public getStations() {
    this.store.dispatch(StationsActions.getStations());
  }

  public deleteStation(id: number) {
    this.store.dispatch(
      StationsActions.deleteStation({ id }),
    );
  }
}
