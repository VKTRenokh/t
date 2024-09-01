import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LatLng } from 'leaflet';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private path = '/api/search';
  private http = inject(HttpClient);

  public search(from: LatLng, to: LatLng, time: Date) {
    //return this.http.get(this.path, {params:});
  }
}
