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
  pulmonaryViewer,
  section,
  spotlight,
  summary,
  table,
  tags,
  takeawayList,
} from './shared.js';

export const respiratoryChapters: Record<string, ChapterContent> = {};

respiratoryChapters.ch07 = chapter(
  '氣喘 (Asthma)',
  section(
    'anatomy-physiology',
    '正常解剖與生理',
    lead('氣喘 (Asthma) 的核心不是單純「支氣管比較敏感」，而是氣道上皮 (Airway epithelium)、平滑肌 (Airway smooth muscle)、黏液腺 (Mucous gland)、樹突細胞 (Dendritic cell)、嗜酸性球 (Eosinophil) 與神經反射長期互相放大後，形成可逆但反覆發作的氣流受限。正常情況下，鼻腔、咽喉、氣管、支氣管與細支氣管共同負責把空氣導向肺泡；纖毛與黏液構成黏液纖毛清除系統 (Mucociliary clearance)，把顆粒與病原往上帶走。'),
    p('肺泡 (Alveolus) 本身不負責支氣管收縮，它更像是氣體交換終端；真正讓病人喘鳴、呼氣延長、胸悶與夜咳的結構，多半在中大型支氣管到小氣道。平滑肌收縮、黏膜水腫與黏液塞栓三者同時發生時，氣道半徑一縮小，氣流阻力會因 Poiseuille 關係急遽上升，所以病人常在短時間內由「只是有點喘」變成說話斷句、胸廓過度充氣、甚至出現 silent chest。'),
    tags(['Type 2 inflammation', 'Airway hyperresponsiveness', 'Mucociliary clearance', 'IgE', 'Eosinophil']),
    pulmonaryViewer('asthma-airway'),
    diagram('resp-airway-defense'),
    cards([
      { title: '氣道上皮 (Airway Epithelium)', body: '它不是被動內襯，而是會感測病毒、過敏原、污染物與冷空氣，並釋放 TSLP、IL-33、IL-25 等 alarmin，主動驅動發炎。' },
      { title: '平滑肌 (Smooth Muscle)', body: '正常時協助調整氣道張力；在氣喘則因高反應性 (Hyperresponsiveness) 被同樣程度的刺激放大收縮，造成氣流受限。' },
      { title: '黏液與纖毛 (Mucus-Cilia Unit)', body: '黏液太少無法捕捉顆粒，太多又會形成栓塞；病毒感染、脫水與慢性發炎會讓這個系統效率大幅下降。' },
      { title: '免疫微環境 (Immune Microenvironment)', body: 'Th2 lymphocyte、mast cell、eosinophil 與 IgE 在許多病人是主要軸線，但不是每位氣喘病人都完全一樣。' },
    ]),
    formula('白三烯路徑', 'Arachidonic acid -> 5-LOX -> LTC4 / LTD4 / LTE4', '半胱胺酸白三烯 (Cysteinyl leukotrienes) 會促進支氣管收縮、黏液分泌與血管通透性上升，這也是 leukotriene receptor antagonist 有臨床位置的原因。'),
    summary('正常生理關鍵句', '正常氣道的重點是「低阻力導氣 + 高效率清除 + 最末端肺泡交換」；氣喘則是在這套系統中加入可逆但反覆的發炎與痙攣。', [
      '症狀主要來自導氣區而非肺泡本身。',
      '同一位病人可同時存在痙攣、發炎與黏液栓塞。',
      '理解正常清除機制，才能知道為何病毒與過敏原這麼常成為誘發點。',
    ]),
  ),
  section(
    'symptoms',
    '常見主訴與症狀',
    lead('典型主訴包括喘鳴 (Wheeze)、胸悶、反覆咳嗽、夜間或清晨症狀，以及運動、冷空氣、病毒感染、塵蟎、寵物或季節變化後惡化。真正重要的不是病人有沒有說出「我有喘鳴」，而是症狀是否變動、是否和誘發因子有關、是否會自行或用藥後改善。'),
    p('臨床上最容易被低估的是 cough-variant asthma、exercise-induced bronchoconstriction，以及以夜咳或反覆上呼吸道感染後咳嗽表現的病人。相反地，急性嚴重氣喘發作時，若病人已經幾乎聽不到喘鳴，並不代表比較好，而可能是氣流太低、已接近呼吸衰竭。'),
    table(
      ['臨床情境', '常見主訴', '臨床意義', '容易誤判成什麼'],
      [
        ['門診控制不佳', '每週需要多次救急吸入器、夜間醒來、運動受限', '提示控制不佳而非單次偶發症狀', '只當成體能差或過敏'],
        ['病毒後惡化', '感冒後咳嗽拖很久、喘鳴變明顯', '病毒是常見誘發因子，常把潛在氣喘帶出來', '只開止咳藥不評估氣喘'],
        ['急性發作', '講話斷句、胸悶、坐立不安、呼吸急促', '需快速判斷是否已有重度發作', '單純焦慮或過度換氣'],
        ['運動相關', '跑步後胸悶咳嗽、運動時效率下降', '可能是運動誘發支氣管收縮', '心肺耐力差、心理因素'],
      ],
    ),
    callout(
      'clinical',
      '真實場景',
      p('21 歲女大學生，平常覺得自己只是「體質過敏」，每次期中考前、換季與打掃房間後都會夜咳。她覺得手邊 salbutamol 很有效，因此從未覺得需要控制藥。真正的問題不是她會不會喘，而是她已經進入典型的高救急藥使用模式，這種病人未來急性惡化的風險並不低。'),
    ),
    takeawayList([
      { title: '症狀有變動性', body: '氣喘的症狀常忽好忽壞，這與固定性阻塞疾病不同，是診斷線索之一。' },
      { title: '夜間與清晨特別重要', body: '夜咳、凌晨胸悶、清晨一醒來就要吸藥，通常代表發炎與控制度不佳。' },
      { title: '沒有喘鳴不等於沒有氣喘', body: '有些病人主要表現是咳嗽、運動表現下降或反覆胸悶。' },
    ]),
  ),
  section(
    'pathophysiology',
    '重要疾病機轉',
    lead('氣喘最常被描述為 Type 2-high inflammation，但臨床真正要掌握的是：不同病人被不同發炎軸線驅動，最後卻都會在氣道狹窄、可逆性阻塞與過度反應性上會合。典型過敏型氣喘由樹突細胞呈現過敏原，驅動 Th2 lymphocyte 分泌 IL-4、IL-5、IL-13，讓 IgE、mast cell 與 eosinophil 全部被拉進來。'),
    p('當 mast cell 釋放 histamine、tryptase、leukotriene，平滑肌在數分鐘內收縮；當 eosinophil 持續浸潤，氣道上皮損傷、杯狀細胞增生、基底膜下纖維化與平滑肌肥厚逐漸形成，也就是所謂的 airway remodeling。這解釋了為什麼有些病人即使平常看似不太喘，肺功能仍逐年下降。'),
    diagram('asthma-inflammatory'),
    cards([
      { title: 'Type 2 發炎', body: 'eosinophil、FeNO 升高、過敏共病與 steroid 反應佳是常見特徵，但不是診斷氣喘的唯一方式。' },
      { title: '非 Type 2 / 中性球型', body: '吸菸、肥胖、污染暴露、反覆感染與某些成人晚發型氣喘可能較不典型，也常使類固醇反應較差。' },
      { title: '氣道重塑 (Remodeling)', body: '基底膜變厚、平滑肌肥厚、杯狀細胞增生與小氣道纖維化，會讓病程逐漸不再完全可逆。' },
      { title: '誘發因子不是病因全部', body: '塵蟎、花粉、病毒與冷空氣常是火種，但真正讓火變大的是病人的易感氣道與免疫網路。' },
    ], 'comparison-grid'),
    misconceptionList([
      { myth: '氣喘就是支氣管突然痙攣一下。', correction: '急性支氣管痙攣只是其中一層。慢性上皮損傷、黏液過度分泌與結構重塑同樣重要。' },
      { myth: '只要現在不喘，就代表沒有發炎。', correction: '許多病人症狀與發炎並不同步。臨床上常見病人今天覺得還好，但其實每週反覆夜咳、肺功能下降或救急藥過量。' },
    ]),
  ),
  section(
    'diagnosis',
    '診斷思路與鑑別診斷',
    lead('診斷氣喘要同時具備兩件事：符合變動性呼吸道症狀，以及有客觀證據顯示可變動的呼氣氣流受限 (Variable expiratory airflow limitation)。只有症狀沒有客觀證據，可能把病人誤診成氣喘；只有數值變化沒有臨床脈絡，也可能把其他疾病算進來。'),
    table(
      ['步驟', '實務問題', '常見工具', '容易踩的坑'],
      [
        ['確認症狀型態', '是否反覆、夜間、遇誘發因子惡化、用 bronchodilator 改善', '病史、症狀日記', '只問有沒有喘鳴'],
        ['客觀化阻塞', '有沒有可逆性或變動性', 'Spirometry、PEF 變異、支氣管激發試驗', '症狀好那天做肺功能正常就直接排除'],
        ['找共病與替代診斷', '鼻炎、鼻竇炎、GERD、肥胖、OSA、焦慮、聲帶功能異常', '病史、理學、必要影像', '看到 inhaler 有效就停止思考'],
        ['評估嚴重度與風險', '近一年急診、口服 steroid 次數、住院史、過去插管史', '病史、用藥紀錄', '把「目前沒事」誤認成「未來風險低」'],
      ],
    ),
    list([
      '典型的 bronchodilator reversibility 為吸入支氣管擴張劑後 FEV1 增加至少 12% 且至少 200 mL，但不是所有病人每次都能測到。',
      'PEF 日間變異顯著、治療前後肺功能改善、或支氣管激發試驗陽性，都可支持診斷。',
      '若懷疑職業性氣喘 (Occupational asthma)，要問工作日與休假日症狀差異，並盡量在工作暴露前後做客觀量測。',
    ]),
    callout(
      'warning',
      '一定要記得的鑑別診斷',
      p('聲帶功能異常 (Vocal cord dysfunction / inducible laryngeal obstruction)、COPD、心衰竭、支氣管擴張、慢性咳嗽症候群、異物吸入與肺栓塞，都可能假裝成氣喘。若病人以吸氣困難、喉部緊縮或對 bronchodilator 幾乎沒有反應，必須往其他方向想。'),
    ),
  ),
  section(
    'investigations',
    '關鍵檢查與判讀',
    lead('氣喘的檢查不是做得越多越好，而是要用最低成本回答三個問題：真的有變動性阻塞嗎？發炎型態偏哪一側？有沒有其他疾病在混淆？'),
    table(
      ['檢查', '用途', '判讀重點'],
      [
        ['肺功能檢查 (Spirometry)', '確認阻塞與可逆性', '正常結果不能完全排除，尤其在無症狀時；需要結合病史與重複量測'],
        ['尖峰呼氣流速 (PEF) 日記', '捕捉日夜變化與誘發因子', '適合在資源有限或懷疑工作相關氣喘時使用'],
        ['FeNO', '反映氣道 Type 2 發炎', '高值支持 eosinophilic inflammation，但受吸菸、類固醇、鼻炎等影響'],
        ['CBC / eosinophil', '分層發炎型態與 biologic 適應症', '不是每位病人都高，但高值常有治療意義'],
        ['胸部 X 光', '排除其他病因', '通常不是用來確診氣喘，而是看是否有肺炎、氣胸、腫瘤或異物'],
        ['過敏評估', '找環境觸發因子', '陽性不等於病因全部，但對環境控制與嚴重型病人很有價值'],
      ],
    ),
    spotlight('最常見的判讀誤區', '門診最常看到的錯誤，是因為病人當天肺功能「剛好正常」，就把氣喘整個刪掉。氣喘是變動性疾病，最需要的是把數值放回時間軸與症狀脈絡。'),
  ),
  section(
    'treatment',
    '第一線與第二線治療',
    lead('現代氣喘治療的核心原則，是所有成人與青少年病人都應接受含有吸入型類固醇 (Inhaled corticosteroid, ICS) 的治療策略，而不是只靠 SABA 救急。這個原則的轉變，來自大量證據顯示單用 SABA 會提高嚴重急性惡化與死亡風險。'),
    table(
      ['治療情境', '建議策略', '常見組合', '實務提醒'],
      [
        ['輕度或新診斷', '優先使用 ICS-formoterol 作為 reliever 或讓病人每次使用 SABA 時同步吸 ICS', '低劑量 budesonide-formoterol', '重點是讓病人不是只有支氣管擴張，還有抗發炎底座'],
        ['中度持續症狀', 'MART / SMART 或固定 ICS-LABA controller', 'budesonide-formoterol 作為維持兼救急', 'formoterol 因起效快，才能安全用於 MART/SMART 架構'],
        ['控制仍差', '確認技術與依從性後升階，必要時加 LAMA、LTRA 或轉介評估 biologic', 'ICS-LABA + tiotropium', '升藥前一定要先問病人到底有沒有真的吸進去'],
        ['急性惡化', '氧氣、反覆短效 bronchodilator、早期 systemic corticosteroid，重者加 ipratropium、IV magnesium sulfate', 'salbutamol + ipratropium + prednisone', '若出現 silent chest、意識改變、PaCO2 上升，要立刻考慮呼吸衰竭'],
      ],
    ),
    cards([
      { title: '環境與共病管理', body: '鼻炎、鼻竇炎、GERD、肥胖、抽菸、OSA、職業暴露、NSAID 敏感與心理壓力都會讓控制變差。' },
      { title: '書面行動計畫 (Asthma Action Plan)', body: '真正成熟的氣喘照護不只是一支 inhaler，而是讓病人知道變差時何時加藥、何時就醫、何時算紅旗。' },
      { title: 'Biologic 時代', body: 'omalizumab、mepolizumab、reslizumab、benralizumab、dupilumab、tezepelumab 讓重度氣喘進入表型導向治療，但前提仍是基本技術與依從性先被確認。' },
      { title: '急診常見決策', body: '抗生素不是急性氣喘惡化的 routine 治療；若沒有明確感染證據，重點仍是 bronchodilation、steroid 與觀察反應。' },
    ], 'comparison-grid'),
    callout(
      'success',
      '門診高價值動作',
      p('每一次回診都重新看 inhaler technique、實際用藥頻率、夜間症狀、急診史與 trigger。這些資訊常比再開一張肺功能單更快改善控制。'),
    ),
  ),
  section(
    'pharmacology',
    '常用藥物機轉、副作用、交互作用',
    lead('氣喘藥理可以簡化成兩條主線：一條是快速把氣道打開，另一條是長期把發炎壓下來。成熟的藥理思維，不是把吸入器名字背完，而是能分清 controller 與 reliever 的角色、起效時間、主要副作用與常見錯配。'),
    table(
      ['類別', '代表藥物', '主要機轉', '重點副作用或注意事項'],
      [
        ['SABA', 'Salbutamol / Albuterol', '刺激 β2 receptor，快速支氣管擴張', '手抖、心悸、低鉀；高用量代表控制不佳，不應被當成成功'],
        ['ICS', 'Budesonide, Fluticasone', '降低 eosinophilic inflammation、黏膜水腫與過度反應性', '口腔念珠菌、聲音沙啞；用後漱口可降低局部副作用'],
        ['LABA', 'Formoterol, Salmeterol', '長效 β2 刺激，改善症狀與肺功能', '不可單獨用於氣喘控制，必須與 ICS 搭配'],
        ['LAMA', 'Tiotropium', '阻斷 muscarinic receptor，降低迷走張力', '口乾、尿滯留風險；常作為 add-on 而非第一支藥'],
        ['LTRA', 'Montelukast', '阻斷 cysteinyl leukotriene receptor', '少數病人有神經精神副作用，需衛教警覺'],
        ['Biologics', 'Omalizumab, Mepolizumab, Benralizumab, Dupilumab, Tezepelumab', '依表型切 IgE、IL-5、IL-4/13 或 TSLP 軸線', '費用、適應症、監測與注射反應需評估'],
      ],
    ),
    formula('Salbutamol 分子式', 'C13H21NO3', '典型快速起效 β2 agonist，能在數分鐘內改善支氣管收縮，但它只能處理「縮」，不能根治「炎」。'),
    formula('Budesonide 分子式', 'C25H34O6', '吸入型類固醇是現代氣喘控制的骨幹。真正關鍵不只是分子，而是病人有沒有把藥穩定送進氣道。'),
    formula('Montelukast 分子式', 'C35H36ClNO3S', 'Leukotriene receptor antagonist 對運動誘發、過敏體質或合併鼻炎的病人有時很實用，但通常不是單打獨鬥的主軸。'),
    callout(
      'danger',
      '高風險藥理誤用',
      p('LABA 單獨使用在氣喘是危險訊號；口服類固醇雖然在急性惡化很重要，但長期反覆使用代表基礎控制策略失敗，必須回頭檢查依從性、技術、trigger 與表型。'),
    ),
  ),
  section(
    'special-populations',
    '特殊族群考量',
    lead('特殊族群的氣喘管理，重點不是「有沒有氣喘」，而是病人的誘發因子、風險與治療可行性都不同。'),
    cards([
      { title: '兒童與青少年', body: '症狀常以夜咳、活動力下降、反覆支氣管炎形式出現；吸入裝置選擇與 spacer 使用極重要。' },
      { title: '妊娠', body: '控制不佳的氣喘對母胎的風險通常高於多數標準吸入藥；不應因懷孕就任意停 ICS。' },
      { title: '肥胖與 GERD / OSA', body: '症狀感知、呼吸力學與共病會交互影響，常讓病人覺得怎麼吸藥都不夠。' },
      { title: 'AERD / NSAID 敏感', body: '若有鼻息肉、慢性鼻竇炎與吃 NSAID 後喘惡化，要主動想到 aspirin-exacerbated respiratory disease。' },
    ]),
  ),
  section(
    'clinical-pitfalls',
    '常見臨床陷阱',
    lead('氣喘最常見的臨床錯誤，不是忘了某一種進階藥，而是基本功沒有做好。'),
    misconceptionList([
      { myth: '只要救急吸入器有效，就不一定要用類固醇。', correction: '救急藥只能暫時把管子撐開，不能處理底層發炎。高頻率使用 SABA 反而代表未來急性惡化風險升高。' },
      { myth: '吸入型類固醇很可怕，能不用就不用。', correction: '在標準劑量下，ICS 的整體安全性通常遠高於反覆急性惡化與多次口服類固醇。真正高風險的是控制差卻沒有抗發炎治療。' },
      { myth: '病人說有按時吸藥，就不用再看技術。', correction: '大量控制不佳案例最後都發現是沒有實際吸進氣道、裝置不匹配、忘記持續使用，或吸完沒有漱口導致不適後自行停藥。' },
    ]),
  ),
  section(
    'case-discussion',
    'Case-based discussion',
    lead('病例：22 歲女大學生，過去一年因喘咳到急診 3 次。她說自己平常沒那麼嚴重，所以只在不舒服時吸 salbutamol。最近兩週夜間咳醒 4 次，跑樓梯會胸悶。肺功能顯示 FEV1 輕度下降，吸 bronchodilator 後改善顯著。'),
    table(
      ['臨床問題', '思路'],
      [
        ['這是輕度氣喘嗎？', '症狀可能看似輕，但高救急藥使用與反覆急診代表風險不低。嚴重度與未來風險不能只看今天症狀。'],
        ['下一步是多開一支救急藥嗎？', '不是。關鍵是建立含 ICS 的策略，最好用 ICS-formoterol reliever 或 controller 架構，同時做技術與 trigger 教育。'],
        ['為何她會一再惡化？', '常見原因包括只有 SABA、忽略夜間症狀、過敏原暴露、沒有行動計畫，以及把「平常還行」誤認成「控制良好」。'],
      ],
    ),
    callout(
      'clinical',
      '案例整合',
      p('這類病人是門診最常見也最值得早期介入的一群。只要把治療觀念從「急救」轉成「控制發炎與預防惡化」，急診次數通常就能大幅下降。'),
    ),
    summary('案例結論', '氣喘管理的本質，不是把每次喘壓下去，而是讓病人未來更少喘、更少急診、更少結構性損傷。', [
      '所有成人與青少年都應有 ICS 底座。',
      '症狀控制與未來急性惡化風險要一起評估。',
      '真正高價值的介入常是技術、依從性與 trigger 管理。',
    ]),
  ),
);

