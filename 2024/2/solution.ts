import '../../lib';

const lines = readLines().map((line) => line.split(' ').map(Number));

part1(() => {
  return lines.count((line) => {
    let asc = false;
    for (let i = 1; i < lines.length; i++) {
      const a = line[i - 1];
      const b = line[i];

      if (i == 1) {
        asc = a > b;
      }

      if (asc ? b > a : a > b) return false;

      const diff = abs(a - b);

      if (diff < 1 || diff > 3) return false;
    }

    return true;
  });
});

function okay(arr: any[]) {
  let asc = false;
  for (let i = 1; i < arr.length; i++) {
    const a = arr[i - 1];
    const b = arr[i];

    if (i == 1) {
      asc = a > b;
    }

    if (asc ? b > a : a > b) return false;

    const diff = abs(a - b);

    if (diff < 1 || diff > 3) return false;
  }

  return true;
}

part2(() => {
  return lines.count((line) => {
    if (okay(line)) return true;

    for (let i = 0; i < line.length; i++) {
      const arr = [...line];
      arr.splice(i, 1);
      if (okay(arr)) return true;
    }

    return false;
  });
});
