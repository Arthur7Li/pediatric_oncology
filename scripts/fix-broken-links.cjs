const fs = require("fs");
const path = require("path");

const replacements = [
  {
    oldUrl:
      "https://www.cancer.gov/types/brain/patient/child-brain-treatment-pdq",
    newUrl:
      "https://www.cancer.gov/types/brain/patient/child-cns-embryonal-treatment-pdq",
  },
  {
    oldUrl:
      "http://www.bcchildrens.ca/our-services/clinics/oncology-hematology-bmt",
    newUrl:
      "https://www.bcchildrens.ca/our-services/hospital-programs/oncology-hematology-bmt",
  },
  {
    oldUrl: "https://www.alberta.ca/child-health-benefit",
    newUrl: "https://www.alberta.ca/alberta-child-health-benefit.aspx",
  },
  {
    oldUrl: "https://www.sac-isc.gc.ca/eng/1568396042341",
    newUrl:
      "https://www.canada.ca/en/indigenous-services-canada/services/jordans-principle.html",
  },
  {
    oldUrl: "https://www.sac-isc.gc.ca/eng/1579285435955",
    newUrl: "https://www.sac-isc.gc.ca/eng/1572537103543/1572537135017",
  },
  {
    oldUrl: "https://hopeair.org",
    newUrl: "https://hopeair.ca/",
  },
  {
    oldUrl: "https://www.pogo.ca/pofap/",
    newUrl: "https://www.pogo.ca/programs-support/financial-assistance/",
  },
  {
    oldUrl: "https://www.irvingoil.com/en-CA/community/fuel-the-care",
    newUrl: "https://www.irvingoil.com/",
  },
  {
    oldUrl:
      "https://www2.gnb.ca/content/gnb/en/departments/health/MedicarePrescriptionDrugPlan/NBPDP.html",
    newUrl:
      "https://www2.gnb.ca/content/gnb/en/departments/health/MedicarePrescriptionDrugPlan.html",
  },
];

function processDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      processDir(fullPath);
    } else if (
      entry.isFile() &&
      (entry.name.endsWith(".md") ||
        entry.name.endsWith(".astro") ||
        entry.name.endsWith(".ts") ||
        entry.name.endsWith(".json"))
    ) {
      let content = fs.readFileSync(fullPath, "utf8");
      let changed = false;
      for (const r of replacements) {
        if (content.includes(r.oldUrl)) {
          content = content.replaceAll(r.oldUrl, r.newUrl);
          changed = true;
          console.log(
            `Updated link in ${fullPath}: ${r.oldUrl} -> ${r.newUrl}`,
          );
        }
      }
      if (changed) {
        fs.writeFileSync(fullPath, content, "utf8");
      }
    }
  }
}

processDir("src/content");
processDir("src/pages");
processDir("src/data");
console.log("Finished updating all broken/outdated URLs!");
