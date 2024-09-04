import { tileLayer as createTileLayer } from 'leaflet';

const mapApi =
  'https://tile.openstreetmap.org/{z}/{x}/{y}.png';

export const tileLayer = () =>
  createTileLayer(mapApi, {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  });
