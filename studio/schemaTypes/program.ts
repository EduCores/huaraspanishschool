import { defineField, defineType } from 'sanity';
import { hiddenOwnerOnly } from './auth';

export default defineType({
  name: 'program',
  title: 'Programa',
  type: 'document',
  groups: [
    { name: 'contenido', title: 'Contenido', default: true },
    { name: 'precio', title: 'Precio' },
    { name: 'disponibilidad', title: 'Fechas y cupos' },
    { name: 'admin', title: 'Técnico' },
  ],
  fields: [
    defineField({
      name: 'id',
      title: 'ID',
      type: 'string',
      description: 'Identificador usado por la web: group, private, surf-pack, private-hour, online-8h, online-hour.',
      validation: (rule) => rule.required(),
      group: 'admin',
      hidden: hiddenOwnerOnly,
    }),
    defineField({
      name: 'order',
      title: 'Orden',
      type: 'number',
      initialValue: 0,
      group: 'admin',
      hidden: hiddenOwnerOnly,
    }),
    defineField({
      name: 'cat',
      title: 'Categoría',
      type: 'string',
      options: {
        list: [
          { title: 'Presencial', value: 'presencial' },
          { title: 'Online', value: 'online' },
          { title: 'Surf', value: 'surf' },
        ],
      },
      initialValue: 'presencial',
      group: 'disponibilidad',
    }),
    defineField({ name: 'badge', title: 'Etiqueta destacada', type: 'bilingual', group: 'contenido' }),
    defineField({
      name: 'bc',
      title: 'Color de etiqueta',
      type: 'string',
      options: {
        list: [
          { title: 'Naranja', value: 'orange' },
          { title: 'Arena', value: 'sand' },
        ],
      },
      initialValue: 'orange',
      group: 'contenido',
    }),
    defineField({ name: 'tag', title: 'Nivel / modalidad', type: 'bilingual', group: 'contenido' }),
    defineField({
      name: 'unit',
      title: 'Unidad de precio',
      type: 'string',
      options: {
        list: [
          { title: 'Semana', value: 'week' },
          { title: 'Hora', value: 'hour' },
          { title: 'Mes', value: 'month' },
        ],
      },
      initialValue: 'week',
      group: 'precio',
    }),
    defineField({
      name: 'title',
      title: 'Nombre',
      type: 'bilingual',
      validation: (rule) => rule.required(),
      group: 'contenido',
    }),
    defineField({
      name: 'desc',
      title: 'Descripción',
      type: 'bilingualText',
      validation: (rule) => rule.required(),
      group: 'contenido',
    }),
    defineField({
      name: 'price',
      title: 'Precio USD (1 unidad)',
      type: 'number',
      validation: (rule) => rule.required().min(0),
      group: 'precio',
    }),
    defineField({
      name: 'priceWk',
      title: 'Precio por semana desde 2 semanas',
      description: 'Déjalo vacío si no aplica.',
      type: 'number',
      group: 'precio',
    }),
    defineField({
      name: 'img',
      title: 'Imagen',
      type: 'image',
      options: { hotspot: true },
      group: 'contenido',
    }),
    defineField({
      name: 'colors',
      title: 'Colores de respaldo',
      type: 'array',
      of: [{ type: 'string' }],
      hidden: true,
      group: 'admin',
    }),
    defineField({
      name: 'startDays',
      title: 'Días para el próximo inicio',
      type: 'number',
      initialValue: 4,
      group: 'disponibilidad',
    }),
    defineField({
      name: 'spots',
      title: 'Cupos disponibles',
      type: 'number',
      initialValue: 3,
      group: 'disponibilidad',
    }),
  ],
  preview: {
    select: { title: 'title.en', subtitle: 'id', media: 'img' },
  },
});
