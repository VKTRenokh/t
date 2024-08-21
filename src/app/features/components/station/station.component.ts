import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { TuiButton, TuiIcon } from '@taiga-ui/core';
import { Station } from '../../interfaces/stations.interface';
import { ConnectedNamesPipe } from '../../pipes/connected-names.pipe';
import { Store } from '@ngrx/store';
import { StationsActions } from '../../../state/actions/stations.action';

@Component({
  selector: 'tra-station',
  standalone: true,
  imports: [TuiButton, TuiIcon, ConnectedNamesPipe],
  templateUrl: './station.component.html',
  styleUrl: './station.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StationComponent {
  @Input({ required: true }) public stationProps!: Station;

  private store = inject(Store);

  public handleDelete() {
    this.store.dispatch(
      StationsActions.deleteStation({
        id: this.stationProps.id,
      }),
    );
  }
}
