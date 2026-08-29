const fs = require("fs");
const path = require("path");

const categories = [
  "diagnosis",
  "treatment",
  "side-effects",
  "financial",
  "emotional",
  "misconceptions",
];

const icons = {
  diagnosis: "🔬",
  treatment: "💊",
  "side-effects": "⚠️",
  financial: "💰",
  emotional: "💙",
  misconceptions: "🚫",
};

const data = {
  en: {
    diagnosis: [
      {
        q: "Is childhood cancer caused by something I did?",
        a: "No. Unlike many adult cancers, childhood cancers are not caused by lifestyle or environmental factors. They generally occur due to random genetic mutations in developing cells. There is nothing you could have done to prevent this.",
        r: false,
      },
      {
        q: "How is childhood cancer different from adult cancer?",
        a: "Childhood cancers behave differently, respond differently to treatment, and have different biological origins. Children often tolerate intensive chemotherapy better than adults. The most common types in children are leukemias and brain tumors, rather than the breast, lung, or colon cancers typical in adults.",
        r: true,
      },
      {
        q: "What does staging mean for my child?",
        a: "Staging describes where the cancer is located and whether it has spread. This helps doctors determine the most effective treatment plan. For childhood cancers, the staging system varies by cancer type, but typically ranges from localized disease to disease that has spread to other parts of the body.",
        r: true,
      },
      {
        q: "Should I get a second opinion?",
        a: "Getting a second opinion is a standard practice and a right within the Canadian healthcare system. Pediatric oncology centers in Canada work closely together through the C17 Council, so your child's oncologist can often facilitate a consultation with specialists at other institutions.",
        r: true,
      },
      {
        q: "How do I explain this diagnosis to my child?",
        a: "Use clear, age-appropriate language and avoid making promises you can't keep. Children often sense when something is wrong, so being honest helps build trust. Hospital child life specialists and social workers are excellent resources to help you find the right words for your child's age.",
        r: false,
      },
      {
        q: "How many children in Canada are diagnosed with cancer each year?",
        a: "According to the Canadian Cancer Society, approximately 1,000 children under the age of 15 are diagnosed with cancer in Canada each year. While it is rare, childhood cancer is the leading disease-related cause of death for Canadian children.",
        r: false,
      },
      {
        q: "What are the survival rates for childhood cancer?",
        a: "Survival rates have improved significantly. Currently, over 83% of children diagnosed with cancer in Canada survive at least five years past their diagnosis, and cure rates continue to improve through research and clinical trials. However, survival rates vary significantly depending on the specific type of cancer.",
        r: true,
      },
      {
        q: "What is the role of a pediatric oncologist?",
        a: "A pediatric oncologist is a doctor who specializes in diagnosing and treating children with cancer. They lead your child's medical team, coordinate treatments like chemotherapy, and work alongside other specialists, nurses, and social workers.",
        r: true,
      },
    ],
    treatment: [
      {
        q: "Will my child lose their hair during treatment?",
        a: "Hair loss is a common side effect of many chemotherapy drugs, but it depends on the specific treatment plan. Hair typically grows back after treatment finishes, though it may be a different texture or color initially. Hats, scarves, or soft beanies can help your child feel more comfortable.",
        r: true,
      },
      {
        q: "How long does childhood cancer treatment typically last?",
        a: "Treatment timelines vary dramatically based on the cancer type and protocol. Some treatments may last a few months, while others, like maintenance therapy for acute lymphoblastic leukemia (ALL), can last two to three years. Your oncologist will provide a detailed roadmap for your child's specific diagnosis.",
        r: true,
      },
      {
        q: "What is a port and why does my child need one?",
        a: "A port (or port-a-cath) is a small medical device placed under the skin, usually on the chest, to give medicines and draw blood. It saves your child from needing repeated needle pokes and makes administering chemotherapy much easier and less painful.",
        r: true,
      },
      {
        q: "Are clinical trials safe for my child?",
        a: "Clinical trials in Canada and through the Children's Oncology Group (COG) are strictly regulated to ensure patient safety. They are essential for advancing treatments and improving survival rates. Participation is always voluntary, and your doctor will explain all risks and benefits.",
        r: true,
      },
      {
        q: "Can my child still go to school during treatment?",
        a: "School attendance depends on your child's immune system, treatment schedule, and energy levels. Many children need to take time off or use hospital or homebound tutoring services. Social workers and educators can help set up a plan to support your child's education safely.",
        r: true,
      },
      {
        q: "What is chemotherapy and how does it work?",
        a: "Chemotherapy involves powerful medicines to kill cancer cells or stop them from growing. Because it targets rapidly dividing cells, it can also affect healthy cells, leading to side effects. There are many different types, given by mouth, injection, or through an IV.",
        r: true,
      },
      {
        q: "Will my child need radiation therapy?",
        a: "Not all childhood cancers require radiation therapy. When needed, it uses high-energy rays to destroy cancer cells in a specific area. Your medical team will discuss whether radiation is necessary and how they plan to minimize its impact on your child's growing body.",
        r: true,
      },
      {
        q: "What is a stem cell or bone marrow transplant?",
        a: "A transplant replaces diseased bone marrow with healthy stem cells, often after high doses of chemotherapy. It is typically reserved for certain types of leukemia, lymphoma, or solid tumors and requires a long hospital stay with strict infection control.",
        r: true,
      },
    ],
    "side-effects": [
      {
        q: "What foods should my child avoid during treatment?",
        a: "During periods when your child's immune system is weak, follow specific food safety guidelines. This often includes avoiding raw or undercooked meats, unpasteurized dairy, and unwashed raw fruits and vegetables. Always consult your child's oncology dietitian for personalized advice.",
        r: true,
      },
      {
        q: "Can my child be around other children and pets?",
        a: "Interaction with others is generally encouraged for well-being, but avoid anyone who is sick or recently exposed to contagious illnesses like chickenpox. Being around healthy family pets is usually fine, but avoid letting your child clean litter boxes or birdcages.",
        r: true,
      },
      {
        q: "What are neutropenic precautions?",
        a: "Neutropenia occurs when white blood cell counts are low, making it harder to fight infections. Precautions involve strict handwashing, avoiding sick contacts, and treating any fever as an absolute medical emergency requiring immediate hospital assessment.",
        r: true,
      },
      {
        q: "When should I take my child to the emergency room?",
        a: "A fever (typically 38.3°C or higher once, or 38.0°C sustained for an hour) during treatment is a medical emergency requiring immediate attention. Also seek urgent care for severe pain, difficulty breathing, unmanageable vomiting, or any warning signs provided by your oncology team.",
        r: true,
      },
      {
        q: "How can I help my child deal with nausea?",
        a: "Your medical team can provide highly effective anti-nausea medications. Offering small, frequent meals and avoiding strong-smelling foods can also help. Let your team know if your child is struggling, as medications can often be adjusted.",
        r: true,
      },
      {
        q: "Will my child's growth and development be affected?",
        a: "Some treatments can have late effects that impact growth, cognitive development, or organ function later in life. Pediatric oncologists carefully balance the need to cure the cancer with minimizing long-term risks. Survivors are monitored in long-term follow-up clinics.",
        r: true,
      },
    ],
    financial: [
      {
        q: "Will I have to pay for my child's cancer treatment in Canada?",
        a: "In Canada, all medically necessary hospital and physician services, including chemotherapy and surgery, are covered by provincial healthcare plans under the Canada Health Act. However, you may face out-of-pocket costs for prescription medications taken at home, travel, parking, and lost wages.",
        r: false,
      },
      {
        q: "Can both parents take time off work to care for our child?",
        a: "Parents may be eligible for the federal Employment Insurance (EI) Family Caregiver Benefit for Children, which provides up to 35 weeks of financial assistance that can be shared between caregivers. Your hospital social worker can help you apply.",
        r: false,
      },
      {
        q: "What if we need to travel for treatment?",
        a: "If you must travel far from home, organizations like Hope Air can assist with flights. Accommodations may be supported by Ronald McDonald Houses or provincial programs like the POGO Financial Assistance Program in Ontario. Your social worker will connect you with travel grants for your province.",
        r: false,
      },
      {
        q: "Are there charities in Canada that can help with daily expenses?",
        a: "Yes, several charities provide financial support. Organizations like Childhood Cancer Canada, Leucan (in Quebec), and Kids Cancer Care (in Alberta) offer various grants for food, gas, and daily expenses. Ask your hospital social worker, as they can connect you with available funds.",
        r: false,
      },
      {
        q: "What tax credits or financial aid are available?",
        a: "Families may qualify for the Disability Tax Credit (DTC) and the Child Disability Benefit (CDB) through the Canada Revenue Agency. You can also claim eligible out-of-pocket medical and travel expenses on your income tax return. Your doctor will need to fill out the T2201 form for the DTC.",
        r: false,
      },
      {
        q: "How do I navigate hospital parking and meal costs?",
        a: "Hospital parking and food can quickly become expensive. Speak to your social worker about discounted parking passes for long-term patients. Some local charities and hospital foundations also offer meal vouchers for parents staying at the bedside.",
        r: false,
      },
    ],
    emotional: [
      {
        q: "How do I support my child's siblings during this time?",
        a: "Siblings often feel scared, confused, or neglected. Maintain their routines as much as possible, keep them informed with age-appropriate honesty, and validate their feelings. Many hospitals offer sibling support programs through child life specialists.",
        r: false,
      },
      {
        q: "Is it normal to feel angry or guilty about the diagnosis?",
        a: "Absolutely. It is completely normal for parents to experience intense emotions including anger, guilt, profound sadness, and anxiety. Acknowledging these feelings is the first step. Remember that the diagnosis is not your fault.",
        r: false,
      },
      {
        q: "Where can I find mental health support for our family?",
        a: "Your oncology team includes social workers and psychologists who specialize in helping families cope with childhood cancer. They can provide counseling or refer you to community mental health professionals who understand pediatric illness.",
        r: false,
      },
      {
        q: "How do I talk to friends and family about the diagnosis?",
        a: "Share what you feel comfortable sharing, and don't be afraid to set boundaries. Some parents designate a family member or use a private blog or app like CaringBridge to update everyone at once, saving emotional exhaustion from repeating the story.",
        r: false,
      },
      {
        q: "How can my partner and I stay strong together?",
        a: "The stress of a child's illness can strain relationships. Keep communication open, recognize that you may cope differently, and try to give each other grace. Seek couples counseling if you find it difficult to navigate this pressure together.",
        r: false,
      },
      {
        q: "Are there support groups for parents of children with cancer in Canada?",
        a: "Yes, connecting with other parents who understand can be incredibly validating. Ask your social worker about local hospital support groups, or look into organizations like Childhood Cancer Canada and Leucan, which facilitate peer-to-peer connections.",
        r: false,
      },
    ],
    misconceptions: [
      {
        q: "Myth: Childhood cancer is always terminal.",
        a: "With advances in medical research, the overall survival rate for childhood cancer in Canada is now over 83%. While the journey is difficult, the majority of children go on to live long, fulfilling lives after treatment.",
        r: true,
      },
      {
        q: "Myth: Sugar feeds cancer and should be completely eliminated.",
        a: "All cells in the body use glucose (sugar) for energy, including healthy ones. Eliminating sugar will not stop cancer from growing and can lead to dangerous malnutrition, especially when a child needs calories to endure treatment. A balanced diet guided by your oncology dietitian is best.",
        r: true,
      },
      {
        q: "Myth: My child caused this by eating or doing something wrong.",
        a: "Childhood cancer is not caused by diet, minor injuries, or behavior. It is the result of random cellular mutations that occur during development. There is nothing your child did to cause their illness.",
        r: true,
      },
      {
        q: "Myth: Alternative therapies can safely replace chemotherapy.",
        a: "There is no scientific evidence that alternative therapies can cure pediatric cancer. Relying on them instead of proven medical treatments is extremely dangerous. Always discuss any complementary therapies (like massage or supplements) with your oncologist to ensure they don't interfere with treatment.",
        r: true,
      },
      {
        q: "Myth: If a child seems healthy, they don't need all their treatments.",
        a: "Even if a child looks and feels well, microscopic cancer cells can remain in the body. Completing the entire course of treatment as prescribed by your oncologist is essential to prevent a relapse.",
        r: true,
      },
      {
        q: "Myth: Childhood cancer is the same as adult cancer, just in a smaller body.",
        a: "Pediatric cancers are fundamentally different from adult cancers in their biology, tumor types, and treatment response. This is why children require specialized care from pediatric oncologists rather than adult cancer doctors.",
        r: true,
      },
    ],
  },
  fr: {
    diagnosis: [
      {
        q: "Le cancer de mon enfant est-il causé par quelque chose que j'ai fait ?",
        a: "Non. Contrairement à de nombreux cancers chez l'adulte, les cancers infantiles ne sont pas causés par le mode de vie ou des facteurs environnementaux. Ils surviennent généralement en raison de mutations génétiques aléatoires dans les cellules en développement. Il n'y a rien que vous auriez pu faire pour l'empêcher.",
        r: false,
      },
      {
        q: "En quoi le cancer de l'enfant est-il différent du cancer de l'adulte ?",
        a: "Les cancers infantiles se comportent différemment, réagissent différemment aux traitements et ont des origines biologiques différentes. Les enfants tolèrent souvent mieux la chimiothérapie intensive que les adultes. Les types les plus courants chez les enfants sont les leucémies et les tumeurs cérébrales, plutôt que les cancers du sein, du poumon ou du côlon typiques chez les adultes.",
        r: true,
      },
      {
        q: "Que signifie la stadification pour mon enfant ?",
        a: "La stadification décrit où se situe le cancer et s'il s'est propagé. Cela aide les médecins à déterminer le plan de traitement le plus efficace. Pour les cancers infantiles, le système de stadification varie selon le type de cancer, mais va typiquement d'une maladie localisée à une maladie qui s'est propagée à d'autres parties du corps.",
        r: true,
      },
      {
        q: "Dois-je demander un deuxième avis ?",
        a: "Obtenir un deuxième avis est une pratique courante et un droit au sein du système de santé canadien. Les centres d'oncologie pédiatrique au Canada travaillent en étroite collaboration via le Conseil C17, de sorte que l'oncologue de votre enfant peut souvent faciliter une consultation avec des spécialistes d'autres établissements.",
        r: true,
      },
      {
        q: "Comment expliquer ce diagnostic à mon enfant ?",
        a: "Utilisez un langage clair et adapté à son âge et évitez de faire des promesses que vous ne pouvez pas tenir. Les enfants sentent souvent quand quelque chose ne va pas, alors être honnête aide à établir la confiance. Les spécialistes du milieu de l'enfant à l'hôpital et les travailleurs sociaux sont d'excellentes ressources pour vous aider à trouver les mots justes pour l'âge de votre enfant.",
        r: false,
      },
      {
        q: "Combien d'enfants au Canada reçoivent un diagnostic de cancer chaque année ?",
        a: "Selon la Société canadienne du cancer, environ 1 000 enfants de moins de 15 ans reçoivent un diagnostic de cancer au Canada chaque année. Bien que ce soit rare, le cancer infantile est la principale cause de décès lié à la maladie chez les enfants canadiens.",
        r: false,
      },
      {
        q: "Quels sont les taux de survie pour le cancer infantile ?",
        a: "Les taux de survie se sont considérablement améliorés. Actuellement, plus de 83 % des enfants diagnostiqués avec un cancer au Canada survivent au moins cinq ans après leur diagnostic, et les taux de guérison continuent de s'améliorer grâce à la recherche et aux essais cliniques. Cependant, les taux de survie varient considérablement selon le type de cancer.",
        r: true,
      },
      {
        q: "Quel est le rôle d'un oncologue pédiatrique ?",
        a: "Un oncologue pédiatrique est un médecin spécialisé dans le diagnostic et le traitement des enfants atteints de cancer. Il dirige l'équipe médicale de votre enfant, coordonne les traitements comme la chimiothérapie et travaille aux côtés d'autres spécialistes, infirmières et travailleurs sociaux.",
        r: true,
      },
    ],
    treatment: [
      {
        q: "Mon enfant va-t-il perdre ses cheveux pendant le traitement ?",
        a: "La perte de cheveux est un effet secondaire courant de nombreux médicaments de chimiothérapie, mais cela dépend du plan de traitement spécifique. Les cheveux repoussent généralement une fois le traitement terminé, bien qu'ils puissent initialement avoir une texture ou une couleur différente. Des chapeaux, des foulards ou des bonnets doux peuvent aider votre enfant à se sentir plus à l'aise.",
        r: true,
      },
      {
        q: "Combien de temps dure généralement le traitement d'un cancer infantile ?",
        a: "Les durées de traitement varient considérablement en fonction du type de cancer et du protocole. Certains traitements peuvent durer quelques mois, tandis que d'autres, comme le traitement d'entretien pour la leucémie lymphoblastique aiguë (LLA), peuvent durer deux à trois ans. Votre oncologue fournira un plan détaillé pour le diagnostic spécifique de votre enfant.",
        r: true,
      },
      {
        q: "Qu'est-ce qu'un port-à-cath et pourquoi mon enfant en a-t-il besoin ?",
        a: "Un port-à-cath est un petit dispositif médical placé sous la peau, généralement sur le thorax, pour administrer des médicaments et faire des prises de sang. Il évite à votre enfant d'avoir besoin de piqûres répétées et rend l'administration de la chimiothérapie beaucoup plus facile et moins douloureuse.",
        r: true,
      },
      {
        q: "Les essais cliniques sont-ils sûrs pour mon enfant ?",
        a: "Les essais cliniques au Canada et via le Children's Oncology Group (COG) sont strictement réglementés pour garantir la sécurité des patients. Ils sont essentiels pour faire progresser les traitements et améliorer les taux de survie. La participation est toujours volontaire et votre médecin vous expliquera tous les risques et avantages.",
        r: true,
      },
      {
        q: "Mon enfant peut-il continuer à aller à l'école pendant le traitement ?",
        a: "La fréquentation scolaire dépend du système immunitaire de votre enfant, de son calendrier de traitement et de son niveau d'énergie. Beaucoup d'enfants doivent s'absenter ou utiliser des services de tutorat à l'hôpital ou à domicile. Les travailleurs sociaux et les éducateurs peuvent aider à mettre en place un plan pour soutenir l'éducation de votre enfant en toute sécurité.",
        r: true,
      },
      {
        q: "Qu'est-ce que la chimiothérapie et comment ça marche ?",
        a: "La chimiothérapie implique l'utilisation de médicaments puissants pour tuer les cellules cancéreuses ou les empêcher de se développer. Comme elle cible les cellules qui se divisent rapidement, elle peut également affecter les cellules saines, entraînant des effets secondaires. Il en existe de nombreux types, administrés par voie orale, par injection ou par perfusion intraveineuse.",
        r: true,
      },
      {
        q: "Mon enfant aura-t-il besoin de radiothérapie ?",
        a: "Tous les cancers infantiles ne nécessitent pas de radiothérapie. Lorsqu'elle est nécessaire, elle utilise des rayons à haute énergie pour détruire les cellules cancéreuses dans une zone spécifique. Votre équipe médicale discutera de la nécessité de la radiothérapie et de la façon dont elle prévoit de minimiser son impact sur le corps en croissance de votre enfant.",
        r: true,
      },
      {
        q: "Qu'est-ce qu'une greffe de cellules souches ou de moelle osseuse ?",
        a: "Une greffe remplace la moelle osseuse malade par des cellules souches saines, souvent après de fortes doses de chimiothérapie. Elle est généralement réservée à certains types de leucémie, de lymphome ou de tumeurs solides et nécessite un long séjour à l'hôpital avec un contrôle strict des infections.",
        r: true,
      },
    ],
    "side-effects": [
      {
        q: "Quels aliments mon enfant doit-il éviter pendant le traitement ?",
        a: "Pendant les périodes où le système immunitaire de votre enfant est affaibli, suivez des directives spécifiques en matière de sécurité alimentaire. Cela inclut souvent d'éviter les viandes crues ou insuffisamment cuites, les produits laitiers non pasteurisés et les fruits et légumes crus non lavés. Consultez toujours le diététicien en oncologie de votre enfant pour des conseils personnalisés.",
        r: true,
      },
      {
        q: "Mon enfant peut-il côtoyer d'autres enfants et des animaux de compagnie ?",
        a: "L'interaction avec les autres est généralement encouragée pour le bien-être, mais évitez toute personne malade ou récemment exposée à des maladies contagieuses comme la varicelle. Être en contact avec des animaux de compagnie en bonne santé est généralement acceptable, mais évitez de laisser votre enfant nettoyer les litières ou les cages à oiseaux.",
        r: true,
      },
      {
        q: "Quelles sont les précautions neutropéniques ?",
        a: "La neutropénie se produit lorsque le nombre de globules blancs est faible, ce qui rend plus difficile la lutte contre les infections. Les précautions impliquent un lavage strict des mains, l'évitement des contacts malades et le traitement de toute fièvre comme une urgence médicale absolue nécessitant une évaluation hospitalière immédiate.",
        r: true,
      },
      {
        q: "Quand dois-je emmener mon enfant aux urgences ?",
        a: "Une fièvre (généralement 38,3 °C ou plus une fois, ou 38,0 °C de façon prolongée pendant une heure) pendant le traitement est une urgence médicale nécessitant une attention immédiate. Consultez également en urgence pour des douleurs intenses, des difficultés respiratoires, des vomissements ingérables ou tout signe d'alerte fourni par votre équipe d'oncologie.",
        r: true,
      },
      {
        q: "Comment puis-je aider mon enfant à gérer les nausées ?",
        a: "Votre équipe médicale peut fournir des médicaments anti-nausée très efficaces. Proposer de petits repas fréquents et éviter les aliments à forte odeur peut également aider. Informez votre équipe si votre enfant a des difficultés, car les médicaments peuvent souvent être ajustés.",
        r: true,
      },
      {
        q: "La croissance et le développement de mon enfant seront-ils affectés ?",
        a: "Certains traitements peuvent avoir des effets tardifs qui ont un impact sur la croissance, le développement cognitif ou le fonctionnement des organes plus tard dans la vie. Les oncologues pédiatriques équilibrent soigneusement la nécessité de guérir le cancer et de minimiser les risques à long terme. Les survivants sont suivis dans des cliniques de suivi à long terme.",
        r: true,
      },
    ],
    financial: [
      {
        q: "Devrai-je payer pour le traitement du cancer de mon enfant au Canada ?",
        a: "Au Canada, tous les services hospitaliers et médicaux nécessaires sur le plan médical, y compris la chimiothérapie et la chirurgie, sont couverts par les régimes provinciaux d'assurance maladie en vertu de la Loi canadienne sur la santé. Cependant, vous pourriez avoir à payer de votre poche pour les médicaments sur ordonnance pris à domicile, les déplacements, le stationnement et la perte de salaire.",
        r: false,
      },
      {
        q: "Les deux parents peuvent-ils s'absenter du travail pour s'occuper de notre enfant ?",
        a: "Les parents peuvent être admissibles à la Prestation pour proches aidants d'enfants de l'Assurance-emploi (AE) du gouvernement fédéral, qui offre jusqu'à 35 semaines d'aide financière pouvant être partagées entre les aidants. Votre travailleur social à l'hôpital peut vous aider à faire une demande.",
        r: false,
      },
      {
        q: "Que faire si nous devons voyager pour le traitement ?",
        a: "Si vous devez vous déplacer loin de chez vous, des organisations comme Vol d'Espoir peuvent vous aider avec les vols. L'hébergement peut être pris en charge par les Manoirs Ronald McDonald ou des programmes provinciaux. Votre travailleur social vous mettra en contact avec les subventions de voyage pour votre province.",
        r: false,
      },
      {
        q: "Y a-t-il des organismes de bienfaisance au Canada qui peuvent aider avec les dépenses quotidiennes ?",
        a: "Oui, plusieurs organismes de bienfaisance offrent un soutien financier. Des organisations comme Cancer de l'enfant Canada, Leucan (au Québec) et Kids Cancer Care (en Alberta) offrent diverses subventions pour la nourriture, l'essence et les dépenses quotidiennes. Demandez à votre travailleur social à l'hôpital, car il peut vous mettre en contact avec les fonds disponibles.",
        r: false,
      },
      {
        q: "Quels crédits d'impôt ou aides financières sont disponibles ?",
        a: "Les familles peuvent être admissibles au crédit d'impôt pour personnes handicapées (CIPH) et à la prestation pour enfants handicapés (PEH) par l'intermédiaire de l'Agence du revenu du Canada. Vous pouvez également réclamer les frais médicaux et de déplacement admissibles sur votre déclaration de revenus. Votre médecin devra remplir le formulaire T2201 pour le CIPH.",
        r: false,
      },
      {
        q: "Comment gérer les frais de stationnement et de repas à l'hôpital ?",
        a: "Le stationnement et la nourriture à l'hôpital peuvent rapidement devenir coûteux. Parlez à votre travailleur social des laissez-passer de stationnement à prix réduit pour les patients de longue durée. Certains organismes de bienfaisance locaux et fondations hospitalières offrent également des bons de repas pour les parents qui restent au chevet de leur enfant.",
        r: false,
      },
    ],
    emotional: [
      {
        q: "Comment puis-je soutenir les frères et sœurs de mon enfant pendant cette période ?",
        a: "Les frères et sœurs se sentent souvent effrayés, confus ou négligés. Maintenez leurs routines autant que possible, tenez-les informés avec une honnêteté adaptée à leur âge et validez leurs sentiments. De nombreux hôpitaux proposent des programmes de soutien aux frères et sœurs par l'intermédiaire de spécialistes du milieu de l'enfant.",
        r: false,
      },
      {
        q: "Est-il normal de se sentir en colère ou coupable face au diagnostic ?",
        a: "Absolument. Il est tout à fait normal pour les parents de ressentir des émotions intenses, y compris de la colère, de la culpabilité, une profonde tristesse et de l'anxiété. Reconnaître ces sentiments est la première étape. N'oubliez pas que le diagnostic n'est pas de votre faute.",
        r: false,
      },
      {
        q: "Où puis-je trouver un soutien en santé mentale pour notre famille ?",
        a: "Votre équipe d'oncologie comprend des travailleurs sociaux et des psychologues spécialisés dans l'aide aux familles confrontées au cancer infantile. Ils peuvent offrir des conseils ou vous référer à des professionnels de la santé mentale communautaires qui comprennent la maladie pédiatrique.",
        r: false,
      },
      {
        q: "Comment parler à mes amis et à ma famille du diagnostic ?",
        a: "Partagez ce que vous vous sentez à l'aise de partager, et n'ayez pas peur de fixer des limites. Certains parents désignent un membre de la famille ou utilisent un blog privé ou une application comme CaringBridge pour tenir tout le monde au courant en même temps, évitant ainsi l'épuisement émotionnel de devoir répéter l'histoire.",
        r: false,
      },
      {
        q: "Comment mon partenaire et moi pouvons-nous rester forts ensemble ?",
        a: "Le stress lié à la maladie d'un enfant peut mettre à rude épreuve les relations. Gardez la communication ouverte, reconnaissez que vous pouvez réagir différemment et essayez de vous accorder de la grâce mutuelle. Cherchez des conseils de couple si vous trouvez difficile de naviguer ensemble dans cette pression.",
        r: false,
      },
      {
        q: "Existe-t-il des groupes de soutien pour les parents d'enfants atteints de cancer au Canada ?",
        a: "Oui, entrer en contact avec d'autres parents qui comprennent peut être incroyablement validant. Demandez à votre travailleur social quels sont les groupes de soutien hospitaliers locaux, ou tournez-vous vers des organisations comme Cancer de l'enfant Canada et Leucan, qui facilitent les connexions entre pairs.",
        r: false,
      },
    ],
    misconceptions: [
      {
        q: "Mythe : Le cancer infantile est toujours mortel.",
        a: "Grâce aux progrès de la recherche médicale, le taux de survie global du cancer infantile au Canada est maintenant supérieur à 83 %. Bien que le parcours soit difficile, la majorité des enfants continuent à vivre une vie longue et épanouissante après le traitement.",
        r: true,
      },
      {
        q: "Mythe : Le sucre nourrit le cancer et doit être complètement éliminé.",
        a: "Toutes les cellules du corps utilisent le glucose (sucre) pour l'énergie, y compris les cellules saines. Éliminer le sucre n'empêchera pas le cancer de se développer et peut entraîner une malnutrition dangereuse, en particulier lorsqu'un enfant a besoin de calories pour supporter le traitement. Une alimentation équilibrée guidée par votre diététicien en oncologie est la meilleure solution.",
        r: true,
      },
      {
        q: "Mythe : Mon enfant a causé cela en mangeant ou en faisant quelque chose de mal.",
        a: "Le cancer infantile n'est pas causé par l'alimentation, des blessures mineures ou le comportement. Il est le résultat de mutations cellulaires aléatoires qui se produisent au cours du développement. Il n'y a rien que votre enfant ait fait pour causer sa maladie.",
        r: true,
      },
      {
        q: "Mythe : Les thérapies alternatives peuvent remplacer la chimiothérapie en toute sécurité.",
        a: "Il n'existe aucune preuve scientifique que les thérapies alternatives puissent guérir le cancer pédiatrique. S'y fier au lieu des traitements médicaux éprouvés est extrêmement dangereux. Discutez toujours de toute thérapie complémentaire (comme les massages ou les suppléments) avec votre oncologue pour vous assurer qu'elle n'interfère pas avec le traitement.",
        r: true,
      },
      {
        q: "Mythe : Si un enfant semble en bonne santé, il n'a pas besoin de tous ses traitements.",
        a: "Même si un enfant a l'air et se sent bien, des cellules cancéreuses microscopiques peuvent subsister dans le corps. Terminer tout le traitement tel que prescrit par votre oncologue est essentiel pour prévenir une rechute.",
        r: true,
      },
      {
        q: "Mythe : Le cancer de l'enfant est le même que celui de l'adulte, juste dans un corps plus petit.",
        a: "Les cancers pédiatriques sont fondamentalement différents des cancers de l'adulte dans leur biologie, leurs types de tumeurs et leur réponse au traitement. C'est pourquoi les enfants ont besoin de soins spécialisés de la part d'oncologues pédiatriques plutôt que de médecins spécialisés dans le cancer de l'adulte.",
        r: true,
      },
    ],
  },
  zh: {
    diagnosis: [
      {
        q: "儿童癌症是因为我做了什么而引起的吗？",
        a: "不是的。与许多成人癌症不同，儿童癌症不是由生活方式或环境因素引起的。它们通常是由于发育中细胞的随机基因突变而发生。您没有任何办法可以预防这种情况。",
        r: false,
      },
      {
        q: "儿童癌症与成人癌症有何不同？",
        a: "儿童癌症的表现、对治疗的反应以及生物学起源都不同。儿童通常比成人更能承受高强度的化疗。儿童中最常见的类型是白血病和脑肿瘤，而不是成人中常见的乳腺癌、肺癌或结肠癌。",
        r: true,
      },
      {
        q: "癌症分期对我的孩子意味着什么？",
        a: "分期描述了癌症的位置以及是否已经扩散。这有助于医生确定最有效的治疗方案。对于儿童癌症，分期系统因癌症类型而异，但通常范围从局部疾病到已扩散到身体其他部位的疾病。",
        r: true,
      },
      {
        q: "我应该寻求第二诊疗意见吗？",
        a: "寻求第二诊疗意见是加拿大医疗保健系统内的一种标准做法和权利。加拿大的儿童肿瘤中心通过C17委员会密切合作，因此您孩子的肿瘤科医生通常可以协助与其他机构的专家进行会诊。",
        r: true,
      },
      {
        q: "我如何向我的孩子解释这个诊断结果？",
        a: "使用清晰且适合孩子年龄的语言，避免做出无法兑现的承诺。孩子们通常能感觉到不对劲，所以诚实有助于建立信任。医院的儿童生活专家和社会工作者是极好的资源，可以帮助您找到适合孩子年龄的正确措辞。",
        r: false,
      },
      {
        q: "加拿大每年有多少儿童被诊断出患有癌症？",
        a: "根据加拿大癌症协会的数据，加拿大每年约有1,000名15岁以下的儿童被诊断出患有癌症。虽然罕见，但儿童癌症是加拿大儿童中与疾病相关的主要死因。",
        r: false,
      },
      {
        q: "儿童癌症的存活率是多少？",
        a: "存活率已有显著提高。目前，在加拿大被诊断患有癌症的儿童中，超过83%的人在确诊后至少存活五年，而且随着研究和临床试验的开展，治愈率还在不断提高。然而，存活率因癌症的具体类型而有很大差异。",
        r: true,
      },
      {
        q: "儿童肿瘤科医生的作用是什么？",
        a: "儿童肿瘤科医生是专门诊断和治疗儿童癌症的医生。他们领导您孩子的医疗团队，协调化疗等治疗方案，并与其他专家、护士和社会工作者合作。",
        r: true,
      },
    ],
    treatment: [
      {
        q: "我的孩子在治疗期间会掉头发吗？",
        a: "脱发是许多化疗药物常见的副作用，但这取决于具体的治疗方案。头发通常会在治疗结束后重新长出，尽管一开始质地或颜色可能会有所不同。帽子、围巾或柔软的无边豆豆帽可以帮助您的孩子感到更舒适。",
        r: true,
      },
      {
        q: "儿童癌症治疗通常持续多长时间？",
        a: "治疗时间因癌症类型和方案而有很大差异。有些治疗可能只持续几个月，而其他的，如急性淋巴细胞白血病(ALL)的维持治疗，可能会持续两到三年。您的肿瘤科医生会为您孩子的具体诊断提供详细的路线图。",
        r: true,
      },
      {
        q: "什么是输液港，为什么我的孩子需要它？",
        a: "输液港（或port-a-cath）是一种植入皮下的小型医疗设备，通常在胸部，用于给药和抽血。它免去了您的孩子反复被针扎的痛苦，并使化疗的实施变得容易得多且痛苦更少。",
        r: true,
      },
      {
        q: "临床试验对我的孩子安全吗？",
        a: "在加拿大和通过儿童肿瘤学组（COG）进行的临床试验受到严格监管，以确保患者的安全。它们对于推进治疗和提高存活率至关重要。参与始终是自愿的，您的医生会解释所有的风险和益处。",
        r: true,
      },
      {
        q: "我的孩子在治疗期间还能去上学吗？",
        a: "能否上学取决于您孩子的免疫系统、治疗计划和精力水平。许多儿童需要请假或利用医院或家庭辅导服务。社会工作者和教育工作者可以帮助制定计划，以安全地支持您孩子的教育。",
        r: true,
      },
      {
        q: "什么是化疗，它是如何运作的？",
        a: "化疗涉及使用强效药物来杀死癌细胞或阻止它们生长。因为它针对快速分裂的细胞，所以它也会影响健康细胞，从而导致副作用。化疗有许多不同的类型，可以通过口服、注射或静脉输液的方式进行。",
        r: true,
      },
      {
        q: "我的孩子需要放射治疗吗？",
        a: "并非所有的儿童癌症都需要放射治疗。如果需要，它会使用高能射线来摧毁特定区域的癌细胞。您的医疗团队将讨论放疗是否必要，以及他们计划如何尽量减少放疗对孩子发育中身体的影响。",
        r: true,
      },
      {
        q: "什么是干细胞或骨髓移植？",
        a: "移植用健康的干细胞替换患病的骨髓，通常在大剂量化疗之后进行。它通常保留用于某些类型的白血病、淋巴瘤或实体瘤，需要长期住院并严格控制感染。",
        r: true,
      },
    ],
    "side-effects": [
      {
        q: "我的孩子在治疗期间应避免吃哪些食物？",
        a: "在您孩子免疫系统较弱的时期，请遵循特定的食品安全指南。这通常包括避免食用生或未煮熟的肉类、未经巴氏消毒的乳制品以及未洗净的生水果和蔬菜。请务必咨询您孩子的肿瘤营养师，获取个性化建议。",
        r: true,
      },
      {
        q: "我的孩子可以和其他儿童及宠物接触吗？",
        a: "为了身心健康，通常鼓励与他人互动，但要避免接触生病或最近暴露于水痘等传染病的人。与健康的家庭宠物接触通常没问题，但应避免让您的孩子清理猫砂盆或鸟笼。",
        r: true,
      },
      {
        q: "什么是中性粒细胞减少症的预防措施？",
        a: "当中性粒细胞减少症（白细胞计数低）发生时，抵抗感染会变得更加困难。预防措施包括严格洗手、避免接触病人，并将任何发烧视为绝对的医疗紧急情况，需要立即进行医院评估。",
        r: true,
      },
      {
        q: "什么时候我应该带我的孩子去急诊室？",
        a: "治疗期间发烧（通常一次达到38.3°C或更高，或持续一小时达到38.0°C）属于医疗紧急情况，需要立即就医。如果出现剧痛、呼吸困难、无法控制的呕吐或肿瘤团队提供的任何警告信号，也应寻求紧急护理。",
        r: true,
      },
      {
        q: "我该如何帮助我的孩子应对恶心？",
        a: "您的医疗团队可以提供非常有效的止吐药物。提供少食多餐并避免气味强烈的食物也有帮助。如果您的孩子感到难受，请告诉您的团队，因为通常可以调整药物。",
        r: true,
      },
      {
        q: "我孩子的生长发育会受到影响吗？",
        a: "某些治疗可能会产生晚期效应，在以后的生活中影响生长、认知发育或器官功能。儿童肿瘤科医生会仔细平衡治愈癌症的需求与尽量减少长期风险。幸存者会在长期随访诊所接受监测。",
        r: true,
      },
    ],
    financial: [
      {
        q: "在加拿大，我需要为孩子的癌症治疗付费吗？",
        a: "在加拿大，所有医疗上必需的医院和医生服务，包括化疗和手术，均由《加拿大卫生法》规定的省级医疗保健计划承保。但是，您可能需要自掏腰包支付在家服用的处方药、差旅、停车和工资损失等费用。",
        r: false,
      },
      {
        q: "父母双方都可以请假照顾孩子吗？",
        a: "父母可能符合联邦就业保险（EI）家庭照顾者儿童福利的资格，该福利提供长达35周的经济援助，可由护理人员共享。您医院的社工可以协助您申请。",
        r: false,
      },
      {
        q: "如果我们需要长途旅行接受治疗怎么办？",
        a: "如果您必须离开家乡接受治疗，希望之翼（Hope Air）等组织可以协助提供航班服务。麦当劳叔叔之家或像安大略省的POGO经济援助计划等省级项目可以提供住宿支持。您的社会工作者将为您联系所在省份的旅行补助金。",
        r: false,
      },
      {
        q: "加拿大有慈善机构可以帮助支付日常开支吗？",
        a: "是的，有几家慈善机构提供资金支持。像加拿大儿童癌症协会（Childhood Cancer Canada）、魁北克的Leucan和阿尔伯塔省的Kids Cancer Care等组织提供各种食品、汽油和日常开支的补助。请咨询您的医院社会工作者，因为他们可以将您与可用的资金联系起来。",
        r: false,
      },
      {
        q: "有哪些税收抵免或经济援助可用？",
        a: "家庭可能通过加拿大税务局获得残疾税收抵免（DTC）和儿童残疾福利（CDB）的资格。您还可以在所得税申报表上申报符合条件的自付医疗和旅行费用。您的医生需要填写T2201表格以申请DTC。",
        r: false,
      },
      {
        q: "如何应对医院停车和就餐费用？",
        a: "医院的停车和餐饮费用很快就会变得昂贵。向您的社会工作者咨询关于长期病人的折扣停车通行证。一些当地慈善机构和医院基金会也为在床边陪伴的父母提供餐券。",
        r: false,
      },
    ],
    emotional: [
      {
        q: "这段时间我该如何支持孩子的兄弟姐妹？",
        a: "兄弟姐妹常常感到害怕、困惑或被忽视。尽可能维持他们的日常作息，用适合他们年龄的诚实方式让他们了解情况，并认可他们的感受。许多医院通过儿童生活专家提供兄弟姐妹支持计划。",
        r: false,
      },
      {
        q: "对诊断感到愤怒或内疚正常吗？",
        a: "绝对正常。父母经历包括愤怒、内疚、极度悲伤和焦虑在内的强烈情绪是完全正常的。承认这些感受是第一步。请记住，这诊断并不是您的错。",
        r: false,
      },
      {
        q: "我可以在哪里为我们家庭找到心理健康支持？",
        a: "您的肿瘤学团队包括专门帮助家庭应对儿童癌症的社会工作者和心理学家。他们可以提供咨询，或将您转介给了解儿科疾病的社区心理健康专业人员。",
        r: false,
      },
      {
        q: "我该如何与亲朋好友谈论这个诊断结果？",
        a: "分享您觉得可以分享的内容，不要害怕设定界限。有些父母会指定一位家庭成员，或使用私人博客或CaringBridge等应用程序来一次性更新所有人的信息，从而节省因重复讲述而产生的情感消耗。",
        r: false,
      },
      {
        q: "我和我的伴侣怎样才能一起保持坚强？",
        a: "孩子生病的压力可能会使关系紧张。保持沟通畅通，认识到你们可能会以不同的方式应对，并尽量互相包容。如果您发现很难共同度过这个压力期，请寻求伴侣咨询。",
        r: false,
      },
      {
        q: "加拿大有儿童癌症患儿父母的支持小组吗？",
        a: "有的。与其他有类似经历的父母建立联系可以得到极大的认同感。询问您的社会工作者当地医院的支持小组情况，或者了解像加拿大儿童癌症协会和Leucan这样的组织，它们促进同伴之间的联系。",
        r: false,
      },
    ],
    misconceptions: [
      {
        q: "误解：儿童癌症总是绝症。",
        a: "随着医学研究的进步，加拿大儿童癌症的总存活率现已超过83%。虽然过程艰难，但大多数儿童在治疗后继续过着长久、充实的生活。",
        r: true,
      },
      {
        q: "误解：糖会滋养癌症，应该完全避免摄入。",
        a: "体内所有的细胞都使用葡萄糖（糖）作为能量，包括健康的细胞。消除糖分不会阻止癌症生长，反而可能导致危险的营养不良，特别是当孩子需要卡路里来承受治疗时。由您的肿瘤营养师指导的均衡饮食是最好的。",
        r: true,
      },
      {
        q: "误解：我的孩子是因为吃错了东西或做错了什么而引起的。",
        a: "儿童癌症不是由饮食、轻微损伤或行为引起的。它是发育过程中发生的随机细胞突变的结果。您的孩子没有做任何导致他们生病的事情。",
        r: true,
      },
      {
        q: "误解：替代疗法可以安全地取代化疗。",
        a: "没有科学证据表明替代疗法可以治愈小儿癌症。依赖它们而不是经过验证的医疗是极其危险的。务必与您的肿瘤科医生讨论任何补充疗法（如按摩或补充剂），以确保它们不会干扰治疗。",
        r: true,
      },
      {
        q: "误解：如果孩子看起来很健康，他们就不需要完成所有的治疗。",
        a: "即使孩子看起来感觉很好，微小的癌细胞仍可能残留在体内。完成肿瘤科医生开具的整个疗程对于防止复发至关重要。",
        r: true,
      },
      {
        q: "误解：儿童癌症与成人癌症相同，只是发生在更小的身体里。",
        a: "儿童癌症在生物学、肿瘤类型和对治疗的反应方面与成人癌症有着根本的不同。这就是为什么儿童需要儿童肿瘤专科医生的专业护理，而不是成人癌症医生的护理。",
        r: true,
      },
    ],
  },
};

const baseDir = path.join(__dirname, "..", "src", "content", "faq");

for (const lang of Object.keys(data)) {
  const langDir = path.join(baseDir, lang);
  if (!fs.existsSync(langDir)) {
    fs.mkdirSync(langDir, { recursive: true });
  }

  for (const category of Object.keys(data[lang])) {
    const items = data[lang][category];
    const categoryIcon = icons[category];
    const content = `---
category: "${category}"
category_icon: "${categoryIcon}"
items:
${items
  .map(
    (item) => `  - question: "${item.q}"
    answer: "${item.a}"
    needs_medical_review: ${item.r}`,
  )
  .join("\n")}
lang: "${lang}"
---
`;
    fs.writeFileSync(path.join(langDir, `${category}.md`), content);
  }
}
console.log("FAQ generation complete.");
