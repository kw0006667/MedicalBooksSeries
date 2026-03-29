import type { ChapterContent } from '../../types.js';

const chapter: ChapterContent = {
  title: '處方審核與調劑練習',
  content: `
    <section id="prescription-review-cases">
      <h2>處方審核病例</h2>
      <p>本組病例訓練學習者系統性地審核處方，檢核項目包括：患者身份核對、藥品名稱（商品名 vs. 學名）、劑量、給藥途徑、頻次、療程長度，以及是否存在藥物交互作用或禁忌症。每道病例均包含需識別的處方問題及正確的處理方式。</p>
      <div class="callout callout--info">
        <div class="callout__title">學習重點</div>
        <p>處方審核的「5R」原則：正確的患者（Right patient）、正確的藥物（Right drug）、正確的劑量（Right dose）、正確的途徑（Right route）、正確的時間（Right time）；在此基礎上再加上適應症審核與禁忌症排除。</p>
      </div>
    </section>

    <section id="dose-calculation-practice">
      <h2>劑量計算練習</h2>
      <p>本節提供各類型劑量計算的練習題組，包括體重別計算（mg/kg）、體表面積計算（BSA，用於化療）、腎功能調整計算（依 CrCl）、靜脈點滴速率計算（mL/hr，考量滴速係數），以及靜脈推注濃度換算。練習題涵蓋常見計算錯誤的識別。</p>
      <div class="callout callout--clinical">
        <div class="callout__title">臨床要點</div>
        <p>10 倍劑量錯誤（如將 0.5 mg/kg 誤計為 5 mg/kg）是最危險的計算錯誤類型，尤其在新生兒科與腫瘤科；養成「單位分析法」（Dimensional analysis）的計算習慣，並培養對不尋常劑量的直覺感知，是防範此類錯誤的關鍵。</p>
      </div>
    </section>

    <section id="drug-interaction-screening">
      <h2>藥物交互作用篩查</h2>
      <p>本組練習涵蓋藥物交互作用的系統性篩查，包括 CYP450 酵素誘導/抑制型交互作用、藥效動力學加乘效應（如多種 QTc 延長藥物合用、多種 CNS 抑制劑）及轉運蛋白（P-glycoprotein）介導的交互作用。練習重點在於評估交互作用的臨床顯著性並提出管理策略。</p>
      <div class="callout callout--warning">
        <div class="callout__title">注意事項</div>
        <p>電腦藥物交互作用警示系統可偵測大多數已知交互作用，但警示過多導致的疲勞會降低臨床注意力；培養評估交互作用臨床顯著性（「此交互作用在此患者會產生實質傷害嗎？」）的判斷能力是藥師與醫師的核心技能。</p>
      </div>
    </section>

    <section id="dispensing-error-prevention">
      <h2>調劑錯誤預防</h2>
      <p>調劑錯誤的常見類型包括：用藥相似（LASA drug，Look-Alike Sound-Alike）混淆、劑量或劑型錯誤、給藥途徑錯誤（如靜脈製劑誤用於肌肉注射），以及標籤錯誤。本節介紹系統性錯誤預防策略，包括 Tall-Man 字母法、最終核對程序及高警示藥物的雙重確認。</p>
      <div class="callout callout--danger">
        <div class="callout__title">重要警示</div>
        <p>高警示藥物（High-alert medications）包括：胰島素、抗凝血藥、化療藥物、濃縮電解質溶液（KCl &gt;2 mEq/mL）及神經肌肉阻斷藥；這類藥物的劑量錯誤後果往往極為嚴重，必須建立強制性雙重確認流程。</p>
      </div>
    </section>
  `
};

export default chapter;
