import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import {
  tileLayer,
  map as createMap,
  Map,
  LeafletMouseEvent,
  marker,
} from 'leaflet';
import { getLatAndLng } from '../../utils/get-lat-and-lng/get-lat-and-lng.util';
import { fromEvent, tap } from 'rxjs';

@Component({
  selector: 'tra-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent implements AfterViewInit {
  @ViewChild('map') public mapRef!: ElementRef;
  private map: Map | null = null;

  public onClick(event: LeafletMouseEvent) {
    if (!this.map) {
      return;
    }

    marker(getLatAndLng(event)).addTo(this.map);
  }

  public ngAfterViewInit(): void {
    this.map = createMap(this.mapRef.nativeElement);
    tileLayer(
      'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      },
    ).addTo(this.map);

    this.map.setView([51.505, -0.09], 13);

    this.map.on('click', event => this.onClick(event));
  }
}
