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
  private readonly basePath = environment.geocodingBasePath;

  public getTowns(
    town: string,
  ): Observable<GeocodingResponse> {
    const apiUrlVideos = `${this.basePath}?q=${town}&key=${environment.key}`;
    console.log('negr');

    return this.httpClient.get<GeocodingResponse>(
      apiUrlVideos,
    );
  }
}
