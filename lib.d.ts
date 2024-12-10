declare type SolutionFn = () => number | void;
declare function cbcopy(input: any): void;
declare function solution(fn: SolutionFn, part: string): void;
declare function part1(fn: SolutionFn): void;
declare function part2(fn: SolutionFn | undefined): void;
declare function readInput(): string;
declare function readLines(): string[];
declare function log(...params: Parameters<typeof console.log>): void;
declare function logp(...params: Parameters<typeof console.log>): void;
declare function strfy(...params: Parameters<typeof JSON.stringify>): void;
declare function floor(n: number): number;
declare function ceil(n: number): number;
declare function round(n: number): number;
declare function abs(n: number): number;
declare function gcd(x: number, y: number): number;
declare function lcm(x: number, y: number): number;
declare function range(start: number, end: number): number[];
declare function from<T>(length: number, mapFn?: (i: number) => T): T[];
declare function match<T>(
  key: string | number,
  matcher: Record<string, T | Function>
): T;
declare function min(...arr: number[]): number;
declare function max(...arr: number[]): number;
declare function sum(...arr: number[]): number;
declare function product(...arr: number[]): number;
declare function memoize<T extends Function>(fn: T): T;
declare function enc(...args: any[]): string;
declare function pairs<T>(arr: T[]): Generator<[T, T]>;

// Set than stringifies all values
declare class HashSet extends Set<any> {
  override add(value: any): this;
  override delete(value: any): boolean;
  override has(value: any): boolean;
}

// Map that stringifies all keys
declare class HashMap extends Map<any, any> {
  override set(key: any, value: any): this;
  override get(key: any): any;
  override delete(key: any): boolean;
  override has(key: any): boolean;
}

// prettier-ignore
declare type Colors =
  'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white' |
  'bgBlack' | 'bgRed' | 'bgGreen' | 'bgYellow' | 'bgBlue' | 'bgMagenta' | 'bgCyan' | 'bgWhite';
declare function colorize(str: string): Record<Colors, string>;

// I finally get to use PROTOTYPES for once!!!!
interface Array<T> {
  last(): T;
  product(): number;
  sum(): number;
  min(): number;
  max(): number;
  count(...params: Parameters<typeof Array.prototype.filter>): number;
  swap(a: number, b: number): void;
  unique(): T;
}

declare type vec2 = [number, number];
declare type vec3 = [number, number];
