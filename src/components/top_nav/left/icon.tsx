'use client';

import { IconButton } from "@primer/react";

const BAAS_ICON_PATH = "/logo.png";

function HomePageIcon() {
    return <img src={BAAS_ICON_PATH} width={32} height={32} />;
}



function BAAS_IconButton() {
    return (
        <IconButton
            className="ml-1"
            as="a"
            size="medium"
            icon={HomePageIcon}
            aria-label="Home Page"
            keybindingHint="G D"
            variant="invisible"
            href="/"
        />
    );
}

export default BAAS_IconButton;