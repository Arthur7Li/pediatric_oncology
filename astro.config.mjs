// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://canadian-pediatric-oncology.github.io",
  base: "/pediatric_oncology",
  redirects: {
    "/financial": "/support",
    "/en/financial": "/en/support",
    "/fr/financial": "/fr/support",
    "/zh/financial": "/zh/support",
    "/resources": "/support",
    "/en/resources": "/en/support",
    "/fr/resources": "/fr/support",
    "/zh/resources": "/zh/support",
  },
  i18n: {
    defaultLocale: "en",
    locales: ["en", "fr", "zh"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
