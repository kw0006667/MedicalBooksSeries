import type { ChapterContent } from '../../types.js';

const chapter: ChapterContent = {
  title: '藥動學 (Pharmacokinetics)',
  content: `
    <section id="adme">
      <h2>吸收、分布、代謝、排除 (ADME)</h2>
      <p>本節系統性介紹藥物在人體內的完整動態過程，說明 ADME 各階段影響藥物血中濃度的關鍵因素。</p>
      <div class="callout callout--info">
        <div class="callout__title">提示</div>
        <p>本章節將涵蓋口服生體可用率、血腦屏障通透性、肝臟首渡效應，以及腎臟排除的過濾、分泌與再吸收機制。</p>
      </div>
    </section>
    <section id="half-life-clearance-vd">
      <h2>半衰期、清除率、分布容積</h2>
      <p>本節介紹描述藥物動力學行為的核心參數，說明半衰期、清除率與分布容積的定義及其臨床意義。</p>
      <div class="callout callout--info">
        <div class="callout__title">提示</div>
        <p>本章節將涵蓋一室與二室模型、清除率的計算公式，以及分布容積大小對藥物特性的提示意義。</p>
      </div>
    </section>
    <section id="dosing-regimen-steady-state">
      <h2>載藥方案與穩態 (Steady State)</h2>
      <p>本節說明如何根據藥動學參數設計合理的給藥方案，介紹穩態的達成時間與濃度預測原則。</p>
      <div class="callout callout--info">
        <div class="callout__title">提示</div>
        <p>本章節將涵蓋負荷劑量的設計邏輯、維持劑量計算，以及給藥間隔對血中濃度波動的影響。</p>
      </div>
    </section>
    <section id="renal-hepatic-dose-adjustment">
      <h2>腎肝功能不全時的劑量調整</h2>
      <p>本節說明腎臟與肝臟功能受損時藥物動力學的改變，介紹常用的劑量調整方法與臨床工具。</p>
      <div class="callout callout--info">
        <div class="callout__title">提示</div>
        <p>本章節將涵蓋 CrCl/eGFR 計算、Child-Pugh 分級、藥物劑量調整原則，以及腎/肝衰竭對特定藥物的影響案例。</p>
      </div>
    </section>
  `
};

export default chapter;
