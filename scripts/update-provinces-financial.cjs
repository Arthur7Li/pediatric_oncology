const fs = require("fs");
const path = require("path");

const urlMapping = {
  "OHIP+": {
    url: "https://www.ontario.ca/page/learn-about-ohip-plus",
    en: "Covers prescription medications for children under 25",
    fr: "Couvre les médicaments sur ordonnance pour les enfants de moins de 25 ans",
    zh: "承保25岁以下儿童的处方药",
  },
  "Trillium Drug Program": {
    url: "https://www.ontario.ca/page/get-help-high-prescription-drug-costs",
    en: "Helps families with high drug costs",
    fr: "Aide les familles ayant des coûts de médicaments élevés",
    zh: "帮助高昂药品费用的家庭",
  },
  "POGO POFAP": {
    url: "https://www.pogo.ca/programs-support/financial-assistance/",
    en: "Reimburses food, accommodation, childcare, travel",
    fr: "Rembourse la nourriture, l'hébergement, la garde d'enfants, les voyages",
    zh: "报销食品、住宿、儿童保育、旅行费用",
  },
  "Northern Health Travel Grant": {
    url: "https://www.ontario.ca/page/northern-health-travel-grant",
    en: "Travel grants for Northern Ontario families",
    fr: "Subventions de voyage pour les familles du nord de l'Ontario",
    zh: "安大略省北部家庭的旅行补助金",
  },
  NIHB: {
    url: "https://www.sac-isc.gc.ca/eng/1579285435955",
    en: "Federal benefits for First Nations and Inuit",
    fr: "Avantages fédéraux pour les Premières Nations et les Inuits",
    zh: "第一民族和因纽特人的联邦福利",
  },
  RAMQ: {
    url: "https://www.ramq.gouv.qc.ca/en",
    en: "Quebec's public prescription drug plan",
    fr: "Régime public d'assurance médicaments du Québec",
    zh: "魁北克省公共处方药计划",
  },
  Leucan: {
    url: "https://www.leucan.qc.ca/en",
    en: "Quebec childhood cancer financial & family services",
    fr: "Services financiers et familiaux de Leucan pour le cancer infantile au Québec",
    zh: "魁北克儿童癌症财务和家庭服务",
  },
  "Fair PharmaCare": {
    url: "https://www2.gov.bc.ca/gov/content/health/health-drug-coverage/pharmacare-for-bc-residents/who-we-cover/fair-pharmacare-plan",
    en: "BC income-based drug coverage",
    fr: "Couverture de médicaments basée sur le revenu en Colombie-Britannique",
    zh: "不列颠哥伦比亚省基于收入的药物承保",
  },
  BCCCPA: {
    url: "https://www.bcchildrens.ca/",
    en: "BC Children's family support fund",
    fr: "Fonds de soutien familial pour enfants de la Colombie-Britannique",
    zh: "不列颠哥伦比亚省儿童家庭支持基金",
  },
  FNHA: {
    url: "https://www.fnha.ca/",
    en: "First Nations Health Authority benefits (BC)",
    fr: "Avantages de la Régie de la santé des Premières Nations (C.-B.)",
    zh: "第一民族卫生局福利（不列颠哥伦比亚省）",
  },
  "Kids with Cancer Society": {
    url: "https://www.kidswithcancer.ca/",
    en: "Alberta childhood cancer financial support",
    fr: "Soutien financier de la Société de l'enfance atteinte de cancer de l'Alberta",
    zh: "阿尔伯塔省儿童癌症财务支持",
  },
  "Alberta Child Health Benefit": {
    url: "https://www.alberta.ca/child-health-benefit",
    en: "Alberta family health benefits",
    fr: "Avantages de santé familiale de l'Alberta",
    zh: "阿尔伯塔省家庭健康福利",
  },
  "Saskatchewan Family Health Benefits": {
    url: "https://www.saskatchewan.ca/residents/health/prescription-drug-plans-and-health-coverage/extended-benefits-and-drug-plan/family-health-benefits",
    en: "SK health benefits",
    fr: "Avantages de santé de la Saskatchewan",
    zh: "萨斯喀彻温省健康福利",
  },
  "Manitoba Pharmacare": {
    url: "https://www.gov.mb.ca/health/pharmacare/",
    en: "MB income-based drug coverage",
    fr: "Couverture de médicaments basée sur le revenu au Manitoba",
    zh: "马尼托巴省基于收入的药物承保",
  },
  "Manitoba Candlelighters": {
    url: "https://www.manitobacandlelighters.org/",
    en: "MB childhood cancer support",
    fr: "Soutien au cancer infantile au Manitoba",
    zh: "马尼托巴省儿童癌症支持",
  },
  "NS Family Pharmacare": {
    url: "https://novascotia.ca/dhw/pharmacare/family-pharmacare.asp",
    en: "Nova Scotia drug coverage",
    fr: "Couverture de médicaments de la Nouvelle-Écosse",
    zh: "新斯科舍省药物承保",
  },
  "IWK Foundation": {
    url: "https://iwkfoundation.org/",
    en: "IWK hospital family comfort fund",
    fr: "Fonds de confort familial de l'hôpital IWK",
    zh: "IWK医院家庭慰问金",
  },
  "NB Prescription Drug Program": {
    url: "https://www2.gnb.ca/content/gnb/en/departments/health/MedicarePrescriptionDrugPlan.html",
    en: "NB drug coverage",
    fr: "Couverture de médicaments du Nouveau-Brunswick",
    zh: "新不伦瑞克省药物承保",
  },
  "PEI Pharmacare": {
    url: "https://www.princeedwardisland.ca/en/information/health-pei/pei-pharmacare-programs",
    en: "PEI drug coverage",
    fr: "Couverture de médicaments de l'Île-du-Prince-Édouard",
    zh: "爱德华王子岛药物承保",
  },
  NLPDP: {
    url: "https://www.gov.nl.ca/hcs/prescription/nlpdp-coverages/",
    en: "NL prescription drug program",
    fr: "Programme de médicaments sur ordonnance de T.-N.-L.",
    zh: "纽芬兰和拉布拉多处方药计划",
  },
  "Candlelighters NL": {
    url: "https://www.candlelightersnl.ca/",
    en: "NL childhood cancer support",
    fr: "Soutien au cancer infantile de T.-N.-L.",
    zh: "纽芬兰和拉布拉多儿童癌症支持",
  },
  "NWT Medical Travel": {
    url: "https://www.hss.gov.nt.ca/en/services/supplementary-health-benefits/medical-travel",
    en: "NWT medical travel",
    fr: "Voyages médicaux des T.N.-O.",
    zh: "西北地区医疗旅行",
  },
  "Nunavut Medical Travel": {
    url: "https://www.gov.nu.ca/health/information/medical-travel",
    en: "Nunavut medical travel",
    fr: "Voyages médicaux du Nunavut",
    zh: "努纳武特医疗旅行",
  },
  "Yukon Medical Travel": {
    url: "https://yukon.ca/en/health-and-wellness/health-care-services/apply-medical-travel-subsidy",
    en: "Yukon medical travel",
    fr: "Voyages médicaux du Yukon",
    zh: "育空医疗旅行",
  },
  "Yukon Pharmacare": {
    url: "https://yukon.ca/en/health-and-wellness/health-care-services/get-pharmacare-coverage",
    en: "Yukon drug coverage",
    fr: "Couverture de médicaments du Yukon",
    zh: "育空药物承保",
  },
};

