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
const viewer = (initialScene: string) => `<medical-3d-viewer initial-scene="${initialScene}"></medical-3d-viewer>`;

const spotlight = (title: string, text: string) => `
  <div class="spotlight">
    <h3>${title}</h3>
    <p>${text}</p>
  </div>
`;

const summary = (title: string, text: string, bullets: string[]) => `
  <div class="chapter-summary">
    <h3>${title}</h3>
    <p>${text}</p>
    ${list(bullets)}
  </div>
`;

export const volume3Chapters: Record<string, ChapterContent> = {};

volume3Chapters.ch01 = chapter(
  '高血壓 (Hypertension)',
  section(
    'anatomy-physiology',
    '正常解剖與生理',
    lead('高血壓 (Hypertension) 不只是「血壓數字高」，而是血流動力學 (Hemodynamics)、腎臟壓力排鈉 (Pressure natriuresis)、交感神經 (Sympathetic nervous system)、腎素-血管張力素-醛固酮系統 (Renin-Angiotensin-Aldosterone System, RAAS) 與血管內皮 (Endothelium) 長期失衡後的系統性疾病。正常狀態下，左心室把血液打入富有彈性的主動脈與中型動脈；腎臟透過鈉水排泄維持循環容量；內皮製造一氧化氮 (Nitric Oxide, NO) 抑制血管收縮與血小板活化。'),
    p('當我們說「外周阻力 (Systemic vascular resistance) 上升」，實際上牽涉的是小動脈平滑肌張力、血管壁重塑、管腔半徑縮小與血管順應性 (Compliance) 下降。尤其在老年病人，脈搏壓 (Pulse pressure) 變寬常不是心輸出量增加，而是大動脈硬化讓收縮壓被推高、舒張壓反而下降。'),
    tags(['RAAS', 'Baroreflex', 'Endothelium', 'Pressure natriuresis', 'Arterial compliance']),
    viewer('hypertension'),
    diagram('cv-hemodynamics'),
    cards([
      { title: '腎臟 (Kidney)', body: '真正的長期血壓設定器。當鈉排不出去、有效動脈血量感受錯誤或腎小球入出球張力被改寫，血壓就容易被向上重設。' },
      { title: '內皮 (Endothelium)', body: '內皮不只是內襯，而是活躍的內分泌器官。NO、前列環素 (Prostacyclin) 與內皮素 (Endothelin) 的平衡決定血管反應性。' },
      { title: '交感神經 (SNS)', body: '急性壓力、疼痛、睡眠呼吸中止與肥胖都會促進交感活化，使心跳、收縮力與外周阻力同步上升。' },
      { title: '血管壁 (Vascular wall)', body: '高血壓會讓中層平滑肌肥厚、膠原蛋白沉積與彈性蛋白斷裂，長期形成惡性循環。' },
    ]),
    formula('NO 生成反應', 'L-arginine + O2 + NADPH -> NO + L-citrulline', '這條由內皮型一氧化氮合酶 (eNOS) 催化的反應，是血管舒張與抗發炎保護的重要來源。吸菸、糖尿病、氧化壓力與慢性發炎都會讓這條路徑失衡。'),
    summary('正常生理關鍵句', '血壓來自心輸出量 (Cardiac output) 與外周阻力的乘積，但長期穩定與否，核心仍落在腎臟、血管內皮與神經荷爾蒙系統如何互相校正。', [
      '短期調節看 baroreflex，長期調節看 sodium balance。',
      '收縮壓與舒張壓反映不同血管特性，不能用同一套想像理解。',
      '高血壓是器官網路失衡，不是單一器官問題。',
    ]),
  ),
  section(
    'symptoms',
    '常見主訴與症狀',
    lead('大多數原發性高血壓 (Primary hypertension) 病人沒有明顯症狀，這也是它被稱為 silent disease 的原因。頭痛、肩頸痠痛、臉紅、頭暈都不具特異性，常讓病人把偶發不適過度歸因於血壓，也讓真正危險的器官傷害被延後發現。'),
    p('真正需要警覺的是急性器官損傷徵象，例如劇烈胸痛、神經學缺損、急性視力模糊、肺水腫、急性腎損傷或妊娠子癇前症 (Preeclampsia) 的警訊。臨床上也常見相反誤區：病人平常沒有不舒服，就以為血壓控制可有可無。'),
    table(
      ['臨床情境', '常見主訴', '真正代表什麼', '要不要急'],
      [
        ['門診初次發現', '沒有症狀，健檢發現 BP 168/96 mmHg', '常見於長期未診斷的原發性高血壓', '需確認量測與分層，但不屬急症'],
        ['白袍高血壓 (White-coat HTN)', '診間緊張、心悸', '診間高，居家正常', '需用居家或 24 小時動態血壓驗證'],
        ['高血壓急症 (Hypertensive emergency)', '胸痛、喘、神智改變、視力變差', '已有急性器官損傷', '是，需立即降壓且選擇 IV 藥物'],
        ['繼發性高血壓 (Secondary HTN)', '年紀輕、突然惡化、反覆低鉀或頭痛盜汗', '可能是腎血管、內分泌或藥物誘發', '需主動追查原因'],
      ],
    ),
    callout(
      'clinical',
      '真實場景',
      p('一位 47 歲男性業務主管，每次頭痛就去藥局量血壓，看到 150/95 mmHg 便認為「今天工作壓力太大」。真正的問題是他已經連續三年在不同場合測到偏高數值，且最近因膝痛每天服用 ibuprofen。對這種病人，頭痛本身不是高血壓特異症狀，但反覆被高血壓數據包圍的事實，才是診斷切入點。'),
    ),
    takeawayList([
      { title: '沒有症狀，不等於沒有傷害', body: '眼底、腎臟、左心室與腦小血管常在病人沒有明顯主訴時持續受損。' },
      { title: '症狀很重，也不一定就是高血壓造成', body: '許多焦慮、疼痛、眩暈或偏頭痛病人在不適時血壓也會升高，但病因不一定在血壓本身。' },
      { title: '關鍵是器官傷害線索', body: '胸痛、呼吸困難、局部神經學缺損、少尿、乳頭水腫才會把高血壓推進急症邏輯。' },
    ]),
  ),
  section(
    'pathophysiology',
    '重要疾病機轉',
    lead('原發性高血壓約占大多數病例，但「原發性」不等於沒有原因，而是表示沒有單一可切除病因。實際上常見的機轉包含鈉敏感性 (Salt sensitivity)、肥胖與胰島素阻抗、交感活化、腎絲球高灌流後的壓力排鈉曲線右移、血管內皮功能障礙與基因背景。'),
    p('繼發性高血壓則要想到腎實質疾病、腎動脈狹窄、原發性醛固酮增多症 (Primary aldosteronism)、嗜鉻細胞瘤 (Pheochromocytoma)、庫欣症候群 (Cushing syndrome)、甲狀腺疾病、阻塞型睡眠呼吸中止症 (OSA) 與藥物誘發。年輕病人突然很高、三種藥仍壓不住、低鉀或夜間打鼾明顯，都不應只當作難控制的原發性高血壓。'),
    diagram('cv-hemodynamics'),
    table(
      ['機轉', '發生了什麼', '臨床線索', '常見對應治療'],
      [
        ['RAAS 活化', 'Angiotensin II 促進收縮與醛固酮分泌，造成鈉水滯留', '糖尿病、CKD、蛋白尿、腎血管疾病', 'ACEi、ARB、MRA'],
        ['交感過強', '心跳快、收縮力增加、血管收縮', 'OSA、焦慮、甲狀腺亢進、停藥反跳', '生活型態處理、β-blocker 視情況使用'],
        ['血管硬化', '大動脈順應性下降，收縮壓升高', '老年人 isolated systolic HTN', 'DHP CCB、thiazide、整體風險控制'],
        ['腎臟鈉滯留', '壓力排鈉需要更高血壓才啟動', '肥胖、CKD、高鹽飲食', '限鹽、利尿劑、RAAS 阻斷'],
      ],
    ),
    callout(
      'warning',
      '容易忽略的藥物性高血壓',
      p('NSAIDs、口服避孕藥、類固醇、鼻塞用去充血劑、calcineurin inhibitor、erythropoietin、酒精與某些中草藥都可能讓血壓惡化。病人說「最近沒有新增處方藥」時，別忘了問非處方藥與保健品。'),
    ),
    misconceptionList([
      { myth: '高血壓就是血太濃或血太多。', correction: '血壓上升主要來自血管阻力、神經荷爾蒙與鈉水平衡改寫，不是單純血液濃稠。血比容高可以影響黏滯度，但不是多數高血壓的主機轉。' },
      { myth: '只要不吃鹽，高血壓就會好。', correction: '限鹽有效，但個體差異很大。若已有 RAAS 活化、血管硬化、CKD、OSA 或藥物誘發，單靠限鹽通常不夠。' },
    ]),
  ),
  section(
    'diagnosis',
    '診斷思路與鑑別診斷',
    lead('高血壓診斷的第一步不是立刻開藥，而是先確認數字可信。診間量測要有正確袖帶、休息時間、姿勢、雙臂比較與重複測量；如果條件不標準，再漂亮的演算法都只是在分析錯數據。'),
    p('接著要問三件事：這是持續性高血壓還是白袍/隱匿性高血壓？是否已有靶器官損傷 (Target-organ damage)？有沒有繼發性線索？第三件事最常被忽略，因為臨床容易在看到數字後就把病人塞回「慢性病追蹤」流程。'),
    table(
      ['步驟', '要點', '常見錯誤'],
      [
        ['確認量測', '袖帶尺寸正確、上臂高度與心臟同高、連續至少 2 次', '用過小袖帶、講話、剛走進診間就測'],
        ['確認型態', '居家血壓 (HBPM) 或 24 小時動態血壓 (ABPM)', '只憑單次診間數值診斷終身疾病'],
        ['器官風險', '眼底、腎功能、左心室肥厚、腦血管史', '只記血壓，沒記器官結果'],
        ['找 secondary cause', '低鉀、年輕起病、惡化太快、resistant HTN', '多藥無效卻沒追腎血管與內分泌病因'],
      ],
    ),
    callout(
      'info',
      '鑑別診斷不是只有疾病，也包含量測狀態',
      p('偽性高血壓 (Pseudohypertension)、白袍高血壓、測量姿勢不對、手臂粗大導致袖帶不合，以及動脈僵硬造成的讀值偏差，都可能讓病人被誤分類。'),
    ),
    list([
      '若懷疑原發性醛固酮增多症：注意低鉀、代謝性鹼中毒、腎上腺結節、家族早發中風史。',
      '若懷疑腎血管性高血壓：突然腎功能惡化、聽到腹部雜音、ACEi/ARB 後 creatinine 明顯上升。',
      '若懷疑嗜鉻細胞瘤：陣發性頭痛、盜汗、心悸、蒼白與血壓劇烈波動。',
      '若懷疑 OSA：肥胖、鼾聲大、白天嗜睡、晨起頭痛與抗藥性高血壓。',
    ]),
  ),
  section(
    'investigations',
    '關鍵檢查與判讀',
    lead('高血壓的檢查不是為了堆疊單據，而是用最低成本回答三個問題：有沒有器官傷害？有沒有繼發性病因？用藥前後要怎麼監測安全性？'),
    table(
      ['檢查', '用途', '關鍵判讀'],
      [
        ['BMP/CMP', '看 creatinine、eGFR、Na、K', '低鉀要想到 aldosteronism；腎功能是選藥與追蹤基線'],
        ['尿液常規與尿白蛋白/肌酸酐比 (UACR)', '檢查蛋白尿與腎受損', '有 albuminuria 時 ACEi/ARB 尤其重要'],
        ['心電圖 (ECG)', '看左心室肥厚、缺血、心律', '正常 ECG 不排除 LVH，敏感度有限'],
        ['眼底檢查', '評估高血壓視網膜病變', '出血、棉絮斑與乳頭水腫提示嚴重或急性傷害'],
        ['Aldosterone/Renin ratio', '篩原發性醛固酮增多症', '要注意抽血姿勢與藥物干擾'],
        ['腎臟超音波或血管影像', '找腎結構病或腎動脈狹窄', '不是所有人都做，但對線索明確者價值高'],
      ],
    ),
    h3('實務上最常被忽略的判讀細節'),
    list([
      'ACEi/ARB 開始後 creatinine 小幅上升不一定是壞事，但上升幅度過大要想雙側腎動脈狹窄、脫水或 NSAID 影響。',
      '高血壓病人若伴隨夜間不降壓 (Non-dipping) 現象，ABPM 會比門診值更能預測風險，尤其在糖尿病與 CKD。',
      '單次正常尿蛋白不代表腎臟安全，糖尿病與高血壓病人仍需依風險定期追蹤 UACR。',
    ]),
    spotlight('檢查排序思維', '年輕、很高、很難控制、伴低鉀或器官損傷不成比例，就把 secondary workup 提前；中年、肥胖、家族史明顯、無特別紅旗者，先從量測確認、基本器官風險與生活型態切入最有效。'),
  ),
  section(
    'treatment',
    '第一線與第二線治療',
    lead('高血壓治療不是單純「數字壓下來」，而是降低中風、心肌梗塞、心衰竭、腎病與死亡風險。多數病人需要生活型態與藥物雙軌並進，許多人從一開始就需要雙藥併用。'),
    table(
      ['情境', '第一線策略', '常見配合', '注意事項'],
      [
        ['一般門診原發性 HTN', 'ACEi/ARB、thiazide-like diuretic、DHP CCB 任選或併用', 'ARB + amlodipine；ACEi + chlorthalidone', '避免 ACEi 與 ARB 併用'],
        ['糖尿病或蛋白尿 CKD', '優先 ACEi 或 ARB', '再加 DHP CCB 或利尿劑', '監測 creatinine 與 K'],
        ['老年 isolated systolic HTN', 'DHP CCB、thiazide-like diuretic', 'Amlodipine + indapamide', '避免過度降壓造成跌倒或冠灌流下降'],
        ['Resistant HTN', '確認依從性與次要病因後加 MRA', 'Spironolactone 常是第四線核心', '要先排 pseudoresistance'],
      ],
    ),
    cards([
      { title: '生活型態 (Lifestyle)', body: '限鹽、體重下降、規律運動、減少酒精、停止吸菸與改善睡眠呼吸中止，對風險與用藥需求都有實際影響。' },
      { title: '固定劑量複方 (Single-pill combination)', body: '對於需要兩種以上藥物的病人，固定複方常能提升遵從性、減少忘記吃半套藥的情況。' },
      { title: '高血壓急症', body: '不是所有數字很高都要急降。只有伴隨急性器官損傷時，才用 IV 藥物如 nicardipine、clevidipine、labetalol 等按情境處理。' },
      { title: '高血壓急迫症 (Urgency)', body: '若沒有急性器官傷害，通常不需要在急診把數字硬拉到正常，重點是安排短期追蹤與長期調整。' },
    ], 'comparison-grid'),
    callout(
      'success',
      '常見有效組合',
      p('ACEi 或 ARB 加上 DHP CCB，對多數中高風險病人是很實用的雙藥底座；若有明顯體液滯留、老年單純收縮壓高或鹽分敏感，thiazide-like diuretic 常能補上效果。'),
    ),
  ),
  section(
    'pharmacology',
    '常用藥物機轉、副作用、交互作用',
    lead('高血壓藥物選擇的本質，是把機轉、器官保護與副作用地圖對起來。不是因為某藥「最強」就每個人都用，而是看這個病人當前的 hemodynamic 與 organ-risk profile。'),
    table(
      ['類別', '代表藥', '主要機轉', '常見副作用', '實務提醒'],
      [
        ['ACEi', 'Enalapril, Lisinopril', '抑制 Angiotensin I -> II', '咳嗽、高血鉀、creatinine 上升、血管性水腫', '蛋白尿腎病有保護，但孕婦禁用'],
        ['ARB', 'Losartan, Valsartan', '阻斷 AT1 receptor', '高血鉀、腎功能變化', '咳嗽較少，與 ACEi 不需並用'],
        ['DHP CCB', 'Amlodipine, Nifedipine ER', '擴張血管平滑肌', '下肢水腫、臉潮紅、牙齦增生', '水腫不代表一定心衰竭惡化'],
        ['Thiazide-like', 'Chlorthalidone, Indapamide', '抑制遠曲小管 NaCl 再吸收', '低鈉、低鉀、高尿酸、高血糖', '對老年與鹽敏感病人常很有效'],
        ['β-blocker', 'Metoprolol, Bisoprolol, Carvedilol', '降低心跳、抑制 renin', '疲倦、心跳慢、掩蓋低血糖症狀', '不是單純 HTN 的萬用第一線，但有 CAD、HF、arrhythmia 時很有價值'],
      ],
    ),
    formula('Losartan 的藥物基因體學提示', 'CYP2C9 + Losartan -> active metabolite EXP3174', '雖然日常高血壓治療不常因 CYP2C9 直接做基因檢測，但肝代謝差異與藥物交互作用仍可能影響反應。'),
    formula('Hydrochlorothiazide 分子式', 'C7H8ClN3O4S2', 'thiazide 類利尿劑的代表結構提醒我們：它雖然拿來降壓，但真正起點是在腎小管，而非血管本身。'),
    callout(
      'danger',
      '高風險交互作用',
      p('ACEi/ARB + potassium supplement + MRA + CKD + NSAID 是高鉀與腎損傷的經典組合；β-blocker 與 non-DHP CCB 併用則可能造成過慢心跳或 AV block。'),
    ),
  ),
  section(
    'special-populations',
    '特殊族群考量',
    lead('特殊族群的關鍵不是「背額外規則」，而是先辨認哪個生理假設已經失效。老年人血管僵硬、孕婦有胎盤灌流考量、CKD 病人對鉀與 creatinine 更敏感、年輕人則更需要積極追 secondary cause。'),
    cards([
      { title: '孕婦 (Pregnancy)', body: '首選常為 labetalol、nifedipine ER 或 methyldopa；ACEi、ARB、direct renin inhibitor 應避免，因為有胎兒毒性。' },
      { title: 'CKD', body: '蛋白尿時 RAAS block 重要，但要接受一定幅度的 creatinine 變動並嚴密監測高鉀；合併利尿劑常能增加效果。' },
      { title: '老年與脆弱病人', body: '目標血壓需要與跌倒、姿勢性低血壓、腦灌流與多重用藥風險一起看，不是越低越好。' },
      { title: '兒童與青少年', body: '高血壓比例較成人少，但 secondary cause 比例較高；肥胖與腎臟疾病都是重點。' },
    ]),
    list([
      '睡眠呼吸中止常是 resistant HTN 的隱形加速器，沒處理 OSA 時藥物常越加越多。',
      '透析病人血壓與容量狀態、乾體重 (Dry weight)、透析間期鈉水攝取緊密相關，不能只靠門診藥單理解。',
      '慢性肝病與低白蛋白病人可能血壓不高，但一旦發展腎功能變化，對某些降壓藥的耐受性會快速改變。',
    ]),
  ),
  section(
    'clinical-pitfalls',
    '常見臨床陷阱',
    lead('高血壓最常見的錯，不是完全不治療，而是把它治成一個只有數字、沒有脈絡的慢性病。數字當然重要，但若不問量測條件、依從性、藥物誘因、夜間血壓與器官損傷，臨床就很容易看起來有在處理，實際上一直原地打轉。'),
    misconceptionList([
      { myth: '診間血壓高就一定要當場大幅加藥。', correction: '要先確認量測條件、最近是否漏藥、疼痛焦慮、咖啡因、酒精、感冒藥或白袍效應。單次數字只能啟動評估，不等於自動升級治療。' },
      { myth: '降壓越快越安全。', correction: '在沒有 hypertensive emergency 的情況下，過快降壓反而可能傷害腦、心與腎灌流。急症與慢性控制的時鐘完全不同。' },
      { myth: '四種藥還壓不下來就表示病人很嚴重。', correction: '也可能是 pseudoresistance：袖帶錯、量測錯、漏藥、白袍高血壓、藥物誘發或沒做利尿劑最佳化。' },
    ]),
    callout(
      'danger',
      '臨床警示',
      p('在急診看到 BP 220/120 mmHg 的病人，不要只盯著螢幕。你真正要先回答的是：有沒有主動脈剝離、急性肺水腫、腦出血、缺血性中風溶栓前評估、子癇前症或急性腎傷害。'),
    ),
  ),
  section(
    'case-discussion',
    'Case-based discussion',
    lead('病例：52 歲男性，BMI 31 kg/m2，有高尿酸血症與膝關節痛，最近三個月在公司健檢與藥局自測都落在 158-172 / 92-104 mmHg。主訴是晨起頭痛與白天嗜睡，太太說他打鼾很大聲。最近因膝痛常服用 ibuprofen。'),
    h3('第一輪問題表述 (Problem representation)'),
    list([
      '中年肥胖男性，反覆 stage 2 HTN，合併 OSA 線索、NSAID 使用與代謝共病。',
      '目前沒有急性器官傷害症狀，但已有高風險背景，需確認持續性高血壓與器官受損。',
      '在原發性高血壓機率高的同時，仍需注意 OSA 與藥物誘發成分。',
    ], true),
    table(
      ['處置步驟', '臨床思路'],
      [
        ['確認診斷', '安排居家血壓紀錄或 ABPM，診間重複正確量測。'],
        ['基線檢查', 'BMP、UACR、A1c、lipid panel、ECG，必要時眼底。'],
        ['找加速因子', '停用 NSAID、評估睡眠呼吸中止、減重與鹽分攝取。'],
        ['起始治療', '可考慮 ARB + amlodipine 或 ARB + thiazide-like diuretic，視尿酸與體液狀態調整。'],
      ],
    ),
    callout(
      'clinical',
      '為何不是只開一顆止痛加一顆降壓藥就好',
      p('這個案例真正的槓桿點在於找出會把血壓推高的系統因素：肥胖、OSA、NSAID。若只加藥不移除推力，病人很快會變成多重用藥卻仍控制不佳。'),
    ),
    summary('案例結論', '高血壓管理最成熟的做法，是把血壓視為器官保護與風險管理問題，而不是純粹把收縮壓壓到某個數字。', [
      '先確認量測與型態，再談長期分類。',
      '遇到 resistant pattern 時，要主動找 secondary cause 與藥物誘因。',
      '生活型態處理與固定複方策略，常比一顆一顆慢慢加更有效。',
    ]),
  ),
);

