'use client';

import {Avatar, IconButton} from "@primer/react";
import { useTranslation } from 'react-i18next';

const BAAS_ICON_PATH = "/logo.png";

interface props  {
  size?: number;
}

function HomePageIcon({ size = 32 }: props) {
    return <Avatar src={BAAS_ICON_PATH} size={size}/>;
}

function BAAS_IconButton() {
    const { t } = useTranslation();
    return (
        <IconButton
            className="ml-1"
            as="a"
            size="medium"
            icon={HomePageIcon}
            aria-label={t('nav.homePage')}
            keybindingHint="G D"
            variant="invisible"
            href="/"
        />
    );
}

export default BAAS_IconButton;