import type { ChapterContent } from '../../types.js';

const chapter: ChapterContent = {
  title: '疫苗、群體免疫與健康政策',
  content: `
    <section id="vaccine-immunology">
      <h2>疫苗免疫學原理</h2>
      <p>疫苗透過模擬自然感染誘導免疫記憶，而不引起疾病本身的危害。主要疫苗類型包括減毒活疫苗、不活化疫苗、次單位疫苗、類毒素疫苗及近年廣泛應用的 mRNA 疫苗與病毒載體疫苗。不同類型疫苗的免疫原性、保護持續時間與安全考量各有差異。</p>
      <div class="callout callout--info">
        <div class="callout__title">學習重點</div>
        <p>本節涵蓋初級免疫反應與記憶免疫反應的原理、各類疫苗平台的機制比較，以及影響疫苗免疫原性的關鍵因素，如佐劑的作用與接種時程設計。</p>
      </div>
    </section>

    <section id="herd-immunity-threshold">
      <h2>群體免疫門檻</h2>
      <p>群體免疫（Herd immunity）是指當足夠比例的族群獲得免疫力後，間接保護了未免疫者，使疾病無法持續傳播。群體免疫門檻（HIT）的計算公式為：HIT = 1 - 1/R₀，其中 R₀ 越高（如麻疹 R₀ ≈ 12-18），需達到群體免疫的接種覆蓋率越高。</p>
      <div class="callout callout--clinical">
        <div class="callout__title">臨床要點</div>
        <p>麻疹需要約 92-95% 的接種率才能達到群體免疫，這也是為何少數未接種者可能引發局部爆發。群體免疫的概念強調疫苗接種不僅保護個人，更保護社區中無法接種的脆弱族群。</p>
      </div>
    </section>

    <section id="vaccination-programs">
      <h2>疫苗接種計畫</h2>
      <p>國家疫苗接種計畫的制定需考量疾病流行病學、疫苗有效性與安全性證據、成本效益分析及接種執行的可行性。接種時程設計需平衡最佳免疫原性（考量母體抗體干擾）、疾病最大風險年齡與接種可及性。</p>
      <div class="callout callout--success">
        <div class="callout__title">關鍵要點</div>
        <p>台灣公費疫苗接種計畫涵蓋嬰幼兒、學童、老年人及特定高風險族群，熟悉各年齡層的建議接種疫苗種類與時程是基礎臨床能力的重要組成部分。</p>
      </div>
    </section>

    <section id="vaccine-hesitancy">
      <h2>疫苗猶豫與溝通策略</h2>
      <p>疫苗猶豫（Vaccine hesitancy）是指儘管疫苗可取得，仍對接種持延遲或拒絕態度的現象，被 WHO 列為全球十大健康威脅之一。影響疫苗猶豫的因素包括對安全性的疑慮、對疾病嚴重性的低估、資訊信任危機及文化信仰，需以個別化、非對抗性的溝通策略加以應對。</p>
      <div class="callout callout--warning">
        <div class="callout__title">注意事項</div>
        <p>面對疫苗猶豫的患者，強制或威脅性的溝通方式往往適得其反；「動機式晤談」（Motivational Interviewing）技術是目前有較多證據支持的溝通方式，強調傾聽、同理與引導患者自我決策。</p>
      </div>
    </section>
  `
};

export default chapter;
