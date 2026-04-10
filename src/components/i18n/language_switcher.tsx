'use client';

import {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {SelectPanel, Button} from '@primer/react';
import {loadLocale} from '@/utils/i18n';
import logger from '@/utils/logger';

const languages = [
    {code: 'en', label: 'English'},
    {code: 'zh', label: '简体中文'},
    {code: 'zh-tw', label: '繁體中文'},
    {code: 'de', label: 'Deutsch'},
    {code: 'fr', label: 'Français'},
    {code: 'ka', label: 'ქართული'},
    {code: 'ko', label: '한국어'},
    {code: 'ru', label: 'Русский'},
];

const i18nLog = logger.withTag('i18n');

function LanguageSwitcher() {
    const {t, i18n} = useTranslation();
    const [selected, setSelected] = useState<{ text: string } | undefined>(
        () => {
            const lang = languages.find((l) => l.code === i18n.language);
            return lang ? {text: lang.label} : {text: 'English'};
        }
    );
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const lang = languages.find((l) => l.code === i18n.language);
        if (lang) {
            setSelected({text: lang.label});
        }
    }, [i18n.language]);

    const items = languages.map((lang) => ({
        text: lang.label,
        selected: i18n.language === lang.code,
    }));

    const changeLanguage = async (text: string) => {
        const lang = languages.find((l) => l.label === text);
        if (!lang) {
            i18nLog.error(`Language switch failed: cannot find language with label "${text}"`);
            return;
        }

        const prevLang = languages.find((l) => l.code === i18n.language);
        const prevLabel = prevLang?.label ?? i18n.language;

        i18nLog.info(`Switching language: [${prevLabel}] (${i18n.language}) --> [${lang.label}] (${lang.code})`);

        try {
            await loadLocale(lang.code);
            localStorage.setItem('i18nextLng', lang.code);
            setSelected({text: lang.label});
            i18nLog.info(`Language switched successfully to [${lang.label}] (${lang.code})`);
        } catch (err) {
            i18nLog.error(`Language switch failed: ${err instanceof Error ? err.message : String(err)}`);
        }
    };

    return (
        <SelectPanel
            open={open}
            onOpenChange={(open) => setOpen(open)}
            selected={selected}
            onSelectedChange={(item) => {
                if (item && 'text' in item) {
                    changeLanguage(item.text);
                }
            }}
            items={items}
            title={t('languageSwitcher.title')}
            placeholder={t('languageSwitcher.searchPlaceholder')}
            onFilterChange={() => {
            }}
            renderAnchor={(props) => (
                <Button {...props}>
                    {selected?.text ?? 'English'}
                </Button>
            )}
        />
    );
}

export default LanguageSwitcher;