import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';

import { StationComponent } from '../station/station.component';

import { StationsFacade } from '../../../state/facades/stations.facade';
import { StationsService } from '../../services/stations.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/app.state';

import { StationsActions } from '../../../state/actions/stations.action';
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
export class StationsListComponent implements OnInit {
  private stationsFacade = inject(StationsFacade);

  public service = inject(StationsService);

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

  public ngOnInit(): void {
    this.stationsFacade.getStations();
  }

  public goToPage(pageNumber: number) {
    this.stationsFacade.changePage(pageNumber);
  }
}
