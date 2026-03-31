import type { ChapterContent } from '../../types.js';
import {
  cards,
  callout,
  chapter,
  diagram,
  formula,
  h3,
  lead,
  list,
  misconceptionList,
  p,
  renalViewer,
  references,
  section,
  spotlight,
  summary,
  table,
  tags,
  takeawayList,
} from './shared.js';

export const renalChapters: Record<string, ChapterContent> = {};

const renalSources: Record<string, { label: string; url: string; note: string }[]> = {
  ch12: [
    {
      label: 'KDIGO Acute Kidney Injury',
      url: 'https://kdigo.org/guidelines/acute-kidney-injury/',
      note: 'AKI 的分期、風險評估與腎臟支持治療大框架，可作為本章前腎性、腎實質性與後腎性分流的專業依據。',
    },
    {
      label: 'MedlinePlus Acute Kidney Failure',
      url: 'https://medlineplus.gov/ency/article/000501.htm',
      note: '補足 AKI 常見病因、症狀、檢查與臨床警訊，適合對照本章的真實場景與初始評估流程。',
    },
  ],
  ch13: [
    {
      label: 'NIDDK Kidney Disease',
      url: 'https://www.niddk.nih.gov/health-information/kidney-disease',
      note: '提供 CKD 全貌與病人教育主軸，可對照本章對 albuminuria、腎功能下降與全身併發症的整合描述。',
    },
    {
      label: 'KDIGO CKD Evaluation and Management',
      url: 'https://kdigo.org/guidelines/ckd-evaluation-and-management/',
      note: 'CKD 分期、風險分層與長期照護策略的重要指引來源，對本章風險導向管理特別關鍵。',
    },
  ],
  ch14: [
    {
      label: 'MedlinePlus Fluid and Electrolyte Balance',
      url: 'https://medlineplus.gov/fluidandelectrolytebalance.html',
      note: '從官方病人教育角度整理電解質與體液平衡，適合作為本章低鈉、高鉀與多離子異常的共同底圖。',
    },
    {
      label: 'MedlinePlus Potassium',
      url: 'https://medlineplus.gov/potassium.html',
      note: '補足鉀離子在神經肌肉與心律上的臨床意義，可對照本章高鉀、低鉀與 ECG 風險的重點。',
    },
  ],
  ch15: [
    {
      label: 'MedlinePlus Acidosis',
      url: 'https://medlineplus.gov/ency/article/001181.htm',
      note: '整理代謝性與呼吸性酸中毒的核心概念，可作為本章 ABG 與陰離子間隙思維的基礎對照。',
    },
    {
      label: 'MedlinePlus Alkalosis',
      url: 'https://medlineplus.gov/ency/article/001183.htm',
      note: '補上鹼中毒分類與常見病因，對照本章代謝性鹼中毒、混合性失衡與補償判讀的內容。',
    },
  ],
  ch16: [
    {
      label: 'MedlinePlus Furosemide',
      url: 'https://medlineplus.gov/druginfo/meds/a682858.html',
      note: '可直接對照 loop 利尿劑的用途、副作用、交互作用與病人教育，是本章利尿藥理的實用官方來源。',
    },
    {
      label: 'NIDDK Kidney Disease',
      url: 'https://www.niddk.nih.gov/health-information/kidney-disease',
      note: '提供腎臟疾病與體液管理的大框架，可支撐本章心腎鬱血、利尿反應與腎功能監測的臨床脈絡。',
    },
  ],
};

