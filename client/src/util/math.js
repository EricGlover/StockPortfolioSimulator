export const decimalFloor = n => {
  let int = Math.trunc(n * 100);
  int /= 100;
  return int;
};
