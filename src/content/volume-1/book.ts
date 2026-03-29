import type { ChapterContent } from '../../types.js';

const join = (...parts: string[]) => parts.join('\n');

const chapter = (title: string, ...sections: string[]): ChapterContent => ({
  title,
  content: sections.join('\n'),
});

const section = (id: string, title: string, ...blocks: string[]) => `
  <section id="${id}">
    <h2>${title}</h2>
    ${join(...blocks)}
  </section>
`;

const p = (text: string, className = '') => `<p${className ? ` class="${className}"` : ''}>${text}</p>`;
const lead = (text: string) => p(text, 'lead');
const h3 = (text: string) => `<h3>${text}</h3>`;
const h4 = (text: string) => `<h4>${text}</h4>`;

const list = (items: string[], ordered = false) => {
  const tag = ordered ? 'ol' : 'ul';
  return `<${tag}>${items.map(item => `<li>${item}</li>`).join('')}</${tag}>`;
};

const callout = (variant: 'info' | 'warning' | 'danger' | 'success' | 'clinical', title: string, ...blocks: string[]) => `
  <div class="callout callout--${variant}">
    <div class="callout__title">${title}</div>
    ${join(...blocks)}
  </div>
`;

const cards = (items: { title: string; body: string }[], className = 'info-grid') => `
  <div class="${className}">
    ${items.map(item => `
      <div class="${className === 'comparison-grid' ? 'comparison-card' : className === 'checklist-grid' ? 'checklist-card' : 'info-card'}">
        <h3>${item.title}</h3>
        <p>${item.body}</p>
      </div>
    `).join('')}
  </div>
`;

const table = (headers: string[], rows: string[][]) => `
  <table>
    <thead>
      <tr>${headers.map(header => `<th>${header}</th>`).join('')}</tr>
    </thead>
    <tbody>
      ${rows.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('')}
    </tbody>
  </table>
`;

const termGrid = (items: { term: string; explanation: string }[]) => `
  <div class="term-grid">
    ${items.map(item => `
      <div class="term-pair">
        <strong>${item.term}</strong>
        <p>${item.explanation}</p>
      </div>
    `).join('')}
  </div>
`;

const formula = (title: string, expression: string, note: string) => `
  <div class="formula-block">
    <h3>${title}</h3>
    <code>${expression}</code>
    <p>${note}</p>
  </div>
`;

const misconceptionList = (items: { myth: string; correction: string }[]) => `
  <div class="misconception-list">
    ${items.map(item => `
      <div class="misconception-item">
        <strong>${item.myth}</strong>
        <p>${item.correction}</p>
      </div>
    `).join('')}
  </div>
`;

const takeawayList = (items: { title: string; body: string }[]) => `
  <div class="takeaway-list">
    ${items.map(item => `
      <div class="takeaway-item">
        <strong>${item.title}</strong>
        <p>${item.body}</p>
      </div>
    `).join('')}
  </div>
`;

const tags = (items: string[]) => `
  <div class="tag-row">
    ${items.map(item => `<span class="tag">${item}</span>`).join('')}
  </div>
`;

const diagram = (name: string) => `<medical-canvas diagram="${name}"></medical-canvas>`;

const summary = (title: string, text: string, bullets: string[]) => `
  <div class="chapter-summary">
    <h3>${title}</h3>
    <p>${text}</p>
    ${list(bullets)}
  </div>
`;

const qaCards = (items: { title: string; body: string }[]) => `
  <div class="checklist-grid">
    ${items.map(item => `
      <div class="checklist-card">
        <h3>${item.title}</h3>
        <p>${item.body}</p>
      </div>
    `).join('')}
  </div>
`;

const glossaryTable = (items: { term: string; definition: string }[]) => table(
  ['術語', '定義與臨床意義'],
  items.map(item => [item.term, item.definition]),
);

const closingSections = (config: {
  caseTitle: string;
  caseStem: string;
  caseQuestions: string[];
  caseAnalysis: string[];
  quiz: { question: string; answer: string }[];
  glossary: { term: string; definition: string }[];
}) => [
  section(
    'case-study',
    '病例題與臨床解析',
    lead(config.caseTitle),
    p(config.caseStem),
    h3('思考問題'),
    list(config.caseQuestions, true),
    qaCards(config.caseAnalysis.map((body, index) => ({
      title: `解析 ${index + 1}`,
      body,
    }))),
  ),
  section(
    'chapter-quiz',
    '章末測驗題',
    lead('以下測驗題聚焦本章最容易混淆與最值得反覆複習的概念。'),
    qaCards(config.quiz.map((item, index) => ({
      title: `Q${index + 1}. ${item.question}`,
      body: `A. ${item.answer}`,
    }))),
  ),
  section(
    'glossary',
    '術語索引',
    lead('本節收錄本章高頻術語，作為快速回查索引。'),
    glossaryTable(config.glossary),
  ),
];

export const volume1Chapters: Record<string, ChapterContent> = {};

volume1Chapters.ch01 = chapter(
  '醫療與藥學的共同地圖',
  section(
    'disease-syndrome-diagnosis',
    '什麼是疾病、症候群、診斷、治療',
    lead('醫療與藥學的第一步不是背藥名或器官，而是先分清楚臨床在描述什麼。疾病 (Disease) 指的是可被病理、生理或病因學定義的異常狀態；病人感受到的不舒服是 illness；社會角色受影響則接近 sickness。這三者常重疊，但不完全相同。'),
    p('例如偏頭痛 (Migraine) 可以讓病人有強烈 illness，但影像檢查常正常；高血壓 (Hypertension) 可能長期沒有明顯 illness，卻已經是有客觀證據的 disease。理解這種差異，才能避免把「檢查正常」錯誤等同於「病人沒事」。'),
    cards([
      { title: '疾病 Disease', body: '具有可描述的病理機轉、病因或生理異常，可經由臨床與檢查建立診斷。' },
      { title: '症候群 Syndrome', body: '一組常一起出現的徵象與症狀，但背後原因可能不只一種，例如腎病症候群。' },
      { title: '診斷 Diagnosis', body: '把病人的資料整理成最合理的疾病解釋，常包含主要診斷、嚴重度與病因層次。' },
      { title: '治療 Treatment', body: '不只是開藥，還包含支持性照護、手術、復健、預防再發與病人教育。' },
    ]),
    h3('臨床名詞之間最常被混淆的差異'),
    table(
      ['名詞', '重點問題', '典型例子', '常見誤解'],
      [
        ['症狀 (Symptom)', '病人感受到什麼？', '胸悶、頭痛、疲倦', '以為症狀越多就一定越嚴重；其實某些危急疾病症狀很少。'],
        ['徵象 (Sign)', '醫療人員觀察到什麼？', '黃疸、低血壓、心雜音', '把檢查數值也當成徵象；實際上數值屬檢驗結果。'],
        ['診斷 (Diagnosis)', '最合理的疾病解釋是什麼？', '肺炎、甲狀腺機能低下', '把單一症狀當診斷，例如「發燒」不是最終診斷。'],
        ['預後 (Prognosis)', '接下來可能怎麼發展？', '五年存活率、復發風險', '以為診斷確立就自然知道預後；實際上還要看分期、共病與治療反應。'],
      ],
    ),
    callout(
      'warning',
      '常見誤解',
      p('「有病名」不代表已經理解病人的全部問題。以心衰竭 (Heart Failure) 為例，病名之下還要繼續問：是收縮還是舒張功能異常？是急性惡化還是慢性穩定？主要誘因是感染、缺血、用藥不當還是腎功能惡化？'),
    ),
    summary('本節總結', '臨床語言的核心是把現象、機轉與決策分開思考，再重新連起來。', [
      'Disease、illness、sickness 不完全相同。',
      'Syndrome 是表現組合，不一定等於單一病因。',
      'Diagnosis、severity、etiology、prognosis 是不同層次的臨床陳述。',
    ]),
  ),
  section(
    'professional-roles',
    '醫師、藥師、護理師與其他專業角色',
    lead('現代醫療不是單一專業英雄式作業，而是跨專業照護 (Interprofessional Care)。每個角色都在解決不同型態的風險：醫師聚焦於診斷與整體處置；藥師聚焦於藥物適應症、劑量與安全；護理師聚焦於持續監測、照護執行與病人回饋。'),
    p('還有呼吸治療師 (Respiratory Therapist)、營養師 (Dietitian)、物理治療師 (Physical Therapist)、職能治療師 (Occupational Therapist)、社工師 (Social Worker)、心理師 (Psychologist) 與檢驗、放射、病理團隊。對病人來說，這些分工並不是「很多人都在做一樣的事」，而是共同降低漏失、延遲與錯誤。'),
    diagram('clinical-cycle'),
    p('例如一位慢性阻塞性肺病 (COPD) 病人住院時，醫師可能決定抗生素與類固醇策略，藥師會檢查吸入器技術與類固醇副作用風險，護理師監測呼吸窘迫與氧氣需求，呼吸治療師協助霧化與肺部復原訓練。若這些資訊沒有回流整合，病人很容易在出院後再次惡化。'),
    cards([
      { title: '醫師 (Physician)', body: '統整病史、理學檢查與檢查結果，建立診斷與治療大方向，負責風險溝通與決策。' },
      { title: '藥師 (Pharmacist)', body: '確認藥物是否真的需要、劑量是否適合、交互作用與不良反應風險、是否有更安全選項。' },
      { title: '護理師 (Nurse)', body: '把抽象醫囑轉成持續性的臨床監測與病人照護，常是最早發現病情改變的人。' },
      { title: '病人與家屬', body: '不是被動接受者，而是治療目標、可行性與長期遵從性的共同決策者。' },
    ], 'comparison-grid'),
    callout(
      'clinical',
      '跨專業合作的真實核心',
      p('真正困難的地方通常不是不知道誰該做什麼，而是資訊沒有在正確時間回到正確的人手上。藥物過敏、出院帶藥、腎功能改變、吸入器技巧不佳，這些都屬於「資訊流失」造成的病人安全問題。'),
    ),
  ),
  section(
    'patient-care-flow',
    '病人照護流程總覽',
    lead('病人照護流程可以從門診、急診、住院或加護病房開始，但共同骨架幾乎一致：辨認主訴、蒐集病史、做理學檢查、判斷嚴重度、選擇檢查、建立問題清單、制定處置計畫、持續追蹤與轉銜照護。'),
    p('臨床流程不是直線，而是迴圈。病人在接受治療後產生的新資料，例如血壓回升、乳酸下降、氧氣需求增加、皮疹出現，都會反過來修正原本的問題表述。好的臨床工作者不是一開始就猜中，而是持續更新模型。'),
    h3('一位病人的照護路徑通常包含以下節點'),
    list([
      'Triage 與初始嚴重度評估：先分辨誰需要立即處置，誰可以完整問診。',
      'History taking：現病史 (History of Present Illness)、既往史、用藥史、過敏史、家族史、社會史。',
      'Physical examination：一般狀態、生命徵象與聚焦理學檢查。',
      'Problem list：把病人的所有重要問題整理成可被追蹤的清單，而不是只留一個病名。',
      'Plan：檢查、治療、監測、教育、轉介與出院安排。',
    ]),
    table(
      ['流程節點', '核心任務', '藥學關注', '容易漏掉的細節'],
      [
        ['急性評估', 'ABC、意識、生命徵象、紅旗徵象', '確認現用藥是否造成急性惡化，例如降壓藥、鎮靜藥或低血糖藥', '把慢性穩定處方直接延續到急性不穩定期'],
        ['住院治療', '建立問題清單與日更計畫', '腎肝功能變化後的劑量調整、靜脈轉口服、TDM', '以為入院處方一開就不用回頭修正'],
        ['出院轉銜', '整理最終診斷與後續追蹤', 'Medication reconciliation、衛教、停藥原因與監測指標', '沒有清楚交代哪些藥是新增、哪些是停用'],
      ],
    ),
    callout(
      'danger',
      '病人安全高風險區段',
      p('交班 (Handover)、轉床、轉科與出院，是最容易發生資訊遺失的時間點。許多再入院與不良事件並不是因為疾病太複雜，而是因為藥單沒有對齊、追蹤指示不清楚、病人不了解警訊。'),
    ),
  ),
  section(
    'clinical-problem-definition',
    '臨床問題如何被定義',
    lead('臨床問題不是「把病人的話原封不動抄下來」，而是把資訊濃縮成具有方向感的問題表述 (Problem Representation)。好問題能自然帶出鑑別診斷，壞問題則只會堆積細節。'),
    p('例如「58 歲男性胸痛」太寬；但「58 歲男性，有高血壓與吸菸史，活動時胸骨後壓迫感 30 分鐘，伴冷汗，休息未緩解，心電圖前壁 ST elevation」就已經高度指向急性冠心症。前者是資料，後者才是能驅動決策的臨床問題。'),
    cards([
      { title: '主訴 (Chief Complaint)', body: '病人最主要的不適，通常用病人自己的語言開始。' },
      { title: '語意限定詞 (Semantic Qualifiers)', body: '急/慢、局部/瀰漫、間歇/持續、壓迫/刺痛等，可以快速壓縮資訊。' },
      { title: '鑑別診斷 (Differential Diagnosis)', body: '不是列所有可能，而是列對現在決策真的有影響的幾個方向。' },
      { title: '風險分層 (Risk Stratification)', body: '優先處理高死亡率、高可逆性、延誤後果大的病因。' },
    ]),
    h3('好的臨床問題通常要同時回答四件事'),
    list([
      '現在最需要先排除的危急病因是什麼？',
      '目前最能解釋大部分資料的診斷是什麼？',
      '還缺哪些關鍵資訊會改變處置？',
      '眼前的治療是否需要先行，即使診斷尚未完全確定？',
    ], true),
    callout(
      'warning',
      '常見思考偏誤',
      p('錨定偏誤 (Anchoring Bias) 讓人太早抓住第一個診斷；可得性偏誤 (Availability Bias) 則讓最近常見的疾病被過度聯想。臨床推理不是消除直覺，而是用新的資料反覆校正直覺。'),
    ),
  ),
  section(
    'knowledge-to-competency',
    '從「知道」到「做得到」的能力框架',
    lead('醫療專業能力不是單純知識累加。知道心衰竭治療指引是一件事；在腎功能惡化、低血壓與多重共病的真實病人身上調整利尿劑與 RAAS 抑制劑，又是另一件事。'),
    p('Miller 能力金字塔 (Miller Pyramid) 常把臨床能力分為 knows、knows how、shows how、does 四層。閱讀教材大多停留在前兩層；要走到後兩層，必須結合案例、反思、回饋與刻意練習 (Deliberate Practice)。'),
    cards([
      { title: 'Knows', body: '記住事實、定義、機轉與指引內容。' },
      { title: 'Knows How', body: '能在題目或情境中解釋應用邏輯。' },
      { title: 'Shows How', body: '能在模擬或 OSCE 類場景中展示能力。' },
      { title: 'Does', body: '能在真實臨床環境穩定、安全地執行。' },
    ], 'checklist-grid'),
    p('因此，本書除了提供知識，更要刻意標示常見誤解、易混淆概念與圖像化流程，因為真正的臨床能力來自「能在壓力與不確定性下，仍然抓住結構」。'),
    callout(
      'success',
      '學習建議',
      p('每讀完一節，至少要能回答三個問題：一、這個概念要解釋什麼現象？二、它在臨床上最容易被混淆成什麼？三、若病人狀況改變，這個概念會如何影響下一步決策？'),
    ),
    summary('本章總結', '第一章建立的是地圖，不是終點。後面所有器官、疾病與藥物章節，都會回到這個共同框架。', [
      '先分清楚疾病、病人經驗與社會功能影響。',
      '跨專業照護的本質是資訊整合與風險管理。',
      '照護流程、問題表述與能力培養是醫療共同語言的底座。',
    ]),
  ),
  ...closingSections({
    caseTitle: '病例題：急診胸痛病人的團隊合作',
    caseStem: '58 歲男性因胸痛與冒冷汗至急診。分診後血壓 86/54 mmHg，心電圖顯示 ST elevation。病人長期服用降壓藥與 aspirin，但藥袋不齊全。家屬焦急，病人說「我只是胃痛」。',
    caseQuestions: [
      '這位病人的「主訴」與「臨床問題表述」分別應該怎麼寫？',
      '此時醫師、護理師與藥師各自最需要補上的資訊是什麼？',
      '若出院時只交代「按時吃藥回診」，哪個照護環節最可能出問題？',
    ],
    caseAnalysis: [
      '主訴可以是病人的原話，例如「胸口痛、冒冷汗」；問題表述則需整合成「有心血管危險因子的中年男性，出現持續胸痛合併低血壓與 ST elevation，高度懷疑急性心肌梗塞」。',
      '醫師先處理危急度與再灌流決策；護理師持續監測血壓、意識與疼痛變化；藥師需盡快確認現用藥、最後一次服藥時間、抗血小板與抗凝暴露、過敏史與禁忌。',
      '最容易失敗的是轉銜照護與 medication reconciliation。沒有把新開藥、停藥、警訊、回診與副作用監測講清楚，病人很可能再次延誤或錯用藥。',
    ],
    quiz: [
      { question: '症候群 (Syndrome) 與疾病 (Disease) 最大差異是什麼？', answer: 'Syndrome 是一組常一起出現的表現，不一定指向單一病因；disease 則通常可被病理、生理或病因學更明確定義。' },
      { question: 'Problem representation 的主要目的為何？', answer: '把零散資料濃縮成可驅動鑑別診斷與決策的臨床敘述。' },
      { question: '跨專業照護最常見的失敗點是什麼？', answer: '資訊沒有在正確時間回到正確的人手上，例如交班、轉科、出院時資訊流失。' },
      { question: 'Miller Pyramid 中最接近真實臨床表現的是哪一層？', answer: 'Does，代表能在真實環境穩定執行能力。' },
    ],
    glossary: [
      { term: 'Disease', definition: '可被病理、生理或病因定義的異常狀態。' },
      { term: 'Syndrome', definition: '一組常一起出現的症狀與徵象，病因可能多元。' },
      { term: 'Chief Complaint', definition: '病人最主要的不適，通常用病人自己的語言表達。' },
      { term: 'Problem Representation', definition: '將病史與檢查濃縮成具有方向感的臨床敘述。' },
      { term: 'Differential Diagnosis', definition: '根據目前資料列出的合理診斷候選。' },
      { term: 'Risk Stratification', definition: '依嚴重度、可逆性與延誤後果決定優先次序。' },
      { term: 'Medication Reconciliation', definition: '在轉銜時核對並整理用藥清單，避免遺漏或重複。' },
      { term: 'Interprofessional Care', definition: '跨專業合作，以病人為中心整合醫療決策與照護執行。' },
    ],
  }),
);

