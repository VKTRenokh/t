import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Route } from '../../models/route/route.model';
import { CreateRoute } from '../../models/create-route/create-route.model';

@Injectable({
  providedIn: 'root',
})
export class RoutesService {
  private http = inject(HttpClient);

  public get() {
    return this.http.get<Route[]>('/api/route');
  }

  public create(data: CreateRoute) {
    return this.http.post('/api/route', data);
  }
}
