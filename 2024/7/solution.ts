import '../../lib';

const lines = readLines()
  .map((line) => line.split(' '))
  .map(([x, ...y]) => [+x.slice(0, -1), y.map(Number)] as const);

part1(() => {
  return structuredClone(lines)
    .map(([result, numbers]) => {
      const atts = [numbers.shift()];
      numbers.forEach((num, i) => {
        atts.forEach((att, j) => {
          atts[j] = att + num;
          atts.push(att * num);
        });
      });

      return atts.includes(result) ? result : 0;
    })
    .sum();
});

part2(() => {
  return structuredClone(lines)
    .map(([result, numbers]) => {
      const atts = [numbers.shift()];
      numbers.forEach((num, i) => {
        atts.forEach((att, j) => {
          atts[j] = att + num;
          atts.push(att * num);
          atts.push(Number(att.toString() + num.toString()))
        });
      });

      return atts.includes(result) ? result : 0;
    })
    .sum();
});
