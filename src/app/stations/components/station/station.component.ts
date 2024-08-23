import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { TuiButton, TuiIcon } from '@taiga-ui/core';

import { Store } from '@ngrx/store';
import { StationsActions } from '../../../state/actions/stations.action';
import { Station } from '../../interfaces/stations.interface';
import { ConnectedNamesPipe } from '../../pipes/connected-names.pipe';

@Component({
  selector: 'tra-station',
  standalone: true,
  imports: [TuiButton, TuiIcon, ConnectedNamesPipe],
  templateUrl: './station.component.html',
  styleUrl: './station.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StationComponent {
  public stationProps = input.required<Station>();

  private store = inject(Store);

  public handleDelete() {
    this.store.dispatch(
      StationsActions.deleteStation({
        id: this.stationProps().id,
      }),
    );
  }
}
