"use client"
import React, { useState, useEffect } from 'react'
import type { Speaker } from '@/types/speaker'
import type { Track } from '@/types/tracks'
import type { Talk } from '@/types/talks'
import techConferenceData from '@/data/data.json'
import SpeakerCard from '../components/features/shared/SpeakerCard'
import SpeakerModal from '../components/features/shared/SpeakerModal'
import { buildSpeakerCardModels } from '@/app/lib/speakerCards'

export default function SpeakerPageList() {

  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null)

  const speakers = techConferenceData.speakers as Speaker[];
  const talks = techConferenceData.talks as Talk[];
  const tracks = techConferenceData.tracks as Track[];

  const speakerCards = buildSpeakerCardModels(speakers, talks, tracks);
  const selectedCard =
    selectedSpeaker ? (speakerCards.find((card) => card.speaker.id === selectedSpeaker.id) ?? null)
      : null;

      // Stops scrolling while modal open
  useEffect(() => {
    document.body.style.overflow = selectedSpeaker ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [selectedSpeaker])
  return (
    // SECTION CONTAINER
    <section className='flex flex-col justify-center'>
      {/* TITLE */}
      <p className="text-preset-2-responsive text-(--green-200) mb-5 min-[1130px]:mb-8">{"// speakers"}</p>
      {/* GRID CONTAINER */}
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