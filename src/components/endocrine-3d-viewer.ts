import { LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

type SceneId =
  | 'glucose-homeostasis'
  | 'thyroid-axis'
  | 'pituitary-adrenal-axis'
  | 'metabolic-adiposity';

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
  'glucose-homeostasis': {
    id: 'glucose-homeostasis',
    label: '葡萄糖穩態',
    title: '胰臟、肝臟、骨骼肌與脂肪組織的血糖協調',
    summary: '這個場景把胰島 β 細胞 (Beta cell)、肝糖輸出 (Hepatic glucose output)、骨骼肌葡萄糖攝取與脂肪組織胰島素阻抗放到同一個人體截面，幫助理解糖尿病不是只有胰臟出問題。',
    bullets: [
      '胰臟分泌失衡與周邊阻抗會同步惡化。',
      '肝臟是空腹高血糖的重要來源。',
      'SGLT2 與 incretin 類藥物切入的節點不同。',
    ],
    accent: '#f97316',
  },
  'thyroid-axis': {
    id: 'thyroid-axis',
    label: '甲狀腺軸',
    title: '下視丘-垂體-甲狀腺 (HPT axis) 的速度控制系統',
    summary: '利用頸部與蝶鞍區的空間關係，把 TRH-TSH-T4/T3 負回饋、甲狀腺血流與全身代謝加速或減速的視覺線索放在同一個畫面。',
    bullets: [
      'TSH 來自垂體，不等於甲狀腺自己發號施令。',
      'T4 是主要分泌型，T3 是較活躍的周邊效應型。',
      '甲狀腺眼病與單純甲亢不是同一件事。',
    ],
    accent: '#0ea5e9',
  },
  'pituitary-adrenal-axis': {
    id: 'pituitary-adrenal-axis',
    label: '垂體-腎上腺軸',
    title: '垂體、腎上腺皮質與兒茶酚胺壓力回路',
    summary: '同一個模型上同時呈現蝶鞍、腎上腺皮質分層與腎上腺髓質位置，幫助對照 cortisol、aldosterone 與 catecholamine 過多或不足時的受影響區域。',
    bullets: [
      'Addison 病與 secondary adrenal insufficiency 的 ACTH 訊號不同。',
      '原發性醛固酮增多症與 pheochromocytoma 都可表現為高血壓，但路徑不同。',
      '手術前 α-blockade 的順序在 pheochromocytoma 特別重要。',
    ],
    accent: '#8b5cf6',
  },
  'metabolic-adiposity': {
    id: 'metabolic-adiposity',
    label: '內臟脂肪',
    title: '內臟脂肪、肝胰軸與代謝症候群壓力場',
    summary: '這個場景強調內臟脂肪 (Visceral adiposity) 不是被動儲能，而是會透過 adipokines、發炎訊號、脂肪肝與睡眠呼吸中止把整個代謝系統推向高風險狀態。',
    bullets: [
      '腰圍與內臟脂肪分布常比 BMI 更貼近代謝風險。',
      '脂肪肝、OSA、高血壓與高三酸甘油酯常是同一張圖的不同出口。',
      '減重藥與代謝手術影響的是病程，不只是體重數字。',
    ],
    accent: '#10b981',
  },
};

