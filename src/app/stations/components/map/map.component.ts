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
  LatLngBounds,
  LatLngTuple,
  LeafletEventHandlerFnMap,
  Map as LeafLetMap,
  LeafletMouseEvent,
  marker,
  Marker,
  Polyline,
  polyline,
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
import { FeatureGroup } from 'leaflet';
import { Station } from '../../models/station/station.model';

export type OnChangeCallback =
  | ((value: LatLng) => void)
  | null;

export const defaultLatLng = new LatLng(51.505, -0.09);
export const defaultZoom = 4;

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
  private markerMap = new Map<number, Marker>();
  private connectionMap = new Map<string, Polyline>();
  private selectedStation: Station | null = null;
  private maxSouthWest: LatLngTuple = [-0x55, -0xc0];
  private maxNorthEast: LatLngTuple = [0x55, 0xbc];

  public stations = input<Station[]>();
  public value: LatLng = defaultLatLng;

  private emitChanges() {
    if (!this.currentMarker || !this.onChange) {
      return;
    }

    this.onChange(this.currentMarker.getLatLng());
  }

  private addCurrentMarker(position: LatLngTuple) {
    if (this.currentMarker) {
      this.currentMarker.remove();
    }

    this.currentMarker = marker(position, {
      draggable: true,
    }).addTo(this.map!);

    this.addMarkerOnDragListener(this.currentMarker);
  }

  private resetStationSelection() {
    this.selectedStation = null;
    this.clearConnections();
  }

  public onClick(event: LeafletMouseEvent) {
    if (!this.map) {
      return;
    }

    this.addCurrentMarker(getLatAndLng(event));
    this.emitChanges();
    this.resetStationSelection();
  }

  public addMarkerOnDragListener(marker: Marker) {
    fromEvent(marker, 'dragend')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.emitChanges());
  }

  public addLayer(map: LeafLetMap) {
    tileLayer().addTo(map);
  }

  private removeMarker(marker: Marker, id: number) {
    this.markers.removeLayer(marker);
    marker.off();
    this.markerMap.delete(id);
  }

  private getStationLatLngById(id: number) {
    const stations = this.stations();

    if (!stations) {
      return null;
    }

    const station = stations.find(
      station => station.id === id,
    );

    if (!station) {
      return null;
    }

    return new LatLng(station.latitude, station.longitude);
  }

  private isStationVisible(
    station: Station,
    bounds: LatLngBounds,
  ) {
    return bounds.contains([
      station.latitude,
      station.longitude,
    ]);
  }

  private addStationMarker(station: Station) {
    const stationMarker = marker([
      station.latitude,
      station.longitude,
    ]).bindPopup(station.city, {
      autoClose: false,
      closeOnEscapeKey: true,
      keepInView: true,
    });

    this.markerMap.set(station.id, stationMarker);
    this.markers.addLayer(stationMarker);
    this.addStationMarkerListeners(stationMarker, station);

    return stationMarker;
  }

  private addStationMarkerListeners(
    marker: Marker,
    station: Station,
  ) {
    const fromMarkerEvent = (
      event: keyof LeafletEventHandlerFnMap,
    ) =>
      fromEvent(marker, event).pipe(
        takeUntilDestroyed(this.destroyRef),
      );

    fromMarkerEvent('click').subscribe(() => {
      this.selectedStation = station;
      this.drawConnections(station);
    });

    fromMarkerEvent('popupclose').subscribe(() => {
      this.selectedStation = null;
      this.clearConnections();
    });
  }

  private drawConnection(
    from: LatLng,
    toStationId: number,
  ) {
    const to = this.getStationLatLngById(toStationId);

    if (!to) {
      return;
    }

    const line = polyline([from, to], {
      weight: 0.8,
    });

    this.connectionMap.set(
      from + toStationId.toString(),
      line,
    );
    line.addTo(this.map!);
  }

  private clearConnections() {
    if (!this.connectionMap.size) {
      return;
    }
    this.connectionMap.forEach(line => line.remove());
    this.connectionMap.clear();
    this.addVisibleMarkers();
  }

  private drawConnections(station: Station) {
    this.clearConnections();

    station.connectedTo.forEach(to => {
      this.drawConnection(
        new LatLng(station.latitude, station.longitude),
        to.id,
      );
      return to.id;
    });

    this.addVisibleMarkers();
  }

  private isConnectedToSelectedStation(station: Station) {
    if (!this.selectedStation) {
      return false;
    }

    return this.selectedStation.connectedTo.some(
      connectedStation =>
        connectedStation.id === station.id,
    );
  }

  private shouldShowIfSelectedStation(station: Station) {
    return this.selectedStation
      ? this.isConnectedToSelectedStation(station) ||
          this.selectedStation.id === station.id
      : true;
  }

  private removeMarkers(keep: Set<number>) {
    this.markerMap.forEach((marker, id) => {
      if (keep.has(id)) {
        return;
      }
      this.removeMarker(marker, id);
    });
  }

  private addVisibleMarkers() {
    const stations = this.stations();

    if (!stations || !this.map) {
      return;
    }

    const stationsToKeep = new Set<number>();

    const bounds = this.map.getBounds();

    stations.forEach(station => {
      if (
        !this.isStationVisible(station, bounds) ||
        !this.shouldShowIfSelectedStation(station)
      ) {
        return;
      }

      stationsToKeep.add(station.id);

      if (this.markerMap.has(station.id)) {
        return;
      }

      this.addStationMarker(station);
    });

    this.removeMarkers(stationsToKeep);

    this.markers.addTo(this.map);
  }

  private initializeMap() {
    this.map = createMap(this.mapRef.nativeElement, {
      minZoom: 2,
      maxBounds: new LatLngBounds(
        this.maxSouthWest,
        this.maxNorthEast,
      ),
      keyboard: true,
    });
  }

  private fromMapEvent<T>(
    event: keyof LeafletEventHandlerFnMap,
  ) {
    // @ts-expect-error shut up
    return fromEvent<T>(this.map, event).pipe(
      takeUntilDestroyed(this.destroyRef),
    );
  }

  private subscribeToMapEvents() {
    if (!this.map) {
      return;
    }

    this.fromMapEvent<LeafletMouseEvent>('click').subscribe(
      event => this.onClick(event),
    );

    this.fromMapEvent('moveend').subscribe(() =>
      this.addVisibleMarkers(),
    );
  }

  public ngAfterViewInit(): void {
    this.initializeMap();

    this.addLayer(this.map!);

    this.map!.setView(defaultLatLng, defaultZoom);

    this.subscribeToMapEvents();
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
