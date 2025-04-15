import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path"
import viteDebugInfo from "./vite.debug.info";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), viteDebugInfo()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server : {
    allowedHosts: true
  }
})
