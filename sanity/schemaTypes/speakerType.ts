import { UserIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const speakerType = defineType({
    name: 'speaker',
    title: 'Speaker',
    type: 'document',
    icon: UserIcon,
    fields: [
        defineField({
            name: 'name',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'role',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'company',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'avatarPath',
            title: 'Avatar Path',
            type: 'string',
            description: 'Public image path used by the app, e.g. /images/avatar-name.webp',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'bio',
            type: 'text',
            rows: 5,
        }),
        defineField({
            name: 'featured',
            type: 'boolean',
            initialValue: false,
        }),
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'company',
        },
        prepare(selection) {
            const { title, subtitle } = selection
            return {
                title,
                subtitle,
            }
        },
    },
})
