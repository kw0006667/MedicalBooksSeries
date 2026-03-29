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

const summary = (title: string, text: string, bullets: string[]) => `
  <div class="chapter-summary">
    <h3>${title}</h3>
    <p>${text}</p>
    ${list(bullets)}
  </div>
`;

const diagram = (name: string) => `<medical-canvas diagram="${name}"></medical-canvas>`;

export const volume2Chapters: Record<string, ChapterContent> = {};

volume2Chapters.ch01 = chapter(
  '藥效學 (Pharmacodynamics)',
  section(
    'receptor-theory',
    '受體理論',
    lead('藥效學 (Pharmacodynamics) 在問的是「藥物對身體做了什麼」。受體 (Receptor) 則是許多藥物作用的翻譯器：藥物先與受體結合，再把分子層級的事件轉成生理或病理層級的反應。真正重要的不是背受體名字，而是理解不同受體類型如何決定起效速度、訊號放大方式、耐受性、脫敏與副作用地圖。'),
    p('不是所有藥物都靠受體作用。有些藥物透過物理化學機制發揮效果，例如甘露醇 (Mannitol) 的滲透作用、制酸劑的酸鹼中和、活性碳 (Activated charcoal) 的吸附；有些藥物則直接抑制酵素 (Enzyme)、離子幫浦、轉運蛋白或核酸複製。把所有藥都想成「鑰匙插進鎖」會讓人誤判很多臨床現象。'),
    tags(['Receptor occupancy', 'Signal transduction', 'Desensitization', 'Selectivity']),
    diagram('pharmacology-core'),
    cards([
      { title: '配體門控離子通道 (Ligand-gated ion channel)', body: '起效快，常在毫秒到秒級；典型例子如尼古丁乙醯膽鹼受體 (Nicotinic acetylcholine receptor) 與 GABA-A 受體。' },
      { title: 'G 蛋白偶聯受體 (GPCR)', body: '臨床藥物最常見靶點，透過 cAMP、IP3、DAG、Ca2+ 等第二信使放大訊號；例如 β 受體阻斷劑與阿片受體致效劑。' },
      { title: '酵素連結受體 (Enzyme-linked receptor)', body: '常見於生長因子與胰島素訊號，牽涉磷酸化級聯反應；單株抗體 (Monoclonal antibody) 常以此類路徑為靶點。' },
      { title: '細胞內或核受體 (Intracellular / nuclear receptor)', body: '脂溶性配體可進入細胞，直接改變轉錄；類固醇 (Steroid) 與甲狀腺素 (Thyroid hormone) 是代表。' },
    ]),
    h3('受體理論真正要抓住的四個層次'),
    table(
      ['概念', '臨床意義', '容易混淆的點', '代表例子'],
      [
        ['親和力 (Affinity)', '藥物與受體結合的傾向，常影響所需濃度', '高親和力不等於高最大效果', 'Buprenorphine 對 μ 受體有高親和力，但不是完全致效劑'],
        ['固有活性 (Intrinsic activity)', '結合後能否啟動下游效應', '拮抗劑有親和力但沒有固有活性', 'Naloxone 可結合但不啟動阿片受體'],
        ['選擇性 (Selectivity)', '較偏好特定受體或組織，影響副作用譜', '選擇性通常是相對的，不是絕對只作用一種受體', 'Metoprolol 對 β1 較選擇性，但高劑量仍可能影響 β2'],
        ['受體儲備 (Spare receptors)', '不需占據全部受體就可達近最大效應', '因此 EC50 與 Kd 不一定相同', '某些 GPCR 系統有明顯受體儲備'],
      ],
    ),
    formula('占據率與親和力', 'Occupancy = [L] / ([L] + Kd)', '當配體濃度 [L] 等於解離常數 Kd 時，約有一半受體被占據。這只描述結合，不直接等於臨床效果，因為效果還會受訊號放大與受體儲備影響。'),
    callout(
      'warning',
      '常被忽略的核心',
      p('受體數量不是固定不變。長期使用致效劑 (Agonist) 可能導致下調 (Down-regulation) 或脫敏 (Desensitization)；長期使用拮抗劑 (Antagonist) 可能造成上調 (Up-regulation)。這就是為什麼停用 β 阻斷劑不可驟停、長期使用鼻充血劑會越噴越塞。'),
    ),
    misconceptionList([
      { myth: '受體越多，藥就一定越有效。', correction: '效果取決於受體數量、訊號效率、組織狀態與下游反應，不是單看受體數量。腫瘤有靶點表現也不代表一定對標靶治療敏感。' },
      { myth: '藥物只要有選擇性，就不會有副作用。', correction: '選擇性是濃度相對偏好，不是絕對專一。劑量提高、器官功能變化、組織分布差異都會讓原本的選擇性變得不可靠。' },
    ]),
    summary('本節重點', '受體理論的價值在於幫你預測起效速度、耐受性、副作用與藥物間競爭。', [
      '不是所有藥物都靠受體，但多數臨床常用藥與受體概念密切相關。',
      '親和力、固有活性、選擇性與受體儲備要分開思考。',
      '長期用藥會改變受體與訊號系統本身，這會反過來改變臨床反應。',
    ]),
  ),
  section(
    'dose-response',
    '劑量反應關係 (Dose-Response Relationship)',
    lead('劑量反應關係描述的是藥物濃度或劑量上升時，效果如何改變。這不只是藥理學圖形題，而是每一次加藥、減藥、合併治療、調整滴注速度時真正的臨床邏輯。'),
    p('最常見的是分級反應曲線 (Graded dose-response curve)，反映單一個體或單一系統的反應強度；另一種是量化反應曲線 (Quantal dose-response curve)，反映一群人中達到特定反應門檻的比例。前者常用於 Emax、EC50；後者則和 ED50、TD50、LD50、治療指數等概念密切相關。'),
    cards([
      { title: '分級反應 (Graded response)', body: '效果可連續變化，例如血壓下降多少 mmHg、疼痛減少幾分、支氣管阻力降低多少。' },
      { title: '量化反應 (Quantal response)', body: '結果是有或沒有，例如是否止吐、是否出現癲癇控制、是否發生毒性。' },
      { title: '線性尺度', body: '在低劑量區較不易比較不同藥物，常讓曲線擠在一起。' },
      { title: '半對數尺度 (Semi-log plot)', body: '可拉開中低劑量區差異，因此常見於教學與研究圖。' },
    ], 'comparison-grid'),
    formula('Emax 模型', 'Effect = (Emax x C) / (EC50 + C)', 'Emax 代表最大效果；EC50 代表達到 50% 最大效果所需濃度。EC50 越小，通常表示藥物在該系統下需要的濃度越低。'),
    h3('臨床解讀劑量反應曲線時要同時問三件事'),
    list([
      '這條曲線描述的是生化指標、症狀、器官功能，還是硬終點 (Hard outcome)？不同終點對臨床決策意義差很多。',
      '病人反應是即時的還是延遲的？例如抗凝、抗憂鬱、免疫調節藥常有時間延遲。',
      '是否存在天花板效應 (Ceiling effect)？增加劑量後是否只增加副作用而不再增加療效？',
    ]),
    table(
      ['參數', '定義', '常見應用', '實務提醒'],
      [
        ['EC50', '達 50% 最大效果所需濃度', '比較濃度需求', '受實驗條件、受體儲備與終點選擇影響'],
        ['ED50', '50% 個體達到特定治療反應的劑量', '群體治療劑量規劃', '是群體概念，不是某位病人的最佳劑量'],
        ['TD50', '50% 個體出現特定毒性的劑量', '安全性評估', '臨床毒性往往不是單一門檻可完全描述'],
        ['Ceiling effect', '超過某一劑量後療效不再顯著增加', 'NSAIDs、部分激動劑', '不代表副作用也停止增加'],
      ],
    ),
    callout(
      'clinical',
      '把曲線接回病人',
      p('同樣是「劑量加倍」，不同藥物可能出現完全不同結果。對線性藥動學且反應可預測的藥，效果可能大致增加；對窄治療窗藥、非線性藥動學藥或有受體飽和的藥，加倍劑量可能只換來毒性而非更多療效。'),
    ),
    misconceptionList([
      { myth: 'EC50 就是臨床最佳劑量。', correction: 'EC50 只是某一模型下達到半最大效果的濃度，臨床最佳劑量還要考慮不良反應、病人目標、共病與可行性。' },
      { myth: '曲線右移就代表藥物變差。', correction: '右移通常表示需要更高濃度才能達相同效果，可能是競爭性拮抗、耐受性、疾病嚴重度改變或給藥失敗，原因要進一步分辨。' },
    ]),
  ),
  section(
    'potency-efficacy-therapeutic-index',
    '效價、效能、治療指數 (Therapeutic Index)',
    lead('效價 (Potency) 指藥物需要多少量才能產生某個效果；效能 (Efficacy) 指藥物最多能做到多少效果。臨床上常把兩者混成一句「這藥比較強」，但這其實會導致錯誤的藥物替換與劑量決策。'),
    p('高效價藥物不一定臨床更好，只是需要的劑量較小；高效能藥物則能達到較高最大效果。嗎啡 (Morphine) 與芬太尼 (Fentanyl) 的差異常被拿來談效價，但真正影響臨床使用的還包括起效速度、脂溶性、分布、劑型與監測環境。'),
    cards([
      { title: '效價 Potency', body: '看曲線左右位置。越靠左，表示較低濃度就能產生某固定程度效果。' },
      { title: '效能 Efficacy', body: '看曲線最高點。越高表示最大可達效果越大。' },
      { title: '治療窗 Therapeutic window', body: '在足以治療但未產生不可接受毒性的濃度範圍內，藥物最有機會安全有效。' },
      { title: '治療指數 Therapeutic index', body: '常以 TD50 / ED50 表示，愈小通常代表安全範圍愈窄，但實務上還需更細緻監測。' },
    ], 'comparison-grid'),
    formula('治療指數', 'TI = TD50 / ED50', 'TI 是群體層級的粗略安全指標。對 warfarin、digoxin、lithium、theophylline、tacrolimus 這類窄治療窗藥物，臨床更重要的是病人層級的監測與濃度解讀。'),
    table(
      ['藥物', '為何屬窄治療窗', '需要監測的重點', '常見失誤'],
      [
        ['Warfarin', '療效與出血風險距離近，受飲食、藥物交互作用與基因影響', 'INR、出血徵象、肝功能、維生素 K 攝取變化', '只看單次 INR，忽略最近停藥、抗生素新增或飲食改變'],
        ['Lithium', '治療與毒性濃度接近，腎功能與水分變化會快速影響濃度', 'Trough 濃度、腎功能、甲狀腺功能、神經症狀', '脫水或加上 thiazide 後未及時調整'],
        ['Digoxin', '年長、低體重、腎功能差時易累積，且毒性表現多樣', '腎功能、心律、血鉀、採樣時機', '在分布期內太早抽血而誤判濃度過高'],
        ['Tacrolimus', '免疫抑制不足會排斥，太高會腎毒性與神經毒性', 'Trough、肝腎功能、CYP3A4 交互作用', '新增 azole 或 macrolide 後未預期濃度上升'],
      ],
    ),
    callout(
      'danger',
      '高風險判斷錯誤',
      p('臨床最危險的誤解之一，是把「高效價」誤當成「高效能」。這會讓人以為小劑量強效藥物一定比較厲害，但如果最大效果受限，反而可能在急性重症時不夠用。'),
    ),
    takeawayList([
      { title: '選藥不只看 potency', body: '還要看最大療效、起效速度、可滴定性、毒性型態、病人器官功能與給藥途徑。' },
      { title: '窄治療窗藥物不要只背名單', body: '真正重要的是知道哪一項監測數值、在什麼時間點抽、出現什麼症狀要立刻處理。' },
    ]),
  ),
  section(
    'agonist-antagonist',
    '激動劑、拮抗劑與部分激動劑',
    lead('致效劑 (Agonist) 會啟動受體；拮抗劑 (Antagonist) 會阻擋它；部分致效劑 (Partial agonist) 會啟動，但最大效果有限；反向致效劑 (Inverse agonist) 則會把本來就有基礎活性的系統往反方向拉。這些差異決定了藥物在單用與併用時的表現。'),
    p('競爭性拮抗劑 (Competitive antagonist) 常讓曲線右移但 Emax 不變；非競爭性拮抗劑 (Noncompetitive antagonist) 常讓 Emax 降低。部分致效劑則能在缺乏內源性配體時提供部分活化，但在完全致效劑存在時又可能表現得像拮抗劑。Buprenorphine 在阿片系統就是經典例子。'),
    table(
      ['類型', '固有活性', '對曲線的典型影響', '常見例子', '臨床意義'],
      [
        ['完全致效劑 (Full agonist)', '高', '可達高 Emax', 'Morphine、albuterol', '急性需要明顯效果時常用'],
        ['部分致效劑 (Partial agonist)', '中等', 'Emax 較低', 'Buprenorphine、aripiprazole', '可兼具刺激與阻斷特性，較不易過度活化'],
        ['競爭性拮抗劑', '無', '曲線右移，Emax 多半不變', 'Naloxone、propranolol', '提高致效劑濃度可部分克服'],
        ['非競爭性拮抗劑', '無', 'Emax 下降', 'Phenoxybenzamine', '即使增加致效劑也難恢復原最大效果'],
        ['反向致效劑 (Inverse agonist)', '負向', '降低 constitutive activity', '部分 antihistamines、部分 benzodiazepine site ligands', '需受體本身有基礎活性才有意義'],
      ],
    ),
    h3('部分致效劑為什麼常被誤解'),
    list([
      '在沒有完全致效劑時，它能提供一定程度的刺激，對戒斷控制或系統穩定化很有價值。',
      '在完全致效劑存在時，它會搶占受體，讓總效果下降，因此也可能誘發戒斷或看起來像拮抗。',
      '它不是「效果比較弱所以比較沒用」，而是用在需要穩定、天花板效應與較低過量風險的場景。',
    ]),
    callout(
      'success',
      '臨床整合',
      p('藥理類型要連回病人的治療目標。急性劇痛、戒斷治療、長期維持、過量逆轉，雖然都在同一受體系統上操作，但需要的藥理型態可能完全不同。'),
    ),
    misconceptionList([
      { myth: '部分致效劑就是低劑量完全致效劑。', correction: '不是。部分致效劑的最大效果天生受限，即使加量也不會變成完全致效劑。' },
      { myth: '拮抗劑完全沒有臨床效果。', correction: '拮抗劑阻斷的能力本身就是臨床效果，例如控制交感活性、逆轉過量、降低胃酸分泌或抑制血栓形成。' },
    ]),
  ),
);

