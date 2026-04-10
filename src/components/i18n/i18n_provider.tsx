'use client';

import {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {loadLocale} from '@/utils/i18n';

export function I18nProvider({children}: { children: React.ReactNode }) {
    const {i18n} = useTranslation();

    useEffect(() => {
        document.documentElement.lang = i18n.language;

        const handleLangChange = (lng: string) => {
            document.documentElement.lang = lng;
        };
        i18n.on('languageChanged', handleLangChange);

        loadLocale(i18n.language || 'en');

        return () => {
            i18n.off('languageChanged', handleLangChange);
        };
    }, [i18n]);

    return <>{children}</>;
}

export default I18nProvider;