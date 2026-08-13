import {defineField, defineType} from 'sanity'
import {FaLinux} from 'react-icons/fa'
import {formatTitle} from '@snoomleng/utils'

export const technologyType = defineType({
  name: 'technology',
  title: 'Technologies',
  icon: FaLinux,
  type: 'document',
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
    }),
    defineField({
      name: 'icon',
      type: 'string',
    }),
    defineField({
      name: 'type',
      type: 'string',
      options: {
        list: [
          {title: 'Frontend', value: 'frontend'},
          {title: 'Backend', value: 'backend'},
          {title: 'AI', value: 'ai'},
          {title: 'Tooling', value: 'tooling'},
          {title: 'DevOps', value: 'devops'},
          {title: 'Badge', value: 'badge'},
          {title: 'Cloud & Infrastructure', value: 'cloud-and-infrastructure'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      name: 'name',
      image: 'mainImage',
      type: 'type',
    },
    prepare({name, image, type}) {
      return {
        title: name ? formatTitle(name) : 'Name not provided',
        subtitle: type ? formatTitle(type) : 'Type not provided',
        media: image ?? FaLinux,
      }
    },
  },
})
