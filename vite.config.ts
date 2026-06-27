import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/",
  plugins: [react()],
  server: {
    allowedHosts: true
  },
  build: {
    target: "es2020",
    sourcemap: false
  }
});
