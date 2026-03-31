import type { ChapterContent } from '../../types.js';
import {
  cards,
  callout,
  chapter,
  diagram,
  endocrineViewer,
  formula,
  h3,
  lead,
  list,
  misconceptionList,
  p,
  references,
  section,
  spotlight,
  summary,
  table,
  tags,
  takeawayList,
} from './shared.js';

export const endocrineChapters: Record<string, ChapterContent> = {};

const endocrineSources: Record<string, { label: string; url: string; note: string }[]> = {
  ch22: [
    {
      label: 'NIDDK What Is Diabetes?',
      url: 'https://www.niddk.nih.gov/health-information/diabetes/overview/what-is-diabetes',
      note: '提供糖尿病病型、症狀與併發症的官方總覽，可對照本章多器官失衡與病型分類。',
    },
    {
      label: 'ADA Standards of Care',
      url: 'https://professional.diabetes.org/standards-of-care',
      note: '現代糖尿病治療、心腎保護、降糖藥排序與監測策略的重要官方專業來源。',
    },
  ],
  ch23: [
    {
      label: 'NIDDK Hypothyroidism',
      url: 'https://www.niddk.nih.gov/health-information/endocrine-diseases/hypothyroidism',
      note: '補足甲狀腺低下的病因、症狀與治療，可對照本章 HPT axis 與 replacement therapy 的內容。',
    },
    {
      label: 'NIDDK Hyperthyroidism',
      url: 'https://www.niddk.nih.gov/health-information/endocrine-diseases/hyperthyroidism',
      note: '涵蓋 Graves disease、甲狀腺功能亢進與治療方式，是本章甲亢分流與處置的重要背景來源。',
    },
  ],
  ch24: [
    {
      label: 'NIDDK Adrenal Insufficiency',
      url: 'https://www.niddk.nih.gov/health-information/endocrine-diseases/adrenal-insufficiency-addisons-disease',
      note: '提供腎上腺功能不全的病理、症狀與治療，可對照本章 adrenal crisis 與 glucocorticoid replacement 的段落。',
    },
    {
      label: 'NIDDK Prolactinoma',
      url: 'https://www.niddk.nih.gov/health-information/endocrine-diseases/prolactinoma',
      note: '補上垂體腫瘤、乳漏、月經異常與視野症狀的診療脈絡，適合作為本章 pituitary axis 的代表性來源。',
    },
  ],
  ch25: [
    {
      label: 'NIDDK Prescription Medications to Treat Overweight & Obesity',
      url: 'https://www.niddk.nih.gov/health-information/weight-management/prescription-medications-treat-overweight-obesity',
      note: '提供減重藥使用條件、效果與副作用整理，可對照本章 GLP-1 RA / GIP-GLP-1 治療策略。',
    },
    {
      label: 'NHLBI Metabolic Syndrome',
      url: 'https://www.nhlbi.nih.gov/health/metabolic-syndrome',
      note: '補足腰圍、血壓、血脂與血糖聚落風險的官方說明，適合作為本章代謝症候群架構來源。',
    },
  ],
};

