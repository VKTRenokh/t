import { inject, Pipe, PipeTransform } from '@angular/core';
import { Station } from '../interfaces/stations.interface';
import { StationsFacade } from '../../state/facades/stations.facade';

@Pipe({
  name: 'connectedNames',
  standalone: true,
})
export class ConnectedNamesPipe implements PipeTransform {
  private stationsFacade = inject(StationsFacade);

  private stations = this.stationsFacade.stations;

  public transform(currentStation: Station): string {
    if (
      !currentStation ||
      !currentStation.connectedTo.length
    ) {
      return 'There are no connected stations';
    }

    const stationsMap = new Map(
      this.stations()?.map(station => [
        station.id,
        station.city,
      ]),
    );

    const connectedNames = currentStation.connectedTo.map(
      station => {
        return stationsMap.get(station.id);
      },
    );

    return connectedNames.join(', ');
  }
}
