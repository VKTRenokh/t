import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PostRoute, Route } from '../models/routes.model';

@Injectable({
  providedIn: 'root',
})
export class RoutesService {
  private http = inject(HttpClient);

  public getRoutes() {
    return this.http.get<Route[]>('/api/route');
  }

  public createRoute(route: PostRoute) {
    return this.http.post('/api/route', route);
  }

  public updateRoute(id: number, route: Route) {
    return this.http.put(`/api/route/${id}`, route);
  }

  public deleteRoute(id: number) {
    return this.http.delete(`/api/route/${id}`);
  }
}
