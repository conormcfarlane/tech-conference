"use client"

import { useState } from 'react'
import Image from 'next/image'
import MobileMenuHam from './MobileMenuHam'
import { NavItems } from './NavLinks'
import type { NavItem } from './NavLinks'
import Link from 'next/link'
import { usePathname } from 'next/navigation'


export default function Navbar() {
    const pathName = usePathname();
    const [isMenuOpen, setMenuOpen] = useState(false)
    function handleToggle() {
        setMenuOpen((prev) => !prev)
    };
    function handleCloseMenu() {
        setMenuOpen(false)
    };
    return (
        <nav>
            <div className='flex justify-between items-center py-4 border-b-2 border-(--neutral-600) mb-6 sm:py-5'>
                <Image src="/images/logo.svg"
                    height={240}
                    width={80}
                    alt='logo'
                    className='h-8 w-auto' />
                <ul className='hidden sm:flex sm:gap-4'>
                    {NavItems.map((item: NavItem) => {
                        return (
                            <li key={item.href} onClick={handleCloseMenu} className=''><Link href={item.href} className={`border p-2.5 text-center text-preset-6-medium cursor-pointer sm:px-6 
                            focus:outline-none focus:border-dashed focus:border-(--green-200) focus:shadow-[5px_5px_0_0_var(--green-200)]         hover:shadow-[2px_2px_0_0_var(--neutral-100)] 
                            ${pathName === item.href ? 'border-(--green-200) shadow-[2px_2px_0_0_var(--green-200)]' : ''}`}>{item.label}</Link>
                            </li>
                        )

                    })}
                </ul>
                <div className='block sm:hidden'>
                    <MobileMenuHam
                        isOpen={isMenuOpen}
                        onToggle={handleToggle}
                        handleClose={handleCloseMenu} />
                </div>

            </div>
            {isMenuOpen && (
                <ul className='flex flex-col gap-4'>
                    {NavItems.map((item: NavItem) => {
                        return (
                            <li key={item.href} onClick={handleCloseMenu}><Link href={item.href} className='block border p-2.5 text-center text-preset-6-medium'>{item.label}</Link>
                            </li>
                        )

                    })}
                </ul>
            )}

        </nav>
    )
}
