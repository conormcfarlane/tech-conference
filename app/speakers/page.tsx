"use client"
import React, { useEffect, useState } from 'react'
import type { Speaker } from '@/types/speaker'
import type { Track } from '@/types/tracks'
import type { Talk } from '@/types/talks'
import SpeakerCard from '../components/features/shared/SpeakerCard'
import SpeakerModal from '../components/features/shared/SpeakerModal'
import { buildSpeakerCardModels } from '@/app/lib/speakerCards'
import { client } from '@/sanity/lib/client'
import { SPEAKERS_QUERY, TALKS_QUERY, TRACKS_QUERY, toSpeaker, toTalk, toTrack } from '@/sanity/lib/queries'

export default function SpeakerPageList() {
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null)
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
      console.error('Failed to load speakers data from Sanity', error)
    })

    return () => {
      mounted = false
    }
  }, [])

  const speakerCards = buildSpeakerCardModels(speakers, talks, tracks)
  const selectedCard =
    selectedSpeaker ? (speakerCards.find((card) => card.speaker.id === selectedSpeaker.id) ?? null) : null

  useEffect(() => {
    document.body.style.overflow = selectedSpeaker ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [selectedSpeaker])

  return (
    <section className='flex flex-col justify-center'>
      <p className='text-preset-2-responsive text-(--green-200) mb-5 min-[1130px]:mb-8'>{'// speakers'}</p>
      <div className='grid sm:grid-cols-2 gap-5 xl:grid-cols-4 p-0.5'>
        {speakerCards.map((card) => {
          return (
            <SpeakerCard
              key={card.speaker.id}
              speaker={card.speaker}
              talkName={card.talkName}
              backgroundColor={card.backgroundColor}
              onSelectSpeaker={setSelectedSpeaker}
            />
          )
        })}
      </div>

      {selectedCard && selectedCard.talk && selectedCard.track && (
        <SpeakerModal
          speaker={selectedCard.speaker}
          talk={selectedCard.talk}
          track={selectedCard.track}
          onClose={() => setSelectedSpeaker(null)}
        />
      )}
    </section>
  )
}
