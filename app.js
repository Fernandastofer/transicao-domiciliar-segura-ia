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
      { value: 'Anda sozinho, com firmeza e sem precisar de apoio.', weight: 0 },
      { value: 'Anda segurando em paredes/móveis ou usa bengala/andador.', weight: 2 },
      { value: 'Precisa que alguém dê o braço ou auxilie fisicamente.', weight: 3 },
      { value: 'Usa cadeira de rodas para se locomover.', weight: 3 },
      { value: 'Permanece a maior parte do tempo na cama ou poltrona.', weight: 4 }
    ]
  },
  {
    id: 'p2_banho',
    number: 2,
    title: 'Banho e Cuidados no Boxe',
    type: 'single',
    fullWidth: false,
    options: [
      { value: 'Toma banho em pé ou sentado sem ajuda física.', weight: 0 },
      { value: 'Toma banho sozinho, mas requer banco ou supervisão próxima.', weight: 2 },
      { value: 'Precisa de ajuda física para lavar pernas/pés ou entrar no boxe.', weight: 3 },
      { value: 'Depende totalmente de auxílio (banho de leito ou cadeira higiênica).', weight: 4 }
    ]
  },
  {
    id: 'p3_vaso_transferencia',
    number: 3,
    title: 'Vaso Sanitário & Sentar/Levantar',
    type: 'single',
    fullWidth: false,
    options: [
      { value: 'Senta e levanta de assentos e vaso sem esforço nem apoio.', weight: 0 },
      { value: 'Levanta sozinho, mas apoia com força nos braços ou móveis.', weight: 1 },
      { value: 'Requer ajuda física de outra pessoa para sentar ou levantar.', weight: 3 },
      { value: 'Usa fraldas contínuas ou sonda vesical (não usa o vaso).', weight: 3 }
    ]
  },
  {
    id: 'p4_cognicao',
    number: 4,
    title: 'Memória, Raciocínio & Atenção',
    type: 'single',
    fullWidth: false,
    options: [
      { value: 'Lúcido e orientado no tempo, espaço e decisões.', weight: 0 },
      { value: 'Esquecimentos leves cotidianos, mas reconhece o ambiente.', weight: 1 },
      { value: 'Confusão frequente: desorienta-se à noite, troca horários ou esquece perigos óbvios (fogão, torneiras).', weight: 3 },
      { value: 'Agitação importante, alucinações ou tentativa de fugir.', weight: 4 }
    ]
  },
  {
    id: 'p5_visao_audicao',
    number: 5,
    title: 'Visão e Audição (Marque todas que se aplicam)',
    type: 'multiple',
    fullWidth: true,
    options: [
      { value: 'Enxerga bem no ambiente com ou sem óculos.', weight: 0 },
      { value: 'Visão embaçada/baixa; dificuldade para ver degraus ou desníveis no chão.', weight: 2 },
      { value: 'Audição funcionalmente normal (ou prótese adaptada).', weight: 0 },
      { value: 'Dificuldade severa para ouvir falas, campainhas ou interfone.', weight: 1 }
    ]
  },
  {
    id: 'p6_quedas_dispositivos',
    number: 6,
    title: 'Histórico de Quedas & Dispositivos Especiais (Marque todas que se aplicam)',
    type: 'multiple',
    fullWidth: true,
    options: [
      { value: 'Apresentou queda ou episódio de quase queda nos últimos 90 dias.', weight: 3 },
      { value: 'Usa oxigênio contínuo (cilindro ou concentrador com mangueira no chão).', weight: 3 },
      { value: 'Possui sondas de alimentação/drenagem, ostomias ou curativos complexos.', weight: 2 },
      { value: 'Nenhum dispositivo médico invasivo no domicílio.', weight: 0 }
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
      p1_locomocao: 'Anda sozinho, com firmeza e sem precisar de apoio.',
      p2_banho: 'Toma banho em pé ou sentado sem ajuda física.',
      p3_vaso_transferencia: 'Levanta sozinho, mas apoia com força nos braços ou móveis.',
      p4_cognicao: 'Lúcido e orientado no tempo, espaço e decisões.',
      p5_visao_audicao: [
        'Enxerga bem no ambiente com ou sem óculos.',
        'Audição funcionalmente normal (ou prótese adaptada).'
      ],
      p6_quedas_dispositivos: [
        'Nenhum dispositivo médico invasivo no domicílio.'
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
        room: 'Banheiro & Boxe',
        sceneType: 'banheiro',
        caption: 'Banheiro contemporâneo sem barras de apoio, vaso em altura padrão, boxe com soleira baixa.',
        floorColor: '#e2e8f0',
        lowToilet: false,
        highTrack: false,
        hasFloorCloth: false
      },
      {
        filename: 'caso1_caminho_cama_banheiro.png',
        room: 'Quarto & Rota até o Banheiro',
        sceneType: 'quarto',
        caption: 'Quarto amplo, piso de madeira plano, caminho desobstruído da cama à porta do banheiro.',
        floorColor: '#dfc39d',
        lowBed: false,
        hasRug: false
      },
      {
        filename: 'caso1_acesso_casa.png',
        room: 'Acesso da Casa',
        sceneType: 'acesso',
        caption: 'Hall e porta de entrada de apartamento totalmente plano, sem degraus ou desníveis.',
        floorColor: '#e2e8f0'
      },
      {
        filename: 'caso1_cozinha.png',
        room: 'Cozinha',
        sceneType: 'cozinha',
        caption: 'Cozinha planejada organizada, sem objetos ou tapetes no chão.',
        floorColor: '#f1f5f9'
      }
    ],
    curatedReport: {
      resumoRisco: 'Paciente jovem (28 anos, altura poplítea A = 46 cm) com independência preservada de marcha e cognição, apresentando vulnerabilidade transitória restrita à flexão do tronco devido à dor pós-operatória abdominal (apendicectomia laparoscópica). Como a altura poplítea do paciente é de 46 cm e o vaso sanitário padrão mede cerca de 39–40 cm (caso1_banheiro.png), ocorre flexão abdominal adicional ao sentar e levantar.',
      acoesImediatas: [
        {
          titulo: 'Organizar itens de higiene e roupas na faixa de alcance ergonômico (Medida B: 81 cm a 120 cm)',
          detalhe: 'No banheiro e quarto (caso1_banheiro.png e caso1_caminho_cama_banheiro.png), posicione papel higiênico, toalha, sabonete e roupas acima da linha do punho/quadril (81 cm) para evitar que o paciente precise se curvar ou agachar.'
        },
        {
          titulo: 'Manter piso do boxe seco e utilizar calçado antiderrapante firme',
          detalhe: 'Como o banheiro não possui barras de apoio (caso1_banheiro.png) e contrações bruscas de defesa causam dor abdominal aguda, garanta piso seco e uso de chinelo emborrachado antiderrapante durante o banho.'
        },
        {
          titulo: 'Posicionar apoio firme ao lado da cama para facilitar a saída em bloco',
          detalhe: 'Manter móvel firme próximo à cama (caso1_caminho_cama_banheiro.png) na altura de 80 cm para auxiliar o impulso dos membros superiores ao levantar.'
        }
      ],
      adaptacoesPrioritarias: [
        {
          titulo: 'Tapete antiderrapante com ventosas no interior do boxe',
          detalhe: 'Fixar tapete de borracha com ventosas dentro da área do chuveiro (caso1_banheiro.png) para máxima estabilidade durante o banho em pé nos primeiros dias pós-alta.'
        },
        {
          titulo: 'Assento Sanitário Elevado Flexível de 5 a 7,5 cm ou Apoio Lateral Portátil (para atingir 46 cm)',
          detalhe: 'Compatibiliza a altura da bacia sanitária com a medida poplítea do paciente (A = 46 cm), reduzindo a exigência da musculatura abdominal ao sentar e levantar.'
        }
      ],
      rotinaCuidador: [
        'Orientar a técnica de "rolamento em bloco" (deitar de lado primeiro, descer as pernas para fora da cama e empurrar o colchão com os braços) para levantar da cama sem contrair o abdômen.',
        'Manter iluminação suave acesa no corredor/banheiro durante a noite caso o paciente levante sob efeito de analgésicos, além de observar sinais de alerta no curativo cirúrgico.'
      ]
    }
  },

  caso2: {
    id: 'caso2',
    name: 'Caso Clínico 2: Idoso em Pós-Operatório de Fratura de Quadril',
    clinicalContext: '79 anos, 1,72 m, submetido à osteossíntese de fêmur proximal há 5 dias. Apresenta fraqueza muscular grave em membro inferior e restrição de carga parcial.',
    answers: {
      p1_locomocao: 'Anda segurando em paredes/móveis ou usa bengala/andador.',
      p2_banho: 'Toma banho sozinho, mas requer banco ou supervisão próxima.',
      p3_vaso_transferencia: 'Requer ajuda física de outra pessoa para sentar ou levantar.',
      p4_cognicao: 'Lúcido e orientado no tempo, espaço e decisões.',
      p5_visao_audicao: [
        'Visão embaçada/baixa; dificuldade para ver degraus ou desníveis no chão.',
        'Audição funcionalmente normal (ou prótese adaptada).'
      ],
      p6_quedas_dispositivos: [
        'Apresentou queda ou episódio de quase queda nos últimos 90 dias.',
        'Nenhum dispositivo médico invasivo no domicílio.'
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
        room: 'Banheiro & Boxe',
        sceneType: 'banheiro',
        caption: 'Banheiro com vaso sanitário baixo sem elevação, ausência de barras de apoio e trilho alto de boxe com pano dobrado no piso cerâmico.',
        floorColor: '#cbd5e1',
        lowToilet: true,
        highTrack: true,
        hasFloorCloth: true
      },
      {
        filename: 'caso2_caminho_cama_banheiro.png',
        room: 'Quarto & Rota até o Banheiro',
        sceneType: 'quarto',
        caption: 'Quarto com cama baixa, andador ao lado e tapete solto na rota até a porta.',
        floorColor: '#e2e8f0',
        lowBed: true,
        hasRug: true
      },
      {
        filename: 'caso2_acesso_casa.png',
        room: 'Acesso da Casa',
        sceneType: 'acesso',
        caption: 'Entrada de casa com 2 degraus externos de pedra sem corrimão ou barras de apoio.',
        floorColor: '#94a3b8'
      },
      {
        filename: 'caso2_cozinha.png',
        room: 'Cozinha',
        sceneType: 'cozinha',
        caption: 'Cozinha com piso escorregadio, passadeira solta na pia e lixeira obstruindo o corredor de passagem.',
        floorColor: '#cbd5e1'
      }
    ],
    curatedReport: {
      resumoRisco: 'Paciente de 79 anos em altíssimo risco de nova queda precoce nas primeiras 72 horas pós-alta. A antropometria (Altura Poplítea A = 47 cm; Punho B = 80 cm; Largura com Andador C = 66 cm) evidencia incompatibilidade biomecânica crítica com o ambiente fotografado: o vaso sanitário baixo (~38 cm) e a cama baixa (~40 cm) forçam flexão de quadril >90° em membro recém-operado de fêmur, enquanto tapetes soltos e lixeira no corredor bloqueiam os 66 cm de passagem do andador.',
      acoesImediatas: [
        {
          titulo: 'Remover IMEDIATAMENTE todos os tapetes, passadeiras e panos de chão',
          detalhe: 'Retirar hoje o tapete solto na rota do quarto (caso2_caminho_cama_banheiro.png), o pano dobrado no banheiro (caso2_banheiro.png) e a passadeira da cozinha (caso2_cozinha.png), onde as ponteiras do andador enroscam.'
        },
        {
          titulo: 'Garantir vão livre mínimo de 80 cm para a largura funcional do andador (Medida C = 66 cm)',
          detalhe: 'Retirar a lixeira que estreita o corredor da cozinha (caso2_cozinha.png) e manter rota livre de pelo menos 80 cm entre a cama e o banheiro.'
        },
        {
          titulo: 'Ajustar as manoplas do andador exatamente na altura do punho (Medida B = 80 cm)',
          detalhe: 'Conferir se a empunhadura do andador de alumínio está a 80 cm do chão (mantendo cotovelos fletidos entre 20° e 30°).'
        },
        {
          titulo: 'Elevar provisoriamente o assento da cama/poltrona para ≥ 51 cm (Medida A + 4 cm)',
          detalhe: 'Utilizar colchão firme adicional ou almofada de alta densidade sobre a cama baixa (caso2_caminho_cama_banheiro.png) para que o joelho fique abaixo da linha do quadril.'
        }
      ],
      adaptacoesPrioritarias: [
        {
          titulo: 'Assento Sanitário Elevado de 12 a 13 cm + Barras de Apoio NBR 9050 (a 75–80 cm do piso)',
          detalhe: 'Como a medida poplítea é A = 47 cm e o pós-op de quadril exige assento entre 50 e 52 cm, instalar elevador sanitário de 13 cm com alças e barras retas de 80 cm na parede lateral (corrigindo o vaso baixo de caso2_banheiro.png).'
        },
        {
          titulo: 'Banco de Banho Regulável (ajustado a 50 cm de altura) + Barras no Boxe',
          detalhe: 'Instalar banco de banho antiderrapante regulado acima da altura poplítea (50 cm) dentro do boxe (caso2_banheiro.png), permitindo sentar antes de transpor o trilho alto.'
        },
        {
          titulo: 'Calços Extensores de Cama (+12 cm) + Corrimão e Fita Contrastante nos Degraus',
          detalhe: 'Elevar os pés da cama baixa (caso2_caminho_cama_banheiro.png) para atingir 52 cm totais e instalar corrimão bilateral nos 2 degraus externos (caso2_acesso_casa.png).'
        }
      ],
      rotinaCuidador: [
        'Nas transferências cama/vaso, posicionar o andador travado à frente, orientar que o idoso estenda a perna operada à frente antes de sentar/levantar (respeitando o ângulo >90° da medida poplítea de 47 cm) e apoiar pelo tronco.',
        'Garantir iluminação 100% acesa no trajeto quarto-banheiro e revisar diariamente se o piso cerâmico encontra-se totalmente seco.'
      ]
    }
  },

  caso3: {
    id: 'caso3',
    name: 'Caso Clínico 3: Idoso com Fragilidade, Marcha Instável e Declínio Cognitivo Inicial',
    clinicalContext: '84 anos, 1,58 m, com síndrome da fragilidade, osteoartrite grave em joelhos, hipotensão ortostática e diagnóstico recente de Transtorno Cognitivo Leve (TCL). Uso intermitente de oxigênio de apoio.',
    answers: {
      p1_locomocao: 'Precisa que alguém dê o braço ou auxilie fisicamente.',
      p2_banho: 'Precisa de ajuda física para lavar pernas/pés ou entrar no boxe.',
      p3_vaso_transferencia: 'Requer ajuda física de outra pessoa para sentar ou levantar.',
      p4_cognicao: 'Confusão frequente: desorienta-se à noite, troca horários ou esquece perigos óbvios (fogão, torneiras).',
      p5_visao_audicao: [
        'Visão embaçada/baixa; dificuldade para ver degraus ou desníveis no chão.'
      ],
      p6_quedas_dispositivos: [
        'Apresentou queda ou episódio de quase queda nos últimos 90 dias.',
        'Usa oxigênio contínuo (cilindro ou concentrador com mangueira no chão).'
      ]
    },
    anthropometry: {
      preset: 'baixo',
      medA: 41, // Altura poplítea (joelho-chão) -> estatura baixa (precisa apoiar os pés no chão ao sentar!)
      medB: 73, // Altura punho-chão -> barras na altura de 73-75 cm
      medC: 78  // Largura dupla (paciente + cuidador dando o braço lateralmente)
    },
    photos: [
      {
        filename: 'caso3_banheiro.png',
        room: 'Banheiro & Boxe',
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
        room: 'Quarto & Rota Noturna',
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
        room: 'Corredor & Acesso',
        sceneType: 'acesso',
        caption: 'Corredor com degrau sem contraste visual e iluminação deficiente.',
        floorColor: '#64748b',
        dark: true
      },
      {
        filename: 'caso3_cozinha.png',
        room: 'Cozinha',
        sceneType: 'cozinha',
        caption: 'Cozinha com botões de fogão acessíveis, objetos soltos e piso sem contraste.',
        floorColor: '#94a3b8'
      }
    ],
    curatedReport: {
      resumoRisco: 'Paciente de 84 anos com vulnerabilidade crítica multidimensional (fragilidade, osteoartrite grave de joelhos, hipotensão ortostática, TCL e múltiplas quedas). As medidas antropométricas (Altura Poplítea A = 41 cm; Punho B = 73 cm; Largura em marcha assistida com cuidador ao lado C = 78 cm) alertam que a passagem acompanhada exige corredor desobstruído ≥ 85 cm e que a cama/assento deve permitir apoio total da planta dos pés no chão (41–44 cm) antes de ficar em pé.',
      acoesImediatas: [
        {
          titulo: 'Fixar e suspender imediatamente a mangueira do concentrador de oxigênio pelas paredes',
          detalhe: 'A extensão de O₂ solta no chão do quarto (caso3_caminho_cama_banheiro.png) bloqueia a rota de 78 cm da marcha assistida (paciente + cuidador) e gera risco iminente de queda noturna.'
        },
        {
          titulo: 'Retirar todos os tapetes (especialmente os escuros) e cobrir/deslocar espelhos noturnos',
          detalhe: 'Remover o tapete escuro do banheiro (caso3_banheiro.png) e do quarto (caso3_caminho_cama_banheiro.png). Na baixa visão somada ao declínio cognitivo, tapetes escuros parecem "buracos" no piso.'
        },
        {
          titulo: 'Fechar o registro geral de gás do fogão e ocultar objetos de risco',
          detalhe: 'Devido ao esquecimento de perigos óbvios relatado na triagem (fogão e torneiras), manter o registro de gás fechado após o uso na cozinha (caso3_cozinha.png).'
        }
      ],
      adaptacoesPrioritarias: [
        {
          titulo: 'Cadeira de Banho / Elevador de Vaso ajustado a 44–45 cm (compatível com Altura Poplítea A = 41 cm)',
          detalhe: 'Devido à osteoartrite de joelhos mas estatura baixa (poplítea de 41 cm), utilizar elevação moderada (5 a 7 cm) e banco de banho regulado a 43 cm, garantindo que os pés alcancem o chão com segurança sem ficar balançando.'
        },
        {
          titulo: 'Barras de Apoio Contrastantes instaladas a 73–75 cm do piso (Medida B = 73 cm)',
          detalhe: 'Instalar barras de apoio com cor contrastante em relação à parede ao lado do vaso e no boxe na exata altura do punho do paciente (73–75 cm).'
        },
        {
          titulo: 'Sistema de Iluminação Guia Noturna com Sensor de Presença + Faixas Contrastantes',
          detalhe: 'Instalar balizadores de LED âmbar com sensor automático no rodapé da cama até o vaso sanitário (caso3_caminho_cama_banheiro.png) e fita contrastante no degrau do corredor (caso3_acesso_casa.png).'
        }
      ],
      rotinaCuidador: [
        'Protocolo anti-hipotensão ortostática alinhado à antropometria (A = 41 cm): ao sentar o paciente na borda da cama, certifique-se de que ambos os pés estejam totalmente apoiados no chão por 1 a 2 minutos antes de levantar.',
        'Como a marcha exige apoio físico lateral (largura conjunta C = 78 cm), ao passar por portas estreitas (<80 cm), o cuidador deve posicionar-se levemente atrás/diagonal segurando pela cintura pélvica.'
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
    orientationOk: true
  }));

  renderQuestions();
  renderAnthropometrySection();
  updateStep1Progress();
  renderPhotoGallery();
}

