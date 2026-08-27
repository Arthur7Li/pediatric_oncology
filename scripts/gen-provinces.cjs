const fs = require("fs");
const path = require("path");

const resources = [
  {
    province: "British Columbia",
    hospitals: [
      {
        en: {
          name: "BC Children's Hospital (Vancouver, BC)",
          desc: "The primary tertiary and quaternary care center serving British Columbia and the Yukon, pioneering genomic medicine.",
          linkText: "BC Children's Oncology/BMT",
          linkUrl:
            "http://www.bcchildrens.ca/our-services/clinics/oncology-hematology-bmt",
        },
        fr: {
          name: "BC Children's Hospital (Vancouver, C.-B.)",
          desc: "Centre quaternaire de référence pour la Colombie-Britannique et le Yukon, pionnier de la médecine personnalisée pédiatrique.",
          linkText: "BC Children's Oncology/BMT",
          linkUrl:
            "http://www.bcchildrens.ca/our-services/clinics/oncology-hematology-bmt",
        },
        zh: {
          name: "卑诗省儿童医院 (BC Children's Hospital - 温哥华, 卑诗省)",
          desc: "卑诗省与育空地区唯一的儿童肿瘤专科中心，在实体瘤个体化靶向治疗及原住民健康支持方面经验丰富。",
          linkText: "BC Children's Oncology/BMT",
          linkUrl:
            "http://www.bcchildrens.ca/our-services/clinics/oncology-hematology-bmt",
        },
      },
    ],
    financial: {
      en: [
        "Fair PharmaCare",
        "BC Childhood Cancer Parents Association (BCCCPA) Family Support Fund",
        "First Nations Health Authority (FNHA) Health Benefits",
        "Non-Insured Health Benefits (NIHB)",
      ],
      fr: [
        "Fair PharmaCare",
        "Fonds de soutien aux familles BCCCPA",
        "Avantages en santé de la Régie de la santé des Premières Nations (FNHA)",
        "Services de santé non assurés (SSNA)",
      ],
      zh: [
        "Fair PharmaCare 公平药物计划",
        "卑诗省儿童癌症家长协会 (BCCCPA) 家庭支持基金",
        "原住民卫生局 (FNHA) 健康福利",
        "非医保健康福利 (NIHB)",
      ],
    },
    notes: {
      en: "Premier quaternary care provided in Vancouver, serving BC and the Yukon. Dedicated Indigenous Health Team available on-site.",
      fr: "Soins quaternaires de premier plan fournis à Vancouver, desservant la Colombie-Britannique et le Yukon. Équipe de santé autochtone dédiée disponible sur place.",
      zh: "温哥华提供顶级的四级医疗服务，覆盖卑诗省和育空地区。提供驻点原住民医疗支持团队。",
    },
    title: {
      en: "British Columbia",
      fr: "Colombie-Britannique",
      zh: "不列颠哥伦比亚省",
    },
  },
  {
    province: "Alberta",
    hospitals: [
      {
        en: {
          name: "Stollery Children's Hospital (Edmonton, AB)",
          desc: "Premier quaternary referral center for Northern Alberta and the Northwest Territories, home to the Awasisak Indigenous program.",
          linkText: "Stollery Pediatric Oncology Care",
          linkUrl:
            "https://www.albertahealthservices.ca/stollery/stollery.aspx",
        },
        fr: {
          name: "Stollery Children's Hospital (Edmonton, AB)",
          desc: "Centre d'excellence pour l'Alberta du Nord et les Territoires du Nord-Ouest, hébergeant le programme de santé autochtone Awasisak.",
          linkText: "Stollery Pediatric Oncology Care",
          linkUrl:
            "https://www.albertahealthservices.ca/stollery/stollery.aspx",
        },
        zh: {
          name: "斯托勒里儿童医院 (Stollery Children's Hospital - 埃德蒙顿, 阿尔伯塔省)",
          desc: "加拿大西部主要的儿童实体瘤与神经肿瘤转诊中心，长期承担西北地区的重症转诊与原住民家庭支持。",
          linkText: "Stollery Pediatric Oncology Care",
          linkUrl:
            "https://www.albertahealthservices.ca/stollery/stollery.aspx",
        },
      },
      {
        en: {
          name: "Alberta Children's Hospital (Calgary, AB)",
          desc: "Tertiary pediatric hospital serving Southern Alberta and surrounding areas.",
          linkText: "ACH Oncology",
          linkUrl: "https://www.albertahealthservices.ca/ach/ach.aspx",
        },
        fr: {
          name: "Alberta Children's Hospital (Calgary, AB)",
          desc: "Hôpital pédiatrique de soins tertiaires desservant le sud de l'Alberta et les régions environnantes.",
          linkText: "ACH Oncology",
          linkUrl: "https://www.albertahealthservices.ca/ach/ach.aspx",
        },
        zh: {
          name: "阿尔伯塔儿童医院 (Alberta Children's Hospital - 卡尔加里, 阿尔伯塔省)",
          desc: "服务于阿尔伯塔省南部及周边地区的三级儿童医院。",
          linkText: "ACH Oncology",
          linkUrl: "https://www.albertahealthservices.ca/ach/ach.aspx",
        },
      },
    ],
    financial: {
      en: [
        "Kids with Cancer Society",
        "Alberta Child Health Benefit",
        "Helping Families Handle Cancer",
        "Non-Insured Health Benefits (NIHB)",
      ],
      fr: [
        "Société des enfants atteints de cancer",
        "Prestation de santé pour enfants de l'Alberta",
        "Helping Families Handle Cancer",
        "Services de santé non assurés (SSNA)",
      ],
      zh: [
        "癌症儿童协会",
        "阿尔伯塔省儿童健康福利",
        "帮助家庭应对癌症基金",
        "非医保健康福利 (NIHB)",
      ],
    },
    notes: {
      en: "Comprehensive quaternary care in Edmonton and Calgary. Stollery hosts the Awasisak Indigenous Health Program and heavily supports Northwest Territories patients.",
      fr: "Soins quaternaires complets à Edmonton et Calgary. Stollery héberge le programme de santé autochtone Awasisak et soutient activement les patients des Territoires du Nord-Ouest.",
      zh: "埃德蒙顿和卡尔加里提供全面的四级医疗服务。斯托勒里拥有 Awasisak 原住民健康计划，并大力支持西北地区的患者。",
    },
    title: { en: "Alberta", fr: "Alberta", zh: "阿尔伯塔省" },
  },
  {
    province: "Saskatchewan",
    hospitals: [
      {
        en: {
          name: "Jim Pattison Children's Hospital (Saskatoon, SK)",
          desc: "The primary pediatric center serving families across Saskatchewan.",
          linkText: "JPCH Oncology",
          linkUrl: "https://pattisonchildrens.ca/",
        },
        fr: {
          name: "Jim Pattison Children's Hospital (Saskatoon, SK)",
          desc: "Le principal centre pédiatrique desservant les familles de la Saskatchewan.",
          linkText: "JPCH Oncology",
          linkUrl: "https://pattisonchildrens.ca/",
        },
        zh: {
          name: "吉姆·帕蒂森儿童医院 (Jim Pattison Children's Hospital - 萨斯卡通, 萨省)",
          desc: "服务整个萨斯喀彻温省家庭的主要儿科中心。",
          linkText: "JPCH Oncology",
          linkUrl: "https://pattisonchildrens.ca/",
        },
      },
    ],
    financial: {
      en: [
        "Saskatchewan Family Health Benefits",
        "CIBC Pediatric Oncology Family Comfort Fund",
        "Non-Insured Health Benefits (NIHB)",
      ],
      fr: [
        "Prestations de santé familiales de la Saskatchewan",
        "Fonds de réconfort CIBC pour l'oncologie pédiatrique",
        "Services de santé non assurés (SSNA)",
      ],
      zh: [
        "萨斯喀彻温省家庭健康福利",
        "CIBC 儿童肿瘤家庭慰问基金",
        "非医保健康福利 (NIHB)",
      ],
    },
    notes: {
      en: "Dedicated provincial center in Saskatoon with specialized Indigenous Health navigators.",
      fr: "Centre provincial dédié à Saskatoon avec des navigateurs spécialisés en santé autochtone.",
      zh: "位于萨斯卡通的省级专科中心，配有专门的原住民健康导航员。",
    },
    title: { en: "Saskatchewan", fr: "Saskatchewan", zh: "萨斯喀彻温省" },
  },
  {
    province: "Manitoba",
    hospitals: [
      {
        en: {
          name: "Children's Hospital of Winnipeg (CancerCare Manitoba)",
          desc: "Specialized pediatric oncology center serving Manitoba, Northwestern Ontario, and Nunavut.",
          linkText: "CancerCare MB",
          linkUrl: "https://www.cancercare.mb.ca/",
        },
        fr: {
          name: "Children's Hospital of Winnipeg (CancerCare Manitoba)",
          desc: "Centre spécialisé d'oncologie pédiatrique desservant le Manitoba, le nord-ouest de l'Ontario et le Nunavut.",
          linkText: "CancerCare MB",
          linkUrl: "https://www.cancercare.mb.ca/",
        },
        zh: {
          name: "温尼伯儿童医院 (CancerCare Manitoba - 温尼伯, 曼省)",
          desc: "专门的儿童肿瘤中心，服务于曼尼托巴省、安大略省西北部和努纳武特地区。",
          linkText: "CancerCare MB",
          linkUrl: "https://www.cancercare.mb.ca/",
        },
      },
    ],
    financial: {
      en: [
        "Manitoba Pharmacare",
        "Manitoba Candlelighters Benevolent Fund",
        "Variety Manitoba",
        "Non-Insured Health Benefits (NIHB)",
      ],
      fr: [
        "Régime d'assurance-médicaments du Manitoba",
        "Fonds de bienfaisance Candlelighters du Manitoba",
        "Variety Manitoba",
        "Services de santé non assurés (SSNA)",
      ],
      zh: [
        "曼尼托巴省药物计划",
        "曼省点烛人慈善基金",
        "曼省 Variety 基金",
        "非医保健康福利 (NIHB)",
      ],
    },
    notes: {
      en: "Primary center in Winnipeg with Indigenous Patient Navigators, serving Manitoba, Northwestern Ontario, and the Kivalliq region of Nunavut.",
      fr: "Centre principal à Winnipeg avec des navigateurs pour les patients autochtones, desservant le Manitoba, le nord-ouest de l'Ontario et la région de Kivalliq au Nunavut.",
      zh: "位于温尼伯的主要中心，配有原住民患者导航员，服务于曼尼托巴省、安大略省西北部和努纳武特的 Kivalliq 地区。",
    },
    title: { en: "Manitoba", fr: "Manitoba", zh: "曼尼托巴省" },
  },
  {
    province: "Ontario",
    hospitals: [
      {
        en: {
          name: "The Hospital for Sick Children (SickKids) (Toronto, ON)",
          desc: "Canada's most research-intensive hospital and the premier destination for pediatric oncology and CAR-T cellular therapies.",
          linkText: "AboutKidsHealth",
          linkUrl: "https://www.aboutkidshealth.ca/cancer",
        },
        fr: {
          name: "The Hospital for Sick Children (SickKids) (Toronto, ON)",
          desc: "L'hôpital de recherche pédiatrique le plus réputé au Canada et chef de file mondial en thérapies géniques et cellulaires.",
          linkText: "AboutKidsHealth",
          linkUrl: "https://www.aboutkidshealth.ca/cancer",
        },
        zh: {
          name: "多伦多病童医院 (SickKids - 多伦多, 安大略省)",
          desc: "加拿大科研实力最雄厚、规模最大的顶尖儿童医院，在白血病、神经肿瘤和 CAR-T 细胞疗法领域处于国际领先地位。",
          linkText: "AboutKidsHealth",
          linkUrl: "https://www.aboutkidshealth.ca/cancer",
        },
      },
      {
        en: {
          name: "Children's Hospital of Eastern Ontario (CHEO) (Ottawa, ON)",
          desc: "Bilingual pediatric center providing specialized care for Eastern Ontario and dedicated Inuit patient navigation for Nunavut.",
          linkText: "CHEO Oncology",
          linkUrl: "https://www.cheo.on.ca/",
        },
        fr: {
          name: "Children's Hospital of Eastern Ontario (CHEO) (Ottawa, ON)",
          desc: "Centre spécialisé bilingue desservant l'Est de l'Ontario, l'Outaouais et les familles inuites du Nunavut avec des navigateurs dédiés.",
          linkText: "CHEO Oncology",
          linkUrl: "https://www.cheo.on.ca/",
        },
        zh: {
          name: "东安大略儿童医院 (CHEO - 渥太华, 安大略省)",
          desc: "双语儿童肿瘤中心，重点服务安省东部、魁省部分地区及努纳武特地区的因纽特患儿家庭。",
          linkText: "CHEO Oncology",
          linkUrl: "https://www.cheo.on.ca/",
        },
      },
      {
        en: {
          name: "McMaster Children's Hospital (Hamilton, ON)",
          desc: "Major pediatric tertiary care center serving South-Central Ontario.",
          linkText: "McMaster Oncology",
          linkUrl:
            "https://www.hamiltonhealthsciences.ca/mcmaster-childrens-hospital/",
        },
        fr: {
          name: "McMaster Children's Hospital (Hamilton, ON)",
          desc: "Important centre de soins tertiaires pédiatriques desservant le centre-sud de l'Ontario.",
          linkText: "McMaster Oncology",
          linkUrl:
            "https://www.hamiltonhealthsciences.ca/mcmaster-childrens-hospital/",
        },
        zh: {
          name: "麦克马斯特儿童医院 (McMaster Children's Hospital - 汉密尔顿, 安省)",
          desc: "服务安大略省中南部的主要儿童三级医疗中心。",
          linkText: "McMaster Oncology",
          linkUrl:
            "https://www.hamiltonhealthsciences.ca/mcmaster-childrens-hospital/",
        },
      },
      {
        en: {
          name: "Children's Hospital at London Health Sciences Centre (London, ON)",
          desc: "Specialized pediatric center for Southwestern Ontario.",
          linkText: "LHSC Oncology",
          linkUrl: "https://www.lhsc.on.ca/childrens-hospital",
        },
        fr: {
          name: "Children's Hospital at London Health Sciences Centre (London, ON)",
          desc: "Centre pédiatrique spécialisé pour le sud-ouest de l'Ontario.",
          linkText: "LHSC Oncology",
          linkUrl: "https://www.lhsc.on.ca/childrens-hospital",
        },
        zh: {
          name: "伦敦健康科学中心儿童医院 (London, 安省)",
          desc: "安大略省西南部的专门儿童中心。",
          linkText: "LHSC Oncology",
          linkUrl: "https://www.lhsc.on.ca/childrens-hospital",
        },
      },
      {
        en: {
          name: "Kingston Health Sciences Centre (Kingston, ON)",
          desc: "Pediatric oncology services for Southeastern Ontario.",
          linkText: "KHSC Pediatrics",
          linkUrl: "https://kingstonhsc.ca/",
        },
        fr: {
          name: "Kingston Health Sciences Centre (Kingston, ON)",
          desc: "Services d'oncologie pédiatrique pour le sud-est de l'Ontario.",
          linkText: "KHSC Pediatrics",
          linkUrl: "https://kingstonhsc.ca/",
        },
        zh: {
          name: "金斯顿健康科学中心 (Kingston, 安省)",
          desc: "为安大略省东南部提供儿童肿瘤服务。",
          linkText: "KHSC Pediatrics",
          linkUrl: "https://kingstonhsc.ca/",
        },
      },
    ],
    financial: {
      en: [
        "OHIP+ (Children & Youth Pharmacare)",
        "Trillium Drug Program",
        "POGO Financial Assistance Program (POFAP)",
        "Northern Health Travel Grant (NHTG)",
        "Non-Insured Health Benefits (NIHB)",
      ],
      fr: [
        "Assurance-santé Plus (Régime public d'assurance-médicaments pour les jeunes)",
        "Programme de médicaments Trillium",
        "Programme d'aide financière du POGO (POFAP)",
        "Subventions aux résidents du Nord de l'Ontario pour frais de transport à des fins médicales",
        "Services de santé non assurés (SSNA)",
      ],
      zh: [
        "OHIP+ (儿童及青年药物计划)",
        "Trillium 药物计划",
        "POGO 财务援助计划 (POFAP)",
        "北部健康旅行补助金 (NHTG)",
        "非医保健康福利 (NIHB)",
      ],
    },
    notes: {
      en: "Extensive provincial network. CHEO provides specialized Inuit and Indigenous Navigators supporting Nunavut and Northern Ontario patients.",
      fr: "Réseau provincial étendu. Le CHEO offre des navigateurs spécialisés inuits et autochtones pour soutenir les patients du Nunavut et du Nord de l'Ontario.",
      zh: "庞大的省级医疗网络。CHEO 提供专门的因纽特和原住民导航员，支持努纳武特和安大略省北部的患者。",
    },
    title: { en: "Ontario", fr: "Ontario", zh: "安大略省" },
  },
  {
    province: "Quebec",
    hospitals: [
      {
        en: {
          name: "CHU Sainte-Justine / Charles-Bruneau Oncology Center (Montreal, QC)",
          desc: "The largest mother-child center in Canada and premier pediatric cancer treatment institution for Francophone families.",
          linkText: "Sainte-Justine - Charles-Bruneau",
          linkUrl: "https://www.chusj.org/",
        },
        fr: {
          name: "CHU Sainte-Justine / Centre de cancérologie Charles-Bruneau (Montréal, QC)",
          desc: "Le plus grand centre mère-enfant au Canada et pôle d'excellence en oncologie pédiatrique pour toute la francophonie canadienne.",
          linkText: "Sainte-Justine - Charles-Bruneau",
          linkUrl: "https://www.chusj.org/",
        },
        zh: {
          name: "圣朱斯蒂娜大学医院中心 / 查尔斯-布鲁诺癌症中心 (CHU Sainte-Justine - 蒙特利尔, 魁北克省)",
          desc: "加拿大最大的母婴健康中心，魁北克省乃至全加法语区儿童肿瘤临床、移植与精准医学的领头羊。",
          linkText: "Sainte-Justine - Charles-Bruneau",
          linkUrl: "https://www.chusj.org/",
        },
      },
      {
        en: {
          name: "The Montreal Children's Hospital (Montreal, QC)",
          desc: "Bilingual pediatric tertiary care center affiliated with McGill University.",
          linkText: "Montreal Children's",
          linkUrl: "https://www.thechildren.com/",
        },
        fr: {
          name: "L'Hôpital de Montréal pour enfants (Montréal, QC)",
          desc: "Centre bilingue de soins tertiaires pédiatriques affilié à l'Université McGill.",
          linkText: "Hôpital de Montréal pour enfants",
          linkUrl: "https://www.thechildren.com/",
        },
        zh: {
          name: "蒙特利尔儿童医院 (Montreal, 魁省)",
          desc: "隶属于麦吉尔大学的双语儿童三级医疗中心。",
          linkText: "Montreal Children's",
          linkUrl: "https://www.thechildren.com/",
        },
      },
      {
        en: {
          name: "CHU de Québec-Université Laval (Quebec City, QC)",
          desc: "Primary pediatric oncology center for Eastern Quebec.",
          linkText: "CHU de Québec",
          linkUrl: "https://www.chudequebec.ca/",
        },
        fr: {
          name: "CHU de Québec-Université Laval (Québec, QC)",
          desc: "Principal centre d'oncologie pédiatrique pour l'est du Québec.",
          linkText: "CHU de Québec",
          linkUrl: "https://www.chudequebec.ca/",
        },
        zh: {
          name: "拉瓦尔大学魁北克医疗中心 (魁北克市, 魁省)",
          desc: "魁北克省东部主要的儿童肿瘤中心。",
          linkText: "CHU de Québec",
          linkUrl: "https://www.chudequebec.ca/",
        },
      },
      {
        en: {
          name: "CIUSSS de l'Estrie - CHU de Sherbrooke (Sherbrooke, QC)",
          desc: "Pediatric care center for the Estrie region.",
          linkText: "CHU de Sherbrooke",
          linkUrl: "https://www.santeestrie.qc.ca/",
        },
        fr: {
          name: "CIUSSS de l'Estrie - CHU de Sherbrooke (Sherbrooke, QC)",
          desc: "Centre de soins pédiatriques pour la région de l'Estrie.",
          linkText: "CHU de Sherbrooke",
          linkUrl: "https://www.santeestrie.qc.ca/",
        },
        zh: {
          name: "舍布鲁克大学医疗中心 (Sherbrooke, 魁省)",
          desc: "埃斯特里地区的儿童医疗中心。",
          linkText: "CHU de Sherbrooke",
          linkUrl: "https://www.santeestrie.qc.ca/",
        },
      },
    ],
    financial: {
      en: [
        "RAMQ Public Prescription Drug Plan",
        "Leucan Financial & Family Services",
        "Non-Insured Health Benefits (NIHB)",
      ],
      fr: [
        "Régime public d'assurance-médicaments de la RAMQ",
        "Services financiers et familiaux de Leucan",
        "Services de santé non assurés (SSNA)",
      ],
      zh: [
        "RAMQ 公共处方药计划",
        "Leucan 财务与家庭服务",
        "非医保健康福利 (NIHB)",
      ],
    },
    notes: {
      en: "Comprehensive care and robust financial support led by Leucan and Charles-Bruneau. Serves Francophone and Indigenous families across Quebec and Nunavik.",
      fr: "Soins complets et soutien financier solide dirigés par Leucan et Charles-Bruneau. Dessert les familles francophones et autochtones à travers le Québec et le Nunavik.",
      zh: "由 Leucan 和 Charles-Bruneau 牵头的综合护理和强大的资金支持。服务于整个魁北克和努纳维克的法语和原住民家庭。",
    },
    title: { en: "Quebec", fr: "Québec", zh: "魁北克省" },
  },
  {
    province: "New Brunswick",
    hospitals: [
      {
        en: {
          name: "Dr. Georges-L.-Dumont UHC (Moncton, NB)",
          desc: "Local satellite oncology services.",
          linkText: "Vitalité Health",
          linkUrl: "https://www.vitalitenb.ca/",
        },
        fr: {
          name: "CHUDD Dr-Georges-L.-Dumont (Moncton, N.-B.)",
          desc: "Services d'oncologie par satellite locaux.",
          linkText: "Réseau de santé Vitalité",
          linkUrl: "https://www.vitalitenb.ca/",
        },
        zh: {
          name: "Georges-L.-Dumont 大学医院 (Moncton, 新不伦瑞克)",
          desc: "当地卫星肿瘤服务。",
          linkText: "Vitalité Health",
          linkUrl: "https://www.vitalitenb.ca/",
        },
      },
      {
        en: {
          name: "Saint John Regional Hospital (Saint John, NB)",
          desc: "Local satellite oncology services.",
          linkText: "Horizon Health",
          linkUrl: "https://en.horizonnb.ca/",
        },
        fr: {
          name: "Hôpital régional de Saint John (Saint John, N.-B.)",
          desc: "Services d'oncologie par satellite locaux.",
          linkText: "Réseau de santé Horizon",
          linkUrl: "https://en.horizonnb.ca/",
        },
        zh: {
          name: "圣约翰地区医院 (Saint John, 新不伦瑞克)",
          desc: "当地卫星肿瘤服务。",
          linkText: "Horizon Health",
          linkUrl: "https://en.horizonnb.ca/",
        },
      },
    ],
    financial: {
      en: [
        "New Brunswick Prescription Drug Program",
        "Fuel the Care",
        "Canadian Cancer Society Travel Fund",
        "Non-Insured Health Benefits (NIHB)",
      ],
      fr: [
        "Régime de médicaments du Nouveau-Brunswick",
        "Pleins gaz pour les soins (Fuel the Care)",
        "Fonds de voyage de la Société canadienne du cancer",
        "Services de santé non assurés (SSNA)",
      ],
      zh: [
        "新不伦瑞克处方药计划",
        "Fuel the Care 交通补助",
        "加拿大癌症协会交通基金",
        "非医保健康福利 (NIHB)",
      ],
    },
    notes: {
      en: "Patients with complex oncology needs are coordinated with the IWK Health Centre in Halifax, Nova Scotia.",
      fr: "Les patients ayant des besoins oncologiques complexes sont coordonnés avec le Centre de santé IWK à Halifax, en Nouvelle-Écosse.",
      zh: "病情复杂的肿瘤患儿将由新斯科舍省哈利法克斯的 IWK 健康中心协调治疗。",
    },
    title: { en: "New Brunswick", fr: "Nouveau-Brunswick", zh: "新不伦瑞克省" },
  },
  {
    province: "Nova Scotia",
    hospitals: [
      {
        en: {
          name: "IWK Health Centre (Halifax, NS)",
          desc: "The primary tertiary pediatric oncology institution serving all Maritime provinces in Atlantic Canada.",
          linkText: "IWK Health Oncology Program",
          linkUrl: "https://www.iwk.nshealth.ca/",
        },
        fr: {
          name: "IWK Health Centre (Halifax, N.-É.)",
          desc: "L'institution de référence en oncologie pédiatrique pour l'ensemble des provinces de l'Atlantique (N.-É., N.-B., Î.-P.-É.).",
          linkText: "Programme d'oncologie IWK",
          linkUrl: "https://www.iwk.nshealth.ca/",
        },
        zh: {
          name: "IWK 健康中心 (IWK Health Centre - 哈利法克斯, 新斯科舍省)",
          desc: "大西洋四省（新斯科舍、新不伦瑞克、爱德华王子岛、纽芬兰）的最高级别儿童肿瘤中心。",
          linkText: "IWK Health Oncology Program",
          linkUrl: "https://www.iwk.nshealth.ca/",
        },
      },
    ],
    financial: {
      en: [
        "Nova Scotia Family Pharmacare",
        "IWK Foundation Family Comfort Fund",
        "Non-Insured Health Benefits (NIHB)",
      ],
      fr: [
        "Régime d'assurance-médicaments familial de la Nouvelle-Écosse",
        "Fonds de réconfort familial de la Fondation IWK",
        "Services de santé non assurés (SSNA)",
      ],
      zh: [
        "新斯科舍省家庭药物计划",
        "IWK 基金会家庭慰问基金",
        "非医保健康福利 (NIHB)",
      ],
    },
    notes: {
      en: "The premier pediatric oncology hospital for Atlantic Canada, serving Nova Scotia, New Brunswick, and PEI.",
      fr: "Le principal hôpital d'oncologie pédiatrique du Canada atlantique, desservant la Nouvelle-Écosse, le Nouveau-Brunswick et l'Î.-P.-É.",
      zh: "加拿大大西洋地区首屈一指的儿童肿瘤医院，服务于新斯科舍省、新不伦瑞克省和爱德华王子岛。",
    },
    title: { en: "Nova Scotia", fr: "Nouvelle-Écosse", zh: "新斯科舍省" },
  },
  {
    province: "Prince Edward Island",
    hospitals: [
      {
        en: {
          name: "Queen Elizabeth Hospital (Charlottetown, PEI)",
          desc: "Local satellite care center.",
          linkText: "Health PEI",
          linkUrl: "https://www.princeedwardisland.ca/en/topic/health-pei",
        },
        fr: {
          name: "Hôpital Queen Elizabeth (Charlottetown, Î.-P.-É.)",
          desc: "Centre de soins satellite local.",
          linkText: "Santé Î.-P.-É.",
          linkUrl: "https://www.princeedwardisland.ca/fr/sujet/sante-i-p-e",
        },
        zh: {
          name: "伊丽莎白女王医院 (Charlottetown, 爱德华王子岛)",
          desc: "当地卫星护理中心。",
          linkText: "Health PEI",
          linkUrl: "https://www.princeedwardisland.ca/en/topic/health-pei",
        },
      },
    ],
    financial: {
      en: [
        "PEI Pharmacare Catastrophic Drug Program",
        "IWK Foundation",
        "Non-Insured Health Benefits (NIHB)",
      ],
      fr: [
        "Programme de médicaments pour maladies catastrophiques de l'Î.-P.-É.",
        "Fondation IWK",
        "Services de santé non assurés (SSNA)",
      ],
      zh: ["PEI 大病药物计划", "IWK 基金会", "非医保健康福利 (NIHB)"],
    },
    notes: {
      en: "Local satellite care coordinated with the tertiary IWK Health Centre in Halifax, Nova Scotia.",
      fr: "Soins satellites locaux coordonnés avec le Centre de santé tertiaire IWK à Halifax, en Nouvelle-Écosse.",
      zh: "与新斯科舍省哈利法克斯的 IWK 健康中心协调的本地卫星护理。",
    },
    title: {
      en: "Prince Edward Island",
      fr: "Île-du-Prince-Édouard",
      zh: "爱德华王子岛",
    },
  },
  {
    province: "Newfoundland and Labrador",
    hospitals: [
      {
        en: {
          name: "Janeway Children's Health and Rehabilitation Centre (St. John's, NL)",
          desc: "Primary pediatric hospital for the province.",
          linkText: "Janeway Oncology",
          linkUrl: "https://easternhealth.ca/",
        },
        fr: {
          name: "Centre de santé et de réadaptation pour enfants Janeway (St. John's, T.-N.-L.)",
          desc: "Hôpital pédiatrique principal de la province.",
          linkText: "Oncologie Janeway",
          linkUrl: "https://easternhealth.ca/",
        },
        zh: {
          name: "Janeway 儿童健康与康复中心 (St. John's, 纽芬兰)",
          desc: "该省主要的儿童医院。",
          linkText: "Janeway Oncology",
          linkUrl: "https://easternhealth.ca/",
        },
      },
    ],
    financial: {
      en: [
        "Newfoundland & Labrador Prescription Drug Program (NLPDP)",
        "Candlelighters NL",
        "Dr. Jack Hand Legacy Foundation",
        "Non-Insured Health Benefits (NIHB)",
      ],
      fr: [
        "Programme de médicaments sur ordonnance de Terre-Neuve-et-Labrador",
        "Candlelighters T.-N.-L.",
        "Fondation Dr. Jack Hand Legacy",
        "Services de santé non assurés (SSNA)",
      ],
      zh: [
        "纽芬兰与拉布拉多处方药计划 (NLPDP)",
        "纽芬兰点烛人慈善",
        "Dr. Jack Hand 基金会",
        "非医保健康福利 (NIHB)",
      ],
    },
    notes: {
      en: "Janeway handles the majority of cases in St. John's; complex cellular therapies or rare tumors are coordinated with IWK or SickKids.",
      fr: "Janeway traite la majorité des cas à St. John's ; les thérapies cellulaires complexes ou les tumeurs rares sont coordonnées avec IWK ou SickKids.",
      zh: "Janeway 处理圣约翰绝大多数病例；复杂的细胞疗法或罕见肿瘤则与 IWK 或 SickKids 协调。",
    },
    title: {
      en: "Newfoundland and Labrador",
      fr: "Terre-Neuve-et-Labrador",
      zh: "纽芬兰与拉布拉多省",
    },
  },
  {
    province: "Yukon",
    hospitals: [
      {
        en: {
          name: "Whitehorse General Hospital (Whitehorse, YT)",
          desc: "Local satellite facility.",
          linkText: "Yukon Hospitals",
          linkUrl: "https://yukonhospitals.ca/",
        },
        fr: {
          name: "Hôpital général de Whitehorse (Whitehorse, YT)",
          desc: "Établissement satellite local.",
          linkText: "Hôpitaux du Yukon",
          linkUrl: "https://yukonhospitals.ca/",
        },
        zh: {
          name: "白马市综合医院 (Whitehorse, 育空)",
          desc: "当地卫星医疗机构。",
          linkText: "Yukon Hospitals",
          linkUrl: "https://yukonhospitals.ca/",
        },
      },
    ],
    financial: {
      en: [
        "Yukon Medical Travel Program",
        "Yukon Pharmacare",
        "Non-Insured Health Benefits (NIHB)",
      ],
      fr: [
        "Programme de déplacements pour raisons médicales du Yukon",
        "Assurance-médicaments du Yukon",
        "Services de santé non assurés (SSNA)",
      ],
      zh: ["育空地区医疗旅行计划", "育空药物计划", "非医保健康福利 (NIHB)"],
    },
    notes: {
      en: "Specialized pediatric oncology care is provided at BC Children's Hospital in Vancouver with full travel escort support.",
      fr: "Des soins spécialisés en oncologie pédiatrique sont fournis au BC Children's Hospital de Vancouver avec un soutien complet pour les accompagnateurs de voyage.",
      zh: "温哥华的卑诗省儿童医院提供专门的儿童肿瘤护理，并提供全程护送支持。",
    },
    title: { en: "Yukon", fr: "Yukon", zh: "育空地区" },
  },
  {
    province: "Northwest Territories",
    hospitals: [
      {
        en: {
          name: "Stanton Territorial Hospital (Yellowknife, NT)",
          desc: "Local satellite facility.",
          linkText: "NWT Health",
          linkUrl: "https://www.nthssa.ca/",
        },
        fr: {
          name: "Hôpital territorial Stanton (Yellowknife, T.N.-O.)",
          desc: "Établissement satellite local.",
          linkText: "Santé T.N.-O.",
          linkUrl: "https://www.nthssa.ca/",
        },
        zh: {
          name: "斯坦顿领地医院 (Yellowknife, 西北地区)",
          desc: "当地卫星医疗机构。",
          linkText: "NWT Health",
          linkUrl: "https://www.nthssa.ca/",
        },
      },
    ],
    financial: {
      en: [
        "NWT Medical Travel Service",
        "Non-Insured Health Benefits (NIHB)",
        "Kids with Cancer Society (Edmonton)",
      ],
      fr: [
        "Services de déplacements pour raisons médicales des T.N.-O.",
        "Services de santé non assurés (SSNA)",
        "Société des enfants atteints de cancer (Edmonton)",
      ],
      zh: [
        "西北地区医疗旅行服务",
        "非医保健康福利 (NIHB)",
        "癌症儿童协会 (埃德蒙顿)",
      ],
    },
    notes: {
      en: "Pediatric oncology patients travel to Stollery Children's Hospital in Edmonton, Alberta, supported by the Awasisak Indigenous Health Program.",
      fr: "Les patients en oncologie pédiatrique se rendent à l'Hôpital pour enfants Stollery à Edmonton, en Alberta, avec le soutien du programme de santé autochtone Awasisak.",
      zh: "儿童肿瘤患者前往阿尔伯塔省埃德蒙顿的斯托勒里儿童医院就医，由 Awasisak 原住民健康计划提供支持。",
    },
    title: {
      en: "Northwest Territories",
      fr: "Territoires du Nord-Ouest",
      zh: "西北地区",
    },
  },
  {
    province: "Nunavut",
    hospitals: [
      {
        en: {
          name: "Qikiqtani General Hospital (Iqaluit, NU)",
          desc: "Local satellite facility.",
          linkText: "QGH Health",
          linkUrl: "https://www.gov.nu.ca/",
        },
        fr: {
          name: "Hôpital général Qikiqtani (Iqaluit, NU)",
          desc: "Établissement satellite local.",
          linkText: "Santé QGH",
          linkUrl: "https://www.gov.nu.ca/",
        },
        zh: {
          name: "Qikiqtani 综合医院 (Iqaluit, 努纳武特)",
          desc: "当地卫星医疗机构。",
          linkText: "QGH Health",
          linkUrl: "https://www.gov.nu.ca/",
        },
      },
    ],
    financial: {
      en: [
        "Nunavut Medical Travel Program",
        "Non-Insured Health Benefits (NIHB)",
      ],
      fr: [
        "Programme de déplacements pour raisons médicales du Nunavut",
        "Services de santé non assurés (SSNA)",
      ],
      zh: ["努纳武特医疗旅行计划", "非医保健康福利 (NIHB)"],
    },
    notes: {
      en: "Patients are referred to CHEO in Ottawa (Baffin/Qikiqtaaluk region) or CancerCare Manitoba in Winnipeg (Kivalliq/Kitikmeot regions) with dedicated Inuit navigators.",
      fr: "Les patients sont dirigés vers le CHEO à Ottawa (région de Baffin/Qikiqtaaluk) ou vers ActionCancer Manitoba à Winnipeg (régions de Kivalliq/Kitikmeot) avec des navigateurs inuits dédiés.",
      zh: "患者会被转诊至渥太华的 CHEO (Baffin/Qikiqtaaluk 地区) 或温尼伯的 CancerCare Manitoba (Kivalliq/Kitikmeot 地区)，并有专属的因纽特导航员。",
    },
    title: { en: "Nunavut", fr: "Nunavut", zh: "努纳武特地区" },
  },
];

const langs = ["en", "fr", "zh"];
const baseDir = path.join(__dirname, "../src/content/provinces");

langs.forEach((lang) => {
  const dir = path.join(baseDir, lang);
  fs.mkdirSync(dir, { recursive: true });
});

resources.forEach((r) => {
  const key = r.province.toLowerCase().replace(/\s+/g, "-");

  langs.forEach((lang) => {
    let md = `---
province_key: "${r.province}"
title: "${r.title[lang]}"
hospitals:
`;
    r.hospitals.forEach((h) => {
      md += `  - name: "${h[lang].name}"
    desc: "${h[lang].desc}"
    linkText: "${h[lang].linkText}"
    linkUrl: "${h[lang].linkUrl}"
`;
    });
    md += `financial:
`;
    r.financial[lang].forEach((f) => {
      md += `  - "${f}"
`;
    });
    md += `lang: "${lang}"
---

${r.notes[lang]}
`;
    fs.writeFileSync(path.join(baseDir, lang, `${key}.md`), md);
  });
});
console.log("Done generating markdown files.");
