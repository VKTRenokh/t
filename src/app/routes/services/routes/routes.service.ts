import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RoutesService {
  private http = inject(HttpClient);

  public get() {
    // FIXME: add route model
    return this.http.get<any[]>('/api/route');
  }
}
