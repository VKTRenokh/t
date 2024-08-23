export interface ConnectedTo {
  id: string;
  distance: number;
}

export interface Station {
  id: string;
  city: string;
  latitude: number;
  longitude: number;
  connectedTo: ConnectedTo[];
}
