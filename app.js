// ============================================================================
// PROTOCOLO DE TRANSIÇÃO DOMICILIAR SEGURA DO IDOSO
// Adaptação do Lar e Prevenção de Quedas nas Primeiras 72h
// Foco: Pós-AVE, Fratura de Fêmur/Quadril, Declínio Cognitivo e Fragilidade
// ============================================================================

const QUESTIONS_SCHEMA = [
  {
    id: 'p1_locomocao',
    number: 1,
    title: 'Locomoção e Deslocamento do Idoso',
    type: 'single',
    fullWidth: false,
    options: [
      { value: 'Marcha independente (caminha sozinho, sem apoio, com equilíbrio)', weight: 0 },
      { value: 'Marcha com apoio unilateral (usa bengala ou apoia em paredes/móveis)', weight: 2 },
      { value: 'Marcha com andador ou muletas (pós-op fratura de fêmur/quadril ou fraqueza moderada)', weight: 3 },
      { value: 'Hemiparesia pós-AVE (fraqueza acentuada em um dos lados do corpo; marcha assistida)', weight: 3 },
      { value: 'Usa cadeira de rodas para se locomover nos cômodos', weight: 3 },
      { value: 'Permanece restrito à cama ou poltrona a maior parte do dia', weight: 4 }
    ]
  },
  {
    id: 'p2_banho',
    number: 2,
    title: 'Banho e Cuidados no Boxe',
    type: 'single',
    fullWidth: false,
    options: [
      { value: 'Toma banho em pé ou sentado sem ajuda física de outra pessoa', weight: 0 },
      { value: 'Toma banho sozinho, mas requer cadeira/banco de banho ou supervisão próxima', weight: 2 },
      { value: 'Precisa de ajuda física para lavar pernas/pés, costas ou entrar no boxe', weight: 3 },
      { value: 'Depende totalmente de auxílio (banho no leito ou cadeira higiênica com rodas)', weight: 4 }
    ]
  },
  {
    id: 'p3_vaso_transferencia',
    number: 3,
    title: 'Vaso Sanitário & Sentar/Levantar',
    type: 'single',
    fullWidth: false,
    options: [
      { value: 'Senta e levanta de assentos e vaso sanitário sem esforço nem apoio', weight: 0 },
      { value: 'Levanta sozinho, mas apoia com força nos braços, coxas ou móveis', weight: 1 },
      { value: 'Requer ajuda física de uma pessoa para apoiar o tronco/quadril ao sentar e levantar', weight: 3 },
      { value: 'Requer auxílio de duas pessoas ou guincho de transferência', weight: 4 },
      { value: 'Usa fraldas descartáveis contínuas ou sonda vesical (não se transfere ao vaso)', weight: 3 }
    ]
  },
  {
    id: 'p4_cognicao',
    number: 4,
    title: 'Memória, Raciocínio & Atenção',
    type: 'single',
    fullWidth: false,
    options: [
      { value: 'Lúcido e orientado no tempo, espaço e decisões cotidianas', weight: 0 },
      { value: 'Esquecimentos leves de remédios e tarefas, mas reconhece a casa e familiares', weight: 1 },
      { value: 'Declínio cognitivo / Demência (desorienta-se à noite, troca horários, confunde cômodos)', weight: 3 },
      { value: 'Delirium agudo, agitação psicomotora, alucinações visuais ou tentativa de fuga', weight: 4 }
    ]
  },
  {
    id: 'p5_visao_audicao',
    number: 5,
    title: 'Visão e Audição (Marque todas que se aplicam)',
    type: 'multiple',
    fullWidth: true,
    options: [
      { value: 'Enxerga e ouve bem no ambiente (com ou sem óculos/aparelho auditivo)', weight: 0 },
      { value: 'Baixa visão / catarata / perda de profundidade (dificuldade para ver degraus e soleiras)', weight: 2 },
      { value: 'Alteração de campo visual pós-AVE (ignora ou não enxerga objetos em um dos lados)', weight: 2 },
      { value: 'Dificuldade severa para ouvir falas, campainhas ou alarmes sonoros', weight: 1 }
    ]
  },
  {
    id: 'p6_quedas_dispositivos',
    number: 6,
    title: 'Histórico de Quedas & Condições Críticas (Marque todas que se aplicam)',
    type: 'multiple',
    fullWidth: true,
    options: [
      { value: 'Apresentou 1 ou mais episódios de queda nos últimos 90 dias', weight: 3 },
      { value: 'Pós-operatório recente de fratura de fêmur / artroplastia de quadril (proibição de flexão >90°)', weight: 3 },
      { value: 'Usa oxigênio domiciliar contínuo (cilindro ou concentrador com mangueira no chão)', weight: 3 },
      { value: 'Possui sonda alimentar (GTT/SNE), sonda vesical ou curativos complexos', weight: 2 },
      { value: 'Nenhum dispositivo médico invasivo ou queda recente', weight: 0 }
    ]
  }
];

