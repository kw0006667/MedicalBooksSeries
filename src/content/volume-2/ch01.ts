import type { ChapterContent } from '../../types.js';

const chapter: ChapterContent = {
  title: '藥效學 (Pharmacodynamics)',
  content: `
    <section id="receptor-theory">
      <h2>受體理論</h2>
      <p>本節介紹藥物受體的基本概念與分類，說明藥物與受體結合的分子機制及其引發的生理效應。</p>
      <div class="callout callout--info">
        <div class="callout__title">提示</div>
        <p>本章節將涵蓋受體的四大類型（離子通道、G 蛋白偶聯、酪胺酸激酶、核受體）及各類受體的訊號傳遞路徑。</p>
      </div>
    </section>
    <section id="dose-response">
      <h2>劑量反應關係 (Dose-Response Relationship)</h2>
      <p>本節說明藥物劑量與其產生效應之間的量化關係，介紹劑量反應曲線的構成與臨床解讀方式。</p>
      <div class="callout callout--info">
        <div class="callout__title">提示</div>
        <p>本章節將涵蓋 Emax 模型、ED50 的定義與計算，以及 S 形劑量反應曲線的臨床應用。</p>
      </div>
    </section>
    <section id="potency-efficacy-therapeutic-index">
      <h2>效價、效能、治療指數 (Therapeutic Index)</h2>
      <p>本節區分藥物效價與效能的概念差異，並說明治療指數作為藥物安全性評估指標的重要性。</p>
      <div class="callout callout--info">
        <div class="callout__title">提示</div>
        <p>本章節將涵蓋效價 (potency) 與效能 (efficacy) 的比較、TI 與安全範圍 (safety margin) 的計算，以及窄治療窗藥物的臨床意義。</p>
      </div>
    </section>
    <section id="agonist-antagonist">
      <h2>激動劑、拮抗劑與部分激動劑</h2>
      <p>本節說明不同類型藥物-受體相互作用的特性，比較完全激動劑、部分激動劑與拮抗劑的藥效學差異。</p>
      <div class="callout callout--info">
        <div class="callout__title">提示</div>
        <p>本章節將涵蓋競爭性拮抗劑對劑量反應曲線的影響、反向激動劑概念，以及部分激動劑的臨床應用範例。</p>
      </div>
    </section>
  `
};

export default chapter;
