import type { ChapterContent } from '../../types.js';

const chapter: ChapterContent = {
  title: 'Real-World Evidence (RWE)',
  content: `
    <section id="rwe-vs-rct">
      <h2>真實世界證據與隨機對照試驗的比較</h2>
      <p>真實世界證據（Real-World Evidence, RWE）來源於 RCT 以外的真實臨床實踐資料，反映更廣泛族群在日常醫療環境中的實際治療效果（Effectiveness），而非在嚴格試驗條件下的效力（Efficacy）。RCT 有高內部效度，RWE 則彌補其外部效度的不足。</p>
      <div class="callout callout--info">
        <div class="callout__title">學習重點</div>
        <p>本節將說明 RWE 與 RCT 在研究目的、族群代表性、介入執行及偏差控制上的根本差異，以及兩者如何相輔相成，共同構成完整的證據生態系統。</p>
      </div>
    </section>

    <section id="rwd-sources">
      <h2>真實世界資料的來源</h2>
      <p>真實世界資料（Real-World Data, RWD）的主要來源包括：電子健康紀錄（EHR）、健康保險理賠資料庫、疾病登錄系統（Disease registry）、患者報告結果（PRO）、行動健康裝置資料，以及社群媒體與數位健康平台資料。各類資料來源各有其覆蓋範圍、資料完整性與偏差類型。</p>
      <div class="callout callout--clinical">
        <div class="callout__title">臨床要點</div>
        <p>台灣的全民健保資料庫（NHIRD）是全球最完整的全國性醫療費用申報資料之一，覆蓋超過 99% 的人口，已產出大量高品質的真實世界研究，對全球醫學文獻有重要貢獻。</p>
      </div>
    </section>

    <section id="methodological-considerations">
      <h2>方法學考量</h2>
      <p>RWE 研究面臨的主要方法學挑戰包括：選擇偏差（適應症混雜）、測量誤差（如由申報資料推估診斷的準確性）、殘餘混雜，以及資料不完整（如跨院就醫紀錄缺失）。現代方法學工具如傾向分數分析、工具變數及主動監測方法可部分解決這些問題。</p>
      <div class="callout callout--warning">
        <div class="callout__title">注意事項</div>
        <p>新使用者設計（New-user design）、主動對照設計（Active comparator design）及偽隨機化策略是 RWE 研究中減少混雜偏差的重要方法，缺乏這些設計考量的 RWE 研究結論需謹慎解讀。</p>
      </div>
    </section>

    <section id="regulatory-use-of-rwe">
      <h2>RWE 在法規決策中的應用</h2>
      <p>美國 FDA 的 21st Century Cures Act 要求 FDA 制定 RWE 用於藥品核准的框架。RWE 目前主要用於支持已核准藥品的新適應症擴增、上市後安全監測（藥物警戒），以及在罕見病與小兒科族群等難以進行 RCT 的情境中提供補充證據。</p>
      <div class="callout callout--success">
        <div class="callout__title">關鍵要點</div>
        <p>RWE 在法規決策中的角色日益重要，但其被接受的前提是使用嚴謹的研究設計、高品質資料，以及透明的方法學報告；方法學的嚴謹性是 RWE 取得法規信任的關鍵。</p>
      </div>
    </section>
  `
};

export default chapter;
