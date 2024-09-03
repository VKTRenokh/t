type OrderStatus =
  | 'active'
  | 'completed'
  | 'rejected'
  | 'canceled';

export interface ScheduleSegment {
  time: [string, string];
  price: Record<string, number>;
}

export interface Order {
  id: number;
  rideId: number;
  routeId: number;
  seatId: number;
  userId: number;
  status: OrderStatus;
  path: number[];
  carriages: string[];
  schedule: {
    segments: ScheduleSegment[];
  };
  stationStart: number;
  stationEnd: number;
}

export type OrdersResponse = Order[];
