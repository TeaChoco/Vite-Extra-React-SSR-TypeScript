//-Path: "vite-extra-react-ssr-ts/src/components/layout/Navbar.tsx"
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Switch from '$/components/custom/Switch';
import Select from '$/components/custom/Select';
import { FaBars, FaXmark } from 'react-icons/fa6';
import { useThemeStore } from '$/stores/themeStore';
import { Link, useLocation } from 'react-router-dom';
import type { LanguageType } from '$/types/language';
import type { OptionSelectType } from '$/components/custom/Select';

const languageOptions: OptionSelectType[] = [
    { value: 'en', label: '🇺🇸 English' },
    { value: 'th', label: '🇹🇭 ไทย' },
];

interface NavLinkProps {
    to: string;
    label: string;
    isActive: boolean;
    onClick?: () => void;
}

function NavLink({ to, label, onClick, isActive }: NavLinkProps) {
    return (
        <Link
            to={to}
            onClick={onClick}
            className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                isActive
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
        >
            {label}
            {isActive && (
                <span className='absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-primary rounded-full' />
            )}
        </Link>
    );
}

export default function Navbar() {
    const location = useLocation();
    const { t, i18n } = useTranslation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { theme, toggleTheme } = useThemeStore();

    const navLinks = [
        { to: '/', label: t('nav.home') },
        { to: '/about', label: t('nav.about') },
        { to: '/socket', label: t('nav.socket') },
    ];

    return (
        <nav className='sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl'>
            <div className='mx-auto max-w-6xl px-4 sm:px-6'>
                <div className='flex h-16 items-center justify-between'>
                    <Link to='/' className='flex items-center gap-3 group'>
                        <div className='flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-primary to-primary-dark shadow-lg shadow-primary/25 transition-transform duration-300 group-hover:scale-110'>
                            <span className='text-lg font-black text-white'>V</span>
                        </div>
                        <span className='text-lg font-bold tracking-tight text-foreground hidden sm:block'>
                            Vite Extra
                        </span>
                    </Link>

                    <div className='hidden md:flex items-center gap-1'>
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                label={link.label}
                                isActive={location.pathname === link.to}
                            />
                        ))}
                    </div>

                    <div className='flex items-center gap-3'>
                        <Select
                            options={languageOptions}
                            value={i18n.language}
                            containerClassName='w-36'
                            className='py-2! px-3! rounded-lg! text-xs'
                            onChange={(event) =>
                                i18n.changeLanguage(event.target.value as LanguageType)
                            }
                        />
                        <Switch checked={theme === 'dark'} onCheckedChange={toggleTheme} />
                        <button
                            className='md:hidden flex items-center justify-center w-9 h-9 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer'
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? (
                                <FaXmark className='w-5 h-5' />
                            ) : (
                                <FaBars className='w-5 h-5' />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {isMenuOpen && (
                <div className='md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl animate-in'>
                    <div className='flex flex-col gap-1 p-4'>
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                label={link.label}
                                isActive={location.pathname === link.to}
                                onClick={() => setIsMenuOpen(false)}
                            />
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}