endocrineChapters.ch22 = chapter(
  '糖尿病 (Diabetes Mellitus)',
  section(
    'anatomy-physiology',
    '正常解剖與生理',
    lead(`糖尿病 (Diabetes Mellitus) 的底層生理不是「血裡糖太多」這麼簡單，而是胰島 β 細胞 (Beta cell)、胰島 α 細胞 (Alpha cell)、肝糖輸出 (Hepatic glucose output)、骨骼肌葡萄糖攝取、脂肪組織脂解 (Lipolysis)、腎臟葡萄糖再吸收與腸泌素 (Incretin) 訊號整體失衡的結果。正常狀態下，胰島素 (Insulin) 在餐後上升，促進 GLUT4 進入骨骼肌與脂肪細胞膜，讓葡萄糖被帶進細胞；同時抑制肝臟糖質新生 (Gluconeogenesis) 與肝糖分解 (Glycogenolysis)，避免血糖繼續飆高。`),
    p(`升糖素 (Glucagon) 則像空腹時段的對手盤，在禁食與壓力狀態下提高肝糖輸出。腸道的 GLP-1 (Glucagon-like peptide-1) 與 GIP (Glucose-dependent insulinotropic polypeptide) 會把「有食物進來」的訊號傳給胰臟，協助 glucose-dependent insulin secretion。腎臟近端小管的 SGLT2 (Sodium-glucose cotransporter 2) 會把濾過的葡萄糖大多數重新帶回血液，因此在高血糖時，腎臟其實不是被動旁觀，而是參與維持高血糖環境的一環。`),
    tags(['Beta cell', 'Glucagon', 'GLP-1 / GIP', 'SGLT2', 'Hepatic glucose output']),
    endocrineViewer('glucose-homeostasis'),
    diagram('endocrine-glucose-map'),
    cards([
      { title: '胰島 β 細胞 (Beta cell)', body: '負責感測葡萄糖濃度並分泌胰島素。當 β 細胞儲備被自體免疫、脂毒性或慢性高血糖耗損後，餐後與基礎分泌都會失守。' },
      { title: '肝臟 (Liver)', body: '空腹高血糖最常被肝糖輸出推高。很多病人早餐前血糖高，不是前一晚吃太多，而是夜間肝臟仍在製造葡萄糖。' },
      { title: '骨骼肌 (Skeletal muscle)', body: '餐後葡萄糖最大去路之一。當骨骼肌胰島素阻抗變重，血糖就會在餐後先失控。' },
      { title: '脂肪組織 (Adipose tissue)', body: '脂肪細胞不是被動儲油槽。當脂解過強、adipokines 失衡與內臟脂肪發炎增加時，肝臟與肌肉的胰島素阻抗都會惡化。' },
    ]),
    formula('葡萄糖分子式', 'C6H12O6', '臨床上關心的不只是葡萄糖絕對濃度，而是它進不了細胞、拉高滲透壓、改寫脂質代謝並造成終末器官糖毒性之後，整個系統會如何連鎖失衡。'),
    summary('生理總結', '正常血糖穩態依賴多器官接力：胰臟負責訊號、肝臟負責供應、骨骼肌與脂肪負責利用、腎臟負責再吸收閾值、腸道負責進食後的放大器。', [
      '餐後高血糖常先反映 incretin 與肌肉攝糖異常。',
      '空腹高血糖常先反映肝糖輸出過高。',
      '胰島素阻抗與 β 細胞衰竭在 type 2 diabetes 通常同時存在，只是比例不同。',
    ]),
  ),
  section(
    'symptoms',
    '常見主訴與症狀',
    lead(`糖尿病的主訴常出現在兩個層次。第一層是高血糖本身造成的滲透壓與能量利用失衡，例如多尿 (Polyuria)、多渴 (Polydipsia)、夜尿、體重下降、疲倦、視力模糊與反覆感染。第二層是長期併發症或急性危象登場後才被看見，例如足部麻木、蛋白尿、心血管事件、酮酸中毒 (DKA) 或高滲透壓高血糖狀態 (HHS)。`),
    p(`真正臨床上常見的陷阱是：type 2 diabetes 病人可能多年幾乎沒有主訴，直到健檢看到 A1C 偏高、眼底病變、UACR 上升或心肌梗塞後才被確診；相反地，type 1 diabetes 常在幾週內快速出現口渴、暴瘦、嘔吐、腹痛與呼吸改變。病人的敘事不一定會說「我有多尿」，他可能只會說最近一直想喝飲料、半夜要起來上廁所、上班很累、傷口比較不會好。`),
    table(
      ['臨床情境', '常見主訴', '背後代表什麼', '要不要急'],
      [
        ['初發 type 2 diabetes', '健檢發現空腹血糖與 A1C 偏高，偶有口乾或疲倦', '多半是慢性胰島素阻抗與 β 細胞補償掉隊', '需分層評估，但多數非急症'],
        ['初發 type 1 diabetes', '短時間內口渴、多尿、體重下降、噁心', '絕對胰島素缺乏，可能快速走向 DKA', '是，若有嘔吐或呼吸改變要立刻處理'],
        ['DKA', '腹痛、噁心、嘔吐、脫水、深快呼吸、意識變差', '酮體、代謝性酸中毒與總體鉀缺失', '是，需急診與監測'],
        ['HHS', '極度口渴、神智改變、嚴重脫水，但酮酸中毒不一定明顯', '高滲透壓與高血糖主導，常見於年長 type 2 diabetes', '是，死亡率通常高於 DKA'],
      ],
    ),
    callout(
      'clinical',
      '真實場景',
      p(`一位 56 歲男性工程師，近三個月覺得「最近很容易累、晚上常起來喝水」，但把原因歸咎於加班與冷氣太乾。健檢時 A1C 10.8%、TG 420 mg/dL、尿白蛋白上升。這類病人最容易被延後診斷，因為症狀不戲劇化，卻已經在眼、腎、血管與脂質代謝層面累積傷害。`),
    ),
    takeawayList([
      { title: '症狀可能很淡', body: 'type 2 diabetes 很常不是以劇烈不適出現，而是以模糊疲倦、反覆感染或傷口癒合差慢慢浮現。' },
      { title: '急性危象很戲劇化', body: '腹痛、嘔吐、脫水、神智改變、深快呼吸時要主動想到 DKA / HHS，而不是只當成腸胃炎。' },
      { title: '長期併發症常早於抱怨', body: '眼底病變、蛋白尿、神經病變與 ASCVD 風險累積，往往早於病人主動說出典型三多症狀。' },
    ]),
  ),
  section(
    'pathophysiology',
    '重要疾病機轉',
    lead(`type 1 diabetes 的核心是自體免疫破壞 β 細胞，常與 GAD65、IA-2、ZnT8 或 insulin autoantibody 相關。當剩餘 β 細胞量不足以支撐基礎與餐後胰島素需求時，病人會快速失去抑制脂解與酮體生成的能力，因此更容易出現 DKA。某些成人看起來像 type 2 diabetes，但其實是 latent autoimmune diabetes in adults (LADA)，若只用口服藥拖延太久，常會讓控制與診斷一起惡化。`),
    p(`type 2 diabetes 則不是單一故障點，而是多器官慢性失衡：內臟脂肪增加讓脂解與發炎訊號上升，肝臟持續放糖，骨骼肌攝糖下降，腸泌素效應變鈍，腎臟提高葡萄糖再吸收，β 細胞在長期 glucotoxicity 與 lipotoxicity 下逐步耗竭。這也是為什麼 type 2 diabetes 一開始像「阻抗病」，後來又會變成「分泌也不夠」的病。`),
    diagram('endocrine-glucose-map'),
    cards([
      { title: 'DKA (Diabetic ketoacidosis)', body: '關鍵不是只有血糖高，而是胰島素缺乏到無法壓住脂解與酮體生成。β-hydroxybutyrate、陰離子間隙與酸中毒深度比血糖更能描述機轉。' },
      { title: 'HHS (Hyperosmolar hyperglycemic state)', body: '多見於仍有少量胰島素的病人，因此酮體沒有 DKA 那麼顯著，但高滲透壓與脫水更重，神經學表現更突出。' },
      { title: 'MODY / 單基因糖尿病 (Monogenic diabetes)', body: '年輕、家族垂直遺傳、體型不胖、抗體陰性且 C-peptide 保留時，要想到不是典型 type 1 / type 2。這類病人的藥物選擇可能和一般 diabetes 完全不同。' },
      { title: '藥物誘發高血糖', body: '類固醇、calcineurin inhibitor、atypical antipsychotics、PI、thiazide 在特定病人都可把原本邊緣的糖代謝推向顯性糖尿病。' },
    ], 'comparison-grid'),
    misconceptionList([
      { myth: 'type 2 diabetes 只是吃太多甜。', correction: '高糖飲食可以加重風險，但真正的 type 2 diabetes 是遺傳背景、內臟脂肪、睡眠、活動量、肝胰軸與 β 細胞儲備共同決定的慢性代謝病。' },
      { myth: '只要還有口服藥可用，就代表病人還不需要胰島素。', correction: '當出現 catabolic symptoms、A1C 非常高、明顯高血糖症狀、DKA 或 type 1 diabetes 時，胰島素不是最後手段，而是生理上最直接的替代治療。' },
    ]),
  ),
  section(
    'diagnosis',
    '診斷思路與鑑別診斷',
    lead(`根據 ADA 2026 Standards of Care，糖尿病可以用 A1C、空腹血糖 (FPG)、75 g OGTT 的 2 小時血糖，或伴隨典型高血糖症狀 / 危象的隨機血糖來診斷。若沒有明確高血糖危象，診斷通常需要 confirmatory testing。真正臨床價值不只在於「有沒有 diabetes」，還要盡快分清是 type 1、type 2、LADA、MODY、pancreatogenic diabetes、steroid-induced 還是妊娠糖尿病。`),
    table(
      ['診斷方式', '糖尿病門檻', '前糖尿病常見範圍', '重要提醒'],
      [
        ['A1C', '>= 6.5%', '5.7%–6.4%', '貧血、輸血、腎病、血紅素變異會讓 A1C 失真'],
        ['空腹血糖 (FPG)', '>= 126 mg/dL', '100–125 mg/dL', '需禁食至少 8 小時'],
        ['75 g OGTT 2 小時血糖', '>= 200 mg/dL', '140–199 mg/dL', '對早期 dysglycemia 與妊娠糖尿病很敏感'],
        ['隨機血糖', '>= 200 mg/dL 且伴典型症狀或危象', '不作前糖尿病定義', '若症狀與高血糖危象明確，可直接診斷'],
      ],
    ),
    h3('鑑別診斷要問的幾件事'),
    list([
      '年齡很輕、體重不高、症狀來得快、有酮酸中毒或自體免疫病史，要提高對 type 1 diabetes / LADA 的警覺。',
      '家族三代都有年輕發病、不太胖、抗體陰性且 C-peptide 保留，要想到 MODY。',
      '慢性胰臟炎、胰臟手術、囊腫性纖維化或胰臟腫瘤病史時，要想 pancreatogenic diabetes (type 3c)。',
      '近期大量使用類固醇、住院壓力、器官移植後免疫抑制藥，可能是 secondary hyperglycemia 或藥物誘發。'
    ]),
    callout(
      'warning',
      'A1C 不是永遠可靠',
      p(`A1C 是好工具，但不是萬能。缺鐵性貧血、溶血、近期輸血、透析、懷孕、血紅素病與某些族群的紅血球壽命變化，都會讓 A1C 高估或低估真實糖暴露。當數字與病人故事對不起來時，請回頭看血糖曲線、CGM 或 OGTT。`),
    ),
  ),
  section(
    'investigations',
    '關鍵檢查與判讀',
    lead(`糖尿病的檢查可以分成三組：第一組是確立病型與急重程度，第二組是初始併發症基線，第三組是治療後安全性與效果追蹤。門診常犯的錯誤是只追 A1C，卻忘了腎臟、眼底、足部、血脂、肝腎功能與低血糖風險。`),
    table(
      ['檢查', '用途', '判讀要點'],
      [
        ['血糖、A1C、必要時 CGM / SMBG', '確認控制程度與血糖模式', 'A1C 看平均，CGM 看變異度、Time in Range、夜間低血糖'],
        ['血酮 / 尿酮、陰離子間隙、VBG/ABG', '懷疑 DKA 時定位酸中毒', '尿酮不代表全部酮體，β-hydroxybutyrate 更接近實際代謝狀態'],
        ['C-peptide、胰島自體抗體', '分辨分泌儲備與 autoimmune phenotype', '成人新發 diabetes 若臨床不典型，這組檢查很有價值'],
        ['UACR、creatinine、eGFR', '腎臟基線與用藥安全', 'albuminuria 會影響 RAAS 阻斷與 SGLT2i 的價值判斷'],
        ['眼底、足部神經與血管評估', '找 microvascular 與 neuropathy 併發症', '很多病人在沒有主訴時就已有異常'],
        ['Lipid profile、LFT', 'ASCVD 風險與脂肪肝線索', '糖尿病不是只有血糖病，脂質與肝臟風險同時要看'],
      ],
    ),
    spotlight('檢查排序思維', '初診時若病人明顯脫水、意識變化、腹痛或呼吸改變，先走 DKA / HHS 流程；若是穩定門診新發 diabetes，則優先建立病型、腎眼足心血管基線與後續選藥依據。'),
  ),
  section(
    'treatment',
    '第一線與第二線治療',
    lead(`治療糖尿病不是把 A1C 壓到某個單一數字，而是在個別化目標下，同時降低 microvascular、cardiovascular、renal 與低血糖風險。依 ADA 2026，若病人已存在或高風險 ASCVD、心衰竭 (HF) 或慢性腎病 (CKD)，選藥順序不應只由 A1C 決定。對 HF 或 CKD，SGLT2 inhibitor 往往優先；對 ASCVD 或需要顯著減重者，GLP-1 receptor agonist 或 dual GIP/GLP-1 agonist 常更有價值。`),
    p(`Metformin 仍是很多 type 2 diabetes 病人常見的起點，尤其在沒有強烈共病導向時；但它不再是「每個人都一定先上 metformin 然後再想其他」的唯一框架。若病人有 ongoing catabolism、典型高血糖症狀、A1C 很高、血糖明顯飆升，或本來就是 type 1 diabetes，就應直接使用胰島素。type 1 diabetes 的本質是絕對胰島素缺乏，因此所有病人都需要胰島素，不能用口服藥替代。`),
    table(
      ['臨床情境', '優先策略', '常見搭配', '關鍵提醒'],
      [
        ['穩定 type 2 diabetes，無明確共病導向', '生活型態 + metformin 起步，視 A1C 再加藥', 'Metformin + GLP-1 RA 或 SGLT2i', '要同時看體重、低血糖與成本'],
        ['合併 ASCVD / 高風險 ASCVD', '優先考慮有心血管效益的 GLP-1 RA 或 SGLT2i', 'Semaglutide、liraglutide、dulaglutide；empagliflozin 等', '不是只為降糖，而是為了 event reduction'],
        ['合併 HF 或 CKD', '優先考慮 SGLT2i', '必要時再加 GLP-1 RA、metformin 或胰島素', '要看 eGFR、容量狀態與酮酸中毒風險'],
        ['明顯高血糖症狀 / 體重下降 / catabolism', '胰島素', 'Basal-bolus 或矯正後再簡化', '不要因為「病人怕打針」而延後必要治療'],
        ['DKA / HHS', 'IV fluid + insulin + potassium + 誘因控制', '頻繁電解質與血糖監測', '降糖速度、鉀與滲透壓修正都要平衡'],
      ],
    ),
    cards([
      { title: '飲食與運動不是附屬品', body: '醫療營養治療、阻力訓練、有氧運動、睡眠與壓力管理會直接改寫胰島素敏感性與藥物需求。' },
      { title: 'CGM 與 Time in Range', body: '越來越多病人不該只看 A1C。血糖波動、夜間低血糖與餐後尖峰對決策同樣重要。' },
      { title: '心腎保護已是主要戰場', body: '現代降糖藥選擇常先看心臟與腎臟，而不是先看誰降 A1C 最快。' },
      { title: '住院血糖管理', body: 'NPO 病人通常不是把 basal insulin 全停掉，而是依情境調整。只用 sliding scale 而沒有基礎胰島素，常導致反覆高血糖與波動。' },
    ], 'comparison-grid'),
    callout(
      'success',
      '常見高回報組合',
      p(`肥胖、ASCVD 風險高且希望減重的 type 2 diabetes 病人，常能從 GLP-1 RA 或 tirzepatide 獲得血糖與體重雙重效益；合併 CKD 或 HF 的病人，SGLT2 inhibitor 常是影響預後的核心節點。Metformin 則常作為成本效益高的底座，但前提是腎功能與耐受性合適。`),
    ),
  ),
  section(
    'pharmacology',
    '常用藥物機轉、副作用、交互作用',
    lead(`糖尿病藥理學真正要背的不是品牌名，而是每一類藥在整張病理生理地圖中切哪一個節點。這樣你才會知道為什麼某病人該先上 SGLT2i、某病人該用 GLP-1 RA、某病人一開始就該上 insulin。`),
    table(
      ['類別', '代表藥物', '主要機轉', '常見副作用 / 注意點'],
      [
        ['Biguanide', 'Metformin', '降低肝糖輸出、改善胰島素敏感性', 'GI 不適、B12 deficiency；eGFR 過低時不可使用'],
        ['GLP-1 receptor agonist', 'Semaglutide、liraglutide、dulaglutide', '增加 glucose-dependent insulin、減少 glucagon、延緩胃排空、降低食慾', '噁心、嘔吐、膽囊事件；避免與 DPP-4 inhibitor 重複'],
        ['Dual GIP/GLP-1 agonist', 'Tirzepatide', '同時啟動 GIP 與 GLP-1 訊號', 'GI 副作用、減重效果強、起始需慢慢上調'],
        ['SGLT2 inhibitor', 'Empagliflozin、dapagliflozin', '抑制腎近端小管葡萄糖再吸收', '生殖泌尿感染、容量不足、euglycemic DKA 風險'],
        ['Sulfonylurea', 'Glimepiride、gliclazide', '刺激 β 細胞分泌胰島素', '低血糖、體重增加；腎功能差與高齡者要小心'],
        ['TZD', 'Pioglitazone', '改善胰島素敏感性', '水腫、體重增加、骨折風險；心衰病人要慎用'],
        ['Insulin', 'Basal、prandial、premix', '直接補回缺乏的胰島素', '低血糖、體重增加；需要良好教育與 titration'],
      ],
    ),
    formula('Proinsulin 切割式', 'Proinsulin -> Insulin + C-peptide', 'C-peptide 是判斷內源性胰島素分泌儲備的重要線索。外源性 insulin 不會帶來 C-peptide，因此在病型鑑別很有價值。'),
    callout(
      'danger',
      '藥物交互作用與常見誤解',
      p(`Metformin 相關最大地雷常不是神祕交互作用，而是腎功能快速變差、脫水或造影前後沒有重新評估。SGLT2i 最大盲點則是病人脫水、長時間禁食或 perioperative 情境下的 euglycemic DKA。GLP-1 RA 最大誤區則是把胃口差與嚴重 GI 不適混為一談，沒有做劑量上調衛教。`),
    ),
  ),
  section(
    'special-populations',
    '特殊族群考量',
    lead(`糖尿病在不同族群的治療目標、監測方式與風險排序差很多。孕婦、小兒 type 1 diabetes、老年人、CKD 病人與住院重症病人，不能直接套同一張 outpatient A1C 表。`),
    cards([
      { title: '妊娠與妊娠糖尿病', body: '控制目標更嚴格，藥物安全性要重新排序。很多情境仍以 insulin 為核心，並要同步注意胎兒成長與產科風險。' },
      { title: '老年病人', body: '低血糖、跌倒、認知、食慾、腎功能與多重用藥常比單純追求漂亮 A1C 更重要。過度治療與過度複雜化是高頻問題。' },
      { title: 'CKD', body: '用藥會因 eGFR 改變，albuminuria 會改變心腎保護藥物的排序。腎病病人對低血糖更敏感，也更容易累積藥物暴露。' },
      { title: '住院與圍手術期', body: '禁食、感染、類固醇、輸液與腎功能波動都會改變血糖。SGLT2i 常需術前停藥以降低 euglycemic DKA 風險。' },
    ]),
  ),
  section(
    'clinical-pitfalls',
    '常見臨床陷阱',
    lead(`糖尿病最常見的錯誤，通常不是不知道藥名，而是把病人錯分類、把目標設錯，或只盯著糖化血色素而忽略器官風險。`),
    misconceptionList([
      { myth: '病人只要肯節食，就不需要藥。', correction: '生活型態是基底，但當病人已有 β 細胞耗損、心腎共病或嚴重高血糖時，延後藥物治療是在延後器官保護。' },
      { myth: 'A1C 好看就代表控制好。', correction: '反覆低血糖、巨大波動、夜間低血糖、腎功能惡化與 Time in Range 很差，都可能藏在看似不錯的 A1C 背後。' },
      { myth: '胰島素是失敗才用的最後一步。', correction: '對 type 1 diabetes、catabolic state、DKA/HHS、妊娠特定情境與某些明顯高血糖病人來說，胰島素是最符合生理、最應及時使用的藥。' },
    ]),
  ),
  section(
    'case-discussion',
    'Case-based discussion',
    lead(`病例：61 歲男性，BMI 33，有高血壓與冠心病病史，最近因口渴、夜尿與體重減少就醫。檢查顯示 A1C 11.2%、FPG 248 mg/dL、UACR 升高、eGFR 62 mL/min/1.73 m²，沒有酮酸中毒。`),
    table(
      ['問題', '思考方向'],
      [
        ['先分類還是先治療？', '兩者同時進行。先確認有無 catabolic symptoms、酮酸中毒與脫水，並在同一時間建立 type 2 diabetes + ASCVD + CKD risk 的治療地圖。'],
        ['第一線用藥怎麼排？', '若臨床穩定，可考慮 metformin 作為底座，同時依心腎風險加入 SGLT2 inhibitor，若體重與 ASCVD 控制也重要，再評估 GLP-1 RA / tirzepatide。'],
        ['需要胰島素嗎？', '若症狀明顯、血糖非常高、A1C 明顯偏高或口服 / 注射非胰島素藥難以快速控制，可先以 basal insulin 介入，再依後續反應簡化。'],
      ],
    ),
    callout(
      'clinical',
      '案例整合',
      p(`這位病人的治療不該只回答「A1C 太高要用幾種藥」，而是要同時回答三件事：如何安全降糖、如何降低心血管與腎臟事件、以及如何讓病人實際做得到。這正是現代糖尿病治療和舊式單純 glucose-centric 思維最大的差別。`),
    ),
  ),
  references('章內來源註記', endocrineSources.ch22),
);

