import React, {useState, useRef, useEffect} from 'react';

import {Overlay, OverlayProps, registerPortalRoot} from '@primer/react';

interface props {
    isOpen: boolean;
    onClose: () => void;
    anchorRef: React.RefObject<HTMLElement | null>;
    containerName?: string;
    ignoreClickRefs?: React.RefObject<HTMLElement | null>[];
    style?: React.CSSProperties;
    width?: OverlayProps['width'];
    height?: OverlayProps['height'];
    children: React.ReactNode;
}

const ButtonOverlay = ({
                           isOpen,
                           onClose,
                           anchorRef,
                           containerName,
                           ignoreClickRefs,
                           style,
                           width,
                           height,
                           children,
                       }: props) => {
    if (!isOpen) return null;

    return (
        <Overlay
            returnFocusRef={anchorRef}
            ignoreClickRefs={ignoreClickRefs}
            onEscape={onClose}
            onClickOutside={onClose}
            portalContainerName={containerName}
            style={style}
            width={width}
            height={height}
        >
            {children}
        </Overlay>
    );
};

export function useButtonOverlay(portalRootId: string) {
    const [isOpen, setIsOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const buttonContainerRef = useRef<HTMLDivElement>(null);
    const renderBoxRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (renderBoxRef.current) registerPortalRoot(renderBoxRef.current, portalRootId);
    }, [portalRootId]);

    const openOverlay = () => setIsOpen(true);
    const closeOverlay = () => setIsOpen(false);
    const toggleOverlay = () => setIsOpen(prev => !prev);

    return {
        isOpen,
        buttonRef,
        buttonContainerRef,
        renderBoxRef,
        openOverlay,
        closeOverlay,
        toggleOverlay,
    };
}

export default ButtonOverlay;