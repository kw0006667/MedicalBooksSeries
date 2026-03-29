import type { ChapterContent } from '../../types.js';

const chapter: ChapterContent = {
  title: '遠距醫療與居家照護',
  content: `
    <section id="telehealth-models">
      <h2>遠距醫療模式</h2>
      <p>遠距醫療（Telehealth）涵蓋多種透過資通訊技術提供健康服務的模式，包括同步視訊/語音諮詢、非同步影像傳輸（如皮膚科、眼科遠距會診）、遠距患者監測，以及行動健康（mHealth）應用程式。每種模式有其適用的臨床情境與技術需求。</p>
      <div class="callout callout--info">
        <div class="callout__title">學習重點</div>
        <p>本節將介紹各種遠距醫療模式的定義、適用情境及實施要件，包括同步（Synchronous）與非同步（Asynchronous）模式、儲存傳遞（Store-and-forward）技術，以及遠距臨場（Telepresence）的發展趨勢。</p>
      </div>
    </section>

    <section id="remote-patient-monitoring">
      <h2>遠距患者監測</h2>
      <p>遠距患者監測（Remote Patient Monitoring, RPM）使用穿戴式裝置與連網感測器持續收集患者生理數據（如血壓、血糖、心律、血氧、體重），並傳輸至醫療團隊進行主動管理。RPM 在慢性病管理（高血壓、糖尿病、心臟衰竭）與術後追蹤中已有初步的效益證據。</p>
      <div class="callout callout--clinical">
        <div class="callout__title">臨床要點</div>
        <p>RPM 產生的大量數據需要有效的篩選與警示機制，以避免資訊過載；同時需要明確的臨床流程定義何種數值觸發何種回應，確保患者安全而不增加不必要的醫療接觸。</p>
      </div>
    </section>

    <section id="digital-therapeutics">
      <h2>數位治療（Digital Therapeutics）</h2>
      <p>數位治療（DTx）是以軟體為基礎、經過臨床驗證，並具有法規核准用途的醫療介入。已核准的 DTx 包括用於藥物使用疾患的認知行為治療程式、第二型糖尿病管理應用程式及多動症的注意力訓練工具。DTx 需與傳統藥物一樣提交臨床試驗證據。</p>
      <div class="callout callout--success">
        <div class="callout__title">關鍵要點</div>
        <p>DTx 與一般健康促進 App 的根本區別在於其具有明確的治療意圖、嚴格的臨床試驗驗證，以及法規主管機關的審查核准；在臨床推薦數位工具時，應優先考量有此類保障的產品。</p>
      </div>
    </section>

    <section id="equity-access-telehealth">
      <h2>遠距醫療的公平性與可及性</h2>
      <p>遠距醫療雖有潛力消弭地理障礙，但數位落差（Digital divide）可能使老年人、低收入族群、教育程度較低者及農村居民面臨更大的使用障礙。確保遠距醫療的公平可及性需要同時解決設備取得、網路連線品質、數位素養及語言障礙等多重因素。</p>
      <div class="callout callout--warning">
        <div class="callout__title">注意事項</div>
        <p>若遠距醫療的推廣未能同步關注數位公平性，可能加劇「高需求、低可及性」族群的健康不平等；政策制定者與醫療機構應主動評估並解決服務族群中的數位落差問題。</p>
      </div>
    </section>
  `
};

export default chapter;
