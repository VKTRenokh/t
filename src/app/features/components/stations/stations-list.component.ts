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
import { calculateTotalPages } from '../../utils/calculateTotalPages';
import { TuiNotification } from '@taiga-ui/core';

@Component({
  selector: 'tra-stations-list',
  standalone: true,
  imports: [
    StationComponent,
    TuiPagination,
    TuiNotification,
  ],
  templateUrl: './stations-list.component.html',
  styleUrl: './stations-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StationsListComponent implements OnInit {
  private stationsFacade = inject(StationsFacade);

  public stations = this.stationsFacade.stations;

  public service = inject(StationsService);

  public store = inject(Store<AppState>);

  public currentPage = 0;

  private itemsPerPage = 5;

  public ngOnInit(): void {
    this.store.dispatch(StationsActions.getStations());
  }

  public goToPage(index: number) {
    this.currentPage = index;
  }

  public getPaginatedStations() {
    const startIndex = this.currentPage * this.itemsPerPage;
    return this.stations()!.slice(
      startIndex,
      startIndex + this.itemsPerPage,
    );
  }

  public getTotalPages() {
    return calculateTotalPages(
      this.stations()!.length,
      this.itemsPerPage,
    );
  }
}