respiratoryChapters.ch08 = chapter(
  '慢性阻塞性肺病 (COPD)',
  section(
    'anatomy-physiology',
    '正常解剖與生理',
    lead('COPD 要先從正常呼吸力學開始理解。吸氣時橫膈下降、胸腔負壓增加，空氣經氣管、支氣管、小氣道進入肺泡；呼氣則主要依賴肺實質彈性回縮力 (Elastic recoil) 把空氣擠出。小氣道 (Small airways) 雖然直徑小，但在健康肺裡阻力其實不高；真正讓呼氣保持順暢的，是周圍肺泡與彈性纖維對氣道的牽拉。'),
    p('當人進入 COPD 病程，細支氣管發炎變窄、黏液增加、肺實質彈性纖維被破壞，小氣道在呼氣期容易過早塌陷，於是空氣被困在肺裡 (Air trapping)。這不只是「肺功能數值差」，而是讓病人每一次呼吸都要從更高的肺容積起步，橫膈變平、做功變大，最終形成走幾步就喘的臨床體感。'),
    tags(['Small airway disease', 'Elastic recoil', 'Air trapping', 'Hyperinflation', 'V/Q mismatch']),
    pulmonaryViewer('copd-remodeling'),
    diagram('copd-remodeling'),
    cards([
      { title: '小氣道 (Small Airways)', body: '直徑通常小於 2 mm，是 COPD 最早出問題的地方之一；症狀與肺功能變化常在大量氣道受損後才顯性。' },
      { title: '肺實質 (Parenchyma)', body: '正常肺泡壁與彈性纖維支撐呼氣時的氣道穩定。若肺泡隔破壞，呼氣期塌陷與氣體滯留就會變得明顯。' },
      { title: '黏液清除', body: '杯狀細胞增生、纖毛功能障礙與反覆感染會讓痰變黏、難咳、細菌負荷增加，進一步促進惡化。' },
      { title: '肺循環', body: '長期低氧與肺血管重塑會讓部分病人出現肺高壓與右心負擔，這是晚期 COPD 重要併發症。' },
    ]),
    formula('換氣與二氧化碳', 'PaCO2 ~ VCO2 / Alveolar ventilation', '當有效肺泡換氣下降，PaCO2 就會上升。這條關係可幫助理解為何急性惡化、疲勞與過度鎮靜會迅速讓 COPD 病人高碳酸血症惡化。'),
  ),
  section(
    'symptoms',
    '常見主訴與症狀',
    lead('COPD 最典型的故事是慢性漸進性呼吸困難、咳嗽、咳痰與活動耐受下降，但真正有價值的線索通常藏在病人生活裡：以前可以一路走去公車站，現在走到巷口就得停；以前晨間咳痰是小事，現在每天都有而且顏色變深；以前一年只有一次「感冒」，現在每隔幾個月就會喘到掛急診。'),
    p('急性惡化 (Exacerbation) 往往比平時症狀更能決定長期預後。惡化時病人會覺得呼吸急促突然加重、痰量變多、痰色轉黃綠、胸悶、低氧或精神變差。病人也可能主訴「只是感冒比較久」，但實際上已在進入呼吸衰竭。'),
    table(
      ['情境', '常見主訴', '臨床意義', '常見誤區'],
      [
        ['穩定期', '慢性咳痰、走路愈來愈喘', '代表慢性氣流受限與過度充氣', '歸因於老化或體能差'],
        ['急性惡化', '突然更喘、痰變多變濃、睡不平、說話斷句', '需評估感染、空氣污染、心衰竭、肺栓塞等誘因', '只給止咳藥與抗生素就結束'],
        ['高碳酸血症', '嗜睡、頭痛、意識差、顫動', '提示通氣不足與呼吸肌疲乏', '誤認為單純累或睡不好'],
        ['晚期病程', '體重下降、反覆住院、腿腫', '可能已有肺高壓、右心衰竭或嚴重全身耗損', '只追肺功能而忽略全身狀態'],
      ],
    ),
    callout(
      'clinical',
      '真實場景',
      p('68 歲退休司機，抽菸 45 包年，說自己只是「支氣管不好」。他平常不覺得病，但太太發現他洗澡都要停下來喘，近半年因「肺炎」住院兩次。這就是 COPD 很常見的樣子：病人習慣逐步下降的功能，直到惡化把病程一口氣推到前台。'),
    ),
  ),
  section(
    'pathophysiology',
    '重要疾病機轉',
    lead('COPD 的兩個經典形態是慢性支氣管炎 (Chronic bronchitis) 與肺氣腫 (Emphysema)，但真實病人通常不是二選一，而是兩者混合。長期菸害、粉塵、燃料煙霧與污染會引發巨噬細胞、中性球與 CD8 T cell 主導的慢性發炎；蛋白酶與抗蛋白酶平衡被打破後，肺泡隔與彈性纖維逐漸破壞。'),
    p('氣道阻塞在 COPD 裡往往比氣喘更固定，但仍可能有部分可逆成分。當痰液增加、細菌負荷上升或病毒感染介入，細支氣管更窄、呼氣時間更不夠，病人出現動態過度充氣 (Dynamic hyperinflation)；這也是急性惡化時為何病人看起來「怎麼吸都吸不進去」的原因。'),
    diagram('copd-remodeling'),
    cards([
      { title: '慢性支氣管炎軸線', body: '定義上為連續兩年以上、每年至少三個月慢性咳痰。重點是黏液高分泌與氣道壁發炎，不只是咳嗽而已。' },
      { title: '肺氣腫軸線', body: '肺泡隔破壞、表面積下降、彈性回縮力降低，使呼氣塌陷與氣體滯留更明顯。' },
      { title: '蛋白酶失衡', body: '若病人年輕、基底肺氣腫明顯或家族史強，要想到 alpha-1 antitrypsin deficiency。' },
      { title: '惡化驅動預後', body: '每一次 exacerbation 都可能讓肺功能與生活功能出現台階式下降，所以預防惡化本身就是核心治療目標。' },
    ], 'comparison-grid'),
    misconceptionList([
      { myth: 'COPD 就是抽菸的人一定會喘。', correction: '暴露是高風險因子，但表現型、發炎軸線、惡化頻率與進展速度差異極大，也有人是生質燃料或職業暴露為主。' },
      { myth: '只有 FEV1 很差才算嚴重 COPD。', correction: '症狀負荷、惡化史、體重、活動力與低氧狀態都會影響嚴重度與預後，不能只看單一數字。' },
    ]),
  ),
  section(
    'diagnosis',
    '診斷思路與鑑別診斷',
    lead('COPD 的診斷基石是暴露背景加上肺功能證據：吸入支氣管擴張劑後 FEV1/FVC 仍小於 0.70，支持持續性氣流受限。但數字永遠要放回病人脈絡，例如高齡者可能因生理老化導致比例下降，而某些症狀顯著病人又可能在早期只表現輕度變化。'),
    table(
      ['步驟', '要回答的問題', '常用工具', '常見錯誤'],
      [
        ['確認暴露與病程', '有沒有抽菸、粉塵、燃料煙霧、反覆感染等背景', '病史、職業史、家庭燃料史', '只問抽菸包年而忽略其他暴露'],
        ['確認固定性阻塞', '支氣管擴張後仍阻塞嗎', 'Spirometry', '只做急性期檢查或沒有後擴張數值'],
        ['症狀與惡化分層', '病人現在多喘、近年惡化幾次', 'CAT、mMRC、住院史', '只用肺功能分級當全部治療依據'],
        ['排除替代診斷', '會不會是氣喘、心衰竭、支氣管擴張、肺癌或 ILD', '影像、BNP、理學檢查、CT 視需要', '把所有抽菸者喘都叫 COPD'],
      ],
    ),
    list([
      'GOLD 近年更強調症狀與惡化史分組，常用 A / B / E 來決定起始藥物，而不是只盯 FEV1 百分比。',
      '若病人有過敏病史、明顯可逆性、年輕起病或 eosinophil 偏高，需思考 asthma-COPD overlap 特徵，而不是硬塞進單一盒子。',
      '所有 COPD 病人至少做一次 alpha-1 antitrypsin deficiency 評估，是高價值動作。',
    ]),
    callout(
      'warning',
      '急性惡化時的鑑別診斷',
      p('COPD 惡化不等於一定是感染。肺栓塞、心衰竭、氣胸、藥物鎮靜、心律不整與肺炎都可能讓病人突然更喘。若臨床不符合平常惡化模式，請主動往外找。'),
    ),
  ),
  section(
    'investigations',
    '關鍵檢查與判讀',
    lead('COPD 的檢查重點，是把穩定期分層與急性惡化風險兩件事都做好。'),
    table(
      ['檢查', '用途', '判讀提醒'],
      [
        ['肺功能檢查', '確認診斷與追蹤阻塞程度', '穩定期資料最有意義；急性惡化時不要強求完整肺功能'],
        ['胸部 X 光 / CT', '找肺炎、腫瘤、支氣管擴張、氣胸與肺氣腫型態', 'CT 對 emphysema、bronchiectasis 與 lung cancer 風險更敏感'],
        ['血氧與動脈血氣', '看是否低氧或高碳酸血症', '高碳酸血症合併酸血症提示通氣失代償，常改變處置層級'],
        ['CBC / eosinophil', '找感染、貧血與 ICS 反應線索', 'eosinophil 對 ICS 加藥與減少惡化風險分層有幫助'],
        ['Alpha-1 antitrypsin', '篩檢遺傳性易感', '年輕、非吸菸或基底肺病變時尤其重要'],
        ['6 分鐘步行或 BODE 思維', '看功能與預後', '病人的活動限制常比單次肺功能更接近真實生活影響'],
      ],
    ),
    spotlight('判讀上最容易漏掉的點', '若病人血氧看似還行，但呼吸工作量大、呼吸頻率高、精神開始變差，千萬不要被單一 pulse oximeter 數字安撫。氧合與通氣是兩個不同問題。'),
  ),
  section(
    'treatment',
    '第一線與第二線治療',
    lead('COPD 治療真正改變預後的核心，除了戒菸之外，就是預防惡化、改善活動能力、減少住院與處理全身影響。穩定期主軸是長效支氣管擴張劑、疫苗、肺復健、營養與活動；急性惡化時則是快速支氣管擴張、短期 systemic steroid、視情況給抗生素與呼吸支持。'),
    table(
      ['臨床情境', '建議策略', '常見組合', '關鍵提醒'],
      [
        ['起始治療 A 組', '單一長效 bronchodilator', 'LAMA 或 LABA', '選病人會用、感覺得到效益的裝置最重要'],
        ['症狀較多 B 組', '雙長效 bronchodilator 優先', 'LABA + LAMA', '對活動耐受與呼吸困難改善常比單藥更明顯'],
        ['高惡化風險 E 組', 'LABA + LAMA 起始，必要時依 eosinophil 加 ICS', 'LABA + LAMA +/- ICS', 'ICS 最有價值於 eosinophil 偏高或合併氣喘特徵者'],
        ['急性惡化', 'SABA +/- SAMA、systemic corticosteroid、視指徵給抗生素與氧氣', 'albuterol + ipratropium + prednisone', '氧氣目標常抓 88% 到 92%，重點是避免過度氧合與監測 CO2'],
        ['慢性低氧或高碳酸血症', '評估長期氧療、夜間 NIV 與肺復健', 'home oxygen、selected NIV', '不是所有喘都靠多一支 inhaler 解決'],
      ],
    ),
    cards([
      { title: '戒菸 (Smoking Cessation)', body: '仍是最能改變病程的介入。尼古丁替代、varenicline、bupropion 與行為支持應主動提供。' },
      { title: '肺復健 (Pulmonary Rehabilitation)', body: '改善活動能力、呼吸技巧、焦慮與生活品質的證據很強，卻常被低估。' },
      { title: '抗生素何時重要', body: '急性惡化若合併痰量增加、痰變膿、呼吸困難加劇，或需要機械通氣，抗生素較有價值。' },
      { title: 'ICS 不是人人需要', body: 'ICS 可減少部分病人的惡化，但也增加肺炎風險；真正要看惡化型態、eosinophil 與氣喘特徵。' },
    ], 'comparison-grid'),
    callout(
      'success',
      '急性惡化常見有效組合',
      p('短效 β2 agonist 加 ipratropium、5 天左右系統性類固醇、氧氣目標 88% 到 92%、若有指徵則加抗生素，再依酸鹼與工作量決定是否使用 NIV。這套流程能處理多數急診與住院 COPD 惡化。'),
    ),
  ),
  section(
    'pharmacology',
    '常用藥物機轉、副作用、交互作用',
    lead('COPD 藥理的成熟度，在於知道什麼時候該用 bronchodilation 為主、什麼時候 ICS 值得加入、哪些藥其實只適合特定高風險子群。'),
    table(
      ['類別', '代表藥物', '機轉', '實務重點'],
      [
        ['SABA / SAMA', 'Albuterol, Ipratropium', '快速支氣管擴張', '急性惡化與症狀救急常用，但不應取代長效策略'],
        ['LABA / LAMA', 'Formoterol, Salmeterol, Tiotropium, Umeclidinium', '降低氣道平滑肌張力與迷走神經收縮', '是穩定期骨幹；LAMA 對減少惡化常很關鍵'],
        ['ICS', 'Budesonide, Fluticasone', '抑制發炎', '在 COPD 必須看病人表型，不是所有人都該長期使用'],
        ['PDE4 inhibitor', 'Roflumilast', '抑制 PDE4，降低發炎', '較適合 chronic bronchitis phenotype 且惡化頻繁者；體重下降、腸胃不適、精神副作用需注意'],
        ['長期巨環類抗生素', 'Azithromycin', '降低部分病人的惡化率', '聽力、QT、抗藥性與 NTM 影響需評估，不是人人可用'],
      ],
    ),
    formula('Tiotropium bromide 分子式', 'C19H22BrNO4S2', 'LAMA 透過 muscarinic blockade 減少迷走神經介導的支氣管收縮，是 COPD 穩定期非常實用的骨幹藥。'),
    formula('Roflumilast 分子式', 'C17H14Cl2F2N2O3', 'PDE4 inhibitor 並非第一線吸入藥，而是惡化頻繁、慢性支氣管炎表型病人的加成選項。'),
    callout(
      'danger',
      '常見交互作用與副作用誤區',
      p('azithromycin 與多種 QT prolonging 藥、theophylline 與大量 CYP 交互作用、systemic steroid 對糖尿病與感染風險的代價，都不能忽略。不要因為病人平常就喘，就把所有副作用都算成原病。'),
    ),
  ),
  section(
    'special-populations',
    '特殊族群考量',
    lead('COPD 在不同族群的臨床樣貌差很多，特別是遺傳型、老年虛弱與慢性高碳酸血症病人。'),
    cards([
      { title: 'Alpha-1 antitrypsin deficiency', body: '年輕、非重度吸菸、基底肺氣腫或家族史強時要主動想到，否則會被當成一般 COPD 很久。' },
      { title: '老年與虛弱', body: '吸入技術、肌少症、跌倒風險、共病與照護資源會直接決定治療可行性。' },
      { title: '心血管共病', body: 'COPD 與冠心病、心衰竭、AF 經常共存。呼吸困難惡化不一定都是肺造成。' },
      { title: '慢性高碳酸血症', body: '需更重視 NIV、睡眠呼吸問題、鎮靜藥物與氧氣處方安全，而不只是加 bronchodilator。' },
    ]),
  ),
  section(
    'clinical-pitfalls',
    '常見臨床陷阱',
    lead('COPD 的臨床陷阱，多半發生在把慢性病當急性感冒處理，或把急性惡化當成只有一個原因。'),
    misconceptionList([
      { myth: 'COPD 惡化時氧氣愈高愈好。', correction: '缺氧要處理，但過度氧合可能惡化高碳酸血症。穩定監測下的目標氧飽和通常抓 88% 到 92%，重點是個別化與反覆評估。' },
      { myth: '有 COPD 就應該長期吸 ICS。', correction: 'ICS 在 COPD 是有條件使用，不是普遍底座。惡化史、eosinophil 與氣喘重疊特徵才是真正關鍵。' },
      { myth: '病人年紀大、抽菸久，走不動本來就正常。', correction: '功能退化可以被改善，肺復健、營養介入、戒菸與合適裝置選擇常能帶來巨大差異。' },
    ]),
  ),
  section(
    'case-discussion',
    'Case-based discussion',
    lead('病例：68 歲男性，抽菸 45 包年，平常使用單一短效吸入器。近 2 天痰量增加、顏色轉黃綠、呼吸明顯變快，來急診時血氧 84%，呼吸頻率 30 次/分，使用輔助呼吸肌，ABG 顯示 pH 7.28、PaCO2 62 mmHg。'),
    table(
      ['臨床問題', '思路'],
      [
        ['這是單純缺氧還是通氣也失代償？', '酸血症合併高 PaCO2 代表 hypercapnic respiratory failure，不能只補氧就結束。'],
        ['第一線呼吸支持是什麼？', '若意識可配合且無禁忌，NIV 常是高價值選擇，能降低插管率。'],
        ['抗生素與類固醇需不需要？', '有典型痰量增加、膿痰與呼吸惡化，支持急性惡化合併感染可能，短期 systemic steroid 與適當抗生素常有指徵。'],
      ],
    ),
    callout(
      'clinical',
      '案例整合',
      p('這位病人真正危險的不是「肺功能差」四個字，而是急性惡化已經把他推進酸血症與呼吸肌疲乏。急性期處置要同時處理 bronchodilation、感染、氧氣目標與通氣支持。'),
    ),
    summary('案例結論', 'COPD 管理最重要的不是把每次惡化撐過，而是想辦法讓下一次惡化不要那麼快再來。', [
      '穩定期雙長效支氣管擴張與戒菸是骨幹。',
      '急性惡化時要同時想感染、心衰竭、肺栓塞與通氣失代償。',
      'NIV 在合適病人能改變結局。',
    ]),
  ),
);

