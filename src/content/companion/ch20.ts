import type { ChapterContent } from '../../types.js';

const chapter: ChapterContent = {
  title: '臨床實習生存指南',
  content: `
    <section id="first-day-clerkship">
      <h2>臨床實習第一天</h2>
      <p>臨床實習第一天的成功關鍵在於事前準備：了解所在科別的常見病種與文化、確認報到地點與時間、準備好必要工具（聽診器、小手電筒、紙筆、藥物口袋手冊或 App），以及以「學習者」而非「員工」的心態調整對自身角色的期待。主動自我介紹與表達學習動機是好的起點。</p>
      <div class="callout callout--info">
        <div class="callout__title">學習重點</div>
        <p>實習第一天最重要的任務是了解「這個科室的工作如何運作」——查房時間、交班流程、書面紀錄方式、誰是可以請教的資源；先理解系統，才能在系統中有效地學習與貢獻。</p>
      </div>
    </section>

    <section id="time-management-clerkship">
      <h2>臨床實習時間管理</h2>
      <p>臨床實習的時間管理需平衡直接患者照護任務（病歷書寫、醫囑執行、操作參與）、主動學習（查閱文獻、讀書）及個人休息與恢復。建議使用「任務清單」管理每日待辦，以「優先性 × 緊急性」矩陣排序，並設定固定的複習時間，防止學習被臨床雜務完全佔據。</p>
      <div class="callout callout--clinical">
        <div class="callout__title">臨床要點</div>
        <p>「Parallel processing」是臨床效率的關鍵：在等候檢查結果的同時完成病歷書寫；在休息時間用手機 App 複習；將日常照護任務與學習目標連結（「這個患者的低鈉血症讓我複習了低鈉血症的分類」）可大幅提升時間利用效率。</p>
      </div>
    </section>

    <section id="asking-for-help">
      <h2>尋求協助的藝術</h2>
      <p>知道何時及如何尋求協助是臨床安全的核心能力，而非軟弱的表現。有效的求助包括：先嘗試自行解決（展示主動性）、清楚描述問題並說明自己已做的嘗試、選擇適當的求助對象（根據問題性質及對方的可及性），以及在緊急情況下不因顧慮打擾他人而延誤求助。</p>
      <div class="callout callout--success">
        <div class="callout__title">關鍵要點</div>
        <p>醫療錯誤中有相當比例源於「不敢開口求助」的文化；建立「安全的求助習慣」不只是個人成長，更是患者安全文化的一部分。在感到不確定時主動說「我需要確認一下」或「讓我請教一下更有經驗的人」，是成熟臨床判斷的表現。</p>
      </div>
    </section>

    <section id="documentation-tips">
      <h2>臨床文件書寫技巧</h2>
      <p>高品質的臨床文件記錄需兼顧準確性、簡潔性、即時性與法律責任。SOAP note 的書寫技巧包括：S（客觀引述患者原話）、O（選擇性呈現關鍵陽性與有意義的陰性發現）、A（清晰呈現臨床推理，而非僅列出診斷）及 P（依問題清單逐項說明計畫）。</p>
      <div class="callout callout--warning">
        <div class="callout__title">注意事項</div>
        <p>複製貼上（Copy-paste）病歷是現代 EHR 中「文件膨脹」與資訊失真的主要來源；每次記錄應更新患者的實際狀態，而非複製前次記錄；過時或不準確的文件記錄不僅影響照護品質，也可能在法律訴訟中產生不利影響。</p>
      </div>
    </section>
  `
};

export default chapter;