volume1Chapters.ch02 = chapter(
  '醫學與藥學的基本語言',
  section(
    'medical-terminology',
    '醫學術語與字首字尾',
    lead('醫學術語看起來複雜，實際上高度模組化。學會拆解字首 (Prefix)、字根 (Root) 與字尾 (Suffix)，比硬背完整單字更有效率，也更不容易在陌生詞彙前失去方向。'),
    diagram('medical-language'),
    termGrid([
      { term: 'brady- / tachy-', explanation: '描述速度或頻率偏慢、偏快，例如 bradycardia、tachypnea。' },
      { term: 'hypo- / hyper-', explanation: '描述程度不足或過多，例如 hypoglycemia、hyperkalemia。' },
      { term: '-itis', explanation: '發炎，例如 hepatitis、dermatitis，但並非所有發炎都一定以 -itis 命名。' },
      { term: '-emia', explanation: '與血液中狀態相關，例如 anemia、bacteremia。' },
      { term: '-oma', explanation: '腫塊或腫瘤，常用於 neoplasm，但也有例外。' },
      { term: '-logy', explanation: '學科或研究，例如 pathology、pharmacology。' },
    ]),
    p('把術語拆解後，還要小心例外。不是所有以 <code>-itis</code> 結尾的都代表感染，也不是所有 <code>-oma</code> 都是惡性腫瘤。醫學語言有歷史包袱，命名與真實病理有時並不完全對應。'),
    callout(
      'warning',
      '易混淆處',
      p('Myocardial infarction 與 myocarditis 都是心肌相關問題，但前者是缺血壞死，後者是發炎。只抓字根而忽略整體詞義，會造成嚴重誤解。'),
    ),
  ),
  section(
    'anatomical-orientation',
    '解剖方位與臨床描述語言',
    lead('解剖方位是所有理學檢查、影像判讀與手術描述的共同座標系。沒有統一的方位語言，就無法精準溝通病灶在哪裡、往哪裡擴散、與什麼結構相鄰。'),
    tags(['anterior / posterior', 'superior / inferior', 'medial / lateral', 'proximal / distal']),
    table(
      ['概念', '說明', '常見臨床例子'],
      [
        ['前 (Anterior) / 後 (Posterior)', '以人體解剖姿勢為基準描述前後方位', '胸骨在心臟前方；脊椎在後方'],
        ['近端 (Proximal) / 遠端 (Distal)', '多用於四肢或管路描述，表示靠近或遠離起始點', '橈骨遠端骨折；深靜脈導管尖端位置'],
        ['內側 (Medial) / 外側 (Lateral)', '相對於正中線的位置', '尺骨較橈骨偏內側'],
        ['淺層 (Superficial) / 深層 (Deep)', '描述組織深度', '淺層淋巴結與深部感染的差異'],
      ],
    ),
    h3('常見剖面 (Planes) 與影像閱讀'),
    list([
      '矢狀面 (Sagittal plane)：把身體分成左右。',
      '冠狀面 (Coronal plane)：把身體分成前後。',
      '橫斷面 (Axial / Transverse plane)：把身體分成上下。',
      '影像閱讀時還要注意病人方向、左右標示與切面重建方式。',
    ]),
    callout(
      'clinical',
      '為什麼左右錯誤特別危險？',
      p('臨床的左右不是站在病人對面時看到的左右，而是以病人自身為基準。手術、穿刺、神經學定位與影像判讀都高度依賴這點。'),
    ),
  ),
  section(
    'lab-values-reading',
    '實驗室數值的閱讀邏輯',
    lead('檢驗值的解讀不是「背正常值」。真正重要的是先知道檢驗在測什麼、單位是什麼、採檢條件是什麼、結果落在時間軸的哪一點，以及這個數值是否真的能改變決策。'),
    cards([
      { title: 'Reference Range', body: '通常是健康族群中央 95% 的分布，並不等於每個個體的最佳值。' },
      { title: 'Critical Value', body: '高到或低到可能立即危及安全，必須快速回報與處理。' },
      { title: 'Trend', body: '多數時候趨勢比單點更重要，例如 creatinine、lactate、troponin。' },
      { title: 'Context', body: '採檢時間、輸液狀態、姿勢、藥物與檢驗方法都可能影響結果。' },
    ]),
    formula('判讀血清鈉的提醒', 'serum sodium ≠ total body sodium', '血清鈉主要反映「水相對於鈉的比例」，不是單純體內鈉總量。看到低鈉血症 (Hyponatremia) 不能直接等同於體內缺鈉。'),
    p('同理，肌酸酐 (Creatinine) 不是腎功能本體，而是腎功能的替代指標；血糖也只是某個時間點的結果，HbA1c 才比較接近長期平均暴露。檢驗結果需要與生理意義分開。'),
    callout(
      'warning',
      '不要把「正常」當成「安全」',
      p('例如早期敗血症 (Sepsis) 病人可能白血球仍在正常範圍，但乳酸上升、呼吸快、意識改變；急性出血初期血紅素也可能暫時看起來不低。'),
    ),
  ),
  section(
    'imaging-pathology-drug-info',
    '影像、病理、藥品資訊的基本格式',
    lead('醫療文本有各自的閱讀文法。影像報告常由技術、所見 (Findings) 與印象 (Impression) 組成；病理報告常包含檢體來源、顯微描述、診斷與邊界資訊；藥品資訊則要同時看適應症、劑量、禁忌、交互作用與監測。'),
    table(
      ['文件類型', '常見結構', '閱讀順序建議'],
      [
        ['影像報告', 'Exam / Technique / Findings / Impression', '先看 impression 抓結論，再回到 findings 確認細節與不確定性'],
        ['病理報告', 'Specimen / Gross / Microscopic / Diagnosis', '先看最終診斷，再核對樣本來源與 margin、grade、stage'],
        ['藥品單張 / monograph', 'Indication / Dose / PK / Warnings / ADR / Interaction', '先看是否需要此藥，再看劑量與安全風險'],
      ],
    ),
    p('對初學者來說，最大的困難往往不是讀不懂每個字，而是不知道哪一段最重要。臨床上真正有價值的閱讀，是能迅速抓到「這份報告最會改變決策的資訊」。'),
    callout(
      'info',
      '病理與影像的角色不同',
      p('影像多在回答位置、範圍、密度與結構改變；病理則回答細胞層級的性質。兩者常互補，不可互相取代。'),
    ),
  ),
  section(
    'abbreviations',
    '常見縮寫與錯誤縮寫',
    lead('縮寫能節省時間，但也是醫療錯誤的重要來源。尤其在手寫醫囑、交班與跨專業溝通中，含糊縮寫會直接造成劑量、途徑或左右側錯誤。'),
    table(
      ['縮寫', '意義', '風險'],
      [
        ['bid / tid / qid', '每日 2 / 3 / 4 次', '若字跡不清容易混淆；電子系統多改用完整文字'],
        ['PO / IV / IM / SC', '口服、靜脈、肌肉、皮下', '途徑錯誤會造成明顯傷害'],
        ['PRN', '需要時使用', '若未交代條件與上限，容易被過度或不足使用'],
        ['NPO', '禁食', '需確認是否包含藥物、少量水與特定檢查前時間'],
      ],
    ),
    misconceptionList([
      { myth: '縮寫越多代表越專業。', correction: '真正專業的溝通是讓對方快速且正確理解，不是展示自己熟悉行話。' },
      { myth: '大家都懂的縮寫就安全。', correction: '跨團隊、跨國或跨系統時，原本常見的縮寫可能完全失效。' },
      { myth: '藥名縮寫沒差。', correction: 'LASA drugs（look-alike / sound-alike）與藥名簡寫是用藥錯誤高風險來源。' },
    ]),
    summary('本章總結', '第二章在做的事，是建立一套能跨教材、跨科別、跨報告格式閱讀的醫療文法。', [
      '術語可以拆解，但要留意歷史命名例外。',
      '方位、剖面與單位是安全溝通的底層格式。',
      '檢驗、影像、病理與藥品資訊都要先抓最影響決策的部分。',
    ]),
  ),
  ...closingSections({
    caseTitle: '病例題：低鈉血症報告到底在說什麼？',
    caseStem: '74 歲女性因食慾差與步態不穩住院，檢驗顯示 Na 124 mEq/L、glucose 96 mg/dL、serum osmolality 268 mOsm/kg。護理紀錄提到病人近期使用 thiazide 類利尿劑，家屬則說她「只是沒吃鹽」。',
    caseQuestions: [
      '讀到這份報告時，哪些資訊屬於數值，哪些才是真正需要解釋的臨床問題？',
      '為什麼不能直接把低鈉血症等同於「體內缺鈉」？',
      '若交班時只寫 “Na low, continue observe”，會漏掉什麼？',
    ],
    caseAnalysis: [
      '真正要解釋的是低滲性低鈉血症在什麼容量狀態下發生，以及是否與利尿劑、SIADH、攝取不足或其他病因相關。單一數值只是輸出結果。',
      '血清鈉反映的是水相對於鈉的比例。病人可能總鈉量低、正常或高，但因自由水比例過高而表現為低鈉血症。',
      '會漏掉容量狀態、病因假設、矯正速度與神經學風險。低鈉血症處理的安全關鍵，不只是「補回去」，而是避免矯正過快。',
    ],
    quiz: [
      { question: 'Reference range 與 clinical cutoff 是否相同？', answer: '不一定。Reference range 來自健康族群分布；clinical cutoff 是用來輔助疾病判斷的決策界值。' },
      { question: '病人的左右側應以誰為基準？', answer: '永遠以病人自身解剖姿勢為基準，而不是觀察者視角。' },
      { question: '影像報告通常應先看哪一段抓結論？', answer: '通常先看 impression，再回到 findings 確認細節與不確定性。' },
      { question: 'VUS 代表什麼？', answer: '雖然這是基因領域常見縮寫，但其意義是不確定變異；延伸概念是任何縮寫都要避免脫離上下文。' },
    ],
    glossary: [
      { term: 'Prefix', definition: '醫學術語的字首，常表程度、方向或速度。' },
      { term: 'Suffix', definition: '醫學術語的字尾，常表疾病性質、程序或學科。' },
      { term: 'Sagittal Plane', definition: '將身體分成左右的剖面。' },
      { term: 'Coronal Plane', definition: '將身體分成前後的剖面。' },
      { term: 'Axial Plane', definition: '將身體分成上下的剖面。' },
      { term: 'Reference Range', definition: '健康族群常見值範圍，不等同疾病界值。' },
      { term: 'Critical Value', definition: '可能立即危及病人安全、需即時通報的檢驗值。' },
      { term: 'PRN', definition: '需要時給藥，但必須明確交代條件與頻率上限。' },
    ],
  }),
);