endocrineChapters.ch23 = chapter(
  '甲狀腺疾病 (Thyroid Disorders)',
  section(
    'anatomy-physiology',
    '正常解剖與生理',
    lead(`甲狀腺 (Thyroid gland) 位於頸部前方，外觀看似小，但在代謝速度、心血管反應、腸胃蠕動、骨代謝、精神狀態與生殖軸上都有深遠影響。正常生理下，下視丘分泌 TRH (Thyrotropin-releasing hormone)，刺激垂體前葉分泌 TSH (Thyroid-stimulating hormone)；TSH 再促進甲狀腺攝碘、碘有機化 (Organification)、thyroglobulin 合成與 T4 / T3 釋放。`),
    p(`T4 (Thyroxine) 是主要分泌型，周邊組織透過 deiodinase 把它轉為較活躍的 T3 (Triiodothyronine)。因此臨床上看到甲狀腺疾病時，不只是看「甲狀腺有沒有腫」，而是要把 HPT axis、周邊轉換、抗體、血流、碘暴露與器官反應一起放進腦中。TSH 對變化最敏感，但在中樞性甲狀腺低下、重症非甲狀腺疾病 (NTIS) 或藥物干擾時，TSH 並不總是可靠的唯一答案。`),
    tags(['HPT axis', 'TSH', 'T4 / T3', 'Deiodinase', 'Thyroid autoantibody']),
    endocrineViewer('thyroid-axis'),
    diagram('endocrine-thyroid-map'),
    cards([
      { title: 'TSH', body: '是臨床最常用的篩檢起點，但它反映的是垂體對甲狀腺荷爾蒙的感受，不是甲狀腺單獨的主觀表態。' },
      { title: 'T4 與 T3', body: 'T4 是穩定供應庫，T3 是高活性執行端。某些病人 free T3 變化會比 free T4 更貼近症狀，但解讀必須小心重症干擾。' },
      { title: '自體抗體', body: 'TPOAb、TgAb 與 TRAb 可以幫助分辨 Hashimoto、Graves 與部分免疫背景，但抗體存在不等於一定立刻出現臨床失衡。' },
      { title: '碘與藥物', body: '甲狀腺是高度依賴碘處理的器官，因此 amiodarone、碘造影、鋰鹽與保健品都可能重寫其表現。' },
    ]),
    formula('Levothyroxine 分子式', 'C15H11I4NO4', 'Levothyroxine 是合成 T4，也是甲狀腺低下最常用的替代治療。它不是單純補充能量，而是替代缺乏的荷爾蒙儲備。'),
    summary('生理總結', '甲狀腺疾病的核心是軸線、轉換與組織反應，而不是只看脖子有沒有腫。', [
      'TSH 是高敏感起點，但非萬能。',
      'T4 是主要分泌庫存，T3 是主要活性執行端。',
      '自體免疫、碘暴露與藥物是高頻干擾因子。',
    ]),
  ),
  section(
    'symptoms',
    '常見主訴與症狀',
    lead(`甲狀腺疾病的主訴常跨系統出現。甲狀腺低下常見怕冷、疲倦、體重增加、便秘、聲音變低、月經改變、浮腫、憂鬱、心跳慢與肌肉痠痛；甲狀腺亢進則常見怕熱、心悸、手抖、焦躁、失眠、腹瀉、食慾增加卻體重下降、月經變少、近端肌無力與骨流失。真正臨床上困難的是，這些症狀大多不專一。`),
    p(`此外，thyrotoxicosis 並不等於 Graves disease。亞急性甲狀腺炎、無痛性甲狀腺炎、毒性結節、多結節甲狀腺腫與外源性 thyroid hormone 過量都可能讓病人呈現類似高代謝狀態。相反地，中央型甲狀腺低下病人可能 free T4 很低，但 TSH 沒有如預期升高，因此只看 TSH 很容易漏診。`),
    table(
      ['臨床情境', '常見主訴', '臨床意義', '要注意什麼'],
      [
        ['典型甲低', '疲倦、怕冷、便秘、體重增加', '常見於 Hashimoto 或甲狀腺切除後', '老年人可能只表現為虛弱與認知變化'],
        ['典型甲亢', '心悸、怕熱、手抖、體重下降', 'Graves、毒性結節、甲狀腺炎都可造成', '先分是合成增加還是破壞性釋放'],
        ['Graves 眼病', '眼乾、畏光、複視、眼球突出', '眼病可以與甲狀腺數值不同步', '治療不只看 TSH，要看眼部活動度與吸菸狀態'],
        ['壓迫 / 結節', '吞嚥卡、聲音沙啞、頸部腫塊', '大型甲狀腺腫或結節需想結構性問題', '不等於一定有荷爾蒙異常'],
      ],
    ),
    callout(
      'clinical',
      '真實場景',
      p(`34 歲女性因心悸與焦慮到急診，最近體重掉了 5 公斤，月經量變少，手會抖。若只當作 panic attack 或單純心律不整，很容易漏掉甲狀腺亢進。反過來說，若只看到低 TSH 就直接開抗甲狀腺藥，也可能把實際上是甲狀腺炎的病人治錯方向。`),
    ),
    takeawayList([
      { title: '症狀很像別科病', body: '甲狀腺低下像憂鬱、心衰、睡眠不足；甲狀腺亢進像焦慮、心律不整、更年期或消化道病。' },
      { title: '眼病是額外戰場', body: 'Graves eye disease 和單純血中 T4 / T3 並不完全同步，不能只靠抽血決定嚴重度。' },
      { title: '結構症狀另有路徑', body: '吞嚥困難、聲音沙啞與頸部壓迫感代表要做結構性評估，而不是只加重荷爾蒙治療。' },
    ]),
  ),
  section(
    'pathophysiology',
    '重要疾病機轉',
    lead(`Graves disease 的核心是 TRAb (TSH receptor antibody) 持續刺激受體，讓甲狀腺像收到不會停的 TSH 訊號，因此造成荷爾蒙合成增加、血流增加與腺體增生。Hashimoto thyroiditis 則是以慢性自體免疫破壞為主，常見 TPOAb 與 TgAb，初期有時會短暫釋出荷爾蒙造成 hashitoxicosis，後期則進入甲狀腺功能低下。`),
    p(`甲狀腺炎與 Graves 最大的機轉差異是：前者偏向「庫存外漏」，後者偏向「新合成增加」。這會直接影響檢查與治療，因為甲狀腺炎對抗甲狀腺藥反應有限，症狀控制通常以 β-blocker 與發炎止痛為主。毒性結節或多結節性甲狀腺腫則是局部結節自主分泌。更高危的極端型態包括甲狀腺風暴與黏液性昏迷，兩者都是系統性代謝失衡，而不只是數值極端化。`),
    cards([
      { title: 'Graves disease', body: 'TRAb 持續刺激造成荷爾蒙合成上升、腺體增生與高血流，並可能伴隨眼眶與皮膚自體免疫表現。' },
      { title: 'Hashimoto thyroiditis', body: '慢性自體免疫破壞讓甲狀腺逐步失去功能。病人一開始可能只有 TSH 輕升，數年後才出現典型甲低。' },
      { title: 'Thyroiditis', body: '亞急性甲狀腺炎常疼痛、發炎指數高；無痛性 / 產後甲狀腺炎常是免疫波動。治療重點與 Graves 不同。' },
      { title: '藥物與碘誘發', body: 'Amiodarone、鋰鹽、免疫治療與高碘暴露可造成 hypo 或 hyperthyroidism，病史常比實驗室更早揭露答案。' },
    ], 'comparison-grid'),
    misconceptionList([
      { myth: 'TSH 低就等於 Graves disease。', correction: '低 TSH 只代表軸線被抑制，病因可能是 Graves、thyroiditis、毒性結節、外源性荷爾蒙或重症狀態。' },
      { myth: '甲狀腺炎和甲亢治法一樣。', correction: '甲狀腺炎常是荷爾蒙外漏，不是合成過多。若只機械式使用 thionamide，效果常不好，還會讓真正的機轉被忽略。' },
    ]),
  ),
  section(
    'diagnosis',
    '診斷思路與鑑別診斷',
    lead(`甲狀腺診斷的起點通常是 TSH，但真正的決策是把 TSH、free T4、必要時 free T3、抗體、病史、藥物、觸診與影像整合。若 TSH 高、free T4 低，多半是原發性甲低；若 TSH 低、free T4 / T3 高，多半是 thyrotoxicosis；若 free T4 低但 TSH 不高，則要想到中央型問題。`),
    table(
      ['步驟', '要回答的問題', '常用工具', '常見陷阱'],
      [
        ['先定位軸線', 'TSH 是高還是低，free T4 / T3 怎麼對應', 'TSH、free T4、free T3', '只看 TSH 漏掉 central hypothyroidism'],
        ['再找病因', '是 Graves、thyroiditis、結節、藥物還是術後', 'TRAb、TPOAb、病史、甲狀腺掃描視情況', '把所有 thyrotoxicosis 都當成 Graves'],
        ['看結構風險', '有沒有結節、壓迫或惡性疑慮', '超音波、FNA 視節點而定', '抽血正常就忽略結構問題'],
        ['看危急程度', '有沒有 thyroid storm、myxedema coma、心房顫動或妊娠風險', '生命徵象、神經心血管評估', '只顧著微調 levothyroxine 忽略急症'],
      ],
    ),
    list([
      '若是 thyrotoxicosis，TRAb 或 radioactive iodine uptake / thyroid scan 有助區分合成增加和破壞性釋放。',
      '生物素 (Biotin) 可干擾某些免疫分析，造成 TSH / T4 判讀錯誤，問保健品很重要。',
      '甲狀腺結節的超音波風險分層與 FNA 指徵，是另一條和荷爾蒙平行但不同的診斷路線。',
    ]),
    callout(
      'warning',
      '一個數字不能替代臨床情境',
      p(`重症病人可能出現 non-thyroidal illness pattern；產後婦女可能是 thyroiditis；使用 amiodarone 的病人可能同時有碘效應與本來的腺體疾病。診斷思路若只靠 TSH 一個數字，最容易掉進過度治療與錯誤歸因。`),
    ),
  ),
  section(
    'investigations',
    '關鍵檢查與判讀',
    lead(`甲狀腺檢查的核心價值，在於判斷「是哪一條軸線出錯」與「病因是哪一種」。抽血是起點，但不是全部。結構性病灶、眼病與危重症風險都需要額外評估。`),
    table(
      ['檢查', '用途', '判讀重點'],
      [
        ['TSH、free T4、free T3', '軸線定位與嚴重度', 'TSH 敏感，free T4 / T3 決定功能狀態與臨床相關性'],
        ['TRAb、TPOAb、TgAb', '自體免疫病因判斷', 'TRAb 對 Graves 很有價值；TPOAb 常見於 Hashimoto 背景'],
        ['甲狀腺超音波', '看結節、血流、腺體質地與壓迫風險', '超音波不是拿來診斷所有甲狀腺功能異常，但對結構問題很重要'],
        ['放射碘攝取 / 掃描', '區分 Graves / toxic nodule / thyroiditis', 'thyroiditis 常低攝取；Graves 常 diffuse uptake 增高'],
        ['CBC、LFT、ECG', '治療前基線與併發症', 'thionamide、心房顫動與高代謝狀態都會讓這些檢查變重要'],
      ],
    ),
    spotlight('檢查排序思維', '甲狀腺功能異常先抽血定位；懷疑 Graves 或 thyrotoxicosis 病因不清時再補抗體或核醫；有結節或壓迫症狀時走結構評估路線；危急病人則先救命再補完整病因學。'),
  ),
  section(
    'treatment',
    '第一線與第二線治療',
    lead(`甲狀腺低下最核心的治療是 levothyroxine 替代，並依病人的年齡、體重、心血管狀態與病因調整起始劑量。年輕健康者可較接近 full replacement；老年人或冠心病病人則需低劑量慢慢上調。反之，thyrotoxicosis 的治療要先分病因，再決定 thionamide、β-blocker、radioactive iodine (RAI) 或手術。`),
    table(
      ['情境', '第一線策略', '常見配合', '關鍵提醒'],
      [
        ['原發性甲低', 'Levothyroxine', '空腹固定時間服用，與鐵鈣分開', '老年 / CAD 病人低劑量起步'],
        ['Graves hyperthyroidism', 'Methimazole + symptomatic control', 'β-blocker、必要時評估 RAI 或手術', '孕早期與 thyroid storm 才較常優先 PTU'],
        ['Thyroiditis', '症狀控制與發炎控制', 'β-blocker、NSAID 或 steroid 視情況', '抗甲狀腺藥通常不是主軸'],
        ['Thyroid storm', 'β-blockade、thionamide、iodine、steroid、支持療法', '先給 thionamide，再補 iodine', '處置順序比背藥名更重要'],
        ['Myxedema coma', 'IV levothyroxine + stress-dose steroid + supportive care', '保溫、低血鈉 / 低血糖修正', '死亡率高，不能只當作單純甲低加重'],
      ],
    ),
    cards([
      { title: 'Levothyroxine 的核心', body: '重點是穩定吸收與規律服用，而不是追求某個即時感受。鐵劑、鈣片、膽酸螯合劑與部分食物會影響吸收。' },
      { title: 'Methimazole vs PTU', body: 'Methimazole 通常因安全性與便利性較佳而優先；PTU 主要保留給孕早期、甲狀腺風暴或特定情境。' },
      { title: 'RAI 與手術', body: '適合 definitive therapy，但要看妊娠、眼病、結節體積、病人偏好與是否需要快速控制。' },
      { title: '症狀控制不能忘', body: '甲亢病人很多不舒服其實先來自交感驅動，適當 β-blocker 常能立刻改善心悸與手抖。' },
    ], 'comparison-grid'),
    callout(
      'success',
      '常見高回報動作',
      p(`很多所謂 levothyroxine 調不好，其實是服藥時間與吸收被鐵鈣、保健品與不固定作息打亂。很多所謂甲亢「藥沒效」，則是病因根本不是 Graves 或病人其實已經接近 definitive therapy 的評估門檻。`),
    ),
  ),
  section(
    'pharmacology',
    '常用藥物機轉、副作用、交互作用',
    lead(`甲狀腺藥理最重要的不是藥單長度，而是「這個藥是補回缺乏、抑制合成、阻斷釋放、還是先控制症狀」。這四件事混在一起，是造成很多臨床誤解的來源。`),
    table(
      ['類別', '代表藥物', '主要機轉', '重要副作用 / 交互作用'],
      [
        ['Thyroid hormone replacement', 'Levothyroxine', '補回 T4，依周邊需要轉成 T3', '吸收受鐵、鈣、PPIs、膽酸螯合劑與食物影響'],
        ['Thionamide', 'Methimazole、PTU', '抑制 thyroid peroxidase；PTU 額外抑制周邊 T4 -> T3', '顆粒性白血球缺乏、肝毒性、皮疹'],
        ['β-blocker', 'Propranolol、atenolol', '控制交感症狀；propranolol 高劑量可減少 T4 -> T3', '氣喘、心衰與心跳過慢病人要小心'],
        ['Iodine', 'SSKI、Lugol solution', '急性抑制甲狀腺荷爾蒙釋放', '給藥時序重要，常用於 thyroid storm 或術前'],
        ['Glucocorticoid', 'Hydrocortisone、dexamethasone', '降低 T4 -> T3 並處理危急免疫 / 腎上腺共病風險', '長期使用會反向帶來內分泌副作用'],
      ],
    ),
    formula('T4 -> T3 周邊轉換概念', 'Thyroxine (T4) --deiodinase--> Triiodothyronine (T3)', '這條轉換解釋了為什麼多數甲低病人只補 T4 就足夠，也解釋了為什麼重症、藥物與肝腎狀態會改變臨床表現。'),
    callout(
      'danger',
      '常見交互作用',
      p(`Levothyroxine 最常見的實務地雷是吸收問題，而不是藥物本身失效。鐵、鈣、鋁鎂制酸劑、膽酸螯合劑與某些高纖飲食都會干擾吸收。Methimazole / PTU 最大警訊則是發燒、喉嚨痛與肝功能異常，一定要在衛教時說清楚。`),
    ),
  ),
  section(
    'special-populations',
    '特殊族群考量',
    lead(`妊娠、老年人、冠心病病人與服用 amiodarone / lithium 的族群，是甲狀腺照護最需要重新排序的幾群人。妊娠期甲狀腺需求上升，未控制的 hypo 或 hyperthyroidism 都會增加母胎風險；老年人與 CAD 病人則更容易因替代過快引發心律不整或缺血。`),
    cards([
      { title: '妊娠', body: '孕早期甲亢常以 PTU 優先；甲低病人常需提高 levothyroxine 劑量並更密切追蹤。' },
      { title: '老年與 CAD', body: '低劑量起步、慢速調整比快速拉回標準數字更安全。心房顫動與骨流失風險也更高。' },
      { title: '產後', body: '產後甲狀腺炎常被誤當情緒或疲勞問題，實際上可能先甲亢再甲低。' },
      { title: '藥物干擾族群', body: 'Amiodarone、lithium、免疫治療與大量生物素補充都會讓診斷與治療複雜化。' },
    ]),
  ),
  section(
    'clinical-pitfalls',
    '常見臨床陷阱',
    lead(`甲狀腺疾病很容易因為數值看起來簡單，而在實務上被過度簡化。最常見的陷阱是沒有先分清病因，就直接照著 TSH 一路加藥或減藥。`),
    misconceptionList([
      { myth: 'TSH 正常就代表甲狀腺一定沒問題。', correction: '中央型甲低、重症、藥物干擾與部分早期病程都可能讓 TSH 看起來不典型。' },
      { myth: '甲亢就是直接開抗甲狀腺藥。', correction: '若病人是 thyroiditis，症狀控制與發炎治療常比 thionamide 更合理。先分是合成增加還是破壞性釋放。' },
      { myth: '天然乾燥甲狀腺素比較自然、一定更好。', correction: 'ATA 的病人資訊明確提醒，動物來源 extract 的 T4/T3 比例與人類不同、批次穩定性差，且孕期不適合。' },
    ]),
  ),
  section(
    'case-discussion',
    'Case-based discussion',
    lead(`病例：29 歲女性，近兩個月心悸、手抖、怕熱、月經量變少，體重下降 4 公斤。TSH <0.01 mIU/L、free T4 升高，頸部可摸到瀰漫性腫大。她還抱怨眼睛乾澀與看東西比較吃力。`),
    table(
      ['臨床問題', '思考方向'],
      [
        ['這是 Graves 還是 thyroiditis？', '瀰漫性腫大、典型高代謝症狀與眼部線索讓 Graves 機率高，可進一步用 TRAb 與必要時的 uptake 協助確認。'],
        ['治療先做什麼？', '先控制心悸與震顫，可用 β-blocker；再依病因與未來生育計畫討論 methimazole、RAI 或手術。'],
        ['眼部抱怨有什麼意義？', '這代表不能只看抽血。Graves eye disease 會改變治療排序，也要衛教戒菸與眼科共照。'],
      ],
    ),
    callout(
      'clinical',
      '案例整合',
      p(`這類病人最怕被拆成很多碎片：心悸去心臟科、焦躁去身心科、眼睛乾去眼科、月經亂去婦科，最後沒有人把 HPT axis 放回原點。甲狀腺疾病的診斷價值，很大一部分來自把跨系統表現重新串起來。`),
    ),
  ),
  references('章內來源註記', endocrineSources.ch23),
);

