import type { ChapterContent } from '../../types.js';
import {
  cards,
  callout,
  chapter,
  diagram,
  digestiveViewer,
  formula,
  h3,
  lead,
  list,
  misconceptionList,
  p,
  section,
  spotlight,
  summary,
  table,
  tags,
  takeawayList,
} from './shared.js';

export const digestiveChapters: Record<string, ChapterContent> = {};

digestiveChapters.ch17 = chapter(
  '胃食道逆流與消化性潰瘍 (GERD & PUD)',
  section(
    'anatomy-physiology',
    '正常解剖與生理',
    lead('胃食道逆流疾病 (Gastroesophageal Reflux Disease, GERD) 與消化性潰瘍 (Peptic Ulcer Disease, PUD) 常被病人一起描述成「胃酸太多」，但真正的生理問題其實分屬不同層次。GERD 的核心在食道下端與下食道括約肌 (Lower Esophageal Sphincter, LES) 對逆流暴露的控制失衡；PUD 的核心則在胃或十二指腸黏膜防禦與酸-pepsin 攻擊之間的平衡被打破。'),
    p('正常情況下，LES、橫膈腳、胃食道交界角度、食道蠕動清除與唾液中的 bicarbonate 共同減少酸暴露。胃黏膜則依賴黏液-碳酸氫鹽層、黏膜血流、上皮修復與 prostaglandin 維持防禦。當 transient LES relaxation 次數增加、裂孔疝氣 (Hiatal hernia) 改變解剖、腹壓上升、胃排空延遲或夜間平躺暴露變長時，GERD 的症狀就容易出現；當 H. pylori、NSAID 或嚴重生理壓力破壞黏膜保護時，潰瘍便更容易形成。'),
    tags(['Lower esophageal sphincter', 'Gastric acid', 'Mucosal defense', 'H. pylori', 'NSAID injury']),
    digestiveViewer('gerd-reflux'),
    diagram('digestive-barrier-map'),
    cards([
      { title: '食道 (Esophagus)', body: '本身不耐長時間酸暴露。若蠕動清除差、LES 鬆弛頻繁或夜間平躺，少量逆流也可能引起明顯症狀。' },
      { title: '胃 (Stomach)', body: '胃酸與 pepsin 是正常消化工具，不是天然敵人。問題出在酸暴露時間、黏膜防禦與局部發炎是否失衡。' },
      { title: '十二指腸球部 (Duodenal bulb)', body: '最常見於 H. pylori 與酸負荷增加後出現潰瘍。球部位置特殊，讓酸暴露與黏膜保護常在此形成失衡。' },
      { title: '黏膜保護系統 (Mucosal defense)', body: '黏液、bicarbonate、上皮緊密連結、黏膜血流與 prostaglandin 共同維持屏障；NSAID 會從 prostaglandin 這一端直接破壞防禦。' },
    ]),
    formula('胃酸分泌機轉', 'Parietal cell: H+/K+-ATPase -> H+ into lumen', '質子幫浦 (Proton pump) 是 PPI 的直接藥理靶點。臨床上 PPI 之所以有效，不是因為它把整個胃停掉，而是因為它在最末端步驟顯著降低酸輸出。'),
    summary('生理重點', 'GERD 問的是食道暴露控制，PUD 問的是黏膜防禦失衡；兩者都牽涉酸，但不是同一個疾病。', [
      'LES 與食道清除是 GERD 核心。',
      '黏膜血流與 prostaglandin 是 PUD 保護基底。',
      'H. pylori 與 NSAID 是潰瘍高頻病因。',
    ]),
  ),
  section(
    'symptoms',
    '常見主訴與症狀',
    lead('GERD 典型主訴是火燒心 (Heartburn)、酸水逆流 (Regurgitation)、平躺或餐後更明顯的胸口灼熱感。PUD 則常以心窩痛 (Epigastric pain)、脹痛、噁心、吃東西後不舒服或夜間痛醒表現。真正臨床上最重要的，不是病人有沒有用到這些教科書名詞，而是症狀跟進食、姿勢、夜間、NSAID 暴露、黑便與體重變化的時間關係。'),
    p('GERD 也可能以非典型方式出現，例如慢性咳嗽、聲音沙啞、喉球感、牙蝕或反覆胸悶。PUD 有時則不是痛，而是以缺鐵性貧血、黑便、吐血、低血壓、暈眩或穿孔後急性腹膜炎登場。這也是為什麼「胃藥吃了有比較舒服」這種線索雖然有用，卻不能直接把病人鎖進 GERD/PUD。'),
    table(
      ['臨床情境', '常見主訴', '臨床意義', '常見誤判'],
      [
        ['典型 GERD', '胸口灼熱、酸水上來、飯後或平躺加劇', '最符合 acid reflux syndrome', '單純胃炎或心情緊張'],
        ['食道外 GERD', '慢咳、聲音沙啞、晨間喉嚨不適', '需先排呼吸道、鼻後滴流與其他耳鼻喉問題', '所有慢咳都算逆流'],
        ['十二指腸潰瘍', '空腹心窩痛、夜間痛、進食暫時緩解', '常見於 H. pylori 相關酸負荷失衡', '單純功能性消化不良'],
        ['出血性潰瘍', '黑便、咖啡色嘔吐物、頭暈虛弱', '需要把病人拉進上消化道出血流程', '痔瘡出血或鐵劑染黑大便'],
      ],
    ),
    callout(
      'clinical',
      '真實場景',
      p('46 歲女性上班族，近半年常在晚餐後與半夜出現胸口灼熱，自己買綜合制酸劑暫時壓下來。最近她開始覺得吞固體時會卡、體重也掉了 4 公斤。這個故事一開始很像單純 GERD，但吞嚥困難與體重下降已經是 alarm features，不應繼續用經驗性胃藥拖延。'),
    ),
    takeawayList([
      { title: '症狀部位會騙人', body: '胸口與心窩靠得近，GERD、PUD、膽道疾病、胰臟炎、ACS 都可能以「胃不舒服」登場。' },
      { title: '紅旗要先抓', body: '吞嚥困難、體重下降、貧血、黑便、吐血、持續嘔吐、年長新發症狀都會改變分流策略。' },
      { title: '夜間與姿勢很有價值', body: '平躺加劇、餐後惡化或半夜灼熱常支持 GERD，但仍要放回整體風險。' },
    ]),
  ),
  section(
    'pathophysiology',
    '重要疾病機轉',
    lead('GERD 的關鍵不是單純「酸太多」，而是酸性內容物暴露時間延長。最常見機轉包括 transient LES relaxation、裂孔疝氣、腹壓上升、肥胖、胃排空延遲與食道清除下降。某些病人胃酸量其實不特別高，但只要食道暴露時間夠長，症狀仍可非常明顯。'),
    p('PUD 則是黏膜屏障被攻擊力量打穿。H. pylori 會透過尿素酶、黏附與慢性發炎改寫胃酸分泌與黏膜保護；NSAID 會抑制 COX，讓 prostaglandin 降低，導致黏液、bicarbonate 與黏膜血流一起受損。重症病人還可能出現 stress-related mucosal disease。這些病人表面都叫潰瘍，但背後生理完全不同。'),
    diagram('digestive-barrier-map'),
    cards([
      { title: 'Barrett 食道 (Barrett esophagus)', body: '長期 acid exposure 可導致食道鱗狀上皮轉成柱狀上皮化生，這是腺癌風險的重要前驅病變。' },
      { title: 'H. pylori 分布差異', body: '胃竇優勢感染可提高 gastrin 與 acid output，較常走向十二指腸潰瘍；全胃炎與萎縮變化則與胃潰瘍、癌前病變更相關。' },
      { title: 'NSAID 雙重傷害', body: '除了全身性 prostaglandin 抑制，局部接觸也會增加黏膜脆弱度，因此合併 steroid、抗凝或高齡時出血風險更高。' },
      { title: '功能性燒心 (Functional heartburn)', body: '病人有灼熱感不等於一定存在病理性 acid reflux；若酸暴露正常、PPI 無效且無黏膜病灶，要想到功能性機轉。' },
    ], 'comparison-grid'),
    misconceptionList([
      { myth: '只要胃酸很多，就一定是 GERD。', correction: '許多 GERD 病人關鍵問題在 LES 與食道暴露，不一定是 acid output 絕對量異常。' },
      { myth: '胃潰瘍一定是壓力大。', correction: '壓力可以影響症狀感受，但真正造成 PUD 的高頻主因仍是 H. pylori、NSAID 與黏膜防禦失衡。' },
    ]),
  ),
  section(
    'diagnosis',
    '診斷思路與鑑別診斷',
    lead('對年輕、典型、沒有 alarm features 的 GERD 病人，經驗性 PPI trial 是合理起點；但一旦症狀非典型、治療反應差、吞嚥困難、出血、貧血或體重下降，就要更早進入內視鏡與鑑別診斷流程。'),
    table(
      ['步驟', '實務問題', '常用工具', '常見陷阱'],
      [
        ['先分紅旗', '有沒有吞嚥困難、黑便、體重下降、貧血、持續嘔吐', '病史、生命徵象、CBC 視情況', '先開胃藥拖住真正高風險病人'],
        ['確認逆流型態', '典型 GERD 還是非典型 / PPI-refractory', 'PPI trial、EGD、pH impedance', '把所有胸悶或喉嚨異物感都直接叫 GERD'],
        ['潰瘍風險盤點', 'H. pylori、NSAID、抗凝、steroid、既往出血史', '病史、藥物清單、H. pylori 檢測', '沒有問非處方藥與止痛藥'],
        ['鑑別其他病', '會不會是 ACS、膽道疾病、胰臟炎、功能性消化不良或食道動力障礙', 'ECG、LFT、lipase、影像或專科檢查視情況', '胃藥有效就停止思考'],
      ],
    ),
    list([
      'H. pylori 的 urea breath test 與 stool antigen 對 active infection 與 eradication confirmation 很有價值，但 PPI、抗生素與 bismuth 會讓結果失真。',
      '若要做 test of cure，必須停 PPI 一段時間，並與抗生素 / bismuth 間隔足夠天數。',
      '非心因性胸痛一定要先排除心血管急症，再談食道來源。',
    ]),
    callout(
      'warning',
      '高價值鑑別診斷',
      p('上腹不適最危險的錯誤，是把真正的 ACS、膽囊炎、膽道阻塞、胰臟炎或上消化道惡性病變當成單純胃酸。對年長病人、糖尿病病人或有出血線索者，診斷門檻必須更低。'),
    ),
  ),
  section(
    'investigations',
    '關鍵檢查與判讀',
    lead('GERD 與 PUD 的檢查策略要能回答三件事：有沒有黏膜傷害或併發症？有沒有 H. pylori？這個病人需不需要更進一步的結構或功能檢查？'),
    table(
      ['檢查', '用途', '判讀重點'],
      [
        ['上消化道內視鏡 (EGD)', '看食道炎、潰瘍、出血、Barrett、惡性病變', '有 alarm features、出血、PPI refractory 或高風險族群時價值最高'],
        ['H. pylori urea breath test / stool antigen', '偵測 active infection 與治療後確認', 'PPI、bismuth、抗生素會造成偽陰性，檢測前要停藥'],
        ['病理切片', '釐清 Barrett、胃潰瘍惡性風險、慢性胃炎型態', '胃潰瘍與不規則病灶常需病理排惡性'],
        ['Ambulatory pH / impedance', '處理症狀非典型或 PPI 反應差', '能把酸暴露與症狀時間連起來，不是每個 GERD 病人都要做'],
        ['CBC、BUN/Cr', '評估慢性出血與急性出血程度', '黑便病人若 BUN 上升與貧血並行，要高度懷疑上消化道出血'],
      ],
    ),
    spotlight('檢查時機常比檢查本身更重要', '對典型 GERD，過度早做高階檢查未必高效；對吞嚥困難、黑便與體重下降者，延後 EGD 反而是高成本錯誤。'),
  ),
  section(
    'treatment',
    '第一線與第二線治療',
    lead('GERD 治療的核心是降低食道酸暴露，PUD 治療的核心則是讓潰瘍癒合並移除病因。兩者雖都常用到 PPI，但臨床目標並不相同。'),
    table(
      ['情境', '第一線策略', '常見組合', '關鍵提醒'],
      [
        ['典型 GERD', '生活型態調整與 PPI', '餐前規律 PPI；必要時夜間加 H2RA', '給藥時機與依從性直接影響「PPI 無效」的假象'],
        ['PPI-refractory GERD', '確認服藥方式、排除非酸逆流與非 GERD 病因', 'EGD、pH impedance、生活型態再盤點', '不是所有症狀持續都要無限加倍 PPI'],
        ['H. pylori 相關潰瘍', 'eradication regimen + 抑酸治療', 'bismuth quadruple therapy 常是高價值起點', '治療後一定要確認 eradication，不可只看症狀消失'],
        ['NSAID 相關潰瘍', '停 NSAID、PPI、必要時換藥與風險保護', '若 NSAID 不可停，優先合併 PPI；特定情境考慮 COX-2 + PPI', '合併抗血小板 / 抗凝時出血風險更高'],
        ['出血性潰瘍', 'resuscitation + IV PPI + 早期內視鏡止血', 'endoscopic injection / clip / thermal therapy', 'hemodynamic stabilization 永遠優先於門診胃藥思維'],
      ],
    ),
    cards([
      { title: '生活型態介入', body: '減重、避免晚餐過飽、睡前 2 到 3 小時不進食、抬高床頭、減少酒精與抽菸，對夜間逆流最有價值。' },
      { title: 'H. pylori 治療後確認', body: '症狀改善不等於菌已清除。若不做 test of cure，治療失敗與後續癌前風險可能被長期低估。' },
      { title: 'Barrett 與長期風險', body: '治療逆流不只為了舒服，也為了降低慢性黏膜傷害與後續癌前病變風險。' },
      { title: '介入與手術', body: '對選擇良好、逆流客觀證據明確且藥物不滿意者，可評估 fundoplication 或其他 anti-reflux procedure。' },
    ], 'comparison-grid'),
    callout(
      'success',
      '門診常見高回報動作',
      p('很多所謂的 PPI failure，最後發現是病人把藥當作飯後症狀藥在吃。把 PPI 說清楚為「需要規律、餐前、連續」使用，常比直接加重藥效更有價值。'),
    ),
  ),
  section(
    'pharmacology',
    '常用藥物機轉、副作用、交互作用',
    lead('上消化道藥理的核心，不是背藥名，而是知道哪一類在減少 acid exposure，哪一類在保護黏膜，哪一類真正處理了病因。'),
    table(
      ['類別', '代表藥物', '主要機轉', '臨床提醒'],
      [
        ['PPI', 'Omeprazole、Pantoprazole、Esomeprazole', '不可逆抑制 parietal cell H+/K+-ATPase', '最好餐前規律使用；長期使用需定期重新評估適應症'],
        ['H2 受體阻斷劑', 'Famotidine', '抑制 histamine-mediated acid secretion', '夜間 breakthrough symptom 有時可作為加成，但耐受性可能出現'],
        ['黏膜保護劑', 'Sucralfate、Bismuth', '局部覆蓋或保護潰瘍表面', 'sucralfate 會干擾部分口服藥吸收；bismuth 可使糞便變黑'],
        ['Prostaglandin 類似物', 'Misoprostol', '補回 NSAID 造成的 prostaglandin 缺口', '腹瀉與子宮收縮限制其使用情境'],
        ['H. pylori eradication 藥物', 'Bismuth、Tetracycline、Metronidazole、Amoxicillin 等', '根據指引組成根除療程', '治療前後都要看藥物過敏、交互作用與局部抗藥情境'],
      ],
    ),
    formula('Omeprazole 分子式', 'C17H19N3O3S', 'PPI 代表藥。其價值在抑酸強度與穩定暴露，而不是拿來當立即止痛藥。'),
    formula('Sucralfate 作用概念', 'Acidic environment -> viscous protective barrier on ulcer bed', 'Sucralfate 不會直接強力抑酸，但在特定潰瘍與妊娠場景有其黏膜保護價值。'),
    callout(
      'danger',
      '常見交互作用與誤解',
      p('PPI 與 clopidogrel、某些 azole、甲狀腺素、鐵劑與部分抗病毒藥可能有交互作用或吸收影響；但最常見錯誤其實是病人自己長期無限續吃，卻從未重新確認適應症。'),
    ),
  ),
  section(
    'special-populations',
    '特殊族群考量',
    lead('特殊族群照護重點不只在藥物安全性，也在「這個族群更容易被誤解成只是胃酸」。孕婦、老年人、抗血栓病人與長期 NSAID 使用者都屬高風險情境。'),
    cards([
      { title: '妊娠', body: '胃排空變慢、腹壓上升與荷爾蒙改變使 GERD 常見。生活型態調整與安全抑酸藥物通常優先。' },
      { title: '老年病人', body: '症狀可能不典型，但出血、藥物交互作用與惡性病變風險更高。吞嚥困難與缺鐵性貧血要更敏感。' },
      { title: '抗凝 / 抗血小板治療中', body: '一旦合併潰瘍與出血，藥物暫停與恢復時機需要和血栓風險一起平衡。' },
      { title: '慢性 NSAID 使用者', body: '關節痛病人常同時服用 ibuprofen、naproxen、aspirin 或中草藥，藥物盤點不能只看處方。' },
    ]),
  ),
  section(
    'clinical-pitfalls',
    '常見臨床陷阱',
    lead('GERD 與 PUD 最常見的錯誤不是不知道用哪支胃藥，而是過度簡化症狀。'),
    misconceptionList([
      { myth: '胸口灼熱就是胃酸。', correction: 'GERD 很常見，但 ACS、膽道疾病與食道動力障礙都可能以相似感覺出現，尤其在高風險族群。' },
      { myth: '症狀好了就代表 H. pylori 清掉了。', correction: '根除成功需要正式確認。若只看症狀，治療失敗與後續風險很容易被漏掉。' },
      { myth: 'PPI 沒效就是要一直加量。', correction: '先檢查服藥時機、依從性、是否真的 GERD、是否存在非酸逆流或功能性燒心，再決定後續策略。' },
    ]),
  ),
  section(
    'case-discussion',
    'Case-based discussion',
    lead('病例：58 歲男性，BMI 31，每晚宵夜後 1 小時就開始胸口灼熱，近月來又因膝蓋痛每天吃 ibuprofen。最近他發現大便變黑、走路較喘，到院 Hb 9.4 g/dL。'),
    table(
      ['臨床問題', '思考方向'],
      [
        ['這只是 GERD 嗎？', '不夠。黑便與貧血已把病人拉進上消化道出血框架，NSAID 潰瘍要優先考慮。'],
        ['最重要的病史是哪幾個？', 'NSAID 劑量與天數、aspirin 或抗凝藥、既往潰瘍史、H. pylori 史、暈厥或胸悶。'],
        ['治療重點是什麼？', '先穩定 hemodynamics，安排內視鏡與抑酸止血策略，再決定 H. pylori 檢測與長期止痛方案修正。'],
      ],
    ),
    callout(
      'clinical',
      '案例整合',
      p('這類病人很容易在門診被當成「胃酸 + 胃藥加一顆」處理，但真正危險的是 NSAID 相關潰瘍已經開始出血。上腹不適一旦合併黑便與貧血，整個優先順序就改了。'),
    ),
  ),
);

