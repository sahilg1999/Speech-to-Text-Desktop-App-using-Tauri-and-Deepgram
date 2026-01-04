// Prevents additional console window on Windows in release, DO NOT REMOVE!!
use tauri::Manager;

fn main() {
  tauri::Builder::default()
    .plugin(tauri_plugin_clipboard_manager::init())
    .plugin(tauri_plugin_global_shortcut::Builder::new().build())
    .run(tauri::generate_context!())
    .expect("error while running tauri app");
}
