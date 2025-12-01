import { readFile } from "node:fs/promises";

const input = await readFile('input.txt', 'utf8');
const lines = input.split('\n').filter(line => line.trim());

let count = 0;
let dial = 50;

// part 1
for (let i = 0; i < lines.length; i++) {
  const direction = lines[i][0];
  const number = parseInt(lines[i].slice(1));

  if (direction.toLowerCase() === 'r') {
    dial = (dial + number) % 100;
  } else if (direction.toLowerCase() === 'l') {
    dial = (dial - number) % 100;
    if (dial < 0) dial += 100;
  }

  if (dial === 0) {
    count += 1;
  }
};

console.log('part 1 = ', count)

// reset
count = 0;
dial = 50;

// part 2
for (let i = 0; i < lines.length; i++) {
  const direction = lines[i][0];
  const number = parseInt(lines[i].slice(1));

  if (direction.toLowerCase() === 'r') {
    count += Math.floor((dial + number) / 100);
    dial = (dial + number) % 100;
  } else if (direction.toLowerCase() === 'l') {
    if (dial === 0) {
      count += Math.floor(number / 100);
    } else if (number >= dial) {
      count += 1 + Math.floor((number - dial) / 100);
    }
    dial = (dial - number) % 100;
    if (dial < 0) dial += 100;
  }
};

console.log('part 2 = ', count)
