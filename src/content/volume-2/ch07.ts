import type { ChapterContent } from '../../types.js';

const chapter: ChapterContent = {
  title: '特殊族群藥療',
  content: `
    <section id="pediatric-pharmacotherapy">
      <h2>小兒用藥</h2>
      <p>本節介紹兒童藥物動力學與藥效學的特殊性，說明不同年齡層的生理差異如何影響藥物選擇與劑量計算。</p>
      <div class="callout callout--info">
        <div class="callout__title">提示</div>
        <p>本章節將涵蓋依體重/體表面積計算劑量的方法、新生兒肝腎功能不成熟的影響，以及兒童用藥的 off-label 問題與倫理考量。</p>
      </div>
    </section>
    <section id="geriatric-polypharmacy">
      <h2>老年醫學與多重用藥 (Polypharmacy)</h2>
      <p>本節說明老化對藥物動力學的影響，介紹多重用藥的風險評估工具與減藥 (deprescribing) 的臨床策略。</p>
      <div class="callout callout--info">
        <div class="callout__title">提示</div>
        <p>本章節將涵蓋 Beers Criteria、STOPP/START 工具、老年病人的藥物相關問題辨識，以及整合性用藥審查的流程。</p>
      </div>
    </section>
    <section id="pregnancy-lactation">
      <h2>妊娠與哺乳</h2>
      <p>本節說明藥物在妊娠各期對胎兒的潛在風險，介紹哺乳期間藥物進入乳汁的機制與安全性評估原則。</p>
      <div class="callout callout--info">
        <div class="callout__title">提示</div>
        <p>本章節將涵蓋 FDA 妊娠分級的新舊標準、致畸胎藥物的臨床管理，以及 LactMed 等哺乳安全性查核資源的使用。</p>
      </div>
    </section>
    <section id="renal-hepatic-obese-critically-ill">
      <h2>腎病、肝病、肥胖、重症病人</h2>
      <p>本節探討四類特殊病理生理狀態對藥物行為的影響，說明各族群的藥物選擇與劑量調整的個體化原則。</p>
      <div class="callout callout--info">
        <div class="callout__title">提示</div>
        <p>本章節將涵蓋透析病人的藥物補充劑量、肝硬化的蛋白結合變化、肥胖病人的劑量體重選擇，以及重症病人藥動學的動態變化。</p>
      </div>
    </section>
  `
};

export default chapter;
