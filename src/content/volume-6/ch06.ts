import type { ChapterContent } from '../../types.js';

const chapter: ChapterContent = {
  title: '實際把證據放進病床邊決策',
  content: `
    <section id="evidence-to-practice">
      <h2>從證據到實踐的轉化</h2>
      <p>將研究證據應用於臨床實踐需要評估研究的適用性，包括患者特徵的相似度、介入措施的可行性，以及結果指標的臨床相關性。平均治療效果未必適用於個別患者，需考慮患者特定的基線風險來估計絕對獲益。</p>
      <div class="callout callout--info">
        <div class="callout__title">學習重點</div>
        <p>本節將介紹如何將相對風險降低（RRR）轉換為個別患者的絕對風險降低（ARR）與 NNT，以及判斷研究結果是否可應用於眼前患者的系統性思考框架。</p>
      </div>
    </section>

    <section id="patient-values-integration">
      <h2>整合病患價值觀與偏好</h2>
      <p>實證醫學的三角包含最佳研究證據、臨床專業判斷與病患價值觀，三者缺一不可。共享決策（Shared Decision Making, SDM）是將病患偏好納入臨床決策的實踐方式，需透過有效溝通讓患者理解選項的利弊，並尊重其自主選擇。</p>
      <div class="callout callout--clinical">
        <div class="callout__title">臨床要點</div>
        <p>使用決策輔助工具（Decision Aids）可幫助患者更清楚地理解治療選項，研究顯示決策輔助工具能提高患者知識、降低決策衝突，並促進更符合個人價值觀的選擇。</p>
      </div>
    </section>

    <section id="clinical-decision-support">
      <h2>臨床決策支援工具</h2>
      <p>臨床決策支援（Clinical Decision Support, CDS）工具將最新證據整合至臨床工作流程，包括診斷計算工具（如 Wells Score）、治療指引提醒及藥物交互作用警示。有效的 CDS 應在適當時機提供相關資訊，同時避免警示疲勞。</p>
      <div class="callout callout--success">
        <div class="callout__title">關鍵要點</div>
        <p>臨床評分系統（如 CURB-65、CHA₂DS₂-VASc）是將研究證據轉化為床邊決策工具的典型範例，掌握其推導背景與適用限制是正確使用的前提。</p>
      </div>
    </section>

    <section id="implementation-science">
      <h2>實施科學</h2>
      <p>實施科學（Implementation Science）研究如何將有效的介入措施系統性地推廣至臨床實踐，關注從「知道」到「做到」的落差。常用框架包括 CFIR（整合框架）、RE-AIM 及 EPIS，涵蓋探索、準備、實施與持續維護的完整過程。</p>
      <div class="callout callout--info">
        <div class="callout__title">學習重點</div>
        <p>臨床指南發布後平均需要 17 年才能廣泛落實於臨床，實施科學的核心目標就是縮短這個「知識到實踐」的差距，理解其主要策略對推動醫療品質改善至關重要。</p>
      </div>
    </section>
  `
};

export default chapter;
