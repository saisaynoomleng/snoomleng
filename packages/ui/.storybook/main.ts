import type { StorybookConfig } from '@storybook/react-vite';

import { dirname } from 'path';

import { fileURLToPath } from 'url';

import { mergeConfig } from 'vitest/config';
import tailwindcss from '@tailwindcss/vite';
import tsConfigPaths from 'vite-tsconfig-paths';

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string) {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}
const config: StorybookConfig = {
  stories: [
    '../src/components/**/*.mdx',
    '../src/components/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    getAbsolutePath('@chromatic-com/storybook'),
    getAbsolutePath('@storybook/addon-vitest'),
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-docs'),
    getAbsolutePath('@storybook/addon-mcp'),
    getAbsolutePath('@storybook/addon-themes'),
  ],
  framework: getAbsolutePath('@storybook/react-vite'),
  viteFinal: async (viteconfig) =>
    mergeConfig(viteconfig, {
      plugins: [tailwindcss(), tsConfigPaths()],
    }),
};
export default config;
