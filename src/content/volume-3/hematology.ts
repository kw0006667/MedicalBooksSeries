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
  references,
  section,
  spotlight,
  summary,
  table,
  tags,
  takeawayList,
  hematologyViewer,
} from './shared.js';

export const hematologyChapters: Record<string, ChapterContent> = {};

hematologyChapters.ch26 = chapter(
  '貧血 (Anemia)',
  section(
    'anatomy-physiology',
    '正常解剖與生理',
    lead('貧血 (Anemia) 不是一個單一疾病，而是一個代表紅血球 (Red blood cell, RBC) 數量、血紅素 (Hemoglobin, Hb) 或攜氧能力下降的臨床結果。要把貧血真正學懂，必須同時看到骨髓 (Bone marrow) 的造血、腎臟分泌紅血球生成素 (Erythropoietin, EPO)、鐵代謝 (Iron metabolism)、葉酸 (Folate) 與維生素 B12 (Vitamin B12) 的 DNA 合成，以及脾臟與網狀內皮系統 (Reticuloendothelial system) 的紅血球清除。'),
    p('正常紅血球壽命大約 120 天。骨髓每天需要持續補上被清除的細胞，所以任何一個環節失衡，都可能以貧血表現。鐵是血基質 (Heme) 的核心；B12 與葉酸則負責核酸合成，缺乏時會出現細胞核成熟落後、細胞體積變大；腎臟若 EPO 不足，骨髓即使原料足夠，也可能造不出足夠紅血球。'),
    tags(['Erythropoiesis', 'Hepcidin', 'Iron homeostasis', 'Reticulocyte', 'Bone marrow']),
    hematologyViewer('marrow-anatomy'),
    diagram('hematopoiesis-map'),
    cards([
      { title: '骨髓 (Bone marrow)', body: '真正的生產線。造血幹細胞分化成紅血球、白血球與血小板，任何浸潤、纖維化、化療毒性或缺乏原料都會讓產量下降。' },
      { title: '腎臟 (Kidney)', body: '腎臟感知缺氧後分泌 EPO，決定骨髓是否收到加速造血指令。慢性腎臟病常因 EPO 相對不足而出現 normocytic anemia。' },
      { title: '肝臟與 hepcidin', body: 'Hepcidin 是鐵代謝總閥門。發炎時 hepcidin 上升，鐵被鎖在巨噬細胞與腸黏膜，導致 functional iron deficiency。' },
      { title: '脾臟 (Spleen)', body: '脾臟負責清除老化、變形或被抗體包覆的紅血球，因此在溶血性貧血與脾功能亢進時非常關鍵。' },
    ]),
    formula('轉鐵飽和度', 'Transferrin saturation = Serum iron / TIBC x 100%', '這個值幫助判讀可動用鐵是否足夠。Ferritin 很低通常支持缺鐵；但發炎時 ferritin 可能偏高，不能只看單一數值。'),
    formula('血基質合成起點', 'Succinyl-CoA + Glycine -> delta-ALA', '血基質生成是血紅素生物合成的起點，缺鐵、鉛暴露、維生素 B6 缺乏與骨髓疾病都可能讓這條路徑被卡住。'),
    summary('生理重點', '貧血的底層問題通常落在三類：做不出來、流失太多、或被破壞太快。臨床思考要先分機轉，再談補什麼藥。', [
      '骨髓產量、原料供應與周邊破壞缺一不可。',
      'Hepcidin 讓發炎性貧血與單純缺鐵的處理完全不同。',
      'Reticulocyte 是判斷骨髓反應最實用的動態線索之一。',
    ]),
  ),
  section(
    'symptoms',
    '常見主訴與症狀',
    lead('貧血最常見的臨床表現是疲倦、活動喘、心悸、頭暈、運動耐受差與臉色蒼白，但症狀強度不只由 Hb 數字決定，還受「發生速度」影響。慢性貧血病人即使 Hb 很低，也可能因循環代償而表現相對平穩；急性失血病人則可能在 Hb 還來不及掉很多前就出現休克。'),
    p('症狀也常透露病因方向。缺鐵性貧血 (Iron deficiency anemia, IDA) 常伴隨異食癖 (Pica)、匙狀甲 (Koilonychia)、掉髮與不寧腿；巨球性貧血 (Macrocytic anemia) 若由 B12 缺乏造成，可能合併步態不穩、周邊神經病變與舌炎；溶血性貧血 (Hemolytic anemia) 則可能出現黃疸、深色尿與脾腫大。'),
    table(
      ['臨床情境', '常見主訴', '可能線索', '容易誤解之處'],
      [
        ['慢性缺鐵', '容易累、爬樓梯喘、月經量大', '慢性失血或吸收不良', '病人常被當成單純熬夜或壓力大'],
        ['急性失血', '頭暈、站起來黑矇、心悸、冒冷汗', '內出血、外傷、腸胃道出血', '初期 Hb 可能還沒反映嚴重度'],
        ['B12 缺乏', '疲倦、麻木、步態不穩、記憶變差', '神經學症狀與 megaloblastic change', '只補葉酸可能讓血球變好但神經惡化被掩蓋'],
        ['溶血', '黃疸、茶色尿、腰痛、脾大', 'RBC 提前被破壞', '常被誤認為肝病或泌尿道問題'],
      ],
    ),
    callout(
      'clinical',
      '真實場景',
      p('52 歲女性，半年來反覆覺得心悸、頭暈、專注力差，原本以為是更年期。抽血發現 Hb 7.9 g/dL、MCV 68 fL、ferritin 5 ng/mL。她每月經血量大，還自行長期服用 NSAID 止痛。這個場景提醒兩件事：一，症狀可能被歸因到荷爾蒙或壓力；二，缺鐵不是診斷終點，還要追「為什麼會缺」。'),
    ),
    takeawayList([
      { title: '急與慢要分開', body: '急性失血先看血流動力學，慢性貧血才有餘裕用 MCV 與鐵指標慢慢分類。' },
      { title: '症狀會被共病蓋住', body: '心衰竭、COPD、焦慮症、失眠與憂鬱都可能讓貧血症狀被誤解或延遲察覺。' },
      { title: '神經症狀有指向性', body: '巨球性貧血合併麻木、步態改變或認知症狀時，B12 缺乏要特別前移。' },
    ]),
  ),
  section(
    'pathophysiology',
    '重要疾病機轉',
    lead('最實用的貧血機轉三分法是：生產不足 (Underproduction)、流失 (Blood loss)、破壞增加 (Hemolysis)。再往下分類時，可搭配平均紅血球體積 (Mean corpuscular volume, MCV) 與網狀紅血球 (Reticulocyte) 反應。Microcytic anemia 常想到缺鐵、地中海型貧血 (Thalassemia)、慢性發炎與 sideroblastic process；normocytic anemia 常見於 CKD、慢性疾病、骨髓抑制或急性失血；macrocytic anemia 則要想 B12、葉酸、肝病、酒精、甲狀腺低下與骨髓異常。'),
    p('發炎性貧血 (Anemia of inflammation / chronic disease) 的核心不是絕對缺鐵，而是鐵被困住。IL-6 等發炎訊號刺激 hepcidin 上升，讓腸道吸收鐵下降、巨噬細胞不願釋放鐵，骨髓雖然「庫存還有」，卻拿不到足夠鐵做血紅素。這也是為什麼 ferritin 可高、serum iron 卻低。'),
    cards([
      { title: '缺鐵性貧血', body: '最常見。高頻原因包括經血過多、消化道慢性失血、胃切除、celiac disease、H. pylori 與營養攝取不足。' },
      { title: '巨球性貧血', body: '核酸合成受阻導致紅血球前驅細胞分裂延遲，常見 hypersegmented neutrophils。B12 缺乏還會傷害神經髓鞘。' },
      { title: '溶血性貧血', body: '可分免疫性、酵素缺陷、膜病、微血管病變或機械性破壞。LDH 上升、haptoglobin 下降、indirect bilirubin 上升是常見組合。' },
      { title: '骨髓失敗', body: '再生不良性貧血、骨髓浸潤、MDS、藥物與化療都會讓骨髓造血線整體受抑。這時常不只 Hb 低，血小板與白血球也可能一起掉。' },
    ], 'comparison-grid'),
    misconceptionList([
      { myth: 'Ferritin 正常就一定不是缺鐵。', correction: '錯。發炎、肝病、肥胖與惡性腫瘤都可讓 ferritin 假性升高，這時要合併 transferrin saturation、CRP 與臨床情境判讀。' },
      { myth: 'Hb 低就是要先輸血。', correction: '輸血是支持性治療，不是所有貧血的第一線。關鍵是 hemodynamic、症狀、急性程度與病因。很多病人真正需要的是補鐵、治出血源或處理骨髓病。' },
      { myth: 'B12 跟葉酸缺乏都只是大顆紅血球，補哪個都差不多。', correction: '不一樣。B12 缺乏可造成不可逆神經傷害，單補葉酸可能把血球數字改善，卻讓神經問題被延後發現。' },
    ]),
  ),
  section(
    'diagnosis',
    '診斷思路與鑑別診斷',
    lead('貧血診斷不能停在「有沒有 anemia」，而是要回答四個問題：真的貧血到什麼程度？骨髓有沒有適當反應？分類是 microcytic、normocytic 還是 macrocytic？真正病因是缺料、出血、溶血還是骨髓問題？這四題按順序解，鑑別診斷就會自然收斂。'),
    table(
      ['步驟', '關鍵問題', '常用工具', '臨床價值'],
      [
        ['確認型態', 'Hb、MCV、RDW 怎麼樣？', 'CBC', '先做初步分型'],
        ['看骨髓反應', 'Reticulocyte 有沒有上來？', 'Retic count / corrected retic', '高 retic 支持失血或溶血'],
        ['找原料或破壞證據', '鐵、B12、folate、hemolysis labs 如何？', 'Ferritin、TSAT、B12、LDH、bilirubin、haptoglobin', '區分缺乏與破壞'],
        ['找根因', '為什麼會這樣？', '出血史、GI workup、藥物史、骨髓檢查', '避免只補數字不補病因'],
      ],
    ),
    list([
      'MCV 只是入口，不是答案。缺鐵合併 B12 缺乏、輸血後、reticulocytosis 或酒精使用都會把型態搞混。',
      'Reticulocyte index 比單純 retic percentage 更有意義，因為嚴重貧血時百分比容易被誤讀。',
      '年長男性或停經後女性出現新發缺鐵性貧血時，消化道出血或惡性腫瘤一定要前移。',
      'Coombs test 陽性支持免疫性溶血，但陰性不完全排除溶血，仍要綜合 smear 與臨床判斷。',
    ]),
    spotlight('一個常被漏掉的問題', '缺鐵不是終點診斷，而是病理生理描述。成人缺鐵性貧血真正要追的是慢性失血來源、吸收障礙、手術史、飲食型態與發炎狀態。'),
  ),
  section(
    'investigations',
    '關鍵檢查與判讀',
    lead('CBC 加上 peripheral smear 常常已經給出非常多資訊。低 MCV、high RDW、elliptocytes 或 pencil cells 會把你帶向缺鐵；target cells 讓人想到 thalassemia 或肝病；schistocytes 要警覺微血管病變；spherocytes 可能是 AIHA 或 hereditary spherocytosis；hypersegmented neutrophils 則很支持 megaloblastic process。'),
    table(
      ['檢查', '何時有用', '典型變化', '解讀提醒'],
      [
        ['Ferritin', '懷疑缺鐵', '低 ferritin 高度支持缺鐵', '發炎時可假性正常或偏高'],
        ['Peripheral smear', '任何不明貧血', '形態異常提供病因線索', '別只看自動分析數字'],
        ['Hemolysis panel', '黃疸、深色尿、retic 高', 'LDH 高、間接膽紅素高、haptoglobin 低', '肝病也可能影響部分數值'],
        ['B12 / MMA / Homocysteine', 'macrocytosis 或神經症狀', 'B12 低、MMA 高', '邊界值時可用 MMA 幫助釐清'],
        ['Bone marrow biopsy', '多系統細胞低下、異常細胞、懷疑 MDS / 浸潤', 'cellularity、blast、fibrosis、infiltration', '不是所有 anemia 都要做到骨髓'],
      ],
    ),
    callout(
      'warning',
      '檢查順序常見錯誤',
      p('先輸血再抽 iron studies、B12 或 hemolysis labs，可能讓後續判讀變模糊。若病人狀況允許，重要基線檢驗應盡量在輸血或大量補充前取得。'),
    ),
    h3('臨床上高價值的加問'),
    list([
      '月經量、黑便、血便、捐血頻率、手術史、胃切除或 bariatric surgery。',
      '長期 PPI、metformin、alcohol、linezolid、hydroxyurea、methotrexate、抗癲癇藥。',
      '家族史、族群背景與慢性溶血或 thalassemia 線索。',
      '感染、自體免疫病、CKD、癌症、體重下降與發燒。',
    ]),
  ),
  section(
    'treatment',
    '第一線與第二線治療',
    lead('治療貧血時最重要的原則是「治病因 + 補缺口 + 控風險」。只把 Hb 拉高而不處理失血、吸收不良、溶血或骨髓失敗，病人很快又會掉回來。不同病因的第一線治療也完全不同：缺鐵補鐵、B12 缺乏補 B12、AIHA 先免疫抑制、CKD anemia 評估 ESA 與鐵、急性失血先止血與 resuscitation。'),
    table(
      ['情境', '第一線處理', '常見搭配', '注意事項'],
      [
        ['缺鐵性貧血', '口服鐵劑或 IV iron', '同時找失血源', '不要只補鐵不找病因'],
        ['CKD anemia', '鐵補充 + 視情況用 ESA', '腎性貧血整體照護', '先排鐵不足與發炎活躍'],
        ['巨球性貧血', '補 B12 或葉酸', '處理飲食 / 吸收病因', '疑似 B12 缺乏時不要只補葉酸'],
        ['溶血性貧血', '依病因給 steroid、rituximab 或支持治療', '必要時輸血、葉酸、處理觸發因子', '先分免疫性與非免疫性'],
        ['急性失血', '止血、輸液、輸血', '逆轉抗凝、內視鏡或手術', '數值可落後臨床狀態'],
      ],
    ),
    cards([
      { title: '輸血 (RBC transfusion)', body: '用在症狀明顯、缺氧風險高、hemodynamic 不穩或急性失血情境。輸血門檻常採限制性策略，但必須回到病人的整體臨床狀況。' },
      { title: '口服鐵劑', body: '適合穩定缺鐵病人。服藥時間、胃腸副作用與依從性決定成敗，近年也常採隔日補充減少 hepcidin 干擾。' },
      { title: '靜脈鐵劑', body: '對腸胃吸收差、發炎活躍、需快速回補、CKD 或口服不耐受者很有價值。' },
      { title: 'ESA', body: 'Epoetin alfa 或 darbepoetin 主要在 CKD 與特定腫瘤治療情境使用，不是所有 anemia 都能靠它解決。' },
    ], 'comparison-grid'),
    callout(
      'success',
      '實務上的常見有效組合',
      p('缺鐵性貧血若由 menorrhagia 或 GI bleeding 引起，真正有效的治療通常是「補鐵 + 處理出血源」。CKD anemia 則常是「鐵補充 + ESA + 腎臟慢病整體管理」的組合，而不是單一藥物。'),
    ),
  ),
  section(
    'pharmacology',
    '常用藥物機轉、副作用、交互作用',
    lead('同樣是治貧血，藥物藥理差異極大。口服鐵是補原料；IV iron 是繞過腸道直接回補鐵庫；ESA 是促進骨髓增產；B12 與葉酸是補 DNA 合成工具；免疫性溶血則靠 steroid、rituximab 或其他免疫抑制切斷破壞。'),
    table(
      ['藥物', '主要用途', '關鍵副作用', '臨床提醒'],
      [
        ['Ferrous sulfate / ferrous fumarate', '缺鐵性貧血', '噁心、便秘、黑便', '與鈣、茶、咖啡、PPI、甲狀腺素會影響吸收'],
        ['IV iron', '口服不耐、吸收差、CKD、發炎性缺鐵', '輸注反應、低磷血症視製劑而定', '不是所有製劑的單次可給量都相同'],
        ['Epoetin alfa / darbepoetin', 'CKD anemia、部分化療相關貧血', '高血壓、血栓風險上升', '目標不是把 Hb 拉到正常人範圍'],
        ['Vitamin B12', 'B12 deficiency', '通常耐受佳', '惡性貧血與迴腸吸收障礙常需長期補充'],
        ['Folic acid', '葉酸缺乏', '通常耐受佳', '補充前先排 B12 缺乏'],
      ],
    ),
    formula('Cyanocobalamin 分子式', 'C63H88CoN14O14P', '維生素 B12 結構複雜，臨床意義在於參與 DNA 合成與神經系統代謝。'),
    formula('Ferrous sulfate 化學式', 'FeSO4', '鐵劑不是吃進去就等於吸收成功。腸道環境、hepcidin、藥物交互作用與病人依從性都會改變實際有效性。'),
    callout(
      'danger',
      '高頻交互作用',
      p('口服鐵與 levothyroxine、tetracycline、fluoroquinolone、bisphosphonate 同服會降低吸收；metformin 與長期 PPI 會增加 B12 缺乏風險；ESA 則需要同步監測血壓與血栓風險。'),
    ),
  ),
  section(
    'special-populations',
    '特殊族群考量',
    lead('特殊族群的貧血評估常比一般教科書更複雜，因為病因常是混合型。孕婦可能同時有稀釋性變化與缺鐵；老年人常合併 CKD、慢性發炎、骨髓疾病與隱性 GI bleeding；癌症病人則可能同時有失血、骨髓抑制、functional iron deficiency 與慢病性貧血。'),
    cards([
      { title: '妊娠', body: '血漿容積增加會造成生理性稀釋，但真正缺鐵仍要積極辨認，因為會影響母體耐受與胎兒發展。' },
      { title: '慢性腎臟病', body: '腎性貧血常需整合 iron status、ESA、透析狀態與感染/發炎活動度。' },
      { title: '高齡者', body: '缺鐵與惡性腫瘤、MDS、CKD、慢性發炎可同時存在，不能用單一答案解釋所有數值。' },
      { title: '腫瘤病人', body: '化療、骨髓浸潤、失血與功能性缺鐵常交錯，輸血與 ESA 使用要看腫瘤治療目標與風險。' },
    ]),
  ),
  section(
    'clinical-pitfalls',
    '常見臨床陷阱',
    lead('貧血最常見的臨床錯誤不是不會背分類，而是太早滿足於「補起來就好」。'),
    misconceptionList([
      { myth: '缺鐵補鐵就完成治療。', correction: '若來源是大腸癌、胃潰瘍、NSAID 出血或 menorrhagia，沒有處理根因就只是延後再次惡化。' },
      { myth: '老年人 Hb 低一點正常，不用太在意。', correction: '高齡確實常有慢病，但新發或逐漸下降的 anemia 仍需追原因，尤其是 GI bleeding、腎病與骨髓疾病。' },
      { myth: 'Macrocytosis 一定是 B12 不夠。', correction: '酒精、肝病、甲狀腺低下、reticulocytosis、藥物與 MDS 都可能造成 macrocytosis。' },
    ]),
  ),
  section(
    'case-discussion',
    'Case-based discussion',
    lead('病例：67 歲男性，近 4 個月漸進性疲倦、呼吸喘、體重減輕 3 公斤，抽血 Hb 8.2 g/dL、MCV 72 fL、ferritin 14 ng/mL。病人否認明顯便血，但糞便潛血陽性。'),
    table(
      ['臨床問題', '思考方向'],
      [
        ['最可能是什麼類型？', 'Microcytic anemia 合併低 ferritin，高度支持缺鐵性貧血。'],
        ['下一步不是什麼？', '不是只有開鐵劑了事，因為這位是高齡男性，新發缺鐵一定要積極找 GI 出血或腫瘤。'],
        ['需安排哪些檢查？', '上消化道與大腸評估、藥物史、飲食與吸收病史，同時評估是否需要短期輸血支持。'],
      ],
    ),
    callout(
      'clinical',
      '案例整合',
      p('這類病人最容易被誤處理成「年紀大、食慾差所以貧血」。真正成熟的處理是把缺鐵當作警報而不是終點，並同步評估是否需要短期補血與長期根因治療。'),
    ),
    references('章內來源註記', [
      {
        label: 'ASH：Iron-Deficiency Anemia Clinical Practice Guideline',
        url: 'https://www.hematology.org/education/clinicians/guidelines-and-quality-care/clinical-practice-guidelines/iron-deficiency-anemia',
        note: '用於缺鐵性貧血的診斷與治療框架，特別是 oral / IV iron 與 workup 重點。',
      },
      {
        label: 'ASH：Iron Deficiency',
        url: 'https://www.hematology.org/education/patients/anemia/iron-deficiency',
        note: '補強缺鐵性貧血的基本病理生理、症狀與臨床溝通脈絡。',
      },
      {
        label: 'NIDDK：Anemia in Chronic Kidney Disease',
        url: 'https://www.niddk.nih.gov/health-information/kidney-disease/anemia',
        note: '用於 CKD anemia、EPO 不足與特殊族群治療思路。',
      },
    ]),
  ),
);

