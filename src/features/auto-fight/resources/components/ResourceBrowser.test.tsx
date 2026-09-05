import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {beforeEach, expect, test, vi} from 'vitest';

import {MOCK_WORKFLOW} from '@/features/auto-fight/mock/mockWorkflow';
import {ResourceBrowser} from '@/features/auto-fight/resources/components/ResourceBrowser';

const push = vi.fn();
let searchParams = new URLSearchParams();

vi.mock('next/navigation', () => ({
    useRouter: () => ({push}),
    useSearchParams: () => searchParams,
}));

beforeEach(() => {
    push.mockReset();
    searchParams = new URLSearchParams();
});

test('reuses previews, pins resources and exposes no authoring controls', async () => {
    const user = userEvent.setup();
    render(<ResourceBrowser kind="action" workflow={MOCK_WORKFLOW}/>);

    await user.click(screen.getByRole('button', {name: 'Open action 启动战斗'}));
    expect(screen.getByRole('heading', {name: '启动战斗'})).toBeInTheDocument();
    await user.click(screen.getByRole('button', {name: 'Open action 等待'}));
    expect(screen.getAllByRole('tab')).toHaveLength(1);

    await user.dblClick(screen.getByRole('button', {name: 'Open action 等待'}));
    await user.click(screen.getByRole('button', {name: 'Open action 爆发输出'}));
    expect(screen.getAllByRole('tab')).toHaveLength(2);
    expect(screen.queryByRole('button', {name: /new action/i})).not.toBeInTheDocument();
    expect(screen.queryByRole('button', {name: /edit action/i})).not.toBeInTheDocument();
});

test('distinguishes a local no-results state from an empty catalog', async () => {
    const user = userEvent.setup();
    render(<ResourceBrowser kind="condition" workflow={MOCK_WORKFLOW}/>);

    await user.type(screen.getByRole('searchbox', {name: 'Filter conditions'}), 'not-present');
    expect(screen.getByText('No conditions match the current filters.')).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Clear filters'})).toBeInTheDocument();
});

test('restores a deep-linked resource into the Detail Dock', () => {
    searchParams = new URLSearchParams('detailKind=condition&detailId=boss-defeated');
    render(<ResourceBrowser kind="condition" workflow={MOCK_WORKFLOW}/>);

    expect(screen.getByRole('heading', {name: 'Boss 已击败'})).toBeInTheDocument();
});
