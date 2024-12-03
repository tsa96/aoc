import '../../lib';

const input = readInput();

part1(() => {
  return [...input.matchAll(/mul\((\d+),(\d+)\)/g)]
    .map((s) => {
      log(s);
      return +s[1] * +s[2];
    })
    .sum();
});

part2(() => {
  let sum = 0;
  const matches = [
    ...input.matchAll(/(?:(?:mul\((\d+),(\d+)\))|(?:do\(\))|(?:don\'t\(\)))/g)
  ];
  let doing = true;
  for (const match of matches) {
    if (match[0].startsWith('m')) {
      if (doing) {
        sum += +match[1] * +match[2];
      }
    } else if (match[0].startsWith('don')) {
      doing = false;
    } else {
      doing = true;
    }
  }
  return sum;
});
