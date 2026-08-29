import re

with open('src/i18n/translations.ts', 'r') as f:
    content = f.read()

# For EN nav
content = re.sub(
    r'(en: \{.*?nav: \{)(.*?)(medicalDisclaimer: "Medical Disclaimer",?\n\s*\},?)',
    r'\1\n      home: "Home",\n      journey: "The Journey",\n      tumors: "Tumor Guides",\n      symptoms: "Symptom Care",\n      support: "Local Care & Support",\n      glossary: "Glossary",\n      faq: "FAQ",\n      checklists: "Checklists",\n      skipToMain: "Skip to main content",\n      definitionOf: "Definition:",\n      \3',
    content,
    flags=re.DOTALL
)

# For EN glossary and faq
content = re.sub(
    r'(en: \{.*?notFound: \{.*?\},?\n\s*)(\},?\n\s*fr: \{)',
    r'''\1  glossary: {
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
  fr: {''',
    content,
    flags=re.DOTALL
)


# For FR nav
content = re.sub(
    r'(fr: \{.*?nav: \{)(.*?)(medicalDisclaimer: "Avis médical",?\n\s*\},?)',
    r'\1\n      home: "Accueil",\n      journey: "Le Parcours",\n      tumors: "Guides des tumeurs",\n      symptoms: "Symptômes",\n      support: "Soins locaux",\n      glossary: "Glossaire",\n      faq: "FAQ",\n      checklists: "Aide-mémoire",\n      skipToMain: "Aller au contenu principal",\n      definitionOf: "Définition :",\n      \3',
    content,
    flags=re.DOTALL
)

# For FR glossary and faq
content = re.sub(
    r'(fr: \{.*?notFound: \{.*?\},?\n\s*)(\},?\n\s*zh: \{)',
    r'''\1  glossary: {
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
  zh: {''',
    content,
    flags=re.DOTALL
)


# For ZH nav
content = re.sub(
    r'(zh: \{.*?nav: \{)(.*?)(medicalDisclaimer: "医疗免责声明",?\n\s*\},?)',
    r'\1\n      home: "首页",\n      journey: "治疗旅程",\n      tumors: "肿瘤指南",\n      symptoms: "症状管理",\n      support: "本地医疗与支持",\n      glossary: "术语表",\n      faq: "常见问题",\n      checklists: "清单",\n      skipToMain: "跳至主要内容",\n      definitionOf: "定义：",\n      \3',
    content,
    flags=re.DOTALL
)

# For ZH glossary and faq
content = re.sub(
    r'(zh: \{.*?notFound: \{.*?\},?\n\s*)(\}\s*\} as const;)',
    r'''\1  glossary: {
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
\2''',
    content,
    flags=re.DOTALL
)

with open('src/i18n/translations.ts', 'w') as f:
    f.write(content)
print("Updated successfully via python regex.")
