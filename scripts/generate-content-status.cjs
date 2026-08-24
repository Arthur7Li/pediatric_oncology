const fs = require("fs");
const path = require("path");

const CONTENT_DIR = path.join(__dirname, "../src/content");
const OUTPUT_FILE = path.join(__dirname, "../docs/CONTENT_STATUS.md");
const ONE_DAY_MS = 24 * 60 * 60 * 1000;
const ONE_YEAR_DAYS = 365;

const contentEntries = [];

function walkDirectory(dir, section = "") {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walkDirectory(fullPath, section || item);
    } else if (item.endsWith(".md")) {
      processFile(fullPath, section);
    }
  }
}

function processFile(filePath, section) {
  const rawContent = fs.readFileSync(filePath, "utf-8");
  const relPath = path.relative(path.join(__dirname, ".."), filePath);

  // Extract title, lang, last_medically_reviewed_date, author
  const titleMatch = rawContent.match(/^title:\s*"?(.*?)"?$/m);
  const langMatch = rawContent.match(/^lang:\s*"?(.*?)"?$/m);
  const dateMatch = rawContent.match(
    /^last_medically_reviewed_date:\s*"?(.*?)"?$/m,
  );
  const authorMatch = rawContent.match(/^author:\s*"?(.*?)"?$/m);

  const title = titleMatch
    ? titleMatch[1].trim()
    : path.basename(filePath, ".md");
  const lang = langMatch
    ? langMatch[1].trim()
    : relPath.includes("/fr/")
      ? "fr"
      : relPath.includes("/zh/")
        ? "zh"
        : "en";
  const reviewDateStr = dateMatch ? dateMatch[1].trim() : "Unknown";
  const author = authorMatch ? authorMatch[1].trim() : "Medical Review Team";

  let diffDays = 0;
  let daysUntilExpiry = 0;
  let statusEmoji = "🟢";
  let statusText = "Fresh";

  if (reviewDateStr !== "Unknown") {
    const reviewDate = new Date(reviewDateStr);
    const now = new Date();
    diffDays = Math.floor((now - reviewDate) / ONE_DAY_MS);
    daysUntilExpiry = ONE_YEAR_DAYS - diffDays;

    if (daysUntilExpiry < 0) {
      statusEmoji = "🔴";
      statusText = "Expired";
    } else if (diffDays > 300) {
      // > 10 months
      statusEmoji = "🔴";
      statusText = "Action Required";
    } else if (diffDays >= 180) {
      // 6 to 10 months
      statusEmoji = "🟡";
      statusText = "Review Soon";
    } else {
      // < 6 months
      statusEmoji = "🟢";
      statusText = "Fresh";
    }
  }

  contentEntries.push({
    title,
    lang,
    section: section.charAt(0).toUpperCase() + section.slice(1),
    reviewDate: reviewDateStr,
    diffDays,
    daysUntilExpiry,
    statusEmoji,
    statusText,
    relPath,
    author,
  });
}

walkDirectory(CONTENT_DIR);

// Calculate metrics
const totalFiles = contentEntries.length;
const freshCount = contentEntries.filter(
  (e) => e.statusText === "Fresh",
).length;
const reviewSoonCount = contentEntries.filter(
  (e) => e.statusText === "Review Soon",
).length;
const actionRequiredCount = contentEntries.filter(
  (e) => e.statusText === "Action Required" || e.statusText === "Expired",
).length;

const nowIso = new Date().toISOString().split("T")[0];

let markdown = `# Clinical Content Freshness Dashboard

> **Generated on:** ${nowIso}  
> **Mandatory Policy:** All medical guidance must be reviewed by the clinical team at least once every 365 days.

---

## 📊 Summary Overview

| Metric | Count | Percentage |
| :--- | :---: | :---: |
| **Total Clinical Content Modules** | **${totalFiles}** | 100% |
| 🟢 **Fresh (< 6 months old)** | **${freshCount}** | ${((freshCount / totalFiles) * 100).toFixed(1)}% |
| 🟡 **Due for Review Soon (6–10 months old)** | **${reviewSoonCount}** | ${((reviewSoonCount / totalFiles) * 100).toFixed(1)}% |
| 🔴 **Action Required / Expired (> 10 months old)** | **${actionRequiredCount}** | ${((actionRequiredCount / totalFiles) * 100).toFixed(1)}% |

---

## 🧭 Status Criteria

- 🟢 **Fresh:** Reviewed within the last 180 days (> 185 days remaining).
- 🟡 **Review Soon:** Reviewed 180–300 days ago (65–185 days remaining). Medical team should schedule re-verification.
- 🔴 **Action Required:** Reviewed > 300 days ago (< 65 days remaining or expired). Critical clinical review required before automated build failure.

---

`;

const sections = ["Journey", "Tumors", "Symptoms"];
const sectionTitles = {
  Journey: "🗺️ Treatment Journey Roadmap",
  Tumors: "🔬 Pediatric Tumor Guides",
  Symptoms: "🩺 Symptom & Side-Effect Management",
};

for (const sec of sections) {
  const entries = contentEntries.filter(
    (e) => e.section.toLowerCase() === sec.toLowerCase(),
  );
  if (entries.length === 0) continue;

  // Sort by daysUntilExpiry ascending (most urgent first)
  entries.sort((a, b) => a.daysUntilExpiry - b.daysUntilExpiry);

  markdown += `## ${sectionTitles[sec] || sec} (${entries.length} modules)\n\n`;
  markdown += `| Status | Module Title | Lang | Last Reviewed | Days Until Expiry | File Path |\n`;
  markdown += `| :---: | :--- | :---: | :---: | :---: | :--- |\n`;

  for (const item of entries) {
    const expiryDisplay =
      item.daysUntilExpiry < 0
        ? `**OVERDUE (${Math.abs(item.daysUntilExpiry)}d)**`
        : `${item.daysUntilExpiry}d remaining`;

    markdown += `| ${item.statusEmoji} ${item.statusText} | **${item.title.replace(/\|/g, "\\|")}** | \`${item.lang.toUpperCase()}\` | ${item.reviewDate} | ${expiryDisplay} | [\`${item.relPath}\`](../${item.relPath}) |\n`;
  }

  markdown += `\n---\n\n`;
}

markdown += `*Dashboard automatically maintained by \`npm run content-status\` and validated during QA audits.*\n`;

fs.writeFileSync(OUTPUT_FILE, markdown, "utf-8");

console.log("=========================================");
console.log("   Content Freshness Dashboard Summary   ");
console.log("=========================================");
console.log(`📁 Total Modules Audited: ${totalFiles}`);
console.log(`🟢 Fresh (<6mo):          ${freshCount}`);
console.log(`🟡 Review Soon (6-10mo):   ${reviewSoonCount}`);
console.log(`🔴 Action Required (>10mo): ${actionRequiredCount}`);
console.log(`📄 Dashboard written to:   ${OUTPUT_FILE}`);
console.log("=========================================");
