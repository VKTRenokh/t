import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stationIdToName',
  standalone: true
})
export class StationIdToNamePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
