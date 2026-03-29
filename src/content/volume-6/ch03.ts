import type { ChapterContent } from '../../types.js';

const chapter: ChapterContent = {
  title: '統計核心概念',
  content: `
    <section id="descriptive-stats">
      <h2>描述性統計</h2>
      <p>描述性統計涵蓋集中趨勢（平均數、中位數、眾數）與離散程度（標準差、四分位距、範圍）的測量，以及資料分布的視覺化呈現。選擇適當的統計量取決於資料的測量尺度與分布型態。</p>
      <div class="callout callout--info">
        <div class="callout__title">學習重點</div>
        <p>偏態分布的資料應以中位數與四分位距描述，而非平均數與標準差；閱讀文獻時需注意作者選用統計量的適切性。</p>
      </div>
    </section>

    <section id="hypothesis-testing-p-value">
      <h2>假說檢定與 p 值</h2>
      <p>假說檢定的邏輯基於零假說（null hypothesis），p 值代表在零假說為真的前提下，觀察到至少如此極端結果的機率。p 值並非效果大小的指標，也不代表臨床意義的大小，需與信賴區間及效應量共同解讀。</p>
      <div class="callout callout--warning">
        <div class="callout__title">注意事項</div>
        <p>p 值小於 0.05 僅代表統計顯著，不等於臨床顯著；大樣本研究中即使微小且無臨床意義的差異也可能達到統計顯著，應同時評估效應量。</p>
      </div>
    </section>

    <section id="confidence-intervals">
      <h2>信賴區間</h2>
      <p>95% 信賴區間意指若重複進行相同研究 100 次，約有 95 次計算出的區間會涵蓋真實母群體參數。信賴區間同時提供估計值的精確度與方向性，是比 p 值更具資訊價值的統計呈現方式。</p>
      <div class="callout callout--clinical">
        <div class="callout__title">臨床要點</div>
        <p>評估治療效果時，優先關注信賴區間是否跨越「無效值」（如 OR=1 或 RD=0），以及區間的寬窄所代表的估計精確度。</p>
      </div>
    </section>

    <section id="number-needed-to-treat">
      <h2>需治療人數（NNT）與需傷害人數（NNH）</h2>
      <p>需治療人數（Number Needed to Treat, NNT）是絕對風險差的倒數，代表需治療多少病患才能預防一個不良結果；需傷害人數（NNH）則表示引起一個不良事件需治療的人數。這兩個指標將統計結果轉化為臨床上易於理解的語言。</p>
      <div class="callout callout--success">
        <div class="callout__title">關鍵要點</div>
        <p>NNT 越小代表治療效果越好；向病患解釋治療利弊時，結合 NNT 與 NNH 能讓風險溝通更具體且易於理解。</p>
      </div>
    </section>
  `
};

export default chapter;
