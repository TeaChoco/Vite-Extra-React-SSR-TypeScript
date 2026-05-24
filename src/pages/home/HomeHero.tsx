// -Path: 'Vite-React-TypeScript/src/pages/home/HomeHero.tsx'
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import viteLogo from '~/assets/vite.svg';
import reactLogo from '~/assets/react.svg';
import Badge from '~/components/custom/Badge';
import Button from '~/components/custom/Button';
import { SiTypescript } from 'react-icons/si';
import { useTranslation } from 'react-i18next';

export default function HomeHero() {
    const { t } = useTranslation();
    const [count, setCount] = useState(0);

    return (
        <section className='relative overflow-hidden py-20 sm:py-28'>
            <div className='absolute inset-0 -z-10'>
                <div className='absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-primary/10 rounded-full blur-3xl' />
                <div className='absolute bottom-0 right-0 w-100 h-100 bg-info/5 rounded-full blur-3xl' />
            </div>

            <motion.div
                transition={{ duration: 0.8 }}
                animate={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 50 }}
                className='mx-auto max-w-6xl px-4 sm:px-6 text-center'
            >
                <Badge variant='info' className='mb-6'>
                    ⚡ Vite + React + TypeScript
                </Badge>

                <div className='flex items-center justify-center gap-6 mb-8'>
                    <img
                        src={viteLogo}
                        alt='Vite logo'
                        className='h-16 w-16 drop-shadow-lg animate-pulse'
                    />
                    <span className='text-4xl text-surface-muted font-light'>+</span>
                    <img
                        src={reactLogo}
                        alt='React logo'
                        className='h-16 w-16 drop-shadow-lg animate-spin'
                        style={{ animationDuration: '8s' }}
                    />
                    <span className='text-4xl text-surface-muted font-light'>+</span>
                    <SiTypescript className='h-14 w-14 text-[#3178C6] drop-shadow-lg' />
                </div>

                <h1 className='text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter text-surface-foreground mb-4'>
                    {t('home.title')}
                </h1>
                <p className='text-xl sm:text-2xl font-medium text-primary mb-6'>
                    {t('home.subtitle')}
                </p>
                <p className='max-w-2xl mx-auto text-lg text-surface-subtle leading-relaxed mb-10'>
                    {t('home.description')}
                </p>

                <div className='flex flex-col sm:flex-row items-center justify-center gap-4 mb-12'>
                    <Link to='/about'>
                        <Button size='lg' variant='primary'>
                            {t('home.get_started')}
                        </Button>
                    </Link>
                    <a
                        href='https://github.com/TeaChoco/Vite-Extra-React-SSR-TypeScript'
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        <Button size='lg' variant='outline'>
                            {t('home.view_source')}
                        </Button>
                    </a>
                </div>

                <div className='inline-flex items-center gap-4 rounded-2xl border border-border bg-surface-overlay/50 backdrop-blur-sm px-6 py-4'>
                    <code className='text-sm text-surface-muted font-mono'>src/App.tsx</code>
                    <div className='w-px h-6 bg-border' />
                    <Button
                        size='sm'
                        variant='surface'
                        onClick={() => setCount((index) => index + 1)}
                    >
                        Count: <span className='text-primary font-bold'>{count}</span>
                    </Button>
                </div>
            </motion.div>
        </section>
    );
}
