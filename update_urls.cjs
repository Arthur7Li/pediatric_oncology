const fs = require("fs");
const path = require("path");

const urlMap = {
  "Helping Families Handle Cancer": "https://helpingfamilieshandlecancer.com/",
  "Non-Insured Health Benefits (NIHB)":
    "https://www.canada.ca/en/indigenous-services-canada/services/non-insured-health-benefits-first-nations-inuit.html",
  "BC Childhood Cancer Parents Association (BCCCPA) Family Support Fund":
    "https://bcccpa.org/",
  "First Nations Health Authority (FNHA) Health Benefits":
    "https://www.fnha.ca/benefits",
  "Manitoba Candlelighters Benevolent Fund":
    "https://www.manitobacandlelighters.org/",
  "Variety Manitoba": "https://varietymanitoba.com/",
  "New Brunswick Prescription Drug Program":
    "https://www2.gnb.ca/content/gnb/en/departments/health/MedicarePrescriptionDrugPlan/NBPDP.html",
  "Fuel the Care": "https://www.irvingoil.com/en-CA/community/fuel-the-care",
  "Canadian Cancer Society Travel Fund":
    "https://cancer.ca/en/living-with-cancer/how-we-can-help/transportation",
  "Newfoundland & Labrador Prescription Drug Program (NLPDP)":
    "https://www.gov.nl.ca/hcs/prescription/",
  "Dr. Jack Hand Legacy Foundation": "https://jackhand.ca/",
  "NWT Medical Travel Service":
    "https://www.hss.gov.nt.ca/en/services/medical-travel",
  "Kids with Cancer Society (Edmonton)": "https://kidswithcancer.ca/",
  "Nova Scotia Family Pharmacare":
    "https://novascotia.ca/dhw/pharmacare/family-pharmacare.asp",
  "IWK Foundation Family Comfort Fund": "https://iwkfoundation.org/",
  "Nunavut Medical Travel Program":
    "https://www.gov.nu.ca/en/health/information/medical-travel",
  "OHIP+ (Children & Youth Pharmacare)":
    "https://www.ontario.ca/page/learn-about-ohip-plus",
  "POGO Financial Assistance Program (POFAP)": "https://www.pogo.ca/pofap/",
  "Northern Health Travel Grant (NHTG)":
    "https://www.ontario.ca/page/northern-health-travel-grant-program",
  "PEI Pharmacare Catastrophic Drug Program":
    "https://www.princeedwardisland.ca/en/information/health-pei/catastrophic-drug-program",
  "RAMQ Public Prescription Drug Plan":
    "https://www.ramq.gouv.qc.ca/en/citizens/prescription-drug-insurance",
  "Leucan Financial & Family Services":
    "https://www.leucan.qc.ca/en/our-services/financial-assistance/",
  "CIBC Pediatric Oncology Family Comfort Fund":
    "https://pattisonchildrens.ca/",
  "Yukon Medical Travel Program":
    "https://yukon.ca/en/health-and-wellness/health-care/medical-travel",
};

const provincesDir = "src/content/provinces";
const files = fs.readdirSync(path.join(provincesDir, "en"));

files.forEach((f) => {
  if (!f.endsWith(".md")) return;

  // 1. Parse English file
  const enPath = path.join(provincesDir, "en", f);
  const enLines = fs.readFileSync(enPath, "utf8").split("\n");

  let inFinancial = false;
  let currentEnNames = [];
  const enUrls = [];

  // First pass: extract all financial item names
  let tempName = "";
  for (let line of enLines) {
    if (line.startsWith("financial:")) {
      inFinancial = true;
      continue;
    }
    if (inFinancial && line.startsWith("lang:")) {
      inFinancial = false;
      break;
    }

    if (inFinancial) {
      const nameMatch = line.match(/name:\s*"(.*)"/);
      if (nameMatch) {
        tempName = nameMatch[1];
        currentEnNames.push(tempName);
      }

      const urlMatch = line.match(/url:\s*"(.*)"/);
      if (urlMatch) {
        let url = urlMatch[1];
        if (!url || url === "") {
          url = urlMap[tempName] || "";
        }
        enUrls.push(url);
      }
    }
  }

  // Update English file
  let newEnLines = [];
  inFinancial = false;
  let urlIndex = 0;
  for (let line of enLines) {
    if (line.startsWith("financial:")) {
      inFinancial = true;
      newEnLines.push(line);
      continue;
    }
    if (inFinancial && line.startsWith("lang:")) {
      inFinancial = false;
    }

    if (inFinancial && line.match(/url:\s*"(.*)"/)) {
      newEnLines.push(`    url: "${enUrls[urlIndex]}"`);
      urlIndex++;
    } else {
      newEnLines.push(line);
    }
  }
  fs.writeFileSync(enPath, newEnLines.join("\n"));

  // 2. Update French and Chinese files
  ["fr", "zh"].forEach((lang) => {
    const langPath = path.join(provincesDir, lang, f);
    if (fs.existsSync(langPath)) {
      const langLines = fs.readFileSync(langPath, "utf8").split("\n");
      let newLangLines = [];
      let lInFinancial = false;
      let lUrlIndex = 0;

      for (let line of langLines) {
        if (line.startsWith("financial:")) {
          lInFinancial = true;
          newLangLines.push(line);
          continue;
        }
        if (lInFinancial && line.startsWith("lang:")) {
          lInFinancial = false;
        }

        if (lInFinancial && line.match(/url:\s*"(.*)"/)) {
          newLangLines.push(`    url: "${enUrls[lUrlIndex]}"`);
          lUrlIndex++;
        } else {
          newLangLines.push(line);
        }
      }
      fs.writeFileSync(langPath, newLangLines.join("\n"));
    }
  });
});

console.log("Updated all URLs across en, fr, zh!");
