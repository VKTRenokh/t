import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { map, tileLayer } from 'leaflet';

@Component({
  selector: 'tra-stations-page',
  standalone: true,
  imports: [],
  templateUrl: './stations-page.component.html',
  styleUrl: './stations-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StationsPageComponent
  implements AfterViewInit
{
  @ViewChild('map') public map!: ElementRef;

  public ngAfterViewInit(): void {
    console.log(this.map);
    const a = map(this.map.nativeElement);
    tileLayer(
      'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      },
    ).addTo(a);

    a.setView([51.505, -0.09], 13);
  }
}
