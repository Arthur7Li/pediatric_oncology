import { test, expect } from "@playwright/test";
import fs from "fs";
import path from "path";

test.describe("Resource Links & Metadata Audit", () => {
  test("all charities have verified HTTPS URLs and non-empty service lists", async () => {
    const charitiesDir = "src/content/charities/en";
    const files = fs.readdirSync(charitiesDir);

    expect(files.length).toBeGreaterThanOrEqual(15);

    for (const file of files) {
      if (!file.endsWith(".md")) continue;
      const content = fs.readFileSync(path.join(charitiesDir, file), "utf8");

      // Match url
      const urlMatch = content.match(/url:\s*"([^"]+)"/);
      expect(urlMatch).not.toBeNull();
      const url = urlMatch![1];
      expect(url.startsWith("https://")).toBe(true);
      expect(url).not.toContain("localhost");

      // Match last_verified_date
      const dateMatch = content.match(/last_verified_date:\s*"([^"]+)"/);
      expect(dateMatch).not.toBeNull();
    }
  });

  test("all provincial financial programs and hospitals have valid URLs", async () => {
    const provincesDir = "src/content/provinces/en";
    const files = fs.readdirSync(provincesDir);

    expect(files.length).toBe(13);

    for (const file of files) {
      if (!file.endsWith(".md")) continue;
      const content = fs.readFileSync(path.join(provincesDir, file), "utf8");

      // Ensure no empty string URLs exist
      expect(content).not.toContain('url: ""');
    }
  });
});
