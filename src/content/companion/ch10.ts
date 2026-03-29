import type { ChapterContent } from '../../types.js';

const chapter: ChapterContent = {
  title: '用藥衛教模擬',
  content: `
    <section id="medication-counseling-scripts">
      <h2>用藥衛教腳本</h2>
      <p>有效的用藥衛教需涵蓋「五告知」：藥物名稱與用途、正確的服用方式與時機、常見副作用及應對方式、重要的藥食交互作用，以及何時需要回診或聯繫醫療人員。本節提供常見藥物（抗生素、降血壓藥、降血糖藥、抗凝血藥）的衛教腳本範本。</p>
      <div class="callout callout--info">
        <div class="callout__title">學習重點</div>
        <p>「回示法（Teach-back method）」是確認患者理解度的最佳方式：請患者用自己的話說明如何服藥，而非問「您聽懂了嗎？」；研究顯示回示法可有效提高用藥依從性並降低再入院率。</p>
      </div>
    </section>

    <section id="inhaler-technique-simulation">
      <h2>吸入器使用技術模擬</h2>
      <p>吸入器使用技術不正確是哮喘與 COPD 控制不佳的常見原因之一，研究顯示超過 70% 的患者吸入器使用技術有誤。本節提供定量噴霧吸入器（MDI）、乾粉吸入器（DPI）及軟霧吸入器（SMI）的標準操作步驟，以及常見錯誤的識別與糾正腳本。</p>
      <div class="callout callout--clinical">
        <div class="callout__title">臨床要點</div>
        <p>MDI 最常見的錯誤包括：未充分搖晃、按壓與吸氣不同步、吸氣速度過快（DPI 需快速用力吸氣，MDI 則需緩慢）及吸入後未閉氣；使用儲霧罐（spacer）可顯著降低技術依賴性，並提高藥物肺部沉積效率。</p>
      </div>
    </section>

    <section id="insulin-injection-teaching">
      <h2>胰島素注射衛教</h2>
      <p>胰島素注射衛教涵蓋注射部位的選擇（腹部、大腿、上臂、臀部）與輪替原則、正確的注射技術（捏起皮膚、45° 或 90° 角、注射後停留）、胰島素保存方式，以及低血糖的識別與自救措施（15-15 法則）。</p>
      <div class="callout callout--warning">
        <div class="callout__title">注意事項</div>
        <p>固定注射同一部位會導致皮下脂肪組織增生（lipohypertrophy），使胰島素吸收不穩定，是血糖控制困難的常見但易被忽視的原因；每次就診應定期檢查胰島素注射部位，並強化注射部位輪替的衛教。</p>
      </div>
    </section>

    <section id="anticoagulation-counseling">
      <h2>抗凝血治療衛教</h2>
      <p>抗凝血治療（華法林或新型口服抗凝血藥 NOAC）的衛教需讓患者理解：服藥目的與不可自行停藥的重要性、出血風險的監測（牙齦出血、異常瘀傷、血尿、黑便）、藥食交互作用（華法林：富含維生素 K 的食物應保持穩定攝取量），以及侵入性處置前的告知義務。</p>
      <div class="callout callout--danger">
        <div class="callout__title">重要警示</div>
        <p>服用抗凝血藥的患者發生頭部外傷後，即使初始無症狀，也必須就醫評估顱內出血風險；特別是服用華法林（INR 偏高時）或不可逆性抗凝血藥的患者，顱內出血風險顯著升高，需與患者明確溝通此緊急就醫指徵。</p>
      </div>
    </section>
  `
};

export default chapter;
