import { defineType } from 'sanity';

const bilingualGroups = [
  { name: 'es', title: 'Español', default: true },
  { name: 'en', title: 'English' },
];

export const bilingual = defineType({
  name: 'bilingual',
  type: 'object',
  title: 'Texto bilingüe',
  description: 'Completa siempre los dos idiomas.',
  groups: bilingualGroups,
  fields: [
    {
      name: 'es',
      type: 'string',
      title: 'Español',
      group: 'es',
      validation: (rule) => rule.required().error('Falta el texto en español'),
    },
    {
      name: 'en',
      type: 'string',
      title: 'English',
      group: 'en',
      validation: (rule) => rule.required().error('Falta el texto en inglés'),
    },
  ],
});

export const bilingualText = defineType({
  name: 'bilingualText',
  type: 'object',
  title: 'Texto bilingüe (párrafo)',
  groups: bilingualGroups,
  fields: [
    {
      name: 'es',
      type: 'text',
      title: 'Español',
      rows: 4,
      group: 'es',
      validation: (rule) => rule.required().error('Falta el texto en español'),
    },
    {
      name: 'en',
      type: 'text',
      title: 'English',
      rows: 4,
      group: 'en',
      validation: (rule) => rule.required().error('Falta el texto en inglés'),
    },
  ],
});

export const bilingualTypes = [bilingual, bilingualText];
