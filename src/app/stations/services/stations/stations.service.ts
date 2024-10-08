import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Station } from '../../models/station/station.model';
import { PostStation } from '../../models/post-station/post-station.model';

@Injectable({
  providedIn: 'root',
})
export class StationsService {
  private http = inject(HttpClient);

  public get() {
    return this.http.get<Station[]>('/api/station');
  }

  public createStation(station: PostStation) {
    return this.http.post('/api/station', station);
  }

  public getStations() {
    return this.http.get<Station[]>('/api/station');
  }

  public deleteStation(id: number) {
    return this.http.delete(`/api/station/${id}`);
  }
}
