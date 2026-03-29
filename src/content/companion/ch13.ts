import type { ChapterContent } from '../../types.js';

const chapter: ChapterContent = {
  title: 'Lab Interpretation Drills',
  content: `
    <section id="cbc-interpretation-drills">
      <h2>全血球計數（CBC）判讀演練</h2>
      <p>CBC 判讀演練涵蓋：各類貧血的鑑別（MCV/MCH 分類法；網織紅血球指數的應用）、白血球分類計數的臨床意義（嗜中性球增多/減少症、嗜酸性球增多症的鑑別診斷），以及血小板異常（血小板低下症的快速鑑別：生成不足 vs. 破壞過多 vs. 分布異常）。</p>
      <div class="callout callout--clinical">
        <div class="callout__title">臨床要點</div>
        <p>巨球性貧血（MCV &gt;100 fL）的最常見原因是葉酸或維生素 B12 缺乏；同時出現血小板低下與白血球低下（Pancytopenia）需系統性排除骨髓抑制、脾臟隔絕、再生不良性貧血及骨髓轉移等重要原因。</p>
      </div>
    </section>

    <section id="metabolic-panel-drills">
      <h2>代謝功能檢查判讀演練</h2>
      <p>代謝功能檢查演練涵蓋：基礎代謝功能（BMP）與完整代謝功能（CMP）的系統性解讀、陰離子間隙（Anion gap）的計算與臨床意義（MUDPILES 記憶法）、電解質異常（高/低鈉血症的生理分類、鉀離子異常的心電圖關聯）及肝功能指標的解讀模式。</p>
      <div class="callout callout--info">
        <div class="callout__title">學習重點</div>
        <p>低鈉血症的分類需先評估血液滲透壓（排除偽低鈉血症），再依容積狀態分類（低容積、正常容積、高容積），每類對應不同病因與治療策略；此「兩步驟分類法」是系統性解讀低鈉血症的核心架構。</p>
      </div>
    </section>

    <section id="abg-acid-base-drills">
      <h2>動脈血氣體（ABG）與酸鹼平衡演練</h2>
      <p>ABG 判讀的標準六步驟：判斷 pH（酸中毒/鹼中毒）→ 判斷主要異常（呼吸 vs. 代謝）→ 評估代償是否適當（Winter 公式；預期 pCO₂）→ 計算陰離子間隙 → 計算 delta-delta 比值（AG 升高型代謝性酸中毒是否合併代謝性鹼中毒）→ 綜合診斷。</p>
      <div class="callout callout--success">
        <div class="callout__title">關鍵要點</div>
        <p>複合型酸鹼失衡（如代謝性酸中毒 + 代謝性鹼中毒）在嚴重患者中極常見，單純看 pH「正常」不代表酸鹼平衡正常；delta-delta 比值是偵測隱藏性代謝性鹼中毒的關鍵工具。</p>
      </div>
    </section>

    <section id="integrated-lab-cases">
      <h2>整合性檢驗判讀病例</h2>
      <p>本組病例訓練學習者整合多項異常檢驗結果，建構臨床診斷假說。案例設計包含橫跨多系統的實驗室異常，如同時出現貧血、腎功能異常與電解質失衡的多發性骨髓瘤病例，以及橫跨 CBC、肝功能及凝血功能的嚴重肝病病例。</p>
      <div class="callout callout--warning">
        <div class="callout__title">注意事項</div>
        <p>檢驗結果必須結合臨床情境解讀，脫離臨床背景的單一數值往往具誤導性；「異常值」的臨床意義取決於患者個別基礎值、用藥狀況及臨床表現，不可機械式依據參考範圍做出結論。</p>
      </div>
    </section>
  `
};

export default chapter;
