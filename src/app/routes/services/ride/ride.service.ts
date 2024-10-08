import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  Ride,
  Segment,
  SingleRide,
} from '../../models/ride/ride.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RideService {
  private http = inject(HttpClient);

  public getRide(id: string): Observable<Ride> {
    return this.http.get<Ride>(`/api/route/${id}`);
  }

  public createRide(
    routeId: number,
    data: Segment[],
  ): Observable<Ride> {
    return this.http.post<Ride>(
      `/api/route/${routeId}/ride`,
      { segments: data },
    );
  }

  public updateRide(
    routeId: string,
    rideId: number,
    singleRide: SingleRide,
  ) {
    return this.http.put(
      `/api/route/${routeId}/ride/${rideId}`,
      singleRide,
    );
  }

  public deleteRide(routeId: string, rideId: number) {
    return this.http.delete(
      `/api/route/${routeId}/ride/${rideId}`,
    );
  }
}
