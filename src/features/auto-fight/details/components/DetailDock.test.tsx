import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {describe, expect, test, vi} from 'vitest';

import {MOCK_WORKFLOW} from '@/features/auto-fight/mock/mockWorkflow';
import {DetailDock} from '@/features/auto-fight/details/components/DetailDock';
import type {DetailTabsState} from '@/features/auto-fight/details/store/detailTabsReducer';

const STATE_TAB: DetailTabsState = {
    activeKey: 'state:opening',
    tabs: [{
        key: 'state:opening',
        isPreview: true,
        resource: {kind: 'state', id: 'opening', title: '开场'},
    }],
};

describe('DetailDock', () => {
    test('renders structured and raw views for the active resource', async () => {
        const user = userEvent.setup();
        render(
            <DetailDock
                workflow={MOCK_WORKFLOW}
                tabsState={STATE_TAB}
                width={420}
                onActivate={vi.fn()}
                onClose={vi.fn()}
                onPin={vi.fn()}
                onCollapse={vi.fn()}
                onResizeStart={vi.fn()}
            />,
        );

        expect(screen.getByRole('heading', {name: '开场'})).toBeInTheDocument();
        expect(screen.getByText('启动战斗')).toBeInTheDocument();

        await user.click(screen.getByRole('button', {name: '原始 JSON'}));
        expect(screen.getByText(/"actionFailTransition": "restart"/)).toBeInTheDocument();
    });

    test('pins by tab double-click and closes through accessible controls', async () => {
        const user = userEvent.setup();
        const onPin = vi.fn();
        const onClose = vi.fn();
        render(
            <DetailDock
                workflow={MOCK_WORKFLOW}
                tabsState={STATE_TAB}
                width={420}
                onActivate={vi.fn()}
                onClose={onClose}
                onPin={onPin}
                onCollapse={vi.fn()}
                onResizeStart={vi.fn()}
            />,
        );

        await user.dblClick(screen.getByRole('tab', {name: '开场'}));
        await user.click(screen.getByRole('button', {name: '关闭 开场'}));

        expect(onPin).toHaveBeenCalledWith('state:opening');
        expect(onClose).toHaveBeenCalledWith('state:opening');
    });

    test('locates a transition when a reused state tab receives an anchor', () => {
        const props = {
            workflow: MOCK_WORKFLOW,
            width: 420,
            onActivate: vi.fn(),
            onClose: vi.fn(),
            onPin: vi.fn(),
            onCollapse: vi.fn(),
            onResizeStart: vi.fn(),
        };
        const {rerender} = render(<DetailDock {...props} tabsState={STATE_TAB}/>);

        rerender(
            <DetailDock
                {...props}
                tabsState={{
                    ...STATE_TAB,
                    tabs: [{
                        ...STATE_TAB.tabs[0],
                        resource: {
                            ...STATE_TAB.tabs[0].resource,
                            anchorId: 'opening:default:0',
                        },
                    }],
                }}
            />,
        );

        expect(document.getElementById('auto-fight-detail-opening:default:0'))
            .toHaveAttribute('data-located', 'true');
    });

    test('reopens structured view and scrolls when the same anchor is selected again', async () => {
        const user = userEvent.setup();
        const scrollIntoView = vi.fn();
        Object.defineProperty(Element.prototype, 'scrollIntoView', {
            configurable: true,
            value: scrollIntoView,
        });
        const props = {
            workflow: MOCK_WORKFLOW,
            width: 420,
            onActivate: vi.fn(),
            onClose: vi.fn(),
            onPin: vi.fn(),
            onCollapse: vi.fn(),
            onResizeStart: vi.fn(),
        };
        const anchoredState: DetailTabsState = {
            ...STATE_TAB,
            tabs: [{
                ...STATE_TAB.tabs[0],
                resource: {
                    ...STATE_TAB.tabs[0].resource,
                    anchorId: 'opening:action-fail:0',
                },
            }],
        };
        const {rerender} = render(<DetailDock {...props} tabsState={anchoredState}/>);
        await waitFor(() => expect(scrollIntoView).toHaveBeenCalledTimes(1));
        await user.click(screen.getByRole('button', {name: '原始 JSON'}));
        expect(screen.queryByRole('heading', {name: '开场'})).not.toBeInTheDocument();

        rerender(
            <DetailDock
                {...props}
                tabsState={{
                    ...anchoredState,
                    tabs: [{
                        ...anchoredState.tabs[0],
                        resource: {...anchoredState.tabs[0].resource},
                    }],
                }}
            />,
        );

        expect(await screen.findByRole('heading', {name: '开场'})).toBeInTheDocument();
        await waitFor(() => expect(scrollIntoView).toHaveBeenCalledTimes(2));
    });
});
