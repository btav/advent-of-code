import { readFile } from "node:fs/promises";

const input = await readFile("input.txt", "utf8");

const ranges = input.split(",");

const invalidIds = [];

function isInvalidId(id) {
  const strId = id.toString();
  const left = strId.slice(0, strId.length / 2);
  const right = strId.slice(strId.length / 2);
  return left === right;
}

for (let i = 0; i < ranges.length; i++) {
  const [start, end] = ranges[i].split("-").map(Number);

  for (let id = start; id <= end; id++) {
    if (id.toString().length % 2 === 0) {
      if (isInvalidId(id)) invalidIds.push(id);
    }
  }
}

const sum = invalidIds.reduce((a, b) => a + b, 0);

console.log("part 1 = ", sum);
