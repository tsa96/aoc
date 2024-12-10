import '../../lib';

const lines = readLines();
const len = lines.length;
const map = new Map<string, [number, number][]>();
const hits = new HashSet();

lines.forEach((line, i) =>
  line.split('').forEach((c, j) => {
    if (c != '.') {
      if (!map.has(c)) map.set(c, []);
      const arr = map.get(c);
      arr.push([j, i]);
    }
  })
);

part1(() => {
  map.values().forEach((ants) =>
    pairs(ants).forEach(([[xa, ya], [xb, yb]]) => {
      const x1 = 2 * xa - xb;
      const x2 = 2 * xb - xa;

      const y1 = 2 * ya - yb;
      const y2 = 2 * yb - ya;

      if (x1 >= 0 && y1 >= 0) {
        hits.add([x1, y1]);
      }

      if (x2 < len && y2 < len) {
        hits.add([x2, y2]);
      }
    })
  );



  // Still wrong, no idea what I'm doing wrong, leaving for now.
  return hits.size;
});

part2(() => {
  //
});
