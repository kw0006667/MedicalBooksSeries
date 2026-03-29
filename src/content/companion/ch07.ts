import type { ChapterContent } from '../../types.js';

const chapter: ChapterContent = {
  title: '身體檢查 Checklist',
  content: `
    <section id="cardiovascular-exam-checklist">
      <h2>心血管系統身體檢查 Checklist</h2>
      <p>心血管系統的身體檢查需依序進行：一般外觀（呼吸型態、周邊灌流）、頸靜脈壓（JVP）評估、頸動脈搏動、心前區視診與觸診（心尖衝動位置）、心音聽診（S1/S2 分裂、S3/S4、雜音的時機/部位/輻射/性質）及周邊血管評估（脈搏、水腫）。</p>
      <div class="callout callout--clinical">
        <div class="callout__title">臨床要點</div>
        <p>頸靜脈壓（JVP）的評估是心臟衰竭床邊評估的重要技能：患者取 45° 仰臥位，識別頸內靜脈搏動（雙峰、可壓滅、隨呼吸變化），以胸骨角（Louis 角）為參考點估計右心房壓力。</p>
      </div>
    </section>

    <section id="respiratory-exam-checklist">
      <h2>呼吸系統身體檢查 Checklist</h2>
      <p>呼吸系統的系統性身體檢查包含：視診（呼吸頻率/型態/用力程度、胸廓形狀/對稱性、輔助呼吸肌使用）、觸診（胸廓擴張、觸覺語顫）、叩診（共鳴音、濁音、過度清音的分布）及聽診（氣管音、支氣管呼吸音、囉音的類型與分布）。</p>
      <div class="callout callout--info">
        <div class="callout__title">學習重點</div>
        <p>肺炎（支氣管呼吸音、濕囉音、語音共振增強）、肋膜積液（呼吸音消失、叩診濁音、語音共振消失）與氣胸（呼吸音消失、叩診過度清音）的身體檢查特徵三組對比記憶，是呼吸系統身體檢查的學習核心。</p>
      </div>
    </section>

    <section id="abdominal-exam-checklist">
      <h2>腹部身體檢查 Checklist</h2>
      <p>腹部身體檢查的標準順序（視、聽、叩、觸）不同於其他系統：視診（腹型、疤痕、臍疝）→ 聽診（腸音：頻率與性質；血管雜音）→ 叩診（鼓音/濁音分布；肝臟邊界；移動性濁音）→ 觸診（淺層/深層觸診；器官腫大；壓痛點與反彈痛）。</p>
      <div class="callout callout--success">
        <div class="callout__title">關鍵要點</div>
        <p>腹膜炎的身體檢查徵象（反彈痛、板狀腹、Murphy sign 陽性）提示需要緊急手術評估；移動性濁音陽性提示腹水量 > 1500 mL，結合 Fluid thrill 及液波震顫可提高腹水診斷的準確度。</p>
      </div>
    </section>

    <section id="neuro-exam-checklist">
      <h2>神經系統身體檢查 Checklist</h2>
      <p>神經系統身體檢查包含：意識狀態（GCS 評分）、腦神經（12 對腦神經的系統評估）、運動系統（肌張力、肌力 MRC 分級、不自主運動）、感覺系統（初級感覺：觸、痛、溫、振動、位置；皮質感覺：兩點辨別、實體感覺）、協調（小腦功能測試）及反射（深腱反射、病理反射）。</p>
      <div class="callout callout--warning">
        <div class="callout__title">注意事項</div>
        <p>神經系統身體檢查的目標是「定位診斷」，即確認病灶所在（大腦皮質、基底核、腦幹、脊髓、周邊神經、神經肌肉接頭或肌肉）；不同位置的上/下運動神經元病灶有截然不同的臨床特徵，定位診斷是神經系統評估的精髓。</p>
      </div>
    </section>
  `
};

export default chapter;
