import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Search } from '../../models/search/search.model';

export type LatLngStringTuple = [string, string];

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private path = '/api/search';
  private http = inject(HttpClient);

  public search(
    from: LatLngStringTuple,
    to: LatLngStringTuple,
    time: number,
  ) {
    return this.http.get<Search>(
      `${this.path}?fromLatitude=${from[0]}&fromLongitude=${from[1]}&toLatitude=${to[0]}&toLongitude=${to[1]}&time=${time}`,
    );
  }
}
