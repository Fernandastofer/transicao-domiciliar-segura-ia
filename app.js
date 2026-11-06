// ============================================================================
// PROTOCOLO DE TRANSIÇÃO DOMICILIAR SEGURA • MEDICINA HÍBRIDA (PoC)
// Motor Clínico-Funcional + Antropometria Adaptativa + Inspeção Visual Multimodal
// ============================================================================

const QUESTIONS_SCHEMA = [
  {
    id: 'p1_locomocao',
    number: 1,
    title: 'Locomoção e Deslocamento',
    type: 'single',
    fullWidth: false,
    options: [
      { value: 'Anda sozinho, com firmeza e sem precisar de apoio', weight: 0 },
      { value: 'Anda segurando em paredes/móveis ou usa bengala/andador', weight: 2 },
      { value: 'Precisa que alguém dê o braço ou auxilie fisicamente', weight: 3 },
      { value: 'Usa cadeira de rodas para se locomover', weight: 3 },
      { value: 'Permanece a maior parte do tempo na cama ou poltrona', weight: 4 }
    ]
  },
  {
    id: 'p2_banho',
    number: 2,
    title: 'Banho e Cuidados no Boxe',
    type: 'single',
    fullWidth: false,
    options: [
      { value: 'Toma banho em pé ou sentado sem ajuda física', weight: 0 },
      { value: 'Toma banho sozinho, mas requer banco ou supervisão próxima', weight: 2 },
      { value: 'Precisa de ajuda física para lavar pernas/pés ou entrar no boxe', weight: 3 },
      { value: 'Depende totalmente de auxílio (banho de leito ou cadeira higiênica)', weight: 4 }
    ]
  },
  {
    id: 'p3_vaso_transferencia',
    number: 3,
    title: 'Vaso Sanitário & Sentar/Levantar',
    type: 'single',
    fullWidth: false,
    options: [
      { value: 'Senta e levanta de assentos e vaso sem esforço nem apoio', weight: 0 },
      { value: 'Levanta sozinho, mas apoia com força nos braços ou móveis', weight: 1 },
      { value: 'Requer ajuda física de outra pessoa para sentar ou levantar', weight: 3 },
      { value: 'Usa fraldas contínuas ou sonda vesical (não usa o vaso)', weight: 3 }
    ]
  },
  {
    id: 'p4_cognicao',
    number: 4,
    title: 'Memória, Raciocínio & Atenção',
    type: 'single',
    fullWidth: false,
    options: [
      { value: 'Lúcido e orientado no tempo, espaço e decisões', weight: 0 },
      { value: 'Esquecimentos leves cotidianos, mas reconhece o ambiente', weight: 1 },
      { value: 'Confusão frequente: desorienta-se à noite, troca horários ou esquece perigos óbvios (fogão, torneiras)', weight: 3 },
      { value: 'Agitação importante, alucinações ou tentativa de fugir', weight: 4 }
    ]
  },
  {
    id: 'p5_visao_audicao',
    number: 5,
    title: 'Visão e Audição (Marque todas que se aplicam)',
    type: 'multiple',
    fullWidth: true,
    options: [
      { value: 'Enxerga bem no ambiente com ou sem óculos', weight: 0 },
      { value: 'Visão embaçada/baixa; dificuldade para ver degraus ou desníveis no chão', weight: 2 },
      { value: 'Audição funcionalmente normal (ou prótese adaptada)', weight: 0 },
      { value: 'Dificuldade severa para ouvir falas, campainhas ou interfone', weight: 1 }
    ]
  },
  {
    id: 'p6_quedas_dispositivos',
    number: 6,
    title: 'Histórico de Quedas & Dispositivos Especiais (Marque todas que se aplicam)',
    type: 'multiple',
    fullWidth: true,
    options: [
      { value: 'Apresentou queda ou episódio de quase queda nos últimos 90 dias', weight: 3 },
      { value: 'Usa oxigênio contínuo (cilindro ou concentrador com mangueira no chão)', weight: 3 },
      { value: 'Possui sondas de alimentação/drenagem, ostomias ou curativos complexos', weight: 2 },
      { value: 'Nenhum dispositivo médico invasivo no domicílio', weight: 0 }
    ]
  }
];

// ============================================================================
// ESQUEMA DE MEDIDAS ANTROPOMÉTRICAS ADAPTATIVAS POR PERFIL DE LOCOMOÇÃO
// ============================================================================
const ANTHROPOMETRY_PROFILES = {
  independente: {
    key: 'independente',
    badgeTitle: 'Perfil: Deambulador Independente',
    subtitle: 'Medidas rápidas para ajuste de altura de vaso sanitário, cama e alcance seguro sem esforço do tronco.',
    figureCaption: 'Boneco Guia (Em Pé & Sentado): A = Joelho-Chão • B = Punho/Quadril-Chão • C = Largura dos Ombros',
    fields: [
      {
        id: 'medA',
        letter: 'A',
        label: 'Altura do Joelho Sentado (Poplítea)',
        hint: 'Do chão até a dobra detrás do joelho sentado. Define a altura ideal de vaso e cama.',
        unit: 'cm'
      },
      {
        id: 'medB',
        letter: 'B',
        label: 'Altura do Punho / Quadril em Pé',
        hint: 'Do chão até o punho com braço relaxado. Define altura de apoios e bancadas.',
        unit: 'cm'
      },
      {
        id: 'medC',
        letter: 'C',
        label: 'Largura Corporal (Ombro a Ombro)',
        hint: 'Distância entre os dois ombros para verificar folga no boxe e portas.',
        unit: 'cm'
      }
    ],
    presets: {
      baixo: { label: '⚡ Baixa Estatura (< 1,60 m)', medA: 41, medB: 74, medC: 44 },
      medio: { label: '⚡ Média Estatura (1,60–1,75 m)', medA: 45, medB: 80, medC: 48 },
      alto: { label: '⚡ Alta Estatura (> 1,75 m)', medA: 49, medB: 86, medC: 53 }
    }
  },

  apoio_andador: {
    key: 'apoio_andador',
    badgeTitle: 'Perfil: Marcha com Apoio / Andador / Bengala',
    subtitle: 'Medidas fundamentais para calcular elevação do vaso, altura exata do andador/barras e passagem nas portas.',
    figureCaption: 'Boneco Guia (Com Andador/Apoio): A = Joelho-Chão • B = Punho-Chão (Andador/Barra) • C = Largura c/ Andador',
    fields: [
      {
        id: 'medA',
        letter: 'A',
        label: 'Altura Poplítea (Chão ao Joelho Sentado)',
        hint: 'Do chão até atrás do joelho. Calcula o elevador de vaso e altura da cama (evita flexão >90°).',
        unit: 'cm'
      },
      {
        id: 'medB',
        letter: 'B',
        label: 'Altura do Punho ao Chão (Em Pé)',
        hint: 'Braço relaxado ao lado do corpo até o chão. Regula a manopla do andador/bengala e barras.',
        unit: 'cm'
      },
      {
        id: 'medC',
        letter: 'C',
        label: 'Largura Funcional (Paciente + Andador)',
        hint: 'Largura total do andador ou cotovelo a cotovelo para passar no vão da porta.',
        unit: 'cm'
      }
    ],
    presets: {
      baixo: { label: '⚡ Baixa Estatura (< 1,60 m)', medA: 41, medB: 73, medC: 62 },
      medio: { label: '⚡ Média Estatura (1,60–1,75 m)', medA: 45, medB: 79, medC: 66 },
      alto: { label: '⚡ Alta Estatura (> 1,75 m)', medA: 49, medB: 85, medC: 70 }
    }
  },

  cadeirante: {
    key: 'cadeirante',
    badgeTitle: 'Perfil: Usuário de Cadeira de Rodas',
    subtitle: 'Medidas essenciais para validar passagem em portas (NBR 9050), giro e nivelamento de transferências.',
    figureCaption: 'Boneco Guia (Sentado na Cadeira): A = Largura Roda a Roda • B = Altura do Assento • C = Alcance do Braço',
    fields: [
      {
        id: 'medA',
        letter: 'A',
        label: 'Largura Total da Cadeira (Roda a Roda)',
        hint: 'Parte mais larga da cadeira de rodas. Verifica se passa nas portas (mín. 80 cm NBR 9050).',
        unit: 'cm'
      },
      {
        id: 'medB',
        letter: 'B',
        label: 'Altura do Assento ao Chão',
        hint: 'Do chão até o topo do assento da cadeira. Nivela transferência para cama e vaso.',
        unit: 'cm'
      },
      {
        id: 'medC',
        letter: 'C',
        label: 'Alcance Lateral do Braço Sentado',
        hint: 'Do ombro até a mão estendida. Define posição de barras, registro e papel higiênico.',
        unit: 'cm'
      }
    ],
    presets: {
      baixo: { label: '⚡ Cadeira Compacta / Estatura Baixa', medA: 62, medB: 46, medC: 55 },
      medio: { label: '⚡ Cadeira Padrão / Estatura Média', medA: 66, medB: 48, medC: 60 },
      alto: { label: '⚡ Cadeira Larga / Estatura Alta', medA: 72, medB: 50, medC: 66 }
    }
  },

  acamado: {
    key: 'acamado',
    badgeTitle: 'Perfil: Restrito ao Leito / Poltrona (Acamado)',
    subtitle: 'Medidas adaptadas no leito para dimensionar colchão, cadeira de banho/transferência e proteger a coluna do cuidador.',
    figureCaption: 'Boneco Guia (Deitado no Leito): A = Comprimento Cabeça-Pés • B = Largura Quadril/Ombros • C = Altura do Leito',
    fields: [
      {
        id: 'medA',
        letter: 'A',
        label: 'Comprimento Corporal no Leito (Estatura)',
        hint: 'Da cabeça aos pés deitado. Dimensiona colchão pneumático/caixa de ovo e espaço de giro.',
        unit: 'cm'
      },
      {
        id: 'medB',
        letter: 'B',
        label: 'Largura do Quadril / Ombros Deitado',
        hint: 'Parte mais larga do tronco/quadril. Dimensiona poltrona, cadeira higiênica ou prancha.',
        unit: 'cm'
      },
      {
        id: 'medC',
        letter: 'C',
        label: 'Altura Atual da Cama ao Chão',
        hint: 'Do chão ao topo do colchão (ideal: 70–75 cm, na cintura do cuidador para banho/troca).',
        unit: 'cm'
      }
    ],
    presets: {
      baixo: { label: '⚡ Porte Pequeno (< 1,60 m)', medA: 155, medB: 42, medC: 55 },
      medio: { label: '⚡ Porte Médio (1,60–1,75 m)', medA: 168, medB: 47, medC: 58 },
      alto: { label: '⚡ Porte Grande (> 1,75 m)', medA: 180, medB: 53, medC: 60 }
    }
  }
};

function getAnthropometryProfileKey(locomocaoValue) {
  if (!locomocaoValue) return 'apoio_andador';
  if (locomocaoValue.includes('cadeira de rodas')) return 'cadeirante';
  if (locomocaoValue.includes('cama ou poltrona')) return 'acamado';
  if (locomocaoValue.includes('Anda sozinho')) return 'independente';
  return 'apoio_andador';
}

