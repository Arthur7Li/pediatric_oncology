const fs = require("fs");

let content = fs.readFileSync("src/i18n/translations.ts", "utf8");

// Add nav items to EN
content = content.replace(
  /nav: \{[\s\S]*?definitionOf: "Definition:",[\s\S]*?medicalDisclaimer: "Medical Disclaimer",/,
  `nav: {
      home: "Home",
      journey: "The Journey",
      tumors: "Tumor Guides",
      symptoms: "Symptom Care",
      support: "Local Care & Support",
      glossary: "Glossary",
      faq: "FAQ",
      checklists: "Checklists",
      skipToMain: "Skip to main content",
      definitionOf: "Definition:",
      medicalDisclaimer: "Medical Disclaimer",`,
);

// Add glossary, faq to EN
content = content.replace(
  /  \},[\s\n]*fr: \{/,
  `  },
    glossary: {
      title: "Medical Terms Explained",
      subtitle: "A parent-friendly guide to the medical words you may hear during your child's treatment.",
      searchPlaceholder: "Search for a term...",
      categories: {
        "diagnosis-testing": "Diagnosis & Testing",
        "treatment": "Treatment",
        "blood-lab": "Blood & Lab Results",
        "side-effects": "Side Effects",
        "cancer-types": "Cancer Types",
        "healthcare-team": "Your Care Team",
        "canadian-system": "Canadian Healthcare",
      },
      noResults: "No matching terms found.",
      allCategories: "All Categories",
    },
    faq: {
      title: "Frequently Asked Questions",
      subtitle: "Compassionate, evidence-based answers to the questions families ask most.",
      searchPlaceholder: "Search questions...",
      categories: {
        diagnosis: "Diagnosis & Early Days",
        treatment: "Treatment & Procedures",
        "side-effects": "Side Effects & Daily Life",
        financial: "Financial & Practical",
        emotional: "Emotional & Family",
        misconceptions: "Common Misconceptions",
      },
      mythLabel: "Myth",
      factLabel: "Fact",
      expandAll: "Expand All",
      collapseAll: "Collapse All",
      noResults: "No matching questions found.",
    },
  },
  fr: {`,
);

// Add nav items to FR
content = content.replace(
  /nav: \{[\s\S]*?definitionOf: "Définition :",[\s\S]*?medicalDisclaimer: "Avis médical",/,
  `nav: {
      home: "Accueil",
      journey: "Le Parcours",
      tumors: "Guides des tumeurs",
      symptoms: "Symptômes",
      support: "Soins locaux",
      glossary: "Glossaire",
      faq: "FAQ",
      checklists: "Aide-mémoire",
      skipToMain: "Aller au contenu principal",
      definitionOf: "Définition :",
      medicalDisclaimer: "Avis médical",`,
);

// Add glossary, faq to FR
content = content.replace(
  /  \},[\s\n]*zh: \{/,
  `  },
    glossary: {
      title: "Termes médicaux expliqués",
      subtitle: "Un guide accessible pour comprendre les termes médicaux que vous entendrez pendant le traitement de votre enfant.",
      searchPlaceholder: "Rechercher un terme...",
      categories: {
        "diagnosis-testing": "Diagnostic et examens",
        "treatment": "Traitement",
        "blood-lab": "Sang et résultats de laboratoire",
        "side-effects": "Effets secondaires",
        "cancer-types": "Types de cancer",
        "healthcare-team": "Votre équipe soignante",
        "canadian-system": "Système de santé canadien",
      },
      noResults: "Aucun terme correspondant trouvé.",
      allCategories: "Toutes les catégories",
    },
    faq: {
      title: "Questions fréquentes",
      subtitle: "Des réponses bienveillantes et fondées sur des données probantes aux questions les plus posées par les familles.",
      searchPlaceholder: "Rechercher des questions...",
      categories: {
        diagnosis: "Diagnostic et premiers jours",
        treatment: "Traitement et procédures",
        "side-effects": "Effets secondaires et vie quotidienne",
        financial: "Finances et aspects pratiques",
        emotional: "Émotions et famille",
        misconceptions: "Idées reçues",
      },
      mythLabel: "Mythe",
      factLabel: "Réalité",
      expandAll: "Tout déplier",
      collapseAll: "Tout replier",
      noResults: "Aucune question correspondante trouvée.",
    },
  },
  zh: {`,
);

// Add nav items to ZH
content = content.replace(
  /nav: \{[\s\S]*?definitionOf: "定义：",[\s\S]*?medicalDisclaimer: "医疗免责声明",/,
  `nav: {
      home: "首页",
      journey: "治疗旅程",
      tumors: "肿瘤指南",
      symptoms: "症状管理",
      support: "本地医疗与支持",
      glossary: "术语表",
      faq: "常见问题",
      checklists: "清单",
      skipToMain: "跳至主要内容",
      definitionOf: "定义：",
      medicalDisclaimer: "医疗免责声明",`,
);

// Add glossary, faq to ZH
content = content.replace(
  /  \},[\s\n]*\} as const;/,
  `  },
    glossary: {
      title: "医学术语解读",
      subtitle: "帮助您理解孩子治疗过程中可能遇到的医学术语。",
      searchPlaceholder: "搜索术语...",
      categories: {
        "diagnosis-testing": "诊断与检查",
        "treatment": "治疗",
        "blood-lab": "血液与化验",
        "side-effects": "副作用",
        "cancer-types": "癌症类型",
        "healthcare-team": "医疗团队",
        "canadian-system": "加拿大医疗体系",
      },
      noResults: "未找到相关术语。",
      allCategories: "所有分类",
    },
    faq: {
      title: "常见问题",
      subtitle: "为患儿家庭最常提出的问题提供有据可依、充满关怀的解答。",
      searchPlaceholder: "搜索问题...",
      categories: {
        diagnosis: "诊断与初期",
        treatment: "治疗与手术",
        "side-effects": "副作用与日常生活",
        financial: "经济与实际问题",
        emotional: "情感与家庭",
        misconceptions: "常见误解",
      },
      mythLabel: "误解",
      factLabel: "事实",
      expandAll: "全部展开",
      collapseAll: "全部收起",
      noResults: "未找到相关问题。",
    },
  },
} as const;`,
);

fs.writeFileSync("src/i18n/translations.ts", content);
console.log("Successfully updated translations.ts");
