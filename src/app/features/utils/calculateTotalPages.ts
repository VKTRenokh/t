export const calculateTotalPages = (
  itemsLength: number,
  itemsCount: number,
) => {
  return Math.ceil(itemsLength / itemsCount);
};
