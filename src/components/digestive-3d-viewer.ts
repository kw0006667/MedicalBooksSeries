import { LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

type SceneId =
  | 'digestive-anatomy'
  | 'gerd-reflux'
  | 'ibd-inflammation'
  | 'cirrhosis-portal'
  | 'pancreatitis-inflammation'
  | 'bowel-motility';

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
  'digestive-anatomy': {
    id: 'digestive-anatomy',
    label: '正常構造',
    title: '食道、胃、肝、胰與腸道的立體定位',
    summary: '先把上消化道、肝膽胰與大小腸的空間順序建立起來，後面的逆流、發炎、門脈高壓與腸道運動問題才不會變成零散的名詞堆。',
    bullets: [
      '食道與胃交界決定逆流是否容易發生。',
      '肝門、胰頭與十二指腸在臨床上高度相鄰。',
      '大腸像框架，小腸像中央盤繞交換區。',
    ],
    accent: '#2563eb',
  },
  'gerd-reflux': {
    id: 'gerd-reflux',
    label: 'GERD / PUD',
    title: '胃酸逆流、食道受損與潰瘍形成視角',
    summary: '這個場景把下食道括約肌失守、酸性內容物上衝與胃十二指腸黏膜破口放在同一個視覺系統，幫助區分「逆流」與「潰瘍」其實是不同層次的黏膜傷害。',
    bullets: [
      'GERD 的主戰場在食道下端與 LES。',
      'PUD 的核心是酸-pepsin 與黏膜防禦失衡。',
      '症狀位置相近，不代表病變位置相同。',
    ],
    accent: '#ea580c',
  },
  'ibd-inflammation': {
    id: 'ibd-inflammation',
    label: 'IBD',
    title: '腸黏膜破口、跳躍病灶與全層發炎',
    summary: '把潰瘍性結腸炎 (Ulcerative colitis) 的連續性結腸黏膜病變與克隆氏症 (Crohn disease) 的跳躍性、全層性發炎並排，讓病理層次與臨床表現對得起來。',
    bullets: [
      'UC 偏向結腸黏膜連續性發炎。',
      'Crohn 可從口到肛，常見跳躍病灶與狹窄瘻管。',
      '腸壁受累深度決定併發症型態。',
    ],
    accent: '#0f766e',
  },
  'cirrhosis-portal': {
    id: 'cirrhosis-portal',
    label: '肝硬化',
    title: '肝纖維化、門脈高壓與腹水壓力場',
    summary: '觀察結節化肝臟、門脈阻力與腹水輪廓如何一起出現，這是理解食道靜脈曲張、腹水、肝腦病變與肝腎症候群的重要空間底圖。',
    bullets: [
      '肝硬化不只是肝酵素異常，而是血流路徑被重寫。',
      '門脈阻力上升會把問題推向脾臟、食道與腹腔。',
      '腹水與靜脈曲張是同一張血流動力學地圖的不同出口。',
    ],
    accent: '#7c3aed',
  },
  'pancreatitis-inflammation': {
    id: 'pancreatitis-inflammation',
    label: '胰臟炎',
    title: '胰酶活化、局部水腫與周邊延伸傷害',
    summary: '這個場景聚焦在胰臟前方與後腹腔位置，呈現胰臟炎為何能同時造成劇烈腹痛、腸麻痺、液體外滲與多器官反應。',
    bullets: [
      '胰臟是後腹腔器官，發炎常往周圍脂肪與液體間隙擴散。',
      '病人痛感強，不代表一定是感染；很多是無菌性發炎。',
      '局部病灶可以很快變成全身 SIRS。',
    ],
    accent: '#dc2626',
  },
  'bowel-motility': {
    id: 'bowel-motility',
    label: '腸道症狀',
    title: '腸蠕動、分泌吸收與糞便通行視角',
    summary: '用同一個畫面連結便秘、腹瀉、糞便滯留、分泌性腹瀉與功能性腸症候群常用的生理語言，避免把常見 GI 症狀只當作零碎抱怨。',
    bullets: [
      '便秘問的是推進、含水量與出口協調。',
      '腹瀉問的是分泌、吸收、發炎與滲透壓。',
      '症狀常在同一位病人身上交替，不是固定盒子。',
    ],
    accent: '#0891b2',
  },
};

