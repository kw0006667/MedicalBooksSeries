import type { ChapterContent } from '../../types.js';

const chapter: ChapterContent = {
  title: '臨床問題的形成 (PICO)',
  content: `
    <section id="pico-framework">
      <h2>PICO 架構</h2>
      <p>PICO 是將臨床問題結構化的標準框架，包含病患（Patient）、介入（Intervention）、比較（Comparison）與結果（Outcome）四個要素。透過 PICO 架構，臨床醫師能精確地將臨床問題轉換為可搜尋的研究問題。</p>
      <div class="callout callout--info">
        <div class="callout__title">學習重點</div>
        <p>本節將說明如何運用 PICO 架構，將臨床遭遇的問題轉化為結構化的可回答問題，為後續的證據搜尋奠定基礎。</p>
      </div>
    </section>

    <section id="background-vs-foreground">
      <h2>背景問題與前景問題的區別</h2>
      <p>背景問題（Background questions）關注疾病的基本知識，如病理生理機制；前景問題（Foreground questions）則針對特定臨床情境，詢問最佳的診斷或治療方式。區分兩者有助於決定使用何種資源來查找答案。</p>
      <div class="callout callout--clinical">
        <div class="callout__title">臨床要點</div>
        <p>初學者常以背景問題為主，隨著臨床經驗增加，前景問題的比重將逐漸提高，應善用 PubMed、UpToDate 等工具回答前景問題。</p>
      </div>
    </section>

    <section id="clinical-question-types">
      <h2>臨床問題的類型</h2>
      <p>臨床問題可依性質分為治療、診斷、預後、病因、預防及成本效益等類型。不同類型的問題需要對應不同的研究設計來回答，例如治療問題最適合以隨機對照試驗（RCT）為依據。</p>
      <div class="callout callout--info">
        <div class="callout__title">學習重點</div>
        <p>本節重要內容即將推出，涵蓋各類臨床問題的定義、範例及對應的最佳研究設計。</p>
      </div>
    </section>

    <section id="searching-evidence">
      <h2>證據搜尋策略</h2>
      <p>有效的證據搜尋需結合適當的資料庫選擇（如 PubMed、Cochrane Library）、MeSH 詞彙的應用，以及布林邏輯運算子的使用，以提高搜尋的靈敏度與特異度。</p>
      <div class="callout callout--success">
        <div class="callout__title">關鍵要點</div>
        <p>掌握「PICO → 關鍵字 → 資料庫篩選 → 文獻評讀」的完整工作流程，是實踐實證醫學的核心技能。</p>
      </div>
    </section>
  `
};

export default chapter;
