import React from 'react'
import type { Speaker } from '@/types/speaker'
import Image from 'next/image'
import { ImageUrlHelper } from '@/utils/ImageHelper'

type FeaturedSpeakersListProps = {
    speakers: Speaker[];
}
export default function FeaturedSpeakersList({ speakers }: FeaturedSpeakersListProps) {

    const featuredSpeakers = speakers.filter((speaker) => speaker.featured == true)

    return (
        <section>
            <p className="text-preset-6-extraBold text-(--green-200) mb-5 min-[1130px]:mb-8">{"// FEATURED SPEAKERS"}</p>
            <div>
                {featuredSpeakers.map((speaker) => {
                    const imagepath = ImageUrlHelper(speaker.avatar);
                    console.log(imagepath)
                    return (
                        <div key={speaker.id} className='grid'>
                            <div><Image src={imagepath} width={318} height={250} alt="avatar" /></div>
                            <div>
                                <div>
                                    <p>{speaker.name}</p>
                                    <p>{speaker.role}</p>
                                    <p>{speaker.company}</p>
                                </div>
                                <div><p>The next frontier</p></div>
                            </div>
                        </div>
                    )

                })}
            </div>
        </section>
    )
}
