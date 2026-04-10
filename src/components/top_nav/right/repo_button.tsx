import {RepoIcon} from '@primer/octicons-react'
import { IconButton } from '@primer/react';
import { useTranslation } from 'react-i18next';


function RepoButton() {
    const { t } = useTranslation();
    return (
        <>
            <IconButton
                className = "!bg-[var(--bgColor-default)] !hidden sm:!flex"
                size = "medium"
                aria-label={t('nav.repositories')}
                icon={RepoIcon}
                description={t('nav.repositories')}
            />
        </>
    );
}

export default RepoButton;