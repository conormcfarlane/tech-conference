import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const rootDir = process.cwd()
const sourcePath = join(rootDir, 'data', 'data.json')
const outDir = join(rootDir, 'data', 'sanity-import')

const toPublicAvatarPath = (avatar) => {
    const fileName = avatar.split('/').pop()
    return `/images/${fileName}`
}

const toNdjson = (rows) => rows.map((row) => JSON.stringify(row)).join('\n') + '\n'

const main = async () => {
    const raw = await readFile(sourcePath, 'utf8')
    const data = JSON.parse(raw)

    const tracks = data.tracks.map((track) => ({
        _id: `track-${track.id}`,
        _type: 'track',
        name: track.name,
        description: track.description,
        color: track.color,
    }))

    const speakers = data.speakers.map((speaker) => ({
        _id: `speaker-${speaker.id}`,
        _type: 'speaker',
        name: speaker.name,
        role: speaker.role,
        company: speaker.company,
        avatarPath: toPublicAvatarPath(speaker.avatar),
        bio: speaker.bio,
        featured: Boolean(speaker.featured),
    }))

    const talks = data.talks.map((talk) => ({
        _id: `talk-${talk.id}`,
        _type: 'talk',
        title: talk.title,
        speaker: {
            _type: 'reference',
            _ref: `speaker-${talk.speakerId}`,
        },
        track: {
            _type: 'reference',
            _ref: `track-${talk.trackId}`,
        },
        day: talk.day,
        startTime: talk.startTime,
        endTime: talk.endTime,
        location: talk.location,
        description: talk.description,
        highlighted: Boolean(talk.highlighted),
    }))

    await mkdir(outDir, { recursive: true })

    await Promise.all([
        writeFile(join(outDir, 'tracks.ndjson'), toNdjson(tracks), 'utf8'),
        writeFile(join(outDir, 'speakers.ndjson'), toNdjson(speakers), 'utf8'),
        writeFile(join(outDir, 'talks.ndjson'), toNdjson(talks), 'utf8'),
    ])

    console.log(`Generated ${tracks.length} tracks -> data/sanity-import/tracks.ndjson`)
    console.log(`Generated ${speakers.length} speakers -> data/sanity-import/speakers.ndjson`)
    console.log(`Generated ${talks.length} talks -> data/sanity-import/talks.ndjson`)
}

main().catch((error) => {
    console.error(error)
    process.exit(1)
})
