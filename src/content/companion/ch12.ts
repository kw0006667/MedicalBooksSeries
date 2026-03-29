import type { ChapterContent } from '../../types.js';

const chapter: ChapterContent = {
  title: '鑑別診斷訓練',
  content: `
    <section id="differential-by-chief-complaint">
      <h2>依主訴的鑑別診斷</h2>
      <p>本節系統性整理臨床最常見主訴的鑑別診斷清單，包括胸痛、呼吸困難、腹痛、頭痛、發燒、意識改變、急性腰背痛、四肢水腫及血尿等。每個主訴的鑑別診斷依「危及生命須先排除」→「常見診斷」→「不可錯過的罕見診斷」的優先順序排列。</p>
      <div class="callout callout--info">
        <div class="callout__title">學習重點</div>
        <p>鑑別診斷的「VINDICATE」記憶法（Vascular, Infectious, Neoplastic, Degenerative, Idiopathic/Iatrogenic, Congenital, Autoimmune, Trauma, Endocrine/metabolic）是確保不遺漏重要病因類別的系統化工具。</p>
      </div>
    </section>

    <section id="systematic-dd-approach">
      <h2>系統性鑑別診斷方法</h2>
      <p>系統性鑑別診斷方法包括：解剖定位法（依器官系統逐一考量）、生理病理法（依疾病機制分類）及模式識別法（直覺辨認典型表現）。初學者宜以系統性方法為主，隨經驗增加逐漸融入模式識別；過度依賴早期模式識別是資深臨床醫師發生診斷錯誤的常見原因。</p>
      <div class="callout callout--clinical">
        <div class="callout__title">臨床要點</div>
        <p>「診斷閉合（Premature closure）」是最常見的認知偏差之一，即在尚未排除其他重要診斷前就停止思考；養成「還有什麼其他可能？」的反問習慣，是防範過早診斷閉合的有效策略。</p>
      </div>
    </section>

    <section id="probability-based-reasoning">
      <h2>機率式臨床推理</h2>
      <p>貝氏定理是機率式臨床推理的數學基礎，透過整合檢前機率（病患族群盛行率 + 個別臨床特徵）與診斷試驗結果（概似比），計算檢後機率以指導進一步處置決策。理解概似比的應用是從定性到定量臨床推理的關鍵轉變。</p>
      <div class="callout callout--success">
        <div class="callout__title">關鍵要點</div>
        <p>「SpIN-SnOUT」原則：高特異度（Specificity）的陽性結果可用來確診（rule IN）；高靈敏度（Sensitivity）的陰性結果可用來排診（rule OUT）；掌握此原則有助於在臨床上合理運用診斷工具。</p>
      </div>
    </section>

    <section id="diagnostic-error-drills">
      <h2>診斷錯誤演練</h2>
      <p>本節提供真實案例為基礎的診斷錯誤案例分析，訓練學習者識別常見認知偏差（確認偏差、代表性偏誤、基準率忽視、疊加診斷陷阱）及系統性失誤（資訊缺失、溝通不良、流程缺陷）。每道案例均包含根本原因分析（RCA）的練習框架。</p>
      <div class="callout callout--warning">
        <div class="callout__title">注意事項</div>
        <p>診斷錯誤造成的患者傷害在所有醫療錯誤中比例最高，且多數難以察覺（患者已出院）；學習如何識別自身的認知偏差，是提升診斷準確度的重要後設認知能力。</p>
      </div>
    </section>
  `
};

export default chapter;
