import {
  LeafletMouseEvent,
  type LatLngTuple,
} from 'leaflet';

export const getLatAndLng = (
  event: LeafletMouseEvent,
): LatLngTuple => [event.latlng.lat, event.latlng.lng];
