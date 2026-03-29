import type { ChapterContent } from '../../types.js';

const chapter: ChapterContent = {
  title: 'EKG / Imaging Quick Drills',
  content: `
    <section id="ekg-rhythm-drills">
      <h2>EKG 心律判讀演練</h2>
      <p>心律判讀的系統性五步驟：評估頻率（bradycardia/tachycardia）→ 規則性 → P 波形態與 PR 間期 → QRS 形態（narrow vs. wide）→ P-QRS 關係。本節提供常見心律的判讀演練，包括各類房室傳導阻斷（一、二、三度 AVB）、室上性心搏過速（SVT）與心室性心律不整的鑑別。</p>
      <div class="callout callout--clinical">
        <div class="callout__title">臨床要點</div>
        <p>寬 QRS 心搏過速（Wide-complex tachycardia）應優先假設為心室頻脈（VT）並按 VT 處置，除非有強有力的理由排除；將 VT 誤診為 SVT+差異性傳導而給予鈣離子阻斷劑可能導致血液動力學崩潰，是危及生命的錯誤。</p>
      </div>
    </section>

    <section id="ekg-ischemia-drills">
      <h2>EKG 缺血判讀演練</h2>
      <p>EKG 缺血判讀涵蓋：ST 段變化的系統性評估（抬高 vs. 壓低；形態：水平型、下斜型、上斜型）、T 波異常的臨床意義（T 波倒置、高尖 T 波）、Q 波的病理性標準，以及各冠狀動脈供血區域與 EKG 導聯的對應關係（前壁、下壁、側壁、後壁梗塞的識別）。</p>
      <div class="callout callout--danger">
        <div class="callout__title">重要警示</div>
        <p>後壁 STEMI 在標準 12 導程 EKG 中表現為 V1-V3 的 ST 段壓低與 R 波增高（對應性改變），容易被誤讀為非 STEMI；對高度懷疑患者加做後壁導聯（V7-V9）可直接顯示後壁 ST 段抬高，避免漏診。</p>
      </div>
    </section>

    <section id="chest-xray-drills">
      <h2>胸部 X 光判讀演練</h2>
      <p>胸部 X 光的系統性判讀框架（ABCDE 法）：Airway（氣管位置、主支氣管）→ Bones（骨骼異常、骨折）→ Cardiac（心臟大小、心縱膈比）→ Diaphragm（膈肌位置、膈下游離氣體）→ Everything else（肺野浸潤、葉肺不張、肋膜積液、皮下氣腫）。</p>
      <div class="callout callout--info">
        <div class="callout__title">學習重點</div>
        <p>胸部 X 光「白肺」的四大原因（Pulmonary edema、Pneumonia、Pleural effusion、Atelectasis/consolidation）及其鑑別要點（分布型態、支氣管充氣征、氣管偏移方向）是急重症判讀的核心知識。</p>
      </div>
    </section>

    <section id="ct-abdomen-basics">
      <h2>腹部 CT 基礎判讀</h2>
      <p>腹部 CT 的基礎判讀涵蓋：CT 造影時序（平掃、動脈期、門脈期、延遲期）的選擇原則、各腹腔器官的正常影像解讀（肝臟、脾臟、胰臟、腎臟、大小腸）、常見急腹症的 CT 表現（盲腸炎、急性胰臟炎分級、腸阻塞點位識別）及游離氣體與腹水的判讀。</p>
      <div class="callout callout--success">
        <div class="callout__title">關鍵要點</div>
        <p>腹部 CT 是急腹症診斷的重要工具，但臨床醫師需了解不同掃描協議的差異，能提出正確的影像申請指示（如懷疑腎結石選擇無造影劑的 CT KUB；懷疑主動脈剝離需動脈期+靜脈期的對比增強 CT）以提升診斷效率。</p>
      </div>
    </section>
  `
};

export default chapter;
