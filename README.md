# Reduca (Antigo Teach&Learn Modernizado)

## 📌 Project Goal
A **Reduca** é uma plataforma educacional é rede social desenhada para professores, gestores e alunos. O projeto evoluiu de um antigo front-end estático para uma PWA/APK moderna com backend em nuvem, notificações em tempo real e inteligência artificial embarcada.

## 🛠 Tech Stack
- **Framework Front-end:** Vite + React
- **Estilização:** TailwindCSS V4 (Design System focado em Glassmorphism, Dark Mode e UI Premium)
- **Backend (BaaS):** Supabase (PostgreSQL, Authentication, Realtime, Edge Functions)
- **Mobile/APK:** Capacitor (Geração de APK nativo)
- **Ícones & Animações:** Lucide React, Framer Motion
- **Inteligência Artificial:** `@tensorflow/tfjs` e `nsfwjs` (para moderação local)
- **Roteamento:** React Router DOM
- **Automação de Build:** Node.js script customizado (`release.js`)

## 🚀 Setup/Run Instructions
1. Certifique-se de ter Node.js instalado e configurado com a `build_env` (JDK-21).
2. Acesse a pasta do projeto e instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
4. As credenciais do Supabase devem estar configuradas no seu arquivo `src/supabase.js`.

## 📦 Script de Release & Deploy (AutoUpdater)
Para gerar uma nova versão da plataforma web e do APK com Auto-Update:
```bash
npm run release
```
**O que este script faz?**
1. Aumenta a versão do arquivo `public/version.json` e do `build.gradle` do Android.
2. Faz o build web da pasta `dist`.
3. Sincroniza os assets para o Android com `npx cap sync`.
4. Aciona o `gerar_apk.sh` do seu ambiente local para buildar o APK.
5. Sobe o APK mais recente para a hospedagem (via GH-Pages).
6. Executa `git add`, `commit` e `push` para manter o GitHub seguro.

## 🌐 Deployment URL
- **Web App:** Hospedado no GitHub Pages (URL base configurada por você via `gh-pages` ou domínio customizado em `reduca.zonaeducacional.org`).
- **APK URL de Atualização:** `https://reduca.zonaeducacional.org/version.json` e o APK correspondente.

## 📝 Changelog / Histórico
- **v1.0 (Legado):** Front-end clássico usando HTML, jQuery, Materialize e Firebase. (Backend desativado).
- **v2.0 - Refatoração Reduca Inicial:**
  - Migração para Supabase para DB e Auth.
  - Implementação de Design "Vibe Coder" com Glassmorphism.
  - Adição de sistema de Grupos, Fórum, Escambo e Blog (Brisa Literária).
- **Integração Mobile:**
  - Configurado o Capacitor para APKs híbridos.
  - Criado script de `AutoUpdater` interno para forçar atualizações OTA (Over-the-Air) para os alunos pelo Android.
  - Funcionalidade de Push Notifications habilitadas no Supabase.
- **Integração de Inteligência Artificial:**
  - Inserido TensorFlow e modelos neurais para filtragem e recursos avançados.
- **Sessão de UI/UX (Última Atualização - 17 de Junho de 2026):**
  - Ajuste nas barras laterais no modo Desktop para rolarem com o feed e ficarem travadas (`sticky bottom-4`) logo que o último Widget fica visível.
  - Implementado os atalhos rápidos (`WidgetAtalhos`) para apontar para rotas corretas (Blog e Grupos).
  - Ajustado Cabeçalho da página de Detalhes dos Grupos para impedir sobreposição do texto na imagem de capa.
  - Adicionada função Administrativa (`/admin`) para exclusão direta (e permanente) de usuários cadastrados no banco `profiles`.
  - Versão APK foi incrementada para **1.0.20** através do script `release.js` automático.
