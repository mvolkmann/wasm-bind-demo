// A dynamic import is required due to the issue webpack/webpack#6615,
// but in theory `import {greet, sum} from './pkg';` will work eventually.
const wasm = import('./pkg');

const BYTES_PER_DOUBLE = 8;
const COUNT = 10000000; // 10 million

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

function populateArray(numbers) {
  for (let i = 0; i < numbers.length; i++) {
    numbers[i] = Math.random() * 100;
  }
}

function sum(numbers) {
  return numbers.reduce((acc, n) => acc + n);
}

async function run(m) {
  try {
    const m = await wasm; // a Module object

    //m.greet('World!');

    const ptr = m.allocate_space(COUNT);
    const arr = m.get_array(ptr, COUNT);
    populateArray(arr);

    let startMs = Date.now();
    let result = sum(arr);
    let endMs = Date.now();
    console.log('JavaScript sum =', result, 'in', endMs - startMs, 'ms');

    startMs = Date.now();
    result = m.sum(ptr, COUNT);
    endMs = Date.now();
    console.log('Rust sum =', result, 'in', endMs - startMs, 'ms');
  } catch (e) {
    console.error(e);
  }
}

run();
