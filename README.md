# 🏠 Protocolo de Transição Domiciliar Segura do Idoso

> **Ferramenta Clínica de Suporte à Decisão, Adequação Ambiental e Cuidado Centrado na Família Assistida por IA Multimodal**  
> *Prevenção de quedas precoces nas primeiras 72h pós-alta, adaptação arquitetônica calibrada por antropometria e orientações práticas de cuidados para o idoso com perda de funcionalidade.*

[![Base Clínica](https://img.shields.io/badge/Base%20Cl%C3%ADnica-ABNT%20NBR%209050%20%7C%20HOME%20FAST%20%7C%20HSSAT-168070)]()
[![Público-Alvo](https://img.shields.io/badge/Foco-Idoso%20com%20Perda%20Funcional%20(AVE%2C%20Fratura%2C%20Dem%C3%AAncia)-0f5c6e)]()
[![Privacidade](https://img.shields.io/badge/LGPD-Privacy--by--Design%20(An%C3%B4nimo)-15803d)]()
[![Acessibilidade](https://img.shields.io/badge/Acessibilidade-Checklist%20em%20%C3%81udio%20(Web%20Speech)-0284c7)]()
[![IA Multimodal](https://img.shields.io/badge/Motor%20IA-Google%20Gemini%20Vision%20%2B%20Motor%20Local-d97706)]()

---

## 🎯 1. Problema e Justificativa Clínica

A desospitalização do idoso após eventos agudos e limitantes (pós-acidente vascular encefálico/AVE, pós-operatório de fratura de fêmur/quadril, agravamento de declínio cognitivo/demência ou síndrome de fragilidade) representa o período de maior vulnerabilidade clínica:
- **Pico de Quedas nas Primeiras 72 Horas:** Mais de 70% dos acidentes domésticos e refraturas acontecem logo após o retorno ao lar, quando o ambiente não está adaptado à nova condição motora e cognitiva.
- **Sobrecarga Extrema do Cuidador Familiar:** A família recebe alta com prescrições farmacológicas, mas sem orientações práticas sobre como transferir o idoso, evitar escaras, lidar com a confusão mental noturna ou prevenir engasgos.
- **Barreiras Arquitetônicas Críticas:** Portas estreitas para andadores e cadeiras de rodas, desníveis de soleira, ausência de barras de apoio no box e no vaso sanitário, e tapetes soltos no trajeto noturno.

Esta aplicação une uma triagem clínica rápida, calibração antropométrica adaptativa e inspeção visual de 4 cômodos estratégicos para gerar um **Plano de Alta Segura** universal, humanizado e direto ao ponto.

---

## ✨ 2. Arquitetura da Solução

### 📋 Etapa 1: Triagem Clínico-Funcional & Medidas Antropométricas do Idoso
1. **Contexto Clínico Individualizado:** Campo livre opcional para registrar idade, diagnóstico recente e lateralidade de sequela motora (ex.: *82 anos, hemiparesia direita pós-AVE; ou 79 anos, pós-op fratura de fêmur c/ andador; ou 84 anos com Alzheimer*).
2. **Triagem Funcional Direcionada:**
   - **Locomoção e Deslocamento:** Deambulação independente, apoio unilateral (bengala), andador/muletas, hemiparesia pós-AVE, cadeira de rodas ou restrição ao leito.
   - **Banho e Boxe:** Independente, supervisão/banco de banho, auxílio físico direto ou dependência total no leito/cadeira higiênica.
   - **Vaso Sanitário & Transferência:** Independente, impulso nos braços, auxílio de 1 cuidador, auxílio de 2 cuidadores/guincho ou fralda contínua.
   - **Cognição, Memória e Atenção:** Lúcido, esquecimentos leves, declínio moderado ou desorientação tempo-espacial importante com agitação crepuscular.
   - **Visão e Percepção Espacial:** Visão preservada, óculos de rotina, baixa visão/catarata ou cegueira/distorção de profundidade.
   - **Histórico de Quedas Recentes e Dispositivos:** Oxigenoterapia contínua, sonda vesical/enteral ou histórico de queda nos últimos 3 meses.
3. **Módulo Antropométrico Adaptativo com Boneco Interativo:**
   - Calibra as cotas corporais (`A`, `B` e `C`) em centímetros de acordo com o padrão motor do idoso:
     - **Andador / Marcha com Apoio:** Altura poplítea (proteção articular do quadril >90°), altura da manopla e largura total do andador para transposição de portas.
     - **Hemiparesia Pós-AVE:** Altura de transferência nivelada, altura de apoio do lado preservado e largura de passagem assistida (paciente + cuidador).
     - **Cadeirante:** Largura da cadeira roda a roda, altura do assento para transferência em plano reto e alcance lateral funcional.
     - **Restrito ao Leito:** Altura ergonômica do colchão (70–75 cm) para prevenir dor lombar no cuidador e dimensões para rotação em bloco.

---

### 📷 Etapa 2: Guia de Captura Fotográfica & Upload Integrado nos 4 Cômodos
Diagramação em grade 2x2 com orientações ilustradas em diagramas SVG, botões de upload individuais e checagem imediata no próprio card:
1. **1. Banheiro e Box (Obrigatória):** Vaso sanitário, paredes laterais, entrada do box, soleira e presença/ausência de barras de apoio.
2. **2. Caminho da Cama ao Banheiro (Recomendada):** Altura da cama, trajeto até a porta, fios soltos, mesas instáveis e tapetes.
3. **3. Acesso à Casa (Recomendada):** Porta de entrada, soleiras, desníveis e presença de corrimão.
4. **4. Cozinha (Recomendada):** Corredor de circulação, piso em frente à pia, passadeiras e segurança dos botões de gás.

**Checagem Integrada:** Ao anexar a foto, a miniatura com indicação de orientação (horizontal recomendada) e o botão de substituição ou remoção aparecem dentro do cartão do ambiente, economizando espaço na página.

---

### 🧠 Etapa 3: Plano de Alta Segura & Guia para a Família

- **Fusão Multimodal Dinâmica (Questionário + Antropometria + Fotos):** O motor cruza as respostas clínicas e dimensões corporais com as barreiras físicas detectadas nas imagens reais (ex.: tapetes soltos no quarto, piso molhado na cozinha, desnível de entrada sem corrimão).
- **🔊 Checklist em Áudio (Web Speech API):** Botão que narra em voz alta o plano de cuidados em português brasileiro (`pt-BR`), permitindo ao cuidador ouvir as instruções práticas enquanto inspeciona e adapta os cômodos da residência.
- **Estrutura dos 5 Módulos do Relatório:**
  1. **Resumo dos Riscos para a Família e Cuidador:** Diagnóstico funcional, nível de vulnerabilidade (Baixa, Moderada, Alta ou Crítica) e alertas personalizados.
  2. **Por Onde Começar (Custo Zero):** Ações imediatas nas primeiras 24 horas (recolher tapetes, fixar fios, iluminar trajeto noturno, reorganizar móveis) com caixas interativas de checagem.
  3. **Adaptações e Equipamentos para Providenciar:** Dimensões milimétricas em centímetros (altura de barras 75–80 cm, elevação de assento, largura de portas mínima de 80 cm, corrimão a 92 cm).
  4. **Cuidados Fundamentais de Saúde e Rotina para a Família:**
     - 🛡️ **Prevenção de Escaras (Lesões por Pressão):** Mudança de decúbito a cada 2 horas, hidratação da pele, travesseiro entre os joelhos e nunca massagear áreas avermelhadas.
     - 🌙 **Prevenção e Manejo do Delirium e Desorientação Noturna:** Manutenção do ciclo dia/noite, iluminação indireta guia, hidratação contínua e presença de objetos de memória.
     - 💊 **Segurança Medicamentosa e Polifarmácia:** Organizador semanal de comprimidos, conferência com a receita hospitalar e cuidado redobrado com sedativos e hipotensores.
     - 🥣 **Alimentação Segura e Prevenção de Engasgos (Disfagia):** Postura ereta (90°) durante e por 30 minutos após as refeições, consistência adequada e proibição de líquidos com o idoso deitado.
     - 🧘 **Ergonomia e Proteção da Coluna de Quem Cuida:** Dobrar os joelhos ao erguer peso, manter a carga junto ao corpo, ajustar a altura do leito e revezar turnos de cuidado.
  5. **🚨 Sinais de Alarme (Quando Procurar a Emergência Imediatamente / SAMU 192):** Parâmetros de alerta para dor no peito, fraqueza súbita em um lado do rosto/braço, febre com desorientação, queda com incapacidade de apoiar a perna ou fezes escuras.

---

## 🔒 3. Privacidade e Conformidade (LGPD)

- **Privacy-by-Design:** Aplicação totalmente anônima. Não armazena dados de prontuário, CPF, nome completo ou endereço civil.
- **Processamento no Navegador:** As imagens e respostas são processadas localmente na memória volátil da sessão.
- **Isenção de Responsabilidade:** Ferramenta preventiva de apoio familiar; não substitui o julgamento clínico e a prescrição médica presencial.

---

## 🚀 4. Como Executar e Acessar

- **Versão Online (GitHub Pages):** [https://fernandastofer.github.io/transicao-domiciliar-segura-ia/](https://fernandastofer.github.io/transicao-domiciliar-segura-ia/)
- **Execução Local:** Abra o arquivo `index.html` em qualquer navegador web moderno (Chrome, Edge, Firefox, Safari). Nenhuma instalação de servidor ou dependência externa é requerida.
- **Chave de API Gemini (Opcional):** Para potencializar a análise com visão computacional multimodal do Google Gemini, adicione sua chave do Google AI Studio no botão "Configurar Chave API Gemini" no cabeçalho.
