//-Path: "vite-extra-react-ssr-ts/src/pages/About.tsx"
import {
    SiVite,
    SiReact,
    SiExpress,
    SiI18Next,
    SiTypescript,
    SiTailwindcss,
    SiSocketdotio,
    SiReactrouter,
} from 'react-icons/si';
import { Link } from 'react-router-dom';
import Card from '$/components/custom/Card';
import Badge from '$/components/custom/Badge';
import { useTranslation } from 'react-i18next';
import Button from '$/components/custom/Button';
import { FaArrowLeft, FaCubesStacked } from 'react-icons/fa6';

const techStack = [
    { name: 'Vite 8', color: 'text-[#646CFF]', icon: <SiVite /> },
    { name: 'React 19', color: 'text-[#61DAFB]', icon: <SiReact /> },
    { name: 'i18next 26', color: 'text-[#26A69A]', icon: <SiI18Next /> },
    { name: 'TypeScript 6', color: 'text-[#3178C6]', icon: <SiTypescript /> },
    { name: 'Tailwind CSS 4', color: 'text-[#06B6D4]', icon: <SiTailwindcss /> },
    { name: 'React Router 7', color: 'text-[#CA4245]', icon: <SiReactrouter /> },
    { name: 'Express 5', color: 'text-[#000000] dark:text-white', icon: <SiExpress /> },
    { name: 'Zustand 5', color: 'text-[#433929] dark:text-warning', icon: <FaCubesStacked /> },
    { name: 'Socket.io 4', color: 'text-[#010101] dark:text-white', icon: <SiSocketdotio /> },
];

export default function About() {
    const { t } = useTranslation();

    return (
        <section className='py-16 sm:py-24'>
            <div className='mx-auto max-w-4xl px-4 sm:px-6'>
                <div className='mb-8'>
                    <Link to='/'>
                        <Button size='sm' variant='ghost'>
                            <FaArrowLeft className='w-3.5 h-3.5' />
                            {t('about.back_home')}
                        </Button>
                    </Link>
                </div>

                <div className='text-center mb-16'>
                    <Badge className='mb-4'>📖 {t('nav.about')}</Badge>
                    <h1 className='text-4xl sm:text-5xl font-black tracking-tighter text-foreground mb-6'>
                        {t('about.title')}
                    </h1>
                    <p className='max-w-2xl mx-auto text-lg text-muted-foreground leading-relaxed'>
                        {t('about.description')}
                    </p>
                </div>

                <div className='mb-12'>
                    <h2 className='text-2xl font-bold text-foreground mb-6'>
                        {t('about.tech_stack')}
                    </h2>
                    <div className='flex flex-wrap gap-3'>
                        {techStack.map((tech) => (
                            <span
                                key={tech.name}
                                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-card text-sm font-semibold transition-all duration-300 hover:border-primary/40 hover:shadow-md hover:-translate-y-0.5`}
                            >
                                <span className={tech.color}>{tech.icon}</span>
                                <span className='text-foreground'>{tech.name}</span>
                            </span>
                        ))}
                    </div>
                </div>

                <Card className='p-8!'>
                    <h2 className='text-2xl font-bold text-foreground mb-4'>
                        {t('about.architecture')}
                    </h2>
                    <p className='text-muted-foreground leading-relaxed'>
                        {t('about.architecture_desc')}
                    </p>
                    <div className='mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4'>
                        <div className='rounded-xl border border-border bg-muted/50 p-4 text-center'>
                            <p className='text-xs font-medium text-muted-foreground mb-1'>Server</p>
                            <p className='text-sm font-bold text-foreground'>
                                Express + SSR Stream
                            </p>
                        </div>
                        <div className='rounded-xl border border-border bg-muted/50 p-4 text-center'>
                            <p className='text-xs font-medium text-muted-foreground mb-1'>Render</p>
                            <p className='text-sm font-bold text-foreground'>
                                StaticRouter → hydrateRoot
                            </p>
                        </div>
                        <div className='rounded-xl border border-border bg-muted/50 p-4 text-center'>
                            <p className='text-xs font-medium text-muted-foreground mb-1'>State</p>
                            <p className='text-sm font-bold text-foreground'>
                                Zustand + Cookie Sync
                            </p>
                        </div>
                    </div>
                </Card>
            </div>
        </section>
    );
}