volume2Chapters.ch02 = chapter(
  '藥動學 (Pharmacokinetics)',
  section(
    'adme',
    '吸收、分布、代謝、排除 (ADME)',
    lead('藥動學 (Pharmacokinetics) 在問的是「身體對藥物做了什麼」。同一個藥開進不同病人身上，為什麼濃度曲線會不同，核心就在 ADME：吸收 (Absorption)、分布 (Distribution)、代謝 (Metabolism)、排除 (Excretion)。'),
    p('這四個字不能只背定義。臨床真正要問的是：藥有沒有進來？進來多少？去了哪裡？多久被清掉？會不會因器官功能、交互作用或給藥方式改變而失控？'),
    tags(['Bioavailability', 'First-pass effect', 'Protein binding', 'Clearance']),
    diagram('pk-journey'),
    cards([
      { title: '吸收 (Absorption)', body: '受給藥途徑、胃排空、腸道血流、pH、食物、劑型與轉運蛋白影響。' },
      { title: '分布 (Distribution)', body: '受血流、蛋白結合、脂溶性、組織滲透性與屏障影響，例如血腦屏障與胎盤。' },
      { title: '代謝 (Metabolism)', body: '以肝臟為主，但腸壁、肺、腎也可參與。第一相反應常由 CYP 酵素主導，第二相常為結合反應。' },
      { title: '排除 (Excretion)', body: '以腎臟最常見，包括腎絲球過濾、主動分泌與再吸收；膽汁與糞便排除也很重要。' },
    ]),
    formula('絕對生體可用率', 'F = (AUCpo / Dosepo) / (AUCiv / Doseiv)', '口服 AUC 與靜脈 AUC 比值可估計進入全身循環的比例。不是所有口服藥都需要高 F，重點是是否能穩定達到治療濃度。'),
    table(
      ['ADME 階段', '關鍵決定因子', '臨床例子', '容易誤解'],
      [
        ['吸收', '胃腸 motility、食物、pH、首渡效應', 'Levothyroxine、bisphosphonate 常受食物與胃腸條件影響', '口服劑量高不代表吸收好'],
        ['分布', '蛋白結合、脂溶性、組織灌流', 'Diazepam 脂溶性高，分布廣；aminoglycoside 主要留在細胞外液', '高蛋白結合藥不一定比較強，只是游離分率小'],
        ['代謝', '肝血流、酵素活性、基因型、交互作用', 'Codeine 需經 CYP2D6 活化；clopidogrel 需 CYP2C19 代謝', '代謝快不一定療效差，要看原藥或代謝物誰活性較高'],
        ['排除', 'GFR、尿液 pH、分泌與再吸收、透析', 'Lithium 與 aminoglycoside 受腎功能影響大', '血清 creatinine 正常不等於清除能力一定正常'],
      ],
    ),
    callout(
      'warning',
      '第一原則',
      p('藥動學不是抽象的數學。任何一位病人一旦出現腎功能改變、肝病、休克、脫水、肥胖、重症、大量輸液、透析或新增交互作用藥物，原本穩定的濃度都可能突然失準。'),
    ),
  ),
  section(
    'half-life-clearance-vd',
    '半衰期、清除率、分布容積',
    lead('半衰期 (Half-life, t1/2)、清除率 (Clearance, CL)、分布容積 (Volume of distribution, Vd) 是臨床設計給藥方案的三大核心參數。它們彼此相連，但問的問題不同。'),
    p('Vd 反映藥物看起來分散到多大空間；CL 反映身體每單位時間能清掉多少藥；t1/2 則取決於前兩者的比值。很多人把半衰期當成藥物消失快慢的唯一答案，但實際上它是綜合結果，不是單一器官功能指標。'),
    formula('半衰期關係式', 't1/2 = 0.693 x Vd / CL', '如果清除率下降或分布容積上升，半衰期都會延長。重症病人大量補液時，某些親水性抗生素的 Vd 增加，就是典型例子。'),
    cards([
      { title: '分布容積 (Vd)', body: '不是解剖學真實體積，而是將體內總藥量與血中濃度對應後得到的假想體積。Vd 大表示藥多半不待在血中。' },
      { title: '清除率 (CL)', body: '以體積/時間表示，代表血液經器官處理後被「清空藥物」的能力。全身清除率常是多器官總和。' },
      { title: '半衰期 (t1/2)', body: '在一階消除下，濃度每經過一個半衰期下降一半。通常約 4 到 5 個半衰期達穩態或清除大部分藥量。' },
      { title: '蛋白結合與游離分率', body: '真正能穿膜、被清除、產生藥效的多半是游離型藥物，尤其在低白蛋白血症時更要留意。' },
    ]),
    table(
      ['現象', '參數變化', '可能代表的臨床情境', '決策影響'],
      [
        ['峰值低但總量足', 'Vd 上升', '敗血症、大量輸液、肥胖、懷孕', '負荷劑量可能要提高，維持劑量未必同步調高'],
        ['穩態濃度持續偏高', 'CL 下降', '腎衰竭、肝衰竭、CYP 抑制、低灌流', '維持劑量或給藥間隔需調整'],
        ['停藥後濃度掉很慢', 't1/2 延長', 'CL 下降或 Vd 增加', '副作用持續時間更長，換藥或洗脫期要拉長'],
        ['高蛋白結合藥總濃度下降', '游離分率上升但總濃度可下降', '低白蛋白、尿毒症', '不要只看總濃度，必要時測 free level'],
      ],
    ),
    misconceptionList([
      { myth: '半衰期長就表示藥一定很危險。', correction: '半衰期長代表體內停留久，可能利於一天一次給藥，也可能讓毒性拖得更久。關鍵在是否能安全監測與滴定。' },
      { myth: 'Vd 大就是藥量很多。', correction: 'Vd 大只表示相較於血中濃度，藥物分布得很廣，不等於體內總量一定大。' },
    ]),
  ),
  section(
    'dosing-regimen-steady-state',
    '載藥方案與穩態 (Steady State)',
    lead('設計給藥方案時，要分清楚負荷劑量 (Loading dose) 與維持劑量 (Maintenance dose) 在解決不同問題。前者是為了快速把濃度拉上來，後者是為了把濃度維持在目標範圍內。'),
    formula('負荷劑量', 'Loading dose = (Ctarget x Vd) / F', '負荷劑量主要由 Vd 決定。病人水分空間變大、組織分布改變時，負荷劑量往往比你直覺以為的更受影響。'),
    formula('維持劑量速率', 'Maintenance dose rate = (CL x Ctarget) / F', '維持劑量主要由 CL 決定。腎肝功能變差、交互作用或透析變化時，維持劑量比負荷劑量更需要調整。'),
    table(
      ['策略', '何時考慮', '優點', '風險與提醒'],
      [
        ['負荷劑量', '需要快速達標，如敗血症抗生素、抗心律不整、抗癲癇、免疫抑制', '縮短達標時間', '若 Vd 預估錯誤或病人極度脆弱，可能造成初期毒性'],
        ['固定間隔給藥', '多數口服慢性治療或間歇抗生素', '執行容易、病人理解度高', '峰谷差可能大，依從性差時更明顯'],
        ['延長間隔', '清除差但單次峰值仍需達到者', '可保留高峰效果，同時避免累積', '需理解藥效與濃度關係，不能套用所有藥物'],
        ['持續輸注', '希望減少波動，如某些 vasopressor、鎮靜藥、部分 β-lactam 抗生素', '濃度較平穩', '管路、穩定性、相容性與泵浦錯誤會成為新風險'],
      ],
    ),
    h3('穩態與採樣時機'),
    list([
      '一階藥動學下，多數藥約 4 到 5 個半衰期達穩態；但如果病人正在惡化，不能被動等穩態才介入。',
      '穩態是輸入速率與輸出速率平衡，不是濃度完全不變。固定間隔給藥仍會有峰值 (Peak) 與谷值 (Trough)。',
      '解讀藥物濃度前，先確認抽血時機是否正確。時間錯誤比計算錯誤更常造成誤判。',
    ]),
    callout(
      'clinical',
      '不要只背 4 到 5 個半衰期',
      p('這個規則建立在系統穩定、一階消除、器官功能不變的前提。對 phenytoin 這類接近飽和代謝的藥、對重症病人或快速改變中的病人，這個口訣只能當起點，不能當終點。'),
    ),
  ),
  section(
    'renal-hepatic-dose-adjustment',
    '腎肝功能不全時的劑量調整',
    lead('腎與肝是最常需要劑量調整的兩個器官系統，但兩者的邏輯不完全相同。腎功能常有可量化的濾過估算；肝功能則牽涉血流、酵素活性、蛋白結合、膽汁排泄與門脈分流，往往更複雜。'),
    formula('Cockcroft-Gault', 'CrCl ~= ((140 - age) x weight) / (72 x SCr) ; 女性 x 0.85', '許多藥物標示仍以 Cockcroft-Gault 估算肌酸酐清除率。請注意體重選擇、極端年齡、低肌肉量與急性腎損傷時的限制。'),
    cards([
      { title: '腎功能不全', body: '優先問藥物或活性代謝物是否主要經腎排除、毒性是否與暴露量相關、透析會不會移除藥物。' },
      { title: '肝功能不全', body: '先看高肝抽取比或低肝抽取比、蛋白結合、首渡代謝、膽汁排泄與是否有肝性腦病或腹水。' },
      { title: '急性腎損傷 (AKI)', body: '腎功能正在變，不要把單一 creatinine 值當穩定狀態。重症時常需要日更甚至更頻繁調整。' },
      { title: '透析病人', body: '不是只看 eGFR。要知道透析型態、時機、藥物分子量、蛋白結合與 Vd，才能判斷是否要補打。' },
    ]),
    table(
      ['情境', '優先考慮', '常見陷阱', '實務動作'],
      [
        ['老年低肌肉量，SCr 正常', '實際 GFR 可能被高估', '以為 creatinine 正常就不用調整', '結合年齡、體重、尿量與藥物反應判斷'],
        ['肝硬化合併低白蛋白', '游離分率改變，總濃度可能低估活性暴露', '只看 total phenytoin 或 total valproate', '必要時看校正濃度或 free level'],
        ['CRRT 病人', '藥物可能被持續移除', '把 CRRT 當成無尿狀態處理而過度減量', '查明濾器設定，必要時採較高起始維持量並監測'],
        ['肥胖病人腎排除藥', '體重尺度會影響估算', '所有藥都用實際體重或理想體重', '依藥物性質決定 loading/maintenance 用哪種體重'],
      ],
    ),
    misconceptionList([
      { myth: 'eGFR 與 CrCl 可以在所有情境互換。', correction: '不能。臨床試驗、標示與給藥建議可能使用不同估算方式，尤其窄治療窗藥物要看原始依據。' },
      { myth: '肝功能只看 AST/ALT。', correction: '轉氨酶反映肝細胞損傷，不等於代謝能力。白蛋白、INR、膽紅素、腹水、 encephalopathy 與肝血流狀態更能影響藥動學。' },
    ]),
  ),
);

