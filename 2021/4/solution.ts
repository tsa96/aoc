import '../../lib';

const [numbers, ...rest] = readInput().split('\n\n');

interface Item {
  value: number;
  hit: boolean;
}

class Board {
  // prettier-ignore
  // 1  2  3  4  5
  // 6  7  8  9  10
  // 11 12 13 14 15
  // 16 17 18 19 20
  // 21 22 23 24 25
  static runs = [
    [1,   2,   3,   4,   5],
    [6,   7,   8,   9,   10],
    [11,  12,  13,  14,  15],
    [16,  17,  18,  19,  20],
    [21,  22,  23,  24,  25],
    [1,   6,   11,  16,  21],
    [2,   7,   12,  17,  22],
    [3,   8,   13,  18,  23],
    [4,   9,   14,  19,  24],
    [5,   10,  15,  20,  25],
    // Didn't realise I wasn't supposed to use these lmao
    // [1,   7,   13,  19,  25],
    // [5,   9,   13,  17,  21]
  ];
  items: Item[];

  constructor(str: string) {
    this.items = str.split('\n').flatMap((row) =>
      row
        .replace(/ +/g, ' ')
        .replace(/^ /g, '')
        .split(' ')
        .map((value) => ({ value: Number(value), hit: false }))
    );
  }

  draw(val: number): void {
    for (const item of this.items) {
      if (item.value == val) {
        item.hit = true;
      }
    }
  }

  won(): boolean {
    return Board.runs.some((arr) => arr.every((i) => this.items[i - 1].hit));
  }
}

part1(() => {
  const boards = rest.map((str) => new Board(str));
  for (const num of numbers.split(',').map(Number)) {
    for (const board of boards) {
      board.draw(num);
      if (board.won()) {
        const sum = board.items
          .filter(({ hit }) => !hit)
          .map(({ value }) => value)
          .sum();
        return num * sum;
      }
    }
  }
});

part2(() => {
  const boards = rest.map((str) => new Board(str));
  const nums = numbers.split(',').map(Number);
  while (true) {
    let num = nums.shift();
    for (const board of boards) {
      board.draw(num);
    }

    const numBoards = rest.length;
    const numWon = boards.count((board) => board.won());
    if (numWon == numBoards - 1) {
      const lastToWin = boards.find((board) => !board.won());

      while (!lastToWin.won()) {
        num = nums.shift();
        lastToWin.draw(num);
      }

      return (
        num *
        lastToWin.items
          .filter(({ hit }) => !hit)
          .map(({ value }) => value)
          .sum()
      );
    }
  }
});