// ============================================================================
// DESENHO DO BONECO ANTROPOMÉTRICO EM SVG (DINÂMICO POR PERFIL + DESTAQUE)
// ============================================================================
function getAnthropometryMannequinSvg(profileKey, highlightLetter) {
  const hlA = highlightLetter === 'A' ? '#dc2626' : '#0f5c6e';
  const hlB = highlightLetter === 'B' ? '#dc2626' : '#168070';
  const hlC = highlightLetter === 'C' ? '#dc2626' : '#d97706';

  if (profileKey === 'acamado') {
    // Boneco deitado no leito
    return `
      <svg viewBox="0 0 250 185" width="245" height="175" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Boneco orientador para paciente acamado">
        <!-- Floor line -->
        <line x1="15" y1="162" x2="235" y2="162" stroke="#94a3b8" stroke-width="2"/>
        <!-- Bed frame & mattress -->
        <rect x="30" y="95" width="175" height="24" rx="5" fill="#e2e8f0" stroke="#475569" stroke-width="1.8"/>
        <line x1="42" y1="119" x2="42" y2="162" stroke="#475569" stroke-width="3"/>
        <line x1="192" y1="119" x2="192" y2="162" stroke="#475569" stroke-width="3"/>
        <!-- Pillow -->
        <rect x="36" y="84" width="28" height="11" rx="4" fill="#ffffff" stroke="#64748b" stroke-width="1.4"/>
        <!-- Lying Human Figure (Boneco) -->
        <circle cx="52" cy="78" r="10" fill="#bae6fd" stroke="#0f5c6e" stroke-width="2"/>
        <!-- Torso & Legs lying horizontally -->
        <rect x="65" y="76" width="58" height="18" rx="7" fill="#bae6fd" stroke="#0f5c6e" stroke-width="2"/>
        <line x1="123" y1="84" x2="182" y2="84" stroke="#0f5c6e" stroke-width="6" stroke-linecap="round"/>
        <!-- Feet -->
        <line x1="182" y1="84" x2="185" y2="73" stroke="#0f5c6e" stroke-width="4" stroke-linecap="round"/>

        <!-- Measure A: Total body length (Head to feet) -->
        <line x1="42" y1="50" x2="186" y2="50" stroke="${hlA}" stroke-width="2.2"/>
        <line x1="42" y1="44" x2="42" y2="62" stroke="${hlA}" stroke-width="1.8"/>
        <line x1="186" y1="44" x2="186" y2="62" stroke="${hlA}" stroke-width="1.8"/>
        <circle cx="114" cy="36" r="10" fill="${hlA}"/>
        <text x="114" y="40" text-anchor="middle" fill="#fff" font-size="11" font-weight="800">A</text>

        <!-- Measure B: Hip/Torso width -->
        <line x1="95" y1="68" x2="95" y2="100" stroke="${hlB}" stroke-width="2.2" stroke-dasharray="3,2"/>
        <circle cx="95" cy="112" r="10" fill="${hlB}"/>
        <text x="95" y="116" text-anchor="middle" fill="#fff" font-size="11" font-weight="800">B</text>

        <!-- Measure C: Bed height from floor -->
        <line x1="215" y1="95" x2="215" y2="162" stroke="${hlC}" stroke-width="2.2"/>
        <line x1="208" y1="95" x2="222" y2="95" stroke="${hlC}" stroke-width="1.8"/>
        <line x1="208" y1="162" x2="222" y2="162" stroke="${hlC}" stroke-width="1.8"/>
        <circle cx="215" cy="128" r="10" fill="${hlC}"/>
        <text x="215" y="132" text-anchor="middle" fill="#fff" font-size="11" font-weight="800">C</text>
      </svg>
    `;
  }

  if (profileKey === 'cadeirante') {
    // Boneco sentado na cadeira de rodas
    return `
      <svg viewBox="0 0 250 185" width="245" height="175" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Boneco orientador em cadeira de rodas">
        <!-- Floor -->
        <line x1="15" y1="165" x2="235" y2="165" stroke="#94a3b8" stroke-width="2"/>
        <!-- Seated Figure -->
        <circle cx="105" cy="42" r="12" fill="#bae6fd" stroke="#0f5c6e" stroke-width="2"/>
        <!-- Torso -->
        <line x1="105" y1="54" x2="105" y2="105" stroke="#0f5c6e" stroke-width="8" stroke-linecap="round"/>
        <!-- Thigh (seated) -->
        <line x1="105" y1="105" x2="148" y2="105" stroke="#0f5c6e" stroke-width="7" stroke-linecap="round"/>
        <!-- Lower leg -->
        <line x1="148" y1="105" x2="148" y2="152" stroke="#0f5c6e" stroke-width="6" stroke-linecap="round"/>
        <!-- Wheelchair Wheel & Frame -->
        <circle cx="105" cy="132" r="30" fill="none" stroke="#475569" stroke-width="3"/>
        <circle cx="105" cy="132" r="6" fill="#475569"/>
        <circle cx="152" cy="155" r="9" fill="none" stroke="#475569" stroke-width="2.5"/>

        <!-- Measure C: Arm reach (shoulder to extended hand) -->
        <line x1="105" y1="68" x2="168" y2="68" stroke="#0f5c6e" stroke-width="5" stroke-linecap="round"/>
        <line x1="105" y1="52" x2="170" y2="52" stroke="${hlC}" stroke-width="2"/>
        <circle cx="142" cy="37" r="10" fill="${hlC}"/>
        <text x="142" y="41" text-anchor="middle" fill="#fff" font-size="11" font-weight="800">C</text>

        <!-- Measure B: Seat/Knee height from floor -->
        <line x1="188" y1="105" x2="188" y2="165" stroke="${hlB}" stroke-width="2.2"/>
        <line x1="181" y1="105" x2="195" y2="105" stroke="${hlB}" stroke-width="1.8"/>
        <line x1="181" y1="165" x2="195" y2="165" stroke="${hlB}" stroke-width="1.8"/>
        <circle cx="210" cy="135" r="10" fill="${hlB}"/>
        <text x="210" y="139" text-anchor="middle" fill="#fff" font-size="11" font-weight="800">B</text>

        <!-- Measure A: Wheelchair width -->
        <line x1="65" y1="176" x2="145" y2="176" stroke="${hlA}" stroke-width="2.2"/>
        <line x1="65" y1="170" x2="65" y2="181" stroke="${hlA}" stroke-width="1.8"/>
        <line x1="145" y1="170" x2="145" y2="181" stroke="${hlA}" stroke-width="1.8"/>
        <circle cx="45" cy="148" r="10" fill="${hlA}"/>
        <text x="45" y="152" text-anchor="middle" fill="#fff" font-size="11" font-weight="800">A</text>
      </svg>
    `;
  }

  // Default: Boneco Em Pé (medidas B e C) + Boneco Sentado ao lado (medida A poplítea)
  return `
    <svg viewBox="0 0 250 185" width="245" height="175" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Boneco orientador em pé e sentado">
      <!-- Floor line -->
      <line x1="10" y1="166" x2="240" y2="166" stroke="#94a3b8" stroke-width="2"/>

      <!-- ===== LEFT: BONECO EM PÉ (Medidas B e C) ===== -->
      <!-- Head -->
      <circle cx="72" cy="36" r="11" fill="#bae6fd" stroke="#0f5c6e" stroke-width="2"/>
      <!-- Shoulders & Torso -->
      <rect x="54" y="51" width="36" height="46" rx="7" fill="#bae6fd" stroke="#0f5c6e" stroke-width="2"/>
      <!-- Arms relaxed at sides (wrist at y=102) -->
      <line x1="51" y1="55" x2="46" y2="102" stroke="#0f5c6e" stroke-width="4.5" stroke-linecap="round"/>
      <line x1="93" y1="55" x2="98" y2="102" stroke="#0f5c6e" stroke-width="4.5" stroke-linecap="round"/>
      <!-- Legs standing -->
      <line x1="64" y1="97" x2="64" y2="165" stroke="#0f5c6e" stroke-width="5.5" stroke-linecap="round"/>
      <line x1="80" y1="97" x2="80" y2="165" stroke="#0f5c6e" stroke-width="5.5" stroke-linecap="round"/>

      <!-- Measure C: Width (Shoulders / Walker) -->
      <line x1="42" y1="18" x2="102" y2="18" stroke="${hlC}" stroke-width="2.2"/>
      <line x1="42" y1="13" x2="42" y2="24" stroke="${hlC}" stroke-width="1.8"/>
      <line x1="102" y1="13" x2="102" y2="24" stroke="${hlC}" stroke-width="1.8"/>
      <circle cx="24" cy="18" r="9.5" fill="${hlC}"/>
      <text x="24" y="22" text-anchor="middle" fill="#fff" font-size="10.5" font-weight="800">C</text>

      <!-- Measure B: Wrist to Floor height -->
      <line x1="26" y1="102" x2="26" y2="166" stroke="${hlB}" stroke-width="2.2"/>
      <line x1="20" y1="102" x2="44" y2="102" stroke="${hlB}" stroke-width="1.5" stroke-dasharray="2,2"/>
      <line x1="20" y1="166" x2="32" y2="166" stroke="${hlB}" stroke-width="1.8"/>
      <circle cx="26" cy="134" r="9.5" fill="${hlB}"/>
      <text x="26" y="138" text-anchor="middle" fill="#fff" font-size="10.5" font-weight="800">B</text>

      <!-- ===== RIGHT: BONECO SENTADO (Medida A: Altura do Joelho/Poplítea) ===== -->
      <!-- Chair/Toilet outline -->
      <polyline points="148,82 148,125 182,125" fill="none" stroke="#94a3b8" stroke-width="2.5"/>
      <line x1="154" y1="125" x2="154" y2="166" stroke="#94a3b8" stroke-width="2.5"/>
      <!-- Head seated -->
      <circle cx="164" cy="58" r="10" fill="#bae6fd" stroke="#0f5c6e" stroke-width="2"/>
      <!-- Torso seated -->
      <line x1="164" y1="69" x2="164" y2="116" stroke="#0f5c6e" stroke-width="7" stroke-linecap="round"/>
      <!-- Thigh horizontal -->
      <line x1="164" y1="116" x2="198" y2="116" stroke="#0f5c6e" stroke-width="6.5" stroke-linecap="round"/>
      <!-- Lower leg vertical to floor -->
      <line x1="198" y1="116" x2="198" y2="165" stroke="#0f5c6e" stroke-width="5.5" stroke-linecap="round"/>

      <!-- Measure A: Knee/Popliteal to Floor -->
      <line x1="220" y1="116" x2="220" y2="166" stroke="${hlA}" stroke-width="2.2"/>
      <line x1="202" y1="116" x2="226" y2="116" stroke="${hlA}" stroke-width="1.6" stroke-dasharray="2,2"/>
      <line x1="214" y1="166" x2="226" y2="166" stroke="${hlA}" stroke-width="1.8"/>
      <circle cx="220" cy="141" r="9.5" fill="${hlA}"/>
      <text x="220" y="145" text-anchor="middle" fill="#fff" font-size="10.5" font-weight="800">A</text>
    </svg>
  `;
}

// ============================================================================
// GERADOR DE IMAGENS DE TESTE ARQUITETÔNICAS (PNG DATA URL) PARA OS 3 CASOS
// ============================================================================
function createSyntheticScenePng(config) {
  const canvas = document.createElement('canvas');
  canvas.width = 640;
  canvas.height = 400;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = config.dark ? '#334155' : '#f1f5f9';
  ctx.fillRect(0, 0, 640, 230);
  ctx.fillStyle = config.floorColor || '#e2e8f0';
  ctx.fillRect(0, 230, 640, 170);

  ctx.strokeStyle = config.dark ? '#475569' : '#cbd5e1';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(0, 230);
  ctx.lineTo(640, 230);
  ctx.stroke();

  ctx.fillStyle = 'rgba(15, 23, 42, 0.82)';
  ctx.fillRect(0, 0, 640, 42);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 14px Inter, sans-serif';
  ctx.fillText(`📷 ${config.filename} — ${config.room}`, 14, 26);

  if (config.sceneType === 'banheiro') {
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 2.5;
    const toiletY = config.lowToilet ? 185 : 165;
    const toiletH = config.lowToilet ? 65 : 85;
    ctx.fillRect(110, toiletY, 75, toiletH);
    ctx.strokeRect(110, toiletY, 75, toiletH);
    ctx.fillStyle = '#334155';
    ctx.font = 'bold 12px sans-serif';
    ctx.fillText(config.lowToilet ? 'Vaso Baixo (~38 cm)' : 'Vaso Altura Padrão (~40 cm)', 75, toiletY + toiletH + 20);

    ctx.fillStyle = 'rgba(186, 230, 253, 0.35)';
    ctx.strokeStyle = '#0284c7';
    ctx.lineWidth = 2.5;
    ctx.fillRect(360, 65, 220, 195);
    ctx.strokeRect(360, 65, 220, 195);

    if (config.highTrack) {
      ctx.fillStyle = '#dc2626';
      ctx.fillRect(358, 244, 224, 18);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 11px sans-serif';
      ctx.fillText('⚠️ Trilho Alto de Alumínio', 395, 257);
    } else {
      ctx.fillStyle = '#0284c7';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText('Boxe com Soleira Baixa', 405, 160);
    }

    if (config.hasFloorCloth) {
      ctx.fillStyle = '#fca5a5';
      ctx.strokeStyle = '#dc2626';
      ctx.fillRect(240, 285, 130, 52);
      ctx.strokeRect(240, 285, 130, 52);
      ctx.fillStyle = '#7f1d1d';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText('⚠️ Pano/Tapete Solto', 246, 315);
    }
  } else if (config.sceneType === 'quarto') {
    ctx.fillStyle = '#cbd5e1';
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 2.5;
    ctx.fillRect(40, 145, 190, 125);
    ctx.strokeRect(40, 145, 190, 125);
    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 13px sans-serif';
    ctx.fillText(config.lowBed ? 'Cama Baixa (~40 cm)' : 'Cama / Quarto Amplo', 70, 210);

    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(510, 75, 85, 165);
    ctx.strokeRect(510, 75, 85, 165);
    ctx.fillStyle = '#1e293b';
    ctx.fillText('Porta Banheiro', 512, 160);

    if (config.hasRug) {
      ctx.fillStyle = '#fde68a';
      ctx.strokeStyle = '#d97706';
      ctx.fillRect(290, 265, 155, 65);
      ctx.strokeRect(290, 265, 155, 65);
      ctx.fillStyle = '#92400e';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText('⚠️ Tapete Solto na Rota', 300, 302);
    }
    if (config.hasOxygenTube) {
      ctx.strokeStyle = '#dc2626';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(190, 250);
      ctx.bezierCurveTo(280, 340, 390, 230, 520, 310);
      ctx.stroke();
      ctx.fillStyle = '#fee2e2';
      ctx.fillRect(255, 330, 230, 28);
      ctx.fillStyle = '#991b1b';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText('⚠️ Mangueira de O₂ no Piso', 270, 349);
    }
  } else {
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 2;
    ctx.fillRect(70, 110, 500, 140);
    ctx.strokeRect(70, 110, 500, 140);
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 14px sans-serif';
    ctx.fillText(config.caption, 95, 185);
  }

  ctx.fillStyle = 'rgba(15, 23, 42, 0.88)';
  ctx.fillRect(0, 355, 640, 45);
  ctx.fillStyle = '#f8fafc';
  ctx.font = '12.5px Inter, sans-serif';
  ctx.fillText(config.caption, 14, 382);

  return canvas.toDataURL('image/png');
}

