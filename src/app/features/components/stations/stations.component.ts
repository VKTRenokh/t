import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';

import { StationComponent } from '../station/station.component';

import { Store } from '@ngrx/store';

import { StationsFacade } from '../../../state/facades/stations.facade';

@Component({
  selector: 'tra-stations',
  standalone: true,
  imports: [StationComponent],
  templateUrl: './stations.component.html',
  styleUrl: './stations.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StationsComponent {
  private stationsFacade = inject(StationsFacade);

  public stations = this.stationsFacade.stations;

  private store = inject(Store);
}
