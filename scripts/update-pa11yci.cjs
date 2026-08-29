const fs = require("fs");

const config = JSON.parse(fs.readFileSync(".pa11yci", "utf8"));

// Filter out old removed routes
config.urls = config.urls.filter(
  (url) => !url.includes("/financial") && !url.includes("/resources"),
);

// Add new routes for support, glossary, faq, checklists
const langs = ["en", "fr", "zh"];
const newRoutes = ["support", "glossary", "faq", "checklists"];
const baseUrl = "http://localhost:3000/pediatric_oncology";

for (const lang of langs) {
  for (const route of newRoutes) {
    const newUrl = `${baseUrl}/${lang}/${route}`;
    if (!config.urls.includes(newUrl)) {
      config.urls.push(newUrl);
    }
  }
}

config.urls.sort();
fs.writeFileSync(".pa11yci", JSON.stringify(config, null, 2));
