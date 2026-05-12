'use client';

import {Avatar} from "@primer/react";

export const DEFAULT_USER_ICON_PATH = "/logo.png";

interface props {
    size? : number;
}

function UserAvatar({size = 32}: props) {
    return <Avatar src={DEFAULT_USER_ICON_PATH} size={size}/>;
}

export default UserAvatar
