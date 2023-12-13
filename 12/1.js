const DEBUG = false;

const inputs = require("fs")
  .readFileSync("./12/input.txt")
  .toString()
  .split("\n")
  .map((line) => {
    const [record, groups] = line.split(" ");
    return { record, groups: groups.split(",").map(Number) };
  });

let total = 0;
for (const { record, groups } of inputs) {
  let found = 0;

  if (DEBUG)
    console.log("Searching", { record, groups, groupLength: groups.length });

  function search(pos, groupIndex) {
    const group = groups[groupIndex];

    for (let i = pos; i + group <= record.length; i++) {
      if (
        record.slice(i, i + group).includes(".") ||
        record[i + group] == "#" ||
        record[i - 1] == "#"
      ) {
        continue;
      }

      // Deeply evil edge case: a # gets skipped over
      if (i - pos > 1 && record.slice(pos, i).includes("#")) break;

      if (groupIndex == groups.length - 1) {
        if (!record.slice(i + group).includes("#")) {
          if (DEBUG) console.log("Found solution\t\t", { i, pos, group });
          found++;
        }
      } else {
        if (DEBUG) console.log("Starting search\t\t", { groupIndex, i, pos });
        search(i + group + 1, groupIndex + 1, pos);
      }
    }
  }

  search(0, 0, "");
  console.log(`Found ${found} for ${record} ${groups.join(",")}`);
  total += found;
}

console.log(`Total: ${total}`);
