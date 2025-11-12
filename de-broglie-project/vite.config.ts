import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import mkcert from 'vite-plugin-mkcert'
import fs from 'fs'
import path from 'path'
import { api_proxy_addr, img_proxy_addr, dest_root } from './src/target_config'

// https://vitejs.dev/config/
export default defineConfig({
  base: dest_root,
  server: { 
    port: 5173,
    host: '10.157.172.156',
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'cert.key')),
      cert: fs.readFileSync(path.resolve(__dirname, 'cert.crt')),
    },
    proxy: {
      "/api": {
        target: api_proxy_addr,
        changeOrigin: true,
        secure: false,
      },
      "/img-proxy": {
        target: img_proxy_addr,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/img-proxy/, ""),
      },
    },
    watch: {
      usePolling: true,
    },
    strictPort: true,
  },
  plugins: [
    react(),
    mkcert(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: "De Broglie Project",
        short_name: "De Broglie",
        start_url: "/De_Broglie_Calculation_RIP_2025_frontend/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#387ef6",
        orientation: "portrait-primary",
        icons: [
          {
            src: "/De_Broglie_Calculation_RIP_2025_frontend/logo.png",
            type: "image/png",
            sizes: "192x192"
          },
          {
            src: "/De_Broglie_Calculation_RIP_2025_frontend/logo.png",
            type: "image/png",
            sizes: "512x512"
          }
        ],
      }
    })
  ],
})
