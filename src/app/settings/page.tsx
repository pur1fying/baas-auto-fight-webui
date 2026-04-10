'use client';

import { FormControl } from '@primer/react';
import TopNavBar from '@/components/top_nav/top_nav';
import DefaultLayout from '@/components/layouts/default/layout';
import LanguageSwitcher from '@/components/i18n/language_switcher';
import {useEffect, useMemo} from 'react';
import { useTranslation } from 'react-i18next';
import { usePageInfoStore } from '@/store/page_info_store';

export default function SettingsPage() {
    const setPageInfo = usePageInfoStore(s => s.setPageInfo);

    const { t } = useTranslation();

    const pageInfo = useMemo(() => [
        { label: t('settings.title') }
    ], [t]);

    useEffect(() => {
        setPageInfo(pageInfo);
    }, [setPageInfo, pageInfo]);

    return (
        <DefaultLayout
            header={<TopNavBar />}
            sidebar={null}
            content={
                <div className="p-6 max-w-[600px]">
                    <h1 className="text-2xl font-bold mb-3">{t('settings.title')}</h1>

                    <FormControl>
                        <FormControl.Label>{t('settings.language')}</FormControl.Label>
                        <LanguageSwitcher />
                        <FormControl.Caption>{t('settings.languageDescription')}</FormControl.Caption>
                    </FormControl>
                </div>
            }
            footer={<div className="text-center">{t('common.footer')}</div>}
        />
    );
}