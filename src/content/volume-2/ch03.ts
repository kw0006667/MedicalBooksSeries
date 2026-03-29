import type { ChapterContent } from '../../types.js';

const chapter: ChapterContent = {
  title: '藥物交互作用與不良反應',
  content: `
    <section id="drug-drug-interactions">
      <h2>藥物間交互作用 (Drug-Drug Interactions)</h2>
      <p>本節說明藥物間交互作用的分類與發生機制，介紹藥動學與藥效學交互作用的臨床重要性。</p>
      <div class="callout callout--info">
        <div class="callout__title">提示</div>
        <p>本章節將涵蓋 CYP450 誘導劑/抑制劑的交互作用、P-糖蛋白的臨床意義，以及高風險藥物組合的辨識與處理。</p>
      </div>
    </section>
    <section id="food-herb-interactions">
      <h2>藥食與藥草交互作用</h2>
      <p>本節介紹食物與草藥成分對藥物動力學及藥效的影響，說明常見交互作用的機制與臨床注意事項。</p>
      <div class="callout callout--info">
        <div class="callout__title">提示</div>
        <p>本章節將涵蓋葡萄柚汁與 CYP3A4 的交互作用、聖約翰草的酵素誘導效應，以及維生素 K 與抗凝血劑的飲食管理。</p>
      </div>
    </section>
    <section id="adr-classification">
      <h2>藥物不良反應 (ADR) 分類與機轉</h2>
      <p>本節系統性介紹藥物不良反應的 Rawlins-Thompson 分類，說明各類型不良反應的機轉與臨床特徵。</p>
      <div class="callout callout--info">
        <div class="callout__title">提示</div>
        <p>本章節將涵蓋 Type A（可預測性）至 Type F（治療失敗）的分類，以及藥物不良反應的通報系統與因果關係評估。</p>
      </div>
    </section>
    <section id="medication-monitoring-risk-prevention">
      <h2>用藥監測與風險預防</h2>
      <p>本節介紹藥物治療監測 (TDM) 的原理與適用藥物，說明如何透過系統性監測降低藥物相關傷害風險。</p>
      <div class="callout callout--info">
        <div class="callout__title">提示</div>
        <p>本章節將涵蓋 TDM 的適應指標、血中濃度採樣時機，以及高警訊藥物 (high-alert medications) 的安全管理策略。</p>
      </div>
    </section>
  `
};

export default chapter;
