import type { Speaker } from '@/types/speaker'
import type { Talk } from '@/types/talks'
import type { Track } from '@/types/tracks'

export type SpeakerCardModel = {
    speaker: Speaker;
    talk: Talk | null;
    track: Track | null;
    talkName: string;
    backgroundColor: string;
}

export function buildSpeakerCardModels(speakers: Speaker[], talks: Talk[], tracks: Track[]): SpeakerCardModel[] {

    // BUILD LOOKUP OF TALK USING SPEAKER ID
    const talkBySpeakerId = new Map(talks.map((talk) => [talk.speakerId, talk]));
    // BUILD LOOKUP OF TRACK USING TRACK ID
    const trackById = new Map(tracks.map((track) => [track.id, track]));

    return speakers.map((speaker) => {
        // FOR EACH SPEAKER, RESOLVE THEIR TALK AND THEN THEIR TRACK
        const talk = talkBySpeakerId.get(speaker.id) ?? null;
        const track = talk ? (trackById.get(talk.trackId) ?? null) : null;

        return {
            speaker,
            talk,
            track,
            talkName: talk?.title ?? 'TBA',
            backgroundColor: track?.color ?? '#B5E9FC',
        };
    });
}
