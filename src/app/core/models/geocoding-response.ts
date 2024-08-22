export interface NominatimResponse {
  place_id: string;
  osm_type: string;
  osm_id: string;
  boundingbox: [string, string, string, string]; // [south, north, west, east]
  lat: string;
  lon: string;
  display_name: string;
  class: string;
  type: string;
  importance: number;
  address: Address;
}

interface Address {
  city: string;
  state?: string;
  country: string;
  country_code: string;
}
