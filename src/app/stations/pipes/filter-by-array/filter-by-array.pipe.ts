import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByArray',
  standalone: true,
})
export class FilterByArrayPipe implements PipeTransform {
  public transform<T>(value: T[], array: T[]): T[] {
    return value.filter(value => !array.includes(value));
  }
}
