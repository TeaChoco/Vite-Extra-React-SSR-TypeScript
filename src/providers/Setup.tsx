//-Path: 'Vite-Extra-React-SSR-TypeScript/src/components/layout/Setup.tsx"
import { useLayoutEffect } from 'react'
import { authAPI } from '~/services/auth'
import { useAuthStore } from '~/stores/auth.store'
import { useThemeStore } from '~/stores/theme.store'
import { useSocketStore } from '~/stores/socket.store'
export default function Setup({ children }: { children: React.ReactNode }) {    const { theme } = useThemeStore()
    const { connect, disconnect } = useSocketStore()
    const { setUser, setError, setLoading } = useAuthStore();    useLayoutEffect(() => {        window.document.documentElement.classList.toggle('dark', theme === 'dark')
    }, [theme]);    useLayoutEffect(() => {        connect()
        return () => disconnect()
    }, [connect, disconnect]);    useLayoutEffect(() => {        const checkAuth = async () => {            setLoading(true);            setError(null)
            try {                const res = await authAPI.auth();                setUser(res.data)
            }
 catch (err) {                setError(err as Error);                setUser(null)
            }
 finally {                setLoading(false)
            }        };        checkAuth()
    }, [setUser, setError, setLoading])
    return <>{children}</>
}


