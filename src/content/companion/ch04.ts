import type { ChapterContent } from '../../types.js';

const chapter: ChapterContent = {
  title: '多重用藥與老人案例',
  content: `
    <section id="polypharmacy-cases">
      <h2>多重用藥病例</h2>
      <p>多重用藥（Polypharmacy，通常定義為同時使用 ≥5 種藥物）在老年患者中極為常見，帶來藥物交互作用、不良反應及用藥依從性等多重挑戰。本組病例訓練學習者系統性審查藥物清單、識別潛在問題藥物，以及評估每種藥物的繼續使用必要性。</p>
      <div class="callout callout--info">
        <div class="callout__title">學習重點</div>
        <p>Beers Criteria 與 STOPP/START 準則是識別老年患者不適當處方的標準工具，本組病例包含使用這些工具系統性審查老年患者藥物清單的練習。</p>
      </div>
    </section>

    <section id="drug-interactions-cases">
      <h2>藥物交互作用病例</h2>
      <p>本組病例涵蓋臨床上重要的藥物交互作用，包括 CYP450 酵素抑制/誘導（如氟康唑 + 華法林、利福平 + 口服避孕藥）、QT 間期延長的加乘效應，以及腎排泄競爭（如甲氨蝶呤 + NSAIDs）。練習重點在於預測交互作用後果並提出處置方案。</p>
      <div class="callout callout--clinical">
        <div class="callout__title">臨床要點</div>
        <p>華法林的 INR 在加入新藥（特別是抗生素、抗黴菌藥、某些心臟藥物）後可能大幅波動，需在加藥後 3-5 天複查 INR；記憶「CYP2C9 抑制劑 → 華法林作用增強」的規律可預防多數相關不良事件。</p>
      </div>
    </section>

    <section id="deprescribing-cases">
      <h2>減藥（Deprescribing）病例</h2>
      <p>減藥是為改善患者結果或減少不良藥物事件風險，在醫療監督下逐步減少或停用藥物的過程。本組病例涵蓋質子幫浦抑制劑（PPI）、安眠藥（苯二氮平類）及降血糖藥的減藥決策，以及如何與患者溝通停藥的理由與監測計畫。</p>
      <div class="callout callout--success">
        <div class="callout__title">關鍵要點</div>
        <p>減藥與不治療不同，是積極的醫療決策；對於使用 PPI 無明確適應症的患者嘗試停藥，使用苯二氮平類的老年患者逐步減量，均有改善結果的臨床證據支持。</p>
      </div>
    </section>

    <section id="falls-delirium-cases">
      <h2>跌倒與譫妄病例</h2>
      <p>跌倒與譫妄是老年患者住院期間最常見的兩種不良事件，且均與多重用藥密切相關。本組病例訓練學習者識別跌倒高風險藥物（抗膽鹼藥、苯二氮平類、降壓藥）、評估譫妄的誘發因素（DELIRIUMS 記憶法），以及非藥物介入策略的應用。</p>
      <div class="callout callout--warning">
        <div class="callout__title">注意事項</div>
        <p>老年患者的譫妄常被誤診為失智症惡化或單純「老年行為」；譫妄的特徵是急性發作、症狀波動（晝夜差異），與失智症的慢性進行性認知退化不同，識別這一差異對及時找出並處理誘發因素至關重要。</p>
      </div>
    </section>
  `
};

export default chapter;
