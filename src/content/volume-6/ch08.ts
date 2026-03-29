import type { ChapterContent } from '../../types.js';

const chapter: ChapterContent = {
  title: '篩檢與預防',
  content: `
    <section id="screening-principles">
      <h2>篩檢的原則</h2>
      <p>Wilson-Jungner 篩檢準則是評估篩檢計畫是否值得推行的經典框架，包含疾病嚴重性、可識別的潛伏期、有效治療的存在、可接受的篩檢方法，以及成本效益等十項準則。有效篩檢的前提是早期診斷能改變疾病的自然史。</p>
      <div class="callout callout--info">
        <div class="callout__title">學習重點</div>
        <p>本節將說明篩檢適用疾病的條件、篩檢測試的選擇標準，以及如何平衡篩檢的獲益（早期發現）與潛在傷害（過度診斷、假陽性的焦慮與後續處置）。</p>
      </div>
    </section>

    <section id="prevention-levels">
      <h2>預防的層次</h2>
      <p>預防醫學分為初級預防（針對健康人群，消除危險因子）、次級預防（早期發現無症狀疾病）與三級預防（減少疾病合併症與功能損失）。近年來新增的零級預防針對危險因子本身的上游決定因素，以及四級預防以避免過度醫療化。</p>
      <div class="callout callout--clinical">
        <div class="callout__title">臨床要點</div>
        <p>在日常臨床實踐中，預防醫學常被忽視；每次就診都是提供預防性建議的機會，包括疫苗、癌症篩檢、生活型態諮詢及慢性病風險評估。</p>
      </div>
    </section>

    <section id="screening-program-evaluation">
      <h2>篩檢計畫的評估</h2>
      <p>評估篩檢計畫的效果需考量前置時間偏差（Lead-time bias）、病程長短偏差（Length-biased sampling）及過度診斷偏差，這些因素可能使篩檢計畫的效果看起來比實際更好。理想的評估方式是以全因死亡率或疾病特異死亡率為結果指標的 RCT。</p>
      <div class="callout callout--warning">
        <div class="callout__title">注意事項</div>
        <p>單純以「五年存活率提升」來評估篩檢效果是不恰當的，因為前置時間偏差可能在不改變死亡時間的情況下人為地提升存活率。</p>
      </div>
    </section>

    <section id="overdiagnosis-harms">
      <h2>過度診斷與篩檢傷害</h2>
      <p>過度診斷（Overdiagnosis）是指發現的疾病若未被篩檢出，終其一生也不會造成症狀或死亡。常見於甲狀腺癌、攝護腺癌（PSA 篩檢）及乳癌篩檢。過度診斷導致過度治療，使患者承受不必要的醫療傷害，是篩檢計畫最嚴重的潛在危害。</p>
      <div class="callout callout--danger">
        <div class="callout__title">重要警示</div>
        <p>過度診斷的比例難以在個別患者層面估計，但在族群層面可透過發生率趨勢分析來推估。篩檢前應讓受檢者了解過度診斷的可能性，確保知情同意的完整性。</p>
      </div>
    </section>
  `
};

export default chapter;
