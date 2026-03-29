import { LitElement, css, html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';

type Mode = {
  id: string;
  label: string;
  summary: string;
  bullets: string[];
};

type DiagramDefinition = {
  title: string;
  caption: string;
  modes: Mode[];
  render: (ctx: CanvasRenderingContext2D, width: number, height: number, modeId: string) => void;
};

type Point = { x: number; y: number };

const palette = {
  blue: '#2563eb',
  indigo: '#4f46e5',
  sky: '#0ea5e9',
  cyan: '#0891b2',
  teal: '#0f766e',
  green: '#059669',
  emerald: '#10b981',
  amber: '#d97706',
  orange: '#ea580c',
  red: '#dc2626',
  rose: '#e11d48',
  purple: '#7c3aed',
  slate: '#334155',
  stone: '#57534e',
  gray: '#64748b',
  pale: '#f8fafc',
  line: '#cbd5e1',
  surface: '#ffffff',
};

function roundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius = 18,
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

function fillCard(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  color: string,
  title: string,
  subtitle: string,
) {
  ctx.save();
  roundedRect(ctx, x, y, width, height, 18);
  ctx.fillStyle = color;
  ctx.globalAlpha = 0.1;
  ctx.fill();
  ctx.globalAlpha = 1;
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = color;
  ctx.stroke();

  ctx.fillStyle = '#0f172a';
  ctx.font = '700 15px ui-sans-serif, -apple-system, BlinkMacSystemFont, sans-serif';
  ctx.fillText(title, x + 16, y + 24);
  wrapText(ctx, subtitle, x + 16, y + 48, width - 32, 18, '#334155', '13px ui-sans-serif, -apple-system, BlinkMacSystemFont, sans-serif');
  ctx.restore();
}

function arrow(ctx: CanvasRenderingContext2D, from: Point, to: Point, color = palette.slate) {
  const angle = Math.atan2(to.y - from.y, to.x - from.x);
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(from.x, from.y);
  ctx.lineTo(to.x, to.y);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(to.x, to.y);
  ctx.lineTo(to.x - 10 * Math.cos(angle - Math.PI / 6), to.y - 10 * Math.sin(angle - Math.PI / 6));
  ctx.lineTo(to.x - 10 * Math.cos(angle + Math.PI / 6), to.y - 10 * Math.sin(angle + Math.PI / 6));
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
  ctx.restore();
}

function connector(ctx: CanvasRenderingContext2D, points: Point[], color = palette.line) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.setLineDash([8, 8]);
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i += 1) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.stroke();
  ctx.restore();
}

function circleNode(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  fill: string,
  title: string,
  subtitle = '',
) {
  ctx.save();
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = fill;
  ctx.globalAlpha = 0.14;
  ctx.fill();
  ctx.globalAlpha = 1;
  ctx.lineWidth = 2;
  ctx.strokeStyle = fill;
  ctx.stroke();
  ctx.fillStyle = '#0f172a';
  ctx.textAlign = 'center';
  ctx.font = '700 14px ui-sans-serif, -apple-system, BlinkMacSystemFont, sans-serif';
  ctx.fillText(title, x, y - 2);
  if (subtitle) {
    ctx.fillStyle = '#334155';
    ctx.font = '12px ui-sans-serif, -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText(subtitle, x, y + 16);
  }
  ctx.restore();
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  color: string,
  font: string,
) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.font = font;
  const words = text.match(/[\u4E00-\u9FFF]|[A-Za-z0-9+/.-]+|\s+|./g) ?? [text];
  let line = '';
  let lineY = y;
  for (const word of words) {
    const segment = /^\s+$/.test(word) ? word : word;
    const test = `${line}${segment}`;
    if (ctx.measureText(test).width > maxWidth && line.trim()) {
      ctx.fillText(line, x, lineY);
      line = segment.trimStart();
      lineY += lineHeight;
    } else {
      line = test;
    }
  }
  if (line) {
    ctx.fillText(line, x, lineY);
  }
  ctx.restore();
}

function label(ctx: CanvasRenderingContext2D, x: number, y: number, text: string, color: string) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.font = '700 12px ui-sans-serif, -apple-system, BlinkMacSystemFont, sans-serif';
  ctx.fillText(text, x, y);
  ctx.restore();
}

function pill(ctx: CanvasRenderingContext2D, x: number, y: number, text: string, fill: string) {
  ctx.save();
  ctx.font = '700 12px ui-sans-serif, -apple-system, BlinkMacSystemFont, sans-serif';
  const width = ctx.measureText(text).width + 22;
  roundedRect(ctx, x, y, width, 28, 14);
  ctx.fillStyle = fill;
  ctx.globalAlpha = 0.12;
  ctx.fill();
  ctx.globalAlpha = 1;
  ctx.strokeStyle = fill;
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.fillStyle = '#0f172a';
  ctx.fillText(text, x + 11, y + 18);
  ctx.restore();
}

function drawClinicalCycle(ctx: CanvasRenderingContext2D, width: number, height: number, modeId: string) {
  const midY = height / 2;
  if (modeId === 'care-flow') {
    const cards = [
      ['主訴與病史', 'Chief complaint, HPI, 用藥史、過敏史與社會背景'],
      ['理學檢查', 'Vital signs, focused exam, red flags'],
      ['檢查與判讀', 'Laboratory, imaging, pathology, bedside tests'],
      ['診斷與處置', 'Problem list, differential diagnosis, treatment goals'],
      ['追蹤與轉銜', 'Monitoring, discharge, medication reconciliation'],
    ];
    cards.forEach(([title, subtitle], index) => {
      const x = 34 + index * ((width - 68) / 5);
      fillCard(ctx, x, midY - 80, 134, 160, [palette.blue, palette.teal, palette.purple, palette.red, palette.green][index], title, subtitle);
      if (index < cards.length - 1) {
        arrow(ctx, { x: x + 134, y: midY }, { x: x + ((width - 68) / 5), y: midY }, palette.gray);
      }
    });
  } else if (modeId === 'diagnostic-loop') {
    circleNode(ctx, width * 0.2, midY, 56, palette.blue, '資料蒐集', 'History');
    circleNode(ctx, width * 0.5, height * 0.24, 56, palette.purple, '問題表述', 'Problem representation');
    circleNode(ctx, width * 0.8, midY, 56, palette.orange, '鑑別診斷', 'Differential');
    circleNode(ctx, width * 0.5, height * 0.76, 56, palette.green, '驗證與修正', 'Reassess');
    arrow(ctx, { x: width * 0.26, y: midY - 18 }, { x: width * 0.44, y: height * 0.3 }, palette.gray);
    arrow(ctx, { x: width * 0.56, y: height * 0.3 }, { x: width * 0.74, y: midY - 18 }, palette.gray);
    arrow(ctx, { x: width * 0.74, y: midY + 18 }, { x: width * 0.56, y: height * 0.7 }, palette.gray);
    arrow(ctx, { x: width * 0.44, y: height * 0.7 }, { x: width * 0.26, y: midY + 18 }, palette.gray);
    pill(ctx, 42, 32, '不是一次猜中，而是逐步收斂', palette.indigo);
  } else {
    fillCard(ctx, 50, 60, 170, 118, palette.blue, '醫師 (Physician)', '整合病史、理學檢查與鑑別診斷，建立治療與追蹤目標。');
    fillCard(ctx, width - 220, 60, 170, 118, palette.green, '藥師 (Pharmacist)', '評估適應症、劑量、安全性、交互作用與病人教育。');
    fillCard(ctx, 50, height - 178, 170, 118, palette.teal, '護理師 (Nurse)', '監測症狀、執行照護、衛教與病人回饋。');
    fillCard(ctx, width - 220, height - 178, 170, 118, palette.orange, '其他專業', '呼吸治療、營養、復健、社工與心理支持。');
    circleNode(ctx, width / 2, height / 2, 74, palette.rose, '病人與家屬', 'Shared decision making');
    connector(ctx, [{ x: 220, y: 118 }, { x: width / 2 - 74, y: height / 2 - 36 }], palette.blue);
    connector(ctx, [{ x: width - 220, y: 118 }, { x: width / 2 + 74, y: height / 2 - 36 }], palette.green);
    connector(ctx, [{ x: 220, y: height - 118 }, { x: width / 2 - 74, y: height / 2 + 36 }], palette.teal);
    connector(ctx, [{ x: width - 220, y: height - 118 }, { x: width / 2 + 74, y: height / 2 + 36 }], palette.orange);
  }
}

function drawMedicalLanguage(ctx: CanvasRenderingContext2D, width: number, height: number, modeId: string) {
  if (modeId === 'term-builder') {
    fillCard(ctx, 42, 84, 160, 100, palette.blue, '字首 Prefix', 'hyper-, hypo-, brady-, tachy- 說明程度與方向');
    fillCard(ctx, width / 2 - 80, 52, 160, 164, palette.purple, '字根 Root', 'cardi/o, hepat/o, neur/o, hemat/o 決定器官或核心概念');
    fillCard(ctx, width - 202, 84, 160, 100, palette.green, '字尾 Suffix', '-itis, -emia, -oma, -logy 定義性質或狀態');
    arrow(ctx, { x: 202, y: 134 }, { x: width / 2 - 80, y: 134 }, palette.gray);
    arrow(ctx, { x: width / 2 + 80, y: 134 }, { x: width - 202, y: 134 }, palette.gray);
    pill(ctx, width / 2 - 94, height - 90, 'tachy + cardi + ia = tachycardia', palette.orange);
  } else if (modeId === 'abg') {
    fillCard(ctx, 40, 58, 180, 120, palette.red, 'pH', '先問酸血症 (acidemia) 還是鹼血症 (alkalemia)');
    fillCard(ctx, 270, 58, 180, 120, palette.blue, 'PaCO2', '呼吸成分，方向與 pH 是否一致');
    fillCard(ctx, width - 220, 58, 180, 120, palette.green, 'HCO3-', '代謝成分，判斷是否有代償');
    arrow(ctx, { x: 220, y: 118 }, { x: 270, y: 118 }, palette.gray);
    arrow(ctx, { x: 450, y: 118 }, { x: width - 220, y: 118 }, palette.gray);
    fillCard(ctx, width / 2 - 110, height - 170, 220, 112, palette.purple, '最後一步', '確認代償是否合理，若不合理要懷疑混合性酸鹼失衡。');
  } else {
    fillCard(ctx, 54, 68, 188, 120, palette.blue, '單一數值', '落在 reference range 不等於病人正常。');
    fillCard(ctx, width / 2 - 94, 40, 188, 176, palette.orange, '趨勢', '連續數值的升降幅度、速度與臨床情境常比一次性數值更重要。');
    fillCard(ctx, width - 242, 68, 188, 120, palette.green, '單位與方法', 'mg/dL vs mmol/L、不同 assay 與採血條件會改變解讀。');
    arrow(ctx, { x: 242, y: 128 }, { x: width / 2 - 94, y: 128 }, palette.gray);
    arrow(ctx, { x: width / 2 + 94, y: 128 }, { x: width - 242, y: 128 }, palette.gray);
    pill(ctx, width / 2 - 102, height - 88, '先問：這個結果是否與病人現在的樣子相符？', palette.red);
  }
}

function drawCellSignal(ctx: CanvasRenderingContext2D, width: number, height: number, modeId: string) {
  if (modeId === 'membrane') {
    ctx.save();
    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(width * 0.18, 70, width * 0.64, 24);
    ctx.fillRect(width * 0.18, 138, width * 0.64, 24);
    for (let i = 0; i < 8; i += 1) {
      const x = width * 0.2 + i * 58;
      circleNode(ctx, x, 108, 12, palette.indigo, '', '');
    }
    fillCard(ctx, 70, 220, 170, 100, palette.blue, '通道蛋白', 'Channel protein: 讓離子依電化學梯度通過');
    fillCard(ctx, width / 2 - 85, 220, 170, 100, palette.green, '載體蛋白', 'Carrier protein: 透過構形改變搬運葡萄糖等分子');
    fillCard(ctx, width - 240, 220, 170, 100, palette.orange, '幫浦', 'Pump: 消耗 ATP 逆濃度梯度運輸，例如 Na+/K+-ATPase');
    label(ctx, 56, 60, '細胞外 Extracellular', palette.gray);
    label(ctx, 56, 188, '細胞內 Intracellular', palette.gray);
    ctx.restore();
  } else if (modeId === 'signaling') {
    circleNode(ctx, 110, height / 2, 48, palette.blue, '配體', 'Ligand');
    fillCard(ctx, 220, height / 2 - 54, 180, 108, palette.purple, '受體 Receptor', 'GPCR、RTK、ion channel、nuclear receptor');
    fillCard(ctx, 460, 62, 180, 100, palette.green, '第二信使', 'cAMP, IP3, DAG, Ca2+ 放大訊號');
    fillCard(ctx, 460, 220, 180, 100, palette.orange, '轉錄反應', '啟動或抑制 gene expression，改變細胞表型');
    arrow(ctx, { x: 158, y: height / 2 }, { x: 220, y: height / 2 }, palette.gray);
    arrow(ctx, { x: 400, y: height / 2 - 10 }, { x: 460, y: 112 }, palette.gray);
    arrow(ctx, { x: 400, y: height / 2 + 10 }, { x: 460, y: 270 }, palette.gray);
  } else {
    fillCard(ctx, 42, 90, 180, 118, palette.red, '壞死 Necrosis', 'ATP 耗竭、膜破裂、發炎強，常見於急性缺血與毒性損傷');
    fillCard(ctx, width / 2 - 90, 42, 180, 150, palette.blue, '凋亡 Apoptosis', '經 caspase 啟動的程式化死亡，膜完整、較少發炎');
    fillCard(ctx, width - 222, 90, 180, 118, palette.green, '自噬 Autophagy', '清除受損胞器，適度有保護性，過度時也可導致死亡');
    connector(ctx, [{ x: 222, y: 150 }, { x: width / 2 - 90, y: 118 }], palette.gray);
    connector(ctx, [{ x: width / 2 + 90, y: 118 }, { x: width - 222, y: 150 }], palette.gray);
    pill(ctx, width / 2 - 116, height - 80, '壓力大小與持續時間決定細胞命運', palette.purple);
  }
}