renalChapters.ch12 = chapter(
  '急性腎損傷 (Acute Kidney Injury, AKI)',
  section(
    'anatomy-physiology',
    '正常解剖與生理',
    lead('急性腎損傷 (Acute Kidney Injury, AKI) 不是單純「creatinine 突然上升」，而是腎小球過濾 (Glomerular filtration)、腎小管回收與分泌 (Tubular reabsorption and secretion)、腎髓質灌流 (Medullary perfusion) 與輸尿路通暢性 (Urinary outflow) 在短時間內失去平衡後的臨床綜合表現。正常腎臟每分鐘接受約四分之一心輸出量，但真正耗氧最凶的部位不是腎小球，而是近端小管 (Proximal tubule) 與粗上行支 (Thick ascending limb) 這些大量搬運鈉的區段。'),
    p('因此，AKI 的關鍵從來不是只有「腎臟有沒有血流」，而是血流是否足以支撐腎元每一段的代謝需求。皮質 (Cortex) 相對灌流充足，髓質 (Medulla) 先天就接近低氧邊緣，所以當病人發生敗血症、低血壓、失血、腎血管張力改變、嚴重鬱血或藥物干擾時，最先受傷的常是髓質外帶小管，而不是腎臟整體同時壞掉。'),
    tags(['Glomerular filtration', 'Tubular transport', 'Medullary hypoxia', 'Renal reserve', 'Urinary outflow']),
    renalViewer('renal-anatomy'),
    diagram('renal-nephron-map'),
    cards([
      { title: '腎小球 (Glomerulus)', body: '負責把血漿中的水與小分子篩入鮑氏囊，但過濾是否發生仍取決於輸入與輸出細動脈張力、有效動脈血量與腎內壓力。' },
      { title: '近端小管 (Proximal Tubule)', body: '約回收大部分鈉、水、葡萄糖、胺基酸與 bicarbonate，是缺血與毒性傷害最常見的戰場之一。' },
      { title: '亨利氏環與髓質 (Loop of Henle and Medulla)', body: '靠逆流倍增系統 (Countercurrent multiplication) 建立濃縮梯度，但也因此長期處在高代謝與低氧敏感的狀態。' },
      { title: '輸尿路 (Collecting System)', body: '腎盂、輸尿管、膀胱與尿道任何一段阻塞，都可能讓原本可逆的壓力問題變成 postrenal AKI。' },
    ]),
    formula('濾過壓概念', 'Net filtration pressure ~ PGC - PBS - piGC', 'PGC 是腎絲球毛細血管靜水壓，PBS 是鮑氏囊壓，piGC 是血漿膠體滲透壓。前腎性低灌流、ACEi / ARB、NSAID 與阻塞會從不同方向改寫這個平衡。'),
    summary('底層生理關鍵', 'AKI 的本質是腎臟短期失去維持濾過、排水、排鉀、調酸鹼與清除代謝廢物的能力，而這個失衡可能來自血流、腎實質或尿流出口任何一段。', [
      '腎髓質不是次要配角，而是 AKI 高脆弱核心。',
      '腎功能是整條腎元與全身血流動力學共同產物。',
      'Creatinine 只是延遲指標，真正傷害通常比數字更早開始。',
    ]),
  ),
  section(
    'symptoms',
    '常見主訴與症狀',
    lead('AKI 很少以「我腎臟痛」這種教科書式抱怨登場。多數病人真正的主訴是尿量變少、全身浮腫、呼吸喘、食慾差、噁心、嗜睡、意識改變，或只是住院過程中 creatinine 被抽高。很多時候，腎臟是第一個在生理壓力下失衡的器官，卻不是第一個被病人感覺到的器官。'),
    p('臨床上要把症狀放進情境。失血、腹瀉、敗血症、心衰竭鬱血、肝硬化、重症插管、化療後腫瘤溶解、造影檢查後、抗生素或 PPI 之後出現發熱皮疹與 eosinophilia，都會把 AKI 的機轉導向不同方向。相反地，很多病人沒有任何不舒服，卻已經在住院藥物與血流變化的夾擊下進入 Stage 1 或 Stage 2 AKI。'),
    table(
      ['臨床情境', '常見表現', '背後線索', '容易被誤解成'],
      [
        ['脫水 / 前腎性 AKI', '口渴、頭暈、尿少、站起來暈', '失血、腹瀉、利尿過強、感染、第三間隙流失', '單純吃太少水'],
        ['鬱血型 AKI', '喘、腳腫、體重增加、尿量下降', '右心壓高、腎靜脈壓上升、利尿不足或心輸出量下降', '只當成心臟問題，不注意腎臟'],
        ['AIN / 藥物性 AKI', '發燒、皮疹、嗜酸性球上升、尿異常', 'beta-lactam、PPI、NSAID、rifampin 等常見藥物', '感染沒好或過敏與腎無關'],
        ['後腎性 AKI', '下腹脹、排尿困難、腰痛、尿流中斷', 'BPH、腫瘤、結石、血塊或神經性膀胱', '只是泌尿道小問題'],
      ],
    ),
    callout(
      'clinical',
      '真實場景',
      p('78 歲男性因肺炎住院，前三天輸液後開始用利尿劑控制肺水腫。第四天 creatinine 從 1.0 上升到 1.8 mg/dL，尿量變少，護士回報病人更喘。這不應被簡化成「利尿過頭」或「感染太重」二選一，而是要同時思考鬱血仍未解除、腎灌流不足、抗生素腎毒性、NSAID 或阻塞等多個交錯機轉。'),
    ),
    takeawayList([
      { title: 'AKI 常以全身症狀出現', body: '呼吸喘、意識改變、食慾差、浮腫都可能是腎臟失去水分與代謝控制的後果。' },
      { title: '尿量訊號非常重要', body: '寡尿 (Oliguria) 往往比 creatinine 更早示警，但不能因有尿就掉以輕心，非寡尿型 AKI 同樣常見。' },
      { title: '時間軸決定鑑別方向', body: '造影後、抗生素後、手術後、敗血症中、尿閉前後，對診斷價值極高。' },
    ]),
  ),
  section(
    'pathophysiology',
    '重要疾病機轉',
    lead('AKI 的經典分類仍是前腎性 (Prerenal)、腎實質性 (Intrinsic) 與後腎性 (Postrenal)，但真正臨床上這三類很少完全分離。敗血症病人可能同時低灌流、微循環失調、內皮傷害、炎症介質風暴與藥物毒性共存；心衰竭病人則常兼有低有效動脈血量與高腎靜脈壓。'),
    p('腎實質性 AKI 中，急性腎小管損傷 (Acute tubular injury / necrosis, ATI / ATN) 最常見，機轉包括缺血、毒性、色素傷害與晶體沉積。急性間質性腎炎 (Acute interstitial nephritis, AIN) 常由藥物引起；腎小球腎炎 (Glomerulonephritis, GN) 與血栓性微血管病變 (Thrombotic microangiopathy, TMA) 雖較少見，但一旦延誤往往造成不可逆傷害。'),
    diagram('aki-decision-map'),
    table(
      ['機轉類型', '代表病因', '發生了什麼', '臨床提醒'],
      [
        ['前腎性低灌流', '失血、脫水、敗血症、肝硬化、心衰竭', '腎臟感知灌流不足，先啟動保鈉保水與血管張力重分配', '若處理及時通常可逆，但拖太久會轉成 ATN'],
        ['ATN / ATI', '休克、造影、aminoglycoside、cisplatin、rhabdomyolysis', '小管上皮失去極性、脫落、形成管型並降低回收能力', '尿沉渣與時間軸很有幫助'],
        ['AIN', 'PPI、NSAID、抗生素、免疫藥物', '間質發炎與水腫破壞周邊小管功能', '發燒、皮疹、eosinophilia 並非每次都齊全'],
        ['後腎性阻塞', 'BPH、結石、腫瘤、神經性膀胱', '壓力倒灌讓鮑氏囊壓上升，過濾壓下降', '雙側阻塞或單腎阻塞特別危險'],
      ],
    ),
    misconceptionList([
      { myth: 'Creatinine 上升一定代表腎細胞已壞死。', correction: 'Creatinine 只反映濾過狀態，前腎性低灌流、鬱血、阻塞、藥物影響都可先讓數值上升，而不一定已有不可逆壞死。' },
      { myth: '有尿就不是 AKI。', correction: '非寡尿型 AKI 很常見，尤其在敗血症、藥物性或恢復期病人。尿量正常不能讓你停止追蹤 creatinine 與電解質。' },
    ]),
  ),
  section(
    'diagnosis',
    '診斷思路與鑑別診斷',
    lead('診斷 AKI 先抓兩個問題：病人真的符合 AKI 定義嗎？如果是，機轉更像前腎性、腎實質性、後腎性，還是混合型？KDIGO 定義強調 creatinine 在短時間上升或尿量下降，但床邊真正重要的是把數字與病人正在發生的生理事件接起來。'),
    p('病史必問最近的體液變化、感染、手術、造影、休克、尿流問題、最近新增藥物與非處方藥。理學檢查要同時看容量不足與容量過多，因為許多 AKI 不是「缺水或水太多」單選題。鬱血、第三間隙、肝硬化、腸道滲漏、腹內壓高都可能讓病人總體水多但腎灌流仍差。'),
    table(
      ['步驟', '核心問題', '實務工具', '常見錯誤'],
      [
        ['確認 AKI', '和基線相比變化多快、多大', '近期 creatinine、尿量、住院紀錄', '不知道基線就直接下結論'],
        ['找時間軸', '事件發生在前、同時還是之後', '病史、用藥單、手術 / 造影 / ICU 流程', '只看今天抽血，不問昨天發生什麼'],
        ['看三大桶', '灌流、腎實質、阻塞哪個最像主軸', '尿沉渣、尿量、超音波、臨床情境', '把 FENa 當唯一裁判'],
        ['找需緊急處理的後果', '高血鉀、酸中毒、肺水腫、尿毒症', 'ECG、ABG、電解質、胸部評估', '還在分類時忽略生命威脅'],
      ],
    ),
    list([
      'FENa 與 FEUrea 可以作為輔助，但在使用利尿劑、CKD、敗血症、contrast-associated AKI 或 mixed AKI 時都可能誤導。',
      'AIN、GN、TMA 這類需要專門治療的腎實質病變，常靠尿液、血液與血壓線索提前懷疑，而不是等腎臟完全失控才想到。',
      '若病人有無法解釋的血尿、蛋白尿、血小板低、溶血、肺腎症候群線索，診斷流程要立刻升級。',
    ]),
    callout(
      'warning',
      '關鍵紅旗',
      p('AKI 合併顯著蛋白尿、RBC cast、持續血尿、快速惡化高血壓、血小板下降、溶血、皮疹、關節痛或肺部出血時，不要再把它當成一般脫水或 ATN 觀察。這種病人常需要腎臟科提早介入，甚至考慮腎活檢 (Kidney biopsy)。'),
    ),
  ),
  section(
    'investigations',
    '關鍵檢查與判讀',
    lead('AKI 的檢查不是把所有腎功能單都開一遍，而是精準回答四件事：有沒有急性電解質與酸鹼危險？有沒有尿液或血液暗示特定腎病？有沒有阻塞？接下來治療與監測要靠哪些數據持續修正？'),
    table(
      ['檢查', '用途', '判讀重點'],
      [
        ['BMP / CMP', 'creatinine、BUN、Na、K、HCO3', '抓 AKI 嚴重度與高血鉀 / 酸中毒等立即風險'],
        ['尿液常規與尿沉渣', '蛋白、血尿、白血球、顆粒管型、RBC cast', '尿沉渣是高價值 bedside pathology，不要只看 dipstick'],
        ['尿鈉、FENa、FEUrea', '輔助判斷腎臟在保鈉還是排鈉', '只能放回情境，不能脫離病人獨立判決'],
        ['腎臟與膀胱超音波', '找 hydronephrosis、膀胱殘尿、單腎、慢性縮腎', '懷疑阻塞時價值極高'],
        ['CK、尿酸、溶血 / 血栓指標', '找 rhabdomyolysis、tumor lysis、TMA', '對特殊病因很關鍵'],
        ['血清學與免疫學檢查', 'ANCA、anti-GBM、ANA、complement、HBV / HCV 等', '只有在懷疑 glomerular / immune AKI 時才有高價值'],
      ],
    ),
    h3('判讀細節'),
    list([
      '腎超音波看到腎臟明顯萎縮、皮質變薄與高回音，較支持慢性基底病變；但慢性病人仍可在此基礎上疊加 AKI。',
      'BUN/creatinine ratio 偏高可支持前腎性狀態，但 GI 出血、類固醇、高蛋白分解等也會讓 BUN 上升。',
      '持續追蹤尿量、體重、血壓、中心靜脈壓線索與利尿反應，往往比單次 lab 更能告訴你病人在往哪個方向走。',
    ]),
    spotlight('最常被忽略的檢查', '床邊膀胱掃描 (Bladder scan) 與完整用藥盤點常常比高階生物標記更快改變 AKI 的處置。老年病人、術後病人與神經性膀胱病人尤其如此。'),
  ),
  section(
    'treatment',
    '第一線與第二線治療',
    lead('AKI 治療的第一原則不是「開腎臟藥」，而是先把腎臟從正在傷害它的情境中拉出來。這包括恢復灌流、解除阻塞、停止腎毒性暴露、校正危險電解質與酸鹼異常，並重新評估每一個正在進入病人體內的藥物與液體。'),
    table(
      ['臨床情境', '第一線處置', '常見搭配藥物 / 介入', '重要提醒'],
      [
        ['前腎性低灌流', '優先處理休克、失血、感染與有效動脈血量不足', '平衡型晶體液、血液製劑、適當升壓藥', '補液不是越多越好，鬱血病人會被補壞'],
        ['鬱血型 AKI', '積極但監測式去鬱血', 'Loop 利尿劑、必要時連續輸注、超濾視情況', 'creatinine 小幅上升不一定表示利尿錯誤，重點是 perfusion 與 congestion 同步判讀'],
        ['阻塞型 AKI', '先解除壓力源', '導尿、輸尿管支架、腎造口', '解除阻塞後注意 post-obstructive diuresis'],
        ['嚴重高血鉀 / 酸中毒 / 肺水腫', '先救命再分類', 'Calcium gluconate、insulin + dextrose、beta-agonist、bicarbonate 視情況、透析', 'AEIOU 是支持決策，不是拖延治療的清單'],
      ],
    ),
    cards([
      { title: '液體選擇', body: '平衡型晶體液 (Balanced crystalloids) 在很多重症與 AKI 風險病人是合理的一線選擇；0.9% saline 並非永遠錯，但大量輸注會增加高氯性酸中毒風險。' },
      { title: '利尿劑角色', body: 'Loop 利尿劑能處理體液過多，但不能把利尿本身當成「治 AKI」。若病人不鬱血，利尿並不會修復受傷腎元。' },
      { title: '停藥與調整', body: 'NSAID、ACEi / ARB、metformin、SGLT2 inhibitor、某些抗生素與顯影前後藥物都需依情境暫停或調整，但不要機械式永遠停掉。' },
      { title: '腎臟替代治療 (RRT)', body: '透析的任務是暫時接手排鉀、排酸、排水與部分毒素清除，並不會自動修復病因，因此原始機轉仍要並行處理。' },
    ], 'comparison-grid'),
    callout(
      'success',
      '高價值處置順序',
      p('先處理 hemodynamics、呼吸與電解質危險，再用尿液、影像與病史縮小病因。對許多 AKI 病人來說，最能改變預後的不是多一張 lab，而是提早兩小時停掉腎毒性暴露或解除阻塞。'),
    ),
  ),
  section(
    'pharmacology',
    '常用藥物機轉、副作用、交互作用',
    lead('AKI 章節的藥理重點，不是背出一個「治 AKI 的藥」，而是理解哪些藥會改善腎灌流與危險後果，哪些藥會讓 AKI 惡化，以及哪些原本有價值的藥在 AKI 期間需要暫停、減量或改監測模式。'),
    table(
      ['藥物 / 類別', '常見用途', '關鍵機轉', '副作用與交互作用提醒'],
      [
        ['Balanced crystalloid', '恢復血流與循環容量', '增加有效循環容積並避免過高氯負荷', '大量輸注仍可能造成鬱血與稀釋問題'],
        ['Loop diuretics', '處理體液過多與去鬱血', '抑制 NKCC2，增加鈉水排出', '低鉀、低鎂、耳毒性、利尿阻抗'],
        ['Norepinephrine', '休克合併 AKI 時維持灌流壓', '提升 MAP 以維持器官灌流', '過度血管收縮與不足補液都會讓效果失真'],
        ['Calcium gluconate', '重度高血鉀 ECG 變化時穩膜', '降低致命心律風險，不會真正降鉀', 'Digoxin 毒性情境需謹慎，但不能因此延誤救命'],
        ['Insulin + dextrose', '把鉀移回細胞內', '啟動 Na/K ATPase 促進鉀內移', '低血糖是高頻風險，需追蹤'],
        ['Potassium binders', '非立即致命情境下增加排鉀', '在腸道結合鉀以增加排出', '起效較慢，不適合作為唯一急救手段'],
      ],
    ),
    formula('FENa 公式', 'FENa (%) = (Urine Na x Plasma Cr) / (Plasma Na x Urine Cr) x 100', '低 FENa 可支持保鈉狀態，但在利尿劑、CKD、色素尿、敗血症與某些 early ATN 情境都會失準。'),
    callout(
      'danger',
      '常見藥理誤解',
      p('以為「creatinine 上升就必須永遠停掉 ACEi / ARB」是常見誤解。真正做法是分辨目前 AKI 是否由低灌流、雙側腎動脈狹窄、重度高血鉀或其他危險情境主導；等 hemodynamic 穩定後，很多原本具器官保護效果的藥仍應重新評估恢復。'),
    ),
  ),
  section(
    'special-populations',
    '特殊族群考量',
    lead('特殊族群的 AKI 重點在於風險來源不同、基線不同、恢復速度不同。老年病人因肌肉量低，creatinine 可能低估嚴重度；兒科病人則更需要用體重與尿量追蹤；孕婦、肝硬化與重症病人常在容量指標與有效灌流之間呈現高度錯位。'),
    cards([
      { title: '老年病人', body: '多重用藥、BPH、脫水感知差、感染與 baseline CKD 都會讓 AKI 更早發生但更晚被看出來。' },
      { title: '兒科', body: '尿量與藥物劑量須依體重精準處理；腹瀉、腎病症候群、先天結構異常與新生兒循環變化都要特別注意。' },
      { title: '肝硬化 / 肝腎症候群', body: '病人體液可能整體過多，但有效動脈血量很低。albumin、vasoconstrictor 與感染控制常比盲目補液更重要。' },
      { title: 'ICU / 重症', body: '敗血症、升壓藥、呼吸機、腹內壓、血紅素、腎毒性藥物與 CRRT 交互影響，AKI 幾乎總是多因子。' },
    ]),
  ),
  section(
    'clinical-pitfalls',
    '常見臨床陷阱',
    lead('AKI 最常見的臨床錯誤，不是罕見診斷沒想到，而是把常見機轉想得太單線。'),
    misconceptionList([
      { myth: 'AKI 就是缺水，先一直補液再說。', correction: '很多 AKI 病人其實鬱血、敗血症微循環失衡或尿路阻塞。無限制補液會把肺水腫與腹內壓推得更糟。' },
      { myth: '利尿後 creatinine 升一點就是治療失敗。', correction: '在明顯鬱血病人，去鬱血過程中 creatinine 小幅變動可能反映 hemodynamic 重新分配，而不一定代表腎臟真正更壞。關鍵是整體灌流、症狀與尿量。' },
      { myth: '尿檢沒什麼特別就不用再看尿液。', correction: '尿沉渣需要重複且仔細看；一次 dipstick 正常不代表沒有腎小球或間質病變，尤其在病程初期。' },
    ]),
  ),
  section(
    'case-discussion',
    'Case-based discussion',
    lead('病例：64 歲女性，因發燒、咳嗽與低血壓住院，診斷敗血症性肺炎。她有高血壓、糖尿病與慢性心衰竭，平時服用 losartan、spironolactone、dapagliflozin、furosemide。入院前兩天因膝痛自行服用 ibuprofen。入院 24 小時後 creatinine 從 1.1 上升到 2.0 mg/dL，尿量下降，血鉀 5.8 mmol/L。'),
    table(
      ['臨床問題', '思考方向'],
      [
        ['這是前腎性還是 ATN？', '答案可能是兩者都有。敗血症、低血壓、NSAID、RAAS blockade、SGLT2i、利尿背景與心衰竭鬱血共同把腎推向 mixed AKI。'],
        ['第一步做什麼？', '先穩定 hemodynamics 與高血鉀風險，停用暫時不利藥物，重新評估容量與鬱血，安排尿液與超音波。'],
        ['利尿劑要不要停？', '若病人仍明顯鬱血，不能因 creatinine 上升就機械式停掉所有利尿；反而應判斷是否需要更精準的去鬱血。'],
      ],
    ),
    callout(
      'clinical',
      '案例整合',
      p('這種病人最容易被落入「AKI 所以停藥、補液、觀察」的單一路徑。但真正成熟的做法，是把敗血症 hemodynamics、腎毒性暴露、鬱血、藥物交互作用與高血鉀一起處理。AKI 通常不是單一器官出事，而是整個生理系統失序的第一個警報器。'),
    ),
  ),
  references('章內來源註記', renalSources.ch12),
);