digestiveChapters.ch18 = chapter(
  '發炎性腸道疾病 (IBD)',
  section(
    'anatomy-physiology',
    '正常解剖與生理',
    lead('要理解發炎性腸道疾病 (Inflammatory Bowel Disease, IBD)，必須先把腸道看成一個同時負責吸收、屏障、免疫教育與菌相共生的大型介面。正常黏膜上皮 (Intestinal epithelium)、黏液層、Paneth cell、IgA、固有層免疫細胞與腸道菌相共同形成動態平衡，讓營養能通過、病原與內毒素被限制、免疫系統又不至於對正常食物與共生菌過度反應。'),
    p('小腸以吸收為主，大腸則更強調水分回收、菌相代謝與糞便成形。IBD 發生時，這個屏障-免疫-菌相三角被打破。潰瘍性結腸炎 (Ulcerative colitis, UC) 主要侷限在結腸黏膜；克隆氏症 (Crohn disease) 則可從口到肛任何一段發生，且偏向全層性發炎。這種層次與分布差異，直接決定了瘻管、狹窄、血便、急迫感與營養缺乏的臨床樣貌。'),
    tags(['Mucosal barrier', 'Microbiome', 'NOD2', 'TNF', 'Treat-to-target']),
    digestiveViewer('ibd-inflammation'),
    diagram('ibd-immune-map'),
    cards([
      { title: '上皮與緊密連結 (Epithelial barrier)', body: '它決定什麼能進、什麼不能進。IBD 的起點常不是一個大洞，而是很多微小屏障破口長期被放大。' },
      { title: '菌相 (Microbiome)', body: '共生菌不是背景音，而是免疫系統的重要訓練者。當菌相失衡，黏膜免疫更容易持續處於警戒狀態。' },
      { title: 'UC 與 Crohn 的分布', body: 'UC 連續、由直腸往近端延伸；Crohn 跳躍、可累及末端迴腸與肛門周邊，這是臨床判讀重點。' },
      { title: '腸外表現 (Extraintestinal manifestations)', body: '關節、皮膚、眼睛、肝膽系統都可能被捲入，代表 IBD 不是只有拉肚子的病。' },
    ]),
    formula('Mesalamine 分子式', 'C7H7NO3', '5-aminosalicylic acid 是 UC 輕中度病程的重要黏膜抗發炎藥物。它不是止痛藥，也不是治所有 IBD 的萬用藥。'),
    summary('底層生理重點', 'IBD 的本質是黏膜屏障、菌相與免疫網路的慢性失衡，之後才在不同部位長成不同表型。', [
      'UC 與 Crohn 的差異來自分布與層次。',
      '腸道是免疫器官，不是單純吸收管。',
      '治療目標已從止瀉走向黏膜癒合與病程改變。',
    ]),
  ),
  section(
    'symptoms',
    '常見主訴與症狀',
    lead('IBD 常見主訴包括慢性腹痛、腹瀉、血便、黏液便、體重下降、食慾差、疲倦、發燒與反覆急迫感。UC 病人常用「一直想上廁所、但每次量不多而且有血」描述；Crohn 病人則可能更常說「肚子痛、拉很久、瘦很多，還會肛門痛或有膿」。'),
    p('真正容易被忽略的是低度長期症狀與腸外表現。有些病人多年只被當成腸躁症 (IBS) 或痔瘡，直到出現血色素下降、夜間痛醒、體重明顯下滑、關節痛、口腔潰瘍、葡萄膜炎或肛門周邊病灶才被真正往 IBD 想。'),
    table(
      ['病人表現', '較支持哪一型', '臨床線索', '常被誤當成'],
      [
        ['血便、急迫感、tenesmus', 'UC 較常見', '直腸受累時特別明顯', '痔瘡、感染性腸炎'],
        ['右下腹痛、體重下降、肛門周邊瘻管', 'Crohn 較常見', '末端迴腸與全層發炎線索', '闌尾炎、腸躁症'],
        ['反覆口瘡、關節痛、紅眼', '兩者都可能', '腸外表現可先於腸道症狀', '單純免疫或皮膚科疾病'],
        ['夜間腹瀉、發燒、貧血', '活躍發炎性疾病', '功能性腸症候群較少夜間把人叫醒', '壓力大或吃壞肚子'],
      ],
    ),
    callout(
      'clinical',
      '真實場景',
      p('24 歲男性研究生，半年來反覆腹瀉與肛門疼痛，被當成痔瘡、壓力大與腸胃炎輪流處理。直到他開始掉體重、夜裡也會痛醒，肛門周邊出現引流膿液，才被轉去做腸鏡。這是典型 Crohn disease 被拖延診斷的樣子。'),
    ),
    takeawayList([
      { title: '血便不是小事', body: '年輕人有血便也不該直接當痔瘡，尤其若合併腹痛、夜間腹瀉與貧血。' },
      { title: '夜間症狀很有鑑別度', body: '功能性腸躁症較少把病人從睡眠中痛醒或拉醒。' },
      { title: '腸外表現不能忽略', body: '關節、皮膚、眼睛與肝膽問題有時比腹瀉更早出現。' },
    ]),
  ),
  section(
    'pathophysiology',
    '重要疾病機轉',
    lead('IBD 不是單一免疫細胞「失控」這麼簡單，而是先天易感、菌相失衡、上皮防禦受損與後天免疫放大長期交纏的結果。NOD2、IL23R、ATG16L1 等基因變異會影響微生物辨識、自噬與發炎反應，讓本來應被容忍的腸腔訊號更容易被當成威脅。'),
    p('UC 偏向黏膜與黏膜下層連續發炎，因而更常出現血便與表淺潰瘍；Crohn disease 偏向全層發炎與跳躍病灶，容易形成狹窄、瘻管與腹內膿瘍。這也是為什麼 5-ASA 對輕中度 UC 常有位置，卻不能把所有 Crohn 病人都當成同樣邏輯。'),
    diagram('ibd-immune-map'),
    cards([
      { title: 'TNF / IL-12/23 / Integrin 軸線', body: '現代 biologics 與 small molecules 正是針對這些關鍵免疫節點設計，反映 IBD 已進入機轉導向治療。' },
      { title: 'Transmural injury', body: 'Crohn 的全層性傷害會讓腸壁像管路一樣出現狹窄、穿通與瘻管，這是 UC 較少見的結構後果。' },
      { title: '癌前風險', body: '長期慢性結腸發炎會提高結直腸癌風險，因此 disease duration 與內視鏡監測很重要。' },
      { title: 'VTE 與全身發炎', body: 'IBD 活躍期不只腸道發炎，也會提高血栓與住院併發症風險。' },
    ], 'comparison-grid'),
    misconceptionList([
      { myth: 'IBD 就是很嚴重的感染性腸胃炎。', correction: 'IBD 是免疫介導慢性疾病，感染必須先排除，但根本機轉不是單一病原入侵。' },
      { myth: '只要止住血便或腹瀉就算控制好。', correction: '症狀改善很重要，但現代目標還包括 biomarker、內視鏡與病程風險控制。' },
    ]),
  ),
  section(
    'diagnosis',
    '診斷思路與鑑別診斷',
    lead('IBD 診斷沒有單一黃金試紙，必須把病史、糞便發炎指標、感染排除、內視鏡與病理拼在一起。第一步不是急著貼標籤，而是先分出這是不是發炎性腹瀉，還是感染、功能性腹痛、缺血、藥物性腹瀉或腫瘤。'),
    table(
      ['步驟', '要回答的問題', '常用工具', '常見陷阱'],
      [
        ['先排感染', '會不會其實是細菌、寄生蟲、C. difficile', 'stool culture、C. difficile assay、旅遊與抗生素史', '血便就直接開 steroid'],
        ['確認發炎', '症狀是否真的有腸道發炎證據', 'fecal calprotectin、CRP、CBC', '把 IBS 與 IBD 混在一起'],
        ['定位與分型', 'UC 還是 Crohn？病灶範圍多大？', 'colonoscopy + biopsy、影像', '只靠症狀猜分型'],
        ['找併發症', '有無狹窄、瘻管、膿瘍、營養缺乏', 'MR enterography、CT、肛門周邊評估', '忘了 Crohn 的病不只在腸鏡視野裡'],
      ],
    ),
    list([
      'Fecal calprotectin 在區分功能性腸症候群與發炎性腸病很有幫助，但不應脫離病史獨立判讀。',
      'Crohn 病人若大腸鏡不典型，常需要小腸影像補上整張疾病地圖。',
      '類固醇前最好先完成感染排除，至少不能忽略 C. difficile 與明顯感染性線索。',
    ]),
    callout(
      'warning',
      '高風險鑑別',
      p('血便與腹痛不能直接等於 IBD。感染性腸炎、缺血性結腸炎、藥物性結腸炎、放射線傷害與結直腸癌都可能長得很像。年齡、血流風險、藥物與影像線索要一起看。'),
    ),
  ),
  section(
    'investigations',
    '關鍵檢查與判讀',
    lead('IBD 的檢查價值在於建立疾病地圖與活動度，不是單純收集愈多數字愈好。'),
    table(
      ['檢查', '用途', '判讀重點'],
      [
        ['CBC、CRP、ESR、albumin', '看發炎、貧血、營養與疾病負荷', '貧血與低 albumin 常反映長期活躍病程或吸收不良'],
        ['糞便 calprotectin', '輔助判定腸道發炎是否存在或是否緩解', '追蹤趨勢比單次數字更有臨床價值'],
        ['Stool pathogen / C. difficile', '排除感染性 mimic', '免疫抑制與住院病人尤需謹慎'],
        ['Colonoscopy + biopsy', '診斷、分型與監測 dysplasia', '分布、深度、連續性與病理一起看'],
        ['MR enterography / CT enterography', '看小腸病灶、狹窄、瘻管與膿瘍', 'Crohn disease 常靠影像補齊全貌'],
        ['營養與微量元素', 'B12、鐵、葉酸、vitamin D 等', '末端迴腸病變或切除後缺乏風險更高'],
      ],
    ),
    spotlight('檢查順序很重要', '活躍血便病人若先被止瀉或 steroid 模糊掉病程，再補送感染檢查與內視鏡，後面的診斷難度會明顯提高。'),
  ),
  section(
    'treatment',
    '第一線與第二線治療',
    lead('IBD 治療的主軸不是「有症狀就壓下去」，而是用 induction 與 maintenance 分開設計，並依病人表型、活動度、位置與併發症決定 escalation 節點。'),
    table(
      ['情境', '第一線策略', '常見藥物', '臨床提醒'],
      [
        ['輕中度 UC', '5-ASA 為基礎，直腸病灶優先加 topical therapy', 'mesalamine oral + suppository/enema', '遠端病灶局部治療很有價值，別只開口服藥'],
        ['UC 或 Crohn 急性 flare', '短期 corticosteroid induction', 'prednisone、budesonide 視位置', 'steroid 用來 induction，不該變成長期 maintenance'],
        ['中重度 IBD', 'biologic 或 small molecule 視病人風險與共病', 'anti-TNF、vedolizumab、ustekinumab、JAK inhibitor 等', '開始前要做 TB、HBV、疫苗與感染風險盤點'],
        ['Crohn 狹窄 / 瘻管 / 膿瘍', '藥物與介入 / 外科並行', 'anti-TNF、引流、手術視情況', '結構性問題不會只靠止瀉藥解決'],
        ['Treat-to-target 追蹤', '看症狀、calprotectin、CRP、內視鏡', '依反應調整維持治療', '只看病人說今天比較好，常會漏掉 silent inflammation'],
      ],
    ),
    cards([
      { title: '5-ASA 的定位', body: '在 UC 最有角色，尤其輕中度與直腸乙狀結腸病灶；不能想像成對所有 Crohn 都同樣有效。' },
      { title: 'Biologics 的實務', body: '選藥要看腸外表現、肛門周邊病變、感染風險、給藥偏好、保險與過去暴露史，而不只是「新藥比較強」。' },
      { title: '營養與缺乏補正', body: '鐵、B12、葉酸、vitamin D、蛋白質與熱量支持，是 IBD 真正能讓病人功能回升的底盤。' },
      { title: '手術不是失敗', body: '對 UC 某些嚴重病程或 Crohn 的狹窄、瘻管、膿瘍，手術是病程管理的一部分，不是表示前面全錯。' },
    ], 'comparison-grid'),
    callout(
      'success',
      '高價值照護概念',
      p('現代 IBD 管理很強調 treat-to-target，也就是症狀、biomarker 與客觀黏膜反應一起追蹤。只追腹瀉次數，常會留下未來的狹窄、住院與手術風險。'),
    ),
  ),
  section(
    'pharmacology',
    '常用藥物機轉、副作用、交互作用',
    lead('IBD 藥理最重要的不是背「哪支藥最新」，而是知道每類藥在 induction 還是 maintenance、在 UC 還是 Crohn、在感染風險與長期毒性上各自扮演什麼角色。'),
    table(
      ['類別', '代表藥物', '主要機轉', '重點副作用 / 注意事項'],
      [
        ['5-ASA', 'Mesalamine', '局部黏膜抗發炎', '腎功能與少見胰臟炎需注意；對 Crohn 小腸病灶效果有限'],
        ['Corticosteroid', 'Prednisone、Budesonide', '快速抑制發炎訊號', '感染、高血糖、骨質流失、情緒改變；不適合長期維持'],
        ['Thiopurine', 'Azathioprine、6-MP', '抑制淋巴球增殖', '骨髓抑制、肝毒性、胰臟炎與 TPMT/NUDT15 考量'],
        ['Biologics', 'Infliximab、Adalimumab、Vedolizumab、Ustekinumab', '分別切 TNF、整合素或 IL-12/23 軸線', '感染篩檢、輸注反應、免疫原性與失效監測重要'],
        ['JAK inhibitor / S1P modulator', 'Tofacitinib、Upadacitinib、Ozanimod', '調整細胞訊號傳遞或淋巴球遷移', '帶狀皰疹、VTE、脂質、肝功能與心血管風險需個別評估'],
      ],
    ),
    formula('Inflammation to target', 'TNF / IL-12/23 / integrin / JAK -> reduce mucosal inflammation', 'IBD 藥理已從廣效壓抑進入節點切除時代。真正難的是如何根據病人風險選對節點，而不是單純選最強藥。'),
    callout(
      'danger',
      '高風險藥理錯誤',
      p('在未排除感染前就快速升 steroid 或 biologic，是 IBD 常見高風險錯誤。另一個陷阱是讓病人長期反覆依賴 steroid，卻遲遲不建立維持治療。'),
    ),
  ),
  section(
    'special-populations',
    '特殊族群考量',
    lead('IBD 常在年輕人生殖年齡發病，因此妊娠、成長發育、疫苗與長期免疫抑制風險都要提早布局。'),
    cards([
      { title: '妊娠與生育', body: '疾病活躍本身對母胎風險常比多數維持藥物更高，因此重點通常是維持緩解，而不是發現懷孕就全面停藥。' },
      { title: '兒童與青少年', body: '成長遲滯、青春期延遲與營養不足在 pediatric IBD 特別重要，不能只看腹瀉控制。' },
      { title: '老年 IBD', body: '感染、惡性腫瘤、骨質疏鬆與 polypharmacy 風險更高，選藥時需更重視安全面。' },
      { title: '術後病人', body: 'Crohn 術後復發預防與營養重建是關鍵照護，不能把手術當成病程終點。' },
    ]),
  ),
  section(
    'clinical-pitfalls',
    '常見臨床陷阱',
    lead('IBD 最常見的臨床陷阱，來自把慢性發炎當作一般腸胃不適拖太久。'),
    misconceptionList([
      { myth: '只要病人還能上班，應該不算嚴重。', correction: '許多年輕 IBD 病人會長期撐著，但血便、貧血、體重下降與影像病灶可能已經進展。' },
      { myth: 'steroid 有效就代表治療成功。', correction: 'steroid 的價值在 induction。若病人反覆依賴 steroid，通常代表維持策略失敗。' },
      { myth: 'IBD 只要症狀少就好，不必追內視鏡。', correction: '症狀與客觀黏膜發炎不一定同步。忽略客觀追蹤會讓未來狹窄、癌前風險與住院率被低估。' },
    ]),
  ),
  section(
    'case-discussion',
    'Case-based discussion',
    lead('病例：29 歲女性，3 個月來腹瀉每天 6 到 8 次，帶血，夜裡也會被腹痛拉醒。近期 Hb 10.2 g/dL，CRP 上升，fecal calprotectin 顯著升高，糞便感染檢查陰性。大腸鏡顯示由直腸向近端連續性黏膜發炎。'),
    table(
      ['臨床問題', '思考方向'],
      [
        ['這更像 UC 還是 Crohn？', '連續性結腸黏膜病灶、血便與直腸受累較支持 UC。'],
        ['第一線怎麼做？', '依活動度評估 5-ASA 與 steroid induction，並建立後續 biomarker 與內視鏡追蹤。'],
        ['最常被忽略的照護是什麼？', '貧血、營養、疫苗、妊娠計畫與長期 maintenance 策略，而不是只把 flare 壓下來。'],
      ],
    ),
    callout(
      'clinical',
      '案例整合',
      p('這位病人不只是「發炎性腹瀉」，她已經進入需要病程管理的免疫疾病軌道。真正的治療重點是把未來住院、反覆 flare 與結腸長期風險一起降下來。'),
    ),
  ),
);

