import { defineField, defineType } from 'sanity'

export const homepageType = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Homepage',
    }),
    defineField({
      name: 'siteSettings',
      title: 'Site Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'logo',
          title: 'Site Logo',
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
              initialValue: 'KIIL',
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'heroSection',
      title: 'Hero Section',
      type: 'object',
      fields: [
        defineField({
          name: 'mainHeading',
          title: 'Main Heading',
          type: 'string',
          initialValue: 'Timeless Design',
        }),
        defineField({
          name: 'subHeading',
          title: 'Sub Heading',
          type: 'string',
          initialValue: 'for Modern Living',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 3,
          initialValue: 'Discover our curated collection of sophisticated furniture and home accessories, thoughtfully designed to create spaces that inspire and endure.',
        }),
        defineField({
          name: 'heroImage',
          title: 'Hero Image',
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
              description: 'Important for SEO and accessibility.',
              initialValue: 'Elegant living room with sophisticated furniture',
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'categorySection',
      title: 'Shop by Category Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Shop by Category',
        }),
        defineField({
          name: 'description',
          title: 'Section Description',
          type: 'text',
          initialValue: 'From statement furniture to refined accessories, find everything you need to create your perfect space.',
        }),
        defineField({
          name: 'categories',
          title: 'Categories',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Category Title',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'description',
                  title: 'Category Description',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'image',
                  title: 'Category Image',
                  type: 'image',
                  options: {
                    hotspot: true,
                  },
                  fields: [
                    {
                      name: 'alt',
                      type: 'string',
                      title: 'Alternative Text',
                      validation: (Rule) => Rule.required(),
                    },
                  ],
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'link',
                  title: 'Category Link',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
              ],
              preview: {
                select: {
                  title: 'title',
                  subtitle: 'description',
                  media: 'image',
                },
              },
            },
          ],
          validation: (Rule) => Rule.min(1).max(6),
        }),
      ],
    }),
    defineField({
      name: 'brandLogos',
      title: 'Brand Logos',
      type: 'object',
      fields: [
        defineField({
          name: 'montanaLogo',
          title: 'Montana Logo',
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
              initialValue: 'Montana',
            },
          ],
        }),
        defineField({
          name: 'umageLogo',
          title: 'Umage Logo',
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
              initialValue: 'Umage',
            },
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'heroSection.heroImage',
    },
  },
})
