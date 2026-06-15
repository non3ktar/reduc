# Teach&Learn Modernizado (V2)

## 📌 Project Goal
Este projeto é uma reconstrução do protótipo clássico "Teach&Learn" original, transformando um antigo front-end estático (HTML/jQuery + MaterializeCSS) com um backend extinto (Firebase) em uma aplicação moderna (React), auto-contida (local-first) com um design refinado Premium Glassmorphism.

## 🛠 Tech Stack
- **Framework:** Vite + React
- **Estilização:** TailwindCSS V4 (Design System: Glassmorphism, Dark Mode)
- **Banco de Dados Local:** Dexie.js (IndexedDB) para funcionamento offline-first imediato sem backend.
- **Ícones & Animações:** Lucide React, Framer Motion
- **Roteamento:** React Router DOM

## 🚀 Setup/Run Instructions
1. Certifique-se de ter Node.js instalado.
2. Acesse a pasta do projeto:
   ```bash
   cd teach-and-learn-modern
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
5. Acesse `http://localhost:5173` no seu navegador. O primeiro login de teste já está semeado como:
   - **Email:** `test@example.com`
   - **Senha:** `password`

## 🌐 Deployment URL
*(Ainda não implantado. Pode ser facilmente enviado para Surge.sh ou Cloudflare Pages executando `npm run build` e enviando a pasta `dist`)*

## 📝 Changelog / History
- **v1.0 (Legado):** Front-end clássico usando HTML, jQuery, Materialize e Firebase. (Backend desativado).
- **v2.0 (Modernizado):**
  - Reescrita completa para React (Vite).
  - Migração para TailwindCSS V4, eliminando dependências legadas de estilização.
  - Substituição do Firebase "morto" por `Dexie.js`, permitindo que o App seja funcional offline.
  - Implementado sistema de rotas (Login, Feed).
  - UI Redesenhada focando no estilo "Vibe Coding", com Glassmorphism, gradientes modernos e componentes responsivos.
