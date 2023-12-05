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

const locations = seeds
  .map((seed) => {
    for (const m of maps) {
      const { dest, source, range } = m.find(({ source }) => seed >= source);
      seed = seed - source > range ? seed : dest - source + seed;
    }
    return seed;
  })
  .sort((a, b) => a - b);
  
console.log(locations);
