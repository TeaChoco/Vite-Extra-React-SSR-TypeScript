//-Path: "vite-extra-react-ssr-ts/src/pages/Socket.tsx"
import Card from '$/components/custom/Card';
import Badge from '$/components/custom/Badge';
import { useTranslation } from 'react-i18next';
import Button from '$/components/custom/Button';
import { useSocketStore } from '$/stores/socketStore';
import { FaBolt, FaPlug, FaUsers } from 'react-icons/fa6';

export default function Socket() {
    const { t } = useTranslation();
    const { socket, connect, disconnect, isConnected, playerCount } = useSocketStore();

    return (
        <section className='py-16 sm:py-24'>
            <div className='mx-auto max-w-4xl px-4 sm:px-6'>
                <div className='text-center mb-16'>
                    <Badge variant={isConnected ? 'success' : 'error'} className='mb-4'>
                        <span
                            className={`inline-block w-2 h-2 rounded-full ${isConnected ? 'bg-success animate-pulse' : 'bg-error'}`}
                        />
                        {isConnected ? t('socket.connected') : t('socket.disconnected')}
                    </Badge>
                    <h1 className='text-4xl sm:text-5xl font-black tracking-tighter text-foreground mb-6'>
                        {t('socket.title')}
                    </h1>
                    <p className='max-w-2xl mx-auto text-lg text-muted-foreground leading-relaxed'>
                        {t('socket.description')}
                    </p>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8'>
                    <Card icon={<FaPlug className='w-5 h-5' />} title={t('socket.status')}>
                        <div className='mt-4 space-y-3'>
                            <div className='flex items-center justify-between rounded-xl bg-muted/50 px-4 py-3'>
                                <span className='text-sm text-muted-foreground'>
                                    {t('socket.status')}
                                </span>
                                <Badge variant={isConnected ? 'success' : 'error'}>
                                    <span
                                        className={`inline-block w-1.5 h-1.5 rounded-full ${isConnected ? 'bg-success' : 'bg-error'}`}
                                    />
                                    {isConnected ? t('socket.connected') : t('socket.disconnected')}
                                </Badge>
                            </div>
                            <div className='flex items-center justify-between rounded-xl bg-muted/50 px-4 py-3'>
                                <span className='text-sm text-muted-foreground'>
                                    {t('socket.socket_id')}
                                </span>
                                <code className='text-xs font-mono text-foreground bg-card px-2 py-1 rounded-lg border border-border'>
                                    {socket?.id || t('socket.no_id')}
                                </code>
                            </div>
                        </div>
                    </Card>

                    <Card icon={<FaUsers className='w-5 h-5' />} title={t('socket.players')}>
                        <div className='mt-4'>
                            <div className='flex items-center justify-center rounded-xl bg-muted/50 px-4 py-8'>
                                <div className='text-center'>
                                    <p className='text-5xl font-black text-primary mb-2'>
                                        {playerCount}
                                    </p>
                                    <p className='text-sm text-muted-foreground'>
                                        {t('socket.players')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                <div className='flex items-center justify-center gap-4'>
                    {isConnected ? (
                        <Button size='lg' variant='outline' onClick={disconnect}>
                            <FaBolt className='w-4 h-4' />
                            {t('socket.disconnect')}
                        </Button>
                    ) : (
                        <Button size='lg' variant='primary' onClick={connect}>
                            <FaPlug className='w-4 h-4' />
                            {t('socket.connect')}
                        </Button>
                    )}
                </div>
            </div>
        </section>
    );
}
