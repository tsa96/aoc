import { readFileSync } from "node:fs";

const input: string[][] = readFileSync("./13/input.txt")
  .toString()
  .split("\n\n")
  .map((line: string) => line.split("\n"));

type Symmetry = ["r" | "c", number];

const findSymmetry = (
  pattern: string[],
  ignoreSym?: Symmetry
): Symmetry | undefined => {
  const ignore = ignoreSym?.join(",");
  for (const [dir, line] of [
    pattern,
    Array.from({ length: pattern[0].length }, (_, i) =>
      Array.from({ length: pattern.length }, (_, j) => pattern[j][i]).join("")
    )
  ].entries()) {
    for (let i = 0; i < line.length; i++) {
      const k = i + 1;
      const [l, r] =
        k < line.length / 2
          ? [line.slice(0, k), line.slice(k, k * 2)]
          : [line.slice(2 * k - line.length, k), line.slice(k, line.length)];
      if (l.join() == r.reverse().join() && l.length && r.length) {
        const sym = [dir == 0 ? "r" : "c", k] as Symmetry;
        if (!ignore || sym.join(",") != ignore) return sym;
      }
    }
  }
};

console.log(
  input
    .map((pattern) => {
      const original = findSymmetry(pattern);
      for (let i = 0; i < pattern.length; i++) {
        for (let j = 0; j < pattern[0].length; j++) {
          const newPattern = structuredClone(pattern);
          const row = [...newPattern[i]];
          row[j] = newPattern[i][j] == "#" ? "." : "#";
          newPattern[i] = row.join("");
          const sym = findSymmetry(newPattern, original);
          if (sym) {
            const [dir, line] = sym;
            return dir == "r" ? line * 100 : line;
          }
        }
      }
    })
    .reduce((a, c) => a + c, 0)
);
