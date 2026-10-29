import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@ui": fileURLToPath(new URL("../../packages/ui", import.meta.url)),
    },
  },
});
