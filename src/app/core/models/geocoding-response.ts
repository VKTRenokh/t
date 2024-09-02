export interface NominatimResponse {
  place_id: string;
  osm_type: string;
  osm_id: string;
  /**
   * [south, north, west, east]
   */
  boundingbox: [string, string, string, string];
  lat: string;
  lon: string;
  display_name: string;
  class: string;
  type: string;
  importance: number;
  address: Address;
}

export interface Address {
  city: string;
  state?: string;
  country: string;
  country_code: string;
}
