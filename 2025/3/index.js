import { readFile } from "node:fs/promises";

const input = await readFile("input.txt", "utf8");

const lines = input.split("\n").filter(Boolean);

let total = 0;

// part 1
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  let hightest = 0;

  for (let j = 0; j < line.length; j++) {
    const char = line[j];
    for (let k = j + 1; k < line.length; k++) {
      const nextChar = line[k];
      const num = parseInt(char + nextChar, 10);
      hightest = Math.max(hightest, num);
    }
  }

  total += hightest;
}

console.log("part 1:", total);

// part 2

// reset
total = 0;

// 987654321111111
// top 12 numbers
const topK = 12;

function findNextLargestNumber(line, startingIndex, k) {
  let highest = 0;
  let index = -1;
  for (let j = startingIndex; j < line.length - k + 1; j++) {
    const num = parseInt(line[j], 10);
    if (num > highest) {
      highest = num;
      index = j;
      if (num === 9) break;
    }
  }
  return [highest, index];
}

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const nums = [];
  let index = 0;

  while (nums.length < topK) {
    const [nextHighest, nextIndex] = findNextLargestNumber(
      line,
      index,
      topK - nums.length
    );
    nums.push(nextHighest);
    index = nextIndex + 1;
  }

  const number = parseInt(nums.join(""), 10);
  total += number;
}

console.log("part 2:", total);
