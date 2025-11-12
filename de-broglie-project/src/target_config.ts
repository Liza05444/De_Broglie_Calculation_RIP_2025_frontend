const target_tauri = true;

export const api_proxy_addr = 'https://10.157.172.156:8080';
export const img_proxy_addr = 'http://10.157.172.156:9000';
export const dest_api = target_tauri ? `${api_proxy_addr}/api` : '/api';
export const dest_img = target_tauri ? img_proxy_addr : '/img-proxy';
export const dest_root = target_tauri ? '' : '/De_Broglie_Calculation_RIP_2025_frontend';
