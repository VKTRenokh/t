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
}
