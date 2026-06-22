"use client"
import React, { useEffect, useMemo, useState } from 'react'
import type { Speaker } from '@/types/speaker'
import type { Track } from '@/types/tracks'
import type { Talk } from '@/types/talks'
import TalkHighlightCard from '../components/features/shared/TalkHighlightCard'
import { client } from '@/sanity/lib/client'
import { SPEAKERS_QUERY, TALKS_QUERY, TRACKS_QUERY, toSpeaker, toTalk, toTrack } from '@/sanity/lib/queries'

export default function SchedulePage() {
  const [selectedDay, setSelectedDay] = useState<number>(1)
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null)
  const [openTalkId, setOpenTalkId] = useState<string | null>(null)

  const [speakers, setSpeakers] = useState<Speaker[]>([])
  const [talks, setTalks] = useState<Talk[]>([])
  const [tracks, setTracks] = useState<Track[]>([])

  useEffect(() => {
    let mounted = true

    const loadData = async () => {
      const [rawSpeakers, rawTalks, rawTracks] = await Promise.all([
        client.fetch(SPEAKERS_QUERY),
        client.fetch(TALKS_QUERY),
        client.fetch(TRACKS_QUERY),
      ])

      if (!mounted) {
        return
      }

      setSpeakers(rawSpeakers.map(toSpeaker))
      setTalks(rawTalks.map(toTalk))
      setTracks(rawTracks.map(toTrack))
    }

    loadData().catch((error) => {
      console.error('Failed to load schedule data from Sanity', error)
    })

    return () => {
      mounted = false
    }
  }, [])

  const filteredTracks = useMemo(() => tracks.filter((track) => track.name !== 'Keynote'), [tracks])
  const dayFilteredTalks = useMemo(() => talks.filter((talk) => talk.day === selectedDay), [talks, selectedDay])

  const filteredSchedule = useMemo(
    () => dayFilteredTalks.filter((talk) => (!selectedTrack ? true : talk.trackId === selectedTrack)),
    [dayFilteredTalks, selectedTrack],
  )

  const speakerById = useMemo(() => Object.fromEntries(speakers.map((speaker) => [speaker.id, speaker])), [speakers])
  const trackById = useMemo(() => Object.fromEntries(tracks.map((track) => [track.id, track])), [tracks])

  const toggleMenu = (talkId: string) => {
    setOpenTalkId((currentId) => (currentId === talkId ? null : talkId))
  }

  const dayButtons = [
    { id: 1, label: 'DAY 01' },
    { id: 2, label: 'DAY 02' },
    { id: 3, label: 'DAY 03' },
  ]

  const trackButtons = filteredTracks.map((track) => ({
    id: track.id,
    shortLabel: track.name === 'Accessibility' ? 'A11Y' : track.name,
    fullLabel: track.name,
  }))

  return (
    <section>
      <p className='text-preset-2-responsive text-(--green-200) mb-6'>{'// schedule'}</p>
      <div className='flex flex-col gap-3.5 lg:flex-row items-top'>
        <div className='flex gap-2.5 h-fit'>
          {dayButtons.map((dayButton) => {
            return (
              <button
                type='button'
                key={dayButton.id}
                className={`py-2 px-4 border text-preset-6-medium ${selectedDay === dayButton.id ? 'text-(--neutral-900) bg-(--green-200)' : 'text-(--neutral-100)'}`}
                onClick={() => setSelectedDay(dayButton.id)}
              >
                {dayButton.label}
              </button>
            )
          })}
        </div>
        <div className='flex gap-2.5 flex-wrap w-fit pb-6'>
          {trackButtons.map((track) => (
            <button
              key={track.id}
              type='button'
              className={`py-2 px-4 border rounded-full text-preset-6-medium ${selectedTrack === track.id ? 'text-(--neutral-900) bg-(--green-200)' : 'text-(--neutral-100)'}`}
              onClick={() => setSelectedTrack(track.id)}
              aria-label={track.fullLabel}
            >
              <span className='sm:hidden'>{track.shortLabel}</span>
              <span className='hidden sm:inline'>{track.fullLabel}</span>
            </button>
          ))}
          <button
            type='button'
            className={`py-2 px-4 border rounded-full text-preset-6-medium ${selectedTrack ? 'text-red-400' : 'text-(--neutral-500)'}`}
            onClick={() => setSelectedTrack(null)}
            disabled={!selectedTrack}
          >
            CLEAR
          </button>
        </div>
      </div>

      <div className='border-t pt-6 border-(--neutral-600)'>
        <div className='flex flex-col gap-4 '>
          {filteredSchedule.map((talk) => {
            const speaker = speakerById[talk.speakerId]
            const track = trackById[talk.trackId]
            const isDetailsOpen = openTalkId === talk.id

            if (!speaker || !track) {
              return null
            }

            return (
              <div key={talk.id}>
                <TalkHighlightCard
                  track={track}
                  speaker={speaker}
                  talk={talk}
                  isDetailsOpen={isDetailsOpen}
                  onToggleDetails={toggleMenu}
                />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