const getDefaultDesc = (name, lang) => {
  if (lang === "en") return `Financial support program: ${name}`;
  if (lang === "fr") return `Programme de soutien financier: ${name}`;
  if (lang === "zh") return `财务支持计划：${name}`;
  return "";
};

const processFile = (filePath, lang) => {
  let content = fs.readFileSync(filePath, "utf8");

  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return;

  const frontmatter = match[1];
  const body = match[2];

  const lines = frontmatter.split("\n");
  const newLines = [];
  let inFinancial = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith("financial:")) {
      inFinancial = true;
      newLines.push("financial:");
      continue;
    }

    if (inFinancial) {
      const itemMatch = line.match(/^\s*-\s*(['"]?)(.*)\1$/);
      if (itemMatch) {
        let name = itemMatch[2];
        if (name.startsWith('"') && name.endsWith('"'))
          name = name.slice(1, -1);
        if (name.startsWith("'") && name.endsWith("'"))
          name = name.slice(1, -1);

        let url = "";
        let desc = getDefaultDesc(name, lang);

        if (urlMapping[name]) {
          url = urlMapping[name].url;
          desc = urlMapping[name][lang];
        }

        newLines.push(`  - name: "${name.replace(/"/g, '\\"')}"`);
        newLines.push(`    desc: "${desc.replace(/"/g, '\\"')}"`);
        newLines.push(`    url: "${url}"`);
      } else if (line.match(/^\S/)) {
        inFinancial = false;
        newLines.push(line);
      }
    } else {
      newLines.push(line);
    }
  }

  const newContent = `---\n${newLines.join("\n")}\n---\n${body}`;
  fs.writeFileSync(filePath, newContent, "utf8");
};

const dirs = ["en", "fr", "zh"];
const baseDir = path.join(__dirname, "..", "src", "content", "provinces");

dirs.forEach((lang) => {
  const langDir = path.join(baseDir, lang);
  if (fs.existsSync(langDir)) {
    const files = fs.readdirSync(langDir).filter((f) => f.endsWith(".md"));
    files.forEach((f) => {
      processFile(path.join(langDir, f), lang);
    });
  }
});

console.log("Successfully updated financial data in provinces.");
