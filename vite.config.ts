/// <reference types="vitest" />

import { defineConfig } from "vite"
import { VitePWA } from "vite-plugin-pwa"

import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
  },
  plugins: [
    react(),
    VitePWA({
      // devOptions: { enabled: true },
      registerType: "autoUpdate",
      manifest: {
        short_name: "You've got time?",
        name: "You've got time?",
        icons: [
          {
            src: "favicon.ico",
            sizes: "64x64 32x32 24x24 16x16",
            type: "image/x-icon",
          },
          {
            src: "logo192.png",
            type: "image/png",
            sizes: "192x192",
          },
          {
            src: "logo512.png",
            type: "image/png",
            sizes: "512x512",
          },
        ],
        start_url: ".",
        display: "standalone",
        theme_color: "#000000",
        background_color: "#ffffff",
      },
    }),
  ],
});
