export type DetailResourceKind = 'workflow' | 'state' | 'action' | 'condition';

export interface DetailResourceRef {
    readonly kind: DetailResourceKind;
    readonly id: string;
    readonly title: string;
    readonly anchorId?: string;
}

export interface DetailTab {
    readonly key: string;
    readonly resource: DetailResourceRef;
    readonly isPreview: boolean;
}

export interface DetailTabsState {
    readonly tabs: readonly DetailTab[];
    readonly activeKey?: string;
}

export function createDetailKey(resource: Pick<DetailResourceRef, 'kind' | 'id'>): string {
    return `${resource.kind}:${resource.id}`;
}

export function createDetailTabsState(): DetailTabsState {
    return {tabs: []};
}

export function openDetail(
    state: DetailTabsState,
    resource: DetailResourceRef,
): DetailTabsState {
    const key = createDetailKey(resource);
    const existingIndex = state.tabs.findIndex((tab) => tab.key === key);

    if (existingIndex >= 0) {
        const tabs = state.tabs.map((tab, index) => index === existingIndex
            ? {...tab, resource}
            : tab);
        return {tabs, activeKey: key};
    }

    const previewIndex = state.tabs.findIndex((tab) => tab.isPreview);
    const nextTab: DetailTab = {key, resource, isPreview: true};
    if (previewIndex >= 0) {
        const tabs = state.tabs.map((tab, index) => index === previewIndex ? nextTab : tab);
        return {tabs, activeKey: key};
    }

    return {tabs: [...state.tabs, nextTab], activeKey: key};
}

export function pinDetail(state: DetailTabsState, key: string): DetailTabsState {
    return {
        ...state,
        tabs: state.tabs.map((tab) => tab.key === key ? {...tab, isPreview: false} : tab),
    };
}

export function closeDetail(state: DetailTabsState, key: string): DetailTabsState {
    const closingIndex = state.tabs.findIndex((tab) => tab.key === key);
    if (closingIndex < 0) {
        return state;
    }

    const tabs = state.tabs.filter((tab) => tab.key !== key);
    if (state.activeKey !== key) {
        return {...state, tabs};
    }

    const nextActiveIndex = Math.min(closingIndex, tabs.length - 1);
    return {
        tabs,
        activeKey: tabs[nextActiveIndex]?.key,
    };
}
