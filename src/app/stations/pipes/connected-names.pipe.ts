import {
  computed,
  inject,
  Pipe,
  PipeTransform,
} from '@angular/core';
import { Station } from '../models/station/station.model';
import { StationsFacade } from '../../state/facades/stations.facade';

@Pipe({
  name: 'connectedNames',
  standalone: true,
  pure: false,
})
export class ConnectedNamesPipe implements PipeTransform {
  private stationsFacade = inject(StationsFacade);

  private stations = this.stationsFacade.stations;

  private idToCityMap = computed(() => {
    const stations = this.stations();
    return new Map(
      stations
        ? stations.map(station => [
            station.id,
            station.city,
          ])
        : [],
    );
  });

  public transform(currentStation: Station): string {
    const map = this.idToCityMap();

    const connectedNames = currentStation.connectedTo
      .map(station => map.get(station.id))
      .filter(Boolean);

    return connectedNames.join(', ');
  }
}
