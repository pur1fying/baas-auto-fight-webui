import {InboxIcon} from '@primer/octicons-react'
import { IconButton } from '@primer/react';


function NotificationButton() {
    return (
        <>
            <IconButton 
                className = "!bg-[var(--bgColor-default)]"
                size="medium"
                aria-label="Notification"
                icon={InboxIcon}
                description='Notifications'
                keybindingHint='G N'
            />
        </>
    );
}

export default NotificationButton;