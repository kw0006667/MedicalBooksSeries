import type { ChapterContent } from '../../types.js';

const chapter: ChapterContent = {
  title: '特殊族群案例',
  content: `
    <section id="pediatric-cases">
      <h2>兒科病例</h2>
      <p>兒科案例涵蓋兒童體重別劑量計算、兒童發燒的評估（Rochester/Philadelphia 準則）、兒童脫水程度評估（Gorelick Scale）及常見兒童疾病的處置（熱性痙攣、哮吼、毛細支氣管炎）。練習重點在於認識兒童不是「小大人」的基本原則。</p>
      <div class="callout callout--warning">
        <div class="callout__title">注意事項</div>
        <p>兒童用藥劑量必須依體重計算，成人固定劑量不適用；特別需注意退燒藥（Acetaminophen 15 mg/kg/次，Ibuprofen 10 mg/kg/次）、抗生素及電解質補充液的正確計算，避免劑量錯誤。</p>
      </div>
    </section>

    <section id="obstetric-cases">
      <h2>產科病例</h2>
      <p>產科案例涵蓋妊娠期藥物安全性評估（FDA 妊娠安全分類的解讀與限制）、妊娠高血壓疾病（子癇前症的識別與硫酸鎂使用）、妊娠期糖尿病的管理，以及常見妊娠期感染（UTI、GBS 帶菌）的處置原則。</p>
      <div class="callout callout--danger">
        <div class="callout__title">重要警示</div>
        <p>子癇前症伴嚴重表現（收縮壓 ≥160 mmHg 或舒張壓 ≥110 mmHg）需緊急降壓治療（目標 1 小時內）；分娩前後 24-48 小時的硫酸鎂預防子癇發作是標準處置，使用期間需嚴密監測呼吸頻率與深腱反射。</p>
      </div>
    </section>

    <section id="renal-hepatic-failure-cases">
      <h2>腎功能與肝功能異常的用藥病例</h2>
      <p>本組病例訓練學習者依據腎絲球過濾率（eGFR）調整腎排泄藥物的劑量，以及評估肝功能不全（Child-Pugh/MELD score）對藥物代謝的影響。特別關注抗生素（萬古黴素、胺基配糖體）、降血糖藥（Metformin 的腎功能限制）及抗凝血藥的劑量調整。</p>
      <div class="callout callout--clinical">
        <div class="callout__title">臨床要點</div>
        <p>腎功能惡化患者的用藥審查應為例行作業；入院時的基礎 eGFR 可能因急性疾病而進一步下降，應在病況改變時重新評估所有藥物是否需要劑量調整或暫停使用。</p>
      </div>
    </section>

    <section id="oncology-cases">
      <h2>腫瘤科病例</h2>
      <p>腫瘤科病例涵蓋化療副作用的識別與處置（中性球低下性發燒的抗生素處置、化療相關噁心嘔吐的分級管理）、免疫治療相關不良事件（irAEs）的識別，以及腫瘤急症（脊髓壓迫、上腔靜脈症候群、腫瘤溶解症候群）的初步評估。</p>
      <div class="callout callout--danger">
        <div class="callout__title">重要警示</div>
        <p>腫瘤溶解症候群（TLS）是化療後的急性代謝急症，表現為高尿酸血症、高鉀血症、高磷血症及低鈣血症；對高風險患者（血液腫瘤、腫瘤負荷大）應在化療前預防性給予 Allopurinol 或 Rasburicase，並積極補液。</p>
      </div>
    </section>
  `
};

export default chapter;
