import { LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

type SceneId =
  | 'renal-anatomy'
  | 'aki-injury'
  | 'ckd-fibrosis'
  | 'fluid-overload';

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
  'renal-anatomy': {
    id: 'renal-anatomy',
    label: '正常腎臟',
    title: '腎臟、腎盂與腎元 (Nephron) 的立體定位',
    summary: '先建立腎皮質 (Cortex)、腎髓質 (Medulla)、腎盂 (Renal pelvis)、輸尿管 (Ureter) 與腎元血流的空間關係，之後才容易理解 AKI、CKD、利尿劑與體液失衡各自打在哪一層。',
    bullets: [
      '腎小球負責過濾，腎小管負責精細回收與排泄。',
      '皮質與髓質的氧氣供應並不平均，髓質相對更脆弱。',
      '輸入與輸出細動脈張力會直接改寫過濾壓力。',
    ],
    accent: '#2563eb',
  },
  'aki-injury': {
    id: 'aki-injury',
    label: 'AKI',
    title: '急性腎損傷 (AKI) 的灌流斷點與小管傷害',
    summary: '這個場景把前腎性低灌流、急性腎小管損傷 (ATN)、間質水腫與尿流受阻放在同一視角，幫助理解 creatinine 上升不等於只有一種 AKI。',
    bullets: [
      '髓質外帶的粗上行支與近端小管在缺血時最容易受傷。',
      '尿管型 (Cast) 與小管上皮剝落會把流量問題變成管腔問題。',
      '補液有效不代表一開始不是 AKI，而是表示機轉可逆。',
    ],
    accent: '#ea580c',
  },
  'ckd-fibrosis': {
    id: 'ckd-fibrosis',
    label: 'CKD',
    title: '慢性腎臟病 (CKD) 的腎元流失、硬化與纖維化',
    summary: '觀察剩餘腎元的代償性高過濾如何逐步轉成腎小球硬化、間質纖維化與腎臟縮小，這也是 CKD 為什麼常在很晚才被病人感覺到的原因。',
    bullets: [
      '代償性高過濾短期撐住 GFR，長期卻加速結構破壞。',
      '蛋白尿本身就是毒性訊號，不只是檢查異常。',
      'CKD 不是只傷腎，它會重寫心血管、骨代謝與造血系統。',
    ],
    accent: '#7c3aed',
  },
  'fluid-overload': {
    id: 'fluid-overload',
    label: '體液滯留',
    title: '鈉水滯留、靜脈壓與水腫分布',
    summary: '把腎臟保鈉、靜脈壓上升、肺水腫、腹水與周邊水腫視覺化，提醒體液問題不是單純看公斤數，而是看水到底積在哪裡、為什麼積在那裡。',
    bullets: [
      '有效動脈血量下降時，病人體內可以同時總水量增加。',
      '肺水腫、腹水與下肢水腫問的是不同壓力場。',
      '利尿只是搬水，若不處理驅動因子就會一直回來。',
    ],
    accent: '#0891b2',
  },
};

@customElement('renal-3d-viewer')
export class Renal3dViewer extends LitElement {
  @property({ type: String, attribute: 'initial-scene' }) initialScene: SceneId = 'renal-anatomy';
  @state() private activeId: SceneId = 'renal-anatomy';
  @state() private tiltX = -10;
  @state() private tiltY = 16;
  @state() private zoom = 1;

  private pinchStartDistance = 0;
  private pinchStartZoom = 1;

  private static readonly minZoom = 0.84;
  private static readonly maxZoom = 1.82;

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
        radial-gradient(circle at top left, rgba(37, 99, 235, 0.11), transparent 34%),
        radial-gradient(circle at bottom right, rgba(124, 58, 237, 0.08), transparent 32%),
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
      border-color: color-mix(in srgb, var(--scene-accent) 50%, white);
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
      min-height: 500px;
      border-radius: 24px;
      overflow: hidden;
      background:
        radial-gradient(circle at 50% 8%, rgba(255, 255, 255, 0.95), transparent 40%),
        radial-gradient(circle at 50% 70%, rgba(96, 165, 250, 0.12), transparent 34%),
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
    .kidney-left,
    .kidney-right,
    .cortex-left,
    .cortex-right,
    .hilum-left,
    .hilum-right,
    .pelvis-left,
    .pelvis-right,
    .ureter-left,
    .ureter-right,
    .artery-left,
    .artery-right,
    .vein-left,
    .vein-right,
    .nephron-curve,
    .ischemic-wedge,
    .cast-column,
    .fibrosis-veil,
    .scar-left,
    .scar-right,
    .volume-halo,
    .edema-cloud,
    .abdomen {
      position: absolute;
      transform-style: preserve-3d;
      opacity: 0;
      transition: opacity 180ms ease;
    }