hematologyChapters.ch27 = chapter(
  '凝血異常 (Coagulation Disorders)',
  section(
    'anatomy-physiology',
    '正常解剖與生理',
    lead('止血 (Hemostasis) 不是一條單線路，而是內皮 (Endothelium)、血小板 (Platelets)、凝血因子 (Coagulation factors)、天然抗凝系統與纖維溶解 (Fibrinolysis) 的動態平衡。臨床上最常見的學習錯誤，是把 primary hemostasis、secondary hemostasis 與 pathologic thrombosis 混成一件事。真正理解後，你才會知道為什麼有些病人牙齦流血、瘀青與鼻血很多，有些則是關節出血或深部肌肉出血。'),
    p('Primary hemostasis 依賴血管收縮、內皮暴露下的 collagen、von Willebrand factor (VWF) 與血小板黏附聚集；secondary hemostasis 則依賴 thrombin 生成與 fibrin 網形成穩固血塊。天然抗凝系統如 antithrombin、protein C / S 與 TFPI 會限制凝血擴大；plasmin 則負責拆解 fibrin。這張網若過弱，病人出血；若過強或失控，病人血栓。'),
    tags(['Primary hemostasis', 'Secondary hemostasis', 'vWF', 'Thrombin', 'Fibrinolysis']),
    hematologyViewer('clotting-balance'),
    diagram('coagulation-cascade-map'),
    cards([
      { title: '內皮 (Endothelium)', body: '平常偏抗凝，受傷後才轉成促凝。它同時是 VWF 儲存與釋放的重要來源。' },
      { title: '血小板 (Platelet)', body: '在高剪力環境與動脈端尤其重要，因此 mucosal bleeding 與 platelet disorder 常走在一起。' },
      { title: '凝血因子', body: '真正把鬆散的血小板栓塞轉成穩固 fibrin clot。Hemophilia 與肝病多在這層表現。' },
      { title: '纖維溶解系統', body: '負責讓血塊該散的時候散。過度活化會出血，抑制過多則血栓風險上升。' },
    ]),
    formula('aPTT 測的是什麼', 'Intrinsic + common pathway', '臨床上要記得 aPTT 延長不等於一定有出血，也可能是 lupus anticoagulant；相反地，正常 aPTT 也不排除所有出血性疾病。'),
    summary('止血重點', '看到凝血異常時，要先問：這是黏膜型出血還是深部型出血？是血小板問題、因子問題、消耗性凝血，還是藥物/肝病造成的平衡重寫？', [
      'Primary hemostasis 偏 mucosal bleeding。',
      'Factor deficiency 偏 hemarthrosis 與深部出血。',
      'DIC 是全身失控，不是單純「凝血變差」。',
    ]),
  ),
  section(
    'symptoms',
    '常見主訴與症狀',
    lead('不同凝血異常的出血型態非常有鑑別力。血小板或 VWF 問題常表現為鼻血、牙齦出血、月經量大、皮膚瘀點 (Petechiae) 與表淺瘀斑；凝血因子缺乏則更常見關節出血 (Hemarthrosis)、肌肉內出血、術後深部出血或遲發性再出血。DIC 或重症肝病則可能同時出血與血栓並存。'),
    table(
      ['表現型', '較支持哪一類', '臨床例子', '關鍵提醒'],
      [
        ['鼻血、牙齦出血、月經過多', 'Platelet / VWF disorder', 'VWD、ITP、抗血小板藥物', '黏膜型出血很常是第一提示'],
        ['關節腫痛、肌肉深部血腫', 'Factor deficiency', 'Hemophilia A/B', '這類出血常不是靠壓迫就能解決'],
        ['多處針孔滲血、器官功能惡化', 'DIC', '敗血症、產科急症、急性白血病', '要把它當系統性急症處理'],
        ['神經症狀、腎損傷加上血小板低', 'Microangiopathy', 'TTP / HUS', '看到 schistocyte 時要快，不要等 ADAMTS13 才處理'],
      ],
    ),
    callout(
      'clinical',
      '真實場景',
      p('19 歲男性打籃球後膝關節腫痛，以為只是扭傷，結果每次小撞擊都腫很久，抽血發現 aPTT 延長、factor VIII 活性低。真正問題不是運動過度，而是未被診斷的 hemophilia A。深部反覆出血若被拖延，關節會慢性受損。'),
    ),
    takeawayList([
      { title: '出血型態比背檢驗更快', body: '先分 mucosal vs deep bleeding，常比先盯著 PT / aPTT 更快把方向抓出來。' },
      { title: '月經過多不能只當婦科問題', body: '年輕女性重度 menorrhagia 有時第一個被看見的其實是 VWD。' },
      { title: 'TTP 是時間敏感診斷', body: '血小板低加溶血性貧血與器官症狀時，要先想 plasma exchange 路徑，而不是等完整答案。' },
    ]),
  ),
  section(
    'pathophysiology',
    '重要疾病機轉',
    lead('凝血異常大致可分成五大群：血小板數量下降、血小板功能異常、VWF 異常、凝血因子缺乏或抑制、以及消耗性或失衡性凝血。ITP 是免疫性周邊破壞；VWD 是最常見遺傳性出血疾病；hemophilia A / B 則是 factor VIII / IX 缺乏；DIC 是全身性 thrombin 與 fibrinolysis 失控；肝病則會把促凝與抗凝一起拉低，形成 rebalanced but fragile hemostasis。'),
    cards([
      { title: 'VWD', body: 'VWF 下降或功能異常會同時影響血小板黏附與 factor VIII 穩定，臨床多以黏膜出血為主。' },
      { title: 'Hemophilia', body: 'Factor deficiency 讓 fibrin clot 無法穩定，常見深部與關節出血，需學會在運動、外傷與手術情境做預防。' },
      { title: 'DIC', body: '不是單純凝血變差，而是全身先過度凝血再耗竭，造成微血栓、器官衰竭與出血同時存在。' },
      { title: 'TTP / HUS', body: '微血管中形成富血小板微血栓，造成 hemolysis、血小板低與器官缺血。這類病人常比單純 DIC 更需要專一處置。' },
    ], 'comparison-grid'),
    misconceptionList([
      { myth: 'PT / aPTT 正常就代表沒有出血體質。', correction: '不對。VWD、血小板功能異常與部分 mild factor deficiency 可有近乎正常的 PT / aPTT。病史與 bleeding phenotype 依然重要。' },
      { myth: '肝病病人 INR 高，所以一定不會血栓。', correction: '肝病是脆弱重平衡，不是單向抗凝。病人仍可能門靜脈栓塞或 VTE，也可能程序時出血。' },
      { myth: 'DIC 就是把凝血補起來。', correction: '核心仍是處理誘發原因，例如敗血症、產科急症或白血病。血品支持是配合，不是主軸。' },
    ]),
  ),
  section(
    'diagnosis',
    '診斷思路與鑑別診斷',
    lead('凝血異常的診斷路徑最好先從 phenotype 出發，再用檢驗定位。第一步問出血型態、家族史、藥物史、手術牙科出血經驗與月經史；第二步看 CBC、PT / INR、aPTT、fibrinogen、D-dimer；第三步才進入 mixing study、factor assay、VWF panel、platelet function 或 ADAMTS13 等更專一工具。'),
    table(
      ['檢驗組合', '可能方向', '下一步'],
      [
        ['血小板低，PT / aPTT 正常', 'ITP、TTP、藥物、骨髓問題', 'smear、溶血指標、病史與必要時骨髓評估'],
        ['血小板正常，aPTT 延長', 'Hemophilia、VWD、lupus anticoagulant、heparin', 'mixing study、factor VIII / IX、VWF panel'],
        ['PT 與 aPTT 都延長，fibrinogen 低，D-dimer 高', 'DIC、嚴重肝病、大量稀釋', '找誘發原因與即時支持'],
        ['月經過多、鼻血、家族史，常規檢驗近正常', 'VWD 或 platelet function disorder', 'VWF antigen / activity、必要時功能檢查'],
      ],
    ),
    list([
      'Mixing study 校正代表傾向因子缺乏，不校正要想到 inhibitor 或 lupus anticoagulant。',
      'Platelet count 正常不代表 platelet function 正常，aspirin、uremia 與遺傳性缺陷都可能讓功能出血。',
      'Schistocyte 加 thrombocytopenia 是警訊，尤其合併神經學症狀或腎損傷時要把 TTP / HUS 迅速拉進來。',
      '每次凝血異常都要重問藥物：warfarin、DOAC、heparin、aspirin、P2Y12 inhibitor、NSAIDs、草藥與保健品。'
    ]),
    spotlight('病史常比數值更早破案', '小時候拔牙後止不住、家族男性關節腫血、每次月經都要請假、以前手術流血很多，這些都比單次 PT / aPTT 更能提示真正的止血體質。'),
  ),
  section(
    'investigations',
    '關鍵檢查與判讀',
    lead('凝血異常的檢查不是愈多愈好，而是要能回答「哪一層出了問題」。CBC 看血小板與是否合併貧血；peripheral smear 看 schistocyte；PT / aPTT 看路徑層級；fibrinogen 與 D-dimer 看消耗與纖溶；mixing study、VWF panel、factor assay 則幫你更精準定位。'),
    table(
      ['檢查', '用途', '典型變化', '判讀陷阱'],
      [
        ['PT / INR', '看 extrinsic / common pathway', 'Warfarin、肝病、DIC 可延長', '不是專門預測程序出血風險的萬能指標'],
        ['aPTT', '看 intrinsic / common pathway', 'Hemophilia、heparin、lupus anticoagulant', '延長可代表血栓傾向或出血體質，不能只看方向'],
        ['Mixing study', '分缺乏 vs 抑制物', '校正支持 factor deficiency', '時間依賴性 inhibitor 可能需 incubation'],
        ['VWF antigen / activity', '篩 VWD', '量或功能下降', '壓力、懷孕、發炎可暫時拉高 VWF'],
        ['ADAMTS13', '支持 TTP', '活性明顯低', '臨床不能等結果才開始 plasma exchange'],
      ],
    ),
    callout(
      'warning',
      '程序前評估常見誤區',
      p('沒有出血病史、卻只因輕度 INR 異常就大量矯正，常不一定帶來真正獲益。程序風險、病史、肝病類型與是否正在出血，都要一起考量。'),
    ),
  ),
  section(
    'treatment',
    '第一線與第二線治療',
    lead('凝血異常治療的底層邏輯是「先分病型，再選擇是補缺、釋放內源儲備、抑制破壞、逆轉藥物，還是處理全身性失控」。VWD 可能用 DDAVP、VWF concentrate 與 tranexamic acid；hemophilia 以 factor replacement 或新型非因子治療為核心；ITP 重點是 immunomodulation；DIC 則優先處理原發病。'),
    table(
      ['情境', '第一線治療', '常見第二線或配合', '注意事項'],
      [
        ['VWD', 'DDAVP 視類型與試驗反應', 'VWF concentrate、TXA', '不是所有型別都適合 DDAVP'],
        ['Hemophilia A / B', 'Factor VIII / IX replacement', 'Emicizumab、bypass agent 視 inhibitor 狀態', '關節出血要及早處理'],
        ['ITP', 'Steroid、IVIG 視嚴重度', 'Rituximab、TPO agonist、脾切除', '先排 secondary cause'],
        ['DIC', '處理誘發病因', 'Cryo、platelet、FFP 視出血與程序需求', '補血品不是主要病因治療'],
        ['抗凝相關出血', '停藥與 reversal strategy', 'PCC、idarucizumab、andexanet 視藥物', '先確認最後一次用藥與腎功能'],
      ],
    ),
    cards([
      { title: 'Tranexamic acid', body: '適合 mucosal bleeding、牙科與部分月經過多情境，但血尿或高血栓風險場景要更小心。' },
      { title: 'DDAVP', body: '可促進內源性 VWF 與 factor VIII 釋放，對部分 VWD 與 mild hemophilia A 有用，但也有低鈉風險。' },
      { title: 'Factor concentrate', body: '真正缺什麼補什麼，是 hemophilia 與部分嚴重 VWD 的核心治療。' },
      { title: 'Plasma exchange', body: 'TTP 治療不能慢。若臨床高度懷疑，要把 plasma exchange 與免疫抑制前移。' },
    ], 'comparison-grid'),
    callout(
      'danger',
      '一個會害死人的順序錯誤',
      p('懷疑 TTP 時若只把它當成一般 thrombocytopenia 輸血小板、卻延遲 plasma exchange，可能使微血栓惡化。看到 thrombocytopenia 加 MAHA 與器官症狀時，優先順序必須改變。'),
    ),
  ),
  section(
    'pharmacology',
    '常用藥物機轉、副作用、交互作用',
    lead('止血藥理與抗血栓藥理其實是鏡像系統。補因子、提高 VWF、抑制纖溶、免疫抑制與 reversal agents 各在不同節點發揮作用，因此用藥前一定要先知道你要救的是哪一層的止血。'),
    table(
      ['藥物', '機轉', '常見副作用', '臨床重點'],
      [
        ['Desmopressin (DDAVP)', '釋放內源性 VWF / factor VIII', '低鈉、水滯留、頭痛', '使用前最好知道病人是否對此有反應'],
        ['Tranexamic acid', '抑制 plasminogen 活化，降低 fibrinolysis', '噁心、血栓風險考量', 'mucosal bleeding 很常用'],
        ['4-factor PCC', '快速補 vitamin K dependent factors', '血栓風險', 'warfarin reversal 常見關鍵工具'],
        ['Vitamin K', '恢復 II、VII、IX、X 合成', '起效較慢', '對 warfarin reversal 有用，對 DOAC 無用'],
        ['Caplacizumab', '抑制 vWF-platelet interaction', '出血風險', 'TTP 治療已成重要輔助工具'],
      ],
    ),
    formula('Tranexamic acid 分子式', 'C8H15NO2', '抗纖維溶解藥物的代表。臨床上價值在於保住已形成的 fibrin clot，而不是讓凝血瀑布本身更快。'),
    callout(
      'info',
      '藥物與生活史都會改寫凝血',
      p('Aspirin、ibuprofen、SSRIs、魚油、ginkgo、酒精、抗凝藥與化療都可能影響出血風險。問藥一定要含非處方藥與保健品，否則你看到的就只是半張圖。'),
    ),
  ),
  section(
    'special-populations',
    '特殊族群考量',
    lead('凝血異常在特殊族群中常牽涉完全不同的風險平衡。孕婦可能同時面臨產科出血與凝血改變；肝病病人是脆弱平衡；高齡病人常合併抗凝與跌倒風險；兒童則常從反覆瘀青、鼻血或關節出血被帶進診斷流程。'),
    cards([
      { title: '妊娠與產科', body: 'VWF 在妊娠後期可上升，但產後又快速下降；產科 DIC 與大出血需高度團隊整合。' },
      { title: '肝病', body: 'INR 異常不代表單向出血；程序風險與血栓風險都要一起評估。' },
      { title: '老年抗凝族群', body: '腎功能、藥物清單、跌倒、腦出血風險與血栓風險要反覆重估。' },
      { title: '兒童與青少年', body: '未被診斷的 VWD 或 hemophilia 常在拔牙、運動傷害或青春期月經時第一次被看見。' },
    ]),
  ),
  section(
    'clinical-pitfalls',
    '常見臨床陷阱',
    lead('凝血異常真正危險的，不是沒背到哪個 factor，而是把不同出血機轉混為一談。'),
    misconceptionList([
      { myth: '凝血異常就是把 FFP 補一補。', correction: '不同病因需要完全不同工具。VWD 可能需要 DDAVP，hemophilia 要補特定因子，TTP 要 plasma exchange，DIC 要處理誘因。' },
      { myth: '血小板低就一定要先輸血小板。', correction: 'ITP 與 TTP 的處理重點並不在常規輸血小板，尤其 TTP 亂補可能加重微血栓。' },
      { myth: '抗凝藥停掉就沒事。', correction: '真正高風險的病人停藥可能造成中風、肺栓塞或瓣膜血栓，停與不停都要基於風險平衡。' },
    ]),
  ),
  section(
    'case-discussion',
    'Case-based discussion',
    lead('病例：32 歲女性，從青春期開始就月經量多、容易鼻血，拔智齒後出血比朋友久。CBC 血小板正常，PT 正常，aPTT 邊界偏長。'),
    table(
      ['臨床問題', '思考方向'],
      [
        ['最該想到什麼？', 'VWD 必須前移，因為 phenotype 很典型。'],
        ['哪些檢查關鍵？', 'VWF antigen、VWF activity、factor VIII 活性，必要時重複檢測。'],
        ['治療會怎麼想？', '依型別考慮 DDAVP、TXA 與程序前預防策略，並協助病人建立未來手術與產科計畫。'],
      ],
    ),
    callout(
      'clinical',
      '案例整合',
      p('這類病人若只因常規凝血檢驗接近正常就被告知「沒事」，之後可能在生產、手術或牙科處置時第一次發生真正危險的大出血。bleeding history 本身就是高價值檢查。'),
    ),
    references('章內來源註記', [
      {
        label: 'WFH：Guidelines for the Management of Hemophilia',
        url: 'https://wfh.org/article/now-published-the-wfh-guidelines-for-the-management-of-hemophilia-3rd-edition/',
        note: '用於 hemophilia 的因子替代、預防與深部出血照護框架。',
      },
      {
        label: 'CDC：Von Willebrand Disease',
        url: 'https://www.cdc.gov/von-willebrand/index.html',
        note: '用於 VWD 的出血表型、診斷線索與日常管理脈絡。',
      },
      {
        label: 'CDC：Hemophilia',
        url: 'https://www.cdc.gov/hemophilia/about/index.html',
        note: '補充 hemophilia 的長期關節風險與生活場景管理。',
      },
    ]),
  ),
);

