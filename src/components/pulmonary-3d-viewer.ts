import { LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

type SceneId =
  | 'respiratory-anatomy'
  | 'asthma-airway'
  | 'copd-remodeling'
  | 'pneumonia-consolidation'
  | 'tb-granuloma'
  | 'ventilator-support';

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
  'respiratory-anatomy': {
    id: 'respiratory-anatomy',
    label: '正常肺部',
    title: '肺部、氣道與肺泡的立體定位',
    summary: '先建立氣管 (Trachea)、主支氣管 (Main bronchi)、肺葉 (Lobes) 與肺泡交換區之間的空間關係，之後才容易理解發炎、阻塞與實變各自影響哪一層。',
    bullets: [
      '導氣區與交換區在臨床上扮演完全不同角色。',
      '右肺三葉、左肺二葉的空間分布會影響病灶解讀。',
      '小氣道病變常比影像更早影響病人體感。',
    ],
    accent: '#0f766e',
  },
  'asthma-airway': {
    id: 'asthma-airway',
    label: '氣喘',
    title: '氣喘的氣道痙攣、黏液與發炎',
    summary: '這個場景強調平滑肌收縮、氣道壁水腫與黏液栓塞如何一起縮小管腔，讓病人同時出現喘鳴、胸悶與呼氣延長。',
    bullets: [
      '發炎與痙攣常同時存在，而不是二選一。',
      'silent chest 代表氣流太少，不是病情好轉。',
      '控制藥的價值在於減少整條發炎鏈被啟動。',
    ],
    accent: '#ea580c',
  },
  'copd-remodeling': {
    id: 'copd-remodeling',
    label: 'COPD',
    title: 'COPD 的過度充氣與肺泡破壞',
    summary: '觀察氣道塌陷、肺過度充氣與肺泡隔破壞如何改變呼吸力學，這也是病人為何會愈來愈容易喘、卻不一定馬上血氧很差的原因。',
    bullets: [
      '小氣道塌陷與 air trapping 是阻塞型做功上升關鍵。',
      '肺氣腫讓彈性回縮力下降，不只是肺變大。',
      '過度充氣會讓橫膈變平，吸氣更沒效率。',
    ],
    accent: '#dc2626',
  },
  'pneumonia-consolidation': {
    id: 'pneumonia-consolidation',
    label: '肺炎',
    title: '肺實變與局部換氣灌流失衡',
    summary: '用局部肺葉實變與肺泡浸潤示意肺炎如何把原本充滿空氣的肺泡變成低通氣區，造成 shunt-like physiology 與低氧。',
    bullets: [
      '同樣是肺炎，病灶位置與範圍會影響低氧速度。',
      '實變不只是影像白掉，而是交換面真正被液體占據。',
      '局部肺葉病灶也可能引發全身敗血症反應。',
    ],
    accent: '#2563eb',
  },
  'tb-granuloma': {
    id: 'tb-granuloma',
    label: '結核',
    title: '結核肉芽腫、空洞與傳播焦點',
    summary: '這個場景把上葉偏好的肉芽腫、乾酪性壞死與空洞視覺化，幫助理解 latent 與 active TB 為何在空間上與傳播風險上差這麼多。',
    bullets: [
      '肉芽腫是宿主圍堵，不是病原消失。',
      '空洞意味著高菌量與高傳播風險。',
      '影像與宿主背景必須一起讀。',
    ],
    accent: '#7c3aed',
  },
  'ventilator-support': {
    id: 'ventilator-support',
    label: '機械通氣',
    title: '氣道支持、氧合與肺保護視角',
    summary: '觀察氣管內管、潮氣流動與肺泡招募如何改變病人的呼吸做功，同時提醒機器是在幫病人度過危機，不是在取代病因治療。',
    bullets: [
      '潮氣量、PEEP 與同步性會直接改變肺傷害風險。',
      '氧合支持與通氣支持是兩件事。',
      '愈會用呼吸機，愈知道何時該減少它的存在感。',
    ],
    accent: '#0891b2',
  },
};

