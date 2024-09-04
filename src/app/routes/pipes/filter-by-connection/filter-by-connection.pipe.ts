import { Pipe, PipeTransform } from '@angular/core';
import { Station } from '../../../stations/models/station/station.model';

@Pipe({
  name: 'filterByConnection',
  standalone: true,
})
export class FilterByConnectionPipe
  implements PipeTransform
{
  private getConnectedTo(station: Station) {
    return station.connectedTo.map(
      connection => connection.id,
    );
  }

  private filter(
    ids: number[],
    selectedIds: number[],
    stations: Station[],
  ) {
    const lastSelectedId = selectedIds.at(-1);

    const lastSelectedStation = stations.find(
      station => station.id === lastSelectedId,
    );

    if (!lastSelectedStation) {
      return [];
    }

    const connectedStationIds = this.getConnectedTo(
      lastSelectedStation,
    );

    return ids.filter(id =>
      connectedStationIds.includes(id),
    );
  }

  public transform(
    ids: number[],
    selectedIds: number[],
    stations: Station[],
  ): number[] {
    if (selectedIds.length === 0) {
      return ids;
    }

    return this.filter(ids, selectedIds, stations);
  }
}