respiratoryChapters.ch09 = chapter(
  '肺炎 (Pneumonia)',
  section(
    'anatomy-physiology',
    '正常解剖與生理',
    lead('肺炎要先從正常肺部防禦開始理解。上呼吸道解剖構造、咳嗽反射、會厭保護、黏液纖毛清除、肺泡巨噬細胞與局部免疫共同形成多層防線。健康肺泡原本充滿空氣，肺泡壁薄，表面張力由表面活性劑 (Surfactant) 調節，因此氧氣與二氧化碳能在極短距離內完成交換。'),
    p('肺炎發生時，病原、吸入物或宿主防禦失衡讓肺泡與間質被滲出液、發炎細胞與蛋白質填滿。這不只造成影像上的浸潤 (Infiltrate)，更直接破壞局部通氣與換氣匹配，形成低氧。若病灶範圍大、病人原本心肺儲備差、或感染反應進入敗血症，病程就可能迅速惡化。'),
    tags(['Mucociliary clearance', 'Alveolar macrophage', 'Surfactant', 'Aspiration defense', 'V/Q mismatch']),
    pulmonaryViewer('pneumonia-consolidation'),
    diagram('pneumonia-gas-exchange'),
    cards([
      { title: '上呼吸道防線', body: '鼻毛、鼻甲、咽喉與會厭讓空氣被過濾、加溫加濕，也降低誤吸進下呼吸道的機會。' },
      { title: '黏液纖毛系統', body: '纖毛把帶有病原與顆粒的黏液往上送，抽菸、病毒、脫水與氣道疾病都會讓這條防線失靈。' },
      { title: '肺泡巨噬細胞', body: '它們是肺泡第一線清道夫，負責吞噬病原與啟動局部發炎反應。免疫抑制或病毒破壞後，細菌較容易趁隙而入。' },
      { title: '換氣灌流匹配', body: '正常肺要同時有空氣進得去、血流到得了、肺泡壁仍可交換，三者任何一個出問題都會造成氧合下降。' },
    ]),
  ),
  section(
    'symptoms',
    '常見主訴與症狀',
    lead('典型肺炎主訴包括發燒、咳嗽、痰、呼吸困難、胸痛與全身倦怠，但真正臨床要練的是辨認非典型表現。老年病人可能只有食慾差、跌倒、意識改變；免疫抑制病人可能沒有高燒；誤吸型病人常在嗆咳後數小時到數天才開始明顯惡化。'),
    p('胸膜受刺激會造成 pleuritic chest pain，肺實質發炎則讓病人更喘。若病人出現低血壓、神智改變、呼吸頻率明顯上升或氧氣需求快速增加，病程可能已經不只是肺部感染，而是進入敗血症或呼吸衰竭。'),
    table(
      ['病人類型', '可能主訴', '臨床提醒', '常被誤以為什麼'],
      [
        ['年輕成人 CAP', '發燒、咳嗽、胸痛、痰', '較典型，但仍需看嚴重度與共病', '單純上呼吸道感染'],
        ['老年或長照住民', '虛弱、跌倒、意識改變、食慾差', '非典型表現很常見，不能因為沒有高燒就放心', '失智惡化、單純脫水'],
        ['誤吸相關', '吞嚥後咳嗽、發燒、右下肺陰影', '要區分 aspiration pneumonitis 與 aspiration pneumonia', '普通細菌性肺炎'],
        ['免疫抑制', '乾咳、逐漸喘、低氧', 'PJP、黴菌、CMV 等機會性感染不能漏', '一般細菌 CAP'],
      ],
    ),
    callout(
      'clinical',
      '真實場景',
      p('76 歲女性因「這兩天比較呆、吃不下」被家屬帶來急診，沒有抱怨咳嗽。到院後才發現呼吸頻率 28 次/分、血氧 88%、右下肺 crackles，X 光顯示右下肺浸潤。這類案例提醒我們，肺炎常先在生命徵象與功能變化說話，而不是在病人主訴裡大聲宣告。'),
    ),
  ),
  section(
    'pathophysiology',
    '重要疾病機轉',
    lead('肺炎的病理生理核心，是病原或吸入物突破宿主防線後，在肺泡與間質觸發局部發炎，形成滲出液、細胞浸潤與通氣灌流失衡。依場景不同，常見分類包括社區型肺炎 (CAP)、醫療照護相關場景的院內肺炎 (HAP)、呼吸器相關肺炎 (VAP)、誤吸性肺炎，以及各種免疫抑制相關感染。'),
    p('細菌性肺炎常以肺泡實變 (Consolidation) 為主，病毒性肺炎較偏間質與瀰漫性發炎，誤吸則往往混合化學性傷害與後續細菌感染。影像與病原雖重要，但真正左右病人是否快速變壞的，是低氧程度、敗血症反應、原本心肺儲備與是否出現併發症，如膿胸、肺膿瘍或 ARDS。'),
    diagram('pneumonia-gas-exchange'),
    cards([
      { title: 'CAP', body: '多從社區取得，常見肺炎鏈球菌、流感嗜血桿菌、非典型病原與病毒。治療需要兼顧嚴重度與是否有耐藥風險。' },
      { title: 'HAP / VAP', body: '住院場景病原譜與耐藥風險不同，重點是個別化風險評估，而不是一律上最大廣譜。' },
      { title: 'Aspiration', body: '誤吸先造成化學性 pneumonitis，之後才可能變成細菌感染。不是所有 aspiration 都要加廣泛厭氧覆蓋。' },
      { title: '低氧機轉', body: '肺炎的低氧主要來自 shunt-like physiology 與 V/Q mismatch，不是單靠把呼吸速率拉高就能完全補回來。' },
    ], 'comparison-grid'),
    misconceptionList([
      { myth: '有浸潤影就一定是細菌肺炎。', correction: '肺水腫、出血、腫瘤、藥物性肺炎、ARDS、肺栓塞後梗塞也可能出現類似影像。影像一定要結合臨床症候群。' },
      { myth: '痰愈黃綠就一定要上更廣的抗生素。', correction: '痰色只是發炎線索，不能單獨決定病原與抗藥性。真正重要的是場景、風險因子、重症程度與微生物證據。' },
    ]),
  ),
  section(
    'diagnosis',
    '診斷思路與鑑別診斷',
    lead('肺炎診斷通常需要兩塊拼圖：第一塊是臨床症候群，包含發燒、咳嗽、痰、呼吸困難或全身感染表現；第二塊是影像學證據，顯示新的肺部浸潤或實變。兩塊拼圖缺一，就要更謹慎地思考是否是其他病。'),
    table(
      ['步驟', '要點', '常見工具', '易錯點'],
      [
        ['確認是否真有肺炎症候群', '發燒、咳嗽、痰、低氧、聽診或發炎指標', '病史、理學、生命徵象', '只有發燒或只有咳嗽就硬貼肺炎'],
        ['確認影像學浸潤', '是否有新的 infiltrate 或 consolidation', 'X 光、肺超音波、CT 視需要', '把陳舊病灶或肺水腫當新感染'],
        ['評估嚴重度', '需住院嗎、需 ICU 嗎、敗血症風險如何', 'CURB-65、PSI 加臨床判斷', '只背分數不看整體病人'],
        ['找病原與替代診斷', '需不需要送培養、PCR、尿抗原', '血液、痰液、鼻咽檢體、床邊超音波', '所有人都做一樣檢查或所有人都不做'],
      ],
    ),
    list([
      'CURB-65 與 PSI 可幫助分流，但年輕免疫抑制病人、懷孕、明顯低氧或社會支持差時，分數低也不代表一定適合回家。',
      '肺栓塞、心衰竭、COPD 惡化、肺癌阻塞後感染、藥物性肺炎與 alveolar hemorrhage 都是高價值鑑別診斷。',
      '若病人吞嚥功能差、曾中風、近期嘔吐或意識改變，誤吸病史一定要主動問。',
    ]),
    callout(
      'warning',
      '不要把 procalcitonin 當按鈕',
      p('Procalcitonin 可以輔助，但不能取代臨床判斷。低值不一定能排除早期細菌感染，高值也不一定代表一定要延長抗生素。'),
    ),
  ),
  section(
    'investigations',
    '關鍵檢查與判讀',
    lead('肺炎的檢查策略，目標是支持診斷、分層嚴重度、找需要改變治療的病原線索，而不是無限制地把所有培養都送一遍。'),
    table(
      ['檢查', '什麼時候有價值', '判讀重點'],
      [
        ['胸部 X 光', '多數疑似肺炎的第一線影像', '早期或脫水病人可能影像不明顯，臨床高度懷疑時仍需追蹤'],
        ['肺超音波', '床邊快速看 consolidation、B line、pleural effusion', '對重症、臥床與追蹤動態很實用'],
        ['CBC / BMP / CRP / Lactate', '看感染負荷、脫水、腎功能與敗血症風險', '不是特異性檢查，但有助分層與用藥安全'],
        ['血液培養', '重症、敗血症、免疫抑制或需住院時', '不是每位 CAP 都有必要，但重症與特殊場景很重要'],
        ['痰液檢體', '可取得高品質樣本且結果可能改變治療時', '唾液污染太多的樣本價值有限'],
        ['尿抗原 / 病毒 PCR', '特定情境下找 Legionella、Pneumococcus、Influenza、SARS-CoV-2 等', '結果要能回到抗生素去升降階才有價值'],
      ],
    ),
    spotlight('影像判讀常見盲點', '老年、脫水、極早期病程或 neutropenia 病人，初始 X 光可能不夠典型。若臨床惡化卻影像不明顯，應考慮重拍、做超音波或 CT，而不是只因第一張片子不典型就放棄診斷。'),
  ),
  section(
    'treatment',
    '第一線與第二線治療',
    lead('肺炎治療的成熟度，不在於背出最多抗生素，而在於知道病人屬於哪個場景、嚴重度如何、有沒有耐藥風險、什麼時候該升級或去升級。'),
    table(
      ['情境', '常見第一線策略', '常見組合', '實務提醒'],
      [
        ['門診 CAP，無重大共病', '依指引選 amoxicillin、doxycycline，或在肺炎鏈球菌抗藥性足夠低時選 macrolide', 'Amoxicillin；Doxycycline', '地區抗藥性與個人過敏史要一起考慮'],
        ['門診 CAP，有共病', 'β-lactam 加 macrolide / doxycycline，或選 respiratory fluoroquinolone', 'Amoxicillin-clavulanate + Azithromycin', '心律、C difficile、肌腱與藥物交互作用需納入評估'],
        ['住院但非 ICU', 'β-lactam + macrolide，或 respiratory fluoroquinolone 單藥', 'Ceftriaxone + Azithromycin', '若病毒陽性也不能自動排除細菌共感染'],
        ['重症 CAP', '廣度較高但仍以指引與風險因子決定，MRSA / Pseudomonas 覆蓋只給有明確風險者', 'β-lactam + macrolide', '真正的重症風險比分類名稱更重要'],
        ['HAP / VAP', '依機構抗藥性與個人風險選 anti-pseudomonal ± MRSA 覆蓋', 'Piperacillin-tazobactam ± Vancomycin', '要主動去升級與縮短療程，不要一路廣到底'],
      ],
    ),
    cards([
      { title: '支持性治療', body: '氧氣、退燒、補液、營養、痰液處理與早期活動同樣影響恢復，不應被抗生素蓋過。' },
      { title: '療程觀念', body: '許多 CAP 在臨床穩定後 5 天左右即可完成療程，但重症、膿胸、菌血症或特殊病原需更長。' },
      { title: 'De-escalation', body: '當培養、PCR 或臨床反應支持時，應主動縮窄抗生素，這是高品質抗菌藥 stewardship 的核心。' },
      { title: 'Aspiration 細節', body: '誤吸不等於一定要 routine broad anaerobic coverage；真正需要額外考慮厭氧覆蓋的是肺膿瘍、壞死性肺炎或膿胸等情境。' },
    ], 'comparison-grid'),
    callout(
      'success',
      '高價值治療原則',
      p('對肺炎來說，早期正確抗生素、快速辨識重症、穩定氧合與及時去升級，比一開始就把所有最廣藥都壓上去更能改善結果。'),
    ),
  ),
  section(
    'pharmacology',
    '常用藥物機轉、副作用、交互作用',
    lead('肺炎抗菌藥理最常見的錯，是只記得藥名，不知道自己在覆蓋什麼、犧牲了什麼。'),
    table(
      ['類別', '代表藥物', '常見覆蓋', '重要副作用或交互作用'],
      [
        ['β-lactam', 'Amoxicillin, Ceftriaxone, Ampicillin-sulbactam, Piperacillin-tazobactam', '許多典型細菌與部分廣譜革蘭陰性菌', '過敏、腹瀉、C difficile；不同藥並非可任意互換'],
        ['Macrolide', 'Azithromycin', '非典型病原與部分典型 CAP 病原', 'QT prolongation、藥物交互作用與胃腸副作用'],
        ['Tetracycline', 'Doxycycline', 'CAP 常見病原與部分非典型', '光敏感、食道刺激；懷孕與幼童須留意限制'],
        ['Respiratory fluoroquinolone', 'Levofloxacin, Moxifloxacin', 'CAP 常見典型與非典型', 'QT、肌腱、主動脈、CNS 與 C difficile 風險需平衡'],
        ['抗 MRSA', 'Vancomycin, Linezolid', 'MRSA 肺炎', 'Vancomycin 需監測腎毒性；linezolid 要看血球與 serotonin interaction'],
      ],
    ),
    formula('Amoxicillin 分子式', 'C16H19N3O5S', '對許多社區肺炎常見菌仍是高價值選擇，重點不是「老藥」，而是病原是否對它敏感、病人是否適合。'),
    formula('Azithromycin 分子式', 'C38H72N2O12', '大環內酯類在 CAP 佔有重要位置，但 QT prolongation 與與其他藥疊加的風險要常駐腦中。'),
    callout(
      'danger',
      '抗生素相關常見誤區',
      p('愈廣不代表愈好。每次不必要的 broad-spectrum 選擇，都在增加 C difficile、真菌感染、腎毒性與抗藥性壓力。'),
    ),
  ),
  section(
    'special-populations',
    '特殊族群考量',
    lead('不同族群的肺炎，最需要改變的往往不是病名，而是你對病原譜、病程速度與支持性照護的想像。'),
    cards([
      { title: '老年與長照', body: '非典型症狀、吞嚥問題、功能退化與藥物副作用容忍度低，使分流與用藥都更複雜。' },
      { title: '免疫抑制', body: '要主動想到 PJP、侵襲性黴菌、CMV、Nocardia、結核等特殊病原，不能只用一般 CAP 腦袋。' },
      { title: '妊娠', body: '低氧對母胎都不利，治療門檻應偏積極；藥物選擇需同時考慮胎兒安全與母體病情。' },
      { title: '腎肝功能不全', body: '抗生素劑量、累積與藥物交互作用都要重新校正，尤其在重症時變化更快。' },
    ]),
  ),
  section(
    'clinical-pitfalls',
    '常見臨床陷阱',
    lead('肺炎常見錯誤不是完全不治療，而是治療方向太僵化。'),
    misconceptionList([
      { myth: '所有肺炎都該一開始就給最廣抗生素。', correction: '適當場景下的精準經驗性治療，比無差別放大廣度更安全也更有效。' },
      { myth: '病人退燒了就一定可以停藥。', correction: '退燒是好訊號，但仍要看呼吸狀態、血流動力、進食能力與整體臨床穩定度。' },
      { myth: '影像改善比症狀改善更重要。', correction: '影像常落後臨床好轉數天到數週，特別是老年人或基礎肺病病人。追蹤重點是病人有沒有真的往好方向走。' },
    ]),
  ),
  section(
    'case-discussion',
    'Case-based discussion',
    lead('病例：73 歲男性，糖尿病與心衰竭病史，主訴 2 天來發燒、咳嗽、右側胸痛與呼吸困難。到院時血壓 94/58 mmHg、呼吸頻率 32 次/分、血氧 89%，X 光顯示右下肺葉實變。'),
    table(
      ['臨床問題', '思路'],
      [
        ['需不需要住院甚至 ICU？', '低血壓、低氧、呼吸速率高與共病多，嚴重度明顯提升，不能只以年齡或發燒程度決定。'],
        ['經驗性抗生素要怎麼選？', '屬住院 CAP，常見起始為 β-lactam 加 macrolide 或 respiratory fluoroquinolone，若無特定風險不必例行性加 MRSA / Pseudomonas 覆蓋。'],
        ['支持性治療重點是什麼？', '氧氣、敗血症評估、適當補液但兼顧心衰竭背景、監測尿量與器官灌流，同時盡快送相關檢體。'],
      ],
    ),
    callout(
      'clinical',
      '案例整合',
      p('這類病人最容易因「只是肺炎」四個字被低估。真正重要的是，他其實正處在感染、呼吸失代償與可能敗血症的交界點，治療的每一小時都會影響走向。'),
    ),
    summary('案例結論', '肺炎治療的核心，不只是把菌殺掉，而是辨識誰會快速惡化、誰需要更多支持、何時能夠安全縮窄治療。', [
      '診斷要結合症候群與影像。',
      '嚴重度評估會直接改變治療場景。',
      '抗生素廣度應隨風險與結果動態調整。',
    ]),
  ),
);

