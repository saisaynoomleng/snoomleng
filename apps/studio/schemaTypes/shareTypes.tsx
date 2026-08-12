import {formatTitle} from '@snoomleng/utils'
import {CiLink} from 'react-icons/ci'
import {MdOutline10K} from 'react-icons/md'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const imageWithAlt = defineType({
  name: 'imageWithAlt',
  type: 'image',
  fields: [
    defineField({
      name: 'alt',
      title: 'Alternative Text',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
  options: {
    hotspot: true,
  },
})

export const blockContent = defineType({
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H1', value: 'h1'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'H4', value: 'h4'},
        {title: 'Quote', value: 'blockquote'},
      ],
      lists: [{title: 'Bullet', value: 'bullet'}],
      marks: {
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
          {
            title: 'Highlight',
            value: 'highlight',
            component: (props) => (
              <span style={{backgroundColor: '#2d93ad'}}>{props.children}</span>
            ),
            icon: MdOutline10K,
          },
        ],
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'imageWithAlt',
    }),
  ],
})

export const seo = defineType({
  name: 'seo',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      type: 'string',
    }),
    defineField({
      name: 'metaDescription',
      type: 'text',
    }),
    defineField({
      name: 'ogImage',
      type: 'imageWithAlt',
    }),
    defineField({
      name: 'noIndex',
      type: 'boolean',
    }),
  ],
})

export const socialLink = defineType({
  name: 'socialLink',
  type: 'object',
  fields: [
    defineField({
      name: 'platform',
      type: 'string',
      options: {
        list: [
          {title: 'LinkedIn', value: 'linked-in'},
          {title: 'GitHub', value: 'git-hub'},
          {title: 'LeetCode', value: 'leet-code'},
        ],
      },
    }),
    defineField({
      name: 'url',
      type: 'url',
    }),
  ],
  preview: {
    select: {
      name: 'platform',
    },
    prepare({name}) {
      return {
        title: name ? formatTitle(name) : 'Platform not provided',
        media: CiLink,
      }
    },
  },
})
