import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

let server = "https://localhost:44397";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: server,
        changeOrigin: false,
        secure: false,
        // rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
