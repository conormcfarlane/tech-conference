export type NavItem = {
    href: string;
    label: string;
}

export const NavItems: NavItem[] = [
    { href: '/', label: "HOME" },
    { href: '/schedule', label: "SCHEDULE" },
    { href: '/speakers', label: "SPEAKERS" },
]