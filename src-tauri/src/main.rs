#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
use std::error::Error;
use std::fs::File;
use std::io::Read;
use std::path::Path;

#[tauri::command]
fn load_config() -> String {
    // let path = Path::new("C:/tm/conf1.ini");
    // let display = path.display();
    // // Open the path in read-only mode, returns `io::Result<File>`
    // let mut file = match File::open(&path) {
    //     // The `description` method of `io::Error` returns a string that
    //     // describes the error
    //     Err(why) => println!("couldn't open {}: {}", display, why.description()),
    //     Ok(file) => println!("xxx"),
    // };

    // // Read the file contents into a string, returns `io::Result<usize>`
    // let mut conf = String::new();
    // match file.read_to_string(&mut conf) {
    //     Err(why) => println!("couldn't read {}: {}", display, why.description()),
    //     Ok(_) => println!("{} contains:\n{}", display, conf),
    // }

    return "".to_string();
}

fn main() {
    let msg = String::from("xxx12356789");
    println!("Hello Tauri! {}", msg);
    let context = tauri::generate_context!();
    let menus = tauri::Menu::new();
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![load_config])
        .menu(menus)
        .run(context)
        .expect("error while running tauri application");
}