volume1Chapters.ch03 = chapter(
  '細胞、生物膜與訊號傳遞',
  section(
    'cell-structure-function',
    '細胞結構與功能',
    lead('細胞 (Cell) 是疾病與藥物作用的最小動態單位。要理解器官與疾病，必須先知道細胞如何維持邊界、交換物質、製造能量、處理訊號與決定自身命運。'),
    diagram('cell-signaling'),
    cards([
      { title: '細胞膜 (Cell Membrane)', body: '由脂雙層與膜蛋白組成，負責選擇性通透、受體訊號與細胞間互動。' },
      { title: '粒線體 (Mitochondria)', body: '能量工廠，也是凋亡與氧化壓力調控核心。' },
      { title: '內質網 (ER)', body: '粗糙 ER 參與蛋白合成，平滑 ER 參與脂質代謝與解毒。' },
      { title: '溶體 / 自噬體', body: '負責回收與降解受損胞器、吞噬物與大分子。' },
    ]),
    p('膜蛋白有些是通道 (Channel)，允許離子快速依梯度流動；有些是載體 (Carrier)，以構形改變搬運葡萄糖或胺基酸；有些是幫浦 (Pump)，如鈉鉀幫浦 (Na+/K+-ATPase)，需消耗 ATP 逆梯度搬運。這些差異直接影響藥物作用與病理變化。'),
    callout(
      'info',
      '臨床連結',
      p('例如囊狀纖維化 (Cystic Fibrosis) 就與 CFTR 氯離子通道異常有關；心衰竭與腎衰竭中的水腫，又與離子與水分跨膜分布失衡高度相關。'),
    ),
  ),
  section(
    'receptors-second-messengers',
    '受體、第二信使與調控',
    lead('受體 (Receptor) 是藥理學與生理學交會的中心。外界訊號不會直接變成細胞行為，而是先被受體辨識，再透過第二信使 (Second Messenger) 與訊號級聯放大。'),
    table(
      ['受體類型', '典型例子', '反應速度', '臨床意義'],
      [
        ['離子通道受體', 'GABA-A、nicotinic receptor', '毫秒級', '常與神經傳導、麻醉與抗癲癇藥物相關'],
        ['G 蛋白偶聯受體 (GPCR)', 'beta-adrenergic receptor', '秒至分鐘', '是最多藥物靶點的受體家族'],
        ['酪胺酸激酶受體 (RTK)', 'insulin receptor, EGFR', '分鐘至小時', '與生長訊號、癌症標靶治療高度相關'],
        ['核受體 (Nuclear receptor)', 'glucocorticoid receptor', '小時至天', '直接影響基因表現，效應較慢但持久'],
      ],
    ),
    p('第二信使常見有 cAMP、cGMP、IP3、DAG 與鈣離子 (Ca2+)。它們的價值在於把「一個配體結合」放大成「大量蛋白被磷酸化、轉錄改變、離子通道開啟或關閉」。'),
    formula('典型訊號思維', 'ligand -> receptor -> second messenger -> kinase / transcription -> cellular response', '記住這條骨架，比背每條路徑細節更重要。之後遇到藥物與疾病時，只要問它卡在哪一段。'),
    callout(
      'warning',
      '常見誤解',
      p('受體活化不一定等於「刺激」。例如 beta-blocker 是拮抗劑 (Antagonist)，透過阻斷受體來達到治療效果；有些藥則是部分激動劑 (Partial Agonist)，會在不同情境下呈現看似矛盾的行為。'),
    ),
  ),
  section(
    'apoptosis-necrosis-autophagy',
    '細胞凋亡、壞死與自噬',
    lead('細胞死亡不是單一現象，而是多條不同路徑的結果。臨床上最常分辨的是凋亡 (Apoptosis)、壞死 (Necrosis) 與自噬 (Autophagy) 失衡。'),
    cards([
      { title: '凋亡 Apoptosis', body: '程序化、需要能量、常透過 caspase 啟動，細胞膜相對完整，發炎反應較少。' },
      { title: '壞死 Necrosis', body: '多為嚴重缺氧、毒性或外傷造成，細胞腫脹、膜破裂、引發發炎。' },
      { title: '自噬 Autophagy', body: '細胞回收自身受損結構以維持生存，過度或失衡時也可能與疾病有關。' },
      { title: '壞死性凋亡 / pyroptosis', body: '近年重要的新型細胞死亡概念，與感染和發炎疾病相關。' },
    ]),
    p('心肌梗塞 (Myocardial Infarction) 與缺血性腦中風 (Ischemic Stroke) 的急性組織壞死，以壞死為主；化療藥與放射線則常透過 DNA 損傷誘導腫瘤細胞走向凋亡。這些差異會影響檢查、症狀與治療策略。'),
    callout(
      'clinical',
      '藥學連結',
      p('許多抗癌藥、類固醇與免疫治療，都會改變細胞凋亡或存活訊號。若不知道細胞死亡路徑，就很難理解療效與毒性為什麼常來自同一條機制。'),
    ),
  ),
  section(
    'inflammation-repair-origin',
    '發炎與修復的起點',
    lead('發炎 (Inflammation) 不是純粹的破壞，而是組織面對感染、創傷或毒性刺激時，為了控制傷害與啟動修復所發動的協調反應。真正的問題在於反應不足、過度，或反應方向錯了。'),
    p('受損細胞會釋放損傷相關分子模式 (DAMPs)，病原則提供病原相關分子模式 (PAMPs)。這些訊號被先天免疫受體辨識後，會引發血管擴張、通透性改變、白血球招募與細胞激素釋放。'),
    takeawayList([
      { title: '紅、熱、腫、痛、功能障礙', body: '這些經典表現其實都能回扣到血流變化、滲出與介質作用。' },
      { title: '急性與慢性發炎不同', body: '急性發炎以快速控制為主；慢性發炎常帶來組織破壞、重塑與纖維化。' },
      { title: '修復是發炎的後半段', body: '清除刺激後，修復與再生就會接手；若刺激持續存在，修復容易偏向纖維化。' },
    ]),
    summary('本章總結', '第三章把「細胞是怎麼活著、如何溝通、何時死亡」的骨架建立起來。', [
      '細胞膜與胞器是疾病與藥物作用的主舞台。',
      '受體與第二信使決定訊號如何被放大。',
      '凋亡、壞死、自噬與發炎共同構成病理生理的最小事件。',
    ]),
  ),
  ...closingSections({
    caseTitle: '病例題：缺氧、乳酸與細胞命運',
    caseStem: '67 歲男性因敗血性休克住進加護病房，血壓偏低、乳酸上升、尿量下降。醫囑提到「組織灌流不足，須持續追蹤器官功能」。住院醫師想知道這與細胞層級發生了什麼事。',
    caseQuestions: [
      '缺氧會先造成哪些細胞層級變化？',
      '為什麼相同缺氧刺激，在不同組織可能表現為可逆損傷或不可逆壞死？',
      '敗血症中的細胞傷害，為什麼不只是氧氣送不到這麼簡單？',
    ],
    caseAnalysis: [
      '首先是 ATP 下降、離子幫浦失衡、細胞腫脹、乳酸堆積與 pH 下降；若持續下去，粒線體與細胞膜受損會讓傷害走向不可逆。',
      '因為不同組織的代謝需求與耐受時間不同。心肌與神經元對缺氧特別敏感，而部分上皮與結締組織耐受度較高。',
      '敗血症同時牽涉細胞激素、微循環障礙、粒線體功能失調與氧氣利用效率下降，所以灌流恢復後仍可能持續器官功能不良。',
    ],
    quiz: [
      { question: '通道蛋白與載體蛋白最大的差異是什麼？', answer: '通道提供孔道讓分子依梯度快速通過；載體需透過構形改變逐步搬運。' },
      { question: '凋亡與壞死在發炎反應上的主要差異是什麼？', answer: '凋亡通常膜較完整、發炎較少；壞死常伴隨膜破裂與明顯發炎。' },
      { question: '第二信使的核心作用是什麼？', answer: '放大受體訊號並把膜表面事件轉換成細胞內反應。' },
      { question: '自噬一定是壞事嗎？', answer: '不一定。適度自噬常有保護作用，失衡時才可能導致病理結果。' },
    ],
    glossary: [
      { term: 'Cell Membrane', definition: '細胞外內環境分界，負責選擇性通透與受體訊號。' },
      { term: 'Na+/K+-ATPase', definition: '維持離子梯度的重要耗能幫浦。' },
      { term: 'GPCR', definition: 'G 蛋白偶聯受體，臨床藥物最常見靶點之一。' },
      { term: 'Second Messenger', definition: '如 cAMP、IP3、Ca2+，負責訊號放大。' },
      { term: 'Apoptosis', definition: '程序化細胞死亡，較少誘發發炎。' },
      { term: 'Necrosis', definition: '多與嚴重損傷相關的非程序化死亡，常伴發炎。' },
      { term: 'Autophagy', definition: '細胞回收自身成分以維持存活與品質控制的機制。' },
      { term: 'DAMPs', definition: '受損細胞釋放的危險訊號，可啟動發炎。' },
    ],
  }),
);

