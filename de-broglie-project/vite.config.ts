import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import mkcert from 'vite-plugin-mkcert'
import fs from 'fs'
import path from 'path'

const API_PROXY_ORIGIN = 'https://10.157.172.156:8080'
const IMG_HTTP_ORIGIN = 'http://10.157.172.156:9000'
const PAGES_BASE_PATH = '/De_Broglie_Calculation_RIP_2025_frontend/'
const DEV_HOST = '10.157.172.156'
const DEV_PORT = 5173

const resolveDevHttpsConfig = () => {
  const keyPath = path.resolve(process.cwd(), 'cert.key')
  const certPath = path.resolve(process.cwd(), 'cert.crt')

  if (fs.existsSync(keyPath) && fs.existsSync(certPath)) {
    return {
      key: fs.readFileSync(keyPath),
      cert: fs.readFileSync(certPath),
    }
  }

  return undefined
}

const buildManifestIconPath = (base: string): string => {
  if (base === '/' || base === './') {
    return '/logo.png'
  }

  return `${base.replace(/\/$/, '')}/logo.png`
}

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const isServe = command === 'serve'

  const base = isServe ? '/' : PAGES_BASE_PATH
  const manifestBase = PAGES_BASE_PATH
  const iconPath = buildManifestIconPath(manifestBase)

  return {
    base,
    server: {
      host: DEV_HOST,
      port: DEV_PORT,
      https: resolveDevHttpsConfig(),
      proxy: isServe
        ? {
            '/api': {
              target: API_PROXY_ORIGIN,
              changeOrigin: true,
              secure: false,
            },
            '/img-proxy': {
              target: IMG_HTTP_ORIGIN,
              changeOrigin: true,
              secure: false,
              rewrite: (urlPath) => urlPath.replace(/^\/img-proxy/, ''),
            },
          }
        : undefined,
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
          name: 'De Broglie Project',
          short_name: 'De Broglie',
          start_url: manifestBase,
          display: 'standalone',
          background_color: '#ffffff',
          theme_color: '#387ef6',
          orientation: 'portrait-primary',
          icons: [
            {
              src: iconPath,
              type: 'image/png',
              sizes: '192x192',
            },
            {
              src: iconPath,
              type: 'image/png',
              sizes: '512x512',
            },
          ],
        },
      }),
    ],
  }
})
