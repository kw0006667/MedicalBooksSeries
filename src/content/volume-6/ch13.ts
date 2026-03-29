import type { ChapterContent } from '../../types.js';

const chapter: ChapterContent = {
  title: 'AI in Healthcare',
  content: `
    <section id="ml-dl-fundamentals-in-health">
      <h2>機器學習與深度學習在醫療的基礎</h2>
      <p>機器學習（ML）使電腦從資料中自動學習規律，深度學習（DL）則透過多層神經網路處理複雜的非結構化資料（如影像、文字）。在醫療領域，監督式學習用於疾病預測、診斷分類；非監督式學習用於患者分群；強化學習則用於治療策略優化。</p>
      <div class="callout callout--info">
        <div class="callout__title">學習重點</div>
        <p>本節涵蓋機器學習的主要類型、卷積神經網路（CNN）在醫學影像分析的應用，以及自然語言處理（NLP）在臨床文本分析的應用，以建立跨領域的溝通基礎。</p>
      </div>
    </section>

    <section id="ai-clinical-applications">
      <h2>AI 的臨床應用</h2>
      <p>醫療 AI 的主要應用領域包括：醫學影像診斷（眼底病變、皮膚癌、胸部 X 光、病理切片）、臨床風險預測（敗血症早期預警、再入院風險）、藥物研發（分子設計、臨床試驗優化），以及大型語言模型（LLM）在臨床文件與患者溝通的輔助應用。</p>
      <div class="callout callout--clinical">
        <div class="callout__title">臨床要點</div>
        <p>已通過 FDA 核准的 AI 醫療器材數量快速增長，涵蓋心律不整偵測、糖尿病視網膜病變篩查等領域；臨床醫師應了解所使用 AI 工具的訓練資料來源、驗證方式及適用族群。</p>
      </div>
    </section>

    <section id="bias-fairness-ai">
      <h2>AI 的偏差與公平性</h2>
      <p>醫療 AI 模型可能在不同族群（種族、性別、年齡）中表現不均等，原因包括訓練資料的代表性不足、標籤偏差及演算法設計缺陷。不公平的 AI 系統可能加劇既有的健康不平等，因此在開發與部署 AI 時需系統性地評估各子群體的模型表現。</p>
      <div class="callout callout--warning">
        <div class="callout__title">注意事項</div>
        <p>一個在整體族群中表現優異的 AI 模型，可能在少數族群中表現不佳；單一整體準確度指標無法揭示此問題，需要分層分析不同子群體的模型效能。</p>
      </div>
    </section>

    <section id="regulatory-framework-ai">
      <h2>AI 醫療器材的法規框架</h2>
      <p>AI 醫療器材的監管面臨獨特挑戰，包括持續學習模型的監管一致性、真實世界效能的持續監測，以及演算法透明度（可解釋性）的要求。美國 FDA 已發布 AI/ML 軟體框架，要求製造商建立預先設計的改變控制計畫（Pre-determined Change Control Plan）。</p>
      <div class="callout callout--success">
        <div class="callout__title">關鍵要點</div>
        <p>台灣食藥署（TFDA）已建立 AI 醫療器材審查機制，臨床醫師在採用 AI 工具時應確認其是否具備適當的法規核准，並了解其預期用途與使用限制。</p>
      </div>
    </section>
  `
};

export default chapter;