function drawTissueMap(ctx: CanvasRenderingContext2D, width: number, height: number, modeId: string) {
  if (modeId === 'tissue-types') {
    fillCard(ctx, 40, 50, 170, 120, palette.blue, '上皮組織', '保護、分泌、吸收；注意極性、緊密連結與基底膜');
    fillCard(ctx, width - 210, 50, 170, 120, palette.teal, '結締組織', '膠原、彈性纖維、基質與血管支撐器官結構');
    fillCard(ctx, 40, height - 170, 170, 120, palette.red, '肌肉組織', '骨骼肌、心肌、平滑肌，負責收縮與推進');
    fillCard(ctx, width - 210, height - 170, 170, 120, palette.purple, '神經組織', '神經元與膠細胞組成訊號網路');
    circleNode(ctx, width / 2, height / 2, 72, palette.orange, '器官', '由多種組織協同');
    connector(ctx, [{ x: 210, y: 110 }, { x: width / 2 - 72, y: height / 2 - 42 }], palette.gray);
    connector(ctx, [{ x: width - 210, y: 110 }, { x: width / 2 + 72, y: height / 2 - 42 }], palette.gray);
    connector(ctx, [{ x: 210, y: height - 110 }, { x: width / 2 - 72, y: height / 2 + 42 }], palette.gray);
    connector(ctx, [{ x: width - 210, y: height - 110 }, { x: width / 2 + 72, y: height / 2 + 42 }], palette.gray);
  } else if (modeId === 'organ-level') {
    fillCard(ctx, 42, 72, 220, 120, palette.blue, '微觀結構', '例如腎小球、肺泡、肝小葉，負責特定交換與代謝功能');
    fillCard(ctx, width / 2 - 110, 220, 220, 120, palette.purple, '中觀單位', '小葉、腺泡、功能柱，是病理變化最常被辨認的層級');
    fillCard(ctx, width - 262, 72, 220, 120, palette.green, '器官整體', '器官的灌流、神經支配與機械結構決定臨床表現');
    arrow(ctx, { x: 262, y: 132 }, { x: width / 2 - 110, y: 260 }, palette.gray);
    arrow(ctx, { x: width - 262, y: 132 }, { x: width / 2 + 110, y: 260 }, palette.gray);
  } else {
    fillCard(ctx, 42, 72, 160, 100, palette.red, '正常', '細胞排列規則、核大小一致、層次清楚');
    fillCard(ctx, 232, 72, 160, 100, palette.orange, '適應', '萎縮、肥大、增生、化生，多為可逆改變');
    fillCard(ctx, 422, 72, 160, 100, palette.purple, '異型增生', '核染色深、極性紊亂、核分裂增多');
    fillCard(ctx, width - 202, 72, 160, 100, palette.red, '癌', '突破基底膜、浸潤與轉移能力');
    arrow(ctx, { x: 202, y: 122 }, { x: 232, y: 122 }, palette.gray);
    arrow(ctx, { x: 392, y: 122 }, { x: 422, y: 122 }, palette.gray);
    arrow(ctx, { x: 582, y: 122 }, { x: width - 202, y: 122 }, palette.gray);
    pill(ctx, width / 2 - 102, height - 80, '形態變化通常反映生物學行為', palette.indigo);
  }
}

function drawHomeostasis(ctx: CanvasRenderingContext2D, width: number, height: number, modeId: string) {
  if (modeId === 'feedback') {
    circleNode(ctx, width * 0.18, height / 2, 50, palette.blue, '感受器', 'Sensor');
    circleNode(ctx, width * 0.44, height / 2, 54, palette.purple, '整合中心', 'Integrator');
    circleNode(ctx, width * 0.72, height / 2, 50, palette.green, '效應器', 'Effector');
    fillCard(ctx, width - 190, height / 2 - 52, 140, 104, palette.orange, '變項', '血壓、血糖、滲透壓、體溫等');
    arrow(ctx, { x: width * 0.24, y: height / 2 }, { x: width * 0.38, y: height / 2 }, palette.gray);
    arrow(ctx, { x: width * 0.5, y: height / 2 }, { x: width * 0.66, y: height / 2 }, palette.gray);
    arrow(ctx, { x: width * 0.78, y: height / 2 - 18 }, { x: width - 190, y: height / 2 - 18 }, palette.gray);
    arrow(ctx, { x: width - 120, y: height / 2 + 52 }, { x: width * 0.18, y: height / 2 + 52 }, palette.red);
    pill(ctx, 40, 48, '負回饋 Negative feedback 最常見', palette.blue);
  } else if (modeId === 'fluid-shift') {
    fillCard(ctx, 50, 70, 180, 118, palette.blue, '血管內', 'sodium, albumin, hydrostatic pressure');
    fillCard(ctx, width / 2 - 90, 70, 180, 118, palette.teal, '組織間液', 'edema 形成的主要空間');
    fillCard(ctx, width - 230, 70, 180, 118, palette.purple, '細胞內', '由鈉鉀幫浦與滲透壓維持體積');
    arrow(ctx, { x: 230, y: 128 }, { x: width / 2 - 90, y: 128 }, palette.gray);
    arrow(ctx, { x: width / 2 + 90, y: 128 }, { x: width - 230, y: 128 }, palette.gray);
    fillCard(ctx, width / 2 - 130, 230, 260, 102, palette.orange, 'Starling forces + osmolality', '靜水壓、膠體滲透壓、通透性與淋巴回流共同決定液體流向');
  } else {
    fillCard(ctx, 42, 58, 180, 128, palette.red, '代謝性酸中毒', 'HCO3- 下降，常見於乳酸、酮酸、腎衰竭或腹瀉');
    fillCard(ctx, width / 2 - 90, 58, 180, 128, palette.blue, '呼吸性酸中毒', 'PaCO2 上升，多為換氣不足');
    fillCard(ctx, width - 222, 58, 180, 128, palette.green, '代償', '肺與腎在不同時間尺度調整 CO2 與 HCO3-');
    fillCard(ctx, width / 2 - 120, 228, 240, 100, palette.purple, '核心式子', 'Henderson-Hasselbalch: pH ~ HCO3- / PaCO2');
  }
}

function drawPathology(ctx: CanvasRenderingContext2D, width: number, height: number, modeId: string) {
  if (modeId === 'adaptation') {
    fillCard(ctx, 40, 72, 150, 110, palette.blue, '萎縮', 'Atrophy: 細胞體積與功能下降');
    fillCard(ctx, 220, 72, 150, 110, palette.green, '肥大', 'Hypertrophy: 細胞變大，常見於不可分裂組織');
    fillCard(ctx, 400, 72, 150, 110, palette.orange, '增生', 'Hyperplasia: 細胞數增加');
    fillCard(ctx, width - 190, 72, 150, 110, palette.purple, '化生', 'Metaplasia: 細胞型態轉換以適應刺激');
    pill(ctx, width / 2 - 98, height - 84, '適應不一定是疾病，但常是疾病前奏', palette.red);
  } else if (modeId === 'injury') {
    circleNode(ctx, width * 0.18, height / 2, 46, palette.red, '缺氧', '');
    circleNode(ctx, width * 0.36, height / 2, 46, palette.orange, '毒性', '');
    circleNode(ctx, width * 0.54, height / 2, 46, palette.purple, '感染', '');
    circleNode(ctx, width * 0.72, height / 2, 46, palette.blue, '免疫', '');
    fillCard(ctx, width - 220, height / 2 - 56, 160, 112, palette.green, '共同結果', 'ATP 減少、鈣離子失衡、ROS 增加、膜與 DNA 受損');
    arrow(ctx, { x: width * 0.22, y: height / 2 }, { x: width - 220, y: height / 2 - 16 }, palette.gray);
    arrow(ctx, { x: width * 0.4, y: height / 2 }, { x: width - 220, y: height / 2 - 4 }, palette.gray);
    arrow(ctx, { x: width * 0.58, y: height / 2 }, { x: width - 220, y: height / 2 + 8 }, palette.gray);
    arrow(ctx, { x: width * 0.76, y: height / 2 }, { x: width - 220, y: height / 2 + 20 }, palette.gray);
  } else {
    fillCard(ctx, 62, 64, 170, 110, palette.red, '急性發炎', '中性球、血管擴張、滲出與疼痛');
    fillCard(ctx, width / 2 - 85, 64, 170, 110, palette.green, '清除壞死', '巨噬細胞吞噬碎片並分泌生長因子');
    fillCard(ctx, width - 232, 64, 170, 110, palette.blue, '再生', '細胞能分裂且基底膜保留時較可能恢復');
    fillCard(ctx, width / 2 - 90, 222, 180, 110, palette.orange, '纖維化', '慢性刺激、TGF-beta 活化與膠原沉積造成不可逆硬化');
    arrow(ctx, { x: 232, y: 118 }, { x: width / 2 - 85, y: 118 }, palette.gray);
    arrow(ctx, { x: width / 2 + 85, y: 118 }, { x: width - 232, y: 118 }, palette.gray);
    arrow(ctx, { x: width / 2, y: 174 }, { x: width / 2, y: 222 }, palette.red);
  }
}

function drawMicrobe(ctx: CanvasRenderingContext2D, width: number, height: number, modeId: string) {
  if (modeId === 'pathogen-classes') {
    fillCard(ctx, 42, 70, 150, 110, palette.blue, '細菌 Bacteria', '有細胞壁與核糖體，可獨立複製');
    fillCard(ctx, 222, 70, 150, 110, palette.red, '病毒 Virus', '必須依賴宿主細胞機器複製');
    fillCard(ctx, 402, 70, 150, 110, palette.green, '真菌 Fungi', '有細胞核，常見酵母與黴菌型態');
    fillCard(ctx, width - 192, 70, 150, 110, palette.orange, '寄生蟲 Parasite', '原蟲與蠕蟲，生命史複雜');
    pill(ctx, width / 2 - 110, height - 82, '治療策略取決於病原體結構與生命週期', palette.purple);
  } else if (modeId === 'infection-chain') {
    circleNode(ctx, width * 0.18, height / 2, 46, palette.red, '病原體', '');
    circleNode(ctx, width * 0.4, height / 2, 46, palette.orange, '宿主入口', '');
    circleNode(ctx, width * 0.62, height / 2, 46, palette.blue, '增殖與擴散', '');
    circleNode(ctx, width * 0.84, height / 2, 46, palette.green, '傳播', '');
    arrow(ctx, { x: width * 0.24, y: height / 2 }, { x: width * 0.34, y: height / 2 }, palette.gray);
    arrow(ctx, { x: width * 0.46, y: height / 2 }, { x: width * 0.56, y: height / 2 }, palette.gray);
    arrow(ctx, { x: width * 0.68, y: height / 2 }, { x: width * 0.78, y: height / 2 }, palette.gray);
    pill(ctx, 52, 48, '在任何一環介入，都可能阻斷感染鏈', palette.teal);
  } else {
    fillCard(ctx, 42, 62, 190, 128, palette.red, '產生機轉', '酵素分解藥物、改變靶點、降低通透性、增加 efflux pump');
    fillCard(ctx, width / 2 - 95, 62, 190, 128, palette.blue, '選擇壓力', '不必要用藥、劑量不足、療程不足與環境暴露');
    fillCard(ctx, width - 232, 62, 190, 128, palette.green, '臨床對策', '培養與藥敏、de-escalation、感染控制、抗生素 stewardship');
    arrow(ctx, { x: 232, y: 126 }, { x: width / 2 - 95, y: 126 }, palette.gray);
    arrow(ctx, { x: width / 2 + 95, y: 126 }, { x: width - 232, y: 126 }, palette.gray);
  }
}

function drawImmunity(ctx: CanvasRenderingContext2D, width: number, height: number, modeId: string) {
  if (modeId === 'innate') {
    fillCard(ctx, 42, 66, 170, 120, palette.blue, '屏障', '皮膚、黏膜、胃酸、纖毛與常在菌叢');
    fillCard(ctx, width / 2 - 85, 66, 170, 120, palette.orange, '偵測', 'PRRs 辨識 PAMPs 與 DAMPs');
    fillCard(ctx, width - 212, 66, 170, 120, palette.green, '執行', '補體、吞噬、發炎介質、NK 細胞');
    arrow(ctx, { x: 212, y: 126 }, { x: width / 2 - 85, y: 126 }, palette.gray);
    arrow(ctx, { x: width / 2 + 85, y: 126 }, { x: width - 212, y: 126 }, palette.gray);
  } else if (modeId === 'adaptive') {
    circleNode(ctx, 110, height / 2, 50, palette.blue, '抗原呈現', 'APC');
    circleNode(ctx, 300, height / 2, 50, palette.purple, 'T 細胞', 'CD4 / CD8');
    circleNode(ctx, 500, height / 2, 50, palette.green, 'B 細胞', 'Antibody');
    fillCard(ctx, width - 210, height / 2 - 56, 160, 112, palette.orange, '記憶', '再次暴露時反應更快更強');
    arrow(ctx, { x: 160, y: height / 2 }, { x: 250, y: height / 2 }, palette.gray);
    arrow(ctx, { x: 350, y: height / 2 }, { x: 450, y: height / 2 }, palette.gray);
    arrow(ctx, { x: 550, y: height / 2 }, { x: width - 210, y: height / 2 }, palette.gray);
  } else {
    fillCard(ctx, 42, 70, 160, 110, palette.red, '第一型', 'IgE + mast cell，秒到分鐘級發作');
    fillCard(ctx, 232, 70, 160, 110, palette.blue, '自體免疫', '失去 self-tolerance，攻擊自身抗原');
    fillCard(ctx, 422, 70, 160, 110, palette.green, '免疫缺陷', '先天或後天免疫功能不足，感染風險增加');
    fillCard(ctx, width - 202, 70, 160, 110, palette.purple, '免疫治療', 'checkpoint inhibitor, cytokine, cellular therapy');
  }
}

function drawOncology(ctx: CanvasRenderingContext2D, width: number, height: number, modeId: string) {
  if (modeId === 'hallmarks') {
    circleNode(ctx, width / 2, height / 2, 72, palette.red, 'Cancer', 'Hallmarks');
    const nodes = [
      [width * 0.18, 86, palette.blue, '增殖訊號'],
      [width * 0.5, 56, palette.green, '逃避免死'],
      [width * 0.82, 86, palette.orange, '血管新生'],
      [width * 0.18, height - 86, palette.purple, '轉移侵襲'],
      [width * 0.5, height - 56, palette.red, '免疫逃逸'],
      [width * 0.82, height - 86, palette.teal, '代謝重編程'],
    ] as const;
    nodes.forEach(([x, y, color, text]) => {
      circleNode(ctx, x, y, 42, color, text, '');
      connector(ctx, [{ x, y }, { x: width / 2, y: height / 2 }], color);
    });
  } else if (modeId === 'metastasis') {
    fillCard(ctx, 42, 74, 150, 112, palette.red, '局部侵襲', '突破基底膜，改變黏附與基質分解');
    fillCard(ctx, 222, 74, 150, 112, palette.orange, '進入循環', 'intravasation 進入血管或淋巴');
    fillCard(ctx, 402, 74, 150, 112, palette.blue, '遠端定殖', 'extravasation 後需適應新微環境');
    fillCard(ctx, width - 192, 74, 150, 112, palette.green, '臨床可見', '轉移灶形成影響分期與治療選擇');
    arrow(ctx, { x: 192, y: 130 }, { x: 222, y: 130 }, palette.gray);
    arrow(ctx, { x: 372, y: 130 }, { x: 402, y: 130 }, palette.gray);
    arrow(ctx, { x: 552, y: 130 }, { x: width - 192, y: 130 }, palette.gray);
  } else {
    fillCard(ctx, 42, 64, 190, 122, palette.blue, '分級 Grading', '看細胞分化與異型性，回答「長得多不像正常」');
    fillCard(ctx, width / 2 - 95, 64, 190, 122, palette.orange, '分期 Staging', '看原發腫瘤大小、淋巴結與遠端轉移');
    fillCard(ctx, width - 232, 64, 190, 122, palette.green, '預後 Prognosis', '結合病人、腫瘤、生物標記與治療可行性');
    fillCard(ctx, width / 2 - 110, 228, 220, 94, palette.purple, '記憶點', 'Grade 不等於 Stage；兩者回答的問題不同。');
  }
}