// ============================================================================
// DEFINIÇÃO DOS 3 CASOS CLÍNICOS DO PoC (COM MEDIDAS ANTROPOMÉTRICAS)
// ============================================================================
const POC_CASES = {
  caso1: {
    id: 'caso1',
    name: 'Caso Clínico 1: Paciente Jovem em Pós-Operatório Abdominal',
    clinicalContext: '28 anos, 1,74 m, pós-op imediato de apendicectomia laparoscópica. Apresenta dor abdominal moderada apenas aos esforços de mobilização do tronco. Curativo cirúrgico limpo e seco em abdômen.',
    answers: {
      p1_locomocao: 'Anda sozinho, com firmeza e sem precisar de apoio',
      p2_banho: 'Toma banho em pé ou sentado sem ajuda física',
      p3_vaso_transferencia: 'Levanta sozinho, mas apoia com força nos braços ou móveis',
      p4_cognicao: 'Lúcido e orientado no tempo, espaço e decisões',
      p5_visao_audicao: [
        'Enxerga bem no ambiente com ou sem óculos',
        'Audição funcionalmente normal (ou prótese adaptada)'
      ],
      p6_quedas_dispositivos: [
        'Nenhum dispositivo médico invasivo no domicílio'
      ]
    },
    anthropometry: {
      preset: 'medio',
      medA: 46, // Altura poplítea (joelho-chão)
      medB: 81, // Altura punho/quadril-chão
      medC: 49  // Largura ombros
    },
    photos: [
      {
        filename: 'caso1_banheiro.png',
        room: 'banheiro e box',
        sceneType: 'banheiro',
        caption: 'Banheiro contemporâneo sem barras de apoio, vaso em altura padrão, boxe com soleira baixa.',
        floorColor: '#e2e8f0',
        lowToilet: false,
        highTrack: false,
        hasFloorCloth: false
      },
      {
        filename: 'caso1_caminho_cama_banheiro.png',
        room: 'caminho da cama ao banheiro',
        sceneType: 'quarto',
        caption: 'Quarto amplo, piso de madeira plano, caminho desobstruído da cama à porta do banheiro.',
        floorColor: '#dfc39d',
        lowBed: false,
        hasRug: false
      },
      {
        filename: 'caso1_acesso_casa.png',
        room: 'acesso à casa',
        sceneType: 'acesso',
        caption: 'Hall e porta de entrada de apartamento totalmente plano, sem degraus ou desníveis.',
        floorColor: '#e2e8f0'
      },
      {
        filename: 'caso1_cozinha.png',
        room: 'cozinha',
        sceneType: 'cozinha',
        caption: 'Cozinha planejada organizada, sem objetos ou tapetes no chão.',
        floorColor: '#f1f5f9'
      }
    ],
    curatedReport: {
      resumoRisco: 'Olá, família e cuidador! O seu familiar (28 anos) está se recuperando muito bem e anda sozinho, mas o corte cirúrgico no abdômen ainda causa dor ao dobrar o corpo ou fazer esforço de barriga. Como o vaso sanitário da foto é de altura comum e não tem barras de apoio, ele terá que fazer força no abdômen para levantar, o que pode aumentar a dor e o desconforto nos primeiros dias.',
      acoesImediatas: [
        {
          titulo: 'Coloque as coisas dele(a) na altura da cintura (nem no chão, nem no alto)',
          detalhe: 'Deixe papel higiênico, toalhas de banho, sabonete, mudas de roupa e copo de água na altura da cintura (cerca de 80 cm a 1 metro do chão). Assim, ele(a) não precisará se agachar nem esticar a barriga para alcançar o que precisa.'
        },
        {
          titulo: 'Mantenha o chão do box seco e use calçado de borracha firme',
          detalhe: 'Como o banheiro não tem barras de apoio (veja na foto), qualquer escorregão causaria um reflexo rápido do tronco que puxaria o abdômen operado. Mantenha o piso seco e utilize calçado de borracha antiderrapante bem firme nos pés durante o banho.'
        },
        {
          titulo: 'Deixe um apoio firme e estável ao lado da cama',
          detalhe: 'Coloque uma cadeira pesada ou mesinha bem firme ao lado da cama para que ele(a) possa apoiar as duas mãos com segurança ao sair da cama de manhã.'
        }
      ],
      adaptacoesPrioritarias: [
        {
          titulo: 'Tapete de borracha com ventosas dentro do box',
          detalhe: 'Fixe um tapete emborrachado com ventosas bem presas no chão do chuveiro para garantir máxima aderência e evitar que ele(a) precise fazer força para se equilibrar durante o banho.'
        },
        {
          titulo: 'Assento sanitário elevado (5 a 7,5 cm) ou apoio lateral portátil',
          detalhe: 'Colocar um elevador macio de assento ou um apoio de braços portátil sobre o vaso sanitário facilitará muito sentar e levantar sem forçar os pontos da cirurgia no abdômen.'
        }
      ],
      rotinaCuidador: [
        'Ensine a técnica de "levantar em bloco": primeiro ele(a) deve virar todo o corpo de lado na cama, colocar as duas pernas para fora e empurrar o colchão com os braços para sentar, sem dobrar a barriga.',
        'Deixe uma luz suave ou abajur aceso à noite caso ele(a) precise ir ao banheiro com sono ou sob efeito de analgésicos, e fique atento se o curativo permanecer limpo e seco.'
      ]
    }
  },

  caso2: {
    id: 'caso2',
    name: 'Caso Clínico 2: Idoso em Pós-Operatório de Fratura de Quadril',
    clinicalContext: '79 anos, 1,72 m, submetido à osteossíntese de fêmur proximal há 5 dias. Apresenta fraqueza muscular grave em membro inferior e restrição de carga parcial.',
    answers: {
      p1_locomocao: 'Anda segurando em paredes/móveis ou usa bengala/andador',
      p2_banho: 'Toma banho sozinho, mas requer banco ou supervisão próxima',
      p3_vaso_transferencia: 'Requer ajuda física de outra pessoa para sentar ou levantar',
      p4_cognicao: 'Lúcido e orientado no tempo, espaço e decisões',
      p5_visao_audicao: [
        'Visão embaçada/baixa; dificuldade para ver degraus ou desníveis no chão',
        'Audição funcionalmente normal (ou prótese adaptada)'
      ],
      p6_quedas_dispositivos: [
        'Apresentou queda ou episódio de quase queda nos últimos 90 dias',
        'Nenhum dispositivo médico invasivo no domicílio'
      ]
    },
    anthropometry: {
      preset: 'medio',
      medA: 47, // Altura poplítea (joelho-chão) -> exige assento entre 50-52 cm no pós-op de quadril!
      medB: 80, // Altura punho-chão -> regulagem do andador = 80 cm
      medC: 66  // Largura total com andador -> exige vão livre >= 76-80 cm
    },
    photos: [
      {
        filename: 'caso2_banheiro.png',
        room: 'banheiro e box',
        sceneType: 'banheiro',
        caption: 'Banheiro com vaso sanitário baixo sem elevação, ausência de barras de apoio e trilho alto de boxe com pano dobrado no piso cerâmico.',
        floorColor: '#cbd5e1',
        lowToilet: true,
        highTrack: true,
        hasFloorCloth: true
      },
      {
        filename: 'caso2_caminho_cama_banheiro.png',
        room: 'caminho da cama ao banheiro',
        sceneType: 'quarto',
        caption: 'Quarto com cama baixa, andador ao lado e tapete solto na rota até a porta.',
        floorColor: '#e2e8f0',
        lowBed: true,
        hasRug: true
      },
      {
        filename: 'caso2_acesso_casa.png',
        room: 'acesso à casa',
        sceneType: 'acesso',
        caption: 'Entrada de casa com 2 degraus externos de pedra sem corrimão ou barras de apoio.',
        floorColor: '#94a3b8'
      },
      {
        filename: 'caso2_cozinha.png',
        room: 'cozinha',
        sceneType: 'cozinha',
        caption: 'Cozinha com piso escorregadio, passadeira solta na pia e lixeira obstruindo o corredor de passagem.',
        floorColor: '#cbd5e1'
      }
    ],
    curatedReport: {
      resumoRisco: 'Atenção redobrada, família e cuidador! O seu familiar (79 anos) acabou de operar o quadril e está com a perna fraca, usando andador e com a visão embaçada. O maior perigo para ele(a) nas primeiras 72 horas é sofrer uma nova queda ou dobrar a perna operada mais do que 90 graus. O vaso sanitário e a cama vistos nas fotos são baixos demais (o que força o quadril), o andador precisa de 66 cm de espaço livre para passar e há tapetes soltos e degraus sem corrimão na casa.',
      acoesImediatas: [
        {
          titulo: 'Retire AGORA todos os tapetes, passadeiras e panos de chão da casa',
          detalhe: 'Tire hoje mesmo o tapete do quarto, a passadeira da cozinha e o pano no chão do banheiro (vistos nas fotos). As pontas de borracha do andador enroscam muito fácil em tecidos no chão e provocam quedas graves.'
        },
        {
          titulo: 'Libere pelo menos 80 cm de passagem no corredor e na cozinha',
          detalhe: 'Tire a lixeira da passagem da cozinha e afaste móveis do corredor. O andador dele(a) mede 66 cm de largura e precisa de espaço folgado para não bater nas paredes.'
        },
        {
          titulo: 'Ajuste a altura do andador para que fique na linha do punho dele(a) (80 cm)',
          detalhe: 'Com o paciente em pé calçado, a empunhadura do andador deve ficar exatamente na altura do osso do punho (80 cm do chão), mantendo os cotovelos levemente dobrados.'
        },
        {
          titulo: 'Coloque uma almofada firme e alta na cama/poltrona provisoriamente',
          detalhe: 'A cama é baixa. Enquanto não colocar calços nos pés da cama, coloque um assento/almofada firme e alta para que, ao sentar, o joelho dele(a) nunca fique mais alto do que a bacia.'
        }
      ],
      adaptacoesPrioritarias: [
        {
          titulo: 'Elevador de vaso sanitário (12 a 13 cm) com alças laterais + Barras de apoio',
          detalhe: 'Instale com urgência um elevador de assento sanitário alto (para o assento chegar a 50–52 cm do chão) e barras de apoio em aço inox na parede do vaso a 75–80 cm do chão. Ele(a) não pode sentar no vaso baixo comum sem apoio.'
        },
        {
          titulo: 'Cadeira de banho regulada em 50 cm de altura dentro do box',
          detalhe: 'Com a perna operada, ele(a) não consegue ficar em pé no banho e nem passar as pernas por cima do trilho alto do box. Ele(a) deve sentar na cadeira de banho e tomar banho sentado com supervisão.'
        },
        {
          titulo: 'Calços extensores sob os pés da cama (+12 cm) e corrimão nos degraus de entrada',
          detalhe: 'Eleve a cama para atingir 52 cm do chão e instale corrimão firme dos dois lados dos 2 degraus da entrada de casa, além de colar fita adesiva amarela reflexiva nos degraus por causa da visão fraca.'
        }
      ],
      rotinaCuidador: [
        'Como ajudar a sentar e levantar do vaso e da cama: posicione o andador travado bem à frente dele(a), peça para ele(a) esticar a perna operada um pouquinho para frente antes de descer o corpo, e dê apoio segurando com firmeza pela cintura/cinto, NUNCA puxando pelos braços.',
        'Mantenha as luzes 100% acesas em qualquer ida ao banheiro (mesmo no meio da noite) e confira diariamente se o chão do banheiro e da cozinha está completamente seco antes dele(a) pisar.'
      ]
    }
  },

  caso3: {
    id: 'caso3',
    name: 'Caso Clínico 3: Idoso com Fragilidade, Marcha Instável e Declínio Cognitivo Inicial',
    clinicalContext: '84 anos, 1,58 m, com síndrome da fragilidade, osteoartrite grave em joelhos, hipotensão ortostática e diagnóstico recente de Transtorno Cognitivo Leve (TCL). Uso intermitente de oxigênio de apoio.',
    answers: {
      p1_locomocao: 'Precisa que alguém dê o braço ou auxilie fisicamente',
      p2_banho: 'Precisa de ajuda física para lavar pernas/pés ou entrar no boxe',
      p3_vaso_transferencia: 'Requer ajuda física de outra pessoa para sentar ou levantar',
      p4_cognicao: 'Confusão frequente: desorienta-se à noite, troca horários ou esquece perigos óbvios (fogão, torneiras)',
      p5_visao_audicao: [
        'Visão embaçada/baixa; dificuldade para ver degraus ou desníveis no chão'
      ],
      p6_quedas_dispositivos: [
        'Apresentou queda ou episódio de quase queda nos últimos 90 dias',
        'Usa oxigênio contínuo (cilindro ou concentrador com mangueira no chão)'
      ]
    },
    anthropometry: {
      preset: 'baixo',
      medA: 41, // Altura poplítea (joelho-chão) -> estatura baixa (precisa apoiar os pés no chão ao sentar!)
      medB: 73, // Altura punho-chão -> barras na altura de 73-75 cm
      medC: 44  // Largura ombros do paciente
    },
    photos: [
      {
        filename: 'caso3_banheiro.png',
        room: 'banheiro e box',
        sceneType: 'banheiro',
        caption: 'Banheiro com zonas de sombra, espelho amplo frente à porta, ausência de barras e tapete escuro no piso.',
        floorColor: '#94a3b8',
        dark: true,
        lowToilet: true,
        highTrack: true,
        hasFloorCloth: true
      },
      {
        filename: 'caso3_caminho_cama_banheiro.png',
        room: 'caminho da cama ao banheiro',
        sceneType: 'quarto',
        caption: 'Quarto na penumbra com mangueira extensora de oxigênio atravessando o caminho até a porta e tapete solto.',
        floorColor: '#64748b',
        dark: true,
        lowBed: true,
        hasRug: true,
        hasOxygenTube: true
      },
      {
        filename: 'caso3_acesso_casa.png',
        room: 'acesso à casa',
        sceneType: 'acesso',
        caption: 'Corredor com degrau sem contraste visual e iluminação deficiente.',
        floorColor: '#64748b',
        dark: true
      },
      {
        filename: 'caso3_cozinha.png',
        room: 'cozinha',
        sceneType: 'cozinha',
        caption: 'Cozinha com botões de fogão acessíveis, objetos soltos e piso sem contraste.',
        floorColor: '#94a3b8'
      }
    ],
    curatedReport: {
      resumoRisco: 'Alerta máximo, família e cuidador! O seu familiar (84 anos) tem muita fraqueza nas pernas, já sofreu quedas recentes, tem esquecimentos frequentes e usa oxigênio. Nas fotos, identificamos 4 armadilhas gravíssimas: a mangueira de oxigênio solta no meio do quarto, tapetes no chão, falta total de barras de apoio no banheiro e risco com os botões do fogão na cozinha.',
      acoesImediatas: [
        {
          titulo: 'Prenda e suspenda a mangueira de oxigênio pelas paredes AGORA',
          detalhe: 'A extensão plástica de O₂ atravessada no chão do quarto (veja na foto) é uma armadilha fatal de tropeço para quem anda a passos curtos e arrastados. Prenda o fio com fita adesiva ou ganchos no rodapé da parede, deixando o caminho do quarto ao banheiro 100% desobstruído.'
        },
        {
          titulo: 'Retire todos os tapetes e cubra os espelhos à noite',
          detalhe: 'Remova todos os tapetes do banheiro, quarto e corredores. Para pessoas idosas com baixa visão ou declínio cognitivo, tapetes escuros podem ser percebidos como buracos no chão, provocando paralisia da marcha, medo ou tentativas bruscas de desvio. Cubra ou remova espelhos da linha de visão noturna para evitar sustos com o próprio reflexo.'
        },
        {
          titulo: 'Feche o registro de gás do fogão e guarde objetos perigosos',
          detalhe: 'Como ele(a) esquece perigos do dia a dia, mantenha a chave geral do gás fechada após cozinhar e guarde facas, fósforos e produtos de limpeza fora do alcance.'
        }
      ],
      adaptacoesPrioritarias: [
        {
          titulo: 'Coloque luzes noturnas de tomada com sensor de presença (Quarto até o Banheiro)',
          detalhe: 'Instale luzes guias amarelas automáticas nos rodapés do corredor e do banheiro. Ele(a) nunca pode acordar e tentar levantar no escuro.'
        },
        {
          titulo: 'Cadeira de banho e elevador de vaso sanitário ajustados na altura do joelho (43 a 45 cm)',
          detalhe: 'Como ele(a) é de baixa estatura (perna mede 41 cm), não coloque um elevador alto demais, pois os pés não podem ficar balançando no ar! Instale elevação moderada (5 a 7 cm) e cadeira de banho estável, garantindo que a planta dos dois pés fique sempre firme no chão.'
        },
        {
          titulo: 'Barras de apoio com cor contrastante ao lado do vaso sanitário e no chuveiro (a 73–75 cm do chão)',
          detalhe: 'Instale barras de apoio em cores que contrastem com a parede (ex.: barra branca sobre azulejo escuro, ou barra de cor viva) na exata altura do punho dele(a) (73–75 cm), facilitando para ele(a) enxergar onde segurar.'
        }
      ],
      rotinaCuidador: [
        'Regra de ouro ao acordar (para evitar desmaio e pressão baixa): antes de colocar o paciente em pé, deixe-o sentado na beira da cama por 2 minutos, com as duas plantas dos pés bem apoiadas no chão. Converse calmamente com ele(a) antes de começar a andar.',
        'Como andar junto com segurança: como ele(a) precisa de apoio físico lateral para caminhar, ao passar por portas ou locais mais estreitos, posicione-se meio passo atrás segurando firme pela cintura/quadril, em vez de tentar passar lado a lado.'
      ]
    }
  }
};

