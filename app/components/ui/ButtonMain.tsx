import React from 'react'
import Link from 'next/link'
import { ReactNode } from 'react'

type ButtonMainProps = {
    children: ReactNode;
    href?: string;
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
};


export default function ButtonMain({
    children,
    href,
    onClick,
    className = "",
    disabled = false,
}: ButtonMainProps) {
    const baseStyles = " text-center border-shadow "

    if (href) {
        return (
            <Link href={href} className={baseStyles + " " + className}>
                {children}
            </Link>
        );
    };
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className={baseStyles + " " + className}
        >
            {children}
        </button>
    );
}