volume1Chapters.ch04 = chapter(
  '組織學與器官系統基礎',
  section(
    'tissue-types',
    '上皮、結締、肌肉、神經組織',
    lead('組織學 (Histology) 的目的不是背切片圖片，而是把「這塊組織長成這樣」和「它負責什麼功能」連在一起。只要功能對上，很多病理變化就不再像記憶負擔。'),
    diagram('tissue-map'),
    table(
      ['組織類型', '主要功能', '關鍵結構', '臨床觀察重點'],
      [
        ['上皮組織', '保護、吸收、分泌、交換', '極性、緊密連結、基底膜', '癌症多源自上皮；屏障破壞與感染、發炎常相關'],
        ['結締組織', '支撐、連結、儲存與免疫活動', '膠原、彈性纖維、基質、血管', '水腫、纖維化、風濕免疫疾病常涉及此層'],
        ['肌肉組織', '收縮、推進、泵送', '肌絲排列、線粒體、神經支配', '缺血、電解質異常、神經肌肉疾病會影響功能'],
        ['神經組織', '訊號傳導與整合', '神經元、樹突、軸突、膠細胞', '脫髓鞘、缺血與退化性疾病會改變傳導'],
      ],
    ),
    p('四大組織不是獨立存在。腸道絨毛的吸收功能，需要上皮細胞、結締組織血管、平滑肌蠕動與神經調控同時協作。器官病理常常是多種組織一起失衡。'),
  ),
  section(
    'organ-microstructure',
    '器官的微觀結構與功能連結',
    lead('器官由功能單位 (Functional Unit) 組成。當你理解器官最小功能單位在做什麼，就能推回病變出現時，為什麼症狀、檢驗與影像會呈現特定型態。'),
    cards([
      { title: '肺泡 (Alveolus)', body: '單層扁平上皮加上豐富微血管，適合氣體交換；任何間質增厚都會影響氧氣擴散。' },
      { title: '腎小球 (Glomerulus)', body: '過濾屏障由內皮、基底膜與足細胞組成；蛋白尿常反映屏障受損。' },
      { title: '肝小葉 (Liver Lobule)', body: '門靜脈、肝動脈與膽小管形成方向性流動，毒性與缺血損傷分布並不均一。' },
      { title: '腸絨毛與腸隱窩', body: '絨毛增加吸收面積，隱窩負責增殖更新；腹瀉與吸收不良會改變兩者比例。' },
    ]),
    p('這種「結構決定功能」的觀點，對藥學同樣重要。肺部吸入藥要到達支氣管與肺泡；腎毒性藥物常在近曲小管表現明顯；腫瘤血管異常則會影響藥物穿透與氧氣供應。'),
    callout(
      'info',
      '思考方式',
      p('遇到一個器官時，先問：一、它最小功能單位是什麼？二、主要交換或訊號在哪裡進行？三、哪種損傷最可能先破壞這個功能？'),
    ),
  ),
  section(
    'normal-vs-abnormal-histology',
    '正常與異常的組織學比較',
    lead('病理學不是「一堆怪圖」，而是從正常結構偏離後的模式學。判讀異常前，必須先知道正常切片應該長什麼樣子，否則無法分辨哪些變化是疾病，哪些只是生理差異或切片假象。'),
    misconceptionList([
      { myth: '看起來亂就是癌。', correction: '發炎、修復與反應性增生也可能讓組織顯得擁擠或核變大，但是否突破基底膜、是否有異型性與不正常分裂更關鍵。' },
      { myth: '異型增生 (Dysplasia) 一定已經是癌。', correction: 'Dysplasia 是癌前或高度危險變化，但不等於所有細胞都已具侵襲能力。' },
      { myth: '化生 (Metaplasia) 是好事，代表適應成功。', correction: '化生雖是適應，但長期刺激下也可能提高癌變風險，例如 Barrett esophagus。' },
    ]),
    p('切片判讀常會看細胞排列、核大小與染色深淺、核分裂、結構層次是否保留，以及周邊基質與炎性細胞浸潤。這些資訊加總後，才能判斷是可逆反應、發炎、癌前變化，還是惡性腫瘤。'),
    summary('本章總結', '第四章的目標，是讓你能把器官的微觀樣貌與臨床功能問題對起來。', [
      '四大組織是器官結構的共同元件。',
      '功能單位是最有效的器官學習切入點。',
      '異常組織學的判讀，永遠要回到正常結構做比較。',
    ]),
  ),
  ...closingSections({
    caseTitle: '病例題：病理報告中的「異型增生」',
    caseStem: '52 歲男性因慢性胃食道逆流接受內視鏡切片，病理報告寫著 intestinal metaplasia with low-grade dysplasia。病人以為自己已經得癌症，家屬則認為既然只是「發炎變化」就不需追蹤。',
    caseQuestions: [
      '化生、異型增生與侵襲性癌症之間的關係應如何解釋？',
      '為什麼病理判讀一定要先知道正常組織長相？',
      '這份報告最重要的臨床訊息是什麼？',
    ],
    caseAnalysis: [
      '化生是成熟細胞型態轉換；異型增生表示細胞排列與核形態已出現癌前危險訊號；侵襲性癌則代表已突破基底膜並具侵襲能力。三者不相同。',
      '若不知道正常上皮層次、核大小與極性，就無法分辨哪些是病理性偏離，哪些只是切片角度與反應性變化。',
      '最重要的是病人已有癌前風險，需要針對逆流控制、危險因子處理與後續監測，而不是把報告粗略歸為「有癌」或「沒事」。',
    ],
    quiz: [
      { question: '哪四大類組織構成人體器官？', answer: '上皮、結締、肌肉、神經組織。' },
      { question: '器官最小功能單位的概念為何重要？', answer: '它能把微觀結構直接連到臨床功能與病理變化。' },
      { question: 'Dysplasia 是否等於 cancer？', answer: '不是。它是高危險異常增生，但尚不等於已具侵襲性的癌。' },
      { question: '蛋白尿常反映哪個功能單位受損？', answer: '腎小球過濾屏障，包括內皮、基底膜與足細胞。' },
    ],
    glossary: [
      { term: 'Epithelium', definition: '覆蓋與襯裡器官表面的組織，負責屏障、分泌與吸收。' },
      { term: 'Connective Tissue', definition: '提供支撐、基質與血管通路的組織。' },
      { term: 'Basement Membrane', definition: '上皮與下方組織之間的重要支撐與邊界結構。' },
      { term: 'Functional Unit', definition: '器官執行核心功能的最小結構單位。' },
      { term: 'Metaplasia', definition: '成熟細胞轉為另一種成熟細胞的適應性改變。' },
      { term: 'Dysplasia', definition: '細胞排列與核形態異常，屬癌前高風險變化。' },
      { term: 'Invasion', definition: '腫瘤突破原本邊界、浸潤周圍組織的能力。' },
      { term: 'Histology', definition: '在顯微層級研究組織結構與功能的學科。' },
    ],
  }),
);

volume1Chapters.ch05 = chapter(
  '人體生理學總論',
  section(
    'homeostasis-feedback',
    '恆定性與調節迴路',
    lead('生理學 (Physiology) 的核心任務，是說明人體如何在外界不斷變動下，仍把關鍵變項維持在可容忍範圍。這個動態平衡稱為恆定性 (Homeostasis)。'),
    diagram('homeostasis-loop'),
    p('恆定性不是絕對固定，而是有範圍、有速度、有代價的調節。例如發燒時體溫上升不是恆定性失敗，而是下視丘設定點 (Set Point) 被重新定義；運動時心跳上升也不是失衡，而是為了維持氧供的必要調整。'),
    cards([
      { title: '感受器 (Sensor)', body: '負責偵測變項改變，例如頸動脈竇感受血壓，胰島 beta 細胞感受血糖。' },
      { title: '整合中心 (Integrator)', body: '把訊號與目標值比較，決定是否啟動補償。' },
      { title: '效應器 (Effector)', body: '真正執行改變，例如血管收縮、分泌激素、改變呼吸速率。' },
      { title: '回饋 (Feedback)', body: '負回饋最常見；正回饋通常只在需要快速放大反應時出現。' },
    ]),
    callout(
      'warning',
      '代償不等於恢復正常',
      p('一位心衰竭病人可能靠交感神經與 RAAS 活化暫時維持血壓，但同時也加重心臟負擔與液體滯留。生理補償短期有利，長期可能變成病理機轉。'),
    ),
  ),
  section(
    'fluid-electrolyte-acid-base',
    '體液、電解質與酸鹼平衡',
    lead('體液學看似複雜，是因為它同時牽涉水、鈉、滲透壓、容積、腎臟、內分泌與呼吸系統。學習時若只背「低鈉怎麼辦」很快會卡住，應該先分清楚每個變項到底代表什麼。'),
    table(
      ['概念', '實際意義', '臨床提醒'],
      [
        ['血清鈉', '反映血中水相對於鈉的比例', '低鈉血症不一定代表體內缺鈉，先問容量狀態與滲透壓'],
        ['滲透壓 (Osmolality)', '決定水分跨膜移動方向', '高血糖與高尿素會改變計算與解讀'],
        ['有效循環血量 (Effective Circulating Volume)', '組織灌流端真正感受到的容積', '心衰竭與肝硬化可能總水分多，但有效灌流仍不足'],
        ['酸鹼平衡', 'H+ 產生、緩衝、肺排 CO2、腎排酸與回收 HCO3-', '不要跳過代償判斷與混合性失衡'],
      ],
    ),
    formula('陰離子間隙 (Anion Gap)', 'AG = Na+ - (Cl- + HCO3-)', '高陰離子間隙代謝性酸中毒常見於乳酸、酮酸、中毒與腎衰竭，但一定要記得 albumin 校正概念。'),
    p('臨床上最常見的錯誤，是把低鈉、低鉀或酸中毒當成「單一檢驗異常」，而忽略這是整個生理調節系統的輸出訊號。只補數值而不處理病因，往往會復發或加重。'),
    callout(
      'clinical',
      '藥學連結',
      p('利尿劑、ACE inhibitor、ARB、類固醇、瀉藥、胰島素與輸液本身，都可能改變體液與酸鹼狀態。用藥評估時，電解質是高頻必看項目。'),
    ),
  ),
  section(
    'neuroendocrine-integration',
    '神經與內分泌整合',
    lead('人體調節不靠單一路徑。神經系統擅長快速、短時程、精準定位的調節；內分泌系統則擅長較慢、較廣泛、較持久的全身訊號。真正的生理調節通常是兩者疊加。'),
    cards([
      { title: '交感與副交感', body: '負責快速調整心跳、血管張力、腸胃活動、瞳孔與腺體分泌。' },
      { title: '下視丘-腦下垂體軸', body: '把神經訊號轉為內分泌節律，是壓力、甲狀腺、生殖與腎上腺調節中心。' },
      { title: '局部激素與旁分泌', body: '例如前列腺素、NO 與細胞激素，常在局部微環境直接影響組織反應。' },
      { title: '晝夜節律', body: '皮質醇、血壓、體溫與睡眠週期都受 circadian rhythm 調控。' },
    ]),
    p('例如出血性休克時，幾秒內靠交感神經提升心跳與周邊血管收縮；幾分鐘到幾小時內，則由 RAAS、ADH 與腎素-醛固酮系統幫忙維持容積與血壓。這就是典型的神經與內分泌共同調節。'),
    callout(
      'warning',
      '容易被忽略的概念',
      p('同一個激素的效果，取決於濃度、受體密度、受體敏感性與目標器官狀態。不是「有分泌」就等於「一定有效」。在重症、慢性發炎或長期用藥時尤其明顯。'),
    ),
  ),
  section(
    'aging-physiology',
    '老化對生理的影響',
    lead('老化 (Aging) 不是單一疾病，而是多器官儲備能力逐漸下降的結果。老年人不一定有病，但在壓力來臨時，能夠維持恆定性的空間明顯變小。'),
    takeawayList([
      { title: '腎功能', body: 'GFR 隨年齡下降，藥物清除能力減弱；單看血清 creatinine 可能低估風險。' },
      { title: '體液調節', body: '口渴感下降、腎臟濃縮與稀釋能力變差，較容易脫水與電解質異常。' },
      { title: '心血管反應', body: '壓力下心率與血壓調節較慢，姿勢性低血壓較常見。' },
      { title: '神經與內分泌', body: '睡眠節律、食慾、體溫調節與藥物敏感度都會改變。' },
    ]),
    p('因此，老年病人的「正常」範圍常與年輕人不同，但這不表示可以放寬判斷。相反地，老化讓病人更需要個別化目標、較慢的調整速度，以及更嚴密的監測。'),
    summary('本章總結', '第五章的核心，是把人體看成多個變項彼此牽動的調節系統。', [
      '恆定性是動態範圍，不是固定數字。',
      '體液、電解質與酸鹼是多系統共同維持的結果。',
      '神經、內分泌與老化會改變同一刺激的生理反應。',
    ]),
  ),
  ...closingSections({
    caseTitle: '病例題：老年病人的姿勢性低血壓與低鈉',
    caseStem: '82 歲男性因反覆跌倒住院。坐姿血壓 138/76 mmHg，站立 3 分鐘後降為 104/60 mmHg；血清鈉 129 mEq/L。病人使用利尿劑與 alpha-blocker，平時口渴感差。團隊懷疑是多重因素導致恆定性維持失敗。',
    caseQuestions: [
      '這個案例反映哪些恆定性調節能力下降？',
      '血壓與血清鈉問題分別牽涉哪些生理系統？',
      '為什麼老年病人看似輕微的變化，臨床後果卻可能很大？',
    ],
    caseAnalysis: [
      '病人同時有壓力下血壓調節變慢、口渴感下降、腎臟調節體液能力變差，外加用藥影響，導致跌倒與低鈉。',
      '姿勢性低血壓牽涉自律神經、血管反應與有效循環血量；低鈉則牽涉水分比例、腎臟、ADH 與用藥效應。',
      '因為老年人的生理儲備較低，代償空間小，所以輕度脫水、感染或藥物調整都可能迅速造成功能失衡。',
    ],
    quiz: [
      { question: '負回饋在生理中的核心功能是什麼？', answer: '當變項偏離設定範圍時，啟動機制把它拉回可接受區間。' },
      { question: '血清鈉主要反映什麼？', answer: '水相對於鈉的比例，而非體內鈉總量本身。' },
      { question: '酸鹼平衡中 PaCO2 主要代表哪一端？', answer: '呼吸調節端。' },
      { question: '老化後 creatinine 正常就代表腎功能正常嗎？', answer: '不一定，因肌肉量下降可能讓 creatinine 看似正常而掩蓋 GFR 下降。' },
    ],
    glossary: [
      { term: 'Homeostasis', definition: '人體維持內部環境穩定的動態調節機制。' },
      { term: 'Set Point', definition: '生理系統目標範圍的參考值，可隨情境調整。' },
      { term: 'Effective Circulating Volume', definition: '組織灌流真正感受到的有效循環血量。' },
      { term: 'Osmolality', definition: '溶液中有效粒子濃度，決定水分跨膜移動。' },
      { term: 'Anion Gap', definition: '用於分析代謝性酸中毒型態的計算值。' },
      { term: 'RAAS', definition: '腎素-血管張力素-醛固酮系統，參與血壓與體液調節。' },
      { term: 'ADH', definition: '抗利尿激素，調節腎臟保水與滲透壓平衡。' },
      { term: 'Physiologic Reserve', definition: '器官在壓力下額外動員的功能空間，老化時常下降。' },
    ],
  }),
);

