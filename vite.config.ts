import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import basicSsl from '@vitejs/plugin-basic-ssl'

export default defineConfig(({ mode }) => {
  // Load .env files based on the current mode (e.g., development, production)
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), tailwindcss(), basicSsl()],
    define: {
      "import.meta.env.APP_ENV": JSON.stringify(env.APP_ENV),

    },
    server: {
      host: "test.tehrantc.com",

    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"), // Optional: for cleaner imports
      },
    },
  };
});
