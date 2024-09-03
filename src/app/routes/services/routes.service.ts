import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PostRoute, Route } from '../models/routes.model';

@Injectable({
  providedIn: 'root',
})
export class RoutesService {
  private http = inject(HttpClient);

  public get() {
    return this.http.get<Route[]>('/api/route');
  }

  public create(route: PostRoute) {
    return this.http.post('/api/route', route);
  }

  public update(id: number, route: PostRoute) {
    return this.http.put(`/api/route/${id}`, route);
  }

  public delete(id: number) {
    return this.http.delete(`/api/route/${id}`);
  }
}