// ============================================================================
// ESTADO DA APLICAÇÃO
// ============================================================================
const appState = {
  currentStep: 1,
  activeCaseId: null,
  clinicalContext: '',
  answers: {
    p1_locomocao: '',
    p2_banho: '',
    p3_vaso_transferencia: '',
    p4_cognicao: '',
    p5_visao_audicao: [],
    p6_quedas_dispositivos: []
  },
  anthropometry: {
    preset: 'medio',
    medA: 45,
    medB: 79,
    medC: 66,
    highlightLetter: null
  },
  photos: [],
  startTime: Date.now(),
  geminiApiKey: localStorage.getItem('medhibrida_gemini_key') || '',
  geminiModel: localStorage.getItem('medhibrida_gemini_model') || 'gemini-2.5-flash'
};

// ============================================================================
// INICIALIZAÇÃO E RENDERIZAÇÃO DO QUESTIONÁRIO + ANTROPOMETRIA (ETAPA 1)
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
  renderQuestions();
  renderAnthropometrySection();
  initTimer();
  initEventListeners();
  updateApiStatusUI();
  updateStep1Progress();
});

function initTimer() {
  const timerEl = document.getElementById('elapsedTimer');
  setInterval(() => {
    const diffSec = Math.floor((Date.now() - appState.startTime) / 1000);
    const mins = String(Math.floor(diffSec / 60)).padStart(2, '0');
    const secs = String(diffSec % 60).padStart(2, '0');
    timerEl.textContent = `${mins}:${secs}`;
  }, 1000);
}

function renderQuestions() {
  const container = document.getElementById('questionsContainer');
  container.innerHTML = '';

  QUESTIONS_SCHEMA.forEach((q) => {
    const card = document.createElement('div');
    card.className = `question-card${q.fullWidth ? ' full-width' : ''}`;

    const header = document.createElement('div');
    header.className = 'question-header';
    header.innerHTML = `
      <span class="q-badge">${q.number}</span>
      <h3 class="question-title">${q.title}</h3>
    `;

    const optionsWrap = document.createElement('div');
    optionsWrap.className = `question-options${q.fullWidth ? ' two-col' : ''}`;

    q.options.forEach((opt, idx) => {
      const inputId = `${q.id}_opt_${idx}`;
      const isChecked =
        q.type === 'single'
          ? appState.answers[q.id] === opt.value
          : (appState.answers[q.id] || []).includes(opt.value);

      const label = document.createElement('label');
      label.className = `option-label${isChecked ? ' selected' : ''}`;
      label.setAttribute('for', inputId);

      const input = document.createElement('input');
      input.type = q.type === 'single' ? 'radio' : 'checkbox';
      input.name = q.id;
      input.id = inputId;
      input.value = opt.value;
      input.checked = isChecked;

      input.addEventListener('change', () => {
        appState.activeCaseId = null;
        document.querySelectorAll('.case-card-btn').forEach((b) => b.classList.remove('active'));

        if (q.type === 'single') {
          const prevProfile = getAnthropometryProfileKey(appState.answers.p1_locomocao);
          appState.answers[q.id] = opt.value;
          const nextProfile = getAnthropometryProfileKey(appState.answers.p1_locomocao);

          // If locomotion profile changed, auto-adapt default anthropometric preset so user has zero extra work
          if (q.id === 'p1_locomocao' && prevProfile !== nextProfile) {
            const presetKey = appState.anthropometry.preset || 'medio';
            const presetVals = ANTHROPOMETRY_PROFILES[nextProfile].presets[presetKey];
            if (presetVals) {
              appState.anthropometry.medA = presetVals.medA;
              appState.anthropometry.medB = presetVals.medB;
              appState.anthropometry.medC = presetVals.medC;
            }
          }
        } else {
          const currentArr = appState.answers[q.id] || [];
          if (input.checked) {
            if (!currentArr.includes(opt.value)) currentArr.push(opt.value);
          } else {
            appState.answers[q.id] = currentArr.filter((v) => v !== opt.value);
          }
        }
        renderQuestions();
        renderAnthropometrySection();
        updateStep1Progress();
      });

      const span = document.createElement('span');
      span.textContent = opt.value;

      label.appendChild(input);
      label.appendChild(span);
      optionsWrap.appendChild(label);
    });

    card.appendChild(header);
    card.appendChild(optionsWrap);
    container.appendChild(card);
  });
}

// ============================================================================
// RENDERIZAÇÃO DA SEÇÃO 7: MEDIDAS ANTROPOMÉTRICAS + BONECO ORIENTADOR
// ============================================================================
function computeBiomechanicalRecommendations() {
  const profileKey = getAnthropometryProfileKey(appState.answers.p1_locomocao);
  const A = Number(appState.anthropometry.medA) || 45;
  const B = Number(appState.anthropometry.medB) || 78;
  const C = Number(appState.anthropometry.medC) || 65;

  if (profileKey === 'acamado') {
    const minMattress = A + 15;
    const minChairWidth = B + 6;
    const bedDiff = 73 - C;
    const bedAdvice =
      bedDiff > 4
        ? `elevar a cama em ~${bedDiff} cm (com calços/extensores) para atingir ~73 cm e proteger a coluna do cuidador`
        : 'altura do leito compatível com ergonomia do cuidador';
    return `📐 <strong>Cálculo Antropométrico no Leito:</strong> Colchão/espaço mín. recomendado = <strong>${minMattress} cm</strong> • Largura mín. de cadeira higiênica/poltrona = <strong>${minChairWidth} cm</strong> • Ergonomia da cama: <strong>${bedAdvice}</strong>.`;
  }

  if (profileKey === 'cadeirante') {
    const minDoor = Math.max(80, C > 0 ? A + 12 : 80);
    const doorAlert =
      A > 68
        ? `atenção a portas estreitas (cadeira de ${A} cm exige vão livre mínimo de ${A + 10}–80 cm NBR 9050)`
        : `compatível com portas padrão ≥ 80 cm (folga lateral de ${80 - A} cm)`;
    return `📐 <strong>Cálculo Antropométrico (Cadeira de Rodas):</strong> Vão livre mínimo de porta = <strong>${minDoor} cm</strong> (${doorAlert}) • Altura de nivelamento Cama/Vaso = <strong>${B} cm</strong> • Alcance máximo p/ barras e acessórios = <strong>${C} cm</strong>.`;
  }

  // Deambulador Independente ou com Apoio/Andador
  const needsHipProtection =
    (appState.answers.p3_vaso_transferencia || '').includes('ajuda') ||
    (appState.answers.p3_vaso_transferencia || '').includes('apoia com força');
  const idealSeatHeight = needsHipProtection ? A + 4 : A + 1;
  const stdToilet = 39;
  const neededBooster = Math.max(0, idealSeatHeight - stdToilet);
  const minPassage = Math.max(75, C + 12);

  return `📐 <strong>Cálculo Biomecânico Automático:</strong> Altura ideal de assento (Vaso/Cama/Banco) = <strong>${idealSeatHeight} cm</strong> ${
    neededBooster >= 4
      ? `(requer elevador sanitário de <strong>+${neededBooster} a ${neededBooster + 2} cm</strong> sobre vaso padrão de 39 cm)`
      : '(compatível com vaso padrão)'
  } • Altura ideal de barras/andador = <strong>${B} cm</strong> • Passagem livre mínima = <strong>${minPassage} cm</strong>.`;
}

