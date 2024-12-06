import { readFileSync } from 'node:fs';
import path from 'node:path';
import util from 'node:util';
import child_process from 'node:child_process';

// Probably a better way to do globals, whatevs

global.cbcopy = function (input: any) {
  child_process.spawn('clip').stdin.end(util.inspect(input));
};

global.solution = function (fn: SolutionFn, part: string) {
  const t1 = process.hrtime.bigint();

  const solution = fn();
  if (!solution) return;

  const t2 = process.hrtime.bigint();
  log(Number(t2 - t1) / 1e9);
  const timeColor = Number(t2 - t1) / 1e9 < 0.5 ? 'green' : 'red';
  console.log(
    colorize(`Part ${part} `).white +
      colorize(`[${(Number(t2 - t1) / 1e6).toFixed(3)} ms] `)[timeColor] +
      colorize(`[${new Date().toLocaleTimeString()}]`).magenta +
      colorize(': ').white +
      colorize(solution.toString()).yellow
  );

  if (process.env['AOC_CLIPBOARD_COPY'] === '1') {
    cbcopy(solution);
  }
};

global.part1 = function (fn: SolutionFn) {
  solution(fn, '1');
};

global.part2 = function (fn: SolutionFn | undefined) {
  if (!fn) return;
  solution(fn, '2');
};

global.extraSolution = function (fn: SolutionFn | undefined) {
  if (!fn) return;
  solution(fn, 'extra')
};

global.readInput = function (): string {
  return readFileSync(path.join(require.main.path, 'input.txt')).toString();
};

global.readLines = function (): string[] {
  return readInput().trim().split('\n');
};

// lol
global.log = console.log;
global.floor = Math.floor;
global.ceil = Math.ceil;
global.round = Math.round;
global.abs = Math.abs;
global.strfy = JSON.stringify;

// prettier-ignore
global.alphabetLower = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

// prettier-ignore
global.alphabetUpper = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

global.gcd = function (x: number, y: number) {
  return y == 0 ? x : this.gcd(y, x % y);
};

global.lcm = function (x: number, y: number) {
  return (x * y) / this.gcd(x, y);
};

global.range = function (start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

global.from = function <T>(length: number, mapFn?: (i: number) => T): T[] {
  if (mapFn) {
    const array: T[] = new Array(length);
    for (let i = 0; i < length; i++) {
      array[i] = mapFn(i);
    }
    return array;
  } else {
    return Array.from({ length });
  }
};

global.match = function <T>(
  key: string | number,
  matcher: Record<string, T | Function>
) {
  const value = matcher[key];
  if (value instanceof Function) {
    return value();
  } else {
    return value;
  }
};

global.min = function (arr: number[]) {
  return Math.min(...arr);
};

global.max = function (arr: number[]) {
  return Math.max(...arr);
};

global.sum = function (arr: number[]) {
  return arr.reduce((acc, n) => acc + n, 0);
};

global.product = function (arr: number[]) {
  return arr.reduce((acc, n) => acc * n, 1);
};

Array.prototype.last = function () {
  return this.at(-1);
};

Array.prototype.sum = function () {
  return sum(this);
};

Array.prototype.product = function () {
  return product(this);
};

Array.prototype.min = function () {
  return min(this);
};

Array.prototype.max = function () {
  return max(this);
};

Array.prototype.max = function () {
  return max(this);
};

Array.prototype.count = function (fn): number {
  return this.filter(fn).length;
};

global.colorize = function (str: string) {
  return {
    black: `\x1b[30m${str}`,
    red: `\x1b[31m${str}`,
    green: `\x1b[32m${str}`,
    yellow: `\x1b[33m${str}`,
    blue: `\x1b[34m${str}`,
    magenta: `\x1b[35m${str}`,
    cyan: `\x1b[36m${str}`,
    white: `\x1b[37m${str}`,
    bgBlack: `\x1b[40m${str}\x1b[0m`,
    bgRed: `\x1b[41m${str}\x1b[0m`,
    bgGreen: `\x1b[42m${str}\x1b[0m`,
    bgYellow: `\x1b[43m${str}\x1b[0m`,
    bgBlue: `\x1b[44m${str}\x1b[0m`,
    bgMagenta: `\x1b[45m${str}\x1b[0m`,
    bgCyan: `\x1b[46m${str}\x1b[0m`,
    bgWhite: `\x1b[47m${str}\x1b[0m`
  };
};

global.memoize = function (fn): any {
  const map = new Map();

  return (...args: any[]) => {
    const key = JSON.stringify(args);

    if (map.has(key)) {
      return map.get(key);
    }

    const result = fn(...args);
    map.set(key, result);
    return result;
  };
};

// Slow, stupid, whatever
global.enc = function (...args: unknown[]) {
  return JSON.stringify(args);
}