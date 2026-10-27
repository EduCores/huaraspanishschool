import { visionTool } from '@sanity/vision';
import { defineConfig, type DocumentActionComponent } from 'sanity';
import { structureTool, type StructureResolverContext } from 'sanity/structure';
import { esESLocale } from '@sanity/locale-es-es';
import { schemaTypes } from './schemaTypes';
import { isOwner } from './schemaTypes/auth';

const singletonTypes = new Set(['siteSettings', 'story', 'lookbook']);

/** Secciones que recibe el cliente en su vista simplificada */
const clientStructure: Array<{ type: string; title: string; singleton?: string }> = [
  { type: 'program', title: 'Programas' },
  { type: 'review', title: 'Reseñas' },
  { type: 'faq', title: 'Preguntas frecuentes' },
  { type: 'story', title: 'Nuestra historia', singleton: 'story' },
  { type: 'lookbook', title: 'Lookbook', singleton: 'lookbook' },
];

/** Estructura completa (dueño): secciones de contenido + ajustes técnicos */
function ownerStructure(S: import('sanity/structure').StructureBuilder) {
  return S.list()
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
    ]);
}

export default defineConfig({
  name: 'huara',
  title: 'Huara Spanish School',
  projectId: 'n6lxjxkf',
  dataset: 'production',
  plugins: [
    esESLocale(),
    structureTool({
      structure: (S, context: StructureResolverContext) => {
        // Vista según el usuario: el dueño ve todo; el cliente solo lo suyo.
        if (isOwner(context.currentUser)) {
          return ownerStructure(S);
        }
        return S.list()
          .title('Huara')
          .items(
            clientStructure.map((section) =>
              S.listItem()
                .title(section.title)
                .child(
                  section.singleton
                    ? S.document().schemaType(section.type).documentId(section.singleton)
                    : S.documentTypeList(section.type).title(section.title),
                ),
            ),
          );
      },
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
  tools: (prev, { currentUser }) => {
    // El cliente solo necesita el escritorio de contenido; Vision/admin, solo el dueño.
    return isOwner(currentUser) ? prev : prev.filter((tool) => tool.name === 'structure');
  },
  document: {
    // El cliente no crea ni elimina documentos: solo edita los que existen.
    newDocumentOptions: (prev, { currentUser }) => (isOwner(currentUser) ? prev : []),
    actions: (prev: DocumentActionComponent[], { currentUser }) => {
      if (isOwner(currentUser)) return prev;
      return prev.filter((action) => {
        const actionName = action.action ?? (action as { type?: string }).type;
        return !['delete', 'unpublish', 'duplicate'].includes(actionName ?? '');
      });
    },
  },
});