@customElement('endocrine-3d-viewer')
export class Endocrine3dViewer extends LitElement {
  @property({ type: String, attribute: 'initial-scene' }) initialScene: SceneId = 'glucose-homeostasis';
  @state() private activeId: SceneId = 'glucose-homeostasis';
  @state() private tiltX = -12;
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
        radial-gradient(circle at top left, rgba(14, 165, 233, 0.12), transparent 34%),
        radial-gradient(circle at bottom right, rgba(16, 185, 129, 0.1), transparent 32%),
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
        radial-gradient(circle at 50% 7%, rgba(255, 255, 255, 0.95), transparent 42%),
        radial-gradient(circle at 50% 74%, rgba(79, 70, 229, 0.08), transparent 36%),
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
      transition: transform 180ms ease;
    }

    .silhouette,
    .head,
    .neck,
    .brain,
    .pituitary,
    .pituitary-stalk,
    .thyroid,
    .thyroid-glow,
    .pancreas,
    .pancreas-glow,
    .liver,
    .kidney-left,
    .kidney-right,
    .adrenal-left,
    .adrenal-right,
    .muscle-bands,
    .adipose-halo,
    .metabolic-aura,
    .axis-beam,
    .waist-ring,
    .glucose-orbit,
    .glucose-dot {
      position: absolute;
      transform-style: preserve-3d;
    }

    .silhouette {
      inset: 34px 24% 26px;
      border-radius: 180px 180px 120px 120px / 140px 140px 110px 110px;
      background:
        linear-gradient(180deg, rgba(255, 248, 241, 0.94), rgba(250, 240, 229, 0.84) 38%, rgba(236, 223, 212, 0.9) 100%);
      box-shadow:
        inset 0 -12px 28px rgba(120, 53, 15, 0.12),
        inset 0 18px 24px rgba(255, 255, 255, 0.7),
        0 24px 50px rgba(15, 23, 42, 0.12);
      transform: translateZ(36px);
    }

    .head {
      top: 40px;
      left: calc(50% - 72px);
      width: 144px;
      height: 144px;
      border-radius: 50%;
      background:
        radial-gradient(circle at 40% 28%, rgba(255, 255, 255, 0.84), transparent 44%),
        linear-gradient(180deg, rgba(252, 241, 232, 0.96), rgba(239, 223, 208, 0.92));
      box-shadow:
        inset 0 -12px 24px rgba(120, 53, 15, 0.12),
        0 18px 36px rgba(15, 23, 42, 0.12);
      transform: translateZ(58px);
    }

    .neck {
      top: 162px;
      left: calc(50% - 32px);
      width: 64px;
      height: 74px;
      border-radius: 28px;
      background: linear-gradient(180deg, rgba(246, 229, 212, 0.95), rgba(228, 211, 196, 0.9));
      transform: translateZ(42px);
    }

    .brain {
      top: 70px;
      left: calc(50% - 58px);
      width: 116px;
      height: 78px;
      border-radius: 55% 45% 48% 52% / 58% 54% 46% 42%;
      background:
        radial-gradient(circle at 38% 34%, rgba(255, 255, 255, 0.8), transparent 36%),
        linear-gradient(145deg, rgba(248, 191, 211, 0.95), rgba(217, 70, 239, 0.5));
      box-shadow:
        0 14px 28px rgba(168, 85, 247, 0.16),
        inset 0 -8px 16px rgba(131, 24, 67, 0.16);
      transform: translateZ(76px);
      opacity: 0.58;
    }

    .pituitary {
      top: 128px;
      left: calc(50% - 14px);
      width: 28px;
      height: 22px;
      border-radius: 50%;
      background: linear-gradient(180deg, rgba(196, 181, 253, 0.98), rgba(124, 58, 237, 0.74));
      box-shadow: 0 8px 18px rgba(109, 40, 217, 0.25);
      transform: translateZ(82px);
      opacity: 0.7;
    }

    .pituitary-stalk {
      top: 110px;
      left: calc(50% - 3px);
      width: 6px;
      height: 24px;
      border-radius: 999px;
      background: linear-gradient(180deg, rgba(192, 132, 252, 0.88), rgba(124, 58, 237, 0.7));
      transform: translateZ(80px);
      opacity: 0.64;
    }

    .thyroid {
      top: 214px;
      left: calc(50% - 74px);
      width: 148px;
      height: 70px;
      transform: translateZ(94px);
      opacity: 0.62;
    }

    .thyroid::before,
    .thyroid::after {
      content: '';
      position: absolute;
      top: 0;
      width: 58px;
      height: 70px;
      border-radius: 48px 48px 34px 34px / 56px 56px 26px 26px;
      background:
        radial-gradient(circle at 38% 28%, rgba(255, 255, 255, 0.76), transparent 34%),
        linear-gradient(180deg, rgba(251, 146, 60, 0.96), rgba(234, 88, 12, 0.74));
      box-shadow: inset 0 -8px 16px rgba(154, 52, 18, 0.18);
    }

    .thyroid::before {
      left: 16px;
      transform: rotate(8deg);
    }

    .thyroid::after {
      right: 16px;
      transform: rotate(-8deg);
    }

    .thyroid-glow {
      top: 198px;
      left: calc(50% - 98px);
      width: 196px;
      height: 112px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(14, 165, 233, 0.24), transparent 68%);
      transform: translateZ(34px);
      opacity: 0;
      transition: opacity 220ms ease;
    }

    .liver {
      top: 246px;
      left: calc(50% + 10px);
      width: 178px;
      height: 112px;
      border-radius: 60% 36% 42% 52% / 60% 60% 40% 40%;
      background:
        radial-gradient(circle at 36% 26%, rgba(255, 255, 255, 0.24), transparent 30%),
        linear-gradient(145deg, rgba(180, 83, 9, 0.92), rgba(120, 53, 15, 0.88));
      box-shadow:
        0 16px 30px rgba(120, 53, 15, 0.16),
        inset 0 -14px 20px rgba(68, 32, 8, 0.24);
      transform: translateZ(24px) rotate(-10deg);
      opacity: 0.62;
    }

    .pancreas {
      top: 312px;
      left: calc(50% - 116px);
      width: 230px;
      height: 48px;
      border-radius: 34px 28px 26px 32px;
      background:
        radial-gradient(circle at 26% 28%, rgba(255, 255, 255, 0.68), transparent 32%),
        linear-gradient(90deg, rgba(249, 115, 22, 0.82), rgba(251, 191, 36, 0.66), rgba(249, 115, 22, 0.82));
      box-shadow:
        0 14px 26px rgba(249, 115, 22, 0.18),
        inset 0 -8px 12px rgba(154, 52, 18, 0.18);
      transform: translateZ(76px) rotate(-7deg);
      opacity: 0.72;
    }

    .pancreas-glow {
      top: 288px;
      left: calc(50% - 150px);
      width: 300px;
      height: 102px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(251, 146, 60, 0.22), transparent 68%);
      transform: translateZ(30px);
      opacity: 0;
      transition: opacity 220ms ease;
    }

    .kidney-left,
    .kidney-right {
      top: 318px;
      width: 74px;
      height: 96px;
      border-radius: 54% 46% 58% 42% / 48% 54% 46% 52%;
      background:
        radial-gradient(circle at 34% 30%, rgba(255, 255, 255, 0.44), transparent 30%),
        linear-gradient(180deg, rgba(190, 24, 93, 0.76), rgba(136, 19, 55, 0.9));
      box-shadow: inset 0 -12px 20px rgba(80, 7, 36, 0.24);
      opacity: 0.44;
    }

    .kidney-left {
      left: calc(50% - 162px);
      transform: translateZ(10px) rotate(-14deg);
    }

    .kidney-right {
      left: calc(50% + 86px);
      transform: translateZ(10px) rotate(14deg);
    }

    .adrenal-left,
    .adrenal-right {
      top: 300px;
      width: 48px;
      height: 26px;
      border-radius: 52% 48% 42% 58% / 60% 60% 40% 40%;
      background:
        radial-gradient(circle at 34% 28%, rgba(255, 255, 255, 0.64), transparent 30%),
        linear-gradient(180deg, rgba(251, 191, 36, 0.92), rgba(217, 119, 6, 0.82));
      box-shadow: 0 10px 18px rgba(217, 119, 6, 0.2);
      transform: translateZ(54px);
      opacity: 0.58;
    }

    .adrenal-left {
      left: calc(50% - 146px);
      transform: translateZ(54px) rotate(-10deg);
    }

    .adrenal-right {
      left: calc(50% + 100px);
      transform: translateZ(54px) rotate(10deg);
    }

    .muscle-bands {
      inset: 246px 24% 92px;
      background:
        linear-gradient(90deg, transparent 0%, rgba(239, 68, 68, 0.12) 16%, transparent 32%, rgba(239, 68, 68, 0.14) 48%, transparent 64%, rgba(239, 68, 68, 0.12) 82%, transparent 100%);
      mask-image: linear-gradient(180deg, transparent 0%, rgba(15, 23, 42, 0.9) 12%, rgba(15, 23, 42, 0.92) 74%, transparent 100%);
      transform: translateZ(8px);
      opacity: 0.16;
    }

    .adipose-halo {
      inset: 186px 18% 58px;
      border-radius: 44% 44% 38% 38% / 34% 34% 58% 58%;
      background:
        radial-gradient(circle at 50% 36%, rgba(16, 185, 129, 0.14), transparent 36%),
        radial-gradient(circle at 50% 68%, rgba(249, 115, 22, 0.18), transparent 42%);
      filter: blur(10px);
      transform: translateZ(4px);
      opacity: 0.28;
    }

    .metabolic-aura {
      inset: 166px 16% 44px;
      border-radius: 42% 42% 40% 40% / 32% 32% 56% 56%;
      background:
        radial-gradient(circle at 46% 48%, rgba(251, 191, 36, 0.2), transparent 34%),
        radial-gradient(circle at 50% 78%, rgba(239, 68, 68, 0.18), transparent 38%);
      filter: blur(14px);
      transform: translateZ(2px);
      opacity: 0;
      transition: opacity 220ms ease;
    }

    .axis-beam {
      top: 136px;
      left: calc(50% - 6px);
      width: 12px;
      height: 228px;
      border-radius: 999px;
      background:
        linear-gradient(180deg, rgba(168, 85, 247, 0.28), rgba(59, 130, 246, 0.18), rgba(249, 115, 22, 0.26));
      filter: blur(0.2px);
      transform: translateZ(26px);
      opacity: 0;
      transition: opacity 220ms ease;
    }

    .waist-ring {
      top: 326px;
      left: calc(50% - 160px);
      width: 320px;
      height: 124px;
      border-radius: 50%;
      border: 10px solid rgba(16, 185, 129, 0.38);
      box-shadow:
        0 0 0 18px rgba(16, 185, 129, 0.08),
        inset 0 0 0 8px rgba(251, 191, 36, 0.1);
      transform: translateZ(88px) rotateX(76deg);
      opacity: 0;
      transition: opacity 220ms ease;
    }

    .glucose-orbit {
      inset: 244px 22% 88px;
      border-radius: 50%;
      border: 1px dashed rgba(249, 115, 22, 0.34);
      transform: translateZ(70px) rotateX(72deg);
      opacity: 0;
      transition: opacity 220ms ease;
    }

    .glucose-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(255, 255, 255, 0.94), rgba(249, 115, 22, 0.8));
      box-shadow: 0 0 20px rgba(249, 115, 22, 0.28);
      transform: translateZ(108px);
      opacity: 0;
      animation: pulse 2.4s ease-in-out infinite;
      transition: opacity 220ms ease;
    }

    .g1 { top: 286px; left: calc(50% - 132px); animation-delay: 0s; }
    .g2 { top: 346px; left: calc(50% - 42px); animation-delay: 0.4s; }
    .g3 { top: 300px; left: calc(50% + 74px); animation-delay: 0.8s; }
    .g4 { top: 238px; left: calc(50% + 22px); animation-delay: 1.2s; }

    .label {
      position: absolute;
      max-width: 150px;
      padding: 8px 10px;
      border-radius: 14px;
      background: rgba(255, 255, 255, 0.78);
      border: 1px solid rgba(148, 163, 184, 0.28);
      box-shadow: 0 14px 22px rgba(15, 23, 42, 0.08);
      backdrop-filter: blur(10px);
      color: #0f172a;
      font: 700 0.76rem/1.45 ui-sans-serif, -apple-system, BlinkMacSystemFont, sans-serif;
      letter-spacing: 0.02em;
    }

    .scene-glucose-homeostasis .pancreas-glow,
    .scene-glucose-homeostasis .glucose-orbit,
    .scene-glucose-homeostasis .glucose-dot {
      opacity: 1;
    }

    .scene-glucose-homeostasis .pancreas {
      opacity: 0.94;
    }

    .scene-glucose-homeostasis .muscle-bands {
      opacity: 0.28;
    }

    .scene-thyroid-axis .thyroid,
    .scene-thyroid-axis .thyroid-glow {
      opacity: 1;
    }

    .scene-thyroid-axis .brain,
    .scene-thyroid-axis .pituitary,
    .scene-thyroid-axis .pituitary-stalk {
      opacity: 0.92;
    }

    .scene-pituitary-adrenal-axis .pituitary,
    .scene-pituitary-adrenal-axis .pituitary-stalk,
    .scene-pituitary-adrenal-axis .adrenal-left,
    .scene-pituitary-adrenal-axis .adrenal-right,
    .scene-pituitary-adrenal-axis .axis-beam {
      opacity: 1;
    }

    .scene-pituitary-adrenal-axis .brain {
      opacity: 0.76;
    }

    .scene-pituitary-adrenal-axis .kidney-left,
    .scene-pituitary-adrenal-axis .kidney-right {
      opacity: 0.7;
    }

    .scene-metabolic-adiposity .adipose-halo,
    .scene-metabolic-adiposity .metabolic-aura,
    .scene-metabolic-adiposity .waist-ring {
      opacity: 1;
    }

    .scene-metabolic-adiposity .liver {
      opacity: 0.86;
      filter: saturate(1.08);
    }

    .scene-metabolic-adiposity .pancreas {
      opacity: 0.86;
    }

    .scene-glucose-homeostasis .l1 {
      top: 252px;
      left: 42px;
    }

    .scene-glucose-homeostasis .l2 {
      top: 344px;
      right: 48px;
    }

    .scene-glucose-homeostasis .l3 {
      top: 248px;
      right: 42px;
    }

    .scene-glucose-homeostasis .l4 {
      bottom: 52px;
      left: calc(50% - 96px);
    }

    .scene-thyroid-axis .l1 {
      top: 78px;
      left: 44px;
    }

    .scene-thyroid-axis .l2 {
      top: 208px;
      right: 44px;
    }

    .scene-thyroid-axis .l3 {
      top: 90px;
      right: 56px;
    }

    .scene-thyroid-axis .l4 {
      bottom: 68px;
      left: calc(50% - 98px);
    }

    .scene-pituitary-adrenal-axis .l1 {
      top: 88px;
      left: 40px;
    }

    .scene-pituitary-adrenal-axis .l2 {
      top: 286px;
      left: 52px;
    }

    .scene-pituitary-adrenal-axis .l3 {
      top: 286px;
      right: 52px;
    }

    .scene-pituitary-adrenal-axis .l4 {
      bottom: 54px;
      left: calc(50% - 108px);
    }

    .scene-metabolic-adiposity .l1 {
      top: 236px;
      left: 34px;
    }

    .scene-metabolic-adiposity .l2 {
      top: 250px;
      right: 36px;
    }

    .scene-metabolic-adiposity .l3 {
      bottom: 70px;
      right: 68px;
    }

    .scene-metabolic-adiposity .l4 {
      bottom: 52px;
      left: 44px;
    }

    .inspector {
      display: grid;
      gap: 12px;
      align-content: start;
      padding: 14px 0 14px 18px;
    }

    .chip {
      display: inline-flex;
      width: fit-content;
      align-items: center;
      gap: 8px;
      border-radius: 999px;
      padding: 7px 12px;
      font: 700 0.75rem/1 ui-sans-serif, -apple-system, BlinkMacSystemFont, sans-serif;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: white;
      background: color-mix(in srgb, var(--scene-accent) 88%, #0f172a);
      box-shadow: 0 12px 24px color-mix(in srgb, var(--scene-accent) 24%, transparent);
    }

    .note {
      border-radius: 22px;
      border: 1px solid rgba(148, 163, 184, 0.24);
      background:
        linear-gradient(180deg, rgba(255, 255, 255, 0.9), rgba(248, 250, 252, 0.88)),
        radial-gradient(circle at top right, color-mix(in srgb, var(--scene-accent) 12%, white), transparent 38%);
      padding: 16px 18px;
      box-shadow: 0 16px 26px rgba(15, 23, 42, 0.06);
    }

    .panel-title {
      margin: 0 0 10px;
      color: #0f172a;
      font: 700 0.9rem/1.4 ui-sans-serif, -apple-system, BlinkMacSystemFont, sans-serif;
    }

    .panel-body,
    ul {
      margin: 0;
      color: #334155;
      font: 400 0.88rem/1.7 ui-sans-serif, -apple-system, BlinkMacSystemFont, sans-serif;
    }

    ul {
      padding-left: 18px;
    }

    li + li {
      margin-top: 8px;
    }

    @keyframes pulse {
      0%, 100% {
        transform: translateZ(108px) scale(0.88);
      }

      50% {
        transform: translateZ(124px) scale(1.16);
      }
    }

    @media (max-width: 980px) {
      .body {
        grid-template-columns: 1fr;
      }

      .inspector {
        padding: 6px 0 4px;
      }
    }

    @media (max-width: 640px) {
      .stage-shell {
        min-height: 430px;
      }

      .label {
        max-width: 122px;
        font-size: 0.72rem;
      }
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    if (scenes[this.initialScene]) {
      this.activeId = this.initialScene;
    }
  }

  private get activeScene() {
    return scenes[this.activeId];
  }

  private clampZoom(nextZoom: number) {
    return Math.min(Endocrine3dViewer.maxZoom, Math.max(Endocrine3dViewer.minZoom, nextZoom));
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
    this.tiltX = Math.max(-22, Math.min(12, -py * 30 - 7));
  }

  private resetTilt() {
    this.tiltX = -12;
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
      this.tiltX = Math.max(-22, Math.min(12, -py * 30 - 7));
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
      case 'thyroid-axis':
        return [
          { className: 'l1', text: '垂體與下視丘訊號' },
          { className: 'l2', text: '甲狀腺雙葉與峽部' },
          { className: 'l3', text: '全身代謝加速 / 減速' },
          { className: 'l4', text: 'T4 -> T3 周邊轉換' },
        ];
      case 'pituitary-adrenal-axis':
        return [
          { className: 'l1', text: '蝶鞍區與 ACTH 中樞' },
          { className: 'l2', text: '左腎上腺皮質 / 髓質' },
          { className: 'l3', text: '右腎上腺皮質 / 髓質' },
          { className: 'l4', text: 'cortisol / aldosterone / catecholamine' },
        ];
      case 'metabolic-adiposity':
        return [
          { className: 'l1', text: '肝臟脂肪負荷' },
          { className: 'l2', text: '胰臟與胰島負擔' },
          { className: 'l3', text: '腰圍與內臟脂肪圈' },
          { className: 'l4', text: 'OSA / HTN / TG 高風險軸' },
        ];
      default:
        return [
          { className: 'l1', text: '胰臟與 β 細胞' },
          { className: 'l2', text: '骨骼肌攝糖區' },
          { className: 'l3', text: '肝糖輸出' },
          { className: 'l4', text: '循環中的葡萄糖流' },
        ];
    }
  }

  override render() {
    const scene = this.activeScene;

    return html`
      <div class="shell" style=${`--scene-accent:${scene.accent};`}>
        <div class="header">
          <div class="eyebrow">Interactive Endocrine 3D</div>
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
                  ?disabled=${this.zoom <= Endocrine3dViewer.minZoom}
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
                  ?disabled=${this.zoom >= Endocrine3dViewer.maxZoom}
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
                <div class="silhouette"></div>
                <div class="head"></div>
                <div class="neck"></div>
                <div class="brain"></div>
                <div class="pituitary-stalk"></div>
                <div class="pituitary"></div>
                <div class="thyroid-glow"></div>
                <div class="thyroid"></div>
                <div class="liver"></div>
                <div class="pancreas-glow"></div>
                <div class="pancreas"></div>
                <div class="kidney-left"></div>
                <div class="kidney-right"></div>
                <div class="adrenal-left"></div>
                <div class="adrenal-right"></div>
                <div class="muscle-bands"></div>
                <div class="adipose-halo"></div>
                <div class="metabolic-aura"></div>
                <div class="axis-beam"></div>
                <div class="waist-ring"></div>
                <div class="glucose-orbit"></div>
                <div class="glucose-dot g1"></div>
                <div class="glucose-dot g2"></div>
                <div class="glucose-dot g3"></div>
                <div class="glucose-dot g4"></div>
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
              <p class="panel-body">用滑鼠移動觀察立體層次，使用 Ctrl 或 Command 加滾輪縮放；在手機與平板可雙指 pinch 放大。這個模型用來建立器官位置、內分泌軸與病灶範圍感，不取代正式影像檢查、核醫掃描或病理判讀。</p>
            </div>
          </aside>
        </div>
      </div>
    `;
  }
}
