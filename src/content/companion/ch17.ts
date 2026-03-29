import type { ChapterContent } from '../../types.js';

const chapter: ChapterContent = {
  title: '醫學系常見考核框架',
  content: `
    <section id="shelf-exams-overview">
      <h2>學科考試（Shelf Exams）總覽</h2>
      <p>美國醫學院的 NBME Shelf 考試在各臨床實習輪訓後進行，涵蓋內科、外科、婦產科、兒科、精神科及家醫科等科別。各科考試的知識框架、高頻考點與題型略有差異，本節提供各科 Shelf 考試的準備策略、推薦資源（如 UWorld、Amboss）及備考時程規劃建議。</p>
      <div class="callout callout--info">
        <div class="callout__title">學習重點</div>
        <p>Shelf 考試強調臨床應用而非純知識記憶；「題目練習 → 錯題分析 → 主動回憶複習」的循環學習法，遠比被動閱讀教科書更有效率，研究顯示提取練習（Retrieval practice）對長期記憶的效益是被動閱讀的兩倍以上。</p>
      </div>
    </section>

    <section id="clinical-milestone-assessment">
      <h2>臨床里程碑評估</h2>
      <p>ACGME 臨床里程碑（Clinical Milestones）是評估住院醫師在六大核心能力（Patient Care、Medical Knowledge、Practice-Based Learning、Interpersonal Communication、Professionalism、Systems-Based Practice）各發展階段的行為錨點，以 Level 1-5 描述從初學者到獨立執業的能力發展軌跡。</p>
      <div class="callout callout--clinical">
        <div class="callout__title">臨床要點</div>
        <p>里程碑評估設計的目的不在於排名競爭，而在於提供學習者對自身能力發展階段的清楚定位，並識別需要額外支持的領域；積極向指導老師請求形成性回饋（formative feedback）是加速能力發展的最有效策略。</p>
      </div>
    </section>

    <section id="epa-entrustable-activities">
      <h2>可委託專業活動（EPAs）</h2>
      <p>可委託專業活動（Entrustable Professional Activities, EPAs）是以工作為單位的能力評估框架，描述受訓者可在不同監督程度下獨立執行的臨床任務。AAMC 發布的 13 項醫學生核心 EPA（如採集病史、病例呈現、知情同意、急救應對）是醫學教育成果導向的重要基準。</p>
      <div class="callout callout--success">
        <div class="callout__title">關鍵要點</div>
        <p>EPA 的委託決策（entrustment decision）需要受訓者主動展示能力，而非被動等待機會；主動向帶教老師表達「我可以嘗試獨立完成這項操作，請您監督」的積極態度，是加速臨床能力委託的最直接方式。</p>
      </div>
    </section>

    <section id="study-strategies">
      <h2>醫學系備考策略</h2>
      <p>循證的高效學習策略包括：分散學習（Spaced repetition，使用 Anki 等工具）、提取練習（做題而非反覆閱讀）、交錯練習（不同科目交替而非集中一科）及精心提取（主動連結新舊知識）。臨床實習期間的學習重點是整合臨床情境與基礎知識，而非機械式記憶。</p>
      <div class="callout callout--info">
        <div class="callout__title">學習重點</div>
        <p>「感覺學會了」（Fluency illusion）是最常見的學習誤區：重複閱讀熟悉材料產生流暢感，讓人誤以為已充分掌握；用自我測試或向同學講解代替重複閱讀，是打破此誤區的有效方法。</p>
      </div>
    </section>
  `
};

export default chapter;
