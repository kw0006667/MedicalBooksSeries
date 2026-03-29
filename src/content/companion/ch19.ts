import type { ChapterContent } from '../../types.js';

const chapter: ChapterContent = {
  title: '口試與 Case Presentation',
  content: `
    <section id="oral-exam-formats">
      <h2>口試形式總覽</h2>
      <p>醫學教育中的口試形式包括：傳統床邊口試（Bedside oral exam）、多站式迷你臨床評量（Mini-CEX）、直接觀察操作技術（DOPS）、病例呈現後問答（Post-encounter examination）及高利害考試（如住院醫師甄試面試）。各形式的評估重點與準備策略各有不同。</p>
      <div class="callout callout--info">
        <div class="callout__title">學習重點</div>
        <p>口試的本質是「思考過程的外化」，評審評估的不只是最終答案，更是推理的條理性與完整性；練習大聲說出臨床推理過程（Think aloud）是準備口試的核心技巧，可讓評審看見你的臨床思維架構。</p>
      </div>
    </section>

    <section id="case-presentation-structure">
      <h2>病例呈現的結構</h2>
      <p>標準病例呈現的結構包括：一句話摘要（One-liner）→ 主訴 → 現病史（HPI）→ 過去病史/用藥/過敏/家族史/社會史（PMHx/Meds/Allergy/FHx/SHx）→ 身體檢查 → 重要實驗室與影像結果 → 評估（Assessment，鑑別診斷）→ 計畫（Plan，依問題清單）。</p>
      <div class="callout callout--clinical">
        <div class="callout__title">臨床要點</div>
        <p>「One-liner」是病例呈現的精髓，格式為「[年齡][性別][重要背景]的患者，主訴[主訴]，表現為[關鍵特徵]」；能在一句話內傳遞最關鍵的臨床訊息，是高效病例呈現能力的標誌，也是快速建立鑑別診斷框架的起點。</p>
      </div>
    </section>

    <section id="common-oral-exam-questions">
      <h2>口試常見問題應答</h2>
      <p>本節整理醫學口試中最常見的問題類型與應答框架，包括：「下一步如何處置？」（依緊急性排序）、「您的鑑別診斷是什麼？」（3-5 個依可能性排列）、「為什麼選擇這個治療？」（說明證據基礎與選項比較），以及「如果病況惡化，您如何處理？」（應變計畫）。</p>
      <div class="callout callout--success">
        <div class="callout__title">關鍵要點</div>
        <p>口試中被問到不確定的問題時，誠實表達「我不確定，但我的思考方向是…」遠比猜測或沉默更能獲得評審信任；展示思考框架與邏輯推演過程，有時比直接說出正確答案更能展現臨床能力的深度。</p>
      </div>
    </section>

    <section id="presentation-skills">
      <h2>口頭表達技巧</h2>
      <p>有效的病例呈現需兼顧內容（completeness）、組織（structure）、表達（delivery）與時間控制（timing）。常見的口頭表達問題包括：呈現過於冗長（包含所有陰性發現而非聚焦重點）、過度依賴手寫筆記、缺乏眼神接觸，以及無法在評審打斷後重新拾回思路。</p>
      <div class="callout callout--warning">
        <div class="callout__title">注意事項</div>
        <p>病例呈現的「沙漏結構」原則：開頭（One-liner）和結尾（Assessment & Plan）需要最高的精確性與簡潔度；中間病史部分的選擇性詳述，應根據最可能的鑑別診斷決定哪些細節值得強調，哪些可以省略或摘要帶過。</p>
      </div>
    </section>
  `
};

export default chapter;
