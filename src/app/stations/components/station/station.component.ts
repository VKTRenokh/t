import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { TuiButton, TuiIcon } from '@taiga-ui/core';

import { Station } from '../../models/station/station.model';
import { ConnectedNamesPipe } from '../../pipes/connected-names.pipe';
import { StationsFacade } from '../../../state/facades/stations.facade';

@Component({
  selector: 'tra-station',
  standalone: true,
  imports: [TuiButton, TuiIcon, ConnectedNamesPipe],
  templateUrl: './station.component.html',
  styleUrl: './station.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StationComponent {
  public stationInput = input.required<Station>();

  private stationsFacade = inject(StationsFacade);

  public handleDelete() {
    this.stationsFacade.deleteStation(
      this.stationInput().id,
    );
  }
}
