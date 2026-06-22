import { TagIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const trackType = defineType({
    name: 'track',
    title: 'Track',
    type: 'document',
    icon: TagIcon,
    fields: [
        defineField({
            name: 'name',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'description',
            type: 'text',
            rows: 4,
        }),
        defineField({
            name: 'color',
            type: 'string',
            description: 'Hex color, e.g. #B5E9FC',
            validation: (rule) =>
                rule.required().regex(/^#[0-9A-Fa-f]{6}$/, {
                    name: 'hex color',
                    invert: false,
                }),
        }),
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'description',
        },
    },
})
