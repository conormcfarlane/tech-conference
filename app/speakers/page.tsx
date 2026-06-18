import React from 'react'
import type { Speaker } from '@/types/speaker'
import type { Track } from '@/types/tracks'
import type { Talk } from '@/types/talks'
import techConferenceData from '@/data/data.json'
import SpeakerCard from '../components/features/shared/SpeakerCard'

export default function SpeakerPageList() {
  const speakers = techConferenceData.speakers as Speaker[];
  const talks = techConferenceData.talks as Talk[];
  const tracks = techConferenceData.tracks as Track[];
  const allSpeakers = speakers
  const trackColorById = new Map(tracks.map((track) => [track.id, track.color]));
  const talkBySpeakerId = new Map(
    talks.map((talk) => [talk.speakerId, talk])
  );
  const speakersWithColor = allSpeakers.map((speaker) => {
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
      <p className="text-preset-6-extraBold text-(--green-200) mb-5 min-[1130px]:mb-8">{"// speakers"}</p>
      {/* GRID CONTAINER */}
      <div className='grid sm:grid-cols-2 gap-5 xl:grid-cols-4'>
        {speakersWithColor.map((speaker) => {
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
    </section>
  )
}