    .torso {
      left: 30%;
      top: 7%;
      width: 40%;
      height: 78%;
      border-radius: 36% 36% 34% 34% / 16% 16% 42% 42%;
      background:
        linear-gradient(180deg, rgba(248, 250, 252, 0.78), rgba(203, 213, 225, 0.62)),
        linear-gradient(90deg, rgba(255, 255, 255, 0.82), rgba(148, 163, 184, 0.34));
      box-shadow:
        inset -18px 0 36px rgba(15, 23, 42, 0.08),
        inset 16px 0 24px rgba(255, 255, 255, 0.48),
        0 20px 40px rgba(15, 23, 42, 0.08);
      opacity: 0.72;
    }

    .abdomen {
      left: 28%;
      top: 52%;
      width: 44%;
      height: 24%;
      border-radius: 46% 46% 52% 52%;
      background: radial-gradient(circle at 50% 50%, rgba(14, 165, 233, 0.12), rgba(14, 165, 233, 0.02));
      transform: translateZ(8px);
    }

    .kidney-left,
    .kidney-right {
      top: 26%;
      width: 16%;
      height: 31%;
      border-radius: 44% 56% 56% 42% / 44% 38% 62% 56%;
      background:
        radial-gradient(circle at 28% 26%, rgba(255, 255, 255, 0.32), transparent 22%),
        linear-gradient(180deg, rgba(216, 99, 81, 0.96), rgba(120, 31, 42, 0.92));
      box-shadow:
        inset -14px -8px 24px rgba(46, 7, 19, 0.24),
        inset 12px 8px 18px rgba(255, 255, 255, 0.14),
        0 18px 28px rgba(15, 23, 42, 0.14);
      opacity: 1;
    }

    .kidney-left {
      left: 33%;
      transform: translateZ(72px) rotateY(18deg) rotate(-10deg);
    }

    .kidney-right {
      left: 51%;
      transform: translateZ(72px) rotateY(-18deg) rotate(10deg) scaleX(-1);
    }

    .cortex-left,
    .cortex-right {
      top: 29%;
      width: 11.6%;
      height: 25%;
      border-radius: 44% 56% 56% 42% / 42% 36% 62% 58%;
      border: 2px solid rgba(254, 202, 202, 0.84);
      box-shadow: 0 0 0 12px rgba(248, 113, 113, 0.1);
      opacity: 0.92;
    }

    .cortex-left {
      left: 35%;
      transform: translateZ(94px) rotate(-10deg);
    }

    .cortex-right {
      left: 53%;
      transform: translateZ(94px) rotate(10deg) scaleX(-1);
    }

