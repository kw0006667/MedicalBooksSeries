import type { ChapterContent } from '../../types.js';

const chapter: ChapterContent = {
  title: '藥學系常見考核框架',
  content: `
    <section id="naplex-mpje-overview">
      <h2>NAPLEX 與 MPJE 考試總覽</h2>
      <p>NAPLEX（North American Pharmacist Licensure Examination）評估藥師提供患者照護的能力，涵蓋藥物治療知識、計算能力及藥學實務；MPJE（Multistate Pharmacy Jurisprudence Examination）則評估聯邦與州藥事法規的知識。兩者均為美國藥師執照考試的必要條件，考試內容與格式定期更新。</p>
      <div class="callout callout--info">
        <div class="callout__title">學習重點</div>
        <p>NAPLEX 的 ACPE 能力框架強調以患者為中心的藥物治療管理（MTM）能力，備考時應重視臨床藥學思維而非純記憶；建議使用 RxPrep 或 Naplex Mastery 等針對性資源，並搭配模擬考試評估備考進度。</p>
      </div>
    </section>

    <section id="appe-oppe-assessment">
      <h2>APPE 與 OPPE 評估</h2>
      <p>進階藥學實習（APPE）是藥學教育的核心臨床訓練，在醫院、社區藥局、門診及特殊照護等環境進行。評估工具通常包括臨床能力評量、患者照護案例書面報告、SOAP note 書寫及口頭病例呈現。OPPE（Objective Pharmacy Practice Exam）是部分學校用於客觀評估實習能力的考核形式。</p>
      <div class="callout callout--clinical">
        <div class="callout__title">臨床要點</div>
        <p>APPE 期間主動參與查房（Rounds）的藥師建議是影響學習成效的關鍵因素；主動提出藥物治療問題、計算劑量調整方案並向醫師溝通建議，是將書本知識轉化為臨床能力的最直接途徑。</p>
      </div>
    </section>

    <section id="pharmacy-competency-standards">
      <h2>藥學能力標準</h2>
      <p>台灣藥師能力框架依藥事服務的核心功能劃分，涵蓋調劑服務、藥物資訊提供、藥學照護（Pharmaceutical Care）、藥物不良反應通報、醫療團隊協作及公共衛生服務。各項能力的達成需要理論知識、實踐技能與專業態度的整合培養。</p>
      <div class="callout callout--success">
        <div class="callout__title">關鍵要點</div>
        <p>「藥學照護」模式將藥師的角色從以藥物為中心轉向以患者為中心，強調藥師對藥物治療結果的積極責任；具備藥學照護能力的藥師能在降低藥物相關問題（DRP）、改善慢性病管理結果方面發揮不可取代的價值。</p>
      </div>
    </section>

    <section id="study-strategies">
      <h2>藥學系備考策略</h2>
      <p>藥學系的備考策略需兼顧廣泛的藥物知識（數以千計的藥物）與臨床應用能力。有效策略包括：依藥物類別建立系統性知識框架（而非逐一記憶個別藥物）、善用記憶技巧（藥物類別的共同字尾/字首識別）、藥物計算的反覆演練，以及結合臨床案例強化藥物選擇的情境記憶。</p>
      <div class="callout callout--warning">
        <div class="callout__title">注意事項</div>
        <p>藥物劑量與用法的記憶需特別注意「記對了但記錯情境」的問題——同一藥物在不同適應症、不同族群（腎功能、年齡）的劑量可能差異甚大；以「適應症 + 族群 + 劑量」的整合記憶單元取代單純的藥物劑量記憶，可提高臨床應用的準確性。</p>
      </div>
    </section>
  `
};

export default chapter;
