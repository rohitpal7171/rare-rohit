/// <reference types="vitest" />
import path from 'path'

import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  plugins: [react(), svgr()],

  resolve: {
    alias: {
      '@shared/ui': path.resolve(__dirname, '../../shared/ui/index.ts'),
      '@shared/hooks': path.resolve(__dirname, '../../shared/hooks/index.ts'),
      '@shared/utils': path.resolve(__dirname, '../../shared/utils/index.ts'),
      '@app': path.resolve(__dirname, './src'),
    },
  },

  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}', '../../shared/**/*.test.{ts,tsx}'],
    css: false,
    cache: false,
    server: {
      deps: {
        inline: ['framer-motion'],
      },
    },
  },

  server: {
    port: 5173,
    strictPort: false,
    fs: { allow: ['../..'], strict: true },
    warmup: {
      clientFiles: ['./src/App.tsx', './src/pages/Home.tsx', './src/components/sections/Hero.tsx'],
    },
  },

  build: {
    target: 'es2022',
    minify: 'esbuild',
    cssMinify: true,
    sourcemap: false,
    reportCompressedSize: true,
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
        // Vite 8 requires manualChunks as a function, not an object
        manualChunks: (id: string) => {
          if (id.includes('react-dom') || id.includes('react-router') || id.includes('node_modules/react/')) return 'vendor-react'
          if (id.includes('framer-motion')) return 'vendor-motion'
          if (id.includes('i18next')) return 'vendor-i18n'
          if (id.includes('react-hook-form') || id.includes('zod') || id.includes('@hookform')) return 'vendor-form'
          if (id.includes('lucide-react') || id.includes('clsx') || id.includes('tailwind-merge')) return 'vendor-ui'
          return undefined
        },
      },
    },
  },

  preview: { port: 4173, strictPort: false },
  css: { devSourcemap: true },
})
