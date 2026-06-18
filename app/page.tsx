import Navbar from "./components/layout/Navbar"
import Hero from "./components/features/home/Hero";
import FeaturedSpeaker from "./components/features/home/FeaturedSpeaker";
import techConferenceData from "../data/data.json"
import Tracks from "./components/features/home/Tracks";
import FeaturedSpeakersList from "./components/features/home/FeaturedSpeakersList";
import ScheduleHighlights from "./components/features/home/ScheduleHighlights";
import Footer from "./components/layout/Footer";

export default function Home() {
  const conference = techConferenceData.conference;
  const speakers = techConferenceData.speakers;
  const tracks = techConferenceData.tracks;
  const talks = techConferenceData.talks;
  return (
    <div className=" overflow-hidden">
      <main className="space-y-11">
        <div className="grid gap-6 min-[1130px]:grid min-[1130px]:grid-cols-[60%_40%] min-[1130px]:gap-8 " >
          <Hero />
          <FeaturedSpeaker speakers={speakers} talks={talks} />
        </div>
        <Tracks tracks={tracks} />
        <FeaturedSpeakersList speakers={speakers} talks={talks} tracks={tracks} />
        <ScheduleHighlights talks={talks} speakers={speakers} tracks={tracks} />
      </main>
    </div>
  );
}
