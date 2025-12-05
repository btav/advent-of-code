import { readFile } from "node:fs/promises";

const input = await readFile("input.txt", "utf8");

const lines = input.split("\n");

const emptyLineIndex = lines.findIndex((line) => line === "");

const ranges = lines.slice(0, emptyLineIndex);
const ids = lines.slice(emptyLineIndex + 1);

const sortedRanges = ranges.sort((a, b) => {
  const [aStart] = a.split("-").map(Number);
  const [bStart] = b.split("-").map(Number);
  return aStart - bStart;
});

// part 1
let total = 0;

for (let i = 0; i < ids.length; i++) {
  const id = Number(ids[i]);

  for (let j = 0; j < sortedRanges.length; j++) {
    const [start, end] = sortedRanges[j].split("-").map(Number);

    if (id >= start && id <= end) {
      total += 1;
      break;
    }
    if (id < start) {
      break;
    }
  }
}

console.log("part 1:", total);

// part 2
total = 0;
const mergedRanges = [];

for (let i = 0; i < sortedRanges.length; i++) {
  const [start, end] = sortedRanges[i].split("-").map(Number);
  if (mergedRanges.length === 0) {
    mergedRanges.push([start, end]);
  } else {
    const [_, lastEnd] = mergedRanges[mergedRanges.length - 1];
    if (start <= lastEnd + 1) {
      mergedRanges[mergedRanges.length - 1][1] = Math.max(lastEnd, end);
    } else {
      mergedRanges.push([start, end]);
    }
  }
}

for (let i = 0; i < mergedRanges.length; i++) {
  const [start, end] = mergedRanges[i];
  total += end - start + 1;
}

console.log("part 2:", total);
