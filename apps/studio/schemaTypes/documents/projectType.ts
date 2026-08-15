import {defineArrayMember, defineField, defineType} from 'sanity'
import {GiFiles} from 'react-icons/gi'
import {formatDate, formatTitle} from '@snoomleng/utils'

export const projectType = defineType({
  name: 'project',
  title: 'Projects',
  type: 'document',
  icon: GiFiles,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'name',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'startedAt',
      type: 'date',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'endedAt',
      type: 'date',
    }),
    defineField({
      name: 'stacks',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'links',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              type: 'string',
            }),
            defineField({
              name: 'url',
              type: 'url',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'body',
      type: 'blockContent',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'type',
      type: 'string',
      options: {
        list: [
          {title: 'Property', value: 'property'},
          {title: 'Portfolio', value: 'portfolio'},
          {title: 'Health Care', value: 'health-care'},
          {title: 'E Commerce', value: 'e-commerce'},
        ],
      },
    }),
    defineField({
      name: 'mainImage',
      type: 'imageWithAlt',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'seo',
      type: 'seo',
    }),
  ],
  preview: {
    select: {
      name: 'name',
      startedDate: 'startedAt',
      endedDate: 'endedAt',
      type: 'type',
      image: 'mainImage',
    },
    prepare({name, startedDate, endedDate, type, image}) {
      const formatName = name ? formatTitle(name) : 'Name not provided'
      const formatStart = startedDate ? formatDate(startedDate) : 'Started Date not specified'
      const formatEnd = endedDate ? formatDate(endedDate) : 'Still in development'
      const formatType = type ? formatTitle(type) : 'Type not specified'

      return {
        title: `${formatName} (${formatType})`,
        subtitle: `Timeline: ${formatStart}-${formatEnd}`,
        media: image ?? GiFiles,
      }
    },
  },
})
