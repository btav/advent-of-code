import { readFile } from "node:fs/promises";

const input = await readFile("input.txt", "utf-8");

const grid = input.split("\n").map((x) => x.split(""));

const rows = grid.length;
const cols = grid[0].length;

const DOWN = [1, 0];
const RIGHT = [0, 1];
const LEFT = [0, -1];

let part1Total = 0;

const startingPoint = grid[0].findIndex((val) => val === "S");
const indices = [[0, startingPoint]];

while (indices.length > 0) {
  const [row, col] = indices.pop();

  if (row < 0 || row >= rows || col < 0 || col >= cols) {
    continue;
  }

  const value = grid[row][col];

  switch (value) {
    case "S":
      indices.push([row + DOWN[0], col + DOWN[1]]);
      break;
    case ".":
      grid[row][col] = "|";
      indices.push([row + DOWN[0], col + DOWN[1]]);
      break;
    case "^":
      part1Total += 1;
      indices.push([row + LEFT[0], col + LEFT[1]]);
      indices.push([row + RIGHT[0], col + RIGHT[1]]);
      break;
    default:
      break;
  }
}
console.log("part 1:", part1Total);

const memo = new Map();

function countPaths(row, col) {
  if (row === rows - 1) {
    return 1;
  }

  if (row < 0 || row >= rows || col < 0 || col >= cols) {
    return 0;
  }

  const key = `${row},${col}`;
  if (memo.has(key)) {
    return memo.get(key);
  }

  const value = grid[row][col];
  let paths = 0;

  if (value === "S" || value === "|") {
    paths = countPaths(row + DOWN[0], col + DOWN[1]);
  } else if (value === "^") {
    paths =
      countPaths(row + LEFT[0], col + LEFT[1]) +
      countPaths(row + RIGHT[0], col + RIGHT[1]);
  }

  memo.set(key, paths);
  return paths;
}

const part2Total = countPaths(0, startingPoint);
console.log("part 2:", part2Total);
