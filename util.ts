import { readFileSync } from "node:fs";

type SolutionFn = () => number;

export function part1(fn: SolutionFn) {
  solution(fn, 1);
}
export function part2(fn: SolutionFn | undefined) {
  if (!fn) return;
  solution(fn, 2);
}

function solution(fn: SolutionFn, part: number) {
  const label = `Part ${part}`;
  console.time(label);
  const solution = fn();
  console.timeEnd(label);
  console.log(`Part ${part} Solution: ${solution}`);
}

export function readInput(): string {
  return readFileSync("./input.txt").toString();
}

/**
 * :)
 */
export function log(...args: unknown[]) {
  return console.log(...args);
}

// prettier-ignore
const alphabetLower = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
// prettier-ignore
const alphabetUpper = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
