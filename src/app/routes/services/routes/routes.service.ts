import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Route } from '../../models/route/route.model';

@Injectable({
  providedIn: 'root',
})
export class RoutesService {
  private http = inject(HttpClient);

  public get() {
    return this.http.get<Route[]>('/api/route');
  }
}
