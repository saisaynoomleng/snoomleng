import {formatTitle} from '@snoomleng/utils'
import {GiNewspaper} from 'react-icons/gi'
import {defineType, defineField} from 'sanity'

export const blogType = defineType({
  name: 'blog',
  icon: GiNewspaper,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Blog Title',
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
      name: 'publishedAt',
      type: 'date',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      type: 'blockContent',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mainImage',
      type: 'imageWithAlt',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      type: 'reference',
      to: [{type: 'blogCategory'}],
    }),
    defineField({
      name: 'focus',
      type: 'reference',
      to: [{type: 'blogFocus'}],
    }),
    defineField({
      name: 'seo',
      type: 'seo',
    }),
  ],
  preview: {
    select: {
      name: 'name',
      category: 'category.name',
      focus: 'focus.name',
      image: 'mainImage',
    },
    prepare({name, category, focus, image}) {
      const formatName = name ? formatTitle(name) : 'Title not provided'
      const formatCat = category ? formatTitle(category) : 'Cateogry not provided'
      const formatF = focus ? formatTitle(focus) : 'Focus not provided'

      return {
        title: formatName,
        subtitle: `Category: ${formatCat} | Focus: ${formatF}`,
        media: image ?? GiNewspaper,
      }
    },
  },
})
