import { part1, part2, readInput, log } from "../../util";

const input = readInput();

part1(() => {
  const thing = {
    A: {
      X: 3,
      Y: 6,
      Z: 0
    },
    B: {
      X: 0,
      Y: 3,
      Z: 6
    },
    C: {
      X: 6,
      Y: 0,
      Z: 3
    }
  };

  let sum = 0;
  for (const line of input.split("\n")) {
    const [l, r] = line.split(" ");
    sum += thing[l][r];
    sum += r == "X" ? 1 : r == "Y" ? 2 : 3;
  }
  return sum;
});

// part 2 TODO 