volume3Chapters.ch02 = chapter(
  '缺血性心臟病 (Ischemic Heart Disease)',
  section(
    'anatomy-physiology',
    '正常解剖與生理',
    lead('缺血性心臟病 (Ischemic Heart Disease, IHD) 的核心，是心肌需氧量 (Myocardial oxygen demand) 與供氧量 (Supply) 失衡。正常時，左、右冠狀動脈 (Left and Right Coronary Artery) 從主動脈根部發出，透過舒張期灌流供應心肌。左前降支 (LAD)、左迴旋支 (LCx) 與右冠狀動脈 (RCA) 各有對應灌流區，這些解剖分布直接決定 ECG 導程變化、壁運動異常與再灌流策略。'),
    p('心肌氧需求會隨心跳、收縮力、壁張力與後負荷升高；供氧則受冠脈口徑、灌流壓、血紅素與血氧含量影響。因此嚴重貧血、主動脈狹窄、心搏過快與高血壓，都可能在沒有急性斑塊破裂的情況下誘發 type 2 myocardial infarction。'),
    viewer('ischemia'),
    diagram('coronary-ischemia'),
    table(
      ['冠脈區域', '主要供應', '常見 ECG 線索', '臨床提醒'],
      [
        ['LAD', '前壁、心尖、室間隔', 'V1-V4 ST 變化', '大範圍前壁梗塞常預後較差'],
        ['LCx', '側壁、部分後壁', 'I, aVL, V5-V6', '側壁變化較容易被低估'],
        ['RCA', '下壁、部分右心室、AV node', 'II, III, aVF', '下壁 MI 要想 RV infarction 與導傳阻滯'],
      ],
    ),
    formula('心肌氧需求近似概念', 'Demand ~ HR x Wall stress x Contractility', '這不是精確臨床公式，但提醒你：控制心跳、減少後負荷與改善缺血，不是同一路徑的重複動作，而是互補。'),
  ),
  section(
    'symptoms',
    '常見主訴與症狀',
    lead('典型缺血性胸痛是胸骨後壓迫感、活動誘發、休息或硝酸鹽改善，可能放射到左臂、下頷或上腹。但真正的臨床難點在於，不典型表現比教科書範例更多，尤其是女性、老年、糖尿病、CKD 與術後病人。'),
    table(
      ['表現', '比較像什麼', '缺血提示', '容易誤判成'],
      [
        ['活動時胸悶 5-10 分鐘', '穩定型心絞痛 (Stable angina)', '固定負荷出現，休息緩解', '胃食道逆流、焦慮'],
        ['靜息胸痛超過 20 分鐘', 'ACS / STEMI / NSTEMI', '伴冷汗、噁心、呼吸困難', '胃炎、肌肉疼痛'],
        ['喘、疲倦、冒冷汗', '等同 angina equivalent', '糖尿病與老年人常見', '肺炎、焦慮發作'],
        ['上腹不適、噁心', '下壁缺血可能表現', '合併迷走神經症狀時更像', '腸胃炎、膽囊炎'],
      ],
    ),
    callout(
      'clinical',
      '真實場景',
      p('72 歲糖尿病女性來急診，只說「今天特別喘、走兩步就累、胃口差」。她沒有喊胸痛，但 ECG 顯示下壁變化、troponin 動態上升。這正是臨床上最容易漏掉的 ACS 病人類型。'),
    ),
    takeawayList([
      { title: '胸痛不是唯一語言', body: '呼吸困難、虛弱、噁心、暈厥都可能是 ACS 的等價主訴。' },
      { title: '疼痛型態幫助分層，不負責排除', body: '「像針刺」「按壓會痛」會降低機率，但不能單靠主觀描述把 ACS 完全排除。' },
      { title: '時間軸很重要', body: '持續時間、誘發因素、與 troponin/ECG 的先後關係會影響你對穩定性與危險度的判斷。' },
    ]),
  ),
  section(
    'pathophysiology',
    '重要疾病機轉',
    lead('穩定型心絞痛的核心通常是固定狹窄斑塊讓供血無法滿足活動需求；急性冠心症 (Acute Coronary Syndrome, ACS) 則多半涉及斑塊破裂或糜爛後的血小板活化、凝血瀑布與急性血栓形成。換句話說，stable angina 較像供需差距在運動時被放大，ACS 則是供應端突然崩盤。'),
    p('但臨床上還有很多「不像教科書」的缺血：嚴重高血壓、甲狀腺亢進、快速心房顫動、嚴重貧血、敗血症、主動脈狹窄與冠脈痙攣 (Vasospastic angina)，都可能造成缺血或 troponin 上升。若只把 troponin 上升自動翻譯成 plaque rupture，就會誤入治療。'),
    diagram('coronary-ischemia'),
    cards([
      { title: '斑塊破裂 (Plaque rupture)', body: '脂質核心外露後高度促凝，血小板黏附與 thrombin 生成快速啟動，這是 STEMI/NSTEMI 常見機轉。' },
      { title: '斑塊糜爛 (Plaque erosion)', body: '在某些 ACS 病人中沒有明顯破裂，而是內皮受損與局部血栓形成，病理型態不同但一樣危險。' },
      { title: '供需失衡 (Demand ischemia)', body: '快速心律、嚴重貧血、低血壓或缺氧都可造成 type 2 MI。治療重點是修正驅動因子，而非一律走 ACS pathway。' },
      { title: '冠脈痙攣與微血管功能障礙', body: '年輕、夜間胸痛、ST transient elevation 或冠脈攝影沒有明顯大血管阻塞者，要想到這些機轉。' },
    ], 'comparison-grid'),
    misconceptionList([
      { myth: '冠狀動脈堵 70% 才會有問題。', correction: '固定狹窄與急性脆弱斑塊是不同問題；很多 ACS 來自原本狹窄程度並非最嚴重的脆弱斑塊。' },
      { myth: 'Troponin 上升就等於一定要做 PCI。', correction: 'troponin 是心肌受傷標記，不等於自動證明 culprit coronary occlusion。要結合病史、ECG、影像與整體臨床狀態。' },
    ]),
  ),
  section(
    'diagnosis',
    '診斷思路與鑑別診斷',
    lead('胸痛診斷最重要的不是背很多疾病，而是先把致命且時間敏感的病因擺到前面：ACS、主動脈剝離 (Aortic dissection)、肺栓塞 (Pulmonary embolism)、張力性氣胸與食道破裂。IHD 的診斷要靠病史、連續 ECG、動態 troponin 與必要時影像，而不是任何單一檢查。'),
    table(
      ['問題', '臨床問法', '診斷價值'],
      [
        ['是不是缺血型胸痛？', '壓迫感、活動誘發、休息改善、放射？', '提高或降低 pretest probability'],
        ['有沒有立即再灌流需求？', 'ST elevation、新 LBBB、後壁或右心室梗塞線索？', '決定是否走 STEMI 路徑'],
        ['Troponin 是動態上升嗎？', '0/1 小時或 0/2 小時高敏感度 troponin', '幫助區分急性與慢性心肌傷害'],
        ['還有沒有其他更危險的解釋？', '撕裂胸背痛、呼吸依賴性胸痛、單側呼吸音減少', '避免只盯 ACS 漏掉其他大病'],
      ],
    ),
    callout(
      'warning',
      '後壁與右心室梗塞常被低估',
      p('下壁 STEMI 時若病人低血壓、肺部不濕、頸靜脈怒張，要想到右心室梗塞；V7-V9 與右側導程能提供關鍵線索。單靠標準 12 導程可能不夠。'),
    ),
    list([
      '穩定型胸痛評估可使用 stress testing 或 coronary CTA，但急性胸痛評估的核心仍是先排除 ACS 與其他立即威脅。',
      'HEART、TIMI 等分數有助風險分層，但分數不是替代臨床判斷的自動按鈕。',
      '若病人有明顯腎功能不全、心衰竭或 sepsis，慢性與急性 troponin elevation 的判讀要更謹慎。',
    ]),
  ),
  section(
    'investigations',
    '關鍵檢查與判讀',
    lead('IHD 的檢查不是做越多越安全，而是做對順序。急性病人先 ECG、連續 troponin、基線 labs 與 bedside echo；穩定型病人則依 pretest probability 選擇 functional test 或 anatomical test。'),
    table(
      ['檢查', '最適用情境', '要怎麼看'],
      [
        ['12-lead ECG', '所有急性胸痛', '要看動態變化，不是只看第一張；serial ECG 非常重要'],
        ['High-sensitivity troponin', '急性胸痛與疑似 ACS', '看時間軸與 delta，單次高值不足以下結論'],
        ['心臟超音波 (Echo)', '壁運動異常、EF、機械性併發症', '新發區域性壁運動異常支持 ischemia'],
        ['Coronary angiography', '高風險 NSTEMI、STEMI、持續缺血', '既是診斷也是治療入口'],
        ['Coronary CTA', '中低到中等風險穩定或急性胸痛', '解剖資訊佳，但對高度鈣化與心率控制有條件'],
      ],
    ),
    spotlight('檢查判讀常見盲點', 'CKD 病人可有 chronically elevated troponin；老年人 ECG 可能本就有 bundle branch block；sepsis 病人也可能出現 demand ischemia。真正重要的是「變化」與「臨床脈絡」。'),
  ),
  section(
    'treatment',
    '第一線與第二線治療',
    lead('IHD 的治療要先回答：現在是穩定型心絞痛、NSTEMI、STEMI，還是 type 2 MI？答案不同，治療節奏完全不同。真正的第一線不是某一顆藥，而是正確分類後的整體處置。'),
    table(
      ['情境', '立即處置', '後續核心', '典型配合藥物'],
      [
        ['STEMI', '啟動再灌流，盡快 PCI', 'DAPT、high-intensity statin、β-blocker 視情況、ACEi/ARB', 'Aspirin + ticagrelor + heparin + atorvastatin'],
        ['NSTEMI/UA', '風險分層、抗血小板、抗凝、症狀控制', '早期侵入或選擇性侵入策略', 'Aspirin + P2Y12 inhibitor + anticoagulant'],
        ['Stable angina', '緩解症狀與二級預防', '運動、戒菸、statin、血壓血糖控制', 'β-blocker 或 CCB + nitrate PRN'],
        ['Vasospastic angina', '解除痙攣', '避免誘因如吸菸、可卡因', 'CCB + nitrate'],
      ],
    ),
    callout(
      'success',
      'MONA 不是完整現代治療',
      p('Morphine、Oxygen、Nitrate、Aspirin 是歷史上常見口訣，但現在更重要的是及時再灌流、DAPT、抗凝、statin、風險分層與避免不必要氧氣。氧氣只在低氧時給，不是胸痛就固定上。'),
    ),
    cards([
      { title: '二級預防', body: '高強度 statin、戒菸、血壓與糖尿病管理、運動與心臟復健對預後影響深遠，重要性不亞於當下的介入。' },
      { title: '症狀緩解', body: 'β-blocker、CCB、nitrate、ranolazine 的角色在於減少需氧與控制症狀，但不能替代高風險病人的再灌流。' },
      { title: '併發症處理', body: '機械性併發症、心源性休克、心律不整與出血風險會直接改寫藥物與介入順序。' },
      { title: '特殊情境', body: '對主動脈剝離、RV infarct、嚴重低血壓、可卡因相關胸痛等情況，常規 ACS 套餐需要微調。' },
    ]),
  ),
  section(
    'pharmacology',
    '常用藥物機轉、副作用、交互作用',
    lead('IHD 藥理的目標分兩類：一類是減少急性血栓與再發事件，另一類是降低心肌需氧與改善長期血管風險。臨床上最危險的錯，是只處理胸痛感受，卻沒有處理斑塊與血栓生物學。'),
    table(
      ['類別', '代表藥', '機轉', '重點副作用/交互作用'],
      [
        ['Aspirin', 'Aspirin', '不可逆抑制 COX-1，減少 TXA2', 'GI bleeding；NSAID 會干擾抗血小板效果與增加出血'],
        ['P2Y12 inhibitor', 'Clopidogrel, Ticagrelor, Prasugrel', '抑制 ADP 介導血小板活化', 'Clopidogrel 受 CYP2C19 影響；ticagrelor 可造成呼吸困難與 bradycardia'],
        ['Anticoagulant', 'UFH, Enoxaparin, Fondaparinux', '抑制 thrombin 或 factor Xa 生成/活性', '出血、腎功能相關劑量調整、HIT 風險'],
        ['Nitroglycerin', 'SL/IV nitroglycerin', '增加 NO，靜脈擴張降低 preload', '不能與 PDE5 inhibitor 併用；右心室梗塞時要特別小心低血壓'],
        ['High-intensity statin', 'Atorvastatin, Rosuvastatin', '抑制 HMG-CoA reductase，降低 LDL 並穩定斑塊', '肌肉症狀、LFT 變化、CYP3A4 交互作用'],
      ],
    ),
    formula('Aspirin 分子式', 'C9H8O4', '這個看似簡單的小分子，臨床價值卻在不可逆乙醯化血小板 COX-1，讓血小板在整個生命週期都失去 TXA2 合成能力。'),
    formula('Clopidogrel 與藥物基因體學', 'Clopidogrel --CYP2C19--> active metabolite', 'CYP2C19 loss-of-function 變異會降低 clopidogrel 活化效率，在 PCI 後高風險族群可能影響藥物選擇。'),
    callout(
      'danger',
      '經典禁忌組合',
      p('硝酸鹽與 sildenafil、tadalafil 併用可能造成嚴重低血壓；ACS 病人若合併主動脈剝離而誤給抗凝或抗血小板，後果也可能極差。'),
    ),
  ),
  section(
    'special-populations',
    '特殊族群考量',
    lead('IHD 在特殊族群常常不是「同樣病，只是年紀或性別不同」，而是整個表現與治療風險都改變。這也是為什麼許多漏診或過度治療都集中在特殊族群。'),
    cards([
      { title: '女性', body: '症狀可能不典型，且有時是 microvascular angina 或 spontaneous coronary artery dissection (SCAD)；不能因為冠脈攝影沒有明顯大阻塞就說病人沒事。' },
      { title: 'CKD', body: 'troponin baseline 可偏高，出血風險與顯影劑腎病都更需要平衡；但也不能因擔心風險而過度保守。' },
      { title: '老年人', body: '虛弱、跌倒、出血與藥物交互作用增加，但絕對風險也更高；真正難的是精準個體化，不是自動減藥。' },
      { title: '糖尿病', body: 'silent ischemia 較常見，廣泛血管病變與小血管功能障礙會讓病情更複雜。' },
    ]),
    list([
      '孕期胸痛要考慮 SCAD、PE、aortic pathology 與 preeclampsia，不可照搬一般 ACS 流程。',
      '心因性胸痛確實常見，但在高危險因子病人身上，排除器質性病因之前不能太早貼標籤。',
      '冠脈病變的「解剖嚴重度」與病人的症狀負荷、功能狀態、微血管病變不一定完全平行。',
    ]),
  ),
  section(
    'clinical-pitfalls',
    '常見臨床陷阱',
    lead('IHD 的錯誤常來自兩種極端：一種是任何胸痛都當 ACS，造成不必要出血與資源耗損；另一種是因為不典型就過早安心，漏掉真正的急性缺血。成熟的做法不是更激進，而是更有層次。'),
    misconceptionList([
      { myth: '第一張 ECG 正常，就可以安心排除 ACS。', correction: '尤其是早期 NSTEMI、後壁缺血、間歇性缺血與 baseline 異常時，serial ECG 比第一張更重要。' },
      { myth: '有 troponin 上升就等於 culprit lesion。', correction: '要分 acute coronary thrombosis、demand ischemia、myocarditis、heart failure、CKD-related chronic injury 等情境。' },
      { myth: '胸痛緩解代表危機解除。', correction: '不穩定斑塊造成的短暫症狀可以自行緩解，但血栓與再發風險仍然存在。' },
    ]),
    callout(
      'danger',
      '臨床警示',
      p('在 inferior MI 合併 hypotension 的病人，若沒有先辨認 RV infarction 就大量給 nitrate，可能立刻讓前負荷掉得更嚴重。'),
    ),
  ),
  section(
    'case-discussion',
    'Case-based discussion',
    lead('病例：63 歲女性，糖尿病與 CKD stage 3，主訴上腹悶痛、冒冷汗與喘兩小時。第一張 ECG 僅見非特異性 T wave 變化，初始 hs-troponin 稍高於上限。'),
    list([
      '這位病人的主訴雖不典型，但風險因子與等價症狀都讓 ACS 機率不低。',
      'CKD 讓 troponin baseline 可能偏高，因此更需要 serial troponin 與 serial ECG。',
      '若過早把症狀歸因於胃炎，會錯過高風險 NSTEMI。'
    ], true),
    table(
      ['時間', '事件', '決策點'],
      [
        ['0 小時', '上腹悶痛、冒冷汗、ECG 不典型', '不能因非典型位置而降級風險'],
        ['1-2 小時', '重複 troponin 明顯上升', '支持急性心肌傷害，需要整合 ECG 與臨床進入 NSTE-ACS path'],
        ['住院後', 'Echo 顯示新發下壁運動異常', '提高 culprit ischemia 可能，與心導管策略連動'],
      ],
    ),
    summary('案例結論', '缺血性心臟病真正困難之處，是在不完整資訊下做時間敏感決策。', [
      '不典型症狀不等於低風險。',
      '動態變化勝過單點數值。',
      '再灌流、抗血栓與出血風險要同步考量。',
    ]),
  ),
);

