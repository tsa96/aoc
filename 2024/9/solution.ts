import '../../lib';

const input = readInput();

part1(() => {
  const map = input
    .split('')
    .map(Number)
    .flatMap((n, i) => Array(n).fill(i % 2 ? null : i / 2));

  let back = map.length - 1;
  for (let front = 0; front < back; front++) {
    while (map[front] != null && front < back) {
      front++;
    }

    while (map[back] == null && front < back) {
      back--;
    }

    // oh my GOD i love being able to do this!!!
    map.swap(front, back);
  }

  return map.map((n, i) => n * i).sum();
});

part2(() => {
  const map = input
    .split('')
    .flatMap((n, i) => Array(+n).fill(i % 2 ? null : (i / 2).toString()));

  for (let back = map.length - 1; back > 0; back--) {
    while (map[back] == null && back > 0) {
      back--;
    }

    const char = map[back];
    let end = back;
    while (map[back - 1] == char && back > 0) {
      back--;
    }
    const len = end - back + 1;

    let spaces;
    let front;
    for (spaces = 0, front = 0; front < back - 1; front++) {
      if (map[front] == null) {
        spaces++;
        if (spaces == len) {
          break;
        }
      } else {
        spaces = 0;
      }
    }

    if (spaces == 0) continue;

    for (let i = 0; i < len; i++) {
      map.swap(front - i, back + i);
    }
  }

  // log(map.map((x) => (x == null ? '.' : x.toString())).join(''));
  return map.map((n, i) => +n * i).sum();
});
