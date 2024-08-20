import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs';
import { GeocodingResponse } from '../../core/models/geocoding-response';

@Injectable({
  providedIn: 'root',
})
export class GeocodingHttpService {
  private httpClient = inject(HttpClient);

  public getTowns(
    town: string,
  ): Observable<GeocodingResponse> {
    const apiUrlVideos = `${environment.geocodingBasePath}?q=${town}&key=${environment.key}`;

    return this.httpClient.get<GeocodingResponse>(
      apiUrlVideos,
    );
  }
}
