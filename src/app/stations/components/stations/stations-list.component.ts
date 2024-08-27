import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';

import { StationComponent } from '../station/station.component';

import { StationsFacade } from '../../../state/facades/stations.facade';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/app.state';

import { TuiPagination } from '@taiga-ui/kit';

import { TuiError } from '@taiga-ui/core';

import { isNotNullable } from '../../../shared/utils/is-not-nullables';
import { filter, map } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { selectStationsError } from '../../../state/selectors/stations.selector';

@Component({
  selector: 'tra-stations-list',
  standalone: true,
  imports: [
    StationComponent,
    TuiPagination,
    TuiError,
    AsyncPipe,
  ],
  templateUrl: './stations-list.component.html',
  styleUrl: './stations-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StationsListComponent {
  private stationsFacade = inject(StationsFacade);

  public store = inject(Store<AppState>);

  public stations = this.stationsFacade.stations;

  public paginatedStations =
    this.stationsFacade.paginatedStations;

  public error$ = this.store
    .select(selectStationsError)
    .pipe(
      filter(isNotNullable),
      map(error => error.message),
    );

  public currentPage = this.stationsFacade.currentPage;

  public totalPages = this.stationsFacade.totalPages;

  public goToPage(pageNumber: number) {
    this.stationsFacade.changePage(pageNumber);
  }
}
