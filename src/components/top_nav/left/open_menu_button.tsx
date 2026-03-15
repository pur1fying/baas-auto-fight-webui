'use client';

import { IconButton } from "@primer/react";
import { ThreeBarsIcon } from "@primer/octicons-react";

interface OpenMenuButtonProps {
  onClick?: () => void; 
}

function OpenMenuButton({ onClick }: OpenMenuButtonProps) {
  return (
    <IconButton
      className = "!bg-[var(--bgColor-default)]"
      icon={ThreeBarsIcon}
      aria-label="Open menu"
      onClick={onClick}
    />
  );
}

export default OpenMenuButton;