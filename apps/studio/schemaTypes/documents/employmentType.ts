import {formatDate, formatTitle} from '@snoomleng/utils'
import {GiSuitcase} from 'react-icons/gi'
import {defineField, defineType} from 'sanity'

export const emplopymentType = defineType({
  name: 'employment',
  title: 'Employments',
  icon: GiSuitcase,
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
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'startedAt',
      type: 'date',
    }),
    defineField({
      name: 'endedAt',
      type: 'date',
    }),
    defineField({
      name: 'body',
      type: 'blockContent',
    }),
    defineField({
      name: 'companyName',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      name: 'name',
      startedDate: 'startedAt',
      endedDate: 'endedAt',
    },
    prepare({name, startedDate, endedDate}) {
      const formatName = name ? formatTitle(name) : 'Name not provided'
      const start = startedDate ? formatDate(startedDate) : 'Started date not specified'
      const end = endedDate ? formatDate(endedDate) : 'Present'

      return {
        title: formatName,
        subtitle: `Started: ${start}, Ended: ${end}`,
        media: GiSuitcase,
      }
    },
  },
})
