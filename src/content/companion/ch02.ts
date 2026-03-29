import type { ChapterContent } from '../../types.js';

const chapter: ChapterContent = {
  title: '中階整合病例 100 題',
  content: `
    <section id="cases-cardiovascular">
      <h2>心血管系統整合病例</h2>
      <p>本組病例涵蓋急性冠心症、心臟衰竭、心律不整、高血壓急症及周邊血管疾病，需整合病史、心電圖、心臟酵素、超音波結果，並制定完整的藥物與非藥物治療計畫。病例難度設計為需跨科整合（心臟科、急診、復健）思考。</p>
      <div class="callout callout--clinical">
        <div class="callout__title">臨床要點</div>
        <p>心臟衰竭的評估需整合症狀分級（NYHA）、生物標記（BNP/NT-proBNP）及影像學，治療決策需考量射出分率（EF）、腎功能及電解質，每道病例均設計此類多面向整合的練習。</p>
      </div>
    </section>

    <section id="cases-pulmonary-renal">
      <h2>肺臟與腎臟系統整合病例</h2>
      <p>肺臟病例涵蓋肺炎重症評估（CURB-65/PSI）、急性呼吸衰竭的處置、哮喘急性發作與 COPD 惡化的鑑別；腎臟病例則包括急慢性腎損傷的鑑別、電解質失衡的系統分析，以及腎臟替代療法的適應症評估。</p>
      <div class="callout callout--info">
        <div class="callout__title">學習重點</div>
        <p>酸鹼平衡的系統性分析（分步法）是整合腎臟與肺臟功能評估的核心技能，本組病例設計了多道複合型酸鹼失衡的練習，以鞏固此項重要臨床能力。</p>
      </div>
    </section>

    <section id="cases-endocrine-gi">
      <h2>內分泌與消化系統整合病例</h2>
      <p>內分泌病例涵蓋糖尿病急性併發症（DKA、HHS）、甲狀腺急症、腎上腺危象及垂體功能低下；消化系統病例包括上下消化道出血的評估（Rockford Score/Glasgow-Blatchford）、急性胰臟炎嚴重度分級，以及肝功能失代償的識別與處置。</p>
      <div class="callout callout--warning">
        <div class="callout__title">注意事項</div>
        <p>DKA 的治療重點在於補液、胰島素使用時機（需先補鉀至安全濃度）及誘因的識別；HHS 與 DKA 的鑑別要點及各自的補液策略差異是本組病例的學習核心。</p>
      </div>
    </section>

    <section id="cases-id-neuro">
      <h2>感染症與神經系統整合病例</h2>
      <p>感染症病例涵蓋敗血症的識別（qSOFA/SOFA）、複雜感染（心內膜炎、骨髓炎）的評估，以及免疫抑制宿主的感染診療；神經系統病例包括急性腦中風的評估與溶栓決策、意識狀態改變的鑑別診斷，以及脊髓病變的神經學定位練習。</p>
      <div class="callout callout--danger">
        <div class="callout__title">重要警示</div>
        <p>急性腦中風的「時間即大腦」原則：每延誤 1 分鐘，約有 190 萬個神經元死亡；本組病例強調急性期識別、溶栓時間窗評估（最後已知正常時間），以及不同卒中亞型的治療差異。</p>
      </div>
    </section>
  `
};

export default chapter;
