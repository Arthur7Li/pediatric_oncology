const pa11y = require("pa11y");
const { chromium } = require("@playwright/test");
const fs = require("fs");
const path = require("path");

const chromePath = chromium.executablePath();

function getRealHtmlPages(dir, baseDir = dir) {
  let files = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      files = files.concat(getRealHtmlPages(fullPath, baseDir));
    } else if (item.isFile() && item.name.endsWith(".html")) {
      const content = fs.readFileSync(fullPath, "utf8");
      if (
        content.includes('http-equiv="refresh"') &&
        !content.includes("<main") &&
        !content.includes('id="main-content"')
      ) {
        continue;
      }
      const relPath = path.relative(baseDir, fullPath);
      let urlPath = relPath.replace(/index\.html$/, "").replace(/\.html$/, "");
      if (urlPath && !urlPath.endsWith("/")) {
        urlPath = urlPath + "/";
      }
      files.push(urlPath);
    }
  }
  return files;
}

async function runAudit() {
  const htmlPaths = getRealHtmlPages("dist");
  const urls = htmlPaths.map(
    (p) => `http://localhost:3000/pediatric_oncology/${p}`,
  );
  console.log(
    `Starting WCAG 2.1 AA Accessibility Audit across ${urls.length} routes...`,
  );

  let totalErrors = 0;
  const failedPages = [];

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    process.stdout.write(
      `[${i + 1}/${urls.length}] Auditing ${url.replace("http://localhost:3000/pediatric_oncology/", "") || "/"} ... `,
    );
    try {
      const results = await pa11y(url, {
        standard: "WCAG2AA",
        timeout: 20000,
        wait: 200,
        chromeLaunchConfig: {
          executablePath: chromePath,
          args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-dev-shm-usage",
            "--disable-gpu",
            "--headless=new",
          ],
        },
      });

      const errors = results.issues.filter((issue) => issue.type === "error");
      if (errors.length > 0) {
        console.log(`❌ ${errors.length} error(s)`);
        totalErrors += errors.length;
        failedPages.push({ url, errors });
        for (const err of errors) {
          console.log(`   - [${err.code}] ${err.message} (${err.selector})`);
        }
      } else {
        console.log(`✅ Passed`);
      }
    } catch (err) {
      console.log(`⚠️ Exception: ${err.message}`);
      totalErrors++;
      failedPages.push({ url, errors: [{ message: err.message }] });
    }
  }

  console.log("\n========================================");
  console.log(
    `Audit Complete: ${urls.length - failedPages.length}/${urls.length} routes passed.`,
  );
  console.log(`Total Errors: ${totalErrors}`);
  console.log("========================================");

  if (totalErrors > 0) {
    process.exit(1);
  } else {
    console.log("🎉 100% WCAG 2.1 AA Compliance Verified!");
    process.exit(0);
  }
}

runAudit();