@customElement('digestive-3d-viewer')
export class Digestive3dViewer extends LitElement {
  @property({ type: String, attribute: 'initial-scene' }) initialScene: SceneId = 'digestive-anatomy';
  @state() private activeId: SceneId = 'digestive-anatomy';
  @state() private tiltX = -10;
  @state() private tiltY = 16;
  @state() private zoom = 1;

  private pinchStartDistance = 0;
  private pinchStartZoom = 1;

  private static readonly minZoom = 0.84;
  private static readonly maxZoom = 1.84;

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
        radial-gradient(circle at top left, rgba(249, 115, 22, 0.12), transparent 34%),
        radial-gradient(circle at bottom right, rgba(14, 165, 233, 0.1), transparent 32%),
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
      min-height: 500px;
      border-radius: 24px;
      overflow: hidden;
      background:
        radial-gradient(circle at 50% 8%, rgba(255, 255, 255, 0.94), transparent 42%),
        radial-gradient(circle at 48% 78%, rgba(249, 115, 22, 0.11), transparent 34%),
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
    .abdomen-cavity,
    .esophagus,
    .stomach,
    .stomach-lining,
    .liver,
    .nodular-liver,
    .portal-vein,
    .pancreas,
    .pancreatic-glow,
    .duodenum,
    .small-bowel,
    .colon-frame,
    .colon-inflammation,
    .reflux-stream,
    .ulcer-crater,
    .ascites-halo,
    .motility-wave,
    .lesion-islands {
      position: absolute;
      transform-style: preserve-3d;
      opacity: 0;
      transition: opacity 220ms ease;
    }

    .torso {
      inset: 9% 18% 5%;
      border-radius: 38% 38% 26% 26% / 16% 16% 24% 24%;
      background:
        linear-gradient(180deg, rgba(226, 190, 166, 0.58), rgba(196, 154, 128, 0.5));
      box-shadow:
        inset 0 0 0 1px rgba(255, 255, 255, 0.45),
        inset 0 -18px 36px rgba(120, 53, 15, 0.1);
      transform: translateZ(6px);
      opacity: 1;
    }

    .abdomen-cavity {
      inset: 14% 24% 10%;
      border-radius: 34% 34% 28% 28% / 18% 18% 28% 28%;
      background:
        radial-gradient(circle at 50% 24%, rgba(255, 255, 255, 0.76), transparent 28%),
        linear-gradient(180deg, rgba(255, 247, 237, 0.9), rgba(255, 237, 213, 0.76));
      border: 1px solid rgba(234, 88, 12, 0.12);
      box-shadow: inset 0 0 40px rgba(148, 163, 184, 0.12);
      transform: translateZ(18px);
      opacity: 1;
    }

    .esophagus {
      left: 48.5%;
      top: 10%;
      width: 4%;
      height: 22%;
      border-radius: 999px;
      background: linear-gradient(180deg, rgba(244, 196, 158, 0.98), rgba(229, 160, 114, 0.96));
      box-shadow: 0 0 0 10px rgba(251, 146, 60, 0.08);
      transform: translateZ(112px);
      opacity: 1;
    }

    .stomach {
      left: 41%;
      top: 24%;
      width: 22%;
      height: 22%;
      border-radius: 44% 58% 54% 40% / 38% 44% 56% 52%;
      background:
        radial-gradient(circle at 34% 30%, rgba(255, 237, 213, 0.84), rgba(234, 88, 12, 0.9) 70%);
      box-shadow: inset -14px -12px 24px rgba(124, 45, 18, 0.18);
      transform: translateZ(118px) rotate(-14deg);
      opacity: 1;
    }

    .stomach-lining {
      left: 43%;
      top: 27%;
      width: 17%;
      height: 16%;
      border-radius: 44% 54% 54% 42% / 36% 40% 54% 54%;
      background:
        radial-gradient(circle at 50% 50%, rgba(251, 146, 60, 0.9), rgba(239, 68, 68, 0.46));
      transform: translateZ(126px) rotate(-12deg);
    }

