"use client"

import React, { useState } from 'react'
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
  const [openTalkId, setOpenTalkId] = useState<string | null>(null);
  const toggleMenu = (talkId: string) => {
    setOpenTalkId((currentId) => currentId === talkId ? null : talkId);
  }
  return (
    // section conatiner
    <section>
      {/* section Title */}
      <p className="text-preset-6-extraBold text-(--green-200) mb-5 min-[1130px]:mb-8">{"// SCHEDULE_HIGHLIGHTS"}</p>
      {/* Highlights container */}
      <div className='flex flex-col gap-4'>
        {highlightedTalks.map((talk) => {
          const speaker = speakerById[talk.speakerId];
          const track = trackById[talk.trackId];
          const isDetailsOpen = openTalkId === talk.id;
          return (
            // Each Single Component Container
            <div key={talk.id} className='flex flex-col border border-(--neutral-600) sm:flex-row' >
              <p style={{ color: track.color }} className='text-preset-6-medium text-center py-2.5 sm:[writing-mode:vertical-rl] sm:rotate-180'>{track.name.toUpperCase()}</p>
              {/* MAIN COMPONENT CONTENT CONTAINER */}
              <div style={{ backgroundColor: track.color }} className='text-(--neutral-900) w-full sm:flex  justify-between'>
                <div className='py-4 px-4 flex flex-col gap-3'>
                  {/* TITE + 'SPEAKER + COMPANY' */}
                  <div className='space-y-2'>
                    <p className='text-preset-2-responsive '>{talk.title.toLowerCase()}</p>
                    {/* SPEAKER + COMPANY */}
                    <div className='flex gap-2.5'>
                      <p className='text-preset-5-bold'>{speaker.name.toUpperCase()} {"//"} </p>
                      <p className='text-preset-5 text-(--neutral-600)'>{speaker.company.toUpperCase()}</p>
                    </div>
                  </div>
                  {/* CONDITIONAL RENDERED DETAILS */}
                  {isDetailsOpen && (
                    <p className='text-preset-6'>{talk.description}</p>
                  )}
                  {/* BUTTON TO CHNAGE STATE FOR DETAILS */}
                  <button type='button' aria-expanded={isDetailsOpen} onClick={() => toggleMenu(talk.id)} className='flex gap-1 items-center w-fit'>
                    <Image src={isDetailsOpen ? '/images/icon-minus.svg' : '/images/icon-plus.svg'} width={16} height={16} alt='Details menu icon' />
                    <p className='text-preset-7 text-(--neutral-600)'>{isDetailsOpen ? "HIDE DEATILS" : "SHOW DETAILS"}</p>
                  </button>

                </div>
                {/* START/END TIME BARCODE CONTAINER */}
                <div className='flex justify-between items-center px-4 py-2.5 border-t-2 border-dashed sm:flex-col sm:justify-center sm:border-l sm:border-t-0 sm:space-y-2 '>
                  <div className='text-center'>
                    <p className='text-preset-4'>{talk.startTime}</p>
                    <p className='text-preset-7'>{talk.endTime}</p>
                  </div>
                  <div className='relative w-30.5 h-10'>
                    <Image src="/images/pattern-barcode.svg" fill alt='talk barcode' />
                  </div>

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
