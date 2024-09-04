export const calculateTotalPages = (
  itemsLength: number,
  itemsCount: number,
) => Math.ceil(itemsLength / itemsCount);
