import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  forwardRef,
  inject,
  ViewChild,
} from '@angular/core';
import {
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
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { fromEvent } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tileLayer } from '../../utils/tile-layer/tile-layer.util';

export type OnChangeCallback =
  | ((value: LatLng) => void)
  | null;

// TODO: Add map line connections between stations
// TODO: Unsubscribe from leaflet events

export const defaultLatLng = new LatLng(51.505, -0.09);
export const defaultZoom = 6;

@Component({
  selector: 'tra-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MapComponent),
      multi: true,
    },
  ],
})
export class MapComponent
  implements AfterViewInit, ControlValueAccessor
{
  @ViewChild('map') private mapRef!: ElementRef;
  private map: Map | null = null;
  private currentMarker: Marker | null = null;
  private onChange: OnChangeCallback = null;
  private destroyRef = inject(DestroyRef);

  public value: LatLng = defaultLatLng;

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

  public addLayer(map: Map) {
    tileLayer().addTo(map);
  }

  public ngAfterViewInit(): void {
    this.map = createMap(this.mapRef.nativeElement);

    this.addLayer(this.map);

    this.map.setView(defaultLatLng, defaultZoom);

    fromEvent<LeafletMouseEvent>(this.map, 'click')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(event => this.onClick(event));
  }

  public writeValue(latLng: LatLng): void {
    this.value = latLng;

    this.map?.setView(latLng, defaultZoom);
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
