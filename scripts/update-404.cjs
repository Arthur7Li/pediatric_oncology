const fs = require("fs");

let content = fs.readFileSync("src/pages/404.astro", "utf8");

const replacement = `<a
        href={\`\${basePath}/en/support\`}
        class="p-5 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md hover:border-primary transition-all group no-underline"
      >
        <div class="text-2xl mb-2" aria-hidden="true">🍁</div>
        <h2 class="text-lg font-bold text-gray-900 group-hover:text-primary">
          {t.notFound.supportBtn}
        </h2>
        <p class="mt-1 text-xs text-gray-600">
          Provincial drug plans, hospitals, EI caregiver benefits, NIHB, and
          charity grants.
        </p>
      </a>

      <a
        href={\`\${basePath}/en/glossary\`}
        class="p-5 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md hover:border-primary transition-all group no-underline"
      >
        <div class="text-2xl mb-2" aria-hidden="true">📖</div>
        <h2 class="text-lg font-bold text-gray-900 group-hover:text-primary">
          {t.nav.glossary}
        </h2>
        <p class="mt-1 text-xs text-gray-600">
          Medical terms explained simply.
        </p>
      </a>

      <a
        href={\`\${basePath}/en/faq\`}
        class="p-5 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md hover:border-primary transition-all group no-underline"
      >
        <div class="text-2xl mb-2" aria-hidden="true">❓</div>
        <h2 class="text-lg font-bold text-gray-900 group-hover:text-primary">
          {t.nav.faq}
        </h2>
        <p class="mt-1 text-xs text-gray-600">
          Answers to the questions families ask most.
        </p>
      </a>

      <a
        href={\`\${basePath}/en/checklists\`}
        class="p-5 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md hover:border-primary transition-all group no-underline"
      >
        <div class="text-2xl mb-2" aria-hidden="true">📋</div>
        <h2 class="text-lg font-bold text-gray-900 group-hover:text-primary">
          {t.nav.checklists}
        </h2>
        <p class="mt-1 text-xs text-gray-600">
          Printable checklists and tracking tools.
        </p>
      </a>`;

content = content.replace(
  /<a\s*href=\{\`\$\{basePath\}\/en\/support\`\}[^>]*>[\s\S]*?<\/a>/,
  replacement,
);

fs.writeFileSync("src/pages/404.astro", content);
