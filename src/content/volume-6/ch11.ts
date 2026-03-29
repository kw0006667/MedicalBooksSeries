import type { ChapterContent } from '../../types.js';

const chapter: ChapterContent = {
  title: '全球健康與傳染病監測',
  content: `
    <section id="global-health-burden">
      <h2>全球疾病負擔</h2>
      <p>全球疾病負擔（Global Burden of Disease, GBD）研究系統性地估計全球各地區、各年齡層的死亡率與 DALY，揭示傳染病（如瘧疾、結核病、HIV）與非傳染病（如心血管疾病、癌症）的相對重要性，為全球衛生資源分配提供依據。</p>
      <div class="callout callout--info">
        <div class="callout__title">學習重點</div>
        <p>本節涵蓋主要全球健康指標的現況、低中高收入國家的疾病譜差異，以及全球健康目標（如聯合國永續發展目標 SDG 3）的內涵與進展。</p>
      </div>
    </section>

    <section id="infectious-disease-surveillance">
      <h2>傳染病監測系統</h2>
      <p>傳染病監測（Infectious disease surveillance）是持續系統性地收集、分析與解讀健康相關數據，以便及時採取公共衛生行動的過程。監測系統分為被動監測（依賴醫療人員通報）與主動監測（主動向醫療機構查詢），各有其靈敏度與成本上的取捨。</p>
      <div class="callout callout--clinical">
        <div class="callout__title">臨床要點</div>
        <p>臨床醫師是傳染病監測系統的第一線，依法通報法定傳染病是重要義務。台灣的法定傳染病分為第一至五類，通報期限依疾病嚴重性與傳染性從立即通報到一週內通報不等。</p>
      </div>
    </section>

    <section id="outbreak-investigation">
      <h2>疫情調查</h2>
      <p>疫情調查的標準步驟包括：確認疫情存在、建立病例定義、主動搜尋病例、繪製流行曲線（epidemic curve）、描述時間-地點-人物特徵、產生與檢驗假說、實施控制措施，以及書面報告。流行曲線的形態（點源、持續性來源、人傳人）可提示傳播模式。</p>
      <div class="callout callout--success">
        <div class="callout__title">關鍵要點</div>
        <p>疫情調查的最終目標是識別感染來源與傳播途徑，以便迅速終止疫情。早期調查行動與控制措施的及時性往往比等待完整流行病學證據更為重要。</p>
      </div>
    </section>

    <section id="one-health-approach">
      <h2>同一健康（One Health）方法</h2>
      <p>同一健康（One Health）是認識人類、動物與環境健康相互連結的整合性框架。約 60% 的人類新興傳染病來源於動物（人畜共通傳染病），氣候變遷加速了病媒分布的改變，使得跨越人、動物與生態系統界限的協同監測與應對成為防範未來大流行病的關鍵策略。</p>
      <div class="callout callout--warning">
        <div class="callout__title">注意事項</div>
        <p>COVID-19、SARS、H1N1 流感等近年重大疫情均涉及動物傳人的跨種傳播，強調在野生動物交易、農業系統及生態系統管理等上游環節加強監測的重要性。</p>
      </div>
    </section>
  `
};

export default chapter;
