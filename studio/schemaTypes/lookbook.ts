import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'lookbook',
  title: 'Lookbook',
  type: 'document',
  fields: [
    defineField({
      name: 'h',
      title: 'Fotos horizontales',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'v',
      title: 'Fotos verticales',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Lookbook' }),
  },
});