volume2Chapters.ch03 = chapter(
  '藥物交互作用與不良反應',
  section(
    'drug-drug-interactions',
    '藥物間交互作用 (Drug-Drug Interactions)',
    lead('交互作用 (Interaction) 的本質是「一個藥改變另一個藥的暴露量、作用位點、風險承受能力，或病人生理背景」，不是單純的禁忌表格。臨床上最重要的是找出真正有後果的交互作用，而不是看到清單就一律停藥。'),
    p('大方向可分為藥動學交互作用 (Pharmacokinetic interactions) 與藥效學交互作用 (Pharmacodynamic interactions)。前者改變濃度，後者改變反應；但在真實病人身上兩者經常一起出現。'),
    tags(['CYP inhibition', 'Enzyme induction', 'P-glycoprotein', 'QT prolongation']),
    diagram('interaction-risk'),
    table(
      ['機轉', '典型例子', '後果', '常見處理'],
      [
        ['CYP 抑制', 'Clarithromycin + simvastatin', 'statin 濃度上升，橫紋肌溶解風險增加', '停用或改用不依賴 CYP3A4 的 statin'],
        ['CYP 誘導', 'Rifampin + tacrolimus', 'tacrolimus 濃度下降，器官排斥風險增加', '避免併用或密集監測 trough 並調整'],
        ['轉運蛋白抑制', 'Verapamil + digoxin', 'digoxin 清除下降', '降低 digoxin 劑量並監測濃度與心律'],
        ['加成藥效', 'ACEi + spironolactone + TMP-SMX', '高血鉀風險大增', '評估必要性，監測鉀與腎功能'],
        ['同向毒性', 'Methadone + fluoroquinolone + antipsychotic', 'QT 延長與 torsades 風險', '檢查 ECG、電解質並減少可替代藥物'],
      ],
    ),
    cards([
      { title: 'CYP 抑制 (Inhibition)', body: '通常發生較快，幾天內即可顯現；強抑制劑加上窄治療窗受質要高度警覺。' },
      { title: '酵素誘導 (Induction)', body: '發生與消退都較慢，因為牽涉酵素表現量改變；常在 1 到 2 週後才完全出現。' },
      { title: 'P-gp / OATP 等轉運蛋白', body: '決定腸道吸收、肝膽轉運與腎小管分泌；很多人只記 CYP，卻忽略轉運蛋白同樣重要。' },
      { title: '藥效學加成', body: '不一定改變濃度，但可能明顯放大出血、鎮靜、低血糖、血壓下降或 QT 延長。' },
    ]),
    callout(
      'danger',
      '真正高風險的情境',
      p('交互作用最危險的組合往往同時具有三個條件：窄治療窗藥物、高齡或器官功能不穩、以及臨床團隊沒注意到新藥剛被加入。'),
    ),
  ),
  section(
    'food-herb-interactions',
    '藥食與藥草交互作用',
    lead('病人並不會把食物、保健品、茶、酒精、草藥與處方藥分成不同世界，但臨床人員常會。真正的用藥安全，必須把病人的整體攝取行為一起納入。'),
    table(
      ['食物/草藥', '主要機轉', '代表受影響藥物', '臨床建議'],
      [
        ['葡萄柚汁 (Grapefruit juice)', '抑制腸道 CYP3A4，增加口服暴露', '部分 statin、部分 CCB、部分免疫抑制劑', '不是所有 citrus 都等同，但應避免和高風險藥併用'],
        ['聖約翰草 (St. John’s wort)', '誘導 CYP3A4 與 P-gp', '口服避孕藥、cyclosporine、tacrolimus、部分 antidepressant', '主動詢問保健品與草藥使用'],
        ['高維生素 K 飲食', '對抗 warfarin 作用', 'Warfarin', '重點不是完全禁食，而是維持攝取穩定'],
        ['鈣、鐵、鋁、鎂', '與藥物螯合降低吸收', 'Levofloxacin、doxycycline、levothyroxine', '安排時間錯開通常比停掉補充品更可行'],
        ['酒精', '加成鎮靜、低血糖、肝毒性或造成行為風險', 'Benzodiazepine、insulin、acetaminophen、metronidazole', '要說明具體風險，不只說「不要喝酒」'],
      ],
    ),
    h3('病人教育時要避免模糊句子'),
    list([
      '不要只說「空腹吃」；要說明是飯前多久、飯後多久、喝多少水、是否能和其他藥一起吃。',
      '不要只說「避免奶類」；應明確指出是避免和某藥同時服用，而非永遠不能吃。',
      '不要假設保健品無害。紅麴、銀杏、人參、魚油、CBD 製品都可能影響處方藥安全。',
    ]),
    misconceptionList([
      { myth: '天然草藥比較安全，不算藥。', correction: '天然不等於無活性，也不等於無交互作用。很多草藥對酵素、凝血、血糖或肝功能都有明顯影響。' },
      { myth: '只要避免葡萄柚汁，其他 citrus 都一樣危險。', correction: '不同 citrus 的 furanocoumarin 含量不同，不能一概而論；但對高風險藥物來說，保守避開最安全。' },
    ]),
  ),
  section(
    'adr-classification',
    '藥物不良反應 (ADR) 分類與機轉',
    lead('藥物不良反應 (Adverse Drug Reaction, ADR) 並不是「病人吃藥後不舒服」這麼簡單。你要能分辨它是可預測、與劑量相關，還是罕見、免疫介導或延遲性毒性，因為這直接決定停藥、減量、再挑戰與未來避免策略。'),
    table(
      ['分類', '特徵', '例子', '處理重點'],
      [
        ['Type A (Augmented)', '與藥理作用相關、可預測、常見、與劑量相關', 'Insulin 造成低血糖、warfarin 造成出血', '調整劑量、加強監測或修正併用藥'],
        ['Type B (Bizarre)', '難預測、常與免疫或特異體質相關', 'Penicillin 過敏、allopurinol 嚴重皮膚不良反應', '立即停藥、避免再暴露、必要時通報與標註過敏'],
        ['Type C (Chronic)', '長期使用相關', '類固醇造成骨鬆、NSAIDs 造成腎功能惡化', '權衡長期利益與慢性傷害，設計預防監測'],
        ['Type D (Delayed)', '延遲出現', '化療後第二癌、teratogenicity', '需要長期追蹤與風險告知'],
        ['Type E (End-of-use)', '停藥或減藥後出現', 'β 阻斷劑停藥反彈、opioid 戒斷', '需漸進式停藥'],
        ['Type F (Failure)', '治療失敗', '抗生素因交互作用濃度不足、抗癲癇藥漏服', '找出失敗來源，不要只怪疾病太重'],
      ],
    ),
    termGrid([
      { term: 'Adverse event', explanation: '服藥後發生的不良事件，不一定已證明和藥物有因果關係。' },
      { term: 'Adverse drug reaction', explanation: '有合理因果關聯的不良反應。' },
      { term: 'Allergy / hypersensitivity', explanation: '免疫介導反應，不等於所有噁心、頭暈、胃不適。' },
      { term: 'Intolerance', explanation: '低劑量即可出現一般人不易承受的藥理性副作用。' },
    ]),
    callout(
      'warning',
      '過敏標籤要精準',
      p('把所有副作用都記成 allergy，會縮小未來可用治療選項。例如 amoxicillin 造成腸胃不適與真正的 anaphylaxis，臨床後果完全不同。'),
    ),
    takeawayList([
      { title: '嚴重度 (Severity) 不等於嚴重性 (Seriousness)', body: '劇烈噁心很嚴重，但不一定符合 serious；輕微實驗室異常若導致住院或死亡風險，可能就是 serious ADR。' },
      { title: '因果評估要回到時間序列', body: '起始時間、減量或停藥後改善、再暴露是否重現、是否有其他解釋，都是判斷關鍵。' },
    ]),
  ),
  section(
    'medication-monitoring-risk-prevention',
    '用藥監測與風險預防',
    lead('高品質用藥監測不是等副作用發生才處理，而是在開藥當下就先定義「要追蹤什麼、多久追蹤、出現什麼值或症狀要改計畫」。這是預先設計的安全系統。'),
    cards([
      { title: '前測 (Baseline)', body: '治療前的腎功能、肝功能、CBC、心電圖、妊娠狀態、感染風險評估，決定能不能安全起始。' },
      { title: '療效監測', body: '必須明確設定終點，如血壓、A1c、疼痛分數、症狀日記、病毒量、器官排斥指標。' },
      { title: '毒性監測', body: '包含實驗室數值、生命徵象、症狀與功能變化。例如 ACEi 要看鉀與 creatinine，amiodarone 要看肺、肝、甲狀腺。' },
      { title: '教育與回報機制', body: '病人是否知道哪些是警訊、何時回診、哪些非處方藥或食物需要回報，往往決定能否早期發現風險。' },
    ]),
    table(
      ['藥物類型', '最少要監測什麼', '高風險時機', '預防重點'],
      [
        ['ACEi / ARB', '血鉀、SCr、血壓', '起始、加量、脫水、合併利尿劑或 NSAIDs', '避免三重打擊組合並交代脫水生病日規則'],
        ['Methotrexate', 'CBC、LFT、腎功能、口腔或肺症狀', '起始後前幾月、腎功能變差、劑量增加', '強調每週而非每日、補充 folic acid、避免重複配藥錯誤'],
        ['Amiodarone', '甲狀腺、肝功能、肺症狀、眼部症狀、心電圖', '長期使用', '建立長期監測表，避免因起效慢而忽略慢性毒性'],
        ['Clozapine', 'ANC、感染症狀、便秘、心肌炎警訊', '起始與前期 titration', '嚴守 CBC 監測與便秘處理，不可只盯血球'],
      ],
    ),
    callout(
      'clinical',
      '監測不是抽很多檢驗就叫完整',
      p('好的監測應該是高價值、可解釋、可導致行動。若抽了數值卻沒有明確門檻與後續計畫，反而增加混亂與警訊疲乏。'),
    ),
  ),
);

