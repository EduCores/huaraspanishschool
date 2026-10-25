import { defineField, defineType } from 'sanity';

const localizedHours = {
  name: 'hours',
  title: 'Horario',
  type: 'bilingual',
};

export default defineType({
  name: 'siteSettings',
  title: 'Ajustes del sitio',
  type: 'document',
  groups: [
    { name: 'general', title: 'General', default: true },
    { name: 'home', title: 'Portada' },
    { name: 'programs', title: 'Programas' },
    { name: 'community', title: 'Comunidad' },
    { name: 'contact', title: 'Contacto' },
  ],
  fields: [
    defineField({ name: 'siteName', title: 'Nombre del sitio', type: 'string', group: 'general' }),
    defineField({ name: 'domain', title: 'Dominio', type: 'url', group: 'general' }),
    defineField({
      name: 'surfTarget',
      title: 'Próximo inicio del Surf Pack',
      description: 'Si se deja vacío, la web calcula el próximo lunes a las 09:00.',
      type: 'datetime',
      group: 'general',
    }),

    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      group: 'home',
      fields: [
        { name: 'eyebrow', title: 'Antetítulo', type: 'bilingual' },
        { name: 'title1', title: 'Título (inicio)', type: 'bilingual' },
        { name: 'title2', title: 'Título (destacado)', type: 'bilingual' },
        { name: 'sub', title: 'Subtítulo', type: 'bilingualText' },
        { name: 'cta1', title: 'Botón principal', type: 'bilingual' },
        { name: 'cta2', title: 'Enlace secundario', type: 'bilingual' },
        { name: 'img', title: 'Imagen', type: 'image', options: { hotspot: true } },
      ],
    }),
    defineField({
      name: 'promo',
      title: 'Cinta promocional',
      type: 'array',
      of: [{ type: 'bilingual' }],
      group: 'home',
    }),
    defineField({
      name: 'marquee',
      title: 'Marquesina grande',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'home',
    }),

    defineField({
      name: 'method',
      title: 'Método',
      type: 'array',
      group: 'programs',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'num', title: 'Número', type: 'string' },
            {
              name: 'icon',
              title: 'Icono',
              type: 'string',
              options: {
                list: [
                  { title: 'Conversación', value: 'chat' },
                  { title: 'Cocina', value: 'pot' },
                  { title: 'Feria', value: 'bag' },
                  { title: 'Brújula', value: 'compass' },
                ],
              },
            },
            { name: 'title', title: 'Título', type: 'bilingual' },
            { name: 'desc', title: 'Descripción', type: 'bilingualText' },
          ],
          preview: { select: { title: 'title.en', subtitle: 'num' } },
        },
      ],
    }),
    defineField({
      name: 'editorial',
      title: 'Bloques presencial / online',
      type: 'array',
      group: 'programs',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'eyebrow', title: 'Antetítulo', type: 'bilingual' },
            { name: 'title', title: 'Título', type: 'bilingual' },
            { name: 'text', title: 'Texto', type: 'bilingualText' },
            { name: 'img', title: 'Imagen', type: 'image', options: { hotspot: true } },
            { name: 'programId', title: 'ID del programa', type: 'string' },
          ],
          preview: { select: { title: 'title.en', media: 'img' } },
        },
      ],
    }),
    defineField({
      name: 'surf',
      title: 'Bloque Spanish + Surf',
      type: 'object',
      group: 'programs',
      fields: [
        { name: 'eyebrow', title: 'Antetítulo', type: 'bilingual' },
        { name: 'title', title: 'Título', type: 'bilingual' },
        { name: 'desc', title: 'Descripción', type: 'bilingualText' },
        { name: 'img', title: 'Imagen', type: 'image', options: { hotspot: true } },
        { name: 'programId', title: 'ID del programa', type: 'string' },
      ],
    }),

    defineField({
      name: 'community',
      title: 'Comunidad',
      type: 'object',
      group: 'community',
      fields: [
        { name: 'eyebrow', title: 'Antetítulo', type: 'bilingual' },
        { name: 'heading', title: 'Título', type: 'bilingual' },
        {
          name: 'photos',
          title: 'Fotos con leyenda',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'image', title: 'Imagen', type: 'image', options: { hotspot: true } },
                { name: 'alt', title: 'Texto alternativo', type: 'string' },
                { name: 'caption', title: 'Leyenda', type: 'bilingual' },
              ],
              preview: { select: { title: 'caption.en', media: 'image' } },
            },
          ],
        },
        {
          name: 'instagram',
          title: 'Fotos de Instagram',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'image', title: 'Imagen', type: 'image', options: { hotspot: true } },
                { name: 'alt', title: 'Texto alternativo', type: 'string' },
              ],
              preview: { select: { title: 'alt', media: 'image' } },
            },
          ],
        },
        {
          name: 'facebook',
          title: 'Enlaces de publicaciones de Facebook',
          type: 'array',
          of: [{ type: 'url' }],
        },
      ],
    }),

    defineField({
      name: 'footer',
      title: 'Pie de página',
      type: 'object',
      group: 'general',
      fields: [
        { name: 'tagline', title: 'Frase', type: 'bilingual' },
        { name: 'payment', title: 'Pago seguro', type: 'bilingual' },
        { name: 'methods', title: 'Métodos de pago', type: 'array', of: [{ type: 'string' }] },
      ],
    }),
    defineField({
      name: 'legal',
      title: 'Enlaces legales',
      type: 'object',
      group: 'general',
      fields: [
        { name: 'privacy', title: 'Privacidad', type: 'string' },
        { name: 'cookies', title: 'Cookies', type: 'string' },
        { name: 'terms', title: 'Términos', type: 'string' },
      ],
    }),

    defineField({
      name: 'contact',
      title: 'Contacto',
      type: 'object',
      group: 'contact',
      fields: [
        { name: 'address', title: 'Dirección', type: 'string' },
        { name: 'phone', title: 'Teléfono', type: 'string' },
        { name: 'phoneDisplay', title: 'Teléfono visible', type: 'string' },
        { name: 'whatsapp', title: 'WhatsApp (solo números)', type: 'string' },
        localizedHours,
        { name: 'mapsUrl', title: 'Google Maps', type: 'url' },
      ],
    }),
    defineField({
      name: 'social',
      title: 'Redes sociales',
      type: 'object',
      group: 'contact',
      fields: [
        { name: 'instagram', title: 'Instagram', type: 'url' },
        { name: 'facebook', title: 'Facebook', type: 'url' },
      ],
    }),
    defineField({
      name: 'reviewsInfo',
      title: 'Reseñas de Google',
      type: 'object',
      group: 'community',
      fields: [
        { name: 'score', title: 'Puntuación', type: 'number' },
        { name: 'count', title: 'Cantidad de reseñas', type: 'number' },
        { name: 'googleUrl', title: 'Enlace a Google Maps', type: 'url' },
        { name: 'writeUrl', title: 'Enlace para escribir reseña', type: 'url' },
        { name: 'placeId', title: 'Place ID', type: 'string' },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Ajustes del sitio' }),
  },
});
