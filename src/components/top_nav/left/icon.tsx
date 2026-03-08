'use client';

import { IconButton } from "@primer/react";

const BAAS_ICON_PATH = "/logo.png";

function HomePageIcon() {
    return <img src={BAAS_ICON_PATH} width={32} height={32} />;
}

function onClick() {
    console.log("Go to homepage");
}

function BAAS_IconButton() {
    return (
        <IconButton
            as="a"
            size="medium"
            icon={HomePageIcon}
            aria-label="Home Page"
            onClick = {onClick}
            keybindingHint="G D"
            variant="invisible"
            href="/"
        />
    );
}

export default BAAS_IconButton;