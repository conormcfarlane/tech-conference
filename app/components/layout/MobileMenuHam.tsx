import React from 'react'
import Image from 'next/image'

type MobileMenuHamProps = {
    isOpen: boolean;
    onToggle: () => void;
    handleClose: () => void;
}

export default function MobileMenuHam({ isOpen, onToggle, handleClose }: MobileMenuHamProps) {
    return (
        <button className='p-2.5 border border-(--neutral-100) cursor-pointer' onClick={onToggle} aria-expanded={isOpen} onKeyDown={(event) => {
            if (event.key === "Escape") {
                handleClose();
            }
        }}>
            <Image src={isOpen ? "/images/icon-cross.svg" : "/images/icon-menu.svg"} alt={isOpen ? "Close Menu" : "Open Menu"} height={20} width={20} />
        </button>
    )
}