volume2Chapters.ch04 = chapter(
  '劑型學與配方學',
  section(
    'dosage-forms',
    '錠劑、膠囊、注射、吸入、貼片',
    lead('劑型 (Dosage form) 不是包裝差異，而是治療設計的一部分。相同主成分放進不同劑型，可能改變起效速度、局部與全身暴露、副作用型態、操作難度與依從性。'),
    tags(['Immediate-release', 'Modified-release', 'Inhalation', 'Transdermal']),
    diagram('dosage-design'),
    table(
      ['劑型', '優點', '限制', '典型情境'],
      [
        ['速放錠/膠囊', '製造簡單、調整方便、成本低', '峰谷差較明顯、可能刺激胃腸', '大多數慢性口服用藥'],
        ['緩釋/控釋製劑', '減少服藥次數、平滑濃度波動', '不可任意磨粉或咬碎，成本較高', '高依從性需求或症狀控制需平穩者'],
        ['注射劑', '生體可用率高，適合急性或無法口服者', '需要無菌、侵入性、操作風險', '休克、癲癇持續狀態、嚴重感染'],
        ['吸入製劑', '局部肺部高濃度、全身副作用較少', '操作技巧高度決定成敗', 'Asthma、COPD、吸入性麻醉'],
        ['貼片 (Transdermal patch)', '可長時間穩定給藥、避免首渡效應', '起效較慢、皮膚狀態影響吸收', '止痛、荷爾蒙、戒菸'],
      ],
    ),
    cards([
      { title: '口服不是最簡單，而是最容易被低估', body: '吞得下去不代表吸收穩定。胃排空、腸道手術、嘔吐、腹瀉、胃酸抑制與食物都可能讓口服表現失真。' },
      { title: '吸入器看似局部，其實很容易失敗', body: '錯誤的吸氣速度、沒有同步按壓、沒有吐氣後再吸，都會大幅降低肺部沉積。' },
      { title: '貼片不是貼上就結束', body: '體溫升高、外部熱源、皮膚破損與脂肪厚度都可能影響吸收，尤其 fentanyl 貼片更要小心。' },
      { title: '注射劑的風險不只感染', body: '滲漏、相容性、輸注速率、濃度錯誤與泵浦設定都會造成傷害。' },
    ]),
    misconceptionList([
      { myth: '緩釋錠只是不容易忘記吃。', correction: '緩釋設計常同時影響濃度波動與副作用型態，任意磨粉或切半可能直接破壞整個藥動學設計。' },
      { myth: '吸入藥比較安全，所以技巧沒那麼重要。', correction: '技巧不好時，療效不足與局部副作用都會增加，例如吸入口咽沉積造成念珠菌感染。' },
    ]),
  ),
  section(
    'bioavailability-formulation',
    '生體可用率 (Bioavailability) 與劑型設計',
    lead('藥劑學真正的挑戰，是把本來在試管裡有效的分子，變成在病人身上也能穩定送到目標位置的藥品。這就是製劑設計 (Formulation design) 的核心。'),
    p('影響生體可用率的因素包括溶解度 (Solubility)、膜通透性 (Permeability)、粒徑、晶型、鹽類型態、賦形劑、胃腸 pH、首渡代謝與轉運蛋白。很多口服藥效果不穩，不是醫師開錯，而是分子本身就不容易被送到正確位置。'),
    formula('Henderson-Hasselbalch', 'pH = pKa + log([A-] / [HA])', '弱酸弱鹼藥物的離子化程度會隨環境 pH 改變，進而影響膜通透性與溶解度。但臨床吸收不是只看離子化，還要看表面積、血流與轉運蛋白。'),
    table(
      ['製劑概念', '在解決什麼問題', '例子', '臨床連結'],
      [
        ['鹽類化', '改善溶解度或穩定性', 'Diclofenac sodium、metoprolol succinate', '不同鹽類不一定可毫無條件互換'],
        ['腸溶包衣', '避免胃酸破壞或減少胃刺激', 'PPI、aspirin enteric-coated', '不一定等於比較不傷胃，也可能延遲起效'],
        ['脂質體/奈米載體', '改善分布或降低毒性', 'Liposomal doxorubicin', '藥名相近但毒性與劑量算法可能不同'],
        ['前驅藥 (Prodrug)', '改善吸收、穩定性或選擇性', 'Valacyclovir、clopidogrel', '需靠代謝活化，器官功能與基因型可能改變表現'],
      ],
    ),
    callout(
      'warning',
      '生體可用率不是越高越好',
      p('真正的問題是是否可預測、是否能在安全範圍內達到目標濃度。有些局部作用藥物反而希望全身生體可用率低，以減少系統副作用。'),
    ),
  ),
  section(
    'sterile-preparation-stability',
    '無菌製備與安定性',
    lead('無菌製備 (Sterile compounding) 的目標不是把液體混在一起，而是在整個調配與給藥生命週期中同時維持無菌、正確濃度、物理穩定與化學穩定。少一個條件都不算真正安全。'),
    cards([
      { title: '無菌 (Sterility)', body: '避免微生物污染，仰賴環境等級、操作流程、清潔、隔離與人員訓練。' },
      { title: '物理穩定性', body: '避免沉澱、變色、析晶、乳化破壞、分層與顆粒生成。' },
      { title: '化學穩定性', body: '避免氧化、水解、光降解、熱降解與吸附導致有效成分下降。' },
      { title: '微粒與輸注材質相容性', body: '不是藥液看起來清澈就沒問題，PVC 吸附、過濾器堵塞與微粒都可能影響實際劑量。' },
    ]),
    table(
      ['影響因子', '常見後果', '例子', '控制方式'],
      [
        ['光照', '光降解、效價下降、顏色改變', 'Nitroprusside、amphotericin B', '避光袋、避光管路、縮短暴露時間'],
        ['溫度', '分解加速、乳化不穩、析出', '某些抗生素與生物製劑', '依標示冷藏或室溫限制保存'],
        ['pH', '析出、降解速率改變', 'Phenytoin 在低 pH 易析出', '使用建議稀釋液與濃度範圍'],
        ['容器材質', '吸附、浸出或相容性問題', 'Insulin、nitroglycerin 與部分塑膠容器', '選對袋材或 tubing'],
      ],
    ),
    callout(
      'danger',
      '最常見的錯誤不是高深理論，而是基本紀律',
      p('包括使用錯誤稀釋液、超出標示濃度、忽略使用期限、從非無菌操作環境調配高風險注射劑，以及把穩定性資料不足的混合液當成理所當然可用。'),
    ),
  ),
  section(
    'incompatibility-compatibility',
    '配伍禁忌與相容性',
    lead('相容性 (Compatibility) 是輸注安全裡最容易被輕忽的角落。兩種藥都可以打進靜脈，不代表它們可以在同一袋、同一管路、同一 Y-site 混在一起。'),
    table(
      ['問題類型', '表現', '例子', '實務應對'],
      [
        ['物理不相容', '混濁、沉澱、顏色改變、氣泡、分層', 'Calcium 與 phosphate 在 PN 中沉澱', '改分開輸注、調整順序與濃度、查相容資料'],
        ['化學不相容', '效價下降、分解產物形成', 'β-lactam 與部分高鹼性藥物混合後降解', '避免混合、縮短停留時間'],
        ['治療性不相容', '雖然看不見變化，但藥效互相抵消或風險升高', 'Heparin 與某些藥混合造成效價不確定', '從處方邏輯重新檢查是否本來就不該併用'],
        ['管路材質問題', '吸附或釋出影響實際到藥量', 'Nitroglycerin 與 PVC', '更換容器/管路材質'],
      ],
    ),
    h3('遇到配伍疑慮時的處理順序'),
    list([
      '先查標示、藥廠資料與權威相容性資料庫，不要靠記憶硬判斷。',
      '若資料不足，優先採分開管路、分時輸注或更換稀釋液／容器的保守策略。',
      '高風險藥、營養液、電解質濃縮液與兒科劑量更應提高警覺。',
    ]),
    misconceptionList([
      { myth: '透明就代表相容。', correction: '很多化學降解或吸附問題肉眼看不出來，真正的藥量可能已經變少或毒性改變。' },
      { myth: '同類藥物應該都能互相混。', correction: '相容性是分子、濃度、溶媒、溫度與容器條件共同決定，不能只看藥理分類。' },
    ]),
  ),
);