volume3Chapters.ch03 = chapter(
  '心衰竭 (Heart Failure)',
  section(
    'anatomy-physiology',
    '正常解剖與生理',
    lead('心衰竭 (Heart Failure, HF) 的理解起點，不是先背藥物，而是先理解前負荷 (Preload)、後負荷 (Afterload)、收縮力 (Contractility)、心輸出量 (Cardiac output) 與器官灌流之間的平衡。正常心臟會依需求改變搏出量與心率，並由腎臟與神經荷爾蒙系統微調容量與血管張力。'),
    p('左心室負責高壓全身循環，右心室則對肺循環較敏感；左心房壓上升會先把壓力傳到肺靜脈，右心房壓上升則會出現頸靜脈怒張、肝鬱血與周邊水腫。理解這種壓力傳導，才看得懂 HF 病人的症狀與利尿反應。'),
    viewer('heart-failure'),
    diagram('heart-failure-cycle'),
    cards([
      { title: '收縮功能 (Systolic function)', body: 'EF 下降代表每次收縮射出比例下降，但 EF 不是唯一指標；心輸出量還受心率、前負荷與瓣膜功能影響。' },
      { title: '舒張功能 (Diastolic function)', body: 'HFpEF 核心常是左心室僵硬與充填壓升高，不是單純「心臟還有正常 EF 所以沒事」。' },
      { title: '神經荷爾蒙補償', body: 'RAAS、SNS 與 ADH 在短期幫忙維持灌流，但長期促進鈉水滯留、重塑與惡化。' },
      { title: '腎心交互作用', body: '腎灌流下降與靜脈壓上升都會讓腎功能變差，因此心衰竭與腎病常互相放大。' },
    ]),
  ),
  section(
    'symptoms',
    '常見主訴與症狀',
    lead('心衰竭最常見的語言是呼吸困難、運動耐受下降、端坐呼吸、夜間陣發性呼吸困難、下肢水腫與疲倦。但症狀背後反映的是兩條主軸：鬱血 (Congestion) 與低灌流 (Hypoperfusion)。這兩者可以同時存在，也可能一開始只有一種比較突出。'),
    table(
      ['表現', '比較偏哪一軸', '臨床意義'],
      [
        ['端坐呼吸、夜間喘醒', '肺鬱血', '左心房與肺靜脈壓上升'],
        ['腹脹、肝腫大、踝部水腫', '系統性鬱血', '右心衰或雙心衰常見'],
        ['四肢冰冷、少尿、頭暈', '低灌流', '心輸出量不足，常代表更嚴重或即將失代償'],
        ['體重快速增加', '容量滯留', '比單看踝部水腫更敏感的追蹤指標之一'],
      ],
    ),
    callout(
      'clinical',
      '真實場景',
      p('68 歲男性 HFrEF 病人回診抱怨「最近只是沒力、胃口差、鞋子比較緊」。他沒有說自己喘到不行，但量體重已經比兩週前多 3 公斤、JVP 上升、creatinine 也開始惡化。這種病人若只因為主訴不 dramatic 就忽略鬱血，常常幾天後就會因急性惡化住院。'),
    ),
    takeawayList([
      { title: 'HF 的症狀往往是累積出來的', body: '病人會逐步適應，直到某個小誘因讓補償破裂。' },
      { title: '體重、尿量與睡姿是高價值線索', body: '比起問「有沒有喘」，這些問題更容易捕捉輕度鬱血。' },
      { title: '疲倦不只是老化', body: '在心衰竭病人身上，疲倦、注意力差與活動縮減常代表灌流不足。' },
    ]),
  ),
  section(
    'pathophysiology',
    '重要疾病機轉',
    lead('心衰竭不是單一疾病，而是多條機轉匯流的臨床表型。缺血、長期高血壓、瓣膜病、心肌炎、心肌病變、毒性、心律不整與遺傳異常，都能把心臟推向重塑 (Remodeling)、纖維化與充填壓上升。'),
    p('HFrEF 與 HFpEF 的終點都可能是鬱血與再住院，但路徑不同。HFrEF 常見於心肌收縮力下降與心腔擴大；HFpEF 常見於舒張僵硬、肥胖、糖尿病、老年與微血管發炎。若只盯著 EF，就會錯過病人真正的 hemodynamic problem。'),
    diagram('heart-failure-cycle'),
    table(
      ['機轉', '造成什麼', '對應臨床'],
      [
        ['RAAS/SNS 過度活化', '後負荷上升、鈉水滯留、心肌毒性', '為何 ARNI、β-blocker、MRA 能改善預後'],
        ['心室重塑', '心室擴大、球形化、功能性二尖瓣逆流', '解釋為何病人越來越喘且 EF 下降'],
        ['微血管與內皮發炎', '舒張壓上升、運動時 filling pressure 升高', 'HFpEF 病人靜息可能還行，活動時明顯喘'],
        ['腎靜脈壓升高', '腎功能下降、利尿反應變差', '心腎症候群 (Cardiorenal syndrome)'],
      ],
    ),
    misconceptionList([
      { myth: 'EF 正常就不是心衰竭。', correction: 'HFpEF 病人可以有正常或近正常 EF，但仍有顯著充填壓上升、運動不耐與反覆住院。' },
      { myth: '利尿劑能改善症狀，所以一定能改善長期存活。', correction: '利尿劑是症狀與容量控制核心，但能改善預後的關鍵藥物還包括 ARNI/ACEi/ARB、β-blocker、MRA、SGLT2 inhibitor。' },
    ]),
  ),
  section(
    'diagnosis',
    '診斷思路與鑑別診斷',
    lead('心衰竭診斷的核心不是「水腫加 BNP 高」，而是確認病人是否真的有典型症狀/徵象，再證明存在結構性或功能性心臟異常。尤其肥胖、CKD、肺病與肝病病人，單一徵象都可能誤導。'),
    table(
      ['問題', '你要找什麼', '鑑別對手'],
      [
        ['是不是心因性喘？', 'JVP、S3、肺部 crackles、端坐呼吸、回應利尿', 'COPD、肺炎、肺栓塞、焦慮過度換氣'],
        ['是 HFrEF 還是 HFpEF？', 'Echo EF、舒張功能、左房大小、LV hypertrophy', '治療與預後評估不同'],
        ['是新發還是慢性急性惡化？', '過去 EF、藥物、體重變化、誘因', '決定是否需要找缺血、感染、arrhythmia、用藥問題'],
        ['有沒有冷濕型態？', 'warm/cold, wet/dry', '決定利尿、升壓、inotrope 與 ICU 需求'],
      ],
    ),
    callout(
      'warning',
      '鑑別診斷常見陷阱',
      p('肥胖病人的 BNP 可以被壓低；CKD 病人的 BNP/NT-proBNP 則可能偏高。數字要回到病人體型、腎功能與急慢性情境解讀。'),
    ),
    list([
      '新發心衰竭要主動找原因：缺血、瓣膜、心肌炎、甲狀腺、酒精、化療、tachycardia-mediated cardiomyopathy。',
      '急性惡化常見誘因：感染、缺血、AF with RVR、鹽分與液體過量、NSAID、停藥、腎功能惡化。',
      '如果病人低血壓、腎功能惡化且四肢冰冷，要比平常更早思考 advanced HF 或 cardiogenic shock。'
    ]),
  ),
  section(
    'investigations',
    '關鍵檢查與判讀',
    lead('HF 的關鍵檢查要回答三件事：真的有鬱血或結構異常嗎？嚴重度如何？背後可逆病因是什麼？在這三個問題裡，echo 幾乎永遠是核心。'),
    table(
      ['檢查', '價值', '關鍵判讀'],
      [
        ['BNP / NT-proBNP', '支持或降低 HF 可能性', '高值支持 HF，但會受年齡、腎功能、肥胖影響'],
        ['Echo', 'EF、瓣膜、壁運動、舒張功能、肺高壓', '決定 HFrEF/HFpEF、是否有重大瓣膜病與結構異常'],
        ['Chest X-ray', '肺水腫、心臟擴大、其他肺部病因', '正常 X 光不能完全排除早期 HF'],
        ['CMP + CBC + TSH + iron studies', '找誘因與共病', '貧血、甲狀腺、缺鐵與肝腎功能都會影響處置'],
        ['Troponin', '找缺血或心肌傷害', '慢性 HF 也可輕度升高，需整合病史'],
      ],
    ),
    spotlight('Iron deficiency 是容易被漏掉的可治療因子', '缺鐵在心衰竭很常見，且就算沒有明顯貧血也會影響運動耐受與生活品質。Ferritin 與 transferrin saturation 應納入系統性評估。'),
  ),
  section(
    'treatment',
    '第一線與第二線治療',
    lead('心衰竭治療要把「症狀控制」與「疾病修飾」分開又並行。利尿劑處理鬱血，GDMT 處理重塑與預後。只做其中一半，病人很容易反覆回來。'),
    table(
      ['目標', '核心策略', '常用組合'],
      [
        ['症狀與容量控制', 'Loop diuretic 為主，必要時序貫阻斷', 'Furosemide + thiazide-like add-on for diuretic resistance'],
        ['HFrEF 預後改善', '四大支柱：ARNI/ACEi/ARB、evidence β-blocker、MRA、SGLT2i', 'Sacubitril/valsartan + bisoprolol + spironolactone + dapagliflozin'],
        ['HFpEF', '控制血壓、利尿、治療共病、SGLT2i', 'Empagliflozin + BP/AF/CKD/obesity management'],
        ['進階治療', 'CRT、ICD、瓣膜介入、LVAD、心臟移植', '需依病因、QRS、EF 與症狀分層'],
      ],
    ),
    callout(
      'success',
      '常見實務節奏',
      p('住院或門診只要 hemodynamically 允許，就盡量早開始或恢復 GDMT，不要等到「完全沒事再說」。現代 HF 治療趨勢是較早、多路徑、低劑量起始後快速滴定。'),
    ),
    cards([
      { title: '急性失代償', body: '若以濕為主，用 IV loop diuretic；若冷且低灌流，需思考 shock、inotrope、vasopressor 或機械循環支持。' },
      { title: 'SGLT2 inhibitor', body: '不只降糖，對 HFrEF 與 HFpEF 都有住院與預後利益，且起效速度比很多人想像得快。' },
      { title: 'Hydralazine / isosorbide dinitrate', body: '在無法耐受 RAAS block 或特定族群中可作為補充方案。' },
      { title: '鐵劑與共病處理', body: '缺鐵、AF、OSA、腎病、糖尿病與肥胖治療，會直接改變 HF 軌跡。' },
    ], 'comparison-grid'),
  ),
  section(
    'pharmacology',
    '常用藥物機轉、副作用、交互作用',
    lead('HF 藥理的成熟度非常高，但臨床最常見的失敗卻不是沒有藥，而是起得太慢、加得太慢、因為輕微 creatinine 波動或血壓偏低就整套撤掉。'),
    table(
      ['藥物類別', '代表藥', '主要價值', '副作用與監測'],
      [
        ['ARNI', 'Sacubitril/valsartan', '抑制 neprilysin 並阻斷 AT1，改善 HFrEF 預後', '低血壓、高鉀、腎功能；與 ACEi 轉換需 washout'],
        ['Evidence β-blocker', 'Bisoprolol, Carvedilol, Metoprolol succinate', '降低交感毒性與猝死風險', '起始過快可短期惡化，需在相對穩定時開始'],
        ['MRA', 'Spironolactone, Eplerenone', '抑制 aldosterone，改善預後', '高鉀、腎功能惡化、男性乳房增大'],
        ['SGLT2 inhibitor', 'Dapagliflozin, Empagliflozin', '降低 HF 住院與 CV death 風險', '生殖泌尿感染、少見正常血糖 DKA、容量狀態評估'],
        ['Loop diuretic', 'Furosemide, Bumetanide, Torsemide', '鬱血控制核心', '低鉀、低鎂、低血壓、腎功能變化，對預後非主要疾病修飾藥'],
      ],
    ),
    formula('Sacubitril 相關機轉提示', 'Neprilysin inhibition -> natriuretic peptides up', '提高 natriuretic peptide 活性有助利鈉、血管舒張與對抗重塑，但也正因為如此，與 ACEi 同用會增加血管性水腫風險。'),
    callout(
      'danger',
      '高風險組合',
      p('ACEi + ARNI 不可直接重疊；MRA + potassium supplement + CKD 要非常小心；amiodarone、digoxin、β-blocker 與腎功能變化一起出現時，也常讓心衰與心律管理互相卡住。'),
    ),
  ),
  section(
    'special-populations',
    '特殊族群考量',
    lead('特殊族群 HF 管理的難點，多半在於「看起來該用，但用起來風險更高」與「其實該用，卻因為看起來複雜而一直沒上」。'),
    cards([
      { title: 'CKD', body: '不應因為 creatinine 稍高就放棄 RAAS block、MRA 或 SGLT2i，但必須接受需要更密集監測與劑量調整。' },
      { title: 'HFpEF 與老年女性', body: '常伴高血壓、肥胖、AF 與腎功能問題，症狀負擔高，但若只用 EF 判斷容易被輕忽。' },
      { title: '心肌澱粉樣變 (Amyloidosis)', body: '若病人厚壁、低電壓、姿位性低血壓與不典型 HF 表現，要想到 infiltration，而不是只當高血壓性 LVH。' },
      { title: '妊娠與產後', body: '圍產期心肌病變需兼顧母體循環與胎兒/哺乳安全，ACEi/ARB 類在孕期仍須避免。' },
    ]),
  ),
  section(
    'clinical-pitfalls',
    '常見臨床陷阱',
    lead('HF 的經典陷阱是只治鬱血、不治疾病；或反過來，只顧 GDMT 名單，不處理病人眼前已經快喘死的容量問題。兩者都會害病人。'),
    misconceptionList([
      { myth: 'creatinine 上升就代表利尿劑用太多，應該立刻停。', correction: '在鬱血解除過程中 creatinine 可短暫變動。真正要看的是整體 volume status、尿量、血壓與器官灌流，而不是單一數值。' },
      { myth: '血壓不高就不能上 GDMT。', correction: '許多 HFrEF 病人血壓本來就不高，但仍可從低劑量開始逐步上藥；不能用「SBP 100 左右」就自動否決整套治療。' },
      { myth: '出院前把水退掉就算完成治療。', correction: '若沒有把誘因與長期預後藥物重新佈局，病人再住院風險仍高。' },
    ]),
  ),
  section(
    'case-discussion',
    'Case-based discussion',
    lead('病例：71 歲男性，既往前壁 MI、EF 30%，近一週體重增加 4 公斤，夜間需坐著睡，今天來急診喘到只能講短句。BP 104/68 mmHg，HR 118，JVP 升高，雙肺 crackles，creatinine 比平常高 0.4 mg/dL。'),
    table(
      ['臨床問題', '思路'],
      [
        ['是 warm-wet 還是 cold-wet？', '看四肢溫度、尿量、意識與乳酸；本例很可能仍偏 warm-wet，但在邊界。'],
        ['需不需要先停掉所有口服藥？', '不是一概而論。急性期可能暫停或調整部分藥，但出院前要盡快恢復或優化 GDMT。'],
        ['creatinine 上升是否表示不能利尿？', '不一定。若病人明顯鬱血，積極利尿常反而幫助腎功能回復。'],
      ],
    ),
    callout(
      'clinical',
      '案例整合',
      p('這類病人常因為腎功能變差而讓團隊猶豫不敢利尿，但真正的問題可能正是 congestive nephropathy。只看 creatinine 而忽略鬱血，往往會讓心腎一起更糟。'),
    ),
    summary('案例結論', 'HF 是需要分層、再評估與持續優化的慢性綜合症。', [
      '先分辨容量與灌流狀態。',
      '利尿與 GDMT 不是二選一，而是不同時間軸的並行工作。',
      '每次惡化都要追誘因，否則只是把病人送回下一次住院。'
    ]),
  ),
);

