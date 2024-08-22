import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs';
import { NominatimResponse } from '../../core/models/geocoding-response';

@Injectable({
  providedIn: 'root',
})
export class GeocodingHttpService {
  private httpClient = inject(HttpClient);
  private readonly basePath = environment.geocodingBasePath;

  public getTowns(
    town: NominatimResponse | null,
  ): Observable<NominatimResponse[]> {
    const isTown = town ? town : '';
    const apiUrlVideos = `${this.basePath}?q=${isTown}&format=json&addressdetails=1`;

    return this.httpClient.get<NominatimResponse[]>(
      apiUrlVideos,
    );
  }
}
