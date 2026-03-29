import type { ChapterContent } from '../../types.js';

const chapter: ChapterContent = {
  title: '電子病歷與臨床決策支援',
  content: `
    <section id="ehr-architecture">
      <h2>電子健康紀錄架構</h2>
      <p>電子健康紀錄（Electronic Health Record, EHR）系統儲存病患的結構化（如診斷碼、實驗室數值）與非結構化（如臨床紀錄）資料，並支援醫療工作流程的數位化。EHR 的核心模組包括醫囑輸入、藥物管理、結果回報、排程與計費，以及臨床決策支援功能。</p>
      <div class="callout callout--info">
        <div class="callout__title">學習重點</div>
        <p>本節將介紹 EHR 的主要功能組件、資料標準（如 HL7 FHIR、ICD-10、SNOMED CT）的基本概念，以及 EHR 導入對臨床工作流程的影響。</p>
      </div>
    </section>

    <section id="clinical-decision-support-systems">
      <h2>臨床決策支援系統</h2>
      <p>臨床決策支援系統（CDSS）透過在適當時機向適當人員提供適當資訊，協助臨床決策。主要類型包括診斷提醒、藥物交互作用警示、預防性照護提示、劑量計算工具，以及基於規則或機器學習的風險預測模型。</p>
      <div class="callout callout--clinical">
        <div class="callout__title">臨床要點</div>
        <p>有效的 CDSS 設計應考量「5 Rights」原則：在正確的時間（right time）、以正確格式（right format）向正確人員（right person）提供正確資訊（right information），並整合於正確工作流程（right workflow）中。</p>
      </div>
    </section>

    <section id="interoperability-standards">
      <h2>互通性與資料標準</h2>
      <p>醫療資訊互通性（Interoperability）是指不同系統之間無縫交換與使用健康資訊的能力。HL7 FHIR（Fast Healthcare Interoperability Resources）是目前最廣泛採用的現代標準，透過 RESTful API 實現系統整合，支援個人健康資料的跨機構流通。</p>
      <div class="callout callout--success">
        <div class="callout__title">關鍵要點</div>
        <p>台灣推動的「健康資料互通標準」與個人健康存摺計畫，使患者能掌握並分享自己的健康資料，提升醫療照護的連續性，也為醫療研究與公衛監測創造新機會。</p>
      </div>
    </section>

    <section id="alert-fatigue">
      <h2>警示疲勞</h2>
      <p>警示疲勞（Alert fatigue）是指因大量 CDSS 警示（多數為低臨床意義）導致臨床人員習慣性地忽略或覆蓋警示的現象。研究顯示，某些醫院的藥物警示覆蓋率高達 90% 以上，嚴重削弱了 CDSS 的安全防護功能。</p>
      <div class="callout callout--danger">
        <div class="callout__title">重要警示</div>
        <p>警示疲勞可能導致臨床人員忽略真正重要的安全警示，是醫療錯誤的重要風險因素。改善策略包括提升警示的特異度（減少假陽性）、分級警示嚴重程度，以及定期審查並停用低價值警示。</p>
      </div>
    </section>
  `
};

export default chapter;
