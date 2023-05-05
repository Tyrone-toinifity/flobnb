import { defineConfig } from "vite";

export default defineConfig({
  root: "./src",
  base: "/",
  build: {
    outDir: "../dist",
    minify: "terser",
    rollupOptions: {
      minify: true,
    },
  },
});
