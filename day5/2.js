const input = require("node:fs").readFileSync("./input.txt").toString();

const seeds = /(?<=^seeds\: )[\d ]+(?=$)/m
  .exec(input)[0]
  .split(" ")
  .map(Number);

const maps = input
  .split(":")
  .slice(2)
  .map(
    (section) =>
      /(?<=\n)[\d+ \d+ \d+\n]+(?=\n)/
        .exec(section)[0]
        .split("\n")
        .slice(0, -1)
        .map((line) => line.split(" ").map(Number))
        .map(([dest, source, range]) => ({ dest, source, range }))
        .sort(({ source: s1 }, { source: s2 }) => s2 - s1) // desc
  );

function findSource(seed, map) {
  for (let i = 0; i < map.length; i++) {
    if (seed >= map[i].source) return map[i];
  }
  return 0; // Can't be good
}

function findLocation(seed) {
  for (const m of maps) {
    const { dest, source, range } = findSource(seed, m);
    seed = seed - source > range ? seed : dest - source + seed;
  }
  return seed;
}

let min = findLocation(seeds[0]);
for (const [i, seed] of seeds.entries()) {
  if (i % 2) continue;
  console.log({ seed, min });
  for (let j = seed; j < seed + seeds[i + 1]; j++) {
    const location = findLocation(j);
    if (location < min) min = location;
  }
}

console.log(min);

// This works - extremely annoyed that a brute-force approach worked! I can't immediately 
// see why the value is what it was, will look at it again later...