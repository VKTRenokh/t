import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  forwardRef,
  inject,
  input,
  ViewChild,
} from '@angular/core';
import {
  map as createMap,
  Map as LeafLetMap,
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
import { debounceTime, fromEvent } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tileLayer } from '../../utils/tile-layer/tile-layer.util';
import { FeatureGroup } from 'leaflet';

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
  private map: LeafLetMap | null = null;
  private currentMarker: Marker | null = null;
  private onChange: OnChangeCallback = null;
  private destroyRef = inject(DestroyRef);
  private markers = new FeatureGroup();
  private markerMap = new Map<string, Marker>();

  public stations = input<any>();
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
    fromEvent(marker, 'dragend')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.emitChanges());
  }

  public addLayer(map: LeafLetMap) {
    tileLayer().addTo(map);
  }

  private removeInvisibleMarker(
    marker: Marker,
    id: string,
  ) {
    this.markers.removeLayer(marker);
    this.markerMap.delete(id);
  }

  private addVisibleMarkers() {
    const stations = this.stations() as any[];

    if (!stations || !this.map) {
      return;
    }
    const stationsToKeep = new Set<string>();

    const bounds = this.map.getBounds();
    const visibleStations = stations.filter(station =>
      bounds.contains([
        station.latitude,
        station.longitude,
      ]),
    );

    visibleStations.forEach(station => {
      stationsToKeep.add(station.id);

      if (this.markerMap.has(station.id)) {
        return;
      }

      const stationMarker = marker(
        new LatLng(station.latitude, station.longitude),
      ).bindPopup(station.city);

      this.markerMap.set(station.id, stationMarker);
      this.markers.addLayer(stationMarker);
    });

    this.markerMap.forEach((marker, id) => {
      if (stationsToKeep.has(id)) {
        return;
      }
      this.removeInvisibleMarker(marker, id);
    });

    this.markers.addTo(this.map);
  }

  public ngAfterViewInit(): void {
    this.map = createMap(this.mapRef.nativeElement);

    this.addLayer(this.map);

    this.map.setView(defaultLatLng, defaultZoom);

    fromEvent<LeafletMouseEvent>(this.map, 'click')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(event => this.onClick(event));

    fromEvent(this.map, 'moveend')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.addVisibleMarkers());
  }

  public writeValue(latLng: LatLng): void {
    this.value = latLng;

    this.map?.setView(latLng, this.map.getZoom());
    this.currentMarker?.setLatLng(latLng);
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
