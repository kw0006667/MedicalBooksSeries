import type { ChapterContent } from '../../types.js';

const chapter: ChapterContent = {
  title: '偏差、混雜與因果推論',
  content: `
    <section id="selection-information-bias">
      <h2>選擇偏差與資訊偏差</h2>
      <p>選擇偏差（Selection bias）發生於研究樣本無法代表目標族群時，常見類型包括健康工人效應、失訪偏差與Berkson偏差；資訊偏差（Information bias）則源於曝露或結果的測量誤差，包括回憶偏差與觀察者偏差。</p>
      <div class="callout callout--warning">
        <div class="callout__title">注意事項</div>
        <p>評讀研究時應系統性地評估各類偏差的存在與方向性，偏差的方向（朝向或遠離虛無）決定其對研究結論的影響程度。</p>
      </div>
    </section>

    <section id="confounding-control">
      <h2>混雜因子與控制方法</h2>
      <p>混雜因子（Confounder）是同時與曝露及結果相關的第三變數，可使曝露與結果的關聯產生扭曲。控制混雜的方法包括研究設計層面（隨機化、限制、配對）與統計分析層面（分層分析、多變量迴歸、傾向分數法）。</p>
      <div class="callout callout--info">
        <div class="callout__title">學習重點</div>
        <p>本節將介紹各種混雜控制策略的原理、適用情境及限制，重點包括傾向分數配對（PSM）與工具變數（IV）分析的基本概念。</p>
      </div>
    </section>

    <section id="causal-inference-frameworks">
      <h2>因果推論框架</h2>
      <p>現代因果推論框架包括 Bradford Hill 因果準則、反事實框架（潛在結果模型）與有向無環圖（DAG）。DAG 是識別混雜因子、中介變數與碰撞因子的視覺化工具，有助於規劃正確的統計調整策略。</p>
      <div class="callout callout--clinical">
        <div class="callout__title">臨床要點</div>
        <p>使用 DAG 可以避免過度調整（over-adjustment）的問題——調整中介變數或碰撞因子反而會引入偏差，而非消除偏差。</p>
      </div>
    </section>

    <section id="threats-to-validity">
      <h2>效度的威脅因素</h2>
      <p>研究效度分為內部效度（結論在研究樣本內是否正確）與外部效度（結論是否可推廣至其他族群）。威脅內部效度的因素包括各類偏差與混雜；威脅外部效度的因素則包括樣本代表性不足與介入措施的可移植性問題。</p>
      <div class="callout callout--success">
        <div class="callout__title">關鍵要點</div>
        <p>高內部效度是外部效度的前提，但兩者之間往往存在取捨；嚴格的 RCT 雖有高內部效度，但嚴格的納排條件可能限制其外部效度。</p>
      </div>
    </section>
  `
};

export default chapter;
