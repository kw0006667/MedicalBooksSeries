import type { ChapterContent } from '../../types.js';

const chapter: ChapterContent = {
  title: '團隊交班與 SBAR 練習',
  content: `
    <section id="sbar-practice-scenarios">
      <h2>SBAR 練習情境</h2>
      <p>SBAR（Situation-Background-Assessment-Recommendation）是醫療團隊溝通的標準化框架，透過結構化呈現臨床資訊來減少溝通錯誤。本節提供多種臨床情境的 SBAR 練習，包括病況惡化的護理師 → 值班醫師通話、跨科轉介，以及急診 → 病房接收的交班對話。</p>
      <div class="callout callout--info">
        <div class="callout__title">學習重點</div>
        <p>SBAR 的「R（Recommendation）」部分是最常被省略的環節，卻是溝通中最重要的部分；訓練自己明確提出建議（「我建議…」「我需要您…」），而非僅陳述問題，是有效溝通的核心技能。</p>
      </div>
    </section>

    <section id="handoff-simulation">
      <h2>交班模擬</h2>
      <p>完整的交班應傳遞足夠資訊使接班者能安全照護患者，同時不造成資訊過載。有效交班的要素包括：患者識別、主要問題與入院原因、目前狀態、未完成的待辦事項（to-do list）、預期病情變化（if-then 情境）及需要特別注意的事項。</p>
      <div class="callout callout--clinical">
        <div class="callout__title">臨床要點</div>
        <p>「if-then 語言」是提升交班品質的重要工具：「如果患者血壓降到 90/60 mmHg，請先補 500 mL 生理食鹽水再電我」，比單純說「患者血壓不穩」提供了更可執行的行動指引。</p>
      </div>
    </section>

    <section id="i-pass-framework">
      <h2>I-PASS 框架</h2>
      <p>I-PASS 是研究證實可減少住院醫師交班期間醫療錯誤的結構化交班框架，包含：Illness severity（病情嚴重度分類）、Patient summary（病患摘要）、Action list（待辦清單）、Situation awareness and contingency planning（情境意識與應變計畫）及Synthesis by receiver（接班者確認摘要）。</p>
      <div class="callout callout--success">
        <div class="callout__title">關鍵要點</div>
        <p>I-PASS 介入研究（NEJM 2014）顯示，在多個學術醫學中心推行結構化交班後，醫療錯誤率降低 23%，可預防不良事件減少 30%；標準化交班是改善患者安全最具成本效益的系統性介入之一。</p>
      </div>
    </section>

    <section id="common-communication-failures">
      <h2>常見溝通失效分析</h2>
      <p>醫療溝通失效的常見類型包括：資訊遺漏（交班時省略關鍵變化）、層級壓力（junior 不敢質疑 senior 的決定）、「讀心」假設（假設對方已知某資訊而未明確告知）、書面紀錄與口頭溝通不一致，以及使用縮寫或行話造成理解落差。</p>
      <div class="callout callout--warning">
        <div class="callout__title">注意事項</div>
        <p>CUS 語言（「I'm Concerned-我有疑慮」「I'm Uncomfortable-我感到不安」「This is a Safety issue-這是安全問題」）是在層級壓力下向上級表達安全疑慮的標準化升級工具，允許任何層級的醫療人員在感受到安全威脅時使用。</p>
      </div>
    </section>
  `
};

export default chapter;
