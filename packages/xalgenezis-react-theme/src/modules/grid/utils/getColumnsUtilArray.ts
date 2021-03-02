export default (columns: number, columnUnit: number): number[] => {
  const arr: number[] = [];

  for (let i = 1; i <= columns; ++i) arr.push(columnUnit * i);

  return arr;
};
