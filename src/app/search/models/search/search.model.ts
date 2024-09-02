import { Route } from '../../../routes/models/route/route.model';

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
