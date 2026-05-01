//-Path: "vite-extra-react-ssr-ts/src/components/layout/Footer.tsx"
import { useTranslation } from 'react-i18next';

export default function Footer() {
    const { t } = useTranslation();

    return (
        <footer className='border-t border-border/50 bg-muted/30'>
            <div className='mx-auto max-w-6xl px-4 sm:px-6 py-6'>
                <div className='flex flex-col sm:flex-row items-center justify-between gap-4'>
                    <p className='text-sm text-muted-foreground'>
                        {t('footer.built_with')} <span className='text-error'>❤</span>{' '}
                        {t('footer.and')}{' '}
                        <a
                            href='https://vite.dev'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-primary hover:underline font-medium'
                        >
                            Vite
                        </a>
                        {' + '}
                        <a
                            href='https://react.dev'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-primary hover:underline font-medium'
                        >
                            React
                        </a>
                    </p>
                    <div className='flex items-center gap-4'>
                        <a
                            href='https://github.com/TeaChoco'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-muted-foreground hover:text-foreground transition-colors text-sm'
                        >
                            GitHub
                        </a>
                        <a
                            href='https://vite.dev'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-muted-foreground hover:text-foreground transition-colors text-sm'
                        >
                            Vite Docs
                        </a>
                        <a
                            href='https://react.dev'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-muted-foreground hover:text-foreground transition-colors text-sm'
                        >
                            React Docs
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
