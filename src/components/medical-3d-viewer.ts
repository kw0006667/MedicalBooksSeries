import { LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

type SceneId =
  | 'anatomy'
  | 'hypertension'
  | 'ischemia'
  | 'heart-failure'
  | 'arrhythmia'
  | 'atherosclerosis'
  | 'thrombosis';

type Scene = {
  id: SceneId;
  label: string;
  title: string;
  summary: string;
  bullets: string[];
  accent: string;
};

const scenes: Record<SceneId, Scene> = {
  anatomy: {
    id: 'anatomy',
    label: '正常構造',
    title: '心臟與大血管的立體定位',
    summary: '以左心室 (Left Ventricle)、右心室 (Right Ventricle)、心房 (Atrium)、主動脈弓 (Aortic Arch) 與冠狀動脈 (Coronary Arteries) 為核心，先建立空間感。',
    bullets: [
      '左心室壁厚、壓力高，負責全身灌流。',
      '右心室薄而順應性高，負責肺循環。',
      '冠狀動脈主要在舒張期得到灌流。',
    ],
    accent: '#2563eb',
  },
  hypertension: {
    id: 'hypertension',
    label: '高血壓',
    title: '高血壓的受力焦點',
    summary: '長期後負荷 (Afterload) 增加會讓左心室肥厚、主動脈硬化與微血管重塑同步發生，病人往往在器官傷害出現前沒有明顯症狀。',
    bullets: [
      '主動脈與中型動脈硬化提高脈壓。',
      '左心室同心性肥厚 (Concentric hypertrophy) 先補償、後失代償。',
      '腎臟與腦部的小血管病變常是長期傷害指標。',
    ],
    accent: '#ea580c',
  },
  ischemia: {
    id: 'ischemia',
    label: '缺血',
    title: '冠狀動脈狹窄與缺血範圍',
    summary: '冠狀動脈粥樣斑塊 (Atherosclerotic plaque) 讓灌流壓下降；當需氧量增加或斑塊破裂時，缺血區域會迅速向心肌深層擴展。',
    bullets: [
      '前降支 (LAD) 病變常牽涉前壁與室間隔。',
      '右冠狀動脈病變可能合併右心室或下壁缺血。',
      '缺血從心內膜下 (Subendocardium) 開始最常見。',
    ],
    accent: '#dc2626',
  },
  'heart-failure': {
    id: 'heart-failure',
    label: '心衰竭',
    title: '心衰竭的重塑與鬱血',
    summary: '收縮或舒張障礙都會造成心腔壓力上升，進而引起肺鬱血、心房擴大、瓣膜逆流與腎灌流下降。',
    bullets: [
      '左心室擴大會改變瓣環幾何，促進功能性逆流。',
      '左心房壓上升先表現為呼吸困難與肺水腫。',
      '右心衰竭時系統性靜脈壓升高，水腫與肝鬱血變明顯。',
    ],
    accent: '#7c3aed',
  },
  arrhythmia: {
    id: 'arrhythmia',
    label: '心律',
    title: '傳導系統與節律失控',
    summary: '竇房結 (SA node)、房室結 (AV node)、希氏束與浦肯野系統 (Purkinje system) 形成有序傳導；任何結構性疤痕、離子通道異常或自主神經變化都可造成異常節律。',
    bullets: [
      '心房擴大有利心房顫動 (Atrial fibrillation) 維持。',
      '缺血或疤痕可形成 re-entry 迴路。',
      '電解質失衡常把原本邊緣的心律不整變成顯性。',
    ],
    accent: '#0f766e',
  },
  atherosclerosis: {
    id: 'atherosclerosis',
    label: '粥樣硬化',
    title: '脂質沉積、發炎與斑塊演化',
    summary: 'LDL 穿入內皮下後被氧化並引發發炎反應，巨噬細胞吞噬形成泡沫細胞 (Foam cell)，斑塊逐步由脂質核心與纖維帽組成。',
    bullets: [
      '斑塊大小不等於脆弱性，纖維帽薄與高發炎更危險。',
      '冠狀動脈、頸動脈、主動脈與下肢動脈可同時受累。',
      'ApoB 顆粒數量比單看總膽固醇更接近動脈負荷。',
    ],
    accent: '#d97706',
  },
  thrombosis: {
    id: 'thrombosis',
    label: '血栓',
    title: '血栓形成與栓塞路徑',
    summary: '血小板活化、凝血瀑布與血流停滯會在不同部位形成不同性質的血栓；動脈偏血小板型，靜脈偏纖維蛋白與紅血球型。',
    bullets: [
      '心房顫動的左心耳 (Left atrial appendage) 是常見栓塞源。',
      '靜脈血栓可經肺循環造成肺栓塞。',
      '治療要先分清是 arterial 還是 venous thrombus。',
    ],
    accent: '#be123c',
  },
};

@customElement('medical-3d-viewer')
export class Medical3dViewer extends LitElement {
  @property({ type: String, attribute: 'initial-scene' }) initialScene: SceneId = 'anatomy';
  @state() private activeId: SceneId = 'anatomy';
  @state() private tiltX = -12;
  @state() private tiltY = 18;

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
        radial-gradient(circle at top left, rgba(14, 165, 233, 0.12), transparent 34%),
        radial-gradient(circle at bottom right, rgba(244, 114, 182, 0.1), transparent 30%),
        linear-gradient(180deg, rgba(248, 250, 252, 0.98), rgba(241, 245, 249, 0.96));
      box-shadow: 0 26px 60px rgba(15, 23, 42, 0.1);
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
      grid-template-columns: minmax(0, 1.3fr) minmax(260px, 0.7fr);
      gap: 0;
      align-items: stretch;
      padding: 14px 14px 14px 18px;
    }

    .stage-shell {
      position: relative;
      min-height: 480px;
      border-radius: 24px;
      overflow: hidden;
      background:
        radial-gradient(circle at 50% 12%, rgba(255, 255, 255, 0.92), transparent 42%),
        radial-gradient(circle at 52% 70%, rgba(99, 102, 241, 0.1), transparent 36%),
        linear-gradient(180deg, rgba(226, 232, 240, 0.88), rgba(241, 245, 249, 0.92));
      border: 1px solid rgba(148, 163, 184, 0.22);
      perspective: 1200px;
      cursor: grab;
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
        scale3d(0.98, 0.98, 0.98);
      transition: transform 180ms ease;
    }

    .torso,
    .heart,
    .aorta,
    .pulmonary,
    .atrium-left,
    .atrium-right,
    .ventricle-left,
    .ventricle-right,
    .coronary-lad,
    .coronary-rca,
    .conduction,
    .plaque,
    .ischemia-zone,
    .pressure-ring,
    .failure-shell,
    .congestion-cloud,
    .thrombus,
    .auricle,
    .vena-cava,
    .pulse {
      position: absolute;
      transform-style: preserve-3d;
    }

    .torso {
      left: 25%;
      top: 8%;
      width: 50%;
      height: 80%;
      border-radius: 44% 44% 38% 38% / 18% 18% 42% 42%;
      background:
        linear-gradient(180deg, rgba(248, 250, 252, 0.74), rgba(203, 213, 225, 0.62)),
        linear-gradient(90deg, rgba(255, 255, 255, 0.8), rgba(148, 163, 184, 0.34));
      box-shadow:
        inset -22px 0 40px rgba(15, 23, 42, 0.08),
        inset 18px 0 28px rgba(255, 255, 255, 0.52),
        0 20px 40px rgba(15, 23, 42, 0.08);
      opacity: 0.72;
      transform: translateZ(0px);
    }

    .torso::before,
    .torso::after {
      content: '';
      position: absolute;
      top: 14%;
      width: 24%;
      height: 44%;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.22);
      filter: blur(2px);
    }

    .torso::before {
      left: -10%;
      transform: rotate(-16deg);
    }

    .torso::after {
      right: -10%;
      transform: rotate(16deg);
    }

    .heart {
      left: 43%;
      top: 30%;
      width: 23%;
      height: 30%;
      transform: translateZ(58px) rotate(-16deg);
      animation: beat 1.8s ease-in-out infinite;
    }

    .heart::before,
    .heart::after {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 46% 44% 52% 48% / 32% 36% 64% 60%;
      background:
        radial-gradient(circle at 30% 24%, rgba(255, 255, 255, 0.36), transparent 20%),
        linear-gradient(180deg, rgba(220, 38, 38, 0.95), rgba(127, 29, 29, 0.96));
      box-shadow:
        inset -16px -12px 22px rgba(127, 29, 29, 0.34),
        inset 10px 8px 18px rgba(254, 202, 202, 0.22),
        0 18px 30px rgba(127, 29, 29, 0.26);
    }

    .heart::after {
      filter: blur(12px);
      opacity: 0.18;
      transform: translateZ(-24px) scale(1.06);
    }

    .atrium-left,
    .atrium-right,
    .ventricle-left,
    .ventricle-right {
      border-radius: 50%;
      opacity: 0.9;
    }

    .atrium-left {
      left: 46%;
      top: 27%;
      width: 9%;
      height: 8%;
      background: rgba(251, 113, 133, 0.54);
      transform: translateZ(72px);
    }

    .atrium-right {
      left: 54%;
      top: 26%;
      width: 8%;
      height: 8%;
      background: rgba(253, 164, 175, 0.5);
      transform: translateZ(68px);
    }

    .ventricle-left {
      left: 45%;
      top: 36%;
      width: 12%;
      height: 15%;
      background: rgba(248, 113, 113, 0.36);
      transform: translateZ(78px);
    }

    .ventricle-right {
      left: 55%;
      top: 37%;
      width: 10%;
      height: 13%;
      background: rgba(251, 146, 60, 0.28);
      transform: translateZ(62px);
    }

    .aorta {
      left: 49%;
      top: 17%;
      width: 12%;
      height: 20%;
      border-radius: 44% 46% 50% 50% / 56% 60% 40% 44%;
      border: 16px solid rgba(14, 165, 233, 0.92);
      border-left-width: 12px;
      border-bottom-color: transparent;
      background: transparent;
      transform: translateZ(80px) rotate(20deg);
      box-shadow: 0 0 0 6px rgba(125, 211, 252, 0.2);
    }

    .pulmonary {
      left: 43%;
      top: 24%;
      width: 18%;
      height: 16%;
      border-top: 14px solid rgba(56, 189, 248, 0.72);
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-radius: 50%;
      transform: translateZ(52px) rotate(-6deg);
      opacity: 0.8;
    }

    .vena-cava {
      left: 56%;
      top: 18%;
      width: 4%;
      height: 23%;
      border-radius: 999px;
      background: linear-gradient(180deg, rgba(59, 130, 246, 0.72), rgba(30, 64, 175, 0.54));
      transform: translateZ(28px);
      opacity: 0.72;
    }

    .coronary-lad,
    .coronary-rca {
      height: 5px;
      border-radius: 999px;
      background: linear-gradient(90deg, rgba(250, 204, 21, 0.96), rgba(251, 146, 60, 0.96));
      box-shadow: 0 0 0 6px rgba(253, 224, 71, 0.14);
    }

    .coronary-lad {
      left: 47%;
      top: 34%;
      width: 12%;
      transform: translateZ(86px) rotate(72deg);
      transform-origin: left center;
    }

    .coronary-rca {
      left: 54%;
      top: 33%;
      width: 10%;
      transform: translateZ(86px) rotate(16deg);
      transform-origin: left center;
    }

    .auricle {
      left: 49%;
      top: 25%;
      width: 7%;
      height: 7%;
      border-radius: 55% 45% 55% 45%;
      background: rgba(236, 72, 153, 0.52);
      transform: translateZ(84px);
      opacity: 0;
      transition: opacity 180ms ease;
    }

    .conduction {
      left: 50%;
      top: 24%;
      width: 2px;
      height: 28%;
      background: linear-gradient(180deg, rgba(16, 185, 129, 0.9), rgba(6, 95, 70, 0.96));
      transform: translateZ(92px);
      box-shadow:
        0 0 0 5px rgba(16, 185, 129, 0.12),
        22px 54px 0 0 rgba(16, 185, 129, 0.84),
        -18px 54px 0 0 rgba(16, 185, 129, 0.84);
      opacity: 0;
      transition: opacity 160ms ease;
    }

    .pulse {
      left: 49.2%;
      top: 23%;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: rgba(16, 185, 129, 0.96);
      transform: translateZ(100px);
      opacity: 0;
      box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4);
      animation: pulse 1.35s ease-out infinite;
    }

    .plaque {
      left: 55%;
      top: 32%;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.9), rgba(202, 138, 4, 0.94));
      box-shadow: 0 0 0 8px rgba(202, 138, 4, 0.16);
      transform: translateZ(98px);
      opacity: 0;
      transition: opacity 160ms ease;
    }

    .ischemia-zone {
      left: 44%;
      top: 40%;
      width: 10%;
      height: 12%;
      border-radius: 54% 46% 56% 44%;
      background: radial-gradient(circle at 50% 50%, rgba(251, 191, 36, 0.66), rgba(185, 28, 28, 0.84));
      transform: translateZ(96px);
      opacity: 0;
      filter: blur(2px);
      transition: opacity 160ms ease;
    }

    .pressure-ring {
      left: 42%;
      top: 29%;
      width: 27%;
      height: 34%;
      border-radius: 48%;
      border: 2px solid rgba(249, 115, 22, 0.7);
      transform: translateZ(24px) scale(0.92);
      opacity: 0;
      animation: expand 2.2s ease-out infinite;
    }

    .pressure-ring.ring-2 {
      animation-delay: 0.7s;
    }

    .failure-shell {
      left: 41.5%;
      top: 28%;
      width: 28%;
      height: 36%;
      border-radius: 48% 44% 54% 46%;
      border: 2px dashed rgba(124, 58, 237, 0.8);
      transform: translateZ(18px);
      opacity: 0;
      transition: opacity 160ms ease;
    }

    .congestion-cloud {
      left: 37%;
      top: 18%;
      width: 32%;
      height: 18%;
      border-radius: 50%;
      background: radial-gradient(circle at 50% 50%, rgba(147, 197, 253, 0.48), rgba(37, 99, 235, 0.08));
      transform: translateZ(10px);
      filter: blur(12px);
      opacity: 0;
      transition: opacity 160ms ease;
    }

    .thrombus {
      left: 50%;
      top: 26%;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: radial-gradient(circle at 30% 30%, rgba(255, 228, 230, 0.9), rgba(190, 24, 93, 0.98));
      transform: translateZ(96px);
      opacity: 0;
      box-shadow: 0 0 0 10px rgba(190, 24, 93, 0.14);
      transition: opacity 160ms ease;
    }

    .label {
      position: absolute;
      padding: 7px 10px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.82);
      border: 1px solid rgba(148, 163, 184, 0.26);
      backdrop-filter: blur(8px);
      color: #0f172a;
      font: 700 0.74rem/1 ui-sans-serif, -apple-system, BlinkMacSystemFont, sans-serif;
      transform: translateZ(140px);
      box-shadow: 0 10px 22px rgba(15, 23, 42, 0.08);
    }

    .l1 { left: 14%; top: 20%; }
    .l2 { right: 12%; top: 22%; }
    .l3 { left: 13%; top: 58%; }
    .l4 { right: 12%; top: 62%; }

    .inspector {
      display: grid;
      gap: 14px;
      padding: 14px 18px 18px;
      background: rgba(255, 255, 255, 0.6);
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

    .scene-hypertension .pressure-ring,
    .scene-ischemia .plaque,
    .scene-ischemia .ischemia-zone,
    .scene-heart-failure .failure-shell,
    .scene-heart-failure .congestion-cloud,
    .scene-arrhythmia .conduction,
    .scene-arrhythmia .pulse,
    .scene-atherosclerosis .plaque,
    .scene-thrombosis .thrombus,
    .scene-thrombosis .auricle {
      opacity: 1;
    }

    @keyframes beat {
      0%, 100% { transform: translateZ(58px) rotate(-16deg) scale(1); }
      18% { transform: translateZ(64px) rotate(-16deg) scale(1.035); }
      32% { transform: translateZ(60px) rotate(-16deg) scale(0.992); }
    }

    @keyframes expand {
      0% { transform: translateZ(24px) scale(0.88); opacity: 0.76; }
      100% { transform: translateZ(24px) scale(1.24); opacity: 0; }
    }

    @keyframes pulse {
      0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.38); }
      100% { box-shadow: 0 0 0 22px rgba(16, 185, 129, 0); }
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
        min-height: 360px;
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
    return scenes[this.activeId] ?? scenes.anatomy;
  }

  private setScene(id: SceneId) {
    this.activeId = id;
  }

  private onPointerMove(event: PointerEvent) {
    const box = event.currentTarget as HTMLElement;
    const rect = box.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    this.tiltY = Math.max(-24, Math.min(24, px * 44));
    this.tiltX = Math.max(-24, Math.min(12, -py * 34 - 8));
  }

  private resetTilt() {
    this.tiltX = -12;
    this.tiltY = 18;
  }

  override render() {
    const scene = this.activeScene;

    return html`
      <div class="shell" style=${`--scene-accent:${scene.accent};`}>
        <div class="header">
          <div class="eyebrow">Interactive 3D Anatomy</div>
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
          <div
            class="stage-shell"
            @pointermove=${this.onPointerMove}
            @pointerleave=${this.resetTilt}
          >
            <div class="grid"></div>
            <div
              class=${`model scene-${this.activeId}`}
              style=${`--tilt-x:${this.tiltX};--tilt-y:${this.tiltY};`}
            >
              <div class="torso"></div>
              <div class="congestion-cloud"></div>
              <div class="aorta"></div>
              <div class="pulmonary"></div>
              <div class="vena-cava"></div>
              <div class="heart"></div>
              <div class="atrium-left"></div>
              <div class="atrium-right"></div>
              <div class="ventricle-left"></div>
              <div class="ventricle-right"></div>
              <div class="coronary-lad"></div>
              <div class="coronary-rca"></div>
              <div class="auricle"></div>
              <div class="conduction"></div>
              <div class="pulse"></div>
              <div class="plaque"></div>
              <div class="ischemia-zone"></div>
              <div class="pressure-ring ring-1"></div>
              <div class="pressure-ring ring-2"></div>
              <div class="failure-shell"></div>
              <div class="thrombus"></div>
              <div class="label l1">主動脈弓</div>
              <div class="label l2">冠狀動脈</div>
              <div class="label l3">左心室</div>
              <div class="label l4">左心房/左心耳</div>
            </div>
          </div>
          <div class="inspector">
            <div class="chip">${scene.label}</div>
            <h4 class="panel-title">${scene.title}</h4>
            <p class="panel-body">${scene.summary}</p>
            <ul>
              ${scene.bullets.map(item => html`<li>${item}</li>`)}
            </ul>
            <div class="note">
              <p class="panel-body">閱讀方式：拖曳視線看立體層次，把亮起的部位對照本章的病理生理、檢查與治療段落。這不是精密影像重建，而是為了把空間結構與疾病路徑接在一起。</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
