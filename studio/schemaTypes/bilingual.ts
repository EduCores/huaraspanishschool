import { defineType } from 'sanity';

export const bilingual = defineType({
  name: 'bilingual',
  type: 'object',
  title: 'Texto bilingüe',
  description: 'Completa siempre los dos idiomas.',
  fields: [
    {
      name: 'en',
      type: 'string',
      title: 'English',
      validation: (rule) => rule.required().error('Falta el texto en inglés'),
    },
    {
      name: 'es',
      type: 'string',
      title: 'Español',
      validation: (rule) => rule.required().error('Falta el texto en español'),
    },
  ],
});

export const bilingualText = defineType({
  name: 'bilingualText',
  type: 'object',
  title: 'Texto bilingüe (párrafo)',
  fields: [
    {
      name: 'en',
      type: 'text',
      title: 'English',
      rows: 4,
      validation: (rule) => rule.required().error('Falta el texto en inglés'),
    },
    {
      name: 'es',
      type: 'text',
      title: 'Español',
      rows: 4,
      validation: (rule) => rule.required().error('Falta el texto en español'),
    },
  ],
});

export const bilingualTypes = [bilingual, bilingualText];
