const fs = require("fs");
const path = require("path");

const terms = {
  en: {
    "diagnosis-testing": [
      {
        term: "Biopsy",
        definition:
          "A procedure where a tiny piece of tissue is removed to be checked under a microscope. This is often the best way to know for sure if a lump or mass is cancer.",
      },
      {
        term: "Staging",
        definition:
          "The process of finding out how much cancer is in the body and if it has spread. Doctors use this information to plan the safest and most effective treatment.",
      },
      {
        term: "Bone Marrow Aspirate",
        definition:
          "A test where a small amount of liquid bone marrow is taken, usually from the hip bone, using a needle. It helps doctors see if there are cancer cells inside the bone marrow, often used for leukemia.",
      },
      {
        term: "Lumbar Puncture (Spinal Tap)",
        definition:
          "A procedure where a thin needle is placed in the lower back to collect cerebrospinal fluid (CSF). It checks if cancer cells have spread to the fluid surrounding the brain and spinal cord.",
      },
      {
        term: "MRI (Magnetic Resonance Imaging)",
        definition:
          "A scan that uses strong magnets and radio waves to create detailed pictures of the inside of the body. It does not use radiation and is excellent for looking at the brain and spinal cord.",
      },
      {
        term: "CT Scan (Computed Tomography)",
        definition:
          "A scan that takes many X-ray pictures from different angles to create cross-sectional images of the body. It is often used to get a clear picture of organs and bones quickly.",
      },
      {
        term: "PET Scan (Positron Emission Tomography)",
        definition:
          "A scan that uses a small amount of radioactive sugar to find cancer cells, which tend to take up more sugar than normal cells. It helps show where active cancer is in the body.",
      },
      {
        term: "Pathology",
        definition:
          "The study of diseases by looking at tissues and cells under a microscope. A pathologist is the specialized doctor who examines your child's biopsy to make an exact diagnosis.",
      },
    ],
    treatment: [
      {
        term: "Chemotherapy",
        definition:
          "Medicines designed to kill fast-growing cells, like cancer cells. Because kids' bodies are still growing, they often receive specific combinations different from adults.",
      },
      {
        term: "Radiation Therapy",
        definition:
          "The use of high-energy X-rays or particles to destroy cancer cells and shrink tumors. Pediatric teams are very careful to limit radiation to protect a child's growing body.",
      },
      {
        term: "Immunotherapy",
        definition:
          "A treatment that helps the child's own immune system fight the cancer. It trains the body to recognize and attack cancer cells more effectively.",
      },
      {
        term: "CAR-T Cell Therapy",
        definition:
          "A cutting-edge treatment where a child's own immune cells (T cells) are collected, modified in a lab to fight cancer, and given back. Often used for certain types of relapsed leukemia.",
      },
      {
        term: "Stem Cell Transplant",
        definition:
          "A procedure that replaces diseased bone marrow with healthy stem cells that can grow into new, healthy blood cells. It allows doctors to use higher doses of chemotherapy.",
      },
      {
        term: "Induction",
        definition:
          "The first, most intense phase of treatment, aimed at killing as many cancer cells as possible. The goal is to get the child into remission.",
      },
      {
        term: "Consolidation",
        definition:
          "The phase of treatment that follows induction, designed to kill any remaining hidden cancer cells.",
      },
      {
        term: "Maintenance",
        definition:
          "The final, longest, and usually gentlest phase of treatment to keep the cancer from returning. It can last for months or years.",
      },
      {
        term: "Clinical Trial",
        definition:
          "A carefully controlled research study that tests new treatments. In pediatric oncology, participating in trials is very common and helps improve cure rates.",
      },
      {
        term: "Port-a-cath (Port)",
        definition:
          "A type of central line placed completely under the skin, usually on the chest. A special needle is inserted through the skin into the port when medicines or blood draws are needed.",
      },
    ],
    "blood-lab": [
      {
        term: "Complete Blood Count (CBC)",
        definition:
          "A very common blood test that counts the number of red blood cells, white blood cells, and platelets. You will hear about this test frequently during treatment.",
      },
      {
        term: "Hemoglobin (Hb)",
        definition:
          "The protein in red blood cells that carries oxygen around the body. Low hemoglobin can make your child feel very tired or look pale.",
      },
      {
        term: "Platelets",
        definition:
          "Tiny cell fragments that help the blood clot to stop bleeding. If platelets are low, your child may bruise easily or get nosebleeds.",
      },
      {
        term: "White Blood Cells (WBC)",
        definition:
          "The body's defense system cells that fight off infections. Treatment often lowers WBCs, making kids more vulnerable to getting sick.",
      },
      {
        term: "Absolute Neutrophil Count (ANC)",
        definition:
          "A measure of the specific white blood cells (neutrophils) that fight bacterial infections. If the ANC is low, your child is at a much higher risk of catching a serious infection.",
      },
      {
        term: "Neutropenia",
        definition:
          "A condition where the number of neutrophils is dangerously low. During neutropenia, even a mild fever is treated as a medical emergency.",
      },
      {
        term: "Thrombocytopenia",
        definition:
          "A medical term for having a low platelet count. It means the blood cannot clot well, and your child might need a platelet transfusion.",
      },
      {
        term: "Anemia",
        definition:
          "A condition caused by a low number of red blood cells or low hemoglobin. It often requires a blood transfusion to help your child feel energetic again.",
      },
    ],
    "side-effects": [
      {
        term: "Neutropenic Fever (Febrile Neutropenia)",
        definition:
          "When a child has a fever while their infection-fighting white blood cells (ANC) are low. This is a medical emergency requiring immediate hospital visit for IV antibiotics.",
      },
      {
        term: "Mucositis",
        definition:
          "Painful inflammation and sores in the mouth, throat, or digestive tract caused by chemotherapy. It can make eating and drinking difficult.",
      },
      {
        term: "Alopecia",
        definition:
          "The medical term for hair loss, a common and usually temporary side effect of many chemotherapy drugs and radiation.",
      },
      {
        term: "Nausea and Emesis",
        definition:
          "The medical terms for feeling sick to the stomach and vomiting. Doctors have excellent anti-nausea medications to help prevent this.",
      },
      {
        term: "Neuropathy",
        definition:
          "Nerve damage that can cause tingling, numbness, or pain, usually in the hands or feet. In kids, it might also cause constipation or make it hard to walk.",
      },
      {
        term: "Tumor Lysis Syndrome (TLS)",
        definition:
          "A condition when many cancer cells die quickly and release their contents into the blood. It can strain the kidneys, so kids are given lots of IV fluids.",
      },
      {
        term: "GVHD (Graft-Versus-Host Disease)",
        definition:
          "A complication after an allogeneic stem cell transplant where the donor's immune cells attack the patient's body. It can affect the skin, liver, or gut.",
      },
      {
        term: "Sepsis",
        definition:
          "A severe, life-threatening body-wide response to an infection. Because kids on chemo have weak immune systems, doctors treat any sign of infection aggressively.",
      },
    ],
    "cancer-types": [
      {
        term: "Leukemia",
        definition:
          "A cancer of the blood and bone marrow, and the most common type of childhood cancer. The two most common pediatric types are ALL and AML.",
      },
      {
        term: "Lymphoma",
        definition:
          "A cancer that starts in the lymphatic system, part of the body's immune system. Hodgkin and Non-Hodgkin are the two main types in children.",
      },
      {
        term: "Sarcoma",
        definition:
          "A type of cancer that grows in bones or soft tissues like muscle, fat, or cartilage. Osteosarcoma and Ewing sarcoma are common in older children and teens.",
      },
      {
        term: "Blastoma",
        definition:
          "A type of cancer caused by malignancies in developing cells, commonly seen in children. Examples include neuroblastoma, nephroblastoma/Wilms tumor, and medulloblastoma.",
      },
      {
        term: "Malignant",
        definition:
          "The medical term for cancerous tumors that can grow aggressively and spread to other parts of the body.",
      },
      {
        term: "Benign",
        definition:
          "A tumor that is not cancerous and generally will not spread. However, benign tumors in the brain can still cause serious problems.",
      },
      {
        term: "Metastasis",
        definition:
          "The spread of cancer cells from where they first started to new areas of the body.",
      },
      {
        term: "Remission",
        definition:
          "A period when all signs of the cancer are gone from tests and scans. It is the primary goal of initial cancer treatment.",
      },
    ],
    "healthcare-team": [
      {
        term: "Oncologist",
        definition:
          "A doctor who specializes in diagnosing and treating cancer. A pediatric oncologist specializes entirely in cancers affecting children and teenagers.",
      },
      {
        term: "Social Worker",
        definition:
          "A professional who helps families navigate the emotional, logistical, and financial challenges of a cancer diagnosis. They are a vital link to community resources.",
      },
      {
        term: "Child Life Specialist",
        definition:
          "A trained professional who helps children cope with the stress of the hospital using play, education, and distraction techniques during procedures.",
      },
      {
        term: "Palliative Care",
        definition:
          "A specialized medical team focused on providing relief from symptoms and stress. In pediatrics, palliative care is often involved alongside active cancer treatment.",
      },
      {
        term: "Nurse Practitioner (NP)",
        definition:
          "An advanced practice nurse who can examine patients, diagnose illnesses, and prescribe medicines, working closely with the oncologist.",
      },
    ],
    "canadian-system": [
      {
        term: "Provincial Health Insurance (e.g., OHIP, RAMQ, MSP)",
        definition:
          "The publicly funded healthcare system in your province that covers the vast majority of medical costs, hospital stays, and doctor visits.",
      },
      {
        term: "Pharmacare / Provincial Drug Programs",
        definition:
          "Government programs that help cover the costs of prescription medications, including some chemotherapies taken at home. Every province has different rules.",
      },
      {
        term: "C17 Council",
        definition:
          "The national organization representing all 16 pediatric hematology/oncology programs across Canada. They coordinate research, clinical trials, and care standards.",
      },
      {
        term: "COG Protocol (Children's Oncology Group)",
        definition:
          "Treatment plans developed by the world's largest childhood cancer research organization. Canadian hospitals follow COG protocols for standardized care.",
      },
      {
        term: "Out-of-Province Coverage",
        definition:
          "When specialized treatment isn't available locally, your provincial health plan coordinates and pays for care in another Canadian province.",
      },
    ],
  },
  fr: {
    "diagnosis-testing": [
      {
        term: "Biopsie",
        definition:
          "Une procédure où un minuscule morceau de tissu est prélevé pour être examiné au microscope. C'est souvent le meilleur moyen de savoir avec certitude si une grosseur ou une masse est un cancer.",
      },
      {
        term: "Stadification",
        definition:
          "Le processus pour déterminer la quantité de cancer dans le corps et s'il s'est propagé. Les médecins utilisent ces informations pour planifier le traitement le plus sûr et le plus efficace.",
      },
      {
        term: "Aspiration de la moelle osseuse",
        definition:
          "Un test où une petite quantité de moelle osseuse liquide est prélevée, généralement dans l'os de la hanche, à l'aide d'une aiguille. Il aide les médecins à voir s'il y a des cellules cancéreuses à l'intérieur de la moelle osseuse.",
      },
      {
        term: "Ponction lombaire",
        definition:
          "Une procédure où une fine aiguille est placée dans le bas du dos pour prélever le liquide céphalo-rachidien (LCR). Elle vérifie si les cellules cancéreuses se sont propagées au liquide entourant le cerveau et la moelle épinière.",
      },
      {
        term: "IRM (Imagerie par Résonance Magnétique)",
        definition:
          "Un scan qui utilise des aimants puissants et des ondes radio pour créer des images détaillées de l'intérieur du corps. Il n'utilise pas de rayonnement.",
      },
      {
        term: "Tomodensitométrie (Scanner CT)",
        definition:
          "Un scan qui prend de nombreuses images aux rayons X sous différents angles pour créer des images en coupe du corps.",
      },
      {
        term: "Tomographie par Émission de Positons (TEP)",
        definition:
          "Un scan qui utilise une petite quantité de sucre radioactif pour trouver les cellules cancéreuses, qui ont tendance à absorber plus de sucre que les cellules normales.",
      },
      {
        term: "Pathologie",
        definition:
          "L'étude des maladies en examinant les tissus et les cellules au microscope. Un pathologiste est le médecin spécialisé qui examine la biopsie de votre enfant.",
      },
    ],
    treatment: [
      {
        term: "Chimiothérapie",
        definition:
          "Médicaments conçus pour tuer les cellules à croissance rapide, comme les cellules cancéreuses. Comme le corps des enfants est encore en croissance, ils reçoivent souvent des combinaisons spécifiques.",
      },
      {
        term: "Radiothérapie",
        definition:
          "L'utilisation de rayons X ou de particules à haute énergie pour détruire les cellules cancéreuses et rétrécir les tumeurs.",
      },
      {
        term: "Immunothérapie",
        definition:
          "Un traitement qui aide le propre système immunitaire de l'enfant à combattre le cancer. Il entraîne le corps à reconnaître et à attaquer les cellules cancéreuses.",
      },
      {
        term: "Thérapie par lymphocytes T à CAR",
        definition:
          "Un traitement de pointe où les propres cellules immunitaires (cellules T) d'un enfant sont prélevées, modifiées en laboratoire pour combattre le cancer, et réadministrées.",
      },
      {
        term: "Greffe de cellules souches",
        definition:
          "Une procédure qui remplace la moelle osseuse malade par des cellules souches saines qui peuvent se transformer en nouvelles cellules sanguines saines.",
      },
      {
        term: "Induction",
        definition:
          "La première phase de traitement, la plus intense, visant à tuer autant de cellules cancéreuses que possible. L'objectif est d'amener l'enfant en rémission.",
      },
      {
        term: "Consolidation",
        definition:
          "La phase de traitement qui suit l'induction, conçue pour tuer toutes les cellules cancéreuses cachées restantes.",
      },
      {
        term: "Entretien",
        definition:
          "La phase finale, la plus longue et généralement la plus douce du traitement pour empêcher le cancer de revenir. Elle peut durer des mois ou des années.",
      },
      {
        term: "Essai clinique",
        definition:
          "Une étude de recherche soigneusement contrôlée qui teste de nouveaux traitements. En oncologie pédiatrique, la participation à des essais est très courante.",
      },
      {
        term: "Chambre à cathéter implantable (Port-a-cath)",
        definition:
          "Un type de voie centrale placée complètement sous la peau, généralement sur la poitrine. Une aiguille spéciale y est insérée lors des traitements.",
      },
    ],
    "blood-lab": [
      {
        term: "Hémogramme complet (NFS)",
        definition:
          "Un test sanguin très courant qui compte le nombre de globules rouges, de globules blancs et de plaquettes. Vous entendrez souvent parler de ce test.",
      },
      {
        term: "Hémoglobine (Hb)",
        definition:
          "La protéine des globules rouges qui transporte l'oxygène dans tout le corps. Une faible hémoglobine peut rendre votre enfant très fatigué ou pâle.",
      },
      {
        term: "Plaquettes",
        definition:
          "De minuscules fragments cellulaires qui aident le sang à coaguler pour arrêter les saignements. Si les plaquettes sont basses, votre enfant peut avoir des ecchymoses facilement.",
      },
      {
        term: "Globules blancs (GB)",
        definition:
          "Les cellules du système de défense de l'organisme qui combattent les infections. Le traitement abaisse souvent les GB, rendant les enfants plus vulnérables.",
      },
      {
        term: "Polynucléaires neutrophiles (PNN)",
        definition:
          "Une mesure des globules blancs spécifiques (neutrophiles) qui combattent les infections bactériennes. Si les PNN sont bas, votre enfant court un risque accru d'infection.",
      },
      {
        term: "Neutropénie",
        definition:
          "Une condition où le nombre de neutrophiles est dangereusement bas. Pendant la neutropénie, même une légère fièvre est traitée comme une urgence médicale.",
      },
      {
        term: "Thrombopénie",
        definition:
          "Terme médical désignant un faible nombre de plaquettes. Cela signifie que le sang ne peut pas bien coaguler, et votre enfant pourrait avoir besoin d'une transfusion.",
      },
      {
        term: "Anémie",
        definition:
          "Une condition causée par un faible nombre de globules rouges ou une faible hémoglobine. Elle nécessite souvent une transfusion sanguine.",
      },
    ],
    "side-effects": [
      {
        term: "Fièvre neutropénique",
        definition:
          "Lorsqu'un enfant a de la fièvre alors que ses globules blancs qui combattent les infections (PNN) sont bas. C'est une urgence médicale.",
      },
      {
        term: "Mucosite",
        definition:
          "Inflammation douloureuse et plaies dans la bouche, la gorge ou le tube digestif causées par la chimiothérapie.",
      },
      {
        term: "Alopécie",
        definition:
          "Le terme médical pour la perte de cheveux, un effet secondaire courant et généralement temporaire de nombreux médicaments de chimiothérapie.",
      },
      {
        term: "Nausées et vomissements",
        definition:
          "Les termes médicaux pour le fait de se sentir mal à l'estomac. Les médecins disposent d'excellents médicaments anti-nauséeux pour aider à prévenir cela.",
      },
      {
        term: "Neuropathie",
        definition:
          "Lésion nerveuse qui peut causer des picotements, un engourdissement ou des douleurs, généralement dans les mains ou les pieds.",
      },
      {
        term: "Syndrome de lyse tumorale",
        definition:
          "Une condition qui survient lorsque de nombreuses cellules cancéreuses meurent rapidement et libèrent leur contenu dans le sang. Cela peut fatiguer les reins.",
      },
      {
        term: "Maladie du greffon contre l'hôte (GVHD)",
        definition:
          "Une complication après une greffe de cellules souches allogéniques où les cellules immunitaires du donneur attaquent le corps du patient.",
      },
      {
        term: "Sepsis",
        definition:
          "Une réponse sévère et potentiellement mortelle du corps entier à une infection. Traitée de manière agressive chez les enfants sous chimio.",
      },
    ],
    "cancer-types": [
      {
        term: "Leucémie",
        definition:
          "Un cancer du sang et de la moelle osseuse, et le type de cancer infantile le plus courant (ex: LAL et LMA).",
      },
      {
        term: "Lymphome",
        definition:
          "Un cancer qui commence dans le système lymphatique, une partie du système immunitaire du corps (Hodgkin et non-hodgkinien).",
      },
      {
        term: "Sarcome",
        definition:
          "Un type de cancer qui se développe dans les os ou les tissus mous comme les muscles, la graisse ou le cartilage.",
      },
      {
        term: "Blastome",
        definition:
          "Un type de cancer causé par des tumeurs malignes dans les cellules en développement, fréquemment observé chez les enfants (ex: neuroblastome).",
      },
      {
        term: "Malin",
        definition:
          "Terme médical pour les tumeurs cancéreuses qui peuvent se développer de manière agressive et se propager à d'autres parties du corps.",
      },
      {
        term: "Bénin",
        definition:
          "Une tumeur qui n'est pas cancéreuse et qui, généralement, ne se propagera pas. Toutefois, dans le cerveau, elles peuvent causer de graves problèmes.",
      },
      {
        term: "Métastase",
        definition:
          "La propagation de cellules cancéreuses de l'endroit où elles ont commencé à de nouvelles zones du corps.",
      },
      {
        term: "Rémission",
        definition:
          "Période au cours de laquelle tous les signes du cancer ont disparu des examens et des scans. C'est l'objectif principal du traitement initial.",
      },
    ],
    "healthcare-team": [
      {
        term: "Oncologue",
        definition:
          "Un médecin spécialisé dans le diagnostic et le traitement du cancer. Un oncologue pédiatrique se spécialise entièrement dans les cancers touchant les enfants.",
      },
      {
        term: "Travailleur social",
        definition:
          "Un professionnel qui aide les familles à surmonter les défis émotionnels, logistiques et financiers d'un diagnostic de cancer.",
      },
      {
        term: "Spécialiste du milieu de l'enfant (Child Life)",
        definition:
          "Un professionnel formé qui aide les enfants à faire face au stress de l'hôpital en utilisant le jeu, l'éducation et des techniques de distraction.",
      },
      {
        term: "Soins palliatifs",
        definition:
          "Une équipe médicale spécialisée axée sur le soulagement des symptômes et du stress, souvent impliquée aux côtés du traitement actif du cancer.",
      },
      {
        term: "Infirmière praticienne (IP)",
        definition:
          "Une infirmière de pratique avancée qui peut examiner des patients, diagnostiquer des maladies et prescrire des médicaments.",
      },
    ],
    "canadian-system": [
      {
        term: "Assurance maladie provinciale (ex: OHIP, RAMQ, MSP)",
        definition:
          "Le système de santé financé par l'État de votre province qui couvre la grande majorité des frais médicaux, séjours à l'hôpital et visites chez le médecin.",
      },
      {
        term: "Assurance médicaments",
        definition:
          "Programmes gouvernementaux qui aident à couvrir les coûts des médicaments sur ordonnance, y compris certaines chimiothérapies prises à la maison.",
      },
      {
        term: "Conseil C17",
        definition:
          "L'organisation nationale représentant les 16 programmes d'hématologie/oncologie pédiatrique à travers le Canada.",
      },
      {
        term: "Protocole du COG",
        definition:
          "Plans de traitement élaborés par la plus grande organisation de recherche sur le cancer infantile au monde (Children's Oncology Group). Les hôpitaux canadiens les suivent.",
      },
      {
        term: "Couverture hors province",
        definition:
          "Lorsque le traitement spécialisé n'est pas disponible localement, votre régime de santé provincial coordonne et paie pour les soins dans une autre province canadienne.",
      },
    ],
  },
  zh: {
    "diagnosis-testing": [
      {
        term: "活检 (Biopsy)",
        definition:
          "通过手术取出一小块组织在显微镜下进行检查的过程。这通常是确定肿块是否为癌症的最准确方法。",
      },
      {
        term: "分期 (Staging)",
        definition:
          "确定体内癌症的范围以及是否发生扩散的过程。医生根据这些信息制定最安全、最有效的治疗方案。",
      },
      {
        term: "骨髓穿刺 (Bone Marrow Aspirate)",
        definition:
          "使用细针通常从髋骨抽取少量液体骨髓的检查，帮助医生查看骨髓内是否有癌细胞，常用于白血病。",
      },
      {
        term: "腰椎穿刺 (Lumbar Puncture)",
        definition:
          "将细针插入下背部以收集脑脊液（CSF）的过程，用于检查癌细胞是否已扩散到大脑和脊髓周围的液体中。",
      },
      {
        term: "核磁共振成像 (MRI)",
        definition:
          "利用强磁场和无线电波创建身体内部详细图像的扫描。不使用辐射，非常适合检查大脑和脊髓。",
      },
      {
        term: "计算机断层扫描 (CT Scan)",
        definition:
          "从不同角度拍摄多张X光片以创建身体横截面图像的扫描，通常用于快速获取器官和骨骼的清晰图像。",
      },
      {
        term: "正电子发射断层扫描 (PET Scan)",
        definition:
          "利用少量放射性糖来寻找癌细胞的扫描，癌细胞通常比正常细胞吸收更多的糖分，有助于显示体内活跃的癌症部位。",
      },
      {
        term: "病理学 (Pathology)",
        definition:
          "通过在显微镜下观察组织和细胞来研究疾病的学科。病理学家是检查活检样本并做出确切诊断的专科医生。",
      },
    ],
    treatment: [
      {
        term: "化疗 (Chemotherapy)",
        definition:
          "旨在杀死快速生长细胞（如癌细胞）的药物。因为儿童的身体仍在生长，他们通常接受与成人不同的特定药物组合。",
      },
      {
        term: "放疗 (Radiation Therapy)",
        definition:
          "使用高能X射线或粒子摧毁癌细胞并缩小肿瘤。儿科团队会非常谨慎地限制辐射，以保护儿童正在发育的身体。",
      },
      {
        term: "免疫疗法 (Immunotherapy)",
        definition:
          "帮助孩子自身免疫系统对抗癌症的治疗方法。它训练身体更有效地识别和攻击癌细胞。",
      },
      {
        term: "CAR-T细胞疗法",
        definition:
          "一种前沿治疗，收集孩子自身的免疫细胞（T细胞），在实验室中进行修改以对抗癌症，然后再输回体内。常用于某些类型的复发性白血病。",
      },
      {
        term: "干细胞移植 (Stem Cell Transplant)",
        definition:
          "用能发育成健康新血细胞的健康干细胞替换患病骨髓的手术，这使医生能够使用更高剂量的化疗。",
      },
      {
        term: "诱导治疗 (Induction)",
        definition:
          "治疗的第一个、最强烈的阶段，旨在杀死尽可能多的癌细胞。目标是让孩子进入缓解期。",
      },
      {
        term: "巩固治疗 (Consolidation)",
        definition: "诱导治疗之后的阶段，旨在杀死任何剩余的隐蔽癌细胞。",
      },
      {
        term: "维持治疗 (Maintenance)",
        definition:
          "治疗的最后、最长通常也是最温和的阶段，以防止癌症复发，可能持续数月或数年。",
      },
      {
        term: "临床试验 (Clinical Trial)",
        definition:
          "测试新疗法的受到严格控制的研究。在小儿肿瘤学中，参与试验非常普遍，有助于提高治愈率。",
      },
      {
        term: "输液港 (Port-a-cath)",
        definition:
          "一种完全放置在皮肤下（通常在胸部）的中心静脉导管。需要药物或抽血时，通过皮肤将特殊的针插入输液港。",
      },
    ],
    "blood-lab": [
      {
        term: "全血细胞计数 (CBC)",
        definition:
          "一种非常常见的血液检测，用于计算红细胞、白细胞和血小板的数量。治疗期间会经常听到这个检测。",
      },
      {
        term: "血红蛋白 (Hemoglobin, Hb)",
        definition:
          "红细胞中负责在全身输送氧气的蛋白质。血红蛋白偏低会使孩子感到非常疲倦或脸色苍白。",
      },
      {
        term: "血小板 (Platelets)",
        definition:
          "帮助血液凝固止血的微小细胞碎片。如果血小板低，您的孩子可能容易出现瘀伤或流鼻血。",
      },
      {
        term: "白细胞 (White Blood Cells, WBC)",
        definition:
          "抵抗感染的身体防御系统细胞。治疗通常会降低白细胞数量，使孩子更容易生病。",
      },
      {
        term: "绝对中性粒细胞计数 (ANC)",
        definition:
          "抵抗细菌感染的特定白细胞（中性粒细胞）的测量值。如果ANC很低，孩子感染严重疾病的风险会高得多。",
      },
      {
        term: "中性粒细胞减少症 (Neutropenia)",
        definition:
          "中性粒细胞数量处于危险低水平的情况。在此期间，即使是轻微发烧也会被视为医疗紧急情况处理。",
      },
      {
        term: "血小板减少症 (Thrombocytopenia)",
        definition:
          "表示血小板计数低的医学术语，意味着血液不能很好地凝固，您的孩子可能需要输注血小板。",
      },
      {
        term: "贫血 (Anemia)",
        definition:
          "由红细胞数量少或血红蛋白低引起的情况，通常需要输血以帮助孩子恢复活力。",
      },
    ],
    "side-effects": [
      {
        term: "中性粒细胞减少性发热 (Neutropenic Fever)",
        definition:
          "当孩子发烧且抗感染白细胞（ANC）偏低时的情况。这是医疗急症，需立即去医院接受静脉抗生素治疗。",
      },
      {
        term: "黏膜炎 (Mucositis)",
        definition:
          "由化疗引起的口腔、咽喉或消化道的疼痛性炎症和溃疡，可能导致饮食困难。",
      },
      {
        term: "脱发 (Alopecia)",
        definition:
          "脱发的医学术语，这是许多化疗药物和放疗常见且通常是暂时的副作用。",
      },
      {
        term: "恶心和呕吐 (Nausea and Emesis)",
        definition:
          "感到胃部不适和呕吐的医学术语。医生有极好的止吐药物来帮助预防这种情况。",
      },
      {
        term: "神经病变 (Neuropathy)",
        definition:
          "神经损伤可能导致通常在手或脚部的刺痛、麻木或疼痛。在儿童中，这也可能引起便秘或使行走困难。",
      },
      {
        term: "肿瘤溶解综合征 (Tumor Lysis Syndrome, TLS)",
        definition:
          "当大量癌细胞迅速死亡并将其内容物释放到血液中时发生的情况，它会对肾脏造成负担，因此会给孩子注射大量静脉输液。",
      },
      {
        term: "移植物抗宿主病 (GVHD)",
        definition:
          "异基因干细胞移植后的并发症，捐献者的免疫细胞攻击患者身体，可能影响皮肤、肝脏或肠道。",
      },
      {
        term: "败血症 (Sepsis)",
        definition:
          "对感染产生的严重、危及生命的全身性反应。因为化疗期间儿童免疫系统较弱，医生会积极治疗任何感染迹象。",
      },
    ],
    "cancer-types": [
      {
        term: "白血病 (Leukemia)",
        definition:
          "血液和骨髓的癌症，是最常见的儿童癌症类型。最常见的两种儿科类型是ALL和AML。",
      },
      {
        term: "淋巴瘤 (Lymphoma)",
        definition:
          "始于淋巴系统（身体免疫系统一部分）的癌症。霍奇金和非霍奇金是儿童中的两种主要类型。",
      },
      {
        term: "肉瘤 (Sarcoma)",
        definition:
          "生长在骨骼或软组织（如肌肉、脂肪或软骨）中的一种癌症。骨肉瘤和尤文肉瘤在年龄较大的儿童和青少年中很常见。",
      },
      {
        term: "母细胞瘤 (Blastoma)",
        definition:
          "由发育细胞中的恶性肿瘤引起的癌症，常见于儿童，例如神经母细胞瘤、肾母细胞瘤/韦尔姆斯瘤和髓母细胞瘤。",
      },
      {
        term: "恶性 (Malignant)",
        definition:
          "指可能具有侵袭性生长并扩散到身体其他部位的癌性肿瘤的医学术语。",
      },
      {
        term: "良性 (Benign)",
        definition:
          "非癌性且通常不会扩散的肿瘤，但脑部的良性肿瘤仍可能引起严重问题。",
      },
      {
        term: "转移 (Metastasis)",
        definition: "癌细胞从最初开始的地方扩散到身体的新区域。",
      },
      {
        term: "缓解 (Remission)",
        definition:
          "通过测试和扫描表明所有癌症迹象都已消失的时期。这是初始癌症治疗的首要目标。",
      },
    ],
    "healthcare-team": [
      {
        term: "肿瘤科医生 (Oncologist)",
        definition:
          "专门从事癌症诊断和治疗的医生。小儿肿瘤科医生完全专门从事影响儿童和青少年的癌症。",
      },
      {
        term: "社会工作者 (Social Worker)",
        definition:
          "帮助家庭应对癌症诊断带来的情感、后勤和财务挑战的专业人员，他们是联系社区资源的重要纽带。",
      },
      {
        term: "儿童生活专家 (Child Life Specialist)",
        definition:
          "受过培训的专业人员，通过在医疗程序中使用游戏、教育和分散注意力的技巧来帮助儿童应对医院的压力。",
      },
      {
        term: "姑息治疗 (Palliative Care)",
        definition:
          "专注于缓解症状和压力的专门医疗团队。在儿科，姑息治疗通常与积极的癌症治疗同时进行。",
      },
      {
        term: "执业护士 (Nurse Practitioner, NP)",
        definition:
          "能够检查患者、诊断疾病和开药的高级执业护士，他们与肿瘤科医生密切合作。",
      },
    ],
    "canadian-system": [
      {
        term: "省级健康保险 (如OHIP, RAMQ, MSP)",
        definition:
          "您所在省份的公共资助医疗保健系统，覆盖绝大多数医疗费用、住院费和医生就诊费。",
      },
      {
        term: "药物保健 / 省级药物计划",
        definition:
          "帮助支付处方药费用的政府计划，包括一些在家服用的化疗药物。每个省份的规定不同。",
      },
      {
        term: "C17委员会 (C17 Council)",
        definition:
          "代表加拿大所有16个儿科血液/肿瘤学项目的全国性组织，他们协调研究、临床试验和护理标准。",
      },
      {
        term: "儿童肿瘤学组方案 (COG Protocol)",
        definition:
          "由全球最大的儿童癌症研究组织制定的治疗计划。加拿大医院遵循COG方案以提供标准化护理。",
      },
      {
        term: "省外医疗覆盖 (Out-of-Province Coverage)",
        definition:
          "当当地无法提供专科治疗时，您的省级健康计划会协调并支付在加拿大另一个省份的护理费用。",
      },
    ],
  },
};

const dirs = [
  "src/content/glossary/en",
  "src/content/glossary/fr",
  "src/content/glossary/zh",
];

dirs.forEach((dir) => {
  const fullPath = path.join(__dirname, "..", dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
});

for (const lang of Object.keys(terms)) {
  for (const category of Object.keys(terms[lang])) {
    const categoryTerms = terms[lang][category];
    const frontmatter = `---
category: "${category}"
terms:
${categoryTerms
  .map(
    (t) => `  - term: "${t.term}"
    definition: "${t.definition}"`,
  )
  .join("\n")}
lang: "${lang}"
---
`;

    const filePath = path.join(
      __dirname,
      "..",
      `src/content/glossary/${lang}/${category}.md`,
    );
    fs.writeFileSync(filePath, frontmatter);
  }
}

console.log("Glossary generated successfully!");
