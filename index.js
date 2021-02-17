// A dynamic import is required due to the issue webpack/webpack#6615,
// but in theory `import {greet, sum} from './pkg';` will work eventually.
const wasm = import('./pkg');

const BYTES_PER_DOUBLE = 8;
const COUNT = 1000000;

/*
wasm
  .then(m => {
    //m.greet('World!');
    const arr = new Float64Array([1.2, 2.3, 3.4]);
    const sum = m.sum(arr);
    console.log('index.js: sum =', sum);
  })
  .catch(console.error);
*/

function getNumbers(count) {
  const numbers = [];
  for (let i = 0; i < count; i++) {
    numbers.push(Math.random() * 100);
  }
  return numbers;
}

function sum(numbers) {
  return numbers.reduce((acc, n) => acc + n);
}

async function run(m) {
  try {
    const m = await wasm; // a Module object

    //m.greet('World!');

    //const numbers = new Float64Array(getNumbers(COUNT));
    const numbers = getNumbers(COUNT);

    let startMs = Date.now();
    let result = sum(numbers);
    let endMs = Date.now();
    console.log('JavaScript sum =', result, 'in', endMs - startMs, 'ms');

    const ptr = m.get_vector_pointer(COUNT);
    const arr = new Float64Array(numbers, ptr, COUNT * BYTES_PER_DOUBLE);

    startMs = Date.now();
    result = m.sum(arr);
    endMs = Date.now();
    console.log('Rust sum =', result, 'in', endMs - startMs, 'ms');
  } catch (e) {
    console.error(e);
  }
}

run();
