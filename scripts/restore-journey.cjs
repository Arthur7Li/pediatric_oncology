const fs = require("fs");

let journey = fs.readFileSync("e2e/journey.spec.ts", "utf8");
journey = journey.replace(/journey\//g, "en/journey/");
// Fix the URL matches back
journey = journey.replace(/\\\/journey\\\//g, "\\/en\\/journey\\/");
fs.writeFileSync("e2e/journey.spec.ts", journey);
