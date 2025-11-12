export const api_proxy_addr = 'https://10.157.172.156:8080';
export const img_proxy_addr = `${api_proxy_addr}/api/img-proxy`;
const PAGES_BASE_PATH = '/De_Broglie_Calculation_RIP_2025_frontend';

const isDev = import.meta.env.DEV;

export const dest_api = isDev ? '/api' : `${api_proxy_addr}/api`;
export const dest_img = isDev ? '/img-proxy' : img_proxy_addr;
export const dest_root = isDev ? '/' : PAGES_BASE_PATH;
