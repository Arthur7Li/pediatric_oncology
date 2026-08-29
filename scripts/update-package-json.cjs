const fs = require("fs");

let pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
pkg.scripts.qa =
  "npm run check && npm run format:check && node scripts/check-medical-expiry.cjs && node scripts/check-charity-expiry.cjs";
fs.writeFileSync("package.json", JSON.stringify(pkg, null, 2));
