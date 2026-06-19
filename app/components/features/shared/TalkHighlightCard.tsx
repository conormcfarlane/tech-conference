import { Speaker } from '@/types/speaker'
import { Talk } from '@/types/talks'
import { Track } from '@/types/tracks'
import React from 'react'
import Image from 'next/image'

type TalkHighlightCardProps = {
  track: Track,
  speaker: Speaker,
  talk: Talk,
  isDetailsOpen: boolean;
  onToggleDetails?: (talkId: string) => void;
  showToggle?: boolean;
}

function TalkHighlightCard({
  track,
  speaker,
  talk,
  isDetailsOpen,
  onToggleDetails,
  showToggle = true,
}: TalkHighlightCardProps) {
  return (
    // Each Single Component Container
    <div className='flex flex-col border border-(--neutral-600) sm:flex-row'>

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
            <>
              <p className='text-preset-6'>{talk.description}</p>
              <p className='text-preset-6-medium'>LOCATION: {talk.location.toUpperCase()}</p>
            </>

          )}
          {/* BUTTON TO CHNAGE STATE FOR DETAILS */}
          {showToggle && (
            <button
              type='button'
              aria-expanded={isDetailsOpen}
              onClick={() => onToggleDetails?.(talk.id)}
              className='flex gap-1 items-center w-fit'
            >
              <Image src={isDetailsOpen ? '/images/icon-minus.svg' : '/images/icon-plus.svg'} width={16} height={16} alt='Details menu icon' />
              <p className='text-preset-7 text-(--neutral-600)'>{isDetailsOpen ? 'HIDE DEATILS' : 'SHOW DETAILS'}</p>
            </button>
          )}

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
}

export default TalkHighlightCard