function drawMetabolism(ctx: CanvasRenderingContext2D, width: number, height: number, modeId: string) {
  if (modeId === 'fed-fast') {
    fillCard(ctx, 54, 62, 220, 128, palette.green, '進食狀態 Fed state', '胰島素上升，促進 glycogenesis、lipogenesis、protein synthesis');
    fillCard(ctx, width - 274, 62, 220, 128, palette.orange, '禁食狀態 Fasting', '升糖素與兒茶酚胺上升，啟動 glycogenolysis、gluconeogenesis、lipolysis');
    arrow(ctx, { x: 274, y: 126 }, { x: width - 274, y: 126 }, palette.gray);
    pill(ctx, width / 2 - 124, height - 84, '真正的代謝重點是器官間的燃料分工', palette.blue);
  } else if (modeId === 'atp-flow') {
    circleNode(ctx, width * 0.2, height / 2, 48, palette.blue, '葡萄糖', '');
    circleNode(ctx, width * 0.4, height / 2, 48, palette.orange, '丙酮酸', '');
    circleNode(ctx, width * 0.6, height / 2, 48, palette.green, '乙醯輔酶 A', '');
    circleNode(ctx, width * 0.8, height / 2, 48, palette.purple, 'TCA / ETC', '');
    arrow(ctx, { x: width * 0.26, y: height / 2 }, { x: width * 0.34, y: height / 2 }, palette.gray);
    arrow(ctx, { x: width * 0.46, y: height / 2 }, { x: width * 0.54, y: height / 2 }, palette.gray);
    arrow(ctx, { x: width * 0.66, y: height / 2 }, { x: width * 0.74, y: height / 2 }, palette.gray);
    pill(ctx, 44, 52, '氧不足時，流程停在乳酸與有限 ATP', palette.red);
  } else {
    fillCard(ctx, 42, 70, 160, 110, palette.red, 'B1, B2, B3', '作為輔酶參與能量代謝；缺乏會先反映在高耗能組織');
    fillCard(ctx, 232, 70, 160, 110, palette.blue, 'B6, B12, Folate', '參與胺基酸、血球與 DNA 合成');
    fillCard(ctx, 422, 70, 160, 110, palette.green, '鐵, 鋅, 銅', '電子傳遞、酵素活性與免疫功能');
    fillCard(ctx, width - 202, 70, 160, 110, palette.orange, 'Ca, Mg, P', '神經肌肉傳導、骨骼與訊號傳遞');
  }
}

function drawGenetics(ctx: CanvasRenderingContext2D, width: number, height: number, modeId: string) {
  if (modeId === 'central-dogma') {
    fillCard(ctx, 42, 80, 170, 112, palette.blue, 'DNA', '儲存遺傳資訊，複製與修復維持穩定性');
    fillCard(ctx, width / 2 - 85, 80, 170, 112, palette.purple, 'RNA', 'mRNA, tRNA, rRNA 與各種調控 RNA');
    fillCard(ctx, width - 212, 80, 170, 112, palette.green, '蛋白質', '結構、酵素、受體、轉錄因子與運輸蛋白');
    arrow(ctx, { x: 212, y: 136 }, { x: width / 2 - 85, y: 136 }, palette.gray);
    arrow(ctx, { x: width / 2 + 85, y: 136 }, { x: width - 212, y: 136 }, palette.gray);
    pill(ctx, width / 2 - 118, height - 84, 'Central dogma 有例外，例如 reverse transcription', palette.orange);
  } else if (modeId === 'inheritance') {
    fillCard(ctx, 42, 64, 180, 128, palette.blue, '常染色體顯性', '每代都可能出現，男女機率近似');
    fillCard(ctx, width / 2 - 90, 64, 180, 128, palette.green, '常染色體隱性', '父母可無症狀帶因，近親婚配風險較高');
    fillCard(ctx, width - 222, 64, 180, 128, palette.purple, 'X 連鎖', '男性較容易表現，女性可能為帶因者');
    fillCard(ctx, width / 2 - 120, 228, 240, 94, palette.red, '別忽略', 'de novo mutation、incomplete penetrance、variable expressivity');
  } else {
    fillCard(ctx, 42, 70, 170, 112, palette.blue, '染色體 / CNV', '看大片段缺失、重複與非整倍體');
    fillCard(ctx, 232, 70, 170, 112, palette.orange, '單基因定序', '鎖定特定基因或 panel');
    fillCard(ctx, 422, 70, 170, 112, palette.green, '全外顯子 / 全基因組', '提高發現率，也提高 incidental findings');
    fillCard(ctx, width - 202, 70, 160, 112, palette.purple, '變異判讀', 'P/LP/VUS/LB/B 需結合表型與家系');
  }
}

function drawPharmacologyCore(ctx: CanvasRenderingContext2D, width: number, height: number, modeId: string) {
  if (modeId === 'receptors') {
    fillCard(ctx, 42, 64, 160, 116, palette.blue, 'Ion channel', '毫秒到秒級，常見於麻醉、鎮靜與神經肌肉傳導');
    fillCard(ctx, 232, 64, 160, 116, palette.purple, 'GPCR', '第二信使放大效應，臨床藥物最常見靶點');
    fillCard(ctx, 422, 64, 160, 116, palette.green, 'Enzyme-linked', '生長因子、胰島素與多數標靶治療重點');
    fillCard(ctx, width - 202, 64, 160, 116, palette.orange, 'Nuclear receptor', '脂溶性配體進核改變轉錄，起效較慢但影響久');
  } else if (modeId === 'dose-response') {
    fillCard(ctx, 56, 66, 180, 112, palette.blue, '左移', '較低濃度就有反應，常代表 EC50 較小');
    fillCard(ctx, width / 2 - 90, 52, 180, 140, palette.green, 'Emax', '曲線頂部代表最大可達效果，不等於安全');
    fillCard(ctx, width - 236, 66, 180, 112, palette.orange, '右移', '需更高濃度才有同效果，常見於競爭性拮抗或耐受');
    connector(ctx, [{ x: 236, y: 122 }, { x: width / 2 - 90, y: 122 }], palette.gray);
    connector(ctx, [{ x: width / 2 + 90, y: 122 }, { x: width - 236, y: 122 }], palette.gray);
    pill(ctx, width / 2 - 150, height - 84, 'Potency 看左右位置，Efficacy 看最高點', palette.red);
  } else {
    fillCard(ctx, 42, 74, 160, 112, palette.green, 'Full agonist', '高固有活性，可達高 Emax');
    fillCard(ctx, 232, 74, 160, 112, palette.orange, 'Partial agonist', '可活化但有天花板，可能兼具阻斷效果');
    fillCard(ctx, 422, 74, 160, 112, palette.blue, 'Competitive antagonist', '曲線右移，常可被較高濃度 agonist 克服');
    fillCard(ctx, width - 202, 74, 160, 112, palette.red, 'Noncompetitive', '降低 Emax，增加 agonist 也難完全恢復');
  }
}

function drawPkJourney(ctx: CanvasRenderingContext2D, width: number, height: number, modeId: string) {
  if (modeId === 'adme') {
    const cards = [
      ['口服/給藥', '吸收', palette.blue],
      ['血中循環', '分布', palette.purple],
      ['肝與腸壁', '代謝', palette.orange],
      ['腎/膽汁', '排除', palette.green],
    ] as const;
    cards.forEach(([title, subtitle, color], index) => {
      const x = 42 + index * 190;
      fillCard(ctx, x, 90, 150, 112, color, title, subtitle);
      if (index < cards.length - 1) {
        arrow(ctx, { x: x + 150, y: 146 }, { x: x + 190, y: 146 }, palette.gray);
      }
    });
  } else if (modeId === 'parameters') {
    circleNode(ctx, width * 0.22, height / 2, 54, palette.blue, 'Vd', '去哪裡');
    circleNode(ctx, width * 0.5, height / 2, 54, palette.green, 'CL', '清多少');
    circleNode(ctx, width * 0.78, height / 2, 54, palette.orange, 't1/2', '留多久');
    arrow(ctx, { x: width * 0.28, y: height / 2 }, { x: width * 0.44, y: height / 2 }, palette.gray);
    arrow(ctx, { x: width * 0.56, y: height / 2 }, { x: width * 0.72, y: height / 2 }, palette.gray);
    pill(ctx, width / 2 - 154, 44, 't1/2 = 0.693 x Vd / CL', palette.purple);
  } else {
    fillCard(ctx, 54, 70, 180, 118, palette.blue, 'Loading dose', '由 Vd 決定，目標是快速進入治療範圍');
    fillCard(ctx, width / 2 - 90, 70, 180, 118, palette.green, 'Steady state', '輸入與輸出平衡，固定間隔下仍會有 peak / trough');
    fillCard(ctx, width - 234, 70, 180, 118, palette.orange, 'Maintenance', '由 CL 決定，維持在目標暴露附近');
    arrow(ctx, { x: 234, y: 129 }, { x: width / 2 - 90, y: 129 }, palette.gray);
    arrow(ctx, { x: width / 2 + 90, y: 129 }, { x: width - 234, y: 129 }, palette.gray);
  }
}

function drawInteractionRisk(ctx: CanvasRenderingContext2D, width: number, height: number, modeId: string) {
  if (modeId === 'pk') {
    fillCard(ctx, 42, 72, 170, 112, palette.blue, 'CYP inhibition', '數天內讓受質濃度上升，窄治療窗藥最危險');
    fillCard(ctx, 232, 72, 170, 112, palette.orange, 'Enzyme induction', '幾天到幾週後讓暴露下降，療效失敗常被忽略');
    fillCard(ctx, 422, 72, 170, 112, palette.purple, 'Transporters', 'P-gp / OATP 影響吸收與排除，常被漏看');
    fillCard(ctx, width - 202, 72, 160, 112, palette.green, 'Organ failure', '器官功能改變會放大任何交互作用');
  } else if (modeId === 'pd') {
    circleNode(ctx, width / 2, height / 2, 70, palette.red, 'Risk summation', '藥效學加成');
    fillCard(ctx, 60, 74, 170, 96, palette.orange, 'QT prolongation', '多藥疊加與低鉀低鎂最危險');
    fillCard(ctx, width - 230, 74, 170, 96, palette.blue, 'Bleeding', '抗凝、抗血小板、NSAIDs 疊加');
    fillCard(ctx, 60, height - 170, 170, 96, palette.purple, 'Sedation', 'opioid、benzodiazepine、酒精或 gabapentinoid');
    fillCard(ctx, width - 230, height - 170, 170, 96, palette.green, 'Serotonin excess', 'SSRI、MAOI、linezolid、triptan 等');
    connector(ctx, [{ x: 230, y: 122 }, { x: width / 2 - 70, y: height / 2 - 20 }], palette.orange);
    connector(ctx, [{ x: width - 230, y: 122 }, { x: width / 2 + 70, y: height / 2 - 20 }], palette.blue);
    connector(ctx, [{ x: 230, y: height - 122 }, { x: width / 2 - 70, y: height / 2 + 20 }], palette.purple);
    connector(ctx, [{ x: width - 230, y: height - 122 }, { x: width / 2 + 70, y: height / 2 + 20 }], palette.green);
  } else {
    fillCard(ctx, 54, 72, 180, 112, palette.blue, 'Type A', '與劑量相關，可預測，先想是否過量或交互作用');
    fillCard(ctx, width / 2 - 90, 72, 180, 112, palette.red, 'Type B', '免疫或特異體質反應，重點是立即停藥與標註');
    fillCard(ctx, width - 234, 72, 180, 112, palette.orange, 'Type C-F', '慢性、延遲、停藥後與治療失敗都要分開處理');
    pill(ctx, width / 2 - 138, height - 82, 'ADR 評估先看時間序列，再看替代解釋', palette.purple);
  }
}

function drawDosageDesign(ctx: CanvasRenderingContext2D, width: number, height: number, modeId: string) {
  if (modeId === 'forms') {
    fillCard(ctx, 42, 74, 150, 110, palette.blue, 'Tablet / capsule', '常規口服，適合長期但受吸收條件影響');
    fillCard(ctx, 222, 74, 150, 110, palette.green, 'Injection', '快速高暴露，適合急性與無法口服者');
    fillCard(ctx, 402, 74, 150, 110, palette.orange, 'Inhalation', '局部濃度高，但技巧決定成敗');
    fillCard(ctx, width - 192, 74, 150, 110, palette.purple, 'Patch / depot', '長效穩定，但起效慢且受外在條件影響');
  } else if (modeId === 'biopharm') {
    circleNode(ctx, width * 0.2, height / 2, 48, palette.blue, 'Solubility', '');
    circleNode(ctx, width * 0.4, height / 2, 48, palette.orange, 'Permeability', '');
    circleNode(ctx, width * 0.6, height / 2, 48, palette.green, 'First-pass', '');
    circleNode(ctx, width * 0.8, height / 2, 48, palette.purple, 'Bioavailability', '');
    arrow(ctx, { x: width * 0.26, y: height / 2 }, { x: width * 0.34, y: height / 2 }, palette.gray);
    arrow(ctx, { x: width * 0.46, y: height / 2 }, { x: width * 0.54, y: height / 2 }, palette.gray);
    arrow(ctx, { x: width * 0.66, y: height / 2 }, { x: width * 0.74, y: height / 2 }, palette.gray);
  } else {
    fillCard(ctx, 54, 70, 190, 120, palette.teal, 'Sterility', '環境、清潔、人員與流程共同維持');
    fillCard(ctx, width / 2 - 95, 70, 190, 120, palette.red, 'Compatibility', '混合、Y-site、容器與 tubing 都可能失敗');
    fillCard(ctx, width - 244, 70, 190, 120, palette.orange, 'Stability', '光、熱、pH 與材質會影響有效成分');
  }
}

