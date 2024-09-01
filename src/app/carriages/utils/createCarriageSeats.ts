const MAX_ROWS_COUNT = 20;

const MAX_SEATS_COUNT = 4;

export const createCarriagesSeats = (
  rows: number,
  leftSeatsNumber: number,
  rightSeatsNumber: number,
) => {
  let seatNumber = 1;

  const generateSeats = (
    seatCount: number,
    maxCount: number,
  ) =>
    Array.from(
      {
        length: seatCount > maxCount ? maxCount : seatCount,
      },
      () => seatNumber++,
    );

  return Array.from(
    {
      length: rows > MAX_ROWS_COUNT ? MAX_ROWS_COUNT : rows,
    },
    () => ({
      leftSeats: generateSeats(
        leftSeatsNumber,
        MAX_SEATS_COUNT,
      ),
      rightSeats: generateSeats(
        rightSeatsNumber,
        MAX_SEATS_COUNT,
      ),
    }),
  );
};
