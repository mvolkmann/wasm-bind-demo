# wasm-bind-demo

This demonstrates using wasm-bind to call Rust functions from JavaScript.

To run this:

1. Enter `npm install`
1. Enter `npm run serve`
1. Browse localhost:8080

To build the Rust code in production mode,
edit `webpack.config.js` from `development` to `production`.

Due to the following issue, webpack 5 cannot yet be used with wasm-pack:
<https://github.com/rustwasm/wasm-pack/issues/835>
Is this the same reason it does not work with wasm-bindgen?
