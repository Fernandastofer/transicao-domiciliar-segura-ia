# 🏠 Protocolo de Transição Domiciliar Segura

> **Ferramenta de Suporte à Decisão e Adequação Ambiental Domiciliar Assistida por IA Multimodal**  
> *Prevenção de quedas precoces, adequação arquitetônica e orientação prática para cuidadores e familiares.*

[![Base Clínica](https://img.shields.io/badge/Base%20Cl%C3%ADnica-ABNT%20NBR%209050%20%7C%20HOME%20FAST%20%7C%20HSSAT-168070)]()
[![Privacidade](https://img.shields.io/badge/LGPD-Privacy--by--Design%20(An%C3%B4nimo)-15803d)]()
[![IA Multimodal](https://img.shields.io/badge/Motor%20IA-Google%20Gemini%20Vision%20%2B%20Motor%20Local-d97706)]()

---

## 🎯 1. Problema e Contexto

Após eventos limitantes agudos (pós-operatórios ortopédicos e abdominais, AVC) ou agravamento funcional crônico (síndrome da fragilidade, declínio cognitivo), a transição do ambiente hospitalar para a residência frequentemente ocorre de forma desarticulada.

Enquanto a alta tradicional foca em receitas e curativos, **as famílias frequentemente carecem de orientação prática para readequar o espaço físico**, resultando em:
- **Quedas precoces nas primeiras 72 horas pós-alta**;
- **Reinternações hospitalares evitáveis**;
- **Sobrecarga física e emocional extrema de quem cuida**.

Esta aplicação cruza uma triagem clínico-funcional rápida, medidas antropométricas adaptativas e inspeção visual de 4 ambientes por Inteligência Artificial Multimodal para gerar um plano de alta personalizado e humanizado.

---

## ✨ 2. Fluxo e Funcionalidades

### 📋 Etapa 1: Triagem Clínico-Funcional & Medidas Antropométricas (`< 3 min`)
1. **Triagem Funcional Objetiva:**
   - Locomoção e deslocamento
   - Banho e cuidados no boxe
   - Vaso sanitário e sentar/levantar
   - Memória, raciocínio e atenção
   - Visão e audição
   - Histórico de quedas e dispositivos médicos invasivos
2. **Módulo Antropométrico Adaptativo com Boneco Guia:**
   - Adequação automática das cotas corporais (`A`, `B` e `C`) de acordo com o padrão motor selecionado:
     - **Deambulador Independente:** altura poplítea, altura do punho e largura dos ombros.
     - **Marcha com Apoio / Andador / Bengala:** altura poplítea (proteção articular >90°), altura da manopla/barras e largura funcional do andador.
     - **Cadeirante:** largura da cadeira roda a roda, altura do assento para transferência nivelada e alcance lateral.
     - **Restrito ao Leito / Acamado:** comprimento corporal, largura de ombros/quadril e altura da cama ergonômica para a coluna do cuidador.
   - Botões de seleção rápida por estatura em 1 clique (baixo, médio, alto).

### 📷 Etapa 2: Guia de Captura Visual & Envio Integrado nos 4 Ambientes
Diagramação estética em grade (2 em cima e 2 embaixo) com orientações ilustradas, botão de envio e checagem de upload embutidos diretamente em cada card para economia máxima de espaço vertical:
1. **banheiro e box (Obrigatória):** vaso sanitário, paredes laterais, entrada do box e piso.
2. **caminho da cama ao banheiro:** altura da cama, rota até a porta e tapetes próximos.
3. **acesso à casa:** porta de entrada, soleiras, desníveis e degraus externos.
4. **cozinha:** piso próximo à pia, passadeiras e botões de gás do fogão.
- **Checagem Integrada:** Ao anexar uma imagem, o status de confirmação (`✓ Foto anexada com sucesso`), a miniatura e a opção de exclusão/substituição são exibidos dentro do próprio cartão do ambiente, eliminando galerias separadas e evitando rolagens desnecessárias.

### 🧠 Etapa 3: Plano de Alta Segura e Guia para a Família
- **Fusão Multimodal Dinâmica (Questionário + Antropometria + Fotos):** O motor cruza a condição clínica e medidas corporais com os achados visuais das fotos reais anexadas. Se uma foto contiver um tapete, desnível, mangueira de O₂ ou ausência de barras, essa barreira arquitetônica é integrada diretamente no checklist com justificativa personalizada para a condição do paciente (ex.: risco de ruptura dos pontos cirúrgicos por sobressalto em jovem pós-apendicectomia; travamento de andador em idoso com fratura de quadril; ilusão visual de buraco em paciente com declínio cognitivo).
- **Linguagem Acolhedora:** Redigido diretamente para quem cuida, em tom empático ("você deve", "faça hoje", "observe"), sem jargões herméticos.
- **Estrutura do Relatório:**
  1. **Resumo dos Riscos para a Família e Cuidador**
  2. **Por onde começar (custo zero)**: ações imediatas com checklist interativo.
  3. **Adaptações e Equipamentos para Providenciar em Casa**: dimensões calibradas em centímetros pela antropometria e pela norma **ABNT NBR 9050**.
  4. **Dicas de Ouro para a Rotina de Quem Cuida**: técnicas de transferência e proteção da coluna do cuidador.
- **Exportação:** Otimizado para impressão e geração de PDF com um clique.

---

## 🧪 3. Casos Clínicos Pré-Carregados

A aplicação possui 3 casos clínicos prontos para demonstração instantânea com respostas e fotos de teste:

| Caso | Perfil Clínico | Nível de Risco | Foco das Recomendações |
| :--- | :--- | :---: | :--- |
| **Caso 1** | **Jovem em Pós-Op Abdominal (28 anos)** | Baixo | Alcance na altura da cintura (80 cm–1 m), proteção dos pontos da cirurgia ao sentar/levantar e saída da cama em bloco. |
| **Caso 2** | **Idoso em Pós-Op de Fratura de Quadril (79 anos)** | Alto | Vaso e cama elevados (respeito ao ângulo do quadril >90°), remoção imediata de tapetes na rota do andador (66 cm), corrimão e banco de banho regulado. |
| **Caso 3** | **Idoso com Fragilidade e Declínio Cognitivo (84 anos)** | Crítico | Suspensão da mangueira de O₂ pelas paredes, remoção de todos os tapetes (risco com tapetes escuros e baixa visão), luz guia noturna e orientação para marcha assistida. |

---

## 🔒 4. Privacidade e Salvaguardas

- **Privacy-by-Design (LGPD):** Operação estritamente anônima (sem coleta de CPF, nome completo ou endereço civil).
- **Aviso de Suporte:** Ferramenta de apoio preventivo à família e ao cuidador, não substituindo consultas e avaliações clínicas presenciais da equipe de saúde.

---

## 🚀 5. Execução

1. Clone o repositório ou baixe os arquivos.
2. Abra o arquivo **`index.html`** em qualquer navegador web moderno.
3. *(Opcional)* Para utilizar o modelo multimodal do Google Gemini em tempo real, clique no botão superior e adicione sua chave de API do Google AI Studio.
