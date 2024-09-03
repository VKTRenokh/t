import { inject, Pipe, PipeTransform } from '@angular/core';
import { StationsFacade } from '../../../state/facades/stations.facade';

@Pipe({
  name: 'stationIdToName',
  standalone: true,
})
export class StationIdToNamePipe implements PipeTransform {
  private stations = inject(StationsFacade).stations;

  public transform(id: number): string | void {
    return this.stations()?.find(
      station => station.id === id,
    )?.city;
  }
}
