import Hero from './components/features/home/Hero'
import FeaturedSpeaker from './components/features/home/FeaturedSpeaker'
import Tracks from './components/features/home/Tracks'
import FeaturedSpeakersList from './components/features/home/FeaturedSpeakersList'
import ScheduleHighlights from './components/features/home/ScheduleHighlights'
import type { Speaker } from '@/types/speaker'
import type { Track } from '@/types/tracks'
import type { Talk } from '@/types/talks'
import { client } from '@/sanity/lib/client'
import { SPEAKERS_QUERY, TALKS_QUERY, TRACKS_QUERY, toSpeaker, toTalk, toTrack } from '@/sanity/lib/queries'

export default async function Home() {
  const [rawSpeakers, rawTracks, rawTalks] = await Promise.all([
    client.fetch(SPEAKERS_QUERY),
    client.fetch(TRACKS_QUERY),
    client.fetch(TALKS_QUERY),
  ])

  const speakers = rawSpeakers.map(toSpeaker) as Speaker[]
  const tracks = rawTracks.map(toTrack) as Track[]
  const talks = rawTalks.map(toTalk) as Talk[]

  return (
    <div className=' overflow-hidden'>
      <main className='space-y-11'>
        <div className='grid gap-6 min-[1130px]:grid min-[1130px]:grid-cols-[60%_40%] min-[1130px]:gap-8 '>
          <Hero />
          <FeaturedSpeaker speakers={speakers} talks={talks} />
        </div>
        <Tracks tracks={tracks} />
        <FeaturedSpeakersList speakers={speakers} talks={talks} tracks={tracks} />
        <ScheduleHighlights talks={talks} speakers={speakers} tracks={tracks} />
      </main>
    </div>
  )
}
