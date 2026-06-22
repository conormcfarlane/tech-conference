import { groq } from 'next-sanity'
import type { Speaker } from '@/types/speaker'
import type { Talk } from '@/types/talks'
import type { Track } from '@/types/tracks'

type RawSpeaker = {
    _id: string
    name: string
    role: string
    company: string
    avatarPath: string
    bio: string
    featured: boolean
}

type RawTrack = {
    _id: string
    name: string
    description: string
    color: string
}

type RawTalk = {
    _id: string
    title: string
    speaker: { _ref: string }
    day: number
    track: { _ref: string }
    startTime: string | number
    endTime: string | number
    location: string
    description: string
    highlighted: boolean
}
// Needed to strip prefix as Sanity storing as speaker-sp_1
// I'm removing prefix ex. 'speaker' so i can still link all ID's in components
const stripPrefix = (value: string, prefix: string) =>
    value.startsWith(prefix) ? value.slice(prefix.length) : value

export const toSpeaker = (speaker: RawSpeaker): Speaker => ({
    id: stripPrefix(speaker._id, 'speaker-'),
    name: speaker.name,
    role: speaker.role,
    company: speaker.company,
    avatar: speaker.avatarPath,
    bio: speaker.bio,
    featured: speaker.featured,
})

export const toTrack = (track: RawTrack): Track => ({
    id: stripPrefix(track._id, 'track-'),
    name: track.name,
    description: track.description,
    color: track.color,
})

export const toTalk = (talk: RawTalk): Talk => ({
    id: stripPrefix(talk._id, 'talk-'),
    title: talk.title,
    speakerId: stripPrefix(talk.speaker._ref, 'speaker-'),
    day: talk.day,
    trackId: stripPrefix(talk.track._ref, 'track-'),
    startTime: talk.startTime,
    endTime: talk.endTime,
    location: talk.location,
    description: talk.description,
    highlighted: talk.highlighted,
})

export const SPEAKERS_QUERY = groq`
  *[_type == "speaker"] | order(name asc) {
    _id,
    name,
    role,
    company,
    avatarPath,
    bio,
    featured
  }
`

export const TRACKS_QUERY = groq`
  *[_type == "track"] | order(name asc) {
    _id,
    name,
    description,
    color
  }
`

export const TALKS_QUERY = groq`
  *[_type == "talk"] | order(day asc, startTime asc) {
    _id,
    title,
    speaker,
    day,
    track,
    startTime,
    endTime,
    location,
    description,
    highlighted
  }
`
