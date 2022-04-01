import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, __dirname)
  return {
    plugins: [vue()],
    server: {
      proxy: {
        '/devops': {
          // target: 'http://172.18.1.125:10086/devops/',
          target: `${env.VITE_APP_BASEURL}/devops/`,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/devops/, '/')
        }
      }
    },
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './'),
        '@': path.resolve(__dirname, 'src')
      }
    }
  }
})
