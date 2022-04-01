import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/devops': {
        target: 'http://172.18.1.125:10086/devops/',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/devops/, '/')
      }
    }
  }
})
