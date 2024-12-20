import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: process.env.PORT || 3000,
  },
  plugins: [react()],
  base: "/PokeAPI.WebApp/",
});
