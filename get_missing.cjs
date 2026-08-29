const fs = require("fs");
const path = require("path");
const glob = require("glob");

const dir = "src/content/provinces/en";
const files = fs.readdirSync(dir);
const missing = new Set();

files.forEach((f) => {
  const lines = fs.readFileSync(path.join(dir, f), "utf8").split("\n");
  let currentName = "";
  lines.forEach((line) => {
    const nameMatch = line.match(/name:\s*"(.*)"/);
    if (nameMatch) currentName = nameMatch[1];

    if (line.includes('url: ""')) {
      missing.add(currentName);
    }
  });
});

console.log(Array.from(missing).join("\n"));