volume1Chapters.ch06 = chapter(
  '病理學總論',
  section(
    'cell-injury-adaptation',
    '細胞損傷與適應',
    lead('病理學總論的第一個問題，是細胞面對壓力時會先做什麼。答案通常不是立刻死亡，而是先適應。只有當刺激過強、過久，或細胞本身儲備太差時，才會從可逆改變走向不可逆損傷。'),
    diagram('pathology-core'),
    table(
      ['現象', '定義', '常見原因', '可逆性'],
      [
        ['萎縮 (Atrophy)', '細胞體積與器官體積縮小', '失用、去神經、缺血、營養不足', '多數可部分逆轉'],
        ['肥大 (Hypertrophy)', '細胞變大', '高負荷、激素刺激', '部分可逆，但長期可能進展為病理重塑'],
        ['增生 (Hyperplasia)', '細胞數增加', '生理需求增加或激素刺激', '通常可逆，部分情境與癌前變化相關'],
        ['化生 (Metaplasia)', '成熟細胞轉為另一型成熟細胞', '慢性刺激，如吸菸或胃酸逆流', '可逆，但若持續刺激可能進展為 dysplasia'],
      ],
    ),
    p('缺氧 (Hypoxia) 是細胞傷害的高頻核心。它會先造成 ATP 下降，繼而影響離子幫浦、細胞腫脹、乳酸堆積與 pH 改變。若時間夠短，細胞可能恢復；若持續存在，就會發生膜破裂、粒線體失能與壞死。'),
    callout(
      'warning',
      '常見誤解',
      p('可逆與不可逆損傷不是由單一時間點決定，而是取決於組織類型、缺血程度、是否再灌流，以及病人原本儲備能力。神經元與心肌對缺氧就特別敏感。'),
    ),
  ),
  section(
    'acute-chronic-inflammation',
    '急性與慢性發炎',
    lead('發炎的目的，是把危險限制在局部並啟動修復。急性發炎 (Acute Inflammation) 反應快、以中性球為主；慢性發炎 (Chronic Inflammation) 時間長，常見巨噬細胞、淋巴球、纖維化與組織重塑。'),
    cards([
      { title: '急性發炎', body: '血管擴張、通透性增加、白血球滾動與移行，臨床上常見紅、熱、腫、痛。' },
      { title: '慢性發炎', body: '刺激持續存在時，免疫細胞與修復反應交織，造成破壞與纖維化。' },
      { title: '介質', body: '組織胺、前列腺素、白三烯、補體、細胞激素與趨化因子共同編排反應。' },
      { title: '肉芽腫', body: '是特殊型慢性發炎，常見於結核病、結節病與某些異物反應。' },
    ]),
    p('臨床上很多疾病不是單純「發炎太多」而已，而是發炎時機與方向不對。例如感染時的適當發炎有助於清除病原；自體免疫疾病則是對自身抗原發炎；敗血症則是失控的全身性炎症與循環失衡。'),
    callout(
      'clinical',
      '藥物如何介入？',
      p('NSAIDs 抑制前列腺素生成，類固醇廣泛抑制多條炎症訊號，免疫抑制劑則鎖定淋巴球或細胞激素。不同藥物不是「強弱差異」，而是切進發炎網路的層級不同。'),
    ),
  ),
  section(
    'repair-fibrosis-regeneration',
    '修復、纖維化與再生',
    lead('組織修復的結果主要有兩種：再生 (Regeneration) 或瘢痕 / 纖維化 (Scar / Fibrosis)。哪一條路佔上風，取決於細胞能否再分裂、基底膜是否保留，以及刺激有沒有被真正移除。'),
    p('肝臟在適當條件下具有良好再生能力；心肌與中樞神經則明顯較差，因此大範圍損傷後更容易留下永久性瘢痕。纖維化本質上是修復的一種，但若過度就會成為器官功能障礙本身的來源。'),
    formula('纖維化核心邏輯', 'persistent injury -> macrophage / TGF-beta activation -> fibroblast activation -> collagen deposition', '看懂這條路徑，就能理解慢性肝病、肺纖維化、腎硬化與心肌重塑的共通性。'),
    misconceptionList([
      { myth: '發炎消退後，組織自然會回到原狀。', correction: '若細胞已喪失再生能力，或基質結構被破壞，即使刺激消失也可能留下永久性瘢痕。' },
      { myth: '纖維化只是影像變化。', correction: '纖維化會直接改變器官彈性、灌流、氣體交換與電傳導，是病理與功能問題。' },
    ]),
  ),
  section(
    'immune-imbalance-tissue-injury',
    '免疫失衡與組織傷害',
    lead('免疫系統的任務是辨識「自己 vs 非自己」與「危險 vs 無害」。當辨識錯誤、反應過強、反應持續太久，或關不下來時，免疫系統本身就會成為組織傷害來源。'),
    p('這種傷害可以來自抗體、補體、免疫複合體、T 細胞毒性或細胞激素暴衝。臨床上從氣喘、紅斑性狼瘡、血管炎、藥物過敏到移植排斥，都屬於免疫失衡造成的器官損害。'),
    callout(
      'danger',
      '病理學最重要的通則之一',
      p('很多疾病最後表現很像，因為不同病因會匯流到相似的病理終點，例如發炎、缺血、細胞死亡與纖維化。病理學的價值，在於幫你看見這些共通路徑。'),
    ),
    summary('本章總結', '第六章把病理學總論的通用骨架建立起來，後續所有疾病章節都會反覆使用。', [
      '細胞會先適應，再進入傷害。',
      '發炎、修復與纖維化彼此緊密相連。',
      '免疫失衡是組織傷害的重要來源，不只是防禦失敗。',
    ]),
  ),
  ...closingSections({
    caseTitle: '病例題：慢性肝病為何最後走向纖維化？',
    caseStem: '49 歲男性有多年 B 型肝炎，近年追蹤顯示肝功能波動、超音波出現肝硬化變化。病人問：「病毒量有時不高，為什麼肝臟還是越來越硬？」',
    caseQuestions: [
      '慢性刺激如何讓修復反應從再生轉向纖維化？',
      '急性發炎與慢性發炎在細胞組成與後果上有何差異？',
      '肝硬化為什麼不只是影像上的形容詞，而是真正的功能病理？',
    ],
    caseAnalysis: [
      '持續性傷害會反覆活化巨噬細胞與成纖維細胞相關訊號，尤其 TGF-beta，導致膠原沉積超過正常修復需要。',
      '急性發炎較偏向快速控制與中性球主導；慢性發炎則牽涉巨噬細胞、淋巴球、組織破壞與重塑，容易導向纖維化。',
      '肝硬化會改變血流、解毒、合成與門脈壓力，是器官功能與結構一起失衡的結果。',
    ],
    quiz: [
      { question: '化生與增生的差異是什麼？', answer: '化生是細胞型態轉換；增生是細胞數量增加。' },
      { question: '慢性發炎常見哪些細胞？', answer: '巨噬細胞、淋巴球與漿細胞較常見。' },
      { question: '纖維化的主要效果細胞是哪一類？', answer: '成纖維細胞及其活化型態。' },
      { question: '免疫失衡造成傷害時，是否一定有感染？', answer: '不一定。自體免疫與過敏性疾病都可能在無感染下造成組織損傷。' },
    ],
    glossary: [
      { term: 'Atrophy', definition: '細胞與器官體積縮小的適應性改變。' },
      { term: 'Hypertrophy', definition: '細胞體積增加，常見於高負荷狀態。' },
      { term: 'Hyperplasia', definition: '細胞數量增加。' },
      { term: 'Acute Inflammation', definition: '快速發動的發炎反應，常以中性球為主。' },
      { term: 'Chronic Inflammation', definition: '長時間持續的發炎與修復交織狀態。' },
      { term: 'Fibrosis', definition: '過度膠原沉積造成組織硬化與功能受損。' },
      { term: 'TGF-beta', definition: '促進成纖維細胞活化與纖維化的重要細胞激素。' },
      { term: 'Granuloma', definition: '特殊型慢性發炎結構，常見於結核與異物反應。' },
    ],
  }),
);