respiratoryChapters.ch10 = chapter(
  '結核與特殊感染 (TB & Special Infections)',
  section(
    'anatomy-physiology',
    '正常解剖與生理',
    lead('肺結核 (Tuberculosis, TB) 最值得先理解的正常生理，不是單一器官解剖，而是吸入後的宿主免疫路徑。結核分枝桿菌 (Mycobacterium tuberculosis) 經飛沫核 (Droplet nuclei) 進入終末氣道與肺泡後，首先遇到的是肺泡巨噬細胞；正常情況下，巨噬細胞會吞噬病原並與 T cell 協調，把感染限制在局部。'),
    p('特殊感染的概念也來自這個宿主防禦地圖。當 CD4 T cell、嗜中性球、吞噬功能或局部結構防線被破壞，肺部就不再只面對一般 CAP 病原，而會轉向 Pneumocystis jirovecii、侵襲性黴菌、非結核分枝桿菌 (NTM) 或其他機會性感染。真正重要的是：病原譜永遠跟宿主缺陷綁在一起。'),
    tags(['Granuloma', 'Airborne transmission', 'Cell-mediated immunity', 'Latent infection', 'Opportunistic infection']),
    pulmonaryViewer('tb-granuloma'),
    diagram('tb-granuloma'),
    cards([
      { title: '飛沫核傳播', body: 'TB 的傳播單位比一般飛沫更小，能長時間懸浮並深入末梢氣道，這也是感染管制要採用 airborne isolation 的原因。' },
      { title: '顆粒性肉芽腫 (Granuloma)', body: '宿主試圖以巨噬細胞、上皮樣細胞與淋巴球形成包圍圈，把病原限制住。潛伏感染與活化疾病的邊界，常取決於這個圍牆能不能撐住。' },
      { title: '上葉偏好', body: '再活化 TB 常偏好氧分壓較高的肺尖與上葉，但臨床並不是每位病人都會長成教科書照片。' },
      { title: '宿主缺陷導向病原', body: 'HIV、移植、長期 steroid、TNF-alpha inhibitor、血液腫瘤與嚴重營養不良，會把肺部感染地圖改寫得很不一樣。' },
    ]),
    formula('分枝桿菌細胞壁特色', 'Mycolic acid-rich cell wall -> acid-fastness', '富含分枝菌酸 (Mycolic acid) 的細胞壁，讓分枝桿菌具有抗酸染色特性，也影響藥物穿透、存活能力與治療時間長度。'),
  ),
  section(
    'symptoms',
    '常見主訴與症狀',
    lead('肺結核最經典的主訴是慢性咳嗽、夜間盜汗、體重下降、食慾差、低燒與咳血，但現實世界中常因病程緩慢而被拖很久。特別是免疫抑制病人，症狀可能更不典型，影像也不一定漂亮。'),
    p('特殊感染則更需要把宿主背景加進來讀。PJP 常以逐漸加重的乾咳與低氧表現；侵襲性 Aspergillus 可能有胸痛、咳血與快速惡化；NTM 則常在慢性肺病背景下呈現慢性咳痰、體重下降與反覆影像變化。臨床上不要問「這是什麼菌」，而是先問「這個宿主會得哪一類病」。'),
    table(
      ['情境', '常見表現', '高價值線索', '容易被誤解成什麼'],
      [
        ['活動性肺結核', '咳嗽超過數週、夜汗、消瘦、咳血', '接觸史、來自高盛行區、免疫抑制、影像空洞', '慢性支氣管炎、肺癌、久咳未癒'],
        ['潛伏結核', '通常無症狀', '只有接觸史或篩檢陽性', '被誤以為需要與活動性 TB 同樣處理'],
        ['PJP', '乾咳、發燒、漸進性呼吸困難、低氧', 'HIV、長期 steroid、移植、廣泛雙側浸潤', '普通病毒感染或輕度 CAP'],
        ['侵襲性黴菌', '發燒不退、胸痛、咳血、快速惡化', '嚴重 neutropenia、移植、CT 結節或 halo sign', '一般抗生素治不好的肺炎'],
      ],
    ),
    callout(
      'clinical',
      '真實場景',
      p('45 歲類風濕性關節炎病人，接受 TNF-alpha inhibitor 後 2 個月開始夜汗、咳嗽與體重掉 4 公斤，先後被當作反覆細菌性支氣管炎治療。真正關鍵訊息不是他有沒有發燒，而是免疫調節藥把 latent TB reactivation 的門打開了。'),
    ),
  ),
  section(
    'pathophysiology',
    '重要疾病機轉',
    lead('TB 的病理生理可概分為初次感染、潛伏感染與再活化疾病。初次感染後，若宿主免疫足夠，病原可能被限制在 granuloma 中，形成 latent TB infection (LTBI)；若宿主防線破口變大，細菌數上升、組織壞死與空洞形成，病人就進入具傳染力的活動性疾病。'),
    p('特殊感染與 TB 的共同點，是都在提醒你：感染不是只有病原強不強，也看宿主缺口在哪裡。PJP 偏好細胞免疫受損者，Aspergillus 偏好 neutrophil 防線破口與結構性肺病者，NTM 則常與既有支氣管擴張或慢性肺結構病變一起出現。'),
    diagram('tb-granuloma'),
    cards([
      { title: 'Latency vs Reactivation', body: 'Latent TB 沒有傳染性，處理目標是避免未來活化；active TB 則需要多藥合併與公共衛生介入。兩者不能混為一談。' },
      { title: 'Cavitation', body: '空洞代表高菌量、組織壞死與較高傳染風險，也常與治療時間、藥物穿透與後續結構性後遺症有關。' },
      { title: 'Miliary spread', body: '若血行播散，病灶可遍佈多器官，常見於免疫功能差者，臨床表現可能更隱晦卻更危險。' },
      { title: 'Host defect thinking', body: '看到特殊感染時，務必同時追問 HIV 狀態、免疫抑制藥、移植、血液腫瘤、營養狀態與結構性肺病。' },
    ], 'comparison-grid'),
    misconceptionList([
      { myth: 'IGRA 或 TST 陽性就代表病人正在傳染。', correction: 'IGRA / TST 反映免疫記憶，主要用於潛伏感染評估，不能單獨診斷活動性結核。' },
      { myth: '咳血才算結核。', correction: '咳血是重要警訊，但很多活動性 TB 以慢性咳嗽、體重下降與低燒表現，尤其免疫抑制病人更不典型。' },
    ]),
  ),
  section(
    'diagnosis',
    '診斷思路與鑑別診斷',
    lead('疑似活動性肺結核時，第一步不是先抽 IGRA，而是先想感染管制與下呼吸道檢體。病人若有慢性症狀、風險背景與影像線索，就應盡快採集痰液做 acid-fast smear、核酸擴增檢測 (NAAT) 與培養，因為培養與藥敏最終會決定後續治療。'),
    table(
      ['步驟', 'TB 重點', '特殊感染重點', '常見錯誤'],
      [
        ['先看宿主與傳播風險', '接觸史、高盛行地區、免疫抑制、空洞病灶', 'HIV、移植、steroid、TNF-alpha inhibitor、neutropenia', '只看影像不看宿主'],
        ['採檢策略', '痰液 AFB smear、NAAT、culture', '痰液、誘發痰、BAL、血清抗原依場景', '只做一項快速檢查就想結案'],
        ['影像判讀', '上葉、空洞、tree-in-bud、粟粒散布', 'PJP 可雙側瀰漫磨玻璃，Aspergillus 可結節或 halo sign', '把所有空洞都當 TB 或所有磨玻璃都當病毒'],
        ['同步找共病', 'HIV、肝炎、糖尿病、營養狀態', 'CD4、neutrophil、藥物清單、移植史', '把感染當孤立事件處理'],
      ],
    ),
    list([
      'TB 檢體送出後，仍需等待培養與藥敏結果。NAAT 快但不是全部，culture 仍是重要基準。',
      '若病人無痰但高度懷疑，應考慮誘發痰或支氣管鏡，而不是因為拿不到痰就放棄。',
      'NTM 診斷需要臨床、影像與微生物標準三者合一，不是單次痰培養長出來就自動等於需要治療。',
    ]),
    callout(
      'warning',
      '隔離與通報不能忘',
      p('只要懷疑活動性肺結核，就應依院內政策先做 airborne isolation，並在確診後依規定通報公共衛生系統。這不是行政細節，而是病人與周圍人安全的一部分。'),
    ),
  ),
  section(
    'investigations',
    '關鍵檢查與判讀',
    lead('這一章的檢查重點，是讓你區分 latent、active、drug-susceptible、drug-resistant 與特殊感染場景。'),
    table(
      ['檢查', '用途', '判讀重點'],
      [
        ['AFB smear', '快速看是否有大量分枝桿菌', '陰性不能排除 TB，陽性也要注意非結核分枝桿菌可能'],
        ['NAAT / PCR', '較快支持 TB 診斷與部分耐藥資訊', '可加速臨床決策，但仍需 culture 與完整藥敏補上'],
        ['Mycobacterial culture', '確診與藥敏黃金標準之一', '時間較久，但對後續治療最重要'],
        ['IGRA / TST', '評估潛伏感染', '不能單獨診斷活動性病，也無法區分現在是否傳染'],
        ['HIV、LFT、Renal function', '建立風險背景與用藥基線', 'TB 與特殊感染治療常受肝腎功能與 HIV 治療時機影響'],
        ['Beta-D-glucan / Galactomannan / BAL', '評估 PJP 或侵襲性黴菌', '結果需放回宿主背景與影像，不可獨立使用'],
      ],
    ),
    spotlight('基線檢查的真正價值', 'TB 治療前的肝功能、視力色覺、腎功能與 HIV 狀態，不是例行公事，而是因為後面每一種藥都可能因這些資訊而改變。'),
  ),
  section(
    'treatment',
    '第一線與第二線治療',
    lead('活動性藥敏感肺結核的標準思維，通常是先以多藥合併的強化期 (Intensive phase) 迅速壓低菌量，再進入續治期 (Continuation phase) 清除殘存病灶。典型起始組合是 isoniazid、rifampin、pyrazinamide、ethambutol，也就是所謂 RIPE。'),
    table(
      ['情境', '常見第一線策略', '常見配合', '實務提醒'],
      [
        ['活動性藥敏感 TB', 'RIPE 起始，再依藥敏與病程調整續治', 'INH + RIF + PZA + EMB', '一定要追藥敏、依從性、肝毒性與公共衛生合作'],
        ['Latent TB', '偏好短程 rifamycin-based regimen', '3HP、4R、3HR 等', '選方案前務必先排除活動性 TB，否則會變成不完整治療'],
        ['PJP', 'TMP-SMX 為骨幹，若低氧明顯加 adjunctive steroid', 'TMP-SMX + prednisone', '腎功能、鉀離子與皮疹要密切監測'],
        ['侵襲性 Aspergillus', 'Azole 為主，必要時依感染科調整', 'Voriconazole、Isavuconazole', '與 immunosuppression、drug level 與肝毒性密切相關'],
        ['NTM 肺病', '依菌種與表型用多藥長程治療', 'Macrolide + Ethambutol + Rifamycin', '不能把 NTM 當 TB 套同一套邏輯處理'],
      ],
    ),
    cards([
      { title: '依從性 (Adherence)', body: 'TB 治療一長，真正失敗常不是藥不夠強，而是沒有完整吃完、沒有追蹤副作用、沒有處理社會層面障礙。' },
      { title: '藥物交互作用', body: 'Rifampin 類藥幾乎會把整張藥物清單改寫一次，包括口服避孕藥、DOAC、抗癲癇藥與 HIV ART。' },
      { title: '感染管制', body: '治療本身不是全部；隔離、接觸者追蹤與公共衛生合作，對 TB 這章是治療的一部分。' },
      { title: '不要見好就收', body: '症狀改善通常早於菌學治癒，提早停藥會把後續藥敏與復發問題變得更麻煩。' },
    ], 'comparison-grid'),
    callout(
      'success',
      '高價值用藥搭配',
      p('isoniazid 常搭配 pyridoxine 預防周邊神經病變；HIV、移植與多重共病病人則應在感染科、胸腔科與藥師協作下同步管理 ART 或免疫抑制藥交互作用。'),
    ),
  ),
  section(
    'pharmacology',
    '常用藥物機轉、副作用、交互作用',
    lead('TB 藥理最需要的是耐心與系統性。每一顆藥都不是只是「加一顆以免抗藥」，而是各自在切不同代謝與結構節點，同時也帶來不同毒性。'),
    table(
      ['藥物', '主要機轉', '高頻副作用', '實務重點'],
      [
        ['Isoniazid (INH)', '抑制 mycolic acid synthesis', '肝毒性、周邊神經病變', '記得加 pyridoxine，特別是孕婦、營養不良、糖尿病與酒精使用者'],
        ['Rifampin / Rifapentine', '抑制 DNA-dependent RNA polymerase', '肝毒性、體液橘紅、強烈酵素誘導', '交互作用非常多，是臨床最容易出大事的一顆'],
        ['Pyrazinamide', '酸性環境下作用較佳，機轉複雜', '肝毒性、高尿酸', '關節痛與尿酸上升需追蹤，痛風病人更要留意'],
        ['Ethambutol', '抑制細胞壁 arabinosyl transferase', '視神經炎、色覺異常', '治療前後需注意視力與紅綠辨色變化'],
        ['TMP-SMX', '抑制葉酸代謝雙步驟', '腎功能惡化、高鉀、皮疹、骨髓抑制', 'PJP 治療與預防都常用，但腎與電解質監測不能少'],
      ],
    ),
    formula('Isoniazid 分子式', 'C6H7N3O', 'INH 是結核治療骨幹之一，問題往往不是它有沒有用，而是病人能不能安全且完整地撐過整個療程。'),
    formula('Rifampin 分子式', 'C43H58N4O12', 'Rifampin 的臨床威力不只來自抗結核效果，也來自它對肝酵素系統的強力誘導，足以讓整張慢性用藥清單失衡。'),
    callout(
      'danger',
      '高風險交互作用',
      p('rifampin 會大幅降低口服避孕藥、DOAC、某些抗癲癇藥、calcineurin inhibitor 與許多抗病毒藥濃度。對多重用藥病人而言，TB 治療開始就等於一次全表重審。'),
    ),
  ),
  section(
    'special-populations',
    '特殊族群考量',
    lead('TB 與特殊感染最需要特殊族群思維，因為病原譜、用藥風險與公共衛生意義都會被宿主背景放大。'),
    cards([
      { title: 'HIV / 嚴重細胞免疫缺陷', body: '病原譜更廣、表現更不典型，TB 與 PJP 風險同時上升，也要安排 HIV ART 與感染治療時機。' },
      { title: '妊娠', body: '活動性 TB 治療通常不應延誤，但用藥細節、補充 pyridoxine 與胎兒風險溝通都更重要。' },
      { title: '肝病與酒精使用', body: 'TB 治療多藥都可能肝毒性，基線與追蹤門檻要更嚴格。' },
      { title: '移植與生物製劑使用者', body: 'Latent TB 篩檢與治療價值極高，因為一旦活化往往更重且更難治。' },
    ]),
  ),
  section(
    'clinical-pitfalls',
    '常見臨床陷阱',
    lead('這一章最危險的錯，往往不是完全不會治，而是把慢病程感染當成一般肺炎，用短短幾天經驗性抗生素反覆覆蓋，拖到傳播與結構性破壞都擴大。'),
    misconceptionList([
      { myth: 'IGRA 陰性就排除活動性 TB。', correction: '免疫功能差病人可能出現假陰性。活動性 TB 診斷重點仍是臨床、影像與微生物檢驗。' },
      { myth: '症狀好了就可以提早停 TB 藥。', correction: 'TB 治療一定要完整，否則復發、治療失敗與耐藥風險都會上升。' },
      { myth: '長期咳嗽的人先給幾輪抗生素看看。', correction: '慢性咳嗽加體重下降、夜汗、風險背景或空洞影像時，應主動想 TB、黴菌、腫瘤與 NTM，而不是無限試抗生素。' },
    ]),
  ),
  section(
    'case-discussion',
    'Case-based discussion',
    lead('病例：45 歲男性，類風濕性關節炎，近半年使用 TNF-alpha inhibitor。近 4 週持續咳嗽、夜汗、食慾差與體重下降 5 公斤，胸部 CT 顯示右上肺空洞與 tree-in-bud pattern。'),
    table(
      ['臨床問題', '思路'],
      [
        ['第一步要做什麼？', '先做 airborne isolation，並採集痰液送 AFB smear、NAAT、culture，同步檢查 HIV 與基線肝腎功能。'],
        ['IGRA 現在還有沒有意義？', '若懷疑活動性 TB，IGRA 不是主要確診工具。真正關鍵是痰檢、影像與感染管制。'],
        ['如果 NAAT 支持 TB，下一步？', '依臨床高度懷疑與初步結果啟動多藥治療，之後依 culture、藥敏與耐受性調整。'],
      ],
    ),
    callout(
      'clinical',
      '案例整合',
      p('這類病人最怕的是「因為不是很高燒，看起來不像一般肺炎，所以先觀察」。免疫調節藥正在重寫他的宿主防線，診斷與隔離都不能慢。'),
    ),
    summary('案例結論', 'TB 與特殊感染章節的核心，不只是辨認病原，而是把宿主、傳播、藥理與公共衛生放在同一張地圖裡。', [
      '先想隔離與採檢，再談精細鑑別。',
      'Latent 與 active TB 完全不是同一件事。',
      'Rifamycin 交互作用與長療程依從性是治療成敗核心。',
    ]),
  ),
);

