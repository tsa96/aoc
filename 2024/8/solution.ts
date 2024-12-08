import '../../lib';

const lines = readLines();
const yLen = lines.length;
const xLen = lines[0].length;
const map = new Map();
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
  [...map.values()].forEach((ants) =>
    ants.forEach(([xa, ya], i) =>
      ants
        .filter((_, j) => i != j) // pairs twice, doesnt matter for p1
        .forEach(([xb, yb], j) => {
          [xa, xb] = [xa, xb].sort();
          const xdiff = xb - xa;
          const [x1, x2] = [xb + xdiff, xa - xdiff];

          [ya, yb] = [ya, yb].sort();
          const ydiff = yb - ya;
          const [y1, y2] = [yb + ydiff, ya - ydiff];

          if (x1 >= 0 && x1 < xLen && y1 >= 0 && y1 < yLen) {
            log({ xa, xb, xdiff, x1, ya, yb, ydiff,y1} );
            hits.add([x1, y1]);
          }

          if (x2 >= 0 && x2 < xLen && y2 >= 0 && y2 < yLen) {

            log({ xa, xb, xdiff, x2, ya, yb, ydiff,y2 });
            hits.add([x2, y2]);
          }

          // wrongo - x y pairing incorrect because flipping the vars (ugh)
        })
    )
  );

  log(hits);
  log(
    from(yLen, (y) =>
      from(xLen, (x) => (hits.has([x, y]) ? '#' : '.')).join('')
    ).join('\n')
  );
  return hits.size;
});

part2(() => {
  //
});