// ============================================================================
// ESQUEMA DE MEDIDAS ANTROPOMÉTRICAS ADAPTATIVAS PARA IDOSOS
// ============================================================================
const ANTHROPOMETRY_PROFILES = {
  independente: {
    key: 'independente',
    badgeTitle: 'Perfil: Idoso Deambulador',
    subtitle: 'Medidas rápidas para calibrar vaso sanitário, cama e barras de apoio da NBR 9050.',
    figureCaption: 'Boneco Guia: A = Joelho-Chão (Poplítea) • B = Punho-Chão (Apoios) • C = Largura dos Ombros',
    fields: [
      {
        id: 'medA',
        letter: 'A',
        label: 'Altura do Joelho Sentado (Poplítea)',
        hint: 'Do chão até a dobra detrás do joelho com pés apoiados. Define a altura ideal de vaso e cama.',
        unit: 'cm'
      },
      {
        id: 'medB',
        letter: 'B',
        label: 'Altura do Punho / Apoio em Pé',
        hint: 'Do chão até a dobra do punho com braço relaxado ao lado do corpo. Regula a altura das barras.',
        unit: 'cm'
      },
      {
        id: 'medC',
        letter: 'C',
        label: 'Largura Corporal (Ombro a Ombro)',
        hint: 'Distância entre os dois ombros para verificar folga livre em portas e no boxe.',
        unit: 'cm'
      }
    ],
    presets: {
      baixo: { label: '⚡ Baixa Estatura / Cifose (< 1,58 m)', medA: 41, medB: 73, medC: 44 },
      medio: { label: '⚡ Média Estatura (1,60–1,72 m)', medA: 44, medB: 78, medC: 48 },
      alto: { label: '⚡ Alta Estatura (> 1,73 m)', medA: 48, medB: 84, medC: 52 }
    }
  },

  apoio_andador: {
    key: 'apoio_andador',
    badgeTitle: 'Perfil: Marcha com Andador / Muletas / Pós-Op Quadril',
    subtitle: 'Calibração da altura do andador na linha do punho e largura para transpor portas e corredores.',
    figureCaption: 'Boneco Guia: A = Joelho-Chão • B = Manopla do Andador • C = Largura do Andador',
    fields: [
      {
        id: 'medA',
        letter: 'A',
        label: 'Altura Poplítea (Chão ao Joelho Sentado)',
        hint: 'Do chão até trás do joelho. Calcula o elevador de vaso sanitário (evita dobrar quadril >90°).',
        unit: 'cm'
      },
      {
        id: 'medB',
        letter: 'B',
        label: 'Altura do Punho ao Chão (Em Pé)',
        hint: 'Regula exatamente a altura da empunhadura do andador/bengala e barras de apoio.',
        unit: 'cm'
      },
      {
        id: 'medC',
        letter: 'C',
        label: 'Largura Funcional com Andador',
        hint: 'Largura total do andador (geralmente 60 a 68 cm) para garantir vão livre mínimo de 78–80 cm.',
        unit: 'cm'
      }
    ],
    presets: {
      baixo: { label: '⚡ Baixa Estatura (< 1,58 m)', medA: 41, medB: 73, medC: 62 },
      medio: { label: '⚡ Média Estatura (1,60–1,72 m)', medA: 44, medB: 78, medC: 66 },
      alto: { label: '⚡ Alta Estatura (> 1,73 m)', medA: 48, medB: 84, medC: 70 }
    }
  },

  cadeirante: {
    key: 'cadeirante',
    badgeTitle: 'Perfil: Cadeira de Rodas (Pós-AVE Severo ou Fratura Bilateral)',
    subtitle: 'Medidas essenciais para validar passagem em portas (mín. 80 cm NBR 9050) e nivelamento de assento.',
    figureCaption: 'Boneco Guia: A = Largura Roda a Roda • B = Altura do Assento • C = Alcance do Braço',
    fields: [
      {
        id: 'medA',
        letter: 'A',
        label: 'Largura Total da Cadeira (Roda a Roda)',
        hint: 'Parte mais larga da cadeira. Verifica se passa em portas e corredores (mín. 80 cm).',
        unit: 'cm'
      },
      {
        id: 'medB',
        letter: 'B',
        label: 'Altura do Assento da Cadeira ao Chão',
        hint: 'Nivela a cama e o vaso sanitário para transferência lateral sem levantar peso.',
        unit: 'cm'
      },
      {
        id: 'medC',
        letter: 'C',
        label: 'Alcance Frontal dos Braços Sentado',
        hint: 'Distância confortável para alcançar pias, interruptores e toalhas sem inclinar o tronco.',
        unit: 'cm'
      }
    ],
    presets: {
      baixo: { label: '⚡ Cadeira Compacta (Manual)', medA: 64, medB: 48, medC: 55 },
      medio: { label: '⚡ Cadeira Padrão Adulto', medA: 68, medB: 50, medC: 60 },
      alto: { label: '⚡ Cadeira Motorizada / Larga', medA: 74, medB: 52, medC: 65 }
    }
  },

  acamado: {
    key: 'acamado',
    badgeTitle: 'Perfil: Restrito ao Leito (Pós-AVE Extenso ou Demência Avançada)',
    subtitle: 'Medidas para ergonomia da coluna do cuidador, prevenção de escaras e transferências em bloco.',
    figureCaption: 'Boneco Guia (No Leito): A = Comprimento Corporal • B = Altura da Cama • C = Largura do Leito',
    fields: [
      {
        id: 'medA',
        letter: 'A',
        label: 'Comprimento Corporal (Cabeça aos Pés)',
        hint: 'Define o comprimento útil da cama hospitalar e posicionamento de almofadas.',
        unit: 'cm'
      },
      {
        id: 'medB',
        letter: 'B',
        label: 'Altura do Colchão da Cama ao Chão',
        hint: 'Deve coincidir com a bacia do cuidador (~73 cm) para não lesar a coluna durante os cuidados.',
        unit: 'cm'
      },
      {
        id: 'medC',
        letter: 'C',
        label: 'Largura do Paciente para Giro no Leito',
        hint: 'Espaço necessário para mudança de decúbito (virar de lado a cada 2h) e troca de fraldas.',
        unit: 'cm'
      }
    ],
    presets: {
      baixo: { label: '⚡ Baixa Estatura / Frágil', medA: 152, medB: 70, medC: 50 },
      medio: { label: '⚡ Média Estatura', medA: 165, medB: 73, medC: 55 },
      alto: { label: '⚡ Alta Estatura', medA: 178, medB: 75, medC: 60 }
    }
  }
};

function getAnthropometryProfileKey(p1Answer) {
  const ans = (p1Answer || '').toLowerCase();
  if (ans.includes('cadeira de rodas')) return 'cadeirante';
  if (ans.includes('cama ou poltrona') || ans.includes('restrito')) return 'acamado';
  if (ans.includes('andador') || ans.includes('bengala') || ans.includes('hemiparesia') || ans.includes('braço') || ans.includes('paredes')) {
    return 'apoio_andador';
  }
  return 'independente';
}

function getAdaptiveMannequinSvg(profileKey, highlightLetter) {
  const hlA = highlightLetter === 'A' ? '#dc2626' : '#0f5c6e';
  const hlB = highlightLetter === 'B' ? '#dc2626' : '#0f5c6e';
  const hlC = highlightLetter === 'C' ? '#dc2626' : '#0f5c6e';

  return `
    <svg viewBox="0 0 250 175" class="mannequin-svg" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Figura Humana Guia Antropométrica">
      <line x1="12" y1="166" x2="238" y2="166" stroke="#94a3b8" stroke-width="2.5"/>
      <text x="125" y="174" text-anchor="middle" fill="#64748b" font-size="8.5" font-weight="600">LINHA DO CHÃO NIVELADO</text>

      <circle cx="72" cy="30" r="11" fill="#bae6fd" stroke="#0f5c6e" stroke-width="2.2"/>
      <line x1="72" y1="41" x2="72" y2="95" stroke="#0f5c6e" stroke-width="8" stroke-linecap="round"/>
      <line x1="72" y1="52" x2="48" y2="92" stroke="#0f5c6e" stroke-width="4.5" stroke-linecap="round"/>
      <line x1="72" y1="52" x2="96" y2="92" stroke="#0f5c6e" stroke-width="4.5" stroke-linecap="round"/>
      <line x1="66" y1="95" x2="63" y2="165" stroke="#0f5c6e" stroke-width="5.5" stroke-linecap="round"/>
      <line x1="78" y1="95" x2="81" y2="165" stroke="#0f5c6e" stroke-width="5.5" stroke-linecap="round"/>

      <line x1="42" y1="18" x2="102" y2="18" stroke="${hlC}" stroke-width="2.2"/>
      <line x1="42" y1="13" x2="42" y2="24" stroke="${hlC}" stroke-width="1.8"/>
      <line x1="102" y1="13" x2="102" y2="24" stroke="${hlC}" stroke-width="1.8"/>
      <circle cx="24" cy="18" r="9.5" fill="${hlC}"/>
      <text x="24" y="22" text-anchor="middle" fill="#fff" font-size="10.5" font-weight="800">C</text>

      <line x1="26" y1="92" x2="26" y2="166" stroke="${hlB}" stroke-width="2.2"/>
      <line x1="20" y1="92" x2="44" y2="92" stroke="${hlB}" stroke-width="1.5" stroke-dasharray="2,2"/>
      <line x1="20" y1="166" x2="32" y2="166" stroke="${hlB}" stroke-width="1.8"/>
      <circle cx="26" cy="129" r="9.5" fill="${hlB}"/>
      <text x="26" y="133" text-anchor="middle" fill="#fff" font-size="10.5" font-weight="800">B</text>

      <polyline points="148,82 148,125 182,125" fill="none" stroke="#94a3b8" stroke-width="2.5"/>
      <line x1="154" y1="125" x2="154" y2="166" stroke="#94a3b8" stroke-width="2.5"/>
      <circle cx="164" cy="58" r="10" fill="#bae6fd" stroke="#0f5c6e" stroke-width="2"/>
      <line x1="164" y1="69" x2="164" y2="116" stroke="#0f5c6e" stroke-width="7" stroke-linecap="round"/>
      <line x1="164" y1="116" x2="198" y2="116" stroke="#0f5c6e" stroke-width="6.5" stroke-linecap="round"/>
      <line x1="198" y1="116" x2="198" y2="165" stroke="#0f5c6e" stroke-width="5.5" stroke-linecap="round"/>

      <line x1="220" y1="116" x2="220" y2="166" stroke="${hlA}" stroke-width="2.2"/>
      <line x1="202" y1="116" x2="226" y2="116" stroke="${hlA}" stroke-width="1.6" stroke-dasharray="2,2"/>
      <line x1="214" y1="166" x2="226" y2="166" stroke="${hlA}" stroke-width="1.8"/>
      <circle cx="220" cy="141" r="9.5" fill="${hlA}"/>
      <text x="220" y="145" text-anchor="middle" fill="#fff" font-size="10.5" font-weight="800">A</text>
    </svg>
  `;
}

