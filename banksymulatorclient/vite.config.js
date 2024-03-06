import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

let pc = "https://localhost:7113";
let laptop = "https://localhost:44397";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: laptop,
        changeOrigin: false,
        secure: false,
        // rewrite: (path) => path.replace(/^\/api/, '')
      },
    },
  },
});
