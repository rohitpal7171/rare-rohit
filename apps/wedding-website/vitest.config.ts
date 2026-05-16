import path from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
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
})
