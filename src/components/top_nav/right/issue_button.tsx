import {IssueOpenedIcon} from '@primer/octicons-react'
import { IconButton } from '@primer/react';
import { useTranslation } from 'react-i18next';


function IssueButton() {
    const { t } = useTranslation();
    return (
        <>
            <IconButton
                as = "button"
                className = "!bg-[var(--bgColor-default)] !hidden sm:!flex"
                size="medium"
                icon={IssueOpenedIcon}
                aria-label={t('nav.issue')}
                description={t('nav.issues')}
                keybindingHint='G D'
            />
        </>
    );
}

export default IssueButton;