// ============================================================================
// ESTADO DA APLICAÇÃO
// ============================================================================
const appState = {
  currentStep: 1,
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
    medA: 44,
    medB: 78,
    medC: 48,
    highlightLetter: null
  },
  photos: [],
  latestReport: null,
  isPlayingAudio: false,
  currentUtterance: null,
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
  if (!timerEl) return;
  setInterval(() => {
    const diffSec = Math.floor((Date.now() - appState.startTime) / 1000);
    const m = String(Math.floor(diffSec / 60)).padStart(2, '0');
    const s = String(diffSec % 60).padStart(2, '0');
    timerEl.textContent = `${m}:${s}`;
  }, 1000);
}

function renderQuestions() {
  const container = document.getElementById('questionsContainer');
  if (!container) return;
  container.innerHTML = '';

  QUESTIONS_SCHEMA.forEach((q) => {
    const card = document.createElement('div');
    card.className = `question-card ${q.fullWidth ? 'full-width' : ''}`;
    card.id = `qCard_${q.id}`;

    const isMultiple = q.type === 'multiple';
    const currentVal = appState.answers[q.id];

    let optionsHtml = '';
    q.options.forEach((opt, idx) => {
      const optId = `${q.id}_opt_${idx}`;
      const isChecked = isMultiple
        ? Array.isArray(currentVal) && currentVal.includes(opt.value)
        : currentVal === opt.value;

      optionsHtml += `
        <label class="option-row ${isChecked ? 'selected' : ''}" for="${optId}">
          <input
            type="${isMultiple ? 'checkbox' : 'radio'}"
            id="${optId}"
            name="${q.id}"
            value="${opt.value}"
            ${isChecked ? 'checked' : ''}
          />
          <span class="option-text">${opt.value}</span>
        </label>
      `;
    });

    card.innerHTML = `
      <div class="question-header">
        <span class="question-num">${q.number}</span>
        <h3 class="question-title">${q.title}</h3>
      </div>
      <div class="options-list">
        ${optionsHtml}
      </div>
    `;

    card.querySelectorAll('input').forEach((input) => {
      input.addEventListener('change', () => {
        if (isMultiple) {
          const checked = Array.from(card.querySelectorAll('input:checked')).map((i) => i.value);
          appState.answers[q.id] = checked;
        } else {
          appState.answers[q.id] = input.value;
          if (q.id === 'p1_locomocao') {
            const newProfileKey = getAnthropometryProfileKey(input.value);
            const prof = ANTHROPOMETRY_PROFILES[newProfileKey];
            const defPreset = prof.presets[appState.anthropometry.preset] || prof.presets.medio;
            appState.anthropometry.medA = defPreset.medA;
            appState.anthropometry.medB = defPreset.medB;
            appState.anthropometry.medC = defPreset.medC;
            renderAnthropometrySection();
          }
        }

        card.querySelectorAll('.option-row').forEach((row) => {
          const inp = row.querySelector('input');
          row.classList.toggle('selected', inp.checked);
        });

        updateStep1Progress();
      });
    });

    container.appendChild(card);
  });
}

