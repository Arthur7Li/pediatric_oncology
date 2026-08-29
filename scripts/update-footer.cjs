const fs = require("fs");

let content = fs.readFileSync("src/components/Footer.astro", "utf8");

const replacement = `<li>
            <a
              href={\`\${langPrefix}/support\`}
              class="hover:text-primary transition-colors">{t.nav.support}</a
            >
          </li>
          <li>
            <a
              href={\`\${langPrefix}/glossary\`}
              class="hover:text-primary transition-colors">{t.nav.glossary}</a
            >
          </li>
          <li>
            <a
              href={\`\${langPrefix}/faq\`}
              class="hover:text-primary transition-colors">{t.nav.faq}</a
            >
          </li>
          <li>
            <a
              href={\`\${langPrefix}/checklists\`}
              class="hover:text-primary transition-colors">{t.nav.checklists}</a
            >
          </li>`;

content = content.replace(
  /<li>\s*<a\s*href=\{\`\$\{langPrefix\}\/support\`\}\s*class="hover:text-primary transition-colors">\{t\.nav\.support\}<\/a\s*>\s*<\/li>/,
  replacement,
);

fs.writeFileSync("src/components/Footer.astro", content);