digestiveChapters.ch19 = chapter(
  '肝炎與肝硬化 (Hepatitis & Cirrhosis)',
  section(
    'anatomy-physiology',
    '正常解剖與生理',
    lead('肝臟 (Liver) 不是單一代謝工廠，而是門脈循環、蛋白合成、膽汁生成、氨代謝、糖脂代謝、藥物轉化與免疫監控同時進行的器官。正常情況下，門靜脈 (Portal vein) 帶來來自腸道與脾臟的血，肝動脈 (Hepatic artery) 補充高氧血流，兩者在肝竇 (Sinusoid) 混合後由肝細胞處理，最後經中央靜脈回流。'),
    p('肝小葉 (Lobule) 的血流設計讓肝臟既能接收營養，也能第一時間處理腸源性毒素與藥物。當病毒、酒精、脂肪毒性、自體免疫或膽汁鬱積造成慢性傷害時，星狀細胞活化、膠原沉積與結節化重塑會逐步形成肝硬化。到了這一步，問題已不只是 AST/ALT，而是血流阻力、門脈壓力、合成功能與全身 hemodynamics 一起被改寫。'),
    tags(['Portal triad', 'Sinusoid', 'Fibrosis', 'Portal hypertension', 'Ammonia detoxification']),
    digestiveViewer('cirrhosis-portal'),
    diagram('hepatology-portal-map'),
    cards([
      { title: '肝細胞 (Hepatocyte)', body: '負責蛋白合成、氨轉換成尿素、藥物代謝、膽紅素處理與糖脂代謝，是慢性肝病真正的功能主體。' },
      { title: '門脈系統 (Portal circulation)', body: '門脈高壓不是局部現象，而是整個脾臟、腸道、食道胃側枝與腎血流都會受到影響。' },
      { title: '膽汁生成 (Bile formation)', body: '脂溶性物質排泄與脂肪吸收都仰賴膽汁路徑，因此黃疸、脂肪便與搔癢要想到膽汁鬱積。' },
      { title: '肝腦與腸肝軸 (Gut-liver axis)', body: '氨、炎症與腸道菌相在肝腦病變裡有重要角色，這也是 lactulose 與 rifaximin 之所以有效的基礎。' },
    ]),
    formula('MELD-Na 概念', 'MELD-Na ~ bilirubin + INR + creatinine + sodium', 'MELD-Na 用來估計肝硬化短期死亡風險與移植排序，不是拿來單獨決定所有處置，但對分流與轉介很有價值。'),
    summary('生理關鍵句', '肝臟病進展到肝硬化時，真正被重寫的是血流路徑、合成功能與全身循環，而不只是肝酵素。', [
      '慢性傷害先走向纖維化，再走向門脈高壓與失代償。',
      '合成功能與發炎程度不能只看 AST/ALT。',
      '門脈高壓會把問題推向腹水、曲張與腎功能惡化。',
    ]),
  ),
  section(
    'symptoms',
    '常見主訴與症狀',
    lead('急性肝炎常以疲倦、食慾差、噁心、茶色尿、黃疸、右上腹悶痛或全身倦怠表現；慢性肝炎則常長期沉默，直到健檢異常或出現肝硬化後果才被發現。肝硬化一旦失代償，病人的主訴就會從「肝指數高」變成腹脹、腿腫、吐血、意識混亂、肌肉流失與反覆住院。'),
    p('臨床上最容易被低估的是 compensated cirrhosis 與肌少症。病人可能還沒黃得嚇人，卻已經有脾大、血小板下降、疲倦、夜間腿抽筋、食慾變差與體能快速下滑。真正的危險，是第一次腹水、第一次靜脈曲張出血、第一次自發性腹膜炎或第一次肝腦病變往往就是病程大轉折。'),
    table(
      ['病程情境', '常見主訴', '臨床線索', '容易誤判成'],
      [
        ['急性肝炎', '疲倦、黃疸、深色尿、右上腹不適', 'AST/ALT 上升、bilirubin 高', '腸胃炎或只是太累'],
        ['慢性肝病', '沒有明顯症狀、只是健檢異常', 'HBV、HCV、MASLD、酒精或自體免疫背景', '數字忽高忽低而已'],
        ['腹水失代償', '腹脹、腿腫、呼吸喘、早飽', '門脈高壓與 sodium retention', '單純吃太鹹或變胖'],
        ['肝腦病變', '嗜睡、反應慢、日夜顛倒、撲翼性震顫', '感染、GI bleed、便秘、腎功能惡化常是誘發因子', '失智、睡不好、年紀大'],
      ],
    ),
    callout(
      'clinical',
      '真實場景',
      p('61 歲男性有 HBV 與糖尿病，平時覺得自己只是肚子比較大。最近家屬發現他反應變慢、講話容易答非所問，兩週前鞋子也突然變緊。這種病人若只看 AST/ALT 可能覺得變化不大，但臨床其實已進入腹水加肝腦病變的失代償期。'),
    ),
    takeawayList([
      { title: '慢性肝病很常沉默', body: '很多病人直到失代償才被發現，因此風險盤點與篩檢很重要。' },
      { title: '第一次失代償就是轉折點', body: '腹水、曲張出血、肝腦病變與 SBP 會明顯改變預後與照護目標。' },
      { title: '肌少症與營養是核心症狀', body: '病人不一定先黃，卻很常先瘦、虛弱、跌倒與功能下降。' },
    ]),
  ),
  section(
    'pathophysiology',
    '重要疾病機轉',
    lead('肝炎只是起點，真正決定長期結局的是慢性傷害是否持續推動纖維化與門脈高壓。慢性 HBV、HCV、酒精性肝病、代謝異常相關脂肪肝病 (MASLD)、自體免疫肝炎、膽汁鬱積性疾病與遺傳代謝病都可能走向同一條共同終點：星狀細胞活化、膠原沉積、肝小葉結構破壞與血流阻力增加。'),
    p('門脈高壓形成後，病人會進入高心輸出、低有效動脈血量感知、RAAS 活化與鈉水滯留的惡性循環。於是腹水、食道胃靜脈曲張、脾大、肝腎症候群、SBP 與肝腦病變接連出現。這也是為什麼肝硬化病人的照護不能只盯著 AST/ALT，而要把 hemodynamics、感染與營養一起看。'),
    diagram('hepatology-portal-map'),
    cards([
      { title: 'HBV 與 HCV', body: 'HBV 較像可長期抑制的慢性感染，HCV 在現代 DAA 時代多數可望治癒，但是否已經進入 cirrhosis 仍決定後續監測。' },
      { title: 'MASLD / MASH', body: '胰島素阻抗、脂肪毒性與慢性發炎讓脂肪肝不只是影像油亮，而是真正能走向纖維化與肝癌風險。' },
      { title: '肝腦病變 (Hepatic encephalopathy)', body: '氨只是其中一環，感染、出血、便秘、腎衰與電解質失衡常一起降低神經耐受度。' },
      { title: 'SBP 與腸道轉位', body: '腹水不是靜態積水，而是高感染風險空間；一旦 PMN 達門檻就要視為需立即治療的感染。' },
    ], 'comparison-grid'),
    misconceptionList([
      { myth: '肝硬化就是肝指數很高。', correction: '很多 advanced cirrhosis 病人 AST/ALT 並不高，真正嚴重的是 bilirubin、INR、albumin、platelet、腹水與腦病變。' },
      { myth: '氨高就是肝腦病變，氨不高就不是。', correction: '血氨可作輔助，但診斷肝腦病變仍然是臨床判斷與誘發因子盤點，不能只靠一個 lab。' },
    ]),
  ),
  section(
    'diagnosis',
    '診斷思路與鑑別診斷',
    lead('肝炎與肝硬化的診斷，第一步是分清現在回答的是哪個問題：是在找病因、在分 compensated 與 decompensated、還是在處理某個急性併發症。不同問題，檢查優先順序完全不同。'),
    table(
      ['步驟', '核心問題', '常用工具', '常見錯誤'],
      [
        ['先分急慢性', '這是急性肝炎還是慢性肝病背景上的失代償', '病史、LFT pattern、INR、bilirubin', '看到黃疸就只想膽道或只想病毒'],
        ['找病因', '病毒、酒精、代謝、自體免疫、藥物、膽汁鬱積或遺傳', 'serology、病史、autoimmune markers、影像', '所有脂肪肝都當成單純肥胖'],
        ['分 compensated / decompensated', '有沒有腹水、曲張出血、HE、SBP、黃疸', '理學、超音波、ascites tap、病史', '沒有黃疸就以為還沒失代償'],
        ['抓可逆誘因', '感染、GI bleed、藥物、便秘、腎損傷、酒精復發', 'CBC、cultures、endoscopy、med review', '把所有變差都歸咎原病進展'],
      ],
    ),
    list([
      '每一位新發腹水的肝硬化病人都應考慮 diagnostic paracentesis，不能只憑外觀或影像直接當單純腹水。',
      'HCV 在現代多可治癒，但對已進入 cirrhosis 的病人，HCC 監測與門脈高壓照護不會因病毒清除就完全取消。',
      'Child-Pugh 描述病程分層，MELD-Na 對短期死亡風險與移植排序更有實務意義，兩者回答的問題不同。',
    ]),
    callout(
      'warning',
      '一定要記得的急症鑑別',
      p('上消化道吐血、意識改變、腹痛發燒、急性腎損傷與低血壓在 cirrhosis 裡都可能代表靜脈曲張出血、SBP、HRS、敗血症或急性肝衰竭。這些情境的處置優先級遠高於慢性門診追蹤。'),
    ),
  ),
  section(
    'investigations',
    '關鍵檢查與判讀',
    lead('肝病檢查最怕的是開一堆單卻沒有回答臨床問題。真正高價值的檢查，應該要告訴你病因、纖維化程度、是否失代償、是否有感染，以及接下來要怎麼監測。'),
    table(
      ['檢查', '用途', '判讀重點'],
      [
        ['AST、ALT、bilirubin、ALP、albumin、INR', '看 injury pattern 與合成功能', 'AST/ALT 反映 injury，albumin/INR 更接近肝功能 reserve'],
        ['HBsAg、HBV DNA、anti-HCV、HCV RNA', '病毒性肝炎診斷與治療規劃', '抗體不等於 active infection，RNA / DNA 才能回答活性複製'],
        ['腹部超音波與彈性檢查', '看肝表面、脾大、腹水與纖維化風險', '影像粗糙與 platelet 下降常早於顯著黃疸'],
        ['Ascitic fluid analysis', '新發腹水或臨床惡化時排 SBP', 'PMN >= 250/mm3 即應視作 SBP 門檻處理'],
        ['上消化道內視鏡', '篩曲張與處理出血', '有無 varix 與出血 stigmata 會直接改變預防策略'],
        ['HCC surveillance', '每 6 個月超音波 +/- AFP', '病毒控制不等於 HCC 風險歸零，特別是已有 cirrhosis 者'],
      ],
    ),
    h3('判讀細節'),
    list([
      'Platelet 下降在門脈高壓早期常比 bilirubin 更早出現，反映脾大與門脈系統改變。',
      'Ascites tap 不只是做 SAAG 分類，更重要的是不要漏掉 SBP；任何住院、腹痛、發燒、腎功能變差或 HE 惡化都要提高警覺。',
      'Ammonia 可輔助，但不該取代神經狀態、誘發因子盤點與整體臨床判斷。',
    ]),
    spotlight('最容易漏的檢查', '對 new-onset ascites 病人，床邊腹水穿刺的價值往往比再多抽一輪肝功能更高。'),
  ),
  section(
    'treatment',
    '第一線與第二線治療',
    lead('肝炎與肝硬化治療要分兩條時間軸：一條是病因控制，例如 HBV 抑制、HCV 治癒、酒精戒斷與代謝風險降低；另一條是併發症控制，例如腹水、靜脈曲張、肝腦病變、SBP 與 HRS。這兩條都做，才叫真正管理 cirrhosis。'),
    table(
      ['情境', '第一線策略', '常見藥物 / 介入', '重要提醒'],
      [
        ['慢性 HBV', '抑制病毒複製與長期監測', 'tenofovir、entecavir', '治療目標多為抑制而非短期停藥，需持續追 DNA 與肝癌風險'],
        ['慢性 HCV', 'DAA 治療與併發症評估', 'glecaprevir/pibrentasvir、sofosbuvir/velpatasvir 等依條件選擇', '是否 compensated / decompensated 會改變 regimens 與可用性'],
        ['腹水', '限鈉、利尿與必要時大量放腹水 + albumin', 'spironolactone、furosemide、paracentesis', '不要用 NSAID；新發腹水先 tap'],
        ['靜脈曲張預防 / 出血', 'NSBB 或內視鏡結紮；出血時先 resuscitation + vasoactive drug + antibiotics + endoscopy', 'carvedilol、octreotide、ceftriaxone、band ligation', '曲張出血是急症，不是單純吐血觀察'],
        ['肝腦病變', '找誘發因子並降低腸源氨負荷', 'lactulose，必要時加 rifaximin', '目標通常是每天 2 到 3 次軟便，而不是狂瀉'],
        ['SBP / HRS 風險', '早期感染治療、albumin、選擇性預防', 'cefotaxime / ceftriaxone、albumin、vasoconstrictor 視情況', 'HRS 常不是缺水而已，亂補液會更糟'],
      ],
    ),
    cards([
      { title: '病因控制不能放掉', body: '即使病人已經腹水或 HE，HBV/HCV、酒精與代謝風險仍然要積極處理，因為病因持續存在會加速每一次失代償。' },
      { title: '營養與蛋白質', body: '過去常過度限制蛋白質，但現代 cirrhosis 照護更重視避免肌少症與維持足夠蛋白熱量攝取。' },
      { title: '移植轉介', body: '反覆失代償、MELD-Na 上升、HCC 或生活功能下滑時，提早轉介比最後急救時才想起來更有效。' },
      { title: '門診防線', body: '疫苗、酒精戒斷、藥物盤點、感染預防、便秘管理與家屬教育，常直接決定再住院率。' },
    ], 'comparison-grid'),
    callout(
      'success',
      '臨床高回報組合',
      p('對 cirrhosis 病人來說，規律的 HCC surveillance、腹水管理、NSBB 適應症評估、lactulose 教育與家屬對 HE 的警訊辨識，往往比一次門診把 AST/ALT 解釋得多漂亮更能改變結局。'),
    ),
  ),
  section(
    'pharmacology',
    '常用藥物機轉、副作用、交互作用',
    lead('肝病藥理最大的難點，是同一位病人常同時存在肝功能下降、低白蛋白、腹水、腎功能脆弱與 polypharmacy，因此安全性判斷不能只看一本藥典。'),
    table(
      ['藥物 / 類別', '主要用途', '機轉', '重要提醒'],
      [
        ['Tenofovir / Entecavir', '慢性 HBV 抑制', '抑制 HBV 複製', '腎功能與骨骼風險、長期依從性要追蹤'],
        ['DAA', 'HCV 治療', '直接抑制病毒蛋白', '藥物交互作用非常重要，尤其與 acid suppression、抗癲癇與某些心血管藥並用時'],
        ['Lactulose', 'HE 一線', '酸化腸腔並促進排便，降低氨吸收', '脹氣、腹瀉、脫水與依從性是常見實務問題'],
        ['Rifaximin', 'HE add-on', '降低腸道產氨菌負荷', '常與 lactulose 併用而非取代'],
        ['Spironolactone / Furosemide', '腹水與水腫管理', '分別切醛固酮與 loop sodium handling', '高低鉀與腎功能變動都要緊密監測'],
        ['NSBB', '曲張出血預防', '降低 portal inflow', '過度低血壓、急性腎損傷與特定失代償情境需個別判斷'],
      ],
    ),
    formula('Lactulose 分子式', 'C12H22O11', 'lactulose 的價值不在「清腸」本身，而在透過腸道環境改變降低腸源性氨負荷。實務上最重要的是病人與家屬知道目標軟便次數。'),
    callout(
      'danger',
      '高風險藥物誤解',
      p('肝硬化病人不是完全不能用 acetaminophen，但要避免高劑量與酒精併用；真正更應避免的是 NSAID，因為它會顯著增加腎損傷、腹水惡化與 GI 出血風險。'),
    ),
  ),
  section(
    'special-populations',
    '特殊族群考量',
    lead('肝病特殊族群的重點，在於病因與風險路徑不同，不能用一個 cirrhosis 模板套全部。'),
    cards([
      { title: '妊娠與 HBV', body: '高病毒量孕婦需要更精準的母胎傳播風險管理與新生兒免疫預防。' },
      { title: '腎功能脆弱病人', body: '腹水、利尿、SBP、HRS 與藥物劑量調整高度交纏，腎臟安全必須被主動監控。' },
      { title: '酒精性肝病', body: '戒斷、營養、心理與復發預防和肝臟藥物同樣重要，否則病因控制會一直失敗。' },
      { title: '高齡與肌少症', body: '跌倒、譫妄、營養不良與藥物不良反應常比實驗室數字更快決定病人能否維持功能。' },
    ]),
  ),
  section(
    'clinical-pitfalls',
    '常見臨床陷阱',
    lead('肝病實務中，最危險的往往不是罕見病，而是把常見併發症想得太晚。'),
    misconceptionList([
      { myth: '沒有黃疸就不算嚴重肝硬化。', correction: '很多 compensated 或早期 decompensated cirrhosis 病人先出現的是腹水、血小板低、肌少症與 HE，而非顯著黃疸。' },
      { myth: 'HE 就是氨高，所以只要看 ammonia。', correction: 'HE 是臨床診斷，感染、GI bleed、便秘、藥物、電解質與腎功能惡化常是更需要被找出的誘因。' },
      { myth: '腹水就是多利尿、多放水。', correction: '每一次 new or worsening ascites 都要想 SBP、腎功能、低血壓與整體 hemodynamics，而不只是機械性加大劑量。' },
    ]),
  ),
  section(
    'case-discussion',
    'Case-based discussion',
    lead('病例：63 歲男性，有慢性 HBV 與長期酒精使用史，近月腹圍快速增加、食慾變差、晚上開始答非所問。到院抽血 albumin 2.8 g/dL、INR 1.6、bilirubin 3.1 mg/dL、creatinine 1.5 mg/dL，超音波見腹水與表面結節化肝臟。'),
    table(
      ['臨床問題', '思考方向'],
      [
        ['這是單純肝炎惡化還是 cirrhosis 失代償？', '腹水、認知改變與凝血異常已支持 decompensated cirrhosis。'],
        ['下一步優先做什麼？', '評估 HE 誘因、做 diagnostic paracentesis、看是否感染、GI bleed 或腎功能惡化並行。'],
        ['長期管理主軸是什麼？', '病因控制、腹水與 HE 管理、HCC surveillance、營養重建與移植評估。'],
      ],
    ),
    callout(
      'clinical',
      '案例整合',
      p('這類病人最需要的不是更多「保肝藥」想像，而是系統性管理：腹水一定要抽、HE 要找誘因、HBV 要控制、酒精要介入、移植路徑要提早討論。'),
    ),
  ),
);