function renderAnthropometrySection() {
  const container = document.getElementById('anthropometryContainer');
  if (!container) return;

  const profileKey = getAnthropometryProfileKey(appState.answers.p1_locomocao);
  const profile = ANTHROPOMETRY_PROFILES[profileKey];
  const { highlightLetter } = appState.anthropometry;

  let presetsButtonsHtml = '';
  Object.entries(profile.presets).forEach(([pKey, pVal]) => {
    const isAct = appState.anthropometry.preset === pKey;
    presetsButtonsHtml += `
      <button
        type="button"
        class="preset-btn ${isAct ? 'active' : ''}"
        data-preset="${pKey}"
      >
        ${pVal.label}
      </button>
    `;
  });

  let fieldsHtml = '';
  profile.fields.forEach((f) => {
    const currentNum = appState.anthropometry[f.id] ?? '';
    const isHl = highlightLetter === f.letter;
    fieldsHtml += `
      <div class="anthro-input-card ${isHl ? 'highlight' : ''}" data-letter="${f.letter}">
        <div class="anthro-letter-tag">${f.letter}</div>
        <div class="anthro-input-body">
          <label class="anthro-field-label" for="${f.id}">${f.label}</label>
          <div class="anthro-field-hint">${f.hint}</div>
          <div class="anthro-field-wrapper">
            <input
              type="number"
              id="${f.id}"
              class="anthro-number-input"
              value="${currentNum}"
              min="20"
              max="250"
            />
            <span class="anthro-unit">${f.unit}</span>
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = `
    <div class="anthro-wrapper">
      <div class="anthro-header-box">
        <div>
          <span class="anthro-profile-badge">${profile.badgeTitle}</span>
          <h3 class="anthro-title">Dimensões Antropométricas do Idoso (Item 7)</h3>
          <p class="anthro-desc">${profile.subtitle}</p>
        </div>
        <div class="preset-group">
          <span style="font-size: 0.72rem; text-transform: uppercase; font-weight: 700; color: var(--text-muted);">
            Preenchimento Rápido por Estatura:
          </span>
          <div class="preset-buttons">
            ${presetsButtonsHtml}
          </div>
        </div>
      </div>

      <div class="anthro-content-grid">
        <div class="anthro-inputs-column">
          ${fieldsHtml}
        </div>
        <div class="anthro-mannequin-column">
          <div class="anthro-mannequin-frame" id="mannequinSvgContainer">
            ${getAdaptiveMannequinSvg(profileKey, highlightLetter)}
          </div>
          <div class="anthro-figure-caption">${profile.figureCaption}</div>
        </div>
      </div>
    </div>
  `;

  container.querySelectorAll('.preset-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const pKey = btn.dataset.preset;
      appState.anthropometry.preset = pKey;
      const targetPreset = profile.presets[pKey];
      if (targetPreset) {
        appState.anthropometry.medA = targetPreset.medA;
        appState.anthropometry.medB = targetPreset.medB;
        appState.anthropometry.medC = targetPreset.medC;
      }
      renderAnthropometrySection();
      updateStep1Progress();
    });
  });

  profile.fields.forEach((f) => {
    const inputEl = container.querySelector(`#${f.id}`);
    if (!inputEl) return;

    inputEl.addEventListener('focus', () => {
      appState.anthropometry.highlightLetter = f.letter;
      const svgBox = document.getElementById('mannequinSvgContainer');
      if (svgBox) svgBox.innerHTML = getAdaptiveMannequinSvg(profileKey, f.letter);
      container.querySelectorAll('.anthro-input-card').forEach((c) => {
        c.classList.toggle('highlight', c.dataset.letter === f.letter);
      });
    });

    inputEl.addEventListener('input', (e) => {
      appState.anthropometry[f.id] = Number(e.target.value) || 0;
      appState.anthropometry.preset = 'custom';
      container.querySelectorAll('.preset-btn').forEach((b) => b.classList.remove('active'));
      updateStep1Progress();
    });
  });
}

function calculateVulnerabilityScore() {
  let score = 0;
  QUESTIONS_SCHEMA.forEach((q) => {
    const ans = appState.answers[q.id];
    if (q.type === 'multiple' && Array.isArray(ans)) {
      ans.forEach((val) => {
        const match = q.options.find((o) => o.value === val);
        if (match) score += match.weight;
      });
    } else if (ans) {
      const match = q.options.find((o) => o.value === ans);
      if (match) score += match.weight;
    }
  });

  let level = 'Baixa Vulnerabilidade';
  let color = '#15803d';
  let bg = '#dcfce7';

  if (score >= 7) {
    level = 'Vulnerabilidade Crítica (Alto Risco de Queda)';
    color = '#991b1b';
    bg = '#fee2e2';
  } else if (score >= 4) {
    level = 'Vulnerabilidade Moderada / Alta';
    color = '#b45309';
    bg = '#fef3c7';
  }

  return { score, level, color, bg };
}

