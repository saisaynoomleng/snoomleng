import {formatTitle} from '@snoomleng/utils'
import {MdCategory} from 'react-icons/md'
import {defineField, defineType} from 'sanity'

export const blogCategoryType = defineType({
  name: 'blogCategory',
  title: 'Blog Categories',
  type: 'document',
  icon: MdCategory,
  fields: [
    defineField({
      name: 'name',
      title: 'Category Name',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc) => `${doc.name}-blog-category`,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mainImage',
      type: 'imageWithAlt',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      name: 'name',
      image: 'mainImage',
    },
    prepare({name, image}) {
      return {
        title: name ? formatTitle(name) : 'Name not provided',
        media: image,
      }
    },
  },
})