renalChapters.ch13 = chapter(
  '慢性腎臟病 (Chronic Kidney Disease, CKD)',
  section(
    'anatomy-physiology',
    '正常解剖與生理',
    lead('慢性腎臟病 (Chronic Kidney Disease, CKD) 要從「腎元儲備」這個概念開始理解。正常人擁有大量腎元 (Nephron) 與相當可觀的功能冗餘，因此在早期腎元流失時，剩餘腎元會用高過濾 (Hyperfiltration)、輸入細動脈擴張與腎小管代償來撐住總 GFR。這也是 CKD 常在多年沉默後才被發現的原因。'),
    p('然而，代償本身會變成毒性。當單位腎元壓力長期偏高，腎小球硬化 (Glomerulosclerosis)、小管間質纖維化 (Tubulointerstitial fibrosis)、蛋白尿毒性 (Proteinuria toxicity) 與慢性發炎會逐步擴大，最後形成「剩越少、每個剩下的腎元負擔越大、壞得越快」的惡性循環。CKD 因而不只是腎功能低，而是結構與內分泌功能長期重塑的全身性疾病。'),
    tags(['Hyperfiltration', 'Albuminuria', 'Fibrosis', 'CKD-MBD', 'Cardiorenal risk']),
    renalViewer('ckd-fibrosis'),
    diagram('renal-nephron-map'),
    cards([
      { title: '腎元流失 (Nephron Loss)', body: '不論起因是糖尿病、高血壓、免疫病還是先天結構異常，最終都可能匯流到腎元數量下降與代償性高過濾。' },
      { title: '蛋白尿 (Albuminuria / Proteinuria)', body: '它不只是 marker，也是 mediator。大量蛋白進入小管後會促進發炎、纖維化與進一步腎損害。' },
      { title: '腎臟內分泌功能', body: 'Erythropoietin、活化維生素 D、RAAS 與酸鹼調節都在 CKD 中逐漸失衡，因此 CKD 會牽涉貧血、骨病、酸中毒與高血鉀。' },
      { title: '心腎共病 (Cardiorenal Axis)', body: 'CKD 與心血管疾病互相放大。病人常死於心血管事件，而不是等到真正尿毒症才出問題。' },
    ]),
    summary('CKD 生理重點', 'CKD 的早期不是腎突然不工作，而是剩餘腎元過度工作；正因為代償太成功，臨床往往更晚看到後果。', [
      'GFR、蛋白尿與影像三者要一起理解 CKD。',
      '蛋白尿是高風險訊號，也是治療靶點。',
      'CKD 會逐步改寫造血、骨代謝、鉀與酸鹼。',
    ]),
  ),
  section(
    'symptoms',
    '常見主訴與症狀',
    lead('CKD 早期通常沒有明顯主訴，因此很多病人是健檢、糖尿病追蹤或高血壓門診抽血時才被發現。到了中後期，症狀則往往不是「腎臟症狀」，而是疲倦、夜尿、食慾差、皮膚癢、浮腫、抽筋、注意力差、呼吸喘或骨痛。真正困難的地方在於，這些症狀都不專一，常被歸因為老化、糖尿病、貧血或心臟病。'),
    table(
      ['病程階段', '常見主訴', '背後意義', '容易被忽略之處'],
      [
        ['早期 CKD', '幾乎無症狀、夜尿增加、泡泡尿', '濃縮力下降、albuminuria', '病人常因無感而延後處理'],
        ['中度 CKD', '疲倦、輕度水腫、血壓更難控制', '貧血開始、鈉水調節變差、RAAS 與血管僵硬', '只看 creatinine，不追 UACR 與 BP 目標'],
        ['晚期 CKD', '食慾差、噁心、皮膚癢、抽筋、呼吸喘', '尿毒素堆積、酸中毒、貧血、骨礦物失衡', '誤以為只是年紀大或營養差'],
        ['快速進展期', '體重增加、血壓惡化、浮腫加劇', '病程加速或 AKI on CKD', '忽略可逆加速因子如 NSAID、感染、阻塞'],
      ],
    ),
    callout(
      'clinical',
      '真實場景',
      p('52 歲男性糖尿病 10 年，最近覺得只是「比較累、晚上多起來尿」。他 creatinine 只有輕微升高，但 UACR 持續超標，門診血壓 148/88 mmHg，腳踝輕微水腫。這種病人最容易被錯過，因為症狀太普通、數字還不夠震撼，卻正處於最值得積極介入的階段。'),
    ),
  ),
  section(
    'pathophysiology',
    '重要疾病機轉',
    lead('CKD 的病理機轉可從兩條軸線理解。第一條是原發病因，例如糖尿病腎病 (Diabetic kidney disease)、高血壓腎硬化、IgA 腎病、腎多囊病、狼瘡腎炎等；第二條則是無論起點為何，最後都常走向腎小球高壓、蛋白尿、小管間質纖維化、慢性炎症與腎元流失。'),
    p('這種共同終點解釋了為什麼 RAAS 阻斷、SGLT2 inhibitor、血壓控制、蛋白尿控制、限鹽與避免腎毒性暴露在不同 CKD 病因中都有重要地位。另一方面，CKD 也會反過來造成二級問題，包括貧血、CKD-MBD、代謝性酸中毒、高血鉀、免疫功能改變與加速動脈硬化。'),
    renalViewer('ckd-fibrosis'),
    table(
      ['機轉', '發生了什麼', '典型臨床線索', '常見治療切入點'],
      [
        ['高過濾與腎小球壓力', '單位腎元負荷上升，長期導致硬化', '糖尿病、肥胖、單腎、蛋白尿', 'ACEi / ARB、SGLT2i、血壓與體重管理'],
        ['蛋白尿毒性', '過量蛋白進入小管後啟動炎症與纖維化', 'UACR 上升、泡泡尿', 'RAAS 阻斷、SGLT2i、病因控制'],
        ['小管間質纖維化', '功能性腎實質被膠原與疤痕取代', '腎臟縮小、進展性 eGFR 下降', '減少持續傷害、避免腎毒性、控制慢性炎症環境'],
        ['內分泌與代謝失衡', 'EPO 下降、活化維生素 D 下降、酸排出下降', '貧血、骨病、酸中毒、高磷、高鉀', 'ESA 視情況、鐵劑、bicarbonate、磷結合劑、維生素 D 類藥物'],
      ],
    ),
    misconceptionList([
      { myth: '只要 creatinine 還沒有很高，就不是大問題。', correction: 'CKD 風險分層要看 eGFR 與 albuminuria。許多高風險病人 creatinine 變化不大，但蛋白尿與心血管風險已明顯上升。' },
      { myth: 'CKD 只要等到快洗腎再處理。', correction: '真正能改變軌跡的是早中期介入。越晚才想到 CKD，越多併發症已經形成。' },
    ]),
  ),
  section(
    'diagnosis',
    '診斷思路與鑑別診斷',
    lead('CKD 診斷的兩個核心是「持續超過三個月」與「有結構或功能異常證據」。單次 creatinine 高不代表 CKD，單次正常也不能排除。真正成熟的判讀，必須把時間、蛋白尿、影像與可能的急性加速因素一起放進來。'),
    table(
      ['步驟', '重點', '實務工具', '常見錯誤'],
      [
        ['確認慢性性', '異常是否持續超過 3 個月', '前後 creatinine、eGFR、UACR、影像', '把 AKI on CKD 當成單純 CKD'],
        ['分層風險', '用 G category + A category 看預後', 'eGFR、UACR', '只報 Stage，不看 albuminuria'],
        ['找病因', '糖尿病、高血壓、遺傳、免疫、阻塞、藥物', '病史、尿液、影像、血清學', '所有 CKD 都歸類成糖尿病腎病'],
        ['找可逆加速因子', 'AKI 疊加、感染、NSAID、泌尿阻塞、未控制血壓', '近期藥物與事件回顧', '看到慢性病就不再追急性因子'],
      ],
    ),
    list([
      '糖尿病病人若 albuminuria 很高、視網膜病變並行且病程一致，較支持 diabetic kidney disease；若血尿明顯、蛋白尿突增、eGFR 掉太快，仍要想其他病因。',
      '影像看到腎臟對稱性縮小常支持慢性病，但糖尿病、多囊腎、amyloidosis 等病人腎臟不一定小。',
      'Cystatin C 在肌肉量極低、營養不良或身體組成特殊病人，有助於避免單靠 creatinine 低估或高估腎功能。',
    ]),
  ),
  section(
    'investigations',
    '關鍵檢查與判讀',
    lead('CKD 追蹤的價值在於建立趨勢，而不是蒐集單次數字。你需要知道病人目前的腎功能、蛋白尿程度、進展速度、心血管風險與 CKD 併發症是否已經出現。'),
    table(
      ['檢查', '用途', '判讀重點'],
      [
        ['eGFR', '估算過濾功能', '放在時間軸上看斜率，比單次 stage 更有臨床意義'],
        ['尿白蛋白 / 肌酸酐比 (UACR)', '量化 albuminuria 與預後風險', '風險分層與治療反應都高度依賴 UACR'],
        ['尿液常規與沉渣', '看血尿、蛋白尿型態與活動性腎病線索', '持續血尿不應被 albuminuria 掩蓋'],
        ['腎臟超音波', '看大小、回音、阻塞、多囊、結構異常', '慢性變化與可逆阻塞要分開讀'],
        ['CBC / ferritin / TSAT', '評估 CKD 貧血與鐵狀態', '治療貧血前先確認鐵是否足夠'],
        ['Ca / P / PTH / bicarbonate / K', '追 CKD-MBD、酸中毒與高血鉀', '這些常決定治療複雜度與轉介時機'],
      ],
    ),
    spotlight('追蹤的真正目的', '不是每次回診都把 lab 填滿，而是用最少但關鍵的數字回答：病人有沒有在變快？蛋白尿有沒有降？會不會出現高血鉀、酸中毒、貧血或骨礦物問題？'),
  ),
  section(
    'treatment',
    '第一線與第二線治療',
    lead('CKD 治療的核心不是「把 creatinine 變回正常」，而是延緩進展、降低心血管事件、減少併發症與為病人保留生活品質。多數病人需要血壓、血糖、鈉攝取、蛋白尿、體重與藥物策略一起工作，任何單一措施都不夠。'),
    table(
      ['情境', '第一線治療', '常見配合藥物 / 介入', '重要提醒'],
      [
        ['蛋白尿 CKD', 'ACEi 或 ARB 作為腎保護骨幹', 'SGLT2 inhibitor；糖尿病病人可考慮 finerenone 視條件', 'creatinine 與 K 需追蹤，但不要因小幅變化過早放棄'],
        ['糖尿病 CKD', '血糖控制加上腎保護藥物', 'SGLT2i、GLP-1 RA 視整體代謝與心血管風險', '降糖策略要依 eGFR 與低血糖風險調整'],
        ['高血壓 CKD', '達到適當血壓目標與限鹽', 'RAAS blockade、利尿劑、DHP CCB', '鹽分與體液管理會決定藥物表現'],
        ['CKD 併發症', '依問題分層處理', '鐵劑、ESA、bicarbonate、磷結合劑、維生素 D 類、鉀結合劑', '不要把所有併發症都拖到透析前才處理'],
      ],
    ),
    cards([
      { title: 'SGLT2 inhibitor', body: '不只降血糖，也能降低腎小球內壓、減少 albuminuria 並延緩腎病與心衰事件。起始後 eGFR 小幅下降可為 hemodynamic effect。' },
      { title: '生活型態', body: '限鹽、戒菸、運動、體重管理與避免非處方 NSAID，是 CKD 照護最常被低估但最具有累積價值的部分。' },
      { title: '預先規劃 (Pre-ESKD Planning)', body: '對進展性 CKD 病人，提早討論透析方式、血管通路、腹膜透析、腎移植與保守治療，比等到緊急透析更安全也更符合病人意願。' },
      { title: '多學科整合', body: 'CKD 病人往往同時需要腎臟科、心臟科、糖尿病照護、營養師與藥師一起管理，因為真正難的是複方風險。' },
    ], 'comparison-grid'),
    callout(
      'success',
      '高價值門診目標',
      p('若你每次回診都有系統性追 eGFR 斜率、UACR、血壓、用藥依從性、鉀與 bicarbonate，CKD 的進展就會從被動旁觀變成主動管理。'),
    ),
  ),
  section(
    'pharmacology',
    '常用藥物機轉、副作用、交互作用',
    lead('CKD 藥理思維的重點，是在腎保護、心血管保護與併發症控制之間找到平衡，同時注意「腎功能下降會讓很多藥的暴露量與毒性變得和以前不同」。'),
    table(
      ['類別', '代表藥物', '主要機轉', '副作用 / 交互作用重點'],
      [
        ['RAAS blockade', 'Lisinopril, Losartan, Valsartan', '降低腎小球內壓與 albuminuria', '高血鉀、creatinine 上升；NSAID + 利尿劑組合風險高'],
        ['SGLT2 inhibitor', 'Dapagliflozin, Empagliflozin', '增加尿糖與尿鈉，降低腎小球高過濾', '生殖泌尿感染、體液減少、酮酸中毒特殊情境風險'],
        ['Nonsteroidal MRA', 'Finerenone', '抑制醛固酮相關發炎與纖維化訊號', '高血鉀風險需與 ACEi / ARB 並行監測'],
        ['ESA / 鐵劑', 'Epoetin alfa, Darbepoetin, IV iron', '改善 CKD 貧血', '鐵過量、血壓升高與血栓風險要看整體目標'],
        ['鉀結合劑', 'Patiromer, Sodium zirconium cyclosilicate', '在腸道結合鉀以利持續使用腎保護藥', '起效時間、胃腸副作用與其他口服藥間隔要注意'],
        ['Bicarbonate', 'Sodium bicarbonate', '矯正慢性代謝性酸中毒', '鈉負荷、腹脹與體液狀態需一起考量'],
      ],
    ),
    formula('eGFR 不是調劑全部', 'Drug dosing != eGFR only', '給藥調整除了 eGFR，還要看藥物是否 dialyzable、蛋白結合率、活性代謝物、Vd 與病人體液狀態。'),
  ),
  section(
    'special-populations',
    '特殊族群考量',
    lead('CKD 在不同族群中代表不同風險語言。兒童要思考成長與發育，孕婦要思考母胎血流與蛋白尿解讀，老年人則要處理 frailty、多重用藥與「血清 creatinine 看起來還好但真實腎功能未必好」這件事。'),
    cards([
      { title: '老年 CKD', body: '評估不應只停留在 stage，還要把跌倒、低血壓、認知、用藥複雜度與生活功能一起納入。' },
      { title: '糖尿病與心衰共病', body: 'SGLT2i、RAAS blockade 與利尿策略需彼此協調，避免病人被不同專科各自調整到互相抵銷。' },
      { title: '腎移植候選者', body: '越早轉介越能保留選擇，等待到極晚期才處理常錯過最佳時機。' },
      { title: '透析前規劃', body: '教育、血管通路建立、營養與症狀照護預先展開，能顯著減少緊急透析的混亂與風險。' },
    ]),
  ),
  section(
    'clinical-pitfalls',
    '常見臨床陷阱',
    lead('CKD 的臨床陷阱常來自延遲、低估與過度簡化。'),
    misconceptionList([
      { myth: '蛋白尿只是檢驗值，不重要。', correction: 'Albuminuria 本身和腎病進展與心血管風險都高度相關，治療成效也常體現在它的下降。' },
      { myth: 'RAAS blockade 讓 creatinine 上升就是害腎。', correction: '啟用後輕度上升可反映腎小球內壓下降，是預期 hemodynamic effect；真正要做的是監測幅度與排除危險情境。' },
      { myth: '等到 eGFR 很低再轉腎臟科就好。', correction: '高風險蛋白尿、快速下降、反覆高血鉀、酸中毒或病因不明時，早轉介常能保住更多選項。' },
    ]),
  ),
  section(
    'case-discussion',
    'Case-based discussion',
    lead('病例：58 歲女性，第二型糖尿病 14 年，A1c 7.6%，血壓 150/92 mmHg。近期 eGFR 從 62 降到 48 mL/min/1.73m2，UACR 420 mg/g，腳踝輕度水腫，血鉀 4.9 mmol/L。她目前只使用 amlodipine 與 metformin。'),
    table(
      ['臨床問題', '思考方向'],
      [
        ['這已經是高風險 CKD 嗎？', '是。即使 eGFR 還沒有非常低，顯著 albuminuria 已把病人推向更高腎與心血管風險。'],
        ['第一線該做什麼？', 'RAAS blockade、SGLT2i、限鹽與血壓目標管理應盡快建立，同時追鉀與 creatinine。'],
        ['何時需要更進一步治療？', '若糖尿病蛋白尿 CKD 在標準治療下仍高風險，可評估 finerenone；並同步追貧血、酸中毒與 CKD-MBD。'],
      ],
    ),
    callout(
      'clinical',
      '案例整合',
      p('這類病人往往還沒有尿毒症外觀，因此最容易被拖延。真正高品質的 CKD 管理，是在病人「看起來還沒有很嚴重」時就把保護策略完整建立。'),
    ),
  ),
  references('章內來源註記', renalSources.ch13),
);

