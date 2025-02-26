import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/", // Keep this unless your app is under /client
  build: {
    outDir: "dist", // Ensure this matches Vercel's output directory
  }
});
