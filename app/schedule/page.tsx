"use client"
import React, { useState } from 'react'
import type { Speaker } from '@/types/speaker'
import type { Track } from '@/types/tracks'
import type { Talk } from '@/types/talks'
import techConferenceData from '@/data/data.json'
import TalkHighlightCard from '../components/features/shared/TalkHighlightCard'
const speakers = techConferenceData.speakers as Speaker[];
const talks = techConferenceData.talks as Talk[];
const tracks = techConferenceData.tracks as Track[];


export default function SchedulePage() {


  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);

  const filteredTracks = tracks.filter((track) => track.name !== 'Keynote');
  const dayFilteredTalks = talks.filter((talk) => talk.day === selectedDay);

  const filteredSchedule = dayFilteredTalks.filter((talk) => {
    if (!selectedTrack) return true
    return talk.trackId === selectedTrack;
  });

  const speakerById = Object.fromEntries(speakers.map(speaker => [speaker.id, speaker]));
  const trackById = Object.fromEntries(tracks?.map((track => [track.id, track])));
  const [openTalkId, setOpenTalkId] = useState<string | null>(null);

  const toggleMenu = (talkId: string) => {
    setOpenTalkId((currentId) => currentId === talkId ? null : talkId);
  }

  const dayButtons = [
    { id: 1, label: 'DAY 01' },
    { id: 2, label: 'DAY 02' },
    { id: 3, label: 'DAY 03' },
  ]
  const trackButtons = filteredTracks.map((track) => ({
    id: track.id,
    shortLabel: track.name === 'Accessibility' ? 'A11Y' : track.name,
    fullLabel: track.name,
  }));

  return (
    <section>
      <p className='text-preset-2-responsive text-(--green-200) mb-6'>{'// schedule'}</p>
      {/* FILTER SECTION */}
      <div className='flex flex-col gap-3.5 lg:flex-row items-top'>
        {/* DAY BUTTONS */}
        <div className='flex gap-2.5 h-fit'>
          {dayButtons.map((dayButton) => {
            return (
              <button type='button' key={dayButton.id} className={`py-2 px-4 border text-preset-6-medium ${selectedDay === dayButton.id ? 'text-(--neutral-900) bg-(--green-200)' : 'text-(--neutral-100)'}`} onClick={() => setSelectedDay(dayButton.id)}>{dayButton.label}
              </button>
            )
          })}
        </div>
        {/* TRACK FILTERS */}
        <div className='flex gap-2.5 flex-wrap w-fit pb-6'>
          {trackButtons.map((track) => (
            <button key={track.id} className={`py-2 px-4 border rounded-full text-preset-6-medium ${selectedTrack === track.id ? 'text-(--neutral-900) bg-(--green-200)' : 'text-(--neutral-100)'}`} onClick={() => setSelectedTrack(track.id)} aria-label={track.fullLabel}>
              <span className="sm:hidden">{track.shortLabel}</span>
              <span className="hidden sm:inline">{track.fullLabel}</span>
            </button>
          ))}
          <button
            type='button'
            className={`py-2 px-4 border rounded-full text-preset-6-medium ${selectedTrack ? 'text-red-400' : 'text-(--neutral-500)'}`}
            onClick={() => setSelectedTrack(null)}
            disabled={!selectedTrack}
          >
            CLEAR
          </button>
        </div>
      </div>

      <div className='border-t pt-6 border-(--neutral-600)'>
        {/* Highlights container */}
        <div className='flex flex-col gap-4 '>
          {filteredSchedule.map((talk) => {
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
        </div>
      </div>
    </section >
  )
}