@customElement('pulmonary-3d-viewer')
export class Pulmonary3dViewer extends LitElement {
  @property({ type: String, attribute: 'initial-scene' }) initialScene: SceneId = 'respiratory-anatomy';
  @state() private activeId: SceneId = 'respiratory-anatomy';
  @state() private tiltX = -8;
  @state() private tiltY = 16;
  @state() private zoom = 1;

  private pinchStartDistance = 0;
  private pinchStartZoom = 1;

  private static readonly minZoom = 0.82;
  private static readonly maxZoom = 1.78;

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
        radial-gradient(circle at top left, rgba(8, 145, 178, 0.12), transparent 34%),
        radial-gradient(circle at bottom right, rgba(59, 130, 246, 0.1), transparent 30%),
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
        radial-gradient(circle at 50% 10%, rgba(255, 255, 255, 0.95), transparent 42%),
        radial-gradient(circle at 48% 72%, rgba(14, 165, 233, 0.12), transparent 36%),
        linear-gradient(180deg, rgba(220, 233, 240, 0.9), rgba(241, 245, 249, 0.94));
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
    .airway-column,
    .carina,
    .bronchus-left,
    .bronchus-right,
    .lung-left,
    .lung-right,
    .alveoli-left,
    .alveoli-right,
    .fissure-left,
    .fissure-right,
    .bronchospasm-ring,
    .mucus-plug,
    .hyperinflation-shell,
    .damaged-alveoli,
    .consolidation-patch,
    .effusion-glow,
    .granuloma-node,
    .cavity-lesion,
    .ett-tube,
    .ventilator-circuit,
    .flow-wave {
      position: absolute;
      transform-style: preserve-3d;
      opacity: 0;
      transition: opacity 180ms ease;
    }

    .torso {
      left: 24%;
      top: 6%;
      width: 52%;
      height: 82%;
      border-radius: 44% 44% 38% 38% / 18% 18% 42% 42%;
      background:
        linear-gradient(180deg, rgba(248, 250, 252, 0.75), rgba(203, 213, 225, 0.62)),
        linear-gradient(90deg, rgba(255, 255, 255, 0.82), rgba(148, 163, 184, 0.34));
      box-shadow:
        inset -22px 0 40px rgba(15, 23, 42, 0.08),
        inset 18px 0 28px rgba(255, 255, 255, 0.52),
        0 20px 40px rgba(15, 23, 42, 0.08);
      opacity: 0.68;
    }

    .airway-column {
      left: 49%;
      top: 12%;
      width: 2.6%;
      height: 26%;
      border-radius: 999px;
      background:
        linear-gradient(180deg, rgba(14, 165, 233, 0.9), rgba(8, 47, 73, 0.8));
      box-shadow: 0 0 0 8px rgba(14, 165, 233, 0.12);
      transform: translateZ(78px);
      opacity: 1;
    }

    .carina {
      left: 48%;
      top: 35%;
      width: 5%;
      height: 6%;
      border-radius: 50%;
      background: rgba(14, 165, 233, 0.82);
      transform: translateZ(82px);
      opacity: 1;
    }

    .bronchus-left,
    .bronchus-right {
      height: 1.2%;
      border-radius: 999px;
      background: linear-gradient(90deg, rgba(56, 189, 248, 0.94), rgba(14, 165, 233, 0.74));
      box-shadow: 0 0 0 8px rgba(56, 189, 248, 0.12);
      opacity: 1;
    }

    .bronchus-left {
      left: 41%;
      top: 39%;
      width: 12%;
      transform: translateZ(82px) rotate(-26deg);
      transform-origin: right center;
    }

    .bronchus-right {
      left: 50%;
      top: 39%;
      width: 12%;
      transform: translateZ(82px) rotate(26deg);
      transform-origin: left center;
    }