volume2Chapters.ch05 = chapter(
  '處方、調劑與藥品資訊',
  section(
    'prescription-format-legality',
    '處方格式與合法性',
    lead('處方 (Prescription) 不是形式文件，而是具有法律與病人安全意義的醫療指示。任何一個關鍵欄位含糊、遺漏或錯置，都可能從行政瑕疵升級成實際傷害。'),
    tags(['Legal validity', 'Controlled substances', 'LASA', 'Medication order']),
    diagram('medication-system'),
    table(
      ['處方要素', '為何必要', '高風險缺漏', '處理原則'],
      [
        ['病人識別', '確保藥物對到正確個體', '同名同姓、兒童體重錯誤', '至少雙重識別並核對年齡/體重'],
        ['藥品資訊', '藥名、劑量、劑型、頻次、途徑與療程決定可執行性', '缺途徑、缺劑量單位、縮寫不清', '不明確即回頭確認，不自行猜測'],
        ['開立者資訊', '法律責任與追溯', '簽章不完整、資格不符、管制藥規範不符', '依地方法規與機構 SOP 辦理'],
        ['日期與適應症脈絡', '影響是否過期、是否可續配、是否合理', '舊處方被重複使用', '必要時回頭確認病況與療程是否仍適當'],
      ],
    ),
    callout(
      'warning',
      '縮寫是高風險來源',
      p('像 U、IU、QD、QOD、trailing zero、naked decimal 這類縮寫與寫法在很多系統中都是已知錯誤源。電子化不會自動消除它，只是把風險從手寫轉成選單與預設值。'),
    ),
  ),
  section(
    'dispensing-process-verification',
    '調劑流程與核對',
    lead('調劑不是把處方轉成藥袋，而是一個連續的風險控制流程：接收、判讀、臨床審核、配藥、標示、最終核對、交付與紀錄。任何一站失守，都可能把錯誤送到病人手上。'),
    cards([
      { title: '臨床審核', body: '先看適應症、劑量、器官功能、交互作用、重複用藥與過敏，不是先撿藥。' },
      { title: '產品核對', body: '藥名、強度、批號、效期、外觀、劑型與包裝大小都要與系統對上。' },
      { title: '獨立雙重核對', body: '對高警示藥品、兒科劑量、化療與複雜輸注特別重要，但前提是兩人真的獨立思考。' },
      { title: '文件化', body: '任何更正、與醫師溝通、病人拒領或替代方案都要留下可追溯紀錄。' },
    ]),
    list([
      'Five Rights 是起點，不是全部：right patient、drug、dose、route、time 之外，還要加上 right indication、documentation、response、education。',
      '看似低風險的換廠牌、換濃度、換包裝，也是常見錯誤來源。',
      '自動化設備能降低部分錯誤，但 selection bias、barcode 繞過與庫存擺放錯誤仍會發生。',
    ]),
    table(
      ['錯誤型態', '常見原因', '預防措施'],
      [
        ['Look-alike / Sound-alike', '商品名相似、庫位太近、字體辨識差', 'Tall man lettering、分開擺放、掃碼'],
        ['劑量錯誤', '單位換算失誤、濃度概念不清、兒科體重沿用舊值', '標準化計算表、強制欄位、獨立複核'],
        ['錯誤劑型', 'IR/ER 混淆、眼滴/耳滴、吸入器裝置不同', '系統顯示完整劑型、實物比對、衛教時再次確認'],
        ['續配失控', '慢箋、出院帶藥與門診藥未整合', 'Medication reconciliation 與到期提醒'],
      ],
    ),
  ),
  section(
    'drug-labeling-counseling',
    '藥品標示與衛教',
    lead('標示 (Labeling) 與衛教 (Counseling) 是把專業判斷轉成病人能執行的最後一哩。若病人看不懂、做不到、記不住，再完美的處方也只存在於系統裡。'),
    cards([
      { title: '標示要具體', body: '不要只寫「每日一次」。最好寫成「每天早餐後 1 錠」，並標註特殊注意事項。' },
      { title: '衛教要示範', body: '吸入器、注射筆、貼片、分割錠、稀釋沖泡、抗凝自我監測都需要示範與回示。' },
      { title: 'Teach-back', body: '請病人用自己的話說一次怎麼吃、什麼時候停、哪些狀況要聯絡醫療團隊。' },
      { title: '健康識能 (Health literacy)', body: '理解能力、語言、視力、文化背景與照顧者支持都會影響衛教成功率。' },
    ]),
    misconceptionList([
      { myth: '講得越完整，病人越會記得。', correction: '衛教要排序。先講最關鍵的用途、吃法、危險警訊與遺漏處理，再補充細節。資訊過量反而降低吸收。' },
      { myth: '病人點頭就代表理解。', correction: '點頭常只是禮貌或壓力反應。真正可靠的是 teach-back、操作回示與後續追蹤。' },
    ]),
    callout(
      'clinical',
      '衛教也要客製化',
      p('口服抗凝藥、胰島素、抗癲癇藥、化療與器官移植藥物的衛教深度與追蹤頻率，不應與短期止痛藥同一標準。'),
    ),
  ),
  section(
    'drug-information-literature',
    '資訊來源與文獻檢索',
    lead('藥品資訊工作不是資料蒐集比賽，而是用合適層級的證據，回答一個具體且可執行的臨床問題。先定義問題，再決定去哪裡找答案。'),
    table(
      ['資訊層級', '內容', '優點', '限制'],
      [
        ['三級文獻 (Tertiary)', '教科書、資料庫、臨床決策工具', '速度快、便於臨床現場', '可能更新延遲、細節被摘要'],
        ['二級文獻 (Secondary)', 'PubMed、Embase、Cochrane 索引', '幫助定位原始研究', '仍需自己篩選品質'],
        ['一級文獻 (Primary)', 'RCT、cohort、case-control、case report', '最接近原始資料', '需要自己判讀方法學與適用性'],
      ],
    ),
    h3('一個好問題通常長這樣'),
    list([
      '病人/族群是誰？例如高齡 CKD、懷孕、移植、重症。',
      '比較的是什麼？某藥對某藥、加藥對不加藥、短療程對長療程。',
      '終點是什麼？症狀、實驗室數值、住院、死亡、出血、生活品質。',
      '時間範圍是什麼？急性 48 小時與長期一年，答案可能完全不同。',
    ]),
    callout(
      'warning',
      '不要把資料庫答案當成絕對答案',
      p('資料庫與指引是高價值起點，但遇到特殊族群、複雜交互作用或標示外使用時，往往仍要回到原始研究與機構經驗。'),
    ),
    takeawayList([
      { title: '速度與深度要平衡', body: '急診現場多半先用三級文獻建立方向；病房或會診若涉及高風險決策，就要追到一級文獻。' },
      { title: '文獻有效不代表適用', body: '研究族群、終點與你的病人是否一致，往往比 p 值更重要。' },
    ]),
  ),
);

volume2Chapters.ch06 = chapter(
  '藥物治療問題的辨識',
  section(
    'indication-appropriateness',
    '適應症是否正確',
    lead('藥物治療問題 (Drug Therapy Problem, DTP) 的第一個問題不是「這顆藥有沒有副作用」，而是「這顆藥現在到底需不需要」。沒有正確適應症的藥，再安全也只是額外風險。'),
    diagram('medication-review'),
    table(
      ['問題類型', '典型表現', '例子', '處理方向'],
      [
        ['未治療適應症', '病人有問題但沒有對應藥物', '糖尿病合併明顯 ASCVD 卻缺乏二級預防藥物', '補上必要治療'],
        ['無適應症用藥', '原本有理由，現在已不存在', '住院 PPI 出院後被長期延續', '停藥或訂出停藥日期'],
        ['重複治療', '同類藥多開但無明確理由', '兩種 NSAIDs 或兩種 ACEi/ARB 疊加', '整併方案並檢查處方來源'],
        ['錯誤適應症', '藥有用途，但不是對這位病人的問題', '病毒感染濫用抗生素', '重新回到診斷與治療目標'],
      ],
    ),
    callout(
      'clinical',
      '適應症評估不能只看藥袋',
      p('要把病歷、問題清單、檢驗趨勢、照護目標與病人實際症狀一起看。很多無適應症用藥，是因為原始開藥理由沒有被清楚記錄。'),
    ),
  ),
  section(
    'drug-effectiveness',
    '藥物是否有效',
    lead('藥物無效不一定是藥太弱。可能是診斷錯誤、目標錯誤、劑量不足、時間不夠、劑型不對、依從性差、吸收不良或病程本來就不會對這個機轉有反應。'),
    cards([
      { title: '治療目標沒定義', body: '如果沒有定義目標值或改善幅度，就無法判斷是否有效。' },
      { title: '達到濃度但沒反應', body: '可能是機轉不對、疾病嚴重度超過可逆範圍、耐藥或受體改變。' },
      { title: '尚未達評估時點', body: 'SSRIs、DMARDs、部分 biologics 都需要時間，不宜太早判定失敗。' },
      { title: '結果指標選錯', body: '只盯 surrogate marker 可能誤判真實病人獲益。' },
    ]),
    table(
      ['療效不佳原因', '如何辨認', '常見例子'],
      [
        ['劑量不足', '濃度低、反應弱、未達 guideline 強度', '抗生素 underdosing、降壓藥未 titrate'],
        ['治療目標不對', '終點與病人需求不一致', '只追數值，忽略症狀與功能'],
        ['依從性或技巧問題', '病人說有吃但 refill、操作或時機不對', '吸入器、胰島素筆、bisphosphonate'],
        ['機轉不匹配', '有足夠暴露卻沒生理反應', '細菌耐藥、心衰惡化真正原因不是 volume overload'],
      ],
    ),
    misconceptionList([
      { myth: '只要加量就能改善療效。', correction: '若問題在錯誤診斷、錯誤機轉、依從性或吸收，單純加量只會提高毒性。' },
      { myth: '實驗室數值變好就代表治療成功。', correction: '有些 surrogate 改善不一定轉成死亡率、住院或生活品質改善，還要看真正臨床終點。' },
    ]),
  ),
  section(
    'dose-safety',
    '劑量是否安全',
    lead('安全劑量不是固定數字，而是病人、器官功能、交互作用、體型、治療目標與給藥時機共同決定的動態範圍。'),
    table(
      ['情境', '為何變危險', '應注意的線索', '調整方式'],
      [
        ['腎功能突然下降', '清除率下降造成累積', '尿量減少、creatinine 上升、濃度偏高', '減量、延長間隔或暫停'],
        ['低體重或高齡', '分布與代謝能力改變', '鎮靜、跌倒、低血壓', '從低劑量開始，慢慢 titrate'],
        ['肥胖', '若以錯誤體重尺度計算，可能過低或過高', '療效不足或毒性超標', '區分 loading 與 maintenance 該用哪種體重'],
        ['合併抑制代謝藥', '暴露量意外上升', '新增藥後數天出現毒性', '預先查交互作用並設定監測'],
      ],
    ),
    callout(
      'warning',
      '安全不是等於保守',
      p('過度低估劑量同樣可能不安全。例如敗血症早期抗生素、癲癇持續狀態、器官移植免疫抑制若劑量不足，後果同樣嚴重。安全的定義是恰當，而不是一律偏低。'),
    ),
  ),
  section(
    'patient-adherence',
    '病人是否能遵從 (Adherence)',
    lead('依從性 (Adherence) 不只是「病人有沒有聽話」，而是治療計畫是否可被病人的生活、認知、資源與信念實際執行。把問題歸咎於病人，通常只會讓真相更晚出現。'),
    cards([
      { title: '無意圖型不遵從', body: '忘記、看不懂、拿不到藥、瓶身開不了、時程太複雜。' },
      { title: '有意圖型不遵從', body: '擔心副作用、懷疑必要性、症狀改善就自行停藥、與個人信念衝突。' },
      { title: '系統因素', body: '費用、保險限制、供藥不穩、不同醫療院所處方重疊。' },
      { title: '治療設計因素', body: '一天多次、需特殊技巧、食物限制太嚴、監測負擔太高。' },
    ]),
    list([
      '問法要中性，例如「很多人很難每天都照計畫吃，過去一週你最常漏在哪一餐？」通常比「你有沒有乖乖吃藥？」更能得到真實答案。',
      '如果病人無法負擔或無法理解，這不是病人的錯，是治療計畫設計失敗。',
      '簡化方案、固定時間、改長效劑型、用藥盒、數位提醒、照顧者參與，往往比口頭勸說更有效。',
    ]),
    misconceptionList([
      { myth: '病人說有吃藥就代表依從性沒問題。', correction: '自我回報常高估依從性；要搭配 refill history、症狀趨勢、濃度或操作觀察一起看。' },
      { myth: '依從性差表示病人不在乎健康。', correction: '很多真正原因是費用、認知負荷、心理壓力、文化信念與副作用恐懼。找出原因比責備更有用。' },
    ]),
  ),
);

