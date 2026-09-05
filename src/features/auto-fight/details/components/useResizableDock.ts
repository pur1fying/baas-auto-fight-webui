'use client';

import type {PointerEvent as ReactPointerEvent} from 'react';
import {useCallback, useState} from 'react';

const DEFAULT_DOCK_WIDTH = 420;
const MIN_DOCK_WIDTH = 320;
const MAX_DOCK_VIEWPORT_RATIO = 0.55;

function clampDockWidth(width: number): number {
    const maximum = Math.max(MIN_DOCK_WIDTH, window.innerWidth * MAX_DOCK_VIEWPORT_RATIO);
    return Math.min(maximum, Math.max(MIN_DOCK_WIDTH, width));
}

export function useResizableDock() {
    const [width, setWidth] = useState(DEFAULT_DOCK_WIDTH);

    const onResizeBy = useCallback((delta: number) => {
        setWidth((currentWidth) => clampDockWidth(currentWidth + delta));
    }, []);

    const onResizeStart = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
        event.preventDefault();
        const startX = event.clientX;
        const startWidth = width;

        function handlePointerMove(pointerEvent: PointerEvent): void {
            setWidth(clampDockWidth(startWidth + startX - pointerEvent.clientX));
        }

        function handlePointerUp(): void {
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('pointerup', handlePointerUp);
        }

        window.addEventListener('pointermove', handlePointerMove);
        window.addEventListener('pointerup', handlePointerUp);
    }, [width]);

    return {width, onResizeBy, onResizeStart};
}