function drawMedicationSystem(ctx: CanvasRenderingContext2D, width: number, height: number, modeId: string) {
  if (modeId === 'prescription') {
    const steps = [
      ['開立', '適應症、劑量、途徑'],
      ['審核', '安全性、交互作用'],
      ['調劑', '產品與標示核對'],
      ['交付', '衛教與 teach-back'],
    ] as const;
    steps.forEach(([title, subtitle], index) => {
      const x = 46 + index * 186;
      fillCard(ctx, x, 92, 144, 112, [palette.blue, palette.orange, palette.green, palette.purple][index], title, subtitle);
      if (index < steps.length - 1) {
        arrow(ctx, { x: x + 144, y: 148 }, { x: x + 186, y: 148 }, palette.gray);
      }
    });
  } else if (modeId === 'counseling') {
    circleNode(ctx, width / 2, height / 2, 68, palette.green, 'Patient', 'teach-back');
    fillCard(ctx, 60, 78, 180, 104, palette.blue, 'Label', '寫給病人看得懂，不只寫給系統看');
    fillCard(ctx, width - 240, 78, 180, 104, palette.orange, 'Demonstration', '吸入器、筆針、貼片與分裝都要示範');
    fillCard(ctx, width / 2 - 110, height - 170, 220, 96, palette.purple, 'Warning signs', '何時停藥、何時回診、何時急診');
    connector(ctx, [{ x: 240, y: 130 }, { x: width / 2 - 68, y: height / 2 - 18 }], palette.blue);
    connector(ctx, [{ x: width - 240, y: 130 }, { x: width / 2 + 68, y: height / 2 - 18 }], palette.orange);
    connector(ctx, [{ x: width / 2, y: height - 170 }, { x: width / 2, y: height / 2 + 68 }], palette.purple);
  } else {
    fillCard(ctx, 54, 70, 180, 118, palette.blue, 'Tertiary', '快而廣，適合臨床現場定向');
    fillCard(ctx, width / 2 - 90, 70, 180, 118, palette.green, 'Secondary', '幫你找到研究，但不替你判讀品質');
    fillCard(ctx, width - 234, 70, 180, 118, palette.orange, 'Primary', '最接近原始資料，也最需要批判性閱讀');
    pill(ctx, width / 2 - 138, height - 84, '先定義問題，再選資訊層級', palette.purple);
  }
}

function drawMedicationReview(ctx: CanvasRenderingContext2D, width: number, height: number, modeId: string) {
  if (modeId === 'dtp') {
    circleNode(ctx, width / 2, height / 2, 70, palette.teal, 'Medication review', 'DTP scan');
    const nodes = [
      [width * 0.18, 86, palette.blue, 'Indication'],
      [width * 0.5, 56, palette.green, 'Effectiveness'],
      [width * 0.82, 86, palette.orange, 'Safety'],
      [width * 0.18, height - 86, palette.red, 'Adherence'],
      [width * 0.5, height - 56, palette.purple, 'Monitoring'],
      [width * 0.82, height - 86, palette.cyan, 'Patient goal'],
    ] as const;
    nodes.forEach(([x, y, color, text]) => {
      circleNode(ctx, x, y, 40, color, text, '');
      connector(ctx, [{ x, y }, { x: width / 2, y: height / 2 }], color);
    });
  } else if (modeId === 'adherence') {
    fillCard(ctx, 52, 72, 160, 112, palette.blue, 'Understanding', '病人是否真的知道如何吃、何時停、為何吃');
    fillCard(ctx, 242, 72, 160, 112, palette.orange, 'Access', '拿得到、付得起、補得上嗎');
    fillCard(ctx, 432, 72, 160, 112, palette.green, 'Ability', '吞嚥、視力、手部操作、記憶與生活節奏');
    fillCard(ctx, width - 202, 72, 160, 112, palette.purple, 'Motivation', '信念、恐懼、副作用體驗與價值排序');
  } else {
    fillCard(ctx, 54, 70, 180, 118, palette.blue, 'Start', '治療前就定義基線、目標與風險');
    fillCard(ctx, width / 2 - 90, 70, 180, 118, palette.green, 'Track', '症狀、數值、功能與副作用同時追');
    fillCard(ctx, width - 234, 70, 180, 118, palette.orange, 'Adjust', '達標、超標、不耐受都要有下一步');
    arrow(ctx, { x: 234, y: 129 }, { x: width / 2 - 90, y: 129 }, palette.gray);
    arrow(ctx, { x: width / 2 + 90, y: 129 }, { x: width - 234, y: 129 }, palette.gray);
  }
}

function drawSpecialPopulations(ctx: CanvasRenderingContext2D, width: number, height: number, modeId: string) {
  if (modeId === 'pediatrics') {
    fillCard(ctx, 42, 70, 170, 112, palette.blue, 'Neonate', '水分比例高、肝腎未成熟、劑量與間隔都要特殊化');
    fillCard(ctx, width / 2 - 85, 70, 170, 112, palette.green, 'Infant / child', '快速生長，體重與代謝能力變化大');
    fillCard(ctx, width - 212, 70, 170, 112, palette.orange, 'Adolescent', '藥動接近成人，但依從性與隱私議題上升');
  } else if (modeId === 'geriatrics') {
    fillCard(ctx, 42, 64, 160, 118, palette.orange, 'Falls / delirium', '鎮靜、低血壓與抗膽鹼負荷特別危險');
    fillCard(ctx, 232, 64, 160, 118, palette.blue, 'Polypharmacy', '問題在不必要疊加與目標失焦，不只是數量');
    fillCard(ctx, 422, 64, 160, 118, palette.green, 'Deprescribing', '找出可停、可減、需追蹤的藥');
    fillCard(ctx, width - 202, 64, 160, 118, palette.purple, 'Frailty goal', '功能與生活品質常比數值更重要');
  } else {
    fillCard(ctx, 50, 62, 150, 118, palette.red, 'Pregnancy', '先比較治療與不治療雙向風險');
    fillCard(ctx, 230, 62, 150, 118, palette.blue, 'Renal / hepatic', '看清除、活性代謝物與游離分率');
    fillCard(ctx, 410, 62, 150, 118, palette.green, 'Obesity', 'loading / maintenance 不一定用同一種體重');
    fillCard(ctx, width - 190, 62, 140, 118, palette.orange, 'Critical illness', 'Vd、CL 與器官支持都在快速變動');
  }
}

function drawPharmacogenomicsRoadmap(ctx: CanvasRenderingContext2D, width: number, height: number, modeId: string) {
  if (modeId === 'gene-flow') {
    fillCard(ctx, 42, 84, 160, 100, palette.blue, 'DNA variant', '如 CYP、HLA、轉運蛋白或受體變異');
    fillCard(ctx, width / 2 - 80, 52, 160, 164, palette.purple, 'Phenotype', 'PM / IM / NM / UM 或免疫高風險');
    fillCard(ctx, width - 202, 84, 160, 100, palette.green, 'Drug response', '療效、毒性、劑量需求與替代藥選擇');
    arrow(ctx, { x: 202, y: 134 }, { x: width / 2 - 80, y: 134 }, palette.gray);
    arrow(ctx, { x: width / 2 + 80, y: 134 }, { x: width - 202, y: 134 }, palette.gray);
  } else if (modeId === 'actionable') {
    fillCard(ctx, 52, 72, 180, 112, palette.green, 'Strong pair', '結果會改藥、改劑量或加強監測');
    fillCard(ctx, width / 2 - 90, 72, 180, 112, palette.orange, 'Timing', '能否在決策前拿到結果，常決定檢測價值');
    fillCard(ctx, width - 232, 72, 180, 112, palette.blue, 'Reuse', '結果是否可未來重複利用，影響 pre-emptive 價值');
  } else {
    fillCard(ctx, 56, 70, 180, 118, palette.blue, 'Lab result', '報告若不能進 EHR，很快就會被遺忘');
    fillCard(ctx, width / 2 - 90, 70, 180, 118, palette.green, 'CDS alert', '在開藥當下提示替代方案與劑量建議');
    fillCard(ctx, width - 236, 70, 180, 118, palette.purple, 'Long-term record', '基因結果屬長期資產，應跨次就醫可被讀取');
  }
}

function drawEvidenceTherapeutics(ctx: CanvasRenderingContext2D, width: number, height: number, modeId: string) {
  if (modeId === 'pyramid') {
    fillCard(ctx, width / 2 - 120, 48, 240, 74, palette.green, 'Guideline / systematic review', '高層級摘要，但仍要看來源品質');
    fillCard(ctx, width / 2 - 160, 132, 320, 74, palette.blue, 'RCT / meta-analysis', '適合問效果，但外部效度要檢查');
    fillCard(ctx, width / 2 - 200, 216, 400, 74, palette.orange, 'Observational / case-level data', '補足真實世界與特殊族群，但易受混雜影響');
  } else if (modeId === 'endpoints') {
    fillCard(ctx, 54, 70, 180, 118, palette.blue, 'Surrogate', '數值變好不一定等於病人真的更好');
    fillCard(ctx, width / 2 - 90, 70, 180, 118, palette.green, 'Hard outcome', '死亡、住院、中風、骨折等較貼近真實獲益');
    fillCard(ctx, width - 234, 70, 180, 118, palette.orange, 'Patient-reported', '症狀與生活品質能補上數值看不到的部分');
    pill(ctx, width / 2 - 106, height - 84, 'NNT / NNH 要和時間範圍一起看', palette.purple);
  } else {
    fillCard(ctx, 50, 70, 160, 116, palette.blue, 'Evidence', '證據能說明平均效果');
    fillCard(ctx, width / 2 - 80, 70, 160, 116, palette.green, 'Context', '腎病、妊娠、高齡、成本與監測能力改變適用性');
    fillCard(ctx, width - 210, 70, 160, 116, palette.orange, 'Preference', '病人如何排序效益、風險與負擔');
    arrow(ctx, { x: 210, y: 128 }, { x: width / 2 - 80, y: 128 }, palette.gray);
    arrow(ctx, { x: width / 2 + 80, y: 128 }, { x: width - 210, y: 128 }, palette.gray);
  }
}

function drawTdmSafety(ctx: CanvasRenderingContext2D, width: number, height: number, modeId: string) {
  if (modeId === 'sampling') {
    fillCard(ctx, 42, 74, 170, 112, palette.blue, 'Dose time', '先確認最後一次給藥時間');
    fillCard(ctx, 232, 74, 170, 112, palette.green, 'Sample time', 'peak / trough / random 含義不同');
    fillCard(ctx, 422, 74, 170, 112, palette.orange, 'Steady state', '尚未達穩態時要用不同方式解讀');
    fillCard(ctx, width - 202, 74, 160, 112, palette.purple, 'Clinical state', '毒性與療效必須一起讀');
  } else if (modeId === 'high-alert') {
    circleNode(ctx, width / 2, height / 2, 68, palette.red, 'High-alert', 'harm if wrong');
    fillCard(ctx, 60, 84, 170, 96, palette.blue, 'Insulin', '單位與餐次同步');
    fillCard(ctx, width - 230, 84, 170, 96, palette.green, 'Anticoagulant', '出血與適應症管理');
    fillCard(ctx, 60, height - 170, 170, 96, palette.orange, 'Opioid', '鎮靜與呼吸抑制');
    fillCard(ctx, width - 230, height - 170, 170, 96, palette.purple, 'Electrolytes', '濃縮液與泵浦安全');
    connector(ctx, [{ x: 230, y: 132 }, { x: width / 2 - 68, y: height / 2 - 20 }], palette.blue);
    connector(ctx, [{ x: width - 230, y: 132 }, { x: width / 2 + 68, y: height / 2 - 20 }], palette.green);
    connector(ctx, [{ x: 230, y: height - 122 }, { x: width / 2 - 68, y: height / 2 + 20 }], palette.orange);
    connector(ctx, [{ x: width - 230, y: height - 122 }, { x: width / 2 + 68, y: height / 2 + 20 }], palette.purple);
  } else {
    fillCard(ctx, 54, 70, 180, 118, palette.blue, 'Standardize', '濃度、order set、流程與教育');
    fillCard(ctx, width / 2 - 90, 70, 180, 118, palette.green, 'Detect', '濃度、事件通報、異常值與 near miss');
    fillCard(ctx, width - 234, 70, 180, 118, palette.orange, 'Improve', '回饋系統設計，而不是只責怪個人');
    arrow(ctx, { x: 234, y: 129 }, { x: width / 2 - 90, y: 129 }, palette.gray);
    arrow(ctx, { x: width / 2 + 90, y: 129 }, { x: width - 234, y: 129 }, palette.gray);
  }
}

function drawAdvancedTherapies(ctx: CanvasRenderingContext2D, width: number, height: number, modeId: string) {
  if (modeId === 'platforms') {
    fillCard(ctx, 42, 72, 160, 112, palette.blue, 'Small molecule', '常可口服、易進細胞、交互作用多走 CYP / transporters');
    fillCard(ctx, 232, 72, 160, 112, palette.green, 'Monoclonal antibody', '大分子注射藥，常作用於細胞外標靶');
    fillCard(ctx, 422, 72, 160, 112, palette.orange, 'RNA therapy', '調整訊息層級，如 mRNA、siRNA、ASO');
    fillCard(ctx, width - 202, 72, 160, 112, palette.purple, 'Cell / gene', '一次性或高度個體化平台，複雜度最高');
  } else if (modeId === 'antibody-map') {
    fillCard(ctx, 54, 70, 180, 118, palette.green, 'mAb binding', '中和配體或阻斷受體，重點是 target specificity');
    fillCard(ctx, width / 2 - 90, 70, 180, 118, palette.orange, 'ADC payload', '抗體把細胞毒藥帶向腫瘤，但仍可能有 off-target toxicity');
    fillCard(ctx, width - 234, 70, 180, 118, palette.blue, 'Fusion protein', '把不同蛋白模組拼接成新功能與更長半衰期');
  } else {
    fillCard(ctx, 42, 80, 170, 104, palette.blue, 'DNA', '基因層級修復或補充');
    fillCard(ctx, width / 2 - 85, 48, 170, 168, palette.purple, 'RNA', 'mRNA 表達、siRNA / ASO 沉默或調整剪接');
    fillCard(ctx, width - 212, 80, 170, 104, palette.green, 'Protein / cell output', '最終想改變的是功能蛋白與細胞行為');
    arrow(ctx, { x: 212, y: 132 }, { x: width / 2 - 85, y: 132 }, palette.gray);
    arrow(ctx, { x: width / 2 + 85, y: 132 }, { x: width - 212, y: 132 }, palette.gray);
    pill(ctx, width / 2 - 136, height - 84, '越往上游介入，潛力越大，不確定性也越高', palette.red);
  }
}

