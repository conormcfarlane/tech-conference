import { DocumentsIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const talkType = defineType({
    name: 'talk',
    title: 'Talk',
    type: 'document',
    icon: DocumentsIcon,
    fields: [
        defineField({
            name: 'title',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'speaker',
            type: 'reference',
            to: [{ type: 'speaker' }],
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'track',
            type: 'reference',
            to: [{ type: 'track' }],
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'day',
            type: 'number',
            validation: (rule) => rule.required().min(1).max(3),
        }),
        defineField({
            name: 'startTime',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'endTime',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'location',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'description',
            type: 'text',
            rows: 5,
        }),
        defineField({
            name: 'highlighted',
            type: 'boolean',
            initialValue: false,
        }),
    ],
    preview: {
        select: {
            title: 'title',
            day: 'day',
            startTime: 'startTime',
            speakerName: 'speaker.name',
        },
        prepare(selection) {
            const { title, day, startTime, speakerName } = selection as {
                title?: string
                day?: number
                startTime?: string
                speakerName?: string
            }

            return {
                title,
                subtitle: `Day ${day ?? '?'} - ${startTime ?? 'TBD'} - ${speakerName ?? 'Unknown speaker'}`,
            }
        },
    },
})