hematologyChapters.ch28 = chapter(
  '白血病與淋巴瘤 (Leukemia & Lymphoma)',
  section(
    'anatomy-physiology',
    '正常解剖與生理',
    lead('白血病與淋巴瘤的核心不是「白血球太多」或「淋巴結腫大」這麼簡單，而是造血幹細胞 (Hematopoietic stem cell)、淋巴系統 (Lymphatic system) 與基因層級調控被腫瘤化。骨髓負責製造血球，淋巴結、脾臟、胸腺與黏膜相關淋巴組織 (MALT) 則是淋巴細胞成熟、篩檢與免疫反應的重要場所。'),
    p('白血病偏向骨髓與周邊血的惡性增生；淋巴瘤則偏向淋巴結或淋巴組織形成腫塊，但兩者邊界並非絕對。急性白血病多以 blast 過多、骨髓衰竭與急症表現登場；慢性白血病與部分 indolent lymphoma 則可能在健檢或無痛性淋巴結腫大時被發現。'),
    tags(['Bone marrow niche', 'Lymph node', 'Flow cytometry', 'Cytogenetics', 'Minimal residual disease']),
    hematologyViewer('lymphoid-spread'),
    diagram('hematopoiesis-map'),
    diagram('oncology-hallmarks'),
    diagram('genetics-core'),
    cards([
      { title: '骨髓微環境 (Marrow niche)', body: '惡性細胞不只是自己長，還會改寫骨髓微環境，讓正常造血被排擠、抑制甚至耗竭。' },
      { title: '淋巴結 (Lymph node)', body: '淋巴瘤常以無痛性淋巴結腫大表現，但不同亞型的節結構、代謝活性與生長速度差異很大。' },
      { title: '脾臟與肝臟', body: '這些器官常成為浸潤與血球滯留場所，因此脾大、肝大與腹部壓迫感很常見。' },
      { title: '基因驅動', body: 'BCR-ABL1、PML-RARA、FLT3、NPM1、MYC、BCL2、BCL6 等異常決定診斷、風險與治療策略。' },
    ]),
    formula('DNA 雙股骨架概念', 'Sugar-phosphate backbone + base pairing (A-T, G-C)', '很多白血病與淋巴瘤治療之所以高度個別化，正是因為分子異常不是附屬資訊，而是治療核心。'),
    summary('底圖重點', '血液惡性腫瘤一定要同時用三種尺度理解：器官尺度看骨髓與淋巴結，細胞尺度看 blast 與成熟度，分子尺度看染色體與基因驅動。', [
      '白血病與淋巴瘤是連續體，不是完全分離世界。',
      '分型不只是學名差異，而是治療與預後差異。',
      '流式細胞儀、染色體與基因檢測是診斷核心。',
    ]),
  ),
  section(
    'symptoms',
    '常見主訴與症狀',
    lead('白血病與淋巴瘤的臨床表現大致來自四件事：骨髓被占據、器官被浸潤、免疫失衡、以及高代謝腫瘤負荷。骨髓衰竭會造成貧血、感染與出血；器官浸潤會造成淋巴結腫大、脾大、肝大、骨痛或神經壓迫；高腫瘤負荷則可能出現發燒、夜間盜汗、體重下降與腫瘤溶解症候群風險。'),
    table(
      ['表現', '臨床意義', '常見於', '容易誤認為'],
      [
        ['疲倦、蒼白、心悸', '骨髓造血被排擠造成貧血', '急性白血病、骨髓淋巴瘤浸潤', '過勞、缺鐵、情緒問題'],
        ['反覆感染、發燒', '中性球低下或免疫功能失衡', '急性白血病、CLL、治療後病人', '一般感冒或體質差'],
        ['無痛性淋巴結腫大', '淋巴瘤高頻線索', 'Hodgkin lymphoma、NHL', '感染後反應性淋巴結'],
        ['骨痛、牙齦腫、白血球極高', 'blast 浸潤或 leukostasis', 'AML', '牙周病或骨科問題'],
      ],
    ),
    callout(
      'clinical',
      '真實場景',
      p('28 歲男性，一週內快速出現疲倦、發燒、牙齦出血與腿部瘀青。急診 CBC 顯示 WBC 72,000/uL、Hb 7.1 g/dL、platelet 18,000/uL，peripheral smear 看到 blast。這種病人不是「白血球很多所以免疫很好」，而是急性白血病的教科書急症。'),
    ),
    takeawayList([
      { title: 'B symptoms 有價值但不專屬', body: '發燒、夜汗、體重下降支持高代謝腫瘤負荷，但感染、TB 與自體免疫也會這樣表現。' },
      { title: '正常白血球不代表沒事', body: '急性白血病可呈現白血球高、正常或低，重點是 smear 與臨床情境。' },
      { title: '淋巴結要看節奏', body: '感染性淋巴結通常疼痛、短期變化；持續無痛、進展性腫大要往淋巴瘤思考。' },
    ]),
  ),
  section(
    'pathophysiology',
    '重要疾病機轉',
    lead('急性白血病 (AML / ALL) 的核心是未成熟 blast 失控增生、無法正常分化，並快速排擠骨髓；慢性白血病則保留較多成熟表型，但生長調控失衡，例如 CML 的 BCR-ABL1 或 CLL 的成熟 B 細胞累積。淋巴瘤則要分 Hodgkin lymphoma 與非 Hodgkin lymphoma (NHL)，後者又可依 B-cell、T-cell、侵襲性與 indolent 行為進一步分類。'),
    cards([
      { title: '急性 vs 慢性', body: '急性病程快、blast 多、常以骨髓衰竭急症登場；慢性病程可緩慢，甚至在無症狀時被發現。' },
      { title: 'Myeloid vs lymphoid', body: '來源不同意味著診斷標誌、侵犯模式、化療方案與標靶都不同，不能只看白血球高低。' },
      { title: 'Hodgkin vs NHL', body: 'Hodgkin 常見 Reed-Sternberg cell、較有連續節區擴散傾向；NHL 異質性更高，從 indolent 到高度侵襲都有。' },
      { title: 'Tumor lysis risk', body: '高度增殖與高腫瘤量的血液惡性腫瘤在治療前後特別容易引發高尿酸、高鉀、高磷與急性腎損傷。' },
    ], 'comparison-grid'),
    misconceptionList([
      { myth: '白血球很多代表免疫力很好。', correction: '惡性白血球數量多不代表功能正常。病人反而常因中性球功能失常或治療造成免疫抑制而容易感染。' },
      { myth: '淋巴結腫大只要不痛就先觀察。', correction: '持續性、進展性、合併 B symptoms 或異常 CBC 的無痛性淋巴結，應積極評估淋巴瘤。' },
      { myth: '所有 leukemia 都要立刻化療。', correction: '像 CLL 常有 watch and wait 概念；相反地，APL、hyperleukocytosis 或 leukostasis 則是立即處理情境。' },
    ]),
  ),
  section(
    'diagnosis',
    '診斷思路與鑑別診斷',
    lead('血液腫瘤診斷不能只靠單一檢體。真正完整的診斷通常需要 CBC、peripheral smear、骨髓穿刺與切片、flow cytometry、染色體 / FISH、分子檢測，以及針對淋巴瘤的 excisional lymph node biopsy 與 PET/CT。診斷的目標不只是命名，而是分層風險與決定治療路徑。'),
    table(
      ['工具', '在做什麼', '最有價值的情境'],
      [
        ['Peripheral smear', '看 blast、Auer rod、smudge cell、異常淋巴球', '急診初步辨識與高危警訊'],
        ['Bone marrow biopsy', '確認細胞型態、cellularity、blast 比例', '白血病、骨髓浸潤、MDS 鑑別'],
        ['Flow cytometry', '用免疫表型分 lineage 與成熟度', 'AML vs ALL、CLL、淋巴增生疾病分型'],
        ['Cytogenetics / molecular', '找驅動與風險基因', 'APL、CML、AML risk、靶向治療選擇'],
        ['PET/CT 與節點切片', '看病灶分布與代謝活性', '淋巴瘤分期與治療反應評估'],
      ],
    ),
    list([
      '懷疑淋巴瘤時，若情況允許，整顆淋巴結切除活檢通常比細針抽吸更能保留結構資訊。',
      '懷疑 APL 時不能等所有檢查回來才開始考慮 ATRA，因為致命 DIC 風險很高。',
      'Hyperleukocytosis 看起來像白血球很多，但真正致命的是 leukostasis 導致肺與中樞微循環阻塞。',
      'MRD 不是只是研究名詞，而是越來越影響風險分層與後續治療決策。'
    ]),
    spotlight('別只問是哪一型，還要問急不急', 'APL、leukostasis、tumor lysis、脊髓壓迫與 febrile neutropenia 都是會改變處置時鐘的血液腫瘤急症。'),
  ),
  section(
    'investigations',
    '關鍵檢查與判讀',
    lead('血液腫瘤的檢查判讀最怕只看數值不看型態。像是 WBC 高不代表一定 AML，CLL、類固醇、感染甚至反應性變化都可能升高；而 blast、Auer rod、smudge cell、eosinophilia、LDH、uric acid、fibrinogen 與凝血異常則常一起提供更完整圖像。'),
    table(
      ['檢查', '用途', '高價值判讀'],
      [
        ['CBC + differential', '看細胞線受累程度', '雙線或三線細胞異常常代表骨髓層級問題'],
        ['LDH / uric acid', '反映 tumor burden 與細胞 turnover', '高值提示 rapid proliferation 或 TLS 風險'],
        ['Coagulation panel', '尤其在 APL 與 DIC 重要', 'fibrinogen 低與 D-dimer 高要高度警覺'],
        ['Flow cytometry', '確認 lineage 與表型', '診斷精度遠高於只看 smear impression'],
        ['PET/CT', '淋巴瘤分期與反應', '不是所有 lymphoma 的代謝活性都一樣高'],
      ],
    ),
    callout(
      'warning',
      '檢體品質會直接決定答案',
      p('流式細胞儀、骨髓檢體與分子檢測若前處理不當、標本不足或延遲處理，可能讓分型與風險評估失真。血液腫瘤的診斷品質高度依賴檢體品質。'),
    ),
  ),
  section(
    'treatment',
    '第一線與第二線治療',
    lead('白血病與淋巴瘤治療已經不再只是「化療或不化療」。現代治療包含誘導 (Induction)、整合 / 鞏固 (Consolidation)、維持治療、標靶藥物、單株抗體、雙特異性抗體、BTK inhibitor、BCL2 inhibitor、免疫治療與 CAR-T。治療選擇取決於分型、分子標記、病人年齡體能、器官功能與治療目標。'),
    table(
      ['疾病情境', '常見治療原則', '代表性藥物 / 策略', '實務提醒'],
      [
        ['AML', '誘導 + 風險導向整合', 'Cytarabine、anthracycline、FLT3 inhibitor 視分子型', '年長或 frail 病人策略不同'],
        ['APL', '分化治療優先', 'ATRA、arsenic trioxide', 'DIC 風險高，處理時鐘很重要'],
        ['CML', '靶向驅動異常', 'Imatinib、dasatinib、nilotinib', '分子追蹤比單看 CBC 更關鍵'],
        ['CLL', '依症狀與病程決定是否治療', 'BTK inhibitor、venetoclax、anti-CD20', '不是所有 CLL 都要立刻治療'],
        ['Hodgkin / Aggressive NHL', '分期導向化療 +/- 放療', 'ABVD、R-CHOP 等概念性框架', '治療前先做生育與器官基線評估'],
      ],
    ),
    cards([
      { title: '支持性治療', body: '輸血、感染預防、TLS 預防、營養與心理支持不是附屬，而是決定病人能否走完整段治療的重要主軸。' },
      { title: '標靶與免疫治療', body: '當驅動異常明確時，藥物選擇可比傳統化療更精準，但也帶來全新毒性譜與交互作用。' },
      { title: '移植 (Hematopoietic cell transplantation)', body: '對高風險或復發病人仍是關鍵選項，決策必須看疾病風險、供者、年齡與共病。' },
      { title: 'MRD 導向調整', body: '越來越多疾病用微量殘存病灶決定是否升級、維持或轉換策略。' },
    ], 'comparison-grid'),
    callout(
      'success',
      '現代血液腫瘤治療的核心轉變',
      p('今天的重點不是記住所有 regimen 字母，而是理解每個 regimen 背後要解決的生物學問題：是要快速清 blast、關閉驅動突變、動員免疫系統，還是把病程維持在可控狀態。'),
    ),
  ),
  section(
    'pharmacology',
    '常用藥物機轉、副作用、交互作用',
    lead('血液腫瘤藥理的關鍵在於「機轉與毒性綁在一起」。Anthracycline 會傷心肌、vincristine 會傷神經、asparaginase 會影響胰臟與凝血、BTK inhibitor 會增加出血與心房顫動風險、venetoclax 則與 TLS 高度相關。你不需要把所有 regimen 背死，但一定要知道每支核心藥物最怕的毒性。'),
    table(
      ['藥物', '機轉', '重要毒性 / 交互作用', '高頻監測'],
      [
        ['Imatinib', 'BCR-ABL tyrosine kinase inhibitor', '水腫、肝毒性、藥物交互作用', 'CBC、LFT、分子反應'],
        ['Rituximab', 'anti-CD20 單株抗體', '輸注反應、HBV reactivation', '感染篩檢與預防'],
        ['Venetoclax', 'BCL2 inhibitor', 'Tumor lysis syndrome、骨髓抑制', '起始漸進加量與 TLS prophylaxis'],
        ['Anthracycline', 'DNA intercalation / topoisomerase inhibition', '心毒性、骨髓抑制', '累積劑量與心臟功能'],
        ['Vincristine', '抑制微管', '周邊神經病變、腸麻痺', '神經學症狀與便祕'],
      ],
    ),
    formula('Imatinib 分子式', 'C29H31N7O', '經典小分子 TKI，象徵血液腫瘤治療從細胞毒性時代走向驅動突變導向治療。'),
    callout(
      'danger',
      '血液腫瘤用藥的常見誤解',
      p('靶向藥不是沒有毒性，而是毒性型態不同。像 BTK inhibitor、PI3K inhibitor、TKI 與免疫治療都可能帶來感染、出血、肝炎、心律與代謝問題，不能因為不是傳統化療就掉以輕心。'),
    ),
  ),
  section(
    'special-populations',
    '特殊族群考量',
    lead('血液惡性腫瘤的特殊族群考量通常比實體腫瘤更明顯，因為骨髓儲備、感染風險與腫瘤負荷對整體耐受影響極大。年長病人需要 geriatric assessment；兒童與青少年需考慮長期生長與生育；妊娠則牽涉母胎平衡；移植或免疫抑制病人更要把感染與疫苗策略前移。'),
    cards([
      { title: '高齡病人', body: '治療目標不一定只是最大強度，還要看功能狀態、跌倒風險、器官儲備與照護資源。' },
      { title: '生育保存', body: '部分化療與放療可能影響卵巢或精子功能，治療前討論非常重要。' },
      { title: '妊娠', body: '診斷與治療必須與產科協作，有些藥物與影像檢查需要調整。' },
      { title: '感染高風險宿主', body: 'HBV reactivation、PJP、HSV、真菌與疫苗策略常直接影響治療安全。' },
    ]),
  ),
  section(
    'clinical-pitfalls',
    '常見臨床陷阱',
    lead('血液惡性腫瘤最危險的陷阱，是把早期紅旗當成一般感染或一般疲勞。'),
    misconceptionList([
      { myth: '年輕人白血球高大多只是感染。', correction: '若合併 blast、貧血、血小板低、牙齦出血或骨痛，血液惡性腫瘤必須迅速前移。' },
      { myth: '淋巴瘤一定會很痛或很快變大。', correction: '很多淋巴瘤以無痛、緩慢腫大登場，因此更容易被拖延。' },
      { myth: '骨髓穿刺只是在確認，先拖幾天沒關係。', correction: '對 APL、AML with leukostasis、TLS high risk 等情境，診斷與處置延遲會直接增加死亡風險。' },
    ]),
  ),
  section(
    'case-discussion',
    'Case-based discussion',
    lead('病例：61 歲女性，近兩週發燒、疲倦、牙齦腫脹與瘀青增加。CBC 顯示 WBC 48,000/uL、Hb 6.8 g/dL、platelet 24,000/uL，smear 可見大量 blast。'),
    table(
      ['臨床問題', '思考方向'],
      [
        ['最優先的工作？', '這是急性白血病高疑似個案，要同步安排 hematology 會診、骨髓檢查與腫瘤急症評估。'],
        ['要特別先抓哪些急症？', 'DIC、TLS、感染、leukostasis 與器官灌流問題。'],
        ['治療思考不只是什麼化療？', '還包括輸血支持、感染評估、凝血監測、腎功能、尿酸管理與 central access 規劃。'],
      ],
    ),
    callout(
      'clinical',
      '案例整合',
      p('對血液腫瘤病人來說，真正成熟的處置不是把病理名稱等出來，而是在確診前就先保護病人不被感染、出血、TLS 或 leukostasis 擊倒。'),
    ),
    references('章內來源註記', [
      {
        label: 'NCI PDQ：Adult Acute Myeloid Leukemia Treatment',
        url: 'https://www.cancer.gov/types/leukemia/hp/adult-aml-treatment-pdq',
        note: '用於 AML、APL、分子分層與急性處置框架。',
      },
      {
        label: 'NCI PDQ：Lymphoma',
        url: 'https://www.cancer.gov/types/lymphoma/hp',
        note: '用於 Hodgkin 與非 Hodgkin lymphoma 的分期、病理與治療原則。',
      },
    ]),
  ),
);

