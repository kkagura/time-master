#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]
use std::fs::File;
use std::io::Read;
use std::path::Path;

#[tauri::command]
fn load_config() -> String {
  let mut f = File::open(Path::new("C:/tm/conf.ini"));
  let mut json = String::new();
  match f {
    Ok(file) => {
      file.read_to_string(&mut json).unwrap();
    }
    Err(err) => {
      json = "".to_string();
    }
  }
  return json;
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