volume2Chapters.ch07 = chapter(
  '特殊族群藥療',
  section(
    'pediatric-pharmacotherapy',
    '小兒用藥',
    lead('小兒藥療不是把成人劑量縮小。新生兒、嬰兒、幼童、學齡兒童與青少年在水分比例、蛋白結合、酵素成熟度、腎功能、受體反應與器官脆弱性都不同。'),
    tags(['Weight-based dosing', 'Body surface area', 'Ontogeny', 'Off-label use']),
    diagram('special-populations'),
    formula('體表面積估算', 'BSA (m2) ~= sqrt((Height(cm) x Weight(kg)) / 3600)', '部分化療與特殊藥物以體表面積計算，但不是所有小兒藥物都適合用 BSA。大多數一般用藥仍以 mg/kg 為主。'),
    table(
      ['年齡層', '藥動學特徵', '常見風險', '實務提醒'],
      [
        ['新生兒', '總體水分比例高、蛋白結合低、肝腎功能未成熟', '藥物累積、bilirubin displacement、劑量間隔過短', '用週齡/日齡校正並注意配方濃度'],
        ['嬰兒', '酵素逐漸成熟但變異大', '體重快速變化導致舊處方失準', '定期更新體重與劑量'],
        ['幼童', '某些代謝途徑可比成人更快', '低估劑量導致療效不足', '不要機械式照成人比例縮小'],
        ['青少年', '接近成人但依從性與風險行為議題浮現', '自行停藥、隱私與家長溝通張力', '衛教對象要包含病人本人'],
      ],
    ),
    callout(
      'warning',
      '兒科錯誤往往是單位錯誤',
      p('mg 與 mL、濃度換算、十倍劑量錯誤、體重用磅數而非公斤，都是兒科最典型也最危險的失誤來源。'),
    ),
  ),
  section(
    'geriatric-polypharmacy',
    '老年醫學與多重用藥 (Polypharmacy)',
    lead('老年藥療最難的不是單一藥物，而是多重用藥 (Polypharmacy) 與脆弱性 (Frailty)。老年病人往往同時有多種慢性病、多位開藥者、不同就醫場域與功能限制，藥物問題是疊加而不是獨立發生。'),
    cards([
      { title: '藥動學改變', body: '腎功能下降、脂肪比例提高、體內總水分下降、低白蛋白與肝血流下降都會改變暴露。' },
      { title: '藥效學改變', body: '對鎮靜、低血壓、抗膽鹼、副交感抑制與出血風險更敏感。' },
      { title: '症候群導向風險', body: '跌倒、譫妄、便秘、尿滯留、食慾差與認知退化，常和藥物直接相關。' },
      { title: '減藥 (Deprescribing)', body: '不是停越多越好，而是把獲益不明、風險上升或與照護目標不符的藥有計畫地退出。' },
    ]),
    table(
      ['工具', '用途', '優點', '限制'],
      [
        ['Beers Criteria', '辨識老年高風險藥物', '快速、常用', '不是絕對禁用清單'],
        ['STOPP/START', '找出不適當用藥與漏開必要治療', '較貼近臨床脈絡', '仍需病人層級判斷'],
        ['Medication appropriateness index', '系統化評估適當性', '較全面', '實務較耗時'],
        ['Frailty / falls assessment', '把功能與風險納入用藥決策', '能接回病人目標', '需跨團隊合作'],
      ],
    ),
    misconceptionList([
      { myth: '老年病人藥都盡量減半就安全。', correction: '有些藥確實要低起始，但感染、心衰、癲癇、凝血等治療若過低，反而造成更大傷害。' },
      { myth: '多重用藥本身就是錯。', correction: 'Polypharmacy 可以是必要也可以是不必要；關鍵是每一項藥是否仍有清楚目標與可接受風險。' },
    ]),
  ),
  section(
    'pregnancy-lactation',
    '妊娠與哺乳',
    lead('妊娠用藥評估不能只問「可不可以用」，而要問「不治療的風險是什麼、在這個妊娠階段的風險是什麼、有哪些替代方案、如何最低化暴露」。'),
    table(
      ['議題', '核心概念', '常見誤解', '實務做法'],
      [
        ['致畸風險', '器官形成期風險最高，但各藥風險不同', '以為過了第一孕期就完全安全', '看特定藥物與孕週，不可一概而論'],
        ['母體病情控制', '母體未控制的癲癇、高血壓、甲狀腺病也會傷害胎兒', '只怕藥、不怕病', '比較治療與不治療的雙向風險'],
        ['哺乳暴露', '乳汁濃度取決於分子量、脂溶性、蛋白結合與半衰期', '只要哺乳就都不能吃藥', '使用 LactMed 等資源並評估嬰兒年齡與狀態'],
        ['標示系統', '新制 PLLR 強調敘述性風險資訊', '還停留在 A/B/C/D/X 簡化分類', '回到具體藥物與情境判讀'],
      ],
    ),
    callout(
      'warning',
      '真正危險的是資訊過度簡化',
      p('把藥物粗暴分成「孕婦可用」與「孕婦禁用」看似方便，但容易忽略劑量、孕期、疾病嚴重度與替代方案品質。'),
    ),
    misconceptionList([
      { myth: '懷孕後所有慢性藥都應先停。', correction: '許多慢性疾病若突然停藥會讓母胎風險更高，例如癲癇、甲狀腺疾病、部分精神科疾病。' },
      { myth: '哺乳只要停餵一天就能避開所有藥。', correction: '是否需要暫停哺乳取決於藥物半衰期、劑量、給藥時機與嬰兒狀況，不是固定一天。' },
    ]),
  ),
  section(
    'renal-hepatic-obese-critically-ill',
    '腎病、肝病、肥胖、重症病人',
    lead('這四類病人共同特徵是藥動學會快速偏離平常人的規則，而且偏離方向未必一致。不能只套一個「減量」公式。'),
    table(
      ['族群', '典型變化', '高風險藥物/情境', '實務重點'],
      [
        ['腎病/透析', '清除下降、尿毒症改變蛋白結合', 'Aminoglycoside、gabapentin、lithium', '確認是否透析可移除與是否需 post-HD 補打'],
        ['肝病', '肝血流、酵素活性與蛋白結合改變', 'Sedatives、opioids、high extraction drugs', '從臨床反應與肝衰嚴重度雙向評估'],
        ['肥胖', 'Vd 與腎清除可能增加，也可能因脂肪比例與血流分配改變', '抗生素 loading、抗凝、鎮靜藥', '分清 total / ideal / adjusted body weight 的用途'],
        ['重症病人', '低灌流、毛細血管滲漏、大量輸液、ARC、器官支持治療', 'β-lactam、vasopressor、鎮靜鎮痛、抗凝', '藥動學是動態變數，需反覆再評估'],
      ],
    ),
    callout(
      'clinical',
      '重症的關鍵不是只怕濃度太高',
      p('很多重症病人早期其實更常出現濃度太低，例如抗生素在大量輸液與 augmented renal clearance 下不易達標，這同樣會增加死亡風險。'),
    ),
  ),
);

volume2Chapters.ch08 = chapter(
  '精準醫療與藥物基因體學',
  section(
    'genetic-variation-drug-response',
    '基因變異與藥物反應',
    lead('藥物基因體學 (Pharmacogenomics) 在問的是：同樣一個藥、同樣劑量，為什麼不同人代謝速度、療效與毒性差這麼多？答案之一是遺傳變異會改變代謝酵素、轉運蛋白、受體與免疫辨識。'),
    tags(['CYP2D6', 'CYP2C19', 'HLA', 'Pharmacogenomics']),
    diagram('pharmacogenomics-roadmap'),
    termGrid([
      { term: 'Genotype', explanation: '基因層級的變異組合，例如 CYP2C19 *1/*2。' },
      { term: 'Phenotype', explanation: '由 genotype 推估出的代謝能力，例如 poor metabolizer (PM) 或 ultrarapid metabolizer (UM)。' },
      { term: 'Actionable variant', explanation: '有足夠證據可改變治療選擇、劑量或監測策略的變異。' },
      { term: 'Gene-drug pair', explanation: '特定基因與特定藥物之間具有臨床可操作關聯。' },
    ]),
    table(
      ['基因', '可能影響', '代表藥物', '臨床結果'],
      [
        ['CYP2D6', '前驅藥活化或原藥清除', 'Codeine、tramadol、部分 antidepressant', 'UM 可能增加活性代謝物毒性；PM 可能無效'],
        ['CYP2C19', '代謝與活化', 'Clopidogrel、PPI、部分 SSRI', 'PM 可能 clopidogrel 活化不足；UM 對部分藥暴露下降'],
        ['CYP2C9 / VKORC1', 'warfarin 清除與敏感度', 'Warfarin', '需要較低起始劑量與更密集 INR 監測'],
        ['TPMT / NUDT15', 'thiopurine 代謝與毒性', 'Azathioprine、mercaptopurine', '骨髓抑制風險明顯升高'],
        ['HLA-B*57:01', '免疫介導超敏反應', 'Abacavir', '未篩檢直接使用可能發生嚴重過敏反應'],
      ],
    ),
    callout(
      'warning',
      '基因不是唯一答案',
      p('腎肝功能、交互作用、年齡、發炎狀態、依從性與疾病本身同樣影響藥物反應。基因型是重要變數，但不是把其他變數全部消掉。'),
    ),
  ),
  section(
    'when-testing-has-clinical-value',
    '檢測何時有臨床價值',
    lead('不是所有藥都值得在使用前做基因檢測。真正有價值的情境通常要同時滿足幾個條件：基因與反應的關聯強、存在可替代方案或可操作劑量建議、檢測結果能在決策時點前取得、而且結果具有重複使用價值。'),
    table(
      ['判斷問題', '若答案是肯定', '若答案是否定'],
      [
        ['是否有高品質指引支持？', '優先考慮檢測，如 CPIC / DPWG 有明確建議', '可先不例行檢測'],
        ['結果是否會改變處方？', '例如改藥、改起始劑量、加強監測', '若不改變決策，檢測價值有限'],
        ['檢測時效是否能符合臨床節奏？', '可在用藥前或早期回報', '急症情境可能不適合等待'],
        ['該結果未來是否可重複使用？', 'pre-emptive genotyping 具有長期價值', '一次性價值低時需權衡成本'],
      ],
    ),
    cards([
      { title: '反應前檢測 (Pre-prescription testing)', body: '在預期會用到某些高風險藥物前先做，適合有明確 gene-drug pair 的系統。' },
      { title: '事件後檢測', body: '病人發生異常毒性或療效失敗後回頭尋找原因，但此時多半已付出成本。' },
      { title: '單基因 vs panel', body: '單基因回答特定問題；panel 可提高未來重用價值，但也增加 VUS 與資料管理複雜度。' },
      { title: '決策支援', body: '若沒有 EHR 警示與可讀取格式，再好的檢測報告也容易被遺忘。' },
    ]),
  ),
  section(
    'clinical-cases-limitations',
    '臨床案例與限制',
    lead('藥物基因體學在某些藥物上非常有力量，但不能把少數成功案例無限外推到所有處方。理解限制，反而能讓你更精準地使用它。'),
    table(
      ['案例', '基因/標記', '可操作行動', '限制'],
      [
        ['Clopidogrel', 'CYP2C19 loss-of-function', '改用 prasugrel 或 ticagrelor（視適應症與出血風險）', '不是所有族群、所有適應症證據都同強'],
        ['Abacavir', 'HLA-B*57:01', '陽性者避免使用', '是高價值篩檢典範，但不代表其他藥都同樣成熟'],
        ['Carbamazepine', 'HLA-B*15:02 / HLA-A*31:01', '高風險族群先檢測', '族群差異顯著，不能忽略 ancestry 背景'],
        ['Thiopurine', 'TPMT / NUDT15', '降起始劑量或改藥', '仍要搭配 CBC 監測，不能因為陰性就完全放心'],
        ['Warfarin', 'CYP2C9 / VKORC1', '起始劑量更個體化', '臨床實施受檢測時效、替代藥與照護流程影響'],
      ],
    ),
    misconceptionList([
      { myth: '基因檢測陰性就代表這個藥一定安全。', correction: '陰性只表示特定基因風險較低，其他非基因風險仍然存在。' },
      { myth: '族群差異代表可以直接用種族替代基因檢測。', correction: '祖源資訊可能提示風險，但不能替代個體檢測，也要避免用粗糙族群分類取代精準醫療。' },
    ]),
  ),
  section(
    'future-directions',
    '未來發展',
    lead('未來的重點不是做更多基因檢測，而是讓結果在正確時間、用正確形式進入臨床工作流。藥物基因體學真正成熟的標誌，是醫療系統能把它無痛整合進處方與追蹤。'),
    cards([
      { title: '預先基因分型 (Pre-emptive genotyping)', body: '在健康時期或就醫初期先建立可重複使用的結果，之後開藥時自動呼叫。' },
      { title: '多組學整合', body: '未來不只看 DNA，也可能結合 RNA、蛋白質、代謝體與微生物相。' },
      { title: 'CDS 決策支援', body: 'EHR 內嵌警示、替代建議與可追溯報告，才能把知識轉成行動。' },
      { title: '倫理與治理', body: '隱私、知情同意、資料保存與保險公平性，會和技術一樣重要。' },
    ]),
    callout(
      'clinical',
      '精準醫療的真正目標',
      p('不是讓每位病人都做最昂貴的檢測，而是讓每位病人在需要時能更快拿到更適合的治療。'),
    ),
  ),
);