volume1Chapters.ch07 = chapter(
  '微生物與感染',
  section(
    'microbiology-basics',
    '細菌、病毒、真菌、寄生蟲基礎',
    lead('感染學的起點，是理解病原體不是同一種東西。細菌 (Bacteria)、病毒 (Virus)、真菌 (Fungi) 與寄生蟲 (Parasite) 在結構、複製方式、檢查與治療靶點上差異極大。'),
    diagram('microbe-host'),
    table(
      ['病原類別', '結構特徵', '複製方式', '治療邏輯'],
      [
        ['細菌', '原核生物，有細胞壁與核糖體', '可自行分裂', '可針對細胞壁、蛋白合成、DNA 複製等下手'],
        ['病毒', '無完整細胞結構，依賴宿主細胞', '借用宿主機器製造病毒成分', '治療多針對進入、複製、組裝或釋放階段'],
        ['真菌', '真核生物，細胞膜含 ergosterol', '可酵母樣分裂或形成菌絲', '治療常針對細胞膜、細胞壁或微管'],
        ['寄生蟲', '從原蟲到蠕蟲，生命史複雜', '常有宿主與環境階段', '治療需考慮生活史與器官分布'],
      ],
    ),
    p('這些差異解釋了為什麼抗生素不能治療流感，為什麼抗真菌藥常較難使用，為什麼寄生蟲病要問旅行、飲食與動物暴露史。病原體的生物學，就是臨床問題的一部分。'),
    callout(
      'warning',
      '不要把所有感染都想成「有沒有細菌」',
      p('感染是病原體、宿主與環境互動的結果；即使是同一病原體，在不同宿主身上也可能只造成定植、輕症、侵襲性感染或免疫後併發症。'),
    ),
  ),
  section(
    'infection-mechanism',
    '感染如何發生與擴散',
    lead('感染成立需要幾個條件：病原體得進入宿主、有能力附著與增殖、能躲過或抵抗宿主防禦，並造成足夠組織損傷或炎症反應。這整條鏈結任何一環被阻斷，都可能避免疾病。'),
    list([
      '接觸途徑：飛沫、空氣、血液、糞口、性接觸、向量、醫療器材。',
      '入口：呼吸道、腸胃道、泌尿生殖道、皮膚破口、血流。',
      '宿主因素：年齡、免疫狀態、共病、植入物、營養與腸道菌相。',
      '病原因素：毒力因子 (Virulence Factors)、生物膜 (Biofilm)、產毒能力、接種量。'
    ]),
    p('臨床上要特別區分 colonization 與 infection。前者是病原體存在，但沒有造成疾病；後者才是病原體與宿主互動後出現組織損傷或症狀。這個區分直接決定是否該用抗微生物藥物。'),
    cards([
      { title: '社區感染', body: '暴露與菌種分布通常不同於院內感染，抗藥性模式也不同。' },
      { title: '醫療照護相關感染', body: '導管、插管、手術與長期住院都會改變菌種與耐藥風險。' },
      { title: '生物膜 (Biofilm)', body: '讓細菌在器材表面形成保護層，提高持續感染與抗藥性風險。' },
      { title: '菌血症 vs 敗血症', body: 'bacteremia 是血液中有菌；sepsis 是感染引發器官功能失調，兩者不等同。' },
    ]),
  ),
  section(
    'host-defense-immunity',
    '宿主防禦與免疫',
    lead('宿主防禦不是只有白血球。皮膚、黏膜、胃酸、纖毛、咳嗽反射、正常菌叢、補體、吞噬細胞與抗體，全都屬於多層次防線。感染嚴重度往往取決於哪一道防線失守。'),
    p('例如脾臟切除病人對莢膜菌 (Encapsulated Bacteria) 特別脆弱；中性球低下病人容易出現侵襲性黴菌感染；HIV 病人則在 CD4 降低後面臨機會性感染風險。感染病原體種類與免疫缺陷型態高度相關。'),
    callout(
      'clinical',
      '感染史的價值',
      p('反覆感染的部位、病原體與年齡層，常直接提示哪一段防禦出了問題。反覆鼻竇與肺部感染要想抗體缺陷；反覆深部膿瘍要想吞噬功能問題。'),
    ),
  ),
  section(
    'antimicrobial-resistance',
    '抗藥性與臨床意義',
    lead('抗藥性 (Antimicrobial Resistance) 是演化問題，不是單純藥物效果不好。只要有選擇壓力，微生物就可能透過突變、基因轉移、酵素分解、標的改變、efflux pump 或通透性降低來存活。'),
    table(
      ['機轉', '例子', '臨床影響'],
      [
        ['酵素分解', 'beta-lactamase、carbapenemase', '使 beta-lactam 類藥物失效'],
        ['靶點改變', 'PBP 改變、ribosome 修飾', '藥物無法有效結合目標'],
        ['通透性下降', '外膜孔道減少', '藥物進不去細胞'],
        ['主動外排', 'efflux pump', '多類藥物濃度不足，常造成多重抗藥'],
      ],
    ),
    misconceptionList([
      { myth: '培養長出細菌就一定要治療。', correction: '需先判斷是污染、定植還是真正感染，再結合感染部位與宿主狀態。' },
      { myth: '抗生素開越廣越安全。', correction: '過廣治療會增加抗藥性、C. difficile 風險與藥害，也可能掩蓋真正病因。' },
      { myth: '藥敏結果顯示 sensitive 就一定有效。', correction: '還要看藥物能否到達感染部位、宿主免疫狀態與病灶是否需引流。' },
    ]),
    summary('本章總結', '第七章的關鍵，在於用病原體、宿主與治療壓力三個角度一起看感染。', [
      '不同病原體的結構決定不同治療靶點。',
      '定植與感染必須分清。',
      '抗藥性是生物學與臨床選擇壓力的共同結果。',
    ]),
  ),
  ...closingSections({
    caseTitle: '病例題：尿液培養有菌，該不該治療？',
    caseStem: '79 歲安養機構住民因食慾差送醫，尿液培養長出大腸桿菌，病人沒有尿痛、頻尿或發燒，僅有輕度失智與慢性導尿史。值班醫師想直接開廣效抗生素。',
    caseQuestions: [
      '這是感染還是定植的可能性較高？',
      '在決定是否治療前，應再補哪些臨床資訊？',
      '若不加區分就給抗生素，可能造成哪些後果？',
    ],
    caseAnalysis: [
      '在長期導尿與安養機構病人身上，無症狀菌尿與定植很常見。沒有相符症狀與系統性證據時，不能只因培養有菌就定義為感染。',
      '需要釐清是否有局部泌尿症狀、發燒、血流感染跡象、影像或其他感染來源，並確認食慾差是否可能來自其他原因。',
      '不必要抗生素會增加抗藥性、藥害、C. difficile 感染與後續真正感染時的治療困難。',
    ],
    quiz: [
      { question: '病毒與細菌在複製方式上最大的差異是什麼？', answer: '病毒需依賴宿主細胞機器；細菌可自行分裂複製。' },
      { question: 'Colonization 與 infection 的差異為何？', answer: 'Colonization 是病原存在但未造成疾病；infection 則已造成宿主損傷或症狀。' },
      { question: 'Biofilm 為什麼重要？', answer: '它讓病原附著於器材表面並增加持續感染與抗藥性風險。' },
      { question: '藥敏報告顯示 sensitive 是否代表一定要用該藥？', answer: '不一定，仍需考慮感染部位、藥物穿透、病人狀態與整體治療策略。' },
    ],
    glossary: [
      { term: 'Virulence Factor', definition: '增加病原致病能力的分子或結構。' },
      { term: 'Colonization', definition: '病原存在但未造成宿主疾病的狀態。' },
      { term: 'Biofilm', definition: '病原附著表面後形成的保護性群聚結構。' },
      { term: 'Bacteremia', definition: '血液中有細菌存在。' },
      { term: 'Sepsis', definition: '感染引發宿主失調反應，造成器官功能失調。' },
      { term: 'Antimicrobial Stewardship', definition: '以最適當方式使用抗微生物藥物，兼顧病人效益與抗藥性控制。' },
      { term: 'Efflux Pump', definition: '將藥物主動排出微生物細胞外的抗藥性機制。' },
      { term: 'Encapsulated Bacteria', definition: '具莢膜、較易逃避免疫吞噬的細菌。' },
    ],
  }),
);

volume1Chapters.ch08 = chapter(
  '免疫學',
  section(
    'innate-immunity',
    '先天免疫 (Innate Immunity)',
    lead('先天免疫是人體面對危險的第一層快速反應，特徵是反應快、專一性較低，但模式辨識能力強。它不需要先學習病原體，就能對常見危險訊號做出反應。'),
    diagram('immune-network'),
    cards([
      { title: '物理與化學屏障', body: '皮膚、黏膜、胃酸、膽汁、黏液與纖毛，目的是不讓病原體輕易進入。' },
      { title: '模式辨識受體 (PRRs)', body: '如 TLRs、NLRs，用來辨識 PAMPs 與 DAMPs。' },
      { title: '吞噬與殺傷', body: '嗜中性球、巨噬細胞與 NK 細胞負責快速清除受感染或異常細胞。' },
      { title: '補體系統', body: '參與調理作用、趨化、細胞裂解與炎症放大。' },
    ]),
    p('先天免疫的價值不只在直接攻擊病原，還在「決定後天免疫接下來怎麼走」。APC 釋放哪些細胞激素、表達哪些共刺激訊號，會影響 T 細胞分化方向。'),
    callout(
      'info',
      '常見臨床例子',
      p('敗血症、急性發炎、發燒、CRP 上升與中性球增加，都屬於先天免疫高度參與的情境。'),
    ),
  ),
  section(
    'adaptive-immunity',
    '後天免疫 (Adaptive Immunity)',
    lead('後天免疫 (Adaptive Immunity) 的特徵是專一性與記憶。它需要抗原呈現與活化時間，但一旦建立完成，就能更精準地清除病原並留下長期保護。'),
    table(
      ['元件', '核心功能', '臨床意義'],
      [
        ['樹突細胞 / APC', '把抗原加工後呈現在 MHC 上', '是先天免疫與後天免疫的橋梁'],
        ['CD4 T 細胞', '調節免疫方向，幫助 B 細胞與巨噬細胞', 'HIV 對這一層影響重大'],
        ['CD8 T 細胞', '直接殺傷被感染或腫瘤化細胞', '對病毒感染與腫瘤免疫重要'],
        ['B 細胞 / 抗體', '產生抗體、調理病原、活化補體、形成記憶', '疫苗效應多與此有關'],
      ],
    ),
    p('MHC I 幾乎存在於所有有核細胞，主要把內源性抗原呈給 CD8 T 細胞；MHC II 則在專職 APC 表達，把外源性抗原呈給 CD4 T 細胞。這是很多免疫疾病與移植免疫理解的基礎。'),
    callout(
      'warning',
      '常見誤解',
      p('抗體不是後天免疫的全部。許多病毒、腫瘤與細胞內病原控制，更依賴 T 細胞免疫。只看抗體高低，有時會漏掉真正重要的免疫問題。'),
    ),
  ),
  section(
    'allergy-autoimmune-immunodeficiency',
    '過敏、自體免疫、免疫缺陷',
    lead('免疫疾病可以粗分成三類：反應太多、反應錯方向、反應不夠。過敏是對原本不該有害的抗原反應過強；自體免疫是把自己當敵人；免疫缺陷則是無法有效防禦。'),
    cards([
      { title: '過敏 (Allergy)', body: '最常見是第一型超敏反應，IgE 與肥大細胞是關鍵角色。' },
      { title: '自體免疫 (Autoimmunity)', body: '失去免疫耐受，可能是器官特異或全身性疾病。' },
      { title: '免疫缺陷 (Immunodeficiency)', body: '可為原發性或繼發性，表現常為反覆、特殊或嚴重感染。' },
      { title: '免疫失衡', body: '近年愈來愈重視炎症過強、慢性低度發炎與免疫老化。' },
    ]),
    misconceptionList([
      { myth: '過敏就是免疫力太強。', correction: '它是錯向與過度的反應，不代表整體防禦能力更好。' },
      { myth: '自體免疫疾病一定都有陽性抗體。', correction: '部分疾病抗體不明顯，或抗體只是輔助資訊，仍需結合臨床表現與器官證據。' },
      { myth: '免疫缺陷只會發生在小孩。', correction: '癌症治療、器官移植、HIV、糖尿病、肝腎衰竭與高齡都會造成後天免疫缺陷。' },
    ]),
  ),
  section(
    'immunotherapy-concepts',
    '免疫治療概念',
    lead('免疫治療 (Immunotherapy) 不是單一藥物類型，而是一整類重新調整免疫反應方向與強度的治療策略。它可用於癌症、自體免疫、移植與感染後併發症。'),
    p('癌症中的免疫檢查點抑制劑 (Checkpoint Inhibitor) 透過解除 T 細胞煞車來增強抗腫瘤效果；生物製劑則可阻斷 TNF-alpha、IL-6 或 IL-17 等細胞激素來治療發炎性疾病；細胞治療如 CAR-T 則進一步把免疫細胞改造成具有特定靶向能力。'),
    callout(
      'danger',
      '免疫治療不是只有「增強免疫」',
      p('有些情境需要抑制免疫，有些需要重新導向免疫，有些需要解除抑制。若只把免疫治療理解成補強防禦，很容易誤判副作用與適應症。'),
    ),
    summary('本章總結', '第八章的重點，在於把免疫系統看成一個需要精細平衡的網路。', [
      '先天免疫快，後天免疫準。',
      '過敏、自體免疫與免疫缺陷分別代表不同型態的失衡。',
      '免疫治療本質上是重新配置免疫反應，而不是單向加強。',
    ]),
  ),
  ...closingSections({
    caseTitle: '病例題：使用免疫檢查點抑制劑後的腹瀉',
    caseStem: '62 歲肺癌病人使用 PD-1 inhibitor 後兩週出現腹瀉、腹痛與輕微肝指數上升。感染檢查暫未證實。病人問：「不是在增強免疫對付癌症嗎？怎麼會攻擊我自己？」',
    caseQuestions: [
      '這個案例最可能反映哪一類免疫治療副作用？',
      '為什麼免疫治療既能抗腫瘤，又可能造成器官毒性？',
      '這與典型感染性腹瀉在思考邏輯上有何不同？',
    ],
    caseAnalysis: [
      '這很符合 immune-related adverse event 的思考方向，尤其是 checkpoint inhibitor 解除免疫抑制後，T 細胞也可能攻擊正常組織。',
      '癌細胞與正常組織共享部分抗原環境，加上免疫煞車被放鬆，會讓原本被壓住的自體反應顯現。',
      '感染性腹瀉先問病原；免疫治療相關腹瀉則要同時排除感染並考慮免疫失衡導致的腸炎與肝炎。',
    ],
    quiz: [
      { question: '先天免疫與後天免疫最大的功能差異是什麼？', answer: '先天免疫反應快且模式辨識為主；後天免疫較專一並具有免疫記憶。' },
      { question: 'MHC II 主要呈現給哪類細胞？', answer: 'CD4 T 細胞。' },
      { question: '過敏是否代表免疫力較強？', answer: '不是。它代表對無害抗原的錯向且過度反應。' },
      { question: 'Checkpoint inhibitor 的核心作用是什麼？', answer: '解除 T 細胞上的抑制訊號，增強抗腫瘤免疫反應。' },
    ],
    glossary: [
      { term: 'Innate Immunity', definition: '快速、非專一性的第一線免疫防禦。' },
      { term: 'Adaptive Immunity', definition: '具專一性與記憶的免疫系統。' },
      { term: 'APC', definition: '抗原呈現細胞，連接先天與後天免疫。' },
      { term: 'MHC', definition: '主要組織相容性複合體，負責呈現抗原片段。' },
      { term: 'IgE', definition: '與第一型過敏反應高度相關的免疫球蛋白。' },
      { term: 'Autoimmunity', definition: '免疫系統攻擊自身抗原的狀態。' },
      { term: 'Immunodeficiency', definition: '免疫防禦能力不足，易發生反覆或特殊感染。' },
      { term: 'Checkpoint Inhibitor', definition: '解除免疫煞車以增強抗腫瘤 T 細胞反應的藥物。' },
    ],
  }),
);

