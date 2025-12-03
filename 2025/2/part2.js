import { readFile } from "node:fs/promises";

const input = await readFile("input.txt", "utf8");

const ranges = input.split(",");

const invalidIds = [];

function isInvalidId(id) {
  const strId = id.toString();

  for (let i = 1; i <= Math.floor(strId.length / 2); i++) {
    if (strId.length % i !== 0) continue;

    const segment = strId.slice(0, i);
    const repeatCount = strId.length / segment.length;
    if (segment.repeat(repeatCount) === strId) return true;
  }

  return false;
}

for (let i = 0; i < ranges.length; i++) {
  const [start, end] = ranges[i].split("-").map(Number);

  for (let id = start; id <= end; id++) {
    if (isInvalidId(id)) invalidIds.push(id);
  }
}

console.log(invalidIds);

const sum = invalidIds.reduce((a, b) => a + b, 0);

console.log("part 2 = ", sum);
