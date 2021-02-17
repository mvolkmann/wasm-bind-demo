use js_sys::Float64Array;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);

    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

#[wasm_bindgen]
pub fn greet(name: &str) {
    alert(&format!("Hello, {}!", name));
}

#[wasm_bindgen]
pub fn sum(arr: &Float64Array) -> f64 {
   //let data = unsafe { Float64Array::view(&arr) };
   let len = arr.length();
   log(&format!("length = {}", len));
   let vec = arr.to_vec();
   /*
   let mut sum = 0.0;
   for n in vec {
     sum += n;
     //log(&format!("n = {}", n));
   }
   sum
   */
   vec.iter().sum()
}