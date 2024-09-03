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

export interface UpdateRide {
  routeId: string;
  rideId: number;
  singleRide: SingleRide;
}

export interface EditingState {
  time: boolean;
  price: boolean;
}

export type TempRideData = Record<
  number,
  {
    segments: {
      price: Record<string, number>;
      time: string[];
    }[];
  }
>;