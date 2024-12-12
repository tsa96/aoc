import '../../lib';

const grid = readLines().map((x) => x.split(''));

const areas = grid.flat().reduce((obj, c) => (obj[c] = (obj[c] ?? 0) + 1), {});

part1(() => {
  log(areas);
  log(XDirs);
});

part2(() => {
  //
});
