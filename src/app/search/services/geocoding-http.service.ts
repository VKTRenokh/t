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
    const isTownExist = town || '';
    const apiUrlVideos = `${this.basePath}?q=${isTownExist}&format=json&addressdetails=1`;

    return this.httpClient.get<NominatimResponse[]>(
      apiUrlVideos,
    );
  }
}
