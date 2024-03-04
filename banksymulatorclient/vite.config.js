import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://localhost:44397', // replace with your backend server URL
        changeOrigin: false,
        secure: false,
        // rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})