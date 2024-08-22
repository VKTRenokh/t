import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StationsService {
  private http = inject(HttpClient);

  public get() {
    return this.http.get('/api/station');
  }
}
