import '../../lib';

const grid = readLines().map((x) => x.split(''));
const len = grid.length;
const regions: Record<number, { char: string; points: vec2[] }> = {};
const seen = new HashSet();

function recurseRegion(x: number, y: number, c: string, id: number) {
  for (const [xo, yo] of XYDirs) {
    const [nx, ny] = [x + xo, y + yo];

    if (seen.has([nx, ny])) continue;

    if (grid[ny]?.[nx] != c) continue;

    regions[id].points.push([nx, ny]);

    seen.add([nx, ny]);

    recurseRegion(nx, ny, c, id);
  }
}

function test(x, y, char) {
  return grid[y]?.[x] == char;
}

for (let y = 0; y < len; y++) {
  for (let x = 0; x < len; x++) {
    if (seen.has([x, y])) continue;

    const id = makeID();
    const c = grid[y][x];

    regions[id] = { char: c, points: [[x, y]] };

    seen.add([x, y]);

    recurseRegion(x, y, c, id);
  }
}

part1(() => {
  return Object.values(regions)
    .map(({ char, points }) => {
      const area = points.length;

      const perim = points.flatMap(([x, y]) =>
        XYDirs.filter(([xo, yo]) => !test(x + xo, y + yo, char))
      ).length;

      return area * perim;
    })
    .sum();
});

part2(() => {
  return Object.values(regions)
    .map(({ char, points }) => {
      const area = points.length;

      const perim = points.flatMap(([x, y]) =>
        XYDirs.filter(([xo, yo]) => !test(x + xo, y + yo, char)).map(
          ([xo, yo]) => [x, xo, y, yo]
        )
      );

      const sides = perim.filter(([x, xo, y, yo]) => {
        if (yo == 0) return !perim.find(([a, , b]) => x == a && y == b - 1);
        if (xo == 0) return !perim.find(([a, , b]) => x == a - 1 && y == b);
      }).length;

      // Not right!
      // My idea is to filter out any perimeter line segments that have another
      // segment directly above / to the left. Really tired, making a lot of stupid mistakes
      // figure out a reliable way to debug and probs easy to finish
      log({ area, sides, char });
      return area * sides;
    })
    .sum();
});