hematologyChapters.ch29 = chapter(
  '常見實體腫瘤治療原則 (Principles of Common Solid Tumor Therapy)',
  section(
    'anatomy-physiology',
    '正常解剖與生理',
    lead('實體腫瘤 (Solid tumor) 治療原則的核心，不只是某一個器官長腫瘤，而是癌細胞如何在局部微環境 (Tumor microenvironment)、血管新生 (Angiogenesis)、免疫監視 (Immune surveillance) 與遠端器官定殖之間演化。手術、放射治療、化療、內分泌治療、標靶治療與免疫治療之所以要併用或排序，正是因為它們瞄準的層級不同。'),
    p('正常組織修復依賴增殖、血流與免疫調節；癌細胞則把這些本來服務修復的機制挪去服務自己的存活與擴散。對醫學生與藥學生來說，真正重要的是理解 TNM 分期、病理分級、驅動突變、荷爾蒙受體與微環境如何一起決定局部治療與全身治療的搭配。'),
    tags(['TNM staging', 'Biomarker', 'Tumor microenvironment', 'Precision oncology', 'Immune checkpoint']),
    hematologyViewer('metastatic-burden'),
    diagram('oncology-hallmarks'),
    diagram('oncology-treatment-map'),
    cards([
      { title: '局部治療', body: '手術與放療主要處理可見或局部病灶，目的是根治、降期、控制症狀或減少復發。' },
      { title: '全身治療', body: '化療、內分泌、標靶與免疫治療用來處理微轉移、不可切除病灶或已轉移疾病。' },
      { title: 'Biomarker', body: 'EGFR、ALK、HER2、ER/PR、PD-L1、MSI-H、BRAF 等不只是附註，而是直接改變第一線治療。' },
      { title: '腫瘤微環境', body: '血管、成纖維細胞、免疫細胞與細胞外基質共同決定腫瘤是否更容易逃逸或對治療有反應。' },
    ]),
    summary('治療底圖', '實體腫瘤治療不是單一藥物競賽，而是局部控制、全身控制、病理分層與病人目標四者的整合。', [
      'Stage 與 resectability 先決定大方向。',
      'Biomarker 常改寫整套 systemic therapy。',
      '根治、延長存活與症狀控制是不同治療目標。',
    ]),
  ),
  section(
    'symptoms',
    '常見主訴與症狀',
    lead('常見實體腫瘤的主訴取決於原發部位、局部侵犯、遠端轉移與副腫瘤症候群 (Paraneoplastic syndrome)。肺癌可能以咳嗽、血痰與體重下降表現；乳癌可能是無痛性腫塊；大腸癌可能以缺鐵性貧血、血便或排便習慣改變發現；前列腺癌可能是 PSA 升高後被診斷；胰臟癌則常拖到黃疸、背痛與消瘦才浮出來。'),
    table(
      ['場景', '常見主訴', '臨床意義', '常被忽略之處'],
      [
        ['肺部原發', '慢咳、喘、胸痛、咳血', '局部肺病灶或中央阻塞', '吸菸者反覆被當成慢性支氣管炎'],
        ['腸胃道原發', '血便、便習改變、腹脹、缺鐵', '出血或阻塞', '只補鐵不追腫瘤來源'],
        ['骨轉移', '骨痛、夜痛、病理性骨折', '遠端轉移與高骨相關事件風險', '長期被當成退化性關節痛'],
        ['腦轉移', '頭痛、癲癇、局部神經缺損', '轉移性疾病或腫瘤急症', '被誤當偏頭痛或暫時神經症狀'],
      ],
    ),
    callout(
      'clinical',
      '真實場景',
      p('63 歲男性，半年來體重下降、食慾差、右上腹悶痛，近一個月皮膚黃。門診先後被當成胃炎與膽結石處理，後來影像才發現胰頭腫瘤壓迫膽道。這種情境提醒，癌症的早期線索常是模糊、跨系統且不「戲劇化」的。'),
    ),
    takeawayList([
      { title: '癌症表現常是非特異性', body: '疲倦、體重下降、食慾差與輕微疼痛很常見，但也因此容易被延後。' },
      { title: '轉移症狀有時先於原發', body: '骨痛、病理性骨折、腦神經症狀可能是第一個線索。' },
      { title: '症狀不是唯一決策來源', body: '影像、病理、biomarker 與 performance status 常比症狀本身更決定治療方向。' },
    ]),
  ),
  section(
    'pathophysiology',
    '重要疾病機轉',
    lead('實體腫瘤治療的病理生理核心是「腫瘤生物學異質性」。同樣是肺癌，不同驅動突變、PD-L1 表現、組織型態與分期，治療可以完全不同。某些病人受益於 upfront surgery，某些病人要 neoadjuvant chemotherapy 或 chemoradiation，有些則直接以 targeted therapy 或 immunotherapy 為主。'),
    cards([
      { title: 'Stage 決定範圍', body: '局限、局部進展與遠端轉移是治療路徑最大的分水嶺。可切除與不可切除常比器官名稱更重要。' },
      { title: 'Biomarker 決定路徑', body: 'HER2-positive、EGFR-mutant、MSI-H、HR-positive 等代表不同腫瘤生物學與完全不同藥理入口。' },
      { title: 'Clone evolution', body: '治療會施加選擇壓力，殘餘細胞可能演化出耐藥克隆，因此 disease progression 不只是原病複製。' },
      { title: 'Microenvironment', body: 'T 細胞浸潤、免疫抑制性巨噬細胞、缺氧與血管異常都會影響治療敏感性。' },
    ], 'comparison-grid'),
    misconceptionList([
      { myth: '癌症一旦轉移就只剩支持療法。', correction: '轉移性實體腫瘤仍常可用系統治療顯著延長存活、改善症狀，某些分子型甚至長期控制良好。' },
      { myth: '標靶治療一定比化療輕鬆。', correction: '標靶藥毒性不同，但未必較輕，像皮膚毒性、肝毒性、心毒性、間質性肺炎與高血壓都可能很棘手。' },
      { myth: '免疫治療就是把免疫力補強，所以副作用少。', correction: '免疫檢查點抑制劑會造成免疫相關不良反應，可能影響肺、肝、腸、內分泌與皮膚。' },
    ]),
  ),
  section(
    'diagnosis',
    '診斷思路與鑑別診斷',
    lead('實體腫瘤診斷的核心流程通常是：影像定位、病理確認、分期、biomarker 分層，再回到 MDT 決定治療策略。真正成熟的診斷不是「看起來像哪種癌」，而是回答是否可切除、是否有轉移、是否需要 neoadjuvant、是否有可行的分子標靶，以及病人能不能承受治療。'),
    table(
      ['步驟', '要回答的問題', '常用工具'],
      [
        ['病理確認', '這真的是癌嗎？是哪一型？', 'Core biopsy、手術病理、免疫染色'],
        ['分期', '病灶範圍多大？有淋巴與遠端轉移嗎？', 'CT、MRI、PET/CT、內視鏡超音波'],
        ['分層', '有沒有 biomarker 改變治療？', 'NGS、IHC、FISH、PCR'],
        ['病人評估', '病人撐不撐得住？治療目標是什麼？', 'Performance status、器官功能、共病、社會支持'],
      ],
    ),
    list([
      '不能只依靠腫瘤標記 (Tumor marker) 做診斷；多數腫瘤標記更適合追蹤而非篩檢。',
      'Biopsy 前要想清楚檢體量是否足夠做病理與 biomarker，尤其在肺癌與罕見癌別更重要。',
      '在局部晚期病人，與其急著手術，不如先問 neoadjuvant 是否能改善切除率與長期結果。',
      '影像上的縮小不等於唯一成功標準，有時病理緩解、症狀控制或無進展時間更重要。'
    ]),
    spotlight('病人目標會改變整張策略', '根治性、延命性與症狀控制性治療的副作用容忍度完全不同。若沒有先釐清目標，再好的藥物也可能用錯方向。'),
  ),
  section(
    'investigations',
    '關鍵檢查與判讀',
    lead('實體腫瘤檢查的價值不只在找病灶，而在建構可操作的治療地圖。影像要看可切除性與轉移範圍；病理要看組織型與分級；biomarker 要看是否改變 systemic therapy；基線器官功能則決定哪些藥物或放療可安全使用。'),
    table(
      ['檢查', '角色', '關鍵判讀'],
      [
        ['CT / MRI', '局部與遠端分期', '血管侵犯、神經侵犯、轉移病灶數量與位置'],
        ['PET/CT', '特定癌別分期與反應', '高代謝不等於惡性唯一證據，發炎也會亮'],
        ['Pathology + IHC', '確認腫瘤型態', 'grade、受體、增殖指標與分化程度'],
        ['NGS / PCR / FISH', '找驅動異常', '決定是否可用 targeted therapy 或 trial'],
        ['Baseline organ function', '評估可耐受性', '腎、肝、心臟、骨髓儲備常直接改變方案'],
      ],
    ),
    callout(
      'warning',
      '檢查不是做越多越好',
      p('若影像、病理與 biomarker 沒有改變決策，就要思考是否真的需要。實體腫瘤評估的成熟度之一，就是知道哪個資訊會改變治療，哪個只是在增加噪音與延誤。'),
    ),
  ),
  section(
    'treatment',
    '第一線與第二線治療',
    lead('實體腫瘤治療原則可用四個問題整理：一，局部治療能否根治？二，是否需要術前或術後全身治療降低復發？三，若已轉移，是否有高價值 biomarker 可優先用 targeted / endocrine / immune therapy？四，病人的 performance status、器官功能與價值偏好允不允許這樣做？'),
    table(
      ['治療軸線', '典型角色', '常見例子', '重點'],
      [
        ['手術', '局部根治或減瘤', '乳癌、結腸癌、早期肺癌', '切除邊界與淋巴結評估很重要'],
        ['放射治療', '局部控制、術前縮小、症狀緩解', '頭頸癌、直腸癌、骨轉移疼痛', '正常組織耐受度是限制'],
        ['細胞毒性化療', '快速縮瘤、處理微轉移', 'platinum、taxane、anthracycline、fluoropyrimidine', '骨髓抑制與器官毒性要前置管理'],
        ['標靶 / 內分泌 / 免疫', '依 biomarker 精準切入', 'HER2、EGFR、ER、PD-1 / PD-L1', '先確認標記是真的會改變治療'],
      ],
    ),
    cards([
      { title: 'Neoadjuvant', body: '在治療前先給 systemic therapy 或 chemoradiation，可幫助降期、評估反應並提高手術可行性。' },
      { title: 'Adjuvant', body: '手術後處理微轉移風險，目的是降低復發，不一定看得到明顯腫瘤縮小。' },
      { title: 'Palliative systemic therapy', body: '即使非根治，仍可能顯著延長存活並改善症狀，但必須持續重估品質與負擔。' },
      { title: 'Best supportive care', body: '不是放棄治療，而是把目標轉向症狀控制、生活品質與病人價值的最適化。' },
    ], 'comparison-grid'),
    callout(
      'success',
      '治療排序的核心',
      p('在現代腫瘤學，最常見的錯誤不是不知道有哪些藥，而是不知道「先做哪個比較對」。是否能切、是否要先縮、是否有 driver mutation、是否需要先處理腫瘤急症，往往比藥名本身更重要。'),
    ),
  ),
  section(
    'pharmacology',
    '常用藥物機轉、副作用、交互作用',
    lead('實體腫瘤治療藥理可以粗分成四群：細胞毒性化療、內分泌治療、標靶治療、免疫治療。每一群的毒性預期、監測方式與交互作用都不同。藥師與臨床團隊真正需要掌握的，不是每支藥都背出來，而是知道哪類藥最容易造成哪種器官毒性與哪種支持性需求。'),
    table(
      ['類別', '代表藥物', '重要毒性', '常見配合'],
      [
        ['Platinum', 'Cisplatin、carboplatin', '腎毒性、噁心嘔吐、神經毒性', '補液、止吐、電解質監測'],
        ['Taxane', 'Paclitaxel、docetaxel', '神經病變、過敏反應、骨髓抑制', 'premedication 與症狀監測'],
        ['HER2-targeted', 'Trastuzumab', '心功能下降', '基線與追蹤心臟超音波'],
        ['Immune checkpoint inhibitor', 'Pembrolizumab、nivolumab', '免疫相關不良反應', '早期辨認與 steroid 路徑'],
        ['Endocrine therapy', 'Tamoxifen、aromatase inhibitor', '血栓、熱潮紅、骨質流失', '骨骼與血栓風險管理'],
      ],
    ),
    formula('5-Fluorouracil 分子式', 'C4H3FN2O2', 'Fluoropyrimidine 是多個常見實體腫瘤 backbone 藥物，但心毒性、腹瀉、黏膜炎與 DPD 缺陷相關風險不能忽略。'),
    callout(
      'danger',
      '藥物交互作用常被低估',
      p('口服標靶藥常受 CYP3A4、胃酸抑制藥、食物與草藥影響；免疫治療前後使用高劑量 steroid 也要放回疾病情境解讀。口服不代表簡單，反而更需要完整用藥盤點。'),
    ),
  ),
  section(
    'special-populations',
    '特殊族群考量',
    lead('實體腫瘤的特殊族群照護重點在於「治療效益是否仍大於負擔」。高齡者需要 geriatric oncology 思維；妊娠病人需平衡母胎；腎肝功能不全病人要重新設計藥物暴露；具生育需求的病人應把 fertility preservation 前移到治療前。'),
    cards([
      { title: '高齡腫瘤學', body: '年齡不是唯一限制，functional reserve、跌倒、認知、營養與社會支持更實際。' },
      { title: '妊娠', body: '治療時間點、影像與手術策略需與產科協作，有些 systemic therapy 需避開特定孕期。' },
      { title: '腎肝功能不全', body: '有些藥依腎排，有些依肝代謝，劑量、間距與替代方案都要調整。' },
      { title: '生育與長期存活者', body: '治療成功後的心臟、骨骼、內分泌、第二癌與生活品質追蹤不可忽略。' },
    ]),
  ),
  section(
    'clinical-pitfalls',
    '常見臨床陷阱',
    lead('實體腫瘤治療最常見的陷阱，是把「有藥可用」誤解成「這就是對病人最好的下一步」。'),
    misconceptionList([
      { myth: '看到癌症就要越快開始化療越好。', correction: '若病人有脊髓壓迫、膽道阻塞、腦水腫、感染或需先確認 biomarker，先處理急症與正確分層反而更重要。' },
      { myth: '標靶治療等於不太需要監測。', correction: '心臟、肝臟、皮膚、肺與內分泌毒性都可能非常實際，且常因為是口服藥更容易被忽略。' },
      { myth: '病人只要想治，就應一直升級治療。', correction: '在預期效益有限時，治療強度與生活品質的平衡需要反覆共享決策，而不是自動一路加碼。' },
    ]),
  ),
  section(
    'case-discussion',
    'Case-based discussion',
    lead('病例：58 歲女性，左乳腫塊切片為 HER2-positive 乳癌，影像顯示局部進展但無遠端轉移。病人最在意的是根治機會與日後心臟副作用。'),
    table(
      ['臨床問題', '思考方向'],
      [
        ['這是先手術還是先全身治療？', '局部進展型常需 neoadjuvant therapy，讓腫瘤降期並評估病理反應。'],
        ['Biomarker 如何改變治療？', 'HER2 狀態直接決定是否加入 HER2-targeted therapy，而不是只決定預後。'],
        ['追蹤重點是什麼？', '腫瘤反應、骨髓抑制、心功能與病人對治療目標的理解。'],
      ],
    ),
    callout(
      'clinical',
      '案例整合',
      p('這個案例提醒，實體腫瘤治療不是先想到「哪支化療」，而是先問「這個階段的治療目的、排序與風險監測是什麼」。'),
    ),
    references('章內來源註記', [
      {
        label: 'NCI：Biomarker Testing for Cancer Treatment',
        url: 'https://www.cancer.gov/about-cancer/treatment/types/biomarker-testing-cancer-treatment',
        note: '用於 biomarker 為何會直接改變實體腫瘤治療策略的註記。',
      },
      {
        label: 'NCI：Targeted Cancer Therapies',
        url: 'https://www.cancer.gov/about-cancer/treatment/types/targeted-therapies',
        note: '補強 targeted therapy 的機轉、限制與臨床定位。',
      },
      {
        label: 'NCI：Immunotherapy to Treat Cancer',
        url: 'https://www.cancer.gov/about-cancer/treatment/types/immunotherapy',
        note: '用於免疫治療在實體腫瘤中的適應場景與副作用脈絡。',
      },
    ]),
  ),
);