    .liver {
      left: 27%;
      top: 20%;
      width: 30%;
      height: 20%;
      border-radius: 24% 48% 34% 28% / 34% 44% 22% 20%;
      background:
        linear-gradient(135deg, rgba(153, 27, 27, 0.88), rgba(127, 29, 29, 0.98));
      box-shadow: inset -18px -14px 28px rgba(69, 10, 10, 0.22);
      transform: translateZ(104px) rotate(-6deg);
      opacity: 1;
    }

    .nodular-liver {
      left: 27%;
      top: 20%;
      width: 30%;
      height: 20%;
      border-radius: 26% 44% 30% 28% / 36% 46% 24% 22%;
      background:
        radial-gradient(circle at 16% 38%, rgba(251, 191, 36, 0.26), transparent 12%),
        radial-gradient(circle at 36% 46%, rgba(251, 191, 36, 0.28), transparent 10%),
        radial-gradient(circle at 58% 34%, rgba(251, 191, 36, 0.24), transparent 12%),
        radial-gradient(circle at 74% 58%, rgba(251, 191, 36, 0.26), transparent 11%),
        linear-gradient(135deg, rgba(126, 34, 206, 0.28), rgba(153, 27, 27, 0.26));
      transform: translateZ(110px) rotate(-6deg);
      box-shadow: 0 0 0 6px rgba(124, 58, 237, 0.16);
    }

    .portal-vein {
      left: 45%;
      top: 22%;
      width: 10%;
      height: 24%;
      border-left: 6px solid rgba(37, 99, 235, 0.86);
      border-bottom: 6px solid rgba(37, 99, 235, 0.86);
      border-radius: 0 0 0 42px;
      transform: translateZ(134px) rotate(2deg);
      box-shadow: 0 0 0 10px rgba(37, 99, 235, 0.1);
    }

    .pancreas {
      left: 40%;
      top: 40%;
      width: 24%;
      height: 9%;
      border-radius: 48% 54% 50% 44% / 62% 58% 44% 40%;
      background:
        linear-gradient(90deg, rgba(245, 158, 11, 0.88), rgba(249, 115, 22, 0.92));
      box-shadow: inset -12px -10px 18px rgba(154, 52, 18, 0.18);
      transform: translateZ(122px) rotate(-3deg);
      opacity: 1;
    }

    .pancreatic-glow {
      left: 38%;
      top: 36%;
      width: 28%;
      height: 17%;
      border-radius: 48%;
      background: radial-gradient(circle at 50% 50%, rgba(248, 113, 113, 0.6), rgba(239, 68, 68, 0.08));
      filter: blur(10px);
      transform: translateZ(112px);
    }

    .duodenum {
      left: 56%;
      top: 32%;
      width: 12%;
      height: 18%;
      border: 7px solid rgba(250, 204, 21, 0.76);
      border-left: none;
      border-radius: 0 46% 46% 0;
      transform: translateZ(96px);
      opacity: 1;
    }

    .small-bowel {
      left: 35%;
      top: 49%;
      width: 30%;
      height: 21%;
      background:
        radial-gradient(circle at 18% 30%, rgba(255, 255, 255, 0.5), transparent 10%),
        repeating-radial-gradient(circle at 50% 50%, rgba(251, 191, 36, 0.24) 0 12px, rgba(245, 158, 11, 0.18) 12px 22px);
      clip-path: path('M 35 14 C 12 22, 12 48, 36 56 C 56 62, 64 82, 40 90 C 20 96, 16 118, 40 124 C 66 132, 86 116, 80 96 C 74 78, 84 58, 108 60 C 132 62, 140 86, 126 104 C 114 118, 118 140, 142 146 C 168 152, 182 132, 176 114 C 170 96, 178 76, 198 78 C 222 80, 232 104, 220 124 C 210 142, 216 164, 238 170 L 238 194 L 32 194 Z');
      border-radius: 22px;
      transform: translateZ(82px) rotate(1deg);
      opacity: 0.92;
    }

    .colon-frame {
      left: 31%;
      top: 46%;
      width: 38%;
      height: 28%;
      border: 12px solid rgba(14, 116, 144, 0.82);
      border-radius: 18% 18% 22% 22% / 12% 12% 20% 20%;
      box-shadow: inset 0 0 0 12px rgba(255, 255, 255, 0.06);
      transform: translateZ(132px);
      opacity: 1;
    }

