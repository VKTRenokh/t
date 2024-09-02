export interface Segment {
  time: [string, string];
  price: Record<string, number>;
}

export interface SingleRide {
  rideId: number;
  segments: Segment[];
}

export interface Ride {
  id: number;
  path: number[];
  carriages: string[];
  schedule: SingleRide[];
}
