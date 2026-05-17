// -Path: "vite-extra-react-ssr-ts/src/stores/themeStore.ts"
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ThemeMode = 'dark' | 'light';

interface ThemeState {
    theme: ThemeMode;
    toggleTheme: () => void;
    setTheme: (theme: ThemeMode) => void;
    initializeTheme: () => void;
}

const getMediaTheme = (): ThemeMode => {
    if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('theme');
        if (stored === 'dark' || stored === 'light') return stored;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'dark';
};

export const useThemeStore = create<ThemeState>()(
    persist(
        (set) => ({
            theme: 'dark', // Always start with 'dark' on both server and client
            toggleTheme: () =>
                set((state) => {
                    const newTheme = state.theme === 'dark' ? 'light' : 'dark';
                    // บันทึกคุกกี้ (Manual)
                    if (typeof document !== 'undefined')
                        document.cookie = `theme=${newTheme};path=/;max-age=31536000`;
                    return { theme: newTheme };
                }),
            setTheme: (theme: ThemeMode) => {
                if (typeof document !== 'undefined')
                    document.cookie = `theme=${theme};path=/;max-age=31536000`;
                set({ theme });
            },
            initializeTheme: () => {
                // Initialize theme with stored value on client-side only
                if (typeof window !== 'undefined') {
                    const mediaTheme = getMediaTheme();
                    set({ theme: mediaTheme });
                }
            },
        }),
        { 
            name: 'theme',
            storage: {
                getItem: (name) => {
                    if (typeof window !== 'undefined') {
                        const item = localStorage.getItem(name);
                        return item ? JSON.parse(item) : null;
                    }
                    return null;
                },
                setItem: (name, value) => {
                    if (typeof window !== 'undefined') {
                        localStorage.setItem(name, JSON.stringify(value));
                    }
                },
                removeItem: (name) => {
                    if (typeof window !== 'undefined') {
                        localStorage.removeItem(name);
                    }
                },
            },
        },
    ),
);
