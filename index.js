// A dynamic import is required due to the issue webpack/webpack#6615,
// but in theory `import { greet } from './pkg';` will work eventually.
const rust = import('./pkg');

/*
rust
  .then(m => {
    //m.greet('World!');
    const arr = new Float64Array([1.2, 2.3, 3.4]);
    const sum = m.sum(arr);
    console.log('index.js: sum =', sum);
  })
  .catch(console.error);
*/

async function run(m) {
  try {
    const m = await rust;
    //m.greet('World!');
    const arr = new Float64Array([1.2, 2.3, 3.4]);
    const sum = m.sum(arr);
    console.log('index.js: sum =', sum);
  } catch (e) {
    console.error(e);
  }
}

run();