renalChapters.ch14 = chapter(
  '電解質異常 (Electrolyte Disorders)',
  section(
    'anatomy-physiology',
    '正常解剖與生理',
    lead('電解質異常的第一個大觀念，是不同電解質問的是不同生理世界。血鈉 (Serum sodium) 主要反映水相對於溶質的比例與張力 (Tonicity)；血鉀 (Potassium) 決定細胞膜電位與致命心律風險；鈣、鎂、磷則牽涉神經肌肉穩定、ATP、骨礦物代謝與腎排泄。若把所有電解質都理解成「身體裡少了或多了某種鹽」，臨床上一定會一直踩雷。'),
    p('腎臟在這裡扮演精細調控器。ADH (Antidiuretic hormone) 決定自由水回收，醛固酮 (Aldosterone) 與遠端鈉鉀交換決定排鉀效率，PTH 與活化維生素 D 影響鈣磷平衡，鎂則常常是最安靜但最關鍵的協作者。很多臨床電解質問題不是單一器官病，而是腎臟、內分泌、藥物與細胞內外轉移共同失衡。'),
    tags(['Tonicity', 'ADH', 'Aldosterone', 'Membrane potential', 'CKD-MBD']),
    diagram('electrolyte-balance'),
    renalViewer('fluid-overload'),
    cards([
      { title: '鈉 (Sodium)', body: '主要是水分平衡與細胞外液張力指標。低鈉常代表相對水過多，高鈉常代表相對水不足。' },
      { title: '鉀 (Potassium)', body: '98% 在細胞內，微小血鉀變化就能改變心肌與骨骼肌興奮性，因此高低血鉀都可致命。' },
      { title: '鈣與鎂 (Calcium and Magnesium)', body: '低鈣會 tetany，低鎂會讓低鉀與低鈣難以矯正；兩者常一起干擾 ECG 與神經肌肉症狀。' },
      { title: '磷 (Phosphate)', body: '和 ATP、骨代謝、腫瘤溶解、再餵食症候群與 CKD 高度相關，不能只把它當成骨科數字。' },
    ]),
  ),
  section(
    'symptoms',
    '常見主訴與症狀',
    lead('電解質異常的症狀常來得模糊卻危險。低鈉可從輕微頭痛、噁心一路走到癲癇與腦水腫；高血鉀可能沒有任何主訴卻先以猝死表現；低鎂與低鈣常表現為抽筋、麻、心悸、tetany；高鈣則可能以便祕、意識改變、多尿脫水或「stones, bones, groans, psychiatric overtones」的變形版本出現。'),
    table(
      ['電解質問題', '常見症狀', '高風險表現', '常見誤解'],
      [
        ['低血鈉', '頭痛、噁心、倦怠、步態不穩', '抽搐、昏迷、急性腦水腫', '只看數字，不分急慢性與症狀'],
        ['高血鉀', '無症狀、虛弱、心悸', 'QRS 變寬、心律不整、心搏停止', 'ECG 正常就以為安全'],
        ['低血鉀', '肌無力、便祕、心悸、多尿', '呼吸肌無力、心律異常、rhhabdo', '補鉀後沒有起色卻忘了低鎂'],
        ['高血鈣', '口渴、多尿、便祕、意識差', '心律異常、嚴重脫水、AKI', '只想到副甲狀腺，不想惡性腫瘤與藥物'],
      ],
    ),
    callout(
      'clinical',
      '真實場景',
      p('70 歲女性因跌倒住院，血鈉 122 mmol/L。家屬說她最近只是比較愛睡、走路不穩，外院曾開 thiazide。這種病人最危險的地方不是「還算清醒」，而是慢性低鈉已經在默默增加跌倒、骨折與住院風險。'),
    ),
  ),
  section(
    'pathophysiology',
    '重要疾病機轉',
    lead('低血鈉最常被誤解。血鈉低不等於總鈉少，真正要問的是血漿張力與水分去哪裡。高張性低血鈉可能來自高血糖；等張性假性低血鈉可來自嚴重高脂血症；低張性低血鈉才需要往 SIADH、心衰、肝硬化、腎衰與低溶質攝取等方向走。'),
    p('鉀異常則要分「總鉀真的變了」還是「鉀在細胞內外移動」。胰島素缺乏、酸中毒、beta-blocker、腫瘤溶解與溶血會讓鉀外移；利尿劑、腹瀉、嘔吐、醛固酮過多與低鎂會造成總鉀流失。鈣、鎂、磷則和 PTH、維生素 D、腸胃吸收、腎排泄、腫瘤與組織崩解高度耦合。'),
    table(
      ['主題', '核心機轉', '常見病因', '治療切入點'],
      [
        ['低鈉', '自由水相對過多', 'SIADH、thiazide、心衰、肝硬化、低溶質攝取', '先分症狀、急慢性與尿滲透壓 / 尿鈉'],
        ['高鈉', '水分流失大於鈉流失或無法喝水', '意識障礙、發燒、尿崩症、滲透利尿', '緩慢補自由水並找失水來源'],
        ['高血鉀', '排鉀不足、藥物、細胞外移', 'CKD、RAASi、MRA、acidosis、tumor lysis', '穩膜、移鉀、排鉀、處理病因'],
        ['低鎂 / 低鈣 / 高磷', '腎排泄、腸胃吸收與內分泌控制失衡', '利尿劑、PPI、胰臟炎、CKD、再餵食、腫瘤溶解', '缺什麼補什麼之外，要找驅動原因'],
      ],
    ),
    misconceptionList([
      { myth: '低血鈉就是缺鹽。', correction: '絕大多數低張性低血鈉真正的問題是水分相對過多，不是單純鹽吃太少。補鹽若不處理水與 ADH 問題，常常沒有效。' },
      { myth: '只要鉀很高就先打樹脂。', correction: '危急高血鉀的第一步是看 ECG、先穩膜並快速把鉀移回細胞內；腸道排鉀藥通常不是最即時的急救工具。' },
    ]),
  ),
  section(
    'diagnosis',
    '診斷思路與鑑別診斷',
    lead('電解質異常診斷最怕一開始方向就錯。低鈉先分張力；高鉀先分危急程度與偽高鉀；低鉀先問是否合併低鎂；高鈣先問 PTH 介導還是非 PTH 介導；高磷與低磷要把腎功能、細胞破壞與營養轉換放在一起看。'),
    table(
      ['問題', '第一步', '第二步', '第三步'],
      [
        ['低血鈉', '量血糖與判斷 tonicity', '看尿滲透壓與尿鈉', '分容量狀態與病因'],
        ['高血鉀', '重抽排除溶血並立刻做 ECG', '找藥物、腎功能與酸鹼', '決定是否需急救與排鉀'],
        ['低血鉀', '看症狀與 ECG', '查 Mg、尿鉀、酸鹼狀態', '分腎流失還是腸胃流失 / 細胞內移'],
        ['高血鈣', '重複確認與校正白蛋白或測 ionized Ca', '查 PTH', '再依 PTH 分方向找惡性腫瘤、維生素 D 或其他病因'],
      ],
    ),
    list([
      '低鈉病人若尿滲透壓很低，代表腎臟還能排水，常要想 polydipsia、低溶質攝取；若尿滲透壓高，代表 ADH 正在作用。',
      '偽高血鉀常來自抽血溶血、血小板過高或白血球極高，不先重抽很容易造成過度治療。',
      '低鉀補不起來時，先回頭看鎂，因為低鎂會讓腎臟持續漏鉀。',
    ]),
  ),
  section(
    'investigations',
    '關鍵檢查與判讀',
    lead('電解質異常的檢查價值高度仰賴順序。用太多檢查不見得更清楚，先做錯一個關鍵分流反而會把後面全部帶偏。'),
    table(
      ['檢查', '用途', '判讀重點'],
      [
        ['Serum osmolality', '確認低鈉是否真的低張', '低張性低血鈉才進入 SIADH / 體液狀態分類'],
        ['Urine osmolality / urine sodium', '判斷腎臟是否在保水與保鈉', '對低鈉分類極關鍵'],
        ['ECG', '高鉀、低鉀、低鎂、低鈣的床邊危險訊號', '電圖異常強化緊急性，但正常不保證安全'],
        ['Mg / Ca / Phosphate', '交叉確認電解質網路', '很多異常不是單發事件，而是一串一起亂'],
        ['尿鉀或 TTKG 觀念', '看鉀流失方向', '臨床上比公式更重要的是把尿鉀放回利尿劑與酸鹼情境'],
        ['PTH / 25-OH vitamin D / 1,25-OH vitamin D', '高鈣或低鈣病因分流', '用在適當情境，不是所有病人都要一口氣全抽'],
      ],
    ),
    spotlight('真正高價值的判讀', '對高鉀病人而言，重複 lab 與 ECG 速度勝過追求複雜公式；對低鈉病人而言，urine osmolality 和 urine sodium 的價值通常高過肉眼猜容量狀態。'),
  ),
  section(
    'treatment',
    '第一線與第二線治療',
    lead('電解質治療的核心是先處理危險，再慢慢修正病因。低鈉最怕矯正過快造成滲透性脫髓鞘症候群 (Osmotic demyelination syndrome, ODS)；高鉀最怕延誤造成致命心律；高鈣最怕脫水與 AKI 惡化；低鎂與低鉀則最怕以為已經補了，其實根本補不回來。'),
    table(
      ['臨床情境', '第一線治療', '常見配合藥物 / 介入', '提醒'],
      [
        ['症狀性重度低鈉', '3% hypertonic saline 小量分次提升血鈉', '必要時 desmopressin clamp 防止過快矯正', '目標是先止神經症狀，不是瞬間拉回正常'],
        ['危急高血鉀', 'Calcium、insulin + dextrose、nebulized beta-agonist', 'loop diuretic、potassium binder、dialysis 視情況', '先穩膜再談排鉀'],
        ['低血鉀', '口服補鉀為主，重者 IV 補鉀', '同時補鎂、停誘因藥物', 'IV 補鉀速度與周邊 / 中央靜脈條件要注意'],
        ['高血鈣', '積極補液與停止致病藥物', 'Calcitonin、IV bisphosphonate、denosumab 視病因', 'CKD 與心衰病人補液需更精細'],
      ],
    ),
    cards([
      { title: '低鈉矯正速率', body: '慢性低鈉矯正過快會造成不可逆神經傷害。高風險病人如酒癮、營養不良、肝病、低鉀者更要保守。' },
      { title: '高鉀處置順序', body: 'Calcium 是穩膜，不降鉀；insulin 與 beta-agonist 是移鉀；利尿、binder 與透析才是真正排鉀。這三層不能混。' },
      { title: '低鎂的重要性', body: '很多看似頑固的低鉀與 QT 問題，真正的根在低鎂。只補鉀不補鎂，常會一直原地打轉。' },
      { title: '高磷與再餵食', body: '低磷不只發生在營養不良，也常在 refeeding、呼吸衰竭恢復、DKA 治療與腫瘤病人中出現。' },
    ], 'comparison-grid'),
  ),
  section(
    'pharmacology',
    '常用藥物機轉、副作用、交互作用',
    lead('電解質藥理常在急重症與慢性門診交會。你需要知道的不只是哪個藥能補或降某個電解質，而是起效速度、作用層次與附帶風險。'),
    table(
      ['藥物', '用途', '主要機轉', '重要注意事項'],
      [
        ['3% saline', '症狀性低鈉', '提高有效血漿張力以減少腦水腫', '需嚴格監測矯正速度'],
        ['Desmopressin', '控制低鈉矯正速度', '固定 ADH 效應避免水利尿暴衝', '不是所有低鈉都要用，但在 high-risk ODS 很有價值'],
        ['Calcium gluconate / chloride', '危急高鉀穩膜、低鈣重症', '穩定心肌膜電位', '不會真正降低血鉀'],
        ['Insulin + dextrose', '高鉀移鉀', '促進鉀進入細胞', '低血糖監測不能省'],
        ['Potassium chloride', '低鉀矯正', '補充總鉀缺口', '若低鎂未處理，效果常不佳'],
        ['Magnesium sulfate', '低鎂、torsades、部分難治低鉀', '補鎂並穩定心電生理', '腎功能差時需注意累積'],
      ],
    ),
    formula('校正血鈉概念', 'Corrected Na rises as glucose falls', '高血糖造成的轉位性低鈉需先看血糖，否則會把真正的水分問題判錯方向。'),
  ),
  section(
    'special-populations',
    '特殊族群考量',
    lead('老年人、癌症病人、肝病與心衰病人，是電解質異常最容易出現「數字和臨床不一致」的族群。老人低鈉常以跌倒與混亂呈現，癌症病人則常合併 SIADH、tumor lysis、高鈣或再餵食；透析與 CKD 病人更要注意補充與排除方式完全不同。'),
    cards([
      { title: '老年人', body: 'thiazide、SSRIs、低溶質飲食與口渴感遲鈍，讓低鈉與高鈉都更常見且更難察覺。' },
      { title: 'CKD / 透析', body: '排鉀、排磷與補鎂策略都要依腎排泄能力重新設計，很多標準劑量在 CKD 會過頭。' },
      { title: '癌症 / 腫瘤溶解', body: '高鉀、高磷、低鈣與 AKI 常一組一起出現，且速度可以非常快。' },
      { title: '肝硬化 / 心衰', body: '低鈉常反映水分失衡與有效動脈血量低，治療必須連回整體體液病理。' },
    ]),
  ),
  section(
    'clinical-pitfalls',
    '常見臨床陷阱',
    lead('電解質錯誤最常見於「看見單一數字就立刻反射動作」，卻沒有先分張力、分危急性或分急慢性。'),
    misconceptionList([
      { myth: '低鈉就是快補到正常。', correction: '低鈉真正危險的是急性腦水腫與慢性過快矯正。治療目標是安全緩解症狀與控制矯正速度，不是幾小時內正常化。' },
      { myth: '樹脂類藥一吃，高血鉀就算處理了。', correction: '若病人有 ECG 變化或重度高鉀，光靠腸道排鉀遠遠不夠。穩膜與移鉀必須先上。' },
      { myth: '低鉀一定是沒補夠。', correction: '若低鎂、持續利尿、醛固酮過多或 ongoing GI loss 沒處理，再多鉀都補不漂亮。' },
    ]),
  ),
  section(
    'case-discussion',
    'Case-based discussion',
    lead('病例：73 歲女性，高血壓與骨質疏鬆，門診用 hydrochlorothiazide、sertraline。近兩週因感冒食慾差、喝大量白開水，出現步態不穩與嗜睡，血鈉 118 mmol/L，serum osmolality 低，urine osmolality 高，urine sodium 45 mmol/L。'),
    table(
      ['臨床問題', '思考方向'],
      [
        ['這是缺鹽嗎？', '不是。更像 thiazide 與 SIADH-like 生理加上低溶質攝取造成的低張性低血鈉。'],
        ['先補生理食鹽水就好嗎？', '若有神經症狀，需依症狀性低鈉邏輯處理，且要警覺補液後突然水利尿導致過快矯正。'],
        ['出院後要做什麼？', '停誘因藥物、重新教育飲水與飲食、安排短期重抽，避免反覆跌倒與再入院。'],
      ],
    ),
    callout(
      'clinical',
      '案例整合',
      p('這類病人最危險的地方不是數字低本身，而是如果只看到「低鈉」就大量亂補，可能在 24 小時內從跌倒風險變成 ODS 風險。'),
    ),
  ),
  references('章內來源註記', renalSources.ch14),
);

