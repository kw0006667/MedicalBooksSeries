import type { ChapterContent } from '../../types.js';

const chapter: ChapterContent = {
  title: '疾病頻率與風險',
  content: `
    <section id="incidence-prevalence">
      <h2>發生率與盛行率</h2>
      <p>發生率（Incidence）衡量特定期間內新病例的發生速率，可分為累積發生率與發生密度；盛行率（Prevalence）則是特定時間點現有病例占族群的比例。兩者的關係為：盛行率 ≈ 發生率 × 疾病平均持續時間。</p>
      <div class="callout callout--info">
        <div class="callout__title">學習重點</div>
        <p>理解發生率與盛行率的差異對規劃公衛介入至關重要：發生率反映疾病風險，適合評估預防效果；盛行率反映疾病負擔，適合規劃醫療資源。</p>
      </div>
    </section>

    <section id="risk-measures">
      <h2>風險測量指標</h2>
      <p>流行病學的風險測量包括相對風險（RR）、勝算比（OR）、歸因風險（AR）及人口歸因風險百分比（PAR%）。相對風險反映暴露對個人的影響強度；歸因風險與 PAR% 則更能反映在族群層面消除危險因子的潛在公衛效益。</p>
      <div class="callout callout--clinical">
        <div class="callout__title">臨床要點</div>
        <p>OR 在病例盛行率低時接近 RR，但在盛行率高的橫斷面研究或病例對照研究中，OR 可能高估相對風險，解讀時須注意此點。</p>
      </div>
    </section>

    <section id="diagnostic-test-accuracy">
      <h2>診斷試驗的準確度</h2>
      <p>評估診斷試驗的指標包括靈敏度（Sensitivity）、特異度（Specificity）、陽性預測值（PPV）、陰性預測值（NPV）及概似比（Likelihood Ratio）。這些指標相互關聯，且預測值受疾病盛行率影響，在不同臨床情境下其意義有所差異。</p>
      <div class="callout callout--success">
        <div class="callout__title">關鍵要點</div>
        <p>靈敏度與特異度是檢驗本身的固有特性，不受盛行率影響；但 PPV 與 NPV 高度依賴檢前機率（pre-test probability），理解這個概念是合理使用診斷工具的核心。</p>
      </div>
    </section>

    <section id="disease-burden-measurement">
      <h2>疾病負擔的測量</h2>
      <p>疾病負擔的綜合測量指標包括失能調整生命年（DALY）、品質調整生命年（QALY）及死亡率指標。DALY 整合了早死損失年數（YLL）與失能損失年數（YLD），廣泛用於全球疾病負擔研究與衛生資源分配決策。</p>
      <div class="callout callout--info">
        <div class="callout__title">學習重點</div>
        <p>本節將介紹 DALY 與 QALY 的計算原理、常見的疾病負擔排名，以及這些指標在公衛政策制定與成本效益分析中的應用。</p>
      </div>
    </section>
  `
};

export default chapter;
