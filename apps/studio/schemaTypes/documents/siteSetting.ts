import {defineArrayMember, defineField, defineType} from 'sanity'
import {CiSettings, CiLink} from 'react-icons/ci'

export const siteSetting = defineType({
  name: 'siteSetting',
  type: 'document',
  icon: CiSettings,
  groups: [
    {title: 'Branding', name: 'branding'},
    {title: 'Navigation', name: 'navigation'},
    {title: 'Footer', name: 'footer'},
  ],
  fields: [
    // branding
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      group: 'branding',
    }),
    defineField({
      name: 'primaryLogo',
      title: 'Primary Logo',
      type: 'imageWithAlt',
      validation: (rule) => rule.required(),
      group: 'branding',
    }),
    defineField({
      name: 'secondaryLogo',
      title: 'Secondary Logo',
      type: 'imageWithAlt',
      validation: (rule) => rule.required(),
      group: 'branding',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [{type: 'socialLink'}],
      group: 'branding',
    }),
    defineField({
      name: 'contactInfo',
      type: 'object',
      group: 'branding',
      fields: [
        defineField({
          name: 'email',
          title: 'Email',
          type: 'email',
        }),
        defineField({
          name: 'linkedInUrl',
          title: 'LinkedIn URL',
          type: 'url',
        }),
        defineField({
          name: 'leetCodeURL',
          title: 'LeetCode URL',
          type: 'url',
        }),
        defineField({
          name: 'gitHubURL',
          title: 'GitHub URL',
          type: 'string',
        }),
        defineField({
          name: 'city',
          title: 'City',
          type: 'string',
        }),
        defineField({
          name: 'state',
          title: 'State',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'mode',
      type: 'array',
      title: 'Current Mode',
      of: [{type: 'string'}],
      group: 'branding',
    }),
    defineField({
      name: 'isAvailable',
      title: 'Is currently available for hiring?',
      type: 'boolean',
      initialValue: true,
      group: 'branding',
    }),
    defineField({
      name: 'availability',
      type: 'text',
      group: 'branding',
    }),

    // navigation
    defineField({
      name: 'navigation',
      type: 'array',
      group: 'navigation',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'navLink',
          icon: CiLink,
          fields: [
            defineField({
              name: 'label',
              title: 'Link Label',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'href',
              title: 'URL to the link',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'isButton',
              type: 'boolean',
              initialValue: false,
              title: 'Is this link rendered as button?',
            }),
          ],
        }),
      ],
    }),

    // footer
    defineField({
      name: 'footerColumns',
      title: 'Footer',
      group: 'footer',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'footerColumn',
          icon: CiLink,
          type: 'object',
          fields: [
            defineField({
              name: 'columnTitle',
              type: 'string',
            }),
            defineField({
              name: 'columnLinks',
              type: 'array',
              of: [
                defineArrayMember({
                  name: 'columnLink',
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'label',
                      title: 'Label',
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
        }),
      ],
    }),
  ],
})
