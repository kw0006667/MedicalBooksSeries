import type { ChapterContent } from '../../types.js';

const chapter: ChapterContent = {
  title: '病史採集腳本',
  content: `
    <section id="chest-pain-script">
      <h2>胸痛病史採集腳本</h2>
      <p>胸痛病史採集需系統性地詢問疼痛的 OPQRST（發作方式、誘發/緩解因素、特性、放射、嚴重度、時間）及相關症狀（呼吸困難、冒汗、噁心、心悸），並快速評估是否存在急性冠心症、主動脈剝離、肺栓塞等危及生命的高風險診斷。</p>
      <div class="callout callout--danger">
        <div class="callout__title">重要警示</div>
        <p>「典型」心肌梗塞表現（左側胸骨壓迫感合併左臂放射）在女性、糖尿病患者及老年人中常不典型，可表現為上腹痛、噁心、極度疲憊或呼吸困難；高度懷疑時不應因症狀非典型而延誤評估。</p>
      </div>
    </section>

    <section id="dyspnea-script">
      <h2>呼吸困難病史採集腳本</h2>
      <p>呼吸困難的病史需涵蓋發作的急緩、加重因素（平躺時加重提示心衰或腹水、端坐呼吸）、伴隨症狀（咳嗽、喘鳴、發燒、腿部水腫、胸痛），以及過去病史（心臟病、肺病、過敏、職業暴露）。定量化呼吸困難嚴重度（MRC 呼吸困難量表）有助於追蹤治療效果。</p>
      <div class="callout callout--clinical">
        <div class="callout__title">臨床要點</div>
        <p>夜間陣發性呼吸困難（PND）和端坐呼吸（orthopnea）是心臟衰竭的高度特異性症狀；詢問「您睡覺需要幾個枕頭墊高頭部？」是評估端坐呼吸的簡便問診方式。</p>
      </div>
    </section>

    <section id="abdominal-pain-script">
      <h2>腹痛病史採集腳本</h2>
      <p>腹痛病史需涵蓋疼痛部位（起始位置與移動方式）、性質（刀割樣、絞痛、持續性）、加重/緩解因素（進食、排便、體位）、相關症狀（噁心嘔吐、腹瀉、血便、發燒、黃疸），以及婦科相關問題（末次月經、性行為史）。</p>
      <div class="callout callout--info">
        <div class="callout__title">學習重點</div>
        <p>盲腸炎的典型轉移痛（臍周疼痛 → 右下腹）是腸神經與體神經疼痛傳導差異的經典範例；掌握各種腹痛的典型疼痛型態與位置，有助於快速縮窄鑑別診斷範圍。</p>
      </div>
    </section>

    <section id="altered-ms-script">
      <h2>意識狀態改變病史採集腳本</h2>
      <p>意識狀態改變（Altered Mental Status）的病史採集需仰賴旁觀者提供資訊，需詢問改變的時間點與速度（急性 vs. 亞急性）、基準認知狀態、用藥清單（特別是最近的新增/改變）、最後飲食與排泄、近期感染症狀，以及外傷或毒物暴露史。</p>
      <div class="callout callout--warning">
        <div class="callout__title">注意事項</div>
        <p>意識改變患者的「AEIOU TIPS」記憶法涵蓋最重要的病因：Alcohol/Acidosis、Epilepsy、Infection、Overdose/Opiates、Uremia、Trauma、Insulin（低血糖）、Psychosis/Poison、Stroke/Space-occupying lesion；系統性逐一排除可避免遺漏緊急可逆原因。</p>
      </div>
    </section>
  `
};

export default chapter;