function drawCvHemodynamics(ctx: CanvasRenderingContext2D, width: number, height: number, modeId: string) {
  if (modeId === 'pressure-axis') {
    fillCard(ctx, 48, 66, 180, 118, palette.blue, 'Cardiac output', '心輸出量由心率、前負荷與收縮力共同決定，是血壓的一半。');
    fillCard(ctx, width / 2 - 90, 48, 180, 154, palette.orange, 'Blood pressure', '血壓是 CO 與 SVR 的交會結果，長期設定又回到腎臟與鈉水平衡。');
    fillCard(ctx, width - 228, 66, 180, 118, palette.red, 'Systemic vascular resistance', '小動脈張力、血管重塑與內皮功能決定另一半。');
    arrow(ctx, { x: 228, y: 125 }, { x: width / 2 - 90, y: 125 }, palette.gray);
    arrow(ctx, { x: width / 2 + 90, y: 125 }, { x: width - 228, y: 125 }, palette.gray);
    pill(ctx, width / 2 - 106, height - 84, 'BP = CO x SVR', palette.purple);
  } else if (modeId === 'raas-loop') {
    circleNode(ctx, width * 0.18, height * 0.5, 54, palette.blue, 'Kidney', 'renin');
    circleNode(ctx, width * 0.42, height * 0.28, 54, palette.orange, 'Ang II', 'vasoconstriction');
    circleNode(ctx, width * 0.42, height * 0.72, 54, palette.red, 'Aldosterone', 'Na / water');
    circleNode(ctx, width * 0.72, height * 0.5, 60, palette.purple, 'Target organs', 'heart / vessel / brain');
    arrow(ctx, { x: width * 0.24, y: height * 0.46 }, { x: width * 0.36, y: height * 0.32 }, palette.gray);
    arrow(ctx, { x: width * 0.24, y: height * 0.54 }, { x: width * 0.36, y: height * 0.68 }, palette.gray);
    arrow(ctx, { x: width * 0.48, y: height * 0.3 }, { x: width * 0.66, y: height * 0.46 }, palette.gray);
    arrow(ctx, { x: width * 0.48, y: height * 0.7 }, { x: width * 0.66, y: height * 0.54 }, palette.gray);
    pill(ctx, 46, 34, 'ACEi / ARB / MRA 在這裡切斷惡性循環', palette.green);
  } else {
    fillCard(ctx, 42, 72, 170, 110, palette.blue, 'Brain', '長期高血壓導致腦小血管病變、中風與認知衰退風險上升。');
    fillCard(ctx, 232, 72, 170, 110, palette.orange, 'Heart', '左心室肥厚、舒張障礙、心衰與冠心病風險疊加。');
    fillCard(ctx, 422, 72, 170, 110, palette.green, 'Kidney', '蛋白尿、eGFR 下降與腎小球硬化彼此促進。');
    fillCard(ctx, width - 202, 72, 160, 110, palette.red, 'Retina', '眼底病變可成為全身微血管傷害窗口。');
  }
}

function drawCoronaryIschemia(ctx: CanvasRenderingContext2D, width: number, height: number, modeId: string) {
  if (modeId === 'territories') {
    circleNode(ctx, width * 0.5, height * 0.5, 88, palette.red, 'Left ventricle', 'myocardium');
    fillCard(ctx, 56, 66, 170, 100, palette.orange, 'LAD', '前壁、室間隔、心尖；大範圍病變時風險最高。');
    fillCard(ctx, width - 226, 66, 170, 100, palette.blue, 'RCA', '下壁、右心室與 AV node 常見供血來源。');
    fillCard(ctx, width / 2 - 85, height - 154, 170, 100, palette.green, 'LCx', '側壁與後壁部分區域。');
    connector(ctx, [{ x: 226, y: 118 }, { x: width * 0.43, y: height * 0.4 }], palette.orange);
    connector(ctx, [{ x: width - 226, y: 118 }, { x: width * 0.58, y: height * 0.44 }], palette.blue);
    connector(ctx, [{ x: width / 2, y: height - 154 }, { x: width * 0.5, y: height * 0.6 }], palette.green);
  } else if (modeId === 'acs') {
    fillCard(ctx, 48, 70, 180, 112, palette.orange, 'Vulnerable plaque', '薄纖維帽、高脂質核心與發炎讓斑塊容易破裂。');
    fillCard(ctx, width / 2 - 90, 70, 180, 112, palette.red, 'Platelet-rich thrombus', '破裂後血小板迅速黏附與活化，形成 ACS。');
    fillCard(ctx, width - 228, 70, 180, 112, palette.purple, 'Downstream ischemia', '心肌由 subendocardium 開始受傷，若完全阻塞可進展成 STEMI。');
    arrow(ctx, { x: 228, y: 126 }, { x: width / 2 - 90, y: 126 }, palette.gray);
    arrow(ctx, { x: width / 2 + 90, y: 126 }, { x: width - 228, y: 126 }, palette.gray);
  } else {
    fillCard(ctx, 54, 70, 180, 118, palette.blue, 'Supply problem', '固定狹窄、痙攣、低血壓、低氧與貧血都可降低供氧。');
    fillCard(ctx, width / 2 - 90, 70, 180, 118, palette.orange, 'Demand surge', '心跳快、高血壓、發燒、甲亢與壁張力增加讓需氧上升。');
    fillCard(ctx, width - 234, 70, 180, 118, palette.green, 'Clinical result', 'type 1 MI、type 2 MI 或 angina equivalent 的表現取決於兩者缺口。');
    pill(ctx, width / 2 - 118, height - 84, '不是每個 troponin 上升都等於 plaque rupture', palette.red);
  }
}

function drawHeartFailureCycle(ctx: CanvasRenderingContext2D, width: number, height: number, modeId: string) {
  if (modeId === 'compensation') {
    circleNode(ctx, width * 0.22, height * 0.5, 56, palette.red, 'Myocardial injury', 'ischemia / HTN / valve');
    circleNode(ctx, width * 0.5, height * 0.25, 56, palette.orange, 'Low forward flow', 'perfusion down');
    circleNode(ctx, width * 0.78, height * 0.5, 56, palette.purple, 'RAAS / SNS', 'compensation');
    circleNode(ctx, width * 0.5, height * 0.75, 56, palette.blue, 'Congestion', 'pressure up');
    arrow(ctx, { x: width * 0.28, y: height * 0.46 }, { x: width * 0.44, y: height * 0.31 }, palette.gray);
    arrow(ctx, { x: width * 0.56, y: height * 0.31 }, { x: width * 0.72, y: height * 0.46 }, palette.gray);
    arrow(ctx, { x: width * 0.72, y: height * 0.54 }, { x: width * 0.56, y: height * 0.69 }, palette.gray);
    arrow(ctx, { x: width * 0.44, y: height * 0.69 }, { x: width * 0.28, y: height * 0.54 }, palette.gray);
  } else if (modeId === 'wet-dry') {
    fillCard(ctx, 60, 70, 160, 112, palette.blue, 'Warm / dry', '穩定目標區，灌流尚可且無明顯鬱血。');
    fillCard(ctx, 240, 70, 160, 112, palette.green, 'Warm / wet', '最常見急性失代償型，需要利尿與去鬱血。');
    fillCard(ctx, 420, 70, 160, 112, palette.orange, 'Cold / dry', '灌流差但不一定明顯腫，需找低輸出或過度利尿。');
    fillCard(ctx, width - 190, 70, 130, 112, palette.red, 'Cold / wet', '最危險，常接近 cardiogenic shock。');
  } else {
    fillCard(ctx, 42, 72, 160, 112, palette.purple, 'ARNI / ACEi / ARB', '抑制 RAAS 與減少後負荷，降低重塑。');
    fillCard(ctx, 232, 72, 160, 112, palette.blue, 'Beta-blocker', '降低交感毒性與猝死風險。');
    fillCard(ctx, 422, 72, 160, 112, palette.green, 'MRA', '抑制 aldosterone 相關纖維化與鈉滯留。');
    fillCard(ctx, width - 202, 72, 160, 112, palette.orange, 'SGLT2i', '跨 HFrEF / HFpEF 均可降低 HF 住院。');
    pill(ctx, width / 2 - 122, height - 84, '利尿劑處理症狀，四大支柱處理預後', palette.red);
  }
}

function drawElectrophysiologyRhythm(ctx: CanvasRenderingContext2D, width: number, height: number, modeId: string) {
  if (modeId === 'conduction') {
    circleNode(ctx, width * 0.5, 90, 42, palette.green, 'SA node');
    circleNode(ctx, width * 0.5, height * 0.36, 42, palette.blue, 'AV node');
    circleNode(ctx, width * 0.5, height * 0.58, 40, palette.orange, 'His');
    circleNode(ctx, width * 0.38, height * 0.78, 38, palette.purple, 'L bundle');
    circleNode(ctx, width * 0.62, height * 0.78, 38, palette.red, 'R bundle');
    arrow(ctx, { x: width * 0.5, y: 132 }, { x: width * 0.5, y: height * 0.31 }, palette.gray);
    arrow(ctx, { x: width * 0.5, y: height * 0.4 }, { x: width * 0.5, y: height * 0.53 }, palette.gray);
    arrow(ctx, { x: width * 0.48, y: height * 0.62 }, { x: width * 0.4, y: height * 0.74 }, palette.gray);
    arrow(ctx, { x: width * 0.52, y: height * 0.62 }, { x: width * 0.6, y: height * 0.74 }, palette.gray);
  } else if (modeId === 'tachy-map') {
    fillCard(ctx, 50, 70, 160, 116, palette.blue, 'Automaticity', 'sinus tachy、ectopic atrial beats 與 catecholamine surge 類型。');
    fillCard(ctx, width / 2 - 80, 70, 160, 116, palette.orange, 'Triggered activity', 'EAD / DAD 對應 long QT、digoxin 或 Ca overload。');
    fillCard(ctx, width - 210, 70, 160, 116, palette.red, 'Re-entry', 'AVNRT、AVRT、scar VT 的共同核心。');
    pill(ctx, width / 2 - 106, height - 84, '治療前先問：這顆心律從哪個機轉來？', palette.green);
  } else {
    fillCard(ctx, 48, 72, 180, 112, palette.purple, 'QT prolongation', '藥物、低 K / Mg、先天通道病會提高 torsades 風險。');
    fillCard(ctx, width / 2 - 90, 72, 180, 112, palette.green, 'Structural substrate', '缺血疤痕、心衰與肥厚讓 arrhythmia 更容易維持。');
    fillCard(ctx, width - 228, 72, 180, 112, palette.orange, 'Trigger', '發燒、酒精、甲亢、感染、藥物與 stress 讓臨界狀態變成顯性。');
  }
}

function drawLipidAtherothrombosis(ctx: CanvasRenderingContext2D, width: number, height: number, modeId: string) {
  if (modeId === 'lipoproteins') {
    fillCard(ctx, 48, 72, 170, 112, palette.orange, 'ApoB particles', 'LDL、IDL、VLDL remnant 都可能進入內膜，是主要 atherogenic 負荷。');
    fillCard(ctx, width / 2 - 85, 72, 170, 112, palette.blue, 'Endothelium', '高血壓、糖尿病、吸菸與發炎讓內皮更易通透。');
    fillCard(ctx, width - 218, 72, 170, 112, palette.green, 'LDL receptor', '肝臟清除能力決定血中顆粒停留時間與濃度。');
  } else if (modeId === 'plaque') {
    fillCard(ctx, 54, 70, 180, 118, palette.blue, 'Entry & oxidation', '脂質進入內膜後被氧化，開啟發炎訊號。');
    fillCard(ctx, width / 2 - 90, 70, 180, 118, palette.orange, 'Foam cell core', '巨噬細胞吞噬脂質後形成泡沫細胞與脂質核心。');
    fillCard(ctx, width - 234, 70, 180, 118, palette.red, 'Thin fibrous cap', '斑塊若高發炎又帽薄，破裂風險升高。');
    arrow(ctx, { x: 234, y: 128 }, { x: width / 2 - 90, y: 128 }, palette.gray);
    arrow(ctx, { x: width / 2 + 90, y: 128 }, { x: width - 234, y: 128 }, palette.gray);
  } else {
    fillCard(ctx, 42, 72, 160, 112, palette.purple, 'Statin', '降 LDL 並穩定斑塊，是治療骨幹。');
    fillCard(ctx, 232, 72, 160, 112, palette.green, 'Ezetimibe', '抑制腸道吸收，常作為 statin 加成。');
    fillCard(ctx, 422, 72, 160, 112, palette.blue, 'PCSK9 pathway', '減少 LDL receptor 降解，適合高風險殘餘 LDL。');
    fillCard(ctx, width - 202, 72, 160, 112, palette.orange, 'TG strategy', '極高 TG 要先防胰臟炎，路徑與 LDL 控制不同。');
  }
}

function drawAntithromboticTherapy(ctx: CanvasRenderingContext2D, width: number, height: number, modeId: string) {
  if (modeId === 'hemostasis') {
    fillCard(ctx, 50, 72, 170, 112, palette.orange, 'Platelet plug', '高剪應力動脈環境下更重要，ACS 與 stroke 領域核心。');
    fillCard(ctx, width / 2 - 85, 72, 170, 112, palette.red, 'Thrombin / fibrin', '靜脈血栓與 AF stroke prevention 多由這一路主導。');
    fillCard(ctx, width - 220, 72, 170, 112, palette.blue, 'Fibrinolysis', '在特定時機下溶解已形成 clot，但代價是高出血風險。');
  } else if (modeId === 'drug-targets') {
    fillCard(ctx, 42, 72, 160, 112, palette.orange, 'Aspirin / P2Y12', '在血小板活化階段切入。');
    fillCard(ctx, 232, 72, 160, 112, palette.green, 'Heparin / LMWH', '透過 antithrombin 抑制 Xa / IIa。');
    fillCard(ctx, 422, 72, 160, 112, palette.purple, 'Warfarin', '從凝血因子合成源頭降低活性。');
    fillCard(ctx, width - 202, 72, 160, 112, palette.blue, 'DOAC', '直接卡住 Xa 或 IIa，路徑較短。');
  } else {
    fillCard(ctx, 56, 70, 180, 118, palette.red, 'Thrombosis risk', 'AF、recent PCI、cancer、immobility、mechanical valve。');
    fillCard(ctx, width / 2 - 90, 70, 180, 118, palette.orange, 'Bleeding risk', 'age、CKD、GI lesion、triple therapy、falls。');
    fillCard(ctx, width - 236, 70, 180, 118, palette.green, 'Dynamic plan', '真正成熟的 antithrombotic strategy 是持續重估，而不是一次決定。');
    arrow(ctx, { x: 236, y: 129 }, { x: width / 2 - 90, y: 129 }, palette.gray);
    arrow(ctx, { x: width / 2 + 90, y: 129 }, { x: width - 236, y: 129 }, palette.gray);
  }
}

