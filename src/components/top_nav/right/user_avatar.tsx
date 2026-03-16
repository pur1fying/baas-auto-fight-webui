'use client';

import { IconButton } from "@primer/react";

const DEFAULT_USER_ICON_PATH = "/logo.png";

function GetUserAvatar() {
    return <img src={DEFAULT_USER_ICON_PATH} width={32} height={32} />;
}


function UserAvatarButton() {
    return (
        <IconButton
            size="medium"
            icon={GetUserAvatar}
            aria-label="User Icon"
            description="Open user navigation menu"
            variant="invisible"
        />
    );
}

export default UserAvatarButton;