    .lung-left,
    .lung-right {
      top: 22%;
      width: 24%;
      height: 46%;
      border-radius: 42% 46% 54% 48% / 22% 24% 58% 56%;
      background:
        radial-gradient(circle at 32% 24%, rgba(255, 255, 255, 0.3), transparent 22%),
        linear-gradient(180deg, rgba(14, 165, 233, 0.45), rgba(15, 118, 110, 0.82));
      box-shadow:
        inset -18px -10px 28px rgba(15, 23, 42, 0.16),
        inset 14px 10px 18px rgba(255, 255, 255, 0.18),
        0 18px 28px rgba(15, 23, 42, 0.12);
      opacity: 1;
    }

    .lung-left {
      left: 27%;
      transform: translateZ(48px) rotateY(16deg) rotate(-2deg);
    }

    .lung-right {
      left: 49%;
      transform: translateZ(48px) rotateY(-16deg) rotate(2deg);
    }

    .fissure-left,
    .fissure-right {
      height: 0.8%;
      background: rgba(226, 232, 240, 0.7);
      transform: translateZ(76px);
      opacity: 0.72;
    }

    .fissure-left {
      left: 31%;
      top: 41%;
      width: 15%;
      transform: translateZ(76px) rotate(-12deg);
    }

    .fissure-right {
      left: 53%;
      top: 37%;
      width: 13%;
      box-shadow: 0 42px 0 0 rgba(226, 232, 240, 0.66);
      transform: translateZ(76px) rotate(12deg);
    }

    .alveoli-left,
    .alveoli-right {
      width: 11%;
      height: 11%;
      border-radius: 50%;
      background:
        radial-gradient(circle at 24% 28%, rgba(191, 219, 254, 0.9) 0 14%, transparent 15% 100%),
        radial-gradient(circle at 62% 34%, rgba(186, 230, 253, 0.88) 0 13%, transparent 14% 100%),
        radial-gradient(circle at 48% 66%, rgba(224, 242, 254, 0.88) 0 14%, transparent 15% 100%),
        radial-gradient(circle at 74% 74%, rgba(147, 197, 253, 0.84) 0 12%, transparent 13% 100%);
      transform: translateZ(96px);
      opacity: 0.78;
      filter: drop-shadow(0 10px 16px rgba(14, 165, 233, 0.18));
    }

    .alveoli-left {
      left: 33%;
      top: 50%;
    }

    .alveoli-right {
      left: 56%;
      top: 49%;
    }

    .bronchospasm-ring {
      left: 45%;
      top: 36%;
      width: 10%;
      height: 10%;
      border-radius: 50%;
      border: 4px solid rgba(249, 115, 22, 0.82);
      box-shadow: 0 0 0 12px rgba(249, 115, 22, 0.14);
      transform: translateZ(108px);
      animation: pulse-ring 1.8s ease-out infinite;
    }

    .mucus-plug {
      left: 57%;
      top: 41%;
      width: 6%;
      height: 3.2%;
      border-radius: 999px;
      background: linear-gradient(90deg, rgba(251, 146, 60, 0.96), rgba(245, 158, 11, 0.84));
      transform: translateZ(110px) rotate(26deg);
      box-shadow: 0 0 0 8px rgba(251, 146, 60, 0.14);
    }

    .hyperinflation-shell {
      left: 23%;
      top: 18%;
      width: 56%;
      height: 56%;
      border-radius: 44% 44% 40% 40% / 26% 26% 54% 54%;
      border: 2px dashed rgba(220, 38, 38, 0.72);
      transform: translateZ(20px) scale(1.05);
      animation: float-shell 2.4s ease-in-out infinite;
    }

    .damaged-alveoli {
      left: 53%;
      top: 51%;
      width: 12%;
      height: 11%;
      border-radius: 48%;
      background:
        radial-gradient(circle at 30% 28%, rgba(248, 113, 113, 0.9) 0 15%, transparent 16% 100%),
        radial-gradient(circle at 70% 30%, rgba(248, 113, 113, 0.88) 0 17%, transparent 18% 100%),
        radial-gradient(circle at 48% 70%, rgba(127, 29, 29, 0.86) 0 19%, transparent 20% 100%);
      transform: translateZ(96px);
      filter: drop-shadow(0 12px 18px rgba(127, 29, 29, 0.18));
    }

