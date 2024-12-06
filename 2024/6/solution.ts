import '../../lib';

const input = readLines().map((line) => line.split(''));

const XLen = input[0].length;
const YLen = input.length;
const XDirs = [0, 1, 0, -1];
const YDirs = [-1, 0, 1, 0];

function findStart() {
  for (let x = 0; x < XLen; x++) {
    for (let y = 0; y < YLen; y++) {
      if (input[y][x] == '^') {
        return [x, y];
      }
    }
  }
}

part1(() => {
  const grid = structuredClone(input);

  let [x, y] = findStart();
  let dir = 0;

  while (true) {
    const nx = x + XDirs[dir];
    const ny = y + YDirs[dir];

    if (nx < 0 || ny < 0 || nx >= XLen || ny >= YLen) {
      break;
    }

    if (grid[ny][nx] == '#') {
      dir = (dir + 1) % 4;
    } else {
      x = nx;
      y = ny;
      grid[y][x] = 'X';
    }
  }

  return grid.flat().count((char) => char == 'X');
});

part2(() => {
  function loops(cx, cy) {
    const grid: any[][] = structuredClone(input);

    if (grid[cy][cx] != '.') {
      return false;
    }

    grid[cy][cx] = '#';

    let dir = 0;
    let [x, y] = findStart();

    while (true) {
      const nx = x + XDirs[dir];
      const ny = y + YDirs[dir];

      if (nx < 0 || ny < 0 || nx >= XLen || ny >= YLen) {
        return false;
      }

      const spot = grid[ny][nx];
      const enc = 1 << dir;
      if (spot == '#') {
        dir = (dir + 1) % 4;
      } else if (typeof spot != 'string' && spot & enc) {
        return true;
      } else {
        x = nx;
        y = ny;
        // doing it this way is so stupid but i find it funny
        grid[y][x] = enc | (typeof spot == 'string' ? 0 : spot);
      }
    }
  }

  let sum = 0;
  for (let x = 0; x < XLen; x++) {
    for (let y = 0; y < YLen; y++) {
      if (loops(y, x)) {
        sum++;
      }
    }
  }

  return sum;
});
