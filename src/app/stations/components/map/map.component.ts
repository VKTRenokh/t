import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  ViewChild,
} from '@angular/core';
import {
  tileLayer,
  map as createMap,
  Map,
  LeafletMouseEvent,
  marker,
  Marker,
} from 'leaflet';
import { getLatAndLng } from '../../utils/get-lat-and-lng/get-lat-and-lng.util';
import { LatLng } from 'leaflet';
import {
  ControlValueAccessor,
  NgControl,
} from '@angular/forms';

export type OnChangeCallback =
  | ((value: LatLng) => void)
  | null;

@Component({
  selector: 'tra-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent
  implements AfterViewInit, ControlValueAccessor
{
  @ViewChild('map') private mapRef!: ElementRef;
  private map: Map | null = null;
  private currentMarker: Marker | null = null;
  private onChange: OnChangeCallback = null;
  private control = inject(NgControl, { self: true });

  public value: LatLng | null = null;

  constructor() {
    this.control.valueAccessor = this;
  }

  private emitChanges() {
    if (!this.currentMarker || !this.onChange) {
      return;
    }

    this.onChange(this.currentMarker.getLatLng());
  }

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

    this.emitChanges();

    this.addMarkerOnDragListener(this.currentMarker);
  }

  public addMarkerOnDragListener(marker: Marker) {
    marker.on('dragend', () => {
      this.emitChanges();
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

  public writeValue(latLng: LatLng): void {
    this.value = latLng;
  }

  public registerOnChange(
    fn: NonNullable<OnChangeCallback>,
  ): void {
    this.onChange = fn;
  }

  public registerOnTouched(): void {
    return;
  }
}
