import '../../lib';

const [rules, u] = readInput()
  .split('\n\n')
  .map((line) => line.split('\n'));

const updates = u.map((x) => x.split(',').map(Number));

function test(a, b) {
  return rules.includes(a + '|' + b);
}

part1(() => {
  return updates
    .filter((pages) =>
      pages.every((p1, i) =>
        pages.every((p2, j) => {
          if (i < j) {
            if (test(p2, p1)) {
              return false;
            }
          } else if (j > i) {
            if (test(p1, p2)) {
              return false;
            }
          }

          return true;
        })
      )
    )
    .map((pages) => pages[floor(pages.length / 2)])
    .sum();
});

part2(() => {
  const good = updates.filter((pages) =>
    pages.every((p1, i) =>
      pages.every((p2, j) => {
        if (i < j) {
          if (test(p2, p1)) {
            return false;
          }
        } else if (j > i) {
          if (test(p1, p2)) {
            return false;
          }
        }

        return true;
      })
    )
  );

  function reorder(pages: any[], iters) {
    if (iters > 10) return;
    let sorted = true;
    const seen = new Set();
    for (const [i, p1] of pages.entries()) {
      for (const [j, p2] of pages.entries()) {
        if (i == j || seen.has({ i, j })) continue;
        seen.add(strfy({ i, j }));

        if ((i < j && test(p2, p1)) || (j < i && test(p1, p2))) {
          [pages[i], pages[j]] = [pages[j], pages[i]];
          sorted = false;
        }
      }
    }

    if (!sorted) {
      reorder(pages, ++iters);
    }
  }

  const bad = updates.filter((u) => !good.some((u2) => strfy(u) == strfy(u2)));
  let sum = 0;
  for (const pages of bad) {
    reorder(pages, 0);
    sum += pages[floor(pages.length / 2)];
  }

  return sum;
  // aaaaaaaaaa so ugly D:
});
