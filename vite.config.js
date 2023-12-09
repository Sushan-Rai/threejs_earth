import vitePluginString from 'vite-plugin-string'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default {
  plugins: [
    vitePluginString(),
    react()
  ],
  base: '/threejs_earth/'
}
