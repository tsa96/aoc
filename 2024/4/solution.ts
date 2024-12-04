import '../../lib';

const grid = readLines().map((line) => line.split(''));
const len = grid.length;

part1(() => {
  let sum = 0;
  const searches = [
    [ [0, 0], [0, 1], [0, 2], [0, 3] ],
    [ [0, 0], [1, 0], [2, 0], [3, 0] ],
    [ [0, 0], [1, 1], [2, 2], [3, 3] ],
    [ [0, 3], [1, 2], [2, 1], [3, 0] ],
    [ [0, 3], [0, 2], [0, 1], [0, 0] ],
    [ [3, 0], [2, 0], [1, 0], [0, 0] ],
    [ [3, 3], [2, 2], [1, 1], [0, 0] ],
    [ [3, 0], [2, 1], [1, 2], [0, 3] ],
  ];

  for (let y = 0; y < len; y++) {
    for (let x = 0; x < len; x++) {
      searches.forEach(([[x1, y1], [x2, y2], [x3, y3], [x4, y4]]) => {
        if (
          grid[y + y1]?.[x + x1] == 'X' &&
          grid[y + y2]?.[x + x2] == 'M' &&
          grid[y + y3]?.[x + x3] == 'A' &&
          grid[y + y4]?.[x + x4] == 'S'
        ) {
          sum++;
        }
      });
    }
  }

  return sum;
});

part2(() => {
  let sum = 0;

  for (let y = 0; y < len; y++) {
    for (let x = 0; x < len; x++) {
      const a = grid[y]?.[x];
      const b = grid[y]?.[x + 2];
      const c = grid[y + 2]?.[x];
      const d = grid[y + 2]?.[x + 2];
      const Ms = [a, b, c, d].count((n) => n == 'M');
      const Ss = [a, b, c, d].count((n) => n == 'S');
      if (grid[y + 1]?.[x + 1] == 'A' && Ms == 2 && Ss == 2 && a != d && b) {
        sum++;
      }
    }
  }

  return sum;
});
