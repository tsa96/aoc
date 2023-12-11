const fs = require("node:fs");

const gameLines = fs.readFileSync("./input.txt").toString().split("\n");

const games = {};

for (let line of gameLines) {
  line = line.replaceAll(/:|,|;|[\n\r]*/g, "");
  const words = line.split(" ");
  const gameID = words[1];
  const items = words.slice(2);
  const colors = { green: 0, blue: 0, red: 0 };

  for (let i = 0; i < items.length; i += 2) {
    const count = +items[i];
    const type = items[i + 1];
    if (colors[type] < count) colors[type] = count;
  }
  games[gameID] = colors;
}

let sum = 0;
for (const [gameID, { red, green, blue }] of Object.entries(games)) {
  const pass = red <= 12 && green <= 13 && blue <= 14;
  if (pass) {
    sum += +gameID;
  }
  console.log({ gameID, red, green, blue, pass, sum });
}

console.log(sum);
