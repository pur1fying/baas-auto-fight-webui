'use client';

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';
import {BaseStyles, ThemeProvider} from '@primer/react';

import {
    readColorModePreference,
    writeColorModePreference,
} from '@/components/theme/themePreference';
import type {AppColorMode} from '@/components/theme/themePreference';

interface AppThemeContextValue {
    colorMode: AppColorMode;
    setColorMode: (colorMode: AppColorMode) => void;
}

const AppThemeContext = createContext<AppThemeContextValue | undefined>(undefined);

export function AppThemeProvider({children}: {children: React.ReactNode}) {
    const [colorMode, setColorModeState] = useState<AppColorMode>('auto');

    useEffect(() => {
        setColorModeState(readColorModePreference(window.localStorage));
    }, []);

    const setColorMode = useCallback((nextColorMode: AppColorMode) => {
        setColorModeState(nextColorMode);
        writeColorModePreference(window.localStorage, nextColorMode);
    }, []);

    const contextValue = useMemo(() => ({colorMode, setColorMode}), [colorMode, setColorMode]);

    return (
        <AppThemeContext.Provider value={contextValue}>
            <ThemeProvider colorMode={colorMode} dayScheme="light" nightScheme="dark_dimmed">
                <BaseStyles>{children}</BaseStyles>
            </ThemeProvider>
        </AppThemeContext.Provider>
    );
}

export function useAppTheme(): AppThemeContextValue {
    const context = useContext(AppThemeContext);
    if (context === undefined) {
        throw new Error('useAppTheme must be used inside AppThemeProvider.');
    }
    return context;
}