volume1Chapters.ch09 = chapter(
  '腫瘤學基礎',
  section(
    'carcinogenesis',
    '致癌機轉',
    lead('癌症 (Cancer) 的本質，是細胞累積了足以改變生長、修復、死亡與與環境互動方式的變異與選擇壓力。它不是單一突變事件，而是一段演化過程。'),
    diagram('oncology-hallmarks'),
    cards([
      { title: '致癌基因 (Oncogene)', body: '原本促進生長或存活的基因被過度活化，例如 EGFR、HER2、RAS。' },
      { title: '腫瘤抑制基因 (Tumor Suppressor Gene)', body: '原本負責剎車、修復或監控，失去功能後細胞更容易失控，如 TP53、RB。' },
      { title: 'DNA 修復基因', body: '負責修補複製與環境傷害造成的錯誤，失效時會累積更多突變。' },
      { title: '表觀遺傳改變', body: '不改變 DNA 序列，但改變基因表現，與腫瘤形成同樣重要。' },
    ]),
    p('致癌因素包括菸害、酒精、慢性發炎、病毒感染、輻射、化學暴露、遺傳體質與年齡累積效應。這些因素不是互斥，而常在同一病人身上交疊。'),
    callout(
      'warning',
      '不是每個突變都等於 driver mutation',
      p('腫瘤中有些變異是真正推動腫瘤生長的 driver，有些只是跟著一起累積的 passenger。精準治療真正要找的是前者。'),
    ),
  ),
  section(
    'tumor-biology',
    '腫瘤生物學',
    lead('腫瘤是一個生態系，不只是癌細胞本身。血管、免疫細胞、基質、纖維母細胞、缺氧與代謝環境，共同決定腫瘤如何長大、如何躲避免疫、如何擴散。'),
    table(
      ['生物學能力', '意義', '臨床連結'],
      [
        ['持續增殖訊號', '癌細胞不再受正常生長控制', '標靶治療常直接針對這些路徑'],
        ['逃避免死', '凋亡與細胞週期監控失效', '化療與放療常試圖重新啟動死亡路徑'],
        ['血管新生', '提供氧氣與養分', 'anti-VEGF 類藥物以此為靶點'],
        ['免疫逃逸', '避免被免疫系統辨識與清除', 'checkpoint inhibitor 正是針對這一層'],
        ['侵襲與轉移', '突破局部邊界並在他處定殖', '決定分期與預後，是癌症致死主因'],
      ],
    ),
    p('Warburg effect 指腫瘤細胞即使在有氧環境也傾向使用糖解作用，這不只是代謝怪現象，而是與快速生長、酸性微環境與生物合成需求相關。'),
    callout(
      'clinical',
      '病理與影像為什麼都重要？',
      p('病理可以看腫瘤細胞型態與分子標記，影像則告訴我們範圍、轉移與治療反應。癌症管理需要兩者同時參照。'),
    ),
  ),
  section(
    'staging-grading-prognosis',
    '分期、分級與預後',
    lead('分級 (Grading) 與分期 (Staging) 是腫瘤學最常被混淆的兩件事。分級回答「細胞長得多不像正常」；分期回答「腫瘤已經走到哪裡」。'),
    misconceptionList([
      { myth: 'Grade 越高就一定是晚期。', correction: '高分級代表細胞異型性高，但不代表一定已有遠端轉移；仍需分期。' },
      { myth: 'Stage 早就一定預後好。', correction: '早期通常較好，但仍受腫瘤生物學、分子特徵與病人狀態影響。' },
      { myth: '五年存活率就是個別病人的命運。', correction: '那是族群統計，不可直接套到單一病人。個別預後還受治療反應與共病影響。' },
    ]),
    cards([
      { title: 'T (Tumor)', body: '原發腫瘤大小、局部侵犯與深度。' },
      { title: 'N (Node)', body: '區域淋巴結是否受侵犯。' },
      { title: 'M (Metastasis)', body: '是否有遠端轉移。' },
      { title: 'Biomarker', body: 'HER2、ER/PR、PD-L1、EGFR 等生物標記會進一步影響風險分層。' },
    ], 'checklist-grid'),
    p('預後 (Prognosis) 不是單看病名，而是病人因素、腫瘤因素與治療因素的總和。相同 stage 的病人，也可能因年齡、器官功能、分子型別與治療機會不同，而有很大差異。'),
  ),
  section(
    'cancer-treatment-framework',
    '癌症治療框架',
    lead('癌症治療可粗分為局部治療與全身治療。手術與放射線治療偏向局部控制；化療、標靶治療、免疫治療、內分泌治療則屬全身性策略。實務上常需要多模式整合。'),
    table(
      ['治療類型', '適用情境', '關鍵風險'],
      [
        ['手術', '局部可切除病灶、診斷性切片、減積手術', '併發症、邊界不清、器官功能影響'],
        ['放療', '局部控制、症狀緩解、手術前後輔助', '鄰近組織毒性與累積劑量問題'],
        ['化療', '快速分裂細胞為主要靶點', '骨髓抑制、噁心、黏膜炎、器官毒性'],
        ['標靶治療', '針對特定分子異常', '只在有相符標記時效益較高，且會有特定 class toxicity'],
        ['免疫治療', '重啟抗腫瘤免疫', '可能造成 immune-related adverse events，影響多器官'],
      ],
    ),
    callout(
      'danger',
      '最容易被忽略的事',
      p('治療目標要先定義清楚：是治癒 (Cure)、延長存活、控制症狀，還是緩和照護？同樣的藥物，在不同目標下，效益與毒性容忍度完全不同。'),
    ),
    summary('本章總結', '第九章把癌症從分子到臨床決策的骨架串起來。', [
      '癌症是演化與選擇壓力共同塑造的疾病。',
      '腫瘤微環境與免疫逃逸同樣重要。',
      'Grade、Stage 與 treatment goal 是癌症管理的三個不同軸線。',
    ]),
  ),
  ...closingSections({
    caseTitle: '病例題：HER2 陽性乳癌的治療選擇',
    caseStem: '45 歲女性新診斷乳癌，影像顯示局部淋巴結侵犯，病理為 HER2 positive、ER negative。病人問：「既然已經知道是乳癌，為什麼還要做這麼多標記檢查？」',
    caseQuestions: [
      'HER2 這類生物標記在癌症管理中扮演什麼角色？',
      '分期、分級與分子標記各自回答什麼問題？',
      '這類病人為什麼常需要局部與全身治療並用？',
    ],
    caseAnalysis: [
      'HER2 是可治療的 driver 訊號之一，能影響標靶藥物選擇、復發風險評估與整體治療策略。',
      '分期回答範圍與擴散程度，分級回答細胞外觀與分化程度，分子標記則回答生物學特徵與可被鎖定的脆弱點。',
      '因為局部病灶與微轉移風險是不同層次問題，手術或放療處理局部，全身治療則處理看不見的播散風險。',
    ],
    quiz: [
      { question: 'Oncogene 與 tumor suppressor gene 的方向差異是什麼？', answer: 'Oncogene 活化會推動生長；tumor suppressor gene 失活會失去剎車。' },
      { question: 'Grade 與 stage 是否能互相取代？', answer: '不能。兩者回答不同問題，常需同時使用。' },
      { question: '癌症轉移最終致命的核心原因通常是什麼？', answer: '遠端器官定殖後造成重要器官功能失常，是癌症致死主因之一。' },
      { question: '免疫逃逸為何是重要 hallmarks？', answer: '若腫瘤能避開免疫監視，就更容易持續存活與擴張。' },
    ],
    glossary: [
      { term: 'Oncogene', definition: '活化後促進腫瘤生長與存活的基因。' },
      { term: 'Tumor Suppressor Gene', definition: '失活後使細胞失去增殖剎車與修復能力的基因。' },
      { term: 'Driver Mutation', definition: '真正推動腫瘤生長的關鍵變異。' },
      { term: 'Tumor Microenvironment', definition: '腫瘤周遭的免疫、血管與基質環境。' },
      { term: 'TNM', definition: '描述腫瘤、淋巴結與遠端轉移的分期系統。' },
      { term: 'Grading', definition: '依細胞分化與異型性評估腫瘤惡性程度。' },
      { term: 'Staging', definition: '依腫瘤範圍與擴散程度分層。' },
      { term: 'Targeted Therapy', definition: '針對腫瘤特定分子異常的治療策略。' },
    ],
  }),
);

volume1Chapters.ch10 = chapter(
  '生物化學與代謝',
  section(
    'enzymes-metabolic-pathways',
    '酵素與代謝路徑',
    lead('生物化學 (Biochemistry) 最容易被誤學成流程背誦。實際上，代謝路徑的重點不在全部記住，而在知道「這條路想解決什麼問題、由哪些酵素控制、在什麼器官最重要、臨床上哪裡會出錯」。'),
    diagram('metabolism-map'),
    cards([
      { title: '酵素 (Enzyme)', body: '降低活化能、提高反應速率，本身不改變平衡方向。' },
      { title: '限速步驟 (Rate-limiting Step)', body: '常是荷爾蒙與能量狀態主要調控點。' },
      { title: '輔酶 / 輔因子', body: '常由維生素或金屬離子提供，缺乏時代謝鏈會卡住。' },
      { title: '區室化 (Compartmentalization)', body: '相同分子在細胞質或粒線體中的意義可能完全不同。' },
    ]),
    p('同樣是葡萄糖，進入糖解作用 (Glycolysis) 時是為了快速供能；進入糖原合成 (Glycogenesis) 時是為了儲存；進入磷酸戊糖途徑 (PPP) 時則可能是為了產生 NADPH 與核苷酸前驅物。這就是「同一分子，不同情境，不同任務」。'),
    callout(
      'info',
      '藥學連結',
      p('抗代謝藥 (Antimetabolites)、statins、metformin、allopurinol 等藥物，都直接利用代謝路徑與酵素調控原理。'),
    ),
  ),
  section(
    'carb-fat-protein-metabolism',
    '醣、脂、蛋白代謝',
    lead('人體不是只用一種燃料。進食時偏向儲存與利用葡萄糖；禁食時逐步改為動員肝醣、脂肪與胺基酸。這種燃料切換，是理解糖尿病、飢餓、重症與代謝疾病的核心。'),
    table(
      ['燃料', '主要用途', '重要器官', '臨床提醒'],
      [
        ['葡萄糖', '快速供能、紅血球與腦部的重要燃料', '肝、肌肉、腦', '低血糖與高血糖都會快速影響神經功能'],
        ['脂肪酸 / 三酸甘油酯', '高密度能量儲存', '脂肪組織、肝、肌肉', '脂肪肝、酮酸中毒與高三酸甘油酯相關'],
        ['蛋白質 / 胺基酸', '結構、酵素、運輸、訊號', '全身', '長期分解會導致肌少症、免疫差與傷口癒合差'],
        ['酮體', '禁食或胰島素不足時的替代燃料', '肝產生，腦與肌肉利用', '糖尿病酮酸中毒是典型病理情境'],
      ],
    ),
    p('肝臟是燃料調度中心，脂肪組織是儲備庫，骨骼肌是大宗消費者，紅血球只能用葡萄糖。把器官分工搞清楚，很多題目自然會通。'),
    formula('進食與禁食的切換', 'insulin high -> storage ; glucagon / catecholamine high -> mobilization', '看到病人的荷爾蒙狀態，就能先猜代謝是往儲存還是分解方向。'),
    callout(
      'warning',
      '常見誤解',
      p('乳酸上升不一定代表缺氧；也可能來自高兒茶酚胺狀態、肝代謝下降、藥物或腫瘤代謝改變。數值不能脫離情境。'),
    ),
  ),
  section(
    'vitamins-trace-elements',
    '維生素與微量元素',
    lead('維生素與微量元素量雖少，但常是酵素系統不可缺的零件。很多臨床表現看似分散，其實都能回到輔酶缺乏、氧化壓力失衡、造血障礙或神經肌肉傳導問題。'),
    cards([
      { title: '維生素 B1, B2, B3', body: '與能量代謝、氧化還原與神經功能密切相關。' },
      { title: 'Folate / B12', body: '參與 DNA 合成與造血，缺乏時常見巨球性貧血。' },
      { title: '鐵 / 銅 / 鋅', body: '影響血紅素、電子傳遞、免疫與多種酵素活性。' },
      { title: '鈣 / 鎂 / 磷', body: '參與骨骼、訊號傳遞、ATP 與神經肌肉功能。' },
    ]),
    p('維生素缺乏不一定只來自飲食不足，也可能來自吸收不良、藥物影響、慢性酒精使用、長期透析、發炎狀態與代謝需求增加。'),
    callout(
      'clinical',
      '高風險情境',
      p('長期使用 proton pump inhibitor、metformin、loop diuretics、antiepileptic drugs，或接受全靜脈營養與腸胃切除的病人，常需要更警覺維生素與微量元素問題。'),
    ),
  ),
  section(
    'metabolic-disease-clinical-links',
    '代謝疾病的臨床連結',
    lead('代謝疾病最值得學的地方，在於它們會把抽象路徑直接投影到臨床。糖尿病、肥胖、脂肪肝、酮酸中毒、先天代謝異常、再餵食症候群 (Refeeding Syndrome)，都能用同一套代謝骨架理解。'),
    misconceptionList([
      { myth: '糖尿病只是血糖高。', correction: '它同時涉及脂肪、蛋白代謝、微血管、免疫、發炎與長期器官損害。' },
      { myth: '肥胖只是攝取大於消耗。', correction: '能量平衡固然重要，但還包含食慾調控、胰島素阻抗、發炎、睡眠、藥物與社會環境。' },
      { myth: '營養補充越快越好。', correction: '重度營養不良病人快速進食會造成胰島素驟升、磷鎂鉀移入細胞，引發致命併發症。' },
    ]),
    summary('本章總結', '第十章要你把代謝視為器官間燃料分工，而不是一堆孤立路徑。', [
      '酵素、輔因子與區室化共同決定代謝方向。',
      '醣、脂、蛋白代謝會依進食與禁食切換。',
      '臨床代謝疾病是代謝路徑失衡在病人身上的投影。',
    ]),
  ),
  ...closingSections({
    caseTitle: '病例題：糖尿病酮酸中毒為什麼不只是高血糖？',
    caseStem: '23 歲第一型糖尿病病人因腹痛、噁心與呼吸急促送醫。檢驗顯示 glucose 420 mg/dL、anion gap metabolic acidosis、血中 ketone 陽性。家屬說：「是不是把血糖降下來就好？」',
    caseQuestions: [
      '這個案例反映哪些代謝路徑被切換了？',
      '為什麼 DKA 會同時出現高血糖、酮體與酸中毒？',
      '治療時除了胰島素，還要同時注意哪些生理風險？',
    ],
    caseAnalysis: [
      '胰島素不足讓身體從儲存模式切到分解模式：脂解增加、肝臟酮體生成增加、葡萄糖利用下降且肝臟持續放糖。',
      '葡萄糖進不了細胞並不代表細胞不需要能量，因此脂肪動員加劇，產生酮體；同時高血糖造成滲透性利尿與脫水，酸鹼失衡因此惡化。',
      '要注意體液補充、鉀離子變化、酸鹼平衡與誘發原因。只看血糖而忽略鉀與容量，治療本身也可能造成危險。',
    ],
    quiz: [
      { question: '限速步驟在代謝學上的意義是什麼？', answer: '它通常是整條路徑最重要的調控點。' },
      { question: '進食狀態與禁食狀態主要由哪些荷爾蒙方向決定？', answer: '胰島素偏向儲存；升糖素與兒茶酚胺偏向動員。' },
      { question: '乳酸上升一定等於缺氧嗎？', answer: '不一定，還要考慮肝代謝、藥物、腫瘤與高兒茶酚胺狀態。' },
      { question: '再餵食症候群最需要警覺哪類電解質變化？', answer: '尤其是磷，其次也常伴隨鉀與鎂下降。' },
    ],
    glossary: [
      { term: 'Enzyme', definition: '催化生化反應、降低活化能的蛋白或 RNA 分子。' },
      { term: 'Rate-limiting Step', definition: '決定路徑總體流量的關鍵步驟。' },
      { term: 'Glycolysis', definition: '葡萄糖在細胞質分解成丙酮酸並產生少量 ATP 的路徑。' },
      { term: 'Beta-oxidation', definition: '脂肪酸在線粒體中分解產生乙醯輔酶 A 的過程。' },
      { term: 'Ketone Body', definition: '禁食或胰島素不足時產生的替代燃料。' },
      { term: 'Warburg Effect', definition: '腫瘤細胞偏好有氧糖解作用的代謝現象。' },
      { term: 'Refeeding Syndrome', definition: '長期營養不良後快速補充營養引發的危險電解質移位。' },
      { term: 'Cofactor', definition: '酵素作用所需的非蛋白輔助分子，常包含維生素或金屬離子。' },
    ],
  }),
);

