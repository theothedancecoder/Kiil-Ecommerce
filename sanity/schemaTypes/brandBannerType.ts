import { defineField, defineType } from 'sanity'

export const brandBannerType = defineType({
  name: 'brandBanner',
  title: 'Brand Banner',
  type: 'document',
  fields: [
    defineField({
      name: 'brandName',
      title: 'Brand Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'brandName',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bannerImage',
      title: 'Banner Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Banner Title',
      type: 'string',
      description: 'Main title displayed on the banner',
    }),
    defineField({
      name: 'subtitle',
      title: 'Banner Subtitle',
      type: 'string',
      description: 'Subtitle or tagline displayed on the banner',
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      initialValue: true,
      description: 'Toggle to enable/disable this banner',
    }),
  ],
  preview: {
    select: {
      title: 'brandName',
      subtitle: 'subtitle',
      media: 'bannerImage',
    },
  },
})
