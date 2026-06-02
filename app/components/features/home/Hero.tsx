import React from 'react'
import Image from 'next/image'
export default function Hero() {
    return (
        <section aria-label='conference info' className='relative grid grid-rows-[1fr_1fr_auto]  bg-(--neutral-100) p-4 sm:px-6 py-5 lg:px-8'>
            <div className='absolute inset-0 flex justify-center items-center'>
                <Image src="/images/bg-horizon-text.svg" width={277} height={64} alt='horizon decorative text' className='w-4/5' />
            </div>
            <h1 className='text-preset-hero'>where code meets the machine_

            </h1>
            <div aria-hidden='true'></div>{/*Spacer Div */}

            <div className='flex justify-between border-t-2 border-(--neutral-900) pt-4'>
                <p className='text-preset-6 text-(--neutral-900)'>NOV 15-17, 2026</p>
                <p className='text-preset-6 text-(--neutral-900)'>PIER 70, SF</p>
            </div>
        </section>
    )
}
