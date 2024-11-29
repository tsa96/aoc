import '../../lib';

const lines = readLines();

part1(() => {
  const y = lines.length;
  const x = lines[0].length;

  const bits = from(
    x,
    (i) => from(y, (j) => +lines[j][i]).sum() > floor(y / 2)
  ).reverse();

  const g = bits.reduce((a, c, i) => a | ((c ? 1 : 0) << i), 0);
  const e = bits.reduce((a, c, i) => a | ((c ? 0 : 1) << i), 0);
  return g * e;
});

part2(() => {
});
