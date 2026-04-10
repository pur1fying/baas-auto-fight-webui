'use client';

import { IconButton } from "@primer/react";
import { ThreeBarsIcon } from "@primer/octicons-react";
import { useTranslation } from 'react-i18next';

interface OpenMenuButtonProps {
  onClick?: () => void;
}

function OpenMenuButton({ onClick }: OpenMenuButtonProps) {
  const { t } = useTranslation();
  return (
    <IconButton
      className = "!bg-[var(--bgColor-default)]"
      icon={ThreeBarsIcon}
      aria-label={t('nav.openMenu')}
      onClick={onClick}
    />
  );
}

export default OpenMenuButton;