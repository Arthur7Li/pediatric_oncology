const fs = require("fs");

let content = fs.readFileSync("src/components/Header.astro", "utf8");

const navItemsReplacement = `const isSupport = remainingPath.startsWith("/support");
const isGlossary = remainingPath.startsWith("/glossary");
const isFaq = remainingPath.startsWith("/faq");
const isChecklists = remainingPath.startsWith("/checklists");

const navItems = [
  {
    name: t.nav.journey,
    href: \`\${langPrefix}/journey/1-diagnosis\`,
    active: isJourney,
  },
  {
    name: t.nav.tumors,
    href: \`\${langPrefix}/tumors\`,
    active: isTumors,
  },
  {
    name: t.nav.symptoms,
    href: \`\${langPrefix}/symptoms\`,
    active: isSymptoms,
  },
  {
    name: t.nav.support,
    href: \`\${langPrefix}/support\`,
    active: isSupport,
  },
  {
    name: t.nav.glossary,
    href: \`\${langPrefix}/glossary\`,
    active: isGlossary,
  },
  {
    name: t.nav.faq,
    href: \`\${langPrefix}/faq\`,
    active: isFaq,
  },
  {
    name: t.nav.checklists,
    href: \`\${langPrefix}/checklists\`,
    active: isChecklists,
  },
];`;

content = content.replace(
  /const isSupport = remainingPath\.startsWith\("\/support"\);\s*const navItems = \[.*?\];/s,
  navItemsReplacement,
);

fs.writeFileSync("src/components/Header.astro", content);