const diagrams: Record<string, DiagramDefinition> = {
  'cv-hemodynamics': {
    title: '高血壓與血流動力學圖',
    caption: '把血壓形成、RAAS 惡性循環與器官傷害放進同一張圖，幫助理解為什麼高血壓是系統性疾病。',
    modes: [
      {
        id: 'pressure-axis',
        label: '壓力軸',
        summary: '血壓不是單一數字，而是心輸出量與外周阻力共同構成的動態平衡。',
        bullets: ['先問 CO 與 SVR 怎麼被推高。', '短期與長期調節不是同一套。', '血壓要接回器官風險理解。'],
      },
      {
        id: 'raas-loop',
        label: 'RAAS',
        summary: 'RAAS 不是只有升血壓，也牽涉鈉水滯留、重塑與器官保護失衡。',
        bullets: ['腎臟是長期設定器。', 'ACEi / ARB / MRA 各切不同節點。', '神經荷爾蒙活化會自我放大。'],
      },
      {
        id: 'organ-damage',
        label: '器官傷害',
        summary: '腦、心、腎與眼底是最需要長期監控的高血壓標的器官。',
        bullets: ['高血壓最怕的是慢性累積傷害。', '沒有症狀也可能已經有器官改變。', '診斷與治療目標都要回到 organ protection。'],
      },
    ],
    render: drawCvHemodynamics,
  },
  'coronary-ischemia': {
    title: '冠狀動脈缺血圖',
    caption: '用一張互動圖串起灌流區域、ACS 形成與供需失衡，協助區分不同型態的缺血性心臟病。',
    modes: [
      {
        id: 'territories',
        label: '灌流區域',
        summary: 'LAD、RCA、LCx 的灌流區域對 ECG、echo 與臨床嚴重度判讀都很重要。',
        bullets: ['前壁梗塞常牽涉較大心肌量。', '下壁要留意右心室與 AV node。', '後壁與側壁變化最容易被低估。'],
      },
      {
        id: 'acs',
        label: 'ACS 形成',
        summary: '斑塊穩定與否，比單純狹窄百分比更能解釋急性冠心症。',
        bullets: ['薄纖維帽與發炎是關鍵。', '血小板是急性破裂後第一線角色。', '再灌流時鐘比背定義更重要。'],
      },
      {
        id: 'supply-demand',
        label: '供需失衡',
        summary: '不是所有缺血都來自完全阻塞；低氧、貧血、頻脈與高血壓都可能造成 demand ischemia。',
        bullets: ['type 1 與 type 2 MI 要分開。', 'troponin 是傷害標記，不是病因標記。', '治療要瞄準真正的失衡來源。'],
      },
    ],
    render: drawCoronaryIschemia,
  },
  'heart-failure-cycle': {
    title: '心衰竭惡性循環圖',
    caption: '把補償、鬱血與現代 GDMT 的切入點並排，方便理解急性與慢性 HF 管理其實在不同時間軸上工作。',
    modes: [
      {
        id: 'compensation',
        label: '惡性循環',
        summary: '低輸出、RAAS / SNS、鬱血與重塑會彼此放大，這是 HF 難以自發好轉的原因。',
        bullets: ['短期補償，長期有毒。', '心腎與肺循環一起被捲入。', '治療是在切斷這個環。'],
      },
      {
        id: 'wet-dry',
        label: '臨床分型',
        summary: 'warm/cold, wet/dry 是急性處置的語言，能快速連到利尿、inotrope 與 shock 評估。',
        bullets: ['warm-wet 最常見。', 'cold-wet 最危險。', 'volume 與 perfusion 要分開評估。'],
      },
      {
        id: 'gdmt',
        label: 'GDMT',
        summary: '利尿劑處理症狀，四大支柱處理重塑與預後，兩者不是替代關係。',
        bullets: ['越早上藥越能改變軌跡。', 'SGLT2i 不是只有糖尿病病人才用。', '藥物排序應看 hemodynamic，而非個人偏好。'],
      },
    ],
    render: drawHeartFailureCycle,
  },
  'electrophysiology-rhythm': {
    title: '心電生理與心律圖',
    caption: '把傳導系統、心搏過速機轉與 QT / 結構性風險放進同一張圖，幫助 ECG 思考不只停在紙面。',
    modes: [
      {
        id: 'conduction',
        label: '傳導系統',
        summary: '節律從 SA node 到心室的正常傳導，決定你怎麼理解 block 與 re-entry。',
        bullets: ['AV node 是保護器也是瓶頸。', 'His-Purkinje 受損會讓 QRS 變寬。', '節律是空間事件，不是平面線條。'],
      },
      {
        id: 'tachy-map',
        label: '機轉地圖',
        summary: 'automaticity、triggered activity 與 re-entry 是最實用的三分法。',
        bullets: ['先問機轉，再選藥或電治療。', 'arrhythmia drug 其實在切不同回路。', '可逆誘因不能跳過。'],
      },
      {
        id: 'qt-risk',
        label: '致心律風險',
        summary: '結構病、通道病、電解質與藥物交互作用會把小問題變成惡性心律。',
        bullets: ['torsades 通常是多因子累積結果。', '結構性心臟病會改寫藥物安全性。', '看 QT 也要看臨床情境。'],
      },
    ],
    render: drawElectrophysiologyRhythm,
  },
  'lipid-atherothrombosis': {
    title: '血脂與斑塊演化圖',
    caption: '從 ApoB 顆粒、內皮、泡沫細胞到降脂藥物切入點，用同一張圖理解動脈粥樣硬化的自然史。',
    modes: [
      {
        id: 'lipoproteins',
        label: '脂蛋白',
        summary: '動脈風險的起點是顆粒負荷與內皮暴露，而不只是單一總膽固醇數字。',
        bullets: ['ApoB 概念有助理解殘餘風險。', 'LDL receptor 是清除主軸。', '代謝症候群讓 remnant burden 上升。'],
      },
      {
        id: 'plaque',
        label: '斑塊形成',
        summary: '斑塊是一段慢性發炎歷程，不是「油卡住血管」這麼簡化。',
        bullets: ['氧化、吞噬、纖維帽缺一不可。', '穩定與脆弱斑塊風險差很多。', '破裂後就進入血栓病理。'],
      },
      {
        id: 'lowering',
        label: '降脂治療',
        summary: 'statin、ezetimibe、PCSK9 類藥物各切不同節點，目標是減少累積 ApoB 暴露與事件。',
        bullets: ['statin 是骨幹。', 'add-on therapy 對高風險族群很重要。', 'TG 管理與 LDL 管理要分開思考。'],
      },
    ],
    render: drawLipidAtherothrombosis,
  },
  'antithrombotic-therapy': {
    title: '抗血栓治療平衡圖',
    caption: '把止血生理、藥物靶點與 thrombosis / bleeding 平衡放在同一畫布，協助快速釐清抗凝與抗血小板的差異。',
    modes: [
      {
        id: 'hemostasis',
        label: '止血生理',
        summary: '血小板、凝血瀑布與纖維溶解問的是不同層次的止血問題。',
        bullets: ['動脈與靜脈血栓主角不同。', 'fibrin 與 platelet 不該混成同一件事。', '臨床上常是兩套系統一起出錯。'],
      },
      {
        id: 'drug-targets',
        label: '藥物靶點',
        summary: '抗血小板、heparin、warfarin 與 DOAC 在路徑中的位置完全不同，這就是臨床差異的來源。',
        bullets: ['起效速度與監測需求隨機轉改變。', '同時使用代表風險疊加。', 'reversal strategy 要先想好。'],
      },
      {
        id: 'balance',
        label: '風險平衡',
        summary: '抗血栓治療不是一次決定，而是反覆重估 thrombosis 與 bleeding 的動態平衡。',
        bullets: ['高風險族群需要更細緻的時間規劃。', '三重治療通常求短不求長。', '病人教育會直接影響結果。'],
      },
    ],
    render: drawAntithromboticTherapy,
  },
  'clinical-cycle': {
    title: '臨床照護與決策循環',
    caption: '切換不同模式，觀察病人照護流程、診斷迴圈與團隊分工如何互相扣連。',
    modes: [
      {
        id: 'care-flow',
        label: '照護流程',
        summary: '從主訴、病史、檢查到處置與追蹤，臨床照護其實是一條持續修正的流程，不是一個單點判斷。',
        bullets: ['初始資料蒐集決定後續方向。', '診斷與治療要同步進行。', '出院與轉銜屬於照護的一部分。'],
      },
      {
        id: 'diagnostic-loop',
        label: '診斷迴圈',
        summary: '診斷不是背答案，而是用資料建立問題表述，再逐步收斂鑑別診斷。',
        bullets: ['Problem representation 比單純列症狀更有用。', '新資料出現時要願意重整假設。', '驗證包含追蹤病程與治療反應。'],
      },
      {
        id: 'team-map',
        label: '團隊地圖',
        summary: '醫療團隊不是平行作業，而是以病人為中心共享資訊與決策。',
        bullets: ['角色不同，但目標一致。', '交班與轉介品質影響安全。', 'Shared decision making 是核心。'],
      },
    ],
    render: drawClinicalCycle,
  },
  'medical-language': {
    title: '醫學語言與檢驗判讀地圖',
    caption: '同一套醫學語言會同時影響病史描述、報告閱讀與檢驗解釋。',
    modes: [
      {
        id: 'term-builder',
        label: '術語組成',
        summary: '字首、字根與字尾像積木一樣組成醫學術語；先拆再讀，理解會比死背穩固。',
        bullets: ['Prefix 常表示程度、方向或速度。', 'Root 常指器官或核心概念。', 'Suffix 往往決定病態或處置類型。'],
      },
      {
        id: 'abg',
        label: 'ABG 邏輯',
        summary: '動脈血氣分析最好用步驟化方式解讀：先看 pH，再看呼吸或代謝成分，最後判斷代償。',
        bullets: ['不要跳過第一步。', 'PaCO2 反映呼吸，HCO3- 反映代謝。', '代償不合理時要懷疑混合性失衡。'],
      },
      {
        id: 'lab-trend',
        label: '數值趨勢',
        summary: '實驗室數值不是單看是否在參考範圍，而是放回時間軸與臨床情境裡判讀。',
        bullets: ['Reference range 不等於 disease cutoff。', '趨勢常比單次值重要。', '單位與檢驗方法不可忽略。'],
      },
    ],
    render: drawMedicalLanguage,
  },
  'cell-signaling': {
    title: '細胞膜、訊號與細胞命運',
    caption: '從運輸、受體到細胞死亡路徑，這些都是理解藥物作用與疾病機轉的地基。',
    modes: [
      {
        id: 'membrane',
        label: '膜運輸',
        summary: '脂雙層與膜蛋白共同決定物質能否進出細胞，以及要靠擴散、載體還是耗能幫浦。',
        bullets: ['脂溶性分子較容易通過膜。', '通道與載體機制不同。', '幫浦常與 ATP 消耗相關。'],
      },
      {
        id: 'signaling',
        label: '訊號放大',
        summary: '一個配體與受體的結合，往往透過第二信使放大成大規模的生理效應。',
        bullets: ['GPCR 與 RTK 是高頻考點。', '第二信使負責放大與轉導。', '最終可能改變基因表現。'],
      },
      {
        id: 'cell-fate',
        label: '細胞命運',
        summary: '相同的壓力來源，依強度與時間不同，細胞可能進入適應、凋亡、壞死或自噬。',
        bullets: ['Apoptosis 通常較不引發發炎。', 'Necrosis 常見於急性嚴重傷害。', 'Autophagy 兼具保護與傷害可能。'],
      },
    ],
    render: drawCellSignal,
  },
  'tissue-map': {
    title: '組織學與器官層級',
    caption: '病理切片不是抽象圖像，而是把微觀結構與器官功能對上位置的語言。',
    modes: [
      {
        id: 'tissue-types',
        label: '四大組織',
        summary: '人體器官由上皮、結締、肌肉與神經組織排列組合而成，不同疾病也偏好傷害特定組織。',
        bullets: ['上皮重視極性與屏障。', '結締組織與基質決定支撐。', '神經與肌肉常反映功能障礙。'],
      },
      {
        id: 'organ-level',
        label: '器官層級',
        summary: '理解器官病理時要能在顯微、功能單位與整體器官三個尺度間切換。',
        bullets: ['微觀結構承擔功能。', '病變常從功能單位開始。', '整體症狀來自局部加總。'],
      },
      {
        id: 'histology-change',
        label: '形態變化',
        summary: '組織形態常反映生物學行為，從適應到惡性病變有連續但不完全線性的路徑。',
        bullets: ['Metaplasia 不等於 cancer。', 'Dysplasia 已經是危險訊號。', '是否侵襲基底膜很重要。'],
      },
    ],
    render: drawTissueMap,
  },
  'homeostasis-loop': {
    title: '恆定性與生理調節',
    caption: '恆定性不是固定不變，而是透過多層次回饋維持可接受範圍。',
    modes: [
      {
        id: 'feedback',
        label: '回饋迴路',
        summary: '大多數生理調節依靠負回饋維持穩定，少數情境才使用正回饋放大訊號。',
        bullets: ['Sensor、integrator、effector 缺一不可。', '設定點會隨情境改變。', '代償不一定代表恢復正常。'],
      },
      {
        id: 'fluid-shift',
        label: '體液分布',
        summary: '水分不是平均分布；不同體液區室與 Starling forces 決定水往哪裡移動。',
        bullets: ['水腫多發生在組織間液。', 'Albumin 對膠體滲透壓很重要。', '鈉與水的調節不完全一樣。'],
      },
      {
        id: 'acid-base',
        label: '酸鹼平衡',
        summary: '酸鹼平衡是肺與腎共同維持的結果，不應把數值只看成單一器官問題。',
        bullets: ['pH 是結果，不是原因。', '肺調 CO2，腎調 HCO3-.', '代償不足要找混合性問題。'],
      },
    ],
    render: drawHomeostasis,
  },
  'pathology-core': {
    title: '病理學總論骨架',
    caption: '病理學的關鍵不是背名詞，而是理解刺激、適應、傷害與修復之間的因果關係。',
    modes: [
      {
        id: 'adaptation',
        label: '適應',
        summary: '細胞先嘗試適應環境壓力；當適應失敗或刺激過強，才會進入可逆或不可逆傷害。',
        bullets: ['萎縮與肥大是常見相對概念。', '增生需要可分裂細胞。', '化生常與慢性刺激有關。'],
      },
      {
        id: 'injury',
        label: '損傷',
        summary: '不同原因造成的細胞損傷，最後常匯流到 ATP 耗竭、氧化壓力與膜受損等共同路徑。',
        bullets: ['Hypoxia 是高頻核心。', 'Calcium overload 會加劇傷害。', 'ROS 會傷害脂質、蛋白與 DNA。'],
      },
      {
        id: 'repair',
        label: '修復',
        summary: '修復結果取決於細胞再生能力、基底膜是否完整，以及刺激是否持續存在。',
        bullets: ['急性發炎是清除與修復起點。', '慢性刺激常走向纖維化。', '再生與瘢痕可同時存在。'],
      },
    ],
    render: drawPathology,
  },
  'microbe-host': {
    title: '病原體與宿主交戰圖',
    caption: '感染學需要同時看病原體特性、宿主防禦與抗微生物藥物選擇壓力。',
    modes: [
      {
        id: 'pathogen-classes',
        label: '病原分類',
        summary: '不同病原體在結構、複製方式與治療靶點上都不同，所以不能用同一套治療邏輯處理。',
        bullets: ['Bacteria 與 virus 差異最大。', 'Fungi 屬真核生物，治療毒性常較高。', 'Parasite 常牽涉生活史與地理暴露。'],
      },
      {
        id: 'infection-chain',
        label: '感染鏈',
        summary: '感染的發生需要病原、入口、宿主易感性與傳播條件；破壞任何一環都可能有效。',
        bullets: ['感染控制重點在阻斷傳播。', '病原毒力與宿主狀態同樣重要。', '定植不等於感染。'],
      },
      {
        id: 'resistance',
        label: '抗藥性',
        summary: '抗藥性不是單純「藥太弱」，而是微生物在選擇壓力下演化出避開藥物的方式。',
        bullets: ['濫用抗生素是主要推手。', '藥敏報告要配合感染部位解讀。', 'Stewardship 是臨床基本功。'],
      },
    ],
    render: drawMicrobe,
  },
  'immune-network': {
    title: '免疫網路圖',
    caption: '先天與後天免疫並不是兩套分離系統，而是時間順序與專一性不同的同一張網路。',
    modes: [
      {
        id: 'innate',
        label: '先天免疫',
        summary: '先天免疫反應快、辨識模式固定，負責第一時間限制病原與通知後天免疫。',
        bullets: ['屏障是第一道防線。', 'PRRs 連結感染與發炎。', '補體與吞噬是高頻核心。'],
      },
      {
        id: 'adaptive',
        label: '後天免疫',
        summary: '後天免疫具有專一性與免疫記憶，能針對特定抗原放大反應並留下長期保護。',
        bullets: ['APC 是橋梁。', 'T 細胞負責調節與殺傷。', 'B 細胞產生抗體與記憶。'],
      },
      {
        id: 'dysregulation',
        label: '失調狀態',
        summary: '免疫系統不是越強越好；過度、錯向或不足，都會產生不同疾病。',
        bullets: ['過敏是過度反應。', '自體免疫是錯向反應。', '免疫缺陷是不足反應。'],
      },
    ],
    render: drawImmunity,
  },
  'oncology-hallmarks': {
    title: '腫瘤生物學關鍵圖',
    caption: '癌症是演化中的疾病，需要同時看分子層級、微環境與臨床分期。',
    modes: [
      {
        id: 'hallmarks',
        label: 'Cancer hallmarks',
        summary: '腫瘤不是單一突變造成，而是多條生物學能力逐步累積的結果。',
        bullets: ['持續增殖訊號很關鍵。', '免疫逃逸與代謝重編程越來越重要。', '不同癌別啟用 hallmarks 的方式不一樣。'],
      },
      {
        id: 'metastasis',
        label: '轉移流程',
        summary: '轉移是多步驟過程，不只是「癌細胞跑出去」，而是需要生存、遷移與定殖能力。',
        bullets: ['侵襲與轉移不是同義詞。', '淋巴與血行轉移途徑不同。', '遠端微環境會決定能否定殖。'],
      },
      {
        id: 'staging',
        label: '分級與分期',
        summary: '分級看外觀異型性，分期看範圍與擴散；兩者都影響預後，但問的問題不同。',
        bullets: ['Grade 不等於 Stage。', 'TNM 是常用分期骨架。', 'Biomarker 也會改變風險分層。'],
      },
    ],
    render: drawOncology,
  },
  'metabolism-map': {
    title: '代謝與能量流向',
    caption: '代謝路徑最容易背散，最有效的學法是抓住器官分工、能量狀態與臨床缺陷點。',
    modes: [
      {
        id: 'fed-fast',
        label: '進食與禁食',
        summary: '人體在不同時間點會切換燃料策略；不理解這個切換，就很難理解代謝病。',
        bullets: ['胰島素與升糖素主導方向。', '肝臟是燃料調度中心。', '脂肪組織不是被動儲存庫。'],
      },
      {
        id: 'atp-flow',
        label: 'ATP 產生',
        summary: '能量生成可被看成從葡萄糖到粒線體的逐步轉換；任何一站出錯都會有特定表型。',
        bullets: ['Glycolysis 在細胞質。', 'TCA 與 ETC 在粒線體。', '缺氧時會改走乳酸方向。'],
      },
      {
        id: 'vitamins',
        label: '維生素與礦物',
        summary: '很多微量營養素雖然量少，但本質上是代謝輔助工具，一缺就先在高需求組織出問題。',
        bullets: ['B 群常與能量代謝緊密相關。', '鐵與銅影響氧化還原。', '鎂常牽涉 ATP 相關反應。'],
      },
    ],
    render: drawMetabolism,
  },
  'genetics-core': {
    title: '遺傳與基因醫學導圖',
    caption: '把中央法則、遺傳模式與基因檢測放在同一張圖裡，才容易接上臨床判讀。',
    modes: [
      {
        id: 'central-dogma',
        label: '中央法則',
        summary: 'DNA、RNA 與蛋白質是基本流程，但臨床上還要加上調控、修復與例外情境。',
        bullets: ['Replication、transcription、translation 是核心。', '並非所有 RNA 都翻譯成蛋白。', 'Reverse transcription 是重要例外。'],
      },
      {
        id: 'inheritance',
        label: '遺傳模式',
        summary: '家系判讀是辨識遺傳模式的第一步，但 penetrance、expressivity 與 de novo mutation 會讓圖譜不那麼教科書。',
        bullets: ['家系圖是思考工具。', '顯性與隱性只是表現規律，不是嚴重度。', 'X 連鎖與粒線體遺傳要分開看。'],
      },
      {
        id: 'testing',
        label: '檢測與判讀',
        summary: '選對檢測比做越多檢測更重要；結果判讀必須回到表型與家族背景。',
        bullets: ['檢測方法有能看見的層級限制。', 'VUS 不等於有病。', '報告需要基因諮詢脈絡。'],
      },
    ],
    render: drawGenetics,
  },
  'pharmacology-core': {
    title: '藥效學核心圖解',
    caption: '把受體類型、劑量反應與致效/拮抗關係放在同一張互動式圖裡，方便把抽象概念接回臨床。',
    modes: [
      {
        id: 'receptors',
        label: '受體類型',
        summary: '不同受體家族決定起效速度、訊號放大方式與耐受性地圖。',
        bullets: ['Ion channel 快、nuclear receptor 慢。', 'GPCR 是臨床藥物最常見靶點。', '標靶治療常鎖定 enzyme-linked 路徑。'],
      },
      {
        id: 'dose-response',
        label: '劑量反應',
        summary: 'Potency 看曲線左右位置，Efficacy 看最高點，兩者不能混為一談。',
        bullets: ['EC50 與 Emax 問的是不同問題。', '右移常見於競爭性拮抗或耐受。', 'Ceiling effect 會限制最大療效。'],
      },
      {
        id: 'agonist-spectrum',
        label: '致效與拮抗',
        summary: '完全致效、部分致效、競爭性與非競爭性拮抗的臨床用法不同。',
        bullets: ['Partial agonist 不是低劑量 full agonist。', 'Competitive antagonist 常可被高濃度 agonist 克服。', 'Noncompetitive antagonist 常讓 Emax 降低。'],
      },
    ],
    render: drawPharmacologyCore,
  },
  'pk-journey': {
    title: '藥動學旅程',
    caption: '切換 ADME、核心參數與穩態模式，建立藥物在人體內移動與消失的完整直覺。',
    modes: [
      {
        id: 'adme',
        label: 'ADME',
        summary: '吸收、分布、代謝、排除不是分離章節，而是一條連續旅程。',
        bullets: ['給藥途徑會改變起始條件。', '器官功能與交互作用可在每一站改寫暴露量。', '病人狀態變化會讓路徑整體失衡。'],
      },
      {
        id: 'parameters',
        label: '核心參數',
        summary: 'Vd、CL 與 t1/2 是設計 loading、maintenance 與採樣時機的最重要三角。',
        bullets: ['Vd 問去哪裡。', 'CL 問清多少。', 't1/2 是兩者共同結果。'],
      },
      {
        id: 'steady-state',
        label: '穩態設計',
        summary: 'Loading dose 負責快，maintenance 負責穩，兩者不能混成一個概念。',
        bullets: ['Loading 主要看 Vd。', 'Maintenance 主要看 CL。', '4 到 5 個半衰期只是近似規則。'],
      },
    ],
    render: drawPkJourney,
  },
  'interaction-risk': {
    title: '交互作用與 ADR 風險網路',
    caption: '從酵素、轉運蛋白到藥效學加成與不良反應分類，快速辨認高風險組合。',
    modes: [
      {
        id: 'pk',
        label: '藥動交互作用',
        summary: 'CYP、酵素誘導與轉運蛋白會改變濃度，窄治療窗藥物風險最大。',
        bullets: ['抑制常來得快。', '誘導常來得慢、停得也慢。', '轉運蛋白常被忽略。'],
      },
      {
        id: 'pd',
        label: '藥效加成',
        summary: '很多嚴重交互作用不是濃度改變，而是風險往同一方向疊加。',
        bullets: ['QT、出血、鎮靜與 serotonin excess 是高頻類型。', '器官功能與電解質會放大風險。', '不同類藥也可能在同一風險終點會合。'],
      },
      {
        id: 'adr',
        label: 'ADR 分類',
        summary: '先分清楚是 Type A 還是 Type B，再決定停藥、減量、再挑戰與通報。',
        bullets: ['可預測與不可預測要分開。', '停藥反應與治療失敗也屬 ADR 框架。', '時間序列是判讀核心。'],
      },
    ],
    render: drawInteractionRisk,
  },
  'dosage-design': {
    title: '劑型與製劑設計圖',
    caption: '比較劑型選擇、吸收設計與無菌調配風險，理解藥物如何被安全送到目標位置。',
    modes: [
      {
        id: 'forms',
        label: '劑型比較',
        summary: '同一主成分進不同劑型，代表不同的治療節奏與使用風險。',
        bullets: ['IR、ER、注射、吸入與貼片問的是不同問題。', '便利性與安全性都受劑型影響。', '技巧型劑型不能只靠口頭說明。'],
      },
      {
        id: 'biopharm',
        label: '吸收設計',
        summary: '溶解度、通透性、首渡效應共同決定口服表現，製劑設計在解決這些限制。',
        bullets: ['不是所有口服藥都追求最高 F。', '前驅藥與奈米載體都在改寫輸送條件。', 'pH 與轉運蛋白同樣重要。'],
      },
      {
        id: 'sterile',
        label: '無菌與相容',
        summary: 'Sterility、compatibility 與 stability 缺一不可，這些問題多數發生在系統細節。',
        bullets: ['透明不等於相容。', '容器與 tubing 也會改變實際到藥量。', '稀釋液、濃度與光熱條件都要守規則。'],
      },
    ],
    render: drawDosageDesign,
  },
  'medication-system': {
    title: '處方、調劑與衛教系統',
    caption: '從處方開立到病人真正理解用藥，這是一條資訊與責任的接力流程。',
    modes: [
      {
        id: 'prescription',
        label: '處方流程',
        summary: '開立、審核、調劑與交付每一站都在攔截不同型態的錯誤。',
        bullets: ['錯誤若越早攔下，代價越低。', '電子化並不會自動消滅錯誤。', '適應症與劑量邏輯應在前端完成。'],
      },
      {
        id: 'counseling',
        label: '衛教地圖',
        summary: '病人是否理解、能否操作與何時求助，決定最後一哩是否真正完成。',
        bullets: ['Teach-back 比點頭更可靠。', '裝置型藥物要示範。', '警訊教育要具體。'],
      },
      {
        id: 'literature',
        label: '資訊層級',
        summary: '不同層級文獻適合回答不同速度與深度的臨床問題。',
        bullets: ['先問問題，再決定去哪裡找。', '三級文獻快，但不一定夠深。', '高風險決策要追到原始研究。'],
      },
    ],
    render: drawMedicationSystem,
  },
  'medication-review': {
    title: '藥物治療問題掃描圖',
    caption: '用 DTP 架構把 indication、effectiveness、safety、adherence 與 monitoring 放到同一視野。',
    modes: [
      {
        id: 'dtp',
        label: 'DTP 架構',
        summary: '完整的 medication review 不是只看副作用，而是六個面向一起掃描。',
        bullets: ['Indication 與 patient goal 是起點。', 'Effectiveness 與 safety 要並行。', 'Monitoring 與 adherence 決定計畫能否落地。'],
      },
      {
        id: 'adherence',
        label: '依從障礙',
        summary: '依從性問題通常來自理解、可近性、執行能力與動機中的其中一塊。',
        bullets: ['不要把不遵從簡化成態度問題。', 'Access 與 device skill 常被低估。', '問法要中性才能得到真答案。'],
      },
      {
        id: 'monitoring',
        label: '監測閉環',
        summary: '高品質用藥管理要先定義基線、追蹤與調整門檻，而不是事後補救。',
        bullets: ['沒有 action threshold 的監測價值低。', '療效與毒性都要追。', 'Adjust 是閉環最後一步。'],
      },
    ],
    render: drawMedicationReview,
  },
  'special-populations': {
    title: '特殊族群藥療地圖',
    caption: '兒科、老年、妊娠與器官功能改變病人都會讓標準劑量失去標準意義。',
    modes: [
      {
        id: 'pediatrics',
        label: '兒科',
        summary: '兒科不是縮小版成人；劑量、間隔與風險都跟發育階段一起變。',
        bullets: ['週齡與日齡都可能重要。', '單位錯誤是高風險來源。', 'off-label 並不罕見。'],
      },
      {
        id: 'geriatrics',
        label: '老年',
        summary: '老年藥療的重點是多重用藥、脆弱性與功能結果，不只是腎功能下降。',
        bullets: ['Falls / delirium 很常和藥相關。', 'Deprescribing 是主動策略。', 'Frailty 會改寫風險收益比。'],
      },
      {
        id: 'complex',
        label: '妊娠與重症',
        summary: '妊娠、腎肝病、肥胖與重症都會讓藥動學快速偏離平常規則。',
        bullets: ['先比較治療與不治療風險。', '肥胖與重症常不是單純減量。', '器官支持治療會改變藥物移除。'],
      },
    ],
    render: drawSpecialPopulations,
  },
  'pharmacogenomics-roadmap': {
    title: '藥物基因體學路徑圖',
    caption: '把 DNA 變異、代謝表現型、臨床可操作性與 EHR 整合放進同一張圖裡。',
    modes: [
      {
        id: 'gene-flow',
        label: '基因到反應',
        summary: 'DNA 變異透過 phenotype 影響暴露量、毒性與療效，但不會消除其他臨床變數。',
        bullets: ['Genotype 與 phenotype 要分開。', 'HLA 類型多牽涉免疫風險。', 'CYP 類型多牽涉代謝能力。'],
      },
      {
        id: 'actionable',
        label: '何時值得驗',
        summary: '是否 actionable、是否來得及回報、是否可重複使用，決定檢測價值。',
        bullets: ['不是所有藥都值得常規檢測。', '高證據 gene-drug pair 最有價值。', '時效常比理論完美更重要。'],
      },
      {
        id: 'integration',
        label: '系統整合',
        summary: '沒有 EHR 與 CDS 支援，再好的基因結果也可能被遺忘在 PDF 報告裡。',
        bullets: ['結果應長期可讀取。', 'CDS 應提供替代建議。', 'pre-emptive genotyping 需要治理機制。'],
      },
    ],
    render: drawPharmacogenomicsRoadmap,
  },
  'evidence-therapeutics': {
    title: '實證治療學決策圖',
    caption: '把研究設計、終點判讀與病人偏好放進同一套決策邏輯，避免把指引當成自動駕駛。',
    modes: [
      {
        id: 'pyramid',
        label: '研究層級',
        summary: '高層級證據有價值，但仍要檢查來源品質與是否適用到你的病人。',
        bullets: ['外部效度與內部效度都重要。', 'Meta-analysis 不是自動正確。', '真實世界資料能補足 RCT 缺口。'],
      },
      {
        id: 'endpoints',
        label: '終點判讀',
        summary: 'Surrogate、hard outcome 與 patient-reported outcome 問的是不同層次的好處。',
        bullets: ['不要只看相對風險。', 'NNT / NNH 要加上時間軸。', 'Composite endpoint 要拆開看。'],
      },
      {
        id: 'decision',
        label: '回到病人',
        summary: 'Evidence、context 與 preference 缺一不可，這才是真正的治療學決策。',
        bullets: ['指引是地圖，不是鎖死路線。', '成本與監測能力是臨床變數。', '病人價值排序會改變最佳方案。'],
      },
    ],
    render: drawEvidenceTherapeutics,
  },
  'tdm-safety': {
    title: 'TDM 與高警示藥安全圖',
    caption: '用互動式圖解看採樣時機、高警示藥品風險與系統性防錯框架。',
    modes: [
      {
        id: 'sampling',
        label: '採樣時機',
        summary: '抽對時間、問對臨床問題，濃度數字才有意義。',
        bullets: ['dose time 與 sample time 同等重要。', '穩態前後解讀不同。', 'clinical state 不能被濃度取代。'],
      },
      {
        id: 'high-alert',
        label: '高警示藥',
        summary: '高警示藥一旦錯誤，傷害特別大，因此必須用系統設計降低變異。',
        bullets: ['Insulin、anticoagulant、opioid、濃縮電解質是高頻核心。', '雙核對要真正獨立。', '智慧泵浦要配合標準藥庫。'],
      },
      {
        id: 'systems',
        label: '防錯系統',
        summary: '標準化、偵測與回饋改進三者並行，才能把安全變成系統能力。',
        bullets: ['只責怪個人無法預防再發。', 'Near miss 同樣有學習價值。', '高價值警示比大量警示更有效。'],
      },
    ],
    render: drawTdmSafety,
  },
  'advanced-therapies': {
    title: '新興治療平台導圖',
    caption: '比較小分子、生物製劑、核酸藥物與細胞/基因治療的作用層級與系統挑戰。',
    modes: [
      {
        id: 'platforms',
        label: '平台比較',
        summary: '不同治療平台在分子大小、給藥方式、交互作用與毒性型態上都很不同。',
        bullets: ['small molecule 常可口服。', 'biologic 常需注射與冷鏈。', 'cell / gene therapy 複雜度最高。'],
      },
      {
        id: 'antibody-map',
        label: '抗體平台',
        summary: 'mAb、fusion protein 與 ADC 都在抗體框架上延伸，但風險與用途不同。',
        bullets: ['輸注反應與免疫原性要預先準備。', 'ADC 是導引加 payload。', 'biosimilar 不是 generic 的生物版。'],
      },
      {
        id: 'dna-rna',
        label: 'DNA / RNA 層級',
        summary: '越往上游介入，理論潛力越大，但遞送、脫靶與長期安全性也越複雜。',
        bullets: ['mRNA 是暫時性訊息輸入。', 'siRNA / ASO 多半在 RNA 層級調整。', 'gene therapy 可能帶來一次性長期效果，也帶來長期不確定性。'],
      },
    ],
    render: drawAdvancedTherapies,
  },
};

