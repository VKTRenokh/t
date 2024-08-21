import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { StationsListComponent } from '../../../stations/components/stations/stations-list.component';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'tra-stations-page',
  standalone: true,
  imports: [MapComponent, StationsListComponent],
  templateUrl: './stations-page.component.html',
  styleUrl: './stations-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StationsPageComponent {
  public onMarkerChange(event: unknown) {
    console.log(event);
  }
}
