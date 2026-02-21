import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: (() => {
    const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? ''
    const isUserSite = repoName.endsWith('.github.io')
    const isGhPages = process.env.GITHUB_PAGES === 'true'
    if (!isGhPages) return '/'
    return isUserSite ? '/' : `/${repoName}/`
  })(),
  plugins: [react()],
  server: {
    port: 8080,
    open: false,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