respiratoryChapters.ch11 = chapter(
  '呼吸衰竭與機械通氣入門',
  section(
    'anatomy-physiology',
    '正常解剖與生理',
    lead('呼吸衰竭的核心，不只是肺部長得怎樣，而是整條氧氣供應鏈與二氧化碳排除鏈是否仍能運作。空氣必須被吸進肺泡、肺泡必須有可用表面積、肺泡周圍要有灌流、血液中的血紅素要夠、心輸出量要能把氧送出去，任何一段斷掉都可能讓病人缺氧。'),
    p('通氣 (Ventilation) 負責把空氣搬進肺泡，灌流 (Perfusion) 負責把血送到交換面；氧合 (Oxygenation) 與通氣不是同一件事。病人可以氧合不好但通氣還行，例如 shunt 或 V/Q mismatch；也可以通氣失敗但氧合初期尚可，例如鎮靜後 hypoventilation。這也是為什麼 pulse oximeter 與 PaCO2 不會永遠同步。'),
    tags(['Ventilation', 'Perfusion', 'Compliance', 'Resistance', 'Work of breathing']),
    pulmonaryViewer('ventilator-support'),
    diagram('mechanical-ventilation'),
    cards([
      { title: '呼吸幫浦 (Respiratory Pump)', body: '腦幹呼吸中樞、周邊神經、膈肌、胸壁與呼吸肌缺一不可。COPD、神經肌肉病、肥胖低通氣與藥物鎮靜都可能讓這條系統失效。' },
      { title: '肺順應性 (Compliance)', body: '肺越硬，吸氣所需壓力越大；ARDS、肺水腫、纖維化都會讓肺順應性下降。' },
      { title: '氣道阻力 (Resistance)', body: '氣喘、COPD、黏液栓塞與氣管內管問題都會提高阻力，使病人呼吸做功飆升。' },
      { title: '氧氣運送 (DO2)', body: '真正送到組織的氧不只看 PaO2，還看 Hb 與心輸出量。嚴重貧血病人就算血氧好看，也可能氧運送不足。' },
    ]),
    formula('肺泡氧氣方程式', 'PAO2 = FiO2 x (Patm - PH2O) - PaCO2 / R', '這條式子能幫你估算肺泡氧張力，進而理解 A-a gradient、V/Q mismatch 與 shunt 是否明顯。'),
    formula('動脈血氧含量', 'CaO2 = 1.34 x Hb x SaO2 + 0.003 x PaO2', '絕大部分血中氧含量來自血紅素結合而非溶解氧，因此 Hb 與 SaO2 通常比單看 PaO2 更接近實際運氧能力。'),
  ),
  section(
    'symptoms',
    '常見主訴與症狀',
    lead('呼吸衰竭不是一個「檢驗數值診斷」，而是病人已經在氧合、通氣或呼吸做功上撐不住的臨床狀態。常見主訴包括呼吸困難、胸悶、講話斷句、坐立不安、嗜睡、頭痛、發紺、意識改變或近乎無法完成一句話。'),
    p('真正危險的訊號包括呼吸頻率快速上升後突然變慢、意識開始模糊、使用輔助呼吸肌、三凹徵、paradoxical breathing、silent chest、單字句說話、無法平躺與血流動力不穩。若等到 ABG 「漂亮地證明」呼吸衰竭才行動，常常已經慢一步。'),
    table(
      ['類型', '常見表現', '病理意義', '臨床風險'],
      [
        ['低氧性 (Type 1)', '喘、低氧、胸悶、發紺', 'V/Q mismatch、shunt、擴散障礙最常見', '可快速進展到 ARDS 或多器官失代償'],
        ['高碳酸性 (Type 2)', '頭痛、嗜睡、顫動、混亂、呼吸肌疲乏', '通氣不足導致 PaCO2 上升', '容易被誤認成疲倦或鎮靜過度'],
        ['呼吸做功過高', '鼻翼煽動、輔助肌使用、說話中斷', '代表病人正在用大量能量換取短暫穩定', '若不卸載，很快會走向衰竭'],
        ['即將崩潰', '意識差、呼吸頻率下降、血壓不穩', '代表代償耗盡', '需要立即高層級處置與氣道準備'],
      ],
    ),
    callout(
      'clinical',
      '真實場景',
      p('63 歲男性 COPD 惡化，初到急診時還能硬撐著說話，兩小時後突然變得安靜、反應慢。許多初學者會誤以為病人比較 calm，但老手知道這往往是呼吸肌疲乏與高碳酸血症正在接管。'),
    ),
  ),
  section(
    'pathophysiology',
    '重要疾病機轉',
    lead('呼吸衰竭的第一層分類是 Type 1 hypoxemic failure 與 Type 2 hypercapnic failure，但真正實務上還要把病因拆成肺實質問題、氣道問題、呼吸幫浦問題與循環問題。'),
    p('低氧常由肺炎、肺水腫、ARDS、肺出血、肺栓塞、肺不張或嚴重 V/Q mismatch 引起；高碳酸常見於 COPD、氣喘、神經肌肉病、肥胖低通氣、鎮靜或中樞驅動下降。兩者可以同時存在，例如嚴重 COPD 惡化合併肺炎，或 ARDS 病人因保護性通氣而容許性高碳酸血症。'),
    diagram('mechanical-ventilation'),
    cards([
      { title: 'Shunt 與 V/Q mismatch', body: 'shunt 意味著血流經過幾乎沒通氣的肺單位，單靠提高 FiO2 改善有限；V/Q mismatch 則對氧氣補充通常較有反應。' },
      { title: 'Dead Space', body: '肺栓塞、低灌流與過度膨脹可讓部分肺泡有通氣沒灌流，增加通氣效率浪費。' },
      { title: 'Auto-PEEP', body: '在氣喘與 COPD，呼氣時間不夠會造成內生 PEEP 累積，病人每次吸氣都必須先克服額外壓力。' },
      { title: 'ARDS 思維', body: 'ARDS 不是單一病因，而是一種廣泛肺泡-微血管屏障受損表型，需要肺保護策略，而不是猛拉潮氣量把 ABG 拉正常。' },
    ], 'comparison-grid'),
    misconceptionList([
      { myth: '血氧正常就代表沒有呼吸衰竭。', correction: '高碳酸血症與通氣失敗早期可在補氧下維持不錯血氧，但病人仍可能已在呼吸肌疲乏與意識惡化。' },
      { myth: 'PaCO2 高就一定要立刻插管。', correction: '是否插管要看 pH、意識、工作量、可逆病因、NIV 適應症與反應，不是看單一數字。' },
    ]),
  ),
  section(
    'diagnosis',
    '診斷思路與鑑別診斷',
    lead('診斷呼吸衰竭時，順序要很紀律：先看病人，再看監測，再看血氣，再找原因。若順序反過來，只盯 ABG，很容易在還沒治療前就漏掉即將崩潰的訊號。'),
    table(
      ['步驟', '要回答的問題', '常用工具', '常見錯誤'],
      [
        ['臨床評估', '病人現在是在補償還是失代償', '意識、說話能力、呼吸頻率、使用輔助肌、血壓', '被單一血氧數字麻痺'],
        ['確認低氧或高碳酸', '氧合差？通氣差？兩者都有？', 'Pulse oximetry、ABG / VBG、capnography', '把 VBG 與 ABG 完全等同或完全對立'],
        ['找機轉', '肺炎、肺水腫、阻塞、氣胸、栓塞、藥物、神經肌肉', 'CXR、肺超音波、ECG、藥物史、神經學檢查', '一律先套同一種通氣方式'],
        ['決定支持層級', '氧氣、HFNC、NIV 還是 intubation', '病情趨勢與反應', '等到已經崩潰才準備插管'],
      ],
    ),
    list([
      'ABG 在低氧、酸鹼失衡與高碳酸評估非常重要，但不要讓採血延誤本來就應先做的氧氣與呼吸支持。',
      '肺超音波在區分肺水腫、實變、胸水、氣胸與部分間質病變時價值很高，且可反覆追蹤。',
      '高乳酸、休克與心輸出量不足也可能讓病人看起來「很喘」，呼吸衰竭評估不能把循環抽離。',
    ]),
    callout(
      'warning',
      'NIV 的決策重點',
      p('NIV 對 COPD 惡化與心因性肺水腫證據最好，但若病人意識不清、無法保護氣道、嚴重分泌物、持續嘔吐或血流動力不穩，延遲插管比過早插管更危險。'),
    ),
  ),
  section(
    'investigations',
    '關鍵檢查與判讀',
    lead('呼吸衰竭的檢查不是為了把表單填滿，而是用最短時間找出可逆原因與支持層級。'),
    table(
      ['檢查', '用途', '判讀重點'],
      [
        ['ABG', '看 pH、PaCO2、PaO2、HCO3-', '判斷低氧與高碳酸性質，也可搭配 A-a gradient 與乳酸理解全貌'],
        ['Pulse oximetry', '連續監測氧合', '容易受灌流、動作、色素與一氧化碳影響；看趨勢很有價值，但不是全部'],
        ['Capnography', '看 CO2 趨勢與通氣品質', '對插管後確認、程序鎮靜與呼吸抑制監測特別有用'],
        ['CXR / 肺超音波', '找肺炎、肺水腫、氣胸、胸水、實變', '超音波對床邊動態變化很敏感'],
        ['P/F ratio', 'ARDS 嚴重度與氧合評估', '要記得 FiO2 與 PEEP 背景，不能單看絕對數值'],
        ['呼吸肌或神經評估', '懷疑 neuromuscular failure 時', 'NIF、FVC、神經學檢查與病史不可少'],
      ],
    ),
    spotlight('數值怎麼放回病人身上', '若 pH 7.32、PaCO2 58 的 COPD 病人講話清楚、反應快、NIV 後逐步好轉，策略與 pH 7.32 但意識差、呼吸肌已疲乏的病人完全不同。數值要回到趨勢與臨床表現。'),
  ),
  section(
    'treatment',
    '第一線與第二線治療',
    lead('呼吸衰竭治療的思路，是沿著支持梯子往上走，但每一步都要同時處理病因。單純提高機器強度而不處理原病，通常只是把崩潰時間往後推。'),
    table(
      ['支持層級', '常見適應症', '優點', '風險或限制'],
      [
        ['低流量氧氣', '輕度低氧', '快速、容易啟動', '若病人工作量已高，可能很快不夠'],
        ['HFNC', '中度低氧、需較高 FiO2 與一定流量支持', '舒適、可提供高流量與部分 dead space washout', '若病人持續惡化不能一直拖延升級'],
        ['NIV', 'COPD 惡化、心因性肺水腫、部分免疫抑制低氧', '可卸載呼吸肌、降低插管率', '需病人能配合且無明顯禁忌'],
        ['侵襲性機械通氣', '無法保護氣道、NIV 失敗、嚴重低氧或高碳酸失代償', '提供完整通氣控制', 'VILI、鎮靜、感染、血流動力影響與去機困難'],
      ],
    ),
    h3('機械通氣入門原則'),
    list([
      '潮氣量 (Tidal volume) 應依 predicted body weight 設定，而非實際體重。ARDS 常採約 6 mL/kg PBW 的 lung-protective strategy。',
      'Plateau pressure 一般希望維持在 30 cmH2O 以下，以降低壓力相關肺損傷風險。',
      'PEEP 用來招募肺泡與改善氧合，但過高也可能造成過度膨脹與血流動力下降，必須個別化。',
      '在重度 ARDS，俯臥治療 (Prone positioning) 常比盲目再加更多 FiO2 更有結局價值。',
      '每天都要思考鎮靜最小化、鎮痛優先與何時可以進入 spontaneous breathing trial。',
    ]),
    cards([
      { title: '病因導向', body: '肺炎要抗感染，肺水腫要利尿與心臟支持，氣喘 / COPD 要解除阻塞，阿片過量要解毒；通氣支持只是橋樑。' },
      { title: 'Auto-PEEP 管理', body: '對阻塞性肺病，常需要降低呼吸頻率、延長呼氣時間、接受較高 PaCO2，而不是硬把分鐘通氣拉滿。' },
      { title: 'Liberation 思維', body: '成功插管不是結束，真正關鍵是何時能安全減鎮靜、評估自主呼吸、避免不必要長期依賴。' },
      { title: '團隊合作', body: '呼吸治療師、護理師、醫師與藥師對設定、鎮靜、痰液管理與去機策略都高度互賴。' },
    ], 'comparison-grid'),
    callout(
      'success',
      'ARDS 高價值原則',
      p('低潮氣量、限制平台壓、適當 PEEP、重度低氧時的俯臥、保守液體策略與嚴格避免不必要過度鎮靜，是目前 ARDS 管理最穩固的骨架。'),
    ),
  ),
  section(
    'pharmacology',
    '常用藥物機轉、副作用、交互作用',
    lead('呼吸衰竭相關藥理不是獨立章節，而是與機械通氣一起工作的工具箱。'),
    table(
      ['藥物類別', '代表藥', '用途', '高頻注意事項'],
      [
        ['鎮靜與鎮痛', 'Propofol, Dexmedetomidine, Fentanyl', '提升同步性、減少焦慮與疼痛', '低血壓、譫妄、呼吸抑制與 prolonged ventilation 風險要平衡'],
        ['插管誘導', 'Etomidate, Ketamine', '快速序列插管時維持條件', 'hemodynamics 與支氣管擴張特性要依病況選擇'],
        ['神經肌肉阻斷', 'Rocuronium, Cisatracurium', '插管與特定重度 ARDS 同步性需求', '需要充分鎮靜與明確適應症，避免無目的長期使用'],
        ['支氣管擴張', 'Albuterol, Ipratropium', '阻塞性病因時降低氣道阻力', '心悸、低鉀與分泌物處理仍要同步做'],
        ['病因藥物', 'Antibiotic, Diuretic, Steroid, Naloxone 等', '處理原始病因', '真正改變預後的通常是病因治療，不是鎮靜本身'],
      ],
    ),
    formula('分鐘通氣', 'Minute ventilation = Tidal volume x Respiratory rate', '看似簡單，但若病人是阻塞型病因，把呼吸頻率一味拉高可能反而加重 auto-PEEP。'),
    formula('壓力支持同步概念', 'Patient effort + ventilator assist -> total inspiratory work', '呼吸機的目的之一是分攤做功，不是完全忽略病人的力學背景。同步不良時，先找原因再怪病人。'),
    callout(
      'danger',
      '常見藥理陷阱',
      p('過度鎮靜會掩蓋神經學變化、延長插管與造成低血壓；但鎮靜不足又會造成嚴重不同步與高耗氧。呼吸衰竭藥理的核心是 titration，而不是固定配方。'),
    ),
  ),
  section(
    'special-populations',
    '特殊族群考量',
    lead('呼吸衰竭在不同族群的支持策略常截然不同。'),
    cards([
      { title: 'COPD / 氣喘', body: '最需要注意 auto-PEEP、呼氣時間、NIV 適應症與避免過度分鐘通氣。' },
      { title: '肥胖低通氣與 OSA', body: '胸壁負荷、上氣道塌陷與慢性高碳酸背景會讓 NIV 與體位管理更重要。' },
      { title: '神經肌肉病', body: '病人可能氧合還不錯，但咳嗽能力與呼吸肌力量已經撐不住，因此需更早主動評估 FVC / NIF。' },
      { title: '妊娠與兒科', body: '生理儲備與目標值不同，處置閾值與通氣策略不能直接照搬一般成人。' },
    ]),
  ),
  section(
    'clinical-pitfalls',
    '常見臨床陷阱',
    lead('呼吸衰竭最常見的錯，是把監測數字當成病人，把呼吸機當成治療本體。'),
    misconceptionList([
      { myth: '插管後就穩了。', correction: '插管只是把病人帶進另一段高風險旅程。設定、鎮靜、血流動力、病因治療與去機規劃同樣關鍵。' },
      { myth: 'CO2 retention 病人不能給氧。', correction: '缺氧仍必須治療。真正問題不是能不能給氧，而是要有目標、有監測、避免無限制過度氧合。' },
      { myth: '把潮氣量開大，血氣比較快好看。', correction: '大潮氣量可能造成 ventilator-induced lung injury。對 ARDS 或順應性差的肺，保護肺比追求短期漂亮 ABG 更重要。' },
    ]),
  ),
  section(
    'case-discussion',
    'Case-based discussion',
    lead('病例：67 歲男性，COPD 與高血壓病史，因呼吸困難與膿痰來急診。到院時使用輔助呼吸肌、講話斷句、血氧 86%，ABG：pH 7.27、PaCO2 68 mmHg、PaO2 54 mmHg。胸部 X 光顯示雙肺過度充氣，無明顯新浸潤。'),
    table(
      ['臨床問題', '思路'],
      [
        ['這是哪一型呼吸衰竭？', '屬高碳酸合併低氧的 acute-on-chronic respiratory failure，最常見於 COPD 惡化。'],
        ['第一線支持是什麼？', '若可配合且無禁忌，NIV 是極高價值選擇，同步給支氣管擴張、系統性類固醇與目標性氧療。'],
        ['什麼情況要準備插管？', '若意識惡化、血流動力不穩、無法配合 NIV、嚴重分泌物或 NIV 後仍持續酸化惡化，就要升級。'],
      ],
    ),
    callout(
      'clinical',
      '案例整合',
      p('這個病人的重點不在於把 PaCO2 立刻拉回正常，而是盡快降低呼吸做功、改善氣道阻塞、給適當氧氣並密切看 NIV 是否真的在幫他逆轉酸血症。'),
    ),
    summary('案例結論', '呼吸衰竭管理真正成熟時，你會同時看見病因、力學、支持層級與去機終點，而不是只看到一張 ABG。', [
      '先看病人，再看數值。',
      '氧合與通氣是兩個不同問題。',
      '呼吸機是橋樑，病因治療才是目的地。',
    ]),
  ),
);
