export const createCarriagesSeats = (
  rows: number,
  leftSeatsNumber: number,
  rightSeatsNumber: number,
) => {
  let seatNumber = 1;

  return Array.from(
    { length: rows > 20 ? 20 : rows },
    () => {
      const leftSeats = Array.from(
        {
          length: leftSeatsNumber > 4 ? 4 : leftSeatsNumber,
        },
        () => seatNumber++,
      );

      const rightSeats = Array.from(
        {
          length:
            rightSeatsNumber > 4 ? 4 : rightSeatsNumber,
        },
        () => seatNumber++,
      );

      return { leftSeats, rightSeats };
    },
  );
};
