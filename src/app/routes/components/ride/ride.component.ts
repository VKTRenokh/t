import {
  ChangeDetectionStrategy,
  Component,
  input,
} from '@angular/core';
import { ConnectedNamesPipe } from '../../../stations/pipes/connected-names.pipe';
import { SingleRide } from '../../models/ride/ride.model';
import {
  CurrencyPipe,
  DatePipe,
  KeyValuePipe,
} from '@angular/common';
import { StationIdToNamePipe } from '../../pipes/station-id-to-name/station-id-to-name.pipe';

@Component({
  selector: 'tra-ride',
  standalone: true,
  imports: [
    ConnectedNamesPipe,
    DatePipe,
    KeyValuePipe,
    CurrencyPipe,
    StationIdToNamePipe,
  ],
  templateUrl: './ride.component.html',
  styleUrl: './ride.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RideComponent {
  public ride = input.required<SingleRide>();
  public listOfStations = input.required<number[]>();
}
