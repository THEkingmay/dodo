import '@testing-library/jest-dom/vitest'

import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

// With `globals: false` in vite.config.ts, Testing Library cannot auto-register
// its cleanup, so we do it explicitly.
afterEach(() => {
  cleanup()
})
