export interface GeocodingResponse {
  results: Result[];
  status: Status;
}

export interface Result {
  formatted: string;
  geometry: Geometry;
  components: Components;
}

interface Geometry {
  lat: number;
  lng: number;
}

interface Components {
  city: string;
  state: string;
  country: string;
}

interface Status {
  code: number;
  message: string;
}
