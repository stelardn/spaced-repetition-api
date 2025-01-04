import { defineConfig } from 'vitest/config'
import tsconfigpaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigpaths()],
  test: {
    globals: true,
    environment: 'node',
    include: ['tests/**/*.{test,spec}.ts']
  },
})