renalChapters.ch15 = chapter(
  '酸鹼失衡 (Acid-Base Disorders)',
  section(
    'anatomy-physiology',
    '正常解剖與生理',
    lead('酸鹼平衡不是單一器官工作，而是緩衝系統 (Buffers)、肺部通氣 (Ventilation) 與腎臟酸排泄 (Renal acid handling) 的三方合作。血液中的 bicarbonate / carbon dioxide 緩衝對、血紅素、蛋白質與骨骼共同構成第一層防線；肺部在數分鐘內調整 CO2；腎臟則在數小時到數天內透過重吸收 bicarbonate、排出氫離子與生成新 bicarbonate 做長期校正。'),
    p('因此，酸鹼數值從來不是獨立存在的 lab，而是整個病人生理狀態的濃縮摘要。你看到的 pH，是通氣、組織灌流、腎功能、腸胃流失、藥物、毒物與代謝狀態的總和。只要把 ABG 當成一張靜態報告看，就會錯過它真正的臨床價值。'),
    tags(['Henderson-Hasselbalch', 'Anion gap', 'Compensation', 'Respiratory vs metabolic', 'Mixed disorder']),
    diagram('acid-base-roadmap'),
    formula('Henderson-Hasselbalch', 'pH = 6.1 + log(HCO3- / (0.03 x PaCO2))', '臨床上最重要的不是背常數，而是知道 pH 同時被代謝面 HCO3- 與呼吸面 PaCO2 拉扯。'),
    summary('酸鹼判讀一句話', '酸鹼失衡的第一步不是找病名，而是先固定流程：看 pH、判主要失衡、算代償、看 anion gap、再找混合性問題。', [
      '代償不會把 pH 完全矯正回正常。',
      '異常越明顯，越要警覺混合性失衡。',
      'ABG / VBG 永遠要連回病人外觀與時間軸。',
    ]),
  ),
  section(
    'symptoms',
    '常見主訴與症狀',
    lead('酸鹼失衡的症狀常常來自原始疾病，也來自酸鹼本身。代謝性酸中毒病人可出現深快呼吸 (Kussmaul breathing)、噁心、虛弱、意識改變；代謝性鹼中毒則常伴抽筋、低鉀、低氯與利尿或嘔吐病史；呼吸性酸中毒常表現為嗜睡、頭痛、精神遲鈍；呼吸性鹼中毒則可能以焦慮、麻、手足抽搐與胸悶登場。'),
    table(
      ['酸鹼型態', '常見主訴', '高風險表現', '常見病因場景'],
      [
        ['高 AG 代謝性酸中毒', '喘、噁心、腹痛、疲倦', '低血壓、意識差、乳酸上升、休克', '敗血症、DKA、腎衰、毒物'],
        ['正常 AG 代謝性酸中毒', '腹瀉、疲倦、呼吸快', '嚴重 bicarbonate 下降與循環不穩', 'GI bicarbonate loss、RTA、大量 saline'],
        ['代謝性鹼中毒', '噁心、抽筋、心悸、乏力', '嚴重低鉀、QT 變化、心律不整', '嘔吐、胃管抽吸、利尿劑、hyperaldosteronism'],
        ['呼吸性酸中毒 / 鹼中毒', '嗜睡或焦慮、胸悶、呼吸異常', '呼吸衰竭、腦病、癲癇', 'COPD、鎮靜、疼痛、焦慮、敗血症、機械通氣設定'],
      ],
    ),
  ),
  section(
    'pathophysiology',
    '重要疾病機轉',
    lead('代謝性酸中毒可先分高陰離子間隙 (High anion gap) 與正常陰離子間隙 (Normal anion gap)。高 AG 表示有額外未測陰離子進場，常見是乳酸、酮酸、尿毒素或毒物；正常 AG 則多是 bicarbonate 流失或腎小管酸排出障礙，常伴高氯。'),
    p('代謝性鹼中毒則常依尿氯分成 chloride-responsive 與 chloride-resistant，實戰上非常好用。呼吸性失衡則要先分急性或慢性，因為腎代償需要時間，急性 PaCO2 改變與慢性 CO2 retention 的 bicarbonate 反應不能混成一談。最重要的是，住院病人混合性失衡非常常見，例如敗血症合併嘔吐、COPD 合併利尿與高乳酸、DKA 治療後疊加高氯性酸中毒。'),
    table(
      ['型態', '機轉', '典型病因', '提醒'],
      [
        ['高 AG 代謝性酸中毒', '有機酸或毒物累積', 'Lactic acidosis、DKA、uremia、ethylene glycol、salicylate', '記得 albumin 校正與 delta gap'],
        ['正常 AG 代謝性酸中毒', 'HCO3 流失或酸排出差', '腹瀉、RTA、大量 saline', '高氯很常是線索'],
        ['代謝性鹼中毒', '胃酸流失、利尿、礦物皮質素作用過強', '嘔吐、NG suction、loop / thiazide、hyperaldosteronism', '看 urine chloride 很有用'],
        ['呼吸性失衡', '通氣過少或過多', 'COPD、鎮靜、疼痛、焦慮、敗血症、肝病', '急慢性代償規則不同'],
      ],
    ),
    misconceptionList([
      { myth: 'pH 正常就代表沒有酸鹼失衡。', correction: '混合性失衡可讓 pH 看起來接近正常，但 PaCO2、HCO3- 與臨床情境已經在大聲喊出問題。' },
      { myth: '只要看到 bicarbonate 低就直接補 bicarbonate。', correction: 'Bicarbonate 低只是結果。若真正問題是乳酸堆積、DKA、腹瀉或腎衰，治療重點各不相同，補鹼並非永遠第一步。' },
    ]),
  ),
  section(
    'diagnosis',
    '診斷思路與鑑別診斷',
    lead('酸鹼失衡最實用的判讀方法，是每次都走同一條路。先問 acidemia 還是 alkalemia；再問主要是呼吸還是代謝；接著計算預期代償；最後看 anion gap、delta gap 或尿氯等輔助分流。這條路一旦固定，ABG 會從抽象變成高解析度的臨床工具。'),
    table(
      ['步驟', '要做什麼', '常用工具', '常見錯誤'],
      [
        ['1', '先看 pH', 'ABG / VBG', '一開始就跳去背 mnemonic'],
        ['2', '判主要失衡是 PaCO2 還是 HCO3-', 'ABG + BMP', '把代償當成主病因'],
        ['3', '算 expected compensation', 'Winter formula、急慢性呼吸代償規則', '沒有算就以為單純失衡'],
        ['4', '看 gap 與混合性', 'anion gap、delta gap、urine chloride', '忽略 albumin、毒物與合併利尿'],
      ],
    ),
    list([
      'Winter formula：預測代謝性酸中毒的呼吸代償，若實測 PaCO2 高於預期，要想合併呼吸性酸中毒；低於預期，要想合併呼吸性鹼中毒。',
      '代謝性鹼中毒用尿氯比單純容量狀態更實用：低尿氯多見嘔吐 / 容量縮減，高尿氯要想利尿、礦物皮質素過強或 Bartter / Gitelman 類病理。',
      'Salicylate poisoning 經典可同時造成呼吸性鹼中毒與高 AG 代謝性酸中毒，是非常好的混合性思維範例。',
    ]),
  ),
  section(
    'investigations',
    '關鍵檢查與判讀',
    lead('酸鹼檢查最忌諱只看 ABG 本身。你幾乎永遠需要搭配電解質、血糖、乳酸、腎功能、尿酮體、滲透壓差、毒物線索與病人呼吸狀態一起看。'),
    table(
      ['檢查', '用途', '判讀重點'],
      [
        ['ABG / VBG', 'pH、PaCO2、HCO3 與氧合概念', 'VBG 對 pH / bicarbonate 常足夠，但氧合判讀仍以 ABG 為主'],
        ['BMP / CMP', 'anion gap、Na、Cl、K、creatinine', 'anion gap 的臨床價值來自和電解質一起解讀'],
        ['Lactate / ketone', '高 AG 來源分流', '敗血症、低灌流、DKA 與酒精性酮酸中毒都常見'],
        ['Urine chloride / urine anion gap', '代謝性鹼中毒與部分正常 AG 酸中毒分流', '不是每位病人都要做，但做對情境很有價值'],
        ['Osmolar gap / toxicology', '懷疑 toxic alcohol 或 salicylate', '臨床場景與 gap 變化要一起看'],
      ],
    ),
    formula('Winter formula', 'Expected PaCO2 = 1.5 x HCO3- + 8 +/- 2', '代謝性酸中毒時若病人沒有達到預期過度換氣，代表有呼吸成分一起出錯。'),
    formula('Anion gap', 'AG = Na - (Cl + HCO3-)', '高 AG 不是答案，而是提示你有額外未測陰離子。請記得低 albumin 會讓 AG 看起來被低估。'),
  ),
  section(
    'treatment',
    '第一線與第二線治療',
    lead('酸鹼治療的第一原則是處理病因並保護病人生理。嚴重乳酸性酸中毒要處理灌流與感染；DKA 要胰島素、液體與鉀；嚴重代謝性鹼中毒要回到 chloride、volume 與鉀；呼吸性酸中毒要解決通氣不足而不是只盯著 bicarbonate。'),
    table(
      ['情境', '第一線治療', '常見配合藥物 / 介入', '提醒'],
      [
        ['DKA / ketoacidosis', '液體、胰島素、鉀與病因處理', 'dextrose、electrolyte replacement', 'bicarbonate 只在特殊極端情況考慮'],
        ['Lactic acidosis', '恢復灌流與病因控制', '抗生素、升壓、氧合支持、透析視情況', '單補 bicarbonate 不會治好休克'],
        ['代謝性鹼中毒', '補 chloride、補鉀、調整利尿或止吐', '生理食鹽水、potassium chloride、acetazolamide 視情況', '先分 chloride responsive 與 resistant'],
        ['呼吸性酸中毒', '改善通氣', 'NIV、插管、調整鎮靜、處理 COPD / 氣喘 / 神經肌肉問題', '不要用補鹼代替通氣支持'],
      ],
    ),
    cards([
      { title: 'Bicarbonate 的位置', body: '在重度代謝性酸中毒合併血流動力學不穩、hyperkalemia 或 CKD 時可能有角色，但它是工具，不是所有酸中毒的主治療。' },
      { title: 'Acetazolamide', body: '對利尿後鹼中毒、鬱血合併鹼中毒或需要促進 bicarbonate 排出情境很有價值，但腎功能與低鉀風險需顧。' },
      { title: '通氣支持', body: '呼吸性酸中毒常靠 NIV 或機械通氣真正扭轉；若只在平面上看 ABG 而不看病人的呼吸肌疲乏，很容易延誤。' },
      { title: '透析', body: '在尿毒性酸中毒、毒物、難治高鉀或體液失控場景，RRT 同時是酸鹼與電解質支持工具。' },
    ], 'comparison-grid'),
  ),
  section(
    'pharmacology',
    '常用藥物機轉、副作用、交互作用',
    lead('酸鹼藥理真正重要的不是藥名，而是它改變哪一個生理分母。'),
    table(
      ['藥物', '臨床用途', '機轉', '注意事項'],
      [
        ['Sodium bicarbonate', '特定重度代謝性酸中毒、尿液鹼化、部分高鉀', '增加血中 bicarbonate buffer', '鈉負荷、CO2 生成與容量問題要注意'],
        ['Acetazolamide', '代謝性鹼中毒、部分鬱血', '抑制近端碳酸酐酶，促進 bicarbonate 排出', '低鉀、代謝性酸中毒、腎功能差時要謹慎'],
        ['Potassium chloride', '低鉀與 chloride-responsive metabolic alkalosis', '補充 K 與 Cl 雙重缺口', '周邊輸注濃度與速度有限制'],
        ['Ammonium chloride / hydrochloric acid', '極少數難治重度鹼中毒', '直接提供酸負荷', '高風險且少見，需高度監測'],
      ],
    ),
  ),
  section(
    'special-populations',
    '特殊族群考量',
    lead('慢性 CO2 retention 的 COPD 病人、有機械通氣的 ICU 病人、肝病與敗血症病人，以及 CKD / 透析病人，是酸鹼判讀最容易被「套公式但沒連回病人」的族群。'),
    cards([
      { title: 'COPD / 慢性高碳酸', body: '慢性代償會讓 bicarbonate 長期偏高，急性惡化時必須和病人的基線比，不是和健康人的正常值比。' },
      { title: 'ICU / 呼吸機', body: '機器參數本身會造出呼吸性失衡，因此 ABG 必須和 mode、Vt、RR、PEEP 一起看。' },
      { title: 'CKD', body: '尿毒性酸中毒常是慢性與急性加速疊加，bicarbonate 治療與透析時機需要連回整體症狀與鉀值。' },
      { title: '毒物與混合性失衡', body: 'salicylate、toxic alcohol 與敗血症病人很常同時跨越多條酸鹼路徑，不能只套一個公式就收工。' },
    ]),
  ),
  section(
    'clinical-pitfalls',
    '常見臨床陷阱',
    lead('酸鹼最常見的錯誤，是會算但不會臨床化。'),
    misconceptionList([
      { myth: 'ABG 算完 pH 正常就沒事。', correction: '混合性失衡可把 pH 拉回看似正常，真正的危險仍在 PaCO2、HCO3、gap 與病人外觀裡。' },
      { myth: '代謝性鹼中毒都只要補生理食鹽水。', correction: '高尿氯、醛固酮過強或持續利尿病人，單補 saline 可能根本不會解。' },
      { myth: '高 AG 代謝性酸中毒都差不多。', correction: 'DKA、lactic acidosis、uremia、毒物的治療與急迫性完全不同。看到高 AG 只是開始，不是結論。' },
    ]),
  ),
  section(
    'case-discussion',
    'Case-based discussion',
    lead('病例：67 歲男性 COPD 合併心衰竭，因呼吸困難住院。ABG：pH 7.36、PaCO2 62 mmHg、HCO3 34 mmol/L。BMP 顯示 K 3.1 mmol/L，最近因鬱血連續使用 high-dose furosemide。醫療團隊一開始看到 pH 幾乎正常，打算只觀察。'),
    table(
      ['臨床問題', '思考方向'],
      [
        ['pH 正常代表沒有酸鹼問題嗎？', '不是。這位病人至少有慢性呼吸性酸中毒代償，外加利尿造成的代謝性鹼中毒，兩者互相抵銷 pH。'],
        ['為何重要？', '代謝性鹼中毒會抑制通氣、低鉀增加心律風險，也可能讓 COPD 更難脫離高碳酸狀態。'],
        ['處理方向？', '改善鬱血同時補鉀與 chloride，必要時評估 acetazolamide，並把通氣與整體 volume status 一起看。'],
      ],
    ),
    callout(
      'clinical',
      '案例整合',
      p('這是最典型的「pH 幾乎正常但其實不正常」案例。真正成熟的 acid-base 思維，不是看 pH 安心，而是能在正常 pH 下面看見正在互相掩蓋的兩個問題。'),
    ),
  ),
  references('章內來源註記', renalSources.ch15),
);

