import '../../lib';

const input = readLines().map(l => l.split(' '));

part1(() => {
  let x = 0;
  let y = 0;

  for (const [a, b] of input) {
    switch (a) {
      case 'up':
        y -= +b;
        break;
      case 'down':
        y += +b;
        break;
      case 'forward':
        x += +b;
        break;
    }
  }

  return x * y;
});

part2(() => {
  let horiz = 0;
  let depth = 0;
  let aim = 0;

  for (const [a, b] of input) {
    const x = +b;
    switch (a) {
      case 'up':
        aim += x;
        break;
      case 'down':
        aim -= x;
        break;
      case 'forward':
        horiz += x;
        depth += aim * x;
        break;
    }
  }

  return horiz * depth * -1;
});
