const inputs = require("fs")
  .readFileSync("./12/input.txt")
  .toString()
  .split("\n")
  .map((line) => {
    const [record, groups] = line.split(" ");
    return {
      record: Array(5).fill(record).join("?"),
      groups: Array(5).fill(groups.split(",").map(Number)).flat()
    };
  });

let total = 0;
let numCalls = 0;
let cacheHits = 0;
for (const { record, groups } of inputs) {
  console.time("Processing time");

  function search(pos, groupIndex) {
    numCalls++;
    let sum = 0;

    const group = groups[groupIndex];
    for (let i = pos; i + group <= record.length; i++) {
      if (i - pos > 1 && record.slice(pos, i).includes("#")) {
        break;
      }

      if (
        record.slice(i, i + group).includes(".") ||
        record[i + group] == "#" ||
        record[i - 1] == "#"
      ) {
        continue;
      }

      if (groupIndex == groups.length - 1) {
        if (!record.slice(i + group).includes("#")) {
          sum++;
        }
      } else {
        sum += cachedSearch(i + group + 1, groupIndex + 1);
      }
    }

    return sum;
  }

  // I am so glad I did today's in JS
  const calls = new Map();
  function cachedSearch(...args) {
    const argsString = args.join("-");
    if (calls.has(argsString)) {
      cacheHits++;
      return calls.get(argsString);
    } else {
      const res = search(...args);
      calls.set(argsString, res);
      return res;
    }
  }

  const lineTotal = cachedSearch(0, 0);
  console.log(`Found ${lineTotal} for ${record} ${groups.join(",")}`);
  console.timeEnd("Processing time");
  console.log(`Made ${numCalls} calls, ${cacheHits} cached\n\n`);
  total += lineTotal;
}

console.log(`Total: ${total}`);
