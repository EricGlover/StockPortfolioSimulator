//floor to second decimal place
//Note: JS is not good with signif digits
const decimalFloor = n => {
  let int = Math.trunc(n * 100);
  int /= 100;
  return int;
};
const test = () => {
  console.log(decimalFloor(100.111));
  console.log(decimalFloor(100));
  console.log(decimalFloor(100.9));
};
test();