volume1Chapters.ch11 = chapter(
  '遺傳與基因醫學',
  section(
    'genetics-fundamentals',
    '遺傳學基本原理',
    lead('遺傳學 (Genetics) 的基礎，是理解 DNA 如何儲存資訊、如何被複製、如何被轉錄成 RNA，再如何被翻譯成蛋白質。這條路徑稱為中央法則 (Central Dogma)。'),
    diagram('genetics-core'),
    table(
      ['層級', '核心概念', '臨床相關'],
      [
        ['DNA', '四種鹼基序列與染色體包裝', '突變、缺失、重複、重排都可能造成疾病'],
        ['RNA', 'mRNA、tRNA、rRNA 與調控 RNA', '剪接異常與調控失衡會改變蛋白產量'],
        ['蛋白質', '結構、酵素、受體、轉錄因子', '許多基因病最終表現在蛋白功能異常'],
        ['基因表現調控', '啟動子、增強子、表觀遺傳、轉錄因子', '同一基因在不同組織表現不同，決定疾病表型'],
      ],
    ),
    p('遺傳學在臨床上的難點，不在「知道 DNA 是什麼」，而在理解同一變異為什麼會在不同人身上表現不同。這牽涉穿透率 (Penetrance)、表現度 (Expressivity)、環境與修飾基因。'),
    callout(
      'warning',
      '常見誤解',
      p('「有基因變異」不等於「一定發病」。基因不是命運，而是風險、機率與生物學條件的組合。'),
    ),
  ),
  section(
    'monogenic-polygenic-epigenetics',
    '單基因、多基因與表觀遺傳',
    lead('不是所有遺傳疾病都遵守簡單的孟德爾規則。單基因疾病 (Monogenic Disease) 通常由單一高影響力變異主導；多基因疾病 (Polygenic Disease) 則由大量小效應變異與環境共同形成。'),
    cards([
      { title: '單基因疾病', body: '如囊狀纖維化、鐮刀型貧血、Marfan syndrome，家系判讀價值高。' },
      { title: '多基因疾病', body: '如第二型糖尿病、高血壓、精神疾病，遺傳風險分散且受環境強烈影響。' },
      { title: '表觀遺傳 (Epigenetics)', body: 'DNA 甲基化、組蛋白修飾與染色質狀態可改變基因表現而不改序列。' },
      { title: '體細胞突變', body: '不只生殖系統，後天獲得突變也能在癌症與血液疾病中扮演關鍵角色。' },
    ]),
    p('表觀遺傳讓我們知道，遺傳資訊不是只有序列本身。細胞為何是肝細胞、神經元或淋巴球，靠的就是同一套 DNA 在不同情境下被不同方式打開或關閉。'),
    callout(
      'info',
      '臨床意義',
      p('這也是為什麼同樣的致病基因，可能在不同年齡、不同組織、不同家族成員身上表現不一。'),
    ),
  ),
  section(
    'genetic-testing-variant-interpretation',
    '基因檢測與變異判讀',
    lead('做基因檢測前，最重要的不是「哪種技術最先進」，而是先問臨床問題是什麼。懷疑染色體異常、單基因病、癌症體細胞突變、藥物基因體差異，應選的檢測完全不同。'),
    table(
      ['方法', '擅長偵測', '限制'],
      [
        ['核型分析 / 染色體檢查', '大型染色體異常與非整倍體', '解析度有限，看不到小變異'],
        ['CMA / CNV 檢查', '微缺失、微重複', '無法看平衡性轉位與多數單一核苷酸變異'],
        ['Sanger sequencing', '特定位點或小範圍驗證', '不適合大規模掃描'],
        ['NGS panel / WES / WGS', '大量基因或全外顯子 / 全基因組分析', '資料量大，VUS 與 incidental findings 增加'],
      ],
    ),
    p('ACMG 常用致病性分類包括 pathogenic、likely pathogenic、variant of uncertain significance (VUS)、likely benign、benign。要特別記住，VUS 的意思是不確定，不是「大概有病」也不是「大概沒事」。'),
    misconceptionList([
      { myth: '檢測做越多越好。', correction: '檢測越廣，越容易遇到不確定結果與 incidental findings，若沒有明確臨床問題反而增加困擾。' },
      { myth: '陰性檢測就能排除遺傳疾病。', correction: '每種方法都有看不到的範圍；臨床懷疑高時，陰性結果仍可能需要重新評估。' },
      { myth: '基因報告可以脫離病人表型獨立解讀。', correction: '變異判讀必須和症狀、家系、器官表現與其他檢查合併思考。' },
    ]),
  ),
  section(
    'pharmacogenomics-intro',
    '藥物基因體學 (Pharmacogenomics) 入門',
    lead('藥物基因體學研究的是「同一藥物，為什麼不同人反應差這麼多」。這些差異可能表現在吸收、代謝、標的敏感度、毒性風險與過敏反應。'),
    cards([
      { title: 'CYP2D6 / CYP2C19', body: '影響多種精神科、心血管與止痛藥代謝，會改變有效劑量與療效。' },
      { title: 'TPMT / NUDT15', body: '影響 thiopurine 類藥物毒性風險，與骨髓抑制密切相關。' },
      { title: 'HLA-B*15:02 / HLA-B*57:01', body: '與 carbamazepine、abacavir 的嚴重過敏反應風險相關。' },
      { title: 'SLCO1B1', body: '與 statin 肌病風險相關，是 transporter 基因的重要例子。' },
    ]),
    p('藥物基因體學最常見的誤區，是把它想成「做完檢測就會自動知道所有用藥答案」。實際上，它只在特定藥物、特定族群、特定風險情境下最有價值，而且仍需結合腎肝功能、年齡、交互作用與臨床目標。'),
    callout(
      'clinical',
      '真正的臨床價值',
      p('它最大的價值常不是幫你找到一個「神奇最佳藥物」，而是提前避開高風險藥物或不太可能有效的選項。'),
    ),
    summary('本章總結', '第十一章把分子層級的遺傳概念接到臨床決策，形成第一冊的收尾。', [
      '遺傳資訊要經過表現調控才會變成表型。',
      '單基因、多基因與表觀遺傳對疾病的影響方式不同。',
      '基因檢測與藥物基因體學都必須回到具體臨床問題解讀。',
    ]),
  ),
  ...closingSections({
    caseTitle: '病例題：carbamazepine 開藥前的 HLA 檢測',
    caseStem: '28 歲女性因三叉神經痛考慮使用 carbamazepine。門診醫師提到先做 HLA-B*15:02 檢測，病人疑惑：「不是只有遺傳病才要驗基因嗎？」',
    caseQuestions: [
      '這個檢測屬於遺傳疾病診斷，還是藥物基因體學評估？',
      '藥物基因體學最常見的臨床價值是什麼？',
      '若基因檢測陰性，是否就代表用藥一定安全有效？',
    ],
    caseAnalysis: [
      '這屬於藥物基因體學評估，用來預測特定藥物的嚴重不良反應風險，而非診斷先天遺傳病本身。',
      '它常用來預先避開高風險藥物、調整起始劑量或選擇更合適的替代方案。',
      '不能。藥物反應還受腎肝功能、年齡、交互作用、適應症與其他基因因素影響。基因資訊是重要但非唯一輸入。',
    ],
    quiz: [
      { question: 'Central dogma 的三段核心流程是什麼？', answer: 'DNA 複製、DNA 轉錄成 RNA、RNA 翻譯成蛋白質。' },
      { question: 'VUS 應如何解讀？', answer: '代表目前證據不足，不能直接當成致病或正常。' },
      { question: '單基因疾病與多基因疾病最大的結構差異是什麼？', answer: '單基因疾病通常由單一高影響力變異主導；多基因疾病則由多個小效應變異與環境共同造成。' },
      { question: 'HLA 與藥物過敏為何相關？', answer: '特定 HLA 型別會影響抗原呈現與免疫辨識，增加嚴重過敏反應風險。' },
    ],
    glossary: [
      { term: 'Central Dogma', definition: '遺傳資訊由 DNA 到 RNA 再到蛋白質的基本流程。' },
      { term: 'Penetrance', definition: '帶有特定變異的人實際表現出表型的比例。' },
      { term: 'Expressivity', definition: '相同變異在不同個體身上的表現程度差異。' },
      { term: 'CNV', definition: '拷貝數變異，指 DNA 片段缺失或重複。' },
      { term: 'NGS', definition: '次世代定序技術，可大量平行讀取 DNA 序列。' },
      { term: 'Pathogenic Variant', definition: '有足夠證據支持會導致疾病的基因變異。' },
      { term: 'Pharmacogenomics', definition: '研究基因差異如何影響藥物反應的學科。' },
      { term: 'HLA', definition: '人類白血球抗原系統，與免疫辨識及部分藥物過敏高度相關。' },
    ],
  }),
);
