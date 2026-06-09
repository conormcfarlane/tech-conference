import Navbar from "./components/layout/Navbar"
import Hero from "./components/features/home/Hero";
import FeaturedSpeaker from "./components/features/FeaturedSpeaker";

import techConferenceData from "../data/data.json"

export default function Home() {
  const conference = techConferenceData.conference;
  const speakers = techConferenceData.speakers;
  const tracks = techConferenceData.tracks;
  const talks = techConferenceData.talks;
  return (
    <div className="mx-4 min-[1300px]:mx-10 overflow-hidden">
      <Navbar />
      <main>
        <div className="min-[1130px]:grid min-[1130px]:grid-cols-[60%_40%] min-[1130px]:gap-8 " >
          <Hero />
          <FeaturedSpeaker speakers={speakers} talks={talks} />
        </div>

      </main>
    </div>
  );
}
