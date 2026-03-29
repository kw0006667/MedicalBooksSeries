import type { ChapterContent } from '../../types.js';

const chapter: ChapterContent = {
  title: '高風險急症病例 50 題',
  content: `
    <section id="sepsis-shock-cases">
      <h2>敗血症與休克病例</h2>
      <p>本組病例涵蓋敗血性休克、低血容積休克、心因性休克及分布性休克的識別與鑑別，訓練學習者依據臨床表現、血液動力學指標快速分類休克類型，並依「敗血症存活運動」（Surviving Sepsis Campaign）的集束治療（Bundle）完成初始穩定化。</p>
      <div class="callout callout--danger">
        <div class="callout__title">重要警示</div>
        <p>敗血性休克的初始一小時處置包括：血液培養（抗生素前）、廣效抗生素、30 mL/kg 靜脈補液、血管加壓素（MAP 目標 ≥65 mmHg）及乳酸監測；每延誤一小時給予抗生素死亡率上升約 7%。</p>
      </div>
    </section>

    <section id="respiratory-failure-cases">
      <h2>呼吸衰竭病例</h2>
      <p>本組病例涵蓋第一型（低氧血性）與第二型（高碳酸血性）呼吸衰竭的鑑別，以及非侵入性正壓通氣（NPPV）與侵入性機械通氣的適應症評估。病例設計包含 ARDS 診斷標準（Berlin 定義）及保護性肺通氣策略的應用練習。</p>
      <div class="callout callout--clinical">
        <div class="callout__title">臨床要點</div>
        <p>ARDS 的保護性肺通氣策略：潮氣量 6 mL/kg（理想體重）、平台壓 ≤30 cmH₂O、允許性高碳酸血症（pH ≥7.20 為可接受範圍）；俯臥位通氣對重度 ARDS（P/F ratio &lt;150）具有明確的死亡率降低效益。</p>
      </div>
    </section>

    <section id="cardiac-emergencies">
      <h2>心臟急症病例</h2>
      <p>本組病例涵蓋 STEMI 的識別與再灌流決策（PCI vs. 溶栓的時間窗評估）、急性主動脈剝離的識別要點（D-dimer 的角色、影像選擇）、急性心包填塞的床邊診斷，以及心室顫動的 ACLS 流程執行。</p>
      <div class="callout callout--danger">
        <div class="callout__title">重要警示</div>
        <p>急性主動脈剝離的臨床表現可極度多樣，偽裝成急性冠心症、腦中風或腸繫膜缺血；在給予溶栓藥物前，對有胸背撕裂樣疼痛且脈壓不對稱的患者必須先排除主動脈剝離。</p>
      </div>
    </section>

    <section id="neuro-emergencies">
      <h2>神經急症病例</h2>
      <p>本組病例涵蓋癲癇重積狀態（Status epilepticus）的分步驟藥物處置流程、高顱內壓的識別與降顱壓措施、急性脊髓壓迫症的診斷（需緊急手術減壓的紅旗警示），以及 Wernicke 腦病的識別與緊急硫胺素補充。</p>
      <div class="callout callout--warning">
        <div class="callout__title">注意事項</div>
        <p>癲癇重積狀態的藥物處置有嚴格時間序列：0-5 分鐘給苯二氮平類藥物，5-20 分鐘無效給二線藥物（Levetiracetam/Fosphenytoin），20-40 分鐘無效考慮麻醉插管；超過 30 分鐘的癲癇重積死亡率與後遺症風險顯著上升。</p>
      </div>
    </section>
  `
};

export default chapter;
