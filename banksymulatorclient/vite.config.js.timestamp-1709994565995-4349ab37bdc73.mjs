// vite.config.js
import { defineConfig } from "file:///C:/Users/szymo/OneDrive/Documents/csharp/BankSymulatorApi/banksymulatorclient/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/szymo/OneDrive/Documents/csharp/BankSymulatorApi/banksymulatorclient/node_modules/@vitejs/plugin-react/dist/index.mjs";
var laptop = "https://localhost:44397";
var vite_config_default = defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: laptop,
        changeOrigin: false,
        secure: false
        // rewrite: (path) => path.replace(/^\/api/, ""),
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxzenltb1xcXFxPbmVEcml2ZVxcXFxEb2N1bWVudHNcXFxcY3NoYXJwXFxcXEJhbmtTeW11bGF0b3JBcGlcXFxcYmFua3N5bXVsYXRvcmNsaWVudFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcc3p5bW9cXFxcT25lRHJpdmVcXFxcRG9jdW1lbnRzXFxcXGNzaGFycFxcXFxCYW5rU3ltdWxhdG9yQXBpXFxcXGJhbmtzeW11bGF0b3JjbGllbnRcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL3N6eW1vL09uZURyaXZlL0RvY3VtZW50cy9jc2hhcnAvQmFua1N5bXVsYXRvckFwaS9iYW5rc3ltdWxhdG9yY2xpZW50L3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xyXG5cclxubGV0IHBjID0gXCJodHRwczovL2xvY2FsaG9zdDo3MTEzXCI7XHJcbmxldCBsYXB0b3AgPSBcImh0dHBzOi8vbG9jYWxob3N0OjQ0Mzk3XCI7XHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHBsdWdpbnM6IFtyZWFjdCgpXSxcclxuICBzZXJ2ZXI6IHtcclxuICAgIHByb3h5OiB7XHJcbiAgICAgIFwiL2FwaVwiOiB7XHJcbiAgICAgICAgdGFyZ2V0OiBsYXB0b3AsXHJcbiAgICAgICAgY2hhbmdlT3JpZ2luOiBmYWxzZSxcclxuICAgICAgICBzZWN1cmU6IGZhbHNlLFxyXG4gICAgICAgIC8vIHJld3JpdGU6IChwYXRoKSA9PiBwYXRoLnJlcGxhY2UoL15cXC9hcGkvLCBcIlwiKSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgfSxcclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBeWEsU0FBUyxvQkFBb0I7QUFDdGMsT0FBTyxXQUFXO0FBR2xCLElBQUksU0FBUztBQUdiLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxNQUFNLENBQUM7QUFBQSxFQUNqQixRQUFRO0FBQUEsSUFDTixPQUFPO0FBQUEsTUFDTCxRQUFRO0FBQUEsUUFDTixRQUFRO0FBQUEsUUFDUixjQUFjO0FBQUEsUUFDZCxRQUFRO0FBQUE7QUFBQSxNQUVWO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