endocrineChapters.ch24 = chapter(
  '腎上腺與垂體疾病',
  section(
    'anatomy-physiology',
    '正常解剖與生理',
    lead(`腎上腺與垂體疾病的難度，在於它不是單一器官病，而是多條內分泌軸線彼此交錯。垂體前葉分泌 ACTH、TSH、LH、FSH、GH、Prolactin；後葉則牽涉 ADH 與 oxytocin 的釋放。腎上腺則分為皮質與髓質，皮質又分球狀帶 (Zona glomerulosa)、束狀帶 (Zona fasciculata)、網狀帶 (Zona reticularis)，分別以 aldosterone、cortisol、androgen 為主；髓質則製造 catecholamines。`),
    p(`因此當病人出現難治高血壓、低鉀、色素沉著、低血鈉、中心性肥胖、紫紋、頭痛盜汗、月經亂、乳漏、視野缺損或手腳變大時，你真正要做的是問：哪一條軸線過多？哪一條軸線不足？這是 primary gland failure、pituitary problem、ectopic secretion，還是長期外源性 steroid 造成的回饋崩壞？`),
    tags(['CRH-ACTH-cortisol', 'Aldosterone', 'Catecholamine', 'Prolactin', 'IGF-1']),
    endocrineViewer('pituitary-adrenal-axis'),
    diagram('endocrine-hpa-map'),
    cards([
      { title: 'Cortisol 軸', body: 'CRH -> ACTH -> cortisol 形成壓力適應回路。cortisol 不只影響血糖，也影響血壓、免疫、精神狀態與血管反應。' },
      { title: 'Aldosterone 軸', body: 'aldosterone 的主調節是 renin-angiotensin 與 K+，不是 ACTH。臨床上低鉀與難治高血壓是重要入口。' },
      { title: 'Catecholamine', body: '腎上腺髓質分泌 epinephrine / norepinephrine，當 pheochromocytoma 出現時，症狀常是陣發性又戲劇化。' },
      { title: '垂體作為總控台', body: 'prolactinoma、acromegaly、ACTH adenoma 與 pituitary macroadenoma 都可能以荷爾蒙與壓迫兩條路徑一起出現。' },
    ]),
    formula('Hydrocortisone 分子式', 'C21H30O5', 'Hydrocortisone 既是生理 cortisol 的藥物形式，也是 adrenal crisis 急救的核心藥物。對疑似 adrenal crisis，給藥順序往往比追完整診斷更重要。'),
    summary('生理總結', '這一章的重點不是背更多病名，而是學會把症狀放回哪一條內分泌軸線失衡。', [
      'ACTH 與 cortisol 關係是定位 primary vs secondary adrenal insufficiency 的核心。',
      'Aldosterone 與 catecholamine 都會表現成高血壓，但訊號來源不同。',
      '垂體病變既可能造成過多，也可能因壓迫造成多條軸線不足。',
    ]),
  ),
  section(
    'symptoms',
    '常見主訴與症狀',
    lead(`腎上腺與垂體疾病最棘手的地方，是症狀跨越心血管、代謝、皮膚、電解質、神經與生殖系統，而且很多一開始都像常見病。原發性腎上腺功能不全 (Primary adrenal insufficiency) 可能只是疲倦、噁心、體重下降、低血壓與鹽分渴求；Cushing syndrome 可能像難減的肥胖、高血壓與糖尿病；pheochromocytoma 則可能以陣發性頭痛、心悸、盜汗與血壓波動出現。`),
    table(
      ['疾病 / 軸線', '常見主訴', '關鍵線索', '危急程度'],
      [
        ['Primary adrenal insufficiency', '疲倦、噁心、低血壓、體重下降', '色素沉著、低鈉高鉀、長期自體免疫背景', 'adrenal crisis 時是急症'],
        ['Cushing syndrome', '變胖、瘀青、肌無力、情緒變化、高血糖', '紫紋、近端肌無力、難治高血壓與骨折', '長期風險高，急性不一定戲劇化'],
        ['Primary aldosteronism', '高血壓、肌無力、抽筋', '低鉀、代謝性鹼中毒、多藥難控', '若嚴重低鉀或心律問題需加速處理'],
        ['Pheochromocytoma', '頭痛、盜汗、心悸、焦慮樣發作', '陣發性血壓飆高、體位性變化、遺傳背景', '急性發作與術前管理都高風險'],
        ['Prolactinoma / pituitary mass', '月經亂、乳漏、性慾下降、頭痛', '視野改變、bitemporal hemianopia、低 gonadal hormone', 'macroadenoma 壓迫時需加速評估'],
        ['Acromegaly', '手腳變大、戒指鞋子變緊、打鼾、頭痛', 'IGF-1 上升、顏面改變、OSA、糖代謝異常', '非急症，但延誤會累積心血管風險'],
      ],
    ),
    callout(
      'clinical',
      '真實場景',
      p(`42 歲女性，半年內血壓越來越高，補鉀也補不回來，最近還覺得肌肉容易沒力。若只把她當作一般 essential hypertension 加更多藥，很容易錯過 primary aldosteronism。另一位病人可能三次因「恐慌發作」跑急診，實際上是 pheochromocytoma 的陣發性 catecholamine surge。`),
    ),
    takeawayList([
      { title: '很多表現像常見病', body: '疲倦像憂鬱，頭痛心悸像焦慮，高血壓像一般慢性病，肥胖像生活習慣問題，所以更需要主動找紅旗。' },
      { title: '電解質是高價值線索', body: '低鈉、高鉀、低鉀、代謝性鹼中毒、尿量改變常直接指向腎上腺或垂體軸線。' },
      { title: '急症一定要先救命', body: 'adrenal crisis、pituitary apoplexy、pheochromocytoma hypertensive crisis 不能等完整內分泌 workup 才處理。' },
    ]),
  ),
  section(
    'pathophysiology',
    '重要疾病機轉',
    lead(`Primary adrenal insufficiency 常見於自體免疫性 Addison disease，病理上是腎上腺皮質被破壞，導致 cortisol 與 aldosterone 同時不足，因此病人除了疲倦與低血壓，還常出現低鈉、高鉀與色素沉著。Secondary adrenal insufficiency 則多來自 pituitary / hypothalamic 病變或長期外源性 steroid 抑制 HPA axis，這類病人的 aldosterone 通常保留，因此高鉀不如 primary 明顯。`),
    p(`Cushing syndrome 則是 cortisol 長期過量。來源可能是 pituitary ACTH adenoma、ectopic ACTH、adrenal adenoma / carcinoma 或外源性 steroid。Primary aldosteronism 是 aldosterone autonomous secretion，造成容量擴張、renin suppressed、鉀流失與血管纖維化。Pheochromocytoma 則是 catecholamine-producing tumor，讓血壓、心率、代謝與血管收縮在短時間內大幅波動。垂體疾病中，prolactinoma 最常見；GH 過多造成 acromegaly；大型腫瘤還可能壓迫 optic chiasm 或正常垂體，形成複合型 hormone deficiency。`),
    diagram('endocrine-hpa-map'),
    cards([
      { title: 'Adrenal crisis', body: '真正的危險不是抽象的 cortisol 低，而是病人失去維持血壓、血糖、血管反應與壓力適應的能力，因此感染、手術或脫水時會快速崩解。' },
      { title: 'Primary aldosteronism', body: '不只是高血壓病因，還會帶來比同等血壓更高的心房顫動、腦中風與腎損傷風險。' },
      { title: 'Pheochromocytoma', body: '症狀會陣發，是因為 catecholamine release 不是穩定背景值，而是突然衝上來。這也解釋了為什麼病人常被誤解成 panic disorder。' },
      { title: 'Pituitary adenoma', body: '同一顆腫瘤可能同時帶來 hormone excess 與 mass effect。荷爾蒙問題和壓迫問題必須雙軌思考。' },
    ], 'comparison-grid'),
    misconceptionList([
      { myth: '所有腎上腺功能不全都會高鉀。', correction: '高鉀比較支持 primary adrenal insufficiency。若是 secondary / tertiary adrenal insufficiency，aldosterone 常保留，因此高鉀未必明顯。' },
      { myth: '嗜鉻細胞瘤一定是持續高血壓。', correction: '很多病人是陣發性血壓飆高、頭痛、盜汗與心悸。若只看單次門診血壓，很容易漏掉。' },
    ]),
  ),
  section(
    'diagnosis',
    '診斷思路與鑑別診斷',
    lead(`這一章的診斷不是一口氣把所有荷爾蒙都抽一輪，而是先問哪一條軸線最像有問題，再用最有訊息密度的檢查定位。碰到低血壓、低鈉、嘔吐與感染後崩解，要先想 adrenal crisis；碰到難治高血壓合併低鉀，要先想 primary aldosteronism；碰到陣發性頭痛盜汗心悸與劇烈血壓波動，要先想 pheochromocytoma。`),
    table(
      ['臨床入口', '先問什麼', '常用第一步', '常見誤區'],
      [
        ['懷疑 adrenal insufficiency', '病人現在穩不穩？是否需要先救命', '8 AM cortisol + ACTH；不穩先給 hydrocortisone 再抽血', '為了等 cosyntropin test 而延誤治療'],
        ['懷疑 Cushing syndrome', '是不是真的高機率，而不是單純肥胖', '1 mg overnight dex suppression、late-night salivary cortisol、24h UFC', '看到 obesity 就過度篩檢，或只做單一異常便定論'],
        ['懷疑 primary aldosteronism', '有沒有低鉀、早發、中風史、多藥難治', 'Aldosterone-renin ratio', '在藥物、姿勢與鉀未校正下直接判讀 ARR'],
        ['懷疑 pheochromocytoma', '有沒有陣發性 triad 與腎上腺 incidentaloma', 'Plasma free metanephrines 或 24h urinary fractionated metanephrines', '先做侵入性處置或未先 α-blockade'],
        ['懷疑 pituitary tumor', '是 hormone excess 還是 mass effect', 'Prolactin、IGF-1、其餘 pituitary axis + MRI', '只看 MRI 沒看 hormone phenotype，或只看 prolactin 沒排 stalk effect'],
      ],
    ),
    list([
      '中央型甲低、次級腎上腺功能不全與 gonadal failure 常可在 pituitary macroadenoma 同時出現。',
      '當 prolactin 很高時要先排 macroprolactin 與藥物；當 prolactin 只有輕中度升高且腫瘤很大，要想到 stalk effect。',
      '若懷疑 pheochromocytoma，在沒有排除前不要任意做腎上腺穿刺。'
    ]),
    callout(
      'warning',
      '順序比檢查量更重要',
      p(`內分泌診斷常出錯在順序。最經典的錯誤包括：懷疑 adrenal crisis 卻為了等 test 延誤 steroid、懷疑 pheochromocytoma 卻先上 β-blocker、疑似 panhypopituitarism 卻先補甲狀腺素而沒有先補 steroid。`),
    ),
  ),
  section(
    'investigations',
    '關鍵檢查與判讀',
    lead(`內分泌檢查多半不是一次抽血就結束，而是和時間點、姿勢、藥物、飲食、壓力狀態高度相關。這也就是為什麼內分泌數值必須搭配前測條件一起判讀。`),
    table(
      ['檢查', '用途', '判讀要點'],
      [
        ['8 AM cortisol、ACTH、cosyntropin test', '評估 adrenal insufficiency', '不穩病人先治療；primary 通常 ACTH 高，secondary 可能 ACTH 低或不適當正常'],
        ['1 mg dex suppression、late-night salivary cortisol、24h UFC', 'Cushing syndrome 篩檢', '至少選合適工具並注意 shift work、酒精、depression、OSA 等偽陽性'],
        ['Aldosterone-renin ratio', '篩 primary aldosteronism', '補正低鉀、注意藥物與抽血姿勢，陽性後常需 confirmatory testing'],
        ['Adrenal CT、adrenal venous sampling', '定位 primary aldosteronism 的側別', 'AVS 對決定手術對象常比 CT 更可靠，尤其年長者偶發結節多'],
        ['Plasma free metanephrines / urine metanephrines', '篩 pheochromocytoma', '高敏感度，但需注意壓力、姿勢與藥物影響'],
        ['Prolactin、IGF-1、pituitary MRI、視野檢查', '評估垂體腫瘤與 acromegaly', 'IGF-1 是 acromegaly 篩檢起點；macroadenoma 要補視野與其餘軸線'],
        ['Serum / urine osmolality、Na、water deprivation / DDAVP response', '評估 diabetes insipidus', 'polyuria 必須先確認是真正大量稀尿，而不是頻尿或高血糖滲透性利尿'],
      ],
    ),
    spotlight('檢查的關鍵不是越多越好', '很多內分泌數值之所以難，是因為前測條件比檢查本身更重要。沒有把姿勢、時間、藥物、睡眠、酒精與重症狀態記進去，再精密的檢驗也容易被誤用。'),
  ),
  section(
    'treatment',
    '第一線與第二線治療',
    lead(`腎上腺與垂體疾病的治療邏輯通常先分成兩個問題：現在有沒有生命危險？之後要怎麼做 definitive therapy。對 adrenal crisis，答案很明確：先給 isotonic fluid、hydrocortisone、修正低血糖與電解質，再找感染或其他觸發因子。對 primary aldosteronism，若單側病灶證實且適合手術，可考慮 adrenalectomy；雙側或不手術者則以 mineralocorticoid receptor antagonist 為主。`),
    table(
      ['情境', '第一線策略', '常見配合', '關鍵提醒'],
      [
        ['Adrenal crisis', 'IV hydrocortisone + isotonic saline ± dextrose', '抽血後立刻治療，不等正式報告', '疑似就先給，延遲比過度更危險'],
        ['Primary adrenal insufficiency', 'Hydrocortisone replacement ± fludrocortisone', '病人教育、sick day rule、醫療警示卡', '不可突然停藥'],
        ['Cushing syndrome', '找來源並處理原發病灶', 'transsphenoidal surgery、adrenal surgery、必要時 steroidogenesis inhibitor', '治療後可能暫時反而需要 steroid replacement'],
        ['Primary aldosteronism', '手術或 MRA', 'Spironolactone、eplerenone', '低鉀校正與血壓事件風險同步追蹤'],
        ['Pheochromocytoma', '先 α-blockade 再手術', 'Phenoxybenzamine 或 doxazosin，必要時後續再加 β-blocker', '絕對不能先 β 後 α'],
        ['Prolactinoma', 'Cabergoline', 'MRI / prolactin 追蹤；大型壓迫才考慮手術', '很多病人對 dopamine agonist 反應很好'],
        ['Acromegaly', '手術為主，必要時藥物輔助', 'Somatostatin analog、pegvisomant、cabergoline', 'IGF-1 是追蹤核心'],
        ['Central DI', 'Desmopressin + 水分與 Na 監測', '找 pituitary / hypothalamic 病因', '治療過頭會變低鈉'],
      ],
    ),
    cards([
      { title: 'Sick day rule', body: '慢性 adrenal insufficiency 病人遇到感染、嘔吐、手術、創傷時，類固醇需要暫時加量。這不是加分題，而是避免 adrenal crisis 的核心教育。' },
      { title: 'Pheo 術前準備', body: '先 α-blockade、補足容量，再視需要加 β-blocker。順序錯誤可能把未被阻斷的 α 受體推向更強烈 vasoconstriction。' },
      { title: 'Pituitary surgery 後追蹤', body: '荷爾蒙不會因為腫瘤拿掉就自動正常，需要重新評估 cortisol、thyroid、gonadal 與 DI 風險。' },
      { title: 'Cushing 的治療不是立刻歸零', body: '長期高 cortisol 被處理後，病人的 HPA axis 可能暫時休眠，因此術後反而要有 cortisol withdrawal 與 replacement 的準備。' },
    ], 'comparison-grid'),
    callout(
      'success',
      '高價值臨床原則',
      p(`當你懷疑內分泌急症時，先救命、再定位。當你懷疑內分泌性高血壓時，先抓低鉀、ARR 與 pheo 線索。當你看到 pituitary mass 時，永遠同時問兩件事：它在分泌什麼？它壓到了什麼？`),
    ),
  ),
  section(
    'pharmacology',
    '常用藥物機轉、副作用、交互作用',
    lead(`這一章藥理最容易出錯的地方，是把不同軸線藥物混在一起背。真正有用的方式，是記住每支藥在補缺乏、壓合成、阻受體、或把腫瘤荷爾蒙拉低中的位置。`),
    table(
      ['類別', '代表藥物', '主要機轉', '重要提醒'],
      [
        ['Glucocorticoid replacement', 'Hydrocortisone、prednisolone', '補回 cortisol 缺乏', '急症劑量與維持劑量差很多；需衛教 sick day rule'],
        ['Mineralocorticoid replacement / blockade', 'Fludrocortisone、spironolactone、eplerenone', '前者補回 aldosterone 缺乏，後兩者阻斷 aldosterone 作用', 'Spironolactone 可造成乳房不適與高鉀'],
        ['Alpha blockade', 'Phenoxybenzamine、doxazosin', '先阻斷 α 受體，減少 pheo vasoconstriction', '手術前準備與容量補充都很重要'],
        ['Dopamine agonist', 'Cabergoline、bromocriptine', '抑制 prolactin 分泌並縮小 prolactinoma', '噁心、姿勢性低血壓、情緒與衝動控制問題需注意'],
        ['Somatostatin analog / GH pathway', 'Octreotide、lanreotide、pegvisomant', '抑制 GH 分泌或阻斷 GH 作用', '膽結石、GI 副作用、LFT 與 IGF-1 追蹤'],
        ['Steroidogenesis inhibitor', 'Ketoconazole、metyrapone、osilodrostat', '降低 cortisol 合成', '肝毒性、低 cortisol 與藥物交互作用'],
        ['Desmopressin', 'DDAVP', '補 ADH 活性，減少自由水流失', '過量可造成低鈉，病人教育很重要'],
      ],
    ),
    formula('Aldosterone-renin ratio 概念', 'ARR = plasma aldosterone / plasma renin activity', 'ARR 是篩 primary aldosteronism 的入口，但不能脫離抽血姿勢、藥物與鉀離子狀態單獨解讀。'),
    callout(
      'danger',
      '典型藥理地雷',
      p(`最經典的地雷有三個：第一，疑似 adrenal crisis 卻沒有及時給 steroid；第二，pheochromocytoma 先給 β-blocker；第三，可能合併 secondary adrenal insufficiency 的 pituitary patient 先補甲狀腺素，結果把原本邊緣的 cortisol 缺乏推成危象。`),
    ),
  ),
  section(
    'special-populations',
    '特殊族群考量',
    lead(`這一章的特殊族群不只是年齡，而是任何讓內分泌軸線更脆弱的狀態，例如長期外源性 steroid、妊娠、圍手術期、家族遺傳腫瘤症候群與 pituitary apoplexy 高風險病人。`),
    cards([
      { title: '長期 steroid 使用者', body: '外源性 steroid 會抑制 HPA axis，停藥不能猛然歸零。感染、手術與急病時也要重想 stress dose。' },
      { title: '妊娠', body: 'Cushing、prolactinoma、甲狀腺與腎上腺疾病都會因妊娠改變診斷與用藥排序。高風險時需多專科共照。' },
      { title: '家族性腫瘤症候群', body: 'MEN2、VHL、SDHx 等基因背景會改變 pheochromocytoma / pituitary / 其他內分泌腫瘤的追蹤強度。' },
      { title: '圍手術期', body: '已知 adrenal insufficiency 病人、recent pituitary surgery 病人與大量 steroid 使用者，手術前後的 steroid strategy 要先規畫。' },
    ]),
  ),
  section(
    'clinical-pitfalls',
    '常見臨床陷阱',
    lead(`腎上腺與垂體疾病的陷阱幾乎都和「沒有想到它」有關。一旦沒有把它放進 differential，很多關鍵抽血、病史與給藥順序就會整串錯下去。`),
    misconceptionList([
      { myth: '高血壓就是 essential，除非年紀很小。', correction: '難治型高血壓、低鉀、陣發性頭痛盜汗心悸、紫紋肌無力都應把內分泌病因拉進來。' },
      { myth: '內分泌檢查就是多抽幾管血而已。', correction: '很多檢查高度受時間、姿勢、藥物與電解質影響。前測條件錯了，數值就容易被誤解。' },
      { myth: '看到 pituitary tumor 就先看 MRI 大小。', correction: '大小很重要，但 hormone phenotype 一樣重要。小腫瘤也可高度分泌，大腫瘤也可能主要帶來壓迫。' },
    ]),
  ),
  section(
    'case-discussion',
    'Case-based discussion',
    lead(`整合三個高頻 vignette：第一，36 歲男性多藥難治高血壓與低鉀；第二，28 歲女性半年內月經亂、乳漏與視野模糊；第三，49 歲女性近年紫紋、高血糖、近端肌無力與瘀青增加。`),
    table(
      ['Vignette', '最優先要想的病', '第一步'],
      [
        ['難治高血壓 + 低鉀', 'Primary aldosteronism', '先做 ARR 並校正低鉀，再決定 confirmatory testing 與 AVS / CT 路線'],
        ['乳漏 + 月經亂 + 視野模糊', 'Prolactinoma / pituitary macroadenoma', '檢 prolactin、其餘 pituitary axis、視野與 MRI'],
        ['紫紋 + 糖尿病 + 近端肌無力', 'Cushing syndrome', '先用合適篩檢工具確認 hypercortisolism，再定位來源'],
      ],
    ),
    callout(
      'clinical',
      '案例整合',
      p(`這三位病人若被拆開看，都像常見門診問題；但當你用內分泌軸線重新組織資訊，檢查順序、用藥與轉介策略就會立刻改變。這就是這一章最想訓練的核心能力。`),
    ),
  ),
  references('章內來源註記', endocrineSources.ch24),
);

