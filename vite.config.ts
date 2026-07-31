import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

declare const process: { env: Record<string, string | undefined> }

// GitHub Pages (project site) serve em /SESIhackSaude/.
// Vercel/Netlify servem na raiz "/". GITHUB_ACTIONS=true so no build do Pages.
export default defineConfig({
  base: process.env.GITHUB_ACTIONS === 'true' ? '/SESIhackSaude/' : '/',
  plugins: [react(), tailwindcss()],
})
