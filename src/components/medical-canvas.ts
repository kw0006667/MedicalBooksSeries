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

const diagrams: Record<string, DiagramDefinition> = {
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
};

@customElement('medical-canvas')
export class MedicalCanvas extends LitElement {
  @property({ type: String }) diagram = '';
  @state() private activeModeId = '';
  @query('canvas') private canvasEl!: HTMLCanvasElement;

  private resizeObserver: ResizeObserver | null = null;

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

    .surface {
      position: relative;
      border-radius: 18px;
      border: 1px solid rgba(148, 163, 184, 0.28);
      overflow: hidden;
      background:
        linear-gradient(180deg, rgba(255, 255, 255, 0.96), rgba(248, 250, 252, 0.96)),
        linear-gradient(90deg, rgba(148, 163, 184, 0.1) 1px, transparent 1px),
        linear-gradient(rgba(148, 163, 184, 0.08) 1px, transparent 1px);
      background-size: auto, 22px 22px, 22px 22px;
      aspect-ratio: 16 / 9;
      touch-action: pan-x pan-y pinch-zoom;
    }

    canvas {
      width: 100%;
      height: 100%;
      display: block;
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
    this.resizeObserver.observe(this);
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
    if (!definition || !this.canvasEl) return;

    const rect = this.canvasEl.getBoundingClientRect();
    const renderWidth = rect.width < 760 ? 920 : Math.max(760, Math.round(rect.width));
    const renderHeight = Math.round(renderWidth * 9 / 16);
    const dpr = window.devicePixelRatio || 1;

    this.canvasEl.width = Math.floor(renderWidth * dpr);
    this.canvasEl.height = Math.floor(renderHeight * dpr);

    const ctx = this.canvasEl.getContext('2d');
    if (!ctx) return;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, renderWidth, renderHeight);

    const background = ctx.createLinearGradient(0, 0, 0, renderHeight);
    background.addColorStop(0, '#ffffff');
    background.addColorStop(1, '#f8fafc');
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, renderWidth, renderHeight);
    definition.render(ctx, renderWidth, renderHeight, this.activeModeId);
  }

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
          <canvas></canvas>
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
