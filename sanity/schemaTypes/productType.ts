import { TrolleyIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const productType = defineType({
    name: 'product',
    title: 'Products',
    type: 'document',
    icon: TrolleyIcon,
    fields: [
        defineField({
            name: 'name',
            title: 'Product Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'image',
            title: 'Main Product Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Description (English)',
            type: 'text',
            rows: 4,
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'descriptionNo',
            title: 'Description (Norwegian)',
            type: 'text',
            rows: 4,
            description: 'Norwegian translation of the product description',
        }),
        defineField({
            name: 'price',
            title: 'Base Price',
            type: 'number',
            validation: (Rule) => Rule.required().min(0),
        }),
        defineField({
            name: 'brand',
            title: 'Brand',
            type: 'string',
            validation: (Rule) => Rule.required(),
            options: {
                list: [
                    { title: 'Ablo Blommaert', value: 'Ablo Blommaert' },
                    { title: 'Fritz Hansen', value: 'Fritz Hansen' },
                    { title: 'HAY', value: 'HAY' },
                    { title: 'Kartell', value: 'Kartell' },
                    { title: 'Montana', value: 'Montana' },
                    { title: 'Vitra', value: 'Vitra' },
                    { title: 'DUX', value: 'DUX' },
                    { title: 'Eilersen', value: 'Eilersen' },
                    { title: 'Fredericia', value: 'Fredericia' },
                    { title: 'Sibast Furniture', value: 'Sibast Furniture' },
                    { title: 'UMAGE', value: 'UMAGE' },
                    { title: 'Soren Lund', value: 'Soren Lund' },
                    { title: '&Tradition', value: '&Tradition' },
                    { title: 'Audo Copenhagen', value: 'Audo Copenhagen' },
                    { title: 'Jonas Ihreborn', value: 'Jonas Ihreborn' },
                    { title: 'RO Collection', value: 'RO Collection' },
                ],
            },
        }),
        defineField({
            name: 'categories',
            title: 'Categories',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'category' } }],
            validation: (Rule) => Rule.required().min(1),
        }),
        defineField({
            name: 'href',
            title: 'Product URL Path',
            type: 'string',
            description: 'The URL path for this product (e.g., /fritz-hansen/swan-chair)',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'variants',
            title: 'Product Variants',
            type: 'array',
            of: [{
                type: 'object',
                name: 'variant',
                fields: [
                    defineField({
                        name: 'name',
                        title: 'Variant Name',
                        type: 'string',
                        validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                        name: 'image',
                        title: 'Variant Image',
                        type: 'image',
                        options: {
                            hotspot: true,
                        },
                    }),
                    defineField({
                        name: 'color',
                        title: 'Color',
                        type: 'string',
                    }),
                    defineField({
                        name: 'material',
                        title: 'Material',
                        type: 'string',
                    }),
                    defineField({
                        name: 'size',
                        title: 'Size',
                        type: 'string',
                    }),
                    defineField({
                        name: 'price',
                        title: 'Variant Price',
                        type: 'number',
                        description: 'Override price for this variant (optional)',
                        validation: (Rule) => Rule.min(0),
                    }),
                ],
                preview: {
                    select: {
                        title: 'name',
                        subtitle: 'color',
                        media: 'image',
                    },
                    prepare(selection) {
                        const { title, subtitle } = selection;
                        return {
                            title: title,
                            subtitle: subtitle ? `Color: ${subtitle}` : 'No color specified',
                            media: selection.media,
                        };
                    },
                },
            }],
            description: 'Different color, material, or size options for this product',
        }),
        defineField({
            name: 'lifestyleImages',
            title: 'Lifestyle Images',
            type: 'array',
            of: [
                {
                    type: 'image',
                    options: {
                        hotspot: true,
                    },
                }
            ],
            description: 'Additional lifestyle and context images',
        }),
        defineField({
            name: 'roomCategory',
            title: 'Room Category',
            type: 'string',
            options: {
                list: [
                    { title: 'Living Room', value: 'living-room' },
                    { title: 'Dining Room', value: 'dining-room' },
                    { title: 'Bedroom', value: 'bedroom' },
                    { title: 'Office', value: 'office' },
                    { title: 'Outdoor', value: 'outdoor' },
                    { title: 'Kitchen', value: 'kitchen' },
                    { title: 'Bathroom', value: 'bathroom' },
                ],
            },
        }),
        defineField({
            name: 'stock',
            title: 'Stock Quantity',
            type: 'number',
            validation: (Rule) => Rule.min(0),
            initialValue: 0,
        }),
        defineField({
            name: 'inStock',
            title: 'In Stock',
            type: 'boolean',
            initialValue: true,
        }),
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'brand',
            media: 'image',
            price: 'price',
        },
        prepare(selection) {
            const { title, subtitle, price } = selection;
            return {
                title: title,
                subtitle: `${subtitle} - kr ${price?.toLocaleString() || 'N/A'}`,
                media: selection.media,
            };
        },
    },
});



                