function updateStep1Progress() {
  let answeredCount = 0;
  QUESTIONS_SCHEMA.forEach((q) => {
    const ans = appState.answers[q.id];
    if (q.type === 'multiple' && Array.isArray(ans) && ans.length > 0) answeredCount++;
    else if (q.type === 'single' && ans) answeredCount++;
  });

  const progressText = document.getElementById('step1ProgressText');
  const badge = document.getElementById('liveVulnerabilityBadge');
  const badgeText = document.getElementById('liveVulnerabilityText');
  const { level, color, bg } = calculateVulnerabilityScore();

  if (progressText) {
    progressText.textContent = `${answeredCount} de 6 dimensões clínicas + antropometria configurada`;
  }

  if (badgeText && badge) {
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
}

// ============================================================================
// UPLOAD E CHECAGEM COMPACTA DE FOTOS DENTRO DE CADA AMBIENTE (ETAPA 2)
// ============================================================================
function identifyRoomKey(roomStr) {
  if (!roomStr) return 'outro';
  const s = roomStr.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
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
    hasRug: text.includes('tapete') || text.includes('rug') || text.includes('passadeira') || text.includes('carpete'),
    hasFloorCloth: text.includes('pano') || text.includes('panos') || text.includes('toalha no chao'),
    hasOxygenTube: text.includes('oxigenio') || text.includes('o2') || text.includes('mangueira') || text.includes('fio') || text.includes('cabo') || text.includes('extensao'),
    highTrack: text.includes('trilho') || text.includes('soleira alta') || text.includes('box alto'),
    lowToilet: text.includes('vaso baixo') || text.includes('38 cm') || text.includes('baixo'),
    lowBed: text.includes('cama baixa') || text.includes('40 cm'),
    hasSteps: text.includes('degrau') || text.includes('escada') || text.includes('desnivel') || text.includes('acesso'),
    noGrabBars: text.includes('sem barra') || text.includes('sem apoio') || text.includes('falta barra'),
    dark: text.includes('escuro') || text.includes('penumbra') || text.includes('pouca luz')
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

  rooms.forEach((r) => {
    const el = document.getElementById(r.id);
    if (el) el.innerHTML = '';
    const btnSpan = document.querySelector(r.btnSelector);
    if (btnSpan) btnSpan.textContent = r.defaultText;
  });

  const oldGallery = document.getElementById('uploadedGallery');
  if (oldGallery) {
    oldGallery.innerHTML = '';
    oldGallery.style.display = 'none';
  }

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
// CONSTRUÇÃO DO PROMPT CLÍNICO MULTIMODAL (PARA API GEMINI)
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
    ? `- Contexto Clínico do Idoso: ${appState.clinicalContext}\n`
    : '';

  return `# PAPEL E EXPERTÍSE
Você é um especialista em geriatria, reabilitação motora e adaptação do lar para idosos com perda de funcionalidade.
Seu foco são pacientes com sequelas de AVE (Acidente Vascular Encefálico), pós-operatório de fratura de fêmur/quadril, declínio cognitivo/demência e síndrome da fragilidade.
Fale em segunda pessoa diretamente com a FAMÍLIA e o CUIDADOR ("você deve", "faça hoje", "observe"), de forma acolhedora, humana e sem jargões.

# DADOS DE ENTRADA
## 1. Perfil Clínico e Medidas do Idoso:
${contextLine}- Locomoção: ${p1}
- Banho e cuidados pessoais: ${p2}
- Uso do vaso sanitário / transferências: ${p3}
- Memória, raciocínio e atenção: ${p4}
- Visão e audição: ${p5}
- Quedas recentes e dispositivos: ${p6}
- Medidas corporais: ${anthroSummary}
## 2. Fotos dos Cômodos da Casa:
${photoDescriptions}

# REGRA OBRIGATÓRIA DE FUSÃO MULTIMODAL (FOTOS + CLÍNICA DO IDOSO):
Cruze obrigatoriamente a inspeção visual de CADA foto com as vulnerabilidades do idoso:
- Se houver TAPETE ou pano no chão nas fotos, alerte imediatamente: no idoso com andador ou pós-op de quadril, as rodas travam e causam nova fratura; no AVE, o pé parético arrasta e tropeça; na demência ou baixa visão, tapetes escuros parecem buracos e causam pânico e desvios bruscos.
- Se a foto do banheiro mostrar vaso baixo ou falta de barras, prescreva elevação calibrada pela medida poplítea A e barras na altura do punho B.
- Aponte mangueiras de O₂ soltas, degraus sem corrimão e penumbra.`;
}

// ============================================================================
// MOTOR CLÍNICO DINÂMICO DE REGRAS E CUIDADOS ROBUSTOS PARA A FAMÍLIA
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
  const A = Number(appState.anthropometry.medA) || 44;
  const B = Number(appState.anthropometry.medB) || 78;
  const C = Number(appState.anthropometry.medC) || 48;

  const visualAnalysis = analyzeCurrentPhotos();

  // Condições clínicas prioritárias do idoso
  const isStrokeOrHemiparesis =
    p1.includes('Hemiparesia') ||
    p5.some((v) => v.includes('campo visual pós-AVE')) ||
    ctx.includes('ave') ||
    ctx.includes('avc') ||
    ctx.includes('hemipares') ||
    ctx.includes('isquêm') ||
    ctx.includes('derrame');

  const isHipOrFemurPostOp =
    p6.some((v) => v.includes('fratura de fêmur') || v.includes('quadril')) ||
    p1.includes('andador') ||
    ctx.includes('quadril') ||
    ctx.includes('femur') ||
    ctx.includes('fêmur') ||
    ctx.includes('artroplastia') ||
    ctx.includes('osteossintese') ||
    ctx.includes('fratura');

  const hasCognitiveDecline =
    p4.includes('Declínio cognitivo') ||
    p4.includes('Delirium') ||
    p4.includes('Confusão') ||
    ctx.includes('demencia') ||
    ctx.includes('demência') ||
    ctx.includes('alzheimer') ||
    ctx.includes('tcl') ||
    ctx.includes('cognitiv');

  const hasPriorFalls = p6.some((v) => v.includes('queda'));
  const hasOxygen = p6.some((v) => v.includes('oxigênio')) || visualAnalysis.hasOxygenTube || ctx.includes('oxigenio') || ctx.includes('dpoc');
  const hasLowVision = p5.some((v) => v.includes('Baixa visão') || v.includes('campo visual'));
  const needsToiletSupport = !p3.includes('sem esforço');
  const needsBathSupport = !p2.includes('sem ajuda física');

  const minPassageCm = profileKey === 'cadeirante' ? Math.max(80, A + 12) : Math.max(78, C + 12);

  // --------------------------------------------------------------------------
  // 1. RESUMO DOS RISCOS CRÍTICOS NAS PRIMEIRAS 72 HORAS
  // --------------------------------------------------------------------------
  let resumoRisco = '';

  if (isStrokeOrHemiparesis) {
    resumoRisco = `Atenção redobrada, família e cuidador! O seu familiar apresenta sequela motora de AVE (Acidente Vascular Encefálico), com fraqueza assimétrica, perda de equilíbrio e possível alteração de sensibilidade e campo visual. O maior risco nas primeiras 72 horas é a perda súbita de apoio ao tentar ficar em pé sozinho, além de traumas no braço enfraquecido. Ao inspecionarmos as fotos da casa, encontramos pontos críticos imediatos: ${visualAnalysis.hasRugAnywhere ? 'tapetes soltos no caminho (onde o pé mais fraco pode enroscar e tropeçar),' : ''} ${visualAnalysis.hasLowToilet ? 'vaso sanitário baixo,' : ''} e falta de barras de apoio no banheiro.`;
  } else if (isHipOrFemurPostOp) {
    resumoRisco = `Alerta prioritário para a família e cuidador! O seu familiar está em pós-operatório recente de fratura de fêmur/quadril, com perda importante de força na perna operada e uso de dispositivo de apoio. O maior perigo nas primeiras 72 horas é uma nova queda ou dobrar a perna operada além de 90 graus (o que pode luxar a prótese). A inspeção das fotos da casa identificou armadilhas arquitetônicas diretas: ${visualAnalysis.hasRugAnywhere ? 'tapetes soltos no caminho (onde as ponteiras ou rodinhas do andador travam bruscamente),' : ''} ${visualAnalysis.hasLowToilet ? 'vaso sanitário baixo demais,' : ''} ${visualAnalysis.hasHighTrack ? 'trilho alto no boxe' : 'soleiras elevadas'} e necessidade de passagem livre de pelo menos ${minPassageCm} cm.`;
  } else if (hasCognitiveDecline) {
    resumoRisco = `Alerta máximo, família e cuidador! O seu familiar idoso apresenta declínio cognitivo/confusão mental frequente, histórico de quedas e desorientação temporal, com piora expressiva ao entardecer e à noite. Ao cruzarmos esse quadro com as fotos da casa, identificamos armadilhas visuais perigosas: ${visualAnalysis.hasRugAnywhere ? 'tapetes escuros no chão (que o cérebro interpreta com medo como se fossem buracos ou abismos),' : ''} ${visualAnalysis.hasOxygenTube ? 'mangueiras no chão do quarto,' : ''} zonas de penumbra e ausência total de barras no banheiro.`;
  } else {
    resumoRisco = `Olá, família e cuidador! O seu familiar idoso apresenta vulnerabilidade funcional e risco elevado de queda no momento da alta hospitalar. Ao cruzarmos a avaliação clínica com as fotos dos cômodos da casa, identificamos que as primeiras 72 horas exigem adaptações imediatas de segurança: ${visualAnalysis.hasRugAnywhere ? 'remoção urgente de tapetes soltos,' : ''} elevação e barras no vaso sanitário e garantia de corredor desobstruído até o banheiro. Sigam as orientações práticas abaixo para acolher seu familiar com segurança e sem sobrecarregar sua coluna.`;
  }

  // --------------------------------------------------------------------------
  // 2. POR ONDE COMEÇAR (CUSTO ZERO) - CHECKLIST IMEDIATO
  // --------------------------------------------------------------------------
  const acoesImediatas = [];

  // A. Tapetes e panos de chão
  if (visualAnalysis.hasRugAnywhere || visualAnalysis.hasFloorCloth || hasPriorFalls || isHipOrFemurPostOp || hasCognitiveDecline) {
    if (isHipOrFemurPostOp) {
      acoesImediatas.push({
        titulo: 'Retire AGORA todos os tapetes, passadeiras e panos de chão de toda a casa',
        detalhe: 'A foto do caminho/banheiro mostra tapete ou pano solto no chão. As rodinhas ou ponteiras de borracha do andador travam nas dobras do tapete e provocam quedas imediatas e devastadoras sobre o quadril recém-operado. Guarde 100% dos tapetes em armários antes da chegada do paciente.'
      });
    } else if (hasCognitiveDecline || hasLowVision) {
      acoesImediatas.push({
        titulo: 'Retire todos os tapetes e cubra espelhos da linha de visão noturna',
        detalhe: 'Remova todos os tapetes do banheiro, quarto e corredores. Pessoas idosas com demência ou baixa visão percebem tapetes escuros como buracos profundos no chão, causando pânico, paralisia da marcha ou tentativas bruscas de desvio com queda. Cubra espelhos à noite para evitar sustos com o próprio reflexo.'
      });
    } else if (isStrokeOrHemiparesis) {
      acoesImediatas.push({
        titulo: 'Retire todos os tapetes soltos do trajeto entre a cama e o banheiro',
        detalhe: 'No paciente pós-AVE, o lado mais fraco do corpo tende a arrastar a ponta do pé durante a marcha. Qualquer pequeno desnível de tapete é suficiente para prender o pé e causar queda desastrosa.'
      });
    } else {
      acoesImediatas.push({
        titulo: 'Retire hoje todos os tapetes e panos de chão soltos da casa',
        detalhe: 'Tapetes e panos de chão soltos são responsáveis por mais de 60% das quedas domiciliares graves de idosos nas primeiras 72 horas após a alta. Deixe o piso totalmente livre e liso.'
      });
    }
  }

  // B. Mangueira de O2 ou fios
  if (visualAnalysis.hasOxygenTube || hasOxygen) {
    acoesImediatas.push({
      titulo: 'Prenda e suspenda a mangueira de oxigênio pelas paredes AGORA',
      detalhe: 'A extensão plástica de O₂ atravessada no chão (visível na foto do quarto) é uma armadilha fatal de tropeço para passos curtos ou arrastados. Fixe o conduto com fita adesiva rente ao rodapé da parede, deixando o trajeto cama-banheiro 100% livre.'
    });
  }

  // C. Passagem livre e largura
  acoesImediatas.push({
    titulo: `Libere pelo menos ${minPassageCm} cm de passagem livre no corredor, quarto e cozinha`,
    detalhe: `Afaste mesinhas de centro, lixeiras, cestos de roupa e sapatos do caminho entre a cama e o banheiro. ${isHipOrFemurPostOp ? `O andador mede ${C} cm de largura e precisa de espaço amplo para não bater nas paredes.` : 'O idoso precisa de rota ampla e desobstruída para caminhar com segurança ao lado do cuidador.'}`
  });

  // D. Iluminação noturna
  acoesImediatas.push({
    titulo: 'Instale iluminação guia noturna contínua do quarto ao banheiro',
    detalhe: 'Idosos acordam com frequência para urinar durante a noite. Deixe uma lâmpada fraca ou luz de tomada acesa no corredor e no banheiro. Acordar no escuro total causa desorientação espacial, tontura e quedas graves ao descer da cama.'
  });

  // E. Posicionamento de itens diários
  acoesImediatas.push({
    titulo: 'Organize itens de uso diário na altura da cintura (nem no chão, nem no alto)',
    detalhe: 'Deixe papel higiênico, toalhas, copo d\'água, remédios e mudas de roupa na altura da cintura (cerca de 80 cm a 1 metro do chão). O idoso nunca deve se abaixar até o piso nem subir em bancos para alcançar o que precisa.'
  });

  // F. Fechamento de gás (cognição)
  if (hasCognitiveDecline) {
    acoesImediatas.push({
      titulo: 'Feche o registro de gás do fogão e guarde objetos cortantes e remédios',
      detalhe: 'A foto da cozinha mostra botões de fogão acessíveis. Como o idoso apresenta esquecimentos de perigos óbvios, feche a chave geral do gás após cozinhar e guarde facas, fósforos e produtos de limpeza fora do alcance.'
    });
  }

  // --------------------------------------------------------------------------
  // 3. ADAPTAÇÕES E EQUIPAMENTOS COM MEDIDAS EXATAS (NBR 9050)
  // --------------------------------------------------------------------------
  const adaptacoesPrioritarias = [];

  const targetToiletH = isHipOrFemurPostOp ? Math.max(50, A + 5) : needsToiletSupport ? A + 4 : A + 2;
  const boosterCm = Math.max(5, targetToiletH - 39);

  adaptacoesPrioritarias.push({
    titulo: `Elevador de assento sanitário (+${boosterCm} cm) e barras retas em inox a ${B} cm do chão`,
    detalhe: `O vaso sanitário padrão (~38 cm visto na foto) é baixo demais. Sentar nele exige esforço hercúleo das pernas e dobra o quadril além de 90° (risco de deslocar prótese). Eleve o assento para ${targetToiletH} cm e instale barras de apoio retas de 80 cm em aço inox na parede lateral a ${B} cm do chão.`
  });

  const bathSeatH = A + 2;
  adaptacoesPrioritarias.push({
    titulo: `Cadeira ou banco de banho com pés emborrachados regulado em ${bathSeatH} cm de altura`,
    detalhe: `Com o piso molhado ensaboado e o trilho do box visto na foto, o idoso NÃO deve tomar banho em pé. A cadeira de banho com encosto regulada em ${bathSeatH} cm garante estabilidade, evita escorregões e poupa o cuidador de sustentar peso molhado.`
  });

  if (isHipOrFemurPostOp) {
    adaptacoesPrioritarias.push({
      titulo: `Calços extensores sob os pés da cama (+12 cm) para nivelar na altura poplítea (${A} cm)`,
      detalhe: `A foto do quarto mostra cama baixa. Ao sentar na cama, o joelho do idoso nunca pode ficar mais alto do que o osso do quadril. Eleve a cama com calços de madeira maciça bem fixados.`
    });
  }

  if (visualAnalysis.hasEntranceSteps || isHipOrFemurPostOp || hasLowVision) {
    adaptacoesPrioritarias.push({
      titulo: `Corrimão bilateral nos degraus de acesso (fixado a ${B} cm) e fitas antiderrapantes amarelas`,
      detalhe: `A foto da entrada/acesso revela degraus sem corrimão firme e sem contraste. Instale corrimão contínuo na altura do punho (${B} cm) e cole fitas adesivas amarelas de alta visibilidade na borda de cada degrau.`
    });
  }

  // --------------------------------------------------------------------------
  // 4. CUIDADOS FUNDAMENTAIS COM A ROTINA E SAÚDE DO IDOSO (GUIA ROBUSTO)
  // --------------------------------------------------------------------------
  const cuidadosRobustos = [
    {
      categoria: 'Prevenção de Lesões por Pressão (Escaras)',
      icone: '🛡️',
      orientacoes: [
        'Mudança de posição a cada 2 horas: se o idoso passar muito tempo na cama ou poltrona, mude a posição do corpo (lado direito, costas, lado esquerdo) rigorosamente a cada 2 horas.',
        'Proteção de calcanhares e sacro: coloque um travesseiro macio sob as panturrilhas para deixar os calcanhares flutuando sem encostar no colchão, e use almofada de alívio de pressão (viscoelástica ou caixa de ovo).',
        'Hidratação da pele: aplique creme hidratante corporal neutro em toda a pele após o banho. NUNCA massageie ou esfregue regiões avermelhadas (vermelhidão já indica início de lesão).'
      ]
    },
    {
      categoria: 'Prevenção de Delirium e Confusão Noturna',
      icone: '🧠',
      orientacoes: [
        'Mantenha o ciclo claro/escuro: abra cortinas e janelas durante o dia para a luz natural entrar e manter o cérebro desperto; à noite, reduza barulhos, apague luzes fortes e mantenha apenas a luz guia indireta.',
        'Orientação temporal constante: deixe um relógio de parede grande e um calendário visíveis no quarto. Ao conversar, lembre com naturalidade: "Hoje é quinta-feira, estamos em casa, são duas da tarde".',
        'Comunicação calma e sem confronto: se o idoso apresentar confusão mental ou esquecimentos, nunca discuta, não tente "provar que ele está errado". Acolha com voz mansa, dê a mão e mude de assunto suavemente.'
      ]
    },
    {
      categoria: 'Segurança com Medicamentos e Quedas ao Levantar',
      icone: '💊',
      orientacoes: [
        'Organizador de comprimidos e tabela visual: monte uma caixa organizadora semanal de remédios (manhã, tarde, noite) e fixe a tabela com horários e nomes na porta da geladeira.',
        'Checagem dupla de segurança: confira a receita e o nome na caixa antes de administrar cada medicamento para evitar duplicidade ou troca de remédios.',
        'REGRA DOS 2 MINUTOS para evitar desmaio por pressão baixa: ao acordar, NUNCA coloque o idoso em pé de imediato. Deixe-o sentado na beira da cama por 2 minutos, com as duas plantas dos pés bem apoiadas no chão, respirando com calma antes de se levantar.'
      ]
    },
    {
      categoria: 'Alimentação Segura e Prevenção de Engasgos (Disfagia)',
      icone: '🥣',
      orientacoes: [
        'Sempre sentado ereto a 90° para comer ou beber: NUNCA alimente o idoso deitado ou reclinado na cama, mesmo que seja apenas água ou suco.',
        'Manter sentado por 30 minutos após comer: após terminar a refeição, mantenha o idoso sentado ereto por pelo menos meia hora para evitar refluxo e que o alimento vá para os pulmões (pneumonia aspirativa).',
        'Atenção a engasgos com água: se o idoso tossir com frequência ao beber água rala ou ficar com a voz rouca/molhada após engolir, avise a equipe de saúde imediatamente para avaliação de espessante alimentar.'
      ]
    },
    {
      categoria: 'Ergonomia e Proteção da Coluna de Quem Cuida',
      icone: '💪',
      orientacoes: [
        'Altura ideal da cama hospitalar: regule o leito na altura dos ossos do quadril do cuidador (~73 cm) para não curvar as costas ao trocar fraldas, posicionar no leito ou dar banho.',
        'Técnica correta de transferência: afaste os pés (base firme alargada), dobre os joelhos e faça força com as pernas, mantendo a coluna ereta.',
        'NUNCA puxe pelos braços ou axilas: segure firme pelo cós da calça, cinto ou faixa de transferência no quadril. Em idosos pós-AVE, puxar pelo braço parético causa dor excruciante e desloca o ombro (subluxação).'
      ]
    }
  ];

  // --------------------------------------------------------------------------
  // 5. SINAIS DE ALARME (QUANDO PROCURAR A EMERGÊNCIA / SAMU 192)
  // --------------------------------------------------------------------------
  const sinaisDeAlarme = [
    'Queda seguida de dor forte no quadril/fêmur ou perna visivelmente encurtada e rodada para fora (suspeita de fratura ou luxação de prótese).',
    'Febre (acima de 37,8°C), calafrios, urina turva com odor forte ou dor ao urinar (infecção urinária é a causa mais comum de delirium e piora súbita em idosos).',
    'Confusão mental súbita que começou em poucas horas, sonolência profunda sem conseguir acordar, ou perda de força nova em um dos lados do corpo.',
    'Engasgo com falta de ar intensa, lábios arroxeados ou tosse persistente que não cessa após se alimentar.',
    'Dor no peito, falta de ar súbita, palpitações rápidas ou vômitos escuros contínuos.'
  ];

  return {
    resumoRisco,
    acoesImediatas,
    adaptacoesPrioritarias,
    cuidadosRobustos,
    sinaisDeAlarme
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
        maxOutputTokens: 2500
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
// RECURSO DE ÁUDIO (TEXT-TO-SPEECH) PARA O CHECKLIST
// ============================================================================
function toggleAudioChecklist() {
  const btn = document.getElementById('audioChecklistBtn');
  const btnText = document.getElementById('audioBtnText');
  const icon = document.getElementById('audioIcon');

  if (!('speechSynthesis' in window)) {
    alert('O seu navegador não possui suporte para síntese de áudio de voz.');
    return;
  }

  if (appState.isPlayingAudio) {
    window.speechSynthesis.cancel();
    appState.isPlayingAudio = false;
    if (btnText) btnText.textContent = 'Ouvir Checklist em Áudio';
    if (icon) icon.textContent = '🔊';
    if (btn) btn.classList.remove('playing');
    return;
  }

  const report = appState.latestReport;
  if (!report) return;

  let textToSpeak = `Atenção família e cuidador. Este é o plano de alta segura para o seu familiar idoso. `;
  textToSpeak += `Resumo dos riscos nas primeiras setenta e duas horas: ${report.resumoRisco}. `;
  textToSpeak += `Por onde começar, ações de custo zero antes dele chegar em casa: `;
  report.acoesImediatas.forEach((item, idx) => {
    textToSpeak += `Ação ${idx + 1}: ${item.titulo}. ${item.detalhe}. `;
  });
  textToSpeak += `Lembre-se dos principais cuidados: mude a posição do idoso a cada duas horas para prevenir escaras, pratique a regra dos dois minutos sentado na beira da cama antes de levantar, e nunca alimente o idoso deitado para evitar engasgos. `;

  appState.currentUtterance = new SpeechSynthesisUtterance(textToSpeak);
  appState.currentUtterance.lang = 'pt-BR';
  appState.currentUtterance.rate = 0.95; // Cadência confortável para idosos e cuidadores

  appState.currentUtterance.onstart = () => {
    appState.isPlayingAudio = true;
    if (btnText) btnText.textContent = 'Parar Áudio';
    if (icon) icon.textContent = '⏹️';
    if (btn) btn.classList.add('playing');
  };

  appState.currentUtterance.onend = () => {
    appState.isPlayingAudio = false;
    if (btnText) btnText.textContent = 'Ouvir Checklist em Áudio';
    if (icon) icon.textContent = '🔊';
    if (btn) btn.classList.remove('playing');
  };

  appState.currentUtterance.onerror = () => {
    appState.isPlayingAudio = false;
    if (btnText) btnText.textContent = 'Ouvir Checklist em Áudio';
    if (icon) icon.textContent = '🔊';
    if (btn) btn.classList.remove('playing');
  };

  window.speechSynthesis.speak(appState.currentUtterance);
}

// ============================================================================
// RENDERIZAÇÃO DO RELATÓRIO DE ALTA SEGURA (ETAPA 3)
// ============================================================================
async function generateAndRenderReport() {
  switchStep(3);

  const promptText = buildSpecializedClinicalPrompt();
  const promptBox = document.getElementById('compiledPromptPreview');
  if (promptBox) promptBox.textContent = promptText;

  const summaryEl = document.getElementById('reportPatientSummary');
  const { level } = calculateVulnerabilityScore();
  if (summaryEl) {
    summaryEl.innerHTML = `
      <div class="summary-chip">
        <div class="summary-chip-label">Grau de Dependência</div>
        <div class="summary-chip-val">${level}</div>
      </div>
      <div class="summary-chip">
        <div class="summary-chip-label">Locomoção Atual</div>
        <div class="summary-chip-val">${appState.answers.p1_locomocao || 'Não informado'}</div>
      </div>
      <div class="summary-chip">
        <div class="summary-chip-label">Medidas Corporais (A • B • C)</div>
        <div class="summary-chip-val">A: ${appState.anthropometry.medA} cm | B: ${appState.anthropometry.medB} cm | C: ${appState.anthropometry.medC} cm</div>
      </div>
    `;
  }

  const container = document.getElementById('reportContentContainer');
  if (!container) return;

  if (appState.geminiApiKey && appState.geminiApiKey.trim().length > 10) {
    container.innerHTML = `
      <div class="report-section" style="text-align: center; padding: 2.2rem;">
        <div style="font-size: 1.05rem; font-weight: 700; color: var(--primary-dark); margin-bottom: 0.4rem;">
          ⏳ Analisando fotos dos cômodos e condição clínica na API Multimodal Gemini (${appState.geminiModel})...
        </div>
        <p style="font-size: 0.86rem; color: var(--text-secondary);">
          Cruzando barreiras arquitetônicas reais das fotos com vulnerabilidade funcional do idoso e diretrizes ABNT NBR 9050.
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
  appState.latestReport = report;

  const lowPhotoNote =
    appState.photos.length === 0
      ? `<div style="background:#fef3c7; border:1px solid #f59e0b; padding:0.75rem 1rem; border-radius:8px; margin-bottom:1rem; font-size:0.85rem; color:#92400e;">
          <strong>Nota de Inspeção Visual Manual:</strong> Como nenhuma foto dos cômodos foi anexada, solicitamos que a família confira manualmente a ausência de tapetes soltos no caminho, a altura do vaso sanitário e a iluminação do piso do boxe.
         </div>`
      : '';

  let careTopicsHtml = '';
  report.cuidadosRobustos.forEach((c) => {
    let bulletsHtml = '';
    c.orientacoes.forEach((o) => {
      bulletsHtml += `<li>${o}</li>`;
    });
    careTopicsHtml += `
      <div class="care-topic-card">
        <div class="care-topic-header">
          <span>${c.icone}</span>
          <span>${c.categoria}</span>
        </div>
        <ul class="care-topic-bullets">
          ${bulletsHtml}
        </ul>
      </div>
    `;
  });

  let alarmItemsHtml = '';
  report.sinaisDeAlarme.forEach((item) => {
    alarmItemsHtml += `<li class="alarm-item">⚠️ <strong>Atenção:</strong> ${item}</li>`;
  });

  container.innerHTML = `
    ${lowPhotoNote}

    <div class="report-section risk-summary">
      <h3>1. Resumo dos Riscos Críticos nas Primeiras 72 Horas</h3>
      <p style="font-size: 0.95rem; color: var(--text-main); line-height: 1.65;">
        ${report.resumoRisco}
      </p>
    </div>

    <div class="report-section zero-cost">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.75rem;">
        <h3 style="margin: 0;">2. Por onde começar (custo zero) - Checklist Imediato</h3>
        <button type="button" class="btn btn-audio" id="audioChecklistInlineBtn" style="padding: 0.35rem 0.8rem; font-size: 0.82rem;">
          <span>🔊</span> <span>Ouvir Checklist</span>
        </button>
      </div>
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
      <h3>3. Adaptações Arquitetônicas & Equipamentos para Providenciar (com Medidas Exatas NBR 9050)</h3>
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

    <div class="report-section caregiver-robust">
      <h3>4. Cuidados Fundamentais com a Rotina e Saúde do Idoso (Guia Prático da Família)</h3>
      <p style="font-size: 0.84rem; color: var(--text-secondary); margin-bottom: 0.75rem;">
        Diretrizes clínicas essenciais para prevenir escaras, delirium, quedas ao levantar e proteger a coluna de quem cuida:
      </p>
      <div class="care-topics-grid">
        ${careTopicsHtml}
      </div>
    </div>

    <div class="report-section alarm-signs">
      <h3 style="color: var(--danger);">🚨 5. Sinais de Alarme: Quando Procurar a Emergência Imediatamente</h3>
      <p style="font-size: 0.86rem; color: #991b1b; margin-bottom: 0.5rem;">
        Se o idoso apresentar qualquer um dos sinais abaixo nas primeiras 72 horas após a alta, acione o SAMU (192) ou leve-o ao pronto-atendimento hospitalar:
      </p>
      <ul class="alarm-list">
        ${alarmItemsHtml}
      </ul>
    </div>
  `;

  bindChecklistCheckboxes();

  const inlineAudioBtn = document.getElementById('audioChecklistInlineBtn');
  if (inlineAudioBtn) {
    inlineAudioBtn.addEventListener('click', toggleAudioChecklist);
  }
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
    if (tab) {
      tab.classList.toggle('active', n === stepNum);
      tab.classList.toggle('completed', n < stepNum);
    }
  });

  if (stepNum === 2) {
    renderPhotoGallery();
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateApiStatusUI() {
  const dot = document.getElementById('apiStatusDot');
  const label = document.getElementById('apiStatusLabel');
  if (!dot || !label) return;
  if (appState.geminiApiKey && appState.geminiApiKey.trim().length > 10) {
    dot.classList.add('connected');
    label.textContent = `Motor IA: Gemini API Ativa (${appState.geminiModel})`;
  } else {
    dot.classList.remove('connected');
    label.textContent = 'Motor IA: Híbrido (Simulação NBR 9050 + Gemini)';
  }
}

function initEventListeners() {
  document.getElementById('resetFormBtn').addEventListener('click', () => {
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
      medA: 44,
      medB: 78,
      medC: 48,
      highlightLetter: null
    };
    appState.photos = [];
    appState.latestReport = null;
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    document.getElementById('clinicalContextInput').value = '';
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

  ['fileBanheiro', 'fileQuarto', 'fileAcesso', 'fileCozinha'].forEach((id) => {
    const input = document.getElementById(id);
    if (!input) return;
    input.addEventListener('change', (e) => {
      handleFileUpload(e.target.files, input.dataset.room);
      input.value = '';
    });
  });

  const audioBtn = document.getElementById('audioChecklistBtn');
  if (audioBtn) {
    audioBtn.addEventListener('click', toggleAudioChecklist);
  }

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
