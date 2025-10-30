import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/De_Broglie_Calculation_RIP_2025_frontend",
  server: { 
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
    },
    watch: {
      usePolling: true,
    },
    host: true,
    strictPort: true,
  },
  plugins: [
    react(),
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
