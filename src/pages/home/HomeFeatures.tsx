// -Path: 'Vite-React-TypeScript/src/pages/home/HomeFeatures.tsx'
import { motion } from 'framer-motion';
import Card from '~/components/custom/Card';
import Badge from '~/components/custom/Badge';
import { useTranslation } from 'react-i18next';
import { FaBolt, FaGlobe, FaRoute, FaPalette, FaCubesStacked, FaServer } from 'react-icons/fa6';

const features = [
    { key: 'ssr', icon: <FaServer className='w-5 h-5' /> },
    { key: 'routing', icon: <FaRoute className='w-5 h-5' /> },
    { key: 'i18n', icon: <FaGlobe className='w-5 h-5' /> },
    { key: 'theme', icon: <FaPalette className='w-5 h-5' /> },
    { key: 'socket', icon: <FaBolt className='w-5 h-5' /> },
    { key: 'state', icon: <FaCubesStacked className='w-5 h-5' /> },
] as const;

export default function HomeFeatures() {
    const { t } = useTranslation();

    return (
        <motion.section
            transition={{ duration: 0.8 }}
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 50 }}
            className='py-16 sm:py-24 bg-surface-overlay/30'
        >
            <div className='mx-auto max-w-6xl px-4 sm:px-6'>
                <div className='text-center mb-12'>
                    <Badge className='mb-4'>✨ {t('home.features')}</Badge>
                    <h2 className='text-3xl sm:text-4xl font-black tracking-tight text-surface-foreground'>
                        {t('home.features')}
                    </h2>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {features.map(({ key, icon }) => (
                        <Card
                            key={key}
                            icon={icon}
                            title={t(`features.${key}.title`)}
                            description={t(`features.${key}.description`)}
                        >
                            <span />
                        </Card>
                    ))}
                </div>
            </div>
        </motion.section>
    );
}