hematologyChapters.ch30 = chapter(
  '支持性治療與腫瘤藥物毒性 (Supportive Oncology & Treatment Toxicities)',
  section(
    'anatomy-physiology',
    '正常解剖與生理',
    lead('腫瘤支持性治療的本質，是保護那些最容易被治療波及的正常組織。高週轉組織如骨髓、口腔與腸道黏膜、毛囊與生殖細胞，對細胞毒性治療特別敏感；而心肌、腎小管、肺間質、周邊神經與內分泌器官，則更常被標靶與免疫治療以不同方式傷害。'),
    p('因此，支持性治療不是在副作用出現後才救火，而是在治療前就根據 emetogenic risk、febrile neutropenia risk、tumor lysis risk、器官脆弱性與藥物毒性譜，預先設計保護策略。真正成熟的腫瘤治療，從第一天起就已經包含止吐、感染預防、營養、疼痛、口腔照護與毒性監測。'),
    tags(['CINV', 'Febrile neutropenia', 'Tumor lysis syndrome', 'Immune-related adverse events', 'Survivorship']),
    hematologyViewer('treatment-toxicity'),
    diagram('oncology-toxicity-map'),
    cards([
      { title: '骨髓 (Bone marrow)', body: '中性球低下、貧血與血小板低下是最常見的 dose-limiting toxicity 來源。' },
      { title: '腸胃與口腔黏膜', body: 'CINV、黏膜炎、腹瀉與食慾下降會直接影響營養、依從性與住院率。' },
      { title: '心腎神經器官', body: 'Anthracycline、cisplatin、taxane、checkpoint inhibitor 等各有特定器官毒性地圖。' },
      { title: '免疫系統', body: '免疫治療會把免疫煞車放開，副作用本質是自體發炎，不是感染。' },
    ]),
    summary('支持治療底圖', '支持性治療的目標不是讓病人撐一下，而是讓病人能安全、完整、並且有品質地走過腫瘤治療。', [
      '先做風險分層，再做預防。',
      '不同藥理類別帶來不同毒性譜。',
      '毒性偵測愈早，越有機會不中斷有效治療。',
    ]),
  ),
  section(
    'symptoms',
    '常見主訴與症狀',
    lead('支持性治療章節最重要的臨床能力之一，是辨認什麼症狀只是預期副作用，什麼症狀代表真正腫瘤急症或嚴重毒性。發燒可能只是普通感染，也可能是 febrile neutropenia；腹瀉可能是 fluoropyrimidine 或 irinotecan 毒性，也可能是免疫性腸炎；呼吸喘可能是貧血、肺炎、肺栓塞、藥物性肺炎或癌症惡化。'),
    table(
      ['症狀', '高風險意義', '常見相關治療', '第一個要做的事'],
      [
        ['發燒', '可能是 febrile neutropenia', '化療後 7-14 天最常見', '立刻抽檢體並啟動經驗性抗生素思維'],
        ['嚴重噁心嘔吐', '脫水、腎傷害、治療中斷', 'cisplatin、anthracycline-based', '檢查止吐預防是否足夠'],
        ['大量腹瀉', '脫水、電解質異常、腸炎', 'irinotecan、免疫治療', '先分感染、藥物與免疫性原因'],
        ['胸悶喘、低氧', '肺炎、肺栓塞、藥物性肺炎、心衰', 'checkpoint inhibitor、bleomycin 等', '不能只當焦慮或貧血'],
      ],
    ),
    callout(
      'clinical',
      '真實場景',
      p('接受化療的 70 歲病人半夜 38.5°C 發燒，家人以為只是感冒，隔天才到院。抽血 ANC 200/uL，乳酸升高。對中性球低下病人來說，「等等看」可能就是敗血症前夜。'),
    ),
    takeawayList([
      { title: '時間軸很關鍵', body: '副作用常與給藥後天數有規律關係，這對鑑別診斷很有幫助。' },
      { title: '發燒先當重症', body: '特別是近期化療後，直到證明不是之前，都應把 febrile neutropenia 放前面。' },
      { title: '免疫毒性像很多病', body: '皮疹、腹瀉、肝炎、肺炎、內分泌異常都可能是 irAE，不是每次都先想感染或轉移。' },
    ]),
  ),
  section(
    'pathophysiology',
    '重要疾病機轉',
    lead('化療毒性常來自對快速分裂正常細胞的非選擇性打擊；標靶治療毒性則更常來自目標路徑在正常組織也有生理角色；免疫治療毒性則是免疫耐受被打破後的自體發炎。理解這三種邏輯後，很多看似雜亂的副作用就會變得可預測。'),
    cards([
      { title: 'CINV', body: '急性期與延遲期涉及 serotonin、substance P 與多條中樞/周邊訊號，因此高致吐方案常需多機轉止吐。' },
      { title: 'Febrile neutropenia', body: '骨髓抑制讓病人失去足夠中性球防線，發燒有時已是唯一感染線索。' },
      { title: 'Tumor lysis syndrome', body: '大量腫瘤細胞破裂釋放鉀、磷、核酸，導致高尿酸、急性腎損傷與心律風險。' },
      { title: 'Immune-related adverse events', body: 'PD-1 / PD-L1 / CTLA-4 抑制後，T 細胞活性提高，正常器官也可能被捲入發炎。' },
    ], 'comparison-grid'),
    misconceptionList([
      { myth: '標靶或免疫治療副作用都比化療輕。', correction: '副作用類型不同，不代表較輕。像 myocarditis、pneumonitis、colitis、hepatitis、endocrinopathy 都可能嚴重甚至致命。' },
      { myth: '吐一點很正常，撐過去就好。', correction: '止吐控制不好會導致脫水、住院與後續治療拒絕，支持性照護品質直接影響腫瘤治療成敗。' },
      { myth: 'G-CSF 是看到白血球低才補。', correction: '其實關鍵是依 regimen 與病人風險做預防性使用，而不是等發燒中性球低下後才補救。' },
    ]),
  ),
  section(
    'diagnosis',
    '診斷思路與鑑別診斷',
    lead('支持性治療中的診斷核心，是先辨認「這是不是 time-sensitive toxicity 或 oncology emergency」。發燒先想 febrile neutropenia；呼吸症狀先分感染、栓塞、藥物肺炎與腫瘤惡化；腹瀉先分感染性、化療性與免疫性；肝功能異常先看藥物、膽道阻塞、感染與 irAE。'),
    table(
      ['情境', '優先問題', '常用工具'],
      [
        ['發燒中性球低下', '有沒有 sepsis？感染來源在哪？', 'CBC、cultures、影像、lactate'],
        ['高尿酸 / 腎傷害', '是不是 TLS？', 'K、P、Ca、uric acid、Cr、ECG'],
        ['腹瀉', '是 irinotecan、感染還是免疫性腸炎？', '病史、糞便檢驗、必要時影像或內視鏡'],
        ['喘與咳嗽', '感染、PE、心衰、藥物肺炎、腫瘤進展？', 'SpO2、影像、感染評估、必要時 CTA'],
      ],
    ),
    list([
      'CTCAE 分級很重要，因為它會直接影響停藥、減量、類固醇起始與是否住院。',
      '免疫治療病人出現腹瀉、咳嗽、皮疹、肝指數上升或疲倦時，不要忘記內分泌 irAE。',
      '透析與 ICU 轉介不該等到數字完全失控後才啟動，尤其在 TLS、sepsis 與免疫性肺炎。',
      '支持性問題常需要多專業：感染科、腎臟科、胸腔科、心臟科、營養與疼痛團隊。'
    ]),
    spotlight('鑑別診斷最常錯在太快貼標籤', '化療後拉肚子不一定只是藥物腹瀉，免疫治療後喘也不一定只是肺炎。支持性診斷品質取決於你能不能先把真正危險的幾條路保留下來。'),
  ),
  section(
    'investigations',
    '關鍵檢查與判讀',
    lead('支持性治療的檢查不是為了證明副作用存在，而是為了判斷嚴重度、排除可逆或致命原因，並決定是否需要中斷原治療。像是 febrile neutropenia 要看 ANC 與感染來源，TLS 要看電解質和腎功能動態，免疫性肝炎要看肝功能趨勢與病毒篩檢，心毒性則常需要 troponin、BNP 與 echo。'),
    table(
      ['檢查', '應用', '高價值判讀'],
      [
        ['ANC / CBC', 'FN、骨髓抑制', 'ANC < 500/uL 配合發燒要高警覺'],
        ['BMP / uric acid / phosphate', 'TLS、腎毒性、腹瀉脫水', '趨勢比單點更重要'],
        ['LFT / TSH / cortisol', '免疫毒性監測', 'fatigue 有時是 endocrine irAE'],
        ['Troponin / BNP / Echo', '心毒性', 'anthracycline 與 HER2 therapy 前後常需基線與追蹤'],
        ['Chest imaging', '感染、藥物肺炎、PE', '影像型態要回到藥物與時間軸解讀'],
      ],
    ),
    callout(
      'warning',
      '不要讓檢查延誤處置',
      p('FN 的抗生素、懷疑免疫性 myocarditis 的高劑量 steroid、或高風險 TLS 的 rasburicase 不應該因為等全部檢查回來而延誤。支持性腫瘤醫學很多時候是先保命，再精修。'),
    ),
  ),
  section(
    'treatment',
    '第一線與第二線治療',
    lead('支持性治療最有效的地方在於預防。高致吐方案在第一次化療前就要給足止吐；FN 高風險 regimen 要考慮 primary G-CSF prophylaxis；高腫瘤量白血病與淋巴瘤要在治療前就做 TLS prophylaxis；免疫毒性則仰賴及早停藥與類固醇分級處理。'),
    table(
      ['情境', '第一線策略', '常見第二線 / 配合', '關鍵提醒'],
      [
        ['高致吐化療', '5-HT3 antagonist + dexamethasone + NK1 antagonist 視風險', 'Olanzapine、breakthrough regimen', '要分 acute 與 delayed CINV'],
        ['Febrile neutropenia', '立刻經驗性抗生素與培養', '住院分層、必要時升級抗真菌', '不要等白血球掉更低才處理'],
        ['TLS prevention', '大量補液、allopurinol 或 rasburicase 視風險', '電解質監測、腎臟科合作', '腎功能差與高尿酸要特別前移'],
        ['免疫相關不良反應', '停藥 + corticosteroid 依分級', '器官專科合作、其他免疫抑制劑', '先排感染但不要延誤免疫治療毒性處理'],
        ['黏膜炎 / 腹瀉 / 疼痛', '口腔照護、止瀉、營養與疼痛控制', 'Octreotide、TPN 視嚴重度', '嚴重腹瀉先排感染與腸炎'],
      ],
    ),
    cards([
      { title: '止吐策略', body: '止吐不是一顆 PRN 藥而已，而是要依 regimen emetogenicity 預防性組合。' },
      { title: 'G-CSF', body: '目標是降低 FN 風險與住院，不是讓所有白血球數字看起來漂亮。' },
      { title: '免疫毒性處理', body: 'Grade 2 以上常需要停免疫治療並視器官給 steroid；嚴重個案須住院與跨科合作。' },
      { title: '輸血與血品支持', body: '對骨髓抑制或出血病人常是治療可持續性的關鍵，但輸血門檻仍需回到臨床狀態。' },
    ], 'comparison-grid'),
    callout(
      'success',
      '支持性治療的真正價值',
      p('支持性治療做得好，病人不只是比較舒服，而是更有機會完成有效抗癌治療、降低住院與減少致命併發症。這是腫瘤學的核心，不是附錄。'),
    ),
  ),
  section(
    'pharmacology',
    '常用藥物機轉、副作用、交互作用',
    lead('這一章的藥物很多，但最重要的是理解用途與配伍邏輯。止吐藥要分 serotonin、NK1、dopamine、多重機轉；G-CSF 是促進中性球恢復；allopurinol 阻止新尿酸形成，rasburicase 則直接分解既有尿酸；steroid 在 irAE 中扮演免疫煞車。'),
    table(
      ['藥物', '用途', '關鍵副作用 / 限制', '實務提醒'],
      [
        ['Ondansetron / palonosetron', 'CINV 預防與治療', '便祕、頭痛、QT 風險', 'palonosetron 對 delayed CINV 也有優勢'],
        ['Aprepitant / fosaprepitant', '高致吐化療止吐', 'CYP3A4 交互作用', '與 dexamethasone 劑量調整常有關'],
        ['Olanzapine', 'breakthrough / high-risk CINV', '嗜睡、代謝副作用', '夜間給藥常較好耐受'],
        ['Filgrastim / pegfilgrastim', 'FN 預防或治療策略一環', '骨痛、脾腫大少見', '給藥時間與化療週期需正確安排'],
        ['Rasburicase', '高風險 TLS', 'G6PD deficiency 風險', '使用前注意禁忌與檢體處理'],
      ],
    ),
    formula('Ondansetron 分子式', 'C18H19N3O', '5-HT3 antagonist 的代表。止吐成功與否，很大程度取決於是否在正確 emetogenic risk 情境中與其他機轉併用。'),
    formula('Allopurinol 分子式', 'C5H4N4O', '抑制 xanthine oxidase，重點是預防新尿酸生成，不會快速清掉已存在的大量尿酸。'),
    callout(
      'danger',
      '高頻交互作用與禁忌',
      p('NK1 antagonist 與 CYP3A4 substrate 交互作用很多；QT 風險藥與止吐藥併用時要留意；rasburicase 在 G6PD deficiency 有風險；高劑量 steroid 則會提高感染與血糖問題。'),
    ),
  ),
  section(
    'special-populations',
    '特殊族群考量',
    lead('支持性治療的特殊族群重點，常比抗癌藥本身更決定安全性。高齡者較容易跌倒、譫妄與營養不良；CKD 會放大電解質、TLS 與藥物清除問題；糖尿病病人使用 dexamethasone 需預先規劃血糖；既往自體免疫病病人在免疫治療時要更密切追蹤 flare 與 irAE。'),
    cards([
      { title: '高齡與 frailty', body: '支持性藥物本身也可能造成鎮靜、跌倒與譫妄，因此選藥與劑量都要更保守。' },
      { title: '腎功能不全', body: 'TLS、cisplatin、感染用藥與脫水風險都會放大，監測頻率通常要更高。' },
      { title: '糖尿病', body: '止吐與 irAE 常用 steroid，若沒有同步調整糖尿病治療，病人很容易出現嚴重高血糖。' },
      { title: '既往自體免疫或器官移植', body: '免疫治療帶來的收益與 flare / rejection 風險要更加細緻權衡。' },
    ]),
  ),
  section(
    'clinical-pitfalls',
    '常見臨床陷阱',
    lead('支持性治療最常見的錯誤，是把副作用當作不得不忍的代價，而不是可預防、可監測、可及早處理的治療對象。'),
    misconceptionList([
      { myth: '止吐藥是病人吐了再吃。', correction: '高致吐方案應預防性給藥。等病人已經吐到脫水，代表策略太晚。' },
      { myth: '免疫治療副作用通常只是皮疹。', correction: '實際上肺炎、肝炎、心肌炎、腸炎與內分泌危象都可能發生，且有些在停藥後仍會出現。' },
      { myth: '化療後發燒先吃退燒藥觀察。', correction: '近期化療病人的發燒必須先排 febrile neutropenia，延誤抗生素可能快速進入敗血症。' },
    ]),
  ),
  section(
    'case-discussion',
    'Case-based discussion',
    lead('病例：58 歲男性，診斷 diffuse large B-cell lymphoma，準備接受第一個療程治療。基線 LDH 高、尿酸偏高、腫瘤量大，治療後第 3 天出現噁心、疲倦、尿量變少。'),
    table(
      ['臨床問題', '思考方向'],
      [
        ['這只是一般副作用嗎？', '不夠。高腫瘤量加尿酸升高要高度警覺 TLS。'],
        ['需要立即補哪些資訊？', 'K、P、Ca、Cr、uric acid、ECG、輸入輸出量與是否有適當 hydration。'],
        ['支持性處理主軸？', '補液、電解質監測、必要時 rasburicase、腎臟科合作，並重新評估後續療程預防策略。'],
      ],
    ),
    callout(
      'clinical',
      '案例整合',
      p('支持性腫瘤醫學最有價值的地方，在於你能比崩潰更早一步看見風險。當你知道誰會吐、誰會感染、誰會 TLS、誰會免疫發炎，就已經在改變預後。'),
    ),
    references('章內來源註記', [
      {
        label: 'NCI PDQ：Nausea and Vomiting Related to Cancer Treatment',
        url: 'https://www.cancer.gov/about-cancer/treatment/side-effects/nausea/nausea-hp-pdq',
        note: '用於 CINV 預防性止吐策略與高致吐風險治療框架。',
      },
      {
        label: 'NCI：Infections and Cancer Treatment',
        url: 'https://www.cancer.gov/about-cancer/treatment/side-effects/infection',
        note: '用於感染、發燒中性球低下與免疫抑制宿主風險思維。',
      },
      {
        label: 'NCI：Organ Inflammation and Immune Checkpoint Inhibitors',
        url: 'https://www.cancer.gov/about-cancer/treatment/side-effects/organ-inflammation',
        note: '用於免疫相關不良反應的器官熱點與分級處置脈絡。',
      },
    ]),
  ),
);
