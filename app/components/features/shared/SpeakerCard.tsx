import React from 'react'
import Image from 'next/image'
import { ImageUrlHelper } from '@/utils/ImageHelper'
import type { Speaker } from '@/types/speaker'

type SpeakerCardProps = {
    speaker: Speaker;
    talkName: string;
    backgroundColor?: string;
    onSelectSpeaker: (speaker: Speaker) => void;
}

export default function SpeakerCard({ speaker, talkName, backgroundColor, onSelectSpeaker }: SpeakerCardProps) {
    const imagePath = ImageUrlHelper(speaker.avatar);

    return (
        <button type='button' onClick={() => onSelectSpeaker(speaker)} className='flex flex-col  bg-(--neutral-800) border border-(--neutral-600) text-left hover-border-shadow '>
            <div style={{ backgroundColor }}>
                <Image src={imagePath} width={318} height={250} alt='avatar' className='overflow-hidden h-60 mx-auto' />
            </div>
            <div className='flex flex-col justify-between p-4'>
                <div className='h-20 border-b border-b-(--neutral-600) pb-3'>
                    <p className='text-preset-3'>{speaker.name.toLowerCase()}</p>
                    <p className='text-preset-6-medium text-(--neutral-200)'>{speaker.role.toUpperCase()} @ {speaker.company.toUpperCase()}</p>
                </div>
                <div>
                    <p className='text-preset-6-medium text-(--green-200) pt-4'>{talkName.toUpperCase()}</p>
                </div>
            </div>
        </button>
    )
}