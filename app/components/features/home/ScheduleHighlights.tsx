import React from 'react'
import type { Track } from '@/types/tracks'
import type { Speaker } from '@/types/speaker'
import type { Talk } from '@/types/talks'
import Image from 'next/image'

type ScheduleHighlightsProps = {
  tracks: Track[];
  speakers: Speaker[];
  talks: Talk[];
}
export default function ScheduleHighlights({ tracks, speakers, talks }: ScheduleHighlightsProps) {
  const highlightedTalks = talks?.filter((talk) => talk.highlighted === true)
  const speakerById = Object.fromEntries(speakers.map(speaker => [speaker.id, speaker]));
  const trackById = Object.fromEntries(tracks?.map((track => [track.id, track])));

  return (
    <section className=''>
      <p className="text-preset-6-extraBold text-(--green-200) mb-5 min-[1130px]:mb-8">{"// SCHEDULE_HIGHLIGHTS"}</p>
      <div className='flex flex-col gap-4'>
        {highlightedTalks.map((talk) => {
          const speaker = speakerById[talk.speakerId];
          const track = trackById[talk.trackId]
          return (

            <div key={talk.id} className='flex flex-col border border-(--neutral-600) sm:flex-row' >
              <p style={{ color: track.color }} className='text-preset-6-medium text-center py-2.5 sm:[writing-mode:vertical-rl] sm:rotate-180'>{track.name}</p>
              <div style={{ backgroundColor: track.color }} className='text-(--neutral-900) w-full'>
                <div className='py-4 px-4'>
                  <p className='text-preset-2-mobile'>{talk.title}</p>
                  <div className='flex gap-2.5'>
                    <p className='text-preset-5-bold'>{speaker.name} {"//"} </p>
                    <p className='text-preset-5 text-(--neutral-600)'>{speaker.company}</p>
                  </div>

                </div>

                <div className='flex justify-between items-center px-4 py-2.5 border-t-2 border-dashed'>
                  <div className='text-center'>
                    <p className='text-preset-4'>{talk.startTime}</p>
                    <p className='text-preset-7'>{talk.endTime}</p>
                  </div>
                  <Image src="/images/pattern-barcode.svg" width={122} height={40} alt='talk barcode' />
                  <p className='text-preset-7'>DAY {talk.day}</p>
                </div>


              </div>
            </div>
          )

        })}
      </div>
    </section >
  )
}
