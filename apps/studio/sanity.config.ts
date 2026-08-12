import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {media} from 'sanity-plugin-media'
import {structure} from './structure'

export default defineConfig({
  name: 'default',
  title: 'snoomleng',

  projectId: 'h5ref3kt',
  dataset: 'production',

  plugins: [structureTool({structure}), visionTool(), media()],

  schema: {
    types: schemaTypes,
  },
})
