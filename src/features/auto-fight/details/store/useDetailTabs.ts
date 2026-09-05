'use client';

import {useCallback, useState} from 'react';

import {
    closeDetail,
    createDetailTabsState,
    openDetail,
    pinDetail,
} from '@/features/auto-fight/details/store/detailTabsReducer';
import type {DetailResourceRef} from '@/features/auto-fight/details/store/detailTabsReducer';

export function useDetailTabs() {
    const [state, setState] = useState(createDetailTabsState);

    const open = useCallback((resource: DetailResourceRef) => {
        setState((current) => openDetail(current, resource));
    }, []);
    const activate = useCallback((key: string) => {
        setState((current) => current.tabs.some((tab) => tab.key === key)
            ? {...current, activeKey: key}
            : current);
    }, []);
    const pin = useCallback((key: string) => {
        setState((current) => pinDetail(current, key));
    }, []);
    const close = useCallback((key: string) => {
        setState((current) => closeDetail(current, key));
    }, []);

    return {state, open, activate, pin, close};
}
