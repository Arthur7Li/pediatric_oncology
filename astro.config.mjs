// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://arthur7li.github.io",
  base: "/pediatric_oncology",
  i18n: {
    defaultLocale: "en",
    locales: ["en", "fr", "zh"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
