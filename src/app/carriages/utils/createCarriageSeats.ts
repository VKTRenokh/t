export const createCarriagesSeats = (
  rows: number,
  leftSeatsNumber: number,
  rightSeatsNumber: number,
) => {
  let seatNumber = 1;

  return Array.from({ length: rows }, () => {
    const leftSeats = Array.from(
      { length: leftSeatsNumber },
      () => seatNumber++,
    );

    const rightSeats = Array.from(
      { length: rightSeatsNumber },
      () => seatNumber++,
    );

    return { leftSeats, rightSeats };
  });
};
