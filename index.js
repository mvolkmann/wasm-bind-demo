// Note that a dynamic `import` statement here is required due to
// webpack/webpack#6615, but in theory `import { greet } from './pkg';`
// will work here one day as well!
const rust = import('./pkg');

rust
  .then(m => {
    m.greet('World!');
    const arr = new Float64Array([1.2, 2.3, 3.4]);
    const len = m.foo(arr);
    console.log('index.js x: len =', len);
  })
  .catch(console.error);
