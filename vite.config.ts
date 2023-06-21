import { defineConfig } from "vite";

export default defineConfig({
  // easier readability in the sandbox
  clearScreen: false,
  assetsInclude: ['**/*.gltf', '**/*.mp3', '**/*.ICO'],
  build: {
    outDir: "build",
  },
  resolve: {
    alias: {
      "@public": "./public",
      "@assets": "./src/assets"
    }
  }
});