    .colon-inflammation {
      left: 30.5%;
      top: 45.5%;
      width: 39%;
      height: 29%;
      border: 14px solid rgba(239, 68, 68, 0.78);
      border-radius: 18% 18% 22% 22% / 12% 12% 20% 20%;
      box-shadow:
        0 0 0 10px rgba(239, 68, 68, 0.1),
        inset 0 0 24px rgba(254, 202, 202, 0.28);
      transform: translateZ(140px);
    }

    .lesion-islands {
      left: 43%;
      top: 50%;
      width: 20%;
      height: 18%;
      background:
        radial-gradient(circle at 16% 26%, rgba(239, 68, 68, 0.9), transparent 13%),
        radial-gradient(circle at 46% 42%, rgba(249, 115, 22, 0.88), transparent 13%),
        radial-gradient(circle at 70% 24%, rgba(239, 68, 68, 0.88), transparent 12%),
        radial-gradient(circle at 26% 74%, rgba(249, 115, 22, 0.84), transparent 12%),
        radial-gradient(circle at 72% 72%, rgba(239, 68, 68, 0.86), transparent 12%);
      transform: translateZ(136px);
    }

    .reflux-stream {
      left: 47.3%;
      top: 12%;
      width: 6%;
      height: 20%;
      background: linear-gradient(180deg, rgba(255, 255, 255, 0), rgba(251, 146, 60, 0.86), rgba(239, 68, 68, 0.92));
      clip-path: polygon(45% 0%, 70% 18%, 58% 34%, 78% 52%, 40% 74%, 68% 100%, 18% 100%, 30% 76%, 12% 56%, 36% 36%, 24% 18%);
      transform: translateZ(148px);
      animation: rise 1.7s ease-in-out infinite;
    }

    .ulcer-crater {
      left: 49%;
      top: 33%;
      width: 6%;
      height: 6%;
      border-radius: 50%;
      background: radial-gradient(circle at 50% 50%, rgba(30, 41, 59, 0.94), rgba(127, 29, 29, 0.6));
      box-shadow: 0 0 0 8px rgba(239, 68, 68, 0.16);
      transform: translateZ(150px);
    }

