const fs = require("fs");
let support = fs.readFileSync("src/pages/[lang]/support.astro", "utf8");
const article = fs.readFileSync("article_content.txt", "utf8");

support = support.replace(
  /<article class="prose max-w-none mb-12">[\s\S]*?<\/article>/,
  article,
);
fs.writeFileSync("src/pages/[lang]/support.astro", support);
