import '../../lib';

// 94a + 22b = 8400
// 34a + 67b = 5400

// Ax + By = P;
// Cx + Dy = Q;

// x = (P - By) / A;
// ((CP - CBy) / A) + Dy = Q;
// CP - CBy + DAy = Q;
// DAy - CBy = Q - CP;
// (DA - CB)y = Q - CP;m
// Y = (Q - CP) / (DA - CB);

const machines = readInput().split('\n\n');

part1(() => {
  return machines
    .slice(0, 1)
    .map((str) => {
      const [A, B, C, D, P, Q] = str
        .matchAll(/[\=|\+](\d+)/g)
        .map(([, g]) => Number(g));

      const Y = (Q - C * P) / (D * A - C * B);
      log(Q - C * P);
      log(D * A - C * B);
    })
    .sum();
});

part2(() => {
  //
});
