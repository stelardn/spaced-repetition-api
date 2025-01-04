import { defineConfig } from 'vitest/config'
import tsconfigpaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigpaths()],
  test: {
    setupFiles: ['./tests/setup-e2e.ts'],
    globals: true,
    environment: 'node',
    include: ['tests/e2e/**/*.{test,spec}.ts']
  },
})
