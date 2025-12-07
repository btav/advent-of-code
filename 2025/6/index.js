import { readFile } from "node:fs/promises";

const input = await readFile("input.txt", "utf8");

const grid = input.split("\n").map((line) => line.trim().split(/\s+/));
const colCount = grid[0].length;
let part1Total = 0;

// part 1
for (let col = 0; col < colCount; col++) {
  const columnValues = grid.map((row) => row[col]);
  const operator = columnValues.pop();

  const result = columnValues.reduce((acc, val) =>
    operator === "+" ? Number(acc) + Number(val) : Number(acc) * Number(val)
  );

  part1Total += result;
}

console.log("part 1:", part1Total);

// part 2
const charGrid = input.split("\n").map((line) => line.split(""));
const charColCount = charGrid[0].length;
const charRowCount = charGrid.length;
let part2Total = 0;
let numbersByColumn = {};

for (let col = charColCount - 1; col >= 0; col--) {
  for (let row = 0; row < charRowCount; row++) {
    const char = charGrid[row][col];
    if (char === " " || char === undefined) {
      continue;
    }

    if (char === "+" || char === "*") {
      const numbers = Object.values(numbersByColumn).map(Number);
      const result = numbers.reduce((acc, val) =>
        char === "+" ? Number(acc) + Number(val) : Number(acc) * Number(val)
      );

      part2Total += result;
      numbersByColumn = {};
      continue;
    }

    if (!numbersByColumn[col]) {
      numbersByColumn[col] = char;
    } else {
      numbersByColumn[col] = numbersByColumn[col] + char;
    }
  }
}

console.log("part 2:", part2Total);
