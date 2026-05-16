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
    // Disable cache so setup file changes always take effect
    cache: false,
    // Use the Babel-based React plugin for tests — SWC doesn't support vi.mock hoisting with JSX
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
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-motion': ['framer-motion'],
          'vendor-i18n': ['i18next', 'react-i18next', 'i18next-browser-languagedetector'],
          'vendor-form': ['react-hook-form', 'zod', '@hookform/resolvers'],
          'vendor-ui': ['lucide-react', 'clsx', 'tailwind-merge'],
        },
      },
    },
  },

  preview: { port: 4173, strictPort: false },
  css: { devSourcemap: true },
})
