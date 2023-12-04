const cards = require("node:fs")
  .readFileSync("./input.txt")
  .toString()
  .split("\n")
  .map((line) => {
    const items = line.split(/ \| +| +/g);
    return [new Set(items.slice(2, 12)), new Set(items.slice(12))];
  });

let sum = 0;
for (const [A, B] of cards) {
  const wins = [...B].filter((b) => A.has(b)).length;
  if (wins > 0) sum += 1 << (wins - 1);
}

console.log({ sum });
