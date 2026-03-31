import { LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

type SceneId =
  | 'marrow-anatomy'
  | 'erythropoiesis-failure'
  | 'clotting-balance'
  | 'lymphoid-spread'
  | 'metastatic-burden'
  | 'treatment-toxicity';

type Scene = {
  id: SceneId;
  label: string;
  title: string;
  summary: string;
  bullets: string[];
  accent: string;
};

type LabelDef = {
  className: string;
  text: string;
};

const scenes: Record<SceneId, Scene> = {
  'marrow-anatomy': {
    id: 'marrow-anatomy',
    label: '骨髓定位',
    title: '骨髓、脾臟與淋巴系統的立體底圖',
    summary: '這個場景先建立血液與腫瘤章節的空間感，讓讀者看見胸骨、骨盆、長骨骨髓，與脾臟、肝臟、淋巴結在人體中的相對位置。',
    bullets: [
      '成人活躍骨髓主要集中在軸向骨骼。',
      '脾臟與肝臟常是血液疾病的外周窗口。',
      '淋巴系統不是只在頸部，而是全身分布。',
    ],
    accent: '#2563eb',
  },
  'erythropoiesis-failure': {
    id: 'erythropoiesis-failure',
    label: '造血失衡',
    title: '鐵、EPO 與骨髓反應失衡造成的貧血視角',
    summary: '把骨髓生產、紅血球釋放、脾臟清除與功能性缺鐵的想像放進同一個立體場景，幫助理解為什麼 anemia 不只是 Hb 變低。',
    bullets: [
      '骨髓發亮區代表造血需求增加。',
      '紅血球流束減弱象徵產量或品質不足。',
      '脾臟放大則提示周邊破壞增加的可能。',
    ],
    accent: '#dc2626',
  },
  'clotting-balance': {
    id: 'clotting-balance',
    label: '止血平衡',
    title: '血小板、纖維蛋白與出血 / 血栓的失衡平面',
    summary: '這個場景把血管壁、血小板栓塞與 fibrin 網改成可視化表面，讓 primary hemostasis 與 secondary hemostasis 的差異更直觀。',
    bullets: [
      '血小板聚集偏表面黏附。',
      '纖維蛋白網更像深層穩固支架。',
      '任何一端失控都可能造成臨床災難。',
    ],
    accent: '#7c3aed',
  },
  'lymphoid-spread': {
    id: 'lymphoid-spread',
    label: '淋巴擴散',
    title: '白血病與淋巴瘤的骨髓擠壓與節區擴散',
    summary: '同一畫面同時呈現骨髓被惡性細胞擠壓、頸胸腹股溝淋巴結鏈放大，以及脾大所代表的全身性疾病空間感。',
    bullets: [
      '骨髓與淋巴結常同時參與。',
      '脾臟放大是高腫瘤量重要線索。',
      '淋巴瘤節區擴散與 leukemic spillover 可以並存。',
    ],
    accent: '#0f766e',
  },
  'metastatic-burden': {
    id: 'metastatic-burden',
    label: '轉移負荷',
    title: '實體腫瘤從局部病灶到多器官轉移的立體分布',
    summary: '把原發腫瘤、肝轉移、肺轉移與骨病灶放在同一個人體框架裡，幫助讀者理解 staging 與 systemic therapy 的必要性。',
    bullets: [
      '同一個癌可以有完全不同的轉移地圖。',
      '骨、肝、肺是高頻遠端器官。',
      '一旦跨器官，治療語言就會改成 systemic control。',
    ],
    accent: '#ea580c',
  },
  'treatment-toxicity': {
    id: 'treatment-toxicity',
    label: '治療毒性',
    title: '化療、標靶與免疫治療毒性的器官分布圖',
    summary: '這個場景把骨髓抑制、黏膜炎、心毒性、神經毒性與肺部免疫毒性以器官熱點方式呈現，讓支持性治療不再只是文字清單。',
    bullets: [
      '高週轉組織最先承受細胞毒性壓力。',
      '標靶與免疫毒性更常呈現器官選擇性。',
      '支持性治療本質上是在守住這些熱點。',
    ],
    accent: '#be123c',
  },
};

@customElement('hematology-3d-viewer')
export class Hematology3dViewer extends LitElement {
  @property({ type: String, attribute: 'initial-scene' }) initialScene: SceneId = 'marrow-anatomy';
  @state() private activeId: SceneId = 'marrow-anatomy';
  @state() private tiltX = -10;
  @state() private tiltY = 16;
  @state() private zoom = 1;

  private pinchStartDistance = 0;
  private pinchStartZoom = 1;

  private static readonly minZoom = 0.84;
  private static readonly maxZoom = 1.86;

  static override styles = css`
    :host {
      display: block;
      margin: 26px 0 30px;
    }

    .shell {
      border-radius: 28px;
      overflow: hidden;
      border: 1px solid rgba(148, 163, 184, 0.26);
      background:
        radial-gradient(circle at top left, rgba(37, 99, 235, 0.14), transparent 34%),
        radial-gradient(circle at bottom right, rgba(225, 29, 72, 0.12), transparent 32%),
        linear-gradient(180deg, rgba(248, 250, 252, 0.98), rgba(241, 245, 249, 0.96));
      box-shadow: 0 26px 60px rgba(15, 23, 42, 0.12);
    }

    .header {
      padding: 20px 22px 0;
      display: grid;
      gap: 10px;
    }

    .eyebrow {
      font: 700 11px/1 ui-sans-serif, -apple-system, BlinkMacSystemFont, sans-serif;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: #64748b;
    }

    .title {
      margin: 0;
      color: #0f172a;
      font: 700 1.08rem/1.4 ui-sans-serif, -apple-system, BlinkMacSystemFont, sans-serif;
    }

    .summary {
      margin: 0;
      color: #334155;
      font: 400 0.95rem/1.72 ui-sans-serif, -apple-system, BlinkMacSystemFont, sans-serif;
    }

    .toolbar {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      padding: 14px 22px 0;
    }

    button {
      appearance: none;
      border: 1px solid rgba(148, 163, 184, 0.34);
      background: rgba(255, 255, 255, 0.82);
      color: #0f172a;
      border-radius: 999px;
      padding: 9px 13px;
      cursor: pointer;
      font: 600 0.82rem/1 ui-sans-serif, -apple-system, BlinkMacSystemFont, sans-serif;
      transition: transform 140ms ease, border-color 140ms ease, background 140ms ease, color 140ms ease;
    }

    button:hover {
      transform: translateY(-1px);
      border-color: color-mix(in srgb, var(--scene-accent) 48%, white);
    }

    button.active {
      background: color-mix(in srgb, var(--scene-accent) 88%, #0f172a);
      color: white;
      border-color: transparent;
    }

    .body {
      display: grid;
      grid-template-columns: minmax(0, 1.35fr) minmax(260px, 0.65fr);
      gap: 0;
      align-items: stretch;
      padding: 14px 14px 14px 18px;
    }

    .stage-wrap {
      display: grid;
      gap: 10px;
    }

    .zoom-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
      padding: 0 4px;
    }

    .zoom-label {
      color: #475569;
      font: 700 0.78rem/1 ui-sans-serif, -apple-system, BlinkMacSystemFont, sans-serif;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .zoom-controls {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px;
      border: 1px solid rgba(148, 163, 184, 0.3);
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.82);
      backdrop-filter: blur(10px);
    }

    .zoom-controls button {
      min-width: 38px;
      padding: 8px 10px;
    }

    .zoom-readout {
      min-width: 60px;
      text-align: center;
      color: #0f172a;
      font: 700 0.82rem/1 ui-sans-serif, -apple-system, BlinkMacSystemFont, sans-serif;
    }

    .stage-shell {
      position: relative;
      min-height: 510px;
      border-radius: 24px;
      overflow: hidden;
      background:
        radial-gradient(circle at 50% 8%, rgba(255, 255, 255, 0.94), transparent 42%),
        radial-gradient(circle at 48% 80%, rgba(244, 63, 94, 0.1), transparent 34%),
        linear-gradient(180deg, rgba(226, 232, 240, 0.92), rgba(241, 245, 249, 0.95));
      border: 1px solid rgba(148, 163, 184, 0.22);
      perspective: 1400px;
      cursor: grab;
      touch-action: none;
      user-select: none;
    }

    .stage-shell:active {
      cursor: grabbing;
    }

    .grid {
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(rgba(148, 163, 184, 0.12) 1px, transparent 1px),
        linear-gradient(90deg, rgba(148, 163, 184, 0.12) 1px, transparent 1px);
      background-size: 24px 24px;
      mask-image: linear-gradient(180deg, rgba(15, 23, 42, 0.9), transparent 92%);
      pointer-events: none;
    }

    .model {
      position: absolute;
      inset: 0;
      transform-style: preserve-3d;
      transform:
        rotateX(calc(var(--tilt-x) * 1deg))
        rotateY(calc(var(--tilt-y) * 1deg))
        scale3d(var(--zoom), var(--zoom), var(--zoom));
      transition: transform 160ms ease;
    }

    .torso,
    .chest-plate,
    .pelvis,
    .femur-left,
    .femur-right,
    .marrow-core,
    .marrow-wave,
    .blood-stream,
    .platelet-cluster,
    .fibrin-web,
    .vessel-strip,
    .lymph-chain,
    .spleen,
    .liver,
    .leukemic-cloud,
    .metastatic-dot,
    .lung-left,
    .lung-right,
    .bone-hotspot,
    .toxicity-halo,
    .nerve-track,
    .mucosa-glow,
    .cardio-ring {
      position: absolute;
      transform-style: preserve-3d;
      opacity: 0;
      transition: opacity 220ms ease;
    }

    .torso {
      inset: 7% 24% 8%;
      border-radius: 38% 38% 26% 26% / 16% 16% 24% 24%;
      background:
        linear-gradient(180deg, rgba(228, 202, 183, 0.56), rgba(197, 159, 136, 0.46));
      box-shadow:
        inset 0 0 0 1px rgba(255, 255, 255, 0.45),
        inset 0 -18px 36px rgba(120, 53, 15, 0.08);
      transform: translateZ(6px);
      opacity: 1;
    }

    .chest-plate {
      left: 37%;
      top: 12%;
      width: 26%;
      height: 26%;
      border-radius: 46% 46% 42% 42% / 24% 24% 58% 58%;
      background:
        radial-gradient(circle at 50% 24%, rgba(255, 255, 255, 0.72), transparent 18%),
        linear-gradient(180deg, rgba(244, 241, 238, 0.9), rgba(214, 211, 209, 0.82));
      box-shadow:
        inset 0 0 0 1px rgba(255, 255, 255, 0.44),
        inset 0 -10px 18px rgba(100, 116, 139, 0.12);
      transform: translateZ(58px);
      opacity: 1;
    }

    .pelvis {
      left: 34%;
      top: 55%;
      width: 32%;
      height: 18%;
      border-radius: 28% 28% 46% 46% / 24% 24% 56% 56%;
      background:
        linear-gradient(180deg, rgba(244, 241, 238, 0.92), rgba(214, 211, 209, 0.82));
      box-shadow: inset 0 -8px 16px rgba(100, 116, 139, 0.12);
      transform: translateZ(66px);
      opacity: 1;
    }

    .femur-left,
    .femur-right {
      top: 65%;
      width: 6%;
      height: 22%;
      border-radius: 999px;
      background:
        linear-gradient(180deg, rgba(244, 241, 238, 0.92), rgba(214, 211, 209, 0.82));
      transform: translateZ(70px);
      opacity: 1;
    }

    .femur-left { left: 41%; }
    .femur-right { right: 41%; }

    .marrow-core {
      left: 41.5%;
      top: 18%;
      width: 17%;
      height: 50%;
      border-radius: 22px;
      background:
        radial-gradient(circle at 50% 18%, rgba(254, 205, 211, 0.96), rgba(244, 63, 94, 0.72) 42%, rgba(190, 24, 93, 0.4) 72%, transparent 100%);
      filter: blur(1px);
      transform: translateZ(92px);
    }

    .marrow-wave {
      left: 40%;
      top: 22%;
      width: 20%;
      height: 42%;
      background:
        repeating-linear-gradient(180deg, rgba(255, 255, 255, 0) 0 24px, rgba(254, 205, 211, 0.72) 24px 32px, rgba(255, 255, 255, 0) 32px 54px);
      border-radius: 20px;
      transform: translateZ(96px);
      animation: pulseWave 2.2s ease-in-out infinite;
    }

    .blood-stream {
      left: 49%;
      top: 30%;
      width: 4.5%;
      height: 34%;
      background:
        linear-gradient(180deg, rgba(255, 255, 255, 0), rgba(248, 113, 113, 0.94), rgba(239, 68, 68, 0.96), rgba(255, 255, 255, 0));
      border-radius: 999px;
      transform: translateZ(132px);
      animation: flow 1.6s ease-in-out infinite;
    }

    .vessel-strip {
      left: 28%;
      top: 42%;
      width: 44%;
      height: 10%;
      border-radius: 999px;
      background:
        linear-gradient(90deg, rgba(30, 64, 175, 0.18), rgba(220, 38, 38, 0.22), rgba(30, 64, 175, 0.18));
      box-shadow: inset 0 0 0 2px rgba(99, 102, 241, 0.18);
      transform: translateZ(104px);
      opacity: 1;
    }

    .platelet-cluster {
      left: 43%;
      top: 42.6%;
      width: 16%;
      height: 8%;
      background:
        radial-gradient(circle at 16% 42%, rgba(250, 204, 21, 0.96), transparent 14%),
        radial-gradient(circle at 34% 58%, rgba(250, 204, 21, 0.96), transparent 15%),
        radial-gradient(circle at 56% 34%, rgba(245, 158, 11, 0.92), transparent 15%),
        radial-gradient(circle at 74% 56%, rgba(250, 204, 21, 0.94), transparent 15%);
      transform: translateZ(148px);
    }

    .fibrin-web {
      left: 41%;
      top: 40%;
      width: 20%;
      height: 13%;
      background:
        linear-gradient(45deg, transparent 42%, rgba(167, 139, 250, 0.84) 48%, transparent 54%),
        linear-gradient(-45deg, transparent 42%, rgba(196, 181, 253, 0.84) 48%, transparent 54%),
        linear-gradient(0deg, transparent 46%, rgba(129, 140, 248, 0.84) 50%, transparent 54%);
      background-size: 22px 22px;
      transform: translateZ(154px);
      border-radius: 18px;
    }

    .lymph-chain {
      left: 33%;
      top: 15%;
      width: 34%;
      height: 54%;
      background:
        radial-gradient(circle at 22% 10%, rgba(16, 185, 129, 0.94), transparent 5%),
        radial-gradient(circle at 76% 12%, rgba(16, 185, 129, 0.94), transparent 5%),
        radial-gradient(circle at 18% 28%, rgba(16, 185, 129, 0.92), transparent 5%),
        radial-gradient(circle at 82% 30%, rgba(16, 185, 129, 0.92), transparent 5%),
        radial-gradient(circle at 28% 52%, rgba(16, 185, 129, 0.94), transparent 6%),
        radial-gradient(circle at 72% 56%, rgba(16, 185, 129, 0.94), transparent 6%),
        radial-gradient(circle at 30% 82%, rgba(16, 185, 129, 0.92), transparent 6%),
        radial-gradient(circle at 70% 84%, rgba(16, 185, 129, 0.92), transparent 6%);
      transform: translateZ(146px);
    }

    .spleen {
      left: 25%;
      top: 33%;
      width: 13%;
      height: 18%;
      border-radius: 44% 54% 52% 48% / 36% 40% 60% 54%;
      background:
        linear-gradient(180deg, rgba(147, 51, 234, 0.88), rgba(109, 40, 217, 0.96));
      box-shadow: inset -10px -12px 18px rgba(76, 29, 149, 0.22);
      transform: translateZ(124px) rotate(-8deg);
      opacity: 1;
    }

    .liver {
      right: 24%;
      top: 31%;
      width: 18%;
      height: 15%;
      border-radius: 26% 44% 34% 28% / 34% 44% 22% 20%;
      background:
        linear-gradient(135deg, rgba(153, 27, 27, 0.82), rgba(127, 29, 29, 0.96));
      box-shadow: inset -14px -12px 22px rgba(69, 10, 10, 0.2);
      transform: translateZ(120px) rotate(-4deg);
      opacity: 1;
    }

    .lung-left,
    .lung-right {
      top: 19%;
      width: 15%;
      height: 24%;
      border-radius: 42% 42% 48% 48% / 22% 22% 60% 60%;
      background:
        linear-gradient(180deg, rgba(248, 250, 252, 0.92), rgba(203, 213, 225, 0.74));
      transform: translateZ(76px);
      opacity: 1;
    }

    .lung-left { left: 32%; }
    .lung-right { right: 32%; }

    .leukemic-cloud {
      left: 36%;
      top: 16%;
      width: 28%;
      height: 56%;
      border-radius: 46%;
      background:
        radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.38), rgba(239, 68, 68, 0.12));
      filter: blur(10px);
      transform: translateZ(86px);
      animation: floatHalo 2.8s ease-in-out infinite;
    }

    .metastatic-dot {
      width: 5.4%;
      height: 5.4%;
      border-radius: 50%;
      background:
        radial-gradient(circle at 38% 34%, rgba(255, 237, 213, 0.82), rgba(249, 115, 22, 0.94) 58%, rgba(194, 65, 12, 0.92));
      box-shadow: 0 0 0 8px rgba(249, 115, 22, 0.08);
      transform: translateZ(164px);
    }

    .m1 { left: 37%; top: 24%; }
    .m2 { right: 36%; top: 25%; }
    .m3 { left: 30%; top: 39%; }
    .m4 { right: 28%; top: 38%; }
    .m5 { left: 44%; top: 64%; }
    .m6 { right: 44%; top: 70%; }

    .bone-hotspot {
      left: 39%;
      top: 60%;
      width: 22%;
      height: 20%;
      border-radius: 40%;
      background:
        radial-gradient(circle at 50% 50%, rgba(251, 191, 36, 0.6), rgba(234, 88, 12, 0.08));
      filter: blur(8px);
      transform: translateZ(100px);
      animation: pulseWave 2.2s ease-in-out infinite;
    }

    .toxicity-halo {
      left: 28%;
      top: 18%;
      width: 44%;
      height: 56%;
      border-radius: 46%;
      background:
        radial-gradient(circle at 50% 20%, rgba(244, 63, 94, 0.18), transparent 22%),
        radial-gradient(circle at 50% 48%, rgba(59, 130, 246, 0.14), transparent 20%),
        radial-gradient(circle at 50% 76%, rgba(250, 204, 21, 0.16), transparent 22%);
      filter: blur(6px);
      transform: translateZ(78px);
    }

    .nerve-track {
      left: 46.5%;
      top: 52%;
      width: 7%;
      height: 28%;
      background:
        linear-gradient(180deg, rgba(255, 255, 255, 0), rgba(59, 130, 246, 0.9), rgba(255, 255, 255, 0));
      border-radius: 999px;
      transform: translateZ(158px);
      animation: flow 1.8s ease-in-out infinite;
    }

    .mucosa-glow {
      left: 39%;
      top: 11%;
      width: 22%;
      height: 11%;
      border-radius: 40% 40% 56% 56% / 30% 30% 70% 70%;
      background:
        radial-gradient(circle at 50% 50%, rgba(244, 114, 182, 0.6), rgba(190, 24, 93, 0.14));
      filter: blur(8px);
      transform: translateZ(148px);
    }

    .cardio-ring {
      left: 44%;
      top: 29%;
      width: 12%;
      height: 12%;
      border-radius: 50%;
      border: 8px solid rgba(239, 68, 68, 0.5);
      box-shadow: 0 0 0 10px rgba(239, 68, 68, 0.08);
      transform: translateZ(164px);
      animation: ringBeat 1.8s ease-in-out infinite;
    }

    .label {
      position: absolute;
      padding: 7px 10px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.84);
      border: 1px solid rgba(148, 163, 184, 0.26);
      backdrop-filter: blur(8px);
      color: #0f172a;
      font: 700 0.74rem/1 ui-sans-serif, -apple-system, BlinkMacSystemFont, sans-serif;
      transform: translateZ(176px);
      box-shadow: 0 10px 22px rgba(15, 23, 42, 0.08);
    }

    .l1 { left: 12%; top: 16%; }
    .l2 { right: 10%; top: 18%; }
    .l3 { left: 11%; top: 58%; }
    .l4 { right: 12%; top: 66%; }

    .scene-erythropoiesis-failure .marrow-core,
    .scene-erythropoiesis-failure .marrow-wave,
    .scene-erythropoiesis-failure .blood-stream,
    .scene-erythropoiesis-failure .spleen,
    .scene-clotting-balance .platelet-cluster,
    .scene-clotting-balance .fibrin-web,
    .scene-clotting-balance .blood-stream,
    .scene-lymphoid-spread .lymph-chain,
    .scene-lymphoid-spread .leukemic-cloud,
    .scene-lymphoid-spread .spleen,
    .scene-metastatic-burden .metastatic-dot,
    .scene-metastatic-burden .bone-hotspot,
    .scene-metastatic-burden .liver,
    .scene-metastatic-burden .lung-left,
    .scene-metastatic-burden .lung-right,
    .scene-treatment-toxicity .toxicity-halo,
    .scene-treatment-toxicity .nerve-track,
    .scene-treatment-toxicity .mucosa-glow,
    .scene-treatment-toxicity .cardio-ring,
    .scene-treatment-toxicity .marrow-wave {
      opacity: 1;
    }

    .inspector {
      display: grid;
      gap: 14px;
      padding: 14px 18px 18px;
      background: rgba(255, 255, 255, 0.62);
      border-left: 1px solid rgba(148, 163, 184, 0.18);
    }

    .chip {
      display: inline-flex;
      align-items: center;
      width: fit-content;
      border-radius: 999px;
      padding: 6px 10px;
      background: color-mix(in srgb, var(--scene-accent) 14%, white);
      color: color-mix(in srgb, var(--scene-accent) 70%, #0f172a);
      font: 700 0.74rem/1 ui-sans-serif, -apple-system, BlinkMacSystemFont, sans-serif;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }

    .panel-title {
      margin: 0;
      color: #0f172a;
      font: 700 1rem/1.45 ui-sans-serif, -apple-system, BlinkMacSystemFont, sans-serif;
    }

    .panel-body,
    ul {
      margin: 0;
      color: #334155;
      font: 400 0.92rem/1.72 ui-sans-serif, -apple-system, BlinkMacSystemFont, sans-serif;
    }

    ul {
      padding-left: 1.15rem;
      display: grid;
      gap: 8px;
    }

    .note {
      border-radius: 18px;
      padding: 14px 15px;
      border: 1px solid rgba(148, 163, 184, 0.18);
      background: linear-gradient(180deg, rgba(248, 250, 252, 0.98), rgba(255, 255, 255, 0.84));
    }

    @keyframes flow {
      0%, 100% { transform: translateZ(132px) translateY(-4px); opacity: 0.72; }
      50% { transform: translateZ(132px) translateY(6px); opacity: 1; }
    }

    @keyframes pulseWave {
      0%, 100% { transform: translateZ(96px) scale(1); opacity: 0.72; }
      50% { transform: translateZ(96px) scale(1.05); opacity: 1; }
    }

    @keyframes floatHalo {
      0%, 100% { transform: translateZ(86px) scale(1.02); }
      50% { transform: translateZ(86px) scale(1.08); }
    }

    @keyframes ringBeat {
      0%, 100% { transform: translateZ(164px) scale(0.98); opacity: 0.68; }
      50% { transform: translateZ(164px) scale(1.06); opacity: 1; }
    }

    @media (max-width: 920px) {
      .body {
        grid-template-columns: 1fr;
        padding: 14px;
      }

      .inspector {
        border-left: none;
        border-top: 1px solid rgba(148, 163, 184, 0.18);
      }
    }

    @media (max-width: 767px) {
      .stage-shell {
        min-height: 390px;
      }

      .toolbar,
      .header {
        padding-left: 16px;
        padding-right: 16px;
      }
    }
  `;

  override willUpdate(changed: Map<string, unknown>) {
    if (changed.has('initialScene') && scenes[this.initialScene]) {
      this.activeId = this.initialScene;
    }
  }

  private get activeScene() {
    return scenes[this.activeId] ?? scenes['marrow-anatomy'];
  }

  private clampZoom(nextZoom: number) {
    return Math.min(Hematology3dViewer.maxZoom, Math.max(Hematology3dViewer.minZoom, Number(nextZoom.toFixed(2))));
  }

  private setScene(id: SceneId) {
    this.activeId = id;
  }

  private onPointerMove(event: PointerEvent) {
    const box = event.currentTarget as HTMLElement;
    const rect = box.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    this.tiltY = Math.max(-24, Math.min(24, px * 40));
    this.tiltX = Math.max(-22, Math.min(12, -py * 30 - 6));
  }

  private resetTilt() {
    this.tiltX = -10;
    this.tiltY = 16;
  }

  private setZoom(nextZoom: number) {
    this.zoom = this.clampZoom(nextZoom);
  }

  private handleWheel(event: WheelEvent) {
    if (!event.ctrlKey && !event.metaKey) return;
    event.preventDefault();
    const factor = Math.exp(-event.deltaY * 0.0022);
    this.setZoom(this.zoom * factor);
  }

  private handleTouchStart(event: TouchEvent) {
    if (event.touches.length === 2) {
      event.preventDefault();
      this.pinchStartDistance = this.getTouchDistance(event.touches);
      this.pinchStartZoom = this.zoom;
    }
  }

  private handleTouchMove(event: TouchEvent) {
    if (event.touches.length === 2) {
      event.preventDefault();
      const distance = this.getTouchDistance(event.touches);
      if (this.pinchStartDistance > 0) {
        const factor = distance / this.pinchStartDistance;
        this.setZoom(this.pinchStartZoom * factor);
      }
      return;
    }

    if (event.touches.length === 1) {
      const box = event.currentTarget as HTMLElement;
      const rect = box.getBoundingClientRect();
      const touch = event.touches[0];
      const px = (touch.clientX - rect.left) / rect.width - 0.5;
      const py = (touch.clientY - rect.top) / rect.height - 0.5;
      this.tiltY = Math.max(-24, Math.min(24, px * 40));
      this.tiltX = Math.max(-22, Math.min(12, -py * 30 - 6));
    }
  }

  private handleTouchEnd() {
    this.pinchStartDistance = 0;
    this.pinchStartZoom = this.zoom;
  }

  private getTouchDistance(touches: TouchList) {
    const a = touches[0];
    const b = touches[1];
    return Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
  }

  private changeZoom(delta: number) {
    this.setZoom(this.zoom + delta);
  }

  private resetZoom() {
    this.setZoom(1);
  }

  private getLabels(sceneId: SceneId): LabelDef[] {
    switch (sceneId) {
      case 'erythropoiesis-failure':
        return [
          { className: 'l1', text: '胸骨 / 骨盆造血區' },
          { className: 'l2', text: '脾臟清除與周邊破壞' },
          { className: 'l3', text: '紅血球輸出減弱' },
          { className: 'l4', text: '功能性缺鐵 / 低 EPO 想像' },
        ];
      case 'clotting-balance':
        return [
          { className: 'l1', text: '內皮受損表面' },
          { className: 'l2', text: '血小板聚集熱點' },
          { className: 'l3', text: '纖維蛋白穩固層' },
          { className: 'l4', text: '出血與血栓的平衡線' },
        ];
      case 'lymphoid-spread':
        return [
          { className: 'l1', text: '頸胸節區鏈' },
          { className: 'l2', text: '骨髓被擠壓' },
          { className: 'l3', text: '脾大與腫瘤量' },
          { className: 'l4', text: '腹股溝節區' },
        ];
      case 'metastatic-burden':
        return [
          { className: 'l1', text: '肺部轉移熱點' },
          { className: 'l2', text: '肝轉移負荷' },
          { className: 'l3', text: '骨病灶 / 疼痛來源' },
          { className: 'l4', text: 'systemic therapy 視角' },
        ];
      case 'treatment-toxicity':
        return [
          { className: 'l1', text: '口腔 / 黏膜炎' },
          { className: 'l2', text: '心肺毒性監測區' },
          { className: 'l3', text: '骨髓抑制熱點' },
          { className: 'l4', text: '周邊神經病變路徑' },
        ];
      default:
        return [
          { className: 'l1', text: '胸骨與肋骨骨髓' },
          { className: 'l2', text: '肝脾與淋巴器官' },
          { className: 'l3', text: '骨盆主要造血區' },
          { className: 'l4', text: '長骨與全身節區' },
        ];
    }
  }

  override render() {
    const scene = this.activeScene;

    return html`
      <div class="shell" style=${`--scene-accent:${scene.accent};`}>
        <div class="header">
          <div class="eyebrow">Interactive Heme-Oncology 3D</div>
          <h3 class="title">${scene.title}</h3>
          <p class="summary">${scene.summary}</p>
        </div>
        <div class="toolbar">
          ${Object.values(scenes).map(item => html`
            <button
              class=${item.id === this.activeId ? 'active' : ''}
              @click=${() => this.setScene(item.id)}
            >${item.label}</button>
          `)}
        </div>
        <div class="body">
          <div class="stage-wrap">
            <div class="zoom-bar">
              <div class="zoom-label">Pinch / Ctrl+Wheel Zoom</div>
              <div class="zoom-controls">
                <button
                  type="button"
                  @click=${() => this.changeZoom(-0.12)}
                  ?disabled=${this.zoom <= Hematology3dViewer.minZoom}
                  aria-label="縮小 3D 模型"
                >
                  -
                </button>
                <button
                  type="button"
                  class=${this.zoom === 1 ? 'active' : ''}
                  @click=${this.resetZoom}
                  aria-label="重設 3D 模型縮放"
                >
                  <span class="zoom-readout">${Math.round(this.zoom * 100)}%</span>
                </button>
                <button
                  type="button"
                  @click=${() => this.changeZoom(0.12)}
                  ?disabled=${this.zoom >= Hematology3dViewer.maxZoom}
                  aria-label="放大 3D 模型"
                >
                  +
                </button>
              </div>
            </div>
            <div
              class="stage-shell"
              @pointermove=${this.onPointerMove}
              @pointerleave=${this.resetTilt}
              @wheel=${this.handleWheel}
              @touchstart=${this.handleTouchStart}
              @touchmove=${this.handleTouchMove}
              @touchend=${this.handleTouchEnd}
            >
              <div class="grid"></div>
              <div
                class=${`model scene-${this.activeId}`}
                style=${`--tilt-x:${this.tiltX};--tilt-y:${this.tiltY};--zoom:${this.zoom};`}
              >
                <div class="torso"></div>
                <div class="chest-plate"></div>
                <div class="pelvis"></div>
                <div class="femur-left"></div>
                <div class="femur-right"></div>
                <div class="vessel-strip"></div>
                <div class="lung-left"></div>
                <div class="lung-right"></div>
                <div class="liver"></div>
                <div class="spleen"></div>
                <div class="marrow-core"></div>
                <div class="marrow-wave"></div>
                <div class="blood-stream"></div>
                <div class="platelet-cluster"></div>
                <div class="fibrin-web"></div>
                <div class="lymph-chain"></div>
                <div class="leukemic-cloud"></div>
                <div class="metastatic-dot m1"></div>
                <div class="metastatic-dot m2"></div>
                <div class="metastatic-dot m3"></div>
                <div class="metastatic-dot m4"></div>
                <div class="metastatic-dot m5"></div>
                <div class="metastatic-dot m6"></div>
                <div class="bone-hotspot"></div>
                <div class="toxicity-halo"></div>
                <div class="nerve-track"></div>
                <div class="mucosa-glow"></div>
                <div class="cardio-ring"></div>
                ${this.getLabels(scene.id).map(label => html`
                  <div class=${`label ${label.className}`}>${label.text}</div>
                `)}
              </div>
            </div>
          </div>
          <aside class="inspector">
            <span class="chip">${scene.label}</span>
            <div class="note">
              <h4 class="panel-title">重點摘要</h4>
              <p class="panel-body">${scene.summary}</p>
            </div>
            <div class="note">
              <h4 class="panel-title">讀圖重點</h4>
              <ul>
                ${scene.bullets.map(item => html`<li>${item}</li>`)}
              </ul>
            </div>
            <div class="note">
              <h4 class="panel-title">操作提示</h4>
              <p class="panel-body">用滑鼠移動觀察立體層次，使用 Ctrl 或 Command 加滾輪縮放；在手機和平板可雙指 pinch 放大。這個模型用於建立器官、骨髓、淋巴與毒性熱點的空間感，不取代正式影像、病理或 3D reconstruction。</p>
            </div>
          </aside>
        </div>
      </div>
    `;
  }
}