endocrineChapters.ch25 = chapter(
  '肥胖與代謝症候群 (Obesity & Metabolic Syndrome)',
  section(
    'anatomy-physiology',
    '正常解剖與生理',
    lead(`肥胖不是單純體重過多，而是能量攝入、能量消耗、食慾中樞、獎賞系統、睡眠、肌肉量、內分泌訊號與脂肪分布共同改寫後形成的慢性疾病。脂肪組織 (Adipose tissue) 本身就是內分泌器官，會分泌 leptin、adiponectin、TNF-α、IL-6 與多種 adipokines，直接影響食慾、胰島素敏感性、血管與發炎狀態。`),
    p(`正常情況下，腸道 GLP-1、PYY、胃 ghrelin、脂肪細胞 leptin 與中樞下視丘訊號共同協調飢餓與飽足。當內臟脂肪增加、睡眠呼吸中止、慢性壓力、藥物、基因背景與環境因素一起把能量平衡往儲存端推過去時，病人進入的不只是體重上升，而是胰島素阻抗、脂肪肝、血壓上升、血脂異常與慢性低度發炎的整體病理。`),
    tags(['Visceral adiposity', 'Leptin', 'GLP-1', 'MASLD', 'Metabolic syndrome']),
    endocrineViewer('metabolic-adiposity'),
    diagram('endocrine-adiposity-map'),
    cards([
      { title: '內臟脂肪 vs 皮下脂肪', body: '真正和代謝風險密切相關的常是內臟脂肪與異位脂肪，而不是總體脂肪量本身。' },
      { title: '食慾不是意志力單點', body: 'GLP-1、GIP、ghrelin、leptin 與獎賞系統共同影響食慾，這也是為什麼藥物與手術能顯著改變進食行為。' },
      { title: '脂肪肝 (MASLD)', body: '肝臟是肥胖與代謝失衡的高敏感感測器。ALT 正常不等於沒有脂肪肝。' },
      { title: '骨骼肌與活動量', body: '肌肉不只是動作器官，也是大型葡萄糖利用器官。肌少與久坐會放大胰島素阻抗。' },
    ]),
    formula('BMI 公式', 'BMI = weight (kg) / height (m)^2', 'BMI 是群體風險分層工具，不是體脂分布、肌肉量或個別代謝風險的完整代表。因此腰圍、生活功能與器官共病同樣重要。'),
    summary('生理總結', '肥胖真正要看的不是單一體重數字，而是內臟脂肪、異位脂肪、食慾調控與器官風險如何一起改變。', [
      '腰圍常比體重更接近代謝風險。',
      '脂肪組織會主動分泌發炎與代謝訊號。',
      '治療要同時處理體重、器官共病與長期維持。',
    ]),
  ),
  section(
    'symptoms',
    '常見主訴與症狀',
    lead(`肥胖與代謝症候群的主訴未必直接是「我變胖」。病人更常抱怨的是疲倦、打鼾、白天嗜睡、膝蓋痛、月經亂、不孕、胃食道逆流、運動耐受差、血壓血糖血脂一直不好或肝指數偏高。這些症狀常被分別送到不同專科，但底層可能來自同一張內臟脂肪與代謝失衡地圖。`),
    table(
      ['臨床情境', '常見主訴', '真正該想到什麼', '常見誤判'],
      [
        ['中央肥胖', '腰圍增加、腹部突出', '要評估內臟脂肪與代謝風險，不只看體重', '只用外觀評價病人意志力'],
        ['OSA 線索', '打鼾、白天想睡、晨起頭痛', '睡眠呼吸中止會反向加重高血壓與胰島素阻抗', '單純睡太少或壓力大'],
        ['PCOS / 生殖軸', '月經亂、不孕、痤瘡、多毛', '肥胖與胰島素阻抗常和 PCOS 互相放大', '只當婦科問題切開看'],
        ['MASLD / 肝臟線索', '健檢 ALT 偏高、腹部超音波脂肪肝', '肝臟已經反映整體代謝負荷', '只是喝酒或肝不好，與代謝無關'],
      ],
    ),
    callout(
      'clinical',
      '真實場景',
      p(`48 歲男性因「最近一直很累」就醫，白天開會會睡著，太太說他鼾聲很大。抽血發現 A1C 6.2%、TG 310 mg/dL、HDL 低、ALT 輕升，血壓也偏高。若只說他需要減肥，等於把真正的睡眠、肝臟、血糖與心血管風險全部略過。`),
    ),
    takeawayList([
      { title: '主訴常是共病，不是體重本身', body: '肥胖病人更常因 OSA、關節痛、PCOS、GERD、MASLD 或情緒困擾來就醫。' },
      { title: '代謝症候群是聚落', body: '高血壓、高 TG、低 HDL、高血糖與中央肥胖常成群出現，應一起思考而不是各自處方。' },
      { title: '用詞會影響照護', body: '以 person-first、非羞辱性的語言和病人討論，往往比單純命令減重更能提升治療合作。' },
    ]),
  ),
  section(
    'pathophysiology',
    '重要疾病機轉',
    lead(`肥胖的病理生理不是線性卡路里公式，而是中樞與周邊多重回饋被重設。內臟脂肪增加後，脂肪分解產生的自由脂肪酸更容易流向肝門靜脈，推高肝臟 VLDL 與糖質新生；同時 adipokines 與慢性低度發炎讓肌肉與肝臟胰島素敏感性下降。這些改變一起形成高 TG、低 HDL、空腹血糖上升與血壓偏高，也就是代謝症候群常見聚落。`),
    p(`代謝症候群 (Metabolic syndrome) 並不是單一病，而是一組共享風險的構型。根據常用 ATP III 邏輯，中央肥胖、血壓升高、空腹血糖升高、TG 高、HDL 低中達到三項以上，就代表病人已站在高風險平台上。真正重要的不是是否背得出名稱，而是意識到這類病人的 ASCVD、type 2 diabetes、MASLD、OSA、CKD 與部分腫瘤風險都被整體推高。`),
    cards([
      { title: '食慾回饋', body: '減重後身體常透過 ghrelin 上升、基礎代謝下降與飢餓感增加來對抗體重下降，這也是維持比減下來更困難的原因。' },
      { title: '脂肪肝與胰臟脂肪', body: '異位脂肪不只在肚子外觀，還會進入肝臟與胰臟，進一步改變 glucose-lipid handling。' },
      { title: '睡眠與壓力', body: 'OSA、慢性睡眠不足與壓力荷爾蒙會拉高食慾、交感與胰島素阻抗，讓體重控制更難。' },
      { title: '藥物性體重增加', body: '抗精神病藥、部分抗憂鬱藥、類固醇、部分糖尿病藥與抗癲癇藥都可能把原本可控的體重推向失衡。' },
    ], 'comparison-grid'),
    misconceptionList([
      { myth: '肥胖就是吃太多、動太少，所以只要自制就好。', correction: '飲食與活動當然重要，但肥胖是慢性疾病，牽涉食慾回饋、睡眠、藥物、遺傳、社會環境與內分泌訊號。若只把它當意志力問題，會直接降低治療品質。' },
      { myth: 'BMI 不到 30 就不用管代謝風險。', correction: '亞洲族群、內臟脂肪高、腰圍大、脂肪肝或代謝指標異常者，即使 BMI 沒有很高，代謝風險也可能已經明顯上升。' },
    ]),
  ),
  section(
    'diagnosis',
    '診斷思路與鑑別診斷',
    lead(`診斷肥胖與代謝症候群時，不能只停在 BMI。根據 ADA 與實務，至少要看體重、身高、腰圍、血壓、A1C / 空腹血糖、血脂與肥胖相關共病。更進一步，還要問：病人的肥胖是生活作息與環境主導，還是有 secondary cause、藥物驅動、暴食 / binge eating、睡眠呼吸中止、甲狀腺疾病或 Cushing syndrome 線索？`),
    table(
      ['步驟', '要回答的問題', '常用工具', '常見錯誤'],
      [
        ['量化體型', 'BMI 與脂肪分布如何', 'BMI、腰圍、腰臀比視情況', '只看體重不看腰圍與肌肉量'],
        ['盤點共病', '有無高血壓、diabetes、OSA、MASLD、PCOS、OA', '病史、抽血、必要時睡眠評估', '把共病切成不同科沒有整合'],
        ['找 secondary cause', '有無藥物、內分泌、遺傳或情緒飲食因素', '用藥清單、內分泌線索、飲食行為', '所有病人都常規抽一大串內分泌檢查'],
        ['定義代謝症候群', '是否已形成 risk cluster', '腰圍、TG、HDL、BP、FPG / A1C', '只記住名字，沒有真的用來分層風險'],
      ],
    ),
    h3('代謝症候群常見構成要素'),
    list([
      '中央肥胖：腰圍上升，需依族群採用合適 cutoffs。',
      '三酸甘油酯升高或正在接受治療。',
      'HDL 偏低或正在接受治療。',
      '血壓升高或已使用降壓藥。',
      '空腹血糖上升或已進入前糖尿病 / 糖尿病範圍。',
    ]),
    callout(
      'warning',
      '次發性肥胖並不常見，但不能完全不想',
      p(`若病人體重增加非常快速、伴紫紋、近端肌無力、月經亂、明顯低甲狀腺症狀、長期類固醇使用或兒童早發嚴重肥胖，要把內分泌或遺傳病因拉回 differential。大多數病人不是因為罕病，但少數高風險者若沒想到，會直接錯失可逆病因。`),
    ),
  ),
  section(
    'investigations',
    '關鍵檢查與判讀',
    lead(`肥胖與代謝症候群的檢查目標，是找出器官受害程度與後續治療排序，而不是證明病人真的胖。抽血與量測應該服務於決策：要不要用藥、要不要做 OSA 評估、是否已有 MASLD、腎功能與心血管風險到哪裡。`),
    table(
      ['檢查', '用途', '判讀重點'],
      [
        ['A1C / FPG', '找 prediabetes / diabetes', '即使還沒到 diabetes，dysglycemia 也會影響治療目標與藥物選擇'],
        ['Lipid profile', '判斷 TG、HDL、LDL 與 ASCVD 風險', 'TG 很高時先想胰臟炎風險，不只是慢性 ASCVD'],
        ['AST / ALT、必要時影像', '找 MASLD / MASH 線索', '肝指數正常不排除脂肪肝，仍需放回整體風險'],
        ['血壓、腰圍、體重趨勢', '建立代謝症候群與治療基線', '一次量測不夠，趨勢更重要'],
        ['睡眠問卷 / 睡眠檢查', '評估 OSA', '白天嗜睡、打鼾、難治高血壓時價值高'],
        ['TSH 或其他內分泌檢查', '只在病史支持時做 secondary workup', '不建議所有肥胖病人機械式全套內分泌抽血'],
      ],
    ),
    spotlight('檢查排序思維', '先抓高頻且可直接改變治療的共病：血壓、血糖、血脂、睡眠與肝臟。對有明顯內分泌紅旗者再拉高 secondary workup 優先順序。'),
  ),
  section(
    'treatment',
    '第一線與第二線治療',
    lead(`ADA 與 NIDDK 都強調，肥胖治療是慢性病治療，不是短期衝刺。對合併 type 2 diabetes 的病人，體重管理本身就是主要治療目標之一。持續減重 3%–7% 可改善 glycemia 與中間型心血管風險因子；>10% 的減重常帶來更大的代謝改善，甚至可能促進 type 2 diabetes remission。`),
    p(`生活型態治療是底座，但不應把它和藥物 / 手術對立起來。根據 NIDDK，成人若 BMI >=30，或 BMI >=27 且已有高血壓、type 2 diabetes 等體重相關健康問題，可考慮處方減重藥。對重度肥胖或合併重大共病者，代謝手術也可能帶來疾病修飾效果。真正的問題不是「病人值不值得用藥」，而是「哪一種介入最符合他的病程、共病、風險與可持續性」。`),
    table(
      ['情境', '優先策略', '常見搭配', '關鍵提醒'],
      [
        ['過重 / 肥胖但共病輕', '生活型態與行為治療', '營養介入 + 阻力訓練 + 睡眠改善', '目標要具體、可長期維持'],
        ['BMI >=30 或 BMI >=27 合併共病', '考慮減重藥物', 'Semaglutide、tirzepatide、phentermine-topiramate 等', '選藥要看妊娠風險、血壓、癲癇、opioid 使用與甲狀腺癌家族史'],
        ['合併 type 2 diabetes', '把減重與 glycemic management 同等看待', 'GLP-1 RA / tirzepatide 對血糖與體重都有幫助', '不要只顧血糖數字，忽略體重病程本身'],
        ['重度肥胖 / 多重共病', '評估代謝手術', '術前營養、心理與長期追蹤', '手術是代謝病程治療，不是捷徑或懲罰'],
        ['代謝症候群明顯', '同步處理 BP、血脂、血糖與 OSA', 'statin、抗高血壓、減重藥與睡眠治療並行', '不能只追一項指標'],
      ],
    ),
    cards([
      { title: '人本語言', body: 'ADA 強調使用 person-first、非羞辱性的溝通方式。這不是政治正確，而是直接影響病人是否願意長期接受照護。' },
      { title: '阻力訓練的重要性', body: '減重過程若只追總體重，很容易犧牲肌肉量。保住肌肉量對胰島素敏感性、功能與長期維持都重要。' },
      { title: 'OSA 與睡眠', body: '很多病人體重總是卡住，不是因為不努力，而是 OSA、睡眠不足與交感活性持續在拉高食慾與代謝壓力。' },
      { title: '停藥後反彈', body: '減重藥停止後反彈並不少見，這反映肥胖是慢性病，需要長期策略，而不是說藥物沒有用。' },
    ], 'comparison-grid'),
    callout(
      'success',
      '門診高回報做法',
      p(`把治療目標從「瘦幾公斤」改成「腰圍、A1C、血壓、TG、睡眠品質與活動功能改善多少」，病人往往更容易理解這不是外觀管理，而是器官保護。當病人已符合條件時，及早討論減重藥或代謝手術，比反覆用意志力失敗羞辱病人更有醫療價值。`),
    ),
  ),
  section(
    'pharmacology',
    '常用藥物機轉、副作用、交互作用',
    lead(`減重藥理學的關鍵，是知道每一類藥在食慾、飽足、能量攝取與脂肪吸收的哪個節點切入，同時了解停藥反彈、成本、長期安全與禁忌症。`),
    table(
      ['類別', '代表藥物', '主要機轉', '重要副作用 / 禁忌'],
      [
        ['GLP-1 receptor agonist', 'Semaglutide、liraglutide', '降低食慾、延緩胃排空、提升飽足', 'GI 不適、膽囊問題；MEN2 / MTC 病史需避免'],
        ['Dual GIP/GLP-1 agonist', 'Tirzepatide', '同時啟動 GIP 與 GLP-1，減重幅度通常更強', 'GI 副作用、起始需慢調、同樣注意甲狀腺相關禁忌'],
        ['Sympathomimetic + antiepileptic', 'Phentermine-topiramate', '減少食慾並提升飽足', '心跳、失眠、口乾；妊娠禁忌，hyperthyroidism 病人不適合'],
        ['Naltrexone-bupropion', 'Contrave', '調整食慾與獎賞回路', '血壓、噁心、癲癇風險；opioid 使用者不適合'],
        ['Orlistat', 'Orlistat', '降低腸道脂肪吸收', '脂肪便、脂溶性維生素缺乏、GI 忍受度限制'],
        ['Rare genetic obesity therapy', 'Setmelanotide', '針對特定 MC4R pathway 缺陷', '只適用於特定基因型，不是一般肥胖用藥'],
      ],
    ),
    formula('HOMA-IR 概念式', 'HOMA-IR = fasting insulin x fasting glucose / 405', '不是常規臨床必做，但有助理解胰島素阻抗的研究與機轉語言。真正臨床照護更常依賴腰圍、血糖、血脂、肝臟與共病整體判讀。'),
    callout(
      'danger',
      '常見誤解',
      p(`減重藥不是給想快速變瘦的人，而是給慢性肥胖病人作為器官風險治療的一部分。NIDDK 也提醒，藥物不應取代生活型態治療，而且懷孕、特定精神病史、癲癇、未控制高血壓與 opioid 使用等狀況會改變選藥。`),
    ),
  ),
  section(
    'special-populations',
    '特殊族群考量',
    lead(`青少年、孕婦、老年人與合併 type 2 diabetes / CKD 的病人，是肥胖治療最需要個別化的幾群。青少年需兼顧生長發育與家庭環境；孕期通常不以減重藥為主；老年人則要避免在減重過程中把肌肉與骨骼一起減掉。`),
    cards([
      { title: '青少年', body: '家庭、學校、睡眠與心理壓力都深度參與。必要時可依核准適應症考慮藥物，但需要更完整教育與追蹤。' },
      { title: '孕婦', body: '重點在孕前體重優化與孕期安全照護。減重藥通常不適合在懷孕或準備懷孕時使用。' },
      { title: '老年病人', body: '功能、肌力、跌倒與骨質風險優先。減重計畫要搭配蛋白質與阻力訓練，避免 sarcopenic obesity 更惡化。' },
      { title: '合併 diabetes / CKD', body: '要把體重、血糖、腎功能、心血管與低血糖風險一起考慮。很多時候選藥不是單看減重幅度。' },
    ]),
  ),
  section(
    'clinical-pitfalls',
    '常見臨床陷阱',
    lead(`肥胖與代謝症候群照護的最大陷阱，是把慢性病道德化。當醫療團隊只講自制力而不處理睡眠、藥物、共病與食慾生理，病人得到的是羞恥，不是治療。`),
    misconceptionList([
      { myth: '體重下降不夠快，代表病人不認真。', correction: '身體會用代謝適應、飢餓訊號與環境壓力反抗減重。速度慢不等於沒有價值，3%–7% 的減重就可能帶來臨床改善。' },
      { myth: '減重藥只是 cosmetic medicine。', correction: '當病人符合條件時，減重藥是在治療高血壓、type 2 diabetes、脂肪肝、OSA 與 ASCVD 風險的整體病程。' },
      { myth: '只要 BMI 還沒很高，就不需要處理。', correction: '內臟脂肪、腰圍、脂肪肝、血脂與血糖異常都可能在 BMI 還不到嚴重肥胖前就已經開始傷器官。' },
    ]),
  ),
  section(
    'case-discussion',
    'Case-based discussion',
    lead(`病例：45 歲女性，BMI 31，腰圍 96 cm，血壓 146/92 mmHg，A1C 6.1%，TG 260 mg/dL，HDL 偏低，晚上打鼾嚴重，超音波顯示脂肪肝。她過去試過多次節食，體重總是反彈，因此已經對「減重」兩個字非常反感。`),
    table(
      ['臨床問題', '思考方向'],
      [
        ['這只是體重問題嗎？', '不是。她已經符合代謝症候群聚落，且 OSA 與 MASLD 都提示器官已開始受害。'],
        ['第一步是什麼？', '以非羞辱語言重新框架病情，建立生活型態基座，同時評估睡眠呼吸中止與共病治療。'],
        ['要不要談藥物？', '若 BMI 與共病符合條件，減重藥應被正式討論，而不是留到所有非藥物方法都被視為「失敗」之後。'],
      ],
    ),
    callout(
      'clinical',
      '案例整合',
      p(`這位病人最需要的不是再被告知少吃多動，而是被當成慢性代謝病病人處理。當治療目標被重新定義成腰圍、睡眠、肝臟、血壓、血糖與生活功能的改善，病人才比較可能願意進入長期照護。`),
    ),
  ),
  references('章內來源註記', endocrineSources.ch25),
);
