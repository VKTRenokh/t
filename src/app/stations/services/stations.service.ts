import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Station } from '../interfaces/stations.interface';

@Injectable({
  providedIn: 'root',
})
export class StationsService {
  private httpClient = inject(HttpClient);

  public getStations() {
    return this.httpClient.get<Station[]>('/api/station');
  }

  public deleteStation(id: number) {
    return this.httpClient.delete(`/api/station/${id}`);
  }
}
