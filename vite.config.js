import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        landing: resolve(__dirname, "pages/landing/index.html"),
        contact: resolve(__dirname, "pages/contact/index.html"),
        eagle: resolve(__dirname, "pages/eagle/index.html"),
        gorilla: resolve(__dirname, "pages/gorilla/index.html"),
        lemur: resolve(__dirname, "pages/lemur/index.html"),
        map: resolve(__dirname, "pages/map/index.html"),
        zoos: resolve(__dirname, "pages/zoos/index.html"),
        login: resolve(__dirname, "pages/login/index.html"),
        register: resolve(__dirname, "pages/register/index.html"),
      },
    },
  },
});
