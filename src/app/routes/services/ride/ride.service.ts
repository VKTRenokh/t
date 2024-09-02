import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  Ride,
  SingleRide,
} from '../../models/ride/ride.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RideService {
  private http = inject(HttpClient);

  public getRide(id: number): Observable<Ride> {
    return this.http.get<Ride>(`/api/route/${id}`);
  }

  public createRide(
    routeId: number,
    rideData: SingleRide,
  ): Observable<Ride> {
    return this.http.post<Ride>(
      `/api/route/${routeId}/ride`,
      rideData,
    );
  }

  public updateRide(
    routeId: number,
    rideId: number,
    rideData: SingleRide,
  ): Observable<Ride> {
    return this.http.put<Ride>(
      `/api/route/${routeId}/ride/${rideId}`,
      rideData,
    );
  }

  public deleteRide(
    routeId: number,
    rideId: number,
  ): Observable<void> {
    return this.http.delete<void>(
      `/api/route/${routeId}/ride/${rideId}`,
    );
  }
}