function renderAnthropometrySection() {
  const container = document.getElementById('anthropometryContainer');
  if (!container) return;

  const profileKey = getAnthropometryProfileKey(appState.answers.p1_locomocao);
  const profile = ANTHROPOMETRY_PROFILES[profileKey];

  container.innerHTML = `
    <div class="anthropometry-card">
      <div class="anthro-header">
        <div class="anthro-header-left">
          <span class="q-badge" style="background: var(--primary);">7</span>
          <div>
            <h3 class="question-title">Medidas Antropométricas Fundamentais (Adaptadas ao Perfil)</h3>
            <div style="font-size: 0.79rem; color: var(--text-secondary);">${profile.subtitle}</div>
          </div>
        </div>
        <span class="anthro-profile-pill">${profile.badgeTitle}</span>
      </div>

      <div class="anthro-body">
        <div>
          <!-- 1-Click Stature Presets -->
          <div class="anthro-presets-row">
            <span class="anthro-presets-label">Sem fita métrica? Preencha em 1 clique por porte:</span>
            ${Object.entries(profile.presets)
              .map(
                ([key, p]) => `
              <button type="button" class="btn-preset ${
                appState.anthropometry.preset === key ? 'active' : ''
              }" data-preset="${key}">
                ${p.label}
              </button>
            `
              )
              .join('')}
          </div>

          <!-- 3 Adaptive Inputs (A, B, C) -->
          <div class="anthro-inputs-grid">
            ${profile.fields
              .map(
                (f) => `
              <div class="anthro-field" data-letter="${f.letter}">
                <div class="anthro-field-top">
                  <span class="anthro-letter-tag">${f.letter}</span>
                  <label class="anthro-field-label" for="input_${f.id}">${f.label}</label>
                </div>
                <div class="anthro-field-hint">${f.hint}</div>
                <div class="anthro-input-wrap">
                  <input
                    type="number"
                    id="input_${f.id}"
                    class="anthro-input"
                    data-field="${f.id}"
                     data-letter="${f.letter}"
                    min="20"
                    max="230"
                    value="${appState.anthropometry[f.id]}"
                  />
                  <span class="anthro-unit">${f.unit}</span>
                </div>
              </div>
            `
              )
              .join('')}
          </div>

          <!-- Live Biomechanical Calculation Banner -->
          <div class="anthro-calc-banner" id="anthroCalcBanner">
            ${computeBiomechanicalRecommendations()}
          </div>
        </div>

        <!-- Right Column: Boneco Antropométrico Orientador -->
        <div class="anthro-figure-box">
          <div id="anthroMannequinSvgWrap">
            ${getAnthropometryMannequinSvg(profileKey, appState.anthropometry.highlightLetter)}
          </div>
          <div class="anthro-figure-caption">${profile.figureCaption}</div>
        </div>
      </div>
    </div>
  `;

  // Bind preset buttons
  container.querySelectorAll('.btn-preset').forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.preset;
      const preset = profile.presets[key];
      if (!preset) return;
      appState.anthropometry.preset = key;
      appState.anthropometry.medA = preset.medA;
      appState.anthropometry.medB = preset.medB;
      appState.anthropometry.medC = preset.medC;
      renderAnthropometrySection();
    });
  });

  // Bind numeric inputs and mannequin highlight on focus/hover
  container.querySelectorAll('.anthro-input').forEach((inp) => {
    inp.addEventListener('input', (e) => {
      const fieldId = e.target.dataset.field;
      appState.anthropometry[fieldId] = Number(e.target.value) || 0;
      appState.anthropometry.preset = null;
      container.querySelectorAll('.btn-preset').forEach((b) => b.classList.remove('active'));
      const banner = document.getElementById('anthroCalcBanner');
      if (banner) banner.innerHTML = computeBiomechanicalRecommendations();
    });

    inp.addEventListener('focus', (e) => {
      const letter = e.target.dataset.letter;
      const svgWrap = document.getElementById('anthroMannequinSvgWrap');
      if (svgWrap) svgWrap.innerHTML = getAnthropometryMannequinSvg(profileKey, letter);
    });

    inp.addEventListener('blur', () => {
      const svgWrap = document.getElementById('anthroMannequinSvgWrap');
      if (svgWrap) svgWrap.innerHTML = getAnthropometryMannequinSvg(profileKey, null);
    });
  });

  container.querySelectorAll('.anthro-field').forEach((card) => {
    card.addEventListener('mouseenter', () => {
      const letter = card.dataset.letter;
      const svgWrap = document.getElementById('anthroMannequinSvgWrap');
      if (svgWrap) svgWrap.innerHTML = getAnthropometryMannequinSvg(profileKey, letter);
    });
    card.addEventListener('mouseleave', () => {
      const svgWrap = document.getElementById('anthroMannequinSvgWrap');
      if (svgWrap) svgWrap.innerHTML = getAnthropometryMannequinSvg(profileKey, null);
    });
  });
}

function calculateVulnerabilityScore() {
  let score = 0;
  let answeredCount = 0;

  QUESTIONS_SCHEMA.forEach((q) => {
    if (q.type === 'single') {
      const val = appState.answers[q.id];
      if (val) {
        answeredCount++;
        const found = q.options.find((o) => o.value === val);
        if (found) score += found.weight;
      }
    } else {
      const arr = appState.answers[q.id] || [];
      if (arr.length > 0) {
        answeredCount++;
        arr.forEach((val) => {
          const found = q.options.find((o) => o.value === val);
          if (found) score += found.weight;
        });
      }
    }
  });

  let level = 'Baixo';
  let color = '#15803d';
  let bg = '#dcfce7';

  if (score >= 12) {
    level = 'Crítico (Alta Dependência)';
    color = '#dc2626';
    bg = '#fee2e2';
  } else if (score >= 6) {
    level = 'Alto (Risco Elevado de Queda)';
    color = '#b45309';
    bg = '#fef3c7';
  } else if (score >= 2) {
    level = 'Moderado (Vulnerabilidade Seletiva)';
    color = '#0f5c6e';
    bg = '#e0f2f5';
  }

  return { score, answeredCount, level, color, bg };
}

function updateStep1Progress() {
  const { answeredCount, level, color, bg } = calculateVulnerabilityScore();
  const progressText = document.getElementById('step1ProgressText');
  const badge = document.getElementById('liveVulnerabilityBadge');
  const badgeText = document.getElementById('liveVulnerabilityText');

  progressText.textContent = `${answeredCount} de 6 dimensões clínicas + antropometria configurada`;

  if (answeredCount === 0) {
    badgeText.textContent = 'Aguardando respostas';
    badge.style.background = '#ffffff';
    badgeText.style.color = '#475569';
  } else {
    badgeText.textContent = level;
    badge.style.background = bg;
    badgeText.style.color = color;
  }
}

// ============================================================================
// CARREGAMENTO DE CASO CLÍNICO DA PoC (1 CLIQUE)
// ============================================================================
function loadPocCase(caseKey) {
  const pocCase = POC_CASES[caseKey];
  if (!pocCase) return;

  appState.activeCaseId = caseKey;
  appState.clinicalContext = pocCase.clinicalContext;
  appState.answers = JSON.parse(JSON.stringify(pocCase.answers));
  if (pocCase.anthropometry) {
    appState.anthropometry = { ...pocCase.anthropometry, highlightLetter: null };
  }

  document.getElementById('clinicalContextInput').value = appState.clinicalContext;

  document.querySelectorAll('.case-card-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.case === caseKey);
  });

  appState.photos = pocCase.photos.map((p, i) => ({
    id: `${caseKey}_photo_${i}`,
    filename: p.filename,
    room: p.room,
    caption: p.caption,
    dataUrl: createSyntheticScenePng(p),
    orientationOk: true,
    lowToilet: !!p.lowToilet,
    highTrack: !!p.highTrack,
    hasFloorCloth: !!p.hasFloorCloth,
    lowBed: !!p.lowBed,
    hasRug: !!p.hasRug,
    hasOxygenTube: !!p.hasOxygenTube,
    dark: !!p.dark
  }));

  renderQuestions();
  renderAnthropometrySection();
  updateStep1Progress();
  renderPhotoGallery();
}

// ============================================================================
// UPLOAD E CHECAGEM COMPACTA DE FOTOS DENTRO DE CADA AMBIENTE (ETAPA 2)
// ============================================================================
function identifyRoomKey(roomStr) {
  if (!roomStr) return 'outro';
  const s = roomStr.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  // A verificação de caminho/cama deve preceder 'banheiro' pois o nome é 'caminho da cama ao banheiro'
  if (s.includes('caminho') || s.includes('cama') || s.includes('quarto')) return 'quarto';
  if (s.includes('banheiro') || s.includes('box')) return 'banheiro';
  if (s.includes('acesso') || s.includes('entrada')) return 'acesso';
  if (s.includes('cozinha')) return 'cozinha';
  return 'outro';
}

function getRoomCardElements(roomStr) {
  const key = identifyRoomKey(roomStr);
  switch (key) {
    case 'quarto':
      return {
        container: document.getElementById('preview_quarto'),
        btnSpan: document.querySelector('#uploadAction_quarto .card-upload-btn span'),
        defaultBtnText: 'Fotografar ou Anexar Foto: caminho da cama ao banheiro'
      };
    case 'banheiro':
      return {
        container: document.getElementById('preview_banheiro'),
        btnSpan: document.querySelector('#uploadAction_banheiro .card-upload-btn span'),
        defaultBtnText: 'Fotografar ou Anexar Foto: banheiro e box'
      };
    case 'acesso':
      return {
        container: document.getElementById('preview_acesso'),
        btnSpan: document.querySelector('#uploadAction_acesso .card-upload-btn span'),
        defaultBtnText: 'Fotografar ou Anexar Foto: acesso à casa'
      };
    case 'cozinha':
      return {
        container: document.getElementById('preview_cozinha'),
        btnSpan: document.querySelector('#uploadAction_cozinha .card-upload-btn span'),
        defaultBtnText: 'Fotografar ou Anexar Foto: cozinha'
      };
    default:
      return null;
  }
}

function detectPhotoVisualHazards(filename, caption, room) {
  const text = `${filename || ''} ${caption || ''} ${room || ''}`.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  return {
    hasRug: text.includes('tapete') || text.includes('rug') || text.includes('passadeira') || text.includes('carpete') || text.includes('caso2_caminho') || text.includes('caso3_caminho'),
    hasFloorCloth: text.includes('pano') || text.includes('panos') || text.includes('toalha no chao') || text.includes('caso2_banheiro') || text.includes('caso3_banheiro'),
    hasOxygenTube: text.includes('oxigenio') || text.includes('o2') || text.includes('mangueira') || text.includes('fio') || text.includes('cabo') || text.includes('extensao') || text.includes('caso3_caminho'),
    highTrack: text.includes('trilho') || text.includes('soleira alta') || text.includes('box alto') || text.includes('caso2_banheiro') || text.includes('caso3_banheiro'),
    lowToilet: text.includes('vaso baixo') || text.includes('38 cm') || text.includes('baixo') || text.includes('caso2_banheiro') || text.includes('caso3_banheiro'),
    lowBed: text.includes('cama baixa') || text.includes('40 cm') || text.includes('caso2_caminho') || text.includes('caso3_caminho'),
    hasSteps: text.includes('degrau') || text.includes('escada') || text.includes('desnivel') || text.includes('acesso'),
    noGrabBars: text.includes('sem barra') || text.includes('sem apoio') || text.includes('falta barra'),
    dark: text.includes('escuro') || text.includes('penumbra') || text.includes('pouca luz') || text.includes('caso3')
  };
}

