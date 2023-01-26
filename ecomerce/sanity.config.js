import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'ecomerce',

  projectId: 'b9mt7qjn',
  dataset: 'webshop',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
