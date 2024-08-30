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
    stations: Station[],
  ): number[] {
    return ids;
  }
}
