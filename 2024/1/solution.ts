import '../../lib';

const lines = readLines();

part1(() => {
  const nums = lines.map((l) => l.split('  ')).map(([a, b]) => [+a, +b]);

  const A = nums.map(([a]) => a).sort();
  const B = nums.map(([, b]) => b).sort();

  return A.map((val, i) => Math.abs(B[i] * val)).sum();
});

part2(() => {
  const nums = lines.map((l) => l.split('  ')).map(([a, b]) => [+a, +b]);
  const B = nums.map(([, b]) => b);

  return nums
    .map(([a]) => a * nums.map(([, b]) => b).count((b) => b == a))
    .sum();
});
