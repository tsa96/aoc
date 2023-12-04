const cards = require("node:fs")
  .readFileSync("./input.txt")
  .toString()
  .split("\n")
  .map((line) => {
    const items = line.split(/ \| +| +/g);
    return [items.slice(2, 12), items.slice(12)]; // Don't seem to have any duplicates
  });

const getWins = ([A, B]) => B.filter((b) => A.includes(b)).length; // Just intersection!

//array of indices into `cards`
const cardTracker = cards.map((_, i) => i);

for (let i = 0; i < cardTracker.length; i++) {
  const cardIndex = cardTracker[i];
  const card = cards[cardIndex];
  const wins = getWins(card);
  if (wins == 0) continue;
  for (let j = 1; j <= wins; j++) {
    cardTracker.push(cardIndex + j);
  }
}

console.log(cardTracker.length);
