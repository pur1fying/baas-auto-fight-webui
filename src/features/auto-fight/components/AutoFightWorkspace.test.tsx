import {fireEvent, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {describe, expect, test, vi} from 'vitest';

import {AutoFightWorkspace} from '@/features/auto-fight/components/AutoFightWorkspace';
import {MOCK_WORKFLOW} from '@/features/auto-fight/mock/mockWorkflow';

vi.mock('next/navigation', () => ({
    useRouter: () => ({push: vi.fn()}),
    useSearchParams: () => new URLSearchParams(),
}));

function renderWorkspace() {
    return render(
        <AutoFightWorkspace workflow={MOCK_WORKFLOW}/>,
    );
}

describe('AutoFightWorkspace', () => {
    test('opens resources with preview and pin tab behavior', async () => {
        const user = userEvent.setup();
        renderWorkspace();

        await user.click(await screen.findByRole('button', {name: '查看状态 开场'}));
        expect(screen.getByRole('heading', {name: '开场'})).toBeInTheDocument();

        await user.click(screen.getByRole('button', {name: '查看 Action 启动战斗'}));
        expect(screen.getAllByRole('tab')).toHaveLength(1);
        expect(screen.getByRole('heading', {name: '启动战斗'})).toBeInTheDocument();

        await user.dblClick(screen.getByRole('tab', {name: '启动战斗'}));
        await user.click(screen.getAllByRole('button', {name: '查看 Condition 费用充足'})[0]);
        expect(screen.getAllByRole('tab')).toHaveLength(2);
        expect(screen.getByRole('heading', {name: '费用充足'})).toBeInTheDocument();
    });

    test('owns only graph view controls', () => {
        renderWorkspace();

        expect(screen.getByRole('button', {name: 'Left to right layout'})).toBeInTheDocument();
        expect(screen.getByRole('button', {name: 'Top to bottom layout'})).toBeInTheDocument();
        expect(screen.queryByText('Idle')).not.toBeInTheDocument();
        expect(screen.queryByRole('button', {name: '单步'})).not.toBeInTheDocument();
    });

    test('resizes, collapses, and restores the detail dock', async () => {
        const user = userEvent.setup();
        renderWorkspace();
        const dock = screen.getByRole('complementary', {name: '工作流详情'});
        const separator = screen.getByRole('separator', {name: '调整详情面板宽度'});

        expect(dock).toHaveStyle({width: '420px'});
        fireEvent.pointerDown(separator, {clientX: 700});
        fireEvent.pointerMove(window, {clientX: 600});
        fireEvent.pointerUp(window);
        expect(dock).toHaveStyle({width: '520px'});

        await user.click(screen.getByRole('button', {name: '折叠详情面板'}));
        expect(screen.queryByRole('complementary', {name: '工作流详情'})).not.toBeInTheDocument();
        await user.click(screen.getByRole('button', {name: 'Show details'}));
        expect(screen.getByRole('complementary', {name: '工作流详情'})).toBeInTheDocument();
    });
});
