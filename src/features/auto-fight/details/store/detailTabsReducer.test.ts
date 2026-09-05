import {describe, expect, test} from 'vitest';

import {
    closeDetail,
    createDetailTabsState,
    openDetail,
    pinDetail,
} from '@/features/auto-fight/details/store/detailTabsReducer';

describe('detail tab state', () => {
    test('reuses the current preview tab for a different resource', () => {
        const initial = createDetailTabsState();
        const stateTab = openDetail(initial, {kind: 'state', id: 'opening', title: '开场'});
        const actionTab = openDetail(stateTab, {kind: 'action', id: 'start-battle', title: '启动战斗'});

        expect(actionTab.tabs).toHaveLength(1);
        expect(actionTab.tabs[0]).toMatchObject({key: 'action:start-battle', isPreview: true});
        expect(actionTab.activeKey).toBe('action:start-battle');
    });

    test('keeps pinned tabs and focuses an already open resource without duplication', () => {
        const stateTab = openDetail(createDetailTabsState(), {
            kind: 'state',
            id: 'opening',
            title: '开场',
        });
        const pinned = pinDetail(stateTab, 'state:opening');
        const withCondition = openDetail(pinned, {
            kind: 'condition',
            id: 'cost-ready',
            title: '费用充足',
        });
        const focused = openDetail(withCondition, {
            kind: 'state',
            id: 'opening',
            title: '开场',
        });

        expect(focused.tabs).toHaveLength(2);
        expect(focused.tabs[0].isPreview).toBe(false);
        expect(focused.activeKey).toBe('state:opening');
    });

    test('focuses the nearest remaining tab when the active tab closes', () => {
        const first = pinDetail(openDetail(createDetailTabsState(), {
            kind: 'workflow',
            id: 'mock-raid-workflow',
            title: 'Workflow JSON',
        }), 'workflow:mock-raid-workflow');
        const second = openDetail(first, {kind: 'state', id: 'opening', title: '开场'});
        const closed = closeDetail(second, 'state:opening');

        expect(closed.tabs.map((tab) => tab.key)).toEqual(['workflow:mock-raid-workflow']);
        expect(closed.activeKey).toBe('workflow:mock-raid-workflow');
    });
});
