const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "..", "src", "content", "charities", "en");
let expiredCount = 0;
let totalCount = 0;

if (fs.existsSync(dir)) {
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));

  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  console.log("Checking charity verification dates...\n");

  files.forEach((file) => {
    totalCount++;
    const content = fs.readFileSync(path.join(dir, file), "utf8");
    const match = content.match(/last_verified_date:\s*['"]?([\d-]+)['"]?/);
    if (match) {
      const date = new Date(match[1]);
      if (date < sixMonthsAgo) {
        expiredCount++;
        console.log(`EXPIRED: ${file} (Last verified: ${match[1]})`);
      }
    } else {
      console.log(`WARNING: ${file} has no last_verified_date`);
      expiredCount++;
    }
  });

  console.log(
    `\nSummary: ${expiredCount} expired out of ${totalCount} charities checked.`,
  );
  if (expiredCount > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
} else {
  console.log("Charities directory not found.");
  process.exit(0);
}
