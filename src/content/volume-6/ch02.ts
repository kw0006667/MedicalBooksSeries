import type { ChapterContent } from '../../types.js';

const chapter: ChapterContent = {
  title: '研究設計總覽',
  content: `
    <section id="rct">
      <h2>隨機對照試驗（RCT）</h2>
      <p>隨機對照試驗（Randomized Controlled Trial, RCT）是評估介入效果的黃金標準，透過隨機分配受試者至實驗組與對照組，最大程度減少已知與未知的混雜因素。其核心要素包括隨機化、盲化、意向治療分析（ITT）及樣本數計算。</p>
      <div class="callout callout--clinical">
        <div class="callout__title">臨床要點</div>
        <p>閱讀 RCT 時應特別注意隨機化方法、盲化程度、失訪率及主要結果指標的選擇，這些因素直接影響研究結果的內部效度。</p>
      </div>
    </section>

    <section id="cohort-case-control">
      <h2>世代研究與病例對照研究</h2>
      <p>世代研究（Cohort study）追蹤暴露族群的結果發生率，適合評估暴露與疾病的因果關聯；病例對照研究（Case-control study）則從結果回溯暴露史，適合研究罕見疾病或需要長期追蹤的情況。</p>
      <div class="callout callout--info">
        <div class="callout__title">學習重點</div>
        <p>理解兩種設計各自的優缺點、適用情境，以及常見的偏差來源，是判讀觀察性研究的基礎。</p>
      </div>
    </section>

    <section id="cross-sectional-ecological">
      <h2>橫斷面研究與生態學研究</h2>
      <p>橫斷面研究（Cross-sectional study）在特定時間點同時收集暴露與結果資料，適合估計盛行率；生態學研究（Ecological study）以群體為分析單位，可產生假說但無法避免生態謬誤（ecological fallacy）。</p>
      <div class="callout callout--warning">
        <div class="callout__title">注意事項</div>
        <p>橫斷面研究無法確立時序性，因此不能推論因果關係；生態學研究的群體層級關聯不能直接推論至個人層級。</p>
      </div>
    </section>

    <section id="hierarchy-of-evidence">
      <h2>證據等級金字塔</h2>
      <p>證據等級金字塔從低到高依序為：個案報告/系列、橫斷面研究、病例對照研究、世代研究、RCT、系統性回顧與統合分析。等級越高的研究設計，其系統性偏差越低，但並非所有臨床問題都能以高等級設計回答。</p>
      <div class="callout callout--success">
        <div class="callout__title">關鍵要點</div>
        <p>證據等級是輔助判斷的工具，而非唯一依據；研究的品質、適用性與臨床情境同樣重要，不可一味迷信「最高等級」證據。</p>
      </div>
    </section>
  `
};

export default chapter;
