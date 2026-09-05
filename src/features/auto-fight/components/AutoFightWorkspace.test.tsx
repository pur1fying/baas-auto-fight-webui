import {fireEvent, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {describe, expect, test} from 'vitest';

import {AppThemeProvider} from '@/components/theme/AppThemeProvider';
import {AutoFightWorkspace} from '@/features/auto-fight/components/AutoFightWorkspace';
import {MOCK_WORKFLOW} from '@/features/auto-fight/mock/mockWorkflow';

function renderWorkspace() {
    return render(
        <AppThemeProvider>
            <AutoFightWorkspace workflow={MOCK_WORKFLOW}/>
        </AppThemeProvider>,
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

    test('single-step highlights the active state and then its selected edge', async () => {
        const user = userEvent.setup();
        renderWorkspace();

        await user.click(screen.getByRole('button', {name: '单步'}));
        const opening = await screen.findByRole('button', {name: '查看状态 开场'});
        expect(opening.closest('.auto-fight-state-node')).toHaveAttribute('data-runtime', 'active');

        await user.click(screen.getByRole('button', {name: '单步'}));
        expect(opening.closest('.auto-fight-state-node')).toHaveAttribute('data-runtime', 'active');
        expect(screen.getByText('Paused · 2/6')).toBeInTheDocument();
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
        await user.click(screen.getByRole('button', {name: '展开详情面板'}));
        expect(screen.getByRole('complementary', {name: '工作流详情'})).toBeInTheDocument();
    });
});
