import React from 'react'
import type { Speaker } from '@/types/speaker'
import type { Track } from '@/types/tracks'
import type { Talk } from '@/types/talks'
import Image from 'next/image'
import { ImageUrlHelper } from '@/utils/ImageHelper'


type FeaturedSpeakersListProps = {
    speakers: Speaker[];
    talks: Talk[];
    tracks: Track[];
}
export default function FeaturedSpeakersList({ speakers, talks, tracks }: FeaturedSpeakersListProps) {

    const featuredSpeakers = speakers.filter((speaker) => speaker.featured == true)
    // track.id + track.color
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
        <section>
            <p className="text-preset-6-extraBold text-(--green-200) mb-5 min-[1130px]:mb-8">{"// FEATURED SPEAKERS"}</p>
            <div className='grid md:grid-cols-2 gap-5 xl:grid-cols-4'>
                {featuredSpeakersWithColor.map((speaker) => {
                    const imagepath = ImageUrlHelper(speaker.avatar);
                    return (
                        <div key={speaker.id} className='flex flex-col'>
                            <div style={{ backgroundColor: speaker.backgroundColor }} ><Image src={imagepath} width={318} height={250} alt="avatar" className='overflow-hidden h-60 mx-auto' /></div>
                            <div className='flex flex-col justify-between h-full p-4'>
                                <div className=' pb-3'>
                                    <p className='text-preset-3'>{speaker.name.toLowerCase()}</p>
                                    <p className='text-preset-6-medium text-(--neutral-200)' >{speaker.role.toUpperCase()} @ {speaker.company.toUpperCase()}</p>
                                </div>
                                <div><p className='text-preset-6-medium text-(--green-200) border-t border-t-(--neutral-600) pt-3'>{speaker.talkName.toUpperCase()}</p></div>
                            </div>
                        </div>
                    )

                })}
            </div>
        </section>
    )
}
