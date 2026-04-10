import {InboxIcon} from '@primer/octicons-react'
import { IconButton } from '@primer/react';
import { useTranslation } from 'react-i18next';


function NotificationButton() {
    const { t } = useTranslation();
    return (
        <>
            <IconButton
                className = "!bg-[var(--bgColor-default)]"
                size="medium"
                aria-label={t('nav.notification')}
                icon={InboxIcon}
                description={t('nav.notifications')}
                keybindingHint='G N'
            />
        </>
    );
}

export default NotificationButton;