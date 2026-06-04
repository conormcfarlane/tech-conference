import React from 'react'
import { Speaker } from '@/types/speaker'
import { Talks } from '@/types/talks';
import Image from 'next/image';

type FeaturedSpeakerProps = {
    speakers: Speaker[] | null;
    talks: Talks[];
}

export default function FeaturedSpeaker({ speakers, talks }: FeaturedSpeakerProps) {
    const featuredSpeaker = speakers?.find((speaker) => speaker.featured) ?? null;
    const featuredSpeakersTalk = talks.find((talk) => talk.speakerId === featuredSpeaker?.id)

    const dayLabels: Record<number, string> = {
        1: 'Nov 15',
        2: 'Nov 16',
        3: 'Nov 17',
    }

    const talkDate = featuredSpeakersTalk ? dayLabels[featuredSpeakersTalk.day] : null;

    // Image Helper
    const avatarLabel = featuredSpeaker?.avatar;
    const imageLabel = avatarLabel?.split("/").pop();
    const avatarUrl = `/images/${imageLabel}`;


    return (
        <section className='grid grid-cols-2 lg:grid-cols-[45%_55%] bg-(--cyan-100) text-(--neutral-900) overflow-visible lg:h-full'>
            <div className='flex flex-col space-y-5 p-6 lg:pr-0 bg-red-500'>
                <div>
                    <h2 className='text-preset-6 mb-4'>{"// FEATURED KEYNOTE"}</h2>

                    <p className='text-preset-2 mb-2'>{featuredSpeaker?.name.toLocaleLowerCase()}</p>
                    <p className='text-preset-6-medium'>{featuredSpeaker?.role.toLocaleUpperCase()}</p>
                    <p className='text-preset-6-medium'>{featuredSpeaker?.company.toLocaleUpperCase()}</p>
                </div>
                <div className='pt-10'>
                    <p className='text-preset-5-bold mb-2'>{featuredSpeakersTalk?.title.toLocaleUpperCase()}</p>
                    <p className='text-preset-6-medium'>{talkDate} / {featuredSpeakersTalk?.startTime} / {featuredSpeakersTalk?.location.toLocaleUpperCase()}</p>
                </div>
                <button className='flex mt-auto border-shadow px-6 py-4 w-fit'>
                    <p className='text-preset-5-bold'>View Talk</p>
                    <Image src="/images/icon-arrow-right.svg" width={20} height={20} alt='view more button arrow' />
                </button>
            </div>
            <div className='hidden sm:block relative w-[120%] h-full self-end justify-self-end lg:w-[130%]'>
                <Image fill={true} src={avatarUrl} alt='Speakers Avatar' className=' translate-x-15 ' />
            </div>


        </section>
    )
}
