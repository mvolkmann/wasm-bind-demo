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

function getNumbers(count) {
  const numbers = [];
  for (let i = 0; i < count; i++) {
    numbers.push(Math.random() * 100);
  }
  return numbers;
}

function populateNumbers(numbers) {
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

    //const numbers = new Float64Array(getNumbers(COUNT));
    const numbers = getNumbers(COUNT);

    let startMs = Date.now();
    let result = sum(numbers);
    let endMs = Date.now();
    console.log('JavaScript sum =', result, 'in', endMs - startMs, 'ms');

    const ptr = m.get_vec_ptr(COUNT);
    const arr = m.get_array(ptr, COUNT);
    populateNumbers(arr);

    startMs = Date.now();
    result = m.sum(ptr, COUNT);
    endMs = Date.now();
    console.log('Rust sum =', result, 'in', endMs - startMs, 'ms');
  } catch (e) {
    console.error(e);
  }
}

run();
