import { defineCliConfig } from '@sanity/cli';

export default defineCliConfig({
  typegen: {
    path: './src/**/*.{js,ts,tsx,jsx}',
    schema: './src/sanity/extract.json',
    generates: './src/sanity/types.ts',
  },
});
