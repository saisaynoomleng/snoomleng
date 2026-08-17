import {FaLaptopCode} from 'react-icons/fa'
import {defineType, defineField} from 'sanity'

export const blogFocusType = defineType({
  name: 'blogFocus',
  icon: FaLaptopCode,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Focus Name',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: (doc) => `${doc.name}-focus`,
      },
    }),
  ],
})
