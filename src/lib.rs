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
pub fn allocate_space(count: usize) -> *mut f64 {
    let mut v: Vec<f64> = Vec::with_capacity(count);
    let ptr = v.as_mut_ptr();
    std::mem::forget(v); // prevents dropping v when this function exits
    ptr
}

#[wasm_bindgen]
pub fn get_array(ptr: *mut f64, count: usize) -> Float64Array {
    unsafe { Float64Array::view(std::slice::from_raw_parts(ptr, count)) }
}

#[wasm_bindgen]
pub fn sum(ptr: *mut f64, count: usize) -> f64 {
    let data = unsafe { std::slice::from_raw_parts(ptr, count) };
    data.iter().sum()
}

#[wasm_bindgen(start)]
pub fn run() {
    demo();
    dom_stuff();
}

fn demo() {
    let name = "World";
    log(&format!("Hello, {}!", name));

    // This is supposed to be an improvement, but it is worse!
    use web_sys::console;
    console::log_1(&"Hello, ".into());
}

// Check Cargo.toml to see the features required in web_sys!
fn dom_stuff() -> Result<(), JsValue> {
    // Use `web_sys`'s global `window` function to get a handle on the global
    // window object.
    let window = web_sys::window().expect("global window should exist");
    let document = window.document().expect("window should have document");
    let body = document.body().expect("document should have body");

    let p = document.create_element("p")?;
    p.set_inner_html("Rust created this HTML!");

    body.append_child(&p)?;

    Ok(())
}