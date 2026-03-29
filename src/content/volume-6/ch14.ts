import type { ChapterContent } from '../../types.js';

const chapter: ChapterContent = {
  title: 'Pharmacogenomics 與 Precision Medicine',
  content: `
    <section id="pgx-clinical-implementation">
      <h2>藥物基因組學的臨床應用</h2>
      <p>藥物基因組學（Pharmacogenomics, PGx）研究基因變異如何影響藥物的代謝、效果與不良反應。臨床上重要的 PGx 基因包括 CYP2C19（氯吡格雷活化）、CYP2D6（可待因、他莫昔芬）、TPMT/NUDT15（硫嘌呤藥物毒性）及 HLA-B*5701（阿巴卡韋超敏反應）。</p>
      <div class="callout callout--clinical">
        <div class="callout__title">臨床要點</div>
        <p>HLA-B*5701 基因型篩查是預防阿巴卡韋（abacavir）超敏反應的標準作業，陽性者應終身禁用此藥；這是 PGx 在臨床上預防嚴重藥物不良反應的最典型範例。</p>
      </div>
    </section>

    <section id="precision-medicine-oncology">
      <h2>腫瘤學中的精準醫療</h2>
      <p>腫瘤精準醫療透過腫瘤基因體分析（如次世代定序）識別可靶向的驅動突變，從而選擇最可能有效的靶向治療。代表性範例包括 EGFR 突變肺癌的 TKI 治療、HER2 陽性乳癌的 trastuzumab、BCR-ABL 陽性 CML 的 imatinib，以及 BRCA 突變癌症的 PARP 抑制劑。</p>
      <div class="callout callout--info">
        <div class="callout__title">學習重點</div>
        <p>本節涵蓋常見癌症的可靶向生物標記、腫瘤次世代定序報告的解讀框架，以及液態活檢（液體切片）在腫瘤監測中的新興應用。</p>
      </div>
    </section>

    <section id="biomarker-driven-therapy">
      <h2>生物標記導向的治療</h2>
      <p>生物標記（Biomarker）是可客觀測量的生物指標，分為預測性生物標記（預測對特定治療的反應）與預後性生物標記（預測疾病結果，無論何種治療）。同伴診斷（Companion diagnostics）是需與特定靶向藥物配合使用的體外診斷測試，是生物標記導向治療的核心工具。</p>
      <div class="callout callout--success">
        <div class="callout__title">關鍵要點</div>
        <p>腫瘤突變負荷（TMB）與微衛星不穩定性（MSI）是預測免疫檢查點抑制劑反應的跨癌種生物標記，FDA 已核准相關適應症，代表精準醫療從單一腫瘤類型走向生物標記驅動的治療典範轉移。</p>
      </div>
    </section>

    <section id="ethical-social-implications">
      <h2>精準醫療的倫理與社會影響</h2>
      <p>精準醫療帶來的倫理挑戰包括：基因資訊的隱私保護與非歧視保障（如保險歧視風險）、偶發發現的告知義務、基因諮詢資源的不足，以及精準醫療高昂成本加劇健康不平等的疑慮。各國在基因資訊保護的立法程度差異顯著。</p>
      <div class="callout callout--warning">
        <div class="callout__title">注意事項</div>
        <p>基因資訊的特殊性在於其同時涉及個人與家族，基因隱私保護不僅關乎受檢者本人，也可能影響其親屬的保險、就業等權益，在臨床實踐中需特別謹慎處理。</p>
      </div>
    </section>
  `
};

export default chapter;