digestiveChapters.ch20 = chapter(
  '胰臟炎 (Pancreatitis)',
  section(
    'anatomy-physiology',
    '正常解剖與生理',
    lead('胰臟 (Pancreas) 同時是外分泌與內分泌器官。外分泌腺泡細胞 (Acinar cell) 產生消化酵素前驅物，導管細胞分泌 bicarbonate-rich fluid，把酵素送往十二指腸；內分泌胰島 (Islets) 則負責 insulin、glucagon 等荷爾蒙。正常情況下，蛋白酶以前驅物型態被包裝、隔離與排出，避免在胰內自行被活化。'),
    p('胰臟位於後腹腔，前方鄰近胃與十二指腸，後方接近大血管與神經叢。這個位置解釋了胰臟炎為何常造成上腹劇痛向背部放射，也解釋了為何胰臟周邊發炎與液體外滲會很快影響腸道、循環與呼吸。'),
    tags(['Acinar cell', 'Trypsinogen', 'Retroperitoneum', 'Biliary obstruction', 'Pancreatic enzymes']),
    digestiveViewer('pancreatitis-inflammation'),
    diagram('pancreatitis-enzyme-map'),
    cards([
      { title: '腺泡細胞 (Acinar cell)', body: '胰酶前驅物的主要來源。當細胞受損與前驅物提早活化，局部自體消化就啟動。' },
      { title: '胰管與膽道匯流', body: '壺腹部解剖讓膽石容易改寫胰液排出壓力，這也是 gallstone pancreatitis 常見的原因。' },
      { title: '後腹腔位置', body: '胰臟不是自由漂浮在腹腔中央，因此發炎、壞死與液體外滲常沿後腹腔間隙擴散。' },
      { title: '外分泌與內分泌連動', body: '反覆胰臟炎可逐步損傷外分泌消化與內分泌血糖調控，最後形成 chronic pancreatitis 與 diabetes。' },
    ]),
    formula('酵素活化核心', 'Trypsinogen -> Trypsin -> activation of protease, lipase, phospholipase cascades', '急性胰臟炎的共同語言，是酵素在錯的時間點被啟動後，局部自體消化與全身發炎連鎖反應一起打開。'),
    summary('正常生理關鍵', '胰臟必須把強力酵素安全地產生、包裝、運送到十二指腸；一旦這條安全鏈斷裂，疼痛與發炎就會迅速放大。', [
      '胰酶正常應在腸腔而非胰內活化。',
      '膽道與胰道解剖高度相依。',
      '後腹腔位置讓局部病灶容易變成全身問題。',
    ]),
  ),
  section(
    'symptoms',
    '常見主訴與症狀',
    lead('急性胰臟炎典型主訴是突然發作的持續性上腹痛，常向背部放射，合併噁心、嘔吐、食慾差與動一下更痛。病人常描述「不像一般胃痛，是整片上腹像被勒住」；若病情嚴重，還會出現心跳快、低血壓、呼吸喘、腹脹與少尿。'),
    p('慢性胰臟炎則常以反覆腹痛、體重下降、脂肪便 (Steatorrhea)、腹脹與新發糖尿病表現。有些病人以為只是消化不好或腸胃虛弱，直到營養缺乏、油便與血糖失控才被看出來。'),
    table(
      ['情境', '常見主訴', '臨床意義', '常見誤判'],
      [
        ['急性胰臟炎', '上腹痛向背放射、噁心嘔吐', '典型急性發炎表現', '胃炎、膽囊炎、單純腸胃炎'],
        ['重症警訊', '呼吸喘、血壓低、意識變差、尿少', '可能已進入 SIRS 或器官衰竭', '只是因為太痛或沒吃東西'],
        ['慢性胰臟炎', '反覆腹痛、油便、體重下降', '外分泌不足與慢性纖維化線索', '功能性消化不良'],
        ['高 TG 相關', '急性腹痛伴乳糜血清或糖脂異常', '高 triglyceride 可直接誘發 pancreatitis', '只有血脂高跟腹痛無關'],
      ],
    ),
    callout(
      'clinical',
      '真實場景',
      p('39 歲女性，前一天聚餐後開始劇烈上腹痛，一直吐，躺平更難受。急診發現 lipase 顯著升高、ALT 同步上升，超音波看到膽結石。這時如果只把病人當成單純膽囊炎或胃炎，就會錯過 gallstone pancreatitis 後續可能需要的膽道評估。'),
    ),
    takeawayList([
      { title: '痛型很有特色', body: '持續性上腹痛向背放射，是急性胰臟炎高價值線索。' },
      { title: '重症看器官', body: '是否呼吸喘、尿量少、血壓掉，比單純 lipase 數字更能決定嚴重度。' },
      { title: '慢性病程常被低估', body: '脂肪便、糖尿病與體重下降常代表外分泌與內分泌都在受損。' },
    ]),
  ),
  section(
    'pathophysiology',
    '重要疾病機轉',
    lead('急性胰臟炎最常見病因是膽石與酒精，其次包括高三酸甘油酯、高血鈣、ERCP 後、藥物、外傷與少數遺傳性因素。雖然起點不同，但最後多匯流到 trypsinogen 提早活化、腺泡細胞傷害、局部脂肪壞死與全身發炎。'),
    p('膽石讓壺腹部壓力改變與膽胰流出受阻；酒精則透過直接毒性、分泌改變與蛋白栓子形成傷害腺泡與導管系統。當局部發炎與細胞壞死放大，病人會進入 SIRS、毛細血管滲漏、第三間隙流失、AKI、ARDS 與循環不穩。到了後期，壞死若被感染，病程又會進入另一個複雜階段。'),
    diagram('pancreatitis-enzyme-map'),
    cards([
      { title: 'Gallstone pancreatitis', body: 'ALT 明顯上升與膽道擴張線索常支持膽石機轉，但是否需要 ERCP 要看 cholangitis 或持續阻塞證據。' },
      { title: 'Hypertriglyceridemia', body: '高 TG 尤其超過高風險區間時，脂肪酸毒性與微循環傷害會讓胰臟炎發生。' },
      { title: 'Sterile vs infected necrosis', body: '壞死不等於感染。早期預防性抗生素無法改善大多數無菌壞死病程。' },
      { title: '慢性化後果', body: '反覆發作可走向纖維化、鈣化、胰管變形、外分泌不足與胰臟性糖尿病。' },
    ], 'comparison-grid'),
    misconceptionList([
      { myth: '胰臟炎就是胰臟被細菌感染。', correction: '大多數急性胰臟炎起始是無菌性發炎與酵素自體消化，不是早期感染。' },
      { myth: 'lipase 愈高病情愈重。', correction: 'lipase 有助診斷，但嚴重度主要看器官衰竭、持續時間與併發症。' },
    ]),
  ),
  section(
    'diagnosis',
    '診斷思路與鑑別診斷',
    lead('急性胰臟炎經典診斷原則是三選二：典型腹痛、lipase 或 amylase 超過正常上限三倍、影像符合。很多病人只靠前兩項就可確立，不需要一開始就把 CT 當成入場券。'),
    table(
      ['步驟', '要回答的問題', '常用工具', '常見陷阱'],
      [
        ['先確認症候群', '痛型與時間軸是否典型', '病史、理學、生命徵象', '上腹痛一律當胃病'],
        ['做出診斷', '是否符合 2/3 criteria', 'lipase、amylase、必要時影像', '過早做 CT 卻沒有改變初始處置'],
        ['找病因', '膽石、酒精、TG、ERCP、藥物、Ca', 'LFT、TG、Ca、超音波、病史', '只要有酒精史就不再想其他病因'],
        ['分嚴重度', '有無持續性器官衰竭與局部併發症', 'BUN、Cr、Hct、氧合、臨床監測', '以單一分數取代床邊動態評估'],
      ],
    ),
    list([
      'Lipase 較 amylase 更敏感且持續較久，但晚到病人也可能已開始下降。',
      '腹部超音波是找 gallstone 機轉的高價值起點；CT 多在診斷不確定、病情惡化或需要看壞死 / 併發症時較有意義。',
      '膽管炎、持續性膽道阻塞與黃疸才是考慮早期 ERCP 的關鍵，而不是每個 gallstone pancreatitis 都做。'
    ]),
    callout(
      'warning',
      '高價值鑑別診斷',
      p('上腹劇痛也可能是穿孔性潰瘍、膽囊炎、腸阻塞、腸缺血、ACS 或主動脈病變。若痛型、生命徵象或檢查不吻合，不要因為 lipase 稍高就停下來。'),
    ),
  ),
  section(
    'investigations',
    '關鍵檢查與判讀',
    lead('胰臟炎檢查策略的重點，是在早期抓出嚴重度與病因，在中期辨認壞死與併發症，在慢性期則評估外分泌與內分泌後果。'),
    table(
      ['檢查', '用途', '判讀重點'],
      [
        ['Lipase / Amylase', '支持診斷', 'lipase 較常用，但數值高低不等於重症程度'],
        ['BMP、BUN、Cr、Hct', '看 volume status、腎功能與 early severity', 'BUN 持續上升與尿量下降是壞訊號'],
        ['LFT、bilirubin、ALT', '看膽石或膽道阻塞線索', 'ALT 顯著上升時，biliary cause 機率提高'],
        ['腹部超音波', '找膽結石與膽道擴張', '急性期常是第一線病因檢查'],
        ['CT / MRI', '看壞死、液體集合與併發症', '通常在 48 到 72 小時後資訊量更高，除非診斷不確定或急轉壞'],
        ['糞便脂肪、營養與血糖評估', '慢性期看外分泌不足與 diabetes', 'chronic pancreatitis 管理不能只看疼痛'],
      ],
    ),
    spotlight('影像常見誤區', '太早做 CT 可能只得到「有發炎」這種不改變處置的資訊。對典型 acute pancreatitis，早期最重要的仍是病因與器官功能監測。'),
  ),
  section(
    'treatment',
    '第一線與第二線治療',
    lead('胰臟炎治療的核心是早期支持性照護與病因處理。現代策略強調適度液體復甦、充分止痛、早期 enteral nutrition 與動態監測，而不是盲目大量補液與例行性抗生素。'),
    table(
      ['情境', '第一線策略', '常見配合', '關鍵提醒'],
      [
        ['急性期初始', '適度輸液、止痛、止吐、監測器官功能', '多以平衡型晶體液為主', '過度補液會增加肺水腫與腹腔壓風險'],
        ['膽石性胰臟炎', '超音波找病因，必要時處理膽道', '若合併 cholangitis 或持續阻塞則考慮 ERCP', '不是每個 gallstone pancreatitis 都需立即 ERCP'],
        ['營養支持', '病人可耐受時盡早 enteral feeding', '口服低脂或 tube feeding 視情況', '長期禁食不再是標準作法'],
        ['壞死 / 感染', '有感染證據才用抗生素，必要時 step-up intervention', '抗生素、引流、介入或手術視情況', '預防性抗生素對無菌壞死無常規角色'],
        ['慢性胰臟炎', '戒酒戒菸、疼痛管理、酵素補充、血糖與營養管理', 'pancreatic enzyme replacement、糖尿病照護', '反覆急診止痛不是長期解方'],
      ],
    ),
    cards([
      { title: '止痛不是附屬項', body: '急性胰臟炎痛感強烈，足量且安全的 analgesia 是核心治療，不應因舊式迷思而不足止痛。' },
      { title: 'Enteral nutrition', body: '腸道餵食可維持腸黏膜完整、降低菌移位與感染風險，是現代照護重要進步。' },
      { title: '病因介入', body: '酒精性病人若只治這一次急性期卻沒有成癮介入，復發風險通常很高。' },
      { title: '慢性後果', body: '外分泌不足造成脂肪便與體重下降，內分泌受損造成糖尿病，兩者都需要被主動追蹤。' },
    ], 'comparison-grid'),
    callout(
      'success',
      '常被低估的高價值處置',
      p('病因盤點、止痛、動態評估尿量與 BUN、早期口服或 enteral nutrition，比急著做高階影像更常真正改變病程。'),
    ),
  ),
  section(
    'pharmacology',
    '常用藥物機轉、副作用、交互作用',
    lead('胰臟炎藥理不是圍著某一支「治胰臟炎藥」轉，而是圍繞支持性照護、病因控制與慢性後果管理。'),
    table(
      ['類別', '代表藥物', '角色', '重要提醒'],
      [
        ['止痛藥', 'Hydromorphone、Morphine 等 opioid', '急性期控制疼痛與減少呼吸做功', '重點是足量、安全與持續 reassessment，而不是避免使用'],
        ['止吐藥', 'Ondansetron、Metoclopramide', '降低噁心嘔吐，協助進食恢復', '要回頭找真正病因，不能只壓症狀'],
        ['胰酶補充', 'Pancrelipase', '慢性期改善脂肪吸收與部分餐後不適', '需和飲食與脂溶性維生素評估一起看'],
        ['胰臟性糖尿病藥物', '常需要 insulin', '處理內分泌受損後的血糖失衡', '營養攝取波動與低血糖風險需個別化'],
        ['降脂藥', 'Fibrate 等', '處理高 TG 後續再發風險', '急性期不是只靠口服降脂藥就能解決'],
      ],
    ),
    formula('Stool fat reminder', 'Steatorrhea + weight loss + fat-soluble vitamin deficiency -> think exocrine pancreatic insufficiency', '慢性胰臟炎後的藥理目標，不只是止痛，還包括把消化與營養功能補回來。'),
    callout(
      'danger',
      '常見用藥誤區',
      p('把預防性抗生素當 routine 是舊迷思。另一個高風險錯誤是病人明顯外分泌不足卻只反覆開止瀉藥，而沒有思考 pancreatic enzyme replacement。'),
    ),
  ),
  section(
    'special-populations',
    '特殊族群考量',
    lead('不同族群的胰臟炎病因與風險很不一樣，因此不能用一套 template 應付全部。'),
    cards([
      { title: '妊娠', body: '膽石與高 TG 是重要病因來源，影像與介入選擇要同時考慮胎兒安全。' },
      { title: '高 TG 病人', body: '急性期與長期再發預防都需要處理代謝底層，不能只治完腹痛。' },
      { title: '老年與多重共病', body: '器官儲備差使 fluid strategy、止痛與呼吸監測更需要精細。' },
      { title: '兒科與遺傳性病因', body: '外傷、藥物、遺傳通道或酵素異常比例較成人不同，病因盤點要調整。' },
    ]),
  ),
  section(
    'clinical-pitfalls',
    '常見臨床陷阱',
    lead('胰臟炎常見陷阱，多半發生在「太早定論」或「太晚看見重症」。'),
    misconceptionList([
      { myth: 'lipase 很高就一定很危險。', correction: '診斷價值大於預後價值。真正嚴重度要看器官衰竭、尿量、氧合與病程變化。' },
      { myth: '急性胰臟炎一定要完全禁食很久。', correction: '現代照護強調在可耐受情況下早期 enteral nutrition，而不是例行性長期 NPO。' },
      { myth: '胰臟炎都要先打抗生素。', correction: '大多數早期急性胰臟炎是無菌性發炎。抗生素只在感染證據或特定情境才有價值。' },
    ]),
  ),
  section(
    'case-discussion',
    'Case-based discussion',
    lead('病例：45 歲男性，週末飲酒後突發上腹劇痛向背部放射，反覆嘔吐，心跳 118 次/分，BUN 持續上升。Lipase 顯著升高，超音波未見明顯膽結石，抽血 TG 980 mg/dL。'),
    table(
      ['臨床問題', '思考方向'],
      [
        ['病因最可能是什麼？', '高 TG 已達高風險區間，加上酒精暴露，要把 hypertriglyceridemia 與 alcohol 都納入。'],
        ['重症風險看哪裡？', '尿量、BUN、血壓、氧合與器官衰竭，比單看 lipase 更重要。'],
        ['長期管理要補哪些？', '酒精介入、降脂策略、營養與必要時血糖監測，否則高復發風險。'],
      ],
    ),
    callout(
      'clinical',
      '案例整合',
      p('這位病人真正需要的不是「胰臟指數降下來」而已，而是病因控制與重症監測同步進行。若只治完急性期痛感，下一次復發很可能更重。'),
    ),
  ),
);

