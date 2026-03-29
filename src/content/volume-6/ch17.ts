import type { ChapterContent } from '../../types.js';

const chapter: ChapterContent = {
  title: '醫療創新、法規與實作限制',
  content: `
    <section id="fda-ema-regulatory-pathways">
      <h2>FDA 與 EMA 的法規途徑</h2>
      <p>美國 FDA 與歐洲 EMA 是全球最具影響力的醫療產品法規機構。FDA 的核准途徑包括標準審查（Standard Review）、優先審查（Priority Review）、突破性療法指定（Breakthrough Therapy Designation）、快速通道（Fast Track）及加速核准（Accelerated Approval）。EMA 則有優先藥品（PRIME）等對應機制。</p>
      <div class="callout callout--info">
        <div class="callout__title">學習重點</div>
        <p>本節涵蓋各種加速核准途徑的適用條件與要求、代理終點指標（Surrogate endpoint）的使用與限制，以及上市後效益驗證研究的義務，幫助理解創新藥品的核准生態。</p>
      </div>
    </section>

    <section id="clinical-trial-phases">
      <h2>臨床試驗的階段</h2>
      <p>藥物開發的臨床試驗分為四個階段：第一期（Phase I）評估安全性與劑量，通常在少數健康受試者中進行；第二期評估初步效力與副作用；第三期在大規模族群中確認效力與安全性；第四期為上市後監測，評估長期安全性與真實世界效果。</p>
      <div class="callout callout--clinical">
        <div class="callout__title">臨床要點</div>
        <p>腫瘤學的臨床試驗設計已大幅演進，包括籃型試驗（Basket trial）、雨傘試驗（Umbrella trial）及平台試驗（Platform trial）等適應性設計，允許根據期中結果動態調整試驗方案，提高研發效率。</p>
      </div>
    </section>

    <section id="innovation-implementation-gap">
      <h2>創新與實作的落差</h2>
      <p>即使新的治療或技術獲得核准，從法規核准到廣泛臨床應用之間仍存在顯著落差，原因包括醫師認知不足、成本與保險給付障礙、機構基礎設施不足、臨床工作流程未整合，以及對新技術有效性的不確定性。</p>
      <div class="callout callout--warning">
        <div class="callout__title">注意事項</div>
        <p>創新技術的核准不代表其能立即惠及所有需要的患者；特別是昂貴的基因治療、細胞治療等新興療法，給付政策的制定對於確保公平可及性至關重要。</p>
      </div>
    </section>

    <section id="future-of-medicine">
      <h2>醫療的未來展望</h2>
      <p>未來醫療的發展趨勢包括：從被動治療轉向主動預防與個人化健康管理、基因與細胞治療的廣泛應用、AI 輔助診療的普及、醫療系統的去中心化與居家化，以及氣候變遷對健康的影響。這些趨勢將深刻改變醫療照護的模式與醫師的角色。</p>
      <div class="callout callout--success">
        <div class="callout__title">關鍵要點</div>
        <p>面對快速變化的醫療環境，終身學習（Lifelong learning）、批判性評估新技術的能力，以及在技術進步中維護患者中心照護的核心價值，是未來醫療專業人員最重要的核心素養。</p>
      </div>
    </section>
  `
};

export default chapter;
