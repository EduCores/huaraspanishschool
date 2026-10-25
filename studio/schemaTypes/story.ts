import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'story',
  title: 'Nuestra historia',
  type: 'document',
  fields: [
    defineField({ name: 'eyebrow', title: 'Antetítulo', type: 'bilingual' }),
    defineField({
      name: 'paragraphsEn',
      title: 'Párrafos en inglés',
      type: 'array',
      of: [{ type: 'text' }],
    }),
    defineField({
      name: 'paragraphsEs',
      title: 'Párrafos en español',
      type: 'array',
      of: [{ type: 'text' }],
    }),
    defineField({ name: 'sign', title: 'Firma', type: 'bilingual' }),
    defineField({ name: 'name', title: 'Nombre', type: 'string' }),
  ],
  preview: {
    prepare: () => ({ title: 'Nuestra historia' }),
  },
});
