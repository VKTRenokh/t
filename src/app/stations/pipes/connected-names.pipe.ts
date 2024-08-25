import { inject, Pipe, PipeTransform } from '@angular/core';
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

  private idToCityMap = new Map(
    this.stations()?.map(station => [
      station.id,
      station.city,
    ]),
  );

  public transform(currentStation: Station): string {
    const connectedNames = currentStation.connectedTo
      .map(station => this.idToCityMap.get(station.id))
      .filter(Boolean);

    return connectedNames.join(', ');
  }
}
