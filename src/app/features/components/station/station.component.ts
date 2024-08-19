import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';
import { TuiButton, TuiIcon } from '@taiga-ui/core';
import { Station } from '../../interfaces/stations.interface';

@Component({
  selector: 'tra-station',
  standalone: true,
  imports: [TuiButton, TuiIcon],
  templateUrl: './station.component.html',
  styleUrl: './station.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StationComponent {
  @Input({ required: true }) public stationProps!: Station;
}
