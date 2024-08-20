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

@Component({
  selector: 'tra-stations',
  standalone: true,
  imports: [StationComponent],
  templateUrl: './stations.component.html',
  styleUrl: './stations.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StationsComponent implements OnInit {
  private stationsFacade = inject(StationsFacade);

  public stations = this.stationsFacade.stations;

  public service = inject(StationsService);

  public store = inject(Store<AppState>);

  public ngOnInit(): void {
    this.store.dispatch(StationsActions.getStations());
  }
}
