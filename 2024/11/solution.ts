import '../../lib';

const input = readInput().split(' ').map(Number);

part1(() => {
  // Pretty sure they don't want you to brute this in part 2...
  let arr = [...input];
  for (let i = 0; i < 25; i++) {
    let next: number[] = [];
    for (const e of arr) {
      if (e == 0) {
        next.push(1);
        continue;
      }

      const str = e.toString();
      const len = str.length;
      if (len % 2 == 0) {
        next.push(
          Number(str.slice(0, len / 2)),
          Number(str.slice(len / 2, len))
        );
        continue;
      }

      next.push(e * 2024);
    }

    arr = next;
  }

  return arr.length;
});

part2(() => {
  // Knew it!
  function addStone(map: typeof stones, stone: number, count: number) {
    const c = map.get(stone);
    if (c) {
      map.set(stone, c + count);
    } else {
      map.set(stone, count);
    }
  }

  let stones = new Map<number, number>(input.map((e) => [e, 1]));

  for (let i = 0; i < 75; i++) {
    const newStones = new Map();

    for (const [e, n] of stones.entries()) {
      if (e == 0) {
        addStone(newStones, 1, n);
        continue;
      }

      const str = e.toString();
      const len = str.length;
      if (len % 2 == 0) {
        addStone(newStones, +str.slice(0, len / 2), n);
        addStone(newStones, +str.slice(len / 2, len), n);
        continue;
      }

      addStone(newStones, e * 2024, n);
    }

    stones = newStones;
  }

  return stones.values().toArray().sum();
});
