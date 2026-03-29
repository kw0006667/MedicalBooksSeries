import type { Volume } from './types.js';

// Volume III standard section template (每章共用)
const vol3Sections = [
  { slug: 'anatomy-physiology', title: '正常解剖與生理' },
  { slug: 'symptoms', title: '常見主訴與症狀' },
  { slug: 'pathophysiology', title: '重要疾病機轉' },
  { slug: 'diagnosis', title: '診斷思路與鑑別診斷' },
  { slug: 'investigations', title: '關鍵檢查與判讀' },
  { slug: 'treatment', title: '第一線與第二線治療' },
  { slug: 'pharmacology', title: '常用藥物機轉、副作用、交互作用' },
  { slug: 'special-populations', title: '特殊族群考量' },
  { slug: 'clinical-pitfalls', title: '常見臨床陷阱' },
  { slug: 'case-discussion', title: 'Case-based discussion' },
];

const vol1ClosingSections = [
  { slug: 'case-study', title: '病例題與臨床解析' },
  { slug: 'chapter-quiz', title: '章末測驗題' },
  { slug: 'glossary', title: '術語索引' },
];

export const volumes: Volume[] = [
  // ═══════════════════════════════════════════════════════════════
  // Volume I：人體、疾病與醫學基礎
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'volume-1',
    shortTitle: 'Vol. I',
    title: '人體、疾病與醫學基礎',
    subtitle: '',
    description: '從細胞到器官系統，建立醫藥共同語言與疾病形成的核心機制。',
    color: '#3b82f6',
    parts: [
      { id: 1, title: '醫藥專業共同語言', chapterIds: ['ch01', 'ch02'] },
      { id: 2, title: '人體結構與功能', chapterIds: ['ch03', 'ch04', 'ch05'] },
      { id: 3, title: '疾病形成的核心機制', chapterIds: ['ch06', 'ch07', 'ch08', 'ch09'] },
      { id: 4, title: '分子與遺傳醫學', chapterIds: ['ch10', 'ch11'] },
    ],
    chapters: [
      {
        id: 'ch01', title: '醫療與藥學的共同地圖', part: 1,
        sections: [
          { slug: 'disease-syndrome-diagnosis', title: '什麼是疾病、症候群、診斷、治療' },
          { slug: 'professional-roles', title: '醫師、藥師、護理師與其他專業角色' },
          { slug: 'patient-care-flow', title: '病人照護流程總覽' },
          { slug: 'clinical-problem-definition', title: '臨床問題如何被定義' },
          { slug: 'knowledge-to-competency', title: '從「知道」到「做得到」的能力框架' },
          ...vol1ClosingSections,
        ],
      },
      {
        id: 'ch02', title: '醫學與藥學的基本語言', part: 1,
        sections: [
          { slug: 'medical-terminology', title: '醫學術語與字首字尾' },
          { slug: 'anatomical-orientation', title: '解剖方位與臨床描述語言' },
          { slug: 'lab-values-reading', title: '實驗室數值的閱讀邏輯' },
          { slug: 'imaging-pathology-drug-info', title: '影像、病理、藥品資訊的基本格式' },
          { slug: 'abbreviations', title: '常見縮寫與錯誤縮寫' },
          ...vol1ClosingSections,
        ],
      },
      {
        id: 'ch03', title: '細胞、生物膜與訊號傳遞', part: 2,
        sections: [
          { slug: 'cell-structure-function', title: '細胞結構與功能' },
          { slug: 'receptors-second-messengers', title: '受體、第二信使與調控' },
          { slug: 'apoptosis-necrosis-autophagy', title: '細胞凋亡、壞死與自噬' },
          { slug: 'inflammation-repair-origin', title: '發炎與修復的起點' },
          ...vol1ClosingSections,
        ],
      },
      {
        id: 'ch04', title: '組織學與器官系統基礎', part: 2,
        sections: [
          { slug: 'tissue-types', title: '上皮、結締、肌肉、神經組織' },
          { slug: 'organ-microstructure', title: '器官的微觀結構與功能連結' },
          { slug: 'normal-vs-abnormal-histology', title: '正常與異常的組織學比較' },
          ...vol1ClosingSections,
        ],
      },
      {
        id: 'ch05', title: '人體生理學總論', part: 2,
        sections: [
          { slug: 'homeostasis-feedback', title: '恆定性與調節迴路' },
          { slug: 'fluid-electrolyte-acid-base', title: '體液、電解質與酸鹼平衡' },
          { slug: 'neuroendocrine-integration', title: '神經與內分泌整合' },
          { slug: 'aging-physiology', title: '老化對生理的影響' },
          ...vol1ClosingSections,
        ],
      },
      {
        id: 'ch06', title: '病理學總論', part: 3,
        sections: [
          { slug: 'cell-injury-adaptation', title: '細胞損傷與適應' },
          { slug: 'acute-chronic-inflammation', title: '急性與慢性發炎' },
          { slug: 'repair-fibrosis-regeneration', title: '修復、纖維化與再生' },
          { slug: 'immune-imbalance-tissue-injury', title: '免疫失衡與組織傷害' },
          ...vol1ClosingSections,
        ],
      },
      {
        id: 'ch07', title: '微生物與感染', part: 3,
        sections: [
          { slug: 'microbiology-basics', title: '細菌、病毒、真菌、寄生蟲基礎' },
          { slug: 'infection-mechanism', title: '感染如何發生與擴散' },
          { slug: 'host-defense-immunity', title: '宿主防禦與免疫' },
          { slug: 'antimicrobial-resistance', title: '抗藥性與臨床意義' },
          ...vol1ClosingSections,
        ],
      },
      {
        id: 'ch08', title: '免疫學', part: 3,
        sections: [
          { slug: 'innate-immunity', title: '先天免疫 (Innate Immunity)' },
          { slug: 'adaptive-immunity', title: '後天免疫 (Adaptive Immunity)' },
          { slug: 'allergy-autoimmune-immunodeficiency', title: '過敏、自體免疫、免疫缺陷' },
          { slug: 'immunotherapy-concepts', title: '免疫治療概念' },
          ...vol1ClosingSections,
        ],
      },
      {
        id: 'ch09', title: '腫瘤學基礎', part: 3,
        sections: [
          { slug: 'carcinogenesis', title: '致癌機轉' },
          { slug: 'tumor-biology', title: '腫瘤生物學' },
          { slug: 'staging-grading-prognosis', title: '分期、分級與預後' },
          { slug: 'cancer-treatment-framework', title: '癌症治療框架' },
          ...vol1ClosingSections,
        ],
      },
      {
        id: 'ch10', title: '生物化學與代謝', part: 4,
        sections: [
          { slug: 'enzymes-metabolic-pathways', title: '酵素與代謝路徑' },
          { slug: 'carb-fat-protein-metabolism', title: '醣、脂、蛋白代謝' },
          { slug: 'vitamins-trace-elements', title: '維生素與微量元素' },
          { slug: 'metabolic-disease-clinical-links', title: '代謝疾病的臨床連結' },
          ...vol1ClosingSections,
        ],
      },
      {
        id: 'ch11', title: '遺傳與基因醫學', part: 4,
        sections: [
          { slug: 'genetics-fundamentals', title: '遺傳學基本原理' },
          { slug: 'monogenic-polygenic-epigenetics', title: '單基因、多基因與表觀遺傳' },
          { slug: 'genetic-testing-variant-interpretation', title: '基因檢測與變異判讀' },
          { slug: 'pharmacogenomics-intro', title: '藥物基因體學 (Pharmacogenomics) 入門' },
          ...vol1ClosingSections,
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // Volume II：藥物、治療學與用藥決策
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'volume-2',
    shortTitle: 'Vol. II',
    title: '藥物、治療學與用藥決策',
    subtitle: '',
    description: '從藥效學、藥動學到臨床用藥決策，掌握藥物治療的完整邏輯。',
    color: '#10b981',
    parts: [
      { id: 1, title: '藥理學核心', chapterIds: ['ch01', 'ch02', 'ch03'] },
      { id: 2, title: '劑型、製劑與給藥', chapterIds: ['ch04', 'ch05'] },
      { id: 3, title: '藥物治療管理', chapterIds: ['ch06', 'ch07', 'ch08'] },
      { id: 4, title: '實證決策與新型治療', chapterIds: ['ch09', 'ch10', 'ch11', 'ch12'] },
    ],
    chapters: [
      {
        id: 'ch01', title: '藥效學 (Pharmacodynamics)', part: 1,
        sections: [
          { slug: 'receptor-theory', title: '受體理論' },
          { slug: 'dose-response', title: '劑量反應關係 (Dose-Response Relationship)' },
          { slug: 'potency-efficacy-therapeutic-index', title: '效價、效能、治療指數 (Therapeutic Index)' },
          { slug: 'agonist-antagonist', title: '激動劑、拮抗劑與部分激動劑' },
        ],
      },
      {
        id: 'ch02', title: '藥動學 (Pharmacokinetics)', part: 1,
        sections: [
          { slug: 'adme', title: '吸收、分布、代謝、排除 (ADME)' },
          { slug: 'half-life-clearance-vd', title: '半衰期、清除率、分布容積' },
          { slug: 'dosing-regimen-steady-state', title: '載藥方案與穩態 (Steady State)' },
          { slug: 'renal-hepatic-dose-adjustment', title: '腎肝功能不全時的劑量調整' },
        ],
      },
      {
        id: 'ch03', title: '藥物交互作用與不良反應', part: 1,
        sections: [
          { slug: 'drug-drug-interactions', title: '藥物間交互作用 (Drug-Drug Interactions)' },
          { slug: 'food-herb-interactions', title: '藥食與藥草交互作用' },
          { slug: 'adr-classification', title: '藥物不良反應 (ADR) 分類與機轉' },
          { slug: 'medication-monitoring-risk-prevention', title: '用藥監測與風險預防' },
        ],
      },
      {
        id: 'ch04', title: '劑型學與配方學', part: 2,
        sections: [
          { slug: 'dosage-forms', title: '錠劑、膠囊、注射、吸入、貼片' },
          { slug: 'bioavailability-formulation', title: '生體可用率 (Bioavailability) 與劑型設計' },
          { slug: 'sterile-preparation-stability', title: '無菌製備與安定性' },
          { slug: 'incompatibility-compatibility', title: '配伍禁忌與相容性' },
        ],
      },
      {
        id: 'ch05', title: '處方、調劑與藥品資訊', part: 2,
        sections: [
          { slug: 'prescription-format-legality', title: '處方格式與合法性' },
          { slug: 'dispensing-process-verification', title: '調劑流程與核對' },
          { slug: 'drug-labeling-counseling', title: '藥品標示與衛教' },
          { slug: 'drug-information-literature', title: '資訊來源與文獻檢索' },
        ],
      },
      {
        id: 'ch06', title: '藥物治療問題的辨識', part: 3,
        sections: [
          { slug: 'indication-appropriateness', title: '適應症是否正確' },
          { slug: 'drug-effectiveness', title: '藥物是否有效' },
          { slug: 'dose-safety', title: '劑量是否安全' },
          { slug: 'patient-adherence', title: '病人是否能遵從 (Adherence)' },
        ],
      },
      {
        id: 'ch07', title: '特殊族群藥療', part: 3,
        sections: [
          { slug: 'pediatric-pharmacotherapy', title: '小兒用藥' },
          { slug: 'geriatric-polypharmacy', title: '老年醫學與多重用藥 (Polypharmacy)' },
          { slug: 'pregnancy-lactation', title: '妊娠與哺乳' },
          { slug: 'renal-hepatic-obese-critically-ill', title: '腎病、肝病、肥胖、重症病人' },
        ],
      },
      {
        id: 'ch08', title: '精準醫療與藥物基因體學', part: 3,
        sections: [
          { slug: 'genetic-variation-drug-response', title: '基因變異與藥物反應' },
          { slug: 'when-testing-has-clinical-value', title: '檢測何時有臨床價值' },
          { slug: 'clinical-cases-limitations', title: '臨床案例與限制' },
          { slug: 'future-directions', title: '未來發展' },
        ],
      },
      {
        id: 'ch09', title: '實證治療學與臨床指引', part: 4,
        sections: [
          { slug: 'evidence-pyramid', title: '證據金字塔與研究設計' },
          { slug: 'treatment-goals-endpoints', title: '治療目標與終點判讀' },
          { slug: 'guideline-interpretation', title: '臨床指引如何被正確使用' },
          { slug: 'benefit-harm-cost', title: '效益、風險與成本的平衡' },
        ],
      },
      {
        id: 'ch10', title: '治療藥物監測與高警示藥品', part: 4,
        sections: [
          { slug: 'tdm-core', title: '治療藥物監測核心原理' },
          { slug: 'high-alert-medications', title: '高警示藥品' },
          { slug: 'sampling-interpretation', title: '採樣、解讀與個別化調整' },
          { slug: 'system-error-prevention', title: '系統性錯誤預防' },
        ],
      },
      {
        id: 'ch11', title: '減藥、轉銜照護與共享決策', part: 4,
        sections: [
          { slug: 'medication-reconciliation', title: '用藥整合 (Medication Reconciliation)' },
          { slug: 'deprescribing-framework', title: '減藥框架 (Deprescribing Framework)' },
          { slug: 'shared-decision-making', title: '共享決策 (Shared Decision Making)' },
          { slug: 'transitions-follow-up', title: '轉銜追蹤與出院後用藥管理' },
        ],
      },
      {
        id: 'ch12', title: '生物製劑、核酸藥物與新興治療平台', part: 4,
        sections: [
          { slug: 'biologics-vs-small-molecules', title: '小分子藥物與生物製劑的差異' },
          { slug: 'monoclonal-antibodies-fusion-proteins', title: '單株抗體、融合蛋白與抗體藥物複合體' },
          { slug: 'nucleic-acid-therapies-cell-gene-therapy', title: '核酸藥物、細胞治療與基因治療' },
          { slug: 'biosimilars-immunogenicity-access', title: '免疫原性、互換性與可近性' },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // Volume III：系統疾病整合
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'volume-3',
    shortTitle: 'Vol. III',
    title: '系統疾病整合',
    subtitle: '',
    description: '以系統整合方式涵蓋 50 個臨床主題，每章統一格式：機轉、診斷、治療、藥物、決策。',
    color: '#f59e0b',
    parts: [
      { id: 1, title: '心血管系統', chapterIds: ['ch01','ch02','ch03','ch04','ch05','ch06'] },
      { id: 2, title: '呼吸系統', chapterIds: ['ch07','ch08','ch09','ch10','ch11'] },
      { id: 3, title: '腎臟與體液', chapterIds: ['ch12','ch13','ch14','ch15','ch16'] },
      { id: 4, title: '消化系統與肝膽胰', chapterIds: ['ch17','ch18','ch19','ch20','ch21'] },
      { id: 5, title: '內分泌與代謝', chapterIds: ['ch22','ch23','ch24','ch25'] },
      { id: 6, title: '血液與腫瘤', chapterIds: ['ch26','ch27','ch28','ch29','ch30'] },
      { id: 7, title: '感染症', chapterIds: ['ch31','ch32','ch33','ch34','ch35','ch36'] },
      { id: 8, title: '神經與精神', chapterIds: ['ch37','ch38','ch39','ch40','ch41'] },
      { id: 9, title: '風濕免疫與骨科', chapterIds: ['ch42','ch43','ch44','ch45','ch46'] },
      { id: 10, title: '婦兒與生殖', chapterIds: ['ch47','ch48','ch49','ch50'] },
    ],
    chapters: [
      // Part 1: 心血管
      { id: 'ch01', title: '高血壓 (Hypertension)', part: 1, sections: vol3Sections },
      { id: 'ch02', title: '缺血性心臟病 (Ischemic Heart Disease)', part: 1, sections: vol3Sections },
      { id: 'ch03', title: '心衰竭 (Heart Failure)', part: 1, sections: vol3Sections },
      { id: 'ch04', title: '心律不整 (Arrhythmia)', part: 1, sections: vol3Sections },
      { id: 'ch05', title: '血脂異常與動脈粥樣硬化 (Dyslipidemia & Atherosclerosis)', part: 1, sections: vol3Sections },
      { id: 'ch06', title: '抗凝、抗血小板與血栓治療', part: 1, sections: vol3Sections },
      // Part 2: 呼吸
      { id: 'ch07', title: '氣喘 (Asthma)', part: 2, sections: vol3Sections },
      { id: 'ch08', title: '慢性阻塞性肺病 (COPD)', part: 2, sections: vol3Sections },
      { id: 'ch09', title: '肺炎 (Pneumonia)', part: 2, sections: vol3Sections },
      { id: 'ch10', title: '結核與特殊感染 (TB & Special Infections)', part: 2, sections: vol3Sections },
      { id: 'ch11', title: '呼吸衰竭與機械通氣入門', part: 2, sections: vol3Sections },
      // Part 3: 腎臟與體液
      { id: 'ch12', title: '急性腎損傷 (AKI)', part: 3, sections: vol3Sections },
      { id: 'ch13', title: '慢性腎臟病 (CKD)', part: 3, sections: vol3Sections },
      { id: 'ch14', title: '電解質異常', part: 3, sections: vol3Sections },
      { id: 'ch15', title: '酸鹼失衡 (Acid-Base Disorders)', part: 3, sections: vol3Sections },
      { id: 'ch16', title: '利尿劑與腎臟藥理', part: 3, sections: vol3Sections },
      // Part 4: 消化系統
      { id: 'ch17', title: '胃食道逆流與消化性潰瘍 (GERD & PUD)', part: 4, sections: vol3Sections },
      { id: 'ch18', title: '發炎性腸道疾病 (IBD)', part: 4, sections: vol3Sections },
      { id: 'ch19', title: '肝炎與肝硬化 (Hepatitis & Cirrhosis)', part: 4, sections: vol3Sections },
      { id: 'ch20', title: '胰臟炎 (Pancreatitis)', part: 4, sections: vol3Sections },
      { id: 'ch21', title: '便秘、腹瀉與常見 GI 症狀處理', part: 4, sections: vol3Sections },
      // Part 5: 內分泌
      { id: 'ch22', title: '糖尿病 (Diabetes Mellitus)', part: 5, sections: vol3Sections },
      { id: 'ch23', title: '甲狀腺疾病 (Thyroid Disorders)', part: 5, sections: vol3Sections },
      { id: 'ch24', title: '腎上腺與垂體疾病', part: 5, sections: vol3Sections },
      { id: 'ch25', title: '肥胖與代謝症候群 (Obesity & Metabolic Syndrome)', part: 5, sections: vol3Sections },
      // Part 6: 血液與腫瘤
      { id: 'ch26', title: '貧血 (Anemia)', part: 6, sections: vol3Sections },
      { id: 'ch27', title: '凝血異常 (Coagulation Disorders)', part: 6, sections: vol3Sections },
      { id: 'ch28', title: '白血病與淋巴瘤 (Leukemia & Lymphoma)', part: 6, sections: vol3Sections },
      { id: 'ch29', title: '常見實體腫瘤治療原則', part: 6, sections: vol3Sections },
      { id: 'ch30', title: '支持性治療與腫瘤藥物毒性', part: 6, sections: vol3Sections },
      // Part 7: 感染症
      { id: 'ch31', title: '抗生素 (Antibiotics) 總論', part: 7, sections: vol3Sections },
      { id: 'ch32', title: '敗血症 (Sepsis)', part: 7, sections: vol3Sections },
      { id: 'ch33', title: '尿路感染 (UTI)', part: 7, sections: vol3Sections },
      { id: 'ch34', title: '皮膚軟組織感染 (SSTI)', part: 7, sections: vol3Sections },
      { id: 'ch35', title: '中樞神經系統感染 (CNS Infections)', part: 7, sections: vol3Sections },
      { id: 'ch36', title: 'HIV 與免疫低下宿主', part: 7, sections: vol3Sections },
      // Part 8: 神經與精神
      { id: 'ch37', title: '中風 (Stroke)', part: 8, sections: vol3Sections },
      { id: 'ch38', title: '癲癇 (Epilepsy)', part: 8, sections: vol3Sections },
      { id: 'ch39', title: '頭痛與神經急症', part: 8, sections: vol3Sections },
      { id: 'ch40', title: '憂鬱、焦慮、思覺失調', part: 8, sections: vol3Sections },
      { id: 'ch41', title: '鎮靜、止痛與精神科藥物', part: 8, sections: vol3Sections },
      // Part 9: 風濕免疫
      { id: 'ch42', title: '類風濕性關節炎 (Rheumatoid Arthritis)', part: 9, sections: vol3Sections },
      { id: 'ch43', title: '全身性紅斑狼瘡 (SLE)', part: 9, sections: vol3Sections },
      { id: 'ch44', title: '骨質疏鬆 (Osteoporosis)', part: 9, sections: vol3Sections },
      { id: 'ch45', title: '痛風 (Gout)', part: 9, sections: vol3Sections },
      { id: 'ch46', title: '疼痛醫學與 NSAIDs / Opioids', part: 9, sections: vol3Sections },
      // Part 10: 婦兒
      { id: 'ch47', title: '產科基本議題', part: 10, sections: vol3Sections },
      { id: 'ch48', title: '婦科常見疾病', part: 10, sections: vol3Sections },
      { id: 'ch49', title: '新生兒與小兒常見問題', part: 10, sections: vol3Sections },
      { id: 'ch50', title: '疫苗學 (Vaccinology) 與預防醫學', part: 10, sections: vol3Sections },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // Volume IV：臨床技能、診斷推理與病人照護
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'volume-4',
    shortTitle: 'Vol. IV',
    title: '臨床技能、診斷推理與病人照護',
    subtitle: '',
    description: '建立從主訴到診斷推理的臨床思考，並整合醫藥合作與急症處置能力。',
    color: '#8b5cf6',
    parts: [
      { id: 1, title: '臨床思考方法', chapterIds: ['ch01', 'ch02'] },
      { id: 2, title: '核心臨床技能', chapterIds: ['ch03','ch04','ch05','ch06','ch07','ch08','ch09'] },
      { id: 3, title: '臨床情境中的醫藥合作', chapterIds: ['ch10','ch11','ch12','ch13','ch14'] },
      { id: 4, title: '急症與高風險情境', chapterIds: ['ch15','ch16','ch17','ch18','ch19','ch20','ch21','ch22'] },
    ],
    chapters: [
      {
        id: 'ch01', title: '從主訴開始：如何建構 Problem Representation', part: 1,
        sections: [
          { slug: 'chief-complaint-history-timeline', title: '主訴、病史、病程時間軸' },
          { slug: 'key-positive-negative-findings', title: '關鍵陽性與陰性發現' },
          { slug: 'building-differential-diagnosis', title: '建立鑑別診斷 (Differential Diagnosis)' },
          { slug: 'pre-test-probability-reasoning-errors', title: '先驗機率與臨床推理錯誤' },
        ],
      },
      {
        id: 'ch02', title: '檢查與檢驗判讀', part: 1,
        sections: [
          { slug: 'cbc-cmp-lft-renal', title: 'CBC、CMP、LFT、Renal Panel' },
          { slug: 'abg-vbg', title: 'ABG/VBG 判讀' },
          { slug: 'ekg-basics', title: 'EKG 基本判讀' },
          { slug: 'basic-imaging-principles', title: '基本影像判讀原則' },
          { slug: 'microbiology-culture-reports', title: '微生物檢驗與培養報告' },
        ],
      },
      {
        id: 'ch03', title: '病史詢問', part: 2,
        sections: [
          { slug: 'history-framework', title: '病史詢問框架' },
          { slug: 'open-closed-questions', title: '開放式與封閉式問題技巧' },
          { slug: 'sensitive-topics', title: '敏感議題的詢問技巧' },
          { slug: 'documentation', title: '病史記錄格式' },
        ],
      },
      {
        id: 'ch04', title: '身體檢查', part: 2,
        sections: [
          { slug: 'general-approach', title: '系統性檢查方法' },
          { slug: 'vital-signs', title: '生命徵象 (Vital Signs)' },
          { slug: 'system-examination', title: '各系統重點檢查' },
          { slug: 'clinical-findings-interpretation', title: '臨床發現的解讀' },
        ],
      },
      {
        id: 'ch05', title: 'SOAP Note 與進度紀錄', part: 2,
        sections: [
          { slug: 'soap-structure', title: 'SOAP 格式詳解' },
          { slug: 'problem-list', title: '問題清單 (Problem List)' },
          { slug: 'assessment-plan', title: 'Assessment & Plan 撰寫' },
          { slug: 'daily-progress-notes', title: '每日進度紀錄' },
        ],
      },
      {
        id: 'ch06', title: '口頭報告與交班', part: 2,
        sections: [
          { slug: 'oral-presentation-structure', title: '口頭報告結構' },
          { slug: 'sbar-communication', title: 'SBAR 溝通框架' },
          { slug: 'handoff-best-practices', title: '交班最佳實務' },
          { slug: 'common-mistakes', title: '常見錯誤與改善' },
        ],
      },
      {
        id: 'ch07', title: '處方與醫囑撰寫', part: 2,
        sections: [
          { slug: 'prescription-components', title: '處方組成要素' },
          { slug: 'medication-orders', title: '藥物醫囑格式' },
          { slug: 'high-alert-prescribing', title: '高警示藥品處方' },
          { slug: 'electronic-ordering', title: '電子醫囑系統' },
        ],
      },
      {
        id: 'ch08', title: '會診與轉介', part: 2,
        sections: [
          { slug: 'when-to-consult', title: '何時需要會診' },
          { slug: 'consult-request-format', title: '會診申請格式' },
          { slug: 'referral-process', title: '轉介流程' },
          { slug: 'follow-up-communication', title: '後續溝通與追蹤' },
        ],
      },
      {
        id: 'ch09', title: '出院計畫與追蹤', part: 2,
        sections: [
          { slug: 'discharge-planning-criteria', title: '出院計畫標準' },
          { slug: 'discharge-summary', title: '出院摘要撰寫' },
          { slug: 'patient-education-at-discharge', title: '出院衛教' },
          { slug: 'outpatient-follow-up', title: '門診追蹤安排' },
        ],
      },
      {
        id: 'ch10', title: 'Medication Reconciliation', part: 3,
        sections: [
          { slug: 'what-is-med-rec', title: 'Medication Reconciliation 定義與目的' },
          { slug: 'process-steps', title: '執行流程' },
          { slug: 'high-risk-transitions', title: '高風險轉銜時機' },
          { slug: 'team-roles', title: '醫藥團隊角色分工' },
        ],
      },
      {
        id: 'ch11', title: '抗生素 Stewardship', part: 3,
        sections: [
          { slug: 'antimicrobial-stewardship-principles', title: 'Antimicrobial Stewardship 原則' },
          { slug: 'appropriate-selection', title: '抗生素選擇與適當性評估' },
          { slug: 'de-escalation', title: 'De-escalation 策略' },
          { slug: 'pharmacist-role', title: '藥師在 Stewardship 中的角色' },
        ],
      },
      {
        id: 'ch12', title: '多重用藥與 Deprescribing', part: 3,
        sections: [
          { slug: 'polypharmacy-definition-scope', title: '多重用藥定義與範疇' },
          { slug: 'drug-related-problems', title: '藥物相關問題識別' },
          { slug: 'deprescribing-framework', title: 'Deprescribing 框架' },
          { slug: 'shared-decision-making', title: '共享決策與病人溝通' },
        ],
      },
      {
        id: 'ch13', title: 'ICU、急診與住院團隊中的藥師/醫師分工', part: 3,
        sections: [
          { slug: 'icu-pharmacy-roles', title: 'ICU 藥師角色' },
          { slug: 'ed-medication-management', title: '急診藥物管理' },
          { slug: 'interprofessional-rounds', title: '跨專業查房模式' },
          { slug: 'clinical-collaboration-models', title: '醫藥合作模式' },
        ],
      },
      {
        id: 'ch14', title: '門診慢性病管理', part: 3,
        sections: [
          { slug: 'chronic-disease-management-model', title: '慢性病管理模式' },
          { slug: 'medication-adherence-strategies', title: '用藥遵從性策略' },
          { slug: 'therapeutic-goals-monitoring', title: '治療目標與監測' },
          { slug: 'patient-self-management', title: '病人自我管理' },
        ],
      },
      {
        id: 'ch15', title: '胸痛 (Chest Pain)', part: 4,
        sections: [
          { slug: 'initial-assessment', title: '初步評估' },
          { slug: 'differential-diagnosis', title: '鑑別診斷' },
          { slug: 'immediate-management', title: '立即處置' },
          { slug: 'risk-stratification', title: '風險分層' },
        ],
      },
      {
        id: 'ch16', title: '呼吸困難 (Dyspnea)', part: 4,
        sections: [
          { slug: 'assessment', title: '評估方法' },
          { slug: 'differential-diagnosis', title: '鑑別診斷' },
          { slug: 'emergency-management', title: '急症處置' },
          { slug: 'oxygen-therapy', title: '氧氣治療原則' },
        ],
      },
      {
        id: 'ch17', title: '意識改變 (Altered Mental Status)', part: 4,
        sections: [
          { slug: 'assessment-gcs', title: '評估與 GCS' },
          { slug: 'aeiou-tips-mnemonic', title: 'AEIOU-TIPS 鑑別診斷' },
          { slug: 'management', title: '處置原則' },
          { slug: 'delirium-vs-dementia', title: '譫妄 vs 失智症鑑別' },
        ],
      },
      {
        id: 'ch18', title: '發燒與敗血症 (Fever & Sepsis)', part: 4,
        sections: [
          { slug: 'fever-evaluation', title: '發燒評估' },
          { slug: 'sepsis-definition-criteria', title: '敗血症定義與診斷標準' },
          { slug: 'sepsis-bundles', title: 'Sepsis Bundles 執行' },
          { slug: 'antibiotics-source-control', title: '抗生素選擇與感染源控制' },
        ],
      },
      {
        id: 'ch19', title: '過敏性休克 (Anaphylaxis)', part: 4,
        sections: [
          { slug: 'recognition-triggers', title: '辨識與誘因' },
          { slug: 'epinephrine-first-line', title: 'Epinephrine 第一線治療' },
          { slug: 'supportive-care', title: '支持性治療' },
          { slug: 'prevention-patient-education', title: '預防與病人衛教' },
        ],
      },
      {
        id: 'ch20', title: '中毒與藥物過量 (Toxicology & Overdose)', part: 4,
        sections: [
          { slug: 'toxidrome-recognition', title: 'Toxidrome 辨識' },
          { slug: 'general-management-principles', title: '一般處置原則' },
          { slug: 'common-antidotes', title: '常見解毒劑 (Antidotes)' },
          { slug: 'poison-control-consultation', title: '毒物中心諮詢' },
        ],
      },
      {
        id: 'ch21', title: '低血糖、高血糖危象', part: 4,
        sections: [
          { slug: 'hypoglycemia-management', title: '低血糖 (Hypoglycemia) 處置' },
          { slug: 'dka-management', title: '糖尿病酮酸中毒 (DKA) 處置' },
          { slug: 'hhs-management', title: '高滲性高血糖狀態 (HHS) 處置' },
          { slug: 'glycemic-targets-in-hospital', title: '住院血糖管理目標' },
        ],
      },
      {
        id: 'ch22', title: '抽搐與中風初步處置', part: 4,
        sections: [
          { slug: 'seizure-initial-management', title: '癲癇發作 (Seizure) 初步處置' },
          { slug: 'status-epilepticus', title: '癲癇持續狀態 (Status Epilepticus)' },
          { slug: 'stroke-recognition-tpa', title: '中風辨識與 tPA 時間窗' },
          { slug: 'stroke-unit-care', title: '中風加護照護' },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // Volume V：病人安全、醫療系統、倫理與溝通
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'volume-5',
    shortTitle: 'Vol. V',
    title: '病人安全、醫療系統、倫理與溝通',
    subtitle: '',
    description: '病人安全、醫療倫理、跨專業溝通，與醫療系統設計的核心能力。',
    color: '#ef4444',
    parts: [
      { id: 1, title: '病人安全', chapterIds: ['ch01','ch02','ch03','ch04','ch05'] },
      { id: 2, title: '倫理與法律', chapterIds: ['ch06','ch07','ch08','ch09','ch10'] },
      { id: 3, title: '溝通與專業', chapterIds: ['ch11','ch12','ch13','ch14','ch15','ch16'] },
      { id: 4, title: '健康系統與照護設計', chapterIds: ['ch17','ch18','ch19','ch20'] },
    ],
    chapters: [
      {
        id: 'ch01', title: '醫療錯誤與系統失誤', part: 1,
        sections: [
          { slug: 'types-of-medical-errors', title: '醫療錯誤分類' },
          { slug: 'swiss-cheese-model', title: 'Swiss Cheese Model' },
          { slug: 'human-factors', title: '人因工程 (Human Factors)' },
          { slug: 'just-culture', title: 'Just Culture 概念' },
        ],
      },
      {
        id: 'ch02', title: '高警示藥品 (High-Alert Medications)', part: 1,
        sections: [
          { slug: 'high-alert-drug-list', title: '高警示藥品清單' },
          { slug: 'error-prevention-strategies', title: '錯誤預防策略' },
          { slug: 'independent-double-check', title: '雙重確認機制' },
          { slug: 'technology-safeguards', title: '科技防護措施' },
        ],
      },
      {
        id: 'ch03', title: '用藥錯誤與近失事件', part: 1,
        sections: [
          { slug: 'medication-error-types', title: '用藥錯誤類型' },
          { slug: 'near-miss-reporting', title: '近失事件 (Near Miss) 通報' },
          { slug: 'contributing-factors', title: '促成因素分析' },
          { slug: 'prevention-interventions', title: '預防介入措施' },
        ],
      },
      {
        id: 'ch04', title: '根本原因分析 (Root Cause Analysis)', part: 1,
        sections: [
          { slug: 'rca-process', title: 'RCA 流程' },
          { slug: 'fishbone-diagram', title: '魚骨圖 (Fishbone Diagram)' },
          { slug: 'contributing-factors-vs-root-causes', title: '促成因素 vs 根本原因' },
          { slug: 'action-plan-implementation', title: '行動計畫與執行' },
        ],
      },
      {
        id: 'ch05', title: '品質改善 (Quality Improvement) 基本工具', part: 1,
        sections: [
          { slug: 'pdsa-cycle', title: 'PDSA 循環' },
          { slug: 'run-charts-control-charts', title: 'Run Charts 與 Control Charts' },
          { slug: 'driver-diagrams', title: 'Driver Diagrams' },
          { slug: 'qi-project-design', title: 'QI 專案設計' },
        ],
      },
      {
        id: 'ch06', title: '知情同意 (Informed Consent)', part: 2,
        sections: [
          { slug: 'elements-of-informed-consent', title: '知情同意要素' },
          { slug: 'capacity-assessment', title: '決策能力評估' },
          { slug: 'exceptions-emergencies', title: '例外情況與緊急狀況' },
          { slug: 'documentation', title: '文件記錄' },
        ],
      },
      {
        id: 'ch07', title: '病人自主與決策能力', part: 2,
        sections: [
          { slug: 'autonomy-principle', title: '自主原則 (Principle of Autonomy)' },
          { slug: 'decisional-capacity', title: '決策能力 (Decisional Capacity)' },
          { slug: 'substitute-decision-makers', title: '代理決策者' },
          { slug: 'advance-directives', title: '預立醫療指示 (Advance Directives)' },
        ],
      },
      {
        id: 'ch08', title: '隱私、保密與資料治理', part: 2,
        sections: [
          { slug: 'confidentiality-principles', title: '保密原則' },
          { slug: 'exceptions-to-confidentiality', title: '保密例外情況' },
          { slug: 'health-data-governance', title: '健康資料治理' },
          { slug: 'hipaa-overview', title: '個人資料保護法規概覽' },
        ],
      },
      {
        id: 'ch09', title: '末期照護與善終', part: 2,
        sections: [
          { slug: 'palliative-care-principles', title: '安寧緩和 (Palliative Care) 原則' },
          { slug: 'goals-of-care-conversations', title: 'Goals of Care 談話' },
          { slug: 'symptom-management-at-eol', title: '末期症狀管理' },
          { slug: 'dnr-and-withdrawal-of-care', title: 'DNR 與撤除治療' },
        ],
      },
      {
        id: 'ch10', title: '處方、管制藥品與法規概念', part: 2,
        sections: [
          { slug: 'controlled-substances-regulation', title: '管制藥品法規' },
          { slug: 'prescription-requirements', title: '處方合法要求' },
          { slug: 'prescriber-liability', title: '處方責任' },
          { slug: 'drug-diversion-prevention', title: '藥品濫用與防範' },
        ],
      },
      {
        id: 'ch11', title: '壞消息告知 (Breaking Bad News)', part: 3,
        sections: [
          { slug: 'spikes-framework', title: 'SPIKES 框架' },
          { slug: 'patient-emotional-responses', title: '病人情緒反應處理' },
          { slug: 'family-presence', title: '家屬在場的考量' },
          { slug: 'follow-up-support', title: '後續支持與追蹤' },
        ],
      },
      {
        id: 'ch12', title: '與家屬溝通', part: 3,
        sections: [
          { slug: 'family-meeting-structure', title: '家庭會議 (Family Meeting) 結構' },
          { slug: 'surrogate-decision-making', title: '代理決策溝通' },
          { slug: 'conflict-resolution', title: '衝突處理' },
          { slug: 'cultural-considerations', title: '文化差異考量' },
        ],
      },
      {
        id: 'ch13', title: '共享決策 (Shared Decision Making)', part: 3,
        sections: [
          { slug: 'sdm-model', title: 'SDM 模型與步驟' },
          { slug: 'decision-aids', title: '決策輔助工具 (Decision Aids)' },
          { slug: 'patient-values-preferences', title: '病人價值觀與偏好' },
          { slug: 'implementation-barriers', title: '執行障礙與解方' },
        ],
      },
      {
        id: 'ch14', title: '跨專業團隊溝通', part: 3,
        sections: [
          { slug: 'interprofessional-collaboration', title: '跨專業合作 (IPC) 原則' },
          { slug: 'team-communication-tools', title: '團隊溝通工具' },
          { slug: 'role-clarity', title: '角色清晰度' },
          { slug: 'conflict-in-teams', title: '團隊衝突處理' },
        ],
      },
      {
        id: 'ch15', title: '文化敏感度與健康素養', part: 3,
        sections: [
          { slug: 'cultural-competence', title: '文化能力 (Cultural Competence)' },
          { slug: 'health-literacy', title: '健康素養 (Health Literacy)' },
          { slug: 'language-barriers', title: '語言障礙與翻譯服務' },
          { slug: 'culturally-responsive-care', title: '文化回應性照護' },
        ],
      },
      {
        id: 'ch16', title: '專業形象、反思與 Burnout', part: 3,
        sections: [
          { slug: 'professionalism', title: '醫療專業形象' },
          { slug: 'reflective-practice', title: '反思性實踐 (Reflective Practice)' },
          { slug: 'burnout-recognition', title: 'Burnout 辨識與預防' },
          { slug: 'wellbeing-resilience', title: '醫護人員身心健康' },
        ],
      },
      {
        id: 'ch17', title: '醫院、社區、長照與轉銜照護', part: 4,
        sections: [
          { slug: 'care-continuum', title: '照護連續體系 (Care Continuum)' },
          { slug: 'transitional-care', title: '轉銜照護 (Transitional Care)' },
          { slug: 'long-term-care', title: '長期照護 (Long-Term Care)' },
          { slug: 'community-health-resources', title: '社區健康資源' },
        ],
      },
      {
        id: 'ch18', title: '保險、給付與成本效益', part: 4,
        sections: [
          { slug: 'health-insurance-systems', title: '健保制度概覽' },
          { slug: 'reimbursement-models', title: '給付模式' },
          { slug: 'cost-effectiveness-analysis', title: '成本效益分析 (Cost-Effectiveness Analysis)' },
          { slug: 'value-based-care', title: '價值導向照護 (Value-Based Care)' },
        ],
      },
      {
        id: 'ch19', title: '藥品 Formulary 與健康科技評估', part: 4,
        sections: [
          { slug: 'formulary-management', title: 'Formulary 管理' },
          { slug: 'health-technology-assessment', title: '健康科技評估 (HTA)' },
          { slug: 'pharmacoeconomics', title: '藥物經濟學 (Pharmacoeconomics)' },
          { slug: 'drug-policy', title: '藥品政策' },
        ],
      },
      {
        id: 'ch20', title: '公衛危機與醫療資源配置', part: 4,
        sections: [
          { slug: 'public-health-emergency-response', title: '公衛緊急應變' },
          { slug: 'triage-resource-allocation', title: '檢傷分類與資源配置' },
          { slug: 'crisis-standards-of-care', title: '危機照護標準' },
          { slug: 'ethical-frameworks-in-crisis', title: '危機中的倫理框架' },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // Volume VI：研究、證據、公共衛生與未來醫療
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'volume-6',
    shortTitle: 'Vol. VI',
    title: '研究、證據、公共衛生與未來醫療',
    subtitle: '',
    description: '從實證醫學到流行病學，再到 AI 與精準醫療，掌握未來醫療的研究基礎。',
    color: '#06b6d4',
    parts: [
      { id: 1, title: '證據醫學與文獻判讀', chapterIds: ['ch01','ch02','ch03','ch04','ch05','ch06'] },
      { id: 2, title: '流行病學與公共衛生', chapterIds: ['ch07','ch08','ch09','ch10','ch11'] },
      { id: 3, title: '數位醫療與未來趨勢', chapterIds: ['ch12','ch13','ch14','ch15','ch16','ch17'] },
    ],
    chapters: [
      {
        id: 'ch01', title: '臨床問題的形成 (PICO)', part: 1,
        sections: [
          { slug: 'pico-framework', title: 'PICO 框架' },
          { slug: 'background-vs-foreground', title: 'Background vs Foreground 問題' },
          { slug: 'clinical-question-types', title: '臨床問題類型' },
          { slug: 'searching-evidence', title: '文獻搜尋策略' },
        ],
      },
      {
        id: 'ch02', title: '研究設計總覽', part: 1,
        sections: [
          { slug: 'rct', title: '隨機對照試驗 (RCT)' },
          { slug: 'cohort-case-control', title: '世代研究與病例對照研究' },
          { slug: 'cross-sectional-ecological', title: '橫斷面與生態研究' },
          { slug: 'hierarchy-of-evidence', title: '證據等級 (Hierarchy of Evidence)' },
        ],
      },
      {
        id: 'ch03', title: '統計核心概念', part: 1,
        sections: [
          { slug: 'descriptive-stats', title: '描述性統計' },
          { slug: 'hypothesis-testing-p-value', title: '假設檢定與 p 值' },
          { slug: 'confidence-intervals', title: '信賴區間 (Confidence Intervals)' },
          { slug: 'number-needed-to-treat', title: 'NNT / NNH' },
        ],
      },
      {
        id: 'ch04', title: '偏差、混雜與因果推論', part: 1,
        sections: [
          { slug: 'selection-information-bias', title: '選擇偏差與資訊偏差' },
          { slug: 'confounding-control', title: '混雜因子控制' },
          { slug: 'causal-inference-frameworks', title: '因果推論框架' },
          { slug: 'threats-to-validity', title: '效度威脅' },
        ],
      },
      {
        id: 'ch05', title: '系統性回顧與指南判讀', part: 1,
        sections: [
          { slug: 'systematic-review-meta-analysis', title: '系統性回顧與統合分析 (Meta-Analysis)' },
          { slug: 'grade-framework', title: 'GRADE 框架' },
          { slug: 'clinical-guideline-appraisal', title: '臨床指南評讀' },
          { slug: 'conflicts-of-interest', title: '利益衝突考量' },
        ],
      },
      {
        id: 'ch06', title: '實際把證據放進病床邊決策', part: 1,
        sections: [
          { slug: 'evidence-to-practice', title: '證據轉化實務' },
          { slug: 'patient-values-integration', title: '整合病人價值觀' },
          { slug: 'clinical-decision-support', title: '臨床決策支援工具' },
          { slug: 'implementation-science', title: '實施科學 (Implementation Science)' },
        ],
      },
      {
        id: 'ch07', title: '疾病頻率與風險', part: 2,
        sections: [
          { slug: 'incidence-prevalence', title: '發生率 (Incidence) 與盛行率 (Prevalence)' },
          { slug: 'risk-measures', title: '風險指標 (RR, OR, HR)' },
          { slug: 'diagnostic-test-accuracy', title: '診斷測試準確度' },
          { slug: 'disease-burden-measurement', title: '疾病負擔衡量' },
        ],
      },
      {
        id: 'ch08', title: '篩檢與預防', part: 2,
        sections: [
          { slug: 'screening-principles', title: '篩檢原則 (Wilson-Jungner Criteria)' },
          { slug: 'prevention-levels', title: '初段、二段、三段預防' },
          { slug: 'screening-program-evaluation', title: '篩檢計畫評估' },
          { slug: 'overdiagnosis-harms', title: '過度診斷 (Overdiagnosis) 的危害' },
        ],
      },
      {
        id: 'ch09', title: '疫苗、群體免疫與健康政策', part: 2,
        sections: [
          { slug: 'vaccine-immunology', title: '疫苗免疫學原理' },
          { slug: 'herd-immunity-threshold', title: '群體免疫門檻' },
          { slug: 'vaccination-programs', title: '疫苗接種計畫' },
          { slug: 'vaccine-hesitancy', title: '疫苗猶豫 (Vaccine Hesitancy) 應對' },
        ],
      },
      {
        id: 'ch10', title: '社會決定因子與健康不平等', part: 2,
        sections: [
          { slug: 'social-determinants-of-health', title: '健康社會決定因子 (SDOH)' },
          { slug: 'health-disparities', title: '健康不平等 (Health Disparities)' },
          { slug: 'structural-racism-health', title: '結構性種族主義與健康' },
          { slug: 'interventions-addressing-sdoh', title: '介入措施' },
        ],
      },
      {
        id: 'ch11', title: '全球健康與傳染病監測', part: 2,
        sections: [
          { slug: 'global-health-burden', title: '全球疾病負擔' },
          { slug: 'infectious-disease-surveillance', title: '傳染病監測系統' },
          { slug: 'outbreak-investigation', title: '疫情調查 (Outbreak Investigation)' },
          { slug: 'one-health-approach', title: 'One Health 概念' },
        ],
      },
      {
        id: 'ch12', title: '電子病歷與臨床決策支援', part: 3,
        sections: [
          { slug: 'ehr-architecture', title: '電子病歷 (EHR) 架構' },
          { slug: 'clinical-decision-support-systems', title: '臨床決策支援系統 (CDSS)' },
          { slug: 'interoperability-standards', title: '互通性標準 (HL7, FHIR)' },
          { slug: 'alert-fatigue', title: 'Alert Fatigue 問題' },
        ],
      },
      {
        id: 'ch13', title: 'AI in Healthcare', part: 3,
        sections: [
          { slug: 'ml-dl-fundamentals-in-health', title: '機器學習與深度學習基礎' },
          { slug: 'ai-clinical-applications', title: 'AI 臨床應用案例' },
          { slug: 'bias-fairness-ai', title: 'AI 偏差與公平性' },
          { slug: 'regulatory-framework-ai', title: 'AI 法規框架' },
        ],
      },
      {
        id: 'ch14', title: 'Pharmacogenomics 與 Precision Medicine', part: 3,
        sections: [
          { slug: 'pgx-clinical-implementation', title: 'PGx 臨床實作' },
          { slug: 'precision-medicine-oncology', title: '腫瘤精準醫療' },
          { slug: 'biomarker-driven-therapy', title: '生物標記導向治療' },
          { slug: 'ethical-social-implications', title: '倫理與社會影響' },
        ],
      },
      {
        id: 'ch15', title: 'Real-World Evidence (RWE)', part: 3,
        sections: [
          { slug: 'rwe-vs-rct', title: 'RWE vs RCT 比較' },
          { slug: 'rwd-sources', title: '真實世界數據 (RWD) 來源' },
          { slug: 'methodological-considerations', title: '方法學注意事項' },
          { slug: 'regulatory-use-of-rwe', title: 'RWE 在法規的應用' },
        ],
      },
      {
        id: 'ch16', title: '遠距醫療與居家照護', part: 3,
        sections: [
          { slug: 'telehealth-models', title: '遠距醫療 (Telehealth) 模式' },
          { slug: 'remote-patient-monitoring', title: '遠端病人監測' },
          { slug: 'digital-therapeutics', title: '數位療法 (Digital Therapeutics)' },
          { slug: 'equity-access-telehealth', title: '遠距照護的公平性問題' },
        ],
      },
      {
        id: 'ch17', title: '醫療創新、法規與實作限制', part: 3,
        sections: [
          { slug: 'fda-ema-regulatory-pathways', title: '藥品審查法規路徑 (FDA/EMA)' },
          { slug: 'clinical-trial-phases', title: '臨床試驗 (Clinical Trial) 各期' },
          { slug: 'innovation-implementation-gap', title: '創新與實作的落差' },
          { slug: 'future-of-medicine', title: '未來醫療展望' },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // Companion Manual
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'companion',
    shortTitle: 'Companion',
    title: '病例、處方、OSCE/口試/臨床訓練手冊',
    subtitle: '',
    description: '實戰練習手冊：病例、OSCE station、臨床推理演練、考核準備。',
    color: '#f97316',
    parts: [
      { id: 1, title: 'Case Workbook', chapterIds: ['ch01','ch02','ch03','ch04','ch05'] },
      { id: 2, title: 'Skills Lab', chapterIds: ['ch06','ch07','ch08','ch09','ch10','ch11'] },
      { id: 3, title: 'Clinical Reasoning Drills', chapterIds: ['ch12','ch13','ch14','ch15','ch16'] },
      { id: 4, title: 'Assessment Prep', chapterIds: ['ch17','ch18','ch19','ch20'] },
    ],
    chapters: [
      {
        id: 'ch01', title: '初學者病例 50 題', part: 1,
        sections: [
          { slug: 'cases-1-10', title: '病例 1–10：基本診斷推理' },
          { slug: 'cases-11-25', title: '病例 11–25：主訴與鑑別診斷' },
          { slug: 'cases-26-40', title: '病例 26–40：基本用藥決策' },
          { slug: 'cases-41-50', title: '病例 41–50：整合評估' },
        ],
      },
      {
        id: 'ch02', title: '中階整合病例 100 題', part: 1,
        sections: [
          { slug: 'cases-cardiovascular', title: '心血管病例組' },
          { slug: 'cases-pulmonary-renal', title: '呼吸/腎臟病例組' },
          { slug: 'cases-endocrine-gi', title: '內分泌/消化病例組' },
          { slug: 'cases-id-neuro', title: '感染症/神經病例組' },
        ],
      },
      {
        id: 'ch03', title: '高風險急症病例 50 題', part: 1,
        sections: [
          { slug: 'sepsis-shock-cases', title: '敗血症/休克病例' },
          { slug: 'respiratory-failure-cases', title: '呼吸衰竭病例' },
          { slug: 'cardiac-emergencies', title: '心臟急症病例' },
          { slug: 'neuro-emergencies', title: '神經急症病例' },
        ],
      },
      {
        id: 'ch04', title: '多重用藥與老人案例', part: 1,
        sections: [
          { slug: 'polypharmacy-cases', title: '多重用藥病例' },
          { slug: 'drug-interactions-cases', title: '藥物交互作用案例' },
          { slug: 'deprescribing-cases', title: 'Deprescribing 案例' },
          { slug: 'falls-delirium-cases', title: '跌倒/譫妄案例' },
        ],
      },
      {
        id: 'ch05', title: '特殊族群案例', part: 1,
        sections: [
          { slug: 'pediatric-cases', title: '小兒病例' },
          { slug: 'obstetric-cases', title: '產科病例' },
          { slug: 'renal-hepatic-failure-cases', title: '腎/肝衰竭病例' },
          { slug: 'oncology-cases', title: '腫瘤病例' },
        ],
      },
      {
        id: 'ch06', title: '病史採集腳本', part: 2,
        sections: [
          { slug: 'chest-pain-script', title: '胸痛病史腳本' },
          { slug: 'dyspnea-script', title: '呼吸困難病史腳本' },
          { slug: 'abdominal-pain-script', title: '腹痛病史腳本' },
          { slug: 'altered-ms-script', title: '意識改變病史腳本' },
        ],
      },
      {
        id: 'ch07', title: '身體檢查 Checklist', part: 2,
        sections: [
          { slug: 'cardiovascular-exam-checklist', title: '心血管檢查 Checklist' },
          { slug: 'respiratory-exam-checklist', title: '呼吸系統檢查 Checklist' },
          { slug: 'abdominal-exam-checklist', title: '腹部檢查 Checklist' },
          { slug: 'neuro-exam-checklist', title: '神經學檢查 Checklist' },
        ],
      },
      {
        id: 'ch08', title: 'OSCE Station 設計', part: 2,
        sections: [
          { slug: 'osce-station-examples', title: 'OSCE Station 範例' },
          { slug: 'marking-criteria', title: '評分標準設計' },
          { slug: 'feedback-strategies', title: '回饋策略' },
          { slug: 'common-osce-mistakes', title: '常見 OSCE 失誤' },
        ],
      },
      {
        id: 'ch09', title: '處方審核與調劑練習', part: 2,
        sections: [
          { slug: 'prescription-review-cases', title: '處方審核案例' },
          { slug: 'dose-calculation-practice', title: '劑量計算練習' },
          { slug: 'drug-interaction-screening', title: '藥物交互作用篩查' },
          { slug: 'dispensing-error-prevention', title: '調劑錯誤預防' },
        ],
      },
      {
        id: 'ch10', title: '用藥衛教模擬', part: 2,
        sections: [
          { slug: 'medication-counseling-scripts', title: '衛教腳本' },
          { slug: 'inhaler-technique-simulation', title: '吸入劑技術模擬' },
          { slug: 'insulin-injection-teaching', title: '胰島素注射衛教' },
          { slug: 'anticoagulation-counseling', title: '抗凝血劑衛教' },
        ],
      },
      {
        id: 'ch11', title: '團隊交班與 SBAR 練習', part: 2,
        sections: [
          { slug: 'sbar-practice-scenarios', title: 'SBAR 練習情境' },
          { slug: 'handoff-simulation', title: '交班模擬' },
          { slug: 'i-pass-framework', title: 'I-PASS 框架' },
          { slug: 'common-communication-failures', title: '常見溝通失誤' },
        ],
      },
      {
        id: 'ch12', title: '鑑別診斷訓練', part: 3,
        sections: [
          { slug: 'differential-by-chief-complaint', title: '以主訴分類的鑑別診斷' },
          { slug: 'systematic-dd-approach', title: '系統性鑑別診斷方法' },
          { slug: 'probability-based-reasoning', title: '機率導向推理' },
          { slug: 'diagnostic-error-drills', title: '診斷錯誤演練' },
        ],
      },
      {
        id: 'ch13', title: 'Lab Interpretation Drills', part: 3,
        sections: [
          { slug: 'cbc-interpretation-drills', title: 'CBC 判讀練習' },
          { slug: 'metabolic-panel-drills', title: 'Metabolic Panel 判讀' },
          { slug: 'abg-acid-base-drills', title: 'ABG 酸鹼判讀練習' },
          { slug: 'integrated-lab-cases', title: '整合性實驗室案例' },
        ],
      },
      {
        id: 'ch14', title: 'EKG / Imaging Quick Drills', part: 3,
        sections: [
          { slug: 'ekg-rhythm-drills', title: 'EKG 節律判讀練習' },
          { slug: 'ekg-ischemia-drills', title: 'EKG 缺血判讀練習' },
          { slug: 'chest-xray-drills', title: '胸部 X 光快速判讀' },
          { slug: 'ct-abdomen-basics', title: '腹部 CT 基礎判讀' },
        ],
      },
      {
        id: 'ch15', title: '抗生素選擇練習', part: 3,
        sections: [
          { slug: 'empiric-antibiotic-selection', title: '經驗性抗生素選擇' },
          { slug: 'culture-directed-therapy', title: '培養結果導向治療' },
          { slug: 'antibiotic-de-escalation-drills', title: 'De-escalation 練習' },
          { slug: 'allergy-cross-reactivity', title: '過敏與交叉反應' },
        ],
      },
      {
        id: 'ch16', title: '劑量調整與 TDM 題組', part: 3,
        sections: [
          { slug: 'renal-dose-adjustment-cases', title: '腎功能劑量調整案例' },
          { slug: 'hepatic-dose-adjustment-cases', title: '肝功能劑量調整案例' },
          { slug: 'tdm-vancomycin-aminoglycoside', title: 'Vancomycin / Aminoglycoside TDM' },
          { slug: 'tdm-other-drugs', title: '其他 TDM 藥品練習' },
        ],
      },
      {
        id: 'ch17', title: '醫學系常見考核框架', part: 4,
        sections: [
          { slug: 'shelf-exams-overview', title: 'Shelf 考試概覽' },
          { slug: 'clinical-milestone-assessment', title: '臨床里程碑評估' },
          { slug: 'epa-entrustable-activities', title: 'EPA (Entrustable Professional Activities)' },
          { slug: 'study-strategies', title: '考前準備策略' },
        ],
      },
      {
        id: 'ch18', title: '藥學系常見考核框架', part: 4,
        sections: [
          { slug: 'naplex-mpje-overview', title: 'NAPLEX / MPJE 概覽' },
          { slug: 'appe-oppe-assessment', title: 'APPE / OPPE 評估' },
          { slug: 'pharmacy-competency-standards', title: '藥學能力標準' },
          { slug: 'study-strategies', title: '考前準備策略' },
        ],
      },
      {
        id: 'ch19', title: '口試與 Case Presentation', part: 4,
        sections: [
          { slug: 'oral-exam-formats', title: '口試形式' },
          { slug: 'case-presentation-structure', title: 'Case Presentation 結構' },
          { slug: 'common-oral-exam-questions', title: '常見口試問題' },
          { slug: 'presentation-skills', title: '表達技巧' },
        ],
      },
      {
        id: 'ch20', title: '臨床實習生存指南', part: 4,
        sections: [
          { slug: 'first-day-clerkship', title: '實習第一天須知' },
          { slug: 'time-management-clerkship', title: '時間管理技巧' },
          { slug: 'asking-for-help', title: '如何求助與自我保護' },
          { slug: 'documentation-tips', title: '病歷記錄技巧' },
        ],
      },
    ],
  },
];

export function getVolume(volumeId: string): Volume | undefined {
  return volumes.find(v => v.id === volumeId);
}

export function getChapter(volumeId: string, chapterId: string) {
  const vol = getVolume(volumeId);
  return vol?.chapters.find(c => c.id === chapterId);
}

export function getFirstChapterId(volumeId: string): string | undefined {
  const vol = getVolume(volumeId);
  return vol?.chapters[0]?.id;
}

export function getPrevNextChapter(volumeId: string, chapterId: string) {
  const vol = getVolume(volumeId);
  if (!vol) return { prev: null, next: null };
  const idx = vol.chapters.findIndex(c => c.id === chapterId);
  return {
    prev: idx > 0 ? vol.chapters[idx - 1] : null,
    next: idx < vol.chapters.length - 1 ? vol.chapters[idx + 1] : null,
  };
}