    .ascites-halo {
      left: 29%;
      top: 52%;
      width: 42%;
      height: 24%;
      border-radius: 46% 46% 50% 50% / 36% 36% 54% 54%;
      background: radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.34), rgba(14, 165, 233, 0.08));
      filter: blur(10px);
      transform: translateZ(42px);
      animation: floatHalo 2.6s ease-in-out infinite;
    }

    .motility-wave {
      left: 31%;
      top: 58%;
      width: 38%;
      height: 8%;
      background: linear-gradient(90deg, rgba(255, 255, 255, 0), rgba(8, 145, 178, 0.96), rgba(255, 255, 255, 0));
      clip-path: polygon(0% 70%, 10% 70%, 18% 16%, 28% 80%, 38% 30%, 50% 82%, 62% 42%, 72% 74%, 84% 30%, 100% 30%, 100% 100%, 0% 100%);
      transform: translateZ(158px);
      animation: flow 1.5s ease-in-out infinite;
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
      transform: translateZ(172px);
      box-shadow: 0 10px 22px rgba(15, 23, 42, 0.08);
    }

    .l1 { left: 14%; top: 20%; }
    .l2 { right: 11%; top: 24%; }
    .l3 { left: 12%; top: 58%; }
    .l4 { right: 12%; top: 62%; }

    .scene-gerd-reflux .stomach-lining,
    .scene-gerd-reflux .reflux-stream,
    .scene-gerd-reflux .ulcer-crater,
    .scene-ibd-inflammation .colon-inflammation,
    .scene-ibd-inflammation .lesion-islands,
    .scene-cirrhosis-portal .nodular-liver,
    .scene-cirrhosis-portal .portal-vein,
    .scene-cirrhosis-portal .ascites-halo,
    .scene-pancreatitis-inflammation .pancreatic-glow,
    .scene-pancreatitis-inflammation .ascites-halo,
    .scene-bowel-motility .motility-wave,
    .scene-bowel-motility .colon-inflammation {
      opacity: 1;
    }

    .scene-bowel-motility .colon-inflammation {
      opacity: 0.34;
      border-color: rgba(8, 145, 178, 0.5);
      box-shadow: 0 0 0 10px rgba(8, 145, 178, 0.08);
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

    @keyframes rise {
      0%, 100% { transform: translateZ(148px) translateY(0); opacity: 0.74; }
      50% { transform: translateZ(148px) translateY(-6px); opacity: 1; }
    }

    @keyframes flow {
      0%, 100% { transform: translateZ(158px) translateX(-4px); opacity: 0.72; }
      50% { transform: translateZ(158px) translateX(8px); opacity: 1; }
    }

    @keyframes floatHalo {
      0%, 100% { transform: translateZ(42px) scale(1.02); }
      50% { transform: translateZ(42px) scale(1.08); }
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
    return scenes[this.activeId] ?? scenes['digestive-anatomy'];
  }

  private clampZoom(nextZoom: number) {
    return Math.min(Digestive3dViewer.maxZoom, Math.max(Digestive3dViewer.minZoom, Number(nextZoom.toFixed(2))));
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
      case 'gerd-reflux':
        return [
          { className: 'l1', text: '食道下端與 LES' },
          { className: 'l2', text: '胃酸逆流軌跡' },
          { className: 'l3', text: '胃竇 / 十二指腸近端' },
          { className: 'l4', text: '潰瘍與黏膜破口' },
        ];
      case 'ibd-inflammation':
        return [
          { className: 'l1', text: '右側結腸 / 末端迴腸' },
          { className: 'l2', text: '跳躍病灶想像' },
          { className: 'l3', text: '連續性結腸發炎' },
          { className: 'l4', text: '腸壁全層受累風險' },
        ];
      case 'cirrhosis-portal':
        return [
          { className: 'l1', text: '結節化肝臟' },
          { className: 'l2', text: '門脈阻力上升' },
          { className: 'l3', text: '腹水壓力場' },
          { className: 'l4', text: '腸肝循環改寫' },
        ];
      case 'pancreatitis-inflammation':
        return [
          { className: 'l1', text: '胃與十二指腸相鄰' },
          { className: 'l2', text: '發炎中的胰臟' },
          { className: 'l3', text: '後腹腔液體外滲' },
          { className: 'l4', text: '腸麻痺與痛覺來源' },
        ];
      case 'bowel-motility':
        return [
          { className: 'l1', text: '近端大腸推進' },
          { className: 'l2', text: '小腸吸收區' },
          { className: 'l3', text: '乙狀結腸 / 直腸出口' },
          { className: 'l4', text: '水分與蠕動平衡' },
        ];
      default:
        return [
          { className: 'l1', text: '肝膽胰上腹區' },
          { className: 'l2', text: '食道胃交界' },
          { className: 'l3', text: '小腸盤繞區' },
          { className: 'l4', text: '結腸框架' },
        ];
    }
  }

  override render() {
    const scene = this.activeScene;

    return html`
      <div class="shell" style=${`--scene-accent:${scene.accent};`}>
        <div class="header">
          <div class="eyebrow">Interactive Digestive 3D</div>
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
                  ?disabled=${this.zoom <= Digestive3dViewer.minZoom}
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
                  ?disabled=${this.zoom >= Digestive3dViewer.maxZoom}
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
                <div class="abdomen-cavity"></div>
                <div class="esophagus"></div>
                <div class="stomach"></div>
                <div class="stomach-lining"></div>
                <div class="liver"></div>
                <div class="nodular-liver"></div>
                <div class="portal-vein"></div>
                <div class="pancreas"></div>
                <div class="pancreatic-glow"></div>
                <div class="duodenum"></div>
                <div class="small-bowel"></div>
                <div class="colon-frame"></div>
                <div class="colon-inflammation"></div>
                <div class="lesion-islands"></div>
                <div class="reflux-stream"></div>
                <div class="ulcer-crater"></div>
                <div class="ascites-halo"></div>
                <div class="motility-wave"></div>
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
              <p class="panel-body">用滑鼠移動觀察立體層次，使用 Ctrl 或 Command 加滾輪縮放；在手機和平板可雙指 pinch 放大。這個模型用來建立器官與病灶範圍感，不取代正式影像重建、內視鏡或病理切片。</p>
            </div>
          </aside>
        </div>
      </div>
    `;
  }
}
