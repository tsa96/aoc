declare type SolutionFn = () => number | void;
declare function cbcopy(input: any): void;
declare function solution(fn: SolutionFn, part: number): void;
declare function part1(fn: SolutionFn): void;
declare function part2(fn: SolutionFn | undefined): void;
declare function readInput(): string;
declare function readLines(): string[];
declare function log(...params: Parameters<typeof console.log>): void;
declare function floor(n: number): number;
declare function ceil(n: number): number;
declare function round(n: number): number;
declare function gcd(x: number, y: number): number;
declare function lcm(x: number, y: number): number;
declare function range(start: number, end: number): number[];
declare function from<T>(length: number, mapFn?: (i: number) => T): T[];
declare function match<T>(
  key: string | number,
  matcher: Record<string, T | Function>
): T;
declare function min(arr: number[]): number;
declare function max(arr: number[]): number;
declare function sum(arr: number[]): number;
declare function product(arr: number[]): number;

// I finally get to use PROTOTYPES for once!!!!
interface Array<T> {
  last(): T;
  product(): number;
  sum(): number;
  min(): number;
  max(): number;
  count(...params: Parameters<typeof Array.prototype.filter>): number;
}
