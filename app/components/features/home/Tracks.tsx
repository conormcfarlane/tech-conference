import type { Tracks } from "@/types/tracks"
type TrackProps = {
    tracks: Tracks[];
}
export default function Tracks({ tracks }: TrackProps) {
    const visibleTracks = tracks.filter((track) => track.id !== "tr_0");

    return (
        <section>
            <p className="text-preset-6-extraBold text-(--green-200) mb-5 min-[1130px]:mb-8">{"// TRACKS"}</p>
            <div className="grid gap-5 md:grid-cols-2 px-1">
                {visibleTracks.map((track) => (
                    <div key={track.id} className="px-5 py-4 border border-shadow">
                        <p style={{color:track.color}} className="text-preset-3 mb-1.5">{track.name.toLowerCase()}</p>
                        <p className="text-preset-6-medium max-w-[20ch] text-(--neutral-200)">{track.description.toUpperCase()}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}
