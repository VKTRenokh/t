import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  output,
  ViewChild,
} from '@angular/core';
import {
  tileLayer,
  map as createMap,
  Map,
  LeafletMouseEvent,
  marker,
  LatLngTuple,
  Marker,
} from 'leaflet';
import { getLatAndLng } from '../../utils/get-lat-and-lng/get-lat-and-lng.util';
import { LatLng } from 'leaflet';

@Component({
  selector: 'tra-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent implements AfterViewInit {
  @ViewChild('map') private mapRef!: ElementRef;
  private map: Map | null = null;
  private currentMarker: Marker | null = null;

  public markerChange = output<LatLng>();

  public onClick(event: LeafletMouseEvent) {
    if (!this.map) {
      return;
    }

    if (this.currentMarker) {
      this.currentMarker.remove();
    }

    this.currentMarker = marker(getLatAndLng(event), {
      draggable: true,
    }).addTo(this.map);

    this.markerChange.emit(this.currentMarker.getLatLng());

    this.addMarkerOnDragListener(this.currentMarker);
  }

  public addMarkerOnDragListener(marker: Marker) {
    marker.on('dragend', () => {
      this.markerChange.emit(marker.getLatLng());
    });
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
