import type { ChapterContent } from '../../types.js';

const chapter: ChapterContent = {
  title: '系統性回顧與指南判讀',
  content: `
    <section id="systematic-review-meta-analysis">
      <h2>系統性回顧與統合分析</h2>
      <p>系統性回顧（Systematic review）依照預先制定的協議，全面收集並評估特定問題的所有相關研究；統合分析（Meta-analysis）則是以統計方法整合多個研究的量化結果，以提高統計效力並估計整體效應量。</p>
      <div class="callout callout--info">
        <div class="callout__title">學習重點</div>
        <p>本節涵蓋系統性回顧的 PRISMA 流程圖解讀、異質性（I² 統計量）的評估，以及漏斗圖（funnel plot）偵測發表偏差的方法。</p>
      </div>
    </section>

    <section id="grade-framework">
      <h2>GRADE 框架</h2>
      <p>GRADE（Grading of Recommendations Assessment, Development and Evaluation）框架提供系統性評估證據品質與推薦強度的標準化方法。證據品質從高至極低分為四等，推薦強度分為強烈推薦與條件推薦，需考量證據品質、效益與傷害的平衡、病患偏好及資源利用。</p>
      <div class="callout callout--clinical">
        <div class="callout__title">臨床要點</div>
        <p>GRADE 框架中，RCT 起始點為高品質證據，但可因偏差風險、不一致性、間接性、不精確性及發表偏差而降級；觀察性研究可因大效應量等因素而升級。</p>
      </div>
    </section>

    <section id="clinical-guideline-appraisal">
      <h2>臨床指南的判讀</h2>
      <p>臨床實務指南（Clinical Practice Guidelines）是以系統性方法制定的建議，應透過 AGREE II 工具評估其方法學嚴謹度。判讀指南時需關注證據基礎的品質、推薦的透明度，以及指南適用的患者族群與臨床情境。</p>
      <div class="callout callout--success">
        <div class="callout__title">關鍵要點</div>
        <p>不同機構的指南可能因證據解讀差異而給出不同推薦；遇到矛盾指南時，應比較各指南使用的方法學、納入的研究及利益衝突聲明。</p>
      </div>
    </section>

    <section id="conflicts-of-interest">
      <h2>利益衝突的識別與評估</h2>
      <p>利益衝突（Conflicts of Interest, COI）包括財務利益（如藥廠資助）與非財務利益（如學術立場、意識形態偏見）。研究顯示，由業界資助的試驗更可能產生有利於贊助商的結果，閱讀文獻時應系統性評估潛在的利益衝突。</p>
      <div class="callout callout--warning">
        <div class="callout__title">注意事項</div>
        <p>利益衝突的存在不代表研究結論必然錯誤，但應提高警覺，特別關注研究設計、結果選擇報告及統計分析方式是否存在操弄跡象。</p>
      </div>
    </section>
  `
};

export default chapter;