volume3Chapters.ch04 = chapter(
  '心律不整 (Arrhythmia)',
  section(
    'anatomy-physiology',
    '正常解剖與生理',
    lead('心律不整 (Arrhythmia) 的本質，是正常的電生理次序被打亂。正常節律由竇房結 (Sinoatrial node, SA node) 發火，經心房傳到房室結 (Atrioventricular node, AV node)，再經希氏束與浦肯野纖維 (His-Purkinje system) 快速分布到心室。這套傳導速度差與不反應期 (Refractory period) 的設計，本來就是為了避免亂槍打鳥式的同步失敗。'),
    p('若把心臟想成一個 3D 導電器官，而不是一張 ECG 紙上的線，很多臨床現象會更好懂：心房擴大讓心房顫動更容易維持；室間隔或心肌疤痕形成 re-entry 走廊；低鉀與藥物延長 repolarization 會把原本穩定的節律推向 torsades de pointes。'),
    viewer('arrhythmia'),
    diagram('electrophysiology-rhythm'),
    table(
      ['結構/通道', '正常功能', '失衡後可能表現'],
      [
        ['SA node', '節律起始點，自主去極化最快', 'sinus bradycardia、sick sinus syndrome'],
        ['AV node', '延遲傳導，保護心室免受過快心房刺激', 'AV block、AVNRT 核心迴路'],
        ['His-Purkinje', '高速同步傳導到心室', 'bundle branch block、wide QRS tachycardia'],
        ['Na/K/Ca channel', '決定去極化與復極', 'Brugada、long QT、CPVT、藥物性致心律不整'],
      ],
    ),
    formula('心肌動作電位關鍵概念', 'Phase 0 Na+ influx -> Phase 2 Ca2+ plateau -> Phase 3 K+ efflux', '不同心肌組織對 Na、Ca、K 通道依賴不同，這也是為什麼 antiarrhythmic drug 的效應與副作用高度組織選擇性。'),
  ),
  section(
    'symptoms',
    '常見主訴與症狀',
    lead('心律不整的症狀從完全無感到突然猝死都可能。最常見是心悸 (Palpitation)、胸悶、喘、暈眩、近乎昏厥或真正昏厥。真正重要的是：症狀強度與危險度不必然平行。'),
    table(
      ['表現', '常見節律', '危險程度線索'],
      [
        ['突然發作又突然停止的心悸', 'AVNRT、AVRT、PSVT', '若伴低血壓或胸痛就不能只當 benign palpitations'],
        ['不規則心悸、喘、容易累', 'Atrial fibrillation', '中風風險與頻率控制同等重要'],
        ['黑朦或昏厥', '高階 AV block、VT、torsades', '屬高危險訊號，需快速查致命節律'],
        ['心跳慢、疲倦、活動差', 'Sinus node dysfunction、AV block', '若有藥物或電解質因素要先找 reversible cause'],
      ],
    ),
    callout(
      'clinical',
      '真實場景',
      p('27 歲女性反覆說自己「焦慮時心跳很快」，每次發作都在幾秒內衝到很快、持續十多分鐘又突然停掉。這比起單純 panic attack，更像陣發性上心室心搏過速 (PSVT)。症狀描述的開始與結束方式，往往比病人主觀說「像不像緊張」更有價值。'),
    ),
    takeawayList([
      { title: '暈厥是紅旗', body: '與胸痛、低血壓、運動中發作、家族猝死史一起出現時，必須優先排惡性心律。' },
      { title: '症狀要問時間軸', body: '突然開始突然停止、規則或不規則、持續多久、何時發作，對 ECG 還沒抓到時特別重要。' },
      { title: '沒有症狀也可能高風險', body: 'AF、長 QT、心室早期收縮負荷與高階 AV block 有時是因篩檢才被發現。' },
    ]),
  ),
  section(
    'pathophysiology',
    '重要疾病機轉',
    lead('心律不整的三大機轉是自動性異常 (Abnormal automaticity)、觸發活動 (Triggered activity) 與再進入 (Re-entry)。把這三個框架弄清楚，比死背所有 ECG 圖樣更有用，因為不同治療其實是在打斷不同機轉。'),
    p('心房顫動多與心房擴大、纖維化、炎症與肺靜脈觸發點有關；AVNRT/AVRT 是 re-entry；digoxin toxicity 與 catecholamine surge 容易造成 triggered activity；scar-related VT 常是缺血後疤痕上的 re-entry。藥物與電解質會改變這些回路的門檻。'),
    diagram('electrophysiology-rhythm'),
    cards([
      { title: 'Re-entry', body: '需要兩條傳導路徑、單向阻斷與傳導速度差。AVNRT、AVRT、部分 VT 就是經典例子。' },
      { title: 'Triggered activity', body: '早期後除極化 (EAD) 與遲發後除極化 (DAD) 分別對應 long QT/torsades 與 digoxin/Ca overload 類型風險。' },
      { title: 'Automaticity', body: '低氧、交感活化、發燒、甲狀腺亢進與電解質失衡都能提高異位起搏點自動性。' },
      { title: '結構性基質', body: '心衰竭、缺血疤痕、肥厚、心房擴大與遺傳通道病會提供 arrhythmogenic substrate。' },
    ], 'comparison-grid'),
    misconceptionList([
      { myth: '心律不整都是心臟本身的病。', correction: '甲狀腺、電解質、藥物、酒精、感染、OSA 與自主神經變化都可能是主要驅動因素。' },
      { myth: '心房顫動只是心跳不規則，不算太嚴重。', correction: 'AF 牽涉 stroke、心衰惡化、住院與死亡風險，不能只把它當「不舒服」。' },
    ]),
  ),
  section(
    'diagnosis',
    '診斷思路與鑑別診斷',
    lead('心律不整診斷最重要的兩句話是：先判斷病人穩不穩，再判斷節律是寬還是窄、規則還是不規則。這種先用 hemodynamic 分類、再用 ECG 形態分流的方法，比直接猜病名更安全。'),
    table(
      ['步驟', '問題', '臨床價值'],
      [
        ['1', '病人是否 unstable？', '低血壓、休克、缺血、意識改變、急性 HF 時要先同步電復律或暫時性 pacing 思維'],
        ['2', 'QRS 窄還是寬？', '縮小鑑別，wide complex tachycardia 先當 VT 比較安全'],
        ['3', '規則還是不規則？', '規則窄 QRS 想 AVNRT/atrial flutter；不規則窄 QRS 想 AF/MAT'],
        ['4', '有 P wave 嗎？P 與 QRS 關係如何？', '判斷 sinus、AV dissociation、block 與 ectopy'],
      ],
    ),
    callout(
      'warning',
      '寬 QRS 心搏過速的基本原則',
      p('在不確定時，把 wide complex tachycardia 當 VT 處理通常比誤當 SVT with aberrancy 安全。尤其有既往 MI、結構性心臟病或年紀較大的病人。'),
    ),
    list([
      'Atrial fibrillation with pre-excitation 是經典地雷，若誤用 AV nodal blocker 可能讓 accessory pathway 主導傳導而惡化。',
      'Sinus tachycardia 常是疾病反應，不是要被「抑制」的病本身；要找出疼痛、感染、出血、低血容量或肺栓塞。',
      'Bradycardia 也要先看灌流與症狀，不是所有心跳慢都需要 pacemaker。'
    ]),
  ),
  section(
    'investigations',
    '關鍵檢查與判讀',
    lead('抓到節律本身最重要，但找背後原因同樣重要。ECG 是起點，不是終點。很多 arrhythmia 的真正線索藏在電解質、藥物清單、結構性心臟病與家族史裡。'),
    table(
      ['檢查', '目的', '重點'],
      [
        ['12-lead ECG', '直接辨認節律與傳導', 'QTc、delta wave、AV block、axis、QRS morphology 都要看'],
        ['Telemetry/Holter/event monitor', '抓間歇性節律', '症狀日誌與監測事件對照很重要'],
        ['Electrolytes / Mg / TSH', '找 reversible cause', '低 K、低 Mg、甲亢是高頻可逆原因'],
        ['Echo', '看結構性心臟病', 'AF、VT、bundle branch block 背後常有結構異常'],
        ['EPS', '精細定位與消融前評估', '對 recurrent SVT、部分 VT 與不明 syncope 很有價值'],
      ],
    ),
    spotlight('藥物清單常比高級檢查更早給答案', 'macrolide、fluoroquinolone、azole、methadone、antipsychotics、antiemetics、digoxin、beta-blocker、non-DHP CCB 與某些中草藥，都是心律不整評估時必問的高價值項目。'),
  ),
  section(
    'treatment',
    '第一線與第二線治療',
    lead('心律不整治療可以分成四類：立即穩定病人、矯正可逆因子、控制節律/頻率，以及預防血栓或猝死。不同 arrhythmia 並不共享一套套餐。'),
    table(
      ['情境', '第一步', '後續策略', '常見藥物/措施'],
      [
        ['不穩定 tachyarrhythmia', '同步電復律', '找誘因與維持策略', 'Cardioversion +/- amiodarone 視情況'],
        ['Stable AF with RVR', 'rate control + stroke risk assessment', '選擇 rate vs rhythm control', 'β-blocker、diltiazem、digoxin、DOAC'],
        ['AVNRT/AVRT', '迷走神經手法', '無效時 adenosine；反覆發作可消融', 'Adenosine、ablation'],
        ['Bradycardia with poor perfusion', 'Atropine 或 pacing', '找藥物、缺血、block 程度', 'Atropine、transcutaneous/transvenous pacing'],
      ],
    ),
    callout(
      'success',
      '治療原則',
      p('先救灌流，再辨機轉；先找 reversible cause，再談長期抑制。很多 arrhythmia 病人真正需要的是校正鉀鎂、停致心律藥、處理缺血與 HF，而不只是再加一顆 antiarrhythmic。'),
    ),
    cards([
      { title: 'AF', body: '需要同時處理頻率、節律與中風風險。不能只把心跳壓慢就當完成治療。' },
      { title: 'SVT', body: '對 recurrent symptomatic SVT，導管消融常比長期吃藥更有效且乾淨。' },
      { title: 'VT/VF', body: '要主動找缺血、scar、電解質與藥物因素；ICD 與 ablation 常扮演長期角色。' },
      { title: 'Bradyarrhythmia', body: '永久節律器是結構性傳導失敗的解法，但 reversible bradycardia 要先處理源頭。' },
    ], 'comparison-grid'),
  ),
  section(
    'pharmacology',
    '常用藥物機轉、副作用、交互作用',
    lead('抗心律不整藥 (Antiarrhythmic drugs) 的最大特色，是它們既能治心律不整，也能製造心律不整。因此用藥時一定要把基礎心臟病、QT、QRS、腎肝功能與藥物交互作用一起想。'),
    table(
      ['類別', '代表藥', '重點用途', '常見風險'],
      [
        ['Class I', 'Flecainide, Propafenone, Lidocaine', '抑制 Na channel；部分用於 SVT/VT', '結構性心臟病病人可致心律惡化，QRS 變寬'],
        ['Class II', 'β-blocker', 'rate control、抑制 catecholamine-triggered arrhythmia', 'bradycardia、hypotension、bronchospasm 視藥物而定'],
        ['Class III', 'Amiodarone, Sotalol, Dofetilide', '延長 repolarization，常用於 AF/VT', 'QT prolongation；amiodarone 有肺、肝、甲狀腺毒性'],
        ['Class IV', 'Verapamil, Diltiazem', 'AV nodal rate control', 'HF with reduced EF 時常不合適'],
        ['其他', 'Adenosine, Digoxin, Magnesium', '機轉特定且情境導向', 'Adenosine 會短暫 AV block；digoxin toxicity；Mg 常用於 torsades'],
      ],
    ),
    formula('Amiodarone 分子式', 'C25H29I2NO3', '高碘含量提醒你：它不只影響心臟，也會深刻影響甲狀腺與多個器官。'),
    formula('致心律不整基因例子', 'KCNH2 / KCNQ1 / SCN5A', '遺傳性 long QT、Brugada 與其他通道病會改寫藥物選擇，這也是某些病人對平常劑量藥物特別敏感的原因。'),
    callout(
      'danger',
      '致命交互作用',
      p('多種延長 QT 藥物併用、低鉀低鎂、先天 long QT 與腎功能變化一起出現時，是 torsades 的高風險場景。'),
    ),
  ),
  section(
    'special-populations',
    '特殊族群考量',
    lead('不同族群的 arrhythmia 管理差異很大。兒童與年輕人要更早想到先天性通道病或 accessory pathway；老年人則常同時面對 AF、跌倒、腎功能與多重用藥。'),
    cards([
      { title: 'WPW / pre-excitation', body: 'AF 合併 pre-excitation 不能隨手給 AV nodal blocker，需用能控制 accessory pathway 的策略。' },
      { title: '妊娠', body: '很多心悸是 benign，但真正的 SVT、AF 或 VT 仍需處理；藥物與電復律要兼顧胎兒安全。' },
      { title: '遺傳性通道病', body: '家族猝死史、運動或驚嚇誘發暈厥、特殊 ECG pattern 都應提高警覺。' },
      { title: '心衰與結構性心臟病', body: '藥物選擇受限，ablation、ICD 與 device therapy 權重上升。' },
    ]),
  ),
  section(
    'clinical-pitfalls',
    '常見臨床陷阱',
    lead('arrhythmia 最常見的錯誤，不是在 ECG 上看不出所有細節，而是在看不懂時做了不該做的事。'),
    misconceptionList([
      { myth: '心房顫動就是先把節律轉回來再說。', correction: '若 AF 持續時間不明或超過 48 小時，沒有適當抗凝保護下直接轉律會增加栓塞風險。' },
      { myth: '心跳快就該壓慢。', correction: 'sinus tachycardia 常是補償反應；如果源頭是出血、感染、PE 或低血容量，盲目壓心跳可能更糟。' },
      { myth: 'Adenosine 對所有規則心搏過速都安全。', correction: '大多數規則窄 QRS 沒問題，但對某些寬 QRS、重度氣喘與不明不規則節律要更慎重。' },
    ]),
  ),
  section(
    'case-discussion',
    'Case-based discussion',
    lead('病例：76 歲男性，HFrEF、HTN、CKD，主訴心悸與喘，HR 146，BP 108/72。ECG 顯示不規則窄 QRS 心搏過速，無明顯 ST elevation。'),
    table(
      ['問題', '思路'],
      [
        ['節律是什麼？', '不規則窄 QRS 高速率，最先想 AF with RVR。'],
        ['現在最重要的是什麼？', '先看 hemodynamic tolerance，再決定 rate control、rhythm control 與 HF 影響。'],
        ['還少了什麼工作？', 'stroke risk、誘因（感染、缺血、藥物、容量）、電解質與腎功能。'],
      ],
    ),
    callout(
      'clinical',
      '案例整合',
      p('這個病人不能只用 diltiazem 壓心跳然後送回家，因為他本身有 HFrEF。β-blocker、digoxin、amiodarone 的使用次序與強度，要看灌流、鬱血與腎功能；同時要評估抗凝。'),
    ),
    summary('案例結論', '心律不整的管理要把節律、器官灌流、可逆因子與栓塞風險一次放在桌上。', [
      '先分穩定度，再分 ECG 形態。',
      'rate/rhythm control 與 anticoagulation 是不同問題。',
      '藥物選擇必須尊重結構性心臟病與腎功能。'
    ]),
  ),
);

