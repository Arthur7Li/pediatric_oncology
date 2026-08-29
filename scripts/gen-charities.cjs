const fs = require("fs");
const path = require("path");

const charities = [
  {
    id: "canadian-cancer-society",
    name: {
      en: "Canadian Cancer Society",
      fr: "Société canadienne du cancer",
      zh: "加拿大癌症协会",
    },
    scope: "national",
    url: "https://cancer.ca",
    services: {
      en: [
        "Cancer Information helpline (1-888-939-3333)",
        "Transportation assistance",
        "Peer support programs",
        "Camp Goodtimes for children with cancer",
      ],
      fr: [
        "Ligne d'aide sur le cancer (1-888-939-3333)",
        "Aide au transport",
        "Programmes de soutien par les pairs",
        "Camp Goodtimes pour les enfants atteints de cancer",
      ],
      zh: [
        "癌症信息热线 (1-888-939-3333)",
        "交通援助",
        "同伴支持计划",
        "针对患癌儿童的 Camp Goodtimes 夏令营",
      ],
    },
    description: {
      en: "Canada's largest national cancer charity providing comprehensive support services, education, and research funding.",
      fr: "Le plus grand organisme de bienfaisance national de lutte contre le cancer au Canada, offrant des services de soutien complets, de l'éducation et du financement de la recherche.",
      zh: "加拿大最大的国家癌症慈善机构，提供全面的支持服务、教育和研究资金。",
    },
  },
  {
    id: "childhood-cancer-canada",
    name: {
      en: "Childhood Cancer Canada Foundation",
      fr: "Fondation canadienne du cancer chez l'enfant",
      zh: "加拿大儿童癌症基金会",
    },
    scope: "national",
    url: "https://www.childhoodcancer.ca",
    services: {
      en: [
        "EmPower Packs for newly diagnosed children",
        "Compassionate Care Grants (direct financial support)",
        "Survivor Scholarships for post-secondary education",
        "National pediatric oncology research funding via C17 Council",
      ],
      fr: [
        "Trousses EmPower pour les enfants nouvellement diagnostiqués",
        "Subventions pour soins de compassion (soutien financier direct)",
        "Bourses d'études pour survivants (enseignement postsecondaire)",
        "Financement national de la recherche en oncologie pédiatrique via le Conseil C17",
      ],
      zh: [
        "为新确诊儿童提供的 EmPower 关爱包",
        "同情关怀补助金（直接财务支持）",
        "幸存者高等教育奖学金",
        "通过 C17 委员会资助的国家小儿肿瘤学研究",
      ],
    },
    description: {
      en: "A national foundation dedicated to improving the lives of children with cancer through direct support programs and research funding.",
      fr: "Une fondation nationale vouée à l'amélioration de la vie des enfants atteints de cancer par le biais de programmes de soutien direct et du financement de la recherche.",
      zh: "一个致力于通过直接支持项目和研究资金改善患癌儿童生活的国家基金会。",
    },
  },
  {
    id: "ronald-mcdonald-house",
    name: {
      en: "Ronald McDonald House Charities Canada",
      fr: "Œuvre des Manoirs Ronald McDonald du Canada",
      zh: "加拿大麦当劳叔叔之家慈善基金",
    },
    scope: "national",
    url: "https://www.rmhc.ca",
    services: {
      en: [
        "Out-of-town accommodation at 16 Houses and 21 Family Rooms across Canada",
        "Meals and kitchen facilities",
        "Emotional support programs",
      ],
      fr: [
        "Hébergement pour les familles de l'extérieur de la ville dans 16 Manoirs et 21 Salles familiales à travers le Canada",
        "Repas et installations de cuisine",
        "Programmes de soutien émotionnel",
      ],
      zh: [
        "在加拿大各地的 16 栋房屋和 21 间家庭室提供异地住宿",
        "餐饮和厨房设施",
        "情感支持计划",
      ],
    },
    description: {
      en: "Provides a home away from home for families who must travel far for their child's treatment.",
      fr: "Offre un deuxième chez-soi aux familles qui doivent voyager loin pour le traitement de leur enfant.",
      zh: "为必须为了孩子的治疗而远行的家庭提供了一个远方的家。",
    },
  },
  {
    id: "make-a-wish",
    name: {
      en: "Make-A-Wish Canada",
      fr: "Fais-Un-Vœu Canada",
      zh: "加拿大愿望成真基金会",
    },
    scope: "national",
    url: "https://makeawish.ca",
    services: {
      en: [
        "Grants wishes for children aged 3-17 with critical illnesses including cancer",
        "Providing hope, joy, and emotional strength",
      ],
      fr: [
        "Réalise les vœux d'enfants âgés de 3 à 17 ans atteints de maladies graves, y compris le cancer",
        "Apporter de l'espoir, de la joie et de la force émotionnelle",
      ],
      zh: [
        "为 3-17 岁患有包括癌症在内的重病儿童实现愿望",
        "提供希望、欢乐和情感力量",
      ],
    },
    description: {
      en: "Grants life-changing wishes for critically ill children to give them and their families a beacon of hope.",
      fr: "Réalise des vœux qui changent la vie d'enfants gravement malades pour leur donner, ainsi qu'à leur famille, une lueur d'espoir.",
      zh: "为重病儿童实现改变生活的愿望，给他们和他们的家庭带来希望的灯塔。",
    },
  },
  {
    id: "hope-air",
    name: { en: "Hope Air", fr: "Vol d'Espoir", zh: "希望之翼" },
    scope: "national",
    url: "https://hopeair.org",
    services: {
      en: [
        "Free medical flights for patients who must travel long distances for care",
        "Accommodation support",
        "Specific outreach for remote and Indigenous communities",
      ],
      fr: [
        "Vols médicaux gratuits pour les patients qui doivent parcourir de longues distances pour recevoir des soins",
        "Soutien à l'hébergement",
        "Sensibilisation spécifique aux communautés éloignées et autochtones",
      ],
      zh: [
        "为必须长途旅行接受治疗的患者提供免费医疗航班",
        "住宿支持",
        "针对偏远和原住民社区的特定外展服务",
      ],
    },
    description: {
      en: "Provides free flights and travel support for Canadians who cannot afford to travel to medical care.",
      fr: "Fournit des vols et un soutien au voyage gratuits aux Canadiens qui n'ont pas les moyens de se déplacer pour recevoir des soins médicaux.",
      zh: "为负担不起就医旅行费用的加拿大人提供免费航班和旅行支持。",
    },
  },
  {
    id: "campfire-circle",
    name: {
      en: "Campfire Circle",
      fr: "Campfire Circle",
      zh: "营火圈 (Campfire Circle)",
    },
    scope: "provincial",
    province: "Ontario",
    url: "https://campfirecircle.org",
    services: {
      en: [
        "Year-round medically supervised camps in Muskoka and Rainbow Lake",
        "In-hospital programming",
        "Community-based events for children with cancer and their families",
      ],
      fr: [
        "Camps médicalement supervisés tout au long de l'année à Muskoka et Rainbow Lake",
        "Programmes en milieu hospitalier",
        "Événements communautaires pour les enfants atteints de cancer et leurs familles",
      ],
      zh: [
        "在马斯科卡和彩虹湖提供全年受医疗监督的夏令营",
        "院内项目",
        "针对患癌儿童及其家庭的社区活动",
      ],
    },
    description: {
      en: "Formerly Camp Oochigeas & Camp Trillium, offering transformative camp experiences for kids affected by childhood cancer in Ontario.",
      fr: "Anciennement Camp Oochigeas & Camp Trillium, offrant des expériences de camp transformatrices aux enfants touchés par le cancer infantile en Ontario.",
      zh: "前身为 Camp Oochigeas 和 Camp Trillium，为安大略省受儿童癌症影响的儿童提供变革性的营地体验。",
    },
  },
  {
    id: "pogo",
    name: {
      en: "POGO (Pediatric Oncology Group of Ontario)",
      fr: "POGO (Groupe d'oncologie pédiatrique de l'Ontario)",
      zh: "安大略省小儿肿瘤工作组 (POGO)",
    },
    scope: "provincial",
    province: "Ontario",
    url: "https://www.pogo.ca",
    services: {
      en: [
        "POGO Financial Assistance Program (POFAP) for food/accommodation/childcare reimbursement",
        "Satellite Clinic Program",
        "Interlink Nursing Program",
        "AfterCare Program for long-term survivors",
      ],
      fr: [
        "Programme d'aide financière de POGO (POFAP) pour le remboursement de la nourriture, de l'hébergement et de la garde d'enfants",
        "Programme de cliniques satellites",
        "Programme de soins infirmiers Interlink",
        "Programme de suivi (AfterCare) pour les survivants à long terme",
      ],
      zh: [
        "POGO 财务援助计划 (POFAP) 用于食品/住宿/儿童保育报销",
        "卫星诊所计划",
        "跨界护理计划",
        "为长期幸存者提供的善后护理计划",
      ],
    },
    description: {
      en: "Ontario's collaborative organization coordinating pediatric cancer care, support, and survivorship across the province.",
      fr: "Organisation collaborative de l'Ontario qui coordonne les soins, le soutien et la survie du cancer pédiatrique à travers la province.",
      zh: "安大略省的协作组织，负责协调全省的小儿癌症护理、支持和生存。",
    },
  },
  {
    id: "leucan",
    name: { en: "Leucan", fr: "Leucan", zh: "Leucan" },
    scope: "provincial",
    province: "Quebec",
    url: "https://www.leucan.qc.ca/en",
    services: {
      en: [
        "Welcome and emotional support",
        "Peer support (Éclaireurs Leucan)",
        "Direct financial assistance",
        "Massage therapy",
        "Hospital playrooms",
        "Socio-recreational activities",
        "School awareness programs",
      ],
      fr: [
        "Accueil et soutien affectif",
        "Soutien par les pairs (Éclaireurs Leucan)",
        "Aide financière directe",
        "Massothérapie",
        "Salles de jeux en milieu hospitalier",
        "Activités sociorécréatives",
        "Programmes de sensibilisation en milieu scolaire",
      ],
      zh: [
        "欢迎和情感支持",
        "同伴支持 (Éclaireurs Leucan)",
        "直接财务援助",
        "按摩疗法",
        "医院游戏室",
        "社会娱乐活动",
        "学校意识教育项目",
      ],
    },
    description: {
      en: "Quebec's premier childhood cancer support organization offering comprehensive family services from diagnosis through survivorship.",
      fr: "La principale organisation de soutien au cancer infantile du Québec offrant des services familiaux complets du diagnostic à la survie.",
      zh: "魁北克省首屈一指的儿童癌症支持组织，提供从诊断到生存的全面家庭服务。",
    },
  },
  {
    id: "kids-cancer-care-ab",
    name: {
      en: "Kids Cancer Care Foundation of Alberta",
      fr: "Fondation Kids Cancer Care de l'Alberta",
      zh: "阿尔伯塔儿童癌症护理基金会",
    },
    scope: "provincial",
    province: "Alberta",
    url: "https://www.kidscancercare.ab.ca",
    services: {
      en: [
        "Camp Kindle oncology camps",
        "PEER therapeutic exercise programs",
        "Tutoring and educational support",
        "Counselling and child life programs",
        "Research funding",
      ],
      fr: [
        "Camps d'oncologie Camp Kindle",
        "Programmes d'exercices thérapeutiques PEER",
        "Tutorat et soutien éducatif",
        "Programmes de counseling et de milieu de l'enfant",
        "Financement de la recherche",
      ],
      zh: [
        "Camp Kindle 肿瘤学夏令营",
        "PEER 治疗性锻炼项目",
        "辅导和教育支持",
        "心理咨询和儿童生活项目",
        "研究资金",
      ],
    },
    description: {
      en: "Alberta's dedicated childhood cancer charity providing camps, education, and family support programs.",
      fr: "L'organisme de bienfaisance voué au cancer infantile de l'Alberta offrant des camps, de l'éducation et des programmes de soutien familial.",
      zh: "阿尔伯塔省专门的儿童癌症慈善机构，提供夏令营、教育和家庭支持计划。",
    },
  },
  {
    id: "nofcc",
    name: {
      en: "NOFCC (Northern Ontario Families of Children with Cancer)",
      fr: "NOFCC (Familles d'enfants atteints de cancer du Nord de l'Ontario)",
      zh: "北安大略省患癌儿童家庭组织 (NOFCC)",
    },
    scope: "provincial",
    province: "Ontario",
    url: "https://nofcc.ca",
    services: {
      en: [
        "Financial assistance for travel/parking/accommodations",
        "Educational supports",
        "Emotional support for families in remote Northern Ontario areas",
      ],
      fr: [
        "Aide financière pour les déplacements, le stationnement et l'hébergement",
        "Soutiens éducatifs",
        "Soutien affectif pour les familles des régions éloignées du Nord de l'Ontario",
      ],
      zh: [
        "针对旅行/停车/住宿的财务援助",
        "教育支持",
        "为安大略省北部偏远地区的家庭提供情感支持",
      ],
    },
    description: {
      en: "Supports families in Northern Ontario who face unique challenges of distance and isolation during their child's cancer treatment.",
      fr: "Soutient les familles du Nord de l'Ontario qui sont confrontées à des défis uniques d'éloignement et d'isolement pendant le traitement du cancer de leur enfant.",
      zh: "支持安大略省北部的家庭，这些家庭在孩子接受癌症治疗期间面临距离和孤立的独特挑战。",
    },
  },
  {
    id: "candlelighters",
    name: { en: "Candlelighters", fr: "Candlelighters", zh: "Candlelighters" },
    scope: "provincial",
    province: "Multiple",
    url: "https://www.candlelightersnl.ca",
    services: {
      en: [
        "Parking passes",
        "Meal vouchers",
        "Peer support groups",
        "Emotional support for families in regional chapters across Canada",
      ],
      fr: [
        "Laissez-passer de stationnement",
        "Chèques-repas",
        "Groupes de soutien par les pairs",
        "Soutien affectif pour les familles dans les sections régionales à travers le Canada",
      ],
      zh: [
        "停车通行证",
        "餐券",
        "同伴支持小组",
        "为加拿大各地地区分会的家庭提供情感支持",
      ],
    },
    description: {
      en: "A network of regional chapters providing grassroots support to families of children with cancer.",
      fr: "Un réseau de sections régionales offrant un soutien de base aux familles d'enfants atteints de cancer.",
      zh: "一个由地区分会组成的网络，为患癌儿童家庭提供基层支持。",
    },
  },
  {
    id: "nihb",
    name: {
      en: "NIHB (Non-Insured Health Benefits) Program",
      fr: "Programme des SSNA (Services de santé non assurés)",
      zh: "非保险健康福利 (NIHB) 计划",
    },
    scope: "indigenous",
    url: "https://www.sac-isc.gc.ca/eng/1579285435955",
    services: {
      en: [
        "Medical transportation (travel, meals, accommodations)",
        "Pharmacy benefits",
        "Medical supplies and equipment for First Nations and Inuit",
      ],
      fr: [
        "Transport médical (déplacements, repas, hébergement)",
        "Prestations en pharmacie",
        "Fournitures et équipements médicaux pour les Premières Nations et les Inuits",
      ],
      zh: [
        "医疗交通（旅行、餐饮、住宿）",
        "药房福利",
        "原住民和因纽特人的医疗用品和设备",
      ],
    },
    description: {
      en: "A federal program ensuring First Nations and Inuit people receive medically necessary health benefits not covered by provincial plans.",
      fr: "Un programme fédéral veillant à ce que les membres des Premières Nations et les Inuits reçoivent des prestations de santé médicalement nécessaires non couvertes par les régimes provinciaux.",
      zh: "一项联邦计划，旨在确保原住民和因纽特人获得省级计划未涵盖的必要的医疗健康福利。",
    },
  },
  {
    id: "jordans-principle",
    name: {
      en: "Jordan's Principle",
      fr: "Principe de Jordan",
      zh: "乔丹原则",
    },
    scope: "indigenous",
    url: "https://www.sac-isc.gc.ca/eng/1568396042341",
    services: {
      en: [
        "Ensures First Nations children access necessary health, social, and educational products without jurisdictional delays",
        "Covers out-of-pocket costs related to cancer care",
      ],
      fr: [
        "Garantit que les enfants des Premières Nations ont accès aux produits de santé, sociaux et éducatifs nécessaires sans délais juridictionnels",
        "Couvre les menues dépenses liées aux soins contre le cancer",
      ],
      zh: [
        "确保原住民儿童不受管辖权延误而获得必要的健康、社会和教育产品",
        "涵盖与癌症护理相关的自付费用",
      ],
    },
    description: {
      en: "A child-first principle ensuring First Nations children can access the services they need when they need them.",
      fr: "Un principe axé sur l'enfant qui garantit que les enfants des Premières Nations peuvent avoir accès aux services dont ils ont besoin quand ils en ont besoin.",
      zh: "一项以儿童为先的原则，确保原住民儿童在需要时能够获得所需的服务。",
    },
  },
  {
    id: "st-baldricks",
    name: {
      en: "St. Baldrick's Foundation",
      fr: "Fondation St. Baldrick",
      zh: "圣巴德里克基金会 (St. Baldrick's Foundation)",
    },
    scope: "international",
    url: "https://www.stbaldricks.org",
    services: {
      en: [
        "Funds raised at Canadian events stay in Canada via C17 Research Network",
        "Supports pediatric cancer research grants",
      ],
      fr: [
        "Les fonds recueillis lors d'événements canadiens restent au Canada via le réseau de recherche C17",
        "Soutient les subventions de recherche sur le cancer pédiatrique",
      ],
      zh: [
        "通过 C17 研究网络，在加拿大活动中筹集的资金留在加拿大",
        "支持小儿癌症研究拨款",
      ],
    },
    description: {
      en: "An international volunteer-powered charity funding childhood cancer research, with Canadian funds supporting the C17 network.",
      fr: "Un organisme de bienfaisance international propulsé par des bénévoles qui finance la recherche sur le cancer infantile, dont les fonds canadiens soutiennent le réseau C17.",
      zh: "一个由志愿者支持的国际慈善机构，为儿童癌症研究提供资金，加拿大的资金用于支持 C17 网络。",
    },
  },
  {
    id: "alexs-lemonade-stand",
    name: {
      en: "Alex's Lemonade Stand Foundation",
      fr: "Fondation Alex's Lemonade Stand",
      zh: "亚历克斯的柠檬水摊基金会 (Alex's Lemonade Stand Foundation)",
    },
    scope: "international",
    url: "https://www.alexslemonade.org",
    services: {
      en: [
        "Travel for Care program for families enrolled in specialized clinical trials",
        "Comprehensive Family Resource Directory",
      ],
      fr: [
        "Programme de voyage pour les soins (Travel for Care) pour les familles participant à des essais cliniques spécialisés",
        "Répertoire complet des ressources familiales",
      ],
      zh: ["为参与专业临床试验的家庭提供的就医旅行计划", "综合家庭资源目录"],
    },
    description: {
      en: "An international foundation supporting childhood cancer research and family services.",
      fr: "Une fondation internationale soutenant la recherche sur le cancer infantile et les services aux familles.",
      zh: "一个支持儿童癌症研究和家庭服务的国际基金会。",
    },
  },
];

const outputDir = path.join(__dirname, "..", "src", "content", "charities");

const langs = ["en", "fr", "zh"];

langs.forEach((lang) => {
  const langDir = path.join(outputDir, lang);
  if (!fs.existsSync(langDir)) {
    fs.mkdirSync(langDir, { recursive: true });
  }

  charities.forEach((charity) => {
    let frontmatter = `---\nname: "${charity.name[lang].replace(/"/g, '\\"')}"\nurl: "${charity.url}"\nscope: "${charity.scope}"\n`;
    if (charity.province) {
      frontmatter += `province: "${charity.province}"\n`;
    }
    frontmatter += `services:\n`;
    charity.services[lang].forEach((service) => {
      frontmatter += `  - "${service.replace(/"/g, '\\"')}"\n`;
    });
    frontmatter += `last_verified_date: "2026-08-28"\nlang: "${lang}"\n---\n\n${charity.description[lang]}\n`;
    const filePath = path.join(langDir, `${charity.id}.md`);
    fs.writeFileSync(filePath, frontmatter, "utf8");
  });
});

console.log("Successfully generated charities data.");