volume2Chapters.ch09 = chapter(
  '實證治療學與臨床指引',
  section(
    'evidence-pyramid',
    '證據金字塔與研究設計',
    lead('治療學 (Therapeutics) 的核心不是「照指引開藥」，而是理解證據從哪裡來、可信到什麼程度、是否適用到眼前這位病人。'),
    tags(['Evidence hierarchy', 'RCT', 'External validity', 'Bias']),
    diagram('evidence-therapeutics'),
    table(
      ['研究型態', '擅長回答', '主要弱點', '臨床解讀'],
      [
        ['Randomized controlled trial', '因果效果與療效', '納入族群較選擇性、外部效度可能有限', '看是否與你的病人足夠相像'],
        ['Cohort study', '長期預後、真實世界結果', '殘餘混雜 (Residual confounding)', '適合補足 RCT 未涵蓋族群'],
        ['Case-control', '罕見事件風險因子', '回憶偏差、選擇偏差', '適合探索訊號，不宜過度外推因果'],
        ['Meta-analysis', '整合多研究提高精度', '垃圾進垃圾出、異質性問題', '先看研究品質與一致性，不是只看 pooled p 值'],
      ],
    ),
    callout(
      'warning',
      '高層級證據也可能不適用',
      p('若 RCT 排除高齡、重症、妊娠、嚴重腎病或多重共病病人，那麼它對你眼前病人的外部效度就可能有限。'),
    ),
  ),
  section(
    'treatment-goals-endpoints',
    '治療目標與終點判讀',
    lead('好的治療學決策，要把病人的目標與研究終點對起來。實驗室改善、影像縮小、風險分數下降，都不一定等於病人真正有感的獲益。'),
    formula('絕對風險降低', 'ARR = Control event rate - Treatment event rate', 'ARR 能直接反映病人真正少掉多少風險，比單看相對風險更有臨床感。'),
    formula('治療人數需要數 (NNT)', 'NNT = 1 / ARR', 'NNT 需要和時間範圍一起看，例如一年 NNT 與五年 NNT 的臨床意義不同。'),
    table(
      ['終點類型', '例子', '優點', '限制'],
      [
        ['硬終點 (Hard endpoint)', '死亡、住院、中風、骨折', '直接反映病人重要結果', '事件較少，研究較大且較慢'],
        ['替代終點 (Surrogate)', 'LDL、A1c、血壓、腫瘤縮小', '研究較快、較靈敏', '不一定保證最終臨床結果改善'],
        ['病人回報終點', '疼痛、呼吸困難、生活品質', '貼近病人感受', '受主觀與測量工具影響'],
        ['複合終點', 'CV death / MI / stroke', '增加統計效率', '各組成事件嚴重度不同，易被較輕事件主導'],
      ],
    ),
    misconceptionList([
      { myth: '相對風險降低 50% 就表示效果非常大。', correction: '若基線風險很低，絕對風險降低可能很小。臨床上要同時看 ARR、NNT 與病人基線風險。' },
      { myth: '替代終點改善一定會帶來病人獲益。', correction: '歷史上有不少藥改善 surrogate 卻未改善甚至傷害硬終點，不能直接畫等號。' },
    ]),
  ),
  section(
    'guideline-interpretation',
    '臨床指引如何被正確使用',
    lead('指引 (Guideline) 是有價值的起點，但不是把判斷外包給文件。真正會用指引的人，知道它回答的是「一般情境下最合理的方向」，而不是消除所有病人差異。'),
    cards([
      { title: 'Recommendation strength', body: '強烈建議與弱建議代表證據一致性、效益與風險平衡，以及多數病人是否會做同樣選擇。' },
      { title: 'Evidence certainty', body: '高、中、低品質證據，反映未來新證據推翻目前結論的可能性。' },
      { title: 'Care pathway', body: '好的指引不只列藥名，也交代起始條件、目標、監測與停藥條件。' },
      { title: 'Exceptions matter', body: '重症、妊娠、腎病、極高齡與臨終照護常需要偏離一般指引。' },
    ]),
    table(
      ['讀指引時要問', '原因'],
      [
        ['這個建議的族群和我的病人有多像？', '若族群差太大，指引適用性下降'],
        ['主要獲益是硬終點還是 surrogate？', '有助判斷是否值得承擔成本與副作用'],
        ['建議需要哪些前提？', '例如腎功能、檢測、保險給付、監測能力'],
        ['若病人不想要標準方案，第二選擇是什麼？', 'Shared decision making 不應以「不照指引就是錯」結束對話'],
      ],
    ),
    callout(
      'clinical',
      '指引是地圖，不是導航鎖死',
      p('偏離指引不一定是錯；無意識地偏離才危險。你需要知道自己為什麼偏離，以及要如何補上風險控制。'),
    ),
  ),
  section(
    'benefit-harm-cost',
    '效益、風險與成本的平衡',
    lead('真正的治療決策永遠是多目標平衡：效益、傷害、時間、便利性、費用、可取得性、監測負擔與病人價值排序。'),
    table(
      ['面向', '要問的臨床問題', '常見例子'],
      [
        ['效益', '能減少多少事件、症狀或功能損失？多久看得到？', 'SGLT2 inhibitor 對心腎保護'],
        ['傷害', '有哪些常見與嚴重副作用？是否可逆？', '抗凝出血、免疫抑制感染、opioid 呼吸抑制'],
        ['成本與可近性', '病人拿得到、負擔得起、能持續嗎？', 'Biologics、NOAC、特殊腫瘤藥'],
        ['負擔與偏好', '給藥方式、抽血頻率、生活限制病人能接受嗎？', 'Warfarin 與 DOAC 選擇、每週注射與每日口服偏好'],
      ],
    ),
    takeawayList([
      { title: '沒有零風險治療', body: '決策是比較「哪個風險比較值得承擔」，而不是幻想完全沒有代價。' },
      { title: '成本也是臨床變數', body: '病人若拿不到藥，再好的方案也沒有真實效益。' },
    ]),
  ),
);

volume2Chapters.ch10 = chapter(
  '治療藥物監測與高警示藥品',
  section(
    'tdm-core',
    '治療藥物監測 (Therapeutic Drug Monitoring) 核心原理',
    lead('治療藥物監測 (TDM) 的目的不是追求某個漂亮數字，而是用濃度資料協助回答臨床問題：療效不足是不是因為暴露不夠？毒性是不是因為暴露太高？下一步應該改多少？'),
    tags(['Peak', 'Trough', 'AUC', 'Sampling time']),
    diagram('tdm-safety'),
    table(
      ['適合 TDM 的藥物特徵', '原因'],
      [
        ['窄治療窗', '治療與毒性濃度距離近'],
        ['濃度與效果/毒性關聯明確', '抽到的數值能導向具體行動'],
        ['個體差異大而臨床表現難單看症狀判斷', '如腎功能、交互作用、基因型差異大'],
        ['有可靠檢驗方法與可操作時機', '不然抽了也很難解釋'],
      ],
    ),
    callout(
      'warning',
      '抽對時間比算對公式更重要',
      p('一個錯誤時點的濃度值，會讓後續所有調整都偏掉。先確認最後一次給藥時間、抽血時間、給藥間隔與病人是否已達穩態。'),
    ),
  ),
  section(
    'high-alert-medications',
    '高警示藥品 (High-Alert Medications)',
    lead('高警示藥品不是發生錯誤特別多，而是一旦錯誤發生，傷害特別大。管理它們的關鍵是標準化、限制變異與讓錯誤更難通過系統。'),
    table(
      ['類別', '典型風險', '高頻錯誤', '預防策略'],
      [
        ['Insulin', '嚴重低血糖或高血糖失控', '單位誤讀、基礎與餐時混淆、滑動尺度使用不當', '標準 order set、胰島素名稱完整化、血糖與飲食同步'],
        ['Anticoagulants', '出血或栓塞', '適應症不清、重複抗凝、腎功能未調整、bridging 誤用', '適應症導向流程與腎功能檢查'],
        ['Opioids', '呼吸抑制、鎮靜、跌倒', '多重中樞抑制藥疊加、劑量換算錯誤', '等效劑量換算、naloxone 風險教育'],
        ['Concentrated electrolytes', '心律不整、死亡', '濃縮鉀直接推注、稀釋錯誤', '集中儲存、預混液、泵浦限制'],
      ],
    ),
    cards([
      { title: '標準化濃度', body: '尤其在 ICU 與兒科，減少臨時心算與自訂濃度可大幅降低錯誤。' },
      { title: '智慧泵浦 (Smart pump)', body: '有助攔截速率錯誤，但前提是藥庫維護與使用者不繞過。' },
      { title: '獨立雙核對', body: '要真正獨立，不是一起看同一張單。' },
      { title: '高風險交班', body: '劑量剛調整、剛停藥、剛逆轉、剛出血或剛低血糖處理後，最需要清楚交班。' },
    ]),
  ),
  section(
    'sampling-interpretation',
    '採樣、解讀與個別化調整',
    lead('濃度數值本身沒有意義，必須放回給藥方案、腎肝功能、感染嚴重度、採樣時點與臨床反應一起看。'),
    formula('校正 phenytoin（低白蛋白時）', 'Corrected phenytoin ~= Measured / (0.2 x albumin + 0.1)', '這是常用近似式，但在腎衰竭或危重病時仍可能不準，必要時直接測 free phenytoin。'),
    table(
      ['藥物', '常看什麼', '抽血時機', '解讀重點'],
      [
        ['Vancomycin', 'AUC/MIC 或 trough（視制度）', '穩態附近，依方案抽一到兩點', '只追高 trough 已非最佳策略，應兼顧腎毒性'],
        ['Aminoglycoside', 'Peak 與 trough 或 extended-interval nomogram', '依給藥方式而定', '高 peak 常與效果相關，高 trough 常與毒性相關'],
        ['Lithium', '12 小時 trough', '達穩態後與變更劑量後', '脫水、NSAIDs、ACEi、thiazide 都可能讓濃度突然上升'],
        ['Tacrolimus', 'Trough', '下次給藥前', '新藥加入、腹瀉、肝功能變化都會改變濃度'],
      ],
    ),
    callout(
      'clinical',
      '別忘了問臨床問題是什麼',
      p('如果病人明顯改善、沒有毒性，而濃度稍微偏出傳統範圍，處置不一定是立刻改藥。反之，若病人毒性明顯，濃度落在所謂範圍內也不能掉以輕心。'),
    ),
  ),
  section(
    'system-error-prevention',
    '系統性錯誤預防',
    lead('高警示用藥安全不能只靠個人小心。真正有效的是把系統設計成即使有人分心，錯誤也不容易穿透到病人。'),
    list([
      '建立標準 order set、標準濃度、標準稀釋與標準監測節點。',
      '把高風險單位、相似藥名、複雜換算與限制條件做成系統層級硬性欄位。',
      '針對低血糖、出血、過量、逆轉與暴露事件建立回饋機制，而不是只追究個人。',
    ]),
    misconceptionList([
      { myth: '發生錯誤就是某個人不夠小心。', correction: '多數嚴重用藥錯誤是多層系統漏洞堆疊，不是單點道德失敗。' },
      { myth: '有警示就安全。', correction: '過多低價值警示會造成 alert fatigue。高風險警示必須少而精準。' },
    ]),
  ),
);