    .consolidation-patch {
      left: 55%;
      top: 46%;
      width: 16%;
      height: 17%;
      border-radius: 44% 56% 52% 48%;
      background:
        radial-gradient(circle at 28% 28%, rgba(255, 255, 255, 0.42), transparent 20%),
        linear-gradient(180deg, rgba(59, 130, 246, 0.9), rgba(29, 78, 216, 0.82));
      transform: translateZ(92px);
      box-shadow: 0 0 0 12px rgba(59, 130, 246, 0.14);
      filter: blur(0.4px);
    }

    .effusion-glow {
      left: 52%;
      top: 61%;
      width: 18%;
      height: 8%;
      border-radius: 50%;
      background: radial-gradient(circle at 50% 50%, rgba(96, 165, 250, 0.38), rgba(37, 99, 235, 0.08));
      transform: translateZ(30px);
      filter: blur(10px);
    }

    .granuloma-node {
      left: 34%;
      top: 28%;
      width: 10%;
      height: 10%;
      border-radius: 50%;
      background:
        radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.6), rgba(124, 58, 237, 0.96));
      transform: translateZ(104px);
      box-shadow: 0 0 0 12px rgba(124, 58, 237, 0.16);
    }

    .cavity-lesion {
      left: 36%;
      top: 31%;
      width: 11%;
      height: 11%;
      border-radius: 50%;
      border: 5px solid rgba(107, 33, 168, 0.78);
      background: radial-gradient(circle at 50% 50%, rgba(30, 41, 59, 0.82), rgba(15, 23, 42, 0.96));
      transform: translateZ(112px);
    }

    .ett-tube {
      left: 47.8%;
      top: 2%;
      width: 4%;
      height: 26%;
      border-radius: 999px;
      background: linear-gradient(180deg, rgba(56, 189, 248, 0.9), rgba(37, 99, 235, 0.92));
      transform: translateZ(126px);
      box-shadow: 0 0 0 10px rgba(56, 189, 248, 0.12);
    }

    .ventilator-circuit {
      left: 53%;
      top: 6%;
      width: 18%;
      height: 18%;
      border-top: 6px solid rgba(56, 189, 248, 0.72);
      border-right: 6px solid rgba(56, 189, 248, 0.72);
      border-radius: 0 70% 0 0;
      transform: translateZ(118px);
    }

    .flow-wave {
      left: 60%;
      top: 14%;
      width: 16%;
      height: 5%;
      background: linear-gradient(90deg, rgba(255, 255, 255, 0), rgba(8, 145, 178, 0.92), rgba(255, 255, 255, 0));
      transform: translateZ(132px);
      clip-path: polygon(0% 70%, 12% 70%, 22% 16%, 34% 82%, 48% 28%, 62% 78%, 78% 42%, 100% 42%, 100% 100%, 0% 100%);
      animation: flow 1.6s ease-in-out infinite;
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

    .l1 { left: 14%; top: 20%; }
    .l2 { right: 12%; top: 22%; }
    .l3 { left: 13%; top: 58%; }
    .l4 { right: 12%; top: 62%; }

    .scene-asthma-airway .bronchospasm-ring,
    .scene-asthma-airway .mucus-plug,
    .scene-copd-remodeling .hyperinflation-shell,
    .scene-copd-remodeling .damaged-alveoli,
    .scene-pneumonia-consolidation .consolidation-patch,
    .scene-pneumonia-consolidation .effusion-glow,
    .scene-tb-granuloma .granuloma-node,
    .scene-tb-granuloma .cavity-lesion,
    .scene-ventilator-support .ett-tube,
    .scene-ventilator-support .ventilator-circuit,
    .scene-ventilator-support .flow-wave {
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

    @keyframes pulse-ring {
      0% { transform: translateZ(108px) scale(0.92); opacity: 0.82; }
      100% { transform: translateZ(108px) scale(1.2); opacity: 0.1; }
    }

    @keyframes float-shell {
      0%, 100% { transform: translateZ(20px) scale(1.03); }
      50% { transform: translateZ(20px) scale(1.08); }
    }

    @keyframes flow {
      0%, 100% { transform: translateZ(132px) translateX(0); opacity: 0.72; }
      50% { transform: translateZ(132px) translateX(6px); opacity: 1; }
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
    return scenes[this.activeId] ?? scenes['respiratory-anatomy'];
  }

  private clampZoom(nextZoom: number) {
    return Math.min(Pulmonary3dViewer.maxZoom, Math.max(Pulmonary3dViewer.minZoom, Number(nextZoom.toFixed(2))));
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
    this.tiltX = -8;
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
      case 'asthma-airway':
        return [
          { className: 'l1', text: '氣管與主支氣管' },
          { className: 'l2', text: '收縮中的氣道' },
          { className: 'l3', text: '黏液與小氣道' },
          { className: 'l4', text: '肺泡仍可交換' },
        ];
      case 'copd-remodeling':
        return [
          { className: 'l1', text: '細支氣管塌陷' },
          { className: 'l2', text: '過度充氣輪廓' },
          { className: 'l3', text: '破壞的肺泡' },
          { className: 'l4', text: '氣體滯留區' },
        ];
      case 'pneumonia-consolidation':
        return [
          { className: 'l1', text: '正常導氣區' },
          { className: 'l2', text: '肺葉實變' },
          { className: 'l3', text: '交換面被液體占據' },
          { className: 'l4', text: '胸膜反應區' },
        ];
      case 'tb-granuloma':
        return [
          { className: 'l1', text: '上葉病灶偏好' },
          { className: 'l2', text: '肉芽腫 / 空洞' },
          { className: 'l3', text: '周邊正常肺實質' },
          { className: 'l4', text: '傳播風險提高' },
        ];
      case 'ventilator-support':
        return [
          { className: 'l1', text: '氣管內管' },
          { className: 'l2', text: '呼吸機流路' },
          { className: 'l3', text: '肺泡招募目標' },
          { className: 'l4', text: '同步與做功卸載' },
        ];
      default:
        return [
          { className: 'l1', text: '氣管' },
          { className: 'l2', text: '主支氣管' },
          { className: 'l3', text: '左肺 / 肺葉' },
          { className: 'l4', text: '肺泡交換區' },
        ];
    }
  }

  override render() {
    const scene = this.activeScene;

    return html`
      <div class="shell" style=${`--scene-accent:${scene.accent};`}>
        <div class="header">
          <div class="eyebrow">Interactive Pulmonary 3D</div>
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
                  ?disabled=${this.zoom <= Pulmonary3dViewer.minZoom}
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
                  ?disabled=${this.zoom >= Pulmonary3dViewer.maxZoom}
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
                <div class="airway-column"></div>
                <div class="carina"></div>
                <div class="bronchus-left"></div>
                <div class="bronchus-right"></div>
                <div class="lung-left"></div>
                <div class="lung-right"></div>
                <div class="fissure-left"></div>
                <div class="fissure-right"></div>
                <div class="alveoli-left"></div>
                <div class="alveoli-right"></div>
                <div class="bronchospasm-ring"></div>
                <div class="mucus-plug"></div>
                <div class="hyperinflation-shell"></div>
                <div class="damaged-alveoli"></div>
                <div class="consolidation-patch"></div>
                <div class="effusion-glow"></div>
                <div class="granuloma-node"></div>
                <div class="cavity-lesion"></div>
                <div class="ett-tube"></div>
                <div class="ventilator-circuit"></div>
                <div class="flow-wave"></div>
                ${this.getLabels(scene.id).map(label => html`
                  <div class=${`label ${label.className}`}>${label.text}</div>
                `)}
              </div>
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
              <p class="panel-body">閱讀方式：用滑鼠移動觀察立體層次，使用 Ctrl/Command + 滾輪或手機雙指 pinch 放大。這個模型是為了把病灶層次、力學與解剖位置連起來，不是用來取代正式影像重建。</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
