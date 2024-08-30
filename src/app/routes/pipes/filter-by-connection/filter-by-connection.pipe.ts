import { Pipe, PipeTransform } from '@angular/core';
import { Station } from '../../../stations/models/station/station.model';

@Pipe({
  name: 'filterByConnection',
  standalone: true,
})
export class FilterByConnectionPipe
  implements PipeTransform
{
  public transform(
    ids: number[],
    selectedIds: number[],
    stations: Station[],
  ): number[] {
    if (selectedIds.length === 0) {
      return ids;
    }

    const lastSelectedId =
      selectedIds[selectedIds.length - 1];

    const lastSelectedStation = stations.find(
      station => station.id === lastSelectedId,
    );

    if (!lastSelectedStation) {
      return [];
    }

    const connectedStationIds =
      lastSelectedStation.connectedTo.map(
        connection => connection.id,
      );

    return ids.filter(id =>
      connectedStationIds.includes(id),
    );
  }
}
