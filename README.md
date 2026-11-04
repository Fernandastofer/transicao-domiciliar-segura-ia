# 🏠 Protocolo de Transição Domiciliar Segura • Medicina Híbrida (PoC)

> **Ferramenta Web de Suporte à Decisão Clínica e Adequação Ambiental Domiciliar Assistida por IA Multimodal**  
> *Projeto Final (Grupo 5) • Medicina Híbrida • Transição de Cuidado Hospital-Domicílio*

[![Status](https://img.shields.io/badge/Fase-Prova%20de%20Conceito%20(PoC)-0f5c6e)]()
[![Base Clínica](https://img.shields.io/badge/Base%20Cl%C3%ADnica-ABNT%20NBR%209050%20%7C%20HOME%20FAST%20%7C%20HSSAT-168070)]()
[![Privacidade](https://img.shields.io/badge/LGPD-Privacy--by--Design%20(An%C3%B4nimo)-15803d)]()
[![IA Multimodal](https://img.shields.io/badge/Motor%20IA-Google%20Gemini%20Vision%20%2B%20Motor%20Cl%C3%ADnico-d97706)]()

---

## 🎯 1. Problema de Negócio e Contexto Clínico

Após eventos limitantes agudos (como pós-operatórios ortopédicos e abdominais, AVC) ou agravamento funcional crônico (síndrome da fragilidade, declínio cognitivo), a transição do hospital para o domicílio frequentemente ocorre de maneira fragmentada.

Enquanto a alta hospitalar tradicional prioriza receitas medicamentosas e cuidados com curativos, **as famílias carecem de orientação prática, estruturada e personalizada para readequar o espaço físico**, resultando em:
- **Quedas precoces nas primeiras 72 horas pós-alta**;
- **Reinternações hospitalares evitáveis**;
- **Sobrecarga física e emocional extrema dos cuidadores e familiares**.

Esta ferramenta soluciona o *"ponto cego perceptivo"* dos cuidadores domiciliares por meio de uma triagem clínico-funcional, antropométrica e inspeção visual por **Inteligência Artificial Multimodal**.

---

## ✨ 2. Funcionalidades Principais da PoC

### 📋 Etapa 1: Triagem Clínico-Funcional + Antropometria Adaptativa (`< 3 min`)
1. **Avaliação Multidimensional Rápida (6 dimensões):**
   - Locomoção e Deslocamento
   - Banho e Cuidados no Boxe
   - Vaso Sanitário e Transferência (Sentar/Levantar)
   - Memória, Raciocínio e Atenção (Cognição)
   - Déficits Sensoriais (Visão e Audição)
   - Histórico de Quedas (últimos 90 dias) e Dispositivos Especiais (Oxigênio contínuo, sondas, ostomias, curativos)
2. **Módulo Antropométrico Dinâmico com Boneco Guia Interativo (Item 7):**
   - Adapta automaticamente as 3 medidas fundamentais (`A`, `B` e `C`) e o desenho do boneco orientador conforme o perfil do paciente:
     - **Deambulador Independente** (Altura poplítea, punho/quadril e largura biacromial)
     - **Marcha com Apoio / Andador / Bengala** (Altura poplítea para proteção articular >90°, altura do punho para regulagem de andador/barras e largura funcional com andador)
     - **Usuário de Cadeira de Rodas** (Largura roda a roda, altura do assento para nivelamento de transferência e alcance lateral sentado)
     - **Restrito ao Leito / Acamado** (Comprimento corporal no leito, largura de quadril/ombros e altura da cama ajustada à cintura do cuidador)
   - Inclui **botões de preenchimento rápido em 1 clique por porte físico** (dispensando fita métrica quando indisponível) e **cálculo biomecânico em tempo real**.

### 📷 Etapa 2: Guia de Captura e Upload por Ambientes Separados (4 Blocos)
Para evitar fotos acumuladas ou fora de contexto, a interface conta com blocos independentes de upload e orientações visuais dedicadas:
1. **Banheiro & Boxe (Obrigatória):** Vaso sanitário, paredes ao lado, entrada do boxe e piso.
2. **Quarto & Rota Noturna:** Altura da cama, rota até a porta e tapetes próximos.
3. **Entrada & Acesso à Casa:** Porta de entrada, soleiras, desníveis e degraus externos.
4. **Cozinha & Corredor de Passagem:** Piso perto da pia, passadeiras e largura de circulação.
- Diagramas arquitetônicos integrados, checagem automática de enquadramento (horizontal vs. vertical) e diretrizes de iluminação e privacidade.

### 🧠 Etapa 3: Motor de IA Multimodal & Guia Prático para o Cuidador
- **Linguagem Direta e Acolhedora para a Família:** Todas as saídas são formuladas em 2ª pessoa ("você deve", "faça hoje", "observe"), sem jargões herméticos, facilitando a adesão imediata de quem cuida no domicílio.
- **Arquitetura Híbrida:**
  - **Modo API Google Gemini (`gemini-2.5-flash` / `gemini-2.0-flash`):** Envia o prompt especializado em Geriatria, Reabilitação e Ergonomia junto às fotos do domicílio para análise multimodal em tempo real.
  - **Modo Motor Clínico-Arquitetônico Local (NBR 9050 / HOME FAST / HSSAT):** Opera instantaneamente offline sem necessidade de chave de API, garantindo disponibilidade total em demonstrações acadêmicas.
- **Saída Estruturada e Imprimível (PDF):**
  1. **Resumo dos Riscos para a Família e Cuidador**
  2. **O Que Você Deve Fazer Hoje (Custo R$ 0 / Primeiras 24 Horas)** com checklist interativo
  3. **Adaptações e Equipamentos para Providenciar em Casa** (com medidas exatas calibradas pela antropometria e pela norma **ABNT NBR 9050**)
  4. **Dicas de Ouro para a Rotina de Quem Cuida** (técnicas de transferência segura e proteção da coluna do cuidador)

---

## 🧪 3. Casos Clínicos de Validação Pré-Carregados (1 Clique)

Para facilitar a avaliação pelo Comitê de Especialistas (Geriatria, Fisioterapia e Terapia Ocupacional) e demonstração em banca, a interface conta com carregamento instantâneo de **3 Casos Clínicos completos** (respostas + medidas antropométricas + 4 imagens sintéticas de teste por caso):

| Caso Clínico | Perfil do Paciente | Risco | Principais Barreiras e Foco Clínico |
| :--- | :--- | :---: | :--- |
| **Caso 1** | **Jovem em Pós-Op Abdominal (28 anos)**<br>Pós-apendicectomia laparoscópica, dor à flexão do tronco. | 🟢 Baixo | Itens na altura da cintura (81–120 cm), prevenção de esforço abdominal ao sentar/levantar do vaso e técnica de saída da cama em bloco. |
| **Caso 2** | **Idoso em Pós-Op de Fratura de Quadril (79 anos)**<br>Osteossíntese de fêmur há 5 dias, usa andador, baixa visão e queda recente. | 🟠 Alto | Vaso e cama baixos (flexão >90°), trilho alto de boxe, retirada imediata de tapetes na rota do andador (66 cm), calços de cama e corrimão. |
| **Caso 3** | **Idoso com Fragilidade e Declínio Cognitivo / TCL (84 anos)**<br>Marcha assistida, confusão noturna, hipotensão ortostática e uso de O₂ contínuo. | 🔴 Crítico | Suspensão da mangueira de O₂ pelas paredes, remoção de tapetes escuros na penumbra, trava do gás, barras contrastantes e luz guia noturna. |

---

## 🔒 4. Privacidade (LGPD) e Segurança Clínica

- **Privacy-by-Design (LGPD):** A ferramenta opera de maneira estritamente anônima, sem coleta de CPF, nome completo, endereço civil ou fotos contendo rostos/pessoas.
- **Aviso Importante para a Família:** Todas as análises exibem a salvaguarda informando que o relatório é um guia preventivo de apoio à decisão familiar e não substitui a avaliação clínica presencial da equipe de saúde.

---

## 🚀 5. Como Executar o Projeto

1. Clone este repositório ou baixe os arquivos.
2. Abra o arquivo **`index.html`** diretamente em qualquer navegador web moderno (Google Chrome, Microsoft Edge, Safari ou Firefox).
3. *(Opcional)* Para utilizar a análise em tempo real via API do Google Gemini, clique no botão **"Motor IA: Híbrido"** no canto superior direito e insira sua chave do Google AI Studio.

---

## 👥 Autoria

**Projeto Final — Grupo 5 • Medicina Híbrida**  
*Prova de Conceito Acadêmica — Transição de Cuidado Assistida por Inteligência Artificial Multimodal.*
