import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'review',
  title: 'Reseña',
  type: 'document',
  fields: [
    defineField({ name: 'id', title: 'ID', type: 'string' }),
    defineField({ name: 'order', title: 'Orden', type: 'number', initialValue: 0 }),
    defineField({ name: 'author', title: 'Autor', type: 'bilingual', validation: (rule) => rule.required() }),
    defineField({ name: 'meta', title: 'Detalle', type: 'bilingual' }),
    defineField({ name: 'quote', title: 'Reseña', type: 'text', rows: 6, validation: (rule) => rule.required() }),
    defineField({
      name: 'source',
      title: 'Fuente',
      type: 'string',
      options: {
        list: [
          { title: 'Google', value: 'Google' },
          { title: 'Instagram', value: 'Instagram' },
        ],
      },
      initialValue: 'Google',
    }),
  ],
  preview: {
    select: { title: 'author.en', subtitle: 'quote' },
  },
});
