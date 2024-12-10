import '../../lib';

const grid = readLines().map((line) => line.split('').map(Number));
const len = grid.length;
const xDirs = [1, 0, -1, 0];
const yDirs = [0, 1, 0, -1];

const zeros = [];
for (let y = 0; y < len; y++) {
  for (let x = 0; x < len; x++) {
    if (grid[y][x] == 0) {
      zeros.push([x, y]);
    }
  }
}

function* search(x: number, y: number, height: number): Generator<vec2> {
  for (let i = 0; i < 4; i++) {
    const [nx, ny] = [x + xDirs[i], y + yDirs[i]];

    if (nx < 0 || ny < 0 || nx >= len || ny >= len) continue;

    const val = grid[ny][nx];
    if (height == 8 && val == 9) {
      yield [nx, ny];
    } else if (val == height + 1) {
      yield* search(nx, ny, val);
    }
  }
}

part1(() =>
  zeros
    .map(
      ([x, y]) =>
        search(x, y, 0)
          .toArray()
          .map((x) => enc(x))
          .unique().length
    )
    .sum()
);

part2(() => zeros.map(([x, y]) => search(x, y, 0).toArray().length).sum());