    .hilum-left,
    .hilum-right {
      top: 38%;
      width: 4.8%;
      height: 7.6%;
      border-radius: 50%;
      background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.5), rgba(70, 12, 24, 0.92));
      transform: translateZ(96px);
      opacity: 1;
    }

    .hilum-left { left: 41%; }
    .hilum-right { left: 54%; }

    .pelvis-left,
    .pelvis-right {
      top: 40%;
      width: 3.2%;
      height: 7%;
      border-radius: 46% 46% 56% 56%;
      background: linear-gradient(180deg, rgba(255, 248, 196, 0.92), rgba(245, 158, 11, 0.82));
      transform: translateZ(104px);
      opacity: 1;
    }

    .pelvis-left { left: 42%; }
    .pelvis-right { left: 55%; }

    .ureter-left,
    .ureter-right {
      top: 46%;
      width: 1.2%;
      height: 24%;
      border-radius: 999px;
      background: linear-gradient(180deg, rgba(250, 204, 21, 0.88), rgba(245, 158, 11, 0.74));
      transform: translateZ(102px);
      opacity: 1;
    }

    .ureter-left { left: 43.2%; }
    .ureter-right { left: 56.2%; }

    .artery-left,
    .artery-right,
    .vein-left,
    .vein-right {
      height: 1.2%;
      border-radius: 999px;
      transform: translateZ(108px);
      opacity: 1;
    }

    .artery-left,
    .artery-right {
      background: linear-gradient(90deg, rgba(248, 113, 113, 0.94), rgba(220, 38, 38, 0.84));
      box-shadow: 0 0 0 8px rgba(248, 113, 113, 0.12);
    }

    .vein-left,
    .vein-right {
      background: linear-gradient(90deg, rgba(96, 165, 250, 0.92), rgba(30, 64, 175, 0.84));
      box-shadow: 0 0 0 8px rgba(96, 165, 250, 0.12);
    }

    .artery-left {
      left: 37%;
      top: 41%;
      width: 7%;
    }

    .artery-right {
      left: 56%;
      top: 41%;
      width: 7%;
    }

    .vein-left {
      left: 37%;
      top: 44%;
      width: 7%;
    }

    .vein-right {
      left: 56%;
      top: 44%;
      width: 7%;
    }

    .nephron-curve {
      left: 34%;
      top: 30%;
      width: 33%;
      height: 28%;
      border: 3px solid rgba(191, 219, 254, 0.86);
      border-top: none;
      border-left: none;
      border-radius: 0 36% 44% 36%;
      transform: translateZ(124px) rotate(-4deg);
      clip-path: polygon(4% 0%, 18% 0%, 18% 32%, 35% 32%, 35% 62%, 54% 62%, 54% 22%, 72% 22%, 72% 100%, 100% 100%, 100% 0%, 4% 0%);
      filter: drop-shadow(0 0 12px rgba(96, 165, 250, 0.16));
      opacity: 0.92;
    }

    .ischemic-wedge {
      left: 35%;
      top: 33%;
      width: 10%;
      height: 14%;
      background: linear-gradient(180deg, rgba(251, 146, 60, 0.94), rgba(194, 65, 12, 0.9));
      clip-path: polygon(50% 0%, 100% 100%, 0% 100%);
      transform: translateZ(126px) rotate(-12deg);
      box-shadow: 0 0 0 12px rgba(251, 146, 60, 0.14);
    }

    .cast-column {
      left: 56%;
      top: 36%;
      width: 3%;
      height: 18%;
      border-radius: 999px;
      background: linear-gradient(180deg, rgba(120, 53, 15, 0.96), rgba(68, 26, 3, 0.92));
      transform: translateZ(128px) rotate(6deg);
      box-shadow: 0 0 0 10px rgba(120, 53, 15, 0.12);
    }

    .fibrosis-veil {
      left: 31%;
      top: 22%;
      width: 38%;
      height: 40%;
      border-radius: 42% 42% 48% 48%;
      background:
        radial-gradient(circle at 28% 32%, rgba(216, 180, 254, 0.42), transparent 18%),
        radial-gradient(circle at 68% 44%, rgba(196, 181, 253, 0.38), transparent 18%),
        linear-gradient(180deg, rgba(76, 29, 149, 0.14), rgba(91, 33, 182, 0.06));
      transform: translateZ(86px);
      filter: blur(6px);
    }

    .scar-left,
    .scar-right {
      top: 30%;
      width: 10%;
      height: 20%;
      border-radius: 44% 50% 56% 42%;
      border: 3px dashed rgba(221, 214, 254, 0.82);
      transform: translateZ(128px);
      animation: pulseScar 2.8s ease-in-out infinite;
    }

    .scar-left { left: 34%; }
    .scar-right { left: 54%; }

    .volume-halo {
      left: 22%;
      top: 18%;
      width: 56%;
      height: 60%;
      border-radius: 44% 44% 48% 48% / 22% 22% 56% 56%;
      border: 2px dashed rgba(8, 145, 178, 0.72);
      transform: translateZ(18px) scale(1.04);
      animation: floatHalo 2.6s ease-in-out infinite;
    }

    .edema-cloud {
      left: 42%;
      top: 63%;
      width: 18%;
      height: 9%;
      border-radius: 50%;
      background: radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.34), rgba(14, 165, 233, 0.08));
      transform: translateZ(28px);
      filter: blur(10px);
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
      transform: translateZ(140px);
      box-shadow: 0 10px 22px rgba(15, 23, 42, 0.08);
    }

    .l1 { left: 15%; top: 26%; }
    .l2 { right: 13%; top: 28%; }
    .l3 { left: 14%; top: 58%; }
    .l4 { right: 12%; top: 62%; }

    .scene-renal-anatomy .nephron-curve,
    .scene-aki-injury .ischemic-wedge,
    .scene-aki-injury .cast-column,
    .scene-ckd-fibrosis .fibrosis-veil,
    .scene-ckd-fibrosis .scar-left,
    .scene-ckd-fibrosis .scar-right,
    .scene-fluid-overload .volume-halo,
    .scene-fluid-overload .edema-cloud,
    .scene-fluid-overload .abdomen {
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

    @keyframes pulseScar {
      0%, 100% { transform: translateZ(128px) scale(0.98); opacity: 0.72; }
      50% { transform: translateZ(128px) scale(1.04); opacity: 1; }
    }

    @keyframes floatHalo {
      0%, 100% { transform: translateZ(18px) scale(1.03); }
      50% { transform: translateZ(18px) scale(1.08); }
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
        min-height: 380px;
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
    return scenes[this.activeId] ?? scenes['renal-anatomy'];
  }

  private clampZoom(nextZoom: number) {
    return Math.min(Renal3dViewer.maxZoom, Math.max(Renal3dViewer.minZoom, Number(nextZoom.toFixed(2))));
  }

  private setScene(id: SceneId) {
    this.activeId = id;
  }

  private onPointerMove(event: PointerEvent) {
    const box = event.currentTarget as HTMLElement;
    const rect = box.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    this.tiltY = Math.max(-24, Math.min(24, px * 38));
    this.tiltX = Math.max(-22, Math.min(12, -py * 28 - 6));
  }

  private resetTilt() {
    this.tiltX = -10;
    this.tiltY = 16;
  }

  private setZoom(nextZoom: number) {
    this.zoom = this.clampZoom(nextZoom);
  }

  private handleWheel(event: WheelEvent) {
    if (!event.ctrlKey && !event.metaKey) {
      return;
    }
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
      this.tiltY = Math.max(-24, Math.min(24, px * 38));
      this.tiltX = Math.max(-22, Math.min(12, -py * 28 - 6));
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
      case 'aki-injury':
        return [
          { className: 'l1', text: '低灌流脆弱區' },
          { className: 'l2', text: '腎小管管型' },
          { className: 'l3', text: '腎盂與尿流出口' },
          { className: 'l4', text: '可逆與不可逆交界' },
        ];
      case 'ckd-fibrosis':
        return [
          { className: 'l1', text: '剩餘腎元代償' },
          { className: 'l2', text: '間質纖維化' },
          { className: 'l3', text: '腎臟縮小與疤痕' },
          { className: 'l4', text: '蛋白尿毒性區' },
        ];
      case 'fluid-overload':
        return [
          { className: 'l1', text: '鈉水滯留起點' },
          { className: 'l2', text: '靜脈回流壓上升' },
          { className: 'l3', text: '腹部與下肢積液' },
          { className: 'l4', text: '肺鬱血延伸風險' },
        ];
      default:
        return [
          { className: 'l1', text: '腎皮質與腎小球' },
          { className: 'l2', text: '腎門與血流入口' },
          { className: 'l3', text: '腎盂與輸尿管' },
          { className: 'l4', text: '腎元流向示意' },
        ];
    }
  }

  override render() {
    const scene = this.activeScene;

    return html`
      <div class="shell" style=${`--scene-accent:${scene.accent};`}>
        <div class="header">
          <div class="eyebrow">Interactive Renal 3D</div>
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
                  ?disabled=${this.zoom <= Renal3dViewer.minZoom}
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
                  ?disabled=${this.zoom >= Renal3dViewer.maxZoom}
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
                <div class="abdomen"></div>
                <div class="kidney-left"></div>
                <div class="kidney-right"></div>
                <div class="cortex-left"></div>
                <div class="cortex-right"></div>
                <div class="hilum-left"></div>
                <div class="hilum-right"></div>
                <div class="pelvis-left"></div>
                <div class="pelvis-right"></div>
                <div class="ureter-left"></div>
                <div class="ureter-right"></div>
                <div class="artery-left"></div>
                <div class="artery-right"></div>
                <div class="vein-left"></div>
                <div class="vein-right"></div>
                <div class="nephron-curve"></div>
                <div class="ischemic-wedge"></div>
                <div class="cast-column"></div>
                <div class="fibrosis-veil"></div>
                <div class="scar-left"></div>
                <div class="scar-right"></div>
                <div class="volume-halo"></div>
                <div class="edema-cloud"></div>
                ${this.getLabels(this.activeId).map(label => html`
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
              <p class="panel-body">用滑鼠移動觀察立體層次，使用 Ctrl 或 Command 加滾輪縮放；在手機和平板可雙指 pinch 放大。這個模型用來幫你建立器官與病灶範圍感，不取代正式影像重建或病理切片。</p>
            </div>
          </aside>
        </div>
      </div>
    `;
  }
}