digestiveChapters.ch21 = chapter(
  '便秘、腹瀉與常見 GI 症狀處理',
  section(
    'anatomy-physiology',
    '正常解剖與生理',
    lead('便秘與腹瀉看似相反，但本質上都在問腸道如何平衡蠕動 (Motility)、分泌與吸收 (Secretion and absorption)、菌相代謝、神經內分泌調控與出口協調。正常大腸每天要處理大量液體，只留下少量水分形成成形糞便；任何讓水被拉進腔內、吸收失敗、發炎滲出或推進過快的因素，都會造成腹瀉。反過來，若推進過慢、糞便停留太久、出口協調失常或含水量過低，就容易走向便秘。'),
    p('腸神經系統 (Enteric nervous system)、自主神經、腸道菌相與多種荷爾蒙一起參與調控，因此 GI symptom management 不能只靠一句「多喝水、多纖維」。真正的關鍵，是先分機轉與危險度，再決定是否能安全做 symptom relief。'),
    tags(['Bowel motility', 'Secretion', 'Osmotic gap', 'Pelvic floor', 'Alarm features']),
    digestiveViewer('bowel-motility'),
    diagram('bowel-symptom-triage'),
    cards([
      { title: '大腸水分回收', body: '大腸把大量液體回收成少量成形糞便，因此任何分泌增加或吸收下降都可迅速造成腹瀉。' },
      { title: '蠕動與停留時間', body: '停留愈久，水分回收愈多，糞便愈硬；停留愈短，便便愈稀。這是便秘與腹瀉共用的時間軸。' },
      { title: '出口協調 (Defecatory coordination)', body: '不是所有便秘都來自腸子太慢，骨盆底協調差與糞便出口障礙同樣常見。' },
      { title: '藥物影響', body: '瀉劑、抗生素、metformin、opioid、鐵劑、抗膽鹼、鎂鹽與草藥都會把病人推向不同 GI 症狀。' },
    ]),
    formula('Stool osmotic gap', '290 - 2 x (stool Na + stool K)', '對慢性腹瀉分類時有概念價值。高 gap 較支持滲透性腹瀉，低 gap 較支持分泌性腹瀉，但臨床上更重要的是病史與警訊。'),
    summary('生理重點', '便秘與腹瀉不是互斥考題，而是同一條腸道功能軸的不同失衡方向。', [
      '先分機轉，再分危險度。',
      '藥物與糞便嵌塞是高頻隱形原因。',
      '紅旗常比對症藥選擇更重要。',
    ]),
  ),
  section(
    'symptoms',
    '常見主訴與症狀',
    lead('腹瀉病史要問頻率、量、夜間是否發作、是否有血、發燒、腹痛、旅遊、抗生素、食物與體重變化。便秘病史則要問排便次數、糞便型態 (Bristol stool form)、是否費力、排不乾淨、需不需要手指協助、是否有腹脹與藥物暴露。'),
    p('常見 GI symptom management 還包括噁心、嘔吐、腹脹、消化不良與腸鳴改變，但真正優先的仍是抓 red flags。年長新發便秘、血便、黑便、夜間痛醒、體重下降、反覆脫水、嚴重腹脹與腹膜刺激都不屬於「先開對症藥再說」的範圍。'),
    table(
      ['症狀型態', '高價值線索', '可能方向', '常見誤區'],
      [
        ['急性 watery diarrhea', '旅遊、食物、群聚、抗生素', '感染性或藥物性', '所有拉肚子都先止瀉'],
        ['慢性夜間腹瀉', '睡眠中也被叫醒、體重掉', '發炎、分泌性或吸收不良', '腸躁症'],
        ['便秘伴細便、血便、體重下降', '年長新發與 alarm features', '結直腸病灶或結構性問題', '只是纖維吃太少'],
        ['腹瀉與便秘交替', 'opioid、糞便嵌塞、 IBS、菌相改變', '可同時存在出口與上游問題', '只挑其中一邊治'],
      ],
    ),
    callout(
      'clinical',
      '真實場景',
      p('82 歲女性長期吃 opioid 止痛，最近一直說自己拉肚子，家屬不停幫她買止瀉藥。到院後腹部鼓脹、直腸指診摸到硬糞塊，原來是 fecal impaction 造成 overflow diarrhea。這是 GI symptom management 最常見也最容易被誤解的場景之一。'),
    ),
    takeawayList([
      { title: '症狀時間軸最重要', body: '急性與慢性、白天與夜間、飯前與飯後、抗生素前後都會直接改變鑑別方向。' },
      { title: '排便感受不能省略', body: '便秘不只是「幾天一次」，還包括費力、出口阻力與排不乾淨感。' },
      { title: '年長新發症狀要保守', body: '新發便秘、血便與體重下降在高齡者一定要提高結構性病灶警覺。' },
    ]),
  ),
  section(
    'pathophysiology',
    '重要疾病機轉',
    lead('腹瀉最實用的分法是滲透性、分泌性、發炎性、脂肪吸收不良與功能性。滲透性腹瀉來自不能吸收的溶質把水拉進腸腔；分泌性腹瀉則是腸道主動分泌水與電解質；發炎性腹瀉常伴血便與黏膜傷害；脂肪吸收不良則帶來油便與體重下降。'),
    p('便秘則可從慢傳輸型、正常傳輸但糞便硬、出口協調障礙、藥物誘發與糞便嵌塞來理解。臨床上最容易忽略的是藥物與出口問題，例如 opioid、anticholinergic、鐵劑、鈣、老年臥床與骨盆底功能失調。'),
    diagram('bowel-symptom-triage'),
    cards([
      { title: 'C. difficile 風險', body: '近期抗生素、住院、PPI、年長與免疫抑制會改寫腹瀉的風險語言，這時候不要先急著讓腸子停下來。' },
      { title: '糞便嵌塞', body: '大量硬糞塊卡在直腸與遠端結腸時，上方液體糞便會繞過去造成假性腹瀉。' },
      { title: 'Bile acid diarrhea', body: '膽汁酸回收失衡也是慢性水瀉高頻原因之一，尤其在迴腸病變或切除後。' },
      { title: 'IBS 與功能性症狀', body: '功能性腸症狀很常見，但前提是已排除 alarm features 與發炎 / 感染線索。' },
    ], 'comparison-grid'),
    misconceptionList([
      { myth: '腹瀉就是腸胃炎。', correction: '感染常見，但藥物、IBD、內分泌、膽汁酸、吸收不良與癌症都可能表現為腹瀉。' },
      { myth: '便秘只要一直吃纖維就會好。', correction: '若是出口協調障礙、糞便嵌塞或明顯慢傳輸，盲目加纖維反而可能更脹、更不舒服。' },
    ]),
  ),
  section(
    'diagnosis',
    '診斷思路與鑑別診斷',
    lead('GI symptom management 最成熟的做法，是先用紅旗與危險度分流，再做機轉分類，最後才決定需不需要檢查與哪一種對症治療最安全。'),
    table(
      ['步驟', '要回答的問題', '常用工具', '常見陷阱'],
      [
        ['先抓紅旗', '有無血便、黑便、脫水、體重下降、夜間症狀、腹膜刺激、年長新發', '病史、理學、生命徵象', '還沒分流就先給止瀉或瀉藥'],
        ['藥物盤點', '是否有 antibiotic、opioid、metformin、Mg、PPI、草藥', '完整 medication review', '只看處方、不問成藥與保健品'],
        ['機轉分類', '滲透、分泌、發炎、吸收不良或出口問題', '病史、糞便型態、基本檢驗', '只憑病人說稀便或硬便就下定論'],
        ['決定檢查', '哪些病人需要 stool test、calprotectin、colonoscopy 或影像', '根據年齡與紅旗個別化', '所有人都做全套或所有人都不做'],
      ],
    ),
    list([
      '慢性腹瀉若合併夜間症狀、貧血、體重下降或血便，要優先排發炎與結構性病變。',
      '便秘病人若年長新發、合併血便、體重下降或家族史，要更早進入 colon evaluation。',
      '直腸指診在便秘與 overflow diarrhea 的辨識價值極高，卻常被省略。',
    ]),
    callout(
      'warning',
      '容易漏掉的鑑別診斷',
      p('C. difficile、IBD、結直腸癌、缺血性腸炎、腸阻塞與糞便嵌塞，都是常見卻不能先用 symptom relief 掩蓋的問題。'),
    ),
  ),
  section(
    'investigations',
    '關鍵檢查與判讀',
    lead('常見 GI 症狀處理不代表完全不檢查，而是要知道哪些人只需門診支持治療，哪些人需要更積極的化驗、糞便檢查或內視鏡。'),
    table(
      ['檢查', '用途', '判讀重點'],
      [
        ['CBC、BMP、CRP', '看貧血、脫水、感染與發炎程度', '腹瀉病人若伴 AKI 或低 K，處置層級要提高'],
        ['Stool pathogen / C. difficile', '急性感染性腹瀉或高風險場景', '不是所有輕微腹瀉都需要，但高風險不能漏'],
        ['Fecal calprotectin', '區分發炎性與功能性腹瀉', '高值支持腸道發炎，但仍需回到臨床情境'],
        ['TSH、celiac serology、營養檢查', '慢性腹瀉或便秘的系統性原因', '有系統性線索時比盲做影像更有價值'],
        ['腹部 X 光或 CT', '懷疑阻塞、嚴重嵌塞、毒性巨結腸或併發症', '不是 routine，但在高風險場景非常重要'],
        ['Colonoscopy', '年長新發症狀、血便、貧血、體重下降或慢性炎症線索', '結構性病灶與 IBD 不能靠對症藥掩蓋'],
      ],
    ),
    spotlight('檢查邏輯', '急性輕症腹瀉多數不需大量檢查；但年長新發便秘、血便、反覆夜間腹瀉與體重下降，若沒有及時做後續評估，代價可能很高。'),
  ),
  section(
    'treatment',
    '第一線與第二線治療',
    lead('GI symptom management 的治療價值，不在藥物多厲害，而在選對情境。止瀉藥、瀉藥、止吐藥與促進腸動藥都各有位置，但前提是已先排除不能只做對症的危險病人。'),
    table(
      ['情境', '第一線策略', '常見藥物 / 介入', '關鍵提醒'],
      [
        ['無血便、無高燒的急性腹瀉', '補水與必要時短期 symptom relief', 'ORS、loperamide、bismuth subsalicylate', '懷疑 invasive diarrhea 或 C. difficile 時避免盲用止瀉'],
        ['慢性便秘', '生活型態、纖維與 osmotic laxative 為基底', 'PEG、纖維、適量水分', '糞便嵌塞與出口障礙要先排除'],
        ['便秘基底治療不足', '再加 stimulant 或處方藥', 'senna、bisacodyl、lubiprostone、linaclotide、plecanatide', '藥物不是愈多愈好，關鍵是根據機轉分層'],
        ['Opioid-induced constipation', '針對機轉處理', 'PEG + stimulant，必要時 PAMORA 如 naloxegol / naldemedine', '不能只怪病人水喝不夠'],
        ['噁心 / 嘔吐', '補液、找病因、必要時對症', 'ondansetron、metoclopramide 視情境', '反覆嘔吐要先排阻塞、妊娠、顱內與代謝問題'],
      ],
    ),
    cards([
      { title: 'ORS 的價值', body: '急性腹瀉真正高價值的第一線常是口服補液，而不是抗生素。能不能補回水與電解質，決定病人是否需要升級照護。' },
      { title: 'PEG', body: '對慢性便秘常是高效又相對安全的基底選擇，尤其比反覆灌腸或隨意混用刺激性瀉藥更可控。' },
      { title: 'Bismuth 與 loperamide', body: '適合特定無血便、無高燒、無重症線索的急性腹瀉；前提是先確定不是 invasive process。' },
      { title: 'PAMORA', body: '對 opioid-induced constipation 很有邏輯，因為它針對的是外周 μ-opioid receptor，而不是盲目一直加瀉藥。' },
    ], 'comparison-grid'),
    callout(
      'success',
      '實務上最有價值的順序',
      p('先看紅旗，再做 hydration，再看藥物盤點，最後才選對症藥。這個順序看似保守，其實最能避免把危險病人用 symptom relief 蓋掉。'),
    ),
  ),
  section(
    'pharmacology',
    '常用藥物機轉、副作用、交互作用',
    lead('常見 GI symptom 藥理要用「何時安全、何時危險」來記，而不是把藥分成便秘藥或腹瀉藥就結束。'),
    table(
      ['類別', '代表藥物', '主要機轉', '重要提醒'],
      [
        ['止瀉藥', 'Loperamide', '周邊 μ-opioid agonist，減慢腸蠕動', '有血便、高燒、疑似 C. difficile 或毒性巨結腸時避免自行濫用'],
        ['滲透性瀉劑', 'Polyethylene glycol、magnesium oxide', '增加腸腔水分', '腎功能差者使用鎂鹽需更小心'],
        ['刺激性瀉劑', 'Senna、Bisacodyl', '促進結腸收縮與分泌', '短中期常有效，但要回到機轉與出口問題一起看'],
        ['腸液分泌調節', 'Lubiprostone、Linaclotide、Plecanatide', '增加腸液分泌與推進', '適合特定慢性便秘 / IBS-C，不是急性便秘萬用藥'],
        ['PAMORA', 'Naloxegol、Naldemedine', '拮抗外周 opioid 造成的腸蠕動抑制', '對 opioid-induced constipation 特別有邏輯'],
        ['止吐藥', 'Ondansetron、Metoclopramide', '分別切 5-HT3 或 dopamine / prokinetic 路徑', 'QT、錐體外症狀與腸阻塞風險需個別評估'],
      ],
    ),
    formula('Loperamide 分子式', 'C29H33ClN2O2', 'loperamide 本質上是在外周降低腸道推進速度。它很實用，但前提是你已確認這位病人安全適合讓腸子慢下來。'),
    callout(
      'danger',
      '高風險誤用',
      p('血便、高燒、嚴重腹脹或疑似 C. difficile 病人若先用 loperamide 把腸子停住，可能延誤真正危險的炎症或感染。相反地，長期 opioid 造成的便秘若只一直加纖維，也常效果很差。'),
    ),
  ),
  section(
    'special-populations',
    '特殊族群考量',
    lead('GI symptom 處理在不同族群裡會有完全不同的風險地圖，因此不能只照一般成人經驗處理。'),
    cards([
      { title: '高齡病人', body: '脫水、糞便嵌塞、譫妄、跌倒與藥物造成的便秘 / 腹瀉都更常見，直腸檢查與藥物盤點價值很高。' },
      { title: '兒童', body: '腹瀉重點更偏向脫水與補液，便秘則常和排便恐懼、訓練與功能性問題交纏。' },
      { title: '妊娠', body: '便秘、噁心與逆流都常見，對症藥物選擇要兼顧母胎安全與結構性病因排除。' },
      { title: '免疫低下或 IBD 族群', body: '腹瀉不能只當一般感染，機會性感染、藥物與原病 flare 都要同時考慮。' },
    ]),
  ),
  section(
    'clinical-pitfalls',
    '常見臨床陷阱',
    lead('常見 GI 症狀處理最容易犯的錯，是因為症狀太常見，就把危險度也一起想低了。'),
    misconceptionList([
      { myth: '沒有血便的腹瀉通常不用擔心。', correction: '脫水、電解質異常、年長、免疫低下與藥物相關腹瀉同樣可能很危險。' },
      { myth: '便秘就是多吃纖維、多喝水。', correction: '這是基礎，但對 opioid-induced constipation、出口障礙與糞便嵌塞遠遠不夠。' },
      { myth: '拉肚子就先止，便秘就先瀉。', correction: '真正成熟的 GI symptom 管理，永遠先分流 red flags，再決定能不能安全做 symptom relief。' },
    ]),
  ),
  section(
    'case-discussion',
    'Case-based discussion',
    lead('病例：77 歲男性，長期使用 oxycodone 與鐵劑，最近 5 天一直覺得肚子脹、排便不乾淨，但昨晚開始卻反覆解稀便。家屬以為他腸胃炎，到院前已讓他吃了數次止瀉藥。'),
    table(
      ['臨床問題', '思考方向'],
      [
        ['為什麼便秘的人會腹瀉？', '要高度懷疑 fecal impaction 造成 overflow diarrhea。'],
        ['第一個高價值檢查是什麼？', '腹部評估與直腸指診往往比先抽一大堆慢性腹瀉檢查更快改變處置。'],
        ['治療邏輯怎麼走？', '先解除嵌塞與修正藥物，再建立後續便秘基底策略，不能再單純止瀉。'],
      ],
    ),
    callout(
      'clinical',
      '案例整合',
      p('這類病人提醒我們，GI symptom management 最重要的不是藥架上有多少藥，而是你有沒有先看懂症狀背後的機轉。'),
    ),
    summary('案例結論', '便秘與腹瀉處理看似日常，其實最考驗臨床基本功，因為真正危險的病往往也藏在這些最常見的抱怨裡。', [
      '先抓紅旗，再做對症治療。',
      '藥物盤點與直腸檢查價值很高。',
      '症狀管理的前提是先確認這樣做不會掩蓋危險病因。',
    ]),
  ),
);
