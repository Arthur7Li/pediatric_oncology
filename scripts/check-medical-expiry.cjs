const fs = require("fs");
const path = require("path");

const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;
const CONTENT_DIR = path.join(__dirname, "../src/content");
let hasErrors = false;

function checkDirectory(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      checkDirectory(fullPath);
    } else if (file.endsWith(".md")) {
      checkFile(fullPath);
    }
  }
}

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");

  // Extract last_medically_reviewed_date using regex
  const match = content.match(
    /last_medically_reviewed_date:\s*"?(\d{4}-\d{2}-\d{2})"?/,
  );

  if (match && match[1]) {
    const reviewDateStr = match[1];
    const reviewDate = new Date(reviewDateStr);
    const now = new Date();

    const diff = now - reviewDate;

    if (diff > ONE_YEAR_MS) {
      console.error(`🚨 EXPIRED MEDICAL CONTENT: ${filePath}`);
      console.error(
        `   Last reviewed on ${reviewDateStr}. It has been over 1 year. Needs clinical review!`,
      );
      hasErrors = true;
    } else {
      console.log(`✅ ${filePath} is up to date (reviewed ${reviewDateStr}).`);
    }
  }
}

console.log("Checking medical content expiry...");
checkDirectory(CONTENT_DIR);

if (hasErrors) {
  console.error("❌ Medical expiry check failed.");
  process.exit(1);
} else {
  console.log("✅ All medical content is within the 1-year review window.");
  process.exit(0);
}
