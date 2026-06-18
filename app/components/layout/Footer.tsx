'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link';

type FooterLink = {
    label: string;
    href: string;
}

type FooterSection = {
    title: string;
    links?: FooterLink[];
    details?: string[];
}
const footerNavLinks: FooterSection[] = [
    {
        title: '// NAVIGATE',
        links: [
            { label: 'Home', href: '/' },
            { label: 'Schedule', href: '/schedule' },
            { label: 'Speakers', href: '/speakers' },
        ]
    },
    {
        title: '// TRACKS',
        links: [
            { label: 'Frontend', href: '/schedule' },
            { label: 'Performance', href: '/schedule' },
            { label: 'Accessibility', href: '/schedule' },
            { label: 'Tooling', href: '/schedule' },
        ]
    },
    {
        title: '// VENUE',
        details: ['Pier 70', 'San Francisco, CA', 'Nov 15-17, 2026']
    }



]
export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return (
        <section className='text-preset-6 text-(--neutral-200) mt-8'>
            {/* FOOTER CONTAINER */}
            <div className='flex flex-col border-y border-(--neutral-600) py-8 min-[1130px]:flex-row min-[1130px]:justify-between '>
                {/* FOOTER INFO */}
                <div className='space-y-4 mb-5 sm:max-w-[45ch]'>
                    <Image src="/images/logo.svg" width={190} height={31} alt='devhorizon logo' />
                    <p className='text-preset-6 text-(--neutral-200)'>A three-day conference for engineers who build the intrfaces humans use every day</p>
                </div>
                {/* FOOTER NAVIGATION */}
                <div className='flex flex-col gap-8 sm:flex-row sm:justify-between min-[1130px]:gap-20 '>
                    {footerNavLinks.map((nav) => (
                        <div key={nav.title}>

                            <p className='text-preset-6-medium text-(--green-200) mb-4'>{nav.title}</p>
                            {/* IF VENU RENDER CONF DETAILS */}
                            {nav.title === '// VENUE' ?
                                (
                                    <div>
                                        {nav.details?.map((detail) => (
                                            <p key={detail}>{detail}</p>
                                        ))}
                                    </div>
                                ) :
                                // ELSE RENDER NAV LINKS
                                (
                                    <ul className='space-y-3'>
                                        {nav.links?.map((link) => (
                                            <li key={link.label}><Link href={link.href}>{link.label}</Link></li>
                                        ))}
                                    </ul>

                                )}

                        </div>
                    ))}
                </div>
            </div>
            {/* FOOTER NOTE + BACK TO TOP */}
            <div className='py-5 space-y-3'>
                <p>@ 2026 DEVHORIZON. ALL RIGHTS RESERVED.</p>
                <button type='button' onClick={scrollToTop} className='cursor-pointer'>BACK TO TOP ↑</button>
            </div>
        </section>
    )
}
