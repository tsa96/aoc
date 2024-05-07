import { part1, readInput, log, part2 } from "../../util";

const input = readInput();

part1(() => {
  return input
    .split("\n\n")
    .map((elf) =>
      elf
        .split("\n")
        .map((line) => +line)
        .reduce((a, c) => a + c, 0)
    )
    .sort((a, b) => a - b)
    .at(-1);
});

part2(() => {
  return input
    .split("\n\n")
    .map((elf) =>
      elf
        .split("\n")
        .map((line) => +line)
        .reduce((a, c) => a + c, 0)
    )
    .sort((a, b) => a - b)
    .slice(-3)
    .reduce((a, c) => a + c, 0);
});
