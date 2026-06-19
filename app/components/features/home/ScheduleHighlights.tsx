"use client"

import React, { useState } from 'react'
import type { Track } from '@/types/tracks'
import type { Speaker } from '@/types/speaker'
import type { Talk } from '@/types/talks'
import TalkHighlightCard from '../shared/TalkHighlightCard'
import ButtonMain from '../../ui/ButtonMain'

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

          if (!speaker || !track) {
            return null;
          }

          return (
            <div key={talk.id}>
              <TalkHighlightCard
                track={track}
                speaker={speaker}
                talk={talk}
                isDetailsOpen={isDetailsOpen}
                onToggleDetails={toggleMenu}
              />
            </div>
          )
        })}

        {/* VIEW ALL TRACKS BUTTON */}
        <ButtonMain href='/schedule' className='px-6 py-4 w-fit mx-auto text-preset-5-bold bg-(--green-200) text-(--neutral-900) sm:bg-(--neutral-900) sm:text-(--neutral-100) hover:bg-(--green-200) hover:text-(--neutral-900) mt-10' >VIEW FULL SCHEDULE</ButtonMain>
      </div>

    </section >
  )
}
