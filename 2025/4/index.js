import { readFile } from "node:fs/promises";
const input = await readFile("input.txt", "utf-8");

const fullGrid = input.split("\n").map((x) => x.split(""));

// let rolls = 0;

const directions = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

function removeRolls(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  //copy the grid
  const newGrid = JSON.parse(JSON.stringify(grid));

  let count = 0;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let nearby = 0;

      for (const [dx, dy] of directions) {
        const x = i + dx;
        const y = j + dy;

        if (x >= 0 && x < rows && y >= 0 && y < cols) {
          if (grid[x][y] === "@") {
            nearby++;
          }
        }
      }

      if (grid[i][j] === "@" && nearby < 4) {
        newGrid[i][j] = ".";
        count++;
      }
    }
  }
  return [newGrid, count];
}

console.log("part 1 = ", removeRolls(fullGrid)[1]);

//part 2

// keep looping until no more rolls can be removed
let grid = fullGrid;
let totalRemoved = 0;

while (true) {
  const [newGrid, removed] = removeRolls(grid);
  totalRemoved += removed;
  if (removed === 0) {
    break;
  }
  grid = newGrid;
}

console.log("part 2 = ", totalRemoved);
