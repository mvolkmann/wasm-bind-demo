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
pub fn sum(data: &Float64Array) -> f64 {
    //let vec: Vec<f64> = data.to_vec();
    //vec.iter().sum()
    data.to_vec().iter().sum()
}

#[wasm_bindgen]
pub fn get_vector_pointer(count: usize) -> *mut f64 {
    let mut vec: Vec<f64> = Vec::with_capacity(count);
    vec.as_mut_ptr()
}