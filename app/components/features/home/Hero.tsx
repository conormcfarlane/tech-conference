
import Image from 'next/image'
export default function Hero() {
    return (
        <section aria-label='conference info' className='relative flex flex-col justify-between bg-(--neutral-100) p-4 sm:px-6 py-5 min-[1130px]:px-8'>
            <div className='absolute inset-0 flex justify-center items-center'>
                <Image src="/images/bg-horizon-text.svg" width={277} height={64} alt='horizon decorative text' className='w-4/5' />
            </div>
            <h1 className='text-preset-hero pb-25'>where code meets the machine_

            </h1>

            <div className='flex justify-between border-t-2 border-(--neutral-900) pt-4 place-self-end w-full'>
                <p className='text-preset-6 text-(--neutral-900)'>NOV 15-17, 2026</p>
                <p className='text-preset-6 text-(--neutral-900)'>PIER 70, SF</p>
            </div>
        </section>
    )
}
