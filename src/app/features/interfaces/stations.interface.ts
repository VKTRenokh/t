export interface Station {
  city: string;
  latitude: number;
  longitude: number;
  connectedTo: ConnectedCity[];
}
export interface ConnectedCity {
  id: number;
  distance: number;
}