renalChapters.ch16 = chapter(
  '利尿劑與腎臟藥理 (Diuretics and Renal Pharmacology)',
  section(
    'anatomy-physiology',
    '正常解剖與生理',
    lead('利尿劑要先從腎小管段落的工作分配理解。近端小管負責大宗回收，亨利氏環粗上行支 (Thick ascending limb) 建立髓質高滲梯度，遠曲小管 (Distal convoluted tubule) 精細調鈉，集尿管 (Collecting duct) 則在醛固酮與 ENaC 作用下完成最後微調。不同利尿劑之所以臨床角色不同，正是因為它們切入的是不同的鈉水節點。'),
    p('真正的臨床重點不只是哪個藥「最強」，而是病人的鬱血驅動、腎灌流、腸胃吸收、腎功能、蛋白結合與遠端代償狀態如何改變藥效。例如 loop 利尿劑效力最強，但若口服吸收差、腎灌流差或遠端代償已被啟動，病人依然可能利不出來。'),
    tags(['Loop diuretic', 'Thiazide-like', 'MRA', 'Sequential nephron blockade', 'Diuretic resistance']),
    renalViewer('renal-anatomy'),
    diagram('diuretic-nephron'),
    cards([
      { title: 'Loop 利尿劑', body: '作用在粗上行支的 NKCC2，是處理鬱血、肺水腫與腎功能下降病人最常用的第一線工具。' },
      { title: 'Thiazide / Thiazide-like', body: '作用在遠曲小管 NCC，對高血壓、慢性輕中度體液控制與 sequential blockade 都有地位。' },
      { title: 'MRA 與 ENaC blocker', body: '作用在集尿管，對醛固酮驅動疾病、抗藥性高血壓與某些心衰情境很重要。' },
      { title: 'Acetazolamide / Osmotic', body: '雖非所有人都常用，但在代謝性鹼中毒、部分鬱血、青光眼、高山症與顱壓等場景有清楚位置。' },
    ]),
  ),
  section(
    'symptoms',
    '常見主訴與症狀',
    lead('利尿劑章節的症狀，不是藥物本身的症狀，而是病人為什麼需要利尿、以及利尿是否做對。常見主訴包括呼吸喘、端坐呼吸、下肢水腫、腹脹、體重快速上升、尿量改變、頭暈、抽筋、口乾與心悸。'),
    table(
      ['臨床情境', '病人會怎麼說', '你真正要問的', '潛在藥理意義'],
      [
        ['鬱血未解除', '我尿很多但還是喘', '體重有降嗎？頸靜脈壓？尿鈉？胸部症狀？', '可能是利尿不夠、分布不對或驅動太強'],
        ['過度利尿', '站起來會暈、嘴乾、腎功能變差', '血壓、尿量、體重、creatinine、BUN', '代表灌流與體液平衡開始失調'],
        ['電解質副作用', '抽筋、心悸、無力', 'K、Mg、Na、Ca 是否偏移', '常見於 loop / thiazide 過程中未同步監測'],
        ['利尿阻抗', '越吃越沒感覺', '藥物有沒有吸收？有沒有 NSAID？有沒有遠端代償或腎灌流差？', '要思考更換途徑、加藥或重評病因'],
      ],
    ),
  ),
  section(
    'pathophysiology',
    '重要疾病機轉',
    lead('利尿劑不是把水硬擠出去，而是透過改變腎小管鈉回收，讓鈉和水一起離開體內。病人之所以會出現利尿阻抗 (Diuretic resistance)，往往不是因為藥「失效」，而是因為腎臟啟動了補償機制，例如遠端代償性回收增加、RAAS / SNS 活化、腸胃吸收不穩、腎灌流不足、NSAID 干擾或白蛋白低導致藥物分布改變。'),
    p('臨床上最重要的概念之一是 sequential nephron blockade。當 loop 利尿劑讓大量鈉送到遠端時，遠曲小管會學著把它收回來；此時加上 thiazide-like 利尿劑，就是在把遠端代償關掉。這種組合很有效，但也把低鈉、低鉀、低鎂與 AKI 風險一起拉高。'),
    table(
      ['主題', '發生了什麼', '常見線索', '治療切入點'],
      [
        ['Loop braking phenomenon', '持續 loop 後遠端回收增加', '尿量先好後差、尿鈉下降', '加 thiazide-like 或調整劑型 / 途徑'],
        ['腎灌流差', '藥物到不了作用位點', '低血壓、腎功能惡化、末梢灌流差', '先處理 hemodynamics，不要只加藥'],
        ['NSAID 干擾', '前列腺素被抑制，腎血流與利尿反應下降', '病人說只是吃止痛藥', '停用 NSAID 是高價值動作'],
        ['低白蛋白 / 腸胃水腫', '口服吸收與藥物運送受影響', '腸胃道水腫、肝病、腎病症候群', '改 IV 或重設整體策略'],
      ],
    ),
    misconceptionList([
      { myth: '利尿沒效就直接把劑量無限加大。', correction: '利尿失敗常來自藥到不了位點、遠端代償、NSAID、腎灌流差或病因未處理。一直加量只會增加毒性。' },
      { myth: '尿量多就代表去鬱血成功。', correction: '真正目標是體液從錯誤區室被安全移出，需看體重、症狀、JVP、尿鈉與腎功能，而不是只看尿袋。' },
    ]),
  ),
  section(
    'diagnosis',
    '診斷思路與鑑別診斷',
    lead('利尿劑使用的診斷思維，是確認病人是不是鬱血、鬱血在哪裡、利尿反應夠不夠，以及目前遇到的是利尿阻抗、過度利尿還是其實根本不是體液問題。'),
    table(
      ['步驟', '要點', '實務工具', '常見錯誤'],
      [
        ['確認適應症', '肺鬱血、周邊水腫、腹水、高血壓還是代謝性鹼中毒', '病史、理學、影像、BNP 視情況', '看到 edema 就一律 loop'],
        ['評估反應', '體重、尿量、尿鈉、症狀是否改善', '日體重、I/O、spot urine sodium', '只看尿量忽略症狀與 hemodynamics'],
        ['分辨阻抗來源', '藥不到位、病因太強、遠端代償或腎灌流差', '用藥盤點、血壓、腎功能、NSAID、口服吸收', '盲目加上多種利尿而不監測'],
        ['排除非體液原因', '喘或水腫是否其實來自肺、肝、靜脈、淋巴或藥物', '完整鑑別診斷', '把所有腳腫都當腎臟問題'],
      ],
    ),
  ),
  section(
    'investigations',
    '關鍵檢查與判讀',
    lead('利尿管理需要連續監測。一次性的「腎功能沒事」或「尿量很多」無法保證方向正確。'),
    table(
      ['檢查 / 監測', '用途', '判讀重點'],
      [
        ['每日體重', '最直接的淨體液趨勢', '比單看尿量更能反映真正去鬱血'],
        ['尿量與 spot urine sodium', '看當前 natriuretic response', '尿鈉低代表鈉沒有真的出去太多'],
        ['BMP / Mg', '監測低鉀、低鈉、低鎂與 creatinine', '多種利尿併用時尤其重要'],
        ['血壓與姿位變化', '判斷是否過度去容量', '症狀與數字都要看'],
        ['JVP / edema / 肺部評估', '判斷 congestion 是否仍在', '有些病人體重降了但仍鬱血，也有人尿很多卻未真正去鬱血'],
      ],
    ),
    spotlight('容易被低估的工具', 'Spot urine sodium 在利尿初期對判斷 natriuretic response 很實用。病人尿量多但尿鈉低，代表出去的可能多是水，不一定是真正有效去鬱血。'),
  ),
  section(
    'treatment',
    '第一線與第二線治療',
    lead('利尿治療要依病人場景選藥，而不是依藥物強弱排行榜選藥。肺水腫與明顯鬱血常以 loop 為骨幹；高血壓與慢性體液控制常用 thiazide-like；原發性醛固酮增多與部分心衰則偏向 MRA；代謝性鹼中毒、特殊高眼壓或顱壓情境可考慮 acetazolamide。'),
    table(
      ['情境', '第一線策略', '常見併用', '注意事項'],
      [
        ['急性鬱血 / 肺水腫', 'IV loop diuretic', '必要時連續輸注或加 thiazide-like', '目標是去鬱血與改善呼吸，不是單追尿量'],
        ['抗藥性高血壓', 'Thiazide-like 或 MRA 視病理', 'ACEi / ARB、DHP CCB', 'MRA 前要先評估高血鉀風險'],
        ['肝硬化腹水', 'Spironolactone 為核心，常加 loop', '限鹽、腹水抽取視情況', '鈉與腎功能追蹤非常重要'],
        ['代謝性鹼中毒合併鬱血', 'Acetazolamide 可作為補位', 'Loop 調整與鉀補充', '腎功能與低鉀風險需密切監測'],
      ],
    ),
    cards([
      { title: 'Loop 利尿劑選擇', body: 'Furosemide、bumetanide、torsemide 各有吸收與 potency 差異。腸胃水腫或吸收不穩時，IV 給藥常明顯優於口服。' },
      { title: 'Sequential Blockade', body: 'Loop + thiazide-like 能在阻抗時重啟 natriuresis，但必須搭配密集 lab 與體液監測。' },
      { title: 'MRA 價值', body: 'Spironolactone 與 eplerenone 不只利尿，也能切斷醛固酮相關纖維化與保鈉訊號，在心衰與高醛固酮狀態特別重要。' },
      { title: '不是每個 edema 都要利尿', body: '靜脈功能不全、淋巴水腫、藥物性水腫與低白蛋白問題，有時利尿效果有限甚至有害。' },
    ], 'comparison-grid'),
  ),
  section(
    'pharmacology',
    '常用藥物機轉、副作用、交互作用',
    lead('利尿劑藥理之所以重要，是因為它們的副作用幾乎就是它們主機轉的延伸。你若知道藥在腎元哪一段動手，就大致知道電解質會往哪裡偏。'),
    table(
      ['類別', '代表藥物', '作用部位 / 機轉', '副作用 / 交互作用'],
      [
        ['Loop diuretic', 'Furosemide, Bumetanide, Torsemide', '抑制 TAL 的 NKCC2', '低鉀、低鎂、低鈣、耳毒性；NSAID 會削弱效果'],
        ['Thiazide / Thiazide-like', 'Hydrochlorothiazide, Chlorthalidone, Indapamide, Metolazone', '抑制 DCT 的 NCC', '低鈉、低鉀、高尿酸、高血糖；可作 sequential blockade'],
        ['MRA', 'Spironolactone, Eplerenone', '阻斷醛固酮受體', '高血鉀、腎功能變化；spironolactone 可致男性女乳症'],
        ['ENaC blocker', 'Amiloride, Triamterene', '抑制集合管 ENaC', '高血鉀；在 Liddle syndrome 或 lithium-induced nephrogenic DI 有特殊位置'],
        ['Carbonic anhydrase inhibitor', 'Acetazolamide', '抑制近端 bicarbonate 回收', '代謝性酸中毒、低鉀、腎結石風險'],
        ['Osmotic diuretic', 'Mannitol', '提高小管液滲透壓', '體液轉移、肺水腫風險；並非一般鬱血常規藥'],
      ],
    ),
    formula('Sequential nephron blockade', 'Loop + Thiazide-like -> distal compensation shutoff', '這不是正式化學式，而是臨床最重要的利尿組合概念：你在不同腎小管段連續切斷鈉回收。'),
  ),
  section(
    'special-populations',
    '特殊族群考量',
    lead('利尿劑在心衰、肝硬化、腎病症候群、CKD、老年與 ICU 病人中的表現差異很大。相同劑量在不同病人身上，可能是剛好、完全無效或直接過度。'),
    cards([
      { title: '老年人', body: '低鈉、跌倒、姿位性低血壓與腎前性 AKI 風險高，劑量與監測需要更保守。' },
      { title: 'CKD', body: 'loop 常仍有效，但門檻較高；thiazide-like 在某些晚期 CKD 仍可作為 add-on，而不是一概失效。' },
      { title: '肝硬化', body: 'spironolactone 常是腹水核心，但鈉、腎功能與 encephalopathy 風險要同步顧。' },
      { title: 'ICU / 急性鬱血', body: 'IV 給藥、連續輸注、尿鈉導向策略與 hemodynamic 監測常比傳統門診劑量思維更重要。' },
    ]),
  ),
  section(
    'clinical-pitfalls',
    '常見臨床陷阱',
    lead('利尿錯誤多半不是藥不夠新，而是監測不夠真實。'),
    misconceptionList([
      { myth: '腎功能一升就一定要停利尿。', correction: '若病人仍明顯鬱血，過早停利尿可能讓腎靜脈壓持續高、整體灌流更差。要判斷的是 congestion 與 perfusion 的平衡。' },
      { myth: 'Thiazide 在腎功能差時完全沒用。', correction: '傳統口訣太粗糙。Thiazide-like 利尿劑在某些 CKD 與 sequential blockade 情境仍有實戰價值。' },
      { myth: '病人說有吃藥就代表藥一定進到位。', correction: '腸胃水腫、服藥時間、吸收差與非處方 NSAID，都能讓你以為藥失效，其實是藥根本沒有效到位。' },
    ]),
  ),
  section(
    'case-discussion',
    'Case-based discussion',
    lead('病例：72 歲男性 HFrEF 病人，體重三天增加 3 公斤，端坐呼吸、下肢水腫。口服 furosemide 40 mg bid 已使用多年，這次住院給 IV furosemide 後尿量增加，但隔天仍喘，spot urine sodium 偏低，creatinine 從 1.5 升到 1.8 mg/dL。'),
    table(
      ['臨床問題', '思考方向'],
      [
        ['要因 creatinine 上升就退縮嗎？', '不一定。病人仍明顯鬱血，真正問題可能是 natriuretic response 不足而不是腎已經不能碰。'],
        ['下一步怎麼做？', '重新看給藥途徑與劑量、檢查 NSAID / 吸收問題、考慮 sequential blockade，例如加 metolazone 或 thiazide-like。'],
        ['如何知道方向對不對？', '持續追體重、症狀、尿鈉、血壓、腎功能與電解質，而不是只看一個 creatinine。'],
      ],
    ),
    callout(
      'clinical',
      '案例整合',
      p('這類病人把利尿藥理、體液病理與心腎交互作用全部放在同一張桌上。真正成熟的利尿思維，不是把藥越加越多，而是知道何時該換路徑、何時該加另一段、何時該承認主因不是鈉水。'),
    ),
  ),
  references('章內來源註記', renalSources.ch16),
);