@customElement('medical-canvas')
export class MedicalCanvas extends LitElement {
  @property({ type: String }) diagram = '';
  @state() private activeModeId = '';
  @state() private zoom = 1;
  @query('canvas') private canvasEl!: HTMLCanvasElement;
  @query('.viewport') private viewportEl!: HTMLDivElement;

  private resizeObserver: ResizeObserver | null = null;
  private static readonly minZoom = 0.75;
  private static readonly maxZoom = 2.5;
  private static readonly zoomStep = 0.25;

  static override styles = css`
    :host {
      display: block;
      margin: 24px 0 28px;
      border: 1px solid rgba(148, 163, 184, 0.3);
      border-radius: 24px;
      background:
        radial-gradient(circle at top left, rgba(37, 99, 235, 0.08), transparent 42%),
        linear-gradient(180deg, rgba(248, 250, 252, 0.98), rgba(241, 245, 249, 0.96));
      box-shadow: 0 18px 40px rgba(15, 23, 42, 0.08);
      overflow: hidden;
    }

    .shell {
      display: grid;
      gap: 16px;
      padding: 20px;
    }

    .header {
      display: grid;
      gap: 8px;
    }

    .eyebrow {
      font: 700 11px/1 ui-sans-serif, -apple-system, BlinkMacSystemFont, sans-serif;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: #475569;
    }

    h3 {
      margin: 0;
      font: 700 1.05rem/1.35 ui-sans-serif, -apple-system, BlinkMacSystemFont, sans-serif;
      color: #0f172a;
    }

    p {
      margin: 0;
      color: #334155;
      font: 400 0.95rem/1.7 ui-sans-serif, -apple-system, BlinkMacSystemFont, sans-serif;
    }

    .toolbar {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }

    button {
      appearance: none;
      border: 1px solid rgba(148, 163, 184, 0.4);
      background: rgba(255, 255, 255, 0.84);
      color: #0f172a;
      border-radius: 999px;
      padding: 8px 12px;
      font: 600 0.82rem/1 ui-sans-serif, -apple-system, BlinkMacSystemFont, sans-serif;
      cursor: pointer;
      transition: transform 120ms ease, border-color 120ms ease, background 120ms ease;
    }

    button:hover {
      transform: translateY(-1px);
      border-color: rgba(37, 99, 235, 0.55);
    }

    button.active {
      background: #0f172a;
      color: white;
      border-color: #0f172a;
    }

    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none;
    }

    button:disabled:hover {
      transform: none;
      border-color: rgba(148, 163, 184, 0.4);
    }

    .surface {
      position: relative;
      display: grid;
      gap: 12px;
      padding: 12px;
      border-radius: 18px;
      border: 1px solid rgba(148, 163, 184, 0.28);
      background:
        linear-gradient(180deg, rgba(255, 255, 255, 0.96), rgba(248, 250, 252, 0.96)),
        linear-gradient(90deg, rgba(148, 163, 184, 0.1) 1px, transparent 1px),
        linear-gradient(rgba(148, 163, 184, 0.08) 1px, transparent 1px);
      background-size: auto, 22px 22px, 22px 22px;
      overflow: hidden;
    }

    .surface-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      flex-wrap: wrap;
    }

    .surface-label {
      color: #475569;
      font: 600 0.8rem/1 ui-sans-serif, -apple-system, BlinkMacSystemFont, sans-serif;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }

    .zoom-controls {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px;
      border: 1px solid rgba(148, 163, 184, 0.35);
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.82);
      backdrop-filter: blur(10px);
    }

    .zoom-controls button {
      min-width: 38px;
      padding: 8px 10px;
    }

    .zoom-readout {
      min-width: 58px;
      text-align: center;
      color: #0f172a;
      font: 700 0.82rem/1 ui-sans-serif, -apple-system, BlinkMacSystemFont, sans-serif;
    }

    .zoom-controls button.active .zoom-readout {
      color: white;
    }

    .viewport {
      aspect-ratio: 16 / 9;
      overflow: auto;
      border-radius: 14px;
      scrollbar-gutter: stable both-edges;
      touch-action: pan-x pan-y;
      overscroll-behavior: contain;
    }

    canvas {
      display: block;
      max-width: none;
    }

    .details {
      display: grid;
      gap: 10px;
      padding: 2px 2px 0;
    }

    ul {
      margin: 0;
      padding-left: 1.1rem;
      display: grid;
      gap: 6px;
      color: #334155;
      font: 400 0.9rem/1.65 ui-sans-serif, -apple-system, BlinkMacSystemFont, sans-serif;
    }

    @media (max-width: 767px) {
      .shell {
        padding: 16px;
      }
    }
  `;

