import type { ChapterContent } from '../../types.js';

const chapter: ChapterContent = {
  title: '劑型學與配方學',
  content: `
    <section id="dosage-forms">
      <h2>錠劑、膠囊、注射、吸入、貼片</h2>
      <p>本節介紹各種主要藥物劑型的結構特性與給藥方式，說明劑型選擇對藥物吸收與患者便利性的影響。</p>
      <div class="callout callout--info">
        <div class="callout__title">提示</div>
        <p>本章節將涵蓋速放與緩釋製劑的設計差異、吸入裝置的正確使用，以及注射劑型（靜脈、肌肉、皮下）的特性比較。</p>
      </div>
    </section>
    <section id="bioavailability-formulation">
      <h2>生體可用率 (Bioavailability) 與劑型設計</h2>
      <p>本節說明生體可用率的定義與影響因素，介紹藥劑學如何透過劑型設計來優化藥物的吸收與療效。</p>
      <div class="callout callout--info">
        <div class="callout__title">提示</div>
        <p>本章節將涵蓋絕對與相對生體可用率的計算、溶出試驗 (dissolution testing) 的意義，以及奈米製劑與脂質體的新型遞藥概念。</p>
      </div>
    </section>
    <section id="sterile-preparation-stability">
      <h2>無菌製備與安定性</h2>
      <p>本節介紹靜脈注射液、眼用製劑等無菌製品的製備標準，說明確保藥品安定性的關鍵環境與技術條件。</p>
      <div class="callout callout--info">
        <div class="callout callout--info">
          <div class="callout__title">提示</div>
          <p>本章節將涵蓋 USP 797 無菌調配準則、滅菌方法的選擇，以及光、熱、pH 對藥物安定性的影響。</p>
        </div>
      </div>
    </section>
    <section id="incompatibility-compatibility">
      <h2>配伍禁忌與相容性</h2>
      <p>本節說明藥物混合時可能發生的物理性與化學性不相容問題，介紹常見的配伍禁忌組合與預防策略。</p>
      <div class="callout callout--info">
        <div class="callout__title">提示</div>
        <p>本章節將涵蓋沉澱反應、酸鹼值不相容、光敏感藥物的保護措施，以及多藥混合靜脈注射的相容性查核資源。</p>
      </div>
    </section>
  `
};

export default chapter;
