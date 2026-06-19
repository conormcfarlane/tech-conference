import { Speaker } from '@/types/speaker'
import { Talk } from '@/types/talks'
import { Track } from '@/types/tracks'
import Image from 'next/image'
import React, { useEffect, useRef } from 'react'
import { ImageUrlHelper } from '@/utils/ImageHelper'
import TalkHighlightCard from './TalkHighlightCard'

type SpeakerModalProps = {
    speaker: Speaker,
    talk: Talk,
    track: Track,
    onClose: () => void,
}
export default function SpeakerModal({ speaker, talk, track, onClose }: SpeakerModalProps) {
    const imagePath = ImageUrlHelper(speaker.avatar);
    const modalRef = useRef<HTMLDivElement>(null);
    const closeButtonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const previousActiveElement = document.activeElement as HTMLElement | null;
        closeButtonRef.current?.focus();

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
                return;
            }

            if (event.key !== 'Tab') {
                return;
            }

            const modalNode = modalRef.current;
            if (!modalNode) {
                return;
            }

            const focusableElements = Array.from(
                modalNode.querySelectorAll<HTMLElement>(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                )
            );

            if (focusableElements.length === 0) {
                return;
            }

            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            const activeElement = document.activeElement;

            if (!event.shiftKey && activeElement === lastElement) {
                event.preventDefault();
                firstElement.focus();
            }

            if (event.shiftKey && activeElement === firstElement) {
                event.preventDefault();
                lastElement.focus();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            previousActiveElement?.focus();
        };
    }, [onClose]);

    return (
        <section className='fixed inset-0 z-50 bg-black/70 flex items-top justify-center p-4 '>
            <div
                ref={modalRef}
                role='dialog'
                aria-modal='true'
                aria-label='Speaker details dialog'
                className=' relative w-[90vw] h-fit bg-(--neutral-800) border border-(--neutral-600) overflow-auto px-4 py-5 max-w-200'
            >
                <button ref={closeButtonRef} type='button' onClick={() => onClose()} className='absolute right-5 top-5 p-2.5 border'>
                    <Image src={'/images/icon-cross.svg'} width={20} height={20} alt='close button' />
                </button>
                {/* PROFILE SECTION */}
                <div className='mb-4'>
                    <div style={{ backgroundColor: track.color }} className='w-fit'>
                        <Image src={imagePath} width={150} height={100} alt={`${speaker.name} avatar`} />
                    </div>

                    <div>
                        <p className='text-preset-3 mb-1'>{speaker.name.toLowerCase()}</p>
                        <p className='text-preset-6-medium'>{speaker.role.toUpperCase()} @ {speaker.company.toUpperCase()}</p>
                    </div>
                </div>
                {/* BIO */}
                <p className='border-y border-(--neutral-600) py-4 mb-4 text-preset-6-medium text-(--neutral-200)'>{speaker.bio}</p>
                {/* TALK CARD SECTION */}
                <div>
                    <p className='text-preset-6 text-(--green-200) mb-4' >{'// TALK'}</p>
                    <TalkHighlightCard
                        track={track}
                        speaker={speaker}
                        talk={talk}
                        isDetailsOpen={false}
                        showToggle={false}
                    />
                </div>
            </div>
        </section>
    )
}
