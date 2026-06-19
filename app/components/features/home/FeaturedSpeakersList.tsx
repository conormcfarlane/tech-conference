"use client"
import React, { useState, useEffect } from 'react'
import type { Speaker } from '@/types/speaker'
import type { Track } from '@/types/tracks'
import type { Talk } from '@/types/talks'
import ButtonMain from '../../ui/ButtonMain'
import SpeakerCard from '../shared/SpeakerCard'
import SpeakerModal from '../shared/SpeakerModal'
import { buildSpeakerCardModels } from '@/app/lib/speakerCards'


type FeaturedSpeakersListProps = {
    speakers: Speaker[];
    talks: Talk[];
    tracks: Track[];
}
export default function FeaturedSpeakersList({ speakers, talks, tracks }: FeaturedSpeakersListProps) {
    const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null)

    const featuredSpeakers = speakers.filter((speaker) => speaker.featured == true)
    const speakerCards = buildSpeakerCardModels(featuredSpeakers, talks, tracks);
    const selectedCard = selectedSpeaker
        ? (speakerCards.find((card) => card.speaker.id === selectedSpeaker.id) ?? null)
        : null;

    useEffect(() => {
        document.body.style.overflow = selectedSpeaker ? 'hidden' : ''
        return () => {
            document.body.style.overflow = ''
        }
    }, [selectedSpeaker])

    return (
        // SECTION CONTAINER
        <section className='flex flex-col justify-center space-y-12'>
            {/* TITLE */}
            <p className="text-preset-6-extraBold text-(--green-200) mb-5 min-[1130px]:mb-8">{"// FEATURED SPEAKERS"}</p>
            {/* GRID CONTAINER */}
            <div className='grid md:grid-cols-2 gap-5 xl:grid-cols-4'>
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
            {/* VIEW ALL SPEAKERS BUTTON */}
            <ButtonMain href='/speakers' className='px-6 py-4 w-55.25 mx-auto text-preset-5-bold bg-(--green-200) text-(--neutral-900) sm:bg-(--neutral-900) sm:text-(--neutral-100)
            hover:bg-(--green-200) hover:text-(--neutral-900)' >VIEW ALL SPEAKERS</ButtonMain>

            {/* MODAL */}
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
