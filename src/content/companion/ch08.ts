import type { ChapterContent } from '../../types.js';

const chapter: ChapterContent = {
  title: 'OSCE Station 設計',
  content: `
    <section id="osce-station-examples">
      <h2>OSCE 站台範例</h2>
      <p>客觀結構化臨床測驗（OSCE）透過標準化病患與評估量表，系統性地評估臨床技能。本節提供多種 OSCE 站台設計範例，包含病史採集、身體檢查、程序操作、醫病溝通、急救處置及診斷解讀等類型，每個站台均附有詳細的場景設定、評估項目與評分標準。</p>
      <div class="callout callout--info">
        <div class="callout__title">學習重點</div>
        <p>本節涵蓋各類型 OSCE 站台的設計原則，包括場景的真實性、評估項目的選擇（關鍵行為 vs. 加分行為）、時間設定，以及如何設計能區分不同能力層次考生的有效評量工具。</p>
      </div>
    </section>

    <section id="marking-criteria">
      <h2>評分標準設計</h2>
      <p>OSCE 評分量表分為全局評分（Global rating scale）與核查清單（Checklist）兩種主要形式。全局評分反映整體臨床表現的質性評估，核查清單則記錄特定技能步驟的完成情況。高效的評分設計通常結合兩者，並需確保評分者間信度。</p>
      <div class="callout callout--clinical">
        <div class="callout__title">臨床要點</div>
        <p>「關鍵項目（Critical items）」是評分中若未完成則直接不及格的必要步驟，如急救程序中的關鍵動作；設計評分標準時應明確定義關鍵項目，以確保最低安全能力標準的把關。</p>
      </div>
    </section>

    <section id="feedback-strategies">
      <h2>回饋策略</h2>
      <p>有效的 OSCE 回饋需具備即時性、具體性與建設性，採用結構化框架（如 Pendleton model 或 R2C2 模型）有助於引導學習者自我反思。回饋應聚焦於可改變的行為，以正向優先，再提出待改善的具體項目，並共同制定改善計畫。</p>
      <div class="callout callout--success">
        <div class="callout__title">關鍵要點</div>
        <p>研究顯示，以「行為描述」（你做了什麼）而非「人格評判」（你是什麼樣的人）的回饋方式，對學習者的技能改善效果更佳；回饋的品質往往比分數本身對學習的影響更大。</p>
      </div>
    </section>

    <section id="common-osce-mistakes">
      <h2>OSCE 常見錯誤分析</h2>
      <p>學員在 OSCE 中最常見的失分原因包括：未向患者自我介紹（忽視禮儀）、未確認患者身份、未洗手、未徵得同意、遺漏關鍵詢問（如藥物過敏史、末次月經）、身體檢查不系統性，以及溝通中使用醫學術語而未適時說明。</p>
      <div class="callout callout--warning">
        <div class="callout__title">注意事項</div>
        <p>「五開頭」是 OSCE 失分的集中地帶：開始前的自我介紹、確認患者身份、手部衛生、取得同意，以及開放性引導語；這些「儀式性步驟」的確立，傳遞了對患者的尊重，也是臨床安全文化的體現。</p>
      </div>
    </section>
  `
};

export default chapter;
