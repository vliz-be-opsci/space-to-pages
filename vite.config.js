import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  base: "./",
  envPrefix: ["VITE_", "REACT_APP_"],
  build: {
    outDir: "build",
    emptyOutDir: true,
    assetsDir: "static",
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        navigation: path.resolve(__dirname, "navigation.html"),
      },
      output: {
        entryFileNames: "[name].bundle.js",
      },
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: "./src/setupTests.js",
    globals: true,
  },
});
