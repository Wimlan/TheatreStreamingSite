import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      "/tm-api": {
        target: "https://app.ticketmaster.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/tm-api/, ""),
      },
    },
  },
});
