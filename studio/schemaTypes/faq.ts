import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'faq',
  title: 'Pregunta frecuente',
  type: 'document',
  fields: [
    defineField({ name: 'order', title: 'Orden', type: 'number', initialValue: 0 }),
    defineField({ name: 'q', title: 'Pregunta', type: 'bilingual', validation: (rule) => rule.required() }),
    defineField({ name: 'a', title: 'Respuesta', type: 'bilingualText', validation: (rule) => rule.required() }),
  ],
  preview: {
    select: { title: 'q.en' },
  },
});
