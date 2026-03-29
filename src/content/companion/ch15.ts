import type { ChapterContent } from '../../types.js';

const chapter: ChapterContent = {
  title: '抗生素選擇練習',
  content: `
    <section id="empiric-antibiotic-selection">
      <h2>經驗性抗生素選擇</h2>
      <p>經驗性抗生素的選擇依據「感染部位 → 最可能的病原體 → 本地抗藥性流行病學 → 患者特定因素（腎/肝功能、過敏史、免疫狀態）」的思考流程。本節提供常見感染症（社區肺炎、泌尿道感染、腹腔內感染、皮膚軟組織感染）的經驗性抗生素選擇練習。</p>
      <div class="callout callout--clinical">
        <div class="callout__title">臨床要點</div>
        <p>社區型肺炎（CAP）的門診輕症患者可用 Amoxicillin 或 Doxycycline；住院患者使用 β-lactam + 非典型菌覆蓋藥物的合併療法；需住 ICU 的重症患者才需廣效覆蓋；依嚴重度分層選擇是避免過度用藥的關鍵。</p>
      </div>
    </section>

    <section id="culture-directed-therapy">
      <h2>培養結果導向的治療</h2>
      <p>取得培養及藥敏結果後，應依據最窄有效抗生素原則降階治療（de-escalation）。本節演練如何解讀微生物培養報告（包括最小抑菌濃度 MIC 的判讀）、依 S/I/R 判讀結果選擇目標性治療，以及何時可由靜脈轉換為口服抗生素。</p>
      <div class="callout callout--success">
        <div class="callout__title">關鍵要點</div>
        <p>靜脈轉口服（IV-to-PO）抗生素轉換的標準條件包括：臨床改善、可口服且口服生物利用度佳（如 Fluoroquinolones、Linezolid、Metronidazole）、無胃腸道吸收問題；及時轉換可縮短住院時間並降低靜脈導管相關感染風險。</p>
      </div>
    </section>

    <section id="antibiotic-de-escalation-drills">
      <h2>抗生素降階練習</h2>
      <p>抗菌藥物管理（Antimicrobial Stewardship）的核心技能之一是在保障療效的前提下縮窄抗菌範圍。本節演練在取得培養結果、患者臨床改善後，從廣效覆蓋（如碳青黴烯類）降階至目標性治療（如 Cefazolin 治療 MSSA 菌血症）的決策過程。</p>
      <div class="callout callout--info">
        <div class="callout__title">學習重點</div>
        <p>黃金葡萄球菌（S. aureus）菌血症的標準治療：MSSA 應由 Vancomycin 降階至 Oxacillin/Nafcillin 或 Cefazolin（療效更優、不良反應更少）；MRSA 則繼續使用 Vancomycin 或依 MIC 考慮 Daptomycin，降階決策需結合 MIC 與臨床反應。</p>
      </div>
    </section>

    <section id="allergy-cross-reactivity">
      <h2>藥物過敏與交叉反應</h2>
      <p>盤尼西林過敏是臨床上最常見的藥物過敏申報，但多數為非嚴重的非 IgE 媒介反應或歷史報告不確定的不良反應。青黴素與頭孢菌素的真正交叉反應率遠低於傳統認知（約 1-2%），不應成為一律迴避所有 β-lactam 的理由，過度迴避反而導致使用次優抗生素。</p>
      <div class="callout callout--warning">
        <div class="callout__title">注意事項</div>
        <p>對「盤尼西林過敏」患者應進行詳細問診以評估反應嚴重性：輕度反應（皮疹，無蕁麻疹）可謹慎使用結構不相近的頭孢菌素；嚴重 IgE 媒介反應（蕁麻疹、血管性水腫、過敏性休克）則應轉介進行盤尼西林過敏測試或採用非 β-lactam 替代方案。</p>
      </div>
    </section>
  `
};

export default chapter;
