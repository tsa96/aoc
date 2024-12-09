import '../../lib';

const input = readInput();

part1(() => {
  const map = input
    .split('')
    .map(Number)
    .flatMap((n, i) => Array(n).fill(i % 2 ? null : i / 2));

  let back = map.length - 1;
  // log(map.join(' '));
  for (let front = 0; front < back; front++) {
    while (map[front] != null && front < back) {
      // log(map[front])
      front++;
    }

    while (map[back] == null && front < back) {
      back--;
    }

    [map[front], map[back]] = [map[back], map[front]];
  }

  log(map);
  return map
    .filter((n) => n != null)
    .map((n, i) => n * i)
    .sum();
});

part2(() => {
  //
});
