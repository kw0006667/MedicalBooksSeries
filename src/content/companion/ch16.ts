import type { ChapterContent } from '../../types.js';

const chapter: ChapterContent = {
  title: '劑量調整與 TDM 題組',
  content: `
    <section id="renal-dose-adjustment-cases">
      <h2>腎功能劑量調整病例</html>
      <p>腎功能異常的劑量調整需先評估腎絲球過濾率（eGFR，採用 CKD-EPI 公式），再查閱藥物仿單或標準參考資源（如 Lexicomp、Micromedex）確認調整方案。本節演練常見需腎功能調整藥物：β-lactam 類抗生素、Metformin、直接口服抗凝血藥（DOACs）及 Gabapentin 的劑量計算。</p>
      <div class="callout callout--warning">
        <div class="callout__title">注意事項</div>
        <p>eGFR &lt;30 mL/min/1.73m² 時，Metformin 應停用（乳酸中毒風險）；eGFR &lt;15 mL/min/1.73m² 時，多數 DOACs 禁用（透析患者可考慮 Warfarin 或 Apixaban 的特殊考量）；腎功能快速惡化患者需更頻繁地重新評估用藥安全性。</p>
      </div>
    </section>

    <section id="hepatic-dose-adjustment-cases">
      <h2>肝功能劑量調整病例</h2>
      <p>肝功能異常的劑量調整較腎功能更複雜，缺乏標準化的肝功能評估指標（Child-Pugh 分類是最常用的臨床工具）。主要肝臟代謝藥物（如他汀類、某些抗黴菌藥、多數苯二氮平類）在嚴重肝功能不全時均需調整或禁用，本節演練各類場景的臨床決策。</p>
      <div class="callout callout--clinical">
        <div class="callout__title">臨床要點</div>
        <p>肝硬化患者應避免使用的藥物類別：NSAIDs（腎衰竭/消化道出血風險）、胺基配糖體（腎毒性放大）、苯二氮平類（誘發/加重肝性腦病）及 Acetaminophen 過量（肝毒性，但治療劑量在無酗酒情況下通常安全）；這些禁忌是肝病患者處方審核的重要核查點。</p>
      </div>
    </section>

    <section id="tdm-vancomycin-aminoglycoside">
      <h2>萬古黴素與胺基配糖體的 TDM</h2>
      <p>治療藥物監測（Therapeutic Drug Monitoring, TDM）在萬古黴素與胺基配糖體的使用中至關重要。萬古黴素的現代 TDM 推薦監測 AUC/MIC 比值（目標 400-600 mg·h/L）而非傳統谷濃度；胺基配糖體（Gentamicin/Tobramycin）的延伸區間給藥（Extended-interval dosing）可提高療效並降低腎毒性。</p>
      <div class="callout callout--danger">
        <div class="callout__title">重要警示</div>
        <p>胺基配糖體的腎毒性與耳毒性（不可逆性聽力損失）風險在長療程、腎功能異常、老年及同時使用其他腎毒性藥物的患者中顯著增加；嚴密的 TDM 與最短必要療程是降低此類不良反應的關鍵策略。</p>
      </div>
    </section>

    <section id="tdm-other-drugs">
      <h2>其他藥物的 TDM 題組</h2>
      <p>本節演練其他重要 TDM 藥物的監測與劑量調整，包括：抗癲癇藥（Phenytoin 的非線性動力學、Valproic acid 的蛋白結合修正）、免疫抑制劑（Cyclosporine/Tacrolimus 的移植後監測）及地高辛（Digoxin 的谷濃度目標與毒性表現識別）。</p>
      <div class="callout callout--info">
        <div class="callout__title">學習重點</div>
        <p>Phenytoin 的非線性（Michaelis-Menten）藥動學特性意味著劑量微小增加可能導致血中濃度大幅波動甚至毒性；在低白蛋白或腎衰竭患者中，需以游離型濃度（free phenytoin level）或 Sheiner-Tozer 公式校正計算，否則可能嚴重低估實際游離藥物濃度。</p>
      </div>
    </section>
  `
};

export default chapter;
