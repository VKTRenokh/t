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

  public getAddress(
    address: string | NominatimResponse | null,
  ): Observable<NominatimResponse[]> {
    const apiUrlVideos = `${this.basePath}?q=${address || ''}&format=json&addressdetails=1`;

    return this.httpClient.get<NominatimResponse[]>(
      apiUrlVideos,
    );
  }
}
