import React from 'react'
import type { Speaker } from '@/types/speaker'
import type { Track } from '@/types/tracks'
import type { Talk } from '@/types/talks'
import ButtonMain from '../../ui/ButtonMain'
import SpeakerCard from '../shared/SpeakerCard'


type FeaturedSpeakersListProps = {
    speakers: Speaker[];
    talks: Talk[];
    tracks: Track[];
}
export default function FeaturedSpeakersList({ speakers, talks, tracks }: FeaturedSpeakersListProps) {
    const featuredSpeakers = speakers.filter((speaker) => speaker.featured == true)
    const trackColorById = new Map(tracks.map((track) => [track.id, track.color]));
    const talkBySpeakerId = new Map(
        talks.map((talk) => [talk.speakerId, talk])
    );
    const featuredSpeakersWithColor = featuredSpeakers.map((speaker) => {
        const talk = talkBySpeakerId.get(speaker.id);
        const trackId = talk?.trackId;
        const fallbackColor = '#B5E9FC';
        const backgroundColor = trackId ? trackColorById.get(trackId) : fallbackColor;

        return {
            ...speaker,
            backgroundColor,
            talkName: talk?.title ?? "TBA"
        };
    });

    return (
        // SECTION CONTAINER
        <section className='flex flex-col justify-center'>
            {/* TITLE */}
            <p className="text-preset-6-extraBold text-(--green-200) mb-5 min-[1130px]:mb-8">{"// FEATURED SPEAKERS"}</p>
            {/* GRID CONTAINER */}
            <div className='grid md:grid-cols-2 gap-5 xl:grid-cols-4'>
                {featuredSpeakersWithColor.map((speaker) => {
                    return (
                        <SpeakerCard
                            key={speaker.id}
                            speaker={speaker}
                            talkName={speaker.talkName}
                            backgroundColor={speaker.backgroundColor}
                        />
                    )

                })}
            </div>
            {/* VIEW ALL SPEAKERS BUTTON */}
            <ButtonMain href='/speakers' className='px-6 py-4 w-55.25 mx-auto text-preset-5-bold bg-(--green-200) text-(--neutral-900) sm:bg-(--neutral-900) sm:text-(--neutral-100)' >VIEW ALL SPEAKERS</ButtonMain>
        </section>
    )
}
