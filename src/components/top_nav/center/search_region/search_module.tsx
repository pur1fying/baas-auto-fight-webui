'use client'
import { Button, IconButton } from '@primer/react'
import { SearchIcon } from "@primer/octicons-react";
import { useTranslation } from 'react-i18next';

function SearchModule() {
    const { t } = useTranslation();
    return (
        <>
            <Button
                className="!bg-[var(--bgColor-default)] w-fit !hidden md:!block"
                size="medium"
                leadingVisual={SearchIcon}>
                <span>
                    <span className="text-[var(--fgColor-muted)]">{t('nav.typeToSearch')}</span>
                    <kbd  className="inline-block px-2 py-1 text-sm font-mono bg-gray-100 border border-gray-300 rounded shadow-sm">/</kbd>
                    <span className="text-[var(--fgColor-muted)]">{t('nav.toSearch')}</span>
                </span>
            </Button>

            <IconButton
                className="!bg-[var(--bgColor-default)] block md:!hidden"
                size="medium"
                icon={SearchIcon}
                aria-label={t('nav.searchButton')}
                description={t('nav.search')}
                keybindingHint="S,/"
            />
        </>
    );
}

export default SearchModule;