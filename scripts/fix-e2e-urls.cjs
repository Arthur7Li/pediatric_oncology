const fs = require('fs');

let faq = fs.readFileSync('e2e/faq.spec.ts', 'utf8');
faq = faq.replace(/page\.goto\('faq'\);/g, "page.goto('en/faq/');");
fs.writeFileSync('e2e/faq.spec.ts', faq);

let glo = fs.readFileSync('e2e/glossary.spec.ts', 'utf8');
glo = glo.replace(/page\.goto\('glossary'\);/g, "page.goto('en/glossary/');");
fs.writeFileSync('e2e/glossary.spec.ts', glo);

let char = fs.readFileSync('e2e/charities.spec.ts', 'utf8');
char = char.replace(/page\.goto\('support'\);/g, "page.goto('en/support/');");
fs.writeFileSync('e2e/charities.spec.ts', char);
