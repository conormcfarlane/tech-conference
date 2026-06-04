export interface Talks {
    id: string
    title: string
    speakerId: string
    day: number
    trackId: string
    startTime: string | number
    endTime: string | number
    location: string
    description: string
    highlighted: boolean
}