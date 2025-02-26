import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/", // Ensure this is set correctly
  build: {
    outDir: "dist", // Matches the Vercel output directory
  },
  server: {
    historyApiFallback: true, // Ensures React Router works in dev mode
  }
});
