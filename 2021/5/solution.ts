import '../../lib';

const lines = readLines();
const ranges = lines.map((l) =>
  l.split(' -> ').map((x) => x.split(',').map(Number))
);
const xMax = ranges.flatMap(([[x1, y1], [x2, y2]]) => [x1, x2]).max() + 1;
const yMax = ranges.flatMap(([[x1, y1], [x2, y2]]) => [y1, y2]).max() + 1;
const space: number[][] = from(yMax, (_) => from(xMax).fill(0)) as any;

part1(() => {
  ranges.forEach(([[x1, y1], [x2, y2]]) => {
    if (!(x1 == x2 || y1 == y2)) return;
    for (let x = x1; x <= x2; x++) {
      for (let y = y1; y <= y2; y++) {
        space[y][x]++;
      }
    }
  });
  log(space);
  return space.flat().count((v) => v > 1);
});

part2(() => {
  //
});