volume3Chapters.ch05 = chapter(
  '血脂異常與動脈粥樣硬化 (Dyslipidemia & Atherosclerosis)',
  section(
    'anatomy-physiology',
    '正常解剖與生理',
    lead('血脂異常 (Dyslipidemia) 不只是化驗單上的 LDL、HDL 與 triglyceride，而是脂蛋白 (Lipoprotein) 在血管內皮與肝臟之間如何運輸膽固醇與三酸甘油酯的問題。真正和動脈粥樣硬化風險最接近的，不是某一顆膽固醇分子，而是攜帶 ApoB 的致動脈粥樣脂蛋白顆粒總負荷。'),
    p('LDL 經由 LDL receptor 被肝臟清除；HDL 參與反向膽固醇運輸 (Reverse cholesterol transport)；VLDL 與 IDL 則牽涉 triglyceride-rich lipoprotein 代謝。當顆粒數量太多、內皮通透性增加、氧化壓力與發炎升高時，脂質就會被困在血管內膜，啟動動脈粥樣硬化。'),
    viewer('atherosclerosis'),
    diagram('lipid-atherothrombosis'),
    table(
      ['脂蛋白', '主要內容', '臨床重點'],
      [
        ['LDL', '膽固醇為主', 'Atherogenic，降低是首要目標'],
        ['HDL', '反向運輸相關', '高 HDL 不等於絕對保護，不能只追數字'],
        ['VLDL / remnants', 'Triglyceride-rich', '代謝症候群、糖尿病與高 TG 時重要'],
        ['Lipoprotein(a)', '類 LDL 顆粒 + Apo(a)', '與早發 ASCVD、瓣膜鈣化相關，受基因影響大'],
      ],
    ),
    formula('膽固醇分子式', 'C27H46O', '膽固醇本身不是敵人；它是細胞膜、荷爾蒙與膽汁酸的重要原料。問題出在長期過量、顆粒負荷與內皮環境失衡。'),
    formula('HMG-CoA reductase 路徑簡式', 'HMG-CoA -> mevalonate -> cholesterol', 'statin 把刀下在這條路徑的上游，因此不只降 LDL，也會改變某些異戊二烯衍生物與下游生物學訊號。'),
  ),
  section(
    'symptoms',
    '常見主訴與症狀',
    lead('血脂異常最大的臨床特徵就是常常沒有主訴。病人通常不是因為 LDL 高而不舒服，而是等到斑塊累積多年後以心肌梗塞、中風、PAD 或穩定型心絞痛的形式出場。'),
    p('少數病人會有黃瘤 (Xanthoma)、黃斑瘤 (Xanthelasma)、角膜弓 (Corneal arcus) 或胰臟炎風險上升等外觀線索，但這些都不是大多數人的起點。真正的重要症狀，通常是已經發展成器官病變後的表現。'),
    table(
      ['表現', '要想到什麼', '臨床意義'],
      [
        ['完全無症狀', '最常見狀態', '代表需要主動篩檢而不是等症狀'],
        ['阿基里斯腱黃瘤', '家族性高膽固醇血症 (FH)', '高度提示 LDL 長期非常高'],
        ['反覆胸痛、中風、跛行', 'ASCVD 已臨床化', '此時已不是單純初級預防，而是二級預防'],
        ['極高 TG 合併腹痛', '高三酸甘油酯相關胰臟炎', '治療目標與 LDL 優先序不同'],
      ],
    ),
    callout(
      'clinical',
      '真實場景',
      p('35 歲男性健檢 LDL 238 mg/dL，說自己「又不會不舒服」。但追問發現父親 42 歲心肌梗塞、他自己腳踝後方有腱黃瘤。這種病人若只用「年輕、沒症狀」解讀，會錯過家族性高膽固醇血症最值得早介入的時機。'),
    ),
  ),
  section(
    'pathophysiology',
    '重要疾病機轉',
    lead('動脈粥樣硬化 (Atherosclerosis) 是脂質、內皮、免疫與血栓共同參與的慢性發炎病程。ApoB 顆粒進入內膜後被氧化，吸引單核球轉成巨噬細胞，吞噬後形成泡沫細胞；平滑肌細胞遷移並產生纖維帽，最終形成斑塊。'),
    p('高風險不只來自斑塊大不大，還來自它穩不穩。薄纖維帽、高脂質核心、發炎旺盛、剪應力改變與新生血管脆弱，都會讓斑塊更容易破裂。這就是為什麼 statin 的價值不只降 LDL，也在於穩定斑塊與降低發炎。'),
    diagram('lipid-atherothrombosis'),
    cards([
      { title: 'ApoB 顆粒負荷', body: '每一顆 ApoB 顆粒都有機會進入內膜，因此 ApoB 或 non-HDL-C 在某些族群比單看 LDL-C 更能反映風險。' },
      { title: '內皮受損', body: '高血壓、吸菸、糖尿病與慢性腎病會讓內皮更容易黏附發炎細胞與脂質。' },
      { title: '發炎與纖維帽', body: '發炎細胞釋放蛋白酶讓纖維帽變薄，一旦破裂就進入血栓時代。' },
      { title: '基因背景', body: 'LDLR、APOB、PCSK9 與 LPA 變異會顯著改變脂質與事件風險。' },
    ], 'comparison-grid'),
    misconceptionList([
      { myth: '只要 HDL 高，就算 LDL 高也沒關係。', correction: '高 HDL 並不能可靠抵消高 ApoB 顆粒帶來的風險。現代治療仍以降低 LDL/ApoB 為主軸。' },
      { myth: '膽固醇是吃進去的，所以少吃蛋就夠了。', correction: '飲食重要，但內生性膽固醇合成、遺傳受體功能與整體代謝狀態同樣關鍵。' },
    ]),
  ),
  section(
    'diagnosis',
    '診斷思路與鑑別診斷',
    lead('血脂異常的診斷不只是在 lipid panel 上圈紅字，而是要分清楚病人的問題是高 LDL、高 TG、mixed dyslipidemia、低 HDL，還是 Lp(a) 或遺傳性脂質病。接著要問：他目前是初級預防、二級預防，還是家族性高風險？'),
    table(
      ['診斷問題', '要看什麼', '常見下一步'],
      [
        ['是否為 FH？', 'LDL 很高、家族早發 ASCVD、黃瘤', '使用臨床評分，必要時轉遺傳/專科'],
        ['是否有 secondary cause？', '糖尿病、甲低、腎病、肝病、酒精、藥物', '先修正可逆原因再看殘餘風險'],
        ['是否已屬 ASCVD 高風險？', '既往 MI、stroke、PAD、冠脈影像證據', '直接進二級預防思維'],
        ['需不需要補充檢查？', 'ApoB、Lp(a)、CAC', '用於灰區風險再分層'],
      ],
    ),
    callout(
      'info',
      '常見 secondary causes',
      p('甲狀腺功能低下、nephrotic syndrome、膽汁鬱積、酒精、retinoid、protease inhibitor、部分 antipsychotic 與未控制糖尿病，都可能讓 lipid panel 改頭換面。'),
    ),
  ),
  section(
    'investigations',
    '關鍵檢查與判讀',
    lead('最基本的是 fasting 或 non-fasting lipid panel，但真正的關鍵在於你怎麼用。對已知 ASCVD 或極高風險病人，目的不是反覆檢查看看而已，而是看治療是否把 ApoB 風險降到足夠。'),
    table(
      ['檢查', '用途', '判讀提醒'],
      [
        ['Lipid panel', 'LDL-C、HDL-C、TG、total cholesterol', '高 TG 時計算 LDL 可能失真，必要時測 direct LDL 或看 non-HDL'],
        ['ApoB', '估算 atherogenic particle burden', '在高 TG、糖尿病與肥胖族群特別有幫助'],
        ['Lp(a)', '基因性風險標記', '通常一生測一次即可，對早發家族史很有價值'],
        ['CAC score', '初級預防灰區風險再分層', '不是所有人都需要，但對中間風險猶豫者很有幫助'],
      ],
    ),
    spotlight('追蹤不是只看「有沒有下降」', '應該問的是：下降幅度是否符合預期？服藥是否足量？病人是否真的有吃？是否出現副作用或 cost barrier？這些問題比單次 LDL 值更能推動下一步。'),
  ),
  section(
    'treatment',
    '第一線與第二線治療',
    lead('血脂治療的骨幹是風險導向而非單一數值導向。ASCVD、糖尿病、FH 與多重危險因子病人，應較早進入高強度降脂策略。'),
    table(
      ['情境', '第一線', '第二線/加成', '臨床重點'],
      [
        ['二級預防 ASCVD', 'High-intensity statin', 'Ezetimibe -> PCSK9 inhibitor / inclisiran', '目標是最大幅度降 LDL 與降低再發事件'],
        ['初級預防高風險', '依整體風險與 LDL 水平決定 statin 強度', '必要時加 ezetimibe', '家族史與 CAC 可幫助灰區決策'],
        ['FH', '高強度 statin 早期啟動', '加 ezetimibe、PCSK9、少數情況 apheresis', '重點是早，且常需家族篩檢'],
        ['高 TG', '先處理 secondary cause、生活型態與糖尿病控制', '極高 TG 時 fibrate / omega-3 以防胰臟炎', 'TG 策略與 LDL 主軸不同'],
      ],
    ),
    callout(
      'success',
      '常見有效配合',
      p('Statin + ezetimibe 是最常見也最實用的加成組合；對已發生事件且 LDL 仍高的病人，PCSK9 inhibitor 或 inclisiran 可進一步降低殘餘風險。'),
    ),
    cards([
      { title: '飲食與體重', body: '減少飽和脂肪、精製糖與酒精，增加纖維與規律運動，對 LDL 與 TG 都有幫助，但不同型態 dyslipidemia 反應不同。' },
      { title: '糖尿病與代謝症候群', body: '控制血糖與體重常同時改善 TG 與 remnant burden，是動脈風險控制的核心配套。' },
      { title: '戒菸與血壓管理', body: '斑塊風險不是靠 LDL 一項決定，內皮與炎症環境同樣要處理。' },
      { title: '長期追蹤', body: '許多病人不是對藥沒反應，而是沒真的長期持續吃、因價格停藥或被網路迷思嚇退。' },
    ]),
  ),
  section(
    'pharmacology',
    '常用藥物機轉、副作用、交互作用',
    lead('脂質藥理不是只背「statin 降 LDL」。真正臨床要會的是：哪個藥針對哪條代謝路徑、能降多少、會遇到哪些副作用與什麼時候值得加第二支。'),
    table(
      ['類別', '代表藥', '機轉', '副作用與實務提醒'],
      [
        ['Statin', 'Atorvastatin, Rosuvastatin', '抑制 HMG-CoA reductase，上調 LDL receptor', '肌肉症狀、LFT 變化；真正橫紋肌溶解少見但要警覺'],
        ['Ezetimibe', 'Ezetimibe', '抑制腸道 NPC1L1 吸收膽固醇', '副作用少，與 statin 加成方便'],
        ['PCSK9 inhibitor', 'Evolocumab, Alirocumab', '減少 LDL receptor 降解', '注射、成本與可近性是主要障礙'],
        ['Inclisiran', 'Inclisiran', 'siRNA 抑制 PCSK9 生成', '給藥頻率低，但長期實務與可近性要考慮'],
        ['Fibrate', 'Fenofibrate', '活化 PPAR-alpha，偏降 TG', '與某些 statin 併用肌毒性風險增加，腎功能要注意'],
      ],
    ),
    formula('Atorvastatin 分子式', 'C33H35FN2O5', '這類小分子藥物的價值，不在化學式本身，而在它能讓肝細胞表面 LDL receptor 數量上升，從而把血中 ApoB 顆粒拉回肝臟。'),
    formula('PCSK9 與 DNA 連結', 'PCSK9 gain-of-function -> LDL receptor down -> LDL-C up', 'PCSK9 是把分子遺傳學、藥物開發與臨床事件預防接起來的經典例子。'),
    callout(
      'warning',
      'statin 相關肌肉症狀的常見誤區',
      p('病人一有痠痛就把所有 statin 永久列為過敏，是很常見但不必要的損失。很多情況可透過換藥、降劑量、間歇給藥、檢查甲狀腺與 vitamin D、重新挑戰來處理。'),
    ),
  ),
  section(
    'special-populations',
    '特殊族群考量',
    lead('血脂治療在特殊族群最大的挑戰，是風險高低、證據成熟度與安全顧慮常不在同一條線上。'),
    cards([
      { title: '妊娠', body: '多數 statin 在孕期傳統上避免使用；若是嚴重 FH，需與專科討論個別風險與替代策略。' },
      { title: '兒童 FH', body: '早發 FH 要及早識別與家族篩檢，拖到成年再處理已錯失大量累積風險。' },
      { title: '老年人', body: '不能只因年紀大就停 statin；要看壽命預期、功能狀態、既往 ASCVD 與實際用藥目標。' },
      { title: '慢性肝病與 CKD', body: '不是一概禁用，而是看病因、嚴重度與藥物代謝；很多病人仍能安全受益。' },
    ]),
  ),
  section(
    'clinical-pitfalls',
    '常見臨床陷阱',
    lead('血脂管理最大的陷阱，是把它誤解成「抽血數字」而不是「事件風險」。當臨床只剩化驗單，病人就會把藥看成多餘；而醫療端也容易只在抽血異常時反應，忽略累積暴露。'),
    misconceptionList([
      { myth: '降膽固醇會把身體需要的膽固醇全部抽乾。', correction: '臨床使用的 statin 與其他降脂藥不會讓身體失去維持生命所需的膽固醇，相反地，它們是在降低過量 ApoB 顆粒對血管的長期毒性。' },
      { myth: '只要飲食改善就不用藥。', correction: '對輕度風險者，生活型態確實可能足夠；但對 FH、ASCVD 或高風險病人，單靠飲食通常不足以壓下累積事件風險。' },
      { myth: 'HDL 高的人不需要管 LDL。', correction: '高 HDL 不是免死金牌。動脈硬化風險仍主要跟 atherogenic particle burden 走。' },
    ]),
  ),
  section(
    'case-discussion',
    'Case-based discussion',
    lead('病例：38 歲男性，健檢 LDL 246 mg/dL，無症狀，BMI 24，父親 44 歲心肌梗塞。體檢見阿基里斯腱增厚。'),
    table(
      ['臨床問題', '思路'],
      [
        ['是不是單純飲食問題？', 'LDL 極高加早發家族史與腱黃瘤，高度懷疑 FH。'],
        ['第一步治療是什麼？', '高強度 statin 盡快啟動，不需等待幾個月飲食觀察後再說。'],
        ['接下來要做什麼？', '家族篩檢、追 LDL 降幅、必要時加 ezetimibe 或 PCSK9。'],
      ],
    ),
    summary('案例結論', 'Dyslipidemia 很常在病人沒有症狀時就已經決定未來十到二十年的事件風險。', [
      '極高 LDL 與早發家族史要直接想 FH。',
      '風險導向比單次數字導向更重要。',
      '降脂是長期累積戰，不是抽一次血就結束。'
    ]),
  ),
);

