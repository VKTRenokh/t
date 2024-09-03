type OrderStatus =
  | 'active'
  | 'completed'
  | 'rejected'
  | 'canceled';

export interface ScheduleSegment {
  time: [string, string];
  price: Record<number, number>;
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
}

export type OrdersResponse = Order[];
