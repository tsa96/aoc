import '../../lib';

const input = readInput().split(' ').map(BigInt);

part1(() => {
  // Pretty sure they don't want you to brute this in part 2...
  const ITERS = 75;
  let arr = [...input];
  for (let i = 0; i < ITERS; i++) {
    let next: bigint[] = [];
    for (const e of arr) {
      if (e == 0n) {
        next.push(1n);
        continue;
      }

      const str = e.toString();
      const len = str.length;
      if (len % 2 == 0) {
        next.push(BigInt(str.slice(0, len / 2)), BigInt(str.slice(len / 2, len)));
        continue;
      }

      next.push(e * 2024n);
    }

    arr = next;
  }

  return arr.length;
});

part2(() => {
  // Knew it!
});
