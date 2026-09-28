import { createFeatureLayersConfig } from '@doscientos/configs/architecture'
import { reactViteConfig } from '@doscientos/configs/oxlint/react-vite'

export default {
  extends: [reactViteConfig, createFeatureLayersConfig()],
  rules: {
    'react/only-export-components': 'off',
  },
}
