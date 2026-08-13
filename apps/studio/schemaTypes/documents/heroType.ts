import {defineArrayMember, defineField, defineType} from 'sanity'
import {MdOutlineViewQuilt} from 'react-icons/md'

export const heroType = defineType({
  name: 'hero',
  title: 'Hero',
  icon: MdOutlineViewQuilt,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Hero name',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'position',
      title: 'Position',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'body',
      type: 'blockContent',
    }),
    defineField({
      name: 'mainImage',
      type: 'imageWithAlt',
    }),
    defineField({
      name: 'actions',
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
              name: 'href',
              type: 'string',
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      name: 'name',
    },
    prepare({name}) {
      return {
        title: name ? name.toUpperCase() : '',
        media: MdOutlineViewQuilt,
      }
    },
  },
})