volume3Chapters.ch06 = chapter(
  '抗凝、抗血小板與血栓治療',
  section(
    'anatomy-physiology',
    '正常解剖與生理',
    lead('血栓形成是血小板、凝血因子、內皮與血流動態共同參與的事件。Virchow triad 包含血流停滯 (Stasis)、血管內皮受損 (Endothelial injury) 與高凝狀態 (Hypercoagulability)，這三者決定你面對的是偏動脈型還是偏靜脈型血栓。'),
    p('動脈血栓通常在高剪應力環境下形成，血小板角色較重；靜脈血栓則常與停滯與凝血瀑布活化有關，纖維蛋白與紅血球成分較多。這就是為什麼 ACS、腦中風與周邊動脈事件常靠抗血小板為主，DVT/PE 與 AF stroke prevention 則以抗凝為主。'),
    viewer('thrombosis'),
    diagram('antithrombotic-therapy'),
    table(
      ['系統', '正常功能', '治療切入點'],
      [
        ['血小板黏附/活化', '遇到受損內皮後快速止血', 'Aspirin、P2Y12 inhibitor、GP IIb/IIIa inhibitor'],
        ['凝血瀑布', '產生 thrombin 與 fibrin', 'Heparin、warfarin、DOAC、fondaparinux'],
        ['纖維溶解', '分解既有 fibrin clot', 'Alteplase、tenecteplase 等 thrombolytic'],
        ['內皮與血流', '維持抗凝與抗發炎表面', '處理 immobility、catheter、cancer、inflammation 與 mechanical valve 等背景因子'],
      ],
    ),
    formula('凝血核心簡式', 'Factor Xa -> thrombin (IIa) -> fibrin', '臨床上很多抗凝藥不是在整條瀑布亂打，而是直接卡住 Xa 或 IIa 這些關鍵節點。'),
  ),
  section(
    'symptoms',
    '常見主訴與症狀',
    lead('血栓疾病的主訴取決於栓子去哪裡。動脈事件常以缺血器官症狀登場，靜脈事件則常以腫脹、疼痛、呼吸困難或低氧表現。最難的是，抗血栓藥本身又會帶來出血表現，因此臨床上常在 thrombosis 與 bleeding 兩端來回平衡。'),
    table(
      ['主訴', '要想到什麼', '臨床意義'],
      [
        ['單側小腿腫痛', 'DVT', '需結合 Wells score 與 ultrasound，不是每個腿腫都上 anticoagulant'],
        ['突然胸痛喘與低氧', 'PE', '風險分層決定是否需溶栓或介入'],
        ['TIA / stroke / transient monocular blindness', '動脈或心源性栓塞', '需回頭找 AF、頸動脈、主動脈弓與血液高凝背景'],
        ['黑便、血尿、腦出血症狀', '抗血栓相關出血', '要立刻重新評估藥物必要性與 reversal needs'],
      ],
    ),
    callout(
      'clinical',
      '真實場景',
      p('74 歲 AF 病人說自己最近「只是牙齦比較會流血」，於是自行把 apixaban 停掉一週；接著發生短暫失語。這類案例提醒我們：病人對輕微出血與重大栓塞風險的直覺不一定相稱，衛教與 shared decision making 非常重要。'),
    ),
  ),
  section(
    'pathophysiology',
    '重要疾病機轉',
    lead('血栓病理要先分 arterial 與 venous，但實務上還要知道有些情境是混合型或特殊型，例如 cancer-associated thrombosis、antiphospholipid syndrome、heparin-induced thrombocytopenia (HIT) 與 mechanical valve thrombosis。'),
    p('AF 造成的是心房血液停滯，特別是左心耳；ACS 則是斑塊破裂後的 platelet-rich thrombus；DVT/PE 常和 immobility、癌症、手術、住院、妊娠或遺傳性 thrombophilia 有關。藥物選擇因此不能只看「是血栓」三個字。'),
    diagram('antithrombotic-therapy'),
    cards([
      { title: 'Arterial thrombus', body: '高剪應力、富含血小板，通常與內皮破裂或斑塊不穩定相關。' },
      { title: 'Venous thrombus', body: '停滯與高凝狀態主導，富含 fibrin 與紅血球，因此 anticoagulant 是骨幹。' },
      { title: 'HIT', body: '是免疫介導促凝狀態，不是單純血小板低；一旦懷疑要停 heparin 並改用非 heparin anticoagulant。' },
      { title: 'Cancer-associated thrombosis', body: '癌症、化療、導管與發炎共同把凝血系統推高，復發與出血風險都更難平衡。' },
    ], 'comparison-grid'),
    misconceptionList([
      { myth: '血小板低就不會血栓。', correction: 'HIT 就是經典反例；血小板下降反而可能同時代表高風險栓塞狀態。' },
      { myth: '動脈與靜脈血栓都用同一類藥就好。', correction: '病理機轉不同，因此 ACS 與 AF/PE 的藥理核心完全不同。' },
    ]),
  ),
  section(
    'diagnosis',
    '診斷思路與鑑別診斷',
    lead('血栓診斷不能只靠 D-dimer 或單一影像。成熟的流程是先用 pretest probability 把病人分類，再決定做什麼檢查。尤其 D-dimer 的價值在於排除低中風險病人，不在於證實高風險病人。'),
    table(
      ['情境', '先做什麼', '下一步'],
      [
        ['疑似 DVT', 'Wells score', '低中風險可接 D-dimer，高風險直接 compression ultrasound'],
        ['疑似 PE', 'hemodynamic 分層 + Wells/YEARS', 'CTA、V/Q scan 或 bedside echo 視情況'],
        ['AF 抗凝評估', 'CHA2DS2-VASc + bleeding risk', '不是看一個分數後就不思考，而是輔助溝通'],
        ['疑似 HIT', '4Ts score', '中高機率時停 heparin 並送 PF4 檢測，同步啟動替代抗凝'],
      ],
    ),
    callout(
      'warning',
      'D-dimer 的正確位置',
      p('D-dimer 很敏感但不特異，感染、手術後、癌症、住院與高齡都可能升高。高 pretest probability 病人不能因為想省影像就只抽 D-dimer。'),
    ),
  ),
  section(
    'investigations',
    '關鍵檢查與判讀',
    lead('抗血栓病人的檢查，一半是診斷血栓，一半是讓你安全用藥。腎功能、肝功能、血小板、Hb、PT/INR、aPTT、fibrinogen 與影像結果，彼此不是平行資訊，而是連在一起的。'),
    table(
      ['檢查', '用途', '實務提醒'],
      [
        ['CBC / platelet', '看貧血與血小板', '抗血栓前後都需要基線與追蹤；掉血小板要想 HIT 或出血'],
        ['PT/INR', 'warfarin 監測與 baseline coagulation', '不能用來監測 DOAC 效果'],
        ['aPTT / anti-Xa', 'UFH 等監測', '不同機構 protocol 不同，需看本院標準'],
        ['Creatinine / eGFR', 'DOAC、LMWH 劑量與累積風險', '老人與低體重者特別要小心估算腎功能'],
        ['Imaging', 'CUS、CTPA、TTE、TEE、brain imaging', '影像選擇取決於栓子位置與是否需立即處置'],
      ],
    ),
    spotlight('正常檢驗不代表沒事', '許多 AF 病人在抽血完全正常時仍有明確中風預防適應症；相反地，PT/aPTT 延長也不等於已有足夠抗凝效果，尤其在 DOAC 時代。'),
  ),
  section(
    'treatment',
    '第一線與第二線治療',
    lead('抗血栓治療的成熟度，表現在能不能回答三個問題：這個血栓是動脈還是靜脈？病人現在最怕的是再栓塞還是出血？治療需要多久？'),
    table(
      ['情境', '第一線策略', '常見配合', '高風險提醒'],
      [
        ['ACS / PCI 後', 'DAPT 為主', 'Aspirin + P2Y12 inhibitor +/- 短期 anticoagulant per procedure', '三重治療時間愈短愈好，避免出血'],
        ['AF stroke prevention', 'DOAC 優先（多數非瓣膜性 AF）', 'Apixaban, Rivaroxaban, Dabigatran, Edoxaban', 'Mechanical valve 與中重度 mitral stenosis 不適用 DOAC'],
        ['DVT / PE', '立即 anticoagulation', 'DOAC 或 heparin/LMWH -> oral agent', 'massive PE 需考慮溶栓或介入'],
        ['Mechanical valve', 'Warfarin', 'INR 依瓣膜型態設定', 'DOAC 禁忌，bridge 規劃要清楚'],
      ],
    ),
    callout(
      'success',
      '常見實務組合',
      p('PCI 後合併 AF 的病人，常見做法是極短期 triple therapy 後儘快轉成 DOAC + 單一 P2Y12 inhibitor；這是為了在血栓與出血之間取得較佳平衡。'),
    ),
    cards([
      { title: 'Reversal strategy', body: 'warfarin 有 vitamin K 與 PCC；dabigatran 有 idarucizumab；Xa inhibitor 有 andexanet alfa 或 PCC 視可近性。' },
      { title: 'Periprocedural management', body: '不是所有停藥都要 bridge，真正需要 bridge 的族群比很多人想像少。' },
      { title: 'Thrombolysis', body: '適應症非常情境化，通常保留給特定中風、STEMI 與 massive PE，高出血風險需嚴格篩選。' },
      { title: 'Cancer thrombosis', body: 'DOAC 在許多情境可用，但 GI/GU 腫瘤出血風險與交互作用要更仔細看。' },
    ]),
  ),
  section(
    'pharmacology',
    '常用藥物機轉、副作用、交互作用',
    lead('抗血栓藥的臨床關鍵，不只是知道「它抗凝」，而是知道它卡在哪一段、多久起效、要不要監測、出血時怎麼逆轉、與其他藥重疊時風險如何暴增。'),
    table(
      ['類別', '代表藥', '機轉', '實務重點'],
      [
        ['Aspirin', 'Aspirin', '不可逆抑制 COX-1', '血小板型事件核心藥，但 GI bleeding 與合併 NSAID 問題常見'],
        ['P2Y12 inhibitor', 'Clopidogrel, Ticagrelor, Prasugrel', '阻斷 ADP 訊號', 'Prasugrel 不適合某些中風病史；clopidogrel 受 CYP2C19 影響'],
        ['UFH / LMWH', 'Heparin, Enoxaparin', '透過 antithrombin 抑制 Xa/IIa', 'UFH 可逆、可監測，LMWH 劑量較穩但腎功能影響大'],
        ['Warfarin', 'Warfarin', '抑制 vitamin K epoxide reductase', 'INR 監測、飲食與藥物交互作用多，起效慢'],
        ['DOAC', 'Apixaban, Rivaroxaban, Dabigatran', '直接抑制 Xa 或 IIa', '固定劑量方便，但腎功能、體重與適應症邊界要清楚'],
      ],
    ),
    formula('Aspirin 分子式', 'C9H8O4', '一個小分子透過不可逆乙醯化就能改變整個血小板生命週期，這是抗血小板藥理最經典的例子。'),
    formula('Warfarin 與基因', 'VKORC1 + CYP2C9 -> warfarin sensitivity', '這也是醫學與 DNA 直接相連的代表性案例：不同基因背景讓起始劑量與出血風險差異很大。'),
    formula('Apixaban 分子式', 'C25H25N5O4', '直接 Xa inhibitor 的優勢在固定劑量與少監測，但不是零風險，也不是所有病人都適合。'),
    callout(
      'danger',
      '高風險交互作用',
      p('抗血小板 + 抗凝 + NSAID + alcohol + CKD + 高齡，是出血事件的經典疊加；amiodarone、azole、rifampin、macrolide 等也會深刻改變 warfarin 或部分 DOAC 暴露量。'),
    ),
  ),
  section(
    'special-populations',
    '特殊族群考量',
    lead('特殊族群抗血栓治療的重點，是適應症與藥動學邊界都更窄。真正的成熟，不是更保守或更激進，而是更精準。'),
    cards([
      { title: '妊娠', body: 'LMWH 常是主要抗凝選項；warfarin 有胎兒風險，DOAC 資料不足。' },
      { title: 'CKD', body: '腎功能會直接影響 DOAC 與 LMWH 累積；部分病人 warfarin 仍較適合。' },
      { title: '癌症', body: '栓塞風險高但出血也高，且治療會隨腫瘤部位、化療與侵入性處置變動。' },
      { title: 'Mechanical valve / APS', body: '這些情境仍常以 warfarin 為主，不能被「DOAC 方便」四個字輕易取代。' },
    ]),
  ),
  section(
    'clinical-pitfalls',
    '常見臨床陷阱',
    lead('抗血栓治療最常見的錯，是用「怕出血」蓋過「其實很需要預防栓塞」，或反過來，用「怕栓塞」忽略明顯可避免的出血風險。'),
    misconceptionList([
      { myth: '有出血風險就不能抗凝。', correction: '出血風險工具是用來找可修正因子與提升監測，不是自動取消適應症。很多 AF 病人真正風險更大的是中風。' },
      { myth: 'DOAC 比 warfarin 新，所以所有情境都更好。', correction: '對多數非瓣膜性 AF 很實用，但在 mechanical valve、某些 APS、極端腎功能與特定臨床情境並不適合。' },
      { myth: '停藥前後都應該 bridge 才安全。', correction: 'bridge 本身也會增加出血。只有部分高血栓風險病人才真的需要。' },
    ]),
  ),
  section(
    'case-discussion',
    'Case-based discussion',
    lead('病例：79 歲男性，非瓣膜性 AF，兩週前因 NSTEMI 置放藥物塗層支架，現用 aspirin、clopidogrel、apixaban。今天因黑便住院，Hb 從 13.1 掉到 9.2 g/dL。'),
    table(
      ['臨床問題', '思路'],
      [
        ['現在最急的是什麼？', '先穩定出血、評估 hemodynamics、找 bleeding source。'],
        ['三重治療要不要全部繼續？', '依出血嚴重度與 PCI 時間點重新平衡，通常會盡快縮短 triple therapy。'],
        ['AF 中風風險是否仍存在？', '存在，因此不是永久停抗凝，而是調整時間點、藥物與保護措施。'],
      ],
    ),
    callout(
      'clinical',
      '案例整合',
      p('這類病人最怕的是把所有抗血栓永久停掉，或完全不調整地硬撐。正確做法是把支架血栓、AF 栓塞與 GI bleeding source 放在同一張風險圖上，必要時與心臟科、腸胃科協作重排策略。'),
    ),
    summary('案例結論', '抗血栓治療的本質，不是選對一顆神藥，而是持續重估血栓與出血的動態平衡。', [
      '先分動脈還是靜脈事件。',
      '用藥適應症、期間與交互作用要同步寫進計畫。',
      '真正的高品質治療，需要病人理解為什麼不能自己任意停藥。'
    ]),
  ),
);