// ============================================================================
// UPLOAD E GALERIA DE FOTOS (ETAPA 2)
// ============================================================================
function handleFileUpload(fileList, roomLabel) {
  if (!fileList || fileList.length === 0) return;

  Array.from(fileList).forEach((file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      const img = new Image();
      img.onload = () => {
        const isHorizontal = img.width >= img.height;
        appState.photos.push({
          id: `user_photo_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
          filename: file.name,
          room: roomLabel,
          caption: `Imagem enviada pela família (${img.width}x${img.height}px)`,
          dataUrl,
          orientationOk: isHorizontal
        });
        renderPhotoGallery();
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  });
}

function renderPhotoGallery() {
  const gallery = document.getElementById('uploadedGallery');
  gallery.innerHTML = '';

  if (appState.photos.length === 0) {
    gallery.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 1.25rem; background: var(--bg-subtle); border-radius: var(--radius-sm); color: var(--text-secondary); font-size: 0.88rem;">
        Nenhuma foto anexada ainda. Anexe ao menos 1 foto do <strong>Banheiro &amp; Boxe</strong> acima ou selecione um dos <strong>3 Casos Clínicos da PoC</strong> no topo da página.
      </div>
    `;
    return;
  }

  appState.photos.forEach((photo) => {
    const card = document.createElement('div');
    card.className = 'photo-preview-card';

    const orientBadge = photo.orientationOk
      ? `<span class="photo-check-badge ok">✓ Enquadramento horizontal adequado</span>`
      : `<span class="photo-check-badge warn">⚠️ Foto vertical (prefira horizontal para amplitude)</span>`;

    card.innerHTML = `
      <div class="photo-preview-img-wrap">
        <img src="${photo.dataUrl}" alt="${photo.room}" />
        <button type="button" class="photo-remove-btn" data-id="${photo.id}" title="Remover foto">✕</button>
      </div>
      <div class="photo-meta">
        <span class="photo-room-tag">📍 ${photo.room}</span>
        <span style="color: var(--text-muted); font-size: 0.75rem;"><strong>Arquivo:</strong> ${photo.filename}</span>
        <span style="color: var(--text-secondary); font-size: 0.76rem;">${photo.caption}</span>
        ${orientBadge}
      </div>
    `;

    card.querySelector('.photo-remove-btn').addEventListener('click', () => {
      appState.photos = appState.photos.filter((p) => p.id !== photo.id);
      renderPhotoGallery();
    });

    gallery.appendChild(card);
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
Você é um médico geriatra e especialista em reabilitação física e ergonomia geriátrica domiciliar. 
Sua tarefa é cruzar os dados clínicos/funcionais e antropométricos de um paciente com as imagens do ambiente fornecidas para gerar um **Plano de Alta Segura e Adaptação Domiciliar**.
---
# DADOS DE ENTRADA
## 1. Perfil Clínico-Funcional e Antropométrico do Paciente:
${contextLine}- Mobilidade/Locomoção: ${p1}
- Banho e Autocuidado: ${p2}
- Transferência/Uso do Vaso Sanitário: ${p3}
- Cognição e Orientação: ${p4}
- Déficits Sensoriais: ${p5}
- Histórico de Quedas e Dispositivos: ${p6}
- Medidas Antropométricas Fundamentais: ${anthroSummary}
## 2. Registro Fotográfico:
${photoDescriptions}
---
# DIRETRIZES DE RACIOCÍNIO E ANÁLISE VISUAL
Ao examinar as fotos em conjunto com o perfil clínico e antropométrico, siga rigorosamente os seguintes passos de inspeção:
1. **Inspeção de Piso e Nível:**
   - Procure por tapetes soltos, panos de chão, desníveis de soleira, pisos escorregadios ou trilhos no chão.
   
2. **Inspeção de Apoio, Transferência e Compatibilidade Antropométrica:**
   - Verifique a presença/ausência de barras de apoio ao lado da bacia sanitária e na área do chuveiro, indicando a altura de instalação compatível com a medida de punho/alcance do paciente.
   - Avalie se a altura do assento sanitário e da cama é compatível com a altura poplítea/assento do paciente ou com a altura ergonômica para o cuidador (em caso de acamado).
   
3. **Inspeção de Passagem e Ergonomia:**
   - Avalie se o vão da porta e o espaço de giro comportam a largura funcional medida do paciente (com andador, cadeira de rodas ou auxílio lateral).
   - Identifique obstáculos na rota (fios elétricos, mangueiras de oxigênio, móveis de quina viva, lixeiras soltas).
4. **Inspeção Cognitiva e Sensorial:**
   - Se o paciente tiver déficit visual ou cognitivo, avalie a iluminação (zonas de sombra, reflexos), presença de espelhos que possam causar ilusões ou desorientação, e contraste nos degraus.
---
# FORMATO DE SAÍDA (Gere exatamente nesta estrutura)
### 1. Resumo Clínico do Risco
[2 a 3 frases explicando de forma empática e leiga qual é a principal vulnerabilidade identificada para a transição desse paciente para este ambiente específico]
### 2. Ações Imediatas (Custo R$ 0 / Primeiras 24 Horas)
*Liste de 2 a 4 ações comportamentais ou de remanejamento que a família deve fazer hoje, antes da alta ou assim que o paciente chegar:*
- **[O que fazer]:** [Instrução prática baseada no que foi visto na foto, ex.: retirar tapete ao lado do boxe].
- **[O que fazer]:** [Instrução prática, ex.: liberar a passagem retirando o cesto de roupas do caminho].
### 3. Adaptações Físicas e Tecnologias Assistivas Prioritárias
*Liste de 2 a 3 itens essenciais de baixo a médio custo recomendados para instalação imediata (com medidas personalizadas pela antropometria):*
- **[Item 1]:** [Local exato e especificação funcional, ex.: Barra de apoio reta de 80 cm em aço inox ao lado do vaso, a 75 cm do piso].
- **[Item 2]:** [Especificação funcional, ex.: Banco de banho articulado ou com encosto dentro do boxe].
### 4. Recomendações para a Rotina do Cuidador
*2 orientações pontuais de assistência ergonômica:*
- [Dica de assistência ou técnica de transferência segura].
- [Dica de iluminação ou checagem noturna].
---
# REGRAS E SALVAGUARDAS CLÍNICAS
- Use linguagem acessível, acolhedora e direta, evitando jargões acadêmicos herméticos.
- Jamais prescreva medicamentos ou altere condutas médicas formais.
- Se a imagem estiver muito escura ou se um detalhe crítico não for visível (ex.: se não for possível ver o piso do boxe), inclua uma nota explícita solicitando conferência manual desse ponto pela família.
- Inclua ao final a seguinte nota obrigatória: *"Este relatório é uma ferramenta de suporte à transição de cuidados e prevenção de riscos domiciliares, não substituindo a avaliação clínica presencial de um médico, terapeuta ocupacional ou fisioterapeuta."*`;
}

// ============================================================================
// MOTOR CLÍNICO-ARQUITETÔNICO DINÂMICO (FALLBACK / SIMULAÇÃO INTELIGENTE)
// ============================================================================
function generateStructuredReportFromRules() {
  if (appState.activeCaseId && POC_CASES[appState.activeCaseId]) {
    return POC_CASES[appState.activeCaseId].curatedReport;
  }

  const p1 = appState.answers.p1_locomocao || '';
  const p2 = appState.answers.p2_banho || '';
  const p3 = appState.answers.p3_vaso_transferencia || '';
  const p4 = appState.answers.p4_cognicao || '';
  const p5 = appState.answers.p5_visao_audicao || [];
  const p6 = appState.answers.p6_quedas_dispositivos || [];

  const profileKey = getAnthropometryProfileKey(p1);
  const A = Number(appState.anthropometry.medA) || 45;
  const B = Number(appState.anthropometry.medB) || 78;
  const C = Number(appState.anthropometry.medC) || 65;

  const hasWalkerOrSupport = p1.includes('bengala/andador') || p1.includes('braço');
  const hasWheelchairOrBed = p1.includes('cadeira de rodas') || p1.includes('cama ou poltrona');
  const needsBathSupport = !p2.includes('sem ajuda física');
  const needsToiletSupport = !p3.includes('sem esforço');
  const hasCognitiveDecline = p4.includes('Confusão') || p4.includes('Agitação') || p4.includes('Esquecimentos');
  const hasLowVision = p5.some((v) => v.includes('Visão embaçada'));
  const hasPriorFalls = p6.some((v) => v.includes('queda'));
  const hasOxygen = p6.some((v) => v.includes('oxigênio'));
  const hasTubesOrWounds = p6.some((v) => v.includes('sondas'));

  const minPassageCm = profileKey === 'cadeirante' ? Math.max(80, A + 12) : Math.max(78, C + 12);

  const acoesImediatas = [
    {
      titulo: 'Retirar tapetes soltos, panos de chão e fios da rota cama-banheiro',
      detalhe: 'Remova hoje todos os tapetes na saída da cama e na porta do boxe do banheiro para eliminar o risco de tropeço ou deslizamento nas primeiras 72 horas.'
    },
    {
      titulo: `Garantir corredor de passagem livre de pelo menos ${minPassageCm} cm e alcance ergonômico`,
      detalhe: `Afaste lixeiras, cestos de roupa e móveis baixos do caminho até o banheiro para comportar com folga a medida informada no questionário, mantendo objetos de uso diário na altura de alcance confortável.`
    }
  ];

  if (hasOxygen) {
    acoesImediatas.push({
      titulo: 'Fixar e elevar a mangueira extensora de oxigênio junto ao rodapé',
      detalhe: 'Evite que a mangueira do cilindro/concentrador cruze o caminho de passagem no chão, prevenindo quedas por enroscamento dos pés ou do andador.'
    });
  }

  if (hasCognitiveDecline) {
    acoesImediatas.push({
      titulo: 'Travar acesso ao fogão/gás e eliminar zonas de sombra ou reflexos noturnos',
      detalhe: 'Devido ao risco de desorientação noturna e esquecimento de perigos domésticos, mantenha o registro de gás fechado após uso e deixe a rota até o banheiro iluminada.'
    });
  }

  const adaptacoesPrioritarias = [];

  if (profileKey === 'acamado') {
    adaptacoesPrioritarias.push({
      titulo: `Adequação da Altura do Leito (~73 cm) e Colchão Terapêutico (mín. ${A + 15} cm)`,
      detalhe: `Como o paciente mede ${A} cm no leito e a cama atual possui ${C} cm de altura, ${
        C < 68
          ? `instalar calços extensores sob os pés da cama (+${73 - C} cm) para atingir a cintura do cuidador`
          : 'manter a altura ergonômica atual'
      } e utilizar cadeira higiênica/poltrona com largura interna mínima de ${B + 6} cm.`
    });
  } else if (profileKey === 'cadeirante') {
    adaptacoesPrioritarias.push({
      titulo: `Barras de Transferência NBR 9050 (alcance de ${C} cm) e Nivelamento de Assentos a ${B} cm`,
      detalhe: `Instalar barras de apoio lateral e frontal junto ao vaso sanitário (respeitando o alcance funcional de ${C} cm) e nivelar a altura do vaso/cama a ${B} cm para transferência lateral plana da cadeira de rodas (largura ${A} cm).`
    });
  } else {
    const targetSeat = needsToiletSupport ? A + 4 : A + 1;
    const booster = Math.max(5, targetSeat - 39);
    adaptacoesPrioritarias.push({
      titulo: `Barras de Apoio em Aço Inox (a ${B} cm do piso) + Assento Sanitário Elevado (+${booster} cm)`,
      detalhe: `Com base na altura poplítea do paciente (A = ${A} cm) e altura do punho (B = ${B} cm), instalar elevador de vaso sanitário para atingir ${targetSeat} cm de altura total e fixar barras de apoio e manoplas de andador a ${B} cm do piso.`
    });
  }

  if (needsBathSupport) {
    const bathSeatH = profileKey === 'acamado' ? 48 : profileKey === 'cadeirante' ? B : A + 2;
    adaptacoesPrioritarias.push({
      titulo: `Banco de Banho Antiderrapante com Encosto / Cadeira Higiênica (altura regulada em ${bathSeatH} cm)`,
      detalhe: 'Permite realizar a higiene corporal sentado com estabilidade dentro do boxe, reduzindo a fadiga e o risco de escorregamento em piso molhado.'
    });
  }

  if (hasLowVision || hasCognitiveDecline) {
    adaptacoesPrioritarias.push({
      titulo: 'Luz Guia Noturna com Sensor de Presença + Fita Antiderrapante Contrastante',
      detalhe: 'Sinalizar soleiras e degraus com fita de cor contrastante e instalar iluminação automática de rodapé entre a cama e o banheiro.'
    });
  }

  const rotinaCuidador = [
    'Antes de colocar o paciente em pé (especialmente pela manhã ou à noite), sente-o na beira da cama por 1 a 2 minutos com os pés totalmente apoiados no chão para evitar tontura (hipotensão postural).',
    'Mantenha o banheiro totalmente seco antes do uso, utilize calçado fechado ou antiderrapante e verifique se todos os detalhes de piso/boxe estão bem iluminados.'
  ];

  if (hasTubesOrWounds) {
    rotinaCuidador.push(
      'Antes de iniciar qualquer transferência da cama para poltrona ou banheiro, confira a folga e fixação de sondas, drenos ou curativos para evitar tração acidental.'
    );
  }

  const resumoRisco = `Com base na triagem funcional e antropométrica (${getAnthropometrySummaryString()}) integrada à inspeção ambiental, o paciente apresenta ${
    hasPriorFalls || hasWheelchairOrBed || hasCognitiveDecline
      ? 'alta vulnerabilidade para quedas precoces nas primeiras 72 horas pós-alta'
      : 'vulnerabilidade funcional que exige adequação preventiva imediata do ambiente'
  }. As recomendações abaixo foram calibradas pelas medidas corporais do paciente para garantir transferências biomecanicamente seguras no banheiro e no quarto.`;

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
    <div class="summary-chip">
      <div class="summary-chip-label">Fotos Analisadas</div>
      <div class="summary-chip-val">${appState.photos.length} imagem(ns) do domicílio</div>
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
      <h3>1. Resumo Clínico e Antropométrico do Risco</h3>
      <p style="font-size: 0.95rem; color: var(--text-main); line-height: 1.65;">
        ${report.resumoRisco}
      </p>
    </div>

    <div class="report-section zero-cost">
      <h3>2. Ações Imediatas (Custo R$ 0 / Primeiras 24 Horas)</h3>
      <p style="font-size: 0.83rem; color: var(--text-secondary); margin-bottom: 0.75rem;">
        Marque na caixa ao lado cada ação concluída pela família antes da chegada do paciente:
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
      <h3>3. Adaptações Físicas e Tecnologias Assistivas Prioritárias (Calibradas por Antropometria &amp; NBR 9050)</h3>
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
      <h3>4. Recomendações para a Rotina do Cuidador</h3>
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

  ['fileBanheiro', 'fileQuarto', 'fileOutros'].forEach((id) => {
    const input = document.getElementById(id);
    input.addEventListener('change', (e) => {
      handleFileUpload(e.target.files, input.dataset.room);
      input.value = '';
    });
  });

  document.getElementById('printReportBtn').addEventListener('click', () => {
    window.print();
  });

  document.querySelectorAll('.feedback-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const msg = document.getElementById('feedbackConfirmMsg');
      msg.textContent =
        btn.dataset.vote === 'aprovado'
          ? '✓ Avaliação registrada: Concordância clínica e utilidade confirmadas para o relatório da PoC!'
          : '✓ Avaliação com ressalvas registrada para análise do comitê.';
    });
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
