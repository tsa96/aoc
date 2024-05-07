console.time();
console.log(
  require("fs")
    .readFileSync("./13/input.txt")
    .toString()
    .split("\n\n")
    .map((line: string) => line.split("\n"))
    .map((pattern: string[]) =>
      [
        pattern,
        Array.from({ length: pattern[0].length }, (_, i) =>
          Array.from({ length: pattern.length }, (_, j) => pattern[j][i]).join(
            ""
          )
        )
      ]
        .map((arr) =>
          Array.from({ length: arr.length }, (_, i) => i + 1)
            .map((k) => [
              k,
              k < arr.length / 2
                ? [arr.slice(0, k), arr.slice(k, k * 2)]
                : [arr.slice(2 * k - arr.length, k), arr.slice(k, arr.length)]
            ])
            .filter(
              ([_, [l, r]]: [number, [string[], string[]]]) =>
                l.join() == r.reverse().join() && l.length && r.length
            )
            .map(([k]: [number]) => k)
        )
        .map((symmetries, i) =>
          i == 0 ? symmetries.map((x) => x * 100) : symmetries
        )
    )
    .flat()
    .flat()
    .reduce((a: number, c: number) => a + c, 0)
);
console.timeEnd();