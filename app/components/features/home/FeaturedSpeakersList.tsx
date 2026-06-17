import React from 'react'
import type { Speaker } from '@/types/speaker'
import type { Track } from '@/types/tracks'
import type { Talk } from '@/types/talks'
import Image from 'next/image'
import { ImageUrlHelper } from '@/utils/ImageHelper'
import ButtonMain from '../../ui/ButtonMain'


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
        <section className='flex flex-col justify-center'>
            <p className="text-preset-6-extraBold text-(--green-200) mb-5 min-[1130px]:mb-8">{"// FEATURED SPEAKERS"}</p>
            <div className='grid md:grid-cols-2 gap-5 xl:grid-cols-4'>
                {featuredSpeakersWithColor.map((speaker) => {
                    const imagepath = ImageUrlHelper(speaker.avatar);
                    return (
                        <div key={speaker.id} className='flex flex-col'>
                            <div style={{ backgroundColor: speaker.backgroundColor }} ><Image src={imagepath} width={318} height={250} alt="avatar" className='overflow-hidden h-60 mx-auto' /></div>
                            <div className='flex flex-col justify-between p-4'>
                                <div className='h-20 border-b border-b-(--neutral-600) pb-3'>
                                    <p className='text-preset-3'>{speaker.name.toLowerCase()}</p>
                                    <p className='text-preset-6-medium text-(--neutral-200)' >{speaker.role.toUpperCase()} @ {speaker.company.toUpperCase()}</p>
                                </div>
                                <div><p className='text-preset-6-medium text-(--green-200) pt-4 '>{speaker.talkName.toUpperCase()}</p></div>
                            </div>
                        </div>
                    )

                })}
            </div>
            <ButtonMain href='/speaker' className='px-6 py-4 w-55.25 mx-auto text-preset-5-bold bg-(--green-200) text-(--neutral-900) sm:bg-(--neutral-900) sm:text-(--neutral-100)' >VIEW ALL SPEAKERS</ButtonMain>
        </section>
    )
}
