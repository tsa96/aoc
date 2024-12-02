import '../../lib';

part1(() => {
  const fishes = readInput().split(',').map(Number);

  for (let i = 0; i < 80; i++) {
    const len = fishes.length;
    for (let j = 0; j < len; j++) {
      if (fishes[j] == 0) {
        fishes[j] = 6;
        fishes.push(8);
      } else {
        fishes[j]--;
      }
    }
  }

  return fishes.length;
});

part2(() => {
  // AAAAA TOO TIRED
  const fishes = readInput().split(',').map(Number);

  for (let i = 0; i < 60; i++) {
    const len = fishes.length;
    for (let j = 0; j < len; j++) {
      if (fishes[j] == 0) {
        fishes[j] = 6;
        fishes.push(8);
      } else {
        fishes[j]--;
      }
    }
    // log(fishes.join(' ') + '\n');
  }

  return fishes.length;
});