volume2Chapters.ch11 = chapter(
  '減藥、轉銜照護與共享決策',
  section(
    'medication-reconciliation',
    '用藥整合 (Medication Reconciliation)',
    lead('用藥整合不是抄藥單，而是確認「病人實際在吃什麼」、「系統上寫的是什麼」、「現在應該繼續的是什麼」。住院、轉科、出院與跨院就醫時最容易出錯。'),
    table(
      ['步驟', '核心問題', '常見失誤'],
      [
        ['建立最佳可能藥史', '病人實際在用什麼？劑量、頻次、非處方、草藥？', '只看院內系統、不問病人與家屬'],
        ['比較', '哪些應續用、停用、替代、暫停？', '住院臨時藥被當成長期藥帶出院'],
        ['溝通', '病人與下個照護點有沒有收到同一版本資訊？', '出院摘要、藥袋與口頭說明互相矛盾'],
        ['文件化', '為什麼停？為什麼改？何時再評估？', '沒有留下停藥理由，後續又被重新開回'],
      ],
    ),
    callout(
      'warning',
      '轉銜錯誤常不是新增藥，而是舊藥被默默延續或默默消失',
      p('例如 ICU stress ulcer prophylaxis、鎮靜藥、PRN 止吐藥、住院抗凝或短期抗生素，在出院時特別容易被不恰當地帶走。'),
    ),
  ),
  section(
    'deprescribing-framework',
    '減藥 (Deprescribing) 框架',
    lead('減藥不是反藥，而是把時間、風險與照護目標放回藥物清單裡。隨著病人年齡、疾病嚴重度與生命目標改變，原本合理的藥物可能不再合理。'),
    cards([
      { title: '找出候選藥物', body: '無適應症、獲益時間太長、風險已超過效益、與照護目標不符、造成症狀負擔。' },
      { title: '判斷能否直接停', body: '需考慮反彈、戒斷與疾病再惡化風險；某些藥必須漸減。' },
      { title: '和病人談目標', body: '減藥成敗常取決於病人是否理解停藥不是放棄，而是重新排序目標。' },
      { title: '追蹤結果', body: '停藥後要有再評估計畫，才能知道是否成功或需恢復。' },
    ]),
    table(
      ['藥物類型', '減藥時要警覺', '範例'],
      [
        ['PPI', '原始適應症是否仍存在、反彈胃酸分泌', '住院後長期延續'],
        ['Benzodiazepine', '戒斷、焦慮反跳、睡眠惡化', '高齡跌倒與認知風險'],
        ['β-blocker / clonidine', '反跳性心跳加快或高血壓', '需漸進式調整'],
        ['Hypoglycemic agents', 'A1c 目標是否已改變、低血糖風險', '高齡或臨終照護病人'],
      ],
    ),
  ),
  section(
    'shared-decision-making',
    '共享決策 (Shared Decision Making)',
    lead('共享決策不是把所有責任丟給病人，而是把專業證據與病人的價值排序放進同一個決策過程。'),
    list([
      '先釐清病人最在乎的是活得久、症狀少、少回醫院、少抽血，還是生活自由度更高。',
      '用病人能理解的方式說明選項、效益機率、主要風險與不確定性。',
      '承認沒有完美方案，並把 trade-off 講清楚。',
    ]),
    misconceptionList([
      { myth: 'Shared decision making 就是讓病人自己選。', correction: '共享決策仍需要專業建議。真正的重點是讓建議透明、可理解且符合病人價值。' },
      { myth: '病人拒絕標準治療就是不理性。', correction: '病人可能是在不同目標間做排序。關鍵是確認資訊完整、誤解被澄清，並記錄共同決策過程。' },
    ]),
  ),
  section(
    'transitions-follow-up',
    '轉銜追蹤與出院後用藥管理',
    lead('出院不是治療結束，而是另一段風險期的開始。很多再入院、急診回診與嚴重副作用，都發生在病人剛離開醫院的一到兩週內。'),
    table(
      ['出院要素', '最低標準'],
      [
        ['最終藥單', '清楚標出新增、停用、調整原因與療程長度'],
        ['監測計畫', '何時抽血、回診、看哪個症狀要提早就醫'],
        ['責任交接', '門診醫師、社區藥局、長照或居家護理是否知道變更內容'],
        ['病人確認', '病人是否真的拿到藥、會使用、付得起、知道警訊'],
      ],
    ),
    callout(
      'clinical',
      '沒有追蹤計畫的停藥與加藥，都只完成一半',
      p('真正完整的用藥管理，應同時交代下一步觀察什麼、多久回來、若沒有達標要怎麼辦。'),
    ),
  ),
);

volume2Chapters.ch12 = chapter(
  '生物製劑、核酸藥物與新興治療平台',
  section(
    'biologics-vs-small-molecules',
    '小分子藥物與生物製劑的差異',
    lead('現代治療不再只有傳統小分子藥物。單株抗體 (Monoclonal antibodies)、融合蛋白 (Fusion proteins)、核酸藥物 (Nucleic acid therapeutics)、細胞與基因治療正快速改變治療地圖。理解平台差異，比背藥名更重要。'),
    tags(['Small molecule', 'Monoclonal antibody', 'mRNA', 'Gene therapy']),
    diagram('advanced-therapies'),
    table(
      ['面向', '小分子藥物', '生物製劑/新平台'],
      [
        ['分子大小', '小、可進細胞內，常可口服', '大、通常注射給藥，多作用於細胞外或特定標靶'],
        ['製造方式', '化學合成為主', '生物系統製造、結構更複雜'],
        ['代謝途徑', '常依賴 CYP、轉運蛋白', '多靠網狀內皮或蛋白降解途徑，不一定走 CYP'],
        ['交互作用型態', '酵素與轉運蛋白交互作用常見', '免疫原性、target-mediated disposition、輸注反應更常見'],
      ],
    ),
    callout(
      'warning',
      '不能把 biologic 當成「大分子版本的傳統藥」',
      p('它們在保存、給藥、毒性、監測、免疫原性與費用結構上都有顯著差異。'),
    ),
  ),
  section(
    'monoclonal-antibodies-fusion-proteins',
    '單株抗體、融合蛋白與抗體藥物複合體',
    lead('單株抗體可以中和配體、阻斷受體、標記免疫系統或運送毒素；融合蛋白則把兩種蛋白功能拼接起來；抗體藥物複合體 (ADC) 進一步把抗體變成導引飛彈。'),
    cards([
      { title: 'Monoclonal antibody', body: '常見於腫瘤、自體免疫與發炎治療，命名字尾常見 -mab。' },
      { title: 'Fusion protein', body: '把受體片段、Fc 區或其他蛋白模組串接，常用於攔截 cytokine 或延長半衰期。' },
      { title: 'ADC', body: '抗體把細胞毒藥載到特定細胞附近，但仍需留意 payload 洩漏與 off-target toxicity。' },
      { title: 'Biosimilar', body: '是高度相似，不是完全相同的 generic；重點在臨床無顯著差異而非分子每點都一樣。' },
    ]),
    table(
      ['風險', '為何發生', '臨床表現', '應對'],
      [
        ['輸注反應', '免疫活化、補體反應或釋放反應', '發燒、發冷、低血壓、呼吸症狀', '預處置、調整輸注速率、緊急處置準備'],
        ['免疫原性', '病人體內產生 anti-drug antibody', '療效下降、過敏或清除改變', '必要時監測 trough / ADA 並調整策略'],
        ['感染風險', '免疫路徑被抑制', 'TB、HBV reactivation、機會性感染', '治療前篩檢與疫苗規劃'],
        ['目標外毒性', '靶點在正常組織也有表現或下游效應過廣', '皮膚、肝、腸、肺毒性', '建立特定器官監測流程'],
      ],
    ),
  ),
  section(
    'nucleic-acid-therapies-cell-gene-therapy',
    '核酸藥物、細胞治療與基因治療',
    lead('核酸藥物把治療從「給蛋白」推向「改寫訊息」。mRNA 疫苗、siRNA、antisense oligonucleotide (ASO)、基因補充與 CAR-T，都屬於不同層次的訊息干預。'),
    table(
      ['平台', '做法', '代表優勢', '關鍵挑戰'],
      [
        ['mRNA', '提供模板讓細胞暫時製造蛋白', '設計彈性高、開發速度快', '遞送、穩定性、免疫活化'],
        ['siRNA / ASO', '抑制或調整特定 RNA', '可針對難以藥物化的標的', '組織遞送與脫靶效果'],
        ['Gene addition/editing', '補上或修改 DNA 序列', '有機會一次性治療', '長期安全性、脫靶與成本'],
        ['CAR-T / cell therapy', '改造病人細胞後回輸', '高度個體化、可產生深度反應', 'cytokine release syndrome、製程與可近性'],
      ],
    ),
    callout(
      'danger',
      '新平台的風險不會因為精準就消失',
      p('相反地，越精準的療法常伴隨越高的製程複雜度、成本、急性免疫毒性與長期不確定性，需要更嚴密的系統管理。'),
    ),
  ),
  section(
    'biosimilars-immunogenicity-access',
    '免疫原性、互換性與可近性',
    lead('新型治療平台的最後一道現實考驗，是病人能否真正取得、負擔、持續並安全接受。這牽涉保險、儲存、輸注中心、教育與長期追蹤。'),
    cards([
      { title: '免疫原性 (Immunogenicity)', body: '病人體內對 biologic 產生抗體可能讓療效下降、清除改變或產生過敏。' },
      { title: '互換性 (Interchangeability)', body: '對 biosimilar 需要理解法規與機構規範，不是看到相似就任意切換。' },
      { title: '冷鏈與配送', body: '很多 biologic 對儲存條件敏感，供應鏈即是治療的一部分。' },
      { title: '公平與可近性', body: '價格、保險、地理可及性與教育落差，會直接影響誰能受惠於先進治療。' },
    ]),
    misconceptionList([
      { myth: '生物相似藥就是生物製劑的學名藥。', correction: 'biososimilar 與小分子 generic 的概念不同，需經高度相似與無臨床差異證明，但分子本身不可能逐原子完全一樣。' },
      { myth: '基因治療做完就一勞永逸。', correction: '有些平台確實可能帶來長期效果，但仍需長期追蹤安全性、持久性與後續支持療法需求。' },
    ]),
  ),
);
