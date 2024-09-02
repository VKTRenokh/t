import { Route } from '@angular/router';

export interface SearchGeolocation {
  latitude: number;
  longitude: number;
}

export interface SearchStation {
  stationId: number;
  city: string;
  geolocation: SearchGeolocation;
}

export interface Search {
  routes: Route[];
  from: SearchStation;
  to: SearchStation;
}
