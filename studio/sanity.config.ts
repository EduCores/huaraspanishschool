import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schemaTypes';

const singletonTypes = new Set(['siteSettings', 'story', 'lookbook']);

export default defineConfig({
  name: 'huara',
  title: 'Huara Spanish School',
  projectId: 'oc4anegte',
  dataset: 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Contenido')
          .items([
            S.listItem()
              .title('Ajustes del sitio')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
            S.listItem()
              .title('Nuestra historia')
              .child(S.document().schemaType('story').documentId('story')),
            S.listItem()
              .title('Lookbook')
              .child(S.document().schemaType('lookbook').documentId('lookbook')),
            S.divider(),
            ...S.documentTypeListItems().filter((item) => {
              const id = item.getId();
              return id ? !singletonTypes.has(id) : true;
            }),
          ]),
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
});