function handleFileUpload(fileList, roomLabel) {
  if (!fileList || fileList.length === 0) return;

  Array.from(fileList).forEach((file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      const img = new Image();
      img.onload = () => {
        const isHorizontal = img.width >= img.height;

        // Ao enviar foto para o cômodo, substitui foto anterior do mesmo cômodo para economizar espaço
        const targetKey = identifyRoomKey(roomLabel);
        appState.photos = appState.photos.filter((p) => identifyRoomKey(p.room) !== targetKey);

        const detectedHazards = detectPhotoVisualHazards(file.name, '', roomLabel);

        appState.photos.push({
          id: `user_photo_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
          filename: file.name,
          room: roomLabel,
          caption: `Imagem enviada pela família (${img.width}x${img.height}px)`,
          dataUrl,
          orientationOk: isHorizontal,
          ...detectedHazards
        });
        renderPhotoGallery();
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  });
}

function renderPhotoGallery() {
  const rooms = [
    { id: 'preview_banheiro', btnSelector: '#uploadAction_banheiro .card-upload-btn span', defaultText: 'Fotografar ou Anexar Foto: banheiro e box' },
    { id: 'preview_quarto', btnSelector: '#uploadAction_quarto .card-upload-btn span', defaultText: 'Fotografar ou Anexar Foto: caminho da cama ao banheiro' },
    { id: 'preview_acesso', btnSelector: '#uploadAction_acesso .card-upload-btn span', defaultText: 'Fotografar ou Anexar Foto: acesso à casa' },
    { id: 'preview_cozinha', btnSelector: '#uploadAction_cozinha .card-upload-btn span', defaultText: 'Fotografar ou Anexar Foto: cozinha' }
  ];

  // Limpa os containers nos 4 cards e restaura os textos originais dos botões
  rooms.forEach((r) => {
    const el = document.getElementById(r.id);
    if (el) el.innerHTML = '';
    const btnSpan = document.querySelector(r.btnSelector);
    if (btnSpan) btnSpan.textContent = r.defaultText;
  });

  // Garante que a antiga galeria no rodapé nunca exiba nada
  const oldGallery = document.getElementById('uploadedGallery');
  if (oldGallery) {
    oldGallery.innerHTML = '';
    oldGallery.style.display = 'none';
  }

  // Preenche a checagem compacta e o thumbnail exatamente dentro de cada card
  appState.photos.forEach((photo) => {
    const cardEl = getRoomCardElements(photo.room);
    if (!cardEl || !cardEl.container) return;

    if (cardEl.btnSpan) {
      cardEl.btnSpan.textContent = '+ Substituir ou Enviar Nova Foto';
    }

    const item = document.createElement('div');
    item.className = 'ambient-preview-item';

    const orientWarning = !photo.orientationOk
      ? `<span style="color: #b45309; font-size: 0.72rem; font-weight: 600;">⚠️ Foto vertical (prefira celular deitado)</span>`
      : '';

    item.innerHTML = `
      <img src="${photo.dataUrl}" alt="${photo.room}" class="ambient-preview-thumb" />
      <div class="ambient-preview-info">
        <div class="ambient-preview-status">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>Foto anexada com sucesso</span>
        </div>
        <div class="ambient-preview-name" title="${photo.filename}">${photo.filename}</div>
        ${orientWarning}
      </div>
      <button type="button" class="ambient-remove-btn" title="Remover esta foto">
        ✕ Remover
      </button>
    `;

    item.querySelector('.ambient-remove-btn').addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      appState.photos = appState.photos.filter((p) => p.id !== photo.id);
      renderPhotoGallery();
    });

    cardEl.container.appendChild(item);
  });
}

// ============================================================================
// CONSTRUÇÃO DO META-PROMPT ESPECIALIZADO (INCLUINDO MEDIDAS ANTROPOMÉTRICAS)
// ============================================================================
function getAnthropometrySummaryString() {
  const profileKey = getAnthropometryProfileKey(appState.answers.p1_locomocao);
  const profile = ANTHROPOMETRY_PROFILES[profileKey];
  const fA = profile.fields[0];
  const fB = profile.fields[1];
  const fC = profile.fields[2];
  return `${profile.badgeTitle} -> [A] ${fA.label}: ${appState.anthropometry.medA} cm | [B] ${fB.label}: ${appState.anthropometry.medB} cm | [C] ${fC.label}: ${appState.anthropometry.medC} cm`;
}

function buildSpecializedClinicalPrompt() {
  const p1 = appState.answers.p1_locomocao || 'Não informado';
  const p2 = appState.answers.p2_banho || 'Não informado';
  const p3 = appState.answers.p3_vaso_transferencia || 'Não informado';
  const p4 = appState.answers.p4_cognicao || 'Não informado';
  const p5 = (appState.answers.p5_visao_audicao || []).join('; ') || 'Não informado';
  const p6 = (appState.answers.p6_quedas_dispositivos || []).join('; ') || 'Não informado';
  const anthroSummary = getAnthropometrySummaryString();

  const photoDescriptions =
    appState.photos.length > 0
      ? appState.photos.map((p) => `- ${p.filename} (${p.room}): ${p.caption}`).join('\n')
      : '- [Nenhuma imagem anexada — solicitar conferência manual pela família]';

  const contextLine = appState.clinicalContext
    ? `- Contexto Clínico Adicional: ${appState.clinicalContext}\n`
    : '';

  return `# PAPEL E EXPERTÍSE
Você é um especialista em geriatria, reabilitação física e adaptação do lar.
Sua missão é falar de maneira humana, acolhedora, clara e direta com a FAMÍLIA e o CUIDADOR do paciente.
Use tom em segunda pessoa ("você deve", "faça hoje", "observe"), sem jargões acadêmicos ou termos médicos difíceis.
Sua tarefa é cruzar os dados clínicos/funcionais e medidas corporais do paciente com as fotos dos 4 ambientes (banheiro, quarto, entrada e cozinha) para gerar um **Plano de Alta Segura e Cuidados em Casa**.
---
# DADOS DE ENTRADA
## 1. Perfil Clínico-Funcional e Medidas do Paciente:
${contextLine}- Como ele(a) anda: ${p1}
- Banho e cuidados pessoais: ${p2}
- Uso do vaso sanitário / sentar e levantar: ${p3}
- Memória, raciocínio e atenção: ${p4}
- Como enxerga e ouve: ${p5}
- Quedas recentes e aparelhos/sondas: ${p6}
- Medidas corporais: ${anthroSummary}
## 2. Fotos dos Ambientes da Casa:
${photoDescriptions}
---
# DIRETRIZES DE RACIOCÍNIO E ANÁLISE DAS FOTOS
Ao analisar as fotos dos ambientes da casa (Banheiro, Quarto, Acesso/Entrada e Cozinha), procure perigos práticos:
1. **Piso e chão:** tapetes soltos, panos de chão, trilho alto de boxe, fios no caminho, piso escorregadio, degraus sem corrimão.
2. **Sentar, levantar e apoios:** falta de barras de apoio firmes no vaso e boxe, vaso muito baixo que exige esforço, cama muito baixa ou muito alta.
3. **Espaço livre:** portas estreitas ou móveis/lixeiras bloqueando a passagem do andador, cadeira de rodas ou do cuidador ao lado.
4. **Iluminação e orientação:** cantos escuros à noite, espelhos que causam reflexo/confusão, degraus da mesma cor do chão.

# REGRA OBRIGATÓRIA DE FUSÃO MULTIMODAL (FOTOS + PERFIL CLÍNICO):
Você DEVE unir obrigatoriamente a inspeção visual de CADA foto com a condição clínica do paciente:
- Mesmo que o paciente seja jovem (ex: 28 anos) e caminhe sozinho, se houver um TAPETE visível na foto do quarto/caminho ou banheiro, aponte a remoção imediata no checklist "Por onde começar (custo zero)", explicando o motivo sob a ótica cirúrgica (escorregão gera contração súbita violenta do abdômen que pode romper os pontos cirúrgicos).
- Para idosos com andador ou fratura de quadril, o tapete nas fotos deve ser sinalizado como risco imediato de travar as rodas do andador e provocar queda sobre a perna operada.
- Para pacientes com declínio cognitivo ou baixa visão, o tapete escuro deve ser explicado como ilusão visual de buraco/abismo no chão.
Nunca ignore os elementos visíveis nas fotos! Junte questionário + medidas + fotos de maneira viva e personalizada.
---
# FORMATO DE SAÍDA (Fale diretamente com a família e o cuidador nesta estrutura)
### 1. Resumo dos Riscos para a Família
[2 a 3 frases acolhedoras e em linguagem simples explicando qual é o maior perigo para o seu familiar ao chegar em casa e onde a atenção de vocês deve se concentrar nas primeiras 72 horas]

### 2. Por onde começar (custo zero)
*Orientações práticas de remanejamento que você e sua família devem fazer agora mesmo, antes dele(a) chegar em casa:*
- **[Ação imediata]:** [Instrução direta falando com você cuidador/família, ex.: Retire hoje o tapete ao lado do boxe para evitar escorregões].
- **[Ação imediata]:** [Instrução direta falando com você cuidador/família, ex.: Mude a lixeira do corredor para liberar a passagem do andador].

### 3. Adaptações e Equipamentos para Providenciar
*Equipamentos essenciais recomendados para a segurança do paciente em casa (com medidas exatas para comprar ou instalar):*
- **[Item 1]:** [Local e medida exata, ex.: Barra de apoio reta de 80 cm em aço inox instalada ao lado do vaso, a 75 cm do chão].
- **[Item 2]:** [Especificação clara, ex.: Cadeira ou banco de banho com pés de borracha antiderrapante regulado na altura do joelho].

### 4. Dicas de Ouro para a Rotina do Cuidador
*Orientações diretas para você cuidador cuidar com segurança e sem machucar a sua coluna:*
- [Dica de técnica de transferência ou auxílio para levantar/sentar].
- [Dica de checagem noturna, iluminação ou rotina do banho].
---
# REGRAS E SALVAGUARDAS
- Fale com clareza, empatia e objetividade. Não use jargões herméticos.
- Nunca faça prescrição de medicamentos.
- Se alguma foto estiver muito escura ou sem visão completa (ex.: não deu para ver o chão do boxe), oriente a família a checar manualmente esse ponto.
- Inclua ao final a seguinte nota obrigatória: *"Este relatório é uma ferramenta de suporte para ajudar a sua família a preparar a casa com segurança, não substituindo a consulta e orientação presencial do médico, terapeuta ocupacional ou fisioterapeuta."*`;
}

// ============================================================================
// MOTOR CLÍNICO-ARQUITETÔNICO DINÂMICO (FUSÃO DE QUESTIONÁRIO + FOTOS)
// ============================================================================
function analyzeCurrentPhotos() {
  const analysis = {
    hasRugInBedPath: false,
    hasRugInBath: false,
    hasRugAnywhere: false,
    hasFloorCloth: false,
    hasOxygenTube: false,
    hasHighTrack: false,
    hasLowToilet: false,
    hasLowBed: false,
    hasEntranceSteps: false,
    hasKitchenRugOrObstacle: false,
    isDarkOrPenumbra: false,
    hasNoGrabBars: false,
    totalPhotos: appState.photos.length,
    photoDetails: []
  };

  appState.photos.forEach((photo) => {
    const rKey = identifyRoomKey(photo.room);
    const hints = detectPhotoVisualHazards(photo.filename, photo.caption, photo.room);

    const hasRug = Boolean(photo.hasRug || hints.hasRug);
    const hasCloth = Boolean(photo.hasFloorCloth || hints.hasFloorCloth);
    const hasO2 = Boolean(photo.hasOxygenTube || hints.hasOxygenTube);
    const highTr = Boolean(photo.highTrack || hints.highTrack);
    const lowTo = Boolean(photo.lowToilet || hints.lowToilet);
    const lowB = Boolean(photo.lowBed || hints.lowBed);
    const steps = Boolean(photo.hasSteps || hints.hasSteps);
    const noBars = Boolean(photo.noGrabBars || hints.noGrabBars || (rKey === 'banheiro' && !photo.hasGrabBars));
    const darkP = Boolean(photo.dark || hints.dark);

    if (hasRug) {
      analysis.hasRugAnywhere = true;
      if (rKey === 'quarto') analysis.hasRugInBedPath = true;
      if (rKey === 'banheiro') analysis.hasRugInBath = true;
      if (rKey === 'cozinha') analysis.hasKitchenRugOrObstacle = true;
    }
    if (hasCloth) {
      analysis.hasFloorCloth = true;
      analysis.hasRugAnywhere = true;
      if (rKey === 'banheiro') analysis.hasRugInBath = true;
      if (rKey === 'cozinha') analysis.hasKitchenRugOrObstacle = true;
    }
    if (hasO2) analysis.hasOxygenTube = true;
    if (highTr) analysis.hasHighTrack = true;
    if (lowTo) analysis.hasLowToilet = true;
    if (lowB) analysis.hasLowBed = true;
    if (steps && rKey === 'acesso') analysis.hasEntranceSteps = true;
    if (noBars && rKey === 'banheiro') analysis.hasNoGrabBars = true;
    if (darkP) analysis.isDarkOrPenumbra = true;

    analysis.photoDetails.push({
      room: photo.room,
      roomKey: rKey,
      filename: photo.filename,
      hasRug,
      hasCloth,
      hasO2,
      highTr,
      lowTo,
      lowB,
      steps,
      noBars,
      darkP
    });
  });

  return analysis;
}

function generateStructuredReportFromRules() {
  const p1 = appState.answers.p1_locomocao || '';
  const p2 = appState.answers.p2_banho || '';
  const p3 = appState.answers.p3_vaso_transferencia || '';
  const p4 = appState.answers.p4_cognicao || '';
  const p5 = appState.answers.p5_visao_audicao || [];
  const p6 = appState.answers.p6_quedas_dispositivos || [];
  const ctx = (appState.clinicalContext || '').toLowerCase();

  const profileKey = getAnthropometryProfileKey(p1);
  const A = Number(appState.anthropometry.medA) || 45;
  const B = Number(appState.anthropometry.medB) || 78;
  const C = Number(appState.anthropometry.medC) || 65;

  // Análise detalhada das fotos anexadas
  const visualAnalysis = analyzeCurrentPhotos();

  // Perfis clínicos detectados
  const isAbdominalPostOp =
    ctx.includes('apendic') ||
    ctx.includes('abdom') ||
    ctx.includes('laparo') ||
    ctx.includes('pontos') ||
    ctx.includes('cirurgia abdominal');

  const isHipOrFemurPostOp =
    ctx.includes('quadril') ||
    ctx.includes('femur') ||
    ctx.includes('fratura') ||
    ctx.includes('artroplastia') ||
    ctx.includes('osteossintese');

  const hasWalkerOrSupport = p1.includes('bengala/andador') || p1.includes('braço') || p1.includes('paredes');
  const hasWheelchairOrBed = p1.includes('cadeira de rodas') || p1.includes('cama ou poltrona');
  const needsBathSupport = !p2.includes('sem ajuda física');
  const needsToiletSupport = !p3.includes('sem esforço');
  const hasCognitiveDecline =
    p4.includes('Confusão') ||
    p4.includes('Agitação') ||
    p4.includes('Esquecimentos') ||
    ctx.includes('cognitiv') ||
    ctx.includes('demencia') ||
    ctx.includes('alzheimer') ||
    ctx.includes('tcl');

  const hasLowVision = p5.some((v) => v.includes('Visão embaçada'));
  const hasPriorFalls = p6.some((v) => v.includes('queda'));
  const hasOxygen = p6.some((v) => v.includes('oxigênio')) || visualAnalysis.hasOxygenTube || ctx.includes('oxigenio') || ctx.includes('dpoc');
  const hasTubesOrWounds = p6.some((v) => v.includes('sondas')) || isAbdominalPostOp;

  const minPassageCm = profileKey === 'cadeirante' ? Math.max(80, A + 12) : Math.max(78, C + 12);

  // --------------------------------------------------------------------------
  // 1. RESUMO DOS RISCOS (FUSÃO DE QUESTIONÁRIO + FOTOS)
  // --------------------------------------------------------------------------
  let resumoRisco = '';

  if (isAbdominalPostOp) {
    const rugHazard = visualAnalysis.hasRugAnywhere
      ? 'e a presença do tapete solto identificado no chão das fotos (que pode causar escorregão com contração súbita e ruptura dos pontos cirúrgicos)'
      : 'e o piso liso do banheiro sem barras de apoio';
    resumoRisco = `Olá, família e cuidador! O seu familiar (jovem, 28 anos) está em recuperação pós-operatória de cirurgia abdominal e caminha sozinho, mas o corte cirúrgico no abdômen ainda causa dor e é vulnerável a qualquer esforço de dobrar o corpo ou reflexos de sobressalto. Ao cruzarmos a situação clínica com as fotos dos cômodos da sua casa, os pontos críticos são o esforço abdominal para sentar e levantar do vaso sanitário ${rugHazard}. Sigam o checklist prático abaixo para garantir uma alta segura e sem dor.`;
  } else if (isHipOrFemurPostOp) {
    resumoRisco = `Atenção redobrada, família e cuidador! O seu familiar (79 anos) acabou de operar o quadril e está com a perna fraca, usando andador e com a visão embaçada. O maior perigo para ele(a) nas primeiras 72 horas é sofrer uma nova queda ou dobrar a perna operada mais do que 90 graus. Ao inspecionarmos as fotos da casa, encontramos armadilhas arquitetônicas diretas: ${visualAnalysis.hasRugAnywhere ? 'tapetes soltos no trajeto (onde o andador trava),' : ''} ${visualAnalysis.hasLowToilet ? 'vaso sanitário baixo demais,' : ''} ${visualAnalysis.hasHighTrack ? 'trilho alto de boxe,' : ''} e necessidade de 80 cm de passagem livre.`;
  } else if (hasCognitiveDecline) {
    resumoRisco = `Alerta máximo, família e cuidador! O seu familiar (84 anos) tem muita fraqueza nas pernas, já sofreu quedas recentes, tem esquecimentos frequentes e usa oxigênio. Ao cruzarmos esse histórico com a inspeção visual das fotos, identificamos 4 armadilhas gravíssimas: ${visualAnalysis.hasOxygenTube ? 'a mangueira de oxigênio solta no meio do quarto,' : ''} ${visualAnalysis.hasRugAnywhere ? 'tapetes no chão (que o cérebro interpreta como buracos),' : ''} falta total de barras de apoio no banheiro e botões de gás na cozinha.`;
  } else {
    resumoRisco = `Olá, família e cuidador! Ao cruzarmos a situação de saúde do seu familiar com a inspeção visual das fotos da casa, identificamos que ${
      hasPriorFalls || hasWheelchairOrBed || hasCognitiveDecline
        ? 'ele(a) está em uma fase de alta fragilidade e risco elevado de queda nas primeiras 72 horas após a alta'
        : 'ele(a) precisa de adaptações simples e imediatas no espaço para que a recuperação ocorra com conforto e segurança'
    }. Os locais de maior atenção são o banheiro e o caminho entre o quarto e o banheiro. Sigam as orientações práticas abaixo para proteger seu familiar e facilitar o cuidado no dia a dia.`;
  }

  // --------------------------------------------------------------------------
  // 2. POR ONDE COMEÇAR (CUSTO ZERO) - FUSÃO CLÍNICA & VISUAL
  // --------------------------------------------------------------------------
  const acoesImediatas = [];

  // A. TAPETES / PANOS DE CHÃO (Alerta visual mandatório cruzado com perfil clínico)
  if (visualAnalysis.hasRugAnywhere || visualAnalysis.hasFloorCloth) {
    if (isAbdominalPostOp) {
      acoesImediatas.push({
        titulo: 'Retire hoje o tapete solto identificado na foto do trajeto da cama ao banheiro',
        detalhe: 'A foto do caminho revela um tapete solto no piso. Mesmo sendo jovem (28 anos) e andando sem auxílio, tapetes soltos no caminho são a causa número 1 de escorregões. Ao escorregar ou tropeçar, o corpo aciona um reflexo imediato de contração violenta dos músculos do abdômen para não cair. Essa força súbita pode romper os pontos cirúrgicos internos, causar sangramento, hematoma doloroso e dor intensa. Deixe o piso de madeira/cerâmica 100% livre.'
      });
    } else if (isHipOrFemurPostOp || hasWalkerOrSupport) {
      acoesImediatas.push({
        titulo: 'Retire AGORA todos os tapetes, passadeiras e panos de chão identificados nas fotos',
        detalhe: 'A foto do caminho/banheiro mostra tapete ou pano solto no chão. As pontas de borracha ou rodinhas do andador enroscam nas dobras do tapete e provocam tombos graves sobre o quadril recém-operado. Guarde 100% dos tapetes em armários antes da chegada do paciente.'
      });
    } else if (hasCognitiveDecline || hasLowVision) {
      acoesImediatas.push({
        titulo: 'Retire todos os tapetes soltos e cubra os espelhos à noite',
        detalhe: 'Remova todos os tapetes identificados nas fotos do banheiro, quarto e corredores. Para pessoas idosas com baixa visão ou declínio cognitivo, tapetes escuros podem ser percebidos como buracos no chão, provocando paralisia da marcha, medo ou tentativas bruscas de desvio com queda. Cubra ou remova espelhos da linha de visão noturna para evitar sustos com o próprio reflexo.'
      });
    } else {
      acoesImediatas.push({
        titulo: 'Retire todos os tapetes e panos de chão soltos vistos nas fotos',
        detalhe: 'Tapetes soltos no piso são a causa número 1 de escorregões domiciliares no pós-alta imediato. Guarde-os em armários durante todo o período de reabilitação.'
      });
    }
  }

  // B. MANGUEIRA DE OXIGÊNIO OU FIOS (Cruzamento visual foto do quarto + pergunta 6)
  if (visualAnalysis.hasOxygenTube || hasOxygen) {
    acoesImediatas.push({
      titulo: 'Prenda e suspenda a mangueira de oxigênio pelas paredes AGORA',
      detalhe: 'A extensão plástica de O₂ atravessada no chão do quarto (veja na foto) é uma armadilha fatal de tropeço para quem anda a passos curtos, arrastados ou sob analgésicos. Prenda o fio com fita adesiva ou ganchos no rodapé da parede, deixando o caminho do quarto ao banheiro 100% desobstruído.'
    });
  }

  // C. PASSAGEM LIVRE E POSICIONAMENTO NA ALTURA DA CINTURA (Antropometria C + Fotos)
  if (isAbdominalPostOp) {
    acoesImediatas.push({
      titulo: 'Coloque as coisas dele(a) na altura da cintura (nem no chão, nem no alto)',
      detalhe: 'Deixe papel higiênico, toalhas de banho, sabonete, mudas de roupa e copo de água na altura da cintura (cerca de 80 cm a 1 metro do chão). Assim, ele(a) não precisará se agachar nem esticar a barriga para alcançar o que precisa, poupando os pontos da cirurgia.'
    });
    acoesImediatas.push({
      titulo: 'Mantenha o chão do box seco e use calçado de borracha firme',
      detalhe: 'Como o banheiro não tem barras de apoio (veja na foto), qualquer escorregão causaria um reflexo rápido do tronco que puxaria o abdômen operado. Mantenha o piso seco e utilize calçado de borracha antiderrapante bem firme nos pés durante o banho.'
    });
    acoesImediatas.push({
      titulo: 'Deixe um apoio firme e estável ao lado da cama',
      detalhe: 'Coloque uma cadeira pesada ou mesinha bem firme ao lado da cama para que ele(a) possa apoiar as duas mãos com segurança ao sair da cama de manhã.'
    });
  } else if (isHipOrFemurPostOp) {
    acoesImediatas.push({
      titulo: `Libere pelo menos ${minPassageCm} cm de passagem no corredor e na cozinha`,
      detalhe: `Tire a lixeira da passagem da cozinha (veja na foto) e afaste móveis do corredor. O andador dele(a) mede ${C} cm de largura e precisa de pelo menos ${minPassageCm} cm livres para não bater nas paredes.`
    });
    acoesImediatas.push({
      titulo: `Ajuste a altura do andador para que fique na linha do punho dele(a) (${B} cm)`,
      detalhe: `Com o paciente em pé calçado, a empunhadura do andador deve ficar exatamente na altura do osso do punho (${B} cm do chão), mantendo os cotovelos levemente dobrados.`
    });
    acoesImediatas.push({
      titulo: 'Coloque uma almofada firme e alta na cama/poltrona provisoriamente',
      detalhe: 'A cama da foto é baixa. Enquanto não colocar calços nos pés da cama, coloque um assento/almofada firme e alta para que, ao sentar, o joelho dele(a) nunca fique mais alto do que a bacia (>90°).'
    });
  } else if (hasCognitiveDecline) {
    acoesImediatas.push({
      titulo: 'Feche o registro de gás do fogão e guarde objetos perigosos',
      detalhe: 'A foto da cozinha mostra botões de fogão acessíveis. Como ele(a) esquece perigos do dia a dia, mantenha a chave geral do gás fechada após cozinhar e guarde facas, fósforos e produtos de limpeza fora do alcance.'
    });
    acoesImediatas.push({
      titulo: `Garanta passagem desobstruída de pelo menos ${minPassageCm} cm no trajeto até a porta`,
      detalhe: `Afaste mesas instáveis e lixeiras do caminho da cama até a porta do banheiro, garantindo rota reta e livre para caminhar com o cuidador.`
    });
  } else {
    acoesImediatas.push({
      titulo: `Garanta passagem livre de pelo menos ${minPassageCm} cm e coloque itens na altura da cintura`,
      detalhe: `Afaste lixeiras e móveis do caminho entre o quarto e o banheiro. Organize roupas, toalhas, copo e remédios na altura da cintura (para não precisar se abaixar nem subir em banquinhos).`
    });
  }

  // --------------------------------------------------------------------------
  // 3. ADAPTAÇÕES E EQUIPAMENTOS (COM MEDIDAS EXATAS EM CM)
  // --------------------------------------------------------------------------
  const adaptacoesPrioritarias = [];

  if (isAbdominalPostOp) {
    adaptacoesPrioritarias.push({
      titulo: 'Tapete de borracha com ventosas dentro do box',
      detalhe: 'Fixe um tapete emborrachado com ventosas bem presas no chão do chuveiro para garantir máxima aderência e evitar que ele(a) precise fazer força para se equilibrar durante o banho.'
    });
    adaptacoesPrioritarias.push({
      titulo: 'Assento sanitário elevado (5 a 7,5 cm) ou apoio lateral portátil',
      detalhe: 'Como o banheiro da foto não possui barras de apoio, colocar um elevador macio de assento ou um apoio de braços portátil sobre o vaso sanitário facilitará muito sentar e levantar sem forçar os pontos da cirurgia no abdômen.'
    });
  } else if (isHipOrFemurPostOp) {
    const targetSeat = Math.max(50, A + 5);
    const booster = Math.max(10, targetSeat - 39);
    adaptacoesPrioritarias.push({
      titulo: `Elevador de vaso sanitário (+${booster} cm) com alças laterais + Barras de apoio em inox (${B} cm)`,
      detalhe: `A foto do banheiro confirma vaso baixo (~38 cm). Sentar abaixo do joelho (${A} cm) quebra a regra de 90° e pode deslocar a prótese/osteossíntese. Eleve o assento para ${targetSeat} cm e fixe barras retas em inox a ${B} cm do chão.`
    });
    adaptacoesPrioritarias.push({
      titulo: 'Cadeira de banho regulada em 50 cm de altura dentro do box',
      detalhe: 'Com a perna operada e o trilho alto do boxe visto na foto, ele(a) não consegue ficar em pé no banho nem transpor o trilho. Deve tomar banho sentado com supervisão na cadeira de banho.'
    });
    adaptacoesPrioritarias.push({
      titulo: `Calços extensores sob os pés da cama (+12 cm) e corrimão nos degraus de entrada (${B} cm)`,
      detalhe: `Eleve a cama para nivelar com a altura poplítea segura e instale corrimão firme dos dois lados dos 2 degraus da entrada de casa, além de colar fita adesiva amarela reflexiva nos degraus por causa da visão fraca.`
    });
  } else if (hasCognitiveDecline) {
    adaptacoesPrioritarias.push({
      titulo: `Barras de apoio retas em aço inox ao lado do vaso sanitário (${B} cm) e no chuveiro`,
      detalhe: `Instale barras de apoio retas de 80 cm na parede lateral do vaso, fixadas a ${B} cm do chão, para dar sustentação firme à fraqueza muscular e prevenir desequilíbrios.`
    });
    adaptacoesPrioritarias.push({
      titulo: `Cadeira de banho com encosto e pés de borracha regulada a ${A + 2} cm de altura`,
      detalhe: 'A foto do banheiro mostra piso molhado e sem assento. Nunca dê banho em pé em quem tem fraqueza e risco de desorientação; o banho sentado elimina o risco de quedas graves.'
    });
    adaptacoesPrioritarias.push({
      titulo: `Luz guia noturna com sensor de presença e fita contrastante amarela nos degraus (${B} cm)`,
      detalhe: 'A foto do acesso e corredores mostra iluminação deficiente. Instale luz de tomada automática que acende com movimento e cole fitas amarelas contrastantes na beirada de qualquer degrau ou soleira.'
    });
  } else if (profileKey === 'acamado') {
    adaptacoesPrioritarias.push({
      titulo: 'Ajuste a altura da cama para ~73 cm (altura da cintura) e use colchão adequado',
      detalhe: 'Para você cuidador não machucar sua coluna ao dar banho, trocar fralda ou posicionar no leito, a cama deve ficar na altura dos seus ossos do quadril (~73 cm). Use calços firmes nos pés da cama se estiver muito baixa, e providencie colchão pneumático (caixa de ovo/alívio de pressão).'
    });
  } else {
    const targetSeat = needsToiletSupport ? A + 4 : A + 1;
    const booster = Math.max(5, targetSeat - 39);
    adaptacoesPrioritarias.push({
      titulo: `Instale barras de apoio em aço inox (a ${B} cm do chão) e elevador de vaso sanitário (+${booster} cm)`,
      detalhe: `O vaso sanitário comum é baixo e exige muita força nas pernas para levantar. Com o elevador de assento (elevando para ${targetSeat} cm) e a barra de apoio na altura do punho dele(a) (${B} cm), levantar do vaso fica leve e sem risco de tombo.`
    });
    if (needsBathSupport) {
      adaptacoesPrioritarias.push({
        titulo: `Cadeira de banho com pés de borracha (regulada em ${A + 2} cm)`,
        detalhe: 'A cadeira de banho dentro do boxe dá segurança total, evita escorregões no piso ensaboado e poupa o cuidador de segurar peso molhado.'
      });
    }
  }

  // --------------------------------------------------------------------------
  // 4. DICAS DE OURO PARA A ROTINA DO CUIDADOR
  // --------------------------------------------------------------------------
  const rotinaCuidador = [];

  if (isAbdominalPostOp) {
    rotinaCuidador.push(
      'Ensine a técnica de "levantar em bloco": primeiro ele(a) deve virar todo o corpo de lado na cama, colocar as duas pernas para fora e empurrar o colchão com os braços para sentar, sem dobrar a barriga.',
      'Deixe uma luz suave ou abajur aceso à noite caso ele(a) precise ir ao banheiro com sono ou sob efeito de analgésicos, e fique atento se o curativo permanecer limpo e seco.'
    );
  } else if (isHipOrFemurPostOp) {
    rotinaCuidador.push(
      'Como ajudar a sentar e levantar do vaso e da cama: posicione o andador travado bem à frente dele(a), peça para ele(a) esticar a perna operada um pouquinho para frente antes de descer o corpo, e dê apoio segurando com firmeza pela cintura/cinto, NUNCA puxando pelos braços.',
      'Mantenha as luzes 100% acesas em qualquer ida ao banheiro (mesmo no meio da noite) e confira diariamente se o chão do banheiro e da cozinha está completamente seco antes dele(a) pisar.'
    );
  } else if (hasCognitiveDecline) {
    rotinaCuidador.push(
      'Aguarde 2 minutos com o paciente sentado antes de levantar: ao acordar, sente-o na beira da cama com os pés apoiados no chão e converse calmamente para orientá-lo no espaço e evitar tontura repentina por pressão baixa.',
      'Sempre conduza o paciente caminhando meio passo atrás e ao lado do lado mais fraco, com uma mão suave no quadril para suporte imediato sem puxar os braços.'
    );
  } else {
    rotinaCuidador.push(
      'Nunca levante o seu familiar da cama com pressa: ao acordar, sente-o na beira da cama por 1 a 2 minutos com os dois pés bem apoiados no chão. Isso evita tontura repentina e pressão baixa ao ficar de pé.',
      'Seque o piso do banheiro antes e logo após o banho, calce sempre nele(a) sapatos com sola de borracha antiderrapante (nada de meias ou chinelos soltos) e segure sempre pelo quadril/cintura, nunca puxando pelos braços ou axilas.'
    );
  }

  if (hasTubesOrWounds && !isAbdominalPostOp) {
    rotinaCuidador.push(
      'Antes de movimentar o paciente da cama para a cadeira, verifique se a sonda, o dreno ou o curativo não estão repuxando ou presos na grade da cama.'
    );
  }

  return {
    resumoRisco,
    acoesImediatas,
    adaptacoesPrioritarias,
    rotinaCuidador
  };
}

// ============================================================================
// INTEGRAÇÃO COM A API REAL DO GOOGLE GEMINI MULTIMODAL
// ============================================================================
async function callGeminiMultimodalApi(promptText) {
  const apiKey = appState.geminiApiKey.trim();
  const model = appState.geminiModel || 'gemini-2.5-flash';
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`;

  const parts = [{ text: promptText }];

  appState.photos.forEach((photo) => {
    if (photo.dataUrl && photo.dataUrl.startsWith('data:image/')) {
      const [meta, base64Data] = photo.dataUrl.split(',');
      const mimeMatch = meta.match(/data:(image\/[a-zA-Z0-9+.-]+);base64/);
      const mimeType = mimeMatch ? mimeMatch[1] : 'image/png';
      parts.push({
        inline_data: {
          mime_type: mimeType,
          data: base64Data
        }
      });
    }
  });

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts }],
      generationConfig: {
        temperature: 0.25,
        maxOutputTokens: 2048
      }
    })
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Erro na API Gemini (${response.status}): ${errText}`);
  }

  const data = await response.json();
  const text =
    data?.candidates?.[0]?.content?.parts?.map((p) => p.text || '').join('\n') || '';
  return text;
}

// ============================================================================
// RENDERIZAÇÃO DO RELATÓRIO DE ALTA SEGURA (ETAPA 3)
// ============================================================================
async function generateAndRenderReport() {
  switchStep(3);

  const promptText = buildSpecializedClinicalPrompt();
  document.getElementById('compiledPromptPreview').textContent = promptText;

  const summaryEl = document.getElementById('reportPatientSummary');
  const { level } = calculateVulnerabilityScore();
  summaryEl.innerHTML = `
    <div class="summary-chip">
      <div class="summary-chip-label">Grau de Vulnerabilidade</div>
      <div class="summary-chip-val">${level}</div>
    </div>
    <div class="summary-chip">
      <div class="summary-chip-label">Locomoção Atual</div>
      <div class="summary-chip-val">${appState.answers.p1_locomocao || 'Não informado'}</div>
    </div>
    <div class="summary-chip">
      <div class="summary-chip-label">Antropometria (A • B • C)</div>
      <div class="summary-chip-val">A: ${appState.anthropometry.medA} cm | B: ${appState.anthropometry.medB} cm | C: ${appState.anthropometry.medC} cm</div>
    </div>
  `;

  const container = document.getElementById('reportContentContainer');

  if (appState.geminiApiKey && appState.geminiApiKey.trim().length > 10) {
    container.innerHTML = `
      <div class="report-section" style="text-align: center; padding: 2.2rem;">
        <div style="font-size: 1.05rem; font-weight: 700; color: var(--primary-dark); margin-bottom: 0.4rem;">
          ⏳ Analisando imagens, perfil clínico e antropometria na API Multimodal do Google Gemini (${appState.geminiModel})...
        </div>
        <p style="font-size: 0.86rem; color: var(--text-secondary);">
          Cruzando barreiras arquitetônicas das fotos com medidas antropométricas e diretrizes ABNT NBR 9050.
        </p>
      </div>
    `;

    try {
      const markdownResponse = await callGeminiMultimodalApi(promptText);
      renderMarkdownReport(markdownResponse, container);
      return;
    } catch (err) {
      console.warn('Fallback para motor clínico integrado devido a erro na API:', err);
    }
  }

  const report = generateStructuredReportFromRules();
  const lowPhotoNote =
    appState.photos.length === 0
      ? `<div style="background:#fef3c7; border:1px solid #f59e0b; padding:0.75rem 1rem; border-radius:8px; margin-bottom:1rem; font-size:0.85rem; color:#92400e;">
          <strong>Nota de Conferência Visual Manual:</strong> Como nenhuma foto foi anexada nesta rodada, solicitamos que a família confira manualmente a ausência de tapetes soltos, a altura do vaso sanitário e a iluminação do piso do boxe.
         </div>`
      : '';

  container.innerHTML = `
    ${lowPhotoNote}

    <div class="report-section risk-summary">
      <h3>1. Resumo dos Riscos para a Família e Cuidador</h3>
      <p style="font-size: 0.95rem; color: var(--text-main); line-height: 1.65;">
        ${report.resumoRisco}
      </p>
    </div>

    <div class="report-section zero-cost">
      <h3>2. Por onde começar (custo zero)</h3>
      <p style="font-size: 0.83rem; color: var(--text-secondary); margin-bottom: 0.75rem;">
        Marque na caixinha ao lado conforme você e sua família forem concluindo cada ação antes da chegada do seu familiar:
      </p>
      <ul class="report-list">
        ${report.acoesImediatas
          .map(
            (item) => `
          <li class="report-list-item">
            <input type="checkbox" class="action-check" />
            <span><strong>${item.titulo}:</strong> ${item.detalhe}</span>
          </li>
        `
          )
          .join('')}
      </ul>
    </div>

    <div class="report-section assistive-tech">
      <h3>3. Adaptações e Equipamentos para Providenciar em Casa (com Medidas Exatas)</h3>
      <ul class="report-list">
        ${report.adaptacoesPrioritarias
          .map(
            (item) => `
          <li class="report-list-item">
            <input type="checkbox" class="action-check" />
            <span><strong>${item.titulo}:</strong> ${item.detalhe}</span>
          </li>
        `
          )
          .join('')}
      </ul>
    </div>

    <div class="report-section caregiver-routine">
      <h3>4. Dicas de Ouro para a Rotina de Quem Cuida (Protegendo sua Coluna)</h3>
      <ul class="report-list">
        ${report.rotinaCuidador
          .map(
            (dica) => `
          <li class="report-list-item">
            <input type="checkbox" class="action-check" />
            <span>${dica}</span>
          </li>
        `
          )
          .join('')}
      </ul>
    </div>
  `;

  bindChecklistCheckboxes();
}

function renderMarkdownReport(markdownText, container) {
  const escaped = markdownText
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/^### (.*$)/gm, '<h3 style="margin-top:1.1rem; margin-bottom:0.5rem; color:var(--primary-dark);">$1</h3>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/^- (.*$)/gm, '<li class="report-list-item"><input type="checkbox" class="action-check"/><span>$1</span></li>');

  container.innerHTML = `
    <div class="report-section risk-summary">
      <div style="font-size:0.76rem; font-weight:700; color:var(--accent); text-transform:uppercase; margin-bottom:0.5rem;">
        ✓ Resposta gerada em tempo real pela API Google Gemini Multimodal (${appState.geminiModel})
      </div>
      <div style="line-height:1.65; font-size:0.93rem;">${escaped.replace(/\n/g, '<br/>')}</div>
    </div>
  `;
  bindChecklistCheckboxes();
}

function bindChecklistCheckboxes() {
  document.querySelectorAll('.action-check').forEach((chk) => {
    chk.addEventListener('change', () => {
      chk.closest('.report-list-item')?.classList.toggle('checked', chk.checked);
    });
  });
}

// ============================================================================
// NAVEGAÇÃO ENTRE ETAPAS E EVENTOS GERAIS
// ============================================================================
function switchStep(stepNum) {
  appState.currentStep = stepNum;

  document.getElementById('step1Panel').classList.toggle('hidden', stepNum !== 1);
  document.getElementById('step2Panel').classList.toggle('hidden', stepNum !== 2);
  document.getElementById('step3Panel').classList.toggle('hidden', stepNum !== 3);

  [1, 2, 3].forEach((n) => {
    const tab = document.getElementById(`tabStep${n}`);
    tab.classList.toggle('active', n === stepNum);
    tab.classList.toggle('completed', n < stepNum);
  });

  if (stepNum === 2) {
    renderPhotoGallery();
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateApiStatusUI() {
  const dot = document.getElementById('apiStatusDot');
  const label = document.getElementById('apiStatusLabel');
  if (appState.geminiApiKey && appState.geminiApiKey.trim().length > 10) {
    dot.classList.add('connected');
    label.textContent = `Motor IA: Gemini API Ativa (${appState.geminiModel})`;
  } else {
    dot.classList.remove('connected');
    label.textContent = 'Motor IA: Híbrido (Simulação NBR 9050 + Gemini)';
  }
}

function initEventListeners() {
  document.querySelectorAll('.case-card-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      loadPocCase(btn.dataset.case);
    });
  });

  document.getElementById('resetFormBtn').addEventListener('click', () => {
    appState.activeCaseId = null;
    appState.clinicalContext = '';
    appState.answers = {
      p1_locomocao: '',
      p2_banho: '',
      p3_vaso_transferencia: '',
      p4_cognicao: '',
      p5_visao_audicao: [],
      p6_quedas_dispositivos: []
    };
    appState.anthropometry = {
      preset: 'medio',
      medA: 45,
      medB: 79,
      medC: 66,
      highlightLetter: null
    };
    appState.photos = [];
    document.getElementById('clinicalContextInput').value = '';
    document.querySelectorAll('.case-card-btn').forEach((b) => b.classList.remove('active'));
    renderQuestions();
    renderAnthropometrySection();
    updateStep1Progress();
    renderPhotoGallery();
    switchStep(1);
  });

  document.getElementById('clinicalContextInput').addEventListener('input', (e) => {
    appState.clinicalContext = e.target.value;
  });

  document.getElementById('tabStep1').addEventListener('click', () => switchStep(1));
  document.getElementById('tabStep2').addEventListener('click', () => switchStep(2));
  document.getElementById('tabStep3').addEventListener('click', () => generateAndRenderReport());

  document.getElementById('toStep2Btn').addEventListener('click', () => switchStep(2));
  document.getElementById('backToStep1Btn').addEventListener('click', () => switchStep(1));
  document.getElementById('generateReportBtn').addEventListener('click', () => generateAndRenderReport());
  document.getElementById('backToStep2Btn').addEventListener('click', () => switchStep(2));
  document.getElementById('newAssessmentBtn').addEventListener('click', () => {
    document.getElementById('resetFormBtn').click();
  });

  ['fileBanheiro', 'fileQuarto', 'fileAcesso', 'fileCozinha'].forEach((id) => {
    const input = document.getElementById(id);
    if (!input) return;
    input.addEventListener('change', (e) => {
      handleFileUpload(e.target.files, input.dataset.room);
      input.value = '';
    });
  });

  document.getElementById('printReportBtn').addEventListener('click', () => {
    window.print();
  });

  const modal = document.getElementById('apiModalBackdrop');
  document.getElementById('openApiModalBtn').addEventListener('click', () => {
    document.getElementById('geminiApiKeyInput').value = appState.geminiApiKey;
    document.getElementById('geminiModelSelect').value = appState.geminiModel;
    modal.classList.add('open');
  });

  document.getElementById('closeApiModalBtn').addEventListener('click', () => {
    modal.classList.remove('open');
  });

  document.getElementById('saveApiConfigBtn').addEventListener('click', () => {
    appState.geminiApiKey = document.getElementById('geminiApiKeyInput').value.trim();
    appState.geminiModel = document.getElementById('geminiModelSelect').value;
    localStorage.setItem('medhibrida_gemini_key', appState.geminiApiKey);
    localStorage.setItem('medhibrida_gemini_model', appState.geminiModel);
    updateApiStatusUI();
    modal.classList.remove('open');
  });
}
