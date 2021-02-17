use js_sys::Float64Array;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet(name: &str) {
    alert(&format!("Hello, {}!", name));
}

#[wasm_bindgen]
pub fn foo(arr: &Float64Array) -> u32 {
   //let data = unsafe { Float64Array::view(&arr) };
   let len = arr.length();
   println!("length = {:?}", len);
   /*
   for n in data.iter() {
     println!("n = {}", n);
   }
   */
   len
}