  override connectedCallback() {
    super.connectedCallback();
    this.syncActiveMode();
  }

  override firstUpdated() {
    this.resizeObserver = new ResizeObserver(() => this.draw());
    if (this.viewportEl) {
      this.resizeObserver.observe(this.viewportEl);
    }
    this.draw();
  }

  override disconnectedCallback() {
    this.resizeObserver?.disconnect();
    this.resizeObserver = null;
    super.disconnectedCallback();
  }

  override updated(changed: Map<string, unknown>) {
    if (changed.has('diagram')) {
      this.syncActiveMode();
    }
    this.draw();
  }

  private syncActiveMode() {
    const definition = diagrams[this.diagram];
    if (!definition) {
      this.activeModeId = '';
      return;
    }
    if (!definition.modes.some(mode => mode.id === this.activeModeId)) {
      this.activeModeId = definition.modes[0]?.id ?? '';
    }
  }

  private draw() {
    const definition = diagrams[this.diagram];
    if (!definition || !this.canvasEl || !this.viewportEl) return;

    const rect = this.viewportEl.getBoundingClientRect();
    const viewportWidth = Math.max(1, Math.round(rect.width));
    const logicalWidth = viewportWidth < 760 ? 920 : Math.max(760, viewportWidth);
    const logicalHeight = Math.round(logicalWidth * 9 / 16);
    const baseDisplayWidth = viewportWidth;
    const baseDisplayHeight = Math.round(baseDisplayWidth * 9 / 16);
    const displayWidth = Math.round(baseDisplayWidth * this.zoom);
    const displayHeight = Math.round(baseDisplayHeight * this.zoom);
    const rasterScale = Math.max(1, displayWidth / logicalWidth);
    const dpr = window.devicePixelRatio || 1;

    this.canvasEl.style.width = `${displayWidth}px`;
    this.canvasEl.style.height = `${displayHeight}px`;
    this.canvasEl.width = Math.floor(logicalWidth * dpr * rasterScale);
    this.canvasEl.height = Math.floor(logicalHeight * dpr * rasterScale);

    const ctx = this.canvasEl.getContext('2d');
    if (!ctx) return;

    ctx.setTransform(dpr * rasterScale, 0, 0, dpr * rasterScale, 0, 0);
    ctx.clearRect(0, 0, logicalWidth, logicalHeight);

    const background = ctx.createLinearGradient(0, 0, 0, logicalHeight);
    background.addColorStop(0, '#ffffff');
    background.addColorStop(1, '#f8fafc');
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, logicalWidth, logicalHeight);
    definition.render(ctx, logicalWidth, logicalHeight, this.activeModeId);
  }

  private clampZoom(nextZoom: number) {
    return Math.min(MedicalCanvas.maxZoom, Math.max(MedicalCanvas.minZoom, Number(nextZoom.toFixed(2))));
  }

  private async setZoom(nextZoom: number, anchor?: { x: number; y: number }) {
    const viewport = this.viewportEl;
    const clampedZoom = this.clampZoom(nextZoom);
    if (!viewport || clampedZoom === this.zoom) {
      return;
    }

    const focusX = anchor?.x ?? viewport.clientWidth / 2;
    const focusY = anchor?.y ?? viewport.clientHeight / 2;
    const sceneX = (viewport.scrollLeft + focusX) / this.zoom;
    const sceneY = (viewport.scrollTop + focusY) / this.zoom;

    this.zoom = clampedZoom;
    await this.updateComplete;

    viewport.scrollLeft = Math.max(0, sceneX * clampedZoom - focusX);
    viewport.scrollTop = Math.max(0, sceneY * clampedZoom - focusY);
  }

  private handleZoomStep(direction: 1 | -1) {
    void this.setZoom(this.zoom + direction * MedicalCanvas.zoomStep);
  }

  private handleZoomReset = () => {
    void this.setZoom(1);
  };

  private handleViewportWheel = (event: WheelEvent) => {
    if (!event.ctrlKey && !event.metaKey) {
      return;
    }

    event.preventDefault();
    const rect = this.viewportEl.getBoundingClientRect();
    const anchor = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
    const zoomFactor = Math.exp(-event.deltaY * 0.0025);
    void this.setZoom(this.zoom * zoomFactor, anchor);
  };

  override render() {
    const definition = diagrams[this.diagram];
    if (!definition) {
      return html``;
    }

    const activeMode = definition.modes.find(mode => mode.id === this.activeModeId) ?? definition.modes[0];

    return html`
      <div class="shell">
        <div class="header">
          <div class="eyebrow">Interactive Canvas</div>
          <h3>${definition.title}</h3>
          <p>${definition.caption}</p>
        </div>
        <div class="toolbar">
          ${definition.modes.map(mode => html`
            <button
              class=${mode.id === activeMode.id ? 'active' : ''}
              @click=${() => { this.activeModeId = mode.id; }}
            >
              ${mode.label}
            </button>
          `)}
        </div>
        <div class="surface">
          <div class="surface-bar">
            <div class="surface-label">Canvas Zoom</div>
            <div class="zoom-controls">
              <button
                type="button"
                @click=${() => this.handleZoomStep(-1)}
                ?disabled=${this.zoom <= MedicalCanvas.minZoom}
                aria-label="縮小 Canvas"
              >
                -
              </button>
              <button
                type="button"
                class=${this.zoom === 1 ? 'active' : ''}
                @click=${this.handleZoomReset}
                aria-label="重設 Canvas 縮放"
              >
                <span class="zoom-readout">${Math.round(this.zoom * 100)}%</span>
              </button>
              <button
                type="button"
                @click=${() => this.handleZoomStep(1)}
                ?disabled=${this.zoom >= MedicalCanvas.maxZoom}
                aria-label="放大 Canvas"
              >
                +
              </button>
            </div>
          </div>
          <div class="viewport" @wheel=${this.handleViewportWheel}>
            <canvas></canvas>
          </div>
        </div>
        <div class="details">
          <p>${activeMode.summary}</p>
          <ul>
            ${activeMode.bullets.map(item => html`<li>${item}</li>`)}
          </ul>
        </div>
      </div>
    `;
